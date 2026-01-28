"use client";

import { motion } from "framer-motion";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletButton } from "@/components/wallet/WalletButton";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Shield, AlertTriangle, Eye } from "lucide-react";

interface WalletPromptProps {
  onScan: () => void;
  isLoading: boolean;
  loadingMessage: string;
}

export function WalletPrompt({ onScan, isLoading, loadingMessage }: WalletPromptProps) {
  const { connected, publicKey } = useWallet();

  return (
    <div className="max-w-lg mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[#00fff9]/10 flex items-center justify-center">
          <Eye className="w-10 h-10 text-[#00fff9]" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold mb-4">
          Scan Your Wallet
        </h1>
        <p className="text-white/60">
          Connect your wallet to see your surveillance score and find out exactly how exposed you are.
        </p>
      </motion.div>

      <Card className="mb-6">
        <div className="p-6">
          {!connected ? (
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#b026ff]/10 flex items-center justify-center">
                <Shield className="w-8 h-8 text-[#b026ff]" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Privacy First</h3>
              <p className="text-sm text-white/60 mb-6">
                You can only scan your own connected wallet. We never store your data.
              </p>
              <WalletButton className="!bg-gradient-to-r !from-[#00fff9] !to-[#b026ff] !text-black !font-bold !rounded-xl !mx-auto" />
            </div>
          ) : (
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#00ff9f]/10 flex items-center justify-center">
                <span className="text-3xl">✓</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Wallet Connected</h3>
              <p className="text-sm text-white/40 mb-4 font-mono">
                {publicKey?.toBase58().slice(0, 8)}...{publicKey?.toBase58().slice(-8)}
              </p>
              <Button
                onClick={onScan}
                isLoading={isLoading}
                className="w-full"
                size="lg"
              >
                {isLoading ? loadingMessage : "Analyze My Exposure"}
              </Button>
            </div>
          )}
        </div>
      </Card>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="flex items-start gap-3 p-4 glass-card border-yellow-500/30"
      >
        <AlertTriangle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
        <div className="text-sm text-white/70">
          <p className="font-semibold text-yellow-500 mb-1">What we analyze:</p>
          <ul className="space-y-1 text-white/60">
            <li>• Transaction history and patterns</li>
            <li>• Token holdings and values</li>
            <li>• Connected wallet clusters</li>
            <li>• Privacy-compromising behaviors</li>
          </ul>
        </div>
      </motion.div>
    </div>
  );
}
