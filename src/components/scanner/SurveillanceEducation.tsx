"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import {
  Eye,
  Link2,
  Clock,
  Database,
  Users,
  AlertTriangle,
  Building,
  Globe,
  Fingerprint
} from "lucide-react";
import { useState } from "react";

interface SurveillanceEducationProps {
  connectedWalletsCount: number;
  totalTransactions: number;
  cexInteractions?: number;
}

export function SurveillanceEducation({
  connectedWalletsCount,
  totalTransactions,
  cexInteractions = 0
}: SurveillanceEducationProps) {
  const [expanded, setExpanded] = useState(false);

  const surveillanceMethods = [
    {
      icon: Link2,
      title: "Wallet Clustering",
      description: "When you send funds between wallets, analytics companies link them together. All your 'anonymous' wallets become one identity.",
      yourRisk: connectedWalletsCount > 5
        ? `You're connected to ${connectedWalletsCount} wallets - they're all linked to you now.`
        : "Limited connections detected, but any link is permanent.",
      meme: "🕵️ 'I'll just use a new wallet' - Famous last words",
    },
    {
      icon: Clock,
      title: "Timing Analysis",
      description: "Your transaction times reveal your timezone, sleep schedule, and daily routine. Patterns emerge after just a few transactions.",
      yourRisk: totalTransactions > 20
        ? `${totalTransactions} transactions = detailed behavioral profile`
        : "Building a pattern with every transaction you make.",
      meme: "⏰ Trading at 3am? They know you're either in Asia or have a problem",
    },
    {
      icon: Building,
      title: "CEX-to-DeFi Tracking",
      description: "Withdraw from Coinbase/Binance? That wallet is now linked to your KYC identity. Forever. Every future transaction traces back to you.",
      yourRisk: cexInteractions > 0
        ? `🚨 ${cexInteractions} CEX interactions detected - Your identity is linked!`
        : "No direct CEX links found (yet).",
      meme: "🏦 CEX knows your name. Now the whole blockchain does too.",
    },
    {
      icon: Fingerprint,
      title: "Transaction Fingerprinting",
      description: "Gas preferences, slippage settings, token choices, DEX preferences - all create a unique fingerprint that identifies you across wallets.",
      yourRisk: "Your trading patterns are as unique as a fingerprint.",
      meme: "🧬 You thought you were anonymous? Your degen plays say otherwise.",
    },
    {
      icon: Globe,
      title: "Cross-Chain Tracking",
      description: "Bridge to another chain? They track that too. Your identity follows you across Ethereum, Solana, and every other chain.",
      yourRisk: "Bridge transactions are high-visibility events that link identities.",
      meme: "🌉 Bridges don't just connect chains - they connect your identities",
    },
    {
      icon: Database,
      title: "Permanent Record",
      description: "Unlike your browser history, blockchain data can't be deleted. Every transaction is stored forever on thousands of nodes worldwide.",
      yourRisk: `All ${totalTransactions} of your transactions are permanently recorded.`,
      meme: "📜 Your grandkids will see you bought that memecoin at the top",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <Card className="border-[#ff0844]/30">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Eye className="w-5 h-5 text-[#ff0844]" />
              🔍 How You&apos;re Being Tracked
            </span>
            <button
              onClick={() => setExpanded(!expanded)}
              className="text-sm text-[#00fff9] hover:text-white transition-colors"
            >
              {expanded ? "Show Less" : "Learn More"}
            </button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Quick Summary */}
          <div className="mb-6 p-4 bg-[#ff0844]/10 border border-[#ff0844]/30 rounded-lg">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-6 h-6 text-[#ff0844] flex-shrink-0" />
              <div>
                <p className="text-white/90 font-medium mb-2">
                  Your wallet is NOT anonymous. Here&apos;s what they know:
                </p>
                <ul className="text-sm text-white/70 space-y-1">
                  <li>• Every token you&apos;ve ever held</li>
                  <li>• Everyone you&apos;ve transacted with</li>
                  <li>• Your complete trading history</li>
                  <li>• Your net worth (visible right now)</li>
                  {cexInteractions > 0 && (
                    <li className="text-[#ff0844]">• Your real identity (via CEX KYC)</li>
                  )}
                </ul>
              </div>
            </div>
          </div>

          {/* Surveillance Methods Grid */}
          <div className={`space-y-4 ${expanded ? "" : "max-h-[400px] overflow-hidden relative"}`}>
            {surveillanceMethods.map((method, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#ff0844]/20 flex items-center justify-center flex-shrink-0">
                    <method.icon className="w-5 h-5 text-[#ff0844]" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-white mb-1">{method.title}</h4>
                    <p className="text-sm text-white/70 mb-2">{method.description}</p>
                    <p className="text-sm text-[#00fff9] mb-2">
                      <strong>Your exposure:</strong> {method.yourRisk}
                    </p>
                    <p className="text-xs text-white/50 italic">{method.meme}</p>
                  </div>
                </div>
              </motion.div>
            ))}

            {!expanded && (
              <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#0a0a0f] to-transparent pointer-events-none" />
            )}
          </div>

          {/* Who's Watching */}
          <div className="mt-6 p-4 bg-white/5 rounded-lg">
            <h4 className="font-bold text-white mb-3 flex items-center gap-2">
              <Users className="w-4 h-4 text-[#b026ff]" />
              Who&apos;s Analyzing Your Wallet?
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              {[
                { name: "Chainalysis", type: "Gov/Law" },
                { name: "Arkham", type: "Public Intel" },
                { name: "Nansen", type: "Analytics" },
                { name: "0xScope", type: "Tracking" },
              ].map((company, i) => (
                <div key={i} className="p-2 bg-white/5 rounded">
                  <p className="text-sm font-medium text-white">{company.name}</p>
                  <p className="text-xs text-white/50">{company.type}</p>
                </div>
              ))}
            </div>
            <p className="text-xs text-white/50 mt-3 text-center">
              ...and countless others building profiles on every wallet
            </p>
          </div>

          {/* The Meme Truth */}
          <div className="mt-6 p-4 bg-gradient-to-r from-[#b026ff]/10 to-[#ff0844]/10 rounded-lg text-center">
            <p className="text-2xl mb-2">🤡</p>
            <p className="text-white/80 italic">
              &quot;Crypto is anonymous&quot; - Someone who&apos;s never heard of blockchain analytics
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
