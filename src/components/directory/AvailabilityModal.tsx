import { useState } from 'react'
import type { AvailabilityFilter, EngagementType } from '../../lib/filters'
import { Modal } from '../ui/Modal'

// Availability filter modal (PRD 7.1/7.16): engagement type + a start window.
// Deliberately just those two questions — no duration precision the
// self-reported data can't support.

const ENGAGEMENTS: { value: EngagementType; label: string }[] = [
  { value: 'either', label: 'Either' },
  { value: 'part_time', label: 'Part-time' },
  { value: 'full_time', label: 'Full-time' },
]

function currentMonth(): string {
  return new Date().toISOString().slice(0, 7)
}

export function availabilitySummary(f: AvailabilityFilter): string {
  const eng =
    f.engagement === 'part_time' ? 'Part-time' : f.engagement === 'full_time' ? 'Full-time' : 'Available'
  if (!f.fromMonth && !f.untilMonth) return eng
  const fmt = (ym: string) =>
    new Date(`${ym}-01T00:00:00`).toLocaleDateString(undefined, { month: 'short', year: 'numeric' })
  if (f.fromMonth && f.untilMonth && f.fromMonth !== f.untilMonth)
    return `${eng} ${fmt(f.fromMonth)} – ${fmt(f.untilMonth)}`
  return `${eng} from ${fmt(f.fromMonth ?? f.untilMonth!)}`
}

export function AvailabilityModal({
  open,
  onClose,
  value,
  onApply,
}: {
  open: boolean
  onClose: () => void
  value: AvailabilityFilter | null
  onApply: (next: AvailabilityFilter | null) => void
}) {
  const [engagement, setEngagement] = useState<EngagementType>(value?.engagement ?? 'either')
  const [fromMonth, setFromMonth] = useState<string>(value?.fromMonth ?? '')
  const [untilMonth, setUntilMonth] = useState<string>(value?.untilMonth ?? '')

  return (
    <Modal open={open} onClose={onClose} title="Availability">
      <div className="space-y-5">
        <div>
          <p className="mb-2 text-sm font-medium">Engagement type</p>
          <div className="flex gap-2">
            {ENGAGEMENTS.map((e) => (
              <button
                key={e.value}
                onClick={() => setEngagement(e.value)}
                className={`rounded-full border px-3.5 py-1.5 text-sm font-medium ${
                  engagement === e.value
                    ? 'border-brand-500 bg-brand-50 text-brand-700'
                    : 'border-line text-ink-soft hover:border-ink-faint'
                }`}
              >
                {e.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-2 text-sm font-medium">Start window</p>
          <p className="mb-2 text-xs text-ink-faint">
            Candidates already available now are included in any future window.
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <input
              type="month"
              value={fromMonth}
              min={currentMonth()}
              onChange={(e) => setFromMonth(e.target.value)}
              className="rounded-lg border border-line px-2.5 py-1.5 text-sm"
              aria-label="Available from month"
            />
            <span className="text-sm text-ink-faint">to</span>
            <input
              type="month"
              value={untilMonth}
              min={fromMonth || currentMonth()}
              onChange={(e) => setUntilMonth(e.target.value)}
              className="rounded-lg border border-line px-2.5 py-1.5 text-sm"
              aria-label="Available until month (optional)"
            />
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 border-t border-line pt-4">
          <button
            className="text-sm font-medium text-ink-faint hover:text-ink"
            onClick={() => {
              onApply(null)
              onClose()
            }}
          >
            Clear
          </button>
          <button
            className="rounded-full bg-brand-500 px-5 py-2 text-sm font-medium text-white hover:bg-brand-600"
            onClick={() => {
              onApply({
                engagement,
                fromMonth: fromMonth || null,
                untilMonth: untilMonth || null,
              })
              onClose()
            }}
          >
            Apply
          </button>
        </div>
      </div>
    </Modal>
  )
}
