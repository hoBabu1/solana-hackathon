"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Check, X } from "lucide-react";
import { QuizQuestion } from "@/types";

interface QuizComponentProps {
  questions: QuizQuestion[];
  onComplete: (passed: boolean) => void;
}

export function QuizComponent({ questions, onComplete }: QuizComponentProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);

  const question = questions[currentQuestion];
  const isCorrect = selectedAnswer === question.correctAnswer;
  const isLastQuestion = currentQuestion === questions.length - 1;
  const passThreshold = Math.ceil(questions.length * 0.7); // 70% to pass

  const handleSelectAnswer = (index: number) => {
    if (showResult) return;
    setSelectedAnswer(index);
    setShowResult(true);
    if (index === question.correctAnswer) {
      setCorrectCount((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (isLastQuestion) {
      const passed = correctCount + (isCorrect ? 1 : 0) >= passThreshold;
      onComplete(passed);
    } else {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-white/60 mb-2">
          <span>Question {currentQuestion + 1} of {questions.length}</span>
          <span>{correctCount} correct</span>
        </div>
        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-[#00fff9] to-[#b026ff]"
            initial={{ width: 0 }}
            animate={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <Card className="mb-6">
        <div className="p-6">
          <h3 className="text-xl font-bold mb-6">{question.question}</h3>

          <div className="space-y-3">
            {question.options.map((option, index) => (
              <motion.button
                key={index}
                onClick={() => handleSelectAnswer(index)}
                disabled={showResult}
                whileHover={!showResult ? { scale: 1.02 } : {}}
                whileTap={!showResult ? { scale: 0.98 } : {}}
                className={`w-full p-4 rounded-xl text-left transition-all ${
                  showResult
                    ? index === question.correctAnswer
                      ? "bg-green-500/20 border-2 border-green-500"
                      : index === selectedAnswer
                      ? "bg-red-500/20 border-2 border-red-500"
                      : "bg-white/5 border-2 border-transparent"
                    : "bg-white/5 border-2 border-transparent hover:border-[#00fff9]/50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-sm font-bold">
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span className="flex-1">{option}</span>
                  {showResult && index === question.correctAnswer && (
                    <Check className="w-5 h-5 text-green-500" />
                  )}
                  {showResult && index === selectedAnswer && index !== question.correctAnswer && (
                    <X className="w-5 h-5 text-red-500" />
                  )}
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </Card>

      {/* Result explanation */}
      <AnimatePresence>
        {showResult && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <Card className={isCorrect ? "border-green-500/30" : "border-red-500/30"}>
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  {isCorrect ? (
                    <Check className="w-5 h-5 text-green-500" />
                  ) : (
                    <X className="w-5 h-5 text-red-500" />
                  )}
                  <span className={`font-bold ${isCorrect ? "text-green-500" : "text-red-500"}`}>
                    {isCorrect ? "Correct!" : "Wrong!"}
                  </span>
                </div>
                <p className="text-sm text-white/70">{question.explanation}</p>
              </div>
            </Card>

            <div className="mt-6 flex justify-end">
              <Button onClick={handleNext}>
                {isLastQuestion ? "See Results" : "Next Question"}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
