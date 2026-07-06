import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import type { Profile } from '../../types/db'

// Tier overview (PRD 7.10/7.8): manually set is_premium / subscription_status
// per profile — the admin-settable stand-in for real Stripe billing events.

const SUB_STATUSES = ['active', 'past_due', 'canceled', 'paused', 'none'] as const

export function TierOverview() {
  const [profiles, setProfiles] = useState<Profile[] | null>(null)

  const load = () =>
    supabase
      .from('profiles')
      .select('*')
      .order('name')
      .then(({ data }) => setProfiles((data as Profile[]) ?? []))
  useEffect(() => {
    load()
  }, [])

  if (!profiles) return <p className="text-sm text-ink-faint">Loading…</p>

  const update = async (id: string, patch: Partial<Profile>) => {
    await supabase.from('profiles').update(patch).eq('id', id)
    load()
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[640px] text-sm">
        <thead>
          <tr className="border-b border-line text-left text-xs uppercase tracking-wide text-ink-faint">
            <th className="py-2 pr-3 font-semibold">Profile</th>
            <th className="py-2 pr-3 font-semibold">Approval</th>
            <th className="py-2 pr-3 font-semibold">Premium</th>
            <th className="py-2 pr-3 font-semibold">Verification</th>
            <th className="py-2 font-semibold">Subscription</th>
          </tr>
        </thead>
        <tbody>
          {profiles.map((p) => (
            <tr key={p.id} className="border-b border-line/60">
              <td className="py-2.5 pr-3">
                <p className="font-medium">{p.name || <em className="text-ink-faint">draft</em>}</p>
                <p className="text-xs text-ink-faint">{p.consultant_type}</p>
              </td>
              <td className="py-2.5 pr-3 text-xs">{p.approval_status}</td>
              <td className="py-2.5 pr-3">
                <button
                  role="switch"
                  aria-checked={p.is_premium}
                  aria-label={`Premium for ${p.name}`}
                  onClick={() => update(p.id, { is_premium: !p.is_premium })}
                  className={`relative h-5 w-9 rounded-full transition ${p.is_premium ? 'bg-gold-500' : 'bg-line'}`}
                >
                  <span
                    className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-all ${p.is_premium ? 'left-[18px]' : 'left-0.5'}`}
                  />
                </button>
              </td>
              <td className="py-2.5 pr-3">
                <select
                  value={p.verification_status}
                  onChange={(e) => update(p.id, { verification_status: e.target.value as Profile['verification_status'] })}
                  className="rounded-lg border border-line bg-white px-2 py-1 text-xs"
                >
                  <option value="unverified">unverified</option>
                  <option value="pending">pending</option>
                  <option value="verified">verified</option>
                </select>
              </td>
              <td className="py-2.5">
                <select
                  value={p.subscription_status}
                  onChange={(e) => update(p.id, { subscription_status: e.target.value as Profile['subscription_status'] })}
                  className="rounded-lg border border-line bg-white px-2 py-1 text-xs"
                >
                  {SUB_STATUSES.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
