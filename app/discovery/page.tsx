"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { vocabulary, VocabWord } from "@/lib/data/vocabulary";
import PronunciationButton from "@/components/PronunciationButton";
import { useAppStore } from "@/store/useAppStore";

const categories = ["all", "parts", "verbs", "places", "adjectives", "jobs", "actions", "types"] as const;

export default function DiscoveryPage() {
  const [selectedCat, setSelectedCat] = useState<string>("all");
  const [flipped, setFlipped] = useState<Set<number>>(new Set());
  const [matchMode, setMatchMode] = useState(false);
  const [matchSelected, setMatchSelected] = useState<string[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<string[]>([]);
  const addXP = useAppStore((s) => s.addXP);

  const filtered = selectedCat === "all" ? vocabulary : vocabulary.filter((v) => v.category === selectedCat);

  const toggleFlip = (i: number) => {
    setFlipped((prev) => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });
  };

  // Match game with first 8 words
  const matchWords = vocabulary.slice(0, 8);
  const matchPairs = [...matchWords.map((w) => ({ id: "word-" + w.word, text: w.word })),
                      ...matchWords.map((w) => ({ id: "def-" + w.word, text: w.example }))];

  const [shuffled] = useState(() => [...matchPairs].sort(() => Math.random() - 0.5));

  const handleMatchSelect = (id: string) => {
    if (matchedPairs.includes(id)) return;
    const newSel = [...matchSelected, id];

    if (newSel.length === 2) {
      const [a, b] = newSel;
      const wordA = a.replace(/^(word-|def-)/, "");
      const wordB = b.replace(/^(word-|def-)/, "");
      if (wordA === wordB && a !== b) {
        setMatchedPairs((prev) => [...prev, a, b]);
        addXP(5);
      }
      setTimeout(() => setMatchSelected([]), 600);
    } else {
      setMatchSelected(newSel);
    }
  };

  return (
    <div className="module-page px-4">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-black text-white">🔍 Robot Discovery Lab</h1>
          <p className="text-slate-400 mt-1">Explore robot vocabulary and learn how words sound!</p>
        </div>

        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCat(cat)}
              className={`px-3 py-1.5 rounded-full text-sm font-bold whitespace-nowrap transition-colors ${
                selectedCat === cat
                  ? "bg-blue-600 text-white"
                  : "bg-slate-800 text-slate-400 hover:bg-slate-700"
              }`}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        <div className="flex gap-3 mb-6">
          <button
            onClick={() => setMatchMode(false)}
            className={`px-4 py-2 rounded-xl font-bold text-sm transition-colors ${!matchMode ? "bg-blue-600 text-white" : "bg-slate-800 text-slate-400"}`}
          >
            📚 Flash Cards
          </button>
          <button
            onClick={() => setMatchMode(true)}
            className={`px-4 py-2 rounded-xl font-bold text-sm transition-colors ${matchMode ? "bg-blue-600 text-white" : "bg-slate-800 text-slate-400"}`}
          >
            🎮 Match Game
          </button>
        </div>

        {!matchMode ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {filtered.map((word, i) => (
              <motion.div
                key={word.word}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.02 }}
                onClick={() => toggleFlip(i)}
                className="cursor-pointer h-36"
                style={{ perspective: "600px" }}
              >
                <motion.div
                  animate={{ rotateY: flipped.has(i) ? 180 : 0 }}
                  transition={{ duration: 0.4 }}
                  style={{ transformStyle: "preserve-3d", position: "relative", height: "100%" }}
                >
                  {/* Front */}
                  <div
                    className="absolute inset-0 glass-card p-3 flex flex-col items-center justify-center gap-2"
                    style={{ backfaceVisibility: "hidden" }}
                  >
                    <p className="font-black text-white text-center text-lg">{word.word}</p>
                    <p className="text-xs text-slate-400 font-mono">{word.phonetic}</p>
                    <PronunciationButton word={word.word} example={word.example} />
                  </div>
                  {/* Back */}
                  <div
                    className="absolute inset-0 glass-card p-3 flex flex-col items-center justify-center gap-2 bg-slate-800"
                    style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                  >
                    <span className="text-xs font-bold text-blue-400 uppercase">{word.category}</span>
                    <p className="text-sm text-slate-200 text-center italic">"{word.example}"</p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div>
            <p className="text-slate-400 mb-4 text-sm">Match each word with its example sentence! +5 XP per match 🎯</p>
            {matchedPairs.length === shuffled.length && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mb-6 p-4 rounded-2xl bg-emerald-900/50 border border-emerald-600 text-emerald-300 font-bold text-center"
              >
                🎉 All matched! Amazing work! +{matchWords.length * 5} XP total!
              </motion.div>
            )}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {shuffled.map((item) => {
                const isMatched = matchedPairs.includes(item.id);
                const isSelected = matchSelected.includes(item.id);
                return (
                  <motion.button
                    key={item.id}
                    onClick={() => handleMatchSelect(item.id)}
                    whileTap={{ scale: 0.95 }}
                    className={`p-3 rounded-xl text-sm font-medium text-center transition-all border ${
                      isMatched
                        ? "bg-emerald-700/50 border-emerald-500 text-emerald-200 opacity-60"
                        : isSelected
                        ? "bg-blue-600 border-blue-400 text-white"
                        : "bg-slate-800 border-slate-600 text-slate-300 hover:border-blue-500"
                    }`}
                  >
                    {item.text}
                  </motion.button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
