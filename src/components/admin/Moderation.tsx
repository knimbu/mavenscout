import { Trash2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import { audioPublicUrl } from '../../lib/media'
import type { AudioTestimonial, Profile } from '../../types/db'

/** Testimonial moderation (PRD 7.6/7.10): candidates self-publish; admin has
 *  audit + takedown power (status → 'removed'). */
export function Moderation() {
  const [rows, setRows] = useState<(AudioTestimonial & { profile_name: string })[] | null>(null)

  const load = async () => {
    const [t, p] = await Promise.all([
      supabase.from('audio_testimonials').select('*').neq('status', 'removed').order('created_at', { ascending: false }),
      supabase.from('profiles').select('id,name'),
    ])
    const names = new Map(((p.data as Pick<Profile, 'id' | 'name'>[]) ?? []).map((x) => [x.id, x.name]))
    setRows(
      (((t.data as AudioTestimonial[]) ?? []).map((x) => ({
        ...x,
        profile_name: names.get(x.profile_id) ?? '?',
      }))),
    )
  }
  useEffect(() => {
    load()
  }, [])

  if (!rows) return <p className="text-sm text-ink-faint">Loading…</p>
  if (rows.length === 0)
    return <p className="text-sm text-ink-faint">No audio testimonials in the system yet.</p>

  return (
    <div className="space-y-3">
      {rows.map((t) => (
        <div key={t.id} className="rounded-lg border border-line bg-white p-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <p className="text-sm font-medium">
                {t.reference_name ?? 'Reference'}{' '}
                <span className="text-xs font-normal text-ink-faint">
                  for {t.profile_name} · {t.status} · {t.source === 'reference_direct' ? 'via token link' : 'candidate upload'}
                </span>
              </p>
              <p className="text-xs text-ink-soft">
                {[t.reference_title, t.reference_org, t.relationship].filter(Boolean).join(' · ')}
              </p>
            </div>
            <button
              onClick={async () => {
                await supabase.from('audio_testimonials').update({ status: 'removed' }).eq('id', t.id)
                load()
              }}
              className="flex items-center gap-1 rounded-full border border-red-200 px-3 py-1.5 text-xs font-medium text-red-700 hover:bg-red-50"
            >
              <Trash2 size={13} /> Remove
            </button>
          </div>
          {t.audio_path && (
            <audio controls preload="metadata" src={audioPublicUrl(t.audio_path)} className="mt-2 w-full" />
          )}
        </div>
      ))}
    </div>
  )
}
