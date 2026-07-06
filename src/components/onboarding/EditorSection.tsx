import { Check } from 'lucide-react'
import { useState, type ReactNode } from 'react'

/** Editor section card: local-draft children + an explicit Save that reports
 *  success/error inline. Each section saves independently (PRD 7.3 editor). */
export function EditorSection({
  id,
  title,
  description,
  children,
  onSave,
  dirty,
}: {
  id: string
  title: string
  description?: string
  children: ReactNode
  onSave?: () => Promise<string | null>
  dirty?: boolean
}) {
  const [state, setState] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle')
  const [message, setMessage] = useState<string | null>(null)

  return (
    <section id={id} className="scroll-mt-24 rounded-card border border-line bg-white p-5 sm:p-6">
      <h2 className="font-display text-lg font-semibold">{title}</h2>
      {description && <p className="mt-1 text-xs leading-relaxed text-ink-faint">{description}</p>}
      <div className="mt-4">{children}</div>
      {onSave && (
        <div className="mt-5 flex items-center gap-3 border-t border-line pt-4">
          <button
            onClick={async () => {
              setState('saving')
              const err = await onSave()
              setMessage(err)
              setState(err ? 'error' : 'saved')
              if (!err) setTimeout(() => setState('idle'), 2000)
            }}
            disabled={state === 'saving'}
            className="rounded-full bg-brand-500 px-5 py-2 text-sm font-medium text-white hover:bg-brand-600 disabled:opacity-50"
          >
            {state === 'saving' ? 'Saving…' : 'Save section'}
          </button>
          {state === 'saved' && (
            <span className="flex items-center gap-1 text-sm text-emerald-700">
              <Check size={15} /> Saved
            </span>
          )}
          {state === 'error' && <span className="text-sm text-red-600">{message}</span>}
          {dirty && state === 'idle' && (
            <span className="text-xs text-ink-faint">Unsaved changes</span>
          )}
        </div>
      )}
    </section>
  )
}
