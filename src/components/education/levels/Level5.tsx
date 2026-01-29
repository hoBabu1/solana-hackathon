"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { QuizComponent } from "../QuizComponent";
import { ModeToggle } from "../ModeToggle";
import { LessonContent } from "../LessonContent";
import { lessons, quizzes } from "@/data/lessons";
import { ArrowLeft, ArrowRight, Award, Shield, ExternalLink } from "lucide-react";

interface LevelProps {
  onComplete: () => void;
  onBack: () => void;
}

export function Level5({ onComplete, onBack }: LevelProps) {
  const [step, setStep] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false);
  const [mode, setMode] = useState<"eli5" | "tech">("eli5");

  const lesson = lessons[4];
  const quizQuestions = quizzes[5];
  const totalSteps = 3;

  const handleQuizComplete = (passed: boolean) => {
    if (passed) {
      setShowQuiz(false);
      setShowCertificate(true);
    } else {
      setShowQuiz(false);
      setStep(0);
    }
  };

  if (showCertificate) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
        <Card className="border-[#00fff9]/30">
          <div className="p-8 text-center">
            <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#00fff9] to-[#b026ff] flex items-center justify-center animate-pulse-glow">
              <span className="text-6xl">🔐</span>
            </div>

            <h3 className="text-3xl font-bold mb-2 gradient-text">Privacy Master Certified!</h3>
            <p className="text-white/60 mb-6">You now know more about crypto privacy than 99% of users.</p>

            <div className="max-w-md mx-auto mb-8 p-4 bg-white/5 rounded-xl">
              <p className="text-sm text-white/80 mb-4">You&apos;ve learned:</p>
              <div className="grid grid-cols-2 gap-2 text-left text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-[#00fff9]">✓</span> Why privacy matters
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#00fff9]">✓</span> How eTokens work
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#00fff9]">✓</span> Private trading
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#00fff9]">✓</span> Avoiding mistakes
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#00fff9]">✓</span> Compliance + Privacy
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Button onClick={onComplete} size="lg" className="w-full bg-gradient-to-r from-[#b026ff] to-[#00fff9]">
                <Award className="w-5 h-5" />
                Claim Your Certificate
              </Button>

              <a
                href="https://encrypt.trade"
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <Button variant="secondary" className="w-full">
                  <Shield className="w-5 h-5" />
                  Try encrypt.trade Now
                  <ExternalLink className="w-4 h-4" />
                </Button>
              </a>
            </div>

            <p className="text-xs text-white/40 mt-6">
              Share your achievement: &quot;I just became a Crypto Privacy Master! 🔐&quot;
            </p>
          </div>
        </Card>
      </motion.div>
    );
  }

  if (showQuiz) {
    return (
      <div>
        <button onClick={() => setShowQuiz(false)} className="mb-6 text-white/60 hover:text-white flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Back to lesson
        </button>
        <h2 className="text-2xl font-bold mb-6 text-center">Final Quiz: {lesson.title}</h2>
        <QuizComponent questions={quizQuestions} onComplete={handleQuizComplete} />
      </div>
    );
  }

  return (
    <div>
      <button onClick={onBack} className="mb-6 text-white/60 hover:text-white flex items-center gap-2">
        <ArrowLeft className="w-4 h-4" /> Back to levels
      </button>

      {/* Header */}
      <div className="text-center mb-6">
        <span className="text-6xl mb-4 block">{lesson.emoji}</span>
        <h1 className="text-3xl font-bold mb-2">Lesson 5: {lesson.title}</h1>
        <p className="text-white/60 mb-4">{lesson.subtitle}</p>

        {/* Mode Toggle */}
        <ModeToggle mode={mode} onModeChange={setMode} />
      </div>

      {/* Content */}
      <div className="space-y-6">
        <LessonContent lesson={lesson} mode={mode} step={step} />

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
            {Array.from({ length: totalSteps }).map((_, i) => (
              <motion.div
                key={i}
                className={`w-2 h-2 rounded-full transition-colors ${
                  step === i ? "bg-[#00fff9]" : "bg-white/20"
                }`}
                whileHover={{ scale: 1.2 }}
                onClick={() => setStep(i)}
                style={{ cursor: "pointer" }}
              />
            ))}
          </div>

          {step < totalSteps - 1 ? (
            <Button onClick={() => setStep((s) => s + 1)}>
              Next <ArrowRight className="w-4 h-4" />
            </Button>
          ) : (
            <Button onClick={() => setShowQuiz(true)} className="bg-gradient-to-r from-[#b026ff] to-[#00fff9]">
              Final Quiz <ArrowRight className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
