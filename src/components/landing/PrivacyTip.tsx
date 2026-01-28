"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lightbulb, X } from "lucide-react";
import { getRandomPrivacyTip } from "@/lib/utils";

export function PrivacyTip() {
  const [tip, setTip] = useState<string>("");
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    setTip(getRandomPrivacyTip());
  }, []);

  if (!isVisible || !tip) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:max-w-md z-40"
      >
        <div className="glass-card p-4 border-[#b026ff]/30 flex items-start gap-3">
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#b026ff]/20 flex items-center justify-center">
            <Lightbulb className="w-5 h-5 text-[#b026ff]" />
          </div>
          <div className="flex-1">
            <p className="text-xs text-[#b026ff] font-semibold mb-1">Daily Privacy Tip</p>
            <p className="text-sm text-white/80">{tip}</p>
          </div>
          <button
            onClick={() => setIsVisible(false)}
            className="text-white/40 hover:text-white/60 transition-colors"
          >
            <X size={18} />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
