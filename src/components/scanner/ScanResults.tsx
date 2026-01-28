"use client";

import { motion } from "framer-motion";
import { WalletAnalysis } from "@/types";
import { ScoreRing } from "@/components/ui/ScoreRing";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { formatUSD, shortenAddress } from "@/lib/utils";
import { SurveillanceEducation } from "./SurveillanceEducation";
import { EncryptTradeCTA } from "./EncryptTradeCTA";
import { WalletClusterViz } from "./WalletClusterViz";
import { PnLTracker } from "./PnLTracker";
import { SocialLinkDetector } from "./SocialLinkDetector";
import {
  Wallet,
  AlertTriangle,
  Share2,
  Shield,
  Coins,
  Image,
  Clock,
  Activity,
  Zap,
  Users,
  MessageCircle,
  BarChart3,
  Repeat,
  Send,
  Flame,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface ScanResultsProps {
  analysis: WalletAnalysis;
  onShare: () => void;
}

export function ScanResults({ analysis, onShare }: ScanResultsProps) {
  const [showAllTokens, setShowAllTokens] = useState(false);
  const [showAllNFTs, setShowAllNFTs] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case "critical":
        return "text-[#ff0844] bg-[#ff0844]/20";
      case "high":
        return "text-orange-500 bg-orange-500/20";
      case "medium":
        return "text-yellow-500 bg-yellow-500/20";
      default:
        return "text-[#00ff9f] bg-[#00ff9f]/20";
    }
  };

  const displayedTokens = showAllTokens
    ? analysis.tokens
    : analysis.tokens?.slice(0, 6) || [];
  const displayedNFTs = showAllNFTs
    ? analysis.nfts
    : analysis.nfts?.slice(0, 4) || [];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-8"
    >
      {/* Main Score */}
      <motion.div variants={itemVariants} className="text-center">
        <h2 className="text-2xl font-bold mb-2">YOUR EXPOSURE LEVEL</h2>
        <p className="text-white/60 mb-4">
          {shortenAddress(analysis.address, 6)}
        </p>
        {/* Risk Badge */}
        <div className="flex justify-center mb-4">
          <span
            className={`px-4 py-1.5 rounded-full text-sm font-bold uppercase ${getRiskColor(
              analysis.riskLevel
            )}`}
          >
            {analysis.riskLevel} Risk
          </span>
        </div>
        <div className="flex justify-center mb-6">
          <ScoreRing score={analysis.surveillanceScore} size={220} />
        </div>
        <p className="text-white/60 max-w-md mx-auto">
          {analysis.surveillanceScore >= 70
            ? "Your wallet is an open book. Everyone can see everything. Including your landlord."
            : analysis.surveillanceScore >= 40
            ? "You're moderately exposed. There's room for improvement."
            : "Not bad! But remember, any on-chain activity is still visible."}
        </p>
      </motion.div>

      {/* AI Personality Card */}
      {analysis.personality && (
        <motion.div variants={itemVariants}>
          <Card className="border-[#b026ff]/50 bg-gradient-to-r from-[#b026ff]/10 to-[#00fff9]/10 overflow-hidden">
            <CardContent className="py-6 relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#b026ff]/10 rounded-full blur-3xl" />
              <div className="relative">
                <p className="text-sm text-white/50 mb-1">Your Wallet Personality</p>
                <h3 className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-[#b026ff] to-[#00fff9] bg-clip-text text-transparent mb-3">
                  {analysis.personality}
                </h3>
                {analysis.verdict && (
                  <div className="flex items-center gap-2 mt-4 pt-4 border-t border-white/10">
                    <span className="text-sm text-white/50">Final Verdict:</span>
                    <span className="text-sm font-medium text-[#00fff9]">
                      {analysis.verdict}
                    </span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* AI Roast Section */}
      {analysis.ropiast && (
        <motion.div variants={itemVariants}>
          <Card className="border-[#ff0844]/50 bg-gradient-to-r from-[#ff0844]/10 to-[#b026ff]/10">
            <CardContent className="py-6">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-full bg-[#ff0844]/20 flex items-center justify-center flex-shrink-0 animate-pulse">
                  <MessageCircle className="w-7 h-7 text-[#ff0844]" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-[#ff0844] mb-2 flex items-center gap-2">
                    🔥 AI ROAST
                    <span className="text-xs font-normal px-2 py-0.5 bg-[#ff0844]/20 rounded-full">
                      Powered by Gemini
                    </span>
                  </h3>
                  <p className="text-white/90 italic text-lg leading-relaxed">
                    &ldquo;{analysis.ropiast}&rdquo;
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* CEX Detection Warning */}
      {analysis.cexInteractions > 0 && (
        <motion.div variants={itemVariants}>
          <Card className="border-[#ff0844]/50 bg-gradient-to-r from-[#ff0844]/20 to-orange-500/10">
            <CardContent className="py-6">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-full bg-[#ff0844]/30 flex items-center justify-center flex-shrink-0">
                  <AlertTriangle className="w-7 h-7 text-[#ff0844]" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-[#ff0844] mb-2">
                    🚨 KYC IDENTITY LINKED
                  </h3>
                  <p className="text-white/90 mb-3">
                    Your wallet has <span className="font-bold text-[#ff0844]">{analysis.cexInteractions} interaction{analysis.cexInteractions > 1 ? 's' : ''}</span> with centralized exchanges:
                  </p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {analysis.cexNames?.map((cex, i) => (
                      <span key={i} className="px-3 py-1 bg-[#ff0844]/20 border border-[#ff0844]/40 rounded-full text-sm font-medium text-[#ff0844]">
                        {cex}
                      </span>
                    ))}
                  </div>
                  <p className="text-sm text-white/70">
                    Your real identity (name, address, SSN) is now linked to this wallet through KYC.
                    Every future transaction can be traced back to you personally.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Surveillance Education Section */}
      <motion.div variants={itemVariants}>
        <SurveillanceEducation
          connectedWalletsCount={analysis.connectedWallets?.length || 0}
          totalTransactions={analysis.totalTransactions}
          cexInteractions={analysis.cexInteractions || 0}
        />
      </motion.div>

      {/* Wallet Info Grid */}
      <motion.div variants={itemVariants}>
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <span>📊</span> WALLET OVERVIEW
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <Card className="bg-white/5">
            <CardContent className="py-4 text-center">
              <Clock className="w-5 h-5 text-[#00fff9] mx-auto mb-2" />
              <p className="text-xs text-white/60 mb-1">Wallet Age</p>
              <p className="text-lg font-bold text-[#00fff9]">
                {analysis.walletAge || "Unknown"}
              </p>
            </CardContent>
          </Card>
          <Card className="bg-white/5">
            <CardContent className="py-4 text-center">
              <Activity className="w-5 h-5 text-[#b026ff] mx-auto mb-2" />
              <p className="text-xs text-white/60 mb-1">Activity</p>
              <p className="text-lg font-bold text-[#b026ff] capitalize">
                {analysis.activityPattern || "Unknown"}
              </p>
            </CardContent>
          </Card>
          <Card className="bg-white/5">
            <CardContent className="py-4 text-center">
              <Repeat className="w-5 h-5 text-[#00ff9f] mx-auto mb-2" />
              <p className="text-xs text-white/60 mb-1">Swaps</p>
              <p className="text-lg font-bold text-[#00ff9f]">
                {analysis.swapCount || 0}
              </p>
            </CardContent>
          </Card>
          <Card className="bg-white/5">
            <CardContent className="py-4 text-center">
              <Send className="w-5 h-5 text-yellow-500 mx-auto mb-2" />
              <p className="text-xs text-white/60 mb-1">Transfers</p>
              <p className="text-lg font-bold text-yellow-500">
                {analysis.transferCount || 0}
              </p>
            </CardContent>
          </Card>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <motion.div variants={itemVariants}>
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <span>💰</span> FINANCIAL EXPOSURE
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Net Worth */}
          <Card variant="cyan">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Wallet className="w-5 h-5 text-[#00fff9]" />
                Net Worth
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-[#00fff9]">
                {formatUSD(analysis.netWorth)}
              </p>
              <p className="text-sm text-white/60 mt-2">
                {analysis.solBalance?.toFixed(4) || 0} SOL + tokens
              </p>
            </CardContent>
          </Card>

          {/* Trading Volume */}
          <Card variant="purple">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <BarChart3 className="w-5 h-5 text-[#b026ff]" />
                Trading Volume
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-[#b026ff]">
                {formatUSD(analysis.tradingVolume || 0)}
              </p>
              <p className="text-sm text-white/60 mt-2">
                {analysis.uniqueTokensTraded || 0} unique tokens traded
              </p>
            </CardContent>
          </Card>

          {/* Degen Score */}
          <Card variant="danger">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Flame className="w-5 h-5 text-[#ff0844]" />
                Degen Score
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-[#ff0844]">
                {analysis.degenScore}%
              </p>
              <p className="text-sm text-white/60 mt-2">
                {analysis.memecoinCount} memecoins detected
              </p>
            </CardContent>
          </Card>
        </div>
      </motion.div>

      {/* PnL & Financial Exposure Tracker */}
      <motion.div variants={itemVariants}>
        <PnLTracker
          netWorth={analysis.netWorth}
          tradingVolume={analysis.tradingVolume || 0}
          biggestWin={analysis.biggestWin}
          biggestLoss={analysis.biggestLoss}
          memecoinCount={analysis.memecoinCount}
          degenScore={analysis.degenScore}
          swapCount={analysis.swapCount || 0}
        />
      </motion.div>

      {/* Token Holdings */}
      {analysis.tokens && analysis.tokens.length > 0 && (
        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Coins className="w-5 h-5 text-[#00fff9]" />
                  Token Holdings ({analysis.tokens.length})
                </span>
                <span className="text-sm font-normal text-white/60">
                  Total: {formatUSD(analysis.tokens.reduce((sum, t) => sum + t.usdValue, 0))}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {displayedTokens.map((token, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#00fff9]/20 to-[#b026ff]/20 flex items-center justify-center">
                        {token.logoUrl ? (
                          <img
                            src={token.logoUrl}
                            alt={token.symbol}
                            className="w-8 h-8 rounded-full"
                          />
                        ) : (
                          <span className="text-sm font-bold">
                            {token.symbol?.slice(0, 2) || "?"}
                          </span>
                        )}
                      </div>
                      <div>
                        <p className="font-medium flex items-center gap-2">
                          {token.symbol}
                          {token.isMemecoin && (
                            <span className="text-xs px-2 py-0.5 bg-[#ff0844]/20 text-[#ff0844] rounded-full">
                              MEME
                            </span>
                          )}
                        </p>
                        <p className="text-sm text-white/50">
                          {token.amount.toLocaleString(undefined, {
                            maximumFractionDigits: 4,
                          })}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-[#00fff9]">
                        {formatUSD(token.usdValue)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              {analysis.tokens.length > 6 && (
                <button
                  onClick={() => setShowAllTokens(!showAllTokens)}
                  className="w-full mt-4 py-2 text-sm text-[#00fff9] hover:text-white transition-colors"
                >
                  {showAllTokens
                    ? "Show Less"
                    : `Show All ${analysis.tokens.length} Tokens`}
                </button>
              )}
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* NFT Holdings */}
      {analysis.nfts && analysis.nfts.length > 0 && (
        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Image className="w-5 h-5 text-[#b026ff]" />
                NFT Collection ({analysis.nfts.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {displayedNFTs.map((nft, i) => (
                  <div
                    key={i}
                    className="rounded-lg overflow-hidden bg-white/5 hover:bg-white/10 transition-colors"
                  >
                    <div className="aspect-square bg-gradient-to-br from-[#b026ff]/20 to-[#00fff9]/20 flex items-center justify-center">
                      {nft.image ? (
                        <img
                          src={nft.image}
                          alt={nft.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <Image className="w-8 h-8 text-white/30" />
                      )}
                    </div>
                    <div className="p-2">
                      <p className="text-sm font-medium truncate">{nft.name}</p>
                      <p className="text-xs text-white/50 truncate">
                        {nft.collection}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              {analysis.nfts.length > 4 && (
                <button
                  onClick={() => setShowAllNFTs(!showAllNFTs)}
                  className="w-full mt-4 py-2 text-sm text-[#b026ff] hover:text-white transition-colors"
                >
                  {showAllNFTs
                    ? "Show Less"
                    : `Show All ${analysis.nfts.length} NFTs`}
                </button>
              )}
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Social Profile Linkage Detection */}
      <motion.div variants={itemVariants}>
        <SocialLinkDetector
          address={analysis.address}
          nftCount={analysis.nftCount}
          protocolsUsed={analysis.protocolsUsed || []}
          totalTransactions={analysis.totalTransactions}
        />
      </motion.div>

      {/* Protocols Used */}
      {analysis.protocolsUsed && analysis.protocolsUsed.length > 0 && (
        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-500" />
                Protocols Used ({analysis.protocolsUsed.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-white/60 mb-4">
                These protocols can track your activity and identify your
                wallet.
              </p>
              <div className="flex flex-wrap gap-2">
                {analysis.protocolsUsed.map((protocol, i) => (
                  <span
                    key={i}
                    className="px-4 py-2 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/30 rounded-full text-sm font-medium"
                  >
                    {protocol}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Top Interacted Addresses */}
      {analysis.topInteractedAddresses &&
        analysis.topInteractedAddresses.length > 0 && (
          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-[#00fff9]" />
                  Most Interacted Wallets
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-white/60 mb-4">
                  Your most frequent transaction partners. These relationships
                  are visible to anyone.
                </p>
                <div className="space-y-2">
                  {analysis.topInteractedAddresses.slice(0, 5).map((addr, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-3 bg-white/5 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#00fff9]/20 flex items-center justify-center text-sm font-bold">
                          #{i + 1}
                        </div>
                        <div>
                          <p className="font-mono text-sm">
                            {shortenAddress(addr.address, 6)}
                          </p>
                          {addr.label && (
                            <p className="text-xs text-[#00fff9]">
                              {addr.label}
                            </p>
                          )}
                        </div>
                      </div>
                      <span className="text-sm text-white/60">
                        {addr.count} txns
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

      {/* Wallet Cluster Visualization */}
      {analysis.connectedWallets.length > 0 && (
        <motion.div variants={itemVariants}>
          <WalletClusterViz
            mainAddress={analysis.address}
            connectedWallets={analysis.connectedWallets}
            topInteractedAddresses={analysis.topInteractedAddresses || []}
            cexNames={analysis.cexNames || []}
          />
        </motion.div>
      )}

      {/* Privacy Mistakes */}
      {analysis.privacyMistakes.length > 0 && (
        <motion.div variants={itemVariants}>
          <Card variant="danger">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-[#ff0844]" />
                Privacy Concerns Detected ({analysis.privacyMistakes.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {analysis.privacyMistakes.map((mistake, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span
                      className={`w-2 h-2 mt-2 rounded-full flex-shrink-0 ${
                        mistake.severity === "critical"
                          ? "bg-[#ff0844]"
                          : mistake.severity === "high"
                          ? "bg-orange-500"
                          : mistake.severity === "medium"
                          ? "bg-yellow-500"
                          : "bg-white/40"
                      }`}
                    />
                    <div>
                      <p className="font-medium capitalize">
                        {mistake.type.replace(/_/g, " ")}
                      </p>
                      <p className="text-sm text-white/60">
                        {mistake.description}
                      </p>
                      {mistake.recommendation && (
                        <p className="text-sm text-[#00ff9f] mt-1">
                          💡 {mistake.recommendation}
                        </p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Encrypt.trade CTA - THE SOLUTION */}
      <motion.div variants={itemVariants}>
        <EncryptTradeCTA
          surveillanceScore={analysis.surveillanceScore}
          cexDetected={(analysis.cexInteractions || 0) > 0}
          netWorth={analysis.netWorth}
        />
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        variants={itemVariants}
        className="flex flex-col sm:flex-row gap-4 justify-center"
      >
        <Button onClick={onShare} variant="secondary">
          <Share2 className="w-5 h-5" />
          Share Results
        </Button>
        <Link href="/learn">
          <Button>
            <Shield className="w-5 h-5" />
            Learn to Protect Yourself
          </Button>
        </Link>
      </motion.div>
    </motion.div>
  );
}
