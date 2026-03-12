"use client";
import { motion } from "framer-motion";

type Props = {
  size?: number;
  animate?: boolean;
  mood?: "happy" | "thinking" | "excited";
};

export default function RobotMascot({ size = 120, animate = true, mood = "happy" }: Props) {
  const eyeColor = mood === "excited" ? "#FBBF24" : mood === "thinking" ? "#A78BFA" : "#60A5FA";

  return (
    <motion.div
      animate={animate ? { y: [0, -8, 0] } : undefined}
      transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
      style={{ width: size, height: size }}
    >
      <svg viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Antenna */}
        <line x1="50" y1="5" x2="50" y2="18" stroke="#94A3B8" strokeWidth="3" strokeLinecap="round"/>
        <motion.circle
          cx="50" cy="5" r="4" fill="#F59E0B"
          animate={animate ? { scale: [1, 1.3, 1] } : undefined}
          transition={{ repeat: Infinity, duration: 1.5 }}
        />
        {/* Head */}
        <rect x="20" y="18" width="60" height="48" rx="12" fill="#1E40AF" stroke="#3B82F6" strokeWidth="2"/>
        {/* Face screen */}
        <rect x="26" y="24" width="48" height="36" rx="8" fill="#0F172A"/>
        {/* Eyes */}
        <motion.circle
          cx="38" cy="38" r="8" fill={eyeColor}
          animate={animate ? { scale: [1, 1.1, 1] } : undefined}
          transition={{ repeat: Infinity, duration: 2 }}
        />
        <motion.circle
          cx="62" cy="38" r="8" fill={eyeColor}
          animate={animate ? { scale: [1, 1.1, 1] } : undefined}
          transition={{ repeat: Infinity, duration: 2, delay: 0.2 }}
        />
        <circle cx="40" cy="36" r="2" fill="white"/>
        <circle cx="64" cy="36" r="2" fill="white"/>
        {/* Mouth */}
        {mood === "happy" && (
          <path d="M36 50 Q50 58 64 50" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
        )}
        {mood === "thinking" && (
          <line x1="38" y1="52" x2="62" y2="52" stroke="#A78BFA" strokeWidth="2.5" strokeLinecap="round"/>
        )}
        {mood === "excited" && (
          <path d="M34 48 Q50 62 66 48" stroke="#FBBF24" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
        )}
        {/* Body */}
        <rect x="18" y="70" width="64" height="44" rx="10" fill="#1E3A8A" stroke="#3B82F6" strokeWidth="2"/>
        {/* Chest panel */}
        <rect x="26" y="78" width="48" height="28" rx="6" fill="#0F172A"/>
        {/* Panel lights */}
        <circle cx="35" cy="88" r="3" fill="#10B981"/>
        <circle cx="50" cy="88" r="3" fill="#F59E0B"/>
        <circle cx="65" cy="88" r="3" fill="#EF4444"/>
        <rect x="32" y="96" width="36" height="4" rx="2" fill="#1E40AF"/>
        {/* Arms */}
        <rect x="4" y="70" width="12" height="32" rx="6" fill="#1E40AF" stroke="#3B82F6" strokeWidth="1.5"/>
        <rect x="84" y="70" width="12" height="32" rx="6" fill="#1E40AF" stroke="#3B82F6" strokeWidth="1.5"/>
        {/* Legs */}
        <rect x="26" y="114" width="18" height="6" rx="3" fill="#1E3A8A"/>
        <rect x="56" y="114" width="18" height="6" rx="3" fill="#1E3A8A"/>
      </svg>
    </motion.div>
  );
}
