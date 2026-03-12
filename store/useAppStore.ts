"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Student = {
  id: string;
  nickname: string;
  createdAt: string;
};

export type Progress = {
  id: string;
  studentId: string;
  xpPoints: number;
  grammarLevel: number;
  instructionsLevel: number;
  robotParts: string[];
  robotDesign: Record<string, string>;
  updatedAt: string;
};

type AppStore = {
  student: Student | null;
  progress: Progress | null;
  setStudent: (s: Student) => void;
  setProgress: (p: Progress) => void;
  addXP: (amount: number) => void;
  saveRobotParts: (parts: string[]) => void;
  saveRobotDesign: (design: Record<string, string>) => void;
  clearSession: () => void;
};

export const useAppStore = create<AppStore>()(
  persist(
    (set, get) => ({
      student: null,
      progress: null,

      setStudent: (s) => set({ student: s }),

      setProgress: (p) => set({ progress: p }),

      addXP: (amount) => {
        const p = get().progress;
        if (!p) return;
        const newXP = p.xpPoints + amount;
        const newLevel = Math.floor(newXP / 100) + 1;
        const updated = { ...p, xpPoints: newXP, grammarLevel: newLevel };
        set({ progress: updated });
        // sync to DB
        fetch("/api/progress", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ studentId: p.studentId, xpPoints: newXP, grammarLevel: newLevel }),
        }).catch(() => {});
      },

      saveRobotParts: (parts) => {
        const p = get().progress;
        if (!p) return;
        const updated = { ...p, robotParts: parts };
        set({ progress: updated });
        fetch("/api/progress", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ studentId: p.studentId, robotParts: parts }),
        }).catch(() => {});
      },

      saveRobotDesign: (design) => {
        const p = get().progress;
        if (!p) return;
        const updated = { ...p, robotDesign: design };
        set({ progress: updated });
        fetch("/api/progress", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ studentId: p.studentId, robotDesign: design }),
        }).catch(() => {});
      },

      clearSession: () => set({ student: null, progress: null }),
    }),
    {
      name: "robot-lab-session",
    }
  )
);
