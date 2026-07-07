import { CheckCircle2, Mic, Upload } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import lockup from '../assets/mavenscout-lockup-horizontal.svg'
import { RecorderControl } from '../components/media/Recorder'
import { FieldRow, TextArea, TextField } from '../components/onboarding/fields'
import { AUDIO_MAX_SECONDS, uploadAudioFile } from '../lib/media'
import { supabase } from '../lib/supabase'
import type { AudioTestimonial, PortfolioItem, Profile } from '../types/db'

// /testimonial/:token — UNAUTHENTICATED reference submission page (PRD 7.6).
// The candidate (and optional portfolio item) is pre-loaded from the token so
// the reference confirms nothing and can't misattribute.
//
// ⚠ SECURITY (7.6 note): this is an unauthenticated upload endpoint — safe to
// scaffold, but the developer must harden before real deployment: validate
// the token server-side, cap file type/size at the storage policy, rate-limit.

export default function TestimonialSubmit() {
  const { token } = useParams()
  const [request, setRequest] = useState<AudioTestimonial | null>(null)
  const [candidate, setCandidate] = useState<Profile | null>(null)
  const [item, setItem] = useState<PortfolioItem | null>(null)
  const [state, setState] = useState<'loading' | 'ready' | 'already' | 'invalid' | 'done'>('loading')

  useEffect(() => {
    if (!token) return
    async function load() {
      const { data: req } = await supabase
        .from('audio_testimonials')
        .select('*')
        .eq('submission_token', token!)
        .maybeSingle()
      if (!req) return setState('invalid')
      const { data: prof } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', req.profile_id)
        .maybeSingle()
      if (!prof) return setState('invalid')
      setRequest(req as AudioTestimonial)
      setCandidate(prof as Profile)
      if (req.portfolio_item_id) {
        const { data: pi } = await supabase
          .from('portfolio_items')
          .select('*')
          .eq('id', req.portfolio_item_id)
          .maybeSingle()
        setItem(pi as PortfolioItem | null)
      }
      setState(req.audio_path ? 'already' : 'ready')
    }
    load()
  }, [token])

  return (
    <div className="min-h-screen">
      <header className="border-b border-line bg-white/85 py-3">
        <div className="mx-auto flex max-w-2xl items-center justify-between px-4">
          <img src={lockup} alt="MavenScout" className="h-7" />
          <Link to="/testimonial-info" className="text-xs font-medium text-brand-600 hover:text-brand-700">
            What is this?
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-4 py-10">
        {state === 'loading' && <p className="text-ink-faint">Loading…</p>}
        {state === 'invalid' && (
          <p className="text-ink-soft">
            This testimonial link isn't valid — it may have been removed. Ask the person who sent
            it for a fresh one.
          </p>
        )}
        {state === 'already' && (
          <div className="text-center">
            <CheckCircle2 size={28} className="mx-auto text-emerald-600" />
            <p className="mt-3 text-ink-soft">
              A testimonial has already been submitted through this link — thank you!
            </p>
          </div>
        )}
        {state === 'done' && candidate && (
          <div className="text-center">
            <CheckCircle2 size={28} className="mx-auto text-emerald-600" />
            <h1 className="mt-3 text-2xl font-semibold">Thank you!</h1>
            <p className="mx-auto mt-2 max-w-md text-sm text-ink-soft">
              Your reference for {candidate.name} has been submitted. They choose when to publish
              it on their profile.
            </p>
          </div>
        )}
        {state === 'ready' && candidate && request && (
          <SubmissionForm
            candidate={candidate}
            item={item}
            request={request}
            onDone={() => setState('done')}
          />
        )}
      </main>
    </div>
  )
}

function SubmissionForm({
  candidate,
  item,
  request,
  onDone,
}: {
  candidate: Profile
  item: PortfolioItem | null
  request: AudioTestimonial
  onDone: () => void
}) {
  const fileRef = useRef<HTMLInputElement>(null)
  const [form, setForm] = useState({
    reference_name: '',
    reference_org: '',
    reference_title: '',
    relationship: '',
    reference_month: '',
    verification_url: '',
    transcript: '',
  })
  const [file, setFile] = useState<File | null>(null)
  const [recordedDuration, setRecordedDuration] = useState<number | null>(null)
  const [recording, setRecording] = useState(false)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const submit = async () => {
    if (!form.reference_name.trim()) return setError('Please enter your name.')
    if (!file) return setError('Please record or attach your audio.')
    setBusy(true)
    setError(null)
    try {
      const up = await uploadAudioFile(candidate.id, file, recordedDuration ?? undefined)
      const { error: err } = await supabase
        .from('audio_testimonials')
        .update({
          reference_name: form.reference_name.trim(),
          reference_org: form.reference_org.trim() || null,
          reference_title: form.reference_title.trim() || null,
          relationship: form.relationship.trim() || null,
          reference_date: form.reference_month ? `${form.reference_month}-01` : null,
          verification_url: form.verification_url.trim() || null,
          transcript: form.transcript.trim() || null,
          audio_path: up.path,
          duration_seconds: up.duration,
        })
        .eq('id', request.id)
      if (err) throw new Error(err.message)
      onDone()
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e))
    } finally {
      setBusy(false)
    }
  }

  return (
    <div>
      <div className="flex items-center gap-4">
        {candidate.photo_url && (
          <img src={candidate.photo_url} alt="" className="h-14 w-14 rounded-full object-cover" />
        )}
        <div>
          <h1 className="text-2xl font-semibold">Audio reference for {candidate.name}</h1>
          <p className="text-sm text-ink-soft">
            {item ? (
              <>About your work together on <strong>{item.project_name}</strong></>
            ) : (
              'About your experience working together'
            )}
          </p>
        </div>
      </div>

      <div className="mt-5 rounded-card border border-brand-200 bg-brand-50/60 p-4 text-sm text-ink-soft">
        <p className="flex items-start gap-2">
          <Mic size={15} className="mt-0.5 shrink-0 text-brand-600" />
          <span>
            <strong>Up to 2 minutes.</strong> Please start by introducing yourself — your name,
            organization, and how you worked with {candidate.name.split(' ')[0]}. Then speak
            plainly about the work: what they did, how it went, what stood out.
          </span>
        </p>
      </div>

      <div className="mt-6 space-y-3">
        <FieldRow>
          <TextField label="Your name" value={form.reference_name} onChange={(v) => setForm({ ...form, reference_name: v })} required />
          <TextField label="Your organization" value={form.reference_org} onChange={(v) => setForm({ ...form, reference_org: v })} />
        </FieldRow>
        <FieldRow>
          <TextField label="Your job title" value={form.reference_title} onChange={(v) => setForm({ ...form, reference_title: v })} />
          <TextField
            label={`Relationship to ${candidate.name.split(' ')[0]}`}
            value={form.relationship}
            onChange={(v) => setForm({ ...form, relationship: v })}
            placeholder="Direct manager, client, colleague…"
          />
        </FieldRow>
        <FieldRow>
          <label className="block text-sm">
            <span className="font-medium">When was this?</span>
            <input
              type="month"
              value={form.reference_month}
              onChange={(e) => setForm({ ...form, reference_month: e.target.value })}
              className="mt-1 w-full rounded-lg border border-line px-3 py-2 text-sm outline-none focus:border-brand-400"
            />
          </label>
          <TextField
            label="A link that verifies you (optional)"
            value={form.verification_url}
            onChange={(v) => setForm({ ...form, verification_url: v })}
            placeholder="Your bio page, LinkedIn…"
            hint="Lets hiring managers confirm who's vouching"
          />
        </FieldRow>
        <TextArea
          label="Transcript (optional)"
          rows={3}
          value={form.transcript}
          onChange={(v) => setForm({ ...form, transcript: v })}
          hint="A rough text version helps accessibility and search"
        />

        <div className="rounded-xl border border-dashed border-line p-4">
          {recording ? (
            <RecorderControl
              kind="audio"
              maxSeconds={AUDIO_MAX_SECONDS}
              onRecorded={(f, duration) => {
                setFile(f)
                setRecordedDuration(duration)
                setRecording(false)
              }}
              onCancel={() => setRecording(false)}
            />
          ) : (
            <>
              <input
                ref={fileRef}
                type="file"
                accept="audio/*"
                className="hidden"
                onChange={(e) => {
                  setFile(e.target.files?.[0] ?? null)
                  setRecordedDuration(null)
                }}
              />
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setRecording(true)}
                  className="flex items-center gap-2 rounded-full bg-brand-500 px-4 py-2 text-sm font-medium text-white hover:bg-brand-600"
                >
                  <Mic size={15} /> Record right here (≤2 min)
                </button>
                <button
                  onClick={() => fileRef.current?.click()}
                  className="flex items-center gap-2 rounded-full border border-line bg-white px-4 py-2 text-sm font-medium text-ink-soft hover:border-brand-400"
                >
                  <Upload size={15} /> {file ? file.name : 'Attach a recording'}
                </button>
              </div>
              <p className="mt-1.5 text-xs text-ink-faint">
                Record in the browser (stops automatically at 2 minutes), or attach a file from
                your phone's voice-memo app.
              </p>
            </>
          )}
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}
        <button
          onClick={submit}
          disabled={busy}
          className="w-full rounded-full bg-brand-500 px-5 py-2.5 text-sm font-medium text-white hover:bg-brand-600 disabled:opacity-50"
        >
          {busy ? 'Uploading…' : 'Submit reference'}
        </button>
      </div>
    </div>
  )
}
