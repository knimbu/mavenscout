import type { AvailabilityTrack } from '../../types/db'

// Availability editor (PRD 7.16): two independent tracks (part-time /
// full-time), each status + optional from/until. No calendar — deliberately
// low-effort so candidates keep it current.

const STATUSES: { value: AvailabilityTrack['status']; label: string }[] = [
  { value: 'available_now', label: 'Available now' },
  { value: 'available_from', label: 'Available from…' },
  { value: 'unavailable', label: 'Unavailable' },
]

function TrackEditor({
  label,
  value,
  onChange,
}: {
  label: string
  value: AvailabilityTrack
  onChange: (next: AvailabilityTrack) => void
}) {
  return (
    <div className="rounded-xl border border-line bg-paper/60 p-4">
      <p className="text-sm font-semibold">{label}</p>
      <div className="mt-2 flex flex-wrap gap-2">
        {STATUSES.map((s) => (
          <button
            key={s.value}
            onClick={() =>
              onChange({
                status: s.value,
                from: s.value === 'available_from' ? value.from : null,
                until: s.value === 'unavailable' ? null : value.until,
              })
            }
            className={`rounded-full border px-3 py-1.5 text-xs font-medium ${
              value.status === s.value
                ? 'border-brand-500 bg-brand-50 text-brand-700'
                : 'border-line bg-white text-ink-soft hover:border-ink-faint'
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>
      {value.status !== 'unavailable' && (
        <div className="mt-3 flex flex-wrap items-center gap-2 text-sm">
          {value.status === 'available_from' && (
            <label className="flex items-center gap-1.5">
              <span className="text-xs font-medium">From</span>
              <input
                type="date"
                value={value.from ?? ''}
                onChange={(e) => onChange({ ...value, from: e.target.value || null })}
                className="rounded-lg border border-line px-2.5 py-1.5 text-sm"
              />
            </label>
          )}
          <label className="flex items-center gap-1.5">
            <span className="text-xs font-medium">Until (optional)</span>
            <input
              type="date"
              value={value.until ?? ''}
              onChange={(e) => onChange({ ...value, until: e.target.value || null })}
              className="rounded-lg border border-line px-2.5 py-1.5 text-sm"
            />
          </label>
        </div>
      )}
    </div>
  )
}

export function AvailabilityEditor({
  partTime,
  fullTime,
  onPartTime,
  onFullTime,
}: {
  partTime: AvailabilityTrack
  fullTime: AvailabilityTrack
  onPartTime: (t: AvailabilityTrack) => void
  onFullTime: (t: AvailabilityTrack) => void
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <TrackEditor label="Part-time" value={partTime} onChange={onPartTime} />
      <TrackEditor label="Full-time" value={fullTime} onChange={onFullTime} />
    </div>
  )
}
