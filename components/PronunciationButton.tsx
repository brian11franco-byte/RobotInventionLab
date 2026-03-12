"use client";
import { useState } from "react";
import { motion } from "framer-motion";

type Props = {
  word: string;
  example?: string;
};

export default function PronunciationButton({ word, example }: Props) {
  const [playing, setPlaying] = useState(false);

  const speak = () => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    setPlaying(true);
    const utter = new SpeechSynthesisUtterance(example ?? word);
    utter.rate = 0.85;
    utter.pitch = 1.1;
    utter.onend = () => setPlaying(false);
    window.speechSynthesis.speak(utter);
  };

  return (
    <motion.button
      onClick={speak}
      whileTap={{ scale: 0.9 }}
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
        playing
          ? "bg-blue-600 text-white"
          : "bg-blue-900/50 text-blue-300 hover:bg-blue-700 hover:text-white border border-blue-700/50"
      }`}
    >
      <motion.span
        animate={playing ? { scale: [1, 1.3, 1] } : {}}
        transition={{ repeat: Infinity, duration: 0.5 }}
      >
        🔊
      </motion.span>
      {playing ? "Playing..." : "Listen"}
    </motion.button>
  );
}
