"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { QuizComponent } from "../QuizComponent";
import { ArrowLeft, ArrowRight, Shield, Check, X } from "lucide-react";

interface LevelProps {
  onComplete: () => void;
  onBack: () => void;
}

const quizQuestions = [
  {
    question: "Does selective privacy mean zero transparency?",
    options: ["Yes, everything is hidden", "No, you choose what to reveal"],
    correctAnswer: 1,
    explanation: "Selective privacy means you control what's visible. You can hide your trading strategy while still participating in DeFi.",
  },
  {
    question: "Can you still use normal DeFi with selective privacy?",
    options: ["No, it's separate from DeFi", "Yes, that's the whole point"],
    correctAnswer: 1,
    explanation: "Unlike full privacy solutions that isolate you, selective privacy integrates with existing DeFi protocols.",
  },
  {
    question: "Is selective privacy better than full privacy mixers for most use cases?",
    options: ["No, full privacy is always better", "Yes, it balances privacy and usability"],
    correctAnswer: 1,
    explanation: "Full privacy tools often make you stand out and limit what you can do. Selective privacy gives you privacy where you need it without sacrificing functionality.",
  },
];

export function Level4({ onComplete, onBack }: LevelProps) {
  const [step, setStep] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);

  const handleQuizComplete = (passed: boolean) => {
    if (passed) {
      onComplete();
    } else {
      setShowQuiz(false);
      setStep(0);
    }
  };

  if (showQuiz) {
    return (
      <div>
        <button onClick={() => setShowQuiz(false)} className="mb-6 text-white/60 hover:text-white flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Back to lesson
        </button>
        <h2 className="text-2xl font-bold mb-6 text-center">Level 4 Quiz</h2>
        <QuizComponent questions={quizQuestions} onComplete={handleQuizComplete} />
      </div>
    );
  }

  return (
    <div>
      <button onClick={onBack} className="mb-6 text-white/60 hover:text-white flex items-center gap-2">
        <ArrowLeft className="w-4 h-4" /> Back to levels
      </button>

      <div className="text-center mb-8">
        <span className="text-6xl mb-4 block">🥷</span>
        <h1 className="text-3xl font-bold mb-2">Level 4: Privacy Ninja</h1>
        <p className="text-white/60">&quot;Selective Privacy FTW&quot;</p>
      </div>

      <div className="space-y-6">
        {step === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Card>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-6">The All-or-Nothing Problem</h3>

                <div className="space-y-4 mb-6">
                  <div className="p-4 glass-card border-[#ff0844]/30">
                    <p className="text-sm text-[#ff0844] mb-1">Full Privacy</p>
                    <p>Can&apos;t interact with normal DeFi</p>
                  </div>
                  <div className="p-4 glass-card border-[#ff0844]/30">
                    <p className="text-sm text-[#ff0844] mb-1">No Privacy</p>
                    <p>Everyone sees everything</p>
                  </div>
                  <div className="p-4 glass-card border-[#00fff9]/30">
                    <p className="text-sm text-[#00fff9] mb-1">Selective Privacy</p>
                    <p>You choose what to hide and what to reveal</p>
                  </div>
                </div>

                <div className="p-4 bg-[#00fff9]/10 rounded-xl">
                  <p className="text-center">What if you could have the best of both worlds?</p>
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {step === 1 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Card>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-6">How Selective Privacy Works</h3>

                <div className="space-y-4 mb-6">
                  <div className="p-4 glass-card">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl">🏠</span>
                      <span className="font-semibold">Normal Transaction</span>
                    </div>
                    <p className="text-sm text-white/60">You → DEX (everyone sees)</p>
                    <p className="text-xs text-[#ff0844] mt-1">Like living in a glass house</p>
                  </div>

                  <div className="p-4 glass-card border-[#00fff9]/30">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl">🪞</span>
                      <span className="font-semibold">Selective Privacy</span>
                    </div>
                    <p className="text-sm text-white/60">You → encrypted layer → DEX (only outcome visible)</p>
                    <p className="text-xs text-[#00fff9] mt-1">Like a one-way mirror</p>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="text-left p-2">Feature</th>
                        <th className="text-center p-2">Public</th>
                        <th className="text-center p-2">Full Privacy</th>
                        <th className="text-center p-2 text-[#00fff9]">Selective</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ["Can use DeFi", true, false, true],
                        ["Hide behavior", false, true, true],
                        ["Stay compliant", true, false, true],
                        ["Keep it simple", true, false, true],
                      ].map(([feature, pub, full, sel], i) => (
                        <tr key={i} className="border-b border-white/5">
                          <td className="p-2">{feature}</td>
                          <td className="text-center p-2">
                            {pub ? <Check className="w-4 h-4 text-green-500 mx-auto" /> : <X className="w-4 h-4 text-[#ff0844] mx-auto" />}
                          </td>
                          <td className="text-center p-2">
                            {full ? <Check className="w-4 h-4 text-green-500 mx-auto" /> : <X className="w-4 h-4 text-[#ff0844] mx-auto" />}
                          </td>
                          <td className="text-center p-2">
                            {sel ? <Check className="w-4 h-4 text-[#00fff9] mx-auto" /> : <X className="w-4 h-4 text-[#ff0844] mx-auto" />}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Card>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-6">Use Cases</h3>

                <div className="space-y-4">
                  <div className="p-4 glass-card">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl">🧠</span>
                      <span className="font-semibold">The Degen Trader</span>
                    </div>
                    <p className="text-sm text-white/60 mb-2">Problem: Don&apos;t want people to copy my trades</p>
                    <p className="text-sm text-[#00fff9]">Solution: Private buys, public sells</p>
                  </div>

                  <div className="p-4 glass-card">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl">💼</span>
                      <span className="font-semibold">The Salary Worker</span>
                    </div>
                    <p className="text-sm text-white/60 mb-2">Problem: Get paid in crypto, don&apos;t want coworkers to see wallet</p>
                    <p className="text-sm text-[#00fff9]">Solution: Receive through encrypted channel</p>
                  </div>

                  <div className="p-4 glass-card">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl">🎨</span>
                      <span className="font-semibold">The NFT Collector</span>
                    </div>
                    <p className="text-sm text-white/60 mb-2">Problem: Don&apos;t want people to see what I&apos;m buying before I flip</p>
                    <p className="text-sm text-[#00fff9]">Solution: Private buys, public sales</p>
                  </div>
                </div>

                <div className="mt-6">
                  <a
                    href="https://encrypt.trade"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <Button className="w-full" size="lg">
                      <Shield className="w-5 h-5" />
                      Try encrypt.trade
                    </Button>
                  </a>
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Navigation */}
        <div className="flex justify-between items-center pt-4">
          <Button
            variant="ghost"
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            disabled={step === 0}
          >
            <ArrowLeft className="w-4 h-4" /> Previous
          </Button>

          <div className="flex gap-2">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full transition-colors ${
                  step === i ? "bg-[#00fff9]" : "bg-white/20"
                }`}
              />
            ))}
          </div>

          {step < 2 ? (
            <Button onClick={() => setStep((s) => s + 1)}>
              Next <ArrowRight className="w-4 h-4" />
            </Button>
          ) : (
            <Button onClick={() => setShowQuiz(true)}>
              Take Quiz <ArrowRight className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
