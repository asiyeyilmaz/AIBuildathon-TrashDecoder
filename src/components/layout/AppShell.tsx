import { Outlet } from 'react-router-dom'
import BottomNav from './BottomNav'
import Header from './Header'

function AppShell() {
  // Uygulama iskeleti: sabit ust/alt alan ve kaydirilabilir icerik bolumu.
  return (
    <div className="mx-auto min-h-screen w-full max-w-md bg-bg text-text">
      <Header />
      <main className="min-h-screen overflow-y-auto px-4 pb-20 pt-20">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  )
}

export default AppShell
