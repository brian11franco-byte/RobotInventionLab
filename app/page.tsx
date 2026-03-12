"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAppStore } from "@/store/useAppStore";
import RobotMascot from "@/components/RobotMascot";

const modules = [
  { href: "/discovery", icon: "🔍", label: "Discovery Lab", desc: "Learn robot vocabulary", color: "from-blue-600 to-cyan-500" },
  { href: "/skills", icon: "⚡", label: "Skills Trainer", desc: "Grammar & sentences", color: "from-violet-600 to-purple-500" },
  { href: "/restaurant", icon: "🍜", label: "Robot Restaurant", desc: "Order food politely", color: "from-orange-500 to-amber-400" },
  { href: "/builder", icon: "🔧", label: "Builder Studio", desc: "Build your robot", color: "from-emerald-600 to-teal-400" },
  { href: "/instructions", icon: "📋", label: "Instructions Lab", desc: "Write step-by-step", color: "from-rose-600 to-pink-400" },
  { href: "/stories", icon: "📚", label: "Story Corner", desc: "Read & comprehend", color: "from-sky-600 to-blue-400" },
  { href: "/songs", icon: "🎵", label: "Song Studio", desc: "Build robot songs", color: "from-fuchsia-600 to-pink-400" },
  { href: "/progress", icon: "📊", label: "My Progress", desc: "See your XP & levels", color: "from-green-600 to-emerald-400" },
];

export default function HomePage() {
  const [nickname, setNickname] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { student, setStudent, setProgress } = useAppStore();
  const router = useRouter();

  const handleEnter = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nickname.trim()) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/students", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nickname: nickname.trim() }),
      });
      if (!res.ok) throw new Error("Failed");
      const data = await res.json();
      setStudent(data.student);
      setProgress(data.progress);
    } catch {
      setError("Could not connect. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!student) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
        {/* Background grid */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: "radial-gradient(circle, #3B82F6 1px, transparent 1px)",
          backgroundSize: "32px 32px"
        }}/>
        {/* Glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl"/>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 flex flex-col items-center gap-8 max-w-sm w-full"
        >
          <RobotMascot size={140} mood="excited"/>

          <div className="text-center">
            <h1 className="text-4xl font-black text-white tracking-tight">
              Robot <span className="text-blue-400">Inventor</span> Lab
            </h1>
            <p className="mt-2 text-slate-400 text-sm">Cambridge Global English Stage 3</p>
          </div>

          <form onSubmit={handleEnter} className="w-full space-y-4">
            <div>
              <label className="block text-sm font-bold text-slate-300 mb-2">
                🤖 Enter your nickname to begin!
              </label>
              <input
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                placeholder="e.g. RoboMax, TechStar..."
                maxLength={20}
                className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-600 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 font-medium text-lg"
              />
            </div>
            {error && <p className="text-red-400 text-sm">{error}</p>}
            <motion.button
              type="submit"
              disabled={loading || !nickname.trim()}
              whileTap={{ scale: 0.97 }}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-black text-lg shadow-lg shadow-blue-900/30 hover:brightness-110 transition-all disabled:opacity-50"
            >
              {loading ? "🔄 Loading..." : "🚀 Enter the Lab!"}
            </motion.button>
          </form>

          <p className="text-xs text-slate-600">Your progress is saved automatically ✨</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="module-page px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 mb-8"
        >
          <RobotMascot size={80} mood="happy"/>
          <div>
            <h2 className="text-2xl font-black text-white">
              Welcome back, <span className="text-blue-400">{student.nickname}</span>! 👋
            </h2>
            <p className="text-slate-400 text-sm">Choose a module to start learning!</p>
          </div>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {modules.map((mod, i) => (
            <motion.div
              key={mod.href}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
            >
              <Link href={mod.href}>
                <motion.div
                  whileHover={{ y: -4, scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  className="glass-card p-4 cursor-pointer hover:border-slate-600 transition-all"
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${mod.color} flex items-center justify-center text-2xl mb-3 shadow-lg`}>
                    {mod.icon}
                  </div>
                  <p className="font-bold text-white text-sm">{mod.label}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{mod.desc}</p>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-4 text-center">
          <Link href="/teacher" className="text-xs text-slate-600 hover:text-slate-400 transition-colors">
            👩‍🏫 Teacher Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
