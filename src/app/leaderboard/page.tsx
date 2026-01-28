"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { shortenAddress } from "@/lib/utils";
import { Trophy, AlertTriangle, TrendingUp, Eye } from "lucide-react";
import Link from "next/link";

// Mock leaderboard data (in a real app, this would come from an API)
const generateMockLeaderboard = () => {
  const wallets = [];
  for (let i = 0; i < 20; i++) {
    const chars = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
    let address = "";
    for (let j = 0; j < 44; j++) {
      address += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    wallets.push({
      address,
      score: Math.floor(Math.random() * 30) + 70, // 70-100
      transactions: Math.floor(Math.random() * 1000) + 100,
      netWorth: Math.floor(Math.random() * 50000) + 1000,
    });
  }
  return wallets.sort((a, b) => b.score - a.score);
};

export default function LeaderboardPage() {
  const [leaderboard, setLeaderboard] = useState<ReturnType<typeof generateMockLeaderboard>>([]);
  const [stats, setStats] = useState({
    totalScanned: 127493,
    avgScore: 67,
    highestToday: 98,
  });

  useEffect(() => {
    setLeaderboard(generateMockLeaderboard());
  }, []);

  const getRankStyle = (rank: number) => {
    if (rank === 1) return "bg-yellow-500/20 border-yellow-500/50 text-yellow-500";
    if (rank === 2) return "bg-gray-400/20 border-gray-400/50 text-gray-400";
    if (rank === 3) return "bg-orange-600/20 border-orange-600/50 text-orange-600";
    return "bg-white/5 border-white/10";
  };

  const getRankEmoji = (rank: number) => {
    if (rank === 1) return "🥇";
    if (rank === 2) return "🥈";
    if (rank === 3) return "🥉";
    return `#${rank}`;
  };

  return (
    <div className="min-h-screen cyber-grid py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#ff0844]/20 flex items-center justify-center">
            <Trophy className="w-8 h-8 text-[#ff0844]" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">
            Wall of <span className="text-[#ff0844]">Exposure</span>
          </h1>
          <p className="text-white/60">
            The most exposed wallets on Solana. Don&apos;t be on this list.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-3 gap-4 mb-8"
        >
          <Card>
            <div className="p-4 text-center">
              <p className="text-2xl font-bold text-[#00fff9]">{stats.totalScanned.toLocaleString()}</p>
              <p className="text-xs text-white/60">Wallets Scanned</p>
            </div>
          </Card>
          <Card>
            <div className="p-4 text-center">
              <p className="text-2xl font-bold text-[#b026ff]">{stats.avgScore}%</p>
              <p className="text-xs text-white/60">Avg Exposure</p>
            </div>
          </Card>
          <Card>
            <div className="p-4 text-center">
              <p className="text-2xl font-bold text-[#ff0844]">{stats.highestToday}%</p>
              <p className="text-xs text-white/60">Highest Today</p>
            </div>
          </Card>
        </motion.div>

        {/* Warning */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <Card className="border-yellow-500/30">
            <div className="p-4 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="font-semibold text-yellow-500 mb-1">This is a demonstration</p>
                <p className="text-white/60">
                  These are anonymized example wallets. Connect your wallet to see your real exposure score.
                </p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Leaderboard */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <div className="p-4 border-b border-white/10">
              <div className="flex items-center justify-between">
                <h2 className="font-bold flex items-center gap-2">
                  <Eye className="w-5 h-5 text-[#ff0844]" />
                  Top 20 Most Exposed
                </h2>
                <span className="text-xs text-white/40">Updated live</span>
              </div>
            </div>

            <div className="divide-y divide-white/5">
              {leaderboard.map((wallet, index) => (
                <motion.div
                  key={wallet.address}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.03 }}
                  className={`p-4 flex items-center gap-4 ${index < 3 ? "bg-white/[0.02]" : ""}`}
                >
                  {/* Rank */}
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold border ${getRankStyle(
                      index + 1
                    )}`}
                  >
                    {getRankEmoji(index + 1)}
                  </div>

                  {/* Wallet info */}
                  <div className="flex-1 min-w-0">
                    <p className="font-mono text-sm truncate">{shortenAddress(wallet.address, 6)}</p>
                    <p className="text-xs text-white/40">
                      {wallet.transactions.toLocaleString()} txns • ${wallet.netWorth.toLocaleString()}
                    </p>
                  </div>

                  {/* Score */}
                  <div className="text-right">
                    <p
                      className={`text-xl font-bold ${
                        wallet.score >= 90
                          ? "text-[#ff0844]"
                          : wallet.score >= 80
                          ? "text-orange-500"
                          : "text-yellow-500"
                      }`}
                    >
                      {wallet.score}%
                    </p>
                    <p className="text-xs text-white/40">exposed</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 text-center"
        >
          <p className="text-white/60 mb-4">Want to see where you rank?</p>
          <Link href="/scan">
            <Button size="lg">
              <TrendingUp className="w-5 h-5" />
              Scan Your Wallet
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
