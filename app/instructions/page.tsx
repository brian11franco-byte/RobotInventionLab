"use client";
import { useState, useRef } from "react";
import { motion, Reorder } from "framer-motion";
import { activities } from "@/lib/data/activities";
import { useAppStore } from "@/store/useAppStore";

const instructionActivities = activities.filter((a) => a.type === "instruction" && a.steps);
const writeActivities = activities.filter((a) => a.type === "instruction_write");

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

export default function InstructionsPage() {
  const [tab, setTab] = useState<"order" | "write">("order");
  const [actIdx, setActIdx] = useState(0);
  const [userSteps, setUserSteps] = useState<string[]>(() => shuffle(instructionActivities[0]?.steps ?? []));
  const [checked, setChecked] = useState(false);
  const [writeText, setWriteText] = useState("");
  const [writeSaved, setWriteSaved] = useState(false);
  const { addXP, student } = useAppStore();

  const current = instructionActivities[actIdx % instructionActivities.length];
  const writePrompt = writeActivities[actIdx % writeActivities.length];

  const checkOrder = () => {
    setChecked(true);
    const correct = JSON.stringify(userSteps) === JSON.stringify(current.steps);
    if (correct) addXP(15);
  };

  const nextActivity = () => {
    const next = (actIdx + 1) % instructionActivities.length;
    setActIdx(next);
    setUserSteps(shuffle(instructionActivities[next]?.steps ?? []));
    setChecked(false);
  };

  const isCorrect = checked && JSON.stringify(userSteps) === JSON.stringify(current.steps);

  const saveWriting = async () => {
    if (!writeText.trim()) return;
    setWriteSaved(true);
    addXP(15);
    if (student) {
      await fetch("/api/activity-results", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ studentId: student.id, activityType: "instructions", score: 15 }),
      }).catch(() => {});
    }
  };

  return (
    <div className="module-page px-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-black text-white">📋 Robot Instructions Lab</h1>
          <p className="text-slate-400 mt-1">Sequence steps and write your own robot instructions! +15 XP per activity</p>
        </div>

        <div className="flex gap-2 mb-6">
          {(["order", "write"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-2 rounded-xl font-bold text-sm transition-colors ${
                tab === t ? "bg-rose-600 text-white" : "bg-slate-800 text-slate-400 hover:bg-slate-700"
              }`}
            >
              {t === "order" ? "🔀 Sort Steps" : "✍️ Write Instructions"}
            </button>
          ))}
        </div>

        {tab === "order" && (
          <div>
            <div className="glass-card p-5 mb-4">
              <p className="text-white font-bold mb-1">📝 Put these steps in the correct order!</p>
              <p className="text-slate-400 text-sm mb-4">Drag to reorder the steps.</p>

              <Reorder.Group axis="y" values={userSteps} onReorder={setUserSteps} className="space-y-2">
                {userSteps.map((step, i) => {
                  let stepStyle = "bg-slate-700/60 border-slate-600 text-slate-200";
                  if (checked) {
                    const correctIdx = current.steps!.indexOf(step);
                    stepStyle = correctIdx === i
                      ? "bg-emerald-800/50 border-emerald-500 text-emerald-200"
                      : "bg-red-800/50 border-red-500 text-red-200";
                  }
                  return (
                    <Reorder.Item
                      key={step}
                      value={step}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl border cursor-grab active:cursor-grabbing transition-colors ${stepStyle}`}
                    >
                      <span className="text-lg font-black text-slate-400 w-6">{i + 1}</span>
                      <span className="font-medium">{step}</span>
                      <span className="ml-auto text-slate-500">⠿</span>
                    </Reorder.Item>
                  );
                })}
              </Reorder.Group>

              {checked && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`mt-4 p-3 rounded-xl text-sm font-bold ${
                    isCorrect ? "bg-emerald-900/50 text-emerald-300" : "bg-amber-900/50 text-amber-300"
                  }`}
                >
                  {isCorrect ? "🎉 Perfect order! +15 XP!" : "💡 Not quite! Look at the highlighted steps."}
                </motion.div>
              )}

              {checked && (
                <div className="mt-3">
                  <p className="text-xs text-slate-400 mb-2">✅ Correct order:</p>
                  {current.steps!.map((s, i) => (
                    <p key={i} className="text-sm text-slate-300">
                      <strong>{i + 1}.</strong> {s}
                    </p>
                  ))}
                </div>
              )}
            </div>

            <div className="flex gap-3">
              {!checked ? (
                <button
                  onClick={checkOrder}
                  className="flex-1 py-3 rounded-xl bg-rose-600 text-white font-black hover:bg-rose-500 transition-colors"
                >
                  ✅ Check My Order
                </button>
              ) : (
                <button
                  onClick={nextActivity}
                  className="flex-1 py-3 rounded-xl bg-blue-600 text-white font-black hover:bg-blue-500 transition-colors"
                >
                  ➡️ Next Activity
                </button>
              )}
            </div>
          </div>
        )}

        {tab === "write" && (
          <div className="glass-card p-5">
            <p className="text-white font-bold text-lg mb-1">{writePrompt?.prompt}</p>
            <p className="text-slate-400 text-sm mb-4">Write numbered steps. Example: 1. Turn on robot. 2. Pick up food...</p>

            <textarea
              value={writeText}
              onChange={(e) => setWriteText(e.target.value)}
              rows={8}
              placeholder="1. Turn on the robot.&#10;2. Pick up the food.&#10;3. Walk to the table.&#10;4. Serve the food."
              className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-600 text-white text-sm focus:outline-none focus:border-rose-500 resize-none"
            />

            {writeSaved && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="my-3 p-3 rounded-xl bg-emerald-900/50 border border-emerald-600 text-emerald-300 text-sm font-medium"
              >
                🎉 Great instructions! +15 XP saved!
              </motion.div>
            )}

            <div className="flex gap-3 mt-3">
              <button
                onClick={saveWriting}
                disabled={!writeText.trim() || writeSaved}
                className="flex-1 py-3 rounded-xl bg-rose-600 text-white font-black hover:bg-rose-500 transition-colors disabled:opacity-40"
              >
                {writeSaved ? "✅ Saved! +15 XP" : "💾 Save My Instructions"}
              </button>
              {writeSaved && (
                <button
                  onClick={() => { setWriteText(""); setWriteSaved(false); setActIdx((i) => i + 1); }}
                  className="px-4 py-3 rounded-xl bg-slate-700 text-white font-bold hover:bg-slate-600 transition-colors"
                >
                  Next →
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
