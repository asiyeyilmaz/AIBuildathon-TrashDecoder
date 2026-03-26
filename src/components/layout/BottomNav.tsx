import { Gamepad2, Home, MessageCircle, UserRound } from 'lucide-react'
import { NavLink } from 'react-router-dom'

const navItems = [
  { to: '/', label: 'Ana Sayfa', icon: Home },
  { to: '/asistan', label: 'Asistan', icon: MessageCircle },
  { to: '/oyunlar', label: 'Oyunlar', icon: Gamepad2 },
  { to: '/profil', label: 'Profil', icon: UserRound },
]

function BottomNav() {
  // Alt gezinme cubugu ile ana sayfalar arasi gecis saglanir.
  return (
    <nav className="fixed inset-x-0 bottom-0 z-20 border-t border-primary/15 bg-white/95 backdrop-blur">
      <ul className="mx-auto grid h-16 w-full max-w-md grid-cols-4">
        {navItems.map(({ to, label, icon: Icon }) => (
          <li key={to}>
            <NavLink
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `flex h-full min-h-11 w-full flex-col items-center justify-center gap-1 text-[11px] transition active:scale-95 ${
                  isActive ? 'text-primary' : 'text-text/70'
                }`
              }
            >
              <Icon size={18} />
              <span>{label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default BottomNav
