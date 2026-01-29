"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import {
  Shield,
  Lock,
  Unlock,
  ArrowRight,
  ArrowDown,
  Eye,
  EyeOff,
  Repeat,
  CheckCircle2,
  Sparkles,
  ExternalLink,
  RotateCcw,
} from "lucide-react";
import { cn } from "@/lib/utils";

type Step = "start" | "wrap" | "trade" | "unwrap" | "complete";

interface TokenState {
  amount: number;
  symbol: string;
  isPrivate: boolean;
}

export function PrivacySimulator() {
  const [currentStep, setCurrentStep] = useState<Step>("start");
  const [solToken, setSolToken] = useState<TokenState>({ amount: 10, symbol: "SOL", isPrivate: false });
  const [esolToken, setEsolToken] = useState<TokenState>({ amount: 0, symbol: "eSOL", isPrivate: true });
  const [bonkToken, setBonkToken] = useState<TokenState>({ amount: 0, symbol: "BONK", isPrivate: false });
  const [ebonkToken, setEbonkToken] = useState<TokenState>({ amount: 0, symbol: "eBONK", isPrivate: true });

  const steps = [
    {
      id: "start",
      title: "Your Public Wallet",
      description: "You have 10 SOL. Everyone can see this balance.",
      action: "Wrap SOL",
    },
    {
      id: "wrap",
      title: "Wrap Your Tokens",
      description: "Convert SOL to eSOL (encrypted SOL). Your balance is now hidden.",
      action: "Make a Trade",
    },
    {
      id: "trade",
      title: "Trade Privately",
      description: "Swap eSOL for eBONK. No one can see this trade happening.",
      action: "Unwrap Tokens",
    },
    {
      id: "unwrap",
      title: "Unwrap When Ready",
      description: "Convert eBONK back to regular BONK when you want to use it.",
      action: "Complete",
    },
    {
      id: "complete",
      title: "Privacy Achieved!",
      description: "You traded SOL → BONK without anyone knowing the details.",
      action: "Try Again",
    },
  ];

  const currentStepData = steps.find((s) => s.id === currentStep) || steps[0];
  const stepIndex = steps.findIndex((s) => s.id === currentStep);

  const handleNextStep = () => {
    switch (currentStep) {
      case "start":
        // Wrap SOL
        setSolToken({ ...solToken, amount: 0 });
        setEsolToken({ ...esolToken, amount: 10 });
        setCurrentStep("wrap");
        break;
      case "wrap":
        // Trade eSOL for eBONK
        setEsolToken({ ...esolToken, amount: 0 });
        setEbonkToken({ ...ebonkToken, amount: 1000000 });
        setCurrentStep("trade");
        break;
      case "trade":
        // Unwrap eBONK
        setEbonkToken({ ...ebonkToken, amount: 0 });
        setBonkToken({ ...bonkToken, amount: 1000000 });
        setCurrentStep("unwrap");
        break;
      case "unwrap":
        setCurrentStep("complete");
        break;
      case "complete":
        // Reset
        setSolToken({ amount: 10, symbol: "SOL", isPrivate: false });
        setEsolToken({ amount: 0, symbol: "eSOL", isPrivate: true });
        setBonkToken({ amount: 0, symbol: "BONK", isPrivate: false });
        setEbonkToken({ amount: 0, symbol: "eBONK", isPrivate: true });
        setCurrentStep("start");
        break;
    }
  };

  const TokenBox = ({ token, label }: { token: TokenState; label?: string }) => (
    <motion.div
      layout
      className={cn(
        "p-4 rounded-xl border-2 transition-all",
        token.isPrivate
          ? "bg-[#00fff9]/10 border-[#00fff9]/50"
          : "bg-white/5 border-white/20",
        token.amount === 0 && "opacity-30"
      )}
    >
      <div className="flex items-center gap-2 mb-2">
        {token.isPrivate ? (
          <Lock className="w-4 h-4 text-[#00fff9]" />
        ) : (
          <Unlock className="w-4 h-4 text-white/50" />
        )}
        <span className="text-xs text-white/60">{label || (token.isPrivate ? "Private" : "Public")}</span>
      </div>
      <div className="flex items-baseline gap-2">
        <span className="text-2xl font-bold">
          {token.amount > 1000 ? `${(token.amount / 1000000).toFixed(1)}M` : token.amount}
        </span>
        <span className={cn(
          "text-sm font-semibold",
          token.isPrivate ? "text-[#00fff9]" : "text-white/70"
        )}>
          {token.symbol}
        </span>
      </div>
      {token.isPrivate && token.amount > 0 && (
        <div className="mt-2 flex items-center gap-1 text-xs text-[#00fff9]">
          <EyeOff className="w-3 h-3" />
          <span>Balance hidden</span>
        </div>
      )}
      {!token.isPrivate && token.amount > 0 && (
        <div className="mt-2 flex items-center gap-1 text-xs text-white/40">
          <Eye className="w-3 h-3" />
          <span>Visible to all</span>
        </div>
      )}
    </motion.div>
  );

  return (
    <Card className="border-[#b026ff]/30 overflow-hidden">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center gap-2 mb-6">
          <Sparkles className="w-5 h-5 text-[#00fff9]" />
          <h3 className="font-bold">Interactive Privacy Flow</h3>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-between mb-6">
          {steps.slice(0, 4).map((step, i) => (
            <div key={step.id} className="flex items-center">
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors",
                  stepIndex > i
                    ? "bg-[#00fff9] text-black"
                    : stepIndex === i
                    ? "bg-[#b026ff] text-white"
                    : "bg-white/10 text-white/40"
                )}
              >
                {stepIndex > i ? <CheckCircle2 className="w-4 h-4" /> : i + 1}
              </div>
              {i < 3 && (
                <div
                  className={cn(
                    "w-8 sm:w-12 h-0.5 mx-1",
                    stepIndex > i ? "bg-[#00fff9]" : "bg-white/10"
                  )}
                />
              )}
            </div>
          ))}
        </div>

        {/* Step Info */}
        <div className="text-center mb-6">
          <h4 className="text-xl font-bold mb-2">{currentStepData.title}</h4>
          <p className="text-white/60 text-sm">{currentStepData.description}</p>
        </div>

        {/* Wallet Visualization */}
        <div className="bg-black/30 rounded-xl p-4 mb-6">
          <p className="text-xs text-white/40 mb-3 text-center">Your Wallet</p>

          <div className="grid grid-cols-2 gap-3">
            <TokenBox token={solToken} label="Regular SOL" />
            <TokenBox token={esolToken} label="Encrypted SOL" />
            <TokenBox token={bonkToken} label="Regular BONK" />
            <TokenBox token={ebonkToken} label="Encrypted BONK" />
          </div>

          {/* Transaction Flow Indicator */}
          <AnimatePresence>
            {currentStep !== "start" && currentStep !== "complete" && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="mt-4 p-3 bg-[#b026ff]/20 rounded-lg border border-[#b026ff]/30"
              >
                <div className="flex items-center justify-center gap-2 text-sm">
                  {currentStep === "wrap" && (
                    <>
                      <span className="text-white/60">SOL</span>
                      <ArrowRight className="w-4 h-4 text-[#00fff9]" />
                      <span className="text-[#00fff9] font-bold">eSOL</span>
                      <span className="text-xs text-white/40 ml-2">(Wrapping...)</span>
                    </>
                  )}
                  {currentStep === "trade" && (
                    <>
                      <span className="text-[#00fff9]">eSOL</span>
                      <Repeat className="w-4 h-4 text-[#b026ff]" />
                      <span className="text-[#00fff9] font-bold">eBONK</span>
                      <span className="text-xs text-white/40 ml-2">(Private swap...)</span>
                    </>
                  )}
                  {currentStep === "unwrap" && (
                    <>
                      <span className="text-[#00fff9]">eBONK</span>
                      <ArrowRight className="w-4 h-4 text-[#00fff9]" />
                      <span className="text-white/60 font-bold">BONK</span>
                      <span className="text-xs text-white/40 ml-2">(Unwrapping...)</span>
                    </>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Completion Message */}
          {currentStep === "complete" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-4 p-4 bg-gradient-to-r from-[#00fff9]/20 to-[#b026ff]/20 rounded-lg border border-[#00fff9]/30 text-center"
            >
              <CheckCircle2 className="w-8 h-8 text-[#00fff9] mx-auto mb-2" />
              <p className="font-bold text-[#00fff9]">Trade Complete!</p>
              <p className="text-xs text-white/60 mt-1">
                You turned 10 SOL into 1M BONK without anyone seeing the trade details.
              </p>
            </motion.div>
          )}
        </div>

        {/* Action Button */}
        <div className="flex gap-3">
          <Button
            onClick={handleNextStep}
            className="flex-1 bg-gradient-to-r from-[#b026ff] to-[#00fff9]"
          >
            {currentStep === "complete" ? (
              <>
                <RotateCcw className="w-4 h-4" />
                {currentStepData.action}
              </>
            ) : (
              <>
                {currentStepData.action}
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </Button>
        </div>

        {/* CTA */}
        <div className="mt-4 text-center">
          <a
            href="https://encrypt.trade"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs text-[#00fff9] hover:underline"
          >
            Try this for real on encrypt.trade <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </Card>
  );
}
