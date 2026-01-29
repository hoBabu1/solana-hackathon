import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { WalletProvider } from "@/providers/WalletProvider";
import { Navbar } from "@/components/landing/Navbar";
import { PrivacyTip } from "@/components/landing/PrivacyTip";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "WalletSpy - Your Wallet Is Being Watched",
  description: "Find out how exposed your Solana wallet really is. Privacy awareness through education and dark humor.",
  keywords: ["solana", "privacy", "crypto", "wallet", "surveillance", "blockchain"],
  openGraph: {
    title: "WalletSpy - Your Wallet Is Being Watched",
    description: "Find out how exposed your Solana wallet really is.",
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "WalletSpy",
    description: "Your Solana wallet is being watched. Find out how exposed you are.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#0a0a0a] text-white min-h-screen`}
        suppressHydrationWarning
      >
        <WalletProvider>
          <Navbar />
          <main className="pt-16">
            {children}
          </main>
          <PrivacyTip />
        </WalletProvider>
      </body>
    </html>
  );
}
