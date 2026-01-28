export interface WalletAnalysis {
  address: string;
  surveillanceScore: number;
  netWorth: number;
  solBalance: number;
  totalTransactions: number;
  tokenCount: number;
  nftCount: number;
  memecoinCount: number;
  biggestLoss: {
    token: string;
    amount: number;
  } | null;
  biggestWin: {
    token: string;
    amount: number;
  } | null;
  connectedWallets: string[];
  socialMentions: SocialMention[];
  degenScore: number;
  privacyMistakes: PrivacyMistake[];
  recentActivity: Transaction[];
  // Enhanced fields
  tokens: TokenHolding[];
  nfts: NFTHolding[];
  firstActivityDate: number | null;
  lastActivityDate: number | null;
  protocolsUsed: string[];
  tradingVolume: number;
  uniqueTokensTraded: number;
  swapCount: number;
  transferCount: number;
  ropiast: string; // Roast message
  personality: string; // AI-generated personality type
  verdict: string; // AI-generated final verdict
  riskLevel: "low" | "medium" | "high" | "critical";
  walletAge: string;
  activityPattern: string;
  topInteractedAddresses: { address: string; count: number; label?: string }[];
  cexInteractions: number; // Number of interactions with centralized exchanges
  cexNames: string[]; // Names of CEXes detected
}

export interface TokenHolding {
  symbol: string;
  name: string;
  amount: number;
  decimals: number;
  usdValue: number;
  mint: string;
  isMemecoin: boolean;
  logoUrl?: string;
}

export interface NFTHolding {
  name: string;
  collection: string;
  image?: string;
  mint: string;
}

export interface Transaction {
  signature: string;
  timestamp: number;
  type: string;
  amount: number;
  token: string;
  from: string;
  to: string;
  fee?: number;
  description?: string;
}

export interface SocialMention {
  platform: string;
  url?: string;
  found: boolean;
  message?: string;
}

export interface PrivacyMistake {
  type: string;
  description: string;
  severity: "low" | "medium" | "high" | "critical";
  recommendation?: string;
}

export interface LevelProgress {
  level: number;
  completed: boolean;
  quizPassed: boolean;
}

export interface UserProgress {
  levels: LevelProgress[];
  badges: string[];
  scannedWallets: string[];
  totalScans: number;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: number;
}
