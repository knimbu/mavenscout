import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ResumeUploader } from '../components/onboarding/ResumeUploader'
import { DEMO_CONSULTANT_HANDLE } from '../lib/session'
import { supabase } from '../lib/supabase'
import type { Profile } from '../types/db'

// The full multi-step onboarding/profile editor (PRD 7.3) lands in build
// step 4. The résumé section below is already real — it operates on the demo
// consultant's profile (auth is mocked) and will be absorbed into the
// step-4 editor as one of its sections.
export default function Onboarding() {
  const [profile, setProfile] = useState<Profile | null>(null)

  useEffect(() => {
    supabase
      .from('profiles')
      .select('*')
      .eq('handle', DEMO_CONSULTANT_HANDLE)
      .maybeSingle()
      .then(({ data }) => setProfile(data as Profile | null))
  }, [])

  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-3xl font-semibold">Build your profile</h1>
      <p className="mt-3 text-ink-soft">
        The multi-step profile editor arrives in build step 4. The résumé section is live now —
        editing as the demo consultant ({DEMO_CONSULTANT_HANDLE}).
      </p>
      <div className="mt-8">
        {profile ? (
          <>
            <ResumeUploader
              profile={profile}
              onChange={(next) => setProfile({ ...profile, ...next })}
            />
            <p className="mt-3 text-xs text-ink-faint">
              Check the result on{' '}
              <Link to={`/profile/${profile.handle}`} className="font-medium text-brand-600">
                the profile page
              </Link>{' '}
              — the Résumé button in the action bar goes live once a file or link is saved.
            </p>
          </>
        ) : (
          <p className="text-ink-faint">Loading…</p>
        )}
      </div>
    </div>
  )
}
