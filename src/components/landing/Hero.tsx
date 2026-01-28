"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Eye, BookOpen } from "lucide-react";

export function Hero() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 pt-20 pb-10 cyber-grid">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-4xl"
      >
        {/* Animated eye icon */}
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="inline-block mb-6"
        >
          <Eye className="w-20 h-20 text-[#00fff9] mx-auto animate-pulse-glow rounded-full p-2" />
        </motion.div>

        {/* Main headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-6">
          <span className="text-white">Your Wallet Is </span>
          <span className="gradient-text text-glow-cyan">Being Watched</span>
        </h1>

        {/* Subtext */}
        <p className="text-lg sm:text-xl text-white/60 mb-8 max-w-2xl mx-auto">
          Find out how exposed you really are on Solana.
          <span className="block text-[#ff0844] mt-2">(spoiler: very)</span>
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/scan">
            <Button size="lg" className="w-full sm:w-auto">
              <Eye className="w-5 h-5" />
              Scan My Wallet
            </Button>
          </Link>
          <Link href="/learn">
            <Button variant="secondary" size="lg" className="w-full sm:w-auto">
              <BookOpen className="w-5 h-5" />
              Learn WTF Is Going On
            </Button>
          </Link>
        </div>

        {/* Warning badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-8 inline-flex items-center gap-2 px-4 py-2 glass-card text-sm text-white/60"
        >
          <span className="w-2 h-2 bg-[#00ff9f] rounded-full animate-pulse" />
          Privacy-first: You can only scan your own connected wallet
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2"
        >
          <div className="w-1 h-2 bg-[#00fff9] rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
