"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import {
  Download,
  Twitter,
  Share2,
  Eye,
  Shield,
  AlertTriangle,
  Copy,
  Check,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { formatUSD, shortenAddress } from "@/lib/utils";
import html2canvas from "html2canvas";

interface ShareableReportCardProps {
  address: string;
  surveillanceScore: number;
  riskLevel: string;
  personality?: string;
  netWorth: number;
  totalTransactions: number;
  tokenCount: number;
}

export function ShareableReportCard({
  address,
  surveillanceScore,
  riskLevel,
  personality,
  netWorth,
  totalTransactions,
  tokenCount,
}: ShareableReportCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  const getRiskEmoji = () => {
    if (surveillanceScore >= 80) return "💀";
    if (surveillanceScore >= 60) return "😰";
    if (surveillanceScore >= 40) return "😬";
    return "😎";
  };

  const getRiskColor = () => {
    if (riskLevel === "critical") return "from-red-500 to-orange-500";
    if (riskLevel === "high") return "from-orange-500 to-yellow-500";
    if (riskLevel === "medium") return "from-yellow-500 to-green-500";
    return "from-green-500 to-cyan-500";
  };

  const handleDownload = async () => {
    if (!cardRef.current) return;

    setIsGenerating(true);
    try {
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: "#0a0a0a",
        scale: 2,
      });
      const link = document.createElement("a");
      link.download = `walletspy-${shortenAddress(address, 4)}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch (error) {
      console.error("Failed to generate image:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleShareTwitter = () => {
    const text = `${getRiskEmoji()} My wallet is ${surveillanceScore}% exposed!\n\n${
      personality ? `Personality: "${personality}"\n\n` : ""
    }Find out how exposed YOUR wallet is on WalletSpy:`;
    const url = "https://walletspy.xyz";
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
      "_blank"
    );
  };

  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(`https://walletspy.xyz/scan?address=${address}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card className="border-[#b026ff]/30">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold flex items-center gap-2">
            <Share2 className="w-5 h-5 text-[#00fff9]" />
            Share Your Results
          </h3>
        </div>

        {/* Report Card Preview */}
        <div
          ref={cardRef}
          className="bg-gradient-to-br from-[#0a0a0a] to-[#1a1a2e] rounded-xl p-6 border border-white/10"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Eye className="w-6 h-6 text-[#00fff9]" />
              <span className="font-bold text-lg">WalletSpy</span>
            </div>
            <span className="text-xs text-white/40">walletspy.xyz</span>
          </div>

          {/* Score */}
          <div className="text-center mb-6">
            <div className="relative inline-block">
              <div className={cn(
                "w-32 h-32 rounded-full bg-gradient-to-br flex items-center justify-center",
                getRiskColor()
              )}>
                <div className="w-28 h-28 rounded-full bg-[#0a0a0a] flex flex-col items-center justify-center">
                  <span className="text-4xl font-black">{surveillanceScore}%</span>
                  <span className="text-xs text-white/60">EXPOSED</span>
                </div>
              </div>
              <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-3xl">
                {getRiskEmoji()}
              </span>
            </div>
          </div>

          {/* Wallet Info */}
          <div className="text-center mb-4">
            <p className="font-mono text-sm text-white/60 mb-1">
              {shortenAddress(address, 6)}
            </p>
            {personality && (
              <p className="text-lg font-bold bg-gradient-to-r from-[#b026ff] to-[#00fff9] bg-clip-text text-transparent">
                &ldquo;{personality}&rdquo;
              </p>
            )}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 mb-4">
            <div className="bg-white/5 rounded-lg p-2 text-center">
              <p className="text-sm font-bold text-[#00fff9]">{formatUSD(netWorth)}</p>
              <p className="text-[10px] text-white/40">Net Worth</p>
            </div>
            <div className="bg-white/5 rounded-lg p-2 text-center">
              <p className="text-sm font-bold text-[#b026ff]">{tokenCount}</p>
              <p className="text-[10px] text-white/40">Tokens</p>
            </div>
            <div className="bg-white/5 rounded-lg p-2 text-center">
              <p className="text-sm font-bold text-yellow-500">{totalTransactions}</p>
              <p className="text-[10px] text-white/40">Transactions</p>
            </div>
          </div>

          {/* Risk Badge */}
          <div className="flex justify-center">
            <span className={cn(
              "px-4 py-1.5 rounded-full text-xs font-bold uppercase flex items-center gap-1",
              riskLevel === "critical" && "bg-red-500/20 text-red-400 border border-red-500/30",
              riskLevel === "high" && "bg-orange-500/20 text-orange-400 border border-orange-500/30",
              riskLevel === "medium" && "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30",
              riskLevel === "low" && "bg-green-500/20 text-green-400 border border-green-500/30"
            )}>
              {riskLevel === "critical" || riskLevel === "high" ? (
                <AlertTriangle className="w-3 h-3" />
              ) : (
                <Shield className="w-3 h-3" />
              )}
              {riskLevel} Risk
            </span>
          </div>

          {/* Footer */}
          <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
            <p className="text-[10px] text-white/40">
              Powered by encrypt.trade
            </p>
            <Shield className="w-4 h-4 text-[#00fff9]/50" />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 mt-4">
          <Button
            onClick={handleShareTwitter}
            className="flex-1 bg-[#1DA1F2] hover:bg-[#1a8cd8]"
          >
            <Twitter className="w-4 h-4" />
            Tweet
          </Button>
          <Button
            onClick={handleDownload}
            variant="secondary"
            className="flex-1"
            disabled={isGenerating}
          >
            <Download className="w-4 h-4" />
            {isGenerating ? "..." : "Save"}
          </Button>
          <Button
            onClick={handleCopyLink}
            variant="ghost"
            className="px-3"
          >
            {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
          </Button>
        </div>
      </div>
    </Card>
  );
}
