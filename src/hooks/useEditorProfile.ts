import { useCallback, useEffect, useState } from 'react'
import { getEditorProfileId } from '../lib/session'
import { supabase } from '../lib/supabase'
import type { Profile } from '../types/db'

/** The profile the mocked consultant session edits (PRD 7.3). Sections save
 *  independently via save(patch); edits to an approved profile auto-publish
 *  (v1 rule), while a fresh signup draft stays pending until admin review. */
export function useEditorProfile() {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    supabase
      .from('profiles')
      .select('*')
      .eq('id', getEditorProfileId())
      .maybeSingle()
      .then(({ data, error }) => {
        if (error) setError(error.message)
        else if (!data) setError('Editor profile not found — try the role switcher to reset.')
        else setProfile(data as Profile)
      })
  }, [])

  const save = useCallback(
    async (patch: Partial<Profile>): Promise<string | null> => {
      if (!profile) return 'Not loaded yet'
      setSaving(true)
      // Availability edits stamp the freshness cue (PRD 7.16).
      const stamped =
        'part_time_availability' in patch || 'full_time_availability' in patch
          ? { ...patch, availability_updated_at: new Date().toISOString() }
          : patch
      const { error } = await supabase.from('profiles').update(stamped).eq('id', profile.id)
      setSaving(false)
      if (error) return error.message
      setProfile((p) => (p ? { ...p, ...stamped } : p))
      return null
    },
    [profile],
  )

  return { profile, error, saving, save, setProfile }
}
