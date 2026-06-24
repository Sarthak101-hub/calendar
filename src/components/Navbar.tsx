import { useState, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'

const links = [
  { label: 'Work', to: '/work' },
  { label: 'Tech', to: '/tech' },
  { label: 'Experience', to: '/experience' },
  { label: 'Blog', to: '/blog' },
  { label: 'Life', to: '/life' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const location = useLocation()

  // Close mobile menu on route change
  useEffect(() => { setOpen(false) }, [location.pathname])

  return (
    <>
      {/* Desktop pill hanging from top */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none">
        <div className="pointer-events-auto bg-black rounded-b-2xl md:rounded-b-3xl px-4 py-2 md:px-8 flex items-center gap-3 sm:gap-5 md:gap-9">
          {/* Logo */}
          <NavLink
            to="/"
            className="font-mono text-[11px] sm:text-xs font-medium hidden sm:block"
            style={{ color: '#E1E0CC' }}
          >
            &lt;S/&gt;
          </NavLink>

          {/* Divider - desktop only */}
          <span className="hidden sm:block w-px h-3 bg-primary/20" />

          {/* Nav links */}
          {links.map(l => (
            <NavLink
              key={l.to}
              to={l.to}
              className="hidden sm:block text-[10px] sm:text-xs md:text-sm transition-all duration-200"
              style={({ isActive }) => ({
                color: isActive ? '#E1E0CC' : 'rgba(225,224,204,0.45)',
                fontWeight: isActive ? 500 : 400,
              })}
            >
              {l.label}
            </NavLink>
          ))}

          {/* Mobile hamburger */}
          <button
            className="sm:hidden flex flex-col gap-[4px] p-1"
            onClick={() => setOpen(o => !o)}
            aria-label="menu"
          >
            <span className={`block w-5 h-[1.5px] bg-primary transition-all duration-300 origin-center ${open ? 'rotate-45 translate-y-[5.5px]' : ''}`} />
            <span className={`block w-5 h-[1.5px] bg-primary transition-all duration-300 ${open ? 'opacity-0' : ''}`} />
            <span className={`block w-5 h-[1.5px] bg-primary transition-all duration-300 origin-center ${open ? '-rotate-45 -translate-y-[5.5px]' : ''}`} />
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      <div
        className="fixed inset-0 z-40 sm:hidden flex flex-col justify-center px-8 gap-7 transition-all duration-300"
        style={{
          background: 'rgba(0,0,0,0.97)',
          backdropFilter: 'blur(8px)',
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'auto' : 'none',
        }}
      >
        <NavLink to="/" className="text-3xl font-medium" style={{ color: '#E1E0CC' }}>Home</NavLink>
        {links.map(l => (
          <NavLink
            key={l.to}
            to={l.to}
            className="text-3xl font-medium"
            style={({ isActive }) => ({ color: isActive ? '#E1E0CC' : 'rgba(225,224,204,0.5)' })}
          >
            {l.label}
          </NavLink>
        ))}
      </div>
    </>
  )
}
