import { useMemo, useRef, useState, type ChangeEvent } from 'react'

interface ImageUploaderProps {
  onSendImage: (imageBase64: string, imageMediaType: string) => Promise<void>
  isAnalyzing: boolean
}

const MAX_WIDTH = 800
const QUALITY = 0.8

function ImageUploader({ onSendImage, isAnalyzing }: ImageUploaderProps) {
  // Kamera/galeri ile goruntü sec, kanvas ile yeniden boyutlandir ve base64'a cevir.
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const disabled = uploading || isAnalyzing

  const overlayText = useMemo(() => {
    if (isAnalyzing || uploading) return 'Analiz ediliyor...'
    return null
  }, [isAnalyzing, uploading])

  const pickFile = () => {
    fileInputRef.current?.click()
  }

  const resizeAndEncode = async (file: File): Promise<{ base64: string; mediaType: string }> => {
    const objectUrl = URL.createObjectURL(file)
    try {
      const img = await new Promise<HTMLImageElement>((resolve, reject) => {
        const el = new Image()
        el.onload = () => resolve(el)
        el.onerror = () => reject(new Error('Görsel yüklenemedi.'))
        el.src = objectUrl
      })

      const originalWidth = img.naturalWidth || img.width
      const originalHeight = img.naturalHeight || img.height

      const scale = originalWidth > MAX_WIDTH ? MAX_WIDTH / originalWidth : 1
      const targetWidth = Math.max(1, Math.round(originalWidth * scale))
      const targetHeight = Math.max(1, Math.round(originalHeight * scale))

      const canvas = document.createElement('canvas')
      canvas.width = targetWidth
      canvas.height = targetHeight

      const ctx = canvas.getContext('2d')
      if (!ctx) {
        throw new Error('Canvas desteği bulunamadı.')
      }

      ctx.drawImage(img, 0, 0, targetWidth, targetHeight)

      const dataUrl = canvas.toDataURL('image/jpeg', QUALITY)
      const base64 = dataUrl.split(',')[1] ?? ''

      return { base64, mediaType: 'image/jpeg' }
    } finally {
      URL.revokeObjectURL(objectUrl)
    }
  }

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      return
    }

    setUploading(true)
    setPreviewUrl(null)

    const objectUrl = URL.createObjectURL(file)

    setPreviewUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev)
      return objectUrl
    })

    try {
      const { base64, mediaType } = await resizeAndEncode(file)
      await onSendImage(base64, mediaType)
    } finally {
      setUploading(false)
      // Prewiev url'ini simdilik koruyoruz (kullanici goruntuyu gorebilsin).
    }
  }

  return (
    <section className="space-y-3">
      <div className="rounded-2xl border border-primary/10 bg-white/70 p-3 shadow-sm">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          className="hidden"
          onChange={(e) => void handleFileChange(e)}
        />

        <div className="relative overflow-hidden rounded-xl border border-primary/10 bg-bg">
          {previewUrl ? (
            <img
              src={previewUrl}
              className="h-[240px] w-full object-cover"
              alt="Görsel önizleme"
            />
          ) : (
            <div className="flex h-[240px] flex-col items-center justify-center gap-2 p-4 text-center">
              <p className="text-sm font-semibold text-text">Fotoğraf seç veya kamerayı aç</p>
              <p className="text-xs text-text/70">Örn: plastik su şişesi, karton kutu, cam şişe</p>
            </div>
          )}

          {overlayText ? (
            <div
              className="absolute inset-0 flex flex-col items-center justify-center gap-3 rounded-xl bg-bg/70 backdrop-blur"
              role="status"
              aria-live="polite"
            >
              <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary/25 border-t-primary" />
              <p className="px-6 text-sm font-semibold text-text">{overlayText}</p>
            </div>
          ) : null}
        </div>

        <div className="mt-3 flex gap-2">
          <button
            type="button"
            onClick={pickFile}
            disabled={disabled}
            className="min-h-11 flex-1 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-white transition active:scale-95 disabled:opacity-50"
          >
            Fotoğraf Yükle
          </button>
        </div>
      </div>
    </section>
  )
}

export default ImageUploader

