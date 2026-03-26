import { useLocation } from '../../hooks/useLocation'

function LocationBadge() {
  // Konum algilama durumuna gore rozet icerigi guncellenir.
  const { district, status } = useLocation()

  const statusMap: Record<
    'detecting' | 'found' | 'approximate' | 'error',
    { dotClassName: string; text: string; badgeClassName: string }
  > = {
    detecting: {
      dotClassName: 'bg-primary',
      text: 'Konum algılanıyor...',
      badgeClassName: 'bg-accent/20 text-text',
    },
    found: {
      dotClassName: 'bg-primary',
      text: district,
      badgeClassName: 'bg-accent/20 text-text',
    },
    approximate: {
      dotClassName: 'bg-warning',
      text: `Yaklaşık konum: ${district}`,
      badgeClassName: 'bg-warning/20 text-text',
    },
    error: {
      dotClassName: 'bg-text/40',
      text: 'Konum alınamadı',
      badgeClassName: 'bg-text/10 text-text',
    },
  }

  const currentStatus = statusMap[status]

  return (
    <div
      className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium ${currentStatus.badgeClassName}`}
    >
      <span className={`h-2.5 w-2.5 rounded-full ${currentStatus.dotClassName}`} aria-hidden />
      <span>{currentStatus.text}</span>
    </div>
  )
}

export default LocationBadge
