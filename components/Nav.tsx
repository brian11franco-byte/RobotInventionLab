"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/store/useAppStore";
import XPBar from "./XPBar";

const navLinks = [
  { href: "/", label: "🏠 Home" },
  { href: "/discovery", label: "🔍 Discovery Lab" },
  { href: "/skills", label: "⚡ Skills Trainer" },
  { href: "/restaurant", label: "🍜 Restaurant" },
  { href: "/builder", label: "🔧 Builder Studio" },
  { href: "/instructions", label: "📋 Instructions Lab" },
  { href: "/stories", label: "📚 Story Corner" },
  { href: "/songs", label: "🎵 Song Studio" },
  { href: "/progress", label: "📊 My Progress" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const student = useAppStore((s) => s.student);
  const pathname = usePathname();

  if (!student) return null;

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/90 backdrop-blur-md border-b border-slate-700/50 px-4 py-2">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2 font-black text-blue-400 text-lg shrink-0">
            🤖 <span className="hidden sm:inline">Robot Lab</span>
          </Link>
          <div className="flex-1 max-w-xs">
            <XPBar />
          </div>
          <div className="flex items-center gap-2">
            <span className="hidden sm:block text-sm text-slate-300 font-medium">
              👤 {student.nickname}
            </span>
            <button
              onClick={() => setOpen(!open)}
              className="p-2 rounded-lg bg-slate-700 hover:bg-slate-600 transition-colors"
              aria-label="Menu"
            >
              <div className="w-5 h-0.5 bg-white mb-1 rounded"/>
              <div className="w-5 h-0.5 bg-white mb-1 rounded"/>
              <div className="w-5 h-0.5 bg-white rounded"/>
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/50"
              onClick={() => setOpen(false)}
            />
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-64 bg-slate-900 border-l border-slate-700 p-4 overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <span className="font-black text-blue-400">🤖 Modules</span>
                <button onClick={() => setOpen(false)} className="text-slate-400 hover:text-white text-xl">✕</button>
              </div>
              <div className="space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={`block px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      pathname === link.href
                        ? "bg-blue-600 text-white"
                        : "text-slate-300 hover:bg-slate-700 hover:text-white"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  href="/teacher"
                  onClick={() => setOpen(false)}
                  className="block px-3 py-2.5 rounded-lg text-sm font-medium text-slate-500 hover:bg-slate-700 hover:text-white transition-colors mt-4 border-t border-slate-700 pt-4"
                >
                  👩‍🏫 Teacher Dashboard
                </Link>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
