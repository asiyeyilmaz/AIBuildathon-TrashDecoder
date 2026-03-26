import { useEffect, useMemo, useRef, useState } from 'react'
import type { ChatMessage } from '../../types'
import MessageBubble from './MessageBubble'

interface ChatInterfaceProps {
  messages: ChatMessage[]
  loading: boolean
  error: string | null
  onSendText: (text: string) => Promise<void>
}

function TypingIndicator() {
  return (
    <div className="flex items-center gap-2">
      <div className="h-2 w-2 animate-bounce rounded-full bg-primary [animation-delay:-0.2s]" />
      <div className="h-2 w-2 animate-bounce rounded-full bg-primary [animation-delay:-0.1s]" />
      <div className="h-2 w-2 animate-bounce rounded-full bg-primary" />
      <span className="text-xs text-text/70">Düşünüyorum...</span>
    </div>
  )
}

function ChatInterface({ messages, loading, error, onSendText }: ChatInterfaceProps) {
  // Metin chat gorunumu, mesaj gecmisi ve gonderme islemi.
  const [text, setText] = useState('')
  const listRef = useRef<HTMLDivElement | null>(null)

  const canSend = useMemo(() => !loading && text.trim().length > 0, [loading, text])

  useEffect(() => {
    const el = listRef.current
    if (!el) return
    el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' })
  }, [messages, loading])

  const handleSubmit = async () => {
    const trimmed = text.trim()
    if (!trimmed || loading) {
      return
    }

    setText('')
    await onSendText(trimmed)
  }

  return (
    <section className="flex h-[calc(100svh-8rem)] flex-col gap-3">
      <div
        ref={listRef}
        className="flex-1 overflow-y-auto rounded-2xl border border-primary/10 bg-white/70 p-3 shadow-sm"
      >
        <div className="space-y-3">
          {messages.map((m) => (
            <MessageBubble key={m.id} message={m} />
          ))}
          {loading ? (
            <div className="flex justify-start">
              <div className="max-w-[85%] rounded-2xl bg-white px-4 py-3 shadow-sm border border-primary/10">
                <TypingIndicator />
              </div>
            </div>
          ) : null}
        </div>
      </div>

      {error ? (
        <div className="rounded-xl border border-warning/30 bg-warning/10 px-3 py-2 text-sm text-text">
          {error}
        </div>
      ) : null}

      <div className="flex items-end gap-2">
        <label className="flex-1">
          <span className="sr-only">Mesaj gir</span>
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Atığını yaz (ör. plastik su şişesi)"
            className="min-h-11 w-full rounded-xl border border-primary/15 bg-white px-4 text-sm text-text placeholder:text-text/50 focus:outline-none focus:ring-2 focus:ring-primary/30"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                void handleSubmit()
              }
            }}
          />
        </label>

        <button
          type="button"
          disabled={!canSend}
          onClick={() => void handleSubmit()}
          className="min-h-11 min-w-11 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-white transition active:scale-95 disabled:opacity-50"
        >
          Gönder
        </button>
      </div>
    </section>
  )
}

export default ChatInterface
