import { Info } from 'lucide-react'

/** Small info icon with a hover/focus popover — e.g. the Small/Large Firm
 *  threshold definition (PRD 7.19). */
export function InfoTip({ text }: { text: string }) {
  return (
    <span className="group relative inline-flex" tabIndex={0}>
      <Info size={13} className="text-ink-faint" aria-hidden />
      <span className="sr-only">{text}</span>
      <span className="pointer-events-none absolute bottom-full left-1/2 z-30 mb-1.5 w-52 -translate-x-1/2 rounded-lg bg-ink px-2.5 py-1.5 text-xs font-normal text-white opacity-0 shadow-lg transition group-hover:opacity-100 group-focus:opacity-100">
        {text}
      </span>
    </span>
  )
}
