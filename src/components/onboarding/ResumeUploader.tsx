import { FileText, Link2, Trash2, Upload } from 'lucide-react'
import { useRef, useState } from 'react'
import { removeResume, resumeDownloadUrl, setResumeUrl, uploadResume } from '../../lib/media'
import type { Profile } from '../../types/db'

// Résumé upload-or-URL (same pattern as Video Q&As, PRD 7.5): a real PDF
// upload to the 'resumes' Storage bucket, or paste an external link.
// Mounted in the consultant profile editor (step 4's multi-step form).

export function ResumeUploader({
  profile,
  onChange,
}: {
  profile: Profile
  onChange: (next: Pick<Profile, 'resume_path' | 'resume_url'>) => void
}) {
  const fileRef = useRef<HTMLInputElement>(null)
  const [urlDraft, setUrlDraft] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const current = resumeDownloadUrl(profile)

  const run = async (fn: () => Promise<Pick<Profile, 'resume_path' | 'resume_url'>>) => {
    setBusy(true)
    setError(null)
    try {
      onChange(await fn())
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e))
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="rounded-card border border-line bg-white p-5">
      <h3 className="flex items-center gap-2 font-display text-base font-semibold">
        <FileText size={17} className="text-brand-500" /> Résumé / CV
      </h3>
      <p className="mt-1 text-xs text-ink-faint">
        PDF up to 10 MB, or a link to a résumé you host elsewhere. Hiring managers download it
        from your profile's action bar.
      </p>

      {current && (
        <div className="mt-3 flex items-center justify-between gap-3 rounded-lg bg-paper px-3 py-2">
          <a
            href={current}
            target="_blank"
            rel="noopener noreferrer"
            className="truncate text-sm font-medium text-brand-600 hover:text-brand-700"
          >
            {profile.resume_path ? 'Uploaded PDF' : profile.resume_url}
          </a>
          <button
            disabled={busy}
            onClick={() =>
              run(async () => {
                await removeResume(profile.id)
                return { resume_path: null, resume_url: null }
              })
            }
            className="shrink-0 rounded-full p-1.5 text-ink-faint hover:bg-white hover:text-red-600"
            aria-label="Remove résumé"
          >
            <Trash2 size={15} />
          </button>
        </div>
      )}

      <div className="mt-4 flex flex-col gap-3 sm:flex-row">
        <input
          ref={fileRef}
          type="file"
          accept="application/pdf,.pdf"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0]
            e.target.value = ''
            if (file)
              run(async () => {
                const path = await uploadResume(profile.id, file)
                return { resume_path: path, resume_url: null }
              })
          }}
        />
        <button
          disabled={busy}
          onClick={() => fileRef.current?.click()}
          className="flex items-center justify-center gap-2 rounded-full bg-brand-500 px-4 py-2 text-sm font-medium text-white hover:bg-brand-600 disabled:opacity-50"
        >
          <Upload size={15} /> {busy ? 'Working…' : 'Upload PDF'}
        </button>
        <div className="flex flex-1 gap-2">
          <input
            type="url"
            value={urlDraft}
            onChange={(e) => setUrlDraft(e.target.value)}
            placeholder="…or paste a résumé link"
            className="w-full rounded-full border border-line px-3.5 py-2 text-sm outline-none focus:border-brand-400"
          />
          <button
            disabled={busy || !/^https?:\/\/\S+/.test(urlDraft)}
            onClick={() =>
              run(async () => {
                await setResumeUrl(profile.id, urlDraft.trim())
                setUrlDraft('')
                return { resume_path: null, resume_url: urlDraft.trim() }
              })
            }
            className="flex items-center gap-1.5 rounded-full border border-line px-4 py-2 text-sm font-medium text-ink-soft hover:border-ink-faint disabled:opacity-50"
          >
            <Link2 size={14} /> Save
          </button>
        </div>
      </div>

      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  )
}
