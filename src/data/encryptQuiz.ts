export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: {
    inPlainEnglish: string;
    whyItMatters: string;
    theJargon: {
      term: string;
      definition: string;
    };
  };
}

export const encryptQuizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "What's the biggest privacy problem with regular Solana wallets?",
    options: [
      "They're slow",
      "Everyone can see all your transactions and balances",
      "They cost too much in fees",
      "They only work on desktop"
    ],
    correctAnswer: 1,
    explanation: {
      inPlainEnglish: "Your Solana wallet is like having a glass bank vault. Anyone with your address can see exactly how much you have, every trade you've made, and who you've sent money to. It's all public.",
      whyItMatters: "Bots use this transparency to front-run your trades, copy your strategies, or even target you for social engineering attacks. No privacy = you're always being watched.",
      theJargon: {
        term: "Transparency Problem",
        definition: "The fundamental issue where blockchain's public ledger design exposes all transaction data to anyone who looks."
      }
    }
  },
  {
    id: 2,
    question: "How do MEV bots hurt regular traders?",
    options: [
      "They steal your private keys",
      "They see your pending trade and execute first, making you pay more",
      "They hack your wallet",
      "They report you to the IRS"
    ],
    correctAnswer: 1,
    explanation: {
      inPlainEnglish: "Imagine shouting 'I want to buy!' in a store. Someone overhears, runs to buy it first, then sells it to you at a higher price. That's what MEV bots do with your trades.",
      whyItMatters: "You're literally losing money on every significant trade because bots can see what you're about to do. It's like playing poker with your cards face-up.",
      theJargon: {
        term: "MEV (Maximal Extractable Value)",
        definition: "Profit that bots extract by reordering, inserting, or censoring transactions before yours gets processed."
      }
    }
  },
  {
    id: 3,
    question: "What does 'wrapping' a token mean in encrypt.trade?",
    options: [
      "Putting it in a gift box for someone",
      "Converting it to a privacy-protected version (eToken) that hides your balance",
      "Locking it forever",
      "Sending it to another blockchain"
    ],
    correctAnswer: 1,
    explanation: {
      inPlainEnglish: "Wrapping is like putting your cash into an envelope. The money is still yours, but now nobody walking by can see how much you're carrying.",
      whyItMatters: "Once wrapped, your tokens become invisible to blockchain explorers and bots. You can trade, hold, or move them without anyone knowing what you have.",
      theJargon: {
        term: "eTokens (Encrypted Tokens)",
        definition: "Privacy-wrapped versions of regular tokens where balances are encrypted and only visible to the owner."
      }
    }
  },
  {
    id: 4,
    question: "What's the difference between privacy and anonymity?",
    options: [
      "They're the same thing",
      "Privacy hides WHAT you have, anonymity hides WHO you are",
      "Privacy is legal, anonymity is illegal",
      "Anonymity is stronger than privacy"
    ],
    correctAnswer: 1,
    explanation: {
      inPlainEnglish: "Privacy is like closing your curtains - people know you live there, but can't see what you're doing inside. Anonymity would be living in a house with no address at all.",
      whyItMatters: "encrypt.trade gives you privacy (hidden balances and trades) while you remain a real, identifiable user. This keeps you compliant with regulations while protecting your financial information.",
      theJargon: {
        term: "Privacy vs Anonymity",
        definition: "Privacy protects transaction details while maintaining identity accountability. Anonymity removes identity entirely."
      }
    }
  },
  {
    id: 5,
    question: "How does encrypt.trade stay compliant with regulations?",
    options: [
      "It doesn't - it's a privacy tool",
      "Built-in compliance checks that can reveal transaction data if legally required",
      "It only works in countries without crypto laws",
      "Users have to submit KYC for every trade"
    ],
    correctAnswer: 1,
    explanation: {
      inPlainEnglish: "Think of it like privacy glass on a car - you can see out, others can't see in, but police can still run your plates if needed. Your privacy is protected in normal use, but there's a legal pathway if required.",
      whyItMatters: "This is why encrypt.trade can operate openly while Tornado Cash got sanctioned. Compliance-by-design means you get privacy without legal risk.",
      theJargon: {
        term: "Compliance Layer",
        definition: "Cryptographic mechanisms that allow selective disclosure to authorized parties (like law enforcement with proper warrants) while maintaining default privacy."
      }
    }
  },
  {
    id: 6,
    question: "What is a TEE and why does encrypt.trade use it?",
    options: [
      "A type of cryptocurrency",
      "A secure hardware zone where sensitive operations happen privately",
      "A trading bot",
      "A type of wallet"
    ],
    correctAnswer: 1,
    explanation: {
      inPlainEnglish: "A TEE is like a sealed room inside a computer where even the computer's owner can't peek inside. Your encryption keys and sensitive calculations happen there, invisible to everyone.",
      whyItMatters: "This is how encrypt.trade can guarantee privacy even from its own servers. The TEE handles your data in a way that's mathematically provable to be private.",
      theJargon: {
        term: "TEE (Trusted Execution Environment)",
        definition: "A secure area of a processor that guarantees code and data loaded inside is protected from external access, including from the system operator."
      }
    }
  },
  {
    id: 7,
    question: "What is threshold encryption?",
    options: [
      "Encryption that only works above a certain amount",
      "Encryption where multiple parties must cooperate to decrypt, so no single entity has full access",
      "The minimum encryption strength required by law",
      "A type of password protection"
    ],
    correctAnswer: 1,
    explanation: {
      inPlainEnglish: "Imagine a safe that needs 3 out of 5 different keys to open. No single person can access it alone - they need to work together. That's threshold encryption.",
      whyItMatters: "This prevents any single point of failure. Even if one server gets hacked or one employee goes rogue, your data stays encrypted because they only have one piece of the puzzle.",
      theJargon: {
        term: "Threshold Encryption",
        definition: "A cryptographic scheme where decryption requires cooperation from a minimum number of parties, preventing any single party from having complete access."
      }
    }
  },
  {
    id: 8,
    question: "What's the smartest way to use encrypt.trade for trading?",
    options: [
      "Wrap tokens right before selling",
      "Wrap more than you plan to trade, so the exact trade amount stays hidden",
      "Never wrap anything",
      "Only wrap memecoins"
    ],
    correctAnswer: 1,
    explanation: {
      inPlainEnglish: "If you wrap exactly $1,000 and then trade exactly $1,000, observers might guess what you did. But if you wrap $5,000 and trade $1,000, they have no idea what happened with which portion.",
      whyItMatters: "This 'over-wrapping' strategy breaks the link between your public wallet activity and your actual trading. It's like entering a crowded store with a big bag - no one knows what you actually bought.",
      theJargon: {
        term: "Over-Wrapping Strategy",
        definition: "Privacy technique of wrapping more tokens than you intend to immediately use, creating ambiguity about actual transaction amounts."
      }
    }
  },
  {
    id: 9,
    question: "How does encrypt.trade connect to trading liquidity?",
    options: [
      "It has its own separate exchange",
      "It routes through Jupiter, giving you access to all Solana liquidity while staying private",
      "You can only trade with other encrypt.trade users",
      "It doesn't support trading, only holding"
    ],
    correctAnswer: 1,
    explanation: {
      inPlainEnglish: "encrypt.trade plugs into Jupiter (Solana's biggest DEX aggregator) behind the scenes. You get the best prices from everywhere on Solana, but your trade details stay encrypted.",
      whyItMatters: "You don't sacrifice trading quality for privacy. Same liquidity, same prices, same speed - just without broadcasting your moves to every bot on the network.",
      theJargon: {
        term: "Jupiter Integration",
        definition: "Connection to Jupiter's DEX aggregator that combines liquidity from all major Solana exchanges while maintaining transaction privacy."
      }
    }
  },
  {
    id: 10,
    question: "Who benefits MOST from using encrypt.trade?",
    options: [
      "Only criminals hiding money",
      "Anyone who doesn't want their trading strategy, holdings, or financial activity exposed publicly",
      "Only professional traders",
      "Only people with large amounts"
    ],
    correctAnswer: 1,
    explanation: {
      inPlainEnglish: "Financial privacy isn't about hiding bad things - it's about not showing everyone your bank statement. Would you post your Venmo history on Twitter? Same principle.",
      whyItMatters: "From protecting trade strategies to avoiding targeted scams to simply keeping your net worth private, financial privacy is a fundamental right that benefits everyone.",
      theJargon: {
        term: "Financial Privacy",
        definition: "The right to keep personal financial information confidential, recognized globally as a basic human right and protected by law in traditional finance."
      }
    }
  }
];

export interface QuizResult {
  score: number;
  total: number;
  percentage: number;
  tier: "ninja" | "padawan" | "curious" | "newbie";
  tierEmoji: string;
  tierTitle: string;
  tierDescription: string;
}

export function calculateQuizResult(correctAnswers: number): QuizResult {
  const total = 10;
  const percentage = (correctAnswers / total) * 100;

  let tier: QuizResult["tier"];
  let tierEmoji: string;
  let tierTitle: string;
  let tierDescription: string;

  if (percentage >= 90) {
    tier = "ninja";
    tierEmoji = "🥷";
    tierTitle = "Privacy Ninja";
    tierDescription = "You're a privacy expert! You understand exactly why and how encrypt.trade protects you.";
  } else if (percentage >= 70) {
    tier = "padawan";
    tierEmoji = "⚔️";
    tierTitle = "Privacy Padawan";
    tierDescription = "Strong privacy instincts! You've got the fundamentals down. Ready to go pro.";
  } else if (percentage >= 50) {
    tier = "curious";
    tierEmoji = "🔍";
    tierTitle = "Curious Explorer";
    tierDescription = "You're learning! A few more concepts to master, but you're on the right path.";
  } else {
    tier = "newbie";
    tierEmoji = "🌱";
    tierTitle = "Privacy Newbie";
    tierDescription = "Everyone starts somewhere! Try the quiz again after reading the explanations.";
  }

  return {
    score: correctAnswers,
    total,
    percentage,
    tier,
    tierEmoji,
    tierTitle,
    tierDescription
  };
}
