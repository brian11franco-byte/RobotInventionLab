"use client";
import { motion } from "framer-motion";
import { useAppStore } from "@/store/useAppStore";

export default function XPBar() {
  const progress = useAppStore((s) => s.progress);
  const xp = progress?.xpPoints ?? 0;
  const level = progress?.grammarLevel ?? 1;
  const xpInLevel = xp % 100;

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-amber-400 text-slate-900 font-black text-xs">
        L{level}
      </div>
      <div className="flex-1 min-w-[80px] h-3 bg-slate-700 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-blue-400 to-cyan-400"
          initial={{ width: 0 }}
          animate={{ width: `${xpInLevel}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>
      <span className="text-xs text-slate-300 font-mono">{xp} XP</span>
    </div>
  );
}
