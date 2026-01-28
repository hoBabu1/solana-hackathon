"use client";

import { motion } from "framer-motion";
import { Lock, Check, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface LevelCardProps {
  level: number;
  title: string;
  subtitle: string;
  emoji: string;
  isUnlocked: boolean;
  isCompleted: boolean;
  onClick: () => void;
}

export function LevelCard({
  level,
  title,
  subtitle,
  emoji,
  isUnlocked,
  isCompleted,
  onClick,
}: LevelCardProps) {
  const colors = [
    { bg: "bg-red-500/10", border: "border-red-500/30", text: "text-red-500" },
    { bg: "bg-orange-500/10", border: "border-orange-500/30", text: "text-orange-500" },
    { bg: "bg-yellow-500/10", border: "border-yellow-500/30", text: "text-yellow-500" },
    { bg: "bg-purple-500/10", border: "border-purple-500/30", text: "text-purple-500" },
    { bg: "bg-cyan-500/10", border: "border-cyan-500/30", text: "text-cyan-500" },
  ];

  const color = colors[level - 1] || colors[0];

  return (
    <motion.button
      onClick={onClick}
      disabled={!isUnlocked}
      whileHover={isUnlocked ? { scale: 1.02 } : {}}
      whileTap={isUnlocked ? { scale: 0.98 } : {}}
      className={cn(
        "w-full p-4 glass-card border transition-all text-left",
        isUnlocked ? color.border : "border-white/10 opacity-50",
        isUnlocked && "hover:shadow-lg cursor-pointer",
        !isUnlocked && "cursor-not-allowed"
      )}
    >
      <div className="flex items-center gap-4">
        {/* Level indicator */}
        <div
          className={cn(
            "w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0",
            isUnlocked ? color.bg : "bg-white/5"
          )}
        >
          {!isUnlocked ? (
            <Lock className="w-6 h-6 text-white/40" />
          ) : isCompleted ? (
            <Check className="w-6 h-6 text-green-500" />
          ) : (
            <span className="text-3xl">{emoji}</span>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className={cn("text-xs font-semibold", isUnlocked ? color.text : "text-white/40")}>
              LEVEL {level}
            </span>
            {isCompleted && (
              <span className="text-xs bg-green-500/20 text-green-500 px-2 py-0.5 rounded-full">
                COMPLETED
              </span>
            )}
          </div>
          <h3 className={cn("font-bold truncate", !isUnlocked && "text-white/40")}>
            {title}
          </h3>
          <p className="text-sm text-white/60 truncate">{subtitle}</p>
        </div>

        {/* Arrow */}
        {isUnlocked && (
          <ChevronRight className={cn("w-5 h-5 flex-shrink-0", color.text)} />
        )}
      </div>
    </motion.button>
  );
}
