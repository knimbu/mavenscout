import { Send } from 'lucide-react'
import { useState } from 'react'
import type { Profile } from '../../types/db'
import { Modal } from '../ui/Modal'

// Contact Me relay (PRD 7.2): relays an email introduction to the candidate.
// The candidate's raw email address is NEVER displayed anywhere — this form
// is the only contact path. Actual email delivery is a developer-pass item
// (consistent with all outbound email being stubbed this build); the relay
// record/send is mocked with a clearly-labeled success state.

export function ContactModal({
  profile,
  open,
  onClose,
}: {
  profile: Profile
  open: boolean
  onClose: () => void
}) {
  const [sent, setSent] = useState(false)

  return (
    <Modal open={open} onClose={onClose} title={`Contact ${profile.name}`}>
      {sent ? (
        <div className="py-6 text-center">
          <Send size={22} className="mx-auto text-brand-500" />
          <p className="mt-3 text-sm text-ink-soft">
            Your introduction has been relayed to {profile.name}. If they're interested,
            they'll reply to you directly by email.
          </p>
          <p className="mt-2 text-xs text-ink-faint">
            (Demo build: outbound email is stubbed — no message was actually sent.)
          </p>
          <button
            onClick={() => {
              setSent(false)
              onClose()
            }}
            className="mt-5 rounded-full bg-brand-500 px-5 py-2 text-sm font-medium text-white hover:bg-brand-600"
          >
            Done
          </button>
        </div>
      ) : (
        <form
          className="space-y-3"
          onSubmit={(e) => {
            e.preventDefault()
            setSent(true)
          }}
        >
          <p className="text-xs text-ink-faint">
            MavenScout relays your introduction by email — candidate addresses are never shown.
          </p>
          <label className="block text-sm">
            <span className="font-medium">Your name</span>
            <input required className="mt-1 w-full rounded-lg border border-line px-3 py-2 text-sm outline-none focus:border-brand-400" />
          </label>
          <label className="block text-sm">
            <span className="font-medium">Your organization</span>
            <input required className="mt-1 w-full rounded-lg border border-line px-3 py-2 text-sm outline-none focus:border-brand-400" />
          </label>
          <label className="block text-sm">
            <span className="font-medium">Your email</span>
            <input type="email" required className="mt-1 w-full rounded-lg border border-line px-3 py-2 text-sm outline-none focus:border-brand-400" />
          </label>
          <label className="block text-sm">
            <span className="font-medium">Message</span>
            <textarea
              required
              rows={4}
              placeholder="What's the engagement, roughly when, and why this candidate?"
              className="mt-1 w-full rounded-lg border border-line px-3 py-2 text-sm outline-none focus:border-brand-400"
            />
          </label>
          <button
            type="submit"
            className="w-full rounded-full bg-brand-500 px-5 py-2.5 text-sm font-medium text-white hover:bg-brand-600"
          >
            Send introduction
          </button>
        </form>
      )}
    </Modal>
  )
}
