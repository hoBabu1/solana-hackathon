"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { LearningPath } from "@/components/education/LearningPath";
import { Level1 } from "@/components/education/levels/Level1";
import { Level2 } from "@/components/education/levels/Level2";
import { Level3 } from "@/components/education/levels/Level3";
import { Level4 } from "@/components/education/levels/Level4";
import { Level5 } from "@/components/education/levels/Level5";
import { WhyEncryptQuiz } from "@/components/education/WhyEncryptQuiz";
import { useProgress } from "@/hooks/useProgress";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Card } from "@/components/ui/Card";
import { Trophy, Shield, ExternalLink, GraduationCap, HelpCircle } from "lucide-react";
import { lessons } from "@/data/lessons";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

type TabType = "lessons" | "quiz";

export default function LearnPage() {
  const [activeTab, setActiveTab] = useState<TabType>("lessons");
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
        {/* Hero Section - Personal Intro */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          {/* encrypt.trade branding */}
          <a
            href="https://encrypt.trade"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mb-6"
          >
            <div className="flex items-center justify-center gap-3 px-6 py-3 bg-gradient-to-r from-[#b026ff]/20 to-[#00fff9]/20 rounded-full border border-[#00fff9]/30 hover:border-[#00fff9]/60 transition-colors">
              <Shield className="w-6 h-6 text-[#00fff9]" />
              <span className="text-xl font-bold gradient-text">encrypt.trade</span>
              <ExternalLink className="w-4 h-4 text-white/40" />
            </div>
          </a>

          <div className="max-w-2xl mx-auto mb-6 text-left">
            <Card className="border-[#b026ff]/30">
              <div className="p-5">
                <p className="text-white/80 mb-3">
                  <span className="text-2xl">💬</span> Real talk: Your crypto wallet is basically a public diary.
                  Everyone can see your balance, your trades, your wins, your losses... <em>everything</em>.
                </p>
                <p className="text-white/80 mb-3">
                  That&apos;s where <a href="https://encrypt.trade" target="_blank" rel="noopener noreferrer" className="text-[#00fff9] font-bold hover:underline">encrypt.trade</a> comes in.
                  It&apos;s the first compliant privacy layer for Solana - wrap your tokens,
                  trade privately, unwrap when you&apos;re done. Simple.
                </p>
                <p className="text-white/60 text-sm">
                  But first, let me teach you <em>why</em> you need this. Take these 5 lessons -
                  they&apos;re actually fun. Memes included. 🎭
                </p>
              </div>
            </Card>
          </div>

          {/* Tab Toggle */}
          <div className="flex justify-center gap-2 p-1 bg-white/5 rounded-xl max-w-md mx-auto">
            <button
              onClick={() => setActiveTab("lessons")}
              className={cn(
                "flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-semibold transition-all",
                activeTab === "lessons"
                  ? "bg-gradient-to-r from-[#b026ff] to-[#00fff9] text-white"
                  : "text-white/60 hover:text-white hover:bg-white/5"
              )}
            >
              <GraduationCap className="w-4 h-4" />
              5 Lessons
            </button>
            <button
              onClick={() => setActiveTab("quiz")}
              className={cn(
                "flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-semibold transition-all",
                activeTab === "quiz"
                  ? "bg-gradient-to-r from-[#b026ff] to-[#00fff9] text-white"
                  : "text-white/60 hover:text-white hover:bg-white/5"
              )}
            >
              <Shield className="w-4 h-4" />
              Master Privacy
            </button>
          </div>
        </motion.div>

        {/* Lessons Tab Content */}
        {activeTab === "lessons" && (
          <>
            {/* Progress Card */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="mb-6"
            >
              <Card className="max-w-md mx-auto">
                <div className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-white/60">Your Progress</span>
                    <span className="text-sm font-bold text-[#00fff9]">{completedCount}/5 Lessons</span>
                  </div>
                  <ProgressBar value={completedCount} max={5} />
                  {completedCount === 5 && (
                    <p className="text-xs text-[#00fff9] mt-2 text-center">
                      🎉 You&apos;re ready! Time to try encrypt.trade
                    </p>
                  )}
                </div>
              </Card>
            </motion.div>

            {/* Learning Path - Game-like journey */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mb-8"
            >
              <div className="text-center mb-4">
                <h2 className="text-xl font-bold text-white/80">Your Privacy Journey</h2>
                <p className="text-sm text-white/50">Complete all 5 lessons to become a Privacy Master!</p>
              </div>
              <LearningPath
                levels={lessons.map((lesson, index) => {
                  const levelProgress = progress.levels.find((l) => l.level === index + 1);
                  return {
                    level: index + 1,
                    title: lesson.title,
                    subtitle: lesson.subtitle,
                    emoji: lesson.emoji,
                    isUnlocked: isLevelUnlocked(index + 1),
                    isCompleted: levelProgress?.completed ?? false,
                  };
                })}
                currentLevel={
                  // Find the first incomplete unlocked level, or the last level if all complete
                  progress.levels.find((l) => !l.completed && isLevelUnlocked(l.level))?.level ||
                  (completedCount === 5 ? 5 : completedCount + 1)
                }
                onSelectLevel={(level) => setActiveLevel(level)}
              />
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

            {/* CTA to encrypt.trade */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-8"
            >
              <Card className="border-[#00fff9]/50 bg-gradient-to-r from-[#b026ff]/20 to-[#00fff9]/20 overflow-hidden">
                <div className="p-6 sm:p-8 text-center relative">
                  {/* Background glow effect */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-[#00fff9]/20 blur-3xl" />

                  <div className="relative">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#b026ff] to-[#00fff9] flex items-center justify-center animate-pulse-glow">
                      <Shield className="w-8 h-8 text-white" />
                    </div>

                    <h3 className="text-2xl font-bold mb-3">
                      Okay, You Get It Now. Let&apos;s Do This. 🚀
                    </h3>

                    <p className="text-white/70 mb-2 max-w-lg mx-auto">
                      You&apos;ve seen how exposed your wallet is. You know the risks.
                    </p>
                    <p className="text-white/90 mb-6 max-w-lg mx-auto font-medium">
                      Now come try <span className="text-[#00fff9]">encrypt.trade</span> - I built it specifically for people like you
                      who actually understand why privacy matters.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      <a
                        href="https://encrypt.trade"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button size="lg" className="w-full sm:w-auto bg-gradient-to-r from-[#b026ff] to-[#00fff9] text-lg px-8">
                          <Shield className="w-5 h-5" />
                          Start Trading Privately
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                      </a>
                    </div>

                    <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm text-white/50">
                      <span className="flex items-center gap-1">✓ Non-custodial</span>
                      <span className="flex items-center gap-1">✓ Compliant</span>
                      <span className="flex items-center gap-1">✓ Jupiter liquidity</span>
                      <span className="flex items-center gap-1">✓ No KYC needed</span>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </>
        )}

        {/* Quiz Tab Content */}
        {activeTab === "quiz" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            {/* Quiz intro */}
            <Card className="mb-6 border-[#b026ff]/30">
              <div className="p-6 text-center">
                <span className="text-5xl mb-4 block">🧠</span>
                <h2 className="text-2xl font-bold mb-2">Why encrypt.trade?</h2>
                <p className="text-white/70 mb-4">
                  10 quick questions to understand why privacy matters and how encrypt.trade protects you.
                  Learn the jargon, understand the tech, become a privacy pro.
                </p>
                <div className="flex flex-wrap justify-center gap-3 text-sm">
                  <span className="px-3 py-1 bg-[#b026ff]/20 rounded-full text-[#b026ff]">
                    📚 Learn concepts
                  </span>
                  <span className="px-3 py-1 bg-[#00fff9]/20 rounded-full text-[#00fff9]">
                    🎯 Test yourself
                  </span>
                  <span className="px-3 py-1 bg-yellow-500/20 rounded-full text-yellow-400">
                    🏆 Earn your tier
                  </span>
                </div>
              </div>
            </Card>

            {/* Quiz component */}
            <WhyEncryptQuiz />
          </motion.div>
        )}
      </div>
    </div>
  );
}
