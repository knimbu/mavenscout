import { ListChecks, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'

// /match — the ranking flow itself lives where the pool lives: the directory
// modal (ad-hoc, on the filtered pool) and each opening (persisted). This
// route points people to both rather than duplicating the flow.
export default function Match() {
  return (
    <div className="mx-auto max-w-lg px-4 py-20 text-center">
      <Sparkles size={24} className="mx-auto text-gold-500" />
      <h1 className="mt-4 text-3xl font-semibold">Rank by Job Description</h1>
      <p className="mt-3 text-sm leading-relaxed text-ink-soft">
        Paste a job description and get a ranked shortlist with score breakdowns. Run it from
        the <strong>directory</strong> to rank your currently filtered pool, or from inside an{' '}
        <strong>opening</strong> to save the ranking with that role.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-2.5">
        <Link
          to="/"
          className="flex items-center gap-1.5 rounded-full bg-ink px-5 py-2 text-sm font-medium text-white hover:bg-ink/85"
        >
          <Sparkles size={14} className="text-gold-300" /> Rank from the directory
        </Link>
        <Link
          to="/openings"
          className="flex items-center gap-1.5 rounded-full border border-line bg-white px-5 py-2 text-sm font-medium text-ink-soft hover:border-ink-faint"
        >
          <ListChecks size={14} /> My openings
        </Link>
      </div>
    </div>
  )
}
