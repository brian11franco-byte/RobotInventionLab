"use client";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { activities } from "@/lib/data/activities";
import ActivityCard from "@/components/ActivityCard";
import { useAppStore } from "@/store/useAppStore";

export default function SkillsPage() {
  const { progress, addXP, student } = useAppStore();
  const level = progress?.grammarLevel ?? 1;
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(0);

  const eligible = useMemo(() =>
    activities.filter((a) =>
      (a.type === "sentence" || a.type === "vocab" || a.type === "comparison" || a.type === "noun") &&
      a.options && a.answer
    ), []);

  const current = eligible[currentIdx % eligible.length];

  const handleComplete = async (correct: boolean) => {
    if (correct) {
      addXP(10);
      setScore((s) => s + 1);
    }
    setCompleted((c) => c + 1);

    if (student) {
      await fetch("/api/activity-results", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ studentId: student.id, activityType: "skills", score: correct ? 10 : 0 }),
      }).catch(() => {});
    }

    setTimeout(() => setCurrentIdx((i) => i + 1), 1800);
  };

  return (
    <div className="module-page px-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-black text-white">⚡ Robot Skills Trainer</h1>
          <p className="text-slate-400 mt-1">Practice grammar and fill in the blanks! +10 XP per correct answer</p>
        </div>

        <div className="flex items-center justify-between mb-6 glass-card p-4">
          <div className="text-center">
            <p className="text-2xl font-black text-blue-400">{score}</p>
            <p className="text-xs text-slate-400">Correct</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-black text-amber-400">{completed}</p>
            <p className="text-xs text-slate-400">Completed</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-black text-emerald-400">L{level}</p>
            <p className="text-xs text-slate-400">Level</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-black text-purple-400">{progress?.xpPoints ?? 0}</p>
            <p className="text-xs text-slate-400">Total XP</p>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentIdx}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.25 }}
          >
            {current?.options && current?.answer && (
              <ActivityCard
                prompt={current.prompt!}
                options={current.options!}
                answer={current.answer!}
                onComplete={handleComplete}
                xpReward={10}
              />
            )}
          </motion.div>
        </AnimatePresence>

        <div className="mt-6 flex justify-between items-center">
          <p className="text-xs text-slate-500">Question {(currentIdx % eligible.length) + 1} of {eligible.length}</p>
          <button
            onClick={() => setCurrentIdx((i) => i + 1)}
            className="text-sm text-slate-400 hover:text-white transition-colors"
          >
            Skip →
          </button>
        </div>
      </div>
    </div>
  );
}
