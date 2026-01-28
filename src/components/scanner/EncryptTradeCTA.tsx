"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Shield, Lock, Eye, EyeOff, ArrowRight, Sparkles } from "lucide-react";

interface EncryptTradeCTAProps {
  surveillanceScore: number;
  cexDetected?: boolean;
  netWorth?: number;
}

export function EncryptTradeCTA({ surveillanceScore, cexDetected, netWorth }: EncryptTradeCTAProps) {
  const isHighRisk = surveillanceScore >= 60;
  const isCritical = surveillanceScore >= 80;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      <Card className="relative overflow-hidden border-2 border-[#00ff9f]/50 bg-gradient-to-br from-[#00ff9f]/5 via-[#00fff9]/5 to-[#b026ff]/5">
        {/* Animated background */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-0 w-64 h-64 bg-[#00ff9f]/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#b026ff]/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        </div>

        <CardContent className="relative py-8 px-6">
          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-full bg-[#00ff9f]/20 flex items-center justify-center">
              <Shield className="w-6 h-6 text-[#00ff9f]" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">
                {isCritical ? "🚨 CRITICAL: " : isHighRisk ? "⚠️ " : "💡 "}
                Take Back Your Privacy
              </h3>
              <p className="text-sm text-white/60">Powered by encrypt.trade</p>
            </div>
          </div>

          {/* Problem Statement */}
          <div className="mb-6 p-4 bg-[#ff0844]/10 border border-[#ff0844]/30 rounded-lg">
            <h4 className="font-bold text-[#ff0844] mb-2 flex items-center gap-2">
              <Eye className="w-4 h-4" />
              The Problem: You&apos;re Being Watched
            </h4>
            <ul className="text-sm text-white/80 space-y-1">
              {cexDetected && (
                <li>• Your CEX transactions link your wallet to your real identity</li>
              )}
              <li>• Every swap, transfer, and balance is publicly visible</li>
              <li>• Blockchain analytics companies profile your every move</li>
              <li>• Your financial history is permanent and searchable</li>
              {netWorth && netWorth > 10000 && (
                <li>• Your ${netWorth.toLocaleString()} balance makes you a target</li>
              )}
            </ul>
          </div>

          {/* Solution */}
          <div className="mb-6 p-4 bg-[#00ff9f]/10 border border-[#00ff9f]/30 rounded-lg">
            <h4 className="font-bold text-[#00ff9f] mb-2 flex items-center gap-2">
              <EyeOff className="w-4 h-4" />
              The Solution: Selective Privacy
            </h4>
            <p className="text-sm text-white/80 mb-3">
              <strong>encrypt.trade</strong> is a privacy engine for DeFi that lets you:
            </p>
            <ul className="text-sm text-white/80 space-y-2">
              <li className="flex items-start gap-2">
                <Lock className="w-4 h-4 text-[#00ff9f] flex-shrink-0 mt-0.5" />
                <span><strong>Hide transaction amounts</strong> - Observers see activity but not values</span>
              </li>
              <li className="flex items-start gap-2">
                <Lock className="w-4 h-4 text-[#00ff9f] flex-shrink-0 mt-0.5" />
                <span><strong>Break wallet links</strong> - Disconnect your CEX identity from DeFi</span>
              </li>
              <li className="flex items-start gap-2">
                <Lock className="w-4 h-4 text-[#00ff9f] flex-shrink-0 mt-0.5" />
                <span><strong>Private swaps & transfers</strong> - Trade without revealing your strategy</span>
              </li>
              <li className="flex items-start gap-2">
                <Lock className="w-4 h-4 text-[#00ff9f] flex-shrink-0 mt-0.5" />
                <span><strong>Encrypted balances</strong> - Your holdings stay private</span>
              </li>
            </ul>
          </div>

          {/* How it works */}
          <div className="mb-6 p-4 bg-white/5 rounded-lg">
            <h4 className="font-bold text-white mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#00fff9]" />
              How encrypt.trade Works
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
              <div>
                <div className="w-10 h-10 rounded-full bg-[#00fff9]/20 flex items-center justify-center mx-auto mb-2">
                  <span className="text-lg font-bold text-[#00fff9]">1</span>
                </div>
                <p className="text-xs text-white/70">Connect your existing Solana wallet</p>
              </div>
              <div>
                <div className="w-10 h-10 rounded-full bg-[#b026ff]/20 flex items-center justify-center mx-auto mb-2">
                  <span className="text-lg font-bold text-[#b026ff]">2</span>
                </div>
                <p className="text-xs text-white/70">Transactions are encrypted off-chain</p>
              </div>
              <div>
                <div className="w-10 h-10 rounded-full bg-[#00ff9f]/20 flex items-center justify-center mx-auto mb-2">
                  <span className="text-lg font-bold text-[#00ff9f]">3</span>
                </div>
                <p className="text-xs text-white/70">DeFi with privacy, no new wallets needed</p>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <a
            href="https://encrypt.trade"
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <Button className="w-full bg-gradient-to-r from-[#00ff9f] to-[#00fff9] text-black font-bold py-4 text-lg hover:opacity-90 transition-opacity">
              <Shield className="w-5 h-5 mr-2" />
              Protect Your Wallet with encrypt.trade
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </a>

          <p className="text-center text-xs text-white/40 mt-4">
            Compliant privacy for Solana DeFi • No smart contract modifications required
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
}
