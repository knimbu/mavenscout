import { Sparkles } from 'lucide-react'
import { useMemo, useState } from 'react'
import { FilterBar } from '../components/directory/FilterBar'
import { FlipCard } from '../components/directory/FlipCard'
import { SortDropdown } from '../components/directory/SortDropdown'
import { SignupPrompt } from '../components/ui/SignupPrompt'
import { useDirectoryData } from '../hooks/useDirectoryData'
import {
  applyFilters,
  buildTaxonomyTree,
  deriveOptions,
  EMPTY_FILTERS,
  type FilterState,
} from '../lib/filters'
import { useSession } from '../lib/session'
import { sortProfiles, type SortMode } from '../lib/sort'

export default function Directory() {
  const { data, error } = useDirectoryData()
  const { isLoggedIn } = useSession()

  const [filters, setFilters] = useState<FilterState>(EMPTY_FILTERS)
  const [sort, setSort] = useState<SortMode>('shuffle')
  // Bumped on every filter change so card flip state resets (PRD 7.1).
  const [epoch, setEpoch] = useState(0)
  const [gatedFeature, setGatedFeature] = useState<string | null>(null)
  const [notice, setNotice] = useState<string | null>(null)

  const handleFilterChange = (next: FilterState) => {
    setFilters(next)
    setEpoch((e) => e + 1)
  }

  const trees = useMemo(() => {
    if (!data) return null
    return {
      expertise: buildTaxonomyTree(data.taxonomyCategories, data.taxonomyItems, 'domain_expertise'),
      skills: buildTaxonomyTree(data.taxonomyCategories, data.taxonomyItems, 'technical_skills'),
    }
  }, [data])

  const options = useMemo(() => (data ? deriveOptions(data.profiles) : null), [data])

  const results = useMemo(() => {
    if (!data || !trees) return []
    const filtered = applyFilters(
      data.profiles,
      data.portfolioByProfile,
      filters,
      trees.expertise,
      trees.skills,
    )
    return sortProfiles(filtered, sort)
  }, [data, trees, filters, sort])

  const requireAccount = (feature: string, action: () => void) => {
    if (!isLoggedIn) setGatedFeature(feature)
    else action()
  }

  if (error)
    return (
      <div className="mx-auto max-w-7xl px-4 py-10">
        <p className="text-red-600">Couldn't load the directory: {error}</p>
      </div>
    )

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold">Browse experts</h1>
          <p className="mt-1 text-sm text-ink-soft">
            A curated pool of vetted consultants and firms in international development.
          </p>
        </div>
        {/* Rank by JD — deliberately separate from the filter bar (PRD 7.1). */}
        <button
          onClick={() =>
            requireAccount('Ranking candidates against a job description', () =>
              setNotice('AI ranking arrives in build step 8.'),
            )
          }
          className="flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-ink/85"
        >
          <Sparkles size={16} className="text-gold-300" />
          Rank by Job Description
        </button>
      </div>

      <div className="mt-6">
        {data && options && (
          <FilterBar
            filters={filters}
            onChange={handleFilterChange}
            locations={options.locations}
            languages={options.languages}
            taxonomyCategories={data.taxonomyCategories}
            taxonomyItems={data.taxonomyItems}
          />
        )}
      </div>

      <div className="mt-6 flex items-center justify-between gap-4">
        <p className="text-sm text-ink-soft" aria-live="polite">
          {data ? `${results.length} result${results.length === 1 ? '' : 's'}` : 'Loading…'}
        </p>
        <SortDropdown value={sort} onChange={setSort} bestMatchAvailable={false} />
      </div>

      <div className="mt-4 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {data &&
          results.map((p) => (
            <FlipCard
              key={`${p.id}-${epoch}`}
              profile={p}
              portfolio={data.portfolioByProfile.get(p.id) ?? []}
              intro={data.introByProfile.get(p.id) ?? null}
              audioCount={data.audioCountByProfile.get(p.id) ?? 0}
              onFavorite={() =>
                requireAccount('Saving candidates', () =>
                  setNotice('Saving into openings arrives in build step 5.'),
                )
              }
              onTopPick={() =>
                requireAccount('Saving candidates', () =>
                  setNotice('Saving into openings arrives in build step 5.'),
                )
              }
            />
          ))}
      </div>

      {data && results.length === 0 && (
        <p className="py-16 text-center text-ink-faint">
          No consultants match the current filters.
        </p>
      )}

      <SignupPrompt
        open={gatedFeature !== null}
        onClose={() => setGatedFeature(null)}
        feature={gatedFeature ?? ''}
      />

      {notice && (
        <div
          className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2 rounded-full bg-ink px-4 py-2 text-sm text-white shadow-lg"
          role="status"
          onAnimationEnd={() => setNotice(null)}
        >
          {notice}
          <button className="ml-3 text-white/60 hover:text-white" onClick={() => setNotice(null)}>
            ✕
          </button>
        </div>
      )}
    </div>
  )
}
