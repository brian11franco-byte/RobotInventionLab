"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { activities } from "@/lib/data/activities";
import { useAppStore } from "@/store/useAppStore";

const songActivities = activities.filter((a) => a.type === "song" && a.line_options);

export default function SongsPage() {
  const [selectedLines, setSelectedLines] = useState<Record<number, string>>({});
  const [singing, setSinging] = useState(false);
  const [saved, setSaved] = useState(false);
  const { addXP, student } = useAppStore();

  const toggleLine = (idx: number, line: string) => {
    setSelectedLines((prev) => ({ ...prev, [idx]: line }));
    setSaved(false);
  };

  const songText = songActivities
    .map((a, i) => selectedLines[i] ?? null)
    .filter(Boolean)
    .join("\n");

  const singSong = () => {
    if (!songText) return;
    window.speechSynthesis.cancel();
    setSinging(true);
    const utter = new SpeechSynthesisUtterance(songText);
    utter.rate = 0.75;
    utter.pitch = 1.3;
    utter.onend = () => setSinging(false);
    window.speechSynthesis.speak(utter);
  };

  const stopSinging = () => {
    window.speechSynthesis.cancel();
    setSinging(false);
  };

  const saveSong = async () => {
    const count = Object.keys(selectedLines).length;
    if (count === 0) return;
    setSaved(true);
    addXP(20);
    if (student) {
      await fetch("/api/activity-results", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ studentId: student.id, activityType: "songs", score: 20 }),
      }).catch(() => {});
    }
  };

  const linesCount = Object.keys(selectedLines).length;

  return (
    <div className="module-page px-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-black text-white">🎵 Robot Song Studio</h1>
          <p className="text-slate-400 mt-1">Choose lines to build your own robot song! +20 XP when saved.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Line selector */}
          <div>
            <h3 className="font-bold text-white mb-4">🎶 Choose your song lines:</h3>
            <div className="space-y-4">
              {songActivities.map((act, i) => (
                <div key={act.id} className="glass-card p-4">
                  <p className="text-xs font-bold text-fuchsia-400 mb-2">VERSE {i + 1}</p>
                  <div className="space-y-2">
                    {act.line_options!.map((line) => (
                      <motion.button
                        key={line}
                        onClick={() => toggleLine(i, line)}
                        whileTap={{ scale: 0.97 }}
                        className={`w-full px-3 py-2.5 rounded-xl text-sm font-medium text-left transition-all border ${
                          selectedLines[i] === line
                            ? "bg-fuchsia-700/60 border-fuchsia-500 text-white"
                            : "bg-slate-700/40 border-slate-600 text-slate-300 hover:border-fuchsia-500/50"
                        }`}
                      >
                        {selectedLines[i] === line && "🎵 "}
                        {line}
                      </motion.button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Preview */}
          <div>
            <h3 className="font-bold text-white mb-4">🎤 Your Robot Song:</h3>
            <div className="glass-card p-5 min-h-48">
              {linesCount === 0 ? (
                <p className="text-slate-500 text-sm italic">Choose lines to build your song...</p>
              ) : (
                <div className="space-y-3">
                  {songActivities.map((_, i) => (
                    selectedLines[i] && (
                      <motion.p
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className={`text-base font-semibold ${
                          singing ? "text-fuchsia-300 animate-pulse" : "text-white"
                        }`}
                      >
                        🎵 {selectedLines[i]}
                      </motion.p>
                    )
                  ))}
                </div>
              )}
            </div>

            <div className="flex flex-col gap-3 mt-4">
              <motion.button
                onClick={singing ? stopSinging : singSong}
                disabled={linesCount === 0}
                whileTap={{ scale: 0.97 }}
                className={`w-full py-3 rounded-xl font-black transition-colors ${
                  singing
                    ? "bg-red-600 text-white hover:bg-red-500"
                    : "bg-gradient-to-r from-fuchsia-600 to-pink-500 text-white hover:brightness-110"
                } disabled:opacity-40`}
              >
                {singing ? "⏹ Stop" : "🎤 Sing My Song!"}
              </motion.button>

              <motion.button
                onClick={saveSong}
                disabled={linesCount === 0 || saved}
                whileTap={{ scale: 0.97 }}
                className="w-full py-3 rounded-xl font-black bg-slate-700 text-white hover:bg-slate-600 transition-colors disabled:opacity-40"
              >
                {saved ? "✅ Saved! +20 XP" : "💾 Save My Song"}
              </motion.button>
            </div>

            <AnimatePresence>
              {saved && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-4 rounded-xl bg-fuchsia-900/40 border border-fuchsia-600 text-fuchsia-300 font-bold text-sm text-center"
                >
                  🎉 Amazing song! You earned 20 XP! 🎶
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
