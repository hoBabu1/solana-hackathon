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
      `Your wallet is ${data.degenScore}% degen. That's not a flex, that's a cry for help. 📞`,
      `Your portfolio has more dogs than a shelter. At least shelters have adoption rates. 🐶`,
      `${data.degenScore}% degen score? Your wallet needs therapy, not analysis. 🛋️`,
      `You collect memecoins like they're Pokémon, except these ones only depreciate. Gotta lose 'em all! 💀`,
      `Your wallet screams 'I make financial decisions at 3am after 4 beers'. Respect. 🍺`
    );
  }

  if (data.netWorth > 10000) {
    roasts.push(
      `$${data.netWorth.toFixed(0)} in a hot wallet? Hackers are literally sending each other your address as a birthday gift. 🎁`,
      `You're basically a walking ATM machine on the blockchain. Nice flex though. 💰`,
      `$${data.netWorth.toFixed(0)} sitting pretty and everyone can see it. Your wallet is the crypto equivalent of leaving your Lambo unlocked with the keys in it. 🔑`,
      `With that net worth exposed, you're not a trader, you're a target. But hey, at least you're a rich target. 🎯`,
      `Congrats on the bag! The 47 scammers watching your wallet also say congrats. 💋`
    );
  }

  if (data.totalTransactions < 10) {
    roasts.push(
      `${data.totalTransactions} transactions? Even your wallet is asking "are we there yet?" 🚗`,
      `Your wallet has less activity than a ghost town. Did you buy high and just... give up? 👻`,
      `${data.totalTransactions} transactions total? Your wallet is drier than your DMs. 📭`,
      `This wallet has commitment issues. ${data.totalTransactions} transactions and then ghosted the blockchain. Classic. 👋`,
      `Your wallet is playing hard to get with ${data.totalTransactions} transactions. The blockchain likes a tease. 😏`
    );
  }

  if (data.swapCount > 50) {
    roasts.push(
      `${data.swapCount} swaps? You're not trading, you're just donating fees to validators. 💸`,
      `Jupiter should send you a thank you card for all those swap fees. You're basically their angel investor. 🪐`,
      `${data.swapCount} swaps? You change tokens more often than your underwear. 🩲`,
      `With ${data.swapCount} swaps, you're not a trader, you're a professional fee donor. Very philanthropic. 💝`,
      `You swap more than you swipe right. And probably with similar success rates. 💔`
    );
  }

  if (data.nftCount > 10) {
    roasts.push(
      `${data.nftCount} NFTs and probably none of them are worth the gas you paid. Modern art collector moment. 🖼️`,
      `${data.nftCount} NFTs? Your wallet is a museum of financial regret. Admission is free, just like these JPEGs soon. 🏛️`,
      `Collecting ${data.nftCount} NFTs like you're trying to fill an emotional void. The void is winning. 🕳️`
    );
  }

  // Dark and flirty generic roasts
  if (roasts.length === 0) {
    roasts.push(
      "Your wallet is so transparent, even your future mistakes are already on the blockchain. 🔮",
      "Every transaction you make is recorded forever. Your grandkids will see you bought BONK at the top. 📜",
      "Privacy? Never heard of her. Your wallet is more exposed than a Vegas billboard. 🎰",
      "Your wallet just sent me nudes. It didn't have to, everything's already public anyway. 📸",
      "I've seen your entire financial history. We're basically dating now. 💕",
      "Your transactions tell a story. It's rated R for Rekt. 🎬",
      "Your wallet has big 'texts you at 2am' energy. And not in a good way. 📱",
      "The blockchain saw everything. EVERYTHING. It's blushing. 😳",
      "Your portfolio is like your browser history - you really wish it was private. 🔍",
      "Looking at your wallet feels illegal, but somehow it's completely public. Kinky. 😈",
      "Your wallet has more red flags than my ex. And I can see ALL of them. 🚩",
      "This wallet is giving 'makes impulsive decisions during Mercury retrograde' vibes. ♓",
      "Your financial decisions are on a public ledger. Bold move for someone this bad at trading. 📊"
    );
  }

  return roasts[Math.floor(Math.random() * roasts.length)];
}

function getBasicPersonality(data: WalletData): string {
  // High degen scores - chaotic energy
  if (data.degenScore > 80) {
    const degenPersonalities = [
      "The Memecoin Maniac",
      "Professional Dumpster Diver",
      "The 3AM Ape Artist",
      "Chaos Wallet Daddy",
      "The Rugpull Magnet",
      "Degen Lord Supreme",
    ];
    return degenPersonalities[Math.floor(Math.random() * degenPersonalities.length)];
  }
  if (data.degenScore > 60) {
    const midDegenPersonalities = [
      "Certified Degen",
      "The FOMO Victim",
      "Hopium Addict",
      "The Copium Dealer",
      "Part-Time Gambler",
    ];
    return midDegenPersonalities[Math.floor(Math.random() * midDegenPersonalities.length)];
  }

  // Whale territory - flex but risky
  if (data.netWorth > 50000) {
    const whalePersonalities = [
      "The Whale Watcher",
      "Big Bag Energy",
      "The Walking Target",
      "Hacker's Wet Dream",
      "Main Character Energy",
    ];
    return whalePersonalities[Math.floor(Math.random() * whalePersonalities.length)];
  }
  if (data.netWorth > 10000) {
    const midWhalePersonalities = [
      "The Bag Holder",
      "Medium Rare Whale",
      "The Almost Rich",
      "Trust Fund Tease",
    ];
    return midWhalePersonalities[Math.floor(Math.random() * midWhalePersonalities.length)];
  }

  // High activity - trading addiction
  if (data.swapCount > 100) {
    const swapPersonalities = [
      "The Swap Addict",
      "Fee Donation King",
      "The Indecisive Trader",
      "Commitment Issues",
      "The Token Hoe",
    ];
    return swapPersonalities[Math.floor(Math.random() * swapPersonalities.length)];
  }

  // NFT collectors
  if (data.nftCount > 20) {
    const nftPersonalities = [
      "NFT Hoarder",
      "JPEG Therapist",
      "Right-Click Victim",
      "Art Daddy",
      "The Floor Sweeper",
    ];
    return nftPersonalities[Math.floor(Math.random() * nftPersonalities.length)];
  }

  // Low activity - ghost mode
  if (data.totalTransactions < 10) {
    const ghostPersonalities = [
      "The Ghost",
      "The Commitment-Phobe",
      "One Night Stand Wallet",
      "The Tease",
      "Cold Wallet Cold Heart",
    ];
    return ghostPersonalities[Math.floor(Math.random() * ghostPersonalities.length)];
  }

  // Hyperactive trading
  if (data.totalTransactions > 200) {
    const hyperPersonalities = [
      "The Hyperactive Trader",
      "Keyboard Warrior",
      "The Overthinker",
      "No Sleep Gang",
      "Chart Stalker Supreme",
    ];
    return hyperPersonalities[Math.floor(Math.random() * hyperPersonalities.length)];
  }

  // Default personalities with flavor
  const defaultPersonalities = [
    "The Average Joe",
    "Vanilla Trader",
    "The Normie",
    "Basic But Exposed",
    "The Wallflower",
    "Crypto Curious",
  ];
  return defaultPersonalities[Math.floor(Math.random() * defaultPersonalities.length)];
}

function getBasicVerdict(data: WalletData): string {
  // High degen - savage verdicts
  if (data.degenScore > 80) {
    const degenVerdicts = [
      "Professional exit liquidity provider 💀",
      "Down bad and proud of it 📉",
      "Your portfolio is a crime scene 🔪",
      "Financial Darwin Award nominee 🏆",
      "Therapist needed, not financial advice 🛋️",
      "Born to lose, forced to cope 😭",
      "Your wallet belongs on WikiLeaks 📰",
    ];
    return degenVerdicts[Math.floor(Math.random() * degenVerdicts.length)];
  }

  // Whale verdicts - flex but warning
  if (data.netWorth > 50000) {
    const whaleVerdicts = [
      "Actually winning (for now)",
      "Rich but reckless, our favorite combo 💋",
      "Hackers have entered the chat 👀",
      "Your DMs are about to get interesting 📩",
      "Big wallet energy, small privacy energy ⚡",
      "Flexing with your guard down 🤑",
    ];
    return whaleVerdicts[Math.floor(Math.random() * whaleVerdicts.length)];
  }

  // Memecoin bag holders
  if (data.memecoinCount > 10) {
    const memeVerdicts = [
      "Certified bag holder since 2024",
      "Collecting Ls like Pokémon 🎴",
      "Your portfolio is a meme itself 🤡",
      "Diamond hands or just stuck? 💎",
      "HODL is not a personality trait 😬",
      "Down astronomically, up spiritually ✨",
    ];
    return memeVerdicts[Math.floor(Math.random() * memeVerdicts.length)];
  }

  // Inactive wallets
  if (data.totalTransactions < 5) {
    const inactiveVerdicts = [
      "Did you forget your seed phrase?",
      "Playing hard to get with the blockchain 😏",
      "Commitment issues detected 💔",
      "Your wallet has trust issues 🚩",
      "More ghosting than a haunted house 👻",
      "One-night stand wallet vibes 🌙",
    ];
    return inactiveVerdicts[Math.floor(Math.random() * inactiveVerdicts.length)];
  }

  // High swap count
  if (data.swapCount > 50) {
    const swapVerdicts = [
      "Jupiter's favorite customer",
      "Paying rent to validators 🏠",
      "Addicted to the swap button 🔄",
      "Your fees could buy a car 🚗",
      "Indecisive king/queen 👑",
      "Professional fee burner 🔥",
    ];
    return swapVerdicts[Math.floor(Math.random() * swapVerdicts.length)];
  }

  // Default verdicts with attitude
  const defaultVerdicts = [
    "Standard blockchain citizen",
    "Surprisingly normal, disturbingly exposed 😐",
    "Average but still naked on-chain 🫣",
    "Basic trader, premium surveillance 📡",
    "Nothing special, everything visible 👁️",
    "Normie but make it transparent 🪟",
  ];
  return defaultVerdicts[Math.floor(Math.random() * defaultVerdicts.length)];
}
