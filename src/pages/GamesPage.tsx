import { useState } from "react";
import SortingGame from "../components/games/SortingGame";
import QuizGame from "../components/games/QuizGame";
import SpeedSort from "../components/games/SpeedSort";

type GameType = null | "sorting" | "quiz" | "speed";

const games = [
  {
    id: "sorting" as GameType,
    emoji: "🗂️",
    isim: "Sıralama Oyunu",
    aciklama: "Atıkları doğru kutuya koy!",
    zorluk: "Kolay",
    renk: "bg-green-100 border-green-300",
  },
  {
    id: "quiz" as GameType,
    emoji: "❓",
    isim: "Doğru mu Yanlış mı?",
    aciklama: "Geri dönüşüm bilgini test et!",
    zorluk: "Orta",
    renk: "bg-blue-100 border-blue-300",
  },
  {
    id: "speed" as GameType,
    emoji: "⚡",
    isim: "Hızlı Sıralama",
    aciklama: "60 saniyede kaç puan yaparsın?",
    zorluk: "Zor",
    renk: "bg-orange-100 border-orange-300",
  },
];

export default function GamesPage() {
  const [aktifOyun, setAktifOyun] = useState<GameType>(null);

  if (aktifOyun === "sorting") return <SortingGame onGeri={() => setAktifOyun(null)} />;
  if (aktifOyun === "quiz") return <QuizGame onGeri={() => setAktifOyun(null)} />;
  if (aktifOyun === "speed") return <SpeedSort onGeri={() => setAktifOyun(null)} />;

  return (
    <div className="p-4">
      <h1 className="font-heading text-2xl text-primary mb-1">Oyunlar</h1>
      <p className="text-sm text-gray-500 mb-6">Geri dönüşümü eğlenerek öğren!</p>
      <div className="flex flex-col gap-4">
        {games.map((oyun) => (
          <button
            key={oyun.id}
            onClick={() => setAktifOyun(oyun.id)}
            className={`border-2 rounded-2xl p-5 text-left flex items-center gap-4 ${oyun.renk} active:scale-95 transition-transform`}
          >
            <span style={{ fontSize: 40 }}>{oyun.emoji}</span>
            <div className="flex-1">
              <div className="font-heading text-lg text-gray-800">{oyun.isim}</div>
              <div className="text-sm text-gray-600">{oyun.aciklama}</div>
              <span className="text-xs bg-white/60 px-2 py-0.5 rounded-full mt-1 inline-block">
                {oyun.zorluk}
              </span>
            </div>
            <span className="text-2xl">→</span>
          </button>
        ))}
      </div>
    </div>
  );
}