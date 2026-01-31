# WalletSpy.lol

**Your wallet isn't anonymous - WalletSpy proves it, roasts you for it, and teaches you how to fix it.**

A privacy-education platform that analyzes Solana wallets to reveal there "exposure level"  using dark humor and AI-powered roasts to make blockchain privacy awareness actually engaging.

---

## 🎬 Videos & Live Demo

| | Link |
|--|------|
| **🌐 Live Demo** | [https://solana-hackathon-one.vercel.app/](https://solana-hackathon-one.vercel.app/) |
| **📽️ PPT Presentation** | [https://youtu.be/sc2ds5biT8k](https://youtu.be/sc2ds5biT8k?si=gMI11NvJGECntuF0) |
| **🎥 Demo Video** | [https://youtu.be/QaZ58nyLoy0](https://youtu.be/QaZ58nyLoy0?si=enk4RJ2H1iRboGwx) |

---

## 🚀 Quick Start

```bash
# Clone the repo
git clone https://github.com/hoBabu1/solana-hackathon.git
cd solana-hackathon

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env.local
# Add your API keys (see below)

# Run the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and your good to go!

---

## What is WalletSpy?

So basically WalletSpy is a hackathon project i built for Encrypt Hackathon (Track 1 & Track 2). Instead of celebrating "open ledgers," i wanted to show users exactly how much of their financial life is visible to anyone with internet connection.

Enter any Solana wallet address and get:
- **Surveillance Score (0-100%)** — How exposed you realy are
- **AI-Generated Roast** — Brutal but educational commentary on your on-chain behavior
- **Privacy Mistakes** — Specific vulnerabilities and how to fix them
- **Wallet Personality** — What your transactions say about you

The whole idea is to make privacy awareness fun and engaging. Nobody wants to read boring articles about blockchain transparency, but everyone wants to get roasted lol.

---

## Features

### 📊 Wallet Scanner
- Real-time Solana blockchain analysis
- Surveillance Score (0-100) with visual ring
- Portfolio breakdown (SOL, tokens, NFTs)
- Transaction history metrics
- Connected wallet detection
- Token approval/allowance tracking
- CEX interaction flagging (this is critical for privacy!)

### 🔗 Social Profile Linking
- **Solana Name Service** (.sol domains)
- **AllDomains** (.abc, .bonk, .poor)
- **Backpack** usernames
- Twitter/X search integration

If your wallet is linked to your identity somwhere, we will probably find it.

### 💸 Memecoin PnL Tracker
- Total invested vs current value
- Realized & unrealized P&L
- Biggest wins and losses
- Individual trade history with status (holding/sold/partial)

Yes we can see your memecoin losses. Sorry not sorry.

### 📈 Income Sources Breakdown
- CEX withdrawals (KYC-linked) - **this is the big one**
- DeFi yields
- Airdrop claims
- NFT sales
- P2P transfers


### 🛡️ Privacy Protocol Misuse Detection
- Quick withdrawals (timing analysis vulnerability)
- Same amount patterns
- Round number deposits
- Wallet clustering risks
- Predictable transaction timing
- Dust attack vulnerability

### 🤖 AI Roasting (my favorite feature)
- Google Gemini-powered personality analysis
- Wallet archetypes (Diamond Hands, Paper Hands, Memecoin Degen, etc.)
- Shareable verdicts for Twitter/X
- Its brutal but its honest

### 📚 Privacy Education Hub (Track 2)
- 5-level gamified learning path
- Progress tracking with achievements
- Interactive quizzes
- From "Noob" to "Ghost Mode"
- ELI5 explanations for non-technical users

No jargon, just clarity.

---

## Tech Stack

| Category | Technologies |
|----------|-------------|
| **Framework** | Next.js 16, React 19, TypeScript |
| **Styling** | Tailwind CSS 4, Framer Motion |
| **Web3** | @solana/web3.js, Solana Wallet Adapter |
| **Primary API** | **Helius** (RPC/DAS, Enriched Transactions) |
| **Other APIs** | Jupiter, Solscan, CoinGecko |
| **AI** | Google Gemini 1.5 Flash |

### Helius API Integration

Helius is the backbone of this project. I used it for:
- `getAssetsByOwner` — Fetching tokens, NFTs, balances with USD prices
- `getTokenAccountsByOwner` — Token approvals and delegation detection
- `getSignaturesForAddress` — Transaction history and wallet age
- **Enriched Transaction API** — Enhanced transaction data with transfers, fees, timestamps

Without Helius this project wouldnt be possible tbh. The DAS API is super powerful for getting all asset data in one call.

---

## Environment Variables

```env
NEXT_PUBLIC_HELIUS_API_KEY=your_helius_api_key
GEMINI_API_KEY=your_gemini_api_key
NEXT_PUBLIC_SOLSCAN_API_KEY=your_solscan_pro_key  # Optional
```

**Get API Keys:**
- [Helius](https://helius.dev/) — Free tier available (this is what i used)
- [Google AI Studio](https://aistudio.google.com/) — Free Gemini API access
- [Solscan Pro](https://pro.solscan.io/) — Optional, for enhanced data

---

## How the Surveillance Score Works

The exposure score (0-100%) is calculated based on:

| Factor | Max Points | Description |
|--------|-----------|-------------|
| Base exposure | 15 | Everyone has some visibility |
| Transactions | 20 | More activity = more data points |
| Token diversity | 10 | Reveals investment interests |
| NFT holdings | 10 | Often linked to social accounts |
| Memecoin activity | 10 | High-signal behavior tracking |
| CEX interactions | 20 | **Critical** — Links to KYC identity |
| Connected wallets | 10 | Enables clustering analysis |
| Net worth visibility | 10 | Makes you a target |

### Risk Levels
- **Low (0-25%):** Relatively private
- **Medium (26-50%):** Some exposure
- **High (51-75%):** Significant tracking possible
- **Critical (76-100%):** Your wallet is an open book

---

## Privacy Mistakes Detected

WalletSpy identifies common privacy vulnerabilities:

| Issue | Severity | Description |
|-------|----------|-------------|
| **Quick Withdrawals** | Critical | Withdrew from mixer within 24 hours |
| **Same Amount Pattern** | Critical | Deposit and withdrawal amounts match |
| **Round Numbers** | High | Using 1.0 SOL instead of 1.3847 |
| **Wallet Clustering** | High | Connected to 10+ other wallets |
| **Timing Correlation** | Medium | 25%+ transactions at same hour |
| **Dust Attack Vulnerable** | Medium | Received tracking dust |
| **CEX Linkage** | Critical | Direct deposits/withdrawals to KYC exchanges |
| **Token Approvals** | High | Unlimited spending permissions |

---



## The Solution - Encrypt.Trade

WalletSpy shows you the problem. But whats the solution?

**[Encrypt.Trade](https://encrypt.trade/)** provides selective privacy - you can protect specific transactions without making everything private. It reduces your exposure without breaking usability.

Real privacy for real users. No jargon, just protection.

---

## Future Vision

Heres what im planning for Phase 2:
- More accurate surveillance scoring algorithms
- Cross-chain analysis (Ethereum, Base, Arbitrum)
- Advanced wallet clustering visualization
- Privacy improvement recommendations
- Mobile app for on-the-go privacy checks
- Developer API so others can integrate surveillance checks
- Minitng NFTs to the user whoever completes the quiz 

---

## Scripts

```bash
npm run dev      # Start development server
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

---

## Acknowledgments

- [Helius](https://helius.dev/) — Solana RPC infrastructure (primary data source)
- [Jupiter](https://jup.ag/) — Token pricing
- [Google Gemini](https://deepmind.google/technologies/gemini/) — AI generation
- [Solana Foundation](https://solana.org/) — Blockchain platform
- [Encrypt.Trade](https://encrypt.trade/) — Privacy solutions partner

---

## Know Your Developer

Built by **Aman** aka **@thedhanyosmi**

Twitter/X: [https://x.com/thedhanyosmi](https://x.com/thedhanyosmi)

Feel free to connect! Always open to feedback, collabs, and conversations about crypto privacy.

---

**"Privacy Is Not a Crime. Ignorance Is."**

Built with mass paranoia and dark humor for the Encrypt Hackathon 🕵️
