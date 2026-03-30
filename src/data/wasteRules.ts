// src/data/wasteRules.ts
// Claude'a gitmeden önce yakalanan edge case'ler — tutarlı, sabit yanıtlar
 
import type { WasteAnalysisResult } from '../types'
 
interface WasteRule {
  keywords: string[]
  result: WasteAnalysisResult
}
 
export const WASTE_RULES: WasteRule[] = [
  // ─── KAĞIT / MAVİ ───────────────────────────────────────────────
  {
    keywords: ['gazete', 'dergi', 'kitap', 'karton kutu', 'nakliye kutusu', 'koli'],
    result: {
      binColor: 'mavi',
      binLabel: 'Mavi Kutu — Kağıt',
      instruction: 'Düz veya katlanmış şekilde mavi kutuya atabilirsiniz.',
      warning: null,
      tip: 'Islanmış veya yağlanmış kağıtlar geri dönüştürülemez, siyah kutuya atın.',
      confidence: 'high',
    },
  },
 
  // ─── PEÇETE / ISLAK MENDİL — KLASİK İKİLEM ─────────────────────
  {
    keywords: [
      'peçete', 'pecete',
      'kağıt havlu', 'kagit havlu',
      'kağıt mendil', 'kagit mendil',
      'islak mendil', 'ıslak mendil',
      'mendil',
    ],
    result: {
      binColor: 'siyah',
      binLabel: 'Siyah Kutu — Genel Çöp',
      instruction: 'Kullanılmış peçete ve kağıt havlular kirli olduğu için geri dönüştürülemez.',
      warning: 'Islak mendiller plastik elyaf içerir — kesinlikle siyah kutuya atın, asla tuvalete atmayın.',
      tip: 'Hiç kullanılmamış, temiz peçete varsa mavi kutuya atılabilir.',
      confidence: 'high',
    },
  },
 
  // ─── PIZZA KUTUSU / YAĞLI KARTON ────────────────────────────────
  {
    keywords: ['pizza kutusu', 'yağlı karton', 'yagli karton', 'yağlı kağıt', 'yagli kagit'],
    result: {
      binColor: 'siyah',
      binLabel: 'Siyah Kutu — Genel Çöp',
      instruction: 'Yağ lekeli karton ve kağıtlar geri dönüşümü bozar.',
      warning: 'Tüm kutuyu siyaha atmak zorunda değilsiniz!',
      tip: 'Temiz olan üst kapağı koparıp mavi kutuya, yağlı alt kısmı siyah kutuya atabilirsiniz.',
      confidence: 'high',
    },
  },
 
  // ─── PLASTİK / SARI ─────────────────────────────────────────────
  {
    keywords: [
      'pet şişe', 'pet sise', 'plastik şişe', 'plastik sise',
      'plastik ambalaj', 'naylon torba', 'poşet', 'poshet',
      'plastik kap', 'yoğurt kabı', 'yogurt kabi',
      'şampuan şişesi', 'sampuan sisesi',
    ],
    result: {
      binColor: 'sari',
      binLabel: 'Sarı Kutu — Plastik & Metal',
      instruction: 'İçini durulayın, kapağını takın ve sarı kutuya atın.',
      warning: null,
      tip: 'Etiketleri sökmek zorunda değilsiniz, kapağı kapatmak yeterli.',
      confidence: 'high',
    },
  },
 
  // ─── METAL / SARI ────────────────────────────────────────────────
  {
    keywords: [
      'teneke kutu', 'konserve', 'alüminyum', 'aluminyum',
      'metal kutu', 'kutu içecek', 'cola kutusu', 'bira kutusu',
      'folyo', 'alüminyum folyo', 'aluminyum folyo',
    ],
    result: {
      binColor: 'sari',
      binLabel: 'Sarı Kutu — Plastik & Metal',
      instruction: 'Durulayın, hafifçe ezip sarı kutuya atın.',
      warning: null,
      tip: 'Alüminyum folyo topak yapılıp atılabilir — küçük parçalar kaybolmaz.',
      confidence: 'high',
    },
  },
 
  // ─── CAM / YEŞİL ─────────────────────────────────────────────────
  {
    keywords: [
      'cam şişe', 'cam sise', 'cam kavanoz', 'kavanoz', 'cam bardak', 'cam kap',
    ],
    result: {
      binColor: 'yesil',
      binLabel: 'Yeşil Kutu — Cam',
      instruction: 'Durulayıp yeşil kutuya atın. Kapağı varsa çıkarıp sarı kutuya atın.',
      warning: 'Kırık cam parçalarını gazete kağıdına sararak atın — çöp işçilerini koruyun.',
      tip: null,
      confidence: 'high',
    },
  },
 
  // ─── ORGANİK / KAHVE (sadece Kadıköy & Beşiktaş) ────────────────
  {
    keywords: [
      'meyve kabuğu', 'sebze kabuğu', 'yemek artığı', 'yemek artigi',
      'kahve telvesi', 'çay posası', 'cay posasi',
      'yumurta kabuğu', 'yumurta kabugu',
      'ekmek', 'bayat ekmek',
    ],
    result: {
      binColor: 'kahve',
      binLabel: 'Kahverengi Kutu — Organik',
      instruction: 'Organik atıklar kahverengi kutuya atılır — kompost olarak değerlendirilir.',
      warning: 'Kahverengi kutu yalnızca Kadıköy ve Beşiktaş ilçelerinde hizmet vermektedir.',
      tip: 'Kahverengi kutunuz yoksa bu atıkları siyah kutuya atabilirsiniz.',
      confidence: 'high',
    },
  },
 
  // ─── PİL / TEHLİKELİ ATIK ───────────────────────────────────────
  {
    keywords: [
      'pil', 'alkalin pil', 'şarjlı pil', 'sarjli pil',
      'battery', 'aa pil', 'aaa pil',
    ],
    result: {
      binColor: 'siyah',
      binLabel: '⚠️ Tehlikeli Atık — Pil Toplama Noktası',
      instruction: 'Piller hiçbir çöp kutusuna atılmaz! Market ve AVM girişlerindeki pil toplama kutularına götürün.',
      warning: 'Piller toprağı ve suyu kirletir — normal çöpe atmak yasaktır.',
      tip: 'En yakın pil toplama noktası için "atıkbul.gov.tr" adresini ziyaret edin.',
      confidence: 'high',
    },
  },
 
  // ─── ELEKTRONİK ATIK ─────────────────────────────────────────────
  {
    keywords: [
      'telefon', 'eski telefon', 'laptop', 'bilgisayar',
      'tablet', 'şarj aleti', 'sarj aleti', 'kablo', 'elektronik',
      'kulaklık', 'kulaklik',
    ],
    result: {
      binColor: 'siyah',
      binLabel: '⚠️ E-Atık — Elektronik Atık Noktası',
      instruction: 'Elektronik cihazlar e-atık toplama noktalarına götürülmelidir.',
      warning: 'Normal çöpe atmak hem yasaktır hem de çevreye zarar verir.',
      tip: 'Büyük marketlerin (Teknosa, MediaMarkt vb.) girişinde e-atık kutuları bulunur.',
      confidence: 'high',
    },
  },
 
  // ─── İLAÇ ────────────────────────────────────────────────────────
  {
    keywords: ['ilaç', 'ilac', 'hap', 'şurup', 'surup', 'kutu ilaç'],
    result: {
      binColor: 'siyah',
      binLabel: '⚠️ Tehlikeli Atık — Eczane İade',
      instruction: 'Kullanılmamış veya süresi geçmiş ilaçları en yakın eczaneye iade edin.',
      warning: 'İlaçları çöpe veya lavaboya atmayın — su kaynaklarını kirletir.',
      tip: 'Boş ilaç kutuları (karton) mavi kutuya, blister ambalajlar sarı kutuya atılabilir.',
      confidence: 'high',
    },
  },
 
  // ─── BİTKİ / TOPRAK ──────────────────────────────────────────────
  {
    keywords: ['toprak', 'çiçek toprağı', 'cicek topragi', 'bitki', 'dal', 'yaprak', 'budama'],
    result: {
      binColor: 'siyah',
      binLabel: 'Siyah Kutu — Genel Çöp',
      instruction: 'Ev bitkisi toprağı ve küçük dal/yapraklar siyah kutuya atılır.',
      warning: null,
      tip: 'Büyük bahçe atıkları için İBB\'nin yeşil alan hizmetlerini arayabilirsiniz.',
      confidence: 'high',
    },
  },
]
 
/**
 * Kullanıcı sorgusunu kural listesiyle karşılaştırır.
 * Eşleşme varsa sabit sonuç döner, yoksa null döner (Claude'a gönderilir).
 */
export function preFilter(query: string): WasteAnalysisResult | null {
  const normalized = query
    .toLowerCase()
    .trim()
    .replace(/[^a-züöşığçı\s]/g, '') // noktalama temizle
 
  for (const rule of WASTE_RULES) {
    if (rule.keywords.some((kw) => normalized.includes(kw))) {
      return rule.result
    }
  }
 
  return null
}