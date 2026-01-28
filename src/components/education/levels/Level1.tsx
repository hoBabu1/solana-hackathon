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

const contentStep0 = {
  title: "The Awakening",
  panels: [
    { emoji: "😏", text: "\"I'm anonymous on blockchain. No one knows who I am.\"", character: "You" },
    { emoji: "🐸", text: "\"Your wallet: Pump3x...69Wd. You bought $500 of BONK yesterday at 3:47 PM.\"", character: "Anyone with Solscan" },
    { emoji: "😰", text: "\"How do you know that?!\"", character: "You" },
    { emoji: "🐸", text: "\"It's literally public, genius. Everyone can see it.\"", character: "Anyone" },
  ],
};

const contentStep1 = {
  title: "The Brutal Truth",
  content: [
    "Blockchains are **transparent ledgers** - that's the whole point.",
    "Every transaction you make is **permanently recorded**.",
    "Anyone can see: **what you own**, **what you buy**, and **who you interact with**.",
    "Think of it like your bank statement posted on a **giant billboard**... **forever**.",
  ],
  meme: "🪧 Imagine if everyone could see your Netflix history. Now imagine that, but for your money.",
};

const contentStep2 = {
  title: "Don't Believe Us?",
  content: [
    "Go to **solscan.io** right now",
    "Search for any wallet address",
    "See **EVERYTHING**: balances, transactions, token history",
    "This is what everyone sees about YOUR wallet too",
  ],
  callout: "Try it: Look up any big wallet. You'll see their entire financial history. Now imagine someone doing that to YOU.",
};

const quizQuestions = [
  {
    question: "Are Solana wallet addresses anonymous?",
    options: ["Yes, no one can see my activity", "No, all transactions are public"],
    correctAnswer: 1,
    explanation: "Blockchain transactions are completely public. Anyone can see every transaction ever made by your wallet.",
  },
  {
    question: "Can people see your transaction history?",
    options: ["Only if I share my wallet address", "Yes, anyone can look it up anytime"],
    correctAnswer: 1,
    explanation: "Your transaction history is permanently recorded on the blockchain and visible to anyone, regardless of whether you share your address.",
  },
  {
    question: "If you delete your wallet app, does your blockchain data disappear?",
    options: ["Yes, it's deleted with the app", "No, blockchain data is permanent"],
    correctAnswer: 1,
    explanation: "Blockchain data is immutable. Even if you delete your wallet, all your historical transactions remain visible forever.",
  },
];

export function Level1({ onComplete, onBack }: LevelProps) {
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
        <h2 className="text-2xl font-bold mb-6 text-center">Level 1 Quiz</h2>
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
        <span className="text-6xl mb-4 block">🤡</span>
        <h1 className="text-3xl font-bold mb-2">Level 1: Noob</h1>
        <p className="text-white/60">&quot;Wait, Crypto Isn&apos;t Private?&quot;</p>
      </div>

      {/* Content sections */}
      <div className="space-y-6">
        {step === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Card>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-6 text-center">{contentStep0.title}</h3>
                <div className="space-y-4">
                  {contentStep0.panels.map((panel, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.3 }}
                      className={`flex items-start gap-3 ${i % 2 === 0 ? "" : "flex-row-reverse text-right"}`}
                    >
                      <span className="text-4xl">{panel.emoji}</span>
                      <div className={`flex-1 p-4 glass-card ${i % 2 === 0 ? "bg-white/5" : "bg-[#00fff9]/5"}`}>
                        <p className="text-xs text-white/40 mb-1">{panel.character}</p>
                        <p>{panel.text}</p>
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
                <h3 className="text-xl font-bold mb-6">{contentStep1.title}</h3>
                <ul className="space-y-4">
                  {contentStep1.content.map((item, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.2 }}
                      className="flex items-start gap-3"
                    >
                      <span className="text-[#00fff9]">→</span>
                      <span dangerouslySetInnerHTML={{ __html: item.replace(/\*\*(.*?)\*\*/g, '<strong class="text-[#00fff9]">$1</strong>') }} />
                    </motion.li>
                  ))}
                </ul>
                <div className="mt-6 p-4 bg-[#b026ff]/10 rounded-xl border border-[#b026ff]/30">
                  <p className="text-center text-sm">{contentStep1.meme}</p>
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Card>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-6">{contentStep2.title}</h3>
                <ul className="space-y-4 mb-6">
                  {contentStep2.content.map((item, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.2 }}
                      className="flex items-start gap-3"
                    >
                      <span className="text-[#ff0844] font-bold">{i + 1}.</span>
                      <span dangerouslySetInnerHTML={{ __html: item.replace(/\*\*(.*?)\*\*/g, '<strong class="text-[#00fff9]">$1</strong>') }} />
                    </motion.li>
                  ))}
                </ul>
                <div className="p-4 bg-[#ff0844]/10 rounded-xl border border-[#ff0844]/30">
                  <p className="text-sm text-center">{contentStep2.callout}</p>
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
