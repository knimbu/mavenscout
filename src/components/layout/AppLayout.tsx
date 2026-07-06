import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import lockup from '../../assets/mavenscout-lockup-horizontal.svg'
import { useSession } from '../../lib/session'

// Global navigation (PRD §6): logo, Browse, About, prominent "Join MavenScout"
// CTA, Login when logged out. The logged-in user menu (role-appropriate items)
// lands in step 4 with the mocked auth + role switcher — until then a simple
// role chip shows which mocked identity is active.

const ROLE_LABELS: Record<string, string> = {
  hiring_manager: 'Demo Hiring Manager',
  consultant: 'Demo Consultant',
  admin: 'Demo Admin',
}

function NavItems({ onNavigate }: { onNavigate?: () => void }) {
  const linkCls = ({ isActive }: { isActive: boolean }) =>
    `font-medium ${isActive ? 'text-ink' : 'text-ink-soft hover:text-ink'}`
  return (
    <>
      <NavLink to="/" end className={linkCls} onClick={onNavigate}>
        Browse
      </NavLink>
      <NavLink to="/about" className={linkCls} onClick={onNavigate}>
        About
      </NavLink>
    </>
  )
}

export function AppLayout() {
  const { role, isLoggedIn } = useSession()
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b border-line bg-white/85 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
          <Link to="/" aria-label="MavenScout home" className="shrink-0">
            <img src={lockup} alt="MavenScout" className="h-8" />
          </Link>

          {/* Desktop */}
          <nav className="hidden items-center gap-6 text-sm md:flex">
            <NavItems />
            {isLoggedIn ? (
              <span className="rounded-full bg-ink/5 px-3 py-1 text-xs font-medium text-ink-soft">
                {ROLE_LABELS[role]}
              </span>
            ) : (
              <Link to="/login" className="font-medium text-ink-soft hover:text-ink">
                Login
              </Link>
            )}
            <Link
              to="/signup"
              className="rounded-full bg-brand-500 px-4 py-1.5 font-medium text-white hover:bg-brand-600"
            >
              Join MavenScout
            </Link>
          </nav>

          {/* Mobile */}
          <button
            className="rounded-lg p-2 text-ink-soft md:hidden"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {menuOpen && (
          <nav className="flex flex-col gap-4 border-t border-line bg-white px-5 py-4 text-sm md:hidden">
            <NavItems onNavigate={() => setMenuOpen(false)} />
            {isLoggedIn ? (
              <span className="text-xs font-medium text-ink-faint">{ROLE_LABELS[role]}</span>
            ) : (
              <Link
                to="/login"
                className="font-medium text-ink-soft"
                onClick={() => setMenuOpen(false)}
              >
                Login
              </Link>
            )}
            <Link
              to="/signup"
              className="rounded-full bg-brand-500 px-4 py-2 text-center font-medium text-white"
              onClick={() => setMenuOpen(false)}
            >
              Join MavenScout
            </Link>
          </nav>
        )}
      </header>

      <main className="flex-1" key={location.pathname}>
        <Outlet />
      </main>

      <footer className="border-t border-line py-6">
        <p className="mx-auto max-w-7xl px-4 text-xs text-ink-faint">
          © {new Date().getFullYear()} MavenScout — a curated marketplace for international
          development expertise.
        </p>
      </footer>
    </div>
  )
}
