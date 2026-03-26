import LocationBadge from '../location/LocationBadge'

function Header() {
  // Ust kisimda marka ve konum bilgisini gosteren sabit alan.
  return (
    <header className="fixed inset-x-0 top-0 z-20 border-b border-primary/15 bg-bg/95 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-md items-center justify-between px-4">
        <h1 className="font-heading text-lg font-semibold text-text">Çöp Kodu Çözücü</h1>
        <LocationBadge />
      </div>
    </header>
  )
}

export default Header
