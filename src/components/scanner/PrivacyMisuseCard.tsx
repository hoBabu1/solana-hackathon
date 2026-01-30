"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { PrivacyProtocolMisuse } from "@/types";
import {
  ShieldAlert,
  Clock,
  Hash,
  Link2,
  Timer,
  Bug,
  Shield,
  ExternalLink,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";

interface PrivacyMisuseCardProps {
  misuses: PrivacyProtocolMisuse[];
}

const issueIcons: Record<string, React.ReactNode> = {
  quick_withdrawal: <Clock className="w-4 h-4" />,
  same_amount: <Hash className="w-4 h-4" />,
  round_numbers: <Hash className="w-4 h-4" />,
  linked_wallets: <Link2 className="w-4 h-4" />,
  timing_correlation: <Timer className="w-4 h-4" />,
  dust_attack_vulnerable: <Bug className="w-4 h-4" />,
};

const severityConfig: Record<string, { color: string; bgColor: string; borderColor: string }> = {
  critical: { color: "text-[#ff0844]", bgColor: "bg-[#ff0844]/10", borderColor: "border-[#ff0844]/30" },
  high: { color: "text-orange-500", bgColor: "bg-orange-500/10", borderColor: "border-orange-500/30" },
  medium: { color: "text-yellow-500", bgColor: "bg-yellow-500/10", borderColor: "border-yellow-500/30" },
  low: { color: "text-blue-400", bgColor: "bg-blue-400/10", borderColor: "border-blue-400/30" },
};

export function PrivacyMisuseCard({ misuses }: PrivacyMisuseCardProps) {
  const criticalCount = misuses.filter(m => m.severity === "critical").length;
  const highCount = misuses.filter(m => m.severity === "high").length;
  const hasIssues = misuses.length > 0;

  return (
    <Card className={`border-2 ${hasIssues ? "border-[#ff0844]/50 bg-[#ff0844]/5" : "border-[#00ff9f]/50 bg-[#00ff9f]/5"}`}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldAlert className={`w-5 h-5 ${hasIssues ? "text-[#ff0844]" : "text-[#00ff9f]"}`} />
            Privacy Protocol Misuse
          </div>
          {hasIssues ? (
            <div className="flex items-center gap-2">
              {criticalCount > 0 && (
                <span className="text-xs px-2 py-1 bg-[#ff0844]/20 text-[#ff0844] rounded-full font-bold">
                  {criticalCount} CRITICAL
                </span>
              )}
              {highCount > 0 && (
                <span className="text-xs px-2 py-1 bg-orange-500/20 text-orange-500 rounded-full font-bold">
                  {highCount} HIGH
                </span>
              )}
            </div>
          ) : (
            <span className="text-xs px-2 py-1 bg-[#00ff9f]/20 text-[#00ff9f] rounded-full font-bold">
              NO ISSUES
            </span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Explanation */}
        <div className={`mb-4 p-3 rounded-lg border ${hasIssues ? "bg-[#ff0844]/10 border-[#ff0844]/30" : "bg-[#00ff9f]/10 border-[#00ff9f]/30"}`}>
          <div className="flex items-start gap-2">
            {hasIssues ? (
              <AlertTriangle className="w-4 h-4 text-[#ff0844] flex-shrink-0 mt-0.5" />
            ) : (
              <CheckCircle className="w-4 h-4 text-[#00ff9f] flex-shrink-0 mt-0.5" />
            )}
            <div>
              <p className={`text-sm font-bold ${hasIssues ? "text-[#ff0844]" : "text-[#00ff9f]"}`}>
                {hasIssues ? "Privacy Protocol Usage Issues Detected" : "No Privacy Protocol Issues Found"}
              </p>
              <p className="text-xs text-white/70 mt-1">
                {hasIssues
                  ? "Using privacy protocols incorrectly can make your transactions MORE traceable. These patterns have been linked to your wallet."
                  : "We didn't find any common privacy protocol mistakes. This doesn't mean you're fully private - just that you haven't made obvious mistakes."}
              </p>
            </div>
          </div>
        </div>

        {/* Misuse List */}
        {hasIssues && (
          <div className="space-y-3 mb-6">
            {misuses.map((misuse, i) => {
              const config = severityConfig[misuse.severity];
              return (
                <motion.div
                  key={`${misuse.issue}-${i}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className={`p-4 rounded-lg border ${config.bgColor} ${config.borderColor}`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className={`w-8 h-8 rounded-full ${config.bgColor} flex items-center justify-center ${config.color}`}>
                        {issueIcons[misuse.issue]}
                      </div>
                      <div>
                        <p className="font-bold text-sm">{misuse.description}</p>
                        <p className="text-xs text-white/40">{misuse.protocol}</p>
                      </div>
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-bold uppercase ${config.bgColor} ${config.color}`}>
                      {misuse.severity}
                    </span>
                  </div>

                  <p className="text-sm text-white/70 mb-3">{misuse.details}</p>

                  <div className={`p-2 rounded ${config.bgColor}`}>
                    <p className="text-xs text-white/50 mb-1">Recommendation:</p>
                    <p className={`text-xs font-medium ${config.color}`}>{misuse.recommendation}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Educational Content */}
        <div className="p-4 bg-white/5 rounded-lg mb-4">
          <p className="text-xs font-bold text-white/70 mb-3">Common Privacy Mistakes:</p>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-2 bg-white/5 rounded">
              <Clock className="w-3 h-3 text-[#ff0844] mb-1" />
              <span className="text-[#ff0844]">Quick Withdrawals</span>
              <p className="text-white/40">Timing links transactions</p>
            </div>
            <div className="p-2 bg-white/5 rounded">
              <Hash className="w-3 h-3 text-[#ff0844] mb-1" />
              <span className="text-[#ff0844]">Same Amounts</span>
              <p className="text-white/40">Easy to correlate</p>
            </div>
            <div className="p-2 bg-white/5 rounded">
              <Link2 className="w-3 h-3 text-[#ff0844] mb-1" />
              <span className="text-[#ff0844]">Linked Wallets</span>
              <p className="text-white/40">Clustering defeats privacy</p>
            </div>
            <div className="p-2 bg-white/5 rounded">
              <Bug className="w-3 h-3 text-[#ff0844] mb-1" />
              <span className="text-[#ff0844]">Dust Attacks</span>
              <p className="text-white/40">Tracking via small txs</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        {hasIssues && (
          <div className="p-4 bg-gradient-to-r from-[#b026ff]/20 to-[#00fff9]/20 rounded-lg border border-[#00fff9]/30">
            <div className="flex items-center gap-3 mb-3">
              <Shield className="w-6 h-6 text-[#00fff9]" />
              <div>
                <p className="font-bold text-[#00fff9]">Fix These Issues with encrypt.trade</p>
                <p className="text-xs text-white/60">Automated privacy that handles timing, amounts, and wallet separation for you.</p>
              </div>
            </div>
            <a href="https://encrypt.trade" target="_blank" rel="noopener noreferrer">
              <Button className="w-full bg-gradient-to-r from-[#b026ff] to-[#00fff9]">
                <Shield className="w-4 h-4" />
                Start Trading Privately
                <ExternalLink className="w-3 h-3 ml-1" />
              </Button>
            </a>
          </div>
        )}

        {/* Meme */}
        <div className="mt-4 p-3 bg-gradient-to-r from-[#00fff9]/10 to-[#b026ff]/10 rounded-lg text-center">
          <p className="text-xs text-white/70 italic">
            {hasIssues
              ? '"I used a mixer so I\'m anonymous" - Someone who withdrew 1 ETH exactly 5 minutes later'
              : '"Privacy through obscurity is not privacy" - But at least you\'re trying'}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
