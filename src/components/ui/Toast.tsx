import { useEffect, useState } from 'react'

interface ToastProps {
  mesaj: string
  goster: boolean
  onKapat: () => void
}

export default function Toast({ mesaj, goster, onKapat }: ToastProps) {
  const [görünür, setGörünür] = useState(false)

  useEffect(() => {
    if (goster) {
      setGörünür(true)
      const t = setTimeout(() => {
        setGörünür(false)
        setTimeout(onKapat, 300)
      }, 3000)
      return () => clearTimeout(t)
    }
  }, [goster, onKapat])

  if (!goster) return null

  return (
    <div
      className={`fixed bottom-24 left-1/2 z-50 -translate-x-1/2 transition-all duration-300 ${
        görünür ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
    >
      <div className="flex items-center gap-2 rounded-2xl bg-primary px-4 py-3 text-white shadow-lg">
        <span className="text-lg">📍</span>
        <p className="text-sm font-semibold">{mesaj}</p>
      </div>
    </div>
  )
}