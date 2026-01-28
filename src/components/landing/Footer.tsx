"use client";

import Link from "next/link";
import { Eye, Github, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-white/10 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Eye className="w-6 h-6 text-[#00fff9]" />
              <span className="text-lg font-bold gradient-text">WalletSpy</span>
              <span className="text-xs text-[#00fff9]">.lol</span>
            </Link>
            <p className="text-white/60 text-sm mb-4 max-w-md">
              A privacy awareness tool that helps you understand how exposed your Solana wallet really is.
              Because knowledge is the first step to protection.
            </p>
            <div className="flex gap-4">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/40 hover:text-[#00fff9] transition-colors"
              >
                <Twitter size={20} />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/40 hover:text-[#00fff9] transition-colors"
              >
                <Github size={20} />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-4">Tools</h4>
            <ul className="space-y-2 text-sm text-white/60">
              <li>
                <Link href="/scan" className="hover:text-[#00fff9] transition-colors">
                  Wallet Scanner
                </Link>
              </li>
              <li>
                <Link href="/learn" className="hover:text-[#00fff9] transition-colors">
                  Privacy Education
                </Link>
              </li>
              <li>
                <Link href="/leaderboard" className="hover:text-[#00fff9] transition-colors">
                  Exposure Leaderboard
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm text-white/60">
              <li>
                <a
                  href="https://encrypt.trade"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#00fff9] transition-colors"
                >
                  encrypt.trade
                </a>
              </li>
              <li>
                <a
                  href="https://solscan.io"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#00fff9] transition-colors"
                >
                  Solscan
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 text-center text-sm text-white/40">
          <p>Built for the Solana Privacy Hackathon 2024</p>
          <p className="mt-2">
            Remember: Your wallet is not a personality trait. Stop posting it. 🙃
          </p>
        </div>
      </div>
    </footer>
  );
}
