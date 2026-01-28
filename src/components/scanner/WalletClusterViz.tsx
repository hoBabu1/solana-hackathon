"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Link2, AlertTriangle, Eye } from "lucide-react";
import { shortenAddress } from "@/lib/utils";

interface WalletClusterVizProps {
  mainAddress: string;
  connectedWallets: string[];
  topInteractedAddresses: { address: string; count: number; label?: string }[];
  cexNames: string[];
}

export function WalletClusterViz({
  mainAddress,
  connectedWallets,
  topInteractedAddresses,
  cexNames,
}: WalletClusterVizProps) {
  const displayedWallets = connectedWallets.slice(0, 8);
  const remainingCount = connectedWallets.length - displayedWallets.length;

  // Calculate angles for circular layout
  const getPosition = (index: number, total: number) => {
    const angle = (index / total) * 2 * Math.PI - Math.PI / 2;
    const radius = 120;
    return {
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius,
    };
  };

  return (
    <Card className="border-[#b026ff]/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Link2 className="w-5 h-5 text-[#b026ff]" />
          Wallet Cluster Map
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Explanation */}
        <div className="mb-6 p-3 bg-[#ff0844]/10 border border-[#ff0844]/30 rounded-lg">
          <div className="flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-[#ff0844] mt-0.5 flex-shrink-0" />
            <p className="text-sm text-white/80">
              <strong>Wallet Clustering:</strong> Analytics companies link wallets that transact together.
              Every connection below can be used to identify you across multiple wallets.
            </p>
          </div>
        </div>

        {/* Visual Cluster */}
        <div className="relative h-[320px] flex items-center justify-center mb-6">
          {/* Connection lines */}
          <svg className="absolute inset-0 w-full h-full" style={{ overflow: "visible" }}>
            <defs>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#b026ff" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#00fff9" stopOpacity="0.3" />
              </linearGradient>
            </defs>
            {displayedWallets.map((_, i) => {
              const pos = getPosition(i, displayedWallets.length);
              return (
                <motion.line
                  key={i}
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  x1="50%"
                  y1="50%"
                  x2={`calc(50% + ${pos.x}px)`}
                  y2={`calc(50% + ${pos.y}px)`}
                  stroke="url(#lineGradient)"
                  strokeWidth="2"
                  strokeDasharray="4 2"
                />
              );
            })}
          </svg>

          {/* Center node (main wallet) */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute z-10 w-24 h-24 rounded-full bg-gradient-to-br from-[#b026ff] to-[#ff0844] flex flex-col items-center justify-center shadow-lg shadow-[#b026ff]/30"
          >
            <Eye className="w-6 h-6 text-white mb-1" />
            <span className="text-xs font-bold text-white">YOU</span>
            <span className="text-[10px] text-white/70">{shortenAddress(mainAddress, 3)}</span>
          </motion.div>

          {/* Connected wallet nodes */}
          {displayedWallets.map((wallet, i) => {
            const pos = getPosition(i, displayedWallets.length);
            const interaction = topInteractedAddresses.find(a => a.address === wallet);
            const isCex = cexNames.some(cex => interaction?.label?.includes(cex));

            return (
              <motion.div
                key={i}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className={`absolute w-16 h-16 rounded-full flex flex-col items-center justify-center ${
                  isCex
                    ? "bg-gradient-to-br from-[#ff0844] to-orange-500"
                    : "bg-gradient-to-br from-[#00fff9]/20 to-[#b026ff]/20 border border-[#00fff9]/40"
                }`}
                style={{
                  left: `calc(50% + ${pos.x}px - 32px)`,
                  top: `calc(50% + ${pos.y}px - 32px)`,
                }}
              >
                <span className="text-[10px] font-mono text-white/90">
                  {shortenAddress(wallet, 2)}
                </span>
                {interaction?.count && (
                  <span className="text-[9px] text-white/60">
                    {interaction.count} txns
                  </span>
                )}
                {interaction?.label && (
                  <span className={`text-[8px] ${isCex ? "text-white" : "text-[#00fff9]"}`}>
                    {interaction.label}
                  </span>
                )}
              </motion.div>
            );
          })}

          {/* Remaining count indicator */}
          {remainingCount > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="absolute bottom-2 right-2 px-3 py-1 bg-white/10 rounded-full text-xs text-white/60"
            >
              +{remainingCount} more wallets
            </motion.div>
          )}
        </div>

        {/* Cluster Statistics */}
        <div className="grid grid-cols-3 gap-3 text-center">
          <div className="p-3 bg-white/5 rounded-lg">
            <p className="text-2xl font-bold text-[#b026ff]">{connectedWallets.length}</p>
            <p className="text-xs text-white/60">Linked Wallets</p>
          </div>
          <div className="p-3 bg-white/5 rounded-lg">
            <p className="text-2xl font-bold text-[#00fff9]">
              {topInteractedAddresses.reduce((sum, a) => sum + a.count, 0)}
            </p>
            <p className="text-xs text-white/60">Total Links</p>
          </div>
          <div className="p-3 bg-white/5 rounded-lg">
            <p className="text-2xl font-bold text-[#ff0844]">{cexNames.length}</p>
            <p className="text-xs text-white/60">CEX Links</p>
          </div>
        </div>

        {/* Meme warning */}
        <div className="mt-4 p-3 bg-gradient-to-r from-[#b026ff]/10 to-[#ff0844]/10 rounded-lg text-center">
          <p className="text-sm text-white/70 italic">
            &quot;I use different wallets for privacy&quot; - Someone who sends funds between them
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
