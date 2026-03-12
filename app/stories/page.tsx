"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { stories } from "@/lib/data/stories";
import ActivityCard from "@/components/ActivityCard";
import { useAppStore } from "@/store/useAppStore";

export default function StoriesPage() {
  const [storyIdx, setStoryIdx] = useState(0);
  const [quizIdx, setQuizIdx] = useState(0);
  const [mode, setMode] = useState<"read" | "quiz">("read");
  const [reading, setReading] = useState(false);
  const { addXP, student } = useAppStore();

  const story = stories[storyIdx % stories.length];

  const speak = () => {
    if (typeof window === "undefined") return;
    window.speechSynthesis.cancel();
    setReading(true);
    const utter = new SpeechSynthesisUtterance(story.title + ". " + story.text);
    utter.rate = 0.8;
    utter.pitch = 1.1;
    utter.onend = () => setReading(false);
    window.speechSynthesis.speak(utter);
  };

  const stopReading = () => {
    window.speechSynthesis.cancel();
    setReading(false);
  };

  const handleQuizComplete = async (correct: boolean) => {
    if (correct) addXP(10);
    const nextQ = quizIdx + 1;
    if (nextQ >= story.questions.length) {
      if (student) {
        await fetch("/api/activity-results", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ studentId: student.id, activityType: "stories", score: correct ? 10 : 0 }),
        }).catch(() => {});
      }
      setTimeout(() => {
        setMode("read");
        setQuizIdx(0);
      }, 2000);
    } else {
      setTimeout(() => setQuizIdx(nextQ), 1800);
    }
  };

  const nextStory = () => {
    setStoryIdx((i) => i + 1);
    setMode("read");
    setQuizIdx(0);
  };

  return (
    <div className="module-page px-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-black text-white">📚 Robot Story Corner</h1>
          <p className="text-slate-400 mt-1">Read robot stories and answer comprehension questions!</p>
        </div>

        {/* Story selector */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {stories.map((s, i) => (
            <button
              key={s.id}
              onClick={() => { setStoryIdx(i); setMode("read"); setQuizIdx(0); }}
              className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-colors ${
                storyIdx % stories.length === i
                  ? "bg-sky-600 text-white"
                  : "bg-slate-800 text-slate-400 hover:bg-slate-700"
              }`}
            >
              {i + 1}. {s.title}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={storyIdx + mode}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
          >
            {mode === "read" ? (
              <div className="glass-card p-6">
                <h2 className="text-xl font-black text-white mb-4">{story.title}</h2>
                
                <p className="text-slate-200 text-lg leading-relaxed mb-6 font-medium">
                  {story.text}
                </p>

                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={reading ? stopReading : speak}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold transition-colors ${
                      reading
                        ? "bg-red-600 text-white hover:bg-red-500"
                        : "bg-sky-600 text-white hover:bg-sky-500"
                    }`}
                  >
                    {reading ? "⏹ Stop" : "🔊 Read Aloud"}
                  </button>
                  <button
                    onClick={() => setMode("quiz")}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold bg-emerald-600 text-white hover:bg-emerald-500 transition-colors"
                  >
                    ❓ Answer Questions (+10 XP)
                  </button>
                  <button
                    onClick={nextStory}
                    className="px-4 py-2.5 rounded-xl font-bold bg-slate-700 text-white hover:bg-slate-600 transition-colors"
                  >
                    ➡️ Next Story
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div className="glass-card p-4 mb-4 text-sm text-slate-300">
                  <strong className="text-white">📖 Story:</strong> {story.text}
                </div>
                
                <p className="text-slate-400 text-sm mb-3">
                  Question {quizIdx + 1} of {story.questions.length}
                </p>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={quizIdx}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <ActivityCard
                      prompt={story.questions[quizIdx].question}
                      options={story.questions[quizIdx].options}
                      answer={story.questions[quizIdx].answer}
                      onComplete={handleQuizComplete}
                      xpReward={10}
                    />
                  </motion.div>
                </AnimatePresence>

                <button
                  onClick={() => setMode("read")}
                  className="mt-4 text-sm text-slate-500 hover:text-slate-300 transition-colors"
                >
                  ← Back to story
                </button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
