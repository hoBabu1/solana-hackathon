"use client";

import { motion, AnimatePresence } from "framer-motion";
import { WalletAnalysis } from "@/types";
import { ScoreRing } from "@/components/ui/ScoreRing";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { formatUSD, shortenAddress } from "@/lib/utils";
import { EncryptTradeCTA } from "./EncryptTradeCTA";
import {
  Wallet,
  AlertTriangle,
  Share2,
  Shield,
  Coins,
  Image,
  Clock,
  Activity,
  Users,
  MessageCircle,
  BarChart3,
  Repeat,
  Send,
  Flame,
  ChevronDown,
  ChevronRight,
  TrendingUp,
  Zap,
  Key,
  ShieldAlert,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface ScanResultsProps {
  analysis: WalletAnalysis;
  onShare: () => void;
}

// Accordion Section Component
function AccordionSection({
  id,
  title,
  icon: Icon,
  iconColor,
  badge,
  children,
  defaultOpen = false,
}: {
  id: string;
  title: string;
  icon: React.ElementType;
  iconColor: string;
  badge?: string | number;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border border-white/10 rounded-xl overflow-hidden bg-white/5">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-colors"
      >
        <div className="flex items-center gap-3">
          <Icon className={`w-5 h-5 ${iconColor}`} />
          <span className="font-semibold">{title}</span>
          {badge !== undefined && (
            <span className="px-2 py-0.5 text-xs bg-white/10 rounded-full">
              {badge}
            </span>
          )}
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-5 h-5 text-white/50" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="px-4 pb-4 border-t border-white/10 pt-4">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function ScanResults({ analysis, onShare }: ScanResultsProps) {
  const [showAllTokens, setShowAllTokens] = useState(false);

  const getRiskColor = (level: string) => {
    switch (level) {
      case "critical":
        return "text-[#ff0844] bg-[#ff0844]/20 border-[#ff0844]/50";
      case "high":
        return "text-orange-500 bg-orange-500/20 border-orange-500/50";
      case "medium":
        return "text-yellow-500 bg-yellow-500/20 border-yellow-500/50";
      default:
        return "text-[#00ff9f] bg-[#00ff9f]/20 border-[#00ff9f]/50";
    }
  };

  const totalTokenValue = analysis.tokens?.reduce((sum, t) => sum + t.usdValue, 0) || 0;
  const displayedTokens = showAllTokens ? analysis.tokens : analysis.tokens?.slice(0, 6) || [];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* Hero Section - Always Visible */}
      <div className="text-center space-y-4">
        {/* Wallet Address */}
        <p className="text-white/60 font-mono text-sm">
          {shortenAddress(analysis.address, 8)}
        </p>

        {/* Score Ring */}
        <div className="flex justify-center">
          <ScoreRing score={analysis.surveillanceScore} size={180} />
        </div>

        {/* Risk Badge */}
        <div className="flex justify-center">
          <span className={`px-4 py-1.5 rounded-full text-sm font-bold uppercase border ${getRiskColor(analysis.riskLevel)}`}>
            {analysis.riskLevel} Risk
          </span>
        </div>

        {/* AI Personality */}
        {analysis.personality && (
          <div className="pt-2">
            <p className="text-xs text-white/40 mb-1">Wallet Personality</p>
            <h3 className="text-2xl font-black bg-gradient-to-r from-[#b026ff] to-[#00fff9] bg-clip-text text-transparent">
              {analysis.personality}
            </h3>
          </div>
        )}
      </div>

      {/* Quick Stats Bar */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-white/5 rounded-xl p-3 text-center">
          <p className="text-2xl font-bold text-[#00fff9]">{formatUSD(analysis.netWorth)}</p>
          <p className="text-xs text-white/50">Net Worth</p>
        </div>
        <div className="bg-white/5 rounded-xl p-3 text-center">
          <p className="text-2xl font-bold text-[#b026ff]">{analysis.tokens?.length || 0}</p>
          <p className="text-xs text-white/50">Tokens</p>
        </div>
        <div className="bg-white/5 rounded-xl p-3 text-center">
          <p className="text-2xl font-bold text-yellow-500">{analysis.totalTransactions}</p>
          <p className="text-xs text-white/50">Transactions</p>
        </div>
      </div>

      {/* AI Roast - Collapsible but eye-catching */}
      {analysis.ropiast && (
        <Card className="border-[#ff0844]/30 bg-gradient-to-r from-[#ff0844]/10 to-[#b026ff]/10">
          <CardContent className="py-4">
            <div className="flex items-start gap-3">
              <MessageCircle className="w-6 h-6 text-[#ff0844] flex-shrink-0 mt-1" />
              <div>
                <p className="text-xs text-[#ff0844] font-medium mb-1">AI ROAST</p>
                <p className="text-white/90 italic">&ldquo;{analysis.ropiast}&rdquo;</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Accordion Sections */}
      <div className="space-y-3">
        {/* Portfolio Balance */}
        <AccordionSection
          id="balance"
          title="Portfolio Balance"
          icon={TrendingUp}
          iconColor="text-[#00fff9]"
          badge={formatUSD(analysis.netWorth)}
          defaultOpen={true}
        >
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="p-3 bg-white/5 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[#9945FF] to-[#14F195] flex items-center justify-center">
                  <span className="text-[10px] font-bold">◎</span>
                </div>
                <span className="text-sm text-white/70">SOL</span>
              </div>
              <p className="text-lg font-bold">{analysis.solBalance?.toFixed(4) || "0"}</p>
              <p className="text-xs text-white/40">{formatUSD(analysis.netWorth - totalTokenValue)}</p>
            </div>
            <div className="p-3 bg-white/5 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <Coins className="w-5 h-5 text-[#b026ff]" />
                <span className="text-sm text-white/70">Tokens</span>
              </div>
              <p className="text-lg font-bold text-[#b026ff]">{formatUSD(totalTokenValue)}</p>
              <p className="text-xs text-white/40">{analysis.tokens?.length || 0} tokens</p>
            </div>
          </div>

          {/* Top 5 tokens preview */}
          {analysis.tokens && analysis.tokens.length > 0 && (
            <div className="space-y-2">
              <p className="text-xs text-white/40">Top Holdings</p>
              {analysis.tokens.slice(0, 3).map((token, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                  <div className="flex items-center gap-2">
                    {token.logoUrl ? (
                      <img src={token.logoUrl} alt={token.symbol} className="w-6 h-6 rounded-full" />
                    ) : (
                      <div className="w-6 h-6 rounded-full bg-[#00fff9]/20 flex items-center justify-center text-[10px] font-bold">
                        {token.symbol?.slice(0, 2)}
                      </div>
                    )}
                    <span className="font-medium text-sm">{token.symbol}</span>
                  </div>
                  <span className="text-sm text-[#00fff9]">{formatUSD(token.usdValue)}</span>
                </div>
              ))}
            </div>
          )}
        </AccordionSection>

        {/* Token Holdings */}
        {analysis.tokens && analysis.tokens.length > 0 && (
          <AccordionSection
            id="tokens"
            title="All Tokens"
            icon={Coins}
            iconColor="text-[#00fff9]"
            badge={analysis.tokens.length}
          >
            <div className="space-y-2 max-h-80 overflow-y-auto">
              {displayedTokens.map((token, i) => (
                <div key={i} className="flex items-center justify-between p-2 bg-white/5 rounded-lg">
                  <div className="flex items-center gap-3">
                    {token.logoUrl ? (
                      <img src={token.logoUrl} alt={token.symbol} className="w-8 h-8 rounded-full" />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#00fff9]/20 to-[#b026ff]/20 flex items-center justify-center text-xs font-bold">
                        {token.symbol?.slice(0, 2)}
                      </div>
                    )}
                    <div>
                      <p className="font-medium text-sm flex items-center gap-1">
                        {token.symbol}
                        {token.isMemecoin && (
                          <span className="text-[10px] px-1.5 py-0.5 bg-[#ff0844]/20 text-[#ff0844] rounded">MEME</span>
                        )}
                      </p>
                      <p className="text-xs text-white/40">{token.amount.toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
                    </div>
                  </div>
                  <p className="font-medium text-[#00fff9]">{formatUSD(token.usdValue)}</p>
                </div>
              ))}
            </div>
            {analysis.tokens.length > 6 && (
              <button
                onClick={() => setShowAllTokens(!showAllTokens)}
                className="w-full mt-3 py-2 text-sm text-[#00fff9] hover:bg-white/5 rounded-lg transition-colors"
              >
                {showAllTokens ? "Show Less" : `Show All ${analysis.tokens.length} Tokens`}
              </button>
            )}
          </AccordionSection>
        )}

        {/* Wallet Activity */}
        <AccordionSection
          id="activity"
          title="Wallet Activity"
          icon={Activity}
          iconColor="text-[#b026ff]"
        >
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-white/5 rounded-lg text-center">
              <Clock className="w-5 h-5 text-[#00fff9] mx-auto mb-1" />
              <p className="text-lg font-bold">{analysis.walletAge || "Unknown"}</p>
              <p className="text-xs text-white/40">Age</p>
            </div>
            <div className="p-3 bg-white/5 rounded-lg text-center">
              <Repeat className="w-5 h-5 text-[#00ff9f] mx-auto mb-1" />
              <p className="text-lg font-bold">{analysis.swapCount || 0}</p>
              <p className="text-xs text-white/40">Swaps</p>
            </div>
            <div className="p-3 bg-white/5 rounded-lg text-center">
              <Send className="w-5 h-5 text-yellow-500 mx-auto mb-1" />
              <p className="text-lg font-bold">{analysis.transferCount || 0}</p>
              <p className="text-xs text-white/40">Transfers</p>
            </div>
            <div className="p-3 bg-white/5 rounded-lg text-center">
              <Flame className="w-5 h-5 text-[#ff0844] mx-auto mb-1" />
              <p className="text-lg font-bold">{analysis.degenScore}%</p>
              <p className="text-xs text-white/40">Degen Score</p>
            </div>
          </div>

          {/* Trading Volume */}
          <div className="mt-4 p-3 bg-white/5 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-[#b026ff]" />
                <span className="text-sm text-white/70">Trading Volume</span>
              </div>
              <span className="font-bold text-[#b026ff]">{formatUSD(analysis.tradingVolume || 0)}</span>
            </div>
          </div>
        </AccordionSection>

        {/* NFT Holdings */}
        {analysis.nfts && analysis.nfts.length > 0 && (
          <AccordionSection
            id="nfts"
            title="NFT Collection"
            icon={Image}
            iconColor="text-[#b026ff]"
            badge={analysis.nfts.length}
          >
            <div className="grid grid-cols-3 gap-2">
              {analysis.nfts.slice(0, 6).map((nft, i) => (
                <div key={i} className="rounded-lg overflow-hidden bg-white/5">
                  <div className="aspect-square bg-gradient-to-br from-[#b026ff]/20 to-[#00fff9]/20 flex items-center justify-center">
                    {nft.image ? (
                      <img src={nft.image} alt={nft.name} className="w-full h-full object-cover" />
                    ) : (
                      <Image className="w-6 h-6 text-white/30" />
                    )}
                  </div>
                  <p className="text-xs p-1.5 truncate">{nft.name}</p>
                </div>
              ))}
            </div>
          </AccordionSection>
        )}

        {/* Connected Wallets */}
        {analysis.topInteractedAddresses && analysis.topInteractedAddresses.length > 0 && (
          <AccordionSection
            id="connections"
            title="Connected Wallets"
            icon={Users}
            iconColor="text-[#00fff9]"
            badge={analysis.topInteractedAddresses.length}
          >
            <p className="text-xs text-white/50 mb-3">Addresses with most SOL transfers (includes internal routing)</p>
            <div className="space-y-2">
              {analysis.topInteractedAddresses.slice(0, 5).map((addr, i) => (
                <div key={i} className="flex items-center justify-between p-2 bg-white/5 rounded-lg">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#00fff9]/20 flex items-center justify-center text-xs font-bold">
                      {i + 1}
                    </span>
                    <div>
                      <p className="font-mono text-xs">{shortenAddress(addr.address, 6)}</p>
                      {addr.label && <p className="text-[10px] text-[#00fff9]">{addr.label}</p>}
                    </div>
                  </div>
                  <span className="text-xs text-white/50">{addr.count} transfers</span>
                </div>
              ))}
            </div>
          </AccordionSection>
        )}

        {/* Protocols Used */}
        {analysis.protocolsUsed && analysis.protocolsUsed.length > 0 && (
          <AccordionSection
            id="protocols"
            title="Protocols Used"
            icon={Zap}
            iconColor="text-yellow-500"
            badge={analysis.protocolsUsed.length}
          >
            <div className="flex flex-wrap gap-2">
              {analysis.protocolsUsed.map((protocol, i) => (
                <span key={i} className="px-3 py-1.5 bg-yellow-500/10 border border-yellow-500/30 rounded-full text-xs font-medium">
                  {protocol}
                </span>
              ))}
            </div>
          </AccordionSection>
        )}

        {/* Token Approvals */}
        <AccordionSection
          id="approvals"
          title="Token Approvals"
          icon={Key}
          iconColor="text-orange-500"
          badge={analysis.approvals?.length || 0}
          defaultOpen={analysis.approvals && analysis.approvals.length > 0}
        >
          {analysis.approvals && analysis.approvals.length > 0 ? (
            <div className="space-y-3">
              <p className="text-xs text-white/50 mb-3">
                Contracts you&apos;ve approved to spend your tokens. Review and revoke any you don&apos;t recognize.
              </p>
              {analysis.approvals.map((approval, i) => (
                <div key={i} className="p-3 bg-white/5 rounded-lg border border-orange-500/20">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {approval.tokenLogoUrl ? (
                        <img src={approval.tokenLogoUrl} alt={approval.tokenSymbol} className="w-6 h-6 rounded-full" />
                      ) : (
                        <div className="w-6 h-6 rounded-full bg-orange-500/20 flex items-center justify-center text-[10px] font-bold">
                          {approval.tokenSymbol?.slice(0, 2)}
                        </div>
                      )}
                      <div>
                        <p className="font-medium text-sm">{approval.tokenSymbol}</p>
                        <p className="text-[10px] text-white/40">{approval.tokenName}</p>
                      </div>
                    </div>
                    {approval.isUnlimited ? (
                      <span className="px-2 py-0.5 text-[10px] bg-[#ff0844]/20 text-[#ff0844] rounded font-bold">
                        UNLIMITED
                      </span>
                    ) : (
                      <span className="text-sm text-orange-500 font-medium">
                        {approval.approvedAmount.toLocaleString(undefined, { maximumFractionDigits: 4 })}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <ShieldAlert className="w-3 h-3 text-orange-500" />
                    <span className="text-white/50">Approved to:</span>
                    <span className="font-mono text-white/70">
                      {approval.spenderLabel || shortenAddress(approval.spender, 6)}
                    </span>
                  </div>
                  {approval.usdValue !== undefined && approval.usdValue > 0 && (
                    <p className="text-xs text-orange-500/70 mt-1">
                      At risk: {formatUSD(approval.usdValue)}
                    </p>
                  )}
                </div>
              ))}
              <div className="mt-3 p-3 bg-orange-500/10 rounded-lg border border-orange-500/30">
                <p className="text-xs text-orange-400">
                  <AlertTriangle className="w-3 h-3 inline mr-1" />
                  Unlimited approvals are risky! If a contract is exploited, all approved tokens can be drained.
                </p>
              </div>
            </div>
          ) : (
            <div className="text-center py-4">
              <Shield className="w-8 h-8 text-[#00ff9f] mx-auto mb-2" />
              <p className="text-sm text-white/70">No active token approvals</p>
              <p className="text-xs text-white/40 mt-1">Your wallet hasn&apos;t approved any contracts to spend tokens</p>
            </div>
          )}
        </AccordionSection>

        {/* Privacy Concerns */}
        {analysis.privacyMistakes.length > 0 && (
          <AccordionSection
            id="privacy"
            title="Privacy Concerns"
            icon={AlertTriangle}
            iconColor="text-[#ff0844]"
            badge={analysis.privacyMistakes.length}
            defaultOpen={analysis.privacyMistakes.some(m => m.severity === "critical")}
          >
            <div className="space-y-3">
              {analysis.privacyMistakes.slice(0, 5).map((mistake, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className={`w-2 h-2 mt-1.5 rounded-full flex-shrink-0 ${
                    mistake.severity === "critical" ? "bg-[#ff0844]" :
                    mistake.severity === "high" ? "bg-orange-500" :
                    mistake.severity === "medium" ? "bg-yellow-500" : "bg-white/40"
                  }`} />
                  <div>
                    <p className="text-sm font-medium capitalize">{mistake.type.replace(/_/g, " ")}</p>
                    <p className="text-xs text-white/50">{mistake.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </AccordionSection>
        )}
      </div>

      {/* Encrypt.trade CTA */}
      <EncryptTradeCTA
        surveillanceScore={analysis.surveillanceScore}
        cexDetected={(analysis.cexInteractions || 0) > 0}
        netWorth={analysis.netWorth}
      />

      {/* Action Buttons */}
      <div className="flex gap-3">
        <Button onClick={onShare} variant="secondary" className="flex-1">
          <Share2 className="w-4 h-4" />
          Share
        </Button>
        <Link href="/learn" className="flex-1">
          <Button className="w-full">
            <Shield className="w-4 h-4" />
            Learn More
          </Button>
        </Link>
      </div>
    </motion.div>
  );
}
