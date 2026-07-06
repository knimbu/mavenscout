import type { MatchComponent, MatchSubScore, MatchWeights, PortfolioItem, Profile } from '../../types/db'

// ============================================================================
// ⚠ PLACEHOLDER SCORING ENGINE (PRD 7.7) — NOT the real matcher.
//
// Loop8 is building the real AI ranking engine separately. This module is the
// deliberately isolated, swappable stand-in: a deterministic keyword-overlap
// heuristic so the full ranking UX (weights → scores → breakdown → narrative)
// is demoable end-to-end. Replacing it with Loop8's engine should touch ONLY
// this directory — the exported types and function signature below are the
// stable contract the UI (and the job_descriptions/match_results tables)
// already speak:
//
//   computeMatchScore(candidate, jd, weights) →
//     { total_score 0–100, sub_scores: MatchSubScore[], narrative }
//
// Notes for the real engine:
// - weights: { [component]: { active, value 0–5 } } — merit components
//   (demonstrated_experience, domain_expertise, technical_skills) are always
//   active; the five preferences participate only when active (PRD 7.7).
// - organizational_history must return the tiered org_tier ('same'|'peer'|
//   'none'). THIS placeholder implements same-org only; peer-group reasoning
//   (World Bank ↔ UNDP) is the engine's job.
// - A percentile-normalization pass across the candidate pool is a noted
//   engine-side option, not implemented here.
// ============================================================================

export interface CandidateInput {
  profile: Profile
  portfolio: PortfolioItem[]
  /** Optional transcripts from video Q&As + audio testimonials — part of the
   *  Demonstrated Experience signal (PRD 7.5/7.6/7.7). */
  transcripts: string[]
}

export interface JobDescriptionInput {
  raw_text: string
  hiring_organization: string | null
}

export interface MatchOutput {
  total_score: number
  sub_scores: MatchSubScore[]
  narrative: string
}

/** Merit components are always on; preferences default off, 2 when added. */
export function defaultWeights(): MatchWeights {
  return {
    demonstrated_experience: { active: true, value: 5 },
    domain_expertise: { active: true, value: 3 },
    technical_skills: { active: true, value: 3 },
    organizational_history: { active: false, value: 2 },
    location: { active: false, value: 2 },
    language: { active: false, value: 2 },
    availability: { active: false, value: 2 },
    consultant_type: { active: false, value: 2 },
  }
}

const STOPWORDS = new Set(
  'a an and are as at be but by for from has have in into is it its of on or our per that the their this to we will with within work works year years'.split(' '),
)

function tokenize(text: string): Set<string> {
  return new Set(
    text
      .toLowerCase()
      .replace(/[^a-z0-9&\s-]/g, ' ')
      .split(/\s+/)
      .filter((w) => w.length > 2 && !STOPWORDS.has(w)),
  )
}

/** 0–100: how much of the JD's vocabulary the candidate text covers. */
function overlapScore(jdTokens: Set<string>, candidateText: string): number {
  if (jdTokens.size === 0) return 0
  const candTokens = tokenize(candidateText)
  let hits = 0
  for (const t of jdTokens) if (candTokens.has(t)) hits++
  // Normalize against a bounded vocabulary so long JDs don't flatten scores.
  return Math.round(Math.min(1, hits / Math.min(jdTokens.size, 40)) * 100)
}

/** Tag list vs JD text: primary counts full, secondary 0.6; a leaf-level tag
 *  matching the JD scores higher than a broad category tag (PRD 7.14). */
function tagScore(tags: Profile['expertise'], jdText: string): number {
  if (tags.length === 0) return 0
  const jd = jdText.toLowerCase()
  let earned = 0
  let possible = 0
  for (const tag of tags) {
    const tierW = tag.tier === 'primary' ? 1 : 0.6
    const levelW = tag.level === 'item' ? 1 : 0.5 // broad tags are a weaker signal
    possible += tierW
    if (jd.includes(tag.name.toLowerCase())) earned += tierW * levelW
  }
  return Math.round((earned / possible) * 100)
}

function availabilityScore(profile: Profile): number {
  const soon = (t: Profile['part_time_availability']) => {
    if (t.status === 'available_now') return 100
    if (t.status === 'available_from' && t.from) {
      const months = (new Date(t.from).getTime() - Date.now()) / (30 * 24 * 3600 * 1000)
      if (months <= 1) return 80
      if (months <= 3) return 60
      return 30
    }
    return 0
  }
  return Math.max(soon(profile.part_time_availability), soon(profile.full_time_availability))
}

export function computeMatchScore(
  candidate: CandidateInput,
  jd: JobDescriptionInput,
  weights: MatchWeights,
): MatchOutput {
  const { profile, portfolio, transcripts } = candidate
  const jdTokens = tokenize(jd.raw_text)
  const jdLower = jd.raw_text.toLowerCase()

  const sub_scores: MatchSubScore[] = []
  const push = (component: MatchComponent, score: number, extra?: Partial<MatchSubScore>) => {
    if (weights[component]?.active) sub_scores.push({ component, score, ...extra })
  }

  // Merit: Demonstrated Experience — the app's richest signal (PRD 7.7).
  const evidence = [
    profile.detailed_bio ?? '',
    ...portfolio.flatMap((p) => [p.project_name, p.description, p.results ?? '']),
    ...transcripts,
    ...profile.accreditations.map((a) => `${a.name} ${a.issuing_organization}`),
  ].join(' ')
  push('demonstrated_experience', overlapScore(jdTokens, evidence), {
    detail: 'Portfolio, bio, accreditations, and video/audio transcripts vs. the JD',
  })

  push('domain_expertise', tagScore(profile.expertise, jd.raw_text), {
    detail: 'Structured expertise tags found in the JD (primary > secondary, specific > broad)',
  })
  push('technical_skills', tagScore(profile.skills, jd.raw_text), {
    detail: 'Structured skill tags found in the JD (primary > secondary, specific > broad)',
  })

  // Preference: Organizational History — PLACEHOLDER does same-org only;
  // the tiered same/peer/none shape is the contract (PRD 7.7 ethics note).
  if (weights.organizational_history?.active) {
    const org = (jd.hiring_organization ?? '').trim().toLowerCase()
    const same =
      org.length > 2 &&
      profile.work_history.some((w) => w.organization.toLowerCase().includes(org))
    push('organizational_history', same ? 100 : 0, {
      org_tier: same ? 'same' : 'none',
      detail: same
        ? `Worked at ${jd.hiring_organization}`
        : 'No direct history with the hiring organization (peer-group matching arrives with the real engine)',
    })
  }

  push(
    'location',
    profile.location && jdLower.includes(profile.location.split(',')[0].trim().toLowerCase())
      ? 100
      : 0,
    { detail: 'Profile location mentioned in the JD' },
  )
  push(
    'language',
    profile.languages.some((l) => jdLower.includes(l.toLowerCase())) ? 100 : 0,
    { detail: 'Languages named in the JD' },
  )
  push('availability', availabilityScore(profile), { detail: 'How soon either track opens up' })
  if (weights.consultant_type?.active) {
    const wantsFirm = /\bfirms?\b/.test(jdLower)
    const isFirm = profile.consultant_type !== 'Individual'
    push('consultant_type', wantsFirm === isFirm ? 100 : 40, {
      detail: wantsFirm ? 'JD mentions firms' : 'JD reads as an individual engagement',
    })
  }

  // Weighted total (0–100). Ratio between weights is what matters (PRD 7.7).
  let weighted = 0
  let weightSum = 0
  for (const s of sub_scores) {
    const w = weights[s.component]?.value ?? 0
    weighted += s.score * w
    weightSum += w
  }
  const total_score = weightSum ? Math.round(weighted / weightSum) : 0

  return { total_score, sub_scores, narrative: buildNarrative(profile, total_score, sub_scores) }
}

// ---------------------------------------------------------------------------
// ⚠ PLACEHOLDER NARRATIVE — templated from the sub-scores (~100 words).
// The real generated narrative comes with Loop8's engine.
// ---------------------------------------------------------------------------

const COMPONENT_LABELS: Record<MatchComponent, string> = {
  demonstrated_experience: 'demonstrated experience',
  domain_expertise: 'domain expertise',
  technical_skills: 'technical skills',
  organizational_history: 'organizational history',
  location: 'location fit',
  language: 'language fit',
  availability: 'availability',
  consultant_type: 'engagement type',
}

function buildNarrative(profile: Profile, total: number, subs: MatchSubScore[]): string {
  const sorted = [...subs].sort((a, b) => b.score - a.score)
  const strongest = sorted.slice(0, 2).filter((s) => s.score >= 40)
  const weakest = sorted[sorted.length - 1]
  const first = profile.name.split(' ')[0]
  const primaryTags = profile.expertise
    .filter((t) => t.tier === 'primary')
    .map((t) => t.name)
    .join(' and ')

  const parts: string[] = []
  parts.push(
    `${profile.name} scores ${total}/100 against this brief${
      primaryTags ? `, anchored by core strength in ${primaryTags}` : ''
    }.`,
  )
  if (strongest.length > 0) {
    parts.push(
      `The strongest signal${strongest.length > 1 ? 's are' : ' is'} ${strongest
        .map((s) => `${COMPONENT_LABELS[s.component]} (${s.score}/100)`)
        .join(' and ')} — the profile's own evidence overlaps directly with the terms of reference.`,
    )
  } else {
    parts.push(
      `No component stands out strongly, suggesting the overlap with this brief is broad rather than deep.`,
    )
  }
  if (weakest && weakest.score < 40) {
    parts.push(
      `The weaker area is ${COMPONENT_LABELS[weakest.component]} (${weakest.score}/100) — worth probing before shortlisting.`,
    )
  }
  parts.push(
    `Weigh this alongside ${first}'s portfolio and references; the score reflects fit against the pasted description, not overall caliber.`,
  )
  return parts.join(' ')
}
