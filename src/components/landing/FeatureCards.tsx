"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/Card";
import { Search, GraduationCap, Trophy, Shield } from "lucide-react";

const features = [
  {
    icon: Search,
    title: "Scan Tool",
    description: "See your surveillance score and find out exactly what's exposed",
    href: "/scan",
    color: "#00fff9",
    emoji: "🔍",
  },
  {
    icon: GraduationCap,
    title: "Learn",
    description: "Privacy education through memes, quizzes, and dark humor",
    href: "/learn",
    color: "#b026ff",
    emoji: "🎓",
  },
  {
    icon: Trophy,
    title: "Leaderboard",
    description: "See who's the most exposed (don't be on this list)",
    href: "/leaderboard",
    color: "#ff6b00",
    emoji: "🏆",
  },
  {
    icon: Shield,
    title: "Protect",
    description: "Learn how to actually protect your on-chain privacy",
    href: "/learn#level-4",
    color: "#00ff9f",
    emoji: "🛡️",
  },
];

export function FeatureCards() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl font-bold text-center mb-12"
        >
          What Can You Do Here?
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={feature.href}>
                <Card hover className="h-full group">
                  <CardContent>
                    <div
                      className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-all group-hover:scale-110"
                      style={{ backgroundColor: `${feature.color}20` }}
                    >
                      <span className="text-3xl">{feature.emoji}</span>
                    </div>
                    <h3 className="text-xl font-bold mb-2 group-hover:text-[#00fff9] transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-white/60 text-sm">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
