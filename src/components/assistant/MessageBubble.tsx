import type { ChatMessage, WasteAnalysisResult } from '../../types'
import BinResult from './BinResult'

interface MessageBubbleProps {
  message: ChatMessage
}

function isAnalysisResult(value: unknown): value is WasteAnalysisResult {
  if (!value || typeof value !== 'object') {
    return false
  }
  return 'binColor' in value && 'binLabel' in value && 'confidence' in value
}

function MessageBubble({ message }: MessageBubbleProps) {
  // Kullanici ve AI mesajlari ayrica goruntulenir.
  const isUser = message.role === 'user'

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[85%] rounded-2xl px-4 py-3 ${
          isUser
            ? 'bg-primary text-white'
            : 'bg-white text-text shadow-sm border border-primary/10'
        }`}
      >
        {message.text ? <p className="text-sm leading-6">{message.text}</p> : null}

        {message.analysis && isAnalysisResult(message.analysis) ? (
          <div className="mt-2">
            <BinResult result={message.analysis} />
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default MessageBubble
