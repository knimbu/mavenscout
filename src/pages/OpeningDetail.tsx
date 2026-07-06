import { CalendarDays, Sparkles } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { CandidateRow } from '../components/openings/CandidateRow'
import { ReviewersPanel, SharePanel } from '../components/openings/SharePanels'
import { useOpeningDetail } from '../hooks/useOpeningData'
import { fmtDate } from '../lib/dates'
import { computeTeamStats } from '../lib/openings'
import { DEMO_HIRING_MANAGER_ID, useSession } from '../lib/session'
import NotFound from './NotFound'

// /openings/:id — a single opening workspace (PRD 7.4): short list + long
// list, per-candidate notes/scores/tags, reviewers, sharing, post-interview.

export default function OpeningDetail() {
  const { id } = useParams()
  const { role } = useSession()
  const { data, notFound, reload } = useOpeningDetail(id)

  if (notFound) return <NotFound />
  if (role !== 'hiring_manager')
    return (
      <div className="mx-auto max-w-md px-4 py-16 text-center">
        <p className="text-sm text-ink-soft">
          Log in with a hiring account (or use the dev role switcher) to open this workspace.
        </p>
      </div>
    )
  if (!data) return <p className="mx-auto max-w-5xl px-4 py-16 text-ink-faint">Loading…</p>

  const { opening, entries, profiles, notes, reviewers, shares, managers } = data
  const stats = computeTeamStats(entries, notes)
  const shortList = entries.filter((e) => e.list_tag === 'top_pick')
  const longOnly = entries.filter((e) => e.list_tag === 'favorite')

  const renderRows = (list: typeof entries) =>
    list.map((entry) => {
      const profile = profiles.get(entry.profile_id)
      if (!profile) return null
      return (
        <CandidateRow
          key={entry.id}
          entry={entry}
          profile={profile}
          notes={notes.filter((n) => n.opening_entry_id === entry.id)}
          managers={managers}
          average={stats.averages.get(entry.id) ?? null}
          rank={stats.ranks.get(entry.id)}
          currentAuthorId={DEMO_HIRING_MANAGER_ID}
          canParticipate
          onChanged={reload}
        />
      )
    })

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs text-ink-faint">
            <Link to="/openings" className="hover:text-ink">My openings</Link> /
          </p>
          <h1 className="mt-0.5 text-3xl font-semibold">{opening.name}</h1>
          {opening.description && <p className="mt-1.5 max-w-2xl text-sm text-ink-soft">{opening.description}</p>}
          {opening.deadline && (
            <p className="mt-1.5 flex items-center gap-1 text-xs text-ink-faint">
              <CalendarDays size={13} /> Deadline {fmtDate(opening.deadline)}
            </p>
          )}
        </div>
        <button
          disabled
          title="AI ranking arrives in build step 8 — it will run against this opening and persist here"
          className="flex cursor-not-allowed items-center gap-2 rounded-full bg-ink/70 px-5 py-2.5 text-sm font-medium text-white"
        >
          <Sparkles size={16} className="text-gold-300" /> Rank by Job Description
        </button>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr,290px]">
        <div className="min-w-0 space-y-8">
          <section>
            <h2 className="mb-3 text-lg font-semibold">
              Short list <span className="text-sm font-normal text-ink-faint">— top picks ({shortList.length})</span>
            </h2>
            <div className="space-y-3">
              {renderRows(shortList)}
              {shortList.length === 0 && (
                <p className="rounded-card border border-dashed border-line p-5 text-center text-sm text-ink-faint">
                  No top picks yet — star a long-list candidate to promote them.
                </p>
              )}
            </div>
          </section>
          <section>
            <h2 className="mb-3 text-lg font-semibold">
              Long list <span className="text-sm font-normal text-ink-faint">— favorites ({longOnly.length})</span>
            </h2>
            <div className="space-y-3">
              {renderRows(longOnly)}
              {longOnly.length === 0 && (
                <p className="rounded-card border border-dashed border-line p-5 text-center text-sm text-ink-faint">
                  Save candidates from the <Link to="/" className="font-medium text-brand-600">directory</Link> to build the long list.
                </p>
              )}
            </div>
          </section>
        </div>

        <aside className="space-y-4">
          <SharePanel opening={opening} shares={shares} onChanged={reload} />
          <ReviewersPanel opening={opening} reviewers={reviewers} managers={managers} onChanged={reload} />
        </aside>
      </div>
    </div>
  )
}
