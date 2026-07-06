import { ChevronDown, Sparkles } from 'lucide-react'
import { useState } from 'react'
import { defaultWeights } from '../../lib/matching/computeMatchScore'
import type { MatchComponent, MatchWeights } from '../../types/db'
import { Modal } from '../ui/Modal'

// "Rank by Job Description" modal (PRD 7.7): pasted JD text (paste only — no
// file upload this build) + a separate hiring-organization field, and the
// optional importance step: 5-stop sliders matching the human 0–5 scores.
// Three merit components are always on; five preferences are off by default
// and only sway the ranking when deliberately added.

const MERIT: { key: MatchComponent; label: string; hint: string }[] = [
  {
    key: 'demonstrated_experience',
    label: 'Demonstrated experience',
    hint: 'Portfolio, bio, and video/audio transcripts vs. the JD — the richest signal',
  },
  { key: 'domain_expertise', label: 'Domain expertise', hint: 'Structured expertise tags vs. the JD' },
  { key: 'technical_skills', label: 'Technical skills', hint: 'Structured skill tags vs. the JD' },
]

const PREFERENCES: { key: MatchComponent; label: string; hint: string }[] = [
  {
    key: 'organizational_history',
    label: 'Organizational history',
    hint: 'Same-organization track record (peer-group matching arrives with the real engine). Off by default on purpose — it can entrench who-you-know hiring.',
  },
  { key: 'location', label: 'Location', hint: '"X preferred but not required" — the hard filter handles must-haves' },
  { key: 'language', label: 'Language', hint: '"French is a plus"' },
  { key: 'availability', label: 'Availability', hint: 'Fit vs. when you need them' },
  { key: 'consultant_type', label: 'Firm vs. individual', hint: 'A soft lean, distinct from the hard Type filter' },
]

export function RankByJDModal({
  open,
  onClose,
  onRun,
  initial,
  poolLabel,
}: {
  open: boolean
  onClose: () => void
  onRun: (jd: { raw_text: string; hiring_organization: string | null }, weights: MatchWeights) => Promise<void>
  initial?: { raw_text: string; hiring_organization: string | null; weights: MatchWeights }
  poolLabel: string
}) {
  const [jdText, setJdText] = useState(initial?.raw_text ?? '')
  const [org, setOrg] = useState(initial?.hiring_organization ?? '')
  const [weights, setWeights] = useState<MatchWeights>(initial?.weights ?? defaultWeights())
  const [showWeights, setShowWeights] = useState(false)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const setW = (key: MatchComponent, patch: Partial<{ active: boolean; value: number }>) =>
    setWeights({ ...weights, [key]: { ...(weights[key] ?? { active: false, value: 2 }), ...patch } })

  const Slider = ({ k, disabled }: { k: MatchComponent; disabled?: boolean }) => (
    <div className="flex items-center gap-2">
      <input
        type="range"
        min={0}
        max={5}
        step={1}
        disabled={disabled}
        value={weights[k]?.value ?? 2}
        onChange={(e) => setW(k, { value: +e.target.value })}
        className="w-32 accent-brand-500 disabled:opacity-40"
        aria-label={`Importance 0 to 5`}
      />
      <span className="w-6 text-center text-sm font-semibold text-brand-700">
        {weights[k]?.value ?? 2}
      </span>
    </div>
  )

  return (
    <Modal open={open} onClose={onClose} title="Rank by Job Description" wide>
      <div className="space-y-4">
        <p className="text-xs text-ink-faint">
          Ranks {poolLabel}. Scoring is a clearly-labeled placeholder this build — the real
          engine (Loop8) drops in behind the same interface.
        </p>
        <label className="block text-sm">
          <span className="font-medium">Job description / Terms of Reference (paste text)</span>
          <textarea
            rows={7}
            value={jdText}
            onChange={(e) => setJdText(e.target.value)}
            placeholder="Paste the JD or ToR text here…"
            className="mt-1 w-full rounded-lg border border-line px-3 py-2 text-sm outline-none focus:border-brand-400"
          />
        </label>
        <label className="block text-sm">
          <span className="font-medium">Hiring organization</span>
          <input
            value={org}
            onChange={(e) => setOrg(e.target.value)}
            placeholder="e.g. UNDP — used by the Organizational History preference"
            className="mt-1 w-full rounded-lg border border-line px-3 py-2 text-sm outline-none focus:border-brand-400"
          />
        </label>

        <button
          onClick={() => setShowWeights(!showWeights)}
          className="flex items-center gap-1.5 text-sm font-medium text-brand-600 hover:text-brand-700"
        >
          <ChevronDown size={15} className={showWeights ? 'rotate-180 transition' : 'transition'} />
          Adjust importance (optional — skipping uses the defaults)
        </button>

        {showWeights && (
          <div className="space-y-4 rounded-xl border border-line bg-paper/60 p-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-ink-faint">
                Merit — always scored
              </p>
              <div className="mt-2 space-y-2.5">
                {MERIT.map((m) => (
                  <div key={m.key} className="flex flex-wrap items-center justify-between gap-2">
                    <div className="min-w-0">
                      <p className="text-sm font-medium">{m.label}</p>
                      <p className="text-xs text-ink-faint">{m.hint}</p>
                    </div>
                    <Slider k={m.key} />
                  </div>
                ))}
              </div>
            </div>
            <div className="border-t border-line pt-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-ink-faint">
                Preferences — off unless you add them
              </p>
              <div className="mt-2 space-y-2.5">
                {PREFERENCES.map((p) => (
                  <div key={p.key} className="flex flex-wrap items-center justify-between gap-2">
                    <label className="flex min-w-0 cursor-pointer items-start gap-2">
                      <input
                        type="checkbox"
                        checked={weights[p.key]?.active ?? false}
                        onChange={(e) => setW(p.key, { active: e.target.checked })}
                        className="mt-0.5 accent-brand-500"
                      />
                      <span>
                        <span className="block text-sm font-medium">{p.label}</span>
                        <span className="block max-w-md text-xs text-ink-faint">{p.hint}</span>
                      </span>
                    </label>
                    <Slider k={p.key} disabled={!weights[p.key]?.active} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {error && <p className="text-sm text-red-600">{error}</p>}
        <button
          disabled={busy || jdText.trim().length < 30}
          onClick={async () => {
            setBusy(true)
            setError(null)
            try {
              await onRun({ raw_text: jdText.trim(), hiring_organization: org.trim() || null }, weights)
              onClose()
            } catch (e) {
              setError(e instanceof Error ? e.message : String(e))
            } finally {
              setBusy(false)
            }
          }}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-white hover:bg-ink/85 disabled:opacity-50"
        >
          <Sparkles size={15} className="text-gold-300" />
          {busy ? 'Ranking…' : 'Run ranking'}
        </button>
        {jdText.trim().length > 0 && jdText.trim().length < 30 && (
          <p className="text-center text-xs text-ink-faint">Paste a bit more of the JD (30+ characters).</p>
        )}
      </div>
    </Modal>
  )
}
