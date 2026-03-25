# ♻️ Çöp Kodu Çözücü (Trash Decoder)

**"Neyi, Nereye Atıyorum?"** belirsizliğini ortadan kaldıran, Gemini AI destekli, konum duyarlı atık yönetim asistanı.

## 📌 Vizyon
Geri dönüşüm sürecindeki kafa karışıklığını ve "yanlış atma kaygısını" yapay zeka ile çözerek, atık ayrıştırmayı mahalle ve belediye kurallarına göre kişiselleştirmek.

## ⚠️ Problem Tanımı
* **Kullanıcı Belirsizliği:** Yağlı pizza kutuları, Tetrapak ambalajlar veya kompozit materyallerin hangi kutuya gideceği konusundaki bilgi eksikliği.
* **Coğrafi Farklılıklar:** Atık kurallarının belediyeden belediyeye (örn. İstanbul Avrupa vs. Anadolu yakası) değişmesi.
* **Statik Çözümlerin Yetersizliği:** Mevcut uygulamaların yerel ve güncel kuralları takip edememesi.

## 💡 Yapay Zeka Çözümü (Gemini API)
Bu proje, karmaşık veri setleri eğitmek yerine **Gemini API**'nin multimodal (görsel + metin) yeteneklerini kullanır:

1.  **Nesne Tanıma:** Kullanıcı fotoğrafı çeker; Gemini nesnenin materyalini ve durumunu (temiz/kirli/yağlı) analiz eder.
2.  **Konum Bazlı Dinamik Karar:** Uygulama, kullanıcının konumunu (GPS) alarak o bölgedeki belediyenin güncel atık yönetmeliğini Gemini'a "bağlam" (context) olarak sunar.
3.  **Akıllı Yönlendirme:** Gemini, "Bu bir pizza kutusu ama yağlı olduğu için Kadıköy Belediyesi kurallarına göre kağıt yerine evsel atığa gitmeli" gibi açıklayıcı yanıtlar verir.

## 🚀 Neden Farklı?
* **Eğitim Seti Gerektirmez:** Gemini API sayesinde en güncel nesne tanıma teknolojisini kullanır.
* **Dinamik Kurallar:** Sabit bir veritabanı yerine, yerel yönetimlerin güncel verilerini (RAG yapısı ile) işler.
* **Eğitici Deneyim:** Sadece yönlendirmekle kalmaz, kullanıcıya "nedenini" açıklar.

## 🛠️ Teknik Mimari
* **Model:** Gemini 1.5 Flash (Hızlı ve maliyet etkin görsel analiz için).
* **Frontend:** Flutter / React Native (Mobil öncelikli).
* **Backend:** Node.js / Python (Konum verisini kural setleriyle eşleştirmek için).
* **Veri:** Yerel yönetimlerin açık veri portallarından veya web sitelerinden alınan güncel atık rehberleri.

---
*Bu proje, sürdürülebilir bir gelecek için bireysel hataları minimize etmeyi hedefler.*
