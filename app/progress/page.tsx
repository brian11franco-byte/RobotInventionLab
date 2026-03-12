"use client";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useAppStore } from "@/store/useAppStore";
import Link from "next/link";

export default function ProgressPage() {
  const { student, progress } = useAppStore();

  if (!student || !progress) {
    return (
      <div className="module-page px-4 flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-400 mb-4">Please enter a nickname first.</p>
          <Link href="/" className="text-blue-400 hover:underline">← Go Home</Link>
        </div>
      </div>
    );
  }

  const xp = progress.xpPoints;
  const level = progress.grammarLevel;
  const xpInLevel = xp % 100;
  const partsBuilt = Array.isArray(progress.robotParts) ? progress.robotParts.length : 0;

  const stats = [
    { label: "Total XP", value: xp, color: "text-blue-400", bg: "from-blue-600 to-cyan-500", icon: "⚡" },
    { label: "Grammar Level", value: `L${level}`, color: "text-amber-400", bg: "from-amber-500 to-orange-400", icon: "📊" },
    { label: "Instructions Level", value: `L${progress.instructionsLevel}`, color: "text-purple-400", bg: "from-violet-600 to-purple-500", icon: "📋" },
    { label: "Robot Parts", value: partsBuilt, color: "text-emerald-400", bg: "from-emerald-600 to-teal-400", icon: "🔧" },
  ];

  const modules = [
    { name: "Discovery Lab", href: "/discovery", icon: "🔍", xpPer: 5 },
    { name: "Skills Trainer", href: "/skills", icon: "⚡", xpPer: 10 },
    { name: "Restaurant", href: "/restaurant", icon: "🍜", xpPer: 10 },
    { name: "Builder Studio", href: "/builder", icon: "🔧", xpPer: 20 },
    { name: "Instructions Lab", href: "/instructions", icon: "📋", xpPer: 15 },
    { name: "Story Corner", href: "/stories", icon: "📚", xpPer: 10 },
    { name: "Song Studio", href: "/songs", icon: "🎵", xpPer: 20 },
  ];

  return (
    <div className="module-page px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-black text-white">📊 {student.nickname}'s Progress</h1>
          <p className="text-slate-400 mt-1">Track your XP, levels, and achievements!</p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-4 text-center"
            >
              <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${s.bg} flex items-center justify-center text-xl mx-auto mb-2`}>
                {s.icon}
              </div>
              <p className={`text-2xl font-black ${s.color}`}>{s.value}</p>
              <p className="text-xs text-slate-400 mt-1">{s.label}</p>
            </motion.div>
          ))}
        </div>

        {/* XP Progress bar */}
        <div className="glass-card p-5 mb-6">
          <div className="flex items-center justify-between mb-3">
            <span className="font-bold text-white">Level Progress</span>
            <span className="text-sm text-slate-400">{xpInLevel}/100 XP to next level</span>
          </div>
          <div className="h-5 bg-slate-700 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-400"
              initial={{ width: 0 }}
              animate={{ width: `${xpInLevel}%` }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
            />
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-xs text-blue-400 font-bold">Level {level}</span>
            <span className="text-xs text-slate-500">Level {level + 1}</span>
          </div>
        </div>

        {/* Module XP guide */}
        <div className="glass-card p-5 mb-6">
          <h3 className="font-bold text-white mb-4">🎯 Module XP Guide</h3>
          <div className="grid sm:grid-cols-2 gap-3">
            {modules.map((mod) => (
              <Link
                key={mod.href}
                href={mod.href}
                className="flex items-center gap-3 p-3 rounded-xl bg-slate-700/40 hover:bg-slate-700 transition-colors"
              >
                <span className="text-2xl">{mod.icon}</span>
                <div className="flex-1">
                  <p className="text-sm font-bold text-white">{mod.name}</p>
                  <p className="text-xs text-slate-400">+{mod.xpPer} XP per activity</p>
                </div>
                <span className="text-blue-400 text-sm">→</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Robot design preview */}
        {partsBuilt > 0 && (
          <div className="glass-card p-5">
            <h3 className="font-bold text-white mb-3">🤖 Your Robot Parts ({partsBuilt})</h3>
            <div className="flex flex-wrap gap-2">
              {(progress.robotParts as string[]).map((partId) => (
                <span key={partId} className="px-2 py-1 rounded-lg bg-slate-700 text-xs text-slate-300 font-medium">
                  {partId.replace(/_/g, " ")}
                </span>
              ))}
            </div>
            <Link
              href="/builder"
              className="mt-3 inline-block text-sm text-emerald-400 hover:underline"
            >
              ✏️ Edit your robot →
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
