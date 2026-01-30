import { WalletAnalysis, PrivacyMistake, Transaction, TokenHolding, NFTHolding, TokenApproval, SocialProfile, MemecoinPnL, MemecoinTrade, IncomeSource, PrivacyProtocolMisuse } from "@/types";

const HELIUS_API_KEY = process.env.NEXT_PUBLIC_HELIUS_API_KEY || "";
const SOLSCAN_API_KEY = process.env.NEXT_PUBLIC_SOLSCAN_API_KEY || "";

// Known tokens (mints) - includes major tokens and memecoins
const KNOWN_TOKENS: Record<string, { symbol: string; name: string; isMemecoin: boolean }> = {
  // Major tokens
  "So11111111111111111111111111111111111111112": { symbol: "WSOL", name: "Wrapped SOL", isMemecoin: false },
  "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v": { symbol: "USDC", name: "USD Coin", isMemecoin: false },
  "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB": { symbol: "USDT", name: "Tether USD", isMemecoin: false },
  "mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So": { symbol: "mSOL", name: "Marinade SOL", isMemecoin: false },
  "7dHbWXmci3dT8UFYWYZweBLXgycu7Y3iL6trKn1Y7ARj": { symbol: "stSOL", name: "Lido Staked SOL", isMemecoin: false },
  "J1toso1uCk3RLmjorhTtrVwY9HJ7X8V9yYac6Y7kGCPn": { symbol: "JitoSOL", name: "Jito Staked SOL", isMemecoin: false },
  // Memecoins
  "DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263": { symbol: "BONK", name: "Bonk", isMemecoin: true },
  "EKpQGSJtjMFqKZ9KQanSqYXRcF8fBopzLHYxdM65zcjm": { symbol: "WIF", name: "dogwifhat", isMemecoin: true },
  "7GCihgDB8fe6KNjn2MYtkzZcRjQy3t9GHdC8uHYmW2hr": { symbol: "POPCAT", name: "Popcat", isMemecoin: true },
  "MEW1gQWJ3nEXg2qgERiKu7FAFj79PHvQVREQUzScPP5": { symbol: "MEW", name: "cat in a dogs world", isMemecoin: true },
  "ukHH6c7mMyiWCf1b9pnWe25TSpkDDt3H5pQZgZ74J82": { symbol: "BOME", name: "BOOK OF MEME", isMemecoin: true },
  "7BgBvyjrZX1YKz4oh9mjb8ZScatkkwb8DzFx7LoiVkM3": { symbol: "SLERF", name: "SLERF", isMemecoin: true },
};

// Legacy - for backward compatibility
const MEMECOIN_MINTS: Record<string, string> = {
  "DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263": "BONK",
  "EKpQGSJtjMFqKZ9KQanSqYXRcF8fBopzLHYxdM65zcjm": "WIF",
  "7GCihgDB8fe6KNjn2MYtkzZcRjQy3t9GHdC8uHYmW2hr": "POPCAT",
  "MEW1gQWJ3nEXg2qgERiKu7FAFj79PHvQVREQUzScPP5": "MEW",
  "ukHH6c7mMyiWCf1b9pnWe25TSpkDDt3H5pQZgZ74J82": "BOME",
  "7BgBvyjrZX1YKz4oh9mjb8ZScatkkwb8DzFx7LoiVkM3": "SLERF",
};

// Known CEX addresses (simplified)
const CEX_ADDRESSES: Record<string, string> = {
  "5tzFkiKscXHK5ZXCGbXZxdw7gTjjD1mBwuoFbhUvuAi9": "Binance",
  "2ojv9BAiHUrvsm9gxDe7fJSzbNZSJcxZvf8dqmWGHG8S": "Coinbase",
  "H8sMJSCQxfKiFTCfDR3DUMLPwcRbM61LGFJ8N4dK3WjS": "FTX",
  "ASTyfSima4LLAdDgoFGkgqoKowG1LZFDr9fAQrg7iaJZ": "Kraken",
};

// Known DeFi protocols
const KNOWN_PROTOCOLS: Record<string, string> = {
  "JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN": "Jupiter",
  "whirLbMiicVdio4qvUfM5KAg6Ct8VwpYzGff3uctyCc": "Orca Whirlpools",
  "9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin": "Serum",
  "RVKd61ztZW9GUwhRbbLoYVRE5Xf1B2tVscKqwZqXgEr": "Raydium",
  "MangoCzJ36AjZyKwVj3VnYU4GTonjfVEnJmvvWaxLac": "Mango Markets",
  "MarBmsSgKXdrN1egZf5sqe1TMai9K1rChYNDJgjq7aD": "Marinade Finance",
  "675kPX9MHTjS2zt1qfr1NYHuzeLXfQM9H24wFSUt1Mp8": "Raydium AMM",
  "CAMMCzo5YL8w4VFF8KVHrK22GGUsp5VTaW7grrKgrWqK": "Raydium CLMM",
  "PhoeNiXZ8ByJGLkxNfZRnkUfjvmuYqLR89jjFHGqdXY": "Phoenix",
  "LBUZKhRxPF3XUpBCjp4YzTKgLccjZhTSDM9YuVaPwxo": "Meteora",
  "srmqPvymJeFKQ4zGQed1GFppgkRHL9kaELCbyksJtPX": "Serum v3",
  "DjVE6JNiYqPL2QXyCUUh8rNjHrbz9hXHNYt99MQ59qw1": "Orca",
};

// Privacy-related protocols with their addresses
const PRIVACY_PROTOCOLS: Record<string, string> = {
  "enc1pher...": "Encifher/encrypt.trade",
};

// Known privacy mixer/protocol addresses (Solana ecosystem)
const PRIVACY_MIXER_ADDRESSES: Record<string, string> = {
  // Light Protocol (Solana's main privacy solution)
  "2c5cDXRGBVoVwxPqK8iRUPa5mU7wHVz5JE3n5a6v5D5Q": "Light Protocol",
  // Elusiv (deprecated but may still have history)
  "Elusiv11111111111111111111111111111111111111": "Elusiv",
};

// Airdrop program addresses
const AIRDROP_PROGRAMS: Record<string, string> = {
  "MERLuDFBMmsHnsBPZw2sDQZHvXFMwp8EdjudcU2HKky": "Jupiter Airdrop",
  "BONUS1111111111111111111111111111111111111": "Bonk Airdrop",
  "pytS9TjG1qyAZypk7n8rw8gfW9sUaqqYyMhJQ4E7JCQ": "Pyth Airdrop",
  "jtogvBNH3WBSWDYD5FJfQP2ZxNTuf82zL8GkEhPeaJx": "Jito Airdrop",
  "WnsoZfd9SDBsgkCrQ8xhweNKPcAkUcRdYhYXrLtcX2A": "W Airdrop",
};

// Staking program addresses
const STAKING_PROGRAMS: Record<string, string> = {
  "Stake11111111111111111111111111111111111111": "SOL Staking",
  "MarBmsSgKXdrN1egZf5sqe1TMai9K1rChYNDJgjq7aD": "Marinade",
  "J1toso1uCk3RLmjorhTtrVwY9HJ7X8V9yYac6Y7kGCPn": "Jito",
  "mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So": "Marinade mSOL",
};

// NFT marketplace addresses
const NFT_MARKETPLACES: Record<string, string> = {
  "M2mx93ekt1fmXSVkTrUL9xVFHkmME8HTUi5Cyc5aF7K": "Magic Eden v2",
  "TSWAPaqyCSx2KABk68Shruf4rp7CxcNi8hAsbdwmHbN": "Tensor",
  "hadeK9DLv9eA7ya5KCTqSvSvRZeJC3JgD5a9Y3CNbvu": "Hadeswap",
};

// More memecoin addresses for comprehensive PnL tracking
const EXTENDED_MEMECOINS: Record<string, { symbol: string; name: string }> = {
  "DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263": { symbol: "BONK", name: "Bonk" },
  "EKpQGSJtjMFqKZ9KQanSqYXRcF8fBopzLHYxdM65zcjm": { symbol: "WIF", name: "dogwifhat" },
  "7GCihgDB8fe6KNjn2MYtkzZcRjQy3t9GHdC8uHYmW2hr": { symbol: "POPCAT", name: "Popcat" },
  "MEW1gQWJ3nEXg2qgERiKu7FAFj79PHvQVREQUzScPP5": { symbol: "MEW", name: "cat in a dogs world" },
  "ukHH6c7mMyiWCf1b9pnWe25TSpkDDt3H5pQZgZ74J82": { symbol: "BOME", name: "BOOK OF MEME" },
  "7BgBvyjrZX1YKz4oh9mjb8ZScatkkwb8DzFx7LoiVkM3": { symbol: "SLERF", name: "SLERF" },
  "A8C3pPPvPGXLdsnXgWmPc6YBhAqGduVsVV6TNNE9q7Zk": { symbol: "MYRO", name: "Myro" },
  "Df6yfrKC8kZE3KNkrHERKzAetSxbrWeniQfyJY4Jpump": { symbol: "PNUT", name: "Peanut the Squirrel" },
  "ED5nyyWEzpPPiWimP8vYm7sD7TD3LAt3Q3gRTWHzPJBY": { symbol: "MOODENG", name: "Moo Deng" },
  "CzLSujWBLFsSjncfkh59rUFqvafWcY5tzedWJSuypump": { symbol: "GOAT", name: "Goatseus Maximus" },
  "2qEHjDLDLbuBgRYvsxhc5D6uDWAivNFZGan56P1tpump": { symbol: "PUPS", name: "PUPS" },
  "HeLp6NuQkmYB4pYWo2zYs22mESHXPQYzXbB8n4V98jwC": { symbol: "AI16Z", name: "ai16z" },
};

// Roast templates for fallback
const ROAST_TEMPLATES = {
  highDegen: [
    "You've traded more memecoins than actual tokens. Your portfolio is basically a zoo. 🦧",
    "Your wallet history reads like a memecoin graveyard. RIP to your funds. ⚰️",
    "You ape into everything. Your wallet should come with a health warning. 🚨",
  ],
  whale: [
    "Nice flex, whale. Everyone can see you're loaded. Including hackers. 🐋",
    "You've got more SOL than sense if you're keeping this much in a hot wallet. 💰",
  ],
  cexUser: [
    "Direct CEX transactions? Everyone knows you're cashing out. Tax man is watching. 🏦",
    "Your CEX connections are showing. Might as well tattoo your wallet on your forehead. 💸",
  ],
  inactive: [
    "Your wallet is collecting dust. Even your tokens forgot you exist. 🧹",
    "Last activity was ages ago. Did you lose your seed phrase? 🔑",
  ],
  newbie: [
    "Fresh wallet detected. Welcome to the surveillance state! 👶",
    "You're new here. Give it time, we'll have plenty of data on you soon. 📊",
  ],
  default: [
    "Average degen activity detected. You're exposed, just like everyone else. 👀",
    "Your wallet is an open book. Hope you didn't want privacy! 📖",
  ],
};

// ============================================
// SOCIAL PROFILE LINKING
// ============================================

async function fetchSocialProfiles(address: string): Promise<SocialProfile[]> {
  const profiles: SocialProfile[] = [];

  // 1. Check Solana Name Service (.sol domains)
  try {
    const snsProfile = await fetchSNSDomain(address);
    profiles.push(snsProfile);
  } catch (e) {
    console.log("SNS lookup failed:", e);
    profiles.push({ platform: "sns", found: false });
  }

  // 2. Check AllDomains (.abc, .bonk, .poor, etc.)
  try {
    const allDomainsProfile = await fetchAllDomains(address);
    profiles.push(allDomainsProfile);
  } catch (e) {
    console.log("AllDomains lookup failed:", e);
    profiles.push({ platform: "alldomains", found: false });
  }

  // 3. Check Backpack username
  try {
    const backpackProfile = await fetchBackpackUsername(address);
    profiles.push(backpackProfile);
  } catch (e) {
    console.log("Backpack lookup failed:", e);
    profiles.push({ platform: "backpack", found: false });
  }

  return profiles;
}

async function fetchSNSDomain(address: string): Promise<SocialProfile> {
  try {
    // Use SNS reverse lookup API
    const res = await fetch(`https://sns-sdk-proxy.bonfida.workers.dev/reverse-lookup/${address}`);
    if (res.ok) {
      const data = await res.json();
      if (data.result && data.result.length > 0) {
        const domain = data.result[0];
        return {
          platform: "sns",
          found: true,
          identifier: `${domain}.sol`,
          url: `https://sns.id/domain/${domain}`,
          verified: true,
        };
      }
    }
  } catch (e) {
    console.log("SNS API error:", e);
  }
  return { platform: "sns", found: false };
}

async function fetchAllDomains(address: string): Promise<SocialProfile> {
  try {
    // AllDomains API
    const res = await fetch(`https://api.alldomains.id/reverse/${address}`);
    if (res.ok) {
      const data = await res.json();
      if (data.domains && data.domains.length > 0) {
        const domain = data.domains[0];
        return {
          platform: "alldomains",
          found: true,
          identifier: domain.name,
          url: `https://alldomains.id/domain/${domain.name}`,
          verified: true,
        };
      }
    }
  } catch (e) {
    console.log("AllDomains API error:", e);
  }
  return { platform: "alldomains", found: false };
}

async function fetchBackpackUsername(address: string): Promise<SocialProfile> {
  try {
    // Backpack API (public user lookup)
    const res = await fetch(`https://xnft.api.backpack.workers.dev/users?publicKey=${address}`);
    if (res.ok) {
      const data = await res.json();
      if (data.user && data.user.username) {
        return {
          platform: "backpack",
          found: true,
          identifier: data.user.username,
          url: `https://backpack.app/${data.user.username}`,
          profileImage: data.user.image,
          verified: true,
        };
      }
    }
  } catch (e) {
    console.log("Backpack API error:", e);
  }
  return { platform: "backpack", found: false };
}

// ============================================
// MEMECOIN PNL CALCULATOR
// ============================================

async function calculateMemecoinPnL(
  tokens: TokenHolding[],
  transactions: {
    signature: string;
    timestamp: number;
    type: string;
    source?: string;
    tokenTransfers?: Array<{
      mint: string;
      fromUserAccount: string;
      toUserAccount: string;
      tokenAmount: number;
    }>;
    nativeTransfers?: Array<{
      amount: number;
      fromUserAccount: string;
      toUserAccount: string;
    }>;
  }[],
  userAddress: string
): Promise<MemecoinPnL> {
  const allMemecoins = { ...EXTENDED_MEMECOINS };

  // Track memecoin trades
  const memecoinTradesMap: Record<string, {
    buys: { amount: number; timestamp: number; solValue: number }[];
    sells: { amount: number; timestamp: number; solValue: number }[];
  }> = {};

  // Analyze transactions for memecoin swaps
  for (const tx of transactions) {
    if (!tx.tokenTransfers || tx.tokenTransfers.length === 0) continue;

    for (const transfer of tx.tokenTransfers) {
      const mint = transfer.mint;
      const isMemecoin = !!allMemecoins[mint] || tokens.find(t => t.mint === mint && t.isMemecoin);

      if (!isMemecoin) continue;

      if (!memecoinTradesMap[mint]) {
        memecoinTradesMap[mint] = { buys: [], sells: [] };
      }

      // Estimate SOL value from native transfers in same tx
      const solTransfer = tx.nativeTransfers?.find(nt =>
        nt.fromUserAccount === userAddress || nt.toUserAccount === userAddress
      );
      const solValue = solTransfer ? Math.abs(solTransfer.amount) / 1e9 : 0;

      // Determine if buy or sell based on transfer direction
      const isReceiving = transfer.toUserAccount === userAddress;

      if (isReceiving) {
        // Buying memecoin
        memecoinTradesMap[mint].buys.push({
          amount: transfer.tokenAmount,
          timestamp: tx.timestamp,
          solValue,
        });
      } else {
        // Selling memecoin
        memecoinTradesMap[mint].sells.push({
          amount: transfer.tokenAmount,
          timestamp: tx.timestamp,
          solValue,
        });
      }
    }
  }

  // Get current SOL price for USD conversion
  const solPrice = await fetchSolPrice();

  // Calculate PnL for each memecoin
  const trades: MemecoinTrade[] = [];
  let totalInvested = 0;
  let totalCurrentValue = 0;
  let totalSoldValue = 0;
  let totalBuyValue = 0;

  for (const [mint, tradeData] of Object.entries(memecoinTradesMap)) {
    const tokenInfo = tokens.find(t => t.mint === mint);
    const memecoinInfo = allMemecoins[mint];

    const totalBought = tradeData.buys.reduce((sum, b) => sum + b.amount, 0);
    const totalSold = tradeData.sells.reduce((sum, s) => sum + s.amount, 0);
    const buyValueSol = tradeData.buys.reduce((sum, b) => sum + b.solValue, 0);
    const sellValueSol = tradeData.sells.reduce((sum, s) => sum + s.solValue, 0);

    const currentHolding = tokenInfo?.amount || 0;
    const currentValueUsd = tokenInfo?.usdValue || 0;
    const buyValueUsd = buyValueSol * solPrice;
    const soldValueUsd = sellValueSol * solPrice;

    const pnl = (currentValueUsd + soldValueUsd) - buyValueUsd;
    const pnlPercentage = buyValueUsd > 0 ? ((pnl / buyValueUsd) * 100) : 0;

    totalInvested += buyValueUsd;
    totalCurrentValue += currentValueUsd;
    totalSoldValue += soldValueUsd;
    totalBuyValue += buyValueUsd;

    trades.push({
      token: memecoinInfo?.symbol || tokenInfo?.symbol || mint.slice(0, 6),
      tokenMint: mint,
      tokenLogoUrl: tokenInfo?.logoUrl,
      buyAmount: totalBought,
      buyValueUsd,
      currentAmount: currentHolding,
      currentValueUsd,
      soldAmount: totalSold,
      soldValueUsd,
      pnl,
      pnlPercentage,
      status: currentHolding === 0 ? "sold" : totalSold > 0 ? "partial" : "holding",
    });
  }

  // Also add current memecoin holdings that weren't tracked in transactions
  for (const token of tokens) {
    if (!token.isMemecoin) continue;
    if (trades.find(t => t.tokenMint === token.mint)) continue;

    // This memecoin wasn't in our transaction history, add as current holding
    trades.push({
      token: token.symbol,
      tokenMint: token.mint,
      tokenLogoUrl: token.logoUrl,
      buyAmount: token.amount,
      buyValueUsd: 0, // Unknown buy price
      currentAmount: token.amount,
      currentValueUsd: token.usdValue,
      soldAmount: 0,
      soldValueUsd: 0,
      pnl: 0, // Can't calculate without buy price
      pnlPercentage: 0,
      status: "holding",
    });

    totalCurrentValue += token.usdValue;
  }

  // Sort trades by absolute PnL
  trades.sort((a, b) => Math.abs(b.pnl) - Math.abs(a.pnl));

  const totalPnL = (totalCurrentValue + totalSoldValue) - totalInvested;
  const percentageChange = totalInvested > 0 ? ((totalPnL / totalInvested) * 100) : 0;

  return {
    totalInvested,
    currentValue: totalCurrentValue,
    realizedPnL: totalSoldValue - (totalInvested * (totalSoldValue / (totalCurrentValue + totalSoldValue || 1))),
    unrealizedPnL: totalCurrentValue - (totalInvested * (totalCurrentValue / (totalCurrentValue + totalSoldValue || 1))),
    totalPnL,
    percentageChange,
    trades,
    biggestWin: trades.filter(t => t.pnl > 0).sort((a, b) => b.pnl - a.pnl)[0],
    biggestLoss: trades.filter(t => t.pnl < 0).sort((a, b) => a.pnl - b.pnl)[0],
  };
}

// ============================================
// INCOME SOURCES BREAKDOWN
// ============================================

function analyzeIncomeSources(
  transactions: {
    signature: string;
    timestamp: number;
    type: string;
    source?: string;
    description?: string;
    nativeTransfers?: Array<{
      amount: number;
      fromUserAccount: string;
      toUserAccount: string;
    }>;
    tokenTransfers?: Array<{
      mint: string;
      fromUserAccount: string;
      toUserAccount: string;
      tokenAmount: number;
    }>;
  }[],
  userAddress: string,
  solPrice: number
): IncomeSource[] {
  const sources: Record<string, { amount: number; count: number }> = {
    cex_withdrawal: { amount: 0, count: 0 },
    defi_yield: { amount: 0, count: 0 },
    nft_sale: { amount: 0, count: 0 },
    airdrop: { amount: 0, count: 0 },
    p2p_transfer: { amount: 0, count: 0 },
    staking_reward: { amount: 0, count: 0 },
    swap_profit: { amount: 0, count: 0 },
    unknown: { amount: 0, count: 0 },
  };

  for (const tx of transactions) {
    // Check for incoming native transfers
    const incomingTransfers = tx.nativeTransfers?.filter(
      nt => nt.toUserAccount === userAddress && nt.amount > 0
    ) || [];

    for (const transfer of incomingTransfers) {
      const fromAddress = transfer.fromUserAccount;
      const amountSol = transfer.amount / 1e9;
      const amountUsd = amountSol * solPrice;

      // Classify the source
      if (CEX_ADDRESSES[fromAddress]) {
        sources.cex_withdrawal.amount += amountUsd;
        sources.cex_withdrawal.count++;
      } else if (AIRDROP_PROGRAMS[fromAddress]) {
        sources.airdrop.amount += amountUsd;
        sources.airdrop.count++;
      } else if (STAKING_PROGRAMS[fromAddress]) {
        sources.staking_reward.amount += amountUsd;
        sources.staking_reward.count++;
      } else if (NFT_MARKETPLACES[fromAddress] || tx.type?.toLowerCase().includes("nft")) {
        sources.nft_sale.amount += amountUsd;
        sources.nft_sale.count++;
      } else if (KNOWN_PROTOCOLS[fromAddress] || tx.source?.toLowerCase().includes("raydium") || tx.source?.toLowerCase().includes("orca")) {
        sources.defi_yield.amount += amountUsd;
        sources.defi_yield.count++;
      } else if (tx.type?.toLowerCase().includes("swap")) {
        sources.swap_profit.amount += amountUsd;
        sources.swap_profit.count++;
      } else if (amountSol > 0.01) {
        // Significant transfer from unknown source = P2P
        sources.p2p_transfer.amount += amountUsd;
        sources.p2p_transfer.count++;
      } else {
        sources.unknown.amount += amountUsd;
        sources.unknown.count++;
      }
    }

    // Check for airdrop transactions by description
    if (tx.description?.toLowerCase().includes("airdrop") ||
        tx.description?.toLowerCase().includes("claim")) {
      // Count token transfers as potential airdrops
      if (tx.tokenTransfers) {
        for (const tokenTx of tx.tokenTransfers) {
          if (tokenTx.toUserAccount === userAddress) {
            sources.airdrop.count++;
          }
        }
      }
    }
  }

  // Calculate total and percentages
  const totalIncome = Object.values(sources).reduce((sum, s) => sum + s.amount, 0);

  const incomeSourceLabels: Record<string, string> = {
    cex_withdrawal: "CEX Withdrawals",
    defi_yield: "DeFi Yields",
    nft_sale: "NFT Sales",
    airdrop: "Airdrops",
    p2p_transfer: "P2P Transfers",
    staking_reward: "Staking Rewards",
    swap_profit: "Swap Profits",
    unknown: "Other",
  };

  const result: IncomeSource[] = Object.entries(sources)
    .filter(([, data]) => data.amount > 0 || data.count > 0)
    .map(([type, data]) => ({
      type: type as IncomeSource["type"],
      label: incomeSourceLabels[type],
      amount: data.amount,
      percentage: totalIncome > 0 ? (data.amount / totalIncome) * 100 : 0,
      count: data.count,
    }))
    .sort((a, b) => b.amount - a.amount);

  return result;
}

// ============================================
// PRIVACY PROTOCOL MISUSE DETECTION
// ============================================

function detectPrivacyProtocolMisuse(
  transactions: {
    signature: string;
    timestamp: number;
    type: string;
    source?: string;
    nativeTransfers?: Array<{
      amount: number;
      fromUserAccount: string;
      toUserAccount: string;
    }>;
  }[],
  userAddress: string,
  connectedWallets: string[]
): PrivacyProtocolMisuse[] {
  const misuses: PrivacyProtocolMisuse[] = [];

  // Track privacy protocol interactions
  const privacyDeposits: { amount: number; timestamp: number; signature: string }[] = [];
  const privacyWithdrawals: { amount: number; timestamp: number; signature: string }[] = [];

  for (const tx of transactions) {
    if (!tx.nativeTransfers) continue;

    for (const transfer of tx.nativeTransfers) {
      const isPrivacyProtocol =
        PRIVACY_MIXER_ADDRESSES[transfer.fromUserAccount] ||
        PRIVACY_MIXER_ADDRESSES[transfer.toUserAccount];

      if (isPrivacyProtocol) {
        const amountSol = Math.abs(transfer.amount) / 1e9;

        if (transfer.fromUserAccount === userAddress) {
          // Deposit to privacy protocol
          privacyDeposits.push({
            amount: amountSol,
            timestamp: tx.timestamp,
            signature: tx.signature,
          });
        } else if (transfer.toUserAccount === userAddress) {
          // Withdrawal from privacy protocol
          privacyWithdrawals.push({
            amount: amountSol,
            timestamp: tx.timestamp,
            signature: tx.signature,
          });
        }
      }
    }
  }

  // Check for common privacy mistakes

  // 1. Quick withdrawal (less than 24 hours between deposit and withdrawal)
  for (const withdrawal of privacyWithdrawals) {
    for (const deposit of privacyDeposits) {
      const timeDiff = withdrawal.timestamp - deposit.timestamp;
      const hoursDiff = timeDiff / 3600;

      if (hoursDiff > 0 && hoursDiff < 24) {
        misuses.push({
          protocol: "Privacy Protocol",
          issue: "quick_withdrawal",
          severity: "critical",
          description: "Withdrew too quickly after depositing",
          details: `You withdrew within ${Math.round(hoursDiff)} hours of depositing. This significantly reduces privacy as timing analysis can link your transactions.`,
          recommendation: "Wait at least 24-48 hours between deposits and withdrawals. Use encrypt.trade which handles timing automatically.",
          timestamp: withdrawal.timestamp,
          txSignature: withdrawal.signature,
        });
        break;
      }
    }
  }

  // 2. Same amount pattern
  for (const withdrawal of privacyWithdrawals) {
    for (const deposit of privacyDeposits) {
      // Check if amounts are within 1% of each other
      const amountDiff = Math.abs(withdrawal.amount - deposit.amount) / deposit.amount;
      if (amountDiff < 0.01) {
        misuses.push({
          protocol: "Privacy Protocol",
          issue: "same_amount",
          severity: "critical",
          description: "Withdrew the same amount as deposited",
          details: `Deposited ${deposit.amount.toFixed(4)} SOL and withdrew ${withdrawal.amount.toFixed(4)} SOL. This makes it trivial to link your transactions.`,
          recommendation: "Split withdrawals into different amounts and timing. encrypt.trade handles this automatically.",
          timestamp: withdrawal.timestamp,
          txSignature: withdrawal.signature,
        });
        break;
      }
    }
  }

  // 3. Round number deposits/withdrawals
  for (const deposit of privacyDeposits) {
    if (deposit.amount === Math.round(deposit.amount) && deposit.amount >= 1) {
      misuses.push({
        protocol: "Privacy Protocol",
        issue: "round_numbers",
        severity: "high",
        description: "Used round numbers for privacy deposits",
        details: `Deposited exactly ${deposit.amount} SOL. Round numbers are easier to track and correlate.`,
        recommendation: "Use random amounts like 1.3847 SOL instead of 1 SOL.",
        timestamp: deposit.timestamp,
        txSignature: deposit.signature,
      });
    }
  }

  // 4. Linked wallets analysis
  if (connectedWallets.length > 5) {
    // Check if any connected wallets also used privacy protocols
    const linkedPrivacyRisk = connectedWallets.length > 10;
    if (linkedPrivacyRisk) {
      misuses.push({
        protocol: "Wallet Clustering",
        issue: "linked_wallets",
        severity: "high",
        description: "Privacy undermined by wallet clustering",
        details: `Your wallet is connected to ${connectedWallets.length} other wallets. Even with privacy protocols, clustering analysis can link your activity.`,
        recommendation: "Use separate, unconnected wallets for private transactions. encrypt.trade creates isolated transaction paths.",
      });
    }
  }

  // 5. Timing correlation (check if transactions follow predictable patterns)
  if (transactions.length > 20) {
    const hours = transactions.map(t => new Date(t.timestamp * 1000).getHours());
    const hourCounts: Record<number, number> = {};
    hours.forEach(h => hourCounts[h] = (hourCounts[h] || 0) + 1);

    const maxHourCount = Math.max(...Object.values(hourCounts));
    const dominantHour = Object.entries(hourCounts).find(([, count]) => count === maxHourCount)?.[0];

    if (maxHourCount > transactions.length * 0.25) {
      misuses.push({
        protocol: "Timing Analysis",
        issue: "timing_correlation",
        severity: "medium",
        description: "Predictable transaction timing",
        details: `${Math.round((maxHourCount / transactions.length) * 100)}% of your transactions occur around ${dominantHour}:00. This reveals your timezone and routine.`,
        recommendation: "Vary your transaction times or use scheduled/delayed transactions.",
      });
    }
  }

  // 6. Dust attack vulnerability
  const smallIncomingTransfers = transactions.filter(tx =>
    tx.nativeTransfers?.some(nt =>
      nt.toUserAccount === userAddress &&
      nt.amount > 0 &&
      nt.amount < 10000 // Less than 0.00001 SOL
    )
  );

  if (smallIncomingTransfers.length > 3) {
    misuses.push({
      protocol: "Dust Tracking",
      issue: "dust_attack_vulnerable",
      severity: "medium",
      description: "Received dust that can track your wallet",
      details: `Received ${smallIncomingTransfers.length} tiny transactions that could be dust attacks for tracking purposes.`,
      recommendation: "Don't interact with dust tokens. They're used to track wallet activity and link addresses.",
    });
  }

  // Sort by severity
  const severityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
  misuses.sort((a, b) => severityOrder[a.severity] - severityOrder[b.severity]);

  return misuses;
}

// Fetch SOL price from multiple sources
async function fetchSolPrice(): Promise<number> {
  // Try CoinGecko first
  try {
    const res = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd");
    if (res.ok) {
      const data = await res.json();
      if (data.solana?.usd) {
        console.log("SOL price from CoinGecko:", data.solana.usd);
        return data.solana.usd;
      }
    }
  } catch (e) {
    console.log("CoinGecko price fetch failed:", e);
  }

  // Try Jupiter as backup
  try {
    const res = await fetch("https://api.jup.ag/price/v2?ids=So11111111111111111111111111111111111111112");
    if (res.ok) {
      const data = await res.json();
      const price = data.data?.["So11111111111111111111111111111111111111112"]?.price;
      if (price) {
        console.log("SOL price from Jupiter:", price);
        return parseFloat(price);
      }
    }
  } catch (e) {
    console.log("Jupiter price fetch failed:", e);
  }

  console.log("Using fallback SOL price: 150");
  return 150; // Fallback
}

// Fetch token prices from Jupiter v2 API
async function fetchTokenPrices(mints: string[]): Promise<Record<string, number>> {
  if (mints.length === 0) return {};

  const prices: Record<string, number> = {};

  try {
    // Jupiter v2 API
    const mintList = mints.slice(0, 100).join(",");
    const res = await fetch(`https://api.jup.ag/price/v2?ids=${mintList}`);

    if (res.ok) {
      const data = await res.json();
      console.log("Jupiter prices response:", data);

      for (const [mint, info] of Object.entries(data.data || {})) {
        const priceInfo = info as { price?: string | number };
        if (priceInfo.price) {
          prices[mint] = typeof priceInfo.price === 'string' ? parseFloat(priceInfo.price) : priceInfo.price;
        }
      }
    }
  } catch (e) {
    console.log("Jupiter token prices failed:", e);
  }

  return prices;
}

export async function analyzeWallet(address: string): Promise<WalletAnalysis> {
  try {
    console.log("Analyzing wallet:", address);

    // Fetch SOL price first
    const solPrice = await fetchSolPrice();

    // Fetch all data in parallel
    const [balanceData, enrichedTxData, walletStats, socialProfiles] = await Promise.all([
      fetchBalancesWithPrices(address, solPrice),
      fetchEnrichedTransactions(address),
      fetchWalletStats(address),
      fetchSocialProfiles(address),
    ]);

    const tokens = balanceData.tokens || [];
    const nfts = balanceData.nfts || [];
    const solBalance = balanceData.solBalance;

    // Fetch token approvals
    const approvals = await fetchTokenApprovals(address, tokens);

    // Calculate real net worth
    const tokenValue = tokens.reduce((acc, t) => acc + (t.usdValue || 0), 0);
    const solValue = solBalance * solPrice;
    const netWorth = solValue + tokenValue;

    // Identify memecoins
    const memecoinTokens = tokens.filter(t => t.isMemecoin);

    // Analyze transactions
    const txAnalysis = analyzeTransactions(enrichedTxData, address);

    // Calculate scores
    const degenScore = calculateDegenScore(memecoinTokens.length, tokens.length, txAnalysis.swapCount);

    // Use actual transaction count from wallet stats if available
    const actualTransactionCount = walletStats.totalSignatures > 0
      ? walletStats.totalSignatures
      : enrichedTxData.length;

    // Enhanced surveillance score calculation
    const surveillanceScore = calculateSurveillanceScore({
      totalTransactions: actualTransactionCount,
      memecoinCount: memecoinTokens.length,
      tokenCount: tokens.length,
      nftCount: nfts.length,
      netWorth,
      swapCount: txAnalysis.swapCount,
      uniqueTokens: txAnalysis.uniqueTokens,
      cexInteractions: txAnalysis.cexInteractions,
      connectedWalletsCount: txAnalysis.connectedWallets.length,
    });

    // Detect privacy mistakes with encrypt.trade recommendations
    const privacyMistakes = detectPrivacyMistakes(
      enrichedTxData,
      address,
      tokens,
      nfts,
      txAnalysis.cexInteractions,
      netWorth,
      txAnalysis.connectedWallets.length
    );

    // Determine risk level
    const riskLevel = surveillanceScore >= 80 ? "critical"
      : surveillanceScore >= 60 ? "high"
      : surveillanceScore >= 40 ? "medium" : "low";

    // Calculate wallet age - use the more accurate first activity from wallet stats if available
    const firstActivityTimestamp = walletStats.firstActivityTimestamp || txAnalysis.firstActivity;
    const walletAge = firstActivityTimestamp
      ? calculateWalletAge(firstActivityTimestamp)
      : "Unknown";

    // Determine activity pattern
    const activityPattern = determineActivityPattern(enrichedTxData);

    // Calculate memecoin PnL
    const memecoinPnL = await calculateMemecoinPnL(tokens, enrichedTxData, address);

    // Analyze income sources
    const incomeSources = analyzeIncomeSources(enrichedTxData, address, solPrice);

    // Detect privacy protocol misuse
    const privacyProtocolMisuse = detectPrivacyProtocolMisuse(
      enrichedTxData,
      address,
      txAnalysis.connectedWallets
    );

    // Get AI-generated roast
    const aiResponse = await generateAIRoast({
      address,
      netWorth,
      solBalance,
      totalTransactions: actualTransactionCount,
      tokenCount: tokens.length,
      nftCount: nfts.length,
      memecoinCount: memecoinTokens.length,
      degenScore,
      swapCount: txAnalysis.swapCount,
      transferCount: txAnalysis.transferCount,
      tradingVolume: txAnalysis.tradingVolume * solPrice,
      walletAge,
      activityPattern,
      protocolsUsed: txAnalysis.protocolsUsed,
      biggestWin: txAnalysis.biggestWin ? { ...txAnalysis.biggestWin, amount: txAnalysis.biggestWin.amount * solPrice } : null,
      biggestLoss: txAnalysis.biggestLoss ? { ...txAnalysis.biggestLoss, amount: txAnalysis.biggestLoss.amount * solPrice } : null,
      topTokens: tokens.slice(0, 5).map(t => t.symbol),
      cexInteractions: txAnalysis.cexInteractions,
    });

    return {
      address,
      surveillanceScore,
      netWorth,
      solBalance,
      totalTransactions: actualTransactionCount,
      tokenCount: tokens.length,
      nftCount: nfts.length,
      memecoinCount: memecoinTokens.length,
      biggestLoss: txAnalysis.biggestLoss ? { ...txAnalysis.biggestLoss, amount: txAnalysis.biggestLoss.amount * solPrice } : null,
      biggestWin: txAnalysis.biggestWin ? { ...txAnalysis.biggestWin, amount: txAnalysis.biggestWin.amount * solPrice } : null,
      connectedWallets: txAnalysis.connectedWallets.slice(0, 15),
      socialMentions: [{ platform: "Twitter", found: false }],
      degenScore,
      privacyMistakes,
      recentActivity: enrichedTxData.slice(0, 10).map(tx => ({
        signature: tx.signature,
        timestamp: tx.timestamp,
        type: tx.type || "unknown",
        amount: (tx.nativeTransfers?.[0]?.amount || 0) / 1e9,
        token: "SOL",
        from: tx.nativeTransfers?.[0]?.fromUserAccount || "",
        to: tx.nativeTransfers?.[0]?.toUserAccount || "",
        fee: tx.fee,
        description: tx.description,
      })),
      tokens,
      nfts,
      firstActivityDate: firstActivityTimestamp || txAnalysis.firstActivity,
      lastActivityDate: txAnalysis.lastActivity,
      protocolsUsed: txAnalysis.protocolsUsed,
      tradingVolume: txAnalysis.tradingVolume * solPrice,
      uniqueTokensTraded: txAnalysis.uniqueTokens,
      swapCount: txAnalysis.swapCount,
      transferCount: txAnalysis.transferCount,
      ropiast: aiResponse.roast,
      personality: aiResponse.personality,
      verdict: aiResponse.verdict,
      riskLevel,
      walletAge,
      activityPattern,
      topInteractedAddresses: txAnalysis.topAddresses,
      cexInteractions: txAnalysis.cexInteractions,
      cexNames: txAnalysis.cexNames,
      approvals,
      // New features for hackathon
      socialProfiles,
      memecoinPnL,
      incomeSources,
      privacyProtocolMisuse,
    };
  } catch (error) {
    console.error("Error analyzing wallet:", error);
    return getMockAnalysis(address);
  }
}

async function fetchBalancesWithPrices(address: string, solPrice: number): Promise<{
  solBalance: number;
  tokens: TokenHolding[];
  nfts: NFTHolding[];
}> {
  try {
    // Use Helius as primary (most reliable, free tier works)
    if (HELIUS_API_KEY) {
      console.log("Fetching balances from Helius API");
      return await fetchFromHelius(address, solPrice);
    }

    return { solBalance: 0, tokens: [], nfts: [] };
  } catch (error) {
    console.error("Error fetching balances:", error);
    return { solBalance: 0, tokens: [], nfts: [] };
  }
}

// Fetch from Solscan Pro API (with API key)
async function fetchFromSolscanPro(address: string, solPrice: number): Promise<{
  solBalance: number;
  tokens: TokenHolding[];
}> {
  try {
    console.log("Solscan Pro API call for:", address);

    const headers: HeadersInit = {
      "accept": "application/json",
      "token": SOLSCAN_API_KEY,
    };

    // Fetch account info and token accounts
    const [accountRes, tokensRes] = await Promise.all([
      fetch(`https://pro-api.solscan.io/v2.0/account?address=${address}`, { headers }),
      fetch(`https://pro-api.solscan.io/v2.0/account/token-accounts?address=${address}&type=token&page=1&page_size=50`, { headers }),
    ]);

    console.log("Solscan account status:", accountRes.status);
    console.log("Solscan tokens status:", tokensRes.status);

    // Parse SOL balance
    let solBalance = 0;
    if (accountRes.ok) {
      const accountData = await accountRes.json();
      console.log("Solscan account data:", accountData);
      // Pro API returns lamports in data object
      solBalance = (accountData.data?.lamports || accountData.lamports || 0) / 1e9;
    }

    // Parse token holdings
    const tokens: TokenHolding[] = [];
    if (tokensRes.ok) {
      const tokensData = await tokensRes.json();
      console.log("Solscan tokens data:", tokensData);

      const tokenList = tokensData.data || tokensData || [];
      if (Array.isArray(tokenList)) {
        for (const t of tokenList) {
          const tokenAddress = t.token_address || t.tokenAddress || "";
          const decimals = t.token_decimals || t.decimals || 9;
          const rawAmount = Number(t.amount || t.balance || 0);
          const uiAmount = rawAmount / Math.pow(10, decimals);
          const isMemecoin = !!MEMECOIN_MINTS[tokenAddress];

          if (uiAmount > 0 && tokenAddress) {
            tokens.push({
              symbol: t.token_symbol || t.symbol || MEMECOIN_MINTS[tokenAddress] || tokenAddress.slice(0, 6) + "...",
              name: t.token_name || t.name || "Token",
              amount: uiAmount,
              decimals,
              usdValue: 0,
              mint: tokenAddress,
              isMemecoin,
              logoUrl: t.token_icon || t.icon,
            });
          }
        }
      }
    }

    console.log("Parsed SOL balance:", solBalance, "SOL, tokens:", tokens.length);

    // Fetch token prices from Jupiter
    if (tokens.length > 0) {
      const mints = tokens.map(t => t.mint).filter(m => m);
      const prices = await fetchTokenPrices(mints);

      for (const token of tokens) {
        const price = prices[token.mint] || 0;
        token.usdValue = token.amount * price;
      }
    }

    // Sort by USD value
    tokens.sort((a, b) => b.usdValue - a.usdValue);

    return { solBalance, tokens };
  } catch (error) {
    console.error("Solscan Pro fetch error:", error);
    return { solBalance: 0, tokens: [] };
  }
}

// Fetch balances from Solscan API (provides USD values directly)
async function fetchFromSolscan(address: string, solPrice: number): Promise<{
  solBalance: number;
  tokens: TokenHolding[];
}> {
  try {
    console.log("Fetching from Solscan for address:", address);

    // Use public Solscan API (more reliable)
    const [accountRes, tokensRes] = await Promise.all([
      fetch(`https://public-api.solscan.io/account/${address}`),
      fetch(`https://public-api.solscan.io/account/tokens?account=${address}`),
    ]);

    // Parse SOL balance
    let solBalance = 0;
    if (accountRes.ok) {
      const accountText = await accountRes.text();
      if (accountText) {
        try {
          const accountData = JSON.parse(accountText);
          console.log("Solscan account data:", accountData);
          solBalance = (accountData.lamports || 0) / 1e9;
        } catch (e) {
          console.log("Failed to parse account data");
        }
      }
    }

    // Parse token holdings
    const tokens: TokenHolding[] = [];
    if (tokensRes.ok) {
      const tokensText = await tokensRes.text();
      if (tokensText) {
        try {
          const tokensData = JSON.parse(tokensText);
          console.log("Solscan tokens data:", tokensData);

          if (Array.isArray(tokensData)) {
            for (const t of tokensData) {
              const tokenAddress = t.tokenAddress || t.mint || "";
              const decimals = t.tokenDecimals || t.decimals || 0;
              const rawAmount = Number(t.tokenAmount?.amount || t.amount || 0);
              const uiAmount = t.tokenAmount?.uiAmount || rawAmount / Math.pow(10, decimals);
              const isMemecoin = !!MEMECOIN_MINTS[tokenAddress];

              if (uiAmount > 0) {
                tokens.push({
                  symbol: t.tokenSymbol || t.symbol || MEMECOIN_MINTS[tokenAddress] || tokenAddress.slice(0, 4) + "...",
                  name: t.tokenName || t.name || "Token",
                  amount: uiAmount,
                  decimals,
                  usdValue: 0,
                  mint: tokenAddress,
                  isMemecoin,
                  logoUrl: t.tokenIcon || t.icon,
                });
              }
            }
          }
        } catch (e) {
          console.log("Failed to parse tokens data:", e);
        }
      }
    }

    console.log("Parsed SOL balance:", solBalance, "tokens:", tokens.length);

    // Fetch prices for tokens from Jupiter
    if (tokens.length > 0) {
      const mints = tokens.map(t => t.mint).filter(m => m);
      const prices = await fetchTokenPrices(mints);

      for (const token of tokens) {
        const price = prices[token.mint] || 0;
        token.usdValue = token.amount * price;
      }
    }

    // Sort by USD value
    tokens.sort((a, b) => b.usdValue - a.usdValue);

    return { solBalance, tokens };
  } catch (error) {
    console.error("Solscan fetch error:", error);
    return { solBalance: 0, tokens: [] };
  }
}

// Fetch NFTs from Helius DAS API
async function fetchNFTsFromHelius(address: string): Promise<NFTHolding[]> {
  if (!HELIUS_API_KEY) return [];

  try {
    const assetsRes = await fetch(`https://mainnet.helius-rpc.com/?api-key=${HELIUS_API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: "walletspy",
        method: "getAssetsByOwner",
        params: {
          ownerAddress: address,
          page: 1,
          limit: 100,
          displayOptions: {
            showFungible: false,
            showNativeBalance: false,
          },
        },
      }),
    });

    const assetsData = await assetsRes.json();
    const items = assetsData.result?.items || [];

    return items
      .filter((item: { interface: string }) =>
        item.interface === "V1_NFT" || item.interface === "ProgrammableNFT"
      )
      .slice(0, 20)
      .map((n: {
        content?: { metadata?: { name?: string }; links?: { image?: string } };
        grouping?: Array<{ group_value?: string }>;
        id: string;
      }) => ({
        name: n.content?.metadata?.name || "Unknown NFT",
        collection: n.grouping?.[0]?.group_value || "Unknown Collection",
        image: n.content?.links?.image,
        mint: n.id,
      }));
  } catch (e) {
    console.error("NFT fetch error:", e);
    return [];
  }
}

// Helius balance fetcher with proper token detection using DAS API
async function fetchFromHelius(address: string, solPrice: number): Promise<{
  solBalance: number;
  tokens: TokenHolding[];
  nfts: NFTHolding[];
}> {
  try {
    console.log("Helius API call for:", address);

    // Use DAS API which returns full metadata and prices for fungible tokens
    const assetsRes = await fetch(`https://mainnet.helius-rpc.com/?api-key=${HELIUS_API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: "walletspy",
        method: "getAssetsByOwner",
        params: {
          ownerAddress: address,
          page: 1,
          limit: 1000,
          displayOptions: {
            showFungible: true,
            showNativeBalance: true,
          },
        },
      }),
    });

    const assetsData = await assetsRes.json();
    console.log("Helius DAS response:", assetsData);

    const items = assetsData.result?.items || [];
    const nativeBalance = assetsData.result?.nativeBalance;

    // Get SOL balance
    const solBalance = nativeBalance?.lamports ? nativeBalance.lamports / 1e9 : 0;
    console.log("SOL balance:", solBalance);

    // Process fungible tokens from DAS API
    const fungibleTokens = items.filter((item: { interface: string }) =>
      item.interface === "FungibleToken" || item.interface === "FungibleAsset"
    );

    console.log("Fungible tokens found:", fungibleTokens.length);

    // Get mints for tokens without price info to fetch from Jupiter
    const mintsNeedingPrices: string[] = [];

    const tokens: TokenHolding[] = fungibleTokens.map((token: {
      id: string;
      content?: {
        metadata?: { name?: string; symbol?: string };
        links?: { image?: string };
      };
      token_info?: {
        balance?: number;
        decimals?: number;
        price_info?: {
          price_per_token?: number;
          total_price?: number;
          currency?: string;
        };
        symbol?: string;
      };
    }) => {
      const mint = token.id;
      const tokenInfo = token.token_info;
      const metadata = token.content?.metadata;

      const decimals = tokenInfo?.decimals || 9;
      const rawBalance = tokenInfo?.balance || 0;
      const amount = rawBalance / Math.pow(10, decimals);

      // Get price from DAS API if available
      const pricePerToken = tokenInfo?.price_info?.price_per_token || 0;
      const totalPrice = tokenInfo?.price_info?.total_price || (amount * pricePerToken);

      // If no price info, add to list to fetch from Jupiter
      if (!pricePerToken && amount > 0) {
        mintsNeedingPrices.push(mint);
      }

      const symbol = tokenInfo?.symbol || metadata?.symbol || KNOWN_TOKENS[mint]?.symbol || MEMECOIN_MINTS[mint] || mint.slice(0, 6) + "...";
      const name = metadata?.name || KNOWN_TOKENS[mint]?.name || symbol;
      const knownToken = KNOWN_TOKENS[mint];
      const isMemecoin = knownToken?.isMemecoin || !!MEMECOIN_MINTS[mint];

      return {
        symbol,
        name,
        amount,
        decimals,
        usdValue: totalPrice,
        mint,
        isMemecoin,
        logoUrl: token.content?.links?.image,
      };
    });

    // Fetch prices from Jupiter for tokens without price info
    if (mintsNeedingPrices.length > 0) {
      console.log("Fetching prices from Jupiter for", mintsNeedingPrices.length, "tokens");
      const jupiterPrices = await fetchTokenPrices(mintsNeedingPrices.slice(0, 100)); // Jupiter has a limit

      for (const token of tokens) {
        if (token.usdValue === 0 && jupiterPrices[token.mint]) {
          token.usdValue = token.amount * jupiterPrices[token.mint];
        }
      }
    }

    // Filter out zero amounts and sort by USD value (highest first)
    const filteredTokens = tokens
      .filter(t => t.amount > 0)
      .sort((a, b) => b.usdValue - a.usdValue);

    const totalValue = filteredTokens.reduce((s, t) => s + t.usdValue, 0);
    console.log("Processed tokens:", filteredTokens.length, "Total value:", totalValue);

    // Get NFTs from DAS response
    const nfts: NFTHolding[] = items
      .filter((item: { interface: string }) =>
        item.interface === "V1_NFT" || item.interface === "ProgrammableNFT"
      )
      .slice(0, 20)
      .map((n: {
        content?: { metadata?: { name?: string }; links?: { image?: string } };
        grouping?: Array<{ group_value?: string }>;
        id: string;
      }) => ({
        name: n.content?.metadata?.name || "Unknown NFT",
        collection: n.grouping?.[0]?.group_value || "Unknown Collection",
        image: n.content?.links?.image,
        mint: n.id,
      }));

    return { solBalance, tokens: filteredTokens, nfts };
  } catch (error) {
    console.error("Helius fetch error:", error);
    return { solBalance: 0, tokens: [], nfts: [] };
  }
}

// Fetch token approvals (delegates) for the wallet
async function fetchTokenApprovals(address: string, tokens: TokenHolding[]): Promise<TokenApproval[]> {
  if (!HELIUS_API_KEY) return [];

  try {
    console.log("Fetching token approvals for:", address);

    // Use Helius RPC to get token accounts with program details
    const response = await fetch(`https://mainnet.helius-rpc.com/?api-key=${HELIUS_API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: "walletspy-approvals",
        method: "getTokenAccountsByOwner",
        params: [
          address,
          { programId: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA" },
          { encoding: "jsonParsed" }
        ]
      }),
    });

    if (!response.ok) {
      console.log("Token accounts fetch failed:", response.status);
      return [];
    }

    const data = await response.json();
    const tokenAccounts = data.result?.value || [];

    console.log("Token accounts found:", tokenAccounts.length);

    const approvals: TokenApproval[] = [];

    for (const account of tokenAccounts) {
      const parsed = account.account?.data?.parsed?.info;
      if (!parsed) continue;

      // Check if there's a delegate (approval)
      if (parsed.delegate && parsed.delegatedAmount) {
        const delegatedAmount = parsed.delegatedAmount?.uiAmount ||
          Number(parsed.delegatedAmount?.amount || 0) / Math.pow(10, parsed.tokenAmount?.decimals || 9);

        if (delegatedAmount > 0) {
          const mint = parsed.mint;
          const decimals = parsed.tokenAmount?.decimals || 9;

          // Find token info from our tokens list
          const tokenInfo = tokens.find(t => t.mint === mint);
          const knownToken = KNOWN_TOKENS[mint];

          // Check if approval is unlimited (very large amount)
          const maxUint64 = 18446744073709551615;
          const isUnlimited = Number(parsed.delegatedAmount?.amount || 0) > maxUint64 * 0.9;

          approvals.push({
            tokenSymbol: tokenInfo?.symbol || knownToken?.symbol || mint.slice(0, 6) + "...",
            tokenName: tokenInfo?.name || knownToken?.name || "Unknown Token",
            tokenMint: mint,
            tokenLogoUrl: tokenInfo?.logoUrl,
            spender: parsed.delegate,
            spenderLabel: KNOWN_PROTOCOLS[parsed.delegate] || CEX_ADDRESSES[parsed.delegate],
            approvedAmount: delegatedAmount,
            tokenDecimals: decimals,
            isUnlimited,
            usdValue: tokenInfo ? delegatedAmount * (tokenInfo.usdValue / tokenInfo.amount) : undefined,
          });
        }
      }
    }

    console.log("Token approvals found:", approvals.length);
    return approvals;
  } catch (error) {
    console.error("Error fetching token approvals:", error);
    return [];
  }
}

async function fetchEnrichedTransactions(address: string): Promise<{
  signature: string;
  timestamp: number;
  type: string;
  source?: string;
  description?: string;
  fee: number;
  nativeTransfers?: Array<{ amount: number; fromUserAccount: string; toUserAccount: string }>;
  tokenTransfers?: Array<{ mint: string; fromUserAccount: string; toUserAccount: string; tokenAmount: number }>;
}[]> {
  if (!HELIUS_API_KEY) return [];

  try {
    const res = await fetch(
      `https://api.helius.xyz/v0/addresses/${address}/transactions?api-key=${HELIUS_API_KEY}&limit=100`
    );

    if (!res.ok) return [];
    return await res.json();
  } catch {
    return [];
  }
}

// Fetch total transaction count and first activity from signatures
async function fetchWalletStats(address: string): Promise<{
  totalSignatures: number;
  firstActivityTimestamp: number | null;
}> {
  if (!HELIUS_API_KEY) return { totalSignatures: 0, firstActivityTimestamp: null };

  try {
    // Get total count using RPC getSignaturesForAddress
    const countRes = await fetch(`https://mainnet.helius-rpc.com/?api-key=${HELIUS_API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: "walletspy-count",
        method: "getSignaturesForAddress",
        params: [address, { limit: 1000 }]
      }),
    });

    if (!countRes.ok) return { totalSignatures: 0, firstActivityTimestamp: null };

    const countData = await countRes.json();
    const signatures = countData.result || [];
    const totalSignatures = signatures.length;

    // Get the oldest signature's timestamp from this batch
    let firstActivityTimestamp: number | null = null;
    if (signatures.length > 0) {
      // The last signature in the array is the oldest
      const oldestSig = signatures[signatures.length - 1];
      firstActivityTimestamp = oldestSig.blockTime || null;
    }

    return { totalSignatures, firstActivityTimestamp };
  } catch (error) {
    console.error("Error fetching wallet stats:", error);
    return { totalSignatures: 0, firstActivityTimestamp: null };
  }
}

function analyzeTransactions(
  transactions: {
    signature: string;
    timestamp: number;
    type: string;
    source?: string;
    nativeTransfers?: Array<{ amount: number; fromUserAccount: string; toUserAccount: string }>;
    tokenTransfers?: Array<{ mint: string; fromUserAccount: string; toUserAccount: string; tokenAmount: number }>;
  }[],
  userAddress: string
) {
  let swapCount = 0;
  let transferCount = 0;
  let tradingVolume = 0;
  let cexInteractions = 0;
  const cexNamesSet = new Set<string>();
  const tokenSet = new Set<string>();
  const protocolSet = new Set<string>();
  const addressCounts: Record<string, number> = {};
  const connectedWalletSet = new Set<string>();
  let firstActivity: number | null = null;
  let lastActivity: number | null = null;
  let maxIn = 0;
  let maxOut = 0;

  for (const tx of transactions) {
    // Track timestamps
    if (!firstActivity || tx.timestamp < firstActivity) firstActivity = tx.timestamp;
    if (!lastActivity || tx.timestamp > lastActivity) lastActivity = tx.timestamp;

    // Count transaction types
    const txType = tx.type?.toUpperCase() || "";
    const source = tx.source?.toUpperCase() || "";

    if (txType.includes("SWAP") || source.includes("JUPITER") || source.includes("RAYDIUM")) {
      swapCount++;
    } else if (txType.includes("TRANSFER")) {
      transferCount++;
    }

    // Track native transfers
    if (tx.nativeTransfers) {
      for (const transfer of tx.nativeTransfers) {
        const amount = Math.abs(transfer.amount) / 1e9;
        tradingVolume += amount;

        // Track biggest trades
        if (transfer.amount > 0 && amount > maxIn) maxIn = amount;
        if (transfer.amount < 0 && amount > maxOut) maxOut = amount;

        // Track connected wallets
        const otherAddress = transfer.fromUserAccount === userAddress
          ? transfer.toUserAccount
          : transfer.fromUserAccount;

        if (otherAddress && otherAddress !== userAddress) {
          connectedWalletSet.add(otherAddress);
          addressCounts[otherAddress] = (addressCounts[otherAddress] || 0) + 1;

          // Check for CEX
          if (CEX_ADDRESSES[otherAddress]) {
            cexInteractions++;
            cexNamesSet.add(CEX_ADDRESSES[otherAddress]);
            protocolSet.add(CEX_ADDRESSES[otherAddress] + " (CEX)");
          }

          // Check for DeFi protocols
          if (KNOWN_PROTOCOLS[otherAddress]) {
            protocolSet.add(KNOWN_PROTOCOLS[otherAddress]);
          }
        }
      }
    }

    // Track tokens
    if (tx.tokenTransfers) {
      for (const transfer of tx.tokenTransfers) {
        tokenSet.add(transfer.mint);
      }
    }
  }

  // Get top addresses
  const topAddresses = Object.entries(addressCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([address, count]) => ({
      address,
      count,
      label: KNOWN_PROTOCOLS[address] || CEX_ADDRESSES[address],
    }));

  return {
    swapCount,
    transferCount,
    tradingVolume,
    uniqueTokens: tokenSet.size,
    protocolsUsed: Array.from(protocolSet),
    topAddresses,
    connectedWallets: Array.from(connectedWalletSet),
    firstActivity,
    lastActivity,
    cexInteractions,
    cexNames: Array.from(cexNamesSet),
    biggestWin: maxIn > 0 ? { token: "SOL", amount: maxIn } : null,
    biggestLoss: maxOut > 0 ? { token: "SOL", amount: maxOut } : null,
  };
}

function calculateDegenScore(memecoinCount: number, totalTokens: number, swapCount: number): number {
  let score = 0;

  if (totalTokens > 0) {
    score += Math.min(40, (memecoinCount / totalTokens) * 100);
  }

  score += Math.min(30, swapCount * 2);
  score += memecoinCount * 3;

  return Math.min(100, Math.round(score));
}

function calculateSurveillanceScore(metrics: {
  totalTransactions: number;
  memecoinCount: number;
  tokenCount: number;
  nftCount: number;
  netWorth: number;
  swapCount: number;
  uniqueTokens: number;
  cexInteractions: number;
  connectedWalletsCount: number;
}): number {
  let score = 15; // Base - everyone has some exposure

  // Transaction activity (more txs = more data points)
  score += Math.min(20, Math.floor(metrics.totalTransactions / 5));

  // Token diversity (reveals trading interests)
  score += Math.min(10, metrics.tokenCount * 1.5);

  // NFT holdings (often linked to identity)
  score += Math.min(10, metrics.nftCount * 2);

  // Memecoin activity (high-profile tracking)
  score += Math.min(10, metrics.memecoinCount * 2);

  // CEX interactions (CRITICAL - KYC linkage!)
  score += Math.min(20, metrics.cexInteractions * 5);

  // Connected wallets (clustering risk)
  score += Math.min(10, Math.floor(metrics.connectedWalletsCount / 3));

  // Net worth visibility
  if (metrics.netWorth > 10000) score += 5;
  if (metrics.netWorth > 100000) score += 5;

  return Math.min(100, Math.round(score));
}

function detectPrivacyMistakes(
  transactions: { timestamp: number; type?: string; source?: string }[],
  address: string,
  tokens: TokenHolding[],
  nfts: NFTHolding[],
  cexInteractions: number,
  netWorth: number,
  connectedWalletsCount: number
): PrivacyMistake[] {
  const mistakes: PrivacyMistake[] = [];

  // CRITICAL: CEX interactions
  if (cexInteractions > 0) {
    mistakes.push({
      type: "cex_linkage",
      description: `${cexInteractions} transactions with centralized exchanges detected. Your wallet is likely linked to your KYC identity.`,
      severity: "critical",
      recommendation: "Use encrypt.trade to break the on-chain link between your CEX withdrawals and DeFi activity.",
    });
  }

  // High transaction volume
  if (transactions.length > 50) {
    mistakes.push({
      type: "high_activity",
      description: `${transactions.length} transactions create a detailed behavioral profile that can be analyzed.`,
      severity: "high",
      recommendation: "Use encrypt.trade for sensitive transactions to prevent pattern analysis.",
    });
  }

  // Wallet clustering
  if (connectedWalletsCount > 10) {
    mistakes.push({
      type: "wallet_clustering",
      description: `Connected to ${connectedWalletsCount} other wallets. Clustering analysis can link all these identities.`,
      severity: "high",
      recommendation: "Break wallet links using encrypt.trade's private transfers.",
    });
  }

  // Timing patterns
  if (transactions.length > 10) {
    const hours = transactions.map(t => new Date(t.timestamp * 1000).getHours());
    const hourCounts: Record<number, number> = {};
    hours.forEach(h => hourCounts[h] = (hourCounts[h] || 0) + 1);
    const maxHourCount = Math.max(...Object.values(hourCounts));

    if (maxHourCount > transactions.length * 0.3) {
      mistakes.push({
        type: "timing_pattern",
        description: "You trade at predictable times. This reveals your timezone and daily routine.",
        severity: "medium",
        recommendation: "Vary transaction times or use encrypt.trade's delayed execution.",
      });
    }
  }

  // Large visible holdings
  if (netWorth > 10000) {
    mistakes.push({
      type: "visible_wealth",
      description: `$${netWorth.toLocaleString()} in visible assets makes you a target for phishing and social engineering.`,
      severity: "high",
      recommendation: "Hide your balance using encrypt.trade's encrypted token holdings.",
    });
  }

  // Token diversity
  if (tokens.length > 10) {
    mistakes.push({
      type: "token_diversity",
      description: `Holding ${tokens.length} tokens reveals your trading interests and investment thesis.`,
      severity: "medium",
      recommendation: "Consolidate or use separate wallets for different strategies.",
    });
  }

  // NFT exposure
  if (nfts.length > 3) {
    mistakes.push({
      type: "nft_exposure",
      description: `${nfts.length} NFTs are publicly visible. NFT holdings often correlate with social media profiles.`,
      severity: "medium",
      recommendation: "NFT collections can be cross-referenced with Twitter/Discord to identify you.",
    });
  }

  // Round number transactions (common mistake)
  mistakes.push({
    type: "amount_patterns",
    description: "Round number transactions (1 SOL, 10 SOL) are easier to trace than random amounts.",
    severity: "low",
    recommendation: "Use non-round amounts or encrypt.trade to hide transaction values.",
  });

  // Always add base warning
  mistakes.push({
    type: "public_ledger",
    description: "Every transaction is permanently recorded. Blockchain data is forever.",
    severity: "critical",
    recommendation: "Visit encrypt.trade to learn about selective privacy for your DeFi transactions.",
  });

  return mistakes.sort((a, b) => {
    const severityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
    return severityOrder[a.severity] - severityOrder[b.severity];
  });
}

interface AIRoastInput {
  address: string;
  netWorth: number;
  solBalance: number;
  totalTransactions: number;
  tokenCount: number;
  nftCount: number;
  memecoinCount: number;
  degenScore: number;
  swapCount: number;
  transferCount: number;
  tradingVolume: number;
  walletAge: string;
  activityPattern: string;
  protocolsUsed: string[];
  biggestWin: { token: string; amount: number } | null;
  biggestLoss: { token: string; amount: number } | null;
  topTokens: string[];
  cexInteractions: number;
}

async function generateAIRoast(data: AIRoastInput): Promise<{
  roast: string;
  personality: string;
  verdict: string;
}> {
  try {
    const response = await fetch("/api/roast", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) throw new Error("API failed");
    return await response.json();
  } catch {
    return {
      roast: getFallbackRoast(data),
      personality: getFallbackPersonality(data),
      verdict: getFallbackVerdict(data),
    };
  }
}

function getFallbackRoast(data: AIRoastInput): string {
  if (data.cexInteractions > 3) {
    return ROAST_TEMPLATES.cexUser[Math.floor(Math.random() * ROAST_TEMPLATES.cexUser.length)];
  }
  if (data.degenScore > 70 || data.memecoinCount > 10) {
    return ROAST_TEMPLATES.highDegen[Math.floor(Math.random() * ROAST_TEMPLATES.highDegen.length)];
  }
  if (data.netWorth > 10000) {
    return ROAST_TEMPLATES.whale[Math.floor(Math.random() * ROAST_TEMPLATES.whale.length)];
  }
  if (data.totalTransactions < 5) {
    return ROAST_TEMPLATES.newbie[Math.floor(Math.random() * ROAST_TEMPLATES.newbie.length)];
  }
  return ROAST_TEMPLATES.default[Math.floor(Math.random() * ROAST_TEMPLATES.default.length)];
}

function getFallbackPersonality(data: AIRoastInput): string {
  if (data.cexInteractions > 5) return "The KYC'd Degen";
  if (data.degenScore > 80) return "The Memecoin Maniac";
  if (data.degenScore > 60) return "Certified Degen";
  if (data.netWorth > 50000) return "The Exposed Whale";
  if (data.swapCount > 100) return "The Swap Addict";
  if (data.nftCount > 20) return "NFT Hoarder";
  if (data.totalTransactions < 10) return "The Ghost";
  return "The Average Degen";
}

function getFallbackVerdict(data: AIRoastInput): string {
  if (data.cexInteractions > 5) return "IRS has entered the chat 🏦";
  if (data.degenScore > 80) return "Professional exit liquidity";
  if (data.netWorth > 50000) return "Whale watching in progress 🐋";
  if (data.memecoinCount > 10) return "Certified bag holder";
  return "Standard blockchain citizen";
}

function calculateWalletAge(firstActivity: number): string {
  const now = Date.now() / 1000;
  const diff = now - firstActivity;
  const days = Math.floor(diff / 86400);

  if (days < 1) return "Less than a day";
  if (days === 1) return "1 day";
  if (days < 7) return `${days} days`;
  if (days < 30) {
    const weeks = Math.floor(days / 7);
    return weeks === 1 ? "1 week" : `${weeks} weeks`;
  }
  if (days < 365) {
    const months = Math.floor(days / 30);
    return months === 1 ? "1 month" : `${months} months`;
  }
  const years = days / 365;
  if (years < 2) {
    const wholeYears = Math.floor(years);
    const remainingMonths = Math.floor((days % 365) / 30);
    if (remainingMonths === 0) return wholeYears === 1 ? "1 year" : `${wholeYears} years`;
    return `1 year ${remainingMonths} ${remainingMonths === 1 ? "month" : "months"}`;
  }
  return `${years.toFixed(1)} years`;
}

function determineActivityPattern(transactions: { timestamp: number }[]): string {
  if (transactions.length < 5) return "Minimal activity";

  const now = Date.now() / 1000;
  const recentTxs = transactions.filter(t => now - t.timestamp < 7 * 86400).length;

  if (recentTxs > 20) return "Very active (daily trader)";
  if (recentTxs > 5) return "Active (regular user)";
  if (recentTxs > 0) return "Moderate (occasional user)";
  return "Dormant (no recent activity)";
}

function getMockAnalysis(address: string): WalletAnalysis {
  const hash = address.split("").reduce((a, b) => {
    a = ((a << 5) - a) + b.charCodeAt(0);
    return a & a;
  }, 0);

  const score = Math.abs(hash % 50) + 40;
  const degenScore = Math.abs(hash % 60) + 20;

  return {
    address,
    surveillanceScore: score,
    netWorth: Math.abs(hash % 10000),
    solBalance: Math.abs(hash % 100),
    totalTransactions: Math.abs(hash % 500) + 10,
    tokenCount: Math.abs(hash % 20) + 1,
    nftCount: Math.abs(hash % 15),
    memecoinCount: Math.abs(hash % 10),
    biggestLoss: { token: "BONK", amount: Math.abs(hash % 500) },
    biggestWin: { token: "SOL", amount: Math.abs(hash % 1000) },
    connectedWallets: ["7xKX...m9Qz", "3jPr...k2Wv", "9mNb...p5Xt"],
    socialMentions: [{ platform: "Twitter", found: false }],
    degenScore,
    privacyMistakes: [
      { type: "public_ledger", description: "All transactions are public.", severity: "critical", recommendation: "Use encrypt.trade for private transactions." },
    ],
    recentActivity: [],
    tokens: [],
    nfts: [],
    firstActivityDate: Date.now() / 1000 - 86400 * 30,
    lastActivityDate: Date.now() / 1000,
    protocolsUsed: ["Jupiter", "Raydium"],
    tradingVolume: Math.abs(hash % 1000),
    uniqueTokensTraded: Math.abs(hash % 20),
    swapCount: Math.abs(hash % 50),
    transferCount: Math.abs(hash % 100),
    ropiast: ROAST_TEMPLATES.default[0],
    personality: "The Mystery Trader",
    verdict: "Needs more investigation",
    riskLevel: score >= 70 ? "high" : score >= 50 ? "medium" : "low",
    walletAge: "3 months",
    activityPattern: "Active (regular user)",
    topInteractedAddresses: [],
    cexInteractions: 0,
    cexNames: [],
    approvals: [],
    // New features for hackathon
    socialProfiles: [
      { platform: "sns", found: false },
      { platform: "alldomains", found: false },
      { platform: "backpack", found: false },
    ],
    memecoinPnL: {
      totalInvested: Math.abs(hash % 5000),
      currentValue: Math.abs(hash % 3000),
      realizedPnL: Math.abs(hash % 1000) - 500,
      unrealizedPnL: Math.abs(hash % 500) - 250,
      totalPnL: Math.abs(hash % 1500) - 750,
      percentageChange: Math.abs(hash % 100) - 50,
      trades: [],
    },
    incomeSources: [
      { type: "p2p_transfer", label: "P2P Transfers", amount: Math.abs(hash % 1000), percentage: 40, count: 5 },
      { type: "defi_yield", label: "DeFi Yields", amount: Math.abs(hash % 500), percentage: 30, count: 10 },
      { type: "airdrop", label: "Airdrops", amount: Math.abs(hash % 300), percentage: 20, count: 3 },
    ],
    privacyProtocolMisuse: [],
  };
}
