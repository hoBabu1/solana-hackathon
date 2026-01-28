"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { LevelCard } from "@/components/education/LevelCard";
import { Level1 } from "@/components/education/levels/Level1";
import { Level2 } from "@/components/education/levels/Level2";
import { Level3 } from "@/components/education/levels/Level3";
import { Level4 } from "@/components/education/levels/Level4";
import { Level5 } from "@/components/education/levels/Level5";
import { useProgress } from "@/hooks/useProgress";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Card } from "@/components/ui/Card";
import { Trophy } from "lucide-react";

const levels = [
  { level: 1, title: "Noob", subtitle: "Wait, Crypto Isn't Private?", emoji: "🤡" },
  { level: 2, title: "Aware", subtitle: "How Tracking Actually Works", emoji: "🤔" },
  { level: 3, title: "Paranoid", subtitle: "One Mistake = Forever Exposed", emoji: "😰" },
  { level: 4, title: "Privacy Ninja", subtitle: "Selective Privacy FTW", emoji: "🥷" },
  { level: 5, title: "Ghost Mode", subtitle: "Master Class", emoji: "👻" },
];

export default function LearnPage() {
  const [activeLevel, setActiveLevel] = useState<number | null>(null);
  const { progress, isLevelUnlocked, completeLevel, achievements } = useProgress();

  const completedCount = progress.levels.filter((l) => l.completed).length;
  const unlockedAchievements = achievements.filter((a) => a.unlocked);

  const handleCompleteLevel = () => {
    if (activeLevel) {
      completeLevel(activeLevel);
      setActiveLevel(null);
    }
  };

  // Render active level
  if (activeLevel) {
    const LevelComponent = {
      1: Level1,
      2: Level2,
      3: Level3,
      4: Level4,
      5: Level5,
    }[activeLevel];

    if (LevelComponent) {
      return (
        <div className="min-h-screen cyber-grid py-12 px-4">
          <div className="max-w-3xl mx-auto">
            <LevelComponent
              onComplete={handleCompleteLevel}
              onBack={() => setActiveLevel(null)}
            />
          </div>
        </div>
      );
    }
  }

  return (
    <div className="min-h-screen cyber-grid py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">
            Privacy Education Hub
          </h1>
          <p className="text-white/60 mb-6">
            Learn about blockchain privacy through memes, quizzes, and dark humor.
            <br />
            Complete all 5 levels to become a Privacy Ninja.
          </p>

          {/* Progress */}
          <Card className="max-w-md mx-auto">
            <div className="p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-white/60">Your Progress</span>
                <span className="text-sm font-bold text-[#00fff9]">{completedCount}/5 Levels</span>
              </div>
              <ProgressBar value={completedCount} max={5} />
            </div>
          </Card>
        </motion.div>

        {/* Level Map */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="space-y-4 mb-12"
        >
          {/* Render levels in reverse order (5 at top) */}
          {[...levels].reverse().map((level) => {
            const levelProgress = progress.levels.find((l) => l.level === level.level);
            return (
              <div key={level.level} className="relative">
                {/* Connecting line */}
                {level.level > 1 && (
                  <div className="absolute left-7 -top-4 w-0.5 h-4 bg-white/10" />
                )}
                <LevelCard
                  level={level.level}
                  title={level.title}
                  subtitle={level.subtitle}
                  emoji={level.emoji}
                  isUnlocked={isLevelUnlocked(level.level)}
                  isCompleted={levelProgress?.completed ?? false}
                  onClick={() => setActiveLevel(level.level)}
                />
              </div>
            );
          })}
        </motion.div>

        {/* Achievements */}
        {unlockedAchievements.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Card>
              <div className="p-6">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-yellow-500" />
                  Your Achievements
                </h3>
                <div className="flex flex-wrap gap-3">
                  {unlockedAchievements.map((achievement) => (
                    <div
                      key={achievement.id}
                      className="px-3 py-2 glass-card flex items-center gap-2"
                    >
                      <span className="text-xl">{achievement.icon}</span>
                      <div>
                        <p className="text-sm font-semibold">{achievement.name}</p>
                        <p className="text-xs text-white/60">{achievement.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
}
