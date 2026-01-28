"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { QuizComponent } from "../QuizComponent";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface LevelProps {
  onComplete: () => void;
  onBack: () => void;
}

const trackingCompanies = [
  { name: "Arkham Intelligence", desc: "Labels wallets, builds profiles on users" },
  { name: "Nansen", desc: "Tracks 'smart money' and whale wallets" },
  { name: "Chainalysis", desc: "Government/compliance tracking" },
  { name: "0xppl", desc: "Scores wallet behavior and activity" },
  { name: "Elliptic", desc: "Crypto forensics and compliance" },
];

const quizQuestions = [
  {
    question: "Can analytics companies link multiple wallets to one person?",
    options: ["No, wallets are separate", "Yes, through clustering analysis"],
    correctAnswer: 1,
    explanation: "Companies use transaction patterns, timing, and shared interactions to link wallets that belong to the same person.",
  },
  {
    question: "Is blockchain surveillance legal?",
    options: ["No, it's illegal wiretapping", "Yes, blockchain data is public"],
    correctAnswer: 1,
    explanation: "Since blockchain data is publicly available by design, analyzing it is completely legal. Companies make millions doing exactly this.",
  },
  {
    question: "Can you be tracked even if you're careful?",
    options: ["No, being careful is enough", "Yes, patterns and timing give you away"],
    correctAnswer: 1,
    explanation: "Even careful users leave patterns - transaction times, amounts, wallet interactions. These can be analyzed to identify you.",
  },
];

export function Level2({ onComplete, onBack }: LevelProps) {
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
        <h2 className="text-2xl font-bold mb-6 text-center">Level 2 Quiz</h2>
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
        <span className="text-6xl mb-4 block">🤔</span>
        <h1 className="text-3xl font-bold mb-2">Level 2: Aware</h1>
        <p className="text-white/60">&quot;How Tracking Actually Works&quot;</p>
      </div>

      <div className="space-y-6">
        {step === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Card>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-6">The Tracking Pipeline</h3>

                <div className="space-y-4">
                  {[
                    { step: "1", icon: "🔵", text: "Your wallet address exists" },
                    { step: "2", icon: "💱", text: "You buy a token: Address X bought Token Y for Z SOL" },
                    { step: "3", icon: "📊", text: "Companies analyze: 'Active trader, likes memecoins'" },
                    { step: "4", icon: "🏷️", text: "They label you: 'Degen trader, likely 18-25, high risk'" },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.2 }}
                      className="flex items-center gap-4 p-4 glass-card"
                    >
                      <span className="text-3xl">{item.icon}</span>
                      <div>
                        <span className="text-xs text-[#00fff9] font-bold">STEP {item.step}</span>
                        <p>{item.text}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {step === 1 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Card>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-6">Wallet Clustering</h3>

                <div className="mb-6 p-4 bg-[#ff0844]/10 rounded-xl text-center">
                  <p className="text-sm mb-4">You have 3 wallets. You sent SOL between them.</p>
                  <div className="flex justify-center items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#00fff9]/20 flex items-center justify-center">A</div>
                    <div className="text-[#00fff9]">↔</div>
                    <div className="w-12 h-12 rounded-full bg-[#b026ff]/20 flex items-center justify-center">B</div>
                    <div className="text-[#00fff9]">↔</div>
                    <div className="w-12 h-12 rounded-full bg-[#ff0844]/20 flex items-center justify-center">C</div>
                  </div>
                  <p className="text-sm text-[#ff0844] mt-4">Analytics companies now know all 3 are yours.</p>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold">How they link wallets:</h4>
                  <ul className="space-y-2 text-sm text-white/70">
                    <li className="flex items-start gap-2">
                      <span className="text-[#00fff9]">→</span>
                      Direct transfers between wallets
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#00fff9]">→</span>
                      Similar transaction timing patterns
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#00fff9]">→</span>
                      Same tokens, same times
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#00fff9]">→</span>
                      Interacting with same addresses
                    </li>
                  </ul>
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Card>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-6">Who&apos;s Watching You?</h3>

                <div className="space-y-3 mb-6">
                  {trackingCompanies.map((company, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="p-3 glass-card flex items-center gap-3"
                    >
                      <div className="w-10 h-10 rounded-lg bg-[#b026ff]/20 flex items-center justify-center text-lg">
                        👁️
                      </div>
                      <div>
                        <p className="font-semibold">{company.name}</p>
                        <p className="text-xs text-white/60">{company.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="p-4 bg-[#ff0844]/10 rounded-xl border border-[#ff0844]/30 text-center">
                  <p className="text-2xl font-bold text-[#ff0844] mb-2">50+</p>
                  <p className="text-sm">companies analyzing blockchain data</p>
                  <p className="text-xs text-white/60 mt-2">They know more about your finances than your bank.</p>
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
