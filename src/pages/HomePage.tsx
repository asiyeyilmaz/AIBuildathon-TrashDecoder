import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import LocationBadge from '../components/location/LocationBadge'

const quickInfoCards = [
  { emoji: '🔵', title: 'Mavi Kutu', description: 'Kağıt & Karton' },
  { emoji: '🟡', title: 'Sarı Kutu', description: 'Plastik & Metal' },
  { emoji: '🟢', title: 'Yeşil Kutu', description: 'Cam' },
]

const tips = [
  'Pizza kutusunun yağlı kısmı çöpe gider',
  'Cam şişeleri yıkayın, kapağını çıkarın',
  'Piller özel toplama noktalarına götürün',
]

function HomePage() {
  // Ana sayfa kahraman alanı ve hızlı yönlendirme kartları.
  const [tipIndex, setTipIndex] = useState(0)

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setTipIndex((prev) => (prev + 1) % tips.length)
    }, 3000)

    return () => {
      window.clearInterval(intervalId)
    }
  }, [])

  return (
    <section className="space-y-5 py-2">
      <article className="rounded-2xl bg-primary p-5 text-white shadow-sm">
        <div className="mb-4 flex items-center justify-between gap-4">
          <div className="space-y-2">
            <h1 className="font-heading text-3xl leading-tight">Çöp Kodu Çözücü</h1>
            <p className="text-sm leading-6 text-white/90">
              Sokağındaki çöp kutusunu tanıyan, samimi geri dönüşüm asistanın.
            </p>
          </div>

          <svg
            className="h-14 w-14 animate-[spin_6s_linear_infinite]"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden
          >
            <path
              d="M20 12a8 8 0 0 1-14.5 4.5M4 12a8 8 0 0 1 14.5-4.5"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path d="M5 18l.5-3.2L8.8 16" stroke="white" strokeWidth="2" strokeLinecap="round" />
            <path d="M19 6l-.5 3.2L15.2 8" stroke="white" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>

        <Link
          to="/asistan"
          className="inline-flex min-h-11 items-center justify-center rounded-xl bg-white px-4 py-2 text-sm font-semibold text-primary transition active:scale-95"
        >
          Hemen Tara
        </Link>
      </article>

      <article className="rounded-2xl border border-primary/10 bg-white p-4 shadow-sm">
        <div className="mb-2">
          <LocationBadge />
        </div>
        <p className="text-sm text-text/80">
          Bulunduğun bölgenin kurallarına göre rehberlik ediyoruz.
        </p>
      </article>

      <article className="space-y-3">
        <h2 className="font-heading text-xl text-text">Hızlı Bilgiler</h2>
        <div className="flex gap-3 overflow-x-auto pb-1">
          {quickInfoCards.map((card) => (
            <Link
              key={card.title}
              to="/asistan"
              className="min-w-[190px] rounded-2xl border border-primary/10 bg-white p-4 shadow-sm transition active:scale-95"
            >
              <p className="text-xl">{card.emoji}</p>
              <p className="mt-1 font-semibold text-text">{card.title}</p>
              <p className="text-sm text-text/75">{card.description}</p>
            </Link>
          ))}
        </div>
      </article>

      <article className="space-y-3">
        <h2 className="font-heading text-xl text-text">Günün İpuçları</h2>
        <div className="space-y-2">
          {tips.map((tip, index) => (
            <div
              key={tip}
              className={`rounded-xl border px-3 py-3 text-sm transition ${
                index === tipIndex
                  ? 'border-primary/20 bg-accent/20 text-text shadow-sm'
                  : 'border-primary/10 bg-white text-text/70'
              }`}
            >
              {tip}
            </div>
          ))}
        </div>
      </article>
    </section>
  )
}

export default HomePage
