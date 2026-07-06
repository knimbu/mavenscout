import { Clock, Mic, ShieldQuestion, UserRound } from 'lucide-react'
import { Link } from 'react-router-dom'

// /testimonial-info — public explainer linked from the request email template
// and the submission page, so a reference receiving a cold link has credible
// context (PRD 7.6).

const POINTS = [
  {
    icon: ShieldQuestion,
    title: 'What is MavenScout?',
    text: 'A curated marketplace where international development organizations find vetted consultants and firms for short-term expert work. Consultants keep one profile that doubles as their professional website.',
  },
  {
    icon: Mic,
    title: 'Why an audio reference?',
    text: "A spoken reference carries far more signal than a written quote — hiring managers hear a real colleague describe real work in their own voice, before ever scheduling a call. It's the closest thing to a reference call without the scheduling.",
  },
  {
    icon: Clock,
    title: 'What does it involve?',
    text: 'About two minutes. Record a short audio note on your phone or computer, open the link you were sent, fill in who you are, and attach the file. No account, no app.',
  },
  {
    icon: UserRound,
    title: 'What should I say?',
    text: 'Introduce yourself first — name, organization, and how you worked with the person. Then speak plainly: what they did, how the work went, what stood out. Concrete beats glowing.',
  },
]

export default function TestimonialInfo() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-semibold">You've been asked for an audio reference</h1>
      <p className="mt-3 max-w-2xl text-ink-soft">
        Someone you've worked with keeps a professional profile on MavenScout and would like a
        short spoken reference from you. Here's what that means.
      </p>
      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        {POINTS.map((p) => (
          <div key={p.title} className="rounded-card border border-line bg-white p-5">
            <p.icon size={19} className="text-brand-500" />
            <h2 className="mt-2.5 font-display text-base font-semibold">{p.title}</h2>
            <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{p.text}</p>
          </div>
        ))}
      </div>
      <p className="mt-8 text-sm text-ink-faint">
        Ready? Use the personal link from the email you received — it identifies who the
        reference is for. Curious about the platform?{' '}
        <Link to="/about" className="font-medium text-brand-600">
          About MavenScout
        </Link>
        .
      </p>
    </div>
  )
}
