"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

type Stats = {
  totalStudents: number;
  leaderboard: { nickname: string; xpPoints: number; grammarLevel: number; activityCount: number }[];
  avgScores: { type: string; avgScore: number; totalActivities: number }[];
};

export default function TeacherPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/teacher/stats")
      .then((r) => r.json())
      .then((d) => { setStats(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="module-page px-4 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-3 animate-spin">⚙️</div>
          <p className="text-slate-400">Loading analytics...</p>
        </div>
      </div>
    );
  }

  const lessonMap = [
    { lesson: 1, topic: "Talking about robots", module: "Discovery Lab", color: "border-blue-500" },
    { lesson: 2, topic: "Present tense verbs", module: "Skills Trainer", color: "border-violet-500" },
    { lesson: 3, topic: "Countable & uncountable nouns", module: "Robot Restaurant", color: "border-orange-500" },
    { lesson: 4, topic: "Writing instructions", module: "Instructions Lab", color: "border-rose-500" },
    { lesson: 5, topic: "Reading comprehension", module: "Story Corner", color: "border-sky-500" },
    { lesson: 6, topic: "Creative expression", module: "Builder Studio & Song Studio", color: "border-fuchsia-500" },
  ];

  return (
    <div className="module-page px-4">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">👩‍🏫</span>
            <div>
              <h1 className="text-3xl font-black text-white">Teacher Analytics Dashboard</h1>
              <p className="text-slate-400 text-sm">Cambridge Global English Stage 3 — Robot Inventor Lab</p>
            </div>
          </div>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Students", value: stats?.totalStudents ?? 0, icon: "👤", color: "text-blue-400" },
            { label: "Top XP", value: stats?.leaderboard[0]?.xpPoints ?? 0, icon: "⚡", color: "text-amber-400" },
            { label: "Activities Done", value: stats?.avgScores.reduce((a, b) => a + b.totalActivities, 0) ?? 0, icon: "✅", color: "text-emerald-400" },
            { label: "Avg Score", value: stats?.avgScores.length
              ? Math.round(stats.avgScores.reduce((a, b) => a + b.avgScore, 0) / stats.avgScores.length) + "%"
              : "—", icon: "📊", color: "text-purple-400" },
          ].map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="glass-card p-4 text-center"
            >
              <div className="text-3xl mb-1">{s.icon}</div>
              <p className={`text-2xl font-black ${s.color}`}>{s.value}</p>
              <p className="text-xs text-slate-400">{s.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          {/* Leaderboard */}
          <div className="glass-card p-5">
            <h3 className="font-black text-white mb-4">🏆 Class XP Leaderboard</h3>
            {!stats?.leaderboard.length ? (
              <p className="text-slate-500 text-sm">No students yet.</p>
            ) : (
              <div className="space-y-2">
                {stats.leaderboard.slice(0, 10).map((s, i) => (
                  <div key={s.nickname} className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-slate-700/40">
                    <span className={`text-lg font-black w-7 text-center ${
                      i === 0 ? "text-amber-400" : i === 1 ? "text-slate-300" : i === 2 ? "text-orange-400" : "text-slate-500"
                    }`}>
                      {i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : i + 1}
                    </span>
                    <span className="flex-1 font-bold text-white text-sm">{s.nickname}</span>
                    <span className="text-xs text-slate-400">L{s.grammarLevel}</span>
                    <span className="text-blue-400 font-bold text-sm">{s.xpPoints} XP</span>
                    <span className="text-xs text-slate-500">{s.activityCount} acts</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Activity scores */}
          <div className="glass-card p-5">
            <h3 className="font-black text-white mb-4">📈 Activity Performance</h3>
            {!stats?.avgScores.length ? (
              <p className="text-slate-500 text-sm">No activity data yet.</p>
            ) : (
              <div className="space-y-3">
                {stats.avgScores.map((act) => (
                  <div key={act.type}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-slate-300 capitalize">{act.type}</span>
                      <span className="text-xs text-slate-400">{act.totalActivities} completed · avg {act.avgScore} pts</span>
                    </div>
                    <div className="h-2.5 bg-slate-700 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-400"
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min(100, act.avgScore)}%` }}
                        transition={{ duration: 0.8 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Lesson mapping */}
        <div className="glass-card p-5">
          <h3 className="font-black text-white mb-4">📚 Cambridge Lesson Mapping</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {lessonMap.map((l) => (
              <div key={l.lesson} className={`p-3 rounded-xl bg-slate-700/40 border-l-4 ${l.color}`}>
                <p className="text-xs text-slate-400 font-bold mb-1">LESSON {l.lesson}</p>
                <p className="text-sm font-bold text-white">{l.topic}</p>
                <p className="text-xs text-slate-400 mt-1">→ {l.module}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
