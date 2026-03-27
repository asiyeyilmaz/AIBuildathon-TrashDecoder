import type { ChatMessage, WasteAnalysisResult } from '../../types'
import BinResult from './BinResult'

interface MessageBubbleProps {
  message: ChatMessage
}

function isAnalysisResult(value: unknown): value is WasteAnalysisResult {
  if (!value || typeof value !== 'object') return false
  return 'binColor' in value && 'binLabel' in value && 'confidence' in value
}

function AssistanAvatar() {
  return (
    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary text-base">
      ♻️
    </div>
  )
}

function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === 'user'

  return (
    <div className={`flex gap-2 ${isUser ? 'justify-end' : 'justify-start items-end'}`}>
      {!isUser && <AssistanAvatar />}

      <div
        className={`max-w-[85%] rounded-2xl px-4 py-3 transition-all ${
          isUser
            ? 'bg-primary text-white'
            : 'border border-primary/10 bg-white text-text shadow-sm'
        }`}
      >
        {message.text ? (
          <p className="text-sm leading-6">{message.text}</p>
        ) : null}

        {message.analysis && isAnalysisResult(message.analysis) ? (
          <div className="mt-2">
            <BinResult result={message.analysis} />
          </div>
        ) : null}
      </div>

      {isUser && (
        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-base">
          👤
        </div>
      )}
    </div>
  )
}

export default MessageBubble