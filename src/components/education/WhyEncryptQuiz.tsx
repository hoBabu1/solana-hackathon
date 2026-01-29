"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { encryptQuizQuestions, calculateQuizResult, QuizResult } from "@/data/encryptQuiz";
import {
  ArrowRight,
  CheckCircle2,
  XCircle,
  Shield,
  ExternalLink,
  RefreshCw,
  Lightbulb,
  AlertTriangle,
  BookOpen
} from "lucide-react";
import { cn } from "@/lib/utils";

interface WhyEncryptQuizProps {
  onComplete?: () => void;
}

export function WhyEncryptQuiz({ onComplete }: WhyEncryptQuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<boolean[]>([]);
  const [quizComplete, setQuizComplete] = useState(false);
  const [result, setResult] = useState<QuizResult | null>(null);

  const question = encryptQuizQuestions[currentQuestion];
  const isCorrect = selectedAnswer === question.correctAnswer;
  const progress = ((currentQuestion + 1) / encryptQuizQuestions.length) * 100;

  const handleSelectAnswer = (answerIndex: number) => {
    if (selectedAnswer !== null) return; // Already answered

    setSelectedAnswer(answerIndex);
    const correct = answerIndex === question.correctAnswer;

    if (correct) {
      setCorrectAnswers((prev) => prev + 1);
    }

    setAnsweredQuestions((prev) => [...prev, correct]);

    // Show explanation after a brief delay
    setTimeout(() => {
      setShowExplanation(true);
    }, 500);
  };

  const handleNext = () => {
    if (currentQuestion < encryptQuizQuestions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      // Quiz complete
      const finalResult = calculateQuizResult(correctAnswers + (isCorrect ? 0 : 0)); // Already counted
      setResult(finalResult);
      setQuizComplete(true);
      onComplete?.();
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setCorrectAnswers(0);
    setAnsweredQuestions([]);
    setQuizComplete(false);
    setResult(null);
  };

  // Result Screen
  if (quizComplete && result) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="space-y-6"
      >
        <Card className="border-[#00fff9]/30 overflow-hidden">
          <div className="p-8 text-center relative">
            {/* Background effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#b026ff]/10 to-[#00fff9]/10" />

            <div className="relative">
              {/* Result emoji */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.2 }}
                className="text-8xl mb-4"
              >
                {result.tierEmoji}
              </motion.div>

              <h2 className="text-3xl font-bold mb-2 gradient-text">{result.tierTitle}</h2>
              <p className="text-white/70 mb-6">{result.tierDescription}</p>

              {/* Score */}
              <div className="inline-block bg-white/10 rounded-xl px-6 py-4 mb-6">
                <div className="text-4xl font-bold text-[#00fff9]">
                  {result.score}/{result.total}
                </div>
                <div className="text-sm text-white/60">Correct Answers</div>
              </div>

              {/* Question summary */}
              <div className="flex justify-center gap-2 mb-8">
                {answeredQuestions.map((correct, i) => (
                  <div
                    key={i}
                    className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold",
                      correct
                        ? "bg-green-500/20 text-green-400 border border-green-500/30"
                        : "bg-red-500/20 text-red-400 border border-red-500/30"
                    )}
                  >
                    {i + 1}
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div className="space-y-3">
                <a
                  href="https://encrypt.trade"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Button size="lg" className="w-full bg-gradient-to-r from-[#b026ff] to-[#00fff9]">
                    <Shield className="w-5 h-5" />
                    Try encrypt.trade Now
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </a>

                <Button
                  variant="secondary"
                  onClick={handleRestart}
                  className="w-full"
                >
                  <RefreshCw className="w-4 h-4" />
                  Take Quiz Again
                </Button>
              </div>

              {/* Sharing prompt */}
              {result.tier === "ninja" && (
                <p className="text-xs text-white/40 mt-6">
                  Share your result: &quot;I&apos;m a Privacy Ninja! 🥷 Scored {result.score}/10 on the encrypt.trade quiz&quot;
                </p>
              )}
            </div>
          </div>
        </Card>

        {/* Key takeaways */}
        <Card>
          <div className="p-6">
            <h3 className="font-bold mb-4 flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-yellow-400" />
              Key Takeaways
            </h3>
            <ul className="space-y-2 text-sm text-white/80">
              <li className="flex items-start gap-2">
                <span className="text-[#00fff9]">→</span>
                Your wallet is a glass house - everyone can see everything
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#00fff9]">→</span>
                MEV bots profit by front-running your trades
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#00fff9]">→</span>
                eTokens wrap your tokens in privacy without losing functionality
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#00fff9]">→</span>
                encrypt.trade is compliant by design - privacy without legal risk
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#00fff9]">→</span>
                Full Jupiter liquidity means no trading quality sacrifice
              </li>
            </ul>
          </div>
        </Card>
      </motion.div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Progress bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-white/60">Question {currentQuestion + 1} of {encryptQuizQuestions.length}</span>
          <span className="text-[#00fff9]">{correctAnswers} correct</span>
        </div>
        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-[#b026ff] to-[#00fff9]"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Question Card */}
      <Card className="border-[#b026ff]/30">
        <div className="p-6">
          <div className="flex items-center gap-2 text-sm text-white/60 mb-4">
            <span className="px-2 py-1 bg-[#b026ff]/20 rounded text-[#b026ff]">
              Q{currentQuestion + 1}
            </span>
            <span>Privacy Concept</span>
          </div>

          <h2 className="text-xl font-bold mb-6">{question.question}</h2>

          {/* Options */}
          <div className="space-y-3">
            {question.options.map((option, index) => {
              const isSelected = selectedAnswer === index;
              const isCorrectAnswer = index === question.correctAnswer;
              const showResult = selectedAnswer !== null;

              return (
                <motion.button
                  key={index}
                  onClick={() => handleSelectAnswer(index)}
                  disabled={selectedAnswer !== null}
                  whileHover={selectedAnswer === null ? { scale: 1.01 } : {}}
                  whileTap={selectedAnswer === null ? { scale: 0.99 } : {}}
                  className={cn(
                    "w-full p-4 rounded-xl text-left transition-all border-2",
                    selectedAnswer === null && "border-white/20 hover:border-white/40 bg-white/5 cursor-pointer",
                    showResult && isCorrectAnswer && "border-green-500 bg-green-500/10",
                    showResult && isSelected && !isCorrectAnswer && "border-red-500 bg-red-500/10",
                    showResult && !isSelected && !isCorrectAnswer && "border-white/10 opacity-50"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm",
                        selectedAnswer === null && "bg-white/10",
                        showResult && isCorrectAnswer && "bg-green-500 text-white",
                        showResult && isSelected && !isCorrectAnswer && "bg-red-500 text-white",
                        showResult && !isSelected && !isCorrectAnswer && "bg-white/5"
                      )}
                    >
                      {showResult && isCorrectAnswer ? (
                        <CheckCircle2 className="w-5 h-5" />
                      ) : showResult && isSelected && !isCorrectAnswer ? (
                        <XCircle className="w-5 h-5" />
                      ) : (
                        String.fromCharCode(65 + index)
                      )}
                    </div>
                    <span className={cn(
                      showResult && isCorrectAnswer && "text-green-400",
                      showResult && isSelected && !isCorrectAnswer && "text-red-400"
                    )}>
                      {option}
                    </span>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>
      </Card>

      {/* Explanation */}
      <AnimatePresence>
        {showExplanation && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-4"
          >
            {/* Result banner */}
            <div
              className={cn(
                "p-4 rounded-xl flex items-center gap-3",
                isCorrect ? "bg-green-500/20 border border-green-500/30" : "bg-red-500/20 border border-red-500/30"
              )}
            >
              {isCorrect ? (
                <>
                  <CheckCircle2 className="w-6 h-6 text-green-400 flex-shrink-0" />
                  <div>
                    <p className="font-bold text-green-400">Correct! 🎉</p>
                    <p className="text-sm text-white/70">You understand this concept well.</p>
                  </div>
                </>
              ) : (
                <>
                  <XCircle className="w-6 h-6 text-red-400 flex-shrink-0" />
                  <div>
                    <p className="font-bold text-red-400">Not quite!</p>
                    <p className="text-sm text-white/70">But now you&apos;ll know for next time.</p>
                  </div>
                </>
              )}
            </div>

            {/* Explanation card */}
            <Card className="border-[#00fff9]/20">
              <div className="p-6 space-y-4">
                {/* In Plain English */}
                <div>
                  <div className="flex items-center gap-2 text-sm font-semibold text-[#00fff9] mb-2">
                    <Lightbulb className="w-4 h-4" />
                    In Plain English
                  </div>
                  <p className="text-white/80">{question.explanation.inPlainEnglish}</p>
                </div>

                {/* Why It Matters */}
                <div>
                  <div className="flex items-center gap-2 text-sm font-semibold text-yellow-400 mb-2">
                    <AlertTriangle className="w-4 h-4" />
                    Why This Matters
                  </div>
                  <p className="text-white/80">{question.explanation.whyItMatters}</p>
                </div>

                {/* The Jargon */}
                <div className="bg-white/5 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-sm font-semibold text-[#b026ff] mb-2">
                    <BookOpen className="w-4 h-4" />
                    The Jargon: {question.explanation.theJargon.term}
                  </div>
                  <p className="text-white/70 text-sm">{question.explanation.theJargon.definition}</p>
                </div>
              </div>
            </Card>

            {/* Next button */}
            <Button
              onClick={handleNext}
              size="lg"
              className="w-full bg-gradient-to-r from-[#b026ff] to-[#00fff9]"
            >
              {currentQuestion < encryptQuizQuestions.length - 1 ? (
                <>
                  Next Question <ArrowRight className="w-4 h-4" />
                </>
              ) : (
                <>
                  See Results <ArrowRight className="w-4 h-4" />
                </>
              )}
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
