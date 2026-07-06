import { Check, Minus, Pause, Play, Sparkles, XCircle } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useEditorProfile } from '../hooks/useEditorProfile'
import { fmtDate } from '../lib/dates'
import { useSession } from '../lib/session'
import type { SubscriptionStatus } from '../types/db'

// /billing (PRD 7.8/7.9b) — SCAFFOLD: no live Stripe. The tier display and
// pause/cancel/resume drive `subscription_status` directly for demo realism
// (cancel → profile unpublishes; resume → republishes) since that field
// already gates visibility app-wide. The Subscribe action is deliberately
// non-functional; real Stripe Checkout + webhook sync is the developer's
// integration, after which these buttons stop writing the field directly.

const MATRIX: { label: string; standard: string | boolean; premium: string | boolean }[] = [
  { label: 'Video Q&A — general intro (upload or URL)', standard: '1', premium: '1' },
  { label: 'Video Q&A — standard-question videos', standard: false, premium: 'up to 5' },
  { label: 'Video Q&A — attached to a portfolio item', standard: false, premium: '1 per item' },
  { label: 'Audio testimonials', standard: '1', premium: '10' },
  { label: 'Portfolio items (total on profile)', standard: '3', premium: '10' },
  { label: 'Portfolio items shown on flip card', standard: '3', premium: '3' },
  { label: 'Social / account links', standard: '2', premium: '5' },
  { label: 'Verified badge (passed vetting)', standard: false, premium: true },
  { label: 'Custom domain on profile page', standard: false, premium: true },
  { label: 'Featured badge + gold border + priority sort', standard: false, premium: true },
]

const STATUS_LABELS: Record<SubscriptionStatus, string> = {
  active: 'Active',
  past_due: 'Past due',
  canceled: 'Canceled — profile unlisted',
  paused: 'Paused — profile unlisted',
  none: 'No subscription',
}

function Cell({ value }: { value: string | boolean }) {
  if (value === true) return <Check size={15} className="mx-auto text-brand-600" />
  if (value === false) return <Minus size={14} className="mx-auto text-ink-faint/50" />
  return <span>{value}</span>
}

export default function Billing() {
  const { role } = useSession()
  const { profile, save } = useEditorProfile()
  const [message, setMessage] = useState<string | null>(null)

  if (role !== 'consultant')
    return (
      <div className="mx-auto max-w-md px-4 py-16 text-center">
        <h1 className="text-2xl font-semibold">Billing</h1>
        <p className="mt-2 text-sm text-ink-soft">
          Billing applies to consultant/firm accounts — hiring accounts are free. Use the dev
          role switcher to view as a consultant.
        </p>
      </div>
    )
  if (!profile) return <p className="mx-auto max-w-3xl px-4 py-16 text-ink-faint">Loading…</p>

  const status = profile.subscription_status

  const setStatus = async (next: SubscriptionStatus, note: string) => {
    const err = await save({ subscription_status: next })
    setMessage(err ?? note)
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="text-3xl font-semibold">Billing</h1>
      <p className="mt-1 text-sm text-ink-soft">
        Demo build: payments aren't wired — subscription controls below drive the real
        publication logic, but no money moves.
      </p>

      {/* Current status */}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-card border border-line bg-white p-5">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-ink-faint">Current plan</p>
          <p className="mt-1 font-display text-xl font-semibold">
            {profile.is_premium ? 'Premium' : 'Standard'}
            <span
              className={`ml-2.5 align-middle text-xs font-medium ${
                status === 'active' ? 'text-emerald-700' : 'text-amber-700'
              }`}
            >
              {STATUS_LABELS[status]}
            </span>
          </p>
          <p className="mt-0.5 text-xs text-ink-faint">
            {profile.is_premium ? '$29/month (sample price)' : '$12/month (sample price)'} · profile:{' '}
            <Link to={`/profile/${profile.handle}`} className="text-brand-600">/{profile.handle}</Link>
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {status === 'active' && (
            <>
              <button
                onClick={() => setStatus('paused', 'Subscription paused — your profile is now unlisted until you resume.')}
                className="flex items-center gap-1.5 rounded-full border border-line px-4 py-2 text-sm font-medium text-ink-soft hover:border-ink-faint"
              >
                <Pause size={14} /> Pause
              </button>
              <button
                onClick={() => setStatus('canceled', 'Subscription canceled — your profile is now unlisted. Resume any time.')}
                className="flex items-center gap-1.5 rounded-full border border-red-200 px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-50"
              >
                <XCircle size={14} /> Cancel
              </button>
            </>
          )}
          {(status === 'paused' || status === 'canceled' || status === 'none') && (
            <button
              onClick={() => setStatus('active', 'Subscription resumed — your profile is listed again.')}
              className="flex items-center gap-1.5 rounded-full bg-brand-500 px-4 py-2 text-sm font-medium text-white hover:bg-brand-600"
            >
              <Play size={14} /> Resume
            </button>
          )}
        </div>
      </div>
      {message && (
        <p className="mt-2 rounded-lg bg-brand-50 px-3.5 py-2.5 text-sm text-ink-soft">{message}</p>
      )}

      {/* Tier matrix */}
      <div className="mt-8 overflow-x-auto rounded-card border border-line bg-white">
        <table className="w-full min-w-[520px] text-sm">
          <thead>
            <tr className="border-b border-line text-left">
              <th className="px-4 py-3 font-semibold">Feature</th>
              <th className={`px-4 py-3 text-center font-semibold ${!profile.is_premium ? 'text-brand-700' : ''}`}>
                Standard
              </th>
              <th className={`px-4 py-3 text-center font-semibold ${profile.is_premium ? 'text-gold-700' : ''}`}>
                <span className="inline-flex items-center gap-1">
                  <Sparkles size={13} className="text-gold-500" /> Premium
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            {MATRIX.map((row) => (
              <tr key={row.label} className="border-b border-line/60 last:border-0">
                <td className="px-4 py-2.5 text-ink-soft">{row.label}</td>
                <td className="px-4 py-2.5 text-center"><Cell value={row.standard} /></td>
                <td className="px-4 py-2.5 text-center"><Cell value={row.premium} /></td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line bg-paper/50 px-4 py-3">
          <p className="text-xs text-ink-faint">
            Premium is applied for, not just bought — evidence-based vetting grants the Verified
            badge (see your profile editor's Tier section).
          </p>
          <button
            disabled
            title="Coming soon — payments are wired by the developer (Stripe Checkout)"
            className="cursor-not-allowed rounded-full bg-ink/30 px-5 py-2 text-sm font-medium text-white"
          >
            Subscribe — coming soon
          </button>
        </div>
      </div>

      {/* Billing history — stub */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold">Billing history</h2>
        <p className="mt-0.5 text-xs text-ink-faint">
          Sample rows — real history arrives with the Stripe integration.
        </p>
        <div className="mt-3 overflow-hidden rounded-card border border-line bg-white">
          {[2, 1, 0].map((monthsAgo) => {
            const d = new Date()
            d.setMonth(d.getMonth() - monthsAgo)
            return (
              <div
                key={monthsAgo}
                className="flex items-center justify-between border-b border-line/60 px-4 py-2.5 text-sm last:border-0"
              >
                <span className="text-ink-soft">
                  {profile.is_premium ? 'Premium' : 'Standard'} subscription —{' '}
                  {fmtDate(d.toISOString().slice(0, 10))}
                </span>
                <span className="flex items-center gap-3">
                  <span className="font-medium">{profile.is_premium ? '$29.00' : '$12.00'}</span>
                  <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[11px] font-semibold text-emerald-800">
                    sample
                  </span>
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
