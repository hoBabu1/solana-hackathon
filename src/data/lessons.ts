export interface LessonContent {
  eli5: {
    intro: string;
    analogy: string;
    keyPoints: string[];
    examples: string[];
  };
  tech: {
    intro: string;
    keyPoints: string[];
    technicalDetails: string[];
    resources?: string[];
  };
}

export interface Lesson {
  id: number;
  title: string;
  subtitle: string;
  emoji: string;
  meme: string;
  flirtyLine: string;
  content: LessonContent;
  panels?: {
    emoji: string;
    text: string;
    character: string;
  }[];
}

export const lessons: Lesson[] = [
  {
    id: 1,
    title: "Why Your Crypto Needs Curtains",
    subtitle: "Wait, Crypto Isn't Private?",
    emoji: "🪟",
    meme: "Your wallet is trending! Unfortunately, for all the wrong reasons 👀💸",
    flirtyLine: "Privacy so good, even your portfolio can't ghost you 👻",
    panels: [
      { emoji: "😏", text: "\"I'm anonymous on blockchain. No one knows who I am.\"", character: "You" },
      { emoji: "🐸", text: "\"Your wallet: 7xKX...m9Qz. You bought $500 of BONK yesterday at 3:47 PM.\"", character: "Anyone with Solscan" },
      { emoji: "😰", text: "\"How do you know that?!\"", character: "You" },
      { emoji: "🐸", text: "\"It's literally public, genius. Everyone can see it. Forever.\"", character: "Anyone" },
    ],
    content: {
      eli5: {
        intro: "Would you want everyone to see inside your house? That's what using regular crypto is like - transparent glass walls where anyone can peek at your finances 24/7.",
        analogy: "Public blockchain = Glass house with no curtains. Your neighbors, strangers, and even your ex can see everything you do with your money.",
        keyPoints: [
          "Every crypto transaction is like a public tweet that never deletes",
          "Your wallet address is like a username - but for your entire financial history",
          "Bots watch big wallets and copy their trades instantly (front-running)",
          "Anyone can calculate your net worth by just knowing your wallet",
          "The \"crypto is anonymous\" myth is completely false",
        ],
        examples: [
          "Your ex can see your memecoin gambling",
          "Scammers target wallets with large balances",
          "Employers can check your crypto activity",
          "Tax authorities track on-chain movements",
        ],
      },
      tech: {
        intro: "Public blockchains are transparent by design - every transaction is permanently recorded on a distributed ledger accessible to anyone.",
        keyPoints: [
          "Blockchain explorers index all transaction data in real-time",
          "MEV (Maximal Extractable Value) bots exploit transaction visibility",
          "On-chain analytics tools can link wallets to real identities",
          "Transaction graph analysis reveals behavioral patterns",
          "Pseudonymity ≠ Anonymity - addresses can be de-anonymized",
        ],
        technicalDetails: [
          "Solana processes 400ms blocks with full transaction visibility",
          "MEV bots front-run transactions by monitoring the mempool",
          "Chainalysis and TRM Labs provide blockchain forensics",
          "Wallet clustering algorithms link related addresses",
          "Timing analysis can correlate transactions across wallets",
        ],
        resources: [
          "solscan.io - Solana blockchain explorer",
          "Step Finance - Portfolio tracker",
        ],
      },
    },
  },
  {
    id: 2,
    title: "How I Fixed This Problem",
    subtitle: "encrypt.trade: The Solution I Built",
    emoji: "📦",
    meme: "Wrap it before you tap it 📦🔐 (Your crypto deserves protection)",
    flirtyLine: "Slide into DMs, but make it encrypted 💬🔐",
    panels: [
      { emoji: "💰", text: "\"Here's my $1000 USDC, completely visible to everyone\"", character: "Your Wallet" },
      { emoji: "✨", text: "\"*wraps it in encryption magic*\"", character: "encrypt.trade" },
      { emoji: "📦", text: "\"Now I'm eUSDC - same value, but nobody can see inside\"", character: "Encrypted Token" },
      { emoji: "🎭", text: "\"Use me privately, unwrap me when you're done\"", character: "eToken" },
    ],
    content: {
      eli5: {
        intro: "So I built encrypt.trade to solve this. Think of it like putting your money in an envelope before mailing it - everyone knows you sent something, but only you know what's inside.",
        analogy: "Regular tokens = Cash in a clear bag. eTokens on encrypt.trade = Cash in a sealed envelope. Same money, but YOUR business stays private.",
        keyPoints: [
          "Wrap any token (USDC, SOL, BONK) into an encrypted version on encrypt.trade",
          "eTokens = encrypted tokens where balances are completely hidden",
          "YOU still own and control your assets (non-custodial - I never touch your funds)",
          "Unwrap anytime to get your original tokens back - no lock-ups",
          "Works with existing DeFi - same Jupiter liquidity, just private execution",
        ],
        examples: [
          "Go to encrypt.trade → Wrap $1000 USDC → Get eUSDC → Trade privately → Unwrap when done",
          "Like putting on a privacy cloak - same you, just invisible to bots and stalkers",
          "Your assets stay in a smart contract that only YOU control",
        ],
      },
      tech: {
        intro: "I built encrypt.trade using Threshold ElGamal encryption to create encrypted SPL tokens (eTokens) that hide balances while maintaining full composability with Solana DeFi.",
        keyPoints: [
          "Threshold encryption requires multiple parties to decrypt - no single point of failure",
          "TEEs (Trusted Execution Environments) process your encrypted data securely",
          "Zero-knowledge proofs verify you have sufficient balance without revealing amounts",
          "Cryptographic pointers replace visible balances on-chain",
          "Data Availability layer stores encrypted state efficiently",
        ],
        technicalDetails: [
          "Mint/burn mechanism wraps tokens into encrypted versions",
          "Homomorphic properties allow operations on encrypted data",
          "MPC (Multi-Party Computation) ensures decentralization",
          "Ephemeral accounts created for each transaction",
          "Pointer-based execution hides transaction amounts from MEV bots",
        ],
      },
    },
  },
  {
    id: 3,
    title: "Trade Without Getting Rekt by Bots",
    subtitle: "Private Swaps on encrypt.trade",
    emoji: "🌙",
    meme: "Roses are red, violets are blue, bots copy your trades, but can't see you 🌹👻",
    flirtyLine: "Swipe right on privacy, left on surveillance 💘",
    panels: [
      { emoji: "🤖", text: "\"I see a whale buying! Let me front-run and profit!\"", character: "MEV Bot" },
      { emoji: "👻", text: "\"*trades $100K in complete silence*\"", character: "encrypt.trade User" },
      { emoji: "🤖", text: "\"Wait... where did that trade come from?!\"", character: "Confused Bot" },
      { emoji: "😎", text: "\"That's the neat part - you don't.\"", character: "encrypt.trade User" },
    ],
    content: {
      eli5: {
        intro: "This is my favorite part. Imagine shopping at your favorite store, but no one can see what's in your cart or how much you spent. That's what trading on encrypt.trade feels like.",
        analogy: "Regular trading = Shopping while a guy with a megaphone announces every purchase. encrypt.trade = Shopping with a privacy curtain around your cart. Same store, same prices, but YOUR business.",
        keyPoints: [
          "Trade on Jupiter DEX through encrypt.trade - amounts stay hidden",
          "Bots literally CAN'T copy-trade or front-run you anymore",
          "Pro tip: wrap $1000, trade $100 at a time for maximum privacy",
          "Same liquidity pools, same prices - just private execution",
          "Stagger your unwrapping over time and bots have zero clue",
        ],
        examples: [
          "Whales use this to sell $1M without crashing the price",
          "DCA into a position without getting stalked",
          "Exit a bad trade without broadcasting your L to everyone 💀",
        ],
      },
      tech: {
        intro: "I built encrypt.trade's TEE Co-Processor to execute trades through ephemeral accounts, using encrypted pointers instead of visible amounts.",
        keyPoints: [
          "TEE (Trusted Execution Environment) processes your trades in a secure enclave",
          "Ephemeral accounts created and destroyed per transaction - no trace",
          "Zero-knowledge proofs verify you have sufficient balance without exposing it",
          "Trades routed through Jupiter's aggregated liquidity - same great prices",
          "Amount fingerprinting prevented through pointer obfuscation",
        ],
        technicalDetails: [
          "Intel SGX / AWS Nitro Enclaves provide hardware-level isolation",
          "Threshold decryption requires committee consensus - no single party can decrypt",
          "Liquidity aggregation preserves best execution across all pools",
          "Transaction batching increases your anonymity set",
          "Time-lock puzzles prevent timing correlation",
        ],
      },
    },
  },
  {
    id: 4,
    title: "Don't Blow Your Own Cover",
    subtitle: "Privacy Mistakes I See All The Time",
    emoji: "🤡",
    meme: "Me: *achieves perfect privacy* | Also me: *unwraps everything to one address* 🤡",
    flirtyLine: "Your secrets are safe with encrypt.trade... if you don't blow your own cover 🤫",
    panels: [
      { emoji: "🥷", text: "\"I used encrypt.trade! I'm invisible now!\"", character: "User" },
      { emoji: "⏱️", text: "\"*wraps $1000 → swaps $1000 → unwraps $1000 in 5 minutes*\"", character: "Same User" },
      { emoji: "🔍", text: "\"Found you. That was easy.\"", character: "Blockchain Analyst" },
      { emoji: "😭", text: "\"But... but I used privacy tools!\"", character: "User" },
    ],
    content: {
      eli5: {
        intro: "Look, I built encrypt.trade to be bulletproof, but you can still mess it up. Using a disguise is smart. Walking into your house while wearing it defeats the purpose. Here's how to actually stay private.",
        analogy: "Privacy = Wearing a mask at a party. Bad opsec = Putting the mask on and taking it off in front of everyone, then going home. Don't be that guy.",
        keyPoints: [
          "DON'T wrap-swap-unwrap in one flow (creates an obvious link even a noob can trace)",
          "DON'T unwrap immediately after trading (timing correlation is real)",
          "DON'T use round numbers ($1000 exactly = you might as well sign your name)",
          "DO use fresh addresses for unwrapping - create a new wallet, it's free",
          "DO maintain buffer balances in your eToken account",
          "DO vary transaction sizes and timing - be unpredictable",
        ],
        examples: [
          "Bad: Wrap $500 → Trade → Unwrap $487 to same wallet in 10 mins 💀",
          "Good: Wrap $1000 → Trade $200 over days → Unwrap to new wallets over weeks ✅",
          "Your anonymity = how many similar transactions exist. Be average.",
        ],
      },
      tech: {
        intro: "Even with encrypt.trade's encryption, poor opsec can leak info. Transaction graph analysis, timing correlation, and amount fingerprinting are real threats.",
        keyPoints: [
          "Input-output correlation links wrapped/unwrapped amounts if you're careless",
          "Timing analysis uses transaction timestamps - don't be predictable",
          "Amount fingerprinting tracks unique value patterns ($1,234.56 is basically a signature)",
          "Anonymity set size determines privacy strength - blend in",
          "Multi-hop unwrapping increases plausible deniability",
        ],
        technicalDetails: [
          "Graph analysis algorithms trace fund flows across time",
          "Statistical correlation can identify linked transactions",
          "Dust attacks can mark and track wallets",
          "Time-series analysis reveals behavioral patterns",
          "Optimal strategy: different amounts, different times, different addresses",
        ],
      },
    },
  },
  {
    id: 5,
    title: "Why I Built It Compliant",
    subtitle: "Privacy Without The Legal Risk",
    emoji: "⚖️",
    meme: "Privacy ≠ Crime | Just like curtains ≠ you're running a drug lab 🏠✅",
    flirtyLine: "I like my privacy like I like my coffee - strong and compliant ☕🔐",
    panels: [
      { emoji: "👮", text: "\"Privacy tools are for criminals!\"", character: "Skeptic" },
      { emoji: "🏠", text: "\"Do your curtains make you a criminal?\"", character: "Me" },
      { emoji: "👮", text: "\"Well no, but...\"", character: "Skeptic" },
      { emoji: "⚖️", text: "\"Privacy for good actors. Transparency for bad actors. That's the deal.\"", character: "Me" },
    ],
    content: {
      eli5: {
        intro: "Here's why encrypt.trade won't end up like Tornado Cash. Privacy is like having curtains on your windows - totally legal and normal. I built compliance in from day one so you can use this without worrying.",
        analogy: "Tornado Cash = Curtains that can't be opened even with a warrant (got sanctioned). encrypt.trade = Curtains that close for YOUR privacy, but we screen out criminals. Big difference.",
        keyPoints: [
          "encrypt.trade screens wallets BEFORE you can use it - bad actors get blocked",
          "Sanctioned addresses and crime-linked wallets can't get in",
          "Geo-blocking for restricted jurisdictions built-in",
          "Privacy for everyday users like you, not for money laundering",
          "We're building toward on-chain compliance attestations",
        ],
        examples: [
          "You want privacy from random strangers and bots - that's 100% normal and legal",
          "Criminals trying to launder money - they get blocked at the door",
          "Banks have privacy features - we're just doing the same for DeFi",
        ],
      },
      tech: {
        intro: "I built encrypt.trade with pre-transaction compliance screening through partnerships with TRM Labs, Chainalysis, and Predicate.io. This is how we stay on the right side of regulators.",
        keyPoints: [
          "OFAC SDN list screening blocks sanctioned entities automatically",
          "Direct and indirect exposure checks (1-hop, 2-hop analysis)",
          "Real-time wallet risk scoring before you can wrap tokens",
          "Geo-blocking based on jurisdiction requirements",
          "Predicate.io integration for on-chain compliance proofs",
        ],
        technicalDetails: [
          "API integration with compliance oracles runs on every interaction",
          "Zero-knowledge attestations enable privacy-preserving compliance",
          "Smart contract enforced screening - can't be bypassed",
          "Regulatory framework alignment (FinCEN, FATF guidelines)",
          "Selective disclosure architecture for authorized parties when legally required",
        ],
      },
    },
  },
];

export const quizzes = {
  1: [
    {
      question: "What can people see when you use regular crypto?",
      options: [
        "Nothing, crypto is anonymous",
        "Only when you transact with them",
        "Your balance, who you send to, and how much",
        "Just your username",
      ],
      correctAnswer: 2,
      explanation: "Public blockchains expose everything: balances, transaction history, amounts, and wallet interactions. It's all permanently recorded.",
    },
    {
      question: "Why is crypto transparency a problem?",
      options: [
        "It's not, transparency is always good",
        "Bots can front-run your trades and you lose financial privacy",
        "The government likes it too much",
        "It makes crypto slower",
      ],
      correctAnswer: 1,
      explanation: "MEV bots exploit transaction visibility to front-run trades, and anyone can track your financial activity, targeting you for scams or worse.",
    },
    {
      question: "Who can see your wallet balance on a public blockchain?",
      options: [
        "Only you",
        "Only people you transact with",
        "Only the government",
        "Literally anyone with internet access",
      ],
      correctAnswer: 3,
      explanation: "Blockchain explorers like Solscan let anyone view any wallet's complete history. No permission needed.",
    },
    {
      question: "What is the 'crypto is anonymous' claim?",
      options: [
        "Completely true",
        "True for Bitcoin only",
        "A dangerous myth - crypto is pseudonymous, not anonymous",
        "True if you use a VPN",
      ],
      correctAnswer: 2,
      explanation: "Crypto is pseudonymous (fake name) not anonymous (no name). Once your address is linked to you, all history is exposed.",
    },
  ],
  2: [
    {
      question: "What are eTokens?",
      options: [
        "Electric tokens that run on batteries",
        "Encrypted versions of regular tokens like USDC",
        "Tokens that only work on Ethereum",
        "A new type of NFT",
      ],
      correctAnswer: 1,
      explanation: "eTokens are encrypted SPL tokens - wrapped versions of regular tokens where balances and transfers are hidden from public view.",
    },
    {
      question: "When you wrap tokens with Encifher, who controls them?",
      options: [
        "Encifher takes custody",
        "You control them via a smart contract",
        "The government holds them",
        "They cease to exist",
      ],
      correctAnswer: 1,
      explanation: "Encifher is non-custodial. Your tokens are locked in a smart contract that only YOU can access with your wallet.",
    },
    {
      question: "Can you convert eTokens back to regular tokens?",
      options: [
        "No, it's permanent",
        "Yes, by unwrapping anytime you want",
        "Only after 1 year",
        "Only with Encifher's permission",
      ],
      correctAnswer: 1,
      explanation: "You can unwrap your eTokens back to regular tokens at any time. It's your money, your control.",
    },
    {
      question: "What makes eTokens private?",
      options: [
        "They're stored on a private blockchain",
        "Encryption hides balances while you maintain ownership",
        "Only Encifher can see them",
        "They delete transaction history",
      ],
      correctAnswer: 1,
      explanation: "Threshold encryption hides your balance from public view while zero-knowledge proofs verify you have sufficient funds for transactions.",
    },
  ],
  3: [
    {
      question: "Why can't bots front-run your Encifher trades?",
      options: [
        "Encifher uses a secret blockchain",
        "Transaction amounts and details are encrypted",
        "Encifher blocks all bots",
        "Trades are delayed by 24 hours",
      ],
      correctAnswer: 1,
      explanation: "Bots need to see transaction details to front-run. With encrypted amounts, they can't determine what you're trading or how much.",
    },
    {
      question: "What does 'over-wrapping' mean?",
      options: [
        "Wrapping more than you plan to immediately trade",
        "Wrapping twice for extra security",
        "Wrapping the wrong token by mistake",
        "Wrapping tokens too tightly",
      ],
      correctAnswer: 0,
      explanation: "Over-wrapping means wrapping more than you need (e.g., $1000) then trading smaller amounts ($100 at a time) for better privacy.",
    },
    {
      question: "When swapping with Encifher, where does liquidity come from?",
      options: [
        "A private Encifher-only pool",
        "The same Jupiter DEX pools everyone uses",
        "A secret blockchain",
        "Other Encifher users only",
      ],
      correctAnswer: 1,
      explanation: "Encifher routes trades through Jupiter's aggregated liquidity. Same great prices, same deep liquidity - just private execution.",
    },
    {
      question: "What's the benefit of staggered unwrapping?",
      options: [
        "It's cheaper on gas fees",
        "It breaks the link between your activities over time",
        "Encifher requires it",
        "It makes tokens worth more",
      ],
      correctAnswer: 1,
      explanation: "Unwrapping different amounts at different times to different addresses makes it much harder to trace your activity.",
    },
  ],
  4: [
    {
      question: "What's the WORST privacy mistake?",
      options: [
        "Trading small amounts",
        "Wrap → swap → unwrap immediately to same wallet",
        "Using a hardware wallet",
        "Trading on weekends",
      ],
      correctAnswer: 1,
      explanation: "Wrapping and unwrapping the same amount to the same wallet in a short time creates an obvious link that defeats the purpose of privacy.",
    },
    {
      question: "Why shouldn't you unwrap all your assets at once?",
      options: [
        "It costs more in fees",
        "It creates a clear, traceable link between your activity",
        "Encifher doesn't allow it",
        "The unwrap function only works once per day",
      ],
      correctAnswer: 1,
      explanation: "Unwrapping everything at once makes timing and amount correlation trivial. Spreading it out increases your anonymity set.",
    },
    {
      question: "What is 'amount fingerprinting'?",
      options: [
        "A new biometric security feature",
        "Tracking users by unique transaction amounts ($1,234.56)",
        "A way to verify your identity",
        "Counting how many tokens you own",
      ],
      correctAnswer: 1,
      explanation: "Unique amounts (like $1,234.56) can be tracked across transactions. Use common round-ish numbers or vary amounts to avoid this.",
    },
    {
      question: "What's a good privacy practice?",
      options: [
        "Unwrap to the same wallet you wrapped from",
        "Unwrap everything within 5 minutes",
        "Unwrap to fresh addresses over time with varied amounts",
        "Tell everyone about your privacy strategy",
      ],
      correctAnswer: 2,
      explanation: "Fresh addresses, varied amounts, and time delays maximize your anonymity set and break correlation patterns.",
    },
  ],
  5: [
    {
      question: "How is Encifher different from Tornado Cash?",
      options: [
        "It's the same thing, just rebranded",
        "Encifher has compliance built-in (screening, geo-blocking)",
        "Encifher is only for criminals",
        "Tornado Cash was actually compliant",
      ],
      correctAnswer: 1,
      explanation: "Encifher screens users before transactions, blocks sanctioned addresses, and implements geo-blocking - compliance by design.",
    },
    {
      question: "What does Encifher check before you can trade?",
      options: [
        "Your credit score",
        "If your wallet is sanctioned or linked to illicit activity",
        "Your social media profiles",
        "Nothing - it's completely anonymous",
      ],
      correctAnswer: 1,
      explanation: "Encifher uses TRM Labs and Chainalysis to screen wallets against sanctions lists and known illicit addresses.",
    },
    {
      question: "Can privacy and compliance coexist?",
      options: [
        "No, they're mutually exclusive",
        "Yes - privacy for legitimate users, transparency for bad actors",
        "Only if you pay extra",
        "Only for institutional users",
      ],
      correctAnswer: 1,
      explanation: "Encifher proves that financial privacy is possible while still blocking sanctioned entities and maintaining regulatory compliance.",
    },
    {
      question: "Why do normal people need financial privacy?",
      options: [
        "They don't, only criminals need privacy",
        "To hide from the government",
        "Protection from scams, stalkers, competitors, and personal safety",
        "To avoid paying taxes",
      ],
      correctAnswer: 2,
      explanation: "Financial privacy protects against targeted attacks, business competitors, personal safety threats, and unwanted surveillance.",
    },
  ],
};
