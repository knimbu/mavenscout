import { Plus } from 'lucide-react'
import { useEffect, useState } from 'react'
import { createOpening } from '../../lib/openings'
import { saveRankingToOpening, type RankingRun } from '../../lib/matching/run'
import { DEMO_HIRING_MANAGER_ID } from '../../lib/session'
import { supabase } from '../../lib/supabase'
import type { Opening } from '../../types/db'
import { Modal } from '../ui/Modal'

/** Persist an ad-hoc directory ranking to an opening — the single action
 *  that turns a transient ranking into a durable one (PRD 7.7). */
export function SaveRankingModal({
  run,
  open,
  onClose,
  onSaved,
}: {
  run: RankingRun
  open: boolean
  onClose: () => void
  onSaved: (openingName: string) => void
}) {
  const [openings, setOpenings] = useState<Opening[] | null>(null)
  const [newName, setNewName] = useState('')
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    if (!open) return
    supabase
      .from('openings')
      .select('*')
      .eq('hiring_manager_id', DEMO_HIRING_MANAGER_ID)
      .order('is_default', { ascending: false })
      .order('created_at', { ascending: false })
      .then(({ data }) => setOpenings((data as Opening[]) ?? []))
  }, [open])

  const saveTo = async (opening: Opening) => {
    setBusy(true)
    try {
      await saveRankingToOpening(opening.id, run)
      onSaved(opening.name)
      onClose()
    } finally {
      setBusy(false)
    }
  }

  return (
    <Modal open={open} onClose={onClose} title="Save ranking to an opening">
      <p className="mb-3 text-xs text-ink-faint">
        The JD, weights, and every candidate's score and narrative are stored with the opening —
        they'll be there when you come back. Re-running later replaces them.
      </p>
      <div className="space-y-1.5">
        {openings === null && <p className="text-sm text-ink-faint">Loading…</p>}
        {openings?.map((o) => (
          <button
            key={o.id}
            disabled={busy}
            onClick={() => saveTo(o)}
            className="w-full rounded-lg border border-line px-3.5 py-2.5 text-left text-sm font-medium hover:border-brand-400 hover:bg-brand-50/50 disabled:opacity-50"
          >
            {o.name}
            {o.is_default && <span className="ml-2 text-xs font-normal text-ink-faint">quick-save list</span>}
          </button>
        ))}
        <form
          className="flex gap-2 pt-2"
          onSubmit={async (e) => {
            e.preventDefault()
            if (!newName.trim()) return
            const o = await createOpening({ name: newName.trim() })
            await saveTo(o)
          }}
        >
          <input
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="New opening name…"
            className="flex-1 rounded-lg border border-line px-3 py-2 text-sm outline-none focus:border-brand-400"
          />
          <button
            type="submit"
            disabled={busy}
            className="flex items-center gap-1 rounded-full bg-brand-500 px-4 py-2 text-sm font-medium text-white hover:bg-brand-600 disabled:opacity-50"
          >
            <Plus size={14} /> Create
          </button>
        </form>
      </div>
    </Modal>
  )
}
