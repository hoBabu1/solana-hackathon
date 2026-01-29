"use client";

import { motion } from "framer-motion";
import { Baby, Code2 } from "lucide-react";

interface ModeToggleProps {
  mode: "eli5" | "tech";
  onModeChange: (mode: "eli5" | "tech") => void;
}

export function ModeToggle({ mode, onModeChange }: ModeToggleProps) {
  return (
    <div className="flex items-center justify-center gap-2 p-1 bg-white/5 rounded-full">
      <button
        onClick={() => onModeChange("eli5")}
        className={`relative flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
          mode === "eli5" ? "text-white" : "text-white/50 hover:text-white/70"
        }`}
      >
        {mode === "eli5" && (
          <motion.div
            layoutId="mode-bg"
            className="absolute inset-0 bg-gradient-to-r from-[#b026ff] to-[#00fff9] rounded-full"
            initial={false}
            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
          />
        )}
        <span className="relative flex items-center gap-2">
          <Baby className="w-4 h-4" />
          ELI5 Mode
        </span>
      </button>
      <button
        onClick={() => onModeChange("tech")}
        className={`relative flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
          mode === "tech" ? "text-white" : "text-white/50 hover:text-white/70"
        }`}
      >
        {mode === "tech" && (
          <motion.div
            layoutId="mode-bg"
            className="absolute inset-0 bg-gradient-to-r from-[#00fff9] to-[#b026ff] rounded-full"
            initial={false}
            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
          />
        )}
        <span className="relative flex items-center gap-2">
          <Code2 className="w-4 h-4" />
          Tech Mode
        </span>
      </button>
    </div>
  );
}
