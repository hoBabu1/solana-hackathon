"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { QuizComponent } from "../QuizComponent";
import { ModeToggle } from "../ModeToggle";
import { LessonContent } from "../LessonContent";
import { lessons, quizzes } from "@/data/lessons";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface LevelProps {
  onComplete: () => void;
  onBack: () => void;
}

export function Level1({ onComplete, onBack }: LevelProps) {
  const [step, setStep] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [mode, setMode] = useState<"eli5" | "tech">("eli5");

  const lesson = lessons[0];
  const quizQuestions = quizzes[1];
  const totalSteps = 3;

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
        <h2 className="text-2xl font-bold mb-6 text-center">Quiz: {lesson.title}</h2>
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
        <h1 className="text-3xl font-bold mb-2">Lesson 1: {lesson.title}</h1>
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
              Take Quiz <ArrowRight className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
