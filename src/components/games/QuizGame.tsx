import { useState } from "react";

const SORULAR = [
  { soru: "Yağlı pizza kutusu mavi kutuya gider.", dogru: false, aciklama: "Yağlı karton geri dönüşümü bozur, çöpe atılmalı." },
  { soru: "Cam şişeleri yıkayıp atmalıyız.", dogru: true, aciklama: "Temiz cam daha iyi geri dönüşür." },
  { soru: "Pil normal çöpe atılabilir.", dogru: false, aciklama: "Piller zehirli, özel toplama noktasına götürülmeli!" },
  { soru: "Plastik şişenin kapağını çıkarmalıyız.", dogru: true, aciklama: "Kapak ve şişe farklı plastik türü olabilir." },
  { soru: "Tetrapak süt kutusu mavi kutuya gider.", dogru: true, aciklama: "Tetrapak kağıt bazlı, mavi kutuya gider." },
  { soru: "Naylon poşet geri dönüşüme gider.", dogru: false, aciklama: "Naylon poşet geri dönüşüme kabul edilmez." },
  { soru: "Cam kırıkları yeşil kutuya atılabilir.", dogru: false, aciklama: "Cam kırıkları tehlikeli, özel ambalajla atılmalı." },
  { soru: "Gazete kağıt kutusuna gider.", dogru: true, aciklama: "Gazete mavi kutuya gider." },
  { soru: "Ampul cam kutusuna gider.", dogru: false, aciklama: "Ampul özel atık, genel çöpe atılır." },
  { soru: "Karton kutuları düzleştirip atmalıyız.", dogru: true, aciklama: "Düzleştirmek yer kazandırır ve daha kolay işlenir." },
];

export default function QuizGame({ onGeri }: { onGeri: () => void }) {
  const [siradaki, setSiradaki] = useState(0);
  const [skor, setSkor] = useState(0);
  const [cevap, setCevap] = useState<boolean | null>(null);
  const [bitti, setBitti] = useState(false);

  const mevcutSoru = SORULAR[siradaki];

  function cevapVer(secilen: boolean) {
    if (cevap !== null) return;
    setCevap(secilen);
    if (secilen === mevcutSoru.dogru) setSkor((s) => s + 1);
    setTimeout(() => {
      if (siradaki + 1 >= SORULAR.length) {
        setBitti(true);
      } else {
        setSiradaki((s) => s + 1);
        setCevap(null);
      }
    }, 1800);
  }

  if (bitti) {
    return (
      <div className="p-6 flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <div style={{ fontSize: 64 }}>
          {skor >= 8 ? "🏆" : skor >= 6 ? "⭐" : "📚"}
        </div>
        <h2 className="font-heading text-3xl text-primary">Quiz Bitti!</h2>
        <p className="text-xl">{skor} / {SORULAR.length} doğru</p>
        <p className="text-gray-500 text-center">
          {skor >= 8 ? "Harika! Geri dönüşüm şampiyonusun!" :
           skor >= 6 ? "İyi iş! Biraz daha pratikle uzman olacaksın!" :
           "Tekrar dene, her seferinde daha iyi olacaksın!"}
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
        <h2 className="font-heading text-xl text-primary flex-1">Doğru mu Yanlış mı?</h2>
        <span className="text-sm font-semibold text-gray-600">{skor}/{SORULAR.length}</span>
      </div>

      <div className="bg-white rounded-2xl border-2 border-gray-100 p-6 min-h-[160px] flex flex-col justify-center">
        <p className="text-sm text-gray-400 mb-3">{siradaki + 1} / {SORULAR.length}</p>
        <p className="font-heading text-xl text-gray-800 leading-snug">{mevcutSoru.soru}</p>
      </div>

      {cevap !== null && (
        <div className={`p-4 rounded-xl text-center font-semibold ${cevap === mevcutSoru.dogru ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
          {cevap === mevcutSoru.dogru ? "✅ Doğru! " : "❌ Yanlış! "}
          {mevcutSoru.aciklama}
        </div>
      )}

      <div className="grid grid-cols-2 gap-4 mt-2">
        <button
          onClick={() => cevapVer(true)}
          disabled={cevap !== null}
          className="py-5 rounded-2xl bg-green-500 text-white font-bold text-xl active:scale-95 transition-transform disabled:opacity-50"
        >
          ✅ Doğru
        </button>
        <button
          onClick={() => cevapVer(false)}
          disabled={cevap !== null}
          className="py-5 rounded-2xl bg-red-500 text-white font-bold text-xl active:scale-95 transition-transform disabled:opacity-50"
        >
          ❌ Yanlış
        </button>
      </div>
    </div>
  );
}