import { ExternalLink } from 'lucide-react'
import { audioPublicUrl } from '../../lib/media'
import type { AudioTestimonial } from '../../types/db'
import { TranscriptDisclosure } from './VideoPlayer'

function fmtRefDate(iso: string | null): string | null {
  if (!iso) return null
  return new Date(iso).toLocaleDateString(undefined, { month: 'long', year: 'numeric' })
}

/** One audio testimonial: player + the reference's identity details and
 *  optional verification link (the credibility check, PRD 7.6). */
export function TestimonialCard({ testimonial }: { testimonial: AudioTestimonial }) {
  const date = fmtRefDate(testimonial.reference_date)
  return (
    <div className="rounded-card border border-line bg-white p-4">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <div>
          <p className="text-sm font-semibold">
            {testimonial.reference_name ?? 'Reference'}
            {testimonial.verification_url && (
              <a
                href={testimonial.verification_url}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-1.5 inline-flex items-center gap-0.5 text-xs font-medium text-brand-600 hover:text-brand-700"
                title="Verify this reference on their institution's site"
              >
                verify <ExternalLink size={11} />
              </a>
            )}
          </p>
          <p className="text-xs text-ink-soft">
            {[testimonial.reference_title, testimonial.reference_org].filter(Boolean).join(', ')}
          </p>
          <p className="mt-0.5 text-xs text-ink-faint">
            {[testimonial.relationship, date].filter(Boolean).join(' · ')}
          </p>
        </div>
      </div>
      {testimonial.audio_path && (
        <audio
          controls
          preload="metadata"
          src={audioPublicUrl(testimonial.audio_path)}
          className="mt-3 w-full"
        />
      )}
      <TranscriptDisclosure transcript={testimonial.transcript} />
    </div>
  )
}
