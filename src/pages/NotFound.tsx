import { Link } from 'react-router-dom'
import mark from '../assets/mavenscout-mark.svg'

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center px-4 py-24 text-center">
      <img src={mark} alt="" className="h-10 w-10 opacity-40" />
      <h1 className="mt-5 text-3xl font-semibold">Page not found</h1>
      <p className="mt-2 text-sm text-ink-soft">
        This page doesn't exist — or a shared link you followed has been revoked by its owner.
      </p>
      <div className="mt-6 flex gap-2.5">
        <Link
          to="/"
          className="rounded-full bg-brand-500 px-5 py-2 text-sm font-medium text-white hover:bg-brand-600"
        >
          Browse experts
        </Link>
        <Link
          to="/about"
          className="rounded-full border border-line bg-white px-5 py-2 text-sm font-medium text-ink-soft hover:border-ink-faint"
        >
          About MavenScout
        </Link>
      </div>
    </div>
  )
}
