"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import {
  Eye,
  EyeOff,
  Shield,
  AlertTriangle,
  Users,
  Bot,
  TrendingUp,
  Lock,
  ExternalLink,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { formatUSD } from "@/lib/utils";

interface BeforeAfterSimulatorProps {
  netWorth: number;
}

export function BeforeAfterSimulator({ netWorth }: BeforeAfterSimulatorProps) {
  const [showAfter, setShowAfter] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleToggle = () => {
    setIsAnimating(true);
    setShowAfter(!showAfter);
    setTimeout(() => setIsAnimating(false), 600);
  };

  const watchers = [
    { icon: Bot, label: "MEV Bots", color: "text-red-400" },
    { icon: Users, label: "Whale Trackers", color: "text-orange-400" },
    { icon: Eye, label: "Copy Traders", color: "text-yellow-400" },
    { icon: TrendingUp, label: "Analytics", color: "text-blue-400" },
  ];

  return (
    <Card className="border-[#b026ff]/30 overflow-hidden">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#00fff9]" />
            <h3 className="font-bold">Privacy Simulator</h3>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className={cn("transition-colors", !showAfter ? "text-red-400" : "text-white/40")}>
              Exposed
            </span>
            <button
              onClick={handleToggle}
              className={cn(
                "relative w-12 h-6 rounded-full transition-colors",
                showAfter ? "bg-[#00fff9]" : "bg-red-500"
              )}
            >
              <motion.div
                className="absolute top-1 w-4 h-4 bg-white rounded-full"
                animate={{ left: showAfter ? "calc(100% - 20px)" : "4px" }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            </button>
            <span className={cn("transition-colors", showAfter ? "text-[#00fff9]" : "text-white/40")}>
              Private
            </span>
          </div>
        </div>

        {/* Simulation Area */}
        <div className="relative min-h-[200px] bg-black/30 rounded-xl p-4 overflow-hidden">
          {/* Your Trade */}
          <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
            <motion.div
              className={cn(
                "p-4 rounded-xl border-2 transition-colors",
                showAfter
                  ? "bg-[#00fff9]/20 border-[#00fff9]/50"
                  : "bg-red-500/20 border-red-500/50"
              )}
              animate={{
                scale: isAnimating ? [1, 1.1, 1] : 1,
              }}
            >
              <div className="flex items-center gap-3">
                {showAfter ? (
                  <Lock className="w-8 h-8 text-[#00fff9]" />
                ) : (
                  <Eye className="w-8 h-8 text-red-400" />
                )}
                <div>
                  <p className="text-xs text-white/80">Your Trade</p>
                  <p className="font-bold text-white">
                    {showAfter ? "🔒 Hidden" : formatUSD(netWorth * 0.1)}
                  </p>
                  <p className={cn(
                    "text-xs font-medium",
                    showAfter ? "text-[#00fff9]" : "text-white/70"
                  )}>
                    {showAfter ? "Encrypted swap" : "Buy 1000 $BONK"}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Watchers - Before */}
          <AnimatePresence>
            {!showAfter && (
              <>
                {watchers.map((watcher, i) => {
                  const positions = [
                    { top: "10%", left: "10%" },
                    { top: "10%", right: "10%" },
                    { bottom: "10%", left: "10%" },
                    { bottom: "10%", right: "10%" },
                  ];
                  return (
                    <motion.div
                      key={watcher.label}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="absolute"
                      style={positions[i] as React.CSSProperties}
                    >
                      <div className="flex flex-col items-center gap-1">
                        <motion.div
                          animate={{
                            scale: [1, 1.2, 1],
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            delay: i * 0.2,
                          }}
                          className={cn("p-2 rounded-full bg-white/10", watcher.color)}
                        >
                          <watcher.icon className="w-4 h-4" />
                        </motion.div>
                        <span className="text-[10px] text-white/60">{watcher.label}</span>
                        {/* Line to center */}
                        <motion.div
                          className="absolute w-px bg-gradient-to-b from-red-500/50 to-transparent"
                          style={{
                            height: "40px",
                            top: "100%",
                            left: "50%",
                            transform: "translateX(-50%)",
                          }}
                          animate={{ opacity: [0.3, 0.8, 0.3] }}
                          transition={{ duration: 1, repeat: Infinity }}
                        />
                      </div>
                    </motion.div>
                  );
                })}

                {/* Alert banner */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 20, opacity: 0 }}
                  className="absolute bottom-2 left-2 right-2"
                >
                  <div className="flex items-center gap-2 p-3 bg-red-500/30 rounded-lg border border-red-500/50 backdrop-blur-sm">
                    <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0" />
                    <p className="text-sm font-medium text-white">
                      ⚠️ 4 entities watching your trade in real-time
                    </p>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>

          {/* Privacy Shield - After */}
          <AnimatePresence>
            {showAfter && (
              <>
                {/* Shield effect */}
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.5, opacity: 0 }}
                  className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                >
                  <div className="w-40 h-40 rounded-full border-2 border-[#00fff9]/30 bg-[#00fff9]/5" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full border-2 border-[#00fff9]/20 bg-[#00fff9]/5" />
                </motion.div>

                {/* Blocked watchers */}
                {watchers.map((watcher, i) => {
                  const positions = [
                    { top: "10%", left: "10%" },
                    { top: "10%", right: "10%" },
                    { bottom: "20%", left: "10%" },
                    { bottom: "20%", right: "10%" },
                  ];
                  return (
                    <motion.div
                      key={watcher.label}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.3 }}
                      exit={{ opacity: 0 }}
                      className="absolute"
                      style={positions[i] as React.CSSProperties}
                    >
                      <div className="flex flex-col items-center gap-1 opacity-30">
                        <div className="p-2 rounded-full bg-white/5 text-white/30 relative">
                          <watcher.icon className="w-4 h-4" />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-6 h-0.5 bg-red-500 rotate-45" />
                          </div>
                        </div>
                        <span className="text-[10px] text-white/30 line-through">{watcher.label}</span>
                      </div>
                    </motion.div>
                  );
                })}

                {/* Success banner */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 20, opacity: 0 }}
                  className="absolute bottom-2 left-2 right-2"
                >
                  <div className="flex items-center gap-2 p-3 bg-[#00fff9]/30 rounded-lg border border-[#00fff9]/50 backdrop-blur-sm">
                    <Shield className="w-5 h-5 text-[#00fff9] flex-shrink-0" />
                    <p className="text-sm font-medium text-white">
                      🔒 Your trade is encrypted. No one can see it.
                    </p>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>

        {/* CTA */}
        <div className="mt-4 flex items-center justify-between">
          <p className="text-xs text-white/50">
            {showAfter
              ? "This is how encrypt.trade protects you"
              : "Toggle to see the difference"}
          </p>
          <a
            href="https://encrypt.trade"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button size="sm" className="bg-gradient-to-r from-[#b026ff] to-[#00fff9]">
              Try It <ArrowRight className="w-3 h-3" />
            </Button>
          </a>
        </div>
      </div>
    </Card>
  );
}
