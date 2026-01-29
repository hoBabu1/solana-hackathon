"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { Lesson } from "@/data/lessons";
import { Lightbulb, Zap, BookOpen, AlertTriangle } from "lucide-react";

interface LessonContentProps {
  lesson: Lesson;
  mode: "eli5" | "tech";
  step: number;
}

export function LessonContent({ lesson, mode, step }: LessonContentProps) {
  const content = mode === "eli5" ? lesson.content.eli5 : lesson.content.tech;

  // Step 0: Comic-style panels (intro)
  if (step === 0 && lesson.panels) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <Card>
          <div className="p-6">
            <h3 className="text-xl font-bold mb-6 text-center">The Reality Check</h3>
            <div className="space-y-4">
              {lesson.panels.map((panel, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.3 }}
                  className={`flex items-start gap-3 ${i % 2 === 0 ? "" : "flex-row-reverse text-right"}`}
                >
                  <span className="text-4xl flex-shrink-0">{panel.emoji}</span>
                  <div className={`flex-1 p-4 glass-card ${i % 2 === 0 ? "bg-white/5" : "bg-[#00fff9]/5"}`}>
                    <p className="text-xs text-white/40 mb-1">{panel.character}</p>
                    <p className="text-sm sm:text-base">{panel.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Meme callout */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="mt-6 p-4 bg-[#b026ff]/10 rounded-xl border border-[#b026ff]/30"
            >
              <p className="text-center text-sm">💀 {lesson.meme}</p>
            </motion.div>
          </div>
        </Card>
      </motion.div>
    );
  }

  // Step 1: Main content (different for ELI5 vs Tech)
  if (step === 1) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <Card>
          <div className="p-6">
            <div className="flex items-center gap-2 mb-4">
              {mode === "eli5" ? (
                <Lightbulb className="w-5 h-5 text-[#b026ff]" />
              ) : (
                <Zap className="w-5 h-5 text-[#00fff9]" />
              )}
              <h3 className="text-xl font-bold">
                {mode === "eli5" ? "Simple Explanation" : "Technical Deep Dive"}
              </h3>
            </div>

            {/* Intro */}
            <p className="text-white/80 mb-6 leading-relaxed">{content.intro}</p>

            {/* Analogy (ELI5 only) */}
            {mode === "eli5" && lesson.content.eli5.analogy && (
              <div className="mb-6 p-4 bg-[#00fff9]/10 rounded-xl border border-[#00fff9]/30">
                <p className="text-sm">
                  <span className="font-bold text-[#00fff9]">💡 Think of it like:</span>{" "}
                  {lesson.content.eli5.analogy}
                </p>
              </div>
            )}

            {/* Key Points */}
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-white/60 mb-3 flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                Key Points
              </h4>
              <ul className="space-y-3">
                {content.keyPoints.map((point, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <span className="text-[#00fff9] mt-1">→</span>
                    <span className="text-white/80">{point}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Flirty line */}
            <div className="p-3 bg-gradient-to-r from-[#b026ff]/20 to-[#00fff9]/20 rounded-lg text-center">
              <p className="text-sm italic">{lesson.flirtyLine}</p>
            </div>
          </div>
        </Card>
      </motion.div>
    );
  }

  // Step 2: Details/Examples
  if (step === 2) {
    const details = mode === "eli5" ? lesson.content.eli5.examples : lesson.content.tech.technicalDetails;

    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <Card>
          <div className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="w-5 h-5 text-[#ff6b00]" />
              <h3 className="text-xl font-bold">
                {mode === "eli5" ? "Real World Examples" : "Technical Details"}
              </h3>
            </div>

            <ul className="space-y-4">
              {details?.map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.15 }}
                  className="flex items-start gap-3 p-3 bg-white/5 rounded-lg"
                >
                  <span className="text-[#ff6b00] font-bold">{i + 1}.</span>
                  <span className="text-white/80">{item}</span>
                </motion.li>
              ))}
            </ul>

            {/* Resources (Tech mode only) */}
            {mode === "tech" && lesson.content.tech.resources && (
              <div className="mt-6 p-4 bg-white/5 rounded-xl">
                <h4 className="text-sm font-semibold text-white/60 mb-2">📚 Resources</h4>
                <ul className="space-y-1">
                  {lesson.content.tech.resources.map((resource, i) => (
                    <li key={i} className="text-sm text-[#00fff9]">• {resource}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Meme reminder */}
            <div className="mt-6 p-4 bg-[#b026ff]/10 rounded-xl border border-[#b026ff]/30 text-center">
              <p className="text-sm">🎭 Remember: {lesson.meme}</p>
            </div>
          </div>
        </Card>
      </motion.div>
    );
  }

  return null;
}
