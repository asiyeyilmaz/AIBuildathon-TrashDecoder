# 🤖 CURSOR PROMPT — Çöp Kodu Çözücü (Waste Sorting AI Assistant)

---

## ROLE & CONTEXT

You are a senior full-stack developer building a mobile-first React web application called **"Çöp Kodu Çözücü"** — a hyper-local, AI-powered waste sorting assistant for Turkish users, starting with Istanbul. The app is being developed for an AI buildathon. Your code must be production-quality, well-structured, and fully functional.

---

## PROJECT OVERVIEW

**App Name:** Çöp Kodu Çözücü ("Garbage Code Decoder")
**Tagline:** "Sokağındaki çöp kutusunu tanıyan, samimi geri dönüşüm asistanın."
**Target Users:**
- Primary: Students & eco-conscious youth (18–25)
- Secondary: Parents with children (30–45)
- Tertiary: Schools & municipalities (B2B)

**Core Problem:**
Turkish users face "Recycling Anxiety" — they don't know which bin to use. Rules differ by municipality (e.g., Kadıköy vs Beşiktaş), and existing apps use static databases. Users either throw everything in one bin or avoid recycling entirely due to confusion.

**Core Solution:**
An AI chat + image recognition assistant that:
1. Identifies waste items via photo upload or text chat
2. Applies location-specific municipality rules (GPS-based)
3. Educates children through gamified mini-games
4. Uses a warm, friendly "neighborhood friend" tone — NOT robotic

---

## TECH STACK

```
Frontend:    React 18 + Vite + TypeScript
Styling:     Tailwind CSS v3
AI:          Anthropic Claude API (claude-sonnet-4-20250514) — for chat & image analysis
State:       React Context API + useReducer (no Redux)
Routing:     React Router v6
Location:    Browser Geolocation API
Storage:     localStorage (user prefs, scan history)
Icons:       Lucide React
Fonts:       Google Fonts (Nunito for body, Fraunces for headings)
```

> ⚠️ Do NOT use Next.js. Pure React + Vite SPA.
> ⚠️ API key will be injected via `.env` as `VITE_ANTHROPIC_API_KEY`. Never hardcode it.

---

## DESIGN SYSTEM

### Visual Identity
- **Aesthetic:** Warm, friendly, slightly playful — like a well-designed community poster, NOT a corporate app
- **Primary Color:** `#2D6A4F` (deep forest green)
- **Accent:** `#95D5B2` (mint green)
- **Warning/Alert:** `#F4A261` (warm orange, for contamination warnings)
- **Background:** `#F8F5F0` (warm off-white, NOT pure white)
- **Text:** `#1A1A2E` (near-black with a hint of blue)
- **Card backgrounds:** `#FFFFFF` with subtle `box-shadow`

### Typography
- Headings: `Fraunces` (Google Font) — has personality, feels handcrafted
- Body / UI: `Nunito` (Google Font) — rounded, friendly, highly legible
- Never use: Inter, Roboto, Arial, system-ui

### Tone of Voice (AI Persona)
The AI assistant speaks like a knowledgeable but warm neighborhood friend. Examples:
- ✅ "Harika! Bu karton kutu temiz görünüyor, mavi kutuya gidebilir 🎉"
- ✅ "Dikkat! Pizza kutusunun alt kısmı yağlanmış, bu kağıt geri dönüşümü bozuyor. Çöpe atman gerekiyor."
- ❌ "Nesne tespit edildi: Karton. Kategori: Kağıt atık."

---

## APPLICATION STRUCTURE

```
src/
├── components/
│   ├── layout/
│   │   ├── Header.tsx           # App bar with location badge
│   │   └── BottomNav.tsx        # Mobile bottom navigation (4 tabs)
│   ├── assistant/
│   │   ├── ChatInterface.tsx    # Main AI chat window
│   │   ├── MessageBubble.tsx    # Individual message (user/AI)
│   │   ├── ImageUploader.tsx    # Camera/photo upload component
│   │   └── BinResult.tsx        # Visual bin recommendation card
│   ├── location/
│   │   └── LocationBadge.tsx    # Shows current municipality
│   ├── games/
│   │   ├── GameHub.tsx          # Games section entry point
│   │   ├── SortingGame.tsx      # Drag-and-drop sorting game
│   │   ├── QuizGame.tsx         # True/False recycling quiz
│   │   └── SpeedSort.tsx        # Timed speed sorting challenge
│   └── ui/
│       ├── BinCard.tsx          # Reusable bin type display
│       └── ConfettiEffect.tsx   # Celebration animation
├── hooks/
│   ├── useLocation.ts           # Geolocation + municipality detection
│   ├── useClaudeChat.ts         # Claude API integration
│   └── useGameState.ts          # Game score/progress management
├── services/
│   ├── claude.ts                # Anthropic API client
│   └── municipalityRules.ts    # Location-based rule engine
├── data/
│   ├── municipalities.ts        # Istanbul municipality rules dataset
│   └── gameContent.ts           # Quiz questions, game items
├── types/
│   └── index.ts                 # Shared TypeScript interfaces
├── pages/
│   ├── HomePage.tsx             # Landing + quick-start
│   ├── AssistantPage.tsx        # Main AI assistant (chat + scan)
│   ├── GamesPage.tsx            # Children's games hub
│   └── ProfilePage.tsx          # Stats + scan history
└── App.tsx
```

---

## FEATURE SPECIFICATIONS

### 1. AI ASSISTANT (Core Feature)

**File:** `src/services/claude.ts` + `src/hooks/useClaudeChat.ts`

The assistant accepts two input modes:
- **Text:** User types the item name (e.g., "plastik şişe", "pil", "yağlı karton")
- **Image:** User uploads/takes a photo — sent to Claude as base64

**System Prompt for Claude API (inject this dynamically):**
```
Sen Çöp Kodu Çözücü'sün — İstanbul'da yaşayan insanlara geri dönüşüm konusunda yardım eden, samimi ve sıcak bir asistansın. Mahalle arkadaşı gibi konuşursun: bilgili ama resmi değil.

Kullanıcının konumu: {MUNICIPALITY_NAME} ({DISTRICT_NAME})

Bu bölgenin geri dönüşüm kuralları:
{MUNICIPALITY_RULES}

Görevin:
1. Kullanıcının atığını tanımla (metin veya görsel üzerinden)
2. Hangi kutuya gideceğini belirt: MAVİ (kağıt), SARI (plastik/metal), YEŞİL (cam), SİYAH/GRİ (genel çöp), KAHVE (organik/kompost)
3. Varsa ön hazırlık talimatı ver (yıkama, sökme vs.)
4. Eğer o bölgede özel bir kural varsa mutlaka belirt
5. Kısa, net, emojili bir yanıt ver — maksimum 3-4 cümle

Yanıt formatı (JSON):
{
  "binColor": "mavi|sari|yesil|siyah|kahve",
  "binLabel": "Kağıt & Karton",
  "instruction": "Ana talimat buraya",
  "warning": "Varsa uyarı (null olabilir)",
  "tip": "Ekstra ipucu (null olabilir)",
  "confidence": "high|medium|low"
}
```

**BinResult Component** should display:
- Large colored bin icon (use SVG, color-coded)
- Instruction text
- Warning banner (if warning is not null)
- Animated entry (slide-up)

---

### 2. LOCATION ENGINE

**File:** `src/services/municipalityRules.ts`

Create a data structure for Istanbul municipalities. Minimum viable dataset:

```typescript
interface MunicipalityRules {
  id: string;
  name: string;          // "Kadıköy Belediyesi"
  district: string;      // "Kadıköy"
  side: "avrupa" | "anadolu";
  bins: BinType[];
  specialRules: SpecialRule[];
  lastUpdated: string;
}

interface SpecialRule {
  itemKeywords: string[];   // ["pil", "batarya"]
  instruction: string;      // "Market girişlerindeki özel pil kutularına atın"
  binColor: string;
}
```

Seed with at least 6 districts: Kadıköy, Beşiktaş, Üsküdar, Şişli, Fatih, Bakırköy.

**Important rule differences to capture:**
- Some districts have brown organic bins, others don't
- Battery/electronic waste drop-off locations differ
- Tetrapak handling varies (some say blue, some say yellow)
- Avrupa Yakası ISTAÇ vs Anadolu Yakası BEKEAS collection system differences

**Location detection flow:**
1. Request browser geolocation
2. Use `nominatim.openstreetmap.org` reverse geocoding (free, no key needed) to get district name
3. Match district to municipality dataset
4. If no match found, default to generic Istanbul rules
5. Show LocationBadge in header — green if detected, yellow if approximate

---

### 3. CHILDREN'S GAMES SECTION

**Design:** Bright, large-touch-target, highly animated. Suitable for ages 5-12.
Use larger font sizes (min 18px), big buttons, simple language.

#### Game 1: Sıralama Oyunu (Sorting Game)
- Show 8 waste items one by one (with emoji + name)
- 4 bin targets at the bottom (color-coded)
- Drag or tap-to-assign
- Show result animation: ✅ green burst or ❌ shake + explanation
- Score tracked out of 8

#### Game 2: Doğru mu Yanlış mı? (True/False Quiz)
- 10 recycling statements
- Large YES/NO buttons
- Examples:
  - "Yağlı pizza kutusu kağıt kutusuna gider" → YANLIŞ
  - "Cam şişeleri yıkayıp atmalıyız" → DOĞRU
  - "Pil normal çöpe atılabilir" → YANLIŞ
- After each answer: brief explanation

#### Game 3: Hızlı Sıralama (Speed Sort)
- Timer: 60 seconds
- Items fall from top (CSS animation)
- Tap the correct bin color button before item reaches bottom
- Combo multiplier for consecutive correct answers

**Game State:** Track high scores in localStorage. Show achievement badges.

---

### 4. PAGES

#### HomePage
- Hero section: App tagline + animated recycling illustration (SVG)
- "Hızlı Tara" CTA button → goes to AssistantPage
- Location auto-detection with status badge
- 3 quick-tip cards (rotating facts about Istanbul recycling)
- Stats row: "Bugün X tarama yapıldı" (mock data ok)

#### AssistantPage
- Split view toggle: Chat Mode vs Scan Mode
- Chat Mode: Full conversation history, text input
- Scan Mode: Large camera/upload area + instant result
- Floating "Geçmiş" button showing last 5 scans (localStorage)

#### GamesPage
- Game selection cards (3 games)
- Player's high scores shown per game
- Age-appropriate, joyful design with large colorful cards

#### ProfilePage
- Total scans count
- Most common waste types scanned (from localStorage)
- "Rozet" (badge) system: 5 scans, 25 scans, 50 scans milestones
- Share card: "X atık doğru sınıflandırdım!" (shareable image concept)

---

## API INTEGRATION DETAILS

```typescript
// src/services/claude.ts

const CLAUDE_API_URL = "https://api.anthropic.com/v1/messages";

export async function analyzeWaste(params: {
  text?: string;
  imageBase64?: string;
  imageMediaType?: string;
  municipalityContext: string;
}): Promise<WasteAnalysisResult> {
  
  const content = [];
  
  if (params.imageBase64) {
    content.push({
      type: "image",
      source: {
        type: "base64",
        media_type: params.imageMediaType || "image/jpeg",
        data: params.imageBase64
      }
    });
  }
  
  content.push({
    type: "text",
    text: params.text || "Bu görseldeki atık nesnesini analiz et ve hangi çöp kutusuna gitmesi gerektiğini söyle."
  });

  const response = await fetch(CLAUDE_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": import.meta.env.VITE_ANTHROPIC_API_KEY,
      "anthropic-version": "2023-06-01",
      "anthropic-dangerous-direct-browser-access": "true"
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1000,
      system: buildSystemPrompt(params.municipalityContext),
      messages: [{ role: "user", content }]
    })
  });

  // Parse JSON from response text
  const data = await response.json();
  const text = data.content[0].text;
  
  // Extract JSON from response
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (jsonMatch) {
    return JSON.parse(jsonMatch[0]);
  }
  
  throw new Error("Could not parse Claude response");
}
```

---

## COMPONENT BEHAVIOR NOTES

### ImageUploader
- Support both: file picker AND camera capture (`accept="image/*" capture="environment"`)
- Show preview before sending
- Compress images client-side before base64 encoding (max 800px wide, quality 0.8)
- Loading state: animated scanning effect over the image

### ChatInterface
- Message history persisted in component state (not localStorage — fresh per session)
- Auto-scroll to latest message
- Typing indicator (3-dot animation) while waiting for Claude
- Error state: friendly Turkish error message if API fails

### BottomNav
- 4 tabs: 🏠 Ana Sayfa / 🤖 Asistan / 🎮 Oyunlar / 👤 Profil
- Active tab indicator: underline + color fill
- Haptic feedback hint (CSS active state scale)

---

## PERFORMANCE & UX REQUIREMENTS

- App must feel fast on mobile — no layout shifts
- All images should be lazy-loaded
- Skeleton loaders for any async content
- Offline state: show friendly message if no internet, games still work
- PWA-ready: add `manifest.json` and basic service worker for "Add to Home Screen"
- All Turkish text — no English visible to end users except brand names

---

## INITIAL BUILD ORDER (implement in this sequence)

1. **Project setup:** Vite + React + TypeScript + Tailwind + folder structure
2. **Design system:** CSS variables, fonts, global styles
3. **Layout components:** Header, BottomNav, page shell
4. **Municipality data + location hook**
5. **Claude API service**
6. **AssistantPage:** Text chat first, then image upload
7. **BinResult component:** Animated result display
8. **HomePage:** Static content + location badge
9. **Games:** SortingGame first (most impactful), then Quiz, then Speed
10. **ProfilePage:** localStorage stats
11. **Polish:** Animations, error states, empty states, loading skeletons

---

## EXAMPLE DATA FOR TESTING

```typescript
// Test these scenarios:
const testItems = [
  { input: "plastik su şişesi", expected: "sari" },
  { input: "yağlı pizza kutusu", expected: "siyah" },
  { input: "temiz pizza kutusu", expected: "mavi" },
  { input: "cam şişe", expected: "yesil" },
  { input: "pil", expected: "siyah", specialNote: "özel toplama noktası" },
  { input: "muz kabuğu", expected: "kahve" },  // only in districts with organics
  { input: "tetrapak süt kutusu", expected: "mavi" },  // varies by district
  { input: "streç film", expected: "siyah" },
];
```

---

## WHAT SUCCESS LOOKS LIKE

A working demo where:
1. User opens app → location auto-detected → "Kadıköy Belediyesi" shown in header
2. User types "Pizza kutusu" or uploads a photo → Claude responds with bin color + friendly explanation
3. A child taps "Oyunlar" → plays the sorting game → gets confetti on correct answers
4. The visual design feels warm, trustworthy, and distinctly Turkish — not like a generic app template

---

*Generated for Çöp Kodu Çözücü AI Buildathon Project — Istanbul, 2025*
