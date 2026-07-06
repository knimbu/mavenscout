import { useCallback, useEffect, useState } from 'react'
import { ensureDefaultOpening } from '../lib/openings'
import { DEMO_HIRING_MANAGER_ID } from '../lib/session'
import { supabase } from '../lib/supabase'
import type {
  CandidateNoteScore,
  HiringManager,
  Opening,
  OpeningEntry,
  OpeningReviewer,
  OpeningShare,
  Profile,
} from '../types/db'

/** All openings for the demo hiring manager, with entry counts. */
export function useOpeningsList() {
  const [openings, setOpenings] = useState<Opening[] | null>(null)
  const [counts, setCounts] = useState<Map<string, number>>(new Map())

  const reload = useCallback(async () => {
    await ensureDefaultOpening()
    const { data } = await supabase
      .from('openings')
      .select('*')
      .eq('hiring_manager_id', DEMO_HIRING_MANAGER_ID)
      .order('is_default', { ascending: false })
      .order('created_at', { ascending: false })
    const rows = (data as Opening[]) ?? []
    setOpenings(rows)
    if (rows.length) {
      const { data: entries } = await supabase
        .from('opening_entries')
        .select('opening_id')
        .in('opening_id', rows.map((o) => o.id))
      const map = new Map<string, number>()
      for (const e of (entries as { opening_id: string }[]) ?? [])
        map.set(e.opening_id, (map.get(e.opening_id) ?? 0) + 1)
      setCounts(map)
    }
  }, [])

  useEffect(() => {
    reload()
  }, [reload])

  return { openings, counts, reload }
}

export interface OpeningDetailData {
  opening: Opening
  entries: OpeningEntry[]
  profiles: Map<string, Profile>
  notes: CandidateNoteScore[]
  reviewers: OpeningReviewer[]
  shares: OpeningShare[]
  managers: Map<string, HiringManager>
}

/** Everything one opening workspace needs. `byToken` loads via a share token
 *  instead (the read-only /shortlists/:token path) — revoked tokens resolve
 *  to `notFound`. */
export function useOpeningDetail(idOrToken: string | undefined, byToken = false) {
  const [data, setData] = useState<OpeningDetailData | null>(null)
  const [notFound, setNotFound] = useState(false)

  const reload = useCallback(async () => {
    if (!idOrToken) return
    let openingId = idOrToken
    if (byToken) {
      const { data: share } = await supabase
        .from('opening_shares')
        .select('*')
        .eq('share_token', idOrToken)
        .is('revoked_at', null)
        .maybeSingle()
      if (!share) return setNotFound(true)
      openingId = share.opening_id
    }
    const { data: opening } = await supabase
      .from('openings')
      .select('*')
      .eq('id', openingId)
      .maybeSingle()
    if (!opening) return setNotFound(true)

    const [entriesRes, reviewersRes, sharesRes, managersRes] = await Promise.all([
      supabase.from('opening_entries').select('*').eq('opening_id', openingId).order('added_at'),
      supabase.from('opening_reviewers').select('*').eq('opening_id', openingId),
      supabase.from('opening_shares').select('*').eq('opening_id', openingId).is('revoked_at', null),
      supabase.from('hiring_managers').select('*'),
    ])
    const entries = (entriesRes.data as OpeningEntry[]) ?? []

    const [profilesRes, notesRes] = await Promise.all([
      entries.length
        ? supabase.from('profiles').select('*').in('id', entries.map((e) => e.profile_id))
        : Promise.resolve({ data: [] }),
      entries.length
        ? supabase.from('candidate_notes_scores').select('*').in('opening_entry_id', entries.map((e) => e.id))
        : Promise.resolve({ data: [] }),
    ])

    setData({
      opening: opening as Opening,
      entries,
      profiles: new Map(((profilesRes.data as Profile[]) ?? []).map((p) => [p.id, p])),
      notes: (notesRes.data as CandidateNoteScore[]) ?? [],
      reviewers: (reviewersRes.data as OpeningReviewer[]) ?? [],
      shares: (sharesRes.data as OpeningShare[]) ?? [],
      managers: new Map(((managersRes.data as HiringManager[]) ?? []).map((m) => [m.id, m])),
    })
  }, [idOrToken, byToken])

  useEffect(() => {
    reload()
  }, [reload])

  return { data, notFound, reload }
}
