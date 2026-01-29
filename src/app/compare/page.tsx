"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { analyzeWallet } from "@/lib/scanner";
import { WalletAnalysis } from "@/types";
import { ScoreRing } from "@/components/ui/ScoreRing";
import { formatUSD, shortenAddress, getRandomLoadingMessage } from "@/lib/utils";
import {
  ArrowLeftRight,
  Search,
  Shield,
  AlertTriangle,
  Eye,
  Loader2,
  Trophy,
  TrendingDown,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function ComparePage() {
  const [wallet1, setWallet1] = useState("");
  const [wallet2, setWallet2] = useState("");
  const [analysis1, setAnalysis1] = useState<WalletAnalysis | null>(null);
  const [analysis2, setAnalysis2] = useState<WalletAnalysis | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");
  const [error, setError] = useState("");

  const isValidSolanaAddress = (address: string): boolean => {
    const base58Regex = /^[1-9A-HJ-NP-Za-km-z]{32,44}$/;
    return base58Regex.test(address);
  };

  const handleCompare = async () => {
    if (!wallet1 || !wallet2) {
      setError("Please enter both wallet addresses");
      return;
    }

    if (!isValidSolanaAddress(wallet1) || !isValidSolanaAddress(wallet2)) {
      setError("Invalid wallet address format");
      return;
    }

    setError("");
    setLoading(true);
    setLoadingMessage(getRandomLoadingMessage());

    const interval = setInterval(() => {
      setLoadingMessage(getRandomLoadingMessage());
    }, 2000);

    try {
      const [result1, result2] = await Promise.all([
        analyzeWallet(wallet1),
        analyzeWallet(wallet2),
      ]);
      setAnalysis1(result1);
      setAnalysis2(result2);
    } catch (err) {
      console.error("Comparison failed:", err);
      setError("Failed to analyze wallets. Please try again.");
    } finally {
      clearInterval(interval);
      setLoading(false);
    }
  };

  const ComparisonCard = ({ analysis, label }: { analysis: WalletAnalysis; label: string }) => {
    const getRiskColor = (level: string) => {
      switch (level) {
        case "critical":
          return "text-[#ff0844]";
        case "high":
          return "text-orange-500";
        case "medium":
          return "text-yellow-500";
        default:
          return "text-[#00ff9f]";
      }
    };

    return (
      <Card className="flex-1">
        <div className="p-4">
          <p className="text-xs text-white/40 mb-2">{label}</p>
          <p className="font-mono text-sm mb-4 text-white/70">
            {shortenAddress(analysis.address, 6)}
          </p>

          {/* Score */}
          <div className="flex justify-center mb-4">
            <ScoreRing score={analysis.surveillanceScore} size={120} />
          </div>

          {/* Risk Level */}
          <div className="text-center mb-4">
            <span className={cn(
              "px-3 py-1 rounded-full text-xs font-bold uppercase",
              analysis.riskLevel === "critical" && "bg-[#ff0844]/20 text-[#ff0844]",
              analysis.riskLevel === "high" && "bg-orange-500/20 text-orange-500",
              analysis.riskLevel === "medium" && "bg-yellow-500/20 text-yellow-500",
              analysis.riskLevel === "low" && "bg-[#00ff9f]/20 text-[#00ff9f]"
            )}>
              {analysis.riskLevel} Risk
            </span>
          </div>

          {/* Personality */}
          {analysis.personality && (
            <p className="text-center text-sm font-bold text-[#b026ff] mb-4">
              &ldquo;{analysis.personality}&rdquo;
            </p>
          )}

          {/* Stats */}
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-white/50">Net Worth</span>
              <span className="text-[#00fff9]">{formatUSD(analysis.netWorth)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/50">Tokens</span>
              <span>{analysis.tokens?.length || 0}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/50">Transactions</span>
              <span>{analysis.totalTransactions}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/50">Degen Score</span>
              <span className="text-[#ff0844]">{analysis.degenScore}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/50">Privacy Issues</span>
              <span className={cn(
                analysis.privacyMistakes.length > 3 ? "text-[#ff0844]" : "text-yellow-500"
              )}>
                {analysis.privacyMistakes.length}
              </span>
            </div>
          </div>
        </div>
      </Card>
    );
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
          <div className="flex items-center justify-center gap-3 mb-4">
            <ArrowLeftRight className="w-8 h-8 text-[#00fff9]" />
            <h1 className="text-3xl font-bold">Compare Wallets</h1>
          </div>
          <p className="text-white/60">
            Compare two wallets side-by-side to see which one is more exposed
          </p>
        </motion.div>

        {/* Input Section */}
        {!analysis1 && !analysis2 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="mb-6">
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="text-sm text-white/60 mb-2 block">Wallet 1</label>
                    <Input
                      placeholder="Enter first wallet address"
                      value={wallet1}
                      onChange={(e) => setWallet1(e.target.value)}
                      className="font-mono text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-white/60 mb-2 block">Wallet 2</label>
                    <Input
                      placeholder="Enter second wallet address"
                      value={wallet2}
                      onChange={(e) => setWallet2(e.target.value)}
                      className="font-mono text-sm"
                    />
                  </div>
                </div>

                {error && (
                  <p className="text-[#ff0844] text-sm mb-4 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4" />
                    {error}
                  </p>
                )}

                <Button
                  onClick={handleCompare}
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-[#b026ff] to-[#00fff9]"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Comparing...
                    </>
                  ) : (
                    <>
                      <Search className="w-4 h-4" />
                      Compare Wallets
                    </>
                  )}
                </Button>
              </div>
            </Card>

            {/* Loading State */}
            {loading && (
              <Card className="text-center py-12">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="w-16 h-16 mx-auto mb-4 rounded-full border-4 border-[#00fff9]/20 border-t-[#00fff9]"
                />
                <p className="text-white/60">{loadingMessage}</p>
              </Card>
            )}

            {/* Quick Compare Options */}
            <div className="text-center mt-6">
              <p className="text-sm text-white/40 mb-3">Or try a quick comparison:</p>
              <div className="flex flex-wrap justify-center gap-2">
                <button
                  onClick={() => {
                    setWallet1("APJGCFA8JkT4gapvRU4G76ugGXYkFAfdfFKDQDWdHVrs");
                    setWallet2("toly.sol");
                  }}
                  className="px-3 py-1.5 text-xs bg-white/5 hover:bg-white/10 rounded-full transition-colors"
                >
                  Default vs Toly
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Results */}
        {analysis1 && analysis2 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {/* Back Button */}
            <button
              onClick={() => {
                setAnalysis1(null);
                setAnalysis2(null);
                setWallet1("");
                setWallet2("");
              }}
              className="mb-6 text-white/60 hover:text-[#00fff9] transition-colors text-sm flex items-center gap-2"
            >
              ← Compare different wallets
            </button>

            {/* Winner Banner */}
            <Card className="mb-6 border-[#00fff9]/50 bg-gradient-to-r from-[#b026ff]/20 to-[#00fff9]/20">
              <div className="p-4 text-center">
                {analysis1.surveillanceScore < analysis2.surveillanceScore ? (
                  <>
                    <Trophy className="w-8 h-8 text-[#00fff9] mx-auto mb-2" />
                    <p className="font-bold text-lg">Wallet 1 is more private!</p>
                    <p className="text-sm text-white/60">
                      {analysis2.surveillanceScore - analysis1.surveillanceScore}% less exposed than Wallet 2
                    </p>
                  </>
                ) : analysis2.surveillanceScore < analysis1.surveillanceScore ? (
                  <>
                    <Trophy className="w-8 h-8 text-[#00fff9] mx-auto mb-2" />
                    <p className="font-bold text-lg">Wallet 2 is more private!</p>
                    <p className="text-sm text-white/60">
                      {analysis1.surveillanceScore - analysis2.surveillanceScore}% less exposed than Wallet 1
                    </p>
                  </>
                ) : (
                  <>
                    <Eye className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                    <p className="font-bold text-lg">Equal Exposure!</p>
                    <p className="text-sm text-white/60">
                      Both wallets have the same surveillance score
                    </p>
                  </>
                )}
              </div>
            </Card>

            {/* Side by Side Comparison */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <ComparisonCard analysis={analysis1} label="WALLET 1" />
              <ComparisonCard analysis={analysis2} label="WALLET 2" />
            </div>

            {/* Privacy Tip */}
            <Card className="border-[#b026ff]/30">
              <div className="p-6 text-center">
                <Shield className="w-8 h-8 text-[#00fff9] mx-auto mb-3" />
                <h3 className="font-bold text-lg mb-2">Want to reduce your exposure?</h3>
                <p className="text-white/60 text-sm mb-4">
                  Use encrypt.trade to wrap your tokens and trade privately.
                  Break the surveillance chain.
                </p>
                <a href="https://encrypt.trade" target="_blank" rel="noopener noreferrer">
                  <Button className="bg-gradient-to-r from-[#b026ff] to-[#00fff9]">
                    <Shield className="w-4 h-4" />
                    Start Trading Privately
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </a>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Back to Scan */}
        <div className="mt-8 text-center">
          <Link href="/scan" className="text-white/40 hover:text-[#00fff9] text-sm transition-colors">
            ← Back to single wallet scan
          </Link>
        </div>
      </div>
    </div>
  );
}
