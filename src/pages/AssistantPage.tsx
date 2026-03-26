import { useMemo, useState } from 'react'
import { useClaudeChat } from '../hooks/useClaudeChat'
import BinResult from '../components/assistant/BinResult'
import ChatInterface from '../components/assistant/ChatInterface'
import ImageUploader from '../components/assistant/ImageUploader'

type AssistantMode = 'chat' | 'scan'

function AssistantPage() {
  // Sohbet ve tarama modlari arasinda gecis saglanir.
  const { messages, loading, error, sendTextMessage, sendImageMessage } = useClaudeChat()
  const [mode, setMode] = useState<AssistantMode>('chat')

  const latestAnalysis = useMemo(() => {
    for (let i = messages.length - 1; i >= 0; i--) {
      const msg = messages[i]
      if (msg.analysis) {
        return msg.analysis
      }
    }
    return null
  }, [messages])

  return (
    <section className="py-2">
      <div className="mb-3 flex items-center gap-3">
        <h2 className="font-heading text-2xl text-text">Asistan</h2>
      </div>

      <div className="mb-3 flex rounded-2xl border border-primary/15 bg-white/60 p-1">
        <button
          type="button"
          onClick={() => setMode('chat')}
          className={`min-h-11 flex-1 rounded-xl px-3 text-sm font-semibold transition active:scale-95 ${
            mode === 'chat' ? 'bg-primary text-white' : 'text-text/70'
          }`}
        >
          💬 Sohbet
        </button>
        <button
          type="button"
          onClick={() => setMode('scan')}
          className={`min-h-11 flex-1 rounded-xl px-3 text-sm font-semibold transition active:scale-95 ${
            mode === 'scan' ? 'bg-primary text-white' : 'text-text/70'
          }`}
        >
          📷 Tara
        </button>
      </div>

      {mode === 'chat' ? (
        <ChatInterface
          messages={messages}
          loading={loading}
          error={error}
          onSendText={sendTextMessage}
        />
      ) : (
        <div className="space-y-3">
          <ImageUploader
            isAnalyzing={loading}
            onSendImage={async (imageBase64, imageMediaType) => {
              await sendImageMessage(imageBase64, imageMediaType)
            }}
          />

          {latestAnalysis ? <BinResult result={latestAnalysis} /> : null}

          {error ? (
            <div className="rounded-xl border border-warning/30 bg-warning/10 px-3 py-2 text-sm text-text">
              {error}
            </div>
          ) : null}
        </div>
      )}
    </section>
  )
}

export default AssistantPage
