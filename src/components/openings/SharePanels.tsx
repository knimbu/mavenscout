import { Copy, Link2, Mail, UserPlus, X } from 'lucide-react'
import { useState } from 'react'
import { createShare, grantReviewer, revokeReviewer, revokeShare } from '../../lib/openings'
import { DEMO_HIRING_MANAGER_ID } from '../../lib/session'
import type { HiringManager, Opening, OpeningReviewer, OpeningShare } from '../../types/db'

// Sharing (PRD 7.4): VIEW is link-based and frictionless (read-only, no
// account); PARTICIPATE is an explicit reviewer grant. Revoking a link
// immediately 404s the old URL.

export function SharePanel({
  opening,
  shares,
  onChanged,
}: {
  opening: Opening
  shares: OpeningShare[]
  onChanged: () => void
}) {
  const [copied, setCopied] = useState(false)
  const share = shares[0] ?? null
  const url = share ? `${window.location.origin}/shortlists/${share.share_token}` : null

  return (
    <div className="rounded-card border border-line bg-white p-4">
      <h3 className="flex items-center gap-1.5 text-sm font-semibold">
        <Link2 size={15} className="text-brand-500" /> Share (read-only)
      </h3>
      <p className="mt-1 text-xs text-ink-faint">
        Anyone with the link sees candidates, scores, and notes — no account needed. Contributing
        requires reviewer access (below).
      </p>
      {url ? (
        <>
          <div className="mt-2.5 flex items-center gap-1.5">
            <input readOnly value={url} className="w-full truncate rounded-lg border border-line bg-paper px-2.5 py-1.5 text-xs" />
            <button
              onClick={async () => {
                await navigator.clipboard.writeText(url)
                setCopied(true)
                setTimeout(() => setCopied(false), 1500)
              }}
              title="Copy link"
              className="shrink-0 rounded-full border border-line p-2 text-ink-soft hover:border-brand-400 hover:text-brand-600"
            >
              <Copy size={14} />
            </button>
          </div>
          {copied && <p className="mt-1 text-xs text-emerald-700">Copied</p>}
          <div className="mt-2.5 flex flex-wrap gap-2">
            <a
              href={`mailto:?subject=${encodeURIComponent(`Candidate shortlist: ${opening.name}`)}&body=${encodeURIComponent(
                `Here's the shortlist for "${opening.name}" — candidates, notes, and team scores:\n\n${url}\n\n(View-only link; no account needed.)`,
              )}`}
              className="flex items-center gap-1.5 rounded-full border border-line px-3.5 py-1.5 text-xs font-medium text-ink-soft hover:border-brand-400 hover:text-brand-600"
            >
              <Mail size={13} /> Email this list
            </a>
            <button
              onClick={async () => {
                await revokeShare(share.id)
                onChanged()
              }}
              className="flex items-center gap-1.5 rounded-full border border-red-200 px-3.5 py-1.5 text-xs font-medium text-red-700 hover:bg-red-50"
            >
              <X size={13} /> Revoke link
            </button>
          </div>
        </>
      ) : (
        <button
          onClick={async () => {
            await createShare(opening.id)
            onChanged()
          }}
          className="mt-2.5 rounded-full bg-brand-500 px-4 py-2 text-xs font-medium text-white hover:bg-brand-600"
        >
          Create share link
        </button>
      )}
    </div>
  )
}

export function ReviewersPanel({
  opening,
  reviewers,
  managers,
  onChanged,
}: {
  opening: Opening
  reviewers: OpeningReviewer[]
  managers: Map<string, HiringManager>
  onChanged: () => void
}) {
  const grantable = [...managers.values()].filter(
    (m) => m.id !== DEMO_HIRING_MANAGER_ID && !reviewers.some((r) => r.reviewer_id === m.id),
  )
  return (
    <div className="rounded-card border border-line bg-white p-4">
      <h3 className="flex items-center gap-1.5 text-sm font-semibold">
        <UserPlus size={15} className="text-brand-500" /> Reviewers (can participate)
      </h3>
      <p className="mt-1 text-xs text-ink-faint">
        Reviewers add their own attributed notes and 0–5 scores, feeding the team average.
      </p>
      <ul className="mt-2.5 space-y-1.5">
        {reviewers.map((r) => (
          <li key={r.id} className="flex items-center justify-between gap-2 rounded-lg bg-paper px-3 py-1.5 text-sm">
            <span>
              {managers.get(r.reviewer_id)?.name ?? '?'}
              <span className="ml-1.5 text-xs text-ink-faint">{managers.get(r.reviewer_id)?.organization}</span>
            </span>
            <button
              onClick={async () => {
                await revokeReviewer(r.id)
                onChanged()
              }}
              aria-label="Revoke reviewer"
              className="rounded-full p-1 text-ink-faint hover:text-red-600"
            >
              <X size={13} />
            </button>
          </li>
        ))}
        {reviewers.length === 0 && <li className="text-xs text-ink-faint">No reviewers yet.</li>}
      </ul>
      {grantable.length > 0 && (
        <select
          value=""
          onChange={async (e) => {
            if (!e.target.value) return
            await grantReviewer(opening.id, e.target.value)
            onChanged()
          }}
          className="mt-2.5 w-full rounded-lg border border-line bg-white px-2.5 py-2 text-xs font-medium text-ink-soft"
        >
          <option value="">Add a reviewer…</option>
          {grantable.map((m) => (
            <option key={m.id} value={m.id}>
              {m.name} — {m.organization}
            </option>
          ))}
        </select>
      )}
    </div>
  )
}
