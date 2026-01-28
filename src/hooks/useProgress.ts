"use client";

import { useLocalStorage } from "./useLocalStorage";
import { UserProgress, Achievement } from "@/types";

const DEFAULT_PROGRESS: UserProgress = {
  levels: [
    { level: 1, completed: false, quizPassed: false },
    { level: 2, completed: false, quizPassed: false },
    { level: 3, completed: false, quizPassed: false },
    { level: 4, completed: false, quizPassed: false },
    { level: 5, completed: false, quizPassed: false },
  ],
  badges: [],
  scannedWallets: [],
  totalScans: 0,
};

const ACHIEVEMENTS: Achievement[] = [
  {
    id: "first_scan",
    name: "First Steps",
    description: "Scanned your first wallet",
    icon: "🔍",
    unlocked: false,
  },
  {
    id: "level_1",
    name: "No Longer Clueless",
    description: "Completed Level 1",
    icon: "🎓",
    unlocked: false,
  },
  {
    id: "level_5",
    name: "Privacy Ninja",
    description: "Completed all 5 levels",
    icon: "🥷",
    unlocked: false,
  },
  {
    id: "high_exposure",
    name: "Living Dangerously",
    description: "Got a 90%+ exposure score",
    icon: "🔥",
    unlocked: false,
  },
  {
    id: "shared_results",
    name: "Spread the Word",
    description: "Shared your scan results",
    icon: "📢",
    unlocked: false,
  },
  {
    id: "ten_scans",
    name: "Serial Scanner",
    description: "Performed 10 wallet scans",
    icon: "🔄",
    unlocked: false,
  },
];

export function useProgress() {
  const [progress, setProgress, isLoaded] = useLocalStorage<UserProgress>(
    "walletspy_progress",
    DEFAULT_PROGRESS
  );

  const [achievements, setAchievements] = useLocalStorage<Achievement[]>(
    "walletspy_achievements",
    ACHIEVEMENTS
  );

  const completeLevel = (level: number) => {
    setProgress((prev) => ({
      ...prev,
      levels: prev.levels.map((l) =>
        l.level === level ? { ...l, completed: true, quizPassed: true } : l
      ),
    }));

    // Unlock achievement
    if (level === 1) {
      unlockAchievement("level_1");
    }
    if (level === 5) {
      unlockAchievement("level_5");
    }
  };

  const recordScan = (address: string) => {
    setProgress((prev) => ({
      ...prev,
      scannedWallets: prev.scannedWallets.includes(address)
        ? prev.scannedWallets
        : [...prev.scannedWallets, address],
      totalScans: prev.totalScans + 1,
    }));

    // First scan achievement
    if (progress.totalScans === 0) {
      unlockAchievement("first_scan");
    }

    // 10 scans achievement
    if (progress.totalScans + 1 >= 10) {
      unlockAchievement("ten_scans");
    }
  };

  const unlockAchievement = (id: string) => {
    setAchievements((prev) =>
      prev.map((a) =>
        a.id === id && !a.unlocked
          ? { ...a, unlocked: true, unlockedAt: Date.now() }
          : a
      )
    );
  };

  const isLevelUnlocked = (level: number): boolean => {
    if (level === 1) return true;
    const prevLevel = progress.levels.find((l) => l.level === level - 1);
    return prevLevel?.quizPassed ?? false;
  };

  const getCurrentLevel = (): number => {
    for (let i = 5; i >= 1; i--) {
      const level = progress.levels.find((l) => l.level === i);
      if (level?.completed) return Math.min(i + 1, 5);
    }
    return 1;
  };

  return {
    progress,
    achievements,
    isLoaded,
    completeLevel,
    recordScan,
    unlockAchievement,
    isLevelUnlocked,
    getCurrentLevel,
  };
}
