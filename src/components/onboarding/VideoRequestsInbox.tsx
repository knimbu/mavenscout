import { Clapperboard, ChevronDown } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import { ASYNC_VIDEO_MAX_SECONDS, uploadVideoFile } from '../../lib/media'
import {
  declineRequest,
  listRequestsForProfile,
  submitResponse,
  type RequestWithJD,
} from '../../lib/videoRequests'
import type { Profile } from '../../types/db'
import { UploadOrUrlVideo } from './VideoQnASection'

// Candidate side of async video requests (PRD 7.17): pending requests
// surface here directly (the email notification is stubbed). The candidate
// reads the JD and answers with a ≤5-minute video — record, upload, or link.

export function VideoRequestsInbox({ profile }: { profile: Profile }) {
  const [requests, setRequests] = useState<RequestWithJD[]>([])

  const reload = useCallback(
    () => listRequestsForProfile(profile.id).then(setRequests),
    [profile.id],
  )
  useEffect(() => {
    reload()
  }, [reload])

  const pending = requests.filter((r) => r.status === 'sent')
  if (pending.length === 0) return null

  return (
    <div className="mb-6 rounded-card border-2 border-brand-300 bg-brand-50/60 p-5">
      <h2 className="flex items-center gap-2 font-display text-lg font-semibold">
        <Clapperboard size={18} className="text-brand-600" />
        Video response request{pending.length === 1 ? '' : 's'} ({pending.length})
      </h2>
      <p className="mt-1 text-xs text-ink-faint">
        A hiring organization would like a short async video from you — up to 5 minutes.
        (Demo build: these would normally also arrive by email.)
      </p>
      <div className="mt-4 space-y-4">
        {pending.map((req) => (
          <RequestCard key={req.id} req={req} profile={profile} onDone={reload} />
        ))}
      </div>
    </div>
  )
}

function RequestCard({
  req,
  profile,
  onDone,
}: {
  req: RequestWithJD
  profile: Profile
  onDone: () => void
}) {
  const [jdOpen, setJdOpen] = useState(false)

  return (
    <div className="rounded-xl border border-line bg-white p-4">
      <p className="text-sm font-semibold">"{req.prompt}"</p>
      <p className="mt-0.5 text-xs text-ink-faint">
        For the opening: {req.openings?.name ?? 'a role'}
        {req.job_descriptions?.hiring_organization && ` · ${req.job_descriptions.hiring_organization}`}
      </p>
      {req.job_descriptions?.raw_text && (
        <div className="mt-2">
          <button
            onClick={() => setJdOpen(!jdOpen)}
            className="flex items-center gap-1 text-xs font-medium text-brand-600 hover:text-brand-700"
          >
            <ChevronDown size={13} className={jdOpen ? 'rotate-180 transition' : 'transition'} />
            {jdOpen ? 'Hide job description' : 'Read the job description'}
          </button>
          {jdOpen && (
            <p className="mt-1.5 max-h-48 overflow-y-auto whitespace-pre-wrap rounded-lg bg-paper p-3 text-xs leading-relaxed text-ink-soft">
              {req.job_descriptions.raw_text}
            </p>
          )}
        </div>
      )}
      <div className="mt-3">
        <UploadOrUrlVideo
          label="Answer (≤5 min)"
          maxSeconds={ASYNC_VIDEO_MAX_SECONDS}
          onSubmit={async (source) => {
            if (source.file) {
              const up = await uploadVideoFile(
                profile.id,
                source.file,
                ASYNC_VIDEO_MAX_SECONDS,
                source.recordedDuration,
              )
              await submitResponse(req.id, { video_path: up.path, duration_seconds: up.duration })
            } else if (source.url) {
              await submitResponse(req.id, { video_url: source.url })
            }
            onDone()
          }}
        />
      </div>
      <button
        onClick={async () => {
          await declineRequest(req.id)
          onDone()
        }}
        className="mt-2 text-xs font-medium text-ink-faint hover:text-red-600"
      >
        Decline this request
      </button>
    </div>
  )
}
