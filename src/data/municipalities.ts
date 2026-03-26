export type BinColor = 'mavi' | 'sari' | 'yesil' | 'siyah' | 'kahve'
export type CitySide = 'avrupa' | 'anadolu'

export interface SpecialRule {
  itemKeywords: string[]
  instruction: string
  binColor: BinColor | 'ozel_nokta'
}

export interface MunicipalityRules {
  id: string
  name: string
  district: string
  side: CitySide
  collectionSystem: 'ISTAC' | 'BEKEAS'
  bins: BinColor[]
  specialRules: SpecialRule[]
  lastUpdated: string
}

export const genericIstanbulRules: MunicipalityRules = {
  id: 'istanbul-genel',
  name: 'İstanbul Büyükşehir Belediyesi',
  district: 'İstanbul',
  side: 'avrupa',
  collectionSystem: 'ISTAC',
  bins: ['mavi', 'sari', 'yesil', 'siyah'],
  specialRules: [
    {
      itemKeywords: ['pil', 'batarya'],
      instruction: 'Pil ve bataryaları market veya belediye önlerindeki özel kutulara bırak.',
      binColor: 'ozel_nokta',
    },
    {
      itemKeywords: ['tetrapak', 'süt kutusu', 'meyve suyu kutusu'],
      instruction: 'Tetrapak kutuları temizleyip mavi kutuya at.',
      binColor: 'mavi',
    },
  ],
  lastUpdated: '2026-03-26',
}

export const municipalities: MunicipalityRules[] = [
  {
    id: 'kadikoy',
    name: 'Kadıköy Belediyesi',
    district: 'Kadıköy',
    side: 'anadolu',
    collectionSystem: 'BEKEAS',
    bins: ['mavi', 'sari', 'yesil', 'siyah', 'kahve'],
    specialRules: [
      {
        itemKeywords: ['pil', 'batarya'],
        instruction: 'Pil ve bataryaları mahalle atık getirme merkezine veya anlaşmalı market kutularına bırak.',
        binColor: 'ozel_nokta',
      },
      {
        itemKeywords: ['tetrapak', 'süt kutusu', 'meyve suyu kutusu'],
        instruction: 'Tetrapak ambalajları durulayıp mavi kutuya at.',
        binColor: 'mavi',
      },
    ],
    lastUpdated: '2026-03-26',
  },
  {
    id: 'uskudar',
    name: 'Üsküdar Belediyesi',
    district: 'Üsküdar',
    side: 'anadolu',
    collectionSystem: 'BEKEAS',
    bins: ['mavi', 'sari', 'yesil', 'siyah'],
    specialRules: [
      {
        itemKeywords: ['pil', 'batarya', 'elektronik'],
        instruction: 'Pil ve küçük elektronik atıkları ilçe toplama noktalarına teslim et.',
        binColor: 'ozel_nokta',
      },
      {
        itemKeywords: ['tetrapak', 'süt kutusu', 'meyve suyu kutusu'],
        instruction: 'Tetrapak atıkları temizleyip sarı kutuya at.',
        binColor: 'sari',
      },
    ],
    lastUpdated: '2026-03-26',
  },
  {
    id: 'besiktas',
    name: 'Beşiktaş Belediyesi',
    district: 'Beşiktaş',
    side: 'avrupa',
    collectionSystem: 'ISTAC',
    bins: ['mavi', 'sari', 'yesil', 'siyah', 'kahve'],
    specialRules: [
      {
        itemKeywords: ['pil', 'batarya'],
        instruction: 'Pil atıklarını belediye hizmet binaları ve zincir market kutularına bırak.',
        binColor: 'ozel_nokta',
      },
      {
        itemKeywords: ['tetrapak', 'süt kutusu', 'meyve suyu kutusu'],
        instruction: 'Tetrapak kutuları temizse mavi kutuya yönlendir.',
        binColor: 'mavi',
      },
    ],
    lastUpdated: '2026-03-26',
  },
  {
    id: 'sisli',
    name: 'Şişli Belediyesi',
    district: 'Şişli',
    side: 'avrupa',
    collectionSystem: 'ISTAC',
    bins: ['mavi', 'sari', 'yesil', 'siyah'],
    specialRules: [
      {
        itemKeywords: ['pil', 'batarya', 'elektronik'],
        instruction: 'Pil ve elektronik atıkları ilçe atık getirme merkezine bırak.',
        binColor: 'ozel_nokta',
      },
      {
        itemKeywords: ['tetrapak', 'süt kutusu', 'meyve suyu kutusu'],
        instruction: 'Tetrapak ambalajları temizleyip sarı kutuya at.',
        binColor: 'sari',
      },
    ],
    lastUpdated: '2026-03-26',
  },
  {
    id: 'fatih',
    name: 'Fatih Belediyesi',
    district: 'Fatih',
    side: 'avrupa',
    collectionSystem: 'ISTAC',
    bins: ['mavi', 'sari', 'yesil', 'siyah'],
    specialRules: [
      {
        itemKeywords: ['pil', 'batarya'],
        instruction: 'Pil atıklarını belediyenin belirlediği toplama noktalarına teslim et.',
        binColor: 'ozel_nokta',
      },
      {
        itemKeywords: ['tetrapak', 'süt kutusu', 'meyve suyu kutusu'],
        instruction: 'Tetrapak kutularını temizleyip sarı kutuya at.',
        binColor: 'sari',
      },
    ],
    lastUpdated: '2026-03-26',
  },
  {
    id: 'bakirkoy',
    name: 'Bakırköy Belediyesi',
    district: 'Bakırköy',
    side: 'avrupa',
    collectionSystem: 'ISTAC',
    bins: ['mavi', 'sari', 'yesil', 'siyah'],
    specialRules: [
      {
        itemKeywords: ['pil', 'batarya', 'elektronik'],
        instruction: 'Pil ve e-atıkları lisanslı toplama merkezlerine bırak.',
        binColor: 'ozel_nokta',
      },
      {
        itemKeywords: ['tetrapak', 'süt kutusu', 'meyve suyu kutusu'],
        instruction: 'Tetrapak atıkları temizleyip mavi kutuya at.',
        binColor: 'mavi',
      },
    ],
    lastUpdated: '2026-03-26',
  },
]

function normalizeDistrict(value: string): string {
  return value
    .toLocaleLowerCase('tr-TR')
    .replaceAll('ı', 'i')
    .replaceAll('ğ', 'g')
    .replaceAll('ü', 'u')
    .replaceAll('ş', 's')
    .replaceAll('ö', 'o')
    .replaceAll('ç', 'c')
    .trim()
}

export function getMunicipalityByDistrict(district: string): MunicipalityRules | null {
  const normalizedDistrict = normalizeDistrict(district)
  const match = municipalities.find(
    (municipality) => normalizeDistrict(municipality.district) === normalizedDistrict,
  )

  return match ?? null
}
