import type { TagSelection } from '../../types/db'

/** Primary/secondary tag rendering (PRD 7.14): primary emphasized first,
 *  secondary visually distinguished under an "Also" grouping. Category-level
 *  tags carry a "(broad)" marker — they signal generalist competency. */
export function TagPills({ tags }: { tags: TagSelection[] }) {
  const primary = tags.filter((t) => t.tier === 'primary')
  const secondary = tags.filter((t) => t.tier === 'secondary')
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-1.5">
        {primary.map((t) => (
          <span
            key={t.name}
            className="rounded-full bg-brand-500 px-2.5 py-1 text-xs font-semibold text-white"
            title={t.level === 'category' ? 'Broad/generalist competency in this area' : undefined}
          >
            {t.name}
            {t.level === 'category' && ' (broad)'}
          </span>
        ))}
      </div>
      {secondary.length > 0 && (
        <div>
          <p className="mb-1 text-[11px] font-medium uppercase tracking-wide text-ink-faint">Also</p>
          <div className="flex flex-wrap gap-1.5">
            {secondary.map((t) => (
              <span
                key={t.name}
                className="rounded-full border border-line bg-white px-2.5 py-1 text-xs text-ink-soft"
              >
                {t.name}
                {t.level === 'category' && ' (broad)'}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
