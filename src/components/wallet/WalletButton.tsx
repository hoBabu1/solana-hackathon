"use client";

import { useEffect, useState } from "react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

interface WalletButtonProps {
  className?: string;
}

export function WalletButton({ className }: WalletButtonProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Don't render on server to avoid hydration mismatch
  if (!mounted) {
    return (
      <button
        className={`wallet-adapter-button wallet-adapter-button-trigger ${className || ""}`}
        style={{ pointerEvents: "none" }}
      >
        Select Wallet
      </button>
    );
  }

  return <WalletMultiButton className={className} />;
}
