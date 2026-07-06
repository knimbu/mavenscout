import { Link, useParams } from 'react-router-dom'
import mark from '../assets/mavenscout-mark.svg'
import { ProfileView } from '../components/profile/ProfileView'
import { useProfile } from '../hooks/useProfile'

/** /site/:handle — the same profile rendered as a standalone personal
 *  professional website (PRD 7.2a). No platform chrome; availability,
 *  contracting eligibility, Premium Q&A videos, audio testimonials, and
 *  save actions are stripped entirely. This is the URL a consultant shares
 *  externally and the future custom-domain target. */
export default function SitePage() {
  const { handle } = useParams()
  const { data, notFound, error } = useProfile(handle)

  if (notFound)
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-ink-faint">This site doesn't exist.</p>
      </div>
    )
  if (error)
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-red-600">Couldn't load this site: {error}</p>
      </div>
    )
  if (!data)
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-ink-faint">Loading…</p>
      </div>
    )

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex-1">
        <ProfileView data={data} surface="site" />
      </div>
      <footer className="border-t border-line py-5">
        <Link
          to="/"
          className="mx-auto flex w-fit items-center gap-2 text-xs text-ink-faint hover:text-ink"
        >
          <img src={mark} alt="" className="h-4 w-4" />
          Powered by MavenScout
        </Link>
      </footer>
    </div>
  )
}
