import { ArrowUpDown } from 'lucide-react'
import type { SortMode } from '../../lib/sort'

const LABELS: Record<SortMode, string> = {
  shuffle: 'Featured shuffle',
  newly_added: 'Newly Added',
  location: 'Location (A–Z)',
  career_level: 'Career Level',
  best_match: 'Best Match',
}

export function SortDropdown({
  value,
  onChange,
  bestMatchAvailable,
}: {
  value: SortMode
  onChange: (mode: SortMode) => void
  /** Best Match only appears after an AI ranking has been run (PRD 7.1). */
  bestMatchAvailable: boolean
}) {
  const modes: SortMode[] = ['shuffle', 'newly_added', 'location', 'career_level']
  if (bestMatchAvailable) modes.push('best_match')
  return (
    <label className="flex items-center gap-1.5 text-sm text-ink-soft">
      <ArrowUpDown size={14} className="text-ink-faint" />
      <span className="sr-only">Sort by</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as SortMode)}
        className="rounded-full border border-line bg-white px-3 py-1.5 text-sm font-medium outline-none focus:border-brand-400"
      >
        {modes.map((m) => (
          <option key={m} value={m}>
            {LABELS[m]}
          </option>
        ))}
      </select>
    </label>
  )
}
