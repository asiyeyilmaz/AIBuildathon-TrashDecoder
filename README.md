# 🗑️ Trash Decoder

> İstanbul'da hangi çöp hangi kutuya gidiyor? Yaz ya da fotoğrafla — AI söylesin.

**[→ trashdecoder.netlify.app](https://trashdecoder.netlify.app)**

---

## Ne İşe Yarıyor?

İstanbul'da 15 milyondan fazla insan her gün çöp atıyor. Ama "bu peçete mavi kutuya mı gidiyor, siyaha mı?" sorusu hâlâ kafaları karıştırıyor. Yanlış atılan her atık, tüm geri dönüşüm sürecini mahvediyor.

**Trash Decoder** bu sorunu çözüyor:
- 📝 Metinle sor: *"pizza kutusu nereye?"*
- 📸 Fotoğraf çek, AI tanısın
- 📍 Bulunduğun ilçeye göre kişiselleştirilmiş kurallar (Kadıköy ≠ Şişli)
- 🎮 Oyunlarla öğren, rozet kazan

---

## Özellikler

| Özellik | Detay |
|---|---|
| 🤖 AI Analiz | Claude Sonnet ile metin & görsel atık tanıma |
| 📍 Lokasyon | Tarayıcı Geolocation + Nominatim reverse geocoding |
| 🏙️ İlçe Bazlı Kurallar | BEKEAS (Kadıköy/Üsküdar) ve İSTAÇ farkları |
| ⚡ Pre-filter Sistemi | Bilinen atıklar için anında yanıt — API'ye gidilmez |
| 🎮 3 Mini Oyun | SortingGame, QuizGame, SpeedSort |
| 🏆 Profil & Rozetler | Tarama geçmişi, istatistikler, başarımlar |

---

## Teknik Stack

```
React 18 + TypeScript + Vite
Tailwind CSS v3
React Router v6
Anthropic Claude API (claude-sonnet-4-20250514)
Browser Geolocation API + Nominatim
localStorage (geçmiş & skorlar)
Netlify (deploy)
```

---

## Mimari: İki Katmanlı AI Sistemi

Tutarsız AI yanıtlarını önlemek için hibrit bir yapı kuruldu:

```
Kullanıcı sorgusu
       │
       ▼
┌─────────────────┐
│   Pre-filter    │  ← Bilinen edge case'ler (peçete, pil, pizza kutusu...)
│  wasteRules.ts  │    Sabit, tutarlı yanıt döner
└────────┬────────┘
         │ Eşleşme yoksa
         ▼
┌─────────────────┐
│  Claude Sonnet  │  ← Bilinmeyen atıklar için AI analizi
│   API çağrısı   │    Görsel de desteklenir
└─────────────────┘
```

Bu yaklaşım hem API maliyetini düşürüyor hem de tutarsız yanıtları ortadan kaldırıyor.

---

## Kurulum

```bash
git clone https://github.com/asiyeyilmaz/AIBuildathon-TrashDecoder
cd AIBuildathon-TrashDecoder
npm install
```

`.env` dosyası oluştur:
```
VITE_ANTHROPIC_API_KEY=sk-ant-...
```

```bash
npm run dev
```

---

## İlçe Desteği

| İlçe | Şirket | Kahverengi Kutu |
|---|---|---|
| Kadıköy, Üsküdar, Ataşehir... | BEKEAS | ✅ Var |
| Beşiktaş | İSTAÇ | ✅ Var |
| Şişli, Fatih, Bakırköy... | İSTAÇ | ❌ Yok |

---

## Gelecek Planlar

- [ ] Daha fazla İstanbul ilçesi desteği
- [ ] Belediye API entegrasyonu (toplama takvimi)
- [ ] Çok dilli destek (EN / AR)
- [ ] Diğer şehirlere açılım

---

## Geliştirici

**Asiye Yılmaz** — [GitHub](https://github.com/asiyeyilmaz)

*AI Buildathon 2026 için geliştirildi* 🏆

---

<p align="center">
  Doğru kutuya at. Dünyayı kurtarmak bu kadar basit. ♻️
</p>
