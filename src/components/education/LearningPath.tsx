"use client";

import { motion } from "framer-motion";
import { Lock, Check, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface LevelNode {
  level: number;
  title: string;
  subtitle: string;
  emoji: string;
  isUnlocked: boolean;
  isCompleted: boolean;
}

interface LearningPathProps {
  levels: LevelNode[];
  currentLevel: number;
  onSelectLevel: (level: number) => void;
}

export function LearningPath({ levels, currentLevel, onSelectLevel }: LearningPathProps) {
  // Colors for each level
  const levelColors = [
    { bg: "from-red-500 to-orange-500", glow: "shadow-red-500/50", ring: "ring-red-500" },
    { bg: "from-orange-500 to-yellow-500", glow: "shadow-orange-500/50", ring: "ring-orange-500" },
    { bg: "from-yellow-500 to-green-500", glow: "shadow-yellow-500/50", ring: "ring-yellow-500" },
    { bg: "from-purple-500 to-pink-500", glow: "shadow-purple-500/50", ring: "ring-purple-500" },
    { bg: "from-cyan-500 to-blue-500", glow: "shadow-cyan-500/50", ring: "ring-cyan-500" },
  ];

  return (
    <div className="relative py-8">
      {/* The winding path SVG */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        preserveAspectRatio="none"
        viewBox="0 0 400 600"
      >
        <defs>
          <linearGradient id="pathGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#00fff9" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#b026ff" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#00fff9" stopOpacity="0.6" />
          </linearGradient>
        </defs>
        {/* Dotted path connecting levels */}
        <path
          d="M 200 50 Q 320 100 200 170 Q 80 240 200 310 Q 320 380 200 450 Q 80 520 200 580"
          fill="none"
          stroke="url(#pathGradient)"
          strokeWidth="4"
          strokeDasharray="12 8"
          strokeLinecap="round"
        />
      </svg>

      {/* Level nodes */}
      <div className="relative flex flex-col gap-16">
        {levels.map((level, index) => {
          const isCurrentLevel = level.level === currentLevel;
          const color = levelColors[index];
          const isEven = index % 2 === 0;

          return (
            <motion.div
              key={level.level}
              initial={{ opacity: 0, x: isEven ? -50 : 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={cn(
                "relative flex items-center gap-4",
                isEven ? "justify-start pl-4 sm:pl-12" : "justify-end pr-4 sm:pr-12"
              )}
            >
              {/* Character indicator for current level */}
              {isCurrentLevel && (
                <motion.div
                  className={cn(
                    "absolute z-20",
                    isEven ? "-left-2 sm:left-4" : "-right-2 sm:right-4"
                  )}
                  animate={{
                    y: [0, -8, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <div className="relative">
                    {/* Character */}
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-[#b026ff] to-[#00fff9] flex items-center justify-center shadow-lg shadow-[#b026ff]/50 border-4 border-white/20">
                      <span className="text-3xl sm:text-4xl">🧑‍🚀</span>
                    </div>
                    {/* Speech bubble */}
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      className={cn(
                        "absolute -top-12 whitespace-nowrap bg-white text-black text-xs font-bold px-3 py-1.5 rounded-full shadow-lg",
                        isEven ? "left-0" : "right-0"
                      )}
                    >
                      You are here! 📍
                      <div className={cn(
                        "absolute -bottom-1 w-2 h-2 bg-white rotate-45",
                        isEven ? "left-4" : "right-4"
                      )} />
                    </motion.div>
                    {/* Sparkles */}
                    <Sparkles className="absolute -top-1 -right-1 w-5 h-5 text-yellow-400 animate-pulse" />
                  </div>
                </motion.div>
              )}

              {/* Level node */}
              <motion.button
                onClick={() => level.isUnlocked && onSelectLevel(level.level)}
                disabled={!level.isUnlocked}
                whileHover={level.isUnlocked ? { scale: 1.05 } : {}}
                whileTap={level.isUnlocked ? { scale: 0.95 } : {}}
                className={cn(
                  "relative flex items-center gap-3 p-3 sm:p-4 rounded-2xl transition-all",
                  "border-2 backdrop-blur-sm",
                  level.isUnlocked
                    ? "bg-white/10 border-white/20 hover:border-white/40 cursor-pointer"
                    : "bg-white/5 border-white/10 cursor-not-allowed opacity-60",
                  isCurrentLevel && "ring-2 ring-offset-2 ring-offset-black " + color.ring
                )}
                style={{ maxWidth: "280px" }}
              >
                {/* Level circle */}
                <div
                  className={cn(
                    "w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center flex-shrink-0 transition-all",
                    level.isUnlocked
                      ? `bg-gradient-to-br ${color.bg} shadow-lg ${color.glow}`
                      : "bg-white/10"
                  )}
                >
                  {!level.isUnlocked ? (
                    <Lock className="w-6 h-6 text-white/40" />
                  ) : level.isCompleted ? (
                    <div className="relative">
                      <span className="text-2xl sm:text-3xl">{level.emoji}</span>
                      <Check className="absolute -bottom-1 -right-1 w-5 h-5 text-green-400 bg-green-900 rounded-full p-0.5" />
                    </div>
                  ) : (
                    <span className="text-2xl sm:text-3xl">{level.emoji}</span>
                  )}
                </div>

                {/* Level info */}
                <div className="text-left min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-xs font-bold text-white/60">
                      LEVEL {level.level}
                    </span>
                    {level.isCompleted && (
                      <span className="text-[10px] bg-green-500/20 text-green-400 px-1.5 py-0.5 rounded-full">
                        ✓ DONE
                      </span>
                    )}
                  </div>
                  <h3 className="font-bold text-sm sm:text-base truncate text-white">
                    {level.title}
                  </h3>
                  <p className="text-xs text-white/50 truncate hidden sm:block">
                    {level.subtitle}
                  </p>
                </div>
              </motion.button>

              {/* Connecting sparkles for completed levels */}
              {level.isCompleted && index < levels.length - 1 && (
                <motion.div
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-8"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <span className="text-lg">✨</span>
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Finish line / Trophy at the end */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
        className="flex justify-center mt-8"
      >
        <div className={cn(
          "px-6 py-3 rounded-full border-2 flex items-center gap-2",
          levels.every(l => l.isCompleted)
            ? "bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border-yellow-500/50"
            : "bg-white/5 border-white/20"
        )}>
          <span className="text-2xl">🏆</span>
          <span className={cn(
            "font-bold",
            levels.every(l => l.isCompleted) ? "text-yellow-400" : "text-white/40"
          )}>
            {levels.every(l => l.isCompleted) ? "Privacy Master!" : "Finish Line"}
          </span>
        </div>
      </motion.div>
    </div>
  );
}
