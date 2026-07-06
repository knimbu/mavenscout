import { BadgeCheck } from 'lucide-react'
import type { AvailabilityTrack, CareerLevel, Profile } from '../../types/db'
import { InfoTip } from './InfoTip'

export const CAREER_LEVEL_LABELS: Record<CareerLevel, string> = {
  early_career: 'Early Career (0–5 yrs)',
  mid_career: 'Mid-Career (5–15 yrs)',
  senior: 'Senior (15+ yrs)',
}

export const FIRM_THRESHOLD_NOTE =
  'Small Firm: 15 or fewer people. Large Firm: more than 15. Self-reported by the firm.'

export function VerifiedBadge({ compact = false }: { compact?: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full bg-brand-50 font-medium text-brand-700 ${
        compact ? 'px-1.5 py-0.5 text-[11px]' : 'px-2 py-0.5 text-xs'
      }`}
      title="Passed MavenScout's evidence-based vetting"
    >
      <BadgeCheck size={compact ? 12 : 14} /> Verified
    </span>
  )
}

export function FirmTypeBadge({ type }: { type: 'Small Firm' | 'Large Firm' }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-ink/5 px-2 py-0.5 text-xs font-medium text-ink-soft">
      {type} <InfoTip text={FIRM_THRESHOLD_NOTE} />
    </span>
  )
}

/** "Featured" ribbon for Premium profiles (PRD 7.8) — pairs with the gold
 *  card border applied by the flip card itself. */
export function FeaturedRibbon() {
  return (
    <span className="absolute right-0 top-3 z-10 rounded-l-md bg-gold-500 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-white shadow-sm">
      Featured
    </span>
  )
}

function fmtMonth(iso: string): string {
  return new Date(iso).toLocaleDateString(undefined, { month: 'short', year: 'numeric' })
}

function trackBadge(track: AvailabilityTrack, label: 'PT' | 'FT') {
  // Color code (PRD 7.16): green = now, amber = future/window, grey = unavailable.
  if (!track || track.status === 'unavailable') {
    return { label, text: 'Unavailable', cls: 'bg-ink/5 text-ink-faint' }
  }
  if (track.status === 'available_now') {
    return {
      label,
      text: track.until ? `Now – ${fmtMonth(track.until)}` : 'Available now',
      cls: 'bg-emerald-100 text-emerald-800',
    }
  }
  return {
    label,
    text: track.from
      ? `From ${fmtMonth(track.from)}${track.until ? ` – ${fmtMonth(track.until)}` : ''}`
      : 'Available soon',
    cls: 'bg-amber-100 text-amber-800',
  }
}

export function AvailabilityBadges({ profile }: { profile: Profile }) {
  const badges = [
    trackBadge(profile.part_time_availability, 'PT'),
    trackBadge(profile.full_time_availability, 'FT'),
  ]
  return (
    <div className="flex flex-wrap gap-1.5">
      {badges.map((b) => (
        <span
          key={b.label}
          className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium ${b.cls}`}
        >
          <span className="font-semibold">{b.label}</span> {b.text}
        </span>
      ))}
    </div>
  )
}

/** Self-attested marker (PRD 7.14/7.15) — shown wherever expertise, skills,
 *  and accreditations render, so managers know these are candidate claims. */
export function SelfAttestedMark() {
  return (
    <span
      className="text-[10px] font-medium uppercase tracking-wide text-ink-faint"
      title="These are the candidate's own claims, not verified by MavenScout"
    >
      self-attested
    </span>
  )
}
