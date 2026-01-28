"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Flame,
  Eye,
  BarChart3,
} from "lucide-react";
import { formatUSD } from "@/lib/utils";

interface PnLTrackerProps {
  netWorth: number;
  tradingVolume: number;
  biggestWin: { token: string; amount: number } | null;
  biggestLoss: { token: string; amount: number } | null;
  memecoinCount: number;
  degenScore: number;
  swapCount: number;
}

export function PnLTracker({
  netWorth,
  tradingVolume,
  biggestWin,
  biggestLoss,
  memecoinCount,
  degenScore,
  swapCount,
}: PnLTrackerProps) {
  // Estimate PnL (simplified - real implementation would need historical data)
  const estimatedPnL = biggestWin && biggestLoss
    ? biggestWin.amount - biggestLoss.amount
    : 0;

  const isProfitable = estimatedPnL > 0;

  return (
    <Card className="border-[#00fff9]/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-[#00fff9]" />
          Financial Exposure Report
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Warning Banner */}
        <div className="mb-6 p-4 bg-[#ff0844]/10 border border-[#ff0844]/30 rounded-lg">
          <div className="flex items-start gap-3">
            <Eye className="w-5 h-5 text-[#ff0844] flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-[#ff0844] mb-1">Your Finances Are Public</p>
              <p className="text-sm text-white/70">
                Everyone can see your net worth, trading history, and PnL. Tax authorities,
                competitors, and hackers all have access to this data.
              </p>
            </div>
          </div>
        </div>

        {/* Main Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="p-4 bg-gradient-to-br from-[#00fff9]/10 to-[#b026ff]/10 rounded-lg text-center">
            <DollarSign className="w-6 h-6 text-[#00fff9] mx-auto mb-2" />
            <p className="text-xs text-white/60 mb-1">Visible Net Worth</p>
            <p className="text-2xl font-bold text-[#00fff9]">{formatUSD(netWorth)}</p>
            <p className="text-xs text-white/50 mt-1">Anyone can see this</p>
          </div>

          <div className="p-4 bg-gradient-to-br from-[#b026ff]/10 to-[#ff0844]/10 rounded-lg text-center">
            <BarChart3 className="w-6 h-6 text-[#b026ff] mx-auto mb-2" />
            <p className="text-xs text-white/60 mb-1">Trading Volume</p>
            <p className="text-2xl font-bold text-[#b026ff]">{formatUSD(tradingVolume)}</p>
            <p className="text-xs text-white/50 mt-1">{swapCount} swaps tracked</p>
          </div>
        </div>

        {/* Win/Loss Display */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {biggestWin && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg"
            >
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5 text-green-500" />
                <span className="text-sm font-bold text-green-500">Best Trade</span>
              </div>
              <p className="text-2xl font-bold text-green-400">{formatUSD(biggestWin.amount)}</p>
              <p className="text-xs text-white/50">{biggestWin.token}</p>
            </motion.div>
          )}

          {biggestLoss && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="p-4 bg-[#ff0844]/10 border border-[#ff0844]/30 rounded-lg"
            >
              <div className="flex items-center gap-2 mb-2">
                <TrendingDown className="w-5 h-5 text-[#ff0844]" />
                <span className="text-sm font-bold text-[#ff0844]">Worst Trade</span>
              </div>
              <p className="text-2xl font-bold text-[#ff0844]">{formatUSD(biggestLoss.amount)}</p>
              <p className="text-xs text-white/50">{biggestLoss.token}</p>
            </motion.div>
          )}
        </div>

        {/* Degen Meter */}
        <div className="p-4 bg-white/5 rounded-lg mb-6">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Flame className="w-5 h-5 text-[#ff0844]" />
              <span className="font-bold text-white">Degen Score</span>
            </div>
            <span className="text-2xl font-bold text-[#ff0844]">{degenScore}%</span>
          </div>

          {/* Progress bar */}
          <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${degenScore}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className={`h-full rounded-full ${
                degenScore >= 80
                  ? "bg-gradient-to-r from-[#ff0844] to-orange-500"
                  : degenScore >= 50
                  ? "bg-gradient-to-r from-orange-500 to-yellow-500"
                  : "bg-gradient-to-r from-[#00ff9f] to-[#00fff9]"
              }`}
            />
          </div>

          <div className="flex justify-between text-xs text-white/50 mt-2">
            <span>Conservative</span>
            <span>Balanced</span>
            <span>Full Degen</span>
          </div>

          {memecoinCount > 0 && (
            <p className="text-sm text-[#ff0844] mt-3">
              {memecoinCount} memecoin{memecoinCount > 1 ? "s" : ""} in portfolio - contributing to score
            </p>
          )}
        </div>

        {/* Income Sources */}
        <div className="p-4 bg-white/5 rounded-lg">
          <h4 className="font-bold text-white mb-3 flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-[#00fff9]" />
            Detectable Income Sources
          </h4>
          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between p-2 bg-white/5 rounded">
              <span className="text-white/70">DeFi Swaps & Trading</span>
              <span className="text-[#00fff9]">{swapCount > 0 ? "Detected" : "None"}</span>
            </div>
            <div className="flex items-center justify-between p-2 bg-white/5 rounded">
              <span className="text-white/70">Token Holdings</span>
              <span className="text-[#00fff9]">{formatUSD(netWorth)}</span>
            </div>
            <div className="flex items-center justify-between p-2 bg-white/5 rounded">
              <span className="text-white/70">Memecoin Exposure</span>
              <span className={memecoinCount > 5 ? "text-[#ff0844]" : "text-[#00fff9]"}>
                {memecoinCount > 0 ? `${memecoinCount} tokens` : "None"}
              </span>
            </div>
          </div>
        </div>

        {/* Meme */}
        <div className="mt-4 p-3 bg-gradient-to-r from-[#00fff9]/10 to-[#b026ff]/10 rounded-lg text-center">
          <p className="text-sm text-white/70 italic">
            {isProfitable
              ? '"I\'m up so much" - Someone whose exact profit is visible to everyone'
              : '"I\'m in it for the tech" - Someone whose losses are public record'}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
