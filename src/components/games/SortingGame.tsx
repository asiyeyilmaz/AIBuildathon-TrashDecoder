import { useState } from "react";

const ATIKLAR = [
  { id: 1, emoji: "🧴", isim: "Plastik Şişe", dogru: "sari", aciklama: "Plastik şişeler sarı kutuya gider." },
  { id: 2, emoji: "📦", isim: "Karton Kutu", dogru: "mavi", aciklama: "Temiz karton mavi kutuya gider." },
  { id: 3, emoji: "🍾", isim: "Cam Şişe", dogru: "yesil", aciklama: "Cam şişeler yeşil kutuya gider." },
  { id: 4, emoji: "🍌", isim: "Muz Kabuğu", dogru: "siyah", aciklama: "Organik atık genel çöpe gider." },
  { id: 5, emoji: "🔋", isim: "Pil", dogru: "siyah", aciklama: "Piller özel toplama noktasına götürülmeli!" },
  { id: 6, emoji: "📰", isim: "Gazete", dogru: "mavi", aciklama: "Gazete ve kağıtlar mavi kutuya gider." },
  { id: 7, emoji: "🛍️", isim: "Naylon Poşet", dogru: "siyah", aciklama: "Naylon poşet geri dönüşüme gitmez." },
  { id: 8, emoji: "💡", isim: "Ampul", dogru: "siyah", aciklama: "Ampuller özel atık, genel çöpe atılır." },
];

const KUTULAR = [
  { id: "mavi", renk: "#1E88E5", isim: "Mavi Kutu", emoji: "🔵" },
  { id: "sari", renk: "#FDD835", isim: "Sarı Kutu", emoji: "🟡" },
  { id: "yesil", renk: "#43A047", isim: "Yeşil Kutu", emoji: "🟢" },
  { id: "siyah", renk: "#424242", isim: "Siyah Kutu", emoji: "⚫" },
];

export default function SortingGame({ onGeri }: { onGeri: () => void }) {
  const [siradaki, setSiradaki] = useState(0);
  const [skor, setSkor] = useState(0);
  const [durum, setDurum] = useState<"bekliyor" | "dogru" | "yanlis">("bekliyor");
  const [aciklama, setAciklama] = useState("");
  const [bitti, setBitti] = useState(false);

  const mevcutAtik = ATIKLAR[siradaki];

  function kutuSec(kutuid: string) {
    if (durum !== "bekliyor") return;
    if (kutuid === mevcutAtik.dogru) {
      setSkor((s) => s + 1);
      setDurum("dogru");
      setAciklama("✅ " + mevcutAtik.aciklama);
    } else {
      setDurum("yanlis");
      setAciklama("❌ " + mevcutAtik.aciklama);
    }
    setTimeout(() => {
      if (siradaki + 1 >= ATIKLAR.length) {
        setBitti(true);
      } else {
        setSiradaki((s) => s + 1);
        setDurum("bekliyor");
        setAciklama("");
      }
    }, 1500);
  }

  if (bitti) {
    return (
      <div className="p-6 flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <div style={{ fontSize: 64 }}>🎉</div>
        <h2 className="font-heading text-3xl text-primary">Tebrikler!</h2>
        <p className="text-xl">{skor} / {ATIKLAR.length} doğru</p>
        <p className="text-gray-500 text-center">
          {skor === ATIKLAR.length ? "Mükemmel! Geri dönüşüm uzmanısın!" :
           skor >= 6 ? "Çok iyi! Biraz daha pratikle mükemmel olacaksın!" :
           "Güzel deneme! Tekrar oynayarak gelişebilirsin!"}
        </p>
        <button onClick={onGeri} className="mt-4 bg-primary text-white px-8 py-3 rounded-2xl text-lg font-semibold">
          Geri Dön
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <button onClick={onGeri} className="text-gray-500 text-2xl">←</button>
        <h2 className="font-heading text-xl text-primary flex-1">Sıralama Oyunu</h2>
        <span className="text-sm font-semibold text-gray-600">{skor}/{ATIKLAR.length}</span>
      </div>

      <div className="text-center py-8 bg-white rounded-2xl border-2 border-gray-100">
        <div style={{ fontSize: 80 }}>{mevcutAtik.emoji}</div>
        <p className="font-heading text-2xl mt-2">{mevcutAtik.isim}</p>
        <p className="text-sm text-gray-400 mt-1">{siradaki + 1} / {ATIKLAR.length}</p>
      </div>

      {aciklama ? (
        <div className={`p-4 rounded-xl text-center font-semibold ${durum === "dogru" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
          {aciklama}
        </div>
      ) : (
        <p className="text-center text-gray-500 text-sm">Hangi kutuya gider?</p>
      )}

      <div className="grid grid-cols-2 gap-3">
        {KUTULAR.map((kutu) => (
          <button
            key={kutu.id}
            onClick={() => kutuSec(kutu.id)}
            className="py-4 rounded-2xl text-white font-bold text-lg active:scale-95 transition-transform"
            style={{ backgroundColor: kutu.renk }}
          >
            {kutu.emoji} {kutu.isim}
          </button>
        ))}
      </div>
    </div>
  );
}