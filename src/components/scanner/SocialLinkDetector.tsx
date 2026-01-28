"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import {
  Twitter,
  MessageSquare,
  Globe,
  AlertTriangle,
  Search,
  User,
  ExternalLink,
} from "lucide-react";
import { shortenAddress } from "@/lib/utils";

interface SocialLinkDetectorProps {
  address: string;
  nftCount: number;
  protocolsUsed: string[];
  totalTransactions: number;
}

export function SocialLinkDetector({
  address,
  nftCount,
  protocolsUsed,
  totalTransactions,
}: SocialLinkDetectorProps) {
  // Simulate what data points can link to social profiles
  const linkageRisks = [
    {
      platform: "Twitter/X",
      icon: Twitter,
      detected: false,
      riskLevel: nftCount > 3 ? "high" : "medium",
      reason: "NFT profile pictures, wallet posts, giveaway participation",
      searchUrl: `https://twitter.com/search?q=${address}&f=live`,
    },
    {
      platform: "Discord",
      icon: MessageSquare,
      detected: false,
      riskLevel: protocolsUsed.length > 3 ? "high" : "medium",
      reason: "Verification bots, role-gating, server activity",
      searchUrl: null,
    },
    {
      platform: "ENS/Domains",
      icon: Globe,
      detected: false,
      riskLevel: "medium",
      reason: "Human-readable names often match social handles",
      searchUrl: `https://app.ens.domains/search/${address.slice(0, 8)}`,
    },
    {
      platform: "NFT Marketplaces",
      icon: User,
      detected: nftCount > 0,
      riskLevel: nftCount > 5 ? "high" : "low",
      reason: "Profile pages, collection activity, bids",
      searchUrl: `https://magiceden.io/u/${address}`,
    },
  ];

  const highRiskCount = linkageRisks.filter(r => r.riskLevel === "high").length;

  return (
    <Card className="border-[#00fff9]/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Search className="w-5 h-5 text-[#00fff9]" />
          Social Profile Linkage Risk
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Warning */}
        <div className="mb-6 p-4 bg-[#ff0844]/10 border border-[#ff0844]/30 rounded-lg">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-[#ff0844] flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-[#ff0844] mb-1">Identity Correlation</p>
              <p className="text-sm text-white/70">
                Analytics companies correlate wallet addresses with social profiles using:
                NFT ownership, on-chain names, protocol participation, and transaction patterns.
              </p>
            </div>
          </div>
        </div>

        {/* Risk Assessment */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-white/70">Linkage Risk Level</span>
            <span className={`font-bold ${
              highRiskCount >= 2 ? "text-[#ff0844]" :
              highRiskCount === 1 ? "text-orange-500" : "text-[#00ff9f]"
            }`}>
              {highRiskCount >= 2 ? "HIGH" : highRiskCount === 1 ? "MEDIUM" : "LOW"}
            </span>
          </div>
          <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(100, 25 + highRiskCount * 25)}%` }}
              className={`h-full rounded-full ${
                highRiskCount >= 2 ? "bg-[#ff0844]" :
                highRiskCount === 1 ? "bg-orange-500" : "bg-[#00ff9f]"
              }`}
            />
          </div>
        </div>

        {/* Platform Breakdown */}
        <div className="space-y-3 mb-6">
          {linkageRisks.map((risk, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <risk.icon className="w-4 h-4 text-[#00fff9]" />
                  <span className="font-medium text-white">{risk.platform}</span>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  risk.riskLevel === "high"
                    ? "bg-[#ff0844]/20 text-[#ff0844]"
                    : risk.riskLevel === "medium"
                    ? "bg-orange-500/20 text-orange-500"
                    : "bg-[#00ff9f]/20 text-[#00ff9f]"
                }`}>
                  {risk.riskLevel.toUpperCase()} RISK
                </span>
              </div>
              <p className="text-xs text-white/60 mb-2">{risk.reason}</p>
              {risk.searchUrl && (
                <a
                  href={risk.searchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[#00fff9] hover:text-white flex items-center gap-1"
                >
                  Search for your wallet <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </motion.div>
          ))}
        </div>

        {/* What They Can Find */}
        <div className="p-4 bg-white/5 rounded-lg">
          <h4 className="font-bold text-white mb-3">What Analysts Look For:</h4>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-2 bg-white/5 rounded">
              <span className="text-[#ff0844]">NFT PFPs</span>
              <p className="text-white/50">Match profile pics to wallets</p>
            </div>
            <div className="p-2 bg-white/5 rounded">
              <span className="text-[#ff0844]">Giveaway Entries</span>
              <p className="text-white/50">Public wallet posts</p>
            </div>
            <div className="p-2 bg-white/5 rounded">
              <span className="text-[#ff0844]">Discord Verify</span>
              <p className="text-white/50">Bot-linked identities</p>
            </div>
            <div className="p-2 bg-white/5 rounded">
              <span className="text-[#ff0844]">ENS Names</span>
              <p className="text-white/50">Often match usernames</p>
            </div>
          </div>
        </div>

        {/* Meme */}
        <div className="mt-4 p-3 bg-gradient-to-r from-[#00fff9]/10 to-[#b026ff]/10 rounded-lg text-center">
          <p className="text-sm text-white/70 italic">
            &quot;I never post my wallet online&quot; - Someone who verified with Collab.Land
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
