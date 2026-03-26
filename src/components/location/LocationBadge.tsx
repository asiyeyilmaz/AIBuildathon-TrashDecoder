function LocationBadge() {
  // Konum durumu gecici rozet bileseni.
  return (
    <div className="inline-flex items-center gap-2 rounded-full bg-accent/20 px-3 py-1 text-xs font-medium text-text">
      <span className="h-2.5 w-2.5 rounded-full bg-primary" aria-hidden />
      <span>Konum algılanıyor...</span>
    </div>
  )
}

export default LocationBadge
