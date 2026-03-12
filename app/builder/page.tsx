"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/store/useAppStore";

// ─── SVG Part Renders ────────────────────────────────────────────────────────

const partSVGs: Record<string, (color: string) => JSX.Element> = {
  // HEADS
  head_round: (c) => (
    <svg viewBox="0 0 80 80" fill="none">
      <ellipse cx="40" cy="42" rx="30" ry="28" fill={c} stroke="#94a3b8" strokeWidth="2"/>
      <ellipse cx="40" cy="42" rx="24" ry="22" fill="#0f172a"/>
      <rect x="28" y="34" width="10" height="8" rx="3" fill="#38bdf8"/>
      <rect x="42" y="34" width="10" height="8" rx="3" fill="#38bdf8"/>
      <rect x="33" y="52" width="14" height="3" rx="1.5" fill="#475569"/>
      <rect x="28" y="18" width="6" height="12" rx="3" fill="#94a3b8"/>
      <circle cx="31" cy="16" r="4" fill="#f59e0b"/>
      <rect x="46" y="20" width="6" height="10" rx="3" fill="#94a3b8"/>
      <circle cx="49" cy="18" r="3" fill="#10b981"/>
    </svg>
  ),
  head_square: (c) => (
    <svg viewBox="0 0 80 80" fill="none">
      <rect x="10" y="16" width="60" height="54" rx="6" fill={c} stroke="#94a3b8" strokeWidth="2"/>
      <rect x="16" y="22" width="48" height="42" rx="4" fill="#0f172a"/>
      <rect x="20" y="30" width="14" height="10" rx="2" fill="#38bdf8"/>
      <circle cx="27" cy="35" r="3" fill="white" opacity="0.6"/>
      <rect x="46" y="30" width="14" height="10" rx="2" fill="#38bdf8"/>
      <circle cx="53" cy="35" r="3" fill="white" opacity="0.6"/>
      <rect x="26" y="50" width="28" height="4" rx="2" fill="#1e40af"/>
      <rect x="30" y="52" width="20" height="2" rx="1" fill="#38bdf8" opacity="0.5"/>
      <rect x="35" y="8" width="4" height="10" rx="2" fill="#64748b"/>
      <circle cx="37" cy="6" r="4" fill="#ef4444"/>
    </svg>
  ),
  head_dome: (c) => (
    <svg viewBox="0 0 80 80" fill="none">
      <path d="M12 48 Q12 14 40 14 Q68 14 68 48 Z" fill={c} stroke="#94a3b8" strokeWidth="2"/>
      <rect x="12" y="48" width="56" height="18" rx="4" fill={c} stroke="#94a3b8" strokeWidth="2"/>
      <ellipse cx="40" cy="36" rx="20" ry="18" fill="#0f172a" opacity="0.8"/>
      <circle cx="32" cy="34" r="6" fill="#38bdf8"/>
      <circle cx="48" cy="34" r="6" fill="#38bdf8"/>
      <circle cx="34" cy="32" r="2" fill="white" opacity="0.7"/>
      <circle cx="50" cy="32" r="2" fill="white" opacity="0.7"/>
      <path d="M30 50 Q40 56 50 50" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
      <line x1="40" y1="14" x2="40" y2="6" stroke="#64748b" strokeWidth="3"/>
      <circle cx="40" cy="4" r="4" fill="#8b5cf6"/>
    </svg>
  ),
  head_visor: (c) => (
    <svg viewBox="0 0 80 80" fill="none">
      <rect x="8" y="18" width="64" height="50" rx="8" fill={c} stroke="#94a3b8" strokeWidth="2"/>
      <rect x="14" y="26" width="52" height="22" rx="4" fill="#0f172a"/>
      <rect x="14" y="26" width="52" height="22" rx="4" fill="url(#visor)" opacity="0.8"/>
      <defs>
        <linearGradient id="visor" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.6"/>
          <stop offset="100%" stopColor="#1e40af" stopOpacity="0.3"/>
        </linearGradient>
      </defs>
      <rect x="20" y="32" width="40" height="10" rx="2" fill="#38bdf8" opacity="0.3"/>
      <line x1="14" y1="37" x2="66" y2="37" stroke="#38bdf8" strokeWidth="1" opacity="0.5"/>
      <rect x="28" y="56" width="24" height="4" rx="2" fill="#1e3a8a"/>
      <rect x="32" y="58" width="16" height="2" rx="1" fill="#38bdf8" opacity="0.5"/>
      <rect x="36" y="10" width="4" height="10" rx="2" fill="#64748b"/>
      <circle cx="38" cy="8" r="4" fill="#f59e0b"/>
    </svg>
  ),

  // TORSOS
  torso_basic: (c) => (
    <svg viewBox="0 0 80 100" fill="none">
      <rect x="8" y="8" width="64" height="84" rx="10" fill={c} stroke="#94a3b8" strokeWidth="2"/>
      <rect x="16" y="16" width="48" height="52" rx="6" fill="#0f172a"/>
      <circle cx="28" cy="30" r="6" fill="#10b981"/>
      <circle cx="52" cy="30" r="6" fill="#ef4444"/>
      <circle cx="40" cy="30" r="6" fill="#f59e0b"/>
      <rect x="20" y="44" width="40" height="6" rx="3" fill="#1e3a8a"/>
      <rect x="20" y="44" width="26" height="6" rx="3" fill="#38bdf8"/>
      <rect x="20" y="56" width="40" height="4" rx="2" fill="#1e293b"/>
      <rect x="22" y="57" width="8" height="2" rx="1" fill="#10b981"/>
      <rect x="32" y="57" width="8" height="2" rx="1" fill="#f59e0b"/>
      <rect x="42" y="57" width="8" height="2" rx="1" fill="#ef4444"/>
      <rect x="20" y="72" width="40" height="12" rx="4" fill="#1e3a8a"/>
      <rect x="28" y="76" width="24" height="4" rx="2" fill="#38bdf8" opacity="0.5"/>
    </svg>
  ),
  torso_armored: (c) => (
    <svg viewBox="0 0 80 100" fill="none">
      <rect x="8" y="6" width="64" height="88" rx="8" fill={c} stroke="#94a3b8" strokeWidth="2"/>
      <rect x="8" y="6" width="64" height="20" rx="8" fill={c} stroke="#94a3b8" strokeWidth="2"/>
      <path d="M8 26 L8 94 Q8 94 72 94 L72 26 Z" fill={c} stroke="#94a3b8" strokeWidth="1"/>
      <rect x="16" y="14" width="48" height="60" rx="4" fill="#0f172a"/>
      {/* Chest armor lines */}
      <path d="M16 30 L40 20 L64 30" stroke="#475569" strokeWidth="2" fill="none"/>
      <path d="M16 30 L16 74 L40 80 L64 74 L64 30 Z" fill="#0f172a" stroke="#334155" strokeWidth="1"/>
      <circle cx="40" cy="38" r="10" fill="#1e3a8a" stroke="#38bdf8" strokeWidth="1.5"/>
      <circle cx="40" cy="38" r="6" fill="#38bdf8" opacity="0.5"/>
      <circle cx="40" cy="38" r="3" fill="#38bdf8"/>
      <rect x="20" y="54" width="16" height="8" rx="2" fill="#1e3a8a"/>
      <rect x="44" y="54" width="16" height="8" rx="2" fill="#1e3a8a"/>
      <rect x="22" y="68" width="36" height="6" rx="3" fill="#1e3a8a"/>
    </svg>
  ),
  torso_slim: (c) => (
    <svg viewBox="0 0 80 100" fill="none">
      <rect x="14" y="8" width="52" height="84" rx="12" fill={c} stroke="#94a3b8" strokeWidth="2"/>
      <rect x="20" y="16" width="40" height="60" rx="6" fill="#0f172a"/>
      <rect x="26" y="24" width="12" height="12" rx="3" fill="#38bdf8" opacity="0.7"/>
      <rect x="42" y="24" width="12" height="12" rx="3" fill="#38bdf8" opacity="0.7"/>
      <circle cx="34" cy="28" r="3" fill="white" opacity="0.5"/>
      <circle cx="50" cy="28" r="3" fill="white" opacity="0.5"/>
      <rect x="26" y="44" width="28" height="4" rx="2" fill="#1e3a8a"/>
      <rect x="26" y="44" width="18" height="4" rx="2" fill="#38bdf8"/>
      <rect x="26" y="52" width="28" height="3" rx="1.5" fill="#1e293b"/>
      <rect x="26" y="60" width="28" height="10" rx="3" fill="#1e3a8a"/>
      <line x1="30" y1="65" x2="50" y2="65" stroke="#38bdf8" strokeWidth="1" strokeDasharray="4 2"/>
    </svg>
  ),

  // ARMS
  arm_claw: (c) => (
    <svg viewBox="0 0 40 100" fill="none">
      <rect x="14" y="0" width="12" height="50" rx="6" fill={c} stroke="#94a3b8" strokeWidth="1.5"/>
      <rect x="10" y="46" width="20" height="20" rx="4" fill={c} stroke="#94a3b8" strokeWidth="1.5"/>
      {/* Claw fingers */}
      <path d="M10 66 L4 88 L10 84 L14 90 L18 76" fill={c} stroke="#94a3b8" strokeWidth="1.5"/>
      <path d="M30 66 L36 88 L30 84 L26 90 L22 76" fill={c} stroke="#94a3b8" strokeWidth="1.5"/>
      <rect x="16" y="50" width="8" height="16" rx="2" fill="#0f172a"/>
      <circle cx="20" cy="20" r="4" fill="#0f172a"/>
      <circle cx="20" cy="20" r="2" fill="#38bdf8"/>
    </svg>
  ),
  arm_tool: (c) => (
    <svg viewBox="0 0 40 100" fill="none">
      <rect x="14" y="0" width="12" height="55" rx="6" fill={c} stroke="#94a3b8" strokeWidth="1.5"/>
      <rect x="8" y="50" width="24" height="16" rx="4" fill={c} stroke="#94a3b8" strokeWidth="1.5"/>
      {/* Drill/tool */}
      <rect x="16" y="66" width="8" height="24" rx="2" fill="#64748b"/>
      <polygon points="16,90 24,90 20,100" fill="#94a3b8"/>
      <circle cx="20" cy="22" r="4" fill="#0f172a"/>
      <circle cx="20" cy="22" r="2" fill="#f59e0b"/>
      <rect x="10" y="58" width="20" height="4" rx="2" fill="#0f172a"/>
    </svg>
  ),
  arm_cannon: (c) => (
    <svg viewBox="0 0 40 100" fill="none">
      <rect x="14" y="0" width="12" height="45" rx="6" fill={c} stroke="#94a3b8" strokeWidth="1.5"/>
      <rect x="6" y="42" width="28" height="20" rx="5" fill={c} stroke="#94a3b8" strokeWidth="1.5"/>
      <rect x="10" y="62" width="20" height="30" rx="4" fill="#475569" stroke="#94a3b8" strokeWidth="1.5"/>
      <circle cx="20" cy="92" r="6" fill="#0f172a" stroke="#64748b" strokeWidth="1"/>
      <circle cx="20" cy="92" r="3" fill="#38bdf8"/>
      <rect x="12" y="70" width="16" height="4" rx="2" fill="#0f172a"/>
      <rect x="12" y="78" width="16" height="4" rx="2" fill="#0f172a"/>
      <circle cx="20" cy="18" r="4" fill="#0f172a"/>
      <circle cx="20" cy="18" r="2" fill="#ef4444"/>
    </svg>
  ),
  arm_shield: (c) => (
    <svg viewBox="0 0 50 100" fill="none">
      <rect x="18" y="0" width="12" height="40" rx="6" fill={c} stroke="#94a3b8" strokeWidth="1.5"/>
      <path d="M5 38 L45 38 L45 72 Q45 90 25 96 Q5 90 5 72 Z" fill={c} stroke="#94a3b8" strokeWidth="2"/>
      <path d="M12 44 L38 44 L38 70 Q38 82 25 87 Q12 82 12 70 Z" fill="#0f172a"/>
      <path d="M18 50 L32 50 L32 68 Q32 76 25 80 Q18 76 18 68 Z" fill="#1e3a8a" opacity="0.6"/>
      <line x1="25" y1="50" x2="25" y2="80" stroke="#38bdf8" strokeWidth="1.5"/>
      <line x1="12" y1="65" x2="38" y2="65" stroke="#38bdf8" strokeWidth="1.5"/>
    </svg>
  ),

  // LEGS
  leg_basic: (c) => (
    <svg viewBox="0 0 60 100" fill="none">
      <rect x="12" y="0" width="16" height="50" rx="6" fill={c} stroke="#94a3b8" strokeWidth="1.5"/>
      <rect x="32" y="0" width="16" height="50" rx="6" fill={c} stroke="#94a3b8" strokeWidth="1.5"/>
      <rect x="8" y="46" width="20" height="28" rx="5" fill={c} stroke="#94a3b8" strokeWidth="1.5"/>
      <rect x="32" y="46" width="20" height="28" rx="5" fill={c} stroke="#94a3b8" strokeWidth="1.5"/>
      <rect x="6" y="72" width="24" height="10" rx="4" fill="#475569"/>
      <rect x="30" y="72" width="24" height="10" rx="4" fill="#475569"/>
      <circle cx="20" cy="24" r="4" fill="#0f172a"/>
      <circle cx="40" cy="24" r="4" fill="#0f172a"/>
      <circle cx="20" cy="24" r="2" fill="#38bdf8"/>
      <circle cx="40" cy="24" r="2" fill="#38bdf8"/>
    </svg>
  ),
  leg_hover: (c) => (
    <svg viewBox="0 0 70 100" fill="none">
      <rect x="16" y="0" width="14" height="40" rx="6" fill={c} stroke="#94a3b8" strokeWidth="1.5"/>
      <rect x="40" y="0" width="14" height="40" rx="6" fill={c} stroke="#94a3b8" strokeWidth="1.5"/>
      <ellipse cx="20" cy="62" rx="16" ry="10" fill={c} stroke="#94a3b8" strokeWidth="2"/>
      <ellipse cx="50" cy="62" rx="16" ry="10" fill={c} stroke="#94a3b8" strokeWidth="2"/>
      <ellipse cx="20" cy="62" rx="10" ry="6" fill="#0f172a"/>
      <ellipse cx="50" cy="62" rx="10" ry="6" fill="#0f172a"/>
      <ellipse cx="20" cy="70" rx="16" ry="4" fill="#38bdf8" opacity="0.3"/>
      <ellipse cx="50" cy="70" rx="16" ry="4" fill="#38bdf8" opacity="0.3"/>
      <ellipse cx="20" cy="74" rx="12" ry="3" fill="#38bdf8" opacity="0.15"/>
      <ellipse cx="50" cy="74" rx="12" ry="3" fill="#38bdf8" opacity="0.15"/>
    </svg>
  ),
  leg_tank: (c) => (
    <svg viewBox="0 0 80 80" fill="none">
      <rect x="4" y="20" width="72" height="32" rx="6" fill={c} stroke="#94a3b8" strokeWidth="2"/>
      <rect x="4" y="46" width="72" height="16" rx="4" fill="#374151"/>
      <circle cx="16" cy="54" r="8" fill="#1f2937" stroke="#94a3b8" strokeWidth="1.5"/>
      <circle cx="32" cy="54" r="8" fill="#1f2937" stroke="#94a3b8" strokeWidth="1.5"/>
      <circle cx="48" cy="54" r="8" fill="#1f2937" stroke="#94a3b8" strokeWidth="1.5"/>
      <circle cx="64" cy="54" r="8" fill="#1f2937" stroke="#94a3b8" strokeWidth="1.5"/>
      <circle cx="16" cy="54" r="3" fill="#475569"/>
      <circle cx="32" cy="54" r="3" fill="#475569"/>
      <circle cx="48" cy="54" r="3" fill="#475569"/>
      <circle cx="64" cy="54" r="3" fill="#475569"/>
      <rect x="10" y="26" width="60" height="18" rx="3" fill="#0f172a"/>
      <rect x="14" y="30" width="16" height="10" rx="2" fill="#1e3a8a"/>
      <rect x="34" y="30" width="12" height="10" rx="2" fill="#1e3a8a"/>
      <rect x="50" y="30" width="16" height="10" rx="2" fill="#1e3a8a"/>
    </svg>
  ),
  leg_spring: (c) => (
    <svg viewBox="0 0 60 100" fill="none">
      <rect x="12" y="0" width="14" height="22" rx="6" fill={c} stroke="#94a3b8" strokeWidth="1.5"/>
      <rect x="34" y="0" width="14" height="22" rx="6" fill={c} stroke="#94a3b8" strokeWidth="1.5"/>
      {/* Spring coils left */}
      <path d="M12 22 Q6 28 12 34 Q18 40 12 46 Q6 52 12 58 Q18 64 14 70" stroke={c} strokeWidth="6" fill="none" strokeLinecap="round"/>
      {/* Spring coils right */}
      <path d="M48 22 Q54 28 48 34 Q42 40 48 46 Q54 52 48 58 Q42 64 46 70" stroke={c} strokeWidth="6" fill="none" strokeLinecap="round"/>
      <rect x="6" y="68" width="22" height="12" rx="5" fill="#475569"/>
      <rect x="32" y="68" width="22" height="12" rx="5" fill="#475569"/>
    </svg>
  ),

  // WHEELS (for wheeled bots)
  wheel_pair: (c) => (
    <svg viewBox="0 0 80 60" fill="none">
      <circle cx="20" cy="30" r="22" fill="#1f2937" stroke="#94a3b8" strokeWidth="2"/>
      <circle cx="60" cy="30" r="22" fill="#1f2937" stroke="#94a3b8" strokeWidth="2"/>
      <circle cx="20" cy="30" r="14" fill="#374151"/>
      <circle cx="60" cy="30" r="14" fill="#374151"/>
      <circle cx="20" cy="30" r="6" fill={c}/>
      <circle cx="60" cy="30" r="6" fill={c}/>
      {[0,60,120,180,240,300].map((a,i)=>(
        <line key={i} x1={20+14*Math.cos(a*Math.PI/180)} y1={30+14*Math.sin(a*Math.PI/180)} 
              x2={20+22*Math.cos(a*Math.PI/180)} y2={30+22*Math.sin(a*Math.PI/180)} 
              stroke="#4b5563" strokeWidth="3"/>
      ))}
      {[0,60,120,180,240,300].map((a,i)=>(
        <line key={i} x1={60+14*Math.cos(a*Math.PI/180)} y1={30+14*Math.sin(a*Math.PI/180)} 
              x2={60+22*Math.cos(a*Math.PI/180)} y2={30+22*Math.sin(a*Math.PI/180)} 
              stroke="#4b5563" strokeWidth="3"/>
      ))}
      <rect x="36" y="26" width="8" height="8" rx="2" fill="#475569"/>
    </svg>
  ),

  // ACCESSORIES
  jetpack: (c) => (
    <svg viewBox="0 0 60 80" fill="none">
      <rect x="10" y="8" width="40" height="56" rx="10" fill={c} stroke="#94a3b8" strokeWidth="2"/>
      <rect x="18" y="16" width="24" height="36" rx="6" fill="#0f172a"/>
      <rect x="4" y="12" width="14" height="50" rx="7" fill={c} stroke="#94a3b8" strokeWidth="1.5"/>
      <rect x="42" y="12" width="14" height="50" rx="7" fill={c} stroke="#94a3b8" strokeWidth="1.5"/>
      {/* Flame left */}
      <ellipse cx="11" cy="65" rx="5" ry="10" fill="#f97316" opacity="0.9"/>
      <ellipse cx="11" cy="68" rx="3" ry="7" fill="#fbbf24"/>
      {/* Flame right */}
      <ellipse cx="49" cy="65" rx="5" ry="10" fill="#f97316" opacity="0.9"/>
      <ellipse cx="49" cy="68" rx="3" ry="7" fill="#fbbf24"/>
      <circle cx="30" cy="28" r="6" fill="#1e3a8a" stroke="#38bdf8" strokeWidth="1"/>
      <circle cx="30" cy="28" r="3" fill="#38bdf8"/>
      <rect x="22" y="40" width="16" height="4" rx="2" fill="#1e3a8a"/>
    </svg>
  ),
  antenna_pack: (c) => (
    <svg viewBox="0 0 60 60" fill="none">
      <rect x="20" y="28" width="6" height="26" rx="3" fill="#64748b"/>
      <rect x="34" y="32" width="6" height="22" rx="3" fill="#64748b"/>
      <rect x="10" y="36" width="6" height="18" rx="3" fill="#64748b"/>
      <circle cx="23" cy="22" r="8" fill={c} stroke="#94a3b8" strokeWidth="1.5"/>
      <circle cx="37" cy="26" r="6" fill={c} stroke="#94a3b8" strokeWidth="1.5"/>
      <circle cx="13" cy="30" r="5" fill={c} stroke="#94a3b8" strokeWidth="1.5"/>
      <circle cx="23" cy="22" r="3" fill="#f59e0b"/>
      <circle cx="37" cy="26" r="2.5" fill="#10b981"/>
      <circle cx="13" cy="30" r="2" fill="#ef4444"/>
    </svg>
  ),
  sensor_array: (c) => (
    <svg viewBox="0 0 70 60" fill="none">
      <rect x="8" y="16" width="54" height="36" rx="8" fill={c} stroke="#94a3b8" strokeWidth="2"/>
      <rect x="14" y="22" width="42" height="24" rx="4" fill="#0f172a"/>
      <circle cx="24" cy="34" r="7" fill="#1e3a8a" stroke="#38bdf8" strokeWidth="1"/>
      <circle cx="24" cy="34" r="4" fill="#38bdf8" opacity="0.7"/>
      <circle cx="24" cy="34" r="2" fill="white"/>
      <circle cx="46" cy="34" r="7" fill="#1e3a8a" stroke="#10b981" strokeWidth="1"/>
      <circle cx="46" cy="34" r="4" fill="#10b981" opacity="0.7"/>
      <circle cx="46" cy="34" r="2" fill="white"/>
      <rect x="34" y="28" width="2" height="12" rx="1" fill="#475569"/>
      <rect x="28" y="34" width="8" height="1.5" rx="0.75" fill="#475569"/>
      <path d="M16 10 Q35 4 54 10" stroke={c} strokeWidth="3" strokeLinecap="round" fill="none"/>
    </svg>
  ),
};

// Part definitions
const PARTS = {
  heads: [
    { id: "head_round", name: "Round Head", color: "#1e40af" },
    { id: "head_square", name: "Square Head", color: "#374151" },
    { id: "head_dome", name: "Dome Head", color: "#5b21b6" },
    { id: "head_visor", name: "Visor Head", color: "#065f46" },
  ],
  torsos: [
    { id: "torso_basic", name: "Standard Torso", color: "#1e3a8a" },
    { id: "torso_armored", name: "Armored Torso", color: "#374151" },
    { id: "torso_slim", name: "Slim Torso", color: "#1e40af" },
  ],
  arms: [
    { id: "arm_claw", name: "Claw Arm", color: "#1e40af" },
    { id: "arm_tool", name: "Tool Arm", color: "#374151" },
    { id: "arm_cannon", name: "Cannon Arm", color: "#1e3a8a" },
    { id: "arm_shield", name: "Shield Arm", color: "#5b21b6" },
  ],
  legs: [
    { id: "leg_basic", name: "Walker Legs", color: "#1e40af" },
    { id: "leg_hover", name: "Hover Legs", color: "#0e7490" },
    { id: "leg_tank", name: "Tank Treads", color: "#374151" },
    { id: "leg_spring", name: "Spring Legs", color: "#065f46" },
  ],
  accessories: [
    { id: "wheel_pair", name: "Wheel Pair", color: "#1e40af" },
    { id: "jetpack", name: "Jetpack", color: "#7c2d12" },
    { id: "antenna_pack", name: "Antennas", color: "#1e40af" },
    { id: "sensor_array", name: "Sensor Array", color: "#1e3a8a" },
  ],
};

type Category = keyof typeof PARTS;
type PlacedParts = { head?: string; torso?: string; leftArm?: string; rightArm?: string; legs?: string; accessory?: string };

const SLOT_CONFIG = [
  { key: "accessory", label: "Accessory", top: "2%", left: "50%", hint: "Add accessory" },
  { key: "head", label: "Head", top: "12%", left: "50%", hint: "Add head" },
  { key: "leftArm", label: "L.Arm", top: "38%", left: "14%", hint: "Left arm" },
  { key: "torso", label: "Torso", top: "36%", left: "50%", hint: "Add torso" },
  { key: "rightArm", label: "R.Arm", top: "38%", left: "86%", hint: "Right arm" },
  { key: "legs", label: "Legs", top: "70%", left: "50%", hint: "Add legs" },
];

export default function BuilderPage() {
  const [activeCat, setActiveCat] = useState<Category>("heads");
  const [placed, setPlaced] = useState<PlacedParts>({});
  const [activeSlot, setActiveSlot] = useState<string | null>(null);
  const [robotName, setRobotName] = useState("");
  const [saved, setSaved] = useState(false);
  const [description, setDescription] = useState("");
  const { saveRobotParts, addXP, student } = useAppStore();

  const partsCount = Object.values(placed).filter(Boolean).length;

  // Map category → which slot it fills
  const catToSlot: Record<Category, string> = {
    heads: "head",
    torsos: "torso",
    arms: activeSlot === "leftArm" ? "leftArm" : "rightArm",
    legs: "legs",
    accessories: "accessory",
  };

  const placePart = (partId: string) => {
    const slot = catToSlot[activeCat];
    setPlaced((prev) => ({ ...prev, [slot]: partId }));
    setSaved(false);
  };

  const removeSlot = (slot: string) => {
    setPlaced((prev) => { const n = {...prev}; delete (n as any)[slot]; return n; });
  };

  const saveRobot = async () => {
    const partIds = Object.values(placed).filter(Boolean) as string[];
    saveRobotParts(partIds);
    addXP(20);
    setSaved(true);
    if (student) {
      await fetch("/api/activity-results", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ studentId: student.id, activityType: "builder", score: partIds.length * 4 }),
      }).catch(() => {});
    }
  };

  const getPartDef = (id: string) => {
    for (const cat of Object.values(PARTS)) {
      const p = cat.find((x) => x.id === id);
      if (p) return p;
    }
    return null;
  };

  const renderPart = (id: string, size = 72) => {
    const def = getPartDef(id);
    if (!def) return null;
    const svg = partSVGs[id];
    if (!svg) return <div style={{ width: size, height: size }} className="bg-slate-700 rounded-lg"/>;
    return <div style={{ width: size, height: size }}>{svg(def.color)}</div>;
  };

  return (
    <div className="module-page px-3">
      <div className="max-w-6xl mx-auto">
        <div className="mb-4">
          <h1 className="text-3xl font-black text-white">🔧 Robot Builder Studio</h1>
          <p className="text-slate-400 mt-1 text-sm">Select a slot on the canvas, then pick a part to assemble your robot! +20 XP when saved.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-4">

          {/* ── Left: Parts Panel ── */}
          <div className="glass-card p-4">
            <h3 className="font-bold text-white mb-3 text-sm">🧩 Robot Parts</h3>

            {/* Category tabs */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {(Object.keys(PARTS) as Category[]).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCat(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition-colors ${
                    activeCat === cat ? "bg-blue-600 text-white" : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Parts grid */}
            <div className="grid grid-cols-2 gap-3">
              {PARTS[activeCat].map((part) => (
                <motion.button
                  key={part.id}
                  onClick={() => placePart(part.id)}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  className="flex flex-col items-center gap-2 p-3 rounded-xl bg-slate-800/80 border border-slate-600 hover:border-blue-500 transition-all group"
                >
                  <div className="w-16 h-16 flex items-center justify-center">
                    {partSVGs[part.id] ? partSVGs[part.id](part.color) : <div className="w-12 h-12 bg-slate-600 rounded"/>}
                  </div>
                  <span className="text-xs font-semibold text-slate-300 group-hover:text-white text-center leading-tight">{part.name}</span>
                </motion.button>
              ))}
            </div>

            <p className="text-xs text-slate-500 mt-3 text-center">
              {activeCat === "arms" ? "Click a slot first (Left/Right Arm), then pick a part" : "Click any part to place it on the robot"}
            </p>
          </div>

          {/* ── Center: Robot Canvas ── */}
          <div className="glass-card p-4 flex flex-col">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-white text-sm">🤖 Your Robot</h3>
              <span className="text-xs text-slate-400 bg-slate-700 px-2 py-1 rounded-full">{partsCount}/6 parts</span>
            </div>

            {/* Canvas */}
            <div
              className="relative flex-1 bg-gradient-to-b from-slate-900 to-slate-950 rounded-xl overflow-hidden border border-slate-700/50"
              style={{ minHeight: 440 }}
            >
              {/* Grid bg */}
              <div className="absolute inset-0 opacity-[0.06]"
                style={{ backgroundImage: "radial-gradient(circle, #60a5fa 1px, transparent 1px)", backgroundSize: "24px 24px" }}
              />
              {/* Floor glow */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-12 bg-blue-500/10 rounded-full blur-xl"/>

              {/* Slots */}
              {SLOT_CONFIG.map((slot) => {
                const partId = (placed as any)[slot.key];
                const isActive = activeSlot === slot.key;
                return (
                  <motion.div
                    key={slot.key}
                    onClick={() => setActiveSlot(activeSlot === slot.key ? null : slot.key)}
                    style={{
                      position: "absolute",
                      top: slot.top,
                      left: slot.left,
                      transform: "translate(-50%, 0)",
                    }}
                    whileHover={{ scale: 1.05 }}
                    className={`cursor-pointer transition-all ${isActive ? "z-10" : ""}`}
                  >
                    {partId ? (
                      <div className="relative group">
                        <div className={`rounded-xl p-1 transition-all ${isActive ? "ring-2 ring-blue-400 bg-blue-900/20" : "hover:bg-slate-700/30"}`}>
                          {renderPart(partId, slot.key === "torso" ? 76 : slot.key === "legs" ? 72 : 64)}
                        </div>
                        <button
                          onClick={(e) => { e.stopPropagation(); removeSlot(slot.key); }}
                          className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-600 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                        >✕</button>
                        <p className="text-center text-xs text-slate-500 mt-0.5">{slot.label}</p>
                      </div>
                    ) : (
                      <div className={`flex flex-col items-center gap-1 transition-all ${isActive ? "scale-105" : ""}`}>
                        <div className={`w-16 h-16 rounded-xl border-2 border-dashed flex items-center justify-center transition-all ${
                          isActive
                            ? "border-blue-400 bg-blue-900/30 shadow-lg shadow-blue-900/30"
                            : "border-slate-600/50 hover:border-slate-500"
                        }`}>
                          <span className="text-2xl opacity-30">+</span>
                        </div>
                        <p className={`text-xs font-medium ${isActive ? "text-blue-400" : "text-slate-600"}`}>{slot.hint}</p>
                      </div>
                    )}
                  </motion.div>
                );
              })}

              {/* Empty state */}
              {partsCount === 0 && (
                <div className="absolute inset-0 flex items-end justify-center pb-6 pointer-events-none">
                  <p className="text-slate-600 text-xs text-center px-4">
                    Click a slot above,<br/>then pick a part from the panel
                  </p>
                </div>
              )}
            </div>

            {/* Active slot indicator */}
            <AnimatePresence>
              {activeSlot && (
                <motion.div
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-2 px-3 py-2 rounded-lg bg-blue-900/40 border border-blue-700/50 text-xs text-blue-300 text-center"
                >
                  Slot selected: <strong className="text-white capitalize">{activeSlot.replace(/([A-Z])/g, " $1")}</strong> — now pick a part from the panel!
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ── Right: Details ── */}
          <div className="glass-card p-4 flex flex-col gap-4">
            <div>
              <h3 className="font-bold text-white mb-2 text-sm">📝 Name Your Robot</h3>
              <input
                value={robotName}
                onChange={(e) => setRobotName(e.target.value)}
                placeholder="e.g. RoboMax 3000..."
                className="w-full px-3 py-2.5 rounded-xl bg-slate-800 border border-slate-600 text-white text-sm focus:outline-none focus:border-emerald-500"
              />
            </div>

            {/* Parts summary */}
            <div>
              <p className="text-sm font-bold text-white mb-2">⚙️ Installed Parts ({partsCount}):</p>
              {partsCount === 0 ? (
                <p className="text-sm text-slate-500 italic">No parts yet — start building!</p>
              ) : (
                <div className="space-y-2">
                  {SLOT_CONFIG.map((slot) => {
                    const partId = (placed as any)[slot.key];
                    if (!partId) return null;
                    const def = getPartDef(partId);
                    return (
                      <div key={slot.key} className="flex items-center gap-3 px-3 py-2 rounded-lg bg-slate-800/60">
                        <div className="w-10 h-10 shrink-0">
                          {partSVGs[partId] && partSVGs[partId](def?.color ?? "#1e40af")}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold text-white truncate">{def?.name}</p>
                          <p className="text-xs text-slate-500 capitalize">{slot.label}</p>
                        </div>
                        <button
                          onClick={() => removeSlot(slot.key)}
                          className="text-red-400/60 hover:text-red-400 text-xs transition-colors"
                        >✕</button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            <div>
              <p className="text-sm font-bold text-white mb-1">✍️ Describe your robot:</p>
              <p className="text-xs text-slate-500 mb-1.5">My robot is ___. It can ___. It works in ___.</p>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                placeholder="My robot is strong. It can carry boxes. It works in a factory."
                className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-600 text-white text-sm focus:outline-none focus:border-emerald-500 resize-none"
              />
            </div>

            <motion.button
              onClick={saveRobot}
              whileTap={{ scale: 0.97 }}
              disabled={partsCount === 0}
              className="w-full py-3 rounded-xl font-black text-white bg-gradient-to-r from-emerald-600 to-teal-500 hover:brightness-110 transition-all disabled:opacity-40 mt-auto"
            >
              {saved ? "✅ Robot Saved! +20 XP" : "💾 Save My Robot!"}
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}
