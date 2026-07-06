import { KeyRound, Mail } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useSession } from '../lib/session'

// /account (PRD 7.9b) — settings for both roles. UI is fully built; the
// operations themselves (email change, password change) need real Supabase
// Auth and are clearly stubbed for the developer's auth pass.

export default function Account() {
  const { role, isLoggedIn } = useSession()

  if (!isLoggedIn)
    return (
      <div className="mx-auto max-w-md px-4 py-16 text-center">
        <h1 className="text-2xl font-semibold">Account settings</h1>
        <p className="mt-2 text-sm text-ink-soft">
          Log in (or use the dev role switcher) to manage your account.
        </p>
        <Link to="/login" className="mt-4 inline-block rounded-full bg-brand-500 px-5 py-2 text-sm font-medium text-white">
          Log in
        </Link>
      </div>
    )

  const demoEmail =
    role === 'consultant' ? 'demo-consultant@mavenscout.test' : 'demo-hiring@mavenscout.test'

  return (
    <div className="mx-auto max-w-xl px-4 py-8">
      <h1 className="text-3xl font-semibold">Account settings</h1>
      <p className="mt-1 text-sm text-ink-soft">
        Demo build: these operations require real authentication and are stubbed — the forms are
        here for the developer to wire to Supabase Auth.
      </p>

      <section className="mt-7 rounded-card border border-line bg-white p-5">
        <h2 className="flex items-center gap-2 font-display text-base font-semibold">
          <Mail size={16} className="text-brand-500" /> Email address
        </h2>
        <form className="mt-3 space-y-2.5" onSubmit={(e) => e.preventDefault()}>
          <label className="block text-sm">
            <span className="font-medium">Current email</span>
            <input
              disabled
              value={demoEmail}
              className="mt-1 w-full rounded-lg border border-line bg-paper px-3 py-2 text-sm text-ink-faint"
            />
          </label>
          <label className="block text-sm">
            <span className="font-medium">New email</span>
            <input
              type="email"
              placeholder="you@organization.org"
              className="mt-1 w-full rounded-lg border border-line px-3 py-2 text-sm outline-none focus:border-brand-400"
            />
          </label>
          <button
            disabled
            title="Requires real authentication — wired in the developer's auth pass"
            className="cursor-not-allowed rounded-full bg-ink/30 px-4 py-2 text-sm font-medium text-white"
          >
            Update email — stubbed
          </button>
        </form>
      </section>

      <section className="mt-5 rounded-card border border-line bg-white p-5">
        <h2 className="flex items-center gap-2 font-display text-base font-semibold">
          <KeyRound size={16} className="text-brand-500" /> Password
        </h2>
        <form className="mt-3 space-y-2.5" onSubmit={(e) => e.preventDefault()}>
          <label className="block text-sm">
            <span className="font-medium">Current password</span>
            <input type="password" placeholder="••••••••" className="mt-1 w-full rounded-lg border border-line px-3 py-2 text-sm outline-none focus:border-brand-400" />
          </label>
          <div className="grid gap-2.5 sm:grid-cols-2">
            <label className="block text-sm">
              <span className="font-medium">New password</span>
              <input type="password" placeholder="••••••••" className="mt-1 w-full rounded-lg border border-line px-3 py-2 text-sm outline-none focus:border-brand-400" />
            </label>
            <label className="block text-sm">
              <span className="font-medium">Confirm</span>
              <input type="password" placeholder="••••••••" className="mt-1 w-full rounded-lg border border-line px-3 py-2 text-sm outline-none focus:border-brand-400" />
            </label>
          </div>
          <button
            disabled
            title="Requires real authentication — wired in the developer's auth pass"
            className="cursor-not-allowed rounded-full bg-ink/30 px-4 py-2 text-sm font-medium text-white"
          >
            Change password — stubbed
          </button>
        </form>
      </section>

      {role === 'consultant' && (
        <p className="mt-5 text-xs text-ink-faint">
          Looking for your subscription? That's under{' '}
          <Link to="/billing" className="font-medium text-brand-600">Billing</Link>.
        </p>
      )}
    </div>
  )
}
