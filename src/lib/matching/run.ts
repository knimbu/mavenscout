import { DEMO_HIRING_MANAGER_ID } from '../session'
import { supabase } from '../supabase'
import type {
  AudioTestimonial,
  JobDescription,
  MatchSubScore,
  MatchWeights,
  PortfolioItem,
  Profile,
  VideoResponse,
} from '../../types/db'
import { computeMatchScore, type JobDescriptionInput } from './computeMatchScore'

// Orchestration around the placeholder scorer: gather candidate evidence,
// rank a pool, and persist/load rankings (PRD 7.7 persistence rules —
// in-opening rankings are durable; ad-hoc directory rankings are transient
// until explicitly saved to an opening).

export interface RankedCandidate {
  profile_id: string
  total_score: number
  sub_scores: MatchSubScore[]
  narrative: string
}

export interface RankingRun {
  jd: JobDescriptionInput
  weights: MatchWeights
  results: RankedCandidate[] // sorted best-first
}

/** Scores a pool of profiles against a JD. Fetches portfolio + transcripts
 *  (video Q&As + published testimonials) for the whole pool in three queries. */
export async function rankPool(
  profiles: Profile[],
  jd: JobDescriptionInput,
  weights: MatchWeights,
): Promise<RankedCandidate[]> {
  const ids = profiles.map((p) => p.id)
  if (ids.length === 0) return []
  const [portfolioRes, videosRes, audioRes] = await Promise.all([
    supabase.from('portfolio_items').select('*').in('profile_id', ids),
    supabase.from('video_responses').select('profile_id,transcript').in('profile_id', ids),
    supabase
      .from('audio_testimonials')
      .select('profile_id,transcript')
      .eq('status', 'published')
      .in('profile_id', ids),
  ])

  const portfolioBy = new Map<string, PortfolioItem[]>()
  for (const item of (portfolioRes.data as PortfolioItem[]) ?? []) {
    portfolioBy.set(item.profile_id, [...(portfolioBy.get(item.profile_id) ?? []), item])
  }
  const transcriptsBy = new Map<string, string[]>()
  const collect = (rows: Pick<VideoResponse | AudioTestimonial, 'profile_id' | 'transcript'>[]) => {
    for (const r of rows) {
      if (r.transcript)
        transcriptsBy.set(r.profile_id, [...(transcriptsBy.get(r.profile_id) ?? []), r.transcript])
    }
  }
  collect((videosRes.data as never[]) ?? [])
  collect((audioRes.data as never[]) ?? [])

  return profiles
    .map((profile) => {
      const out = computeMatchScore(
        {
          profile,
          portfolio: portfolioBy.get(profile.id) ?? [],
          transcripts: transcriptsBy.get(profile.id) ?? [],
        },
        jd,
        weights,
      )
      return { profile_id: profile.id, ...out }
    })
    .sort((a, b) => b.total_score - a.total_score)
}

/** Persists a ranking to an opening (replacing any previous one — re-running
 *  replaces, PRD 7.7). Returns the new job_descriptions id. */
export async function saveRankingToOpening(
  openingId: string,
  run: RankingRun,
): Promise<string> {
  // Replace: delete prior JD rows for this opening (cascade removes results).
  await supabase.from('job_descriptions').delete().eq('opening_id', openingId)
  const { data: jdRow, error } = await supabase
    .from('job_descriptions')
    .insert({
      hiring_manager_id: DEMO_HIRING_MANAGER_ID,
      opening_id: openingId,
      raw_text: run.jd.raw_text,
      hiring_organization: run.jd.hiring_organization,
      weights: run.weights,
    })
    .select('id')
    .single()
  if (error) throw new Error(error.message)
  const { error: resErr } = await supabase.from('match_results').insert(
    run.results.map((r) => ({
      job_description_id: jdRow.id,
      profile_id: r.profile_id,
      total_score: r.total_score,
      sub_scores: r.sub_scores,
      narrative: r.narrative,
    })),
  )
  if (resErr) throw new Error(resErr.message)
  return jdRow.id
}

export interface SavedRanking {
  jd: JobDescription
  results: Map<string, RankedCandidate>
}

/** Loads the opening's persisted ranking, if any (PRD 7.7: it reappears when
 *  the manager returns — no re-upload needed). */
export async function loadRankingForOpening(openingId: string): Promise<SavedRanking | null> {
  const { data: jd } = await supabase
    .from('job_descriptions')
    .select('*')
    .eq('opening_id', openingId)
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle()
  if (!jd) return null
  const { data: results } = await supabase
    .from('match_results')
    .select('*')
    .eq('job_description_id', jd.id)
  const map = new Map<string, RankedCandidate>()
  for (const r of results ?? []) {
    map.set(r.profile_id, {
      profile_id: r.profile_id,
      total_score: r.total_score,
      sub_scores: r.sub_scores,
      narrative: r.narrative,
    })
  }
  return { jd: jd as JobDescription, results: map }
}
