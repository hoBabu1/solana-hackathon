"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { QuizComponent } from "../QuizComponent";
import { ArrowLeft, ArrowRight, AlertTriangle } from "lucide-react";

interface LevelProps {
  onComplete: () => void;
  onBack: () => void;
}

const quizQuestions = [
  {
    question: "If you make a privacy mistake once, can you undo it?",
    options: ["Yes, just delete the transaction", "No, blockchain data is permanent"],
    correctAnswer: 1,
    explanation: "Once data is on the blockchain, it's there forever. One doxxing incident permanently links your identity to your wallet.",
  },
  {
    question: "Does using a VPN hide your blockchain activity?",
    options: ["Yes, VPNs make you anonymous", "No, VPNs only hide your IP"],
    correctAnswer: 1,
    explanation: "VPNs hide your IP address, but blockchain transactions are recorded independently. Your wallet activity is still fully visible.",
  },
  {
    question: "Can one doxxed transaction expose all your wallets?",
    options: ["No, wallets are isolated", "Yes, through clustering analysis"],
    correctAnswer: 1,
    explanation: "If one wallet is linked to your identity, any wallets that interact with it can also be linked to you through clustering.",
  },
];

export function Level3({ onComplete, onBack }: LevelProps) {
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
        <h2 className="text-2xl font-bold mb-6 text-center">Level 3 Quiz</h2>
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
        <span className="text-6xl mb-4 block">😰</span>
        <h1 className="text-3xl font-bold mb-2">Level 3: Paranoid</h1>
        <p className="text-white/60">&quot;One Mistake = Forever Exposed&quot;</p>
      </div>

      <div className="space-y-6">
        {step === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Card className="border-[#ff0844]/30">
              <div className="p-6">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <AlertTriangle className="w-6 h-6 text-[#ff0844]" />
                  The Doxxing Disaster
                </h3>

                <div className="space-y-4">
                  <div className="p-4 glass-card">
                    <p className="text-sm text-white/60 mb-2">SCENARIO</p>
                    <p>You post your wallet address in Discord to receive payment...</p>
                  </div>

                  <div className="p-4 glass-card border-[#ff0844]/30">
                    <p className="text-sm text-[#ff0844] mb-2">RESULT</p>
                    <p>Everyone in that Discord now sees your entire financial history.</p>
                  </div>

                  <div className="p-4 bg-[#ff0844]/10 rounded-xl">
                    <p className="text-sm italic">&quot;Your friend: &apos;Bro you have 69 SOL? I thought you were broke&apos;&quot;</p>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-yellow-500/10 rounded-xl border border-yellow-500/30">
                  <p className="text-sm text-yellow-500 font-semibold mb-1">Real consequences:</p>
                  <ul className="text-sm text-white/70 space-y-1">
                    <li>• Friends/family see your net worth</li>
                    <li>• Coworkers see your trading losses</li>
                    <li>• Anyone can see your transaction history</li>
                  </ul>
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {step === 1 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Card>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-6">The Mixer Mistake</h3>

                <p className="text-white/60 mb-4">You want to hide 10 SOL. What do you do?</p>

                <div className="space-y-4">
                  <div className="p-4 glass-card border-[#ff0844]/30">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[#ff0844] font-bold">❌ Wrong:</span>
                    </div>
                    <p className="text-sm mb-2">Use privacy mixer → Withdraw to same wallet immediately</p>
                    <p className="text-xs text-white/60">&quot;Everyone can still see the connection. You played yourself.&quot;</p>
                  </div>

                  <div className="p-4 glass-card border-green-500/30">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-green-500 font-bold">✓ Better:</span>
                    </div>
                    <p className="text-sm mb-2">Use privacy mixer → Wait days → Withdraw to NEW wallet → Use for different purpose</p>
                    <p className="text-xs text-white/60">&quot;Better privacy, but still not perfect.&quot;</p>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-[#b026ff]/10 rounded-xl">
                  <p className="text-sm text-center">Privacy requires patience and planning. Quick fixes don&apos;t work.</p>
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Card>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-6">The Permanent Problem</h3>

                <div className="text-center mb-6">
                  <p className="text-4xl mb-4">🎯 → 💥 → 💥 → 💥 → 💥</p>
                  <p className="text-white/60">One public transaction creates a domino effect</p>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3">
                    <span className="text-[#ff0844]">✗</span>
                    <span>You cannot delete blockchain data</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[#ff0844]">✗</span>
                    <span>One public transaction exposes your entire network</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[#ff0844]">✗</span>
                    <span>Your mistakes are visible forever</span>
                  </div>
                </div>

                <div className="p-4 bg-[#ff0844]/10 rounded-xl border border-[#ff0844]/30">
                  <p className="text-center font-semibold text-[#ff0844] mb-2">The Lesson</p>
                  <p className="text-sm text-center text-white/70">
                    Prevention is the only protection. Once you&apos;re exposed, there&apos;s no going back.
                  </p>
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
