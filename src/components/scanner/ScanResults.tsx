"use client";

import { motion, AnimatePresence } from "framer-motion";
import { WalletAnalysis } from "@/types";
import { ScoreRing } from "@/components/ui/ScoreRing";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { formatUSD, shortenAddress } from "@/lib/utils";
import { EncryptTradeCTA } from "./EncryptTradeCTA";
import { ShareableReportCard } from "./ShareableReportCard";
import { SocialProfilesCard } from "./SocialProfilesCard";
import { MemecoinPnLCard } from "./MemecoinPnLCard";
import { IncomeSourcesCard } from "./IncomeSourcesCard";
import { PrivacyMisuseCard } from "./PrivacyMisuseCard";
import {
  AlertTriangle,
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
  TrendingUp,
  Zap,
  Key,
  ShieldAlert,
  Eye,
  DollarSign,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface ScanResultsProps {
  analysis: WalletAnalysis;
  onShare: () => void;
}

type TabType = "overview" | "exposure" | "financials" | "privacy" | "details";

export function ScanResults({ analysis, onShare }: ScanResultsProps) {
  const [activeTab, setActiveTab] = useState<TabType>("overview");

  const tabs: { id: TabType; label: string; icon: React.ReactNode; badge?: string | number }[] = [
    { id: "overview", label: "Overview", icon: <BarChart3 className="w-4 h-4" /> },
    {
      id: "exposure",
      label: "Exposure",
      icon: <Eye className="w-4 h-4" />,
      badge: analysis.socialProfiles?.filter(p => p.found).length || undefined
    },
    {
      id: "financials",
      label: "Financials",
      icon: <DollarSign className="w-4 h-4" />,
      badge: analysis.memecoinPnL?.trades.length || undefined
    },
    {
      id: "privacy",
      label: "Privacy",
      icon: <Shield className="w-4 h-4" />,
      badge: analysis.privacyMistakes?.length || undefined
    },
    { id: "details", label: "Details", icon: <Activity className="w-4 h-4" /> },
  ];

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

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-4"
    >
      {/* Compact Hero Section */}
      <div className="text-center space-y-3">
        <p className="text-white/60 font-mono text-sm">
          {shortenAddress(analysis.address, 8)}
        </p>

        <div className="flex justify-center">
          <ScoreRing score={analysis.surveillanceScore} size={140} />
        </div>

        <div className="flex justify-center gap-2 items-center">
          <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase border ${getRiskColor(analysis.riskLevel)}`}>
            {analysis.riskLevel} Risk
          </span>
          {analysis.personality && (
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-[#b026ff]/20 to-[#00fff9]/20 border border-[#b026ff]/30">
              {analysis.personality}
            </span>
          )}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-2">
        <div className="bg-white/5 rounded-lg p-2 text-center">
          <p className="text-lg font-bold text-[#00fff9]">{formatUSD(analysis.netWorth)}</p>
          <p className="text-[10px] text-white/50">Net Worth</p>
        </div>
        <div className="bg-white/5 rounded-lg p-2 text-center">
          <p className="text-lg font-bold text-[#b026ff]">{analysis.tokens?.length || 0}</p>
          <p className="text-[10px] text-white/50">Tokens</p>
        </div>
        <div className="bg-white/5 rounded-lg p-2 text-center">
          <p className="text-lg font-bold text-yellow-500">{analysis.totalTransactions}</p>
          <p className="text-[10px] text-white/50">Transactions</p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="sticky top-0 z-50 -mx-4 px-4 py-2 bg-black/95 backdrop-blur-lg border-b border-white/10">
        <div className="flex gap-1 overflow-x-auto scrollbar-hide">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? "bg-gradient-to-r from-[#b026ff] to-[#00fff9] text-white"
                  : "bg-white/5 hover:bg-white/10 text-white/70"
              }`}
            >
              {tab.icon}
              {tab.label}
              {tab.badge !== undefined && tab.badge > 0 && (
                <span className={`ml-1 px-1.5 py-0.5 rounded-full text-[10px] ${
                  activeTab === tab.id ? "bg-white/20" : "bg-[#ff0844]/20 text-[#ff0844]"
                }`}>
                  {tab.badge}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="space-y-4"
        >
          {/* OVERVIEW TAB */}
          {activeTab === "overview" && (
            <>
              {/* AI Roast */}
              {analysis.ropiast && (
                <Card className="border-[#ff0844]/30 bg-gradient-to-r from-[#ff0844]/10 to-[#b026ff]/10">
                  <CardContent className="py-3">
                    <div className="flex items-start gap-3">
                      <MessageCircle className="w-5 h-5 text-[#ff0844] flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-[10px] text-[#ff0844] font-medium mb-1">AI ROAST</p>
                        <p className="text-sm text-white/90 italic">&ldquo;{analysis.ropiast}&rdquo;</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Wallet Activity */}
              <Card>
                <CardContent className="py-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Activity className="w-5 h-5 text-[#b026ff]" />
                    <h3 className="font-bold">Wallet Activity</h3>
                  </div>
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
                </CardContent>
              </Card>

              {/* Quick Summary Cards */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setActiveTab("exposure")}
                  className="p-4 bg-white/5 rounded-xl text-left hover:bg-white/10 transition-colors group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <Eye className="w-5 h-5 text-[#ff0844]" />
                    <ChevronRight className="w-4 h-4 text-white/30 group-hover:text-white/60" />
                  </div>
                  <p className="text-lg font-bold">
                    {analysis.socialProfiles?.filter(p => p.found).length || 0} Links
                  </p>
                  <p className="text-xs text-white/50">Social Exposure</p>
                </button>

                <button
                  onClick={() => setActiveTab("financials")}
                  className="p-4 bg-white/5 rounded-xl text-left hover:bg-white/10 transition-colors group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <TrendingUp className={`w-5 h-5 ${(analysis.memecoinPnL?.totalPnL || 0) >= 0 ? "text-green-400" : "text-[#ff0844]"}`} />
                    <ChevronRight className="w-4 h-4 text-white/30 group-hover:text-white/60" />
                  </div>
                  <p className={`text-lg font-bold ${(analysis.memecoinPnL?.totalPnL || 0) >= 0 ? "text-green-400" : "text-[#ff0844]"}`}>
                    {formatUSD(analysis.memecoinPnL?.totalPnL || 0)}
                  </p>
                  <p className="text-xs text-white/50">Memecoin PnL</p>
                </button>

                <button
                  onClick={() => setActiveTab("privacy")}
                  className="p-4 bg-white/5 rounded-xl text-left hover:bg-white/10 transition-colors group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <ShieldAlert className="w-5 h-5 text-orange-500" />
                    <ChevronRight className="w-4 h-4 text-white/30 group-hover:text-white/60" />
                  </div>
                  <p className="text-lg font-bold text-orange-500">
                    {analysis.privacyMistakes?.length || 0} Issues
                  </p>
                  <p className="text-xs text-white/50">Privacy Concerns</p>
                </button>

                <button
                  onClick={() => setActiveTab("details")}
                  className="p-4 bg-white/5 rounded-xl text-left hover:bg-white/10 transition-colors group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <Coins className="w-5 h-5 text-[#00fff9]" />
                    <ChevronRight className="w-4 h-4 text-white/30 group-hover:text-white/60" />
                  </div>
                  <p className="text-lg font-bold text-[#00fff9]">
                    {analysis.tokens?.length || 0}
                  </p>
                  <p className="text-xs text-white/50">Token Holdings</p>
                </button>
              </div>

              {/* Fix Issues CTA */}
              {(() => {
                const issueCount =
                  (analysis.privacyMistakes?.length || 0) +
                  (analysis.privacyProtocolMisuse?.length || 0) +
                  ((analysis.cexInteractions || 0) > 0 ? 1 : 0) +
                  (analysis.approvals?.length || 0);

                if (issueCount > 0) {
                  return (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="p-5 bg-gradient-to-br from-[#ff0844]/20 via-[#b026ff]/20 to-[#00fff9]/20 rounded-xl border-2 border-[#ff0844]/50"
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-full bg-[#ff0844]/20 flex items-center justify-center">
                          <AlertTriangle className="w-6 h-6 text-[#ff0844]" />
                        </div>
                        <div>
                          <p className="text-xl font-bold text-white">
                            {issueCount} Issue{issueCount > 1 ? "s" : ""} Detected
                          </p>
                          <p className="text-sm text-white/60">Your wallet privacy is compromised</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2 mb-4">
                        {(analysis.cexInteractions || 0) > 0 && (
                          <div className="flex items-center gap-2 p-2 bg-white/5 rounded-lg">
                            <div className="w-2 h-2 rounded-full bg-[#ff0844]" />
                            <span className="text-xs text-white/70">CEX Exposure</span>
                          </div>
                        )}
                        {(analysis.privacyMistakes?.length || 0) > 0 && (
                          <div className="flex items-center gap-2 p-2 bg-white/5 rounded-lg">
                            <div className="w-2 h-2 rounded-full bg-orange-500" />
                            <span className="text-xs text-white/70">{analysis.privacyMistakes?.length} Privacy Issues</span>
                          </div>
                        )}
                        {(analysis.privacyProtocolMisuse?.length || 0) > 0 && (
                          <div className="flex items-center gap-2 p-2 bg-white/5 rounded-lg">
                            <div className="w-2 h-2 rounded-full bg-yellow-500" />
                            <span className="text-xs text-white/70">{analysis.privacyProtocolMisuse?.length} Protocol Mistakes</span>
                          </div>
                        )}
                        {(analysis.approvals?.length || 0) > 0 && (
                          <div className="flex items-center gap-2 p-2 bg-white/5 rounded-lg">
                            <div className="w-2 h-2 rounded-full bg-orange-400" />
                            <span className="text-xs text-white/70">{analysis.approvals?.length} Risky Approvals</span>
                          </div>
                        )}
                      </div>

                      <div className="flex gap-2">
                        <a
                          href="https://encrypt.trade"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1"
                        >
                          <Button className="w-full h-12 bg-gradient-to-r from-[#ff0844] via-[#b026ff] to-[#00fff9] hover:opacity-90 text-white font-bold text-sm">
                            <Shield className="w-4 h-4 mr-1" />
                            Fix {issueCount} Issues
                            <ChevronRight className="w-4 h-4 ml-1" />
                          </Button>
                        </a>
                        <Link href="/learn">
                          <Button className="h-12 px-4 bg-white/10 hover:bg-white/20 text-white">
                            <Shield className="w-4 h-4" />
                          </Button>
                        </Link>
                      </div>
                    </motion.div>
                  );
                }
                return null;
              })()}

              {/* Shareable Card */}
              <ShareableReportCard
                address={analysis.address}
                surveillanceScore={analysis.surveillanceScore}
                riskLevel={analysis.riskLevel}
                personality={analysis.personality}
                netWorth={analysis.netWorth}
                totalTransactions={analysis.totalTransactions}
                tokenCount={analysis.tokens?.length || 0}
              />
            </>
          )}

          {/* EXPOSURE TAB */}
          {activeTab === "exposure" && (
            <>
              {/* Social Profiles */}
              {analysis.socialProfiles && analysis.socialProfiles.length > 0 && (
                <SocialProfilesCard profiles={analysis.socialProfiles} address={analysis.address} />
              )}

              {/* Connected Wallets */}
              {analysis.topInteractedAddresses && analysis.topInteractedAddresses.length > 0 && (
                <Card>
                  <CardContent className="py-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Users className="w-5 h-5 text-[#00fff9]" />
                      <h3 className="font-bold">Connected Wallets</h3>
                      <span className="text-xs px-2 py-0.5 bg-white/10 rounded-full">
                        {analysis.topInteractedAddresses.length}
                      </span>
                    </div>
                    <p className="text-xs text-white/50 mb-3">Addresses with most interactions</p>
                    <div className="space-y-2 max-h-60 overflow-y-auto">
                      {analysis.topInteractedAddresses.slice(0, 8).map((addr, i) => (
                        <div key={i} className="flex items-center justify-between p-2 bg-white/5 rounded-lg">
                          <div className="flex items-center gap-2">
                            <span className="w-5 h-5 rounded-full bg-[#00fff9]/20 flex items-center justify-center text-[10px] font-bold">
                              {i + 1}
                            </span>
                            <div>
                              <p className="font-mono text-xs">{shortenAddress(addr.address, 6)}</p>
                              {addr.label && <p className="text-[10px] text-[#00fff9]">{addr.label}</p>}
                            </div>
                          </div>
                          <span className="text-xs text-white/50">{addr.count}x</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* CEX Exposure */}
              {analysis.cexInteractions > 0 && (
                <Card className="border-[#ff0844]/30">
                  <CardContent className="py-4">
                    <div className="flex items-center gap-2 mb-3">
                      <AlertTriangle className="w-5 h-5 text-[#ff0844]" />
                      <h3 className="font-bold text-[#ff0844]">CEX Exposure Detected</h3>
                    </div>
                    <p className="text-sm text-white/70 mb-3">
                      {analysis.cexInteractions} transactions with centralized exchanges.
                      Your wallet is likely linked to your KYC identity.
                    </p>
                    {analysis.cexNames && analysis.cexNames.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {analysis.cexNames.map((cex, i) => (
                          <span key={i} className="px-2 py-1 bg-[#ff0844]/20 text-[#ff0844] rounded text-xs">
                            {cex}
                          </span>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              {/* Trade with encrypt.trade CTA */}
              <a
                href="https://encrypt.trade"
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <div className="p-4 bg-gradient-to-r from-[#b026ff]/20 to-[#00fff9]/20 rounded-xl border border-[#00fff9]/30 hover:border-[#00fff9]/50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Shield className="w-6 h-6 text-[#00fff9]" />
                      <div>
                        <p className="font-bold text-[#00fff9]">Trade with encrypt.trade</p>
                        <p className="text-xs text-white/60">Break CEX links • Private swaps</p>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-[#00fff9]" />
                  </div>
                </div>
              </a>
            </>
          )}

          {/* FINANCIALS TAB */}
          {activeTab === "financials" && (
            <>
              {/* Memecoin PnL */}
              {analysis.memecoinPnL && (
                <MemecoinPnLCard pnl={analysis.memecoinPnL} />
              )}

              {/* Income Sources */}
              {analysis.incomeSources && analysis.incomeSources.length > 0 && (
                <IncomeSourcesCard sources={analysis.incomeSources} />
              )}

              {/* Learn about privacy CTA */}
              <Link href="/learn">
                <div className="p-4 bg-gradient-to-r from-[#b026ff]/20 to-[#00fff9]/20 rounded-xl border border-[#b026ff]/30 hover:border-[#b026ff]/50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Shield className="w-6 h-6 text-[#b026ff]" />
                      <div>
                        <p className="font-bold text-[#b026ff]">Learn About Privacy</p>
                        <p className="text-xs text-white/60">Protect your financial data</p>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-[#b026ff]" />
                  </div>
                </div>
              </Link>
            </>
          )}

          {/* PRIVACY TAB */}
          {activeTab === "privacy" && (
            <>
              {/* Privacy Protocol Misuse */}
              {analysis.privacyProtocolMisuse && (
                <PrivacyMisuseCard misuses={analysis.privacyProtocolMisuse} />
              )}

              {/* Privacy Concerns */}
              {analysis.privacyMistakes && analysis.privacyMistakes.length > 0 && (
                <Card className="border-orange-500/30">
                  <CardContent className="py-4">
                    <div className="flex items-center gap-2 mb-3">
                      <AlertTriangle className="w-5 h-5 text-orange-500" />
                      <h3 className="font-bold">Privacy Concerns</h3>
                      <span className="text-xs px-2 py-0.5 bg-orange-500/20 text-orange-500 rounded-full">
                        {analysis.privacyMistakes.length}
                      </span>
                    </div>
                    <div className="space-y-3">
                      {analysis.privacyMistakes.slice(0, 5).map((mistake, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <span className={`w-2 h-2 mt-1.5 rounded-full flex-shrink-0 ${
                            mistake.severity === "critical" ? "bg-[#ff0844]" :
                            mistake.severity === "high" ? "bg-orange-500" :
                            mistake.severity === "medium" ? "bg-yellow-500" : "bg-white/40"
                          }`} />
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <p className="text-sm font-medium capitalize">{mistake.type.replace(/_/g, " ")}</p>
                              <span className={`text-[10px] px-1.5 py-0.5 rounded uppercase font-bold ${
                                mistake.severity === "critical" ? "bg-[#ff0844]/20 text-[#ff0844]" :
                                mistake.severity === "high" ? "bg-orange-500/20 text-orange-500" :
                                mistake.severity === "medium" ? "bg-yellow-500/20 text-yellow-500" : "bg-white/20 text-white/50"
                              }`}>
                                {mistake.severity}
                              </span>
                            </div>
                            <p className="text-xs text-white/50 mt-1">{mistake.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Token Approvals */}
              {analysis.approvals && analysis.approvals.length > 0 && (
                <Card className="border-orange-500/30">
                  <CardContent className="py-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Key className="w-5 h-5 text-orange-500" />
                      <h3 className="font-bold">Token Approvals</h3>
                      <span className="text-xs px-2 py-0.5 bg-orange-500/20 text-orange-500 rounded-full">
                        {analysis.approvals.length}
                      </span>
                    </div>
                    <p className="text-xs text-white/50 mb-3">
                      Contracts approved to spend your tokens
                    </p>
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {analysis.approvals.map((approval, i) => (
                        <div key={i} className="p-2 bg-white/5 rounded-lg">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-sm">{approval.tokenSymbol}</span>
                              {approval.isUnlimited && (
                                <span className="text-[8px] px-1 py-0.5 bg-[#ff0844]/20 text-[#ff0844] rounded font-bold">
                                  UNLIMITED
                                </span>
                              )}
                            </div>
                            <span className="text-xs text-orange-500">
                              {approval.spenderLabel || shortenAddress(approval.spender, 4)}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* CTA */}
              <EncryptTradeCTA
                surveillanceScore={analysis.surveillanceScore}
                cexDetected={(analysis.cexInteractions || 0) > 0}
                netWorth={analysis.netWorth}
              />
            </>
          )}

          {/* DETAILS TAB */}
          {activeTab === "details" && (
            <>
              {/* NFTs */}
              {analysis.nfts && analysis.nfts.length > 0 && (
                <Card>
                  <CardContent className="py-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Image className="w-5 h-5 text-[#b026ff]" />
                      <h3 className="font-bold">NFT Collection</h3>
                      <span className="text-xs px-2 py-0.5 bg-white/10 rounded-full">
                        {analysis.nfts.length}
                      </span>
                    </div>
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
                          <p className="text-[10px] p-1.5 truncate">{nft.name}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Protocols Used */}
              {analysis.protocolsUsed && analysis.protocolsUsed.length > 0 && (
                <Card>
                  <CardContent className="py-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Zap className="w-5 h-5 text-yellow-500" />
                      <h3 className="font-bold">Protocols Used</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {analysis.protocolsUsed.map((protocol, i) => (
                        <span key={i} className="px-2 py-1 bg-yellow-500/10 border border-yellow-500/30 rounded-full text-xs">
                          {protocol}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </>
          )}
        </motion.div>
      </AnimatePresence>

    </motion.div>
  );
}
