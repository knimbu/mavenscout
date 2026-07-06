import { Link } from 'react-router-dom'
import { Modal } from './Modal'

/** The inviting sign-up gate (PRD 7.9a) — never a hard wall. Shown when a
 *  logged-out visitor tries a free-account feature (saving, gated media,
 *  openings, AI ranking). */
export function SignupPrompt({
  open,
  onClose,
  feature,
}: {
  open: boolean
  onClose: () => void
  feature: string
}) {
  return (
    <Modal open={open} onClose={onClose} title="Create a free account">
      <p className="text-sm leading-relaxed text-ink-soft">
        {feature} is part of the free hiring toolkit. A free account also unlocks candidate
        Video Q&As, audio references from former colleagues, shortlists you can share with
        your team, and AI ranking against your job description.
      </p>
      <div className="mt-5 flex flex-col gap-2">
        <Link
          to="/signup"
          onClick={onClose}
          className="rounded-full bg-brand-500 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-brand-600"
        >
          Sign up free
        </Link>
        <Link
          to="/login"
          onClick={onClose}
          className="rounded-full border border-line px-5 py-2.5 text-center text-sm font-medium text-ink-soft hover:border-ink-faint"
        >
          I already have an account
        </Link>
      </div>
    </Modal>
  )
}
