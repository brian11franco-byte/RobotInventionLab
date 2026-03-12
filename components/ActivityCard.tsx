"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";

const Confetti = dynamic(() => import("react-confetti"), { ssr: false });

type Props = {
  prompt: string;
  options: string[];
  answer: string;
  onCorrect?: () => void;
  onComplete?: (correct: boolean) => void;
  xpReward?: number;
};

export default function ActivityCard({ prompt, options, answer, onCorrect, onComplete, xpReward = 10 }: Props) {
  const [selected, setSelected] = useState<string | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);

  const isCorrect = selected === answer;
  const answered = selected !== null;

  const handleSelect = (opt: string) => {
    if (answered) return;
    setSelected(opt);
    if (opt === answer) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
      onCorrect?.();
    }
    setTimeout(() => onComplete?.(opt === answer), 1500);
  };

  return (
    <div className="relative">
      {showConfetti && <Confetti recycle={false} numberOfPieces={150} gravity={0.3} className="fixed inset-0 pointer-events-none z-50" />}
      
      <div className="bg-slate-800/60 border border-slate-700/50 rounded-2xl p-6 backdrop-blur-sm">
        <p className="text-lg font-semibold text-white mb-6 leading-relaxed">{prompt}</p>
        
        <div className="grid gap-3">
          {options.map((opt) => {
            let style = "bg-slate-700/50 hover:bg-slate-600/50 border-slate-600/50 text-slate-200";
            if (answered && opt === answer) style = "bg-emerald-700/60 border-emerald-500 text-white";
            else if (answered && opt === selected) style = "bg-red-700/60 border-red-500 text-white";
            else if (answered) style = "bg-slate-700/30 border-slate-700/30 text-slate-500";

            return (
              <motion.button
                key={opt}
                onClick={() => handleSelect(opt)}
                whileTap={!answered ? { scale: 0.97 } : undefined}
                className={`w-full px-4 py-3 rounded-xl border text-left font-medium transition-all duration-200 ${style}`}
              >
                {answered && opt === answer && "✅ "}
                {answered && opt === selected && opt !== answer && "❌ "}
                {opt}
              </motion.button>
            );
          })}
        </div>

        <AnimatePresence>
          {answered && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mt-4 p-3 rounded-xl text-sm font-medium ${
                isCorrect ? "bg-emerald-900/50 text-emerald-300" : "bg-red-900/50 text-red-300"
              }`}
            >
              {isCorrect
                ? `🎉 Correct! +${xpReward} XP`
                : `💡 The answer is: "${answer}". Keep trying!`}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
