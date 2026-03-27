import { useState, useEffect, useRef } from "react";

const ATIKLAR = [
  { emoji: "🧴", isim: "Plastik Şişe", dogru: "sari" },
  { emoji: "📦", isim: "Karton Kutu", dogru: "mavi" },
  { emoji: "🍾", isim: "Cam Şişe", dogru: "yesil" },
  { emoji: "📰", isim: "Gazete", dogru: "mavi" },
  { emoji: "🧃", isim: "Meyve Suyu Kutusu", dogru: "mavi" },
  { emoji: "🫙", isim: "Cam Kavanoz", dogru: "yesil" },
  { emoji: "🥤", isim: "Plastik Bardak", dogru: "sari" },
  { emoji: "📫", isim: "Zarf", dogru: "mavi" },
];

const KUTULAR = [
  { id: "mavi", renk: "#1E88E5", isim: "Mavi", emoji: "🔵" },
  { id: "sari", renk: "#FDD835", isim: "Sarı", emoji: "🟡" },
  { id: "yesil", renk: "#43A047", isim: "Yeşil", emoji: "🟢" },
  { id: "siyah", renk: "#424242", isim: "Siyah", emoji: "⚫" },
];

function rastgeleAtik() {
  return ATIKLAR[Math.floor(Math.random() * ATIKLAR.length)];
}

export default function SpeedSort({ onGeri }: { onGeri: () => void }) {
  const [basladi, setBasladi] = useState(false);
  const [bitti, setBitti] = useState(false);
  const [sure, setSure] = useState(60);
  const [skor, setSkor] = useState(0);
  const [combo, setCombo] = useState(0);
  const [mevcutAtik, setMevcutAtik] = useState(rastgeleAtik());
  const [sonuc, setSonuc] = useState<"dogru" | "yanlis" | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (basladi && !bitti) {
      intervalRef.current = setInterval(() => {
        setSure((s) => {
          if (s <= 1) {
            clearInterval(intervalRef.current!);
            setBitti(true);
            return 0;
          }
          return s - 1;
        });
      }, 1000);
    }
    return () => clearInterval(intervalRef.current!);
  }, [basladi, bitti]);

  function kutuSec(kutuid: string) {
    if (!basladi || bitti) return;
    if (kutuid === mevcutAtik.dogru) {
      const yeniCombo = combo + 1;
      setCombo(yeniCombo);
      const puan = yeniCombo >= 3 ? 2 : 1;
      setSkor((s) => s + puan);
      setSonuc("dogru");
    } else {
      setCombo(0);
      setSonuc("yanlis");
    }
    setTimeout(() => {
      setMevcutAtik(rastgeleAtik());
      setSonuc(null);
    }, 400);
  }

  if (bitti) {
    return (
      <div className="p-6 flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <div style={{ fontSize: 64 }}>
          {skor >= 20 ? "🏆" : skor >= 10 ? "⭐" : "💪"}
        </div>
        <h2 className="font-heading text-3xl text-primary">Süre Doldu!</h2>
        <p className="text-xl">{skor} puan</p>
        <p className="text-gray-500 text-center">
          {skor >= 20 ? "İnanılmaz! Hız rekoru kırdın!" :
           skor >= 10 ? "Harika! Çok hızlısın!" :
           "Güzel deneme! Tekrar oynayarak rekor kır!"}
        </p>
        <button
          onClick={onGeri}
          className="mt-4 bg-primary text-white px-8 py-3 rounded-2xl text-lg font-semibold"
        >
          Geri Dön
        </button>
      </div>
    );
  }

  if (!basladi) {
    return (
      <div className="p-6 flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <div style={{ fontSize: 64 }}>⚡</div>
        <h2 className="font-heading text-3xl text-primary">Hızlı Sıralama</h2>
        <p className="text-center text-gray-500">
          60 saniyede doğru kutuya bas!<br />
          3 üst üste doğru = 2x puan 🔥
        </p>
        <button
          onClick={() => setBasladi(true)}
          className="mt-4 bg-primary text-white px-10 py-4 rounded-2xl text-xl font-bold"
        >
          Başla!
        </button>
        <button onClick={onGeri} className="text-gray-400 text-sm">Geri Dön</button>
      </div>
    );
  }

  return (
    <div className="p-4 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <span className="font-heading text-xl text-primary">⚡ Hızlı Sıralama</span>
        <div className="flex gap-3 items-center">
          {combo >= 3 && (
            <span className="text-orange-500 font-bold text-sm animate-bounce">2x COMBO!</span>
          )}
          <span className="font-bold text-gray-700">{skor} puan</span>
          <span className={`font-bold text-lg ${sure <= 10 ? "text-red-500 animate-pulse" : "text-gray-600"}`}>
            ⏱ {sure}s
          </span>
        </div>
      </div>

      <div className={`bg-white rounded-2xl border-4 p-8 flex flex-col items-center transition-all ${sonuc === "dogru" ? "border-green-400" : sonuc === "yanlis" ? "border-red-400" : "border-gray-100"}`}>
        <div style={{ fontSize: 80 }}>{mevcutAtik.emoji}</div>
        <p className="font-heading text-2xl mt-2">{mevcutAtik.isim}</p>
      </div>

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