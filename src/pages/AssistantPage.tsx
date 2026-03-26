import { useClaudeChat } from '../hooks/useClaudeChat'
import ChatInterface from '../components/assistant/ChatInterface'

function AssistantPage() {
  // Metin tabanli chat ve analiz akisi (gorsel yukleme sonraki adim).
  const { messages, loading, error, sendTextMessage } = useClaudeChat()

  return (
    <section className="py-2">
      <h2 className="mb-3 font-heading text-2xl text-text">Asistan</h2>
      <ChatInterface
        messages={messages}
        loading={loading}
        error={error}
        onSendText={sendTextMessage}
      />
    </section>
  )
}

export default AssistantPage
