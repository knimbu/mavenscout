import { Lock } from 'lucide-react'
import { Link } from 'react-router-dom'

/** Inline sign-up gate for content sections (PRD 7.9a) — an inviting prompt
 *  in place of the gated material, never a hard wall. */
export function GatePrompt({ what }: { what: string }) {
  return (
    <div className="rounded-card border border-dashed border-brand-300 bg-brand-50/60 p-6 text-center">
      <Lock size={18} className="mx-auto text-brand-500" />
      <p className="mx-auto mt-2 max-w-sm text-sm text-ink-soft">
        Create a free account to {what} — plus shortlists, team notes, and AI ranking.
      </p>
      <div className="mt-4 flex justify-center gap-2">
        <Link
          to="/signup"
          className="rounded-full bg-brand-500 px-4 py-1.5 text-sm font-medium text-white hover:bg-brand-600"
        >
          Sign up free
        </Link>
        <Link
          to="/login"
          className="rounded-full border border-line bg-white px-4 py-1.5 text-sm font-medium text-ink-soft hover:border-ink-faint"
        >
          Log in
        </Link>
      </div>
    </div>
  )
}
