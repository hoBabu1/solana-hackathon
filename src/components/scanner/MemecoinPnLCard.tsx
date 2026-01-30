"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { MemecoinPnL } from "@/types";
import { formatUSD } from "@/lib/utils";
import {
  TrendingUp,
  TrendingDown,
  Flame,
  Skull,
  Trophy,
  Target,
  ChevronDown,
} from "lucide-react";
import { useState } from "react";

interface MemecoinPnLCardProps {
  pnl: MemecoinPnL;
}

export function MemecoinPnLCard({ pnl }: MemecoinPnLCardProps) {
  const [showAllTrades, setShowAllTrades] = useState(false);
  const isProfitable = pnl.totalPnL > 0;
  const displayTrades = showAllTrades ? pnl.trades : pnl.trades.slice(0, 5);

  return (
    <Card className={`border-2 ${isProfitable ? "border-green-500/50 bg-green-500/5" : "border-[#ff0844]/50 bg-[#ff0844]/5"}`}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-[#ff0844]" />
            Memecoin Trading Losses
          </div>
          <span className={`text-lg font-bold ${isProfitable ? "text-green-400" : "text-[#ff0844]"}`}>
            {isProfitable ? "+" : ""}{formatUSD(pnl.totalPnL)}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Hero Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="p-4 bg-gradient-to-br from-[#ff0844]/20 to-orange-500/10 rounded-xl text-center"
          >
            <Target className="w-6 h-6 text-orange-500 mx-auto mb-2" />
            <p className="text-xs text-white/60 mb-1">Total Invested</p>
            <p className="text-xl font-bold text-orange-400">{formatUSD(pnl.totalInvested)}</p>
          </motion.div>

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className={`p-4 rounded-xl text-center ${
              isProfitable
                ? "bg-gradient-to-br from-green-500/20 to-emerald-500/10"
                : "bg-gradient-to-br from-[#ff0844]/20 to-red-900/10"
            }`}
          >
            {isProfitable ? (
              <TrendingUp className="w-6 h-6 text-green-400 mx-auto mb-2" />
            ) : (
              <TrendingDown className="w-6 h-6 text-[#ff0844] mx-auto mb-2" />
            )}
            <p className="text-xs text-white/60 mb-1">Current Value</p>
            <p className={`text-xl font-bold ${isProfitable ? "text-green-400" : "text-[#ff0844]"}`}>
              {formatUSD(pnl.currentValue)}
            </p>
          </motion.div>
        </div>

        {/* PnL Breakdown */}
        <div className="p-4 bg-white/5 rounded-xl mb-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-white/70">Total P&L</span>
            <span className={`text-2xl font-black ${isProfitable ? "text-green-400" : "text-[#ff0844]"}`}>
              {isProfitable ? "+" : ""}{pnl.percentageChange.toFixed(1)}%
            </span>
          </div>

          {/* Progress bar showing loss percentage */}
          <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden mb-2">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(100, Math.abs(pnl.percentageChange))}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className={`h-full rounded-full ${
                isProfitable
                  ? "bg-gradient-to-r from-green-500 to-emerald-400"
                  : "bg-gradient-to-r from-[#ff0844] to-orange-500"
              }`}
            />
          </div>

          <div className="flex justify-between text-xs text-white/50">
            <span>Realized: {formatUSD(pnl.realizedPnL)}</span>
            <span>Unrealized: {formatUSD(pnl.unrealizedPnL)}</span>
          </div>
        </div>

        {/* Biggest Win/Loss */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {pnl.biggestWin && (
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="p-3 bg-green-500/10 border border-green-500/30 rounded-lg"
            >
              <div className="flex items-center gap-2 mb-2">
                <Trophy className="w-4 h-4 text-green-400" />
                <span className="text-xs font-bold text-green-400">BEST TRADE</span>
              </div>
              <p className="text-lg font-bold text-green-400">+{formatUSD(pnl.biggestWin.pnl)}</p>
              <p className="text-xs text-white/50">{pnl.biggestWin.token}</p>
            </motion.div>
          )}

          {pnl.biggestLoss && (
            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="p-3 bg-[#ff0844]/10 border border-[#ff0844]/30 rounded-lg"
            >
              <div className="flex items-center gap-2 mb-2">
                <Skull className="w-4 h-4 text-[#ff0844]" />
                <span className="text-xs font-bold text-[#ff0844]">WORST TRADE</span>
              </div>
              <p className="text-lg font-bold text-[#ff0844]">{formatUSD(pnl.biggestLoss.pnl)}</p>
              <p className="text-xs text-white/50">{pnl.biggestLoss.token}</p>
            </motion.div>
          )}
        </div>

        {/* Individual Trades */}
        {pnl.trades.length > 0 && (
          <div className="space-y-2">
            <p className="text-xs text-white/40 uppercase tracking-wide mb-2">Trade History</p>
            {displayTrades.map((trade, i) => (
              <motion.div
                key={trade.tokenMint}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="p-3 bg-white/5 rounded-lg flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  {trade.tokenLogoUrl ? (
                    <img src={trade.tokenLogoUrl} alt={trade.token} className="w-8 h-8 rounded-full" />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-[#ff0844]/20 flex items-center justify-center text-xs font-bold">
                      {trade.token.slice(0, 2)}
                    </div>
                  )}
                  <div>
                    <p className="font-medium text-sm flex items-center gap-2">
                      {trade.token}
                      <span className={`text-[10px] px-1.5 py-0.5 rounded ${
                        trade.status === "sold" ? "bg-white/20 text-white/60" :
                        trade.status === "partial" ? "bg-yellow-500/20 text-yellow-500" :
                        "bg-[#00fff9]/20 text-[#00fff9]"
                      }`}>
                        {trade.status.toUpperCase()}
                      </span>
                    </p>
                    <p className="text-xs text-white/40">
                      Invested: {formatUSD(trade.buyValueUsd)} | Current: {formatUSD(trade.currentValueUsd)}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-bold ${trade.pnl >= 0 ? "text-green-400" : "text-[#ff0844]"}`}>
                    {trade.pnl >= 0 ? "+" : ""}{formatUSD(trade.pnl)}
                  </p>
                  <p className={`text-xs ${trade.pnlPercentage >= 0 ? "text-green-400/70" : "text-[#ff0844]/70"}`}>
                    {trade.pnlPercentage >= 0 ? "+" : ""}{trade.pnlPercentage.toFixed(1)}%
                  </p>
                </div>
              </motion.div>
            ))}

            {pnl.trades.length > 5 && (
              <button
                onClick={() => setShowAllTrades(!showAllTrades)}
                className="w-full py-2 text-sm text-[#00fff9] hover:bg-white/5 rounded-lg transition-colors flex items-center justify-center gap-1"
              >
                {showAllTrades ? "Show Less" : `Show All ${pnl.trades.length} Trades`}
                <motion.div animate={{ rotate: showAllTrades ? 180 : 0 }}>
                  <ChevronDown className="w-4 h-4" />
                </motion.div>
              </button>
            )}
          </div>
        )}

        {/* No trades */}
        {pnl.trades.length === 0 && (
          <div className="text-center py-6">
            <Flame className="w-10 h-10 text-white/20 mx-auto mb-2" />
            <p className="text-sm text-white/50">No memecoin trades detected</p>
            <p className="text-xs text-white/30 mt-1">Your gambling data is safe... for now</p>
          </div>
        )}

        {/* Meme */}
        <div className="mt-4 p-3 bg-gradient-to-r from-[#ff0844]/10 to-[#b026ff]/10 rounded-lg text-center">
          <p className="text-xs text-white/70 italic">
            {isProfitable
              ? '"I\'m actually up" - The 1% of memecoin traders (you?)'
              : `"It's not a loss until you sell" - You, staring at -${Math.abs(pnl.percentageChange).toFixed(0)}%`}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
