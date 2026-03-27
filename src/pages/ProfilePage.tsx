import { useEffect, useState } from "react";

interface ScanRecord {
  isim: string;
  binColor: string;
  tarih: string;
}

const BIN_RENK: Record<string, { bg: string; label: string }> = {
  mavi: { bg: "#1E88E5", label: "Mavi Kutu" },
  sari: { bg: "#FDD835", label: "Sarı Kutu" },
  yesil: { bg: "#43A047", label: "Yeşil Kutu" },
  siyah: { bg: "#424242", label: "Siyah Kutu" },
  kahve: { bg: "#6D4C41", label: "Kahve Kutu" },
};

const ROZETLER = [
  { emoji: "🌱", isim: "Başlangıç", aciklama: "İlk taramanı yaptın!", gerekli: 1 },
  { emoji: "♻️", isim: "Geri Dönüşümcü", aciklama: "10 tarama tamamladın!", gerekli: 10 },
  { emoji: "🏆", isim: "Uzman", aciklama: "25 tarama tamamladın!", gerekli: 25 },
];

export default function ProfilePage() {
  const [taramaSayisi, setTaramaSayisi] = useState(0);
  const [gecmis, setGecmis] = useState<ScanRecord[]>([]);
  const [oyunSkoru, setOyunSkoru] = useState(0);

  useEffect(() => {
    const history = JSON.parse(localStorage.getItem("scanHistory") || "[]");
    setGecmis(history);
    setTaramaSayisi(history.length);
    const skor = parseInt(localStorage.getItem("toplamOyunSkoru") || "0");
    setOyunSkoru(skor);
  }, []);

  const enCokAtik = () => {
    if (gecmis.length === 0) return "—";
    const sayac: Record<string, number> = {};
    gecmis.forEach((g) => {
      sayac[g.isim] = (sayac[g.isim] || 0) + 1;
    });
    return Object.entries(sayac).sort((a, b) => b[1] - a[1])[0][0];
  };

  return (
    <div className="p-4 flex flex-col gap-6">
      <h1 className="font-heading text-2xl text-primary">Profilim</h1>

      {/* İstatistik Kartları */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { sayi: taramaSayisi, etiket: "Tarama" },
          { sayi: oyunSkoru, etiket: "Oyun Puanı" },
          { sayi: ROZETLER.filter((r) => taramaSayisi >= r.gerekli).length, etiket: "Rozet" },
        ].map((kart, i) => (
          <div key={i} className="bg-white rounded-2xl border border-gray-100 p-3 text-center shadow-sm">
            <p className="font-heading text-2xl text-primary">{kart.sayi}</p>
            <p className="text-xs text-gray-500 mt-1">{kart.etiket}</p>
          </div>
        ))}
      </div>

      {/* En Çok Taranan */}
      {gecmis.length > 0 && (
        <div className="bg-green-50 rounded-2xl p-4 border border-green-100">
          <p className="text-sm text-gray-500">En çok taranan atık</p>
          <p className="font-heading text-lg text-primary mt-1">{enCokAtik()}</p>
        </div>
      )}

      {/* Rozetler */}
      <div>
        <h2 className="font-heading text-lg text-gray-700 mb-3">Rozetlerim</h2>
        <div className="flex flex-col gap-3">
          {ROZETLER.map((rozet) => {
            const kazanildi = taramaSayisi >= rozet.gerekli;
            return (
              <div
                key={rozet.isim}
                className={`flex items-center gap-4 p-4 rounded-2xl border ${kazanildi ? "bg-white border-green-200" : "bg-gray-50 border-gray-100 opacity-50"}`}
              >
                <span style={{ fontSize: 36 }}>{rozet.emoji}</span>
                <div>
                  <p className={`font-semibold ${kazanildi ? "text-gray-800" : "text-gray-400"}`}>
                    {rozet.isim}
                  </p>
                  <p className="text-sm text-gray-400">{rozet.aciklama}</p>
                </div>
                {kazanildi && (
                  <span className="ml-auto text-green-500 font-bold text-sm">✓ Kazanıldı</span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Tarama Geçmişi */}
      <div>
        <h2 className="font-heading text-lg text-gray-700 mb-3">Son Taramalar</h2>
        {gecmis.length === 0 ? (
          <div className="text-center text-gray-400 py-8">
            <p style={{ fontSize: 40 }}>📷</p>
            <p className="mt-2">Henüz tarama yapılmadı</p>
            <p className="text-sm mt-1">Asistan sekmesinden ilk taramanı yap!</p>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {gecmis.slice(-5).reverse().map((kayit, i) => (
              <div key={i} className="flex items-center gap-3 bg-white rounded-xl border border-gray-100 p-3">
                <div
                  className="w-3 h-3 rounded-full flex-shrink-0"
                  style={{ backgroundColor: BIN_RENK[kayit.binColor]?.bg || "#888" }}
                />
                <p className="flex-1 text-gray-700 font-medium">{kayit.isim}</p>
                <p className="text-xs text-gray-400">{kayit.tarih}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}