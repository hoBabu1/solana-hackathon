"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface ProgressBarProps {
  value: number;
  max?: number;
  className?: string;
  showLabel?: boolean;
  variant?: "default" | "danger" | "success";
}

export function ProgressBar({
  value,
  max = 100,
  className,
  showLabel = false,
  variant = "default",
}: ProgressBarProps) {
  const percentage = Math.min(100, (value / max) * 100);

  const variants = {
    default: "from-[#00fff9] to-[#b026ff]",
    danger: "from-[#ff0844] to-[#ff6b00]",
    success: "from-[#00ff9f] to-[#00fff9]",
  };

  return (
    <div className={cn("w-full", className)}>
      <div className="progress-bar h-3 w-full">
        <motion.div
          className={cn("h-full bg-gradient-to-r rounded-full", variants[variant])}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </div>
      {showLabel && (
        <p className="text-right text-sm text-white/60 mt-1">{Math.round(percentage)}%</p>
      )}
    </div>
  );
}
