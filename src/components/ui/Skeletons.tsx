// Loading skeletons — quiet placeholders that hold the layout instead of a
// bare "Loading…" string. Kept deliberately low-contrast (warm neutral, no
// cyan): loading is not an event worth accent color.

export function Skeleton({ className = '' }: { className?: string }) {
  return <div className={`animate-pulse rounded-lg bg-ink/[0.07] ${className}`} />
}

/** Directory grid placeholder — mirrors the flip-card footprint. */
export function DirectorySkeleton() {
  return (
    <div className="mt-4 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="rounded-card border border-line bg-white">
          <Skeleton className="h-20 w-full rounded-b-none rounded-t-card" />
          <div className="space-y-2.5 p-4">
            <div className="-mt-10 mb-2 h-16 w-16 rounded-full border-2 border-white bg-ink/[0.07]" />
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-1/2" />
            <div className="flex gap-1.5 pt-1">
              <Skeleton className="h-5 w-20 rounded-full" />
              <Skeleton className="h-5 w-24 rounded-full" />
            </div>
            <Skeleton className="mt-6 h-3 w-1/3" />
            <div className="flex gap-1.5">
              <Skeleton className="h-6 w-28 rounded-full" />
              <Skeleton className="h-6 w-24 rounded-full" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

/** Profile page placeholder — cover, avatar, hero lines, tab bar. */
export function ProfileSkeleton() {
  return (
    <div>
      <Skeleton className="h-40 w-full rounded-none sm:h-52" />
      <div className="mx-auto max-w-5xl px-4">
        <div className="-mt-10 h-24 w-24 rounded-full border-4 border-white bg-ink/[0.07]" />
        <div className="mt-4 space-y-2.5">
          <Skeleton className="h-7 w-56" />
          <Skeleton className="h-4 w-80 max-w-full" />
          <Skeleton className="h-3 w-64 max-w-full" />
        </div>
        <div className="mt-6 flex gap-4 border-b border-line pb-2.5">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-4 w-20" />
          ))}
        </div>
        <div className="space-y-3 py-8">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-11/12" />
          <Skeleton className="h-4 w-4/5" />
        </div>
      </div>
    </div>
  )
}

/** Generic stacked-rows placeholder (openings, shared lists, admin). */
export function RowsSkeleton({ rows = 3 }: { rows?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex items-center gap-3 rounded-card border border-line bg-white p-4">
          <Skeleton className="h-11 w-11 shrink-0 rounded-full" />
          <div className="min-w-0 flex-1 space-y-2">
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-3 w-2/3" />
          </div>
        </div>
      ))}
    </div>
  )
}
