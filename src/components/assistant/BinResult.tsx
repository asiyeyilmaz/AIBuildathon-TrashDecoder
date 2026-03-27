import { useEffect, useState } from 'react'
import type { BinColor, WasteAnalysisResult } from '../../types'
import ConfettiEffect from '../ui/ConfettiEffect'

interface BinVisualMapItem {
  label: string
  color: string
}

const binVisualMap: Record<BinColor, BinVisualMapItem> = {
  mavi: { label: 'Mavi Kutu', color: '#1E88E5' },
  sari: { label: 'Sarı Kutu', color: '#FDD835' },
  yesil: { label: 'Yeşil Kutu', color: '#43A047' },
  siyah: { label: 'Siyah Kutu', color: '#424242' },
  kahve: { label: 'Kahverengi Kutu', color: '#6D4C41' },
}

interface BinResultProps {
  result: WasteAnalysisResult
}

function BinResult({ result }: BinResultProps) {
  const visual = binVisualMap[result.binColor]
  const [confetti, setConfetti] = useState(false)

  useEffect(() => {
    if (result.confidence === 'high') {
      setConfetti(true)
      const t = setTimeout(() => setConfetti(false), 2500)
      return () => clearTimeout(t)
    }
  }, [result])

  return (
    <>
      <ConfettiEffect aktif={confetti} />
      <article className="animate-[slideUp_0.35s_ease-out] rounded-2xl border border-primary/15 bg-white p-4 shadow-sm">
        <div className="mb-3 flex items-center gap-3">
          <div
            className="flex h-14 w-14 items-center justify-center rounded-2xl"
            style={{ backgroundColor: visual.color + '22' }}
          >
            <svg width="36" height="36" viewBox="0 0 24 24" aria-hidden>
              <rect x="6" y="8" width="12" height="12" rx="2" fill={visual.color} />
              <rect x="9" y="4" width="6" height="3" rx="1.5" fill={visual.color} />
              <rect x="8" y="6" width="8" height="2" rx="1" fill={visual.color} />
            </svg>
          </div>
          <div>
            <p className="text-xs text-text/70">{visual.label}</p>
            <h3 className="font-heading text-lg text-text">{result.binLabel}</h3>
            {result.confidence === 'high' && (
              <span className="text-xs font-semibold text-green-600">✓ Yüksek güven</span>
            )}
          </div>
        </div>

        <p className="text-sm leading-6 text-text">{result.instruction}</p>

        {result.warning ? (
          <div className="mt-3 rounded-lg bg-warning/20 px-3 py-2 text-sm text-text">
            ⚠️ {result.warning}
          </div>
        ) : null}

        {result.tip ? (
          <p className="mt-3 text-xs text-text/75">💡 İpucu: {result.tip}</p>
        ) : null}
      </article>
    </>
  )
}

export default BinResult