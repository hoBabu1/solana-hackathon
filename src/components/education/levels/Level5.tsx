"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ArrowLeft, ArrowRight, Award, Shield } from "lucide-react";

interface LevelProps {
  onComplete: () => void;
  onBack: () => void;
}

export function Level5({ onComplete, onBack }: LevelProps) {
  const [step, setStep] = useState(0);
  const totalSteps = 4;

  return (
    <div>
      <button onClick={onBack} className="mb-6 text-white/60 hover:text-white flex items-center gap-2">
        <ArrowLeft className="w-4 h-4" /> Back to levels
      </button>

      <div className="text-center mb-8">
        <span className="text-6xl mb-4 block">👻</span>
        <h1 className="text-3xl font-bold mb-2">Level 5: Ghost Mode</h1>
        <p className="text-white/60">&quot;Master Class&quot;</p>
      </div>

      <div className="space-y-6">
        {step === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Card className="border-[#00fff9]/30">
              <div className="p-6 text-center">
                <Award className="w-16 h-16 text-[#00fff9] mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">Congratulations!</h3>
                <p className="text-white/60 mb-4">You&apos;ve reached peak privacy awareness.</p>
                <p className="text-sm text-[#00fff9]">Here&apos;s what the 1% knows...</p>
              </div>
            </Card>
          </motion.div>
        )}

        {step === 1 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Card>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-6">Wallet Hygiene Best Practices</h3>

                <p className="text-white/60 mb-4">Use different wallets for different purposes:</p>

                <div className="space-y-3">
                  {[
                    { emoji: "🏦", name: "Cold Storage", desc: "Long-term holdings, never interact with dApps" },
                    { emoji: "🔥", name: "Hot Wallet", desc: "Daily trading, acceptable to be somewhat exposed" },
                    { emoji: "🎭", name: "Burner", desc: "Public interactions, airdrops, NFT mints" },
                    { emoji: "👻", name: "Private", desc: "Selective privacy transactions" },
                  ].map((wallet, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="p-3 glass-card flex items-center gap-3"
                    >
                      <span className="text-2xl">{wallet.emoji}</span>
                      <div>
                        <p className="font-semibold">{wallet.name}</p>
                        <p className="text-xs text-white/60">{wallet.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-4 p-3 bg-[#b026ff]/10 rounded-xl text-sm text-center">
                  Never send funds directly between these wallets!
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Card>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-6">Advanced Strategies</h3>

                <div className="space-y-4">
                  <div className="p-4 glass-card">
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <span className="text-[#00fff9]">⏰</span> Transaction Timing
                    </h4>
                    <div className="text-sm space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-[#ff0844]">❌ Bad:</span>
                        <span className="text-white/60">Trade every day at 9 AM</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-green-500">✓ Good:</span>
                        <span className="text-white/60">Random times, random amounts</span>
                      </div>
                    </div>
                    <p className="text-xs text-white/40 mt-2">Automation makes you predictable</p>
                  </div>

                  <div className="p-4 glass-card">
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <span className="text-[#00fff9]">📱</span> Social Media Discipline
                    </h4>
                    <p className="text-sm text-white/60 mb-2">Never post:</p>
                    <ul className="text-sm text-white/60 space-y-1 ml-4">
                      <li>• Wallet addresses</li>
                      <li>• Transaction hashes</li>
                      <li>• Screenshots with addresses visible</li>
                      <li>• &quot;Just made a trade&quot; tweets</li>
                    </ul>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Card className="border-[#00fff9]/30">
              <div className="p-6 text-center">
                <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#00fff9] to-[#b026ff] flex items-center justify-center">
                  <span className="text-6xl">🥷</span>
                </div>

                <h3 className="text-2xl font-bold mb-2 gradient-text">Privacy Ninja Certified</h3>
                <p className="text-white/60 mb-6">You now know more about blockchain privacy than 99% of users.</p>

                <div className="space-y-3 text-left max-w-sm mx-auto mb-6">
                  <p className="text-sm">Your final challenge:</p>
                  <ul className="text-sm text-white/60 space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-[#00fff9]">1.</span>
                      Review your own wallet
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#00fff9]">2.</span>
                      Find 3 privacy mistakes you&apos;ve made
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#00fff9]">3.</span>
                      Make a plan to improve
                    </li>
                  </ul>
                </div>

                <Button onClick={onComplete} size="lg" className="mb-4">
                  <Award className="w-5 h-5" />
                  Claim Certificate
                </Button>

                <a
                  href="https://encrypt.trade"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Button variant="secondary" className="w-full">
                    <Shield className="w-5 h-5" />
                    Start Protecting Your Privacy with encrypt.trade
                  </Button>
                </a>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Navigation */}
        {step < 3 && (
          <div className="flex justify-between items-center pt-4">
            <Button
              variant="ghost"
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              disabled={step === 0}
            >
              <ArrowLeft className="w-4 h-4" /> Previous
            </Button>

            <div className="flex gap-2">
              {Array.from({ length: totalSteps }).map((_, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    step === i ? "bg-[#00fff9]" : "bg-white/20"
                  }`}
                />
              ))}
            </div>

            <Button onClick={() => setStep((s) => s + 1)}>
              Next <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
