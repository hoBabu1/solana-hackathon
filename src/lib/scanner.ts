import { WalletAnalysis, PrivacyMistake, Transaction, TokenHolding, NFTHolding } from "@/types";

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

// Privacy-related protocols
const PRIVACY_PROTOCOLS: Record<string, string> = {
  "enc1pher...": "Encifher/encrypt.trade",
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
    const [balanceData, enrichedTxData] = await Promise.all([
      fetchBalancesWithPrices(address, solPrice),
      fetchEnrichedTransactions(address),
    ]);

    const tokens = balanceData.tokens || [];
    const nfts = balanceData.nfts || [];
    const solBalance = balanceData.solBalance;

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

    // Enhanced surveillance score calculation
    const surveillanceScore = calculateSurveillanceScore({
      totalTransactions: enrichedTxData.length,
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

    // Calculate wallet age
    const walletAge = txAnalysis.firstActivity
      ? calculateWalletAge(txAnalysis.firstActivity)
      : "Unknown";

    // Determine activity pattern
    const activityPattern = determineActivityPattern(enrichedTxData);

    // Get AI-generated roast
    const aiResponse = await generateAIRoast({
      address,
      netWorth,
      solBalance,
      totalTransactions: enrichedTxData.length,
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
      totalTransactions: enrichedTxData.length,
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
      firstActivityDate: txAnalysis.firstActivity,
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

// Helius balance fetcher with proper token detection
async function fetchFromHelius(address: string, solPrice: number): Promise<{
  solBalance: number;
  tokens: TokenHolding[];
  nfts: NFTHolding[];
}> {
  try {
    console.log("Helius API call for:", address);

    const [balanceRes, assetsRes] = await Promise.all([
      fetch(`https://api.helius.xyz/v0/addresses/${address}/balances?api-key=${HELIUS_API_KEY}`),
      fetch(`https://mainnet.helius-rpc.com/?api-key=${HELIUS_API_KEY}`, {
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
              showFungible: true,
              showNativeBalance: true,
            },
          },
        }),
      }),
    ]);

    const balanceData = await balanceRes.json();
    console.log("Helius balance data:", balanceData);

    const solBalance = (balanceData.nativeBalance || 0) / 1e9;
    console.log("SOL balance:", solBalance);

    // Get token mints for price lookup
    const tokenList = balanceData.tokens || [];
    console.log("Helius tokens:", tokenList);

    const tokenMints = tokenList.map((t: { mint: string }) => t.mint);

    // Add SOL mint for price lookup
    const allMints = [...tokenMints, "So11111111111111111111111111111111111111112"];
    const prices = await fetchTokenPrices(allMints);
    console.log("Token prices:", prices);

    // Process tokens with prices
    const tokens: TokenHolding[] = tokenList.map((t: {
      mint: string;
      amount: number;
      decimals: number;
    }) => {
      const decimals = t.decimals || 9;
      const amount = t.amount / Math.pow(10, decimals);
      const price = prices[t.mint] || 0;
      const knownToken = KNOWN_TOKENS[t.mint];
      const isMemecoin = knownToken?.isMemecoin || !!MEMECOIN_MINTS[t.mint];

      return {
        symbol: knownToken?.symbol || MEMECOIN_MINTS[t.mint] || t.mint.slice(0, 6) + "...",
        name: knownToken?.name || MEMECOIN_MINTS[t.mint] || "Unknown Token",
        amount,
        decimals,
        usdValue: amount * price,
        mint: t.mint,
        isMemecoin,
        logoUrl: undefined,
      };
    });

    // Filter out zero amounts and sort by value
    const filteredTokens = tokens
      .filter(t => t.amount > 0)
      .sort((a, b) => b.usdValue - a.usdValue);

    console.log("Processed tokens:", filteredTokens.length, "Total value:", filteredTokens.reduce((s, t) => s + t.usdValue, 0));

    // Get NFTs from DAS response
    let nfts: NFTHolding[] = [];
    try {
      const assetsData = await assetsRes.json();
      const items = assetsData.result?.items || [];

      nfts = items
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
    }

    return { solBalance, tokens, nfts };
  } catch (error) {
    console.error("Helius fetch error:", error);
    return { solBalance: 0, tokens: [], nfts: [] };
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
  if (days < 30) return `${days} days`;
  if (days < 365) return `${Math.floor(days / 30)} months`;
  return `${(days / 365).toFixed(1)} years`;
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
  };
}
