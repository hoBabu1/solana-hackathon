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
  approvals: TokenApproval[]; // Token approvals (delegated spending permissions)
  // New features for hackathon
  socialProfiles: SocialProfile[]; // Linked social profiles
  memecoinPnL: MemecoinPnL; // Memecoin profit/loss tracker
  incomeSources: IncomeSource[]; // Breakdown of income sources
  privacyProtocolMisuse: PrivacyProtocolMisuse[]; // Privacy protocol usage mistakes
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

export interface TokenApproval {
  tokenSymbol: string;
  tokenName: string;
  tokenMint: string;
  tokenLogoUrl?: string;
  spender: string;
  spenderLabel?: string;
  approvedAmount: number;
  tokenDecimals: number;
  isUnlimited: boolean;
  usdValue?: number;
}

// Social Profile Linking
export interface SocialProfile {
  platform: "twitter" | "sns" | "ens" | "backpack" | "alldomains";
  found: boolean;
  identifier?: string; // username, domain name, etc.
  url?: string;
  verified?: boolean;
  profileImage?: string;
}

// Memecoin PnL Tracking
export interface MemecoinPnL {
  totalInvested: number; // Total USD spent buying memecoins
  currentValue: number; // Current USD value of memecoin holdings
  realizedPnL: number; // Profit/loss from sold memecoins
  unrealizedPnL: number; // Profit/loss from held memecoins
  totalPnL: number; // Total profit/loss
  percentageChange: number; // Percentage change
  trades: MemecoinTrade[];
  biggestWin?: MemecoinTrade;
  biggestLoss?: MemecoinTrade;
}

export interface MemecoinTrade {
  token: string;
  tokenMint: string;
  tokenLogoUrl?: string;
  buyAmount: number; // Amount bought
  buyValueUsd: number; // USD value when bought
  currentAmount: number; // Current holdings
  currentValueUsd: number; // Current USD value
  soldAmount: number; // Amount sold
  soldValueUsd: number; // USD received from selling
  pnl: number; // Profit/loss
  pnlPercentage: number;
  status: "holding" | "sold" | "partial";
}

// Income Sources
export interface IncomeSource {
  type: "cex_withdrawal" | "defi_yield" | "nft_sale" | "airdrop" | "p2p_transfer" | "staking_reward" | "swap_profit" | "unknown";
  label: string;
  amount: number; // USD value
  percentage: number; // Percentage of total income
  count: number; // Number of transactions
  icon?: string;
}

// Privacy Protocol Misuse Detection
export interface PrivacyProtocolMisuse {
  protocol: string; // e.g., "Tornado Cash", "Railway", etc.
  issue: "quick_withdrawal" | "same_amount" | "round_numbers" | "linked_wallets" | "timing_correlation" | "dust_attack_vulnerable";
  severity: "critical" | "high" | "medium" | "low";
  description: string;
  details: string;
  recommendation: string;
  timestamp?: number;
  txSignature?: string;
}
