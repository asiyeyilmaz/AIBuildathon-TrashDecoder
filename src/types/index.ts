export type BinColor = 'mavi' | 'sari' | 'yesil' | 'siyah' | 'kahve'
export type ConfidenceLevel = 'high' | 'medium' | 'low'

export interface WasteAnalysisResult {
  binColor: BinColor
  binLabel: string
  instruction: string
  warning: string | null
  tip: string | null
  confidence: ConfidenceLevel
}

export interface MunicipalityContext {
  municipalityName: string
  districtName: string
  rulesSummary: string
}

export interface AnalyzeWasteParams {
  text?: string
  imageBase64?: string
  imageMediaType?: string
  municipalityContext: string
}

export type ChatRole = 'user' | 'assistant'

export interface ChatMessage {
  id: string
  role: ChatRole
  text?: string
  analysis?: WasteAnalysisResult
}
