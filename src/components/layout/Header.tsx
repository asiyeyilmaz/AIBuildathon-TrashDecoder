import { useCallback, useState } from 'react'
import { useLocation } from '../../hooks/useLocation'
import LocationBadge from '../location/LocationBadge'
import Toast from '../ui/Toast'

function Header() {
  const { status, district } = useLocation()
  const [toastGosterildi, setToastGosterildi] = useState(false)
  const [toastAktif, setToastAktif] = useState(false)

  const toastMesaji = district
    ? `📍 Konumun ${district} olarak algılandı!`
    : 'Konum algılanamadı, genel kurallar uygulanıyor.'

  useState(() => {
    if (status === 'found' && !toastGosterildi) {
      setToastGosterildi(true)
      setToastAktif(true)
    }
  })

  const kapat = useCallback(() => {
    setToastAktif(false)
  }, [])

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-20 border-b border-primary/15 bg-bg/95 backdrop-blur">
        <div className="mx-auto flex h-16 w-full max-w-md items-center justify-between px-4">
          <h1 className="font-heading text-lg font-semibold text-text">Çöp Kodu Çözücü</h1>
          <LocationBadge />
        </div>
      </header>
      <Toast mesaj={toastMesaji} goster={toastAktif} onKapat={kapat} />
    </>
  )
}

export default Header