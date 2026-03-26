import type { BinColor, WasteAnalysisResult } from '../../types'

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
  // Analiz sonucunu kutu rengi ve talimatla kart olarak gosterir.
  const visual = binVisualMap[result.binColor]

  return (
    <article className="animate-[slideUp_0.35s_ease-out] rounded-2xl border border-primary/15 bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-center gap-3">
        <svg width="46" height="46" viewBox="0 0 24 24" aria-hidden>
          <rect x="6" y="8" width="12" height="12" rx="2" fill={visual.color} />
          <rect x="9" y="4" width="6" height="3" rx="1.5" fill={visual.color} />
          <rect x="8" y="6" width="8" height="2" rx="1" fill={visual.color} />
        </svg>
        <div>
          <p className="text-xs text-text/70">{visual.label}</p>
          <h3 className="font-heading text-lg text-text">{result.binLabel}</h3>
        </div>
      </div>

      <p className="text-sm leading-6 text-text">{result.instruction}</p>

      {result.warning ? (
        <div className="mt-3 rounded-lg bg-warning/20 px-3 py-2 text-sm text-text">{result.warning}</div>
      ) : null}

      {result.tip ? <p className="mt-3 text-xs text-text/75">İpucu: {result.tip}</p> : null}
    </article>
  )
}

export default BinResult
