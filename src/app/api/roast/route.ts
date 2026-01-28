import { NextRequest, NextResponse } from "next/server";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || "";

interface WalletData {
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
  biggestWin?: { token: string; amount: number } | null;
  biggestLoss?: { token: string; amount: number } | null;
  topTokens?: string[];
}

export async function POST(request: NextRequest) {
  try {
    const walletData: WalletData = await request.json();

    if (!GEMINI_API_KEY) {
      return NextResponse.json({
        roast: getRandomFallbackRoast(walletData),
        personality: getBasicPersonality(walletData),
        verdict: getBasicVerdict(walletData),
      });
    }

    const prompt = buildPrompt(walletData);

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }],
            },
          ],
          generationConfig: {
            temperature: 0.9,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 500,
          },
        }),
      }
    );

    if (!response.ok) {
      console.error("Gemini API error:", response.status);
      return NextResponse.json({
        roast: getRandomFallbackRoast(walletData),
        personality: getBasicPersonality(walletData),
        verdict: getBasicVerdict(walletData),
      });
    }

    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "";

    // Parse the AI response
    const parsed = parseAIResponse(text, walletData);

    return NextResponse.json(parsed);
  } catch (error) {
    console.error("Roast API error:", error);
    return NextResponse.json({
      roast: "Your wallet is so exposed, even privacy coins are embarrassed for you. 💀",
      personality: "The Mystery Trader",
      verdict: "Needs investigation",
    });
  }
}

function buildPrompt(data: WalletData): string {
  const tokenList = data.topTokens?.join(", ") || "various tokens";

  return `You are a savage, witty crypto roast master for WalletSpy.lol. Analyze this Solana wallet and create a BRUTAL but funny roast.

WALLET DATA:
- Net Worth: $${data.netWorth.toFixed(2)}
- SOL Balance: ${data.solBalance.toFixed(4)} SOL
- Total Transactions: ${data.totalTransactions}
- Tokens Held: ${data.tokenCount} (${data.memecoinCount} are memecoins)
- NFTs: ${data.nftCount}
- Degen Score: ${data.degenScore}%
- Swaps: ${data.swapCount}
- Transfers: ${data.transferCount}
- Trading Volume: $${data.tradingVolume.toFixed(2)}
- Wallet Age: ${data.walletAge}
- Activity: ${data.activityPattern}
- Protocols Used: ${data.protocolsUsed.join(", ") || "None detected"}
- Top Tokens: ${tokenList}
${data.biggestWin ? `- Biggest Win: $${data.biggestWin.amount.toFixed(2)} in ${data.biggestWin.token}` : ""}
${data.biggestLoss ? `- Biggest Loss: $${data.biggestLoss.amount.toFixed(2)} in ${data.biggestLoss.token}` : ""}

Generate a response in EXACTLY this format (include the labels):

ROAST: [A savage 2-3 sentence roast that's funny and specific to their wallet behavior. Reference their actual stats. Be creative and brutal but not mean-spirited. Use dark humor and crypto culture references.]

PERSONALITY: [A funny 2-4 word personality type like "The Panic Seller", "Diamond Hands Degen", "NFT Hoarder Supreme", "The Exit Liquidity", "Paper Hands Pete", "The Memecoin Graveyard Keeper", etc.]

VERDICT: [A one-line final verdict on their wallet, like "Certified bag holder", "Professional loss maker", "Actually kinda based", "Touch grass immediately", etc.]

Be specific to their data. If they have lots of memecoins, roast that. If they're a whale, roast that. If they're inactive, roast that. Make it personal and funny!`;
}

function parseAIResponse(
  text: string,
  walletData: WalletData
): { roast: string; personality: string; verdict: string } {
  // Try to extract sections
  const roastMatch = text.match(/ROAST:\s*(.+?)(?=PERSONALITY:|$)/s);
  const personalityMatch = text.match(/PERSONALITY:\s*(.+?)(?=VERDICT:|$)/s);
  const verdictMatch = text.match(/VERDICT:\s*(.+?)$/s);

  const roast = roastMatch?.[1]?.trim() || getRandomFallbackRoast(walletData);
  const personality = personalityMatch?.[1]?.trim() || getBasicPersonality(walletData);
  const verdict = verdictMatch?.[1]?.trim() || getBasicVerdict(walletData);

  // Clean up any asterisks or markdown
  return {
    roast: roast.replace(/\*\*/g, "").replace(/\*/g, "").slice(0, 500),
    personality: personality.replace(/\*\*/g, "").replace(/\*/g, "").slice(0, 50),
    verdict: verdict.replace(/\*\*/g, "").replace(/\*/g, "").slice(0, 100),
  };
}

function getRandomFallbackRoast(data: WalletData): string {
  const roasts = [];

  if (data.degenScore > 70) {
    roasts.push(
      `${data.memecoinCount} memecoins? Your portfolio looks like a crypto petting zoo that nobody visits anymore. 🐕`,
      `You've aped into so many memecoins, even Bonk is concerned about your financial decisions. 🦴`,
      `Your wallet is ${data.degenScore}% degen. That's not a flex, that's a cry for help. 📞`
    );
  }

  if (data.netWorth > 10000) {
    roasts.push(
      `$${data.netWorth.toFixed(0)} in a hot wallet? Hackers are literally sending each other your address as a birthday gift. 🎁`,
      `You're basically a walking ATM machine on the blockchain. Nice flex though. 💰`
    );
  }

  if (data.totalTransactions < 10) {
    roasts.push(
      `${data.totalTransactions} transactions? Even your wallet is asking "are we there yet?" 🚗`,
      `Your wallet has less activity than a ghost town. Did you buy high and just... give up? 👻`
    );
  }

  if (data.swapCount > 50) {
    roasts.push(
      `${data.swapCount} swaps? You're not trading, you're just donating fees to validators. 💸`,
      `Jupiter should send you a thank you card for all those swap fees. You're basically their angel investor. 🪐`
    );
  }

  if (data.nftCount > 10) {
    roasts.push(
      `${data.nftCount} NFTs and probably none of them are worth the gas you paid. Modern art collector moment. 🖼️`
    );
  }

  if (roasts.length === 0) {
    roasts.push(
      "Your wallet is so transparent, even your future mistakes are already on the blockchain. 🔮",
      "Every transaction you make is recorded forever. Your grandkids will see you bought BONK at the top. 📜",
      "Privacy? Never heard of her. Your wallet is more exposed than a Vegas billboard. 🎰"
    );
  }

  return roasts[Math.floor(Math.random() * roasts.length)];
}

function getBasicPersonality(data: WalletData): string {
  if (data.degenScore > 80) return "The Memecoin Maniac";
  if (data.degenScore > 60) return "Certified Degen";
  if (data.netWorth > 50000) return "The Whale Watcher";
  if (data.netWorth > 10000) return "The Bag Holder";
  if (data.swapCount > 100) return "The Swap Addict";
  if (data.nftCount > 20) return "NFT Hoarder";
  if (data.totalTransactions < 10) return "The Ghost";
  if (data.totalTransactions > 200) return "The Hyperactive Trader";
  return "The Average Joe";
}

function getBasicVerdict(data: WalletData): string {
  if (data.degenScore > 80) return "Professional exit liquidity provider 💀";
  if (data.netWorth > 50000) return "Actually winning (for now)";
  if (data.memecoinCount > 10) return "Certified bag holder since 2024";
  if (data.totalTransactions < 5) return "Did you forget your seed phrase?";
  if (data.swapCount > 50) return "Jupiter's favorite customer";
  return "Standard blockchain citizen";
}
