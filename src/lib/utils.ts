import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function shortenAddress(address: string, chars = 4): string {
  return `${address.slice(0, chars)}...${address.slice(-chars)}`;
}

export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K";
  }
  return num.toFixed(2);
}

export function formatUSD(num: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(num);
}

export function getExposureLevel(score: number): {
  level: string;
  color: string;
  emoji: string;
} {
  if (score >= 80) {
    return { level: "CRITICALLY EXPOSED", color: "#ff0844", emoji: "🚨" };
  }
  if (score >= 60) {
    return { level: "HIGHLY VISIBLE", color: "#ff6b00", emoji: "⚠️" };
  }
  if (score >= 40) {
    return { level: "MODERATELY EXPOSED", color: "#ffd000", emoji: "👀" };
  }
  if (score >= 20) {
    return { level: "SOMEWHAT PRIVATE", color: "#00ff9f", emoji: "🔒" };
  }
  return { level: "GHOST MODE", color: "#00fff9", emoji: "👻" };
}

export function getRandomLoadingMessage(): string {
  const messages = [
    "Stalking your wallet...",
    "Exposing your bad trades...",
    "Counting your losses...",
    "Judging your memecoins...",
    "Finding your paper hands...",
    "Analyzing your degen moves...",
    "Tracking your ape entries...",
    "Calculating cringe factor...",
    "Scanning for rugpulls...",
    "Measuring your FOMO...",
  ];
  return messages[Math.floor(Math.random() * messages.length)];
}

export function getRandomPrivacyTip(): string {
  const tips = [
    "Your wallet is not a personality trait. Stop posting it.",
    "If you wouldn't write it on your forehead, don't put it on-chain.",
    "VPNs hide your IP, not your transactions.",
    "Your ex can see your memecoin gambles. Act accordingly.",
    "Every blockchain transaction is like a tweet that never deletes.",
    "Using multiple wallets? Analytics companies still link them.",
    "That 'anonymous' NFT purchase? Everyone saw it.",
    "Blockchain privacy is an oxymoron without proper tools.",
  ];
  return tips[Math.floor(Math.random() * tips.length)];
}
