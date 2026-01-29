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
    // Original dark humor
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
    // Dark & savage additions
    "Preparing your financial autopsy...",
    "Digging up your buried bags...",
    "Summoning your portfolio demons...",
    "Reading your wallet's obituary...",
    "Your bags are crying, we're listening...",
    "Calculating how much ramen you'll need...",
    "Finding where your hopes went to die...",
    "Measuring your disappointment in SOL...",
    "Exhuming your dead investments...",
    "Documenting your financial crimes...",
    // Flirty & cheeky additions
    "Getting uncomfortably close to your wallet...",
    "Your wallet's giving us bedroom eyes...",
    "Undressing your transaction history...",
    "Getting intimate with your holdings...",
    "Your portfolio is looking... submissive...",
    "Flirting with your bag collection...",
    "Sliding into your wallet's DMs...",
    "Your tokens are playing hard to get...",
    "Making your wallet feel exposed...",
    "Getting handsy with your blockchain data...",
    // Existential dread
    "Calculating your poor life choices...",
    "Your parents can see this, you know...",
    "Screenshotting for the group chat...",
    "This will be used against you...",
    "Your wallet has trust issues now...",
  ];
  return messages[Math.floor(Math.random() * messages.length)];
}

export function getRandomPrivacyTip(): string {
  const tips = [
    // Original tips
    "Your wallet is not a personality trait. Stop posting it.",
    "If you wouldn't write it on your forehead, don't put it on-chain.",
    "VPNs hide your IP, not your transactions.",
    "Your ex can see your memecoin gambles. Act accordingly.",
    "Every blockchain transaction is like a tweet that never deletes.",
    "Using multiple wallets? Analytics companies still link them.",
    "That 'anonymous' NFT purchase? Everyone saw it.",
    "Blockchain privacy is an oxymoron without proper tools.",
    // Dark humor additions
    "Your future employer can see you bought $MILF token. Good luck.",
    "Hackers don't break into wallets. Wallets leave the door open.",
    "Your net worth is public. Sleep well tonight.",
    "Somewhere, a data analyst knows more about you than your therapist.",
    "The blockchain remembers. Your wife's lawyer will too.",
    "That 3am degen trade? It's indexed forever. Forever.",
    "Your wallet tells a story. It's a tragedy.",
    "Privacy is dead. Your transaction history killed it.",
    "Your seed phrase is the only secret you have left.",
    // Flirty & spicy tips
    "Your wallet is naked on the blockchain. We like what we see.",
    "Think of us as your wallet's OnlyFans. Everyone's subscribed.",
    "Your financial history is more exposed than your dating profile.",
    "We've seen your transactions. We're not mad, just disappointed... and aroused.",
    "Your wallet's been around the blockchain. We don't judge.",
    "That late night swap? Yeah, we saw that. It was hot.",
    "Your portfolio is giving 'bad decisions at 2am' energy.",
    "Your wallet whispered its secrets. We listened closely.",
    // Thought-provoking dark ones
    "In crypto, you're not anonymous. You're just not identified yet.",
    "Every transaction is a confession to 10,000 validators.",
    "Your bags aren't heavy. The surveillance attached to them is.",
    "Decentralized doesn't mean private. It means everyone has a copy.",
    "The IRS thanks you for the transparent ledger.",
    "Your wallet has more witnesses than a crime scene.",
    "Privacy isn't a feature. It's a privilege you don't have.",
  ];
  return tips[Math.floor(Math.random() * tips.length)];
}
