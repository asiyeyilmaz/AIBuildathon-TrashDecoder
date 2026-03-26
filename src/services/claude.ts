import type { AnalyzeWasteParams, WasteAnalysisResult } from '../types'

const CLAUDE_API_URL = 'https://api.anthropic.com/v1/messages'
const CLAUDE_MODEL = 'claude-sonnet-4-20250514'

export function buildSystemPrompt(municipalityContext: string): string {
  return `
Sen Çöp Kodu Çözücü'sün. İstanbul'da yaşayan insanlara geri dönüşüm konusunda yardım eden, samimi ve sıcak bir asistansın.
Mahalle arkadaşı gibi konuş: bilgili ama resmi değil.

Kullanıcının konum bilgisi ve yerel kurallar:
${municipalityContext}

Görevin:
1. Atığı metin veya görselden tanımla.
2. Doğru kutuyu seç: mavi (kağıt), sari (plastik/metal), yesil (cam), siyah (genel çöp), kahve (organik).
3. Gerekirse kısa hazırlık talimatı ver (yıkama, ayırma vb.).
4. Özel yerel kural varsa mutlaka belirt.
5. Kısa, net ve doğal bir Türkçe kullan.

Sadece geçerli JSON döndür. Açıklama metni ekleme.
JSON şeması:
{
  "binColor": "mavi|sari|yesil|siyah|kahve",
  "binLabel": "string",
  "instruction": "string",
  "warning": "string | null",
  "tip": "string | null",
  "confidence": "high|medium|low"
}
`.trim()
}

function extractJsonObject(rawText: string): WasteAnalysisResult {
  const jsonMatch = rawText.match(/\{[\s\S]*\}/)
  if (!jsonMatch) {
    throw new Error('Claude yanıtı JSON formatında çözülemedi.')
  }

  const parsed = JSON.parse(jsonMatch[0]) as WasteAnalysisResult
  return parsed
}

export async function analyzeWaste(params: AnalyzeWasteParams): Promise<WasteAnalysisResult> {
  const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY
  if (!apiKey) {
    throw new Error('Anthropic API anahtarı bulunamadı.')
  }

  const content: Array<
    | { type: 'text'; text: string }
    | {
        type: 'image'
        source: {
          type: 'base64'
          media_type: string
          data: string
        }
      }
  > = []

  if (params.imageBase64) {
    content.push({
      type: 'image',
      source: {
        type: 'base64',
        media_type: params.imageMediaType ?? 'image/jpeg',
        data: params.imageBase64,
      },
    })
  }

  content.push({
    type: 'text',
    text:
      params.text?.trim() ||
      'Bu görseldeki veya metindeki atığı analiz et ve uygun çöp kutusunu belirt.',
  })

  const response = await fetch(CLAUDE_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true',
    },
    body: JSON.stringify({
      model: CLAUDE_MODEL,
      max_tokens: 1000,
      system: buildSystemPrompt(params.municipalityContext),
      messages: [{ role: 'user', content }],
    }),
  })

  if (!response.ok) {
    throw new Error(`Claude API hatası: ${response.status}`)
  }

  const data = (await response.json()) as {
    content?: Array<{ type: string; text?: string }>
  }

  const textContent = data.content?.find((item) => item.type === 'text')?.text
  if (!textContent) {
    throw new Error('Claude yanıt metni bulunamadı.')
  }

  return extractJsonObject(textContent)
}
