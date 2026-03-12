import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        nunito: ["var(--font-nunito)", "sans-serif"],
      },
      colors: {
        "robot-blue": "#3B82F6",
        "robot-dark": "#0F172A",
        "robot-amber": "#F59E0B",
        "robot-green": "#10B981",
      },
      backgroundImage: {
        "grid-pattern": "radial-gradient(circle, #1e293b 1px, transparent 1px)",
      },
    },
  },
  plugins: [],
};
export default config;
