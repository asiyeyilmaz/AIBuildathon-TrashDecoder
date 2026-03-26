import { useMemo, useState } from 'react'
import { useLocation } from './useLocation'
import { analyzeWaste } from '../services/claude'
import type { ChatMessage } from '../types'

interface UseClaudeChatResult {
  messages: ChatMessage[]
  loading: boolean
  error: string | null
  sendTextMessage: (text: string) => Promise<void>
  sendImageMessage: (imageBase64: string, imageMediaType: string) => Promise<void>
}

function buildMunicipalityContextText(
  district: string,
  municipalityName: string,
  rulesText: string,
): string {
  return `İlçe: ${district}\nBelediye: ${municipalityName}\nKurallar: ${rulesText}`
}

export function useClaudeChat(): UseClaudeChatResult {
  const { municipality, district } = useLocation()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: crypto.randomUUID(),
      role: 'assistant',
      text: 'Merhaba! Atığını yaz, hangi kutuya gideceğini birlikte bulalım.',
    },
  ])

  const municipalityContext = useMemo(() => {
    const binsText = municipality.bins.join(', ')
    const specialRulesText = municipality.specialRules
      .map((rule) => `${rule.itemKeywords.join('/')} => ${rule.instruction}`)
      .join(' | ')
    const rulesText = `Kutu renkleri: ${binsText}. Özel kurallar: ${specialRulesText}`

    return buildMunicipalityContextText(district, municipality.name, rulesText)
  }, [district, municipality.bins, municipality.name, municipality.specialRules])

  const sendTextMessage = async (text: string): Promise<void> => {
    const trimmedText = text.trim()
    if (!trimmedText || loading) {
      return
    }

    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: 'user',
      text: trimmedText,
    }

    setMessages((prev) => [...prev, userMessage])
    setLoading(true)
    setError(null)

    try {
      const analysis = await analyzeWaste({
        text: trimmedText,
        municipalityContext,
      })

      const assistantMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: 'assistant',
        analysis,
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch {
      setError('Üzgünüm, şu an analiz yapamadım. Lütfen tekrar dener misin?')
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: 'assistant',
          text: 'Şu an bağlantıda bir sorun var gibi görünüyor. Birazdan tekrar deneyelim.',
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  const sendImageMessage = async (
    imageBase64: string,
    imageMediaType: string,
  ): Promise<void> => {
    if (!imageBase64 || loading) {
      return
    }

    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: 'user',
      text: 'Fotoğraf gönderildi.',
    }

    setMessages((prev) => [...prev, userMessage])
    setLoading(true)
    setError(null)

    try {
      const analysis = await analyzeWaste({
        text: 'Bu görseldeki atığı analiz et',
        imageBase64,
        imageMediaType,
        municipalityContext,
      })

      const assistantMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: 'assistant',
        analysis,
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch {
      setError('Üzgünüm, şu an görseli analiz edemedim. Lütfen tekrar dener misin?')
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: 'assistant',
          text: 'Şu an bağlantıda bir sorun var gibi görünüyor. Birazdan tekrar deneyelim.',
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  return {
    messages,
    loading,
    error,
    sendTextMessage,
    sendImageMessage,
  }
}
