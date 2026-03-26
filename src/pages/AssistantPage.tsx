import { analyzeWaste } from '../services/claude'

function AssistantPage() {
  // Asistan sayfasi icerigi bu adimda gecici olarak gosterilir.
  const handleApiTest = async () => {
    try {
      const result = await analyzeWaste({
        text: 'plastik su şişesi',
        municipalityContext: 'Kadıköy - BEKEAS sistemi',
      })
      // Gecici API testi sonucu tarayici konsolunda gorulur.
      console.log('API Test Sonucu:', result)
    } catch (error) {
      console.error('API Test Hatasi:', error)
    }
  }

  return (
    <section className="space-y-3 py-2">
      <h2 className="font-heading text-2xl text-text">Asistan</h2>
      <p className="text-sm text-text/80">Yapay zeka asistanı bir sonraki adımlarda eklenecek.</p>
      <button
        type="button"
        onClick={handleApiTest}
        className="min-h-11 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white transition active:scale-95"
      >
        API Test
      </button>
    </section>
  )
}

export default AssistantPage
