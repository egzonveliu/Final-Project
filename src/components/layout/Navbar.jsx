import { useState, useCallback } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Menu, X, LogOut, LayoutDashboard } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import toast from 'react-hot-toast'

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/projects', label: 'Projects' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { isAuthenticated, user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = useCallback(() => {
    logout()
    toast.success('Logged out successfully')
    navigate('/')
  }, [logout, navigate])

  const toggle = useCallback(() => setOpen(o => !o), [])

  return (
    <nav className="sticky top-0 z-50 bg-dark-900/90 backdrop-blur-md border-b border-white/[0.06]">
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
        <Link to="/" className="font-mono text-sm text-accent tracking-widest">Egzon's Portfolio</Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {links.map(l => (
            <li key={l.to}>
              <NavLink
                to={l.to}
                end
                className={({ isActive }) =>
                  `text-sm tracking-wide transition-colors ${isActive ? 'text-accent' : 'text-white/50 hover:text-white'}`
                }
              >
                {l.label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Auth buttons */}
        <div className="hidden md:flex items-center gap-3">
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="flex items-center gap-2 text-sm text-white/60 hover:text-accent transition-colors">
                <LayoutDashboard size={15} /> Dashboard
              </Link>
              <button onClick={handleLogout} className="flex items-center gap-2 text-sm text-white/40 hover:text-red-400 transition-colors">
                <LogOut size={14} /> Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="btn-primary py-2 px-4 text-xs">Login</Link>
          )}
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden text-white/60 hover:text-white" onClick={toggle} aria-label="Toggle menu">
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-dark-800 border-t border-white/[0.05] px-6 py-4">
          <ul className="flex flex-col gap-4">
            {links.map(l => (
              <li key={l.to}>
                <NavLink to={l.to} end onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `text-sm ${isActive ? 'text-accent' : 'text-white/60'}`
                  }>
                  {l.label}
                </NavLink>
              </li>
            ))}
            {isAuthenticated
              ? <li><Link to="/dashboard" onClick={() => setOpen(false)} className="text-sm text-accent">Dashboard</Link></li>
              : <li><Link to="/login" onClick={() => setOpen(false)} className="text-sm text-accent">Login</Link></li>
            }
          </ul>
        </div>
      )}
    </nav>
  )
}
