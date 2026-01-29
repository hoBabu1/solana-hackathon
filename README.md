# WalletSpy.lol

**How Exposed Is Your Solana Wallet?**

A privacy-education platform that analyzes Solana wallets to reveal their "exposure level" — using dark humor and AI-powered roasts to make blockchain privacy awareness actually engaging.

**Live Demo:** [https://solana-hackathon-one.vercel.app/](https://solana-hackathon-one.vercel.app/)

---

## What is WalletSpy?

WalletSpy.lol is a hackathon project that flips the script on blockchain transparency. Instead of celebrating "open ledgers," we show users exactly how much of their financial life is visible to anyone with an internet connection.

Enter any Solana wallet address and get:
- **Surveillance Score (0-100%)** — How exposed you really are
- **AI-Generated Roast** — Brutal but educational commentary on your on-chain behavior
- **Privacy Mistakes** — Specific vulnerabilities and how to fix them
- **Wallet Personality** — What your transactions say about you

---

## Features

### Wallet Scanner
- Real-time Solana blockchain analysis
- Portfolio breakdown (SOL, tokens, NFTs)
- Transaction history metrics
- Connected wallet detection
- Token approval/allowance tracking
- CEX interaction flagging

### Privacy Education
- 5-level gamified learning path
- Progress tracking with achievements
- Interactive quizzes
- From "Noob" to "Ghost Mode"

### AI Roasting
- Google Gemini-powered personality analysis
- Wallet archetypes (Diamond Hands, Paper Hands, Memecoin Degen, etc.)
- Shareable verdicts for Twitter/X

### Leaderboard
- Wall of Exposure rankings
- Community privacy benchmarks
- Risk level categorization

---

## Tech Stack

| Category | Technologies |
|----------|-------------|
| **Framework** | Next.js 16, React 19, TypeScript |
| **Styling** | Tailwind CSS 4, Framer Motion |
| **Web3** | @solana/web3.js, Solana Wallet Adapter |
| **APIs** | Helius (RPC/DAS), Jupiter, Solscan, CoinGecko |
| **AI** | Google Gemini 1.5 Flash |

---

## Getting Started

### Prerequisites
- Node.js 18+
- npm/yarn/pnpm/bun

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/walletspy.git
cd walletspy

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
```

### Environment Variables

```env
NEXT_PUBLIC_HELIUS_API_KEY=your_helius_api_key
GEMINI_API_KEY=your_gemini_api_key
NEXT_PUBLIC_SOLSCAN_API_KEY=your_solscan_pro_key  # Optional
```

**Get API Keys:**
- [Helius](https://helius.dev/) — Free tier available
- [Google AI Studio](https://aistudio.google.com/) — Free Gemini API access
- [Solscan Pro](https://pro.solscan.io/) — Optional, for enhanced data

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

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

- **CEX Linkage** — Direct deposits/withdrawals link to your identity
- **Wallet Clustering** — On-chain analysis can group your wallets
- **Timing Patterns** — Transaction times reveal your timezone
- **Round Numbers** — Easier to trace through mixers
- **Token Approvals** — Unlimited spending permissions are risky
- **High Visibility Wealth** — Makes you a phishing target

---

## Project Structure

```
walletspy/
├── src/
│   ├── app/
│   │   ├── page.tsx          # Landing page
│   │   ├── scan/page.tsx     # Wallet scanner
│   │   ├── learn/page.tsx    # Education hub
│   │   ├── leaderboard/page.tsx
│   │   └── api/roast/route.ts # AI roast endpoint
│   ├── components/
│   │   ├── landing/          # Homepage components
│   │   ├── scanner/          # Scan results UI
│   │   ├── education/        # Learning levels
│   │   └── ui/               # Reusable components
│   ├── lib/
│   │   ├── scanner.ts        # Core analysis logic
│   │   ├── helius.ts         # Blockchain data fetching
│   │   └── utils.ts          # Helpers
│   └── types/
│       └── index.ts          # TypeScript definitions
├── public/                   # Static assets
└── package.json
```

---

## API Integration

### Helius (Primary Data Source)
- `getAssetsByOwner` — Tokens, NFTs, balances with USD prices
- `getTokenAccountsByOwner` — Token approvals and allowances
- Enriched transaction history

### Jupiter
- Real-time token price aggregation
- Supports batch pricing (100 tokens/request)

### Google Gemini
- Generates personalized wallet roasts
- Creates wallet personality archetypes
- Fallback templates if API unavailable

---

## Learning Path

| Level | Title | Topics Covered |
|-------|-------|---------------|
| 1 | Noob | Blockchain transparency basics |
| 2 | Aware | How wallet tracking works |
| 3 | Paranoid | Common privacy mistakes |
| 4 | Privacy Ninja | Selective privacy solutions |
| 5 | Ghost Mode | Advanced privacy techniques |

---

## Scripts

```bash
npm run dev      # Start development server
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

---

## Contributing

This is a hackathon project, but contributions are welcome!

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## Acknowledgments

- [Helius](https://helius.dev/) — Solana RPC infrastructure
- [Jupiter](https://jup.ag/) — Token pricing
- [Google Gemini](https://deepmind.google/technologies/gemini/) — AI generation
- [Solana Foundation](https://solana.org/) — Blockchain platform
- [encrypt.trade](https://encrypt.trade/) — Privacy solutions partner

---

## License

MIT License — See [LICENSE](LICENSE) for details.

---

## Disclaimer

WalletSpy.lol is an educational tool designed to raise awareness about blockchain privacy. It does not store wallet data or track users. The "roasts" are AI-generated for entertainment and should not be taken as financial advice.

**Your blockchain activity is public. Now you know exactly how public.**

---

Built with paranoia and dark humor for the Solana Hackathon
