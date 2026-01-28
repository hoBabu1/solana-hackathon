"use client";

import { useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { motion } from "framer-motion";
import { ScanResults } from "@/components/scanner/ScanResults";
import { analyzeWallet } from "@/lib/scanner";
import { WalletAnalysis } from "@/types";
import { getRandomLoadingMessage } from "@/lib/utils";
import { useProgress } from "@/hooks/useProgress";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { WalletButton } from "@/components/wallet/WalletButton";
import { Eye, Search, Wallet, ArrowRight } from "lucide-react";

export default function ScanPage() {
  const { publicKey, connected } = useWallet();
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");
  const [analysis, setAnalysis] = useState<WalletAnalysis | null>(null);
  const [manualAddress, setManualAddress] = useState("");
  const [error, setError] = useState("");
  const { recordScan, unlockAchievement } = useProgress();

  const isValidSolanaAddress = (address: string): boolean => {
    // Basic Solana address validation (32-44 chars, base58)
    const base58Regex = /^[1-9A-HJ-NP-Za-km-z]{32,44}$/;
    return base58Regex.test(address);
  };

  const handleScan = async (address: string) => {
    if (!address) {
      setError("Please enter a wallet address");
      return;
    }

    if (!isValidSolanaAddress(address)) {
      setError("Invalid Solana wallet address");
      return;
    }

    setError("");
    setIsLoading(true);
    setLoadingMessage(getRandomLoadingMessage());

    const interval = setInterval(() => {
      setLoadingMessage(getRandomLoadingMessage());
    }, 2000);

    try {
      const result = await analyzeWallet(address);
      setAnalysis(result);
      recordScan(address);

      if (result.surveillanceScore >= 90) {
        unlockAchievement("high_exposure");
      }
    } catch (err) {
      console.error("Scan failed:", err);
      setError("Failed to analyze wallet. Please try again.");
    } finally {
      clearInterval(interval);
      setIsLoading(false);
    }
  };

  const handleShare = () => {
    if (!analysis) return;

    const text = `This wallet is ${analysis.surveillanceScore}% exposed on WalletSpy.lol 💀\n\nFind out how exposed YOUR wallet is:`;
    const url = "https://walletspy.lol";

    if (navigator.share) {
      navigator.share({ title: "WalletSpy Score", text, url });
    } else {
      window.open(
        `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
        "_blank"
      );
    }

    unlockAchievement("shared_results");
  };

  if (analysis) {
    return (
      <div className="min-h-screen cyber-grid py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <button
              onClick={() => {
                setAnalysis(null);
                setManualAddress("");
              }}
              className="mb-6 text-white/60 hover:text-[#00fff9] transition-colors text-sm flex items-center gap-2"
            >
              ← Scan another wallet
            </button>
            <ScanResults analysis={analysis} onShare={handleShare} />
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen cyber-grid py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[#00fff9]/10 flex items-center justify-center animate-pulse-glow">
            <Eye className="w-10 h-10 text-[#00fff9]" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">
            Wallet Scanner
          </h1>
          <p className="text-white/60">
            Enter any Solana wallet address to see its exposure level
          </p>
        </motion.div>

        {/* Manual Address Input */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="mb-6">
            <div className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Search className="w-5 h-5 text-[#00fff9]" />
                <h3 className="font-semibold">Enter Wallet Address</h3>
              </div>

              <div className="space-y-4">
                <Input
                  placeholder="Enter Solana wallet address (e.g., 7xKX...m9Qz)"
                  value={manualAddress}
                  onChange={(e) => {
                    setManualAddress(e.target.value);
                    setError("");
                  }}
                  error={error}
                  className="font-mono text-sm"
                />

                <Button
                  onClick={() => handleScan(manualAddress)}
                  isLoading={isLoading}
                  className="w-full"
                  size="lg"
                >
                  {isLoading ? loadingMessage : (
                    <>
                      <Eye className="w-5 h-5" />
                      Analyze Exposure
                    </>
                  )}
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Divider */}
        <div className="flex items-center gap-4 my-6">
          <div className="flex-1 h-px bg-white/10" />
          <span className="text-white/40 text-sm">or</span>
          <div className="flex-1 h-px bg-white/10" />
        </div>

        {/* Connected Wallet Option */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="border-[#b026ff]/30">
            <div className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Wallet className="w-5 h-5 text-[#b026ff]" />
                <h3 className="font-semibold">Use Connected Wallet</h3>
              </div>

              {!connected ? (
                <div className="text-center">
                  <p className="text-sm text-white/60 mb-4">
                    Connect your wallet to quickly scan your own address
                  </p>
                  <WalletButton className="!bg-gradient-to-r !from-[#b026ff] !to-[#00fff9] !text-black !font-bold !rounded-xl" />
                </div>
              ) : (
                <div>
                  <p className="text-sm text-white/60 mb-2">Connected wallet:</p>
                  <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg mb-4">
                    <div className="w-10 h-10 rounded-full bg-[#00ff9f]/20 flex items-center justify-center">
                      <span className="text-lg">✓</span>
                    </div>
                    <code className="text-sm text-white/70 flex-1 truncate">
                      {publicKey?.toBase58()}
                    </code>
                  </div>
                  <Button
                    onClick={() => handleScan(publicKey?.toBase58() || "")}
                    isLoading={isLoading}
                    variant="secondary"
                    className="w-full"
                  >
                    {isLoading ? loadingMessage : (
                      <>
                        Scan My Wallet
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </Button>
                </div>
              )}
            </div>
          </Card>
        </motion.div>

        {/* Example wallets */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-8 text-center"
        >
          <p className="text-sm text-white/40 mb-3">Try a famous wallet:</p>
          <div className="flex flex-wrap justify-center gap-2">
            {[
              { name: "Toly", address: "toly.sol" },
              { name: "Example", address: "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU" },
            ].map((example) => (
              <button
                key={example.name}
                onClick={() => setManualAddress(example.address)}
                className="px-3 py-1.5 text-xs bg-white/5 hover:bg-white/10 rounded-full transition-colors"
              >
                {example.name}
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
