"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { IncomeSource } from "@/types";
import { formatUSD } from "@/lib/utils";
import {
  DollarSign,
  Building2,
  Coins,
  Image,
  Gift,
  Users,
  Percent,
  Repeat,
  HelpCircle,
  Eye,
  AlertTriangle,
} from "lucide-react";

interface IncomeSourcesCardProps {
  sources: IncomeSource[];
}

const sourceIcons: Record<string, React.ReactNode> = {
  cex_withdrawal: <Building2 className="w-4 h-4" />,
  defi_yield: <Percent className="w-4 h-4" />,
  nft_sale: <Image className="w-4 h-4" />,
  airdrop: <Gift className="w-4 h-4" />,
  p2p_transfer: <Users className="w-4 h-4" />,
  staking_reward: <Coins className="w-4 h-4" />,
  swap_profit: <Repeat className="w-4 h-4" />,
  unknown: <HelpCircle className="w-4 h-4" />,
};

const sourceColors: Record<string, string> = {
  cex_withdrawal: "from-red-500/20 to-red-600/10 border-red-500/30",
  defi_yield: "from-green-500/20 to-emerald-600/10 border-green-500/30",
  nft_sale: "from-purple-500/20 to-violet-600/10 border-purple-500/30",
  airdrop: "from-yellow-500/20 to-amber-600/10 border-yellow-500/30",
  p2p_transfer: "from-blue-500/20 to-indigo-600/10 border-blue-500/30",
  staking_reward: "from-cyan-500/20 to-teal-600/10 border-cyan-500/30",
  swap_profit: "from-[#00fff9]/20 to-[#b026ff]/10 border-[#00fff9]/30",
  unknown: "from-white/10 to-white/5 border-white/20",
};

const sourceTextColors: Record<string, string> = {
  cex_withdrawal: "text-red-400",
  defi_yield: "text-green-400",
  nft_sale: "text-purple-400",
  airdrop: "text-yellow-400",
  p2p_transfer: "text-blue-400",
  staking_reward: "text-cyan-400",
  swap_profit: "text-[#00fff9]",
  unknown: "text-white/50",
};

export function IncomeSourcesCard({ sources }: IncomeSourcesCardProps) {
  const totalIncome = sources.reduce((sum, s) => sum + s.amount, 0);
  const hasCexIncome = sources.some(s => s.type === "cex_withdrawal" && s.amount > 0);

  return (
    <Card className="border-[#00fff9]/30">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-[#00fff9]" />
            Income Sources
          </div>
          <span className="text-lg font-bold text-[#00fff9]">{formatUSD(totalIncome)}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Warning about visibility */}
        <div className="mb-4 p-3 bg-[#ff0844]/10 border border-[#ff0844]/30 rounded-lg">
          <div className="flex items-start gap-2">
            <Eye className="w-4 h-4 text-[#ff0844] flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-bold text-[#ff0844]">Your Income is Public</p>
              <p className="text-xs text-white/70 mt-1">
                Anyone can see where your money comes from. Tax authorities and employers can analyze this data.
              </p>
            </div>
          </div>
        </div>

        {/* CEX Warning */}
        {hasCexIncome && (
          <div className="mb-4 p-3 bg-orange-500/10 border border-orange-500/30 rounded-lg">
            <div className="flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-orange-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-bold text-orange-400">CEX Withdrawals Detected</p>
                <p className="text-xs text-white/70 mt-1">
                  Direct CEX withdrawals link your KYC identity to this wallet. Use encrypt.trade to break this connection.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Visual Chart */}
        {sources.length > 0 && (
          <div className="mb-6">
            <p className="text-xs text-white/40 uppercase tracking-wide mb-3">Income Breakdown</p>
            <div className="h-4 rounded-full overflow-hidden flex bg-white/10">
              {sources.map((source, i) => (
                <motion.div
                  key={source.type}
                  initial={{ width: 0 }}
                  animate={{ width: `${source.percentage}%` }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className={`h-full ${
                    source.type === "cex_withdrawal" ? "bg-red-500" :
                    source.type === "defi_yield" ? "bg-green-500" :
                    source.type === "nft_sale" ? "bg-purple-500" :
                    source.type === "airdrop" ? "bg-yellow-500" :
                    source.type === "p2p_transfer" ? "bg-blue-500" :
                    source.type === "staking_reward" ? "bg-cyan-500" :
                    source.type === "swap_profit" ? "bg-[#00fff9]" :
                    "bg-white/30"
                  }`}
                  title={`${source.label}: ${source.percentage.toFixed(1)}%`}
                />
              ))}
            </div>
          </div>
        )}

        {/* Income Sources List */}
        <div className="space-y-3">
          {sources.map((source, i) => (
            <motion.div
              key={source.type}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`p-3 rounded-lg bg-gradient-to-r border ${sourceColors[source.type]}`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full bg-white/10 flex items-center justify-center ${sourceTextColors[source.type]}`}>
                    {sourceIcons[source.type]}
                  </div>
                  <div>
                    <p className="font-medium text-sm">{source.label}</p>
                    <p className="text-xs text-white/40">{source.count} transactions</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-bold ${sourceTextColors[source.type]}`}>{formatUSD(source.amount)}</p>
                  <p className="text-xs text-white/40">{source.percentage.toFixed(1)}%</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* No income */}
        {sources.length === 0 && (
          <div className="text-center py-6">
            <DollarSign className="w-10 h-10 text-white/20 mx-auto mb-2" />
            <p className="text-sm text-white/50">No income sources detected</p>
            <p className="text-xs text-white/30 mt-1">Either you&apos;re not receiving funds, or our analysis is incomplete</p>
          </div>
        )}

        {/* What this reveals */}
        <div className="mt-6 p-3 bg-white/5 rounded-lg">
          <p className="text-xs font-bold text-white/70 mb-2">What This Reveals About You:</p>
          <ul className="text-xs text-white/50 space-y-1">
            {hasCexIncome && (
              <li>- Your identity (KYC-linked CEX usage)</li>
            )}
            {sources.some(s => s.type === "airdrop") && (
              <li>- You&apos;re an early adopter (airdrop farming)</li>
            )}
            {sources.some(s => s.type === "defi_yield") && (
              <li>- You use DeFi (sophisticated user)</li>
            )}
            {sources.some(s => s.type === "nft_sale") && (
              <li>- You trade NFTs (collectible interests)</li>
            )}
            {sources.some(s => s.type === "staking_reward") && (
              <li>- You&apos;re a long-term holder (staker)</li>
            )}
          </ul>
        </div>

        {/* Meme */}
        <div className="mt-4 p-3 bg-gradient-to-r from-[#00fff9]/10 to-[#b026ff]/10 rounded-lg text-center">
          <p className="text-xs text-white/70 italic">
            &quot;I don&apos;t need to hide my income&quot; - Someone whose employer just Googled their wallet
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
