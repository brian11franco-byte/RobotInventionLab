"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { robotParts, partCategories, RobotPart } from "@/lib/data/robotParts";
import { useAppStore } from "@/store/useAppStore";

// Robot canvas slots
const SLOTS = [
  { id: "antenna", label: "Antenna", x: 100, y: 20, category: "antennas" },
  { id: "head", label: "Head", x: 80, y: 60, category: "heads" },
  { id: "eye", label: "Eyes", x: 100, y: 100, category: "eyes" },
  { id: "arm_left", label: "Left Arm", x: 20, y: 140, category: "arms" },
  { id: "arm_right", label: "Right Arm", x: 180, y: 140, category: "arms" },
  { id: "body", label: "Module", x: 80, y: 150, category: "modules" },
  { id: "tool", label: "Tool", x: 100, y: 200, category: "tools" },
  { id: "sensor", label: "Sensor", x: 60, y: 110, category: "sensors" },
  { id: "legs", label: "Legs", x: 80, y: 240, category: "legs" },
  { id: "wheels", label: "Wheels", x: 80, y: 290, category: "wheels" },
  { id: "jetpack", label: "Jetpack", x: 150, y: 160, category: "jetpacks" },
];

export default function BuilderPage() {
  const [selectedCat, setSelectedCat] = useState<string>("heads");
  const [placed, setPlaced] = useState<Record<string, RobotPart>>({});
  const [robotName, setRobotName] = useState("");
  const [saved, setSaved] = useState(false);
  const { saveRobotParts, saveRobotDesign, addXP, student } = useAppStore();

  const catParts = robotParts.filter((p) => p.category === selectedCat);

  const placePart = (slot: typeof SLOTS[0], part: RobotPart) => {
    setPlaced((prev) => ({ ...prev, [slot.id]: part }));
    setSaved(false);
  };

  const [dragPart, setDragPart] = useState<RobotPart | null>(null);
  const [dragOver, setDragOver] = useState<string | null>(null);

  const saveRobot = async () => {
    const partIds = Object.values(placed).map((p) => p.id);
    const design = Object.fromEntries(Object.entries(placed).map(([k, v]) => [k, v.id]));
    saveRobotParts(partIds);
    saveRobotDesign(design);
    addXP(20);
    setSaved(true);

    if (student) {
      await fetch("/api/activity-results", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ studentId: student.id, activityType: "builder", score: partIds.length * 2 }),
      }).catch(() => {});
    }
  };

  const partsCount = Object.keys(placed).length;

  return (
    <div className="module-page px-4">
      <div className="max-w-5xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-black text-white">🔧 Robot Builder Studio</h1>
          <p className="text-slate-400 mt-1">Drag parts onto the canvas to build your robot! +20 XP when you save.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Parts panel */}
          <div className="glass-card p-4">
            <h3 className="font-bold text-white mb-3">🧩 Robot Parts</h3>
            <div className="flex flex-wrap gap-1 mb-3">
              {partCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCat(cat)}
                  className={`px-2 py-1 rounded-lg text-xs font-bold capitalize transition-colors ${
                    selectedCat === cat ? "bg-blue-600 text-white" : "bg-slate-700 text-slate-400 hover:bg-slate-600"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-2 max-h-80 overflow-y-auto">
              {catParts.map((part) => (
                <motion.div
                  key={part.id}
                  draggable
                  onDragStart={() => setDragPart(part)}
                  onDragEnd={() => setDragPart(null)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 rounded-xl bg-slate-700/60 border border-slate-600 cursor-grab text-center hover:border-blue-500 transition-all"
                  style={{ borderLeftColor: part.color, borderLeftWidth: 3 }}
                >
                  <div className="text-xl mb-1">{part.emoji}</div>
                  <p className="text-xs text-slate-300 font-medium leading-tight">{part.name}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Canvas */}
          <div className="glass-card p-4">
            <h3 className="font-bold text-white mb-3">🤖 Your Robot ({partsCount} parts)</h3>
            <div className="relative bg-slate-900/60 rounded-xl" style={{ height: 360, minHeight: 360 }}>
              {/* Background grid */}
              <div className="absolute inset-0 opacity-10 rounded-xl overflow-hidden"
                style={{ backgroundImage: "radial-gradient(circle, #3B82F6 1px, transparent 1px)", backgroundSize: "20px 20px" }}
              />
              
              {SLOTS.map((slot) => {
                const part = placed[slot.id];
                return (
                  <motion.div
                    key={slot.id}
                    onDragOver={(e) => { e.preventDefault(); setDragOver(slot.id); }}
                    onDragLeave={() => setDragOver(null)}
                    onDrop={(e) => {
                      e.preventDefault();
                      if (dragPart) placePart(slot, dragPart);
                      setDragOver(null);
                    }}
                    onClick={() => {
                      if (dragPart) placePart(slot, dragPart);
                    }}
                    style={{ position: "absolute", left: slot.x, top: slot.y, transform: "translate(-50%, -50%)" }}
                    className={`w-12 h-12 rounded-xl border-2 flex flex-col items-center justify-center cursor-pointer transition-all ${
                      dragOver === slot.id
                        ? "border-blue-400 bg-blue-900/40 scale-110"
                        : part
                        ? "border-transparent bg-transparent"
                        : "border-slate-600/40 border-dashed bg-slate-800/20"
                    }`}
                    animate={dragOver === slot.id ? { scale: 1.15 } : { scale: 1 }}
                  >
                    {part ? (
                      <div className="text-center" title={part.name}>
                        <div className="text-2xl">{part.emoji}</div>
                      </div>
                    ) : (
                      <span className="text-xs text-slate-600 text-center leading-tight px-1">{slot.label}</span>
                    )}
                  </motion.div>
                );
              })}
            </div>

            <div className="mt-3 text-xs text-slate-500 text-center">
              Select a part from the panel, then click a slot on the canvas
            </div>
          </div>

          {/* Description */}
          <div className="glass-card p-4 flex flex-col gap-4">
            <div>
              <h3 className="font-bold text-white mb-3">📝 Name Your Robot</h3>
              <input
                value={robotName}
                onChange={(e) => setRobotName(e.target.value)}
                placeholder="e.g. RoboMax 3000..."
                className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-600 text-white text-sm focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <p className="text-sm font-bold text-white mb-2">📋 Parts Used:</p>
              {partsCount === 0 ? (
                <p className="text-sm text-slate-500">No parts placed yet.</p>
              ) : (
                <div className="space-y-1 max-h-40 overflow-y-auto">
                  {Object.entries(placed).map(([slot, part]) => (
                    <div key={slot} className="flex items-center gap-2 text-xs text-slate-300">
                      <span>{part.emoji}</span>
                      <span className="font-medium">{part.name}</span>
                      <span className="text-slate-500">({slot})</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div>
              <p className="text-sm font-bold text-white mb-2">✍️ Describe your robot:</p>
              <p className="text-xs text-slate-500 mb-1">My robot is ___. It can ___. It works in ___.</p>
              <textarea
                rows={3}
                placeholder="My robot is strong. It can carry boxes..."
                className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-600 text-white text-sm focus:outline-none focus:border-emerald-500 resize-none"
              />
            </div>

            <motion.button
              onClick={saveRobot}
              whileTap={{ scale: 0.97 }}
              disabled={partsCount === 0}
              className="w-full py-3 rounded-xl font-black text-white bg-gradient-to-r from-emerald-600 to-teal-500 hover:brightness-110 transition-all disabled:opacity-40"
            >
              {saved ? "✅ Saved! +20 XP" : "💾 Save My Robot!"}
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}
