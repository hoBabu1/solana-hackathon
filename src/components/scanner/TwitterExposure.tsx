"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { Twitter, ExternalLink, AlertTriangle, Shield, Search } from "lucide-react";
import { cn } from "@/lib/utils";

interface Tweet {
  id: string;
  text: string;
  author: {
    name: string;
    username: string;
    profileImage?: string;
  };
  createdAt: string;
  url: string;
  metrics?: {
    likes: number;
    retweets: number;
    replies: number;
  };
}

interface TwitterSearchResult {
  found: boolean;
  count: number;
  tweets: Tweet[];
  exposureLevel: "critical" | "high" | "medium" | "low" | "none";
  message: string;
}

interface TwitterExposureProps {
  walletAddress: string;
}

export function TwitterExposure({ walletAddress }: TwitterExposureProps) {
  const [result, setResult] = useState<TwitterSearchResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function searchTwitter() {
      try {
        setLoading(true);
        const response = await fetch("/api/twitter-search", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ walletAddress }),
        });

        if (!response.ok) throw new Error("Search failed");

        const data = await response.json();
        setResult(data);
      } catch (err) {
        setError("Failed to search Twitter");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    searchTwitter();
  }, [walletAddress]);

  const exposureColors = {
    critical: "border-red-500/50 bg-red-500/10",
    high: "border-orange-500/50 bg-orange-500/10",
    medium: "border-yellow-500/50 bg-yellow-500/10",
    low: "border-blue-500/50 bg-blue-500/10",
    none: "border-green-500/50 bg-green-500/10",
  };

  const exposureIcons = {
    critical: "🚨",
    high: "⚠️",
    medium: "👀",
    low: "📡",
    none: "✅",
  };

  if (loading) {
    return (
      <Card>
        <div className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <Twitter className="w-5 h-5 text-[#1DA1F2]" />
            <h3 className="font-bold">Twitter/X Exposure</h3>
          </div>
          <div className="flex items-center justify-center py-8">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            >
              <Search className="w-6 h-6 text-[#1DA1F2]" />
            </motion.div>
            <span className="ml-3 text-white/60">Searching Twitter for your wallet...</span>
          </div>
        </div>
      </Card>
    );
  }

  if (error || !result) {
    return (
      <Card>
        <div className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <Twitter className="w-5 h-5 text-[#1DA1F2]" />
            <h3 className="font-bold">Twitter/X Exposure</h3>
          </div>
          <p className="text-white/60 text-sm">Unable to search Twitter. Try again later.</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className={cn(exposureColors[result.exposureLevel])}>
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Twitter className="w-5 h-5 text-[#1DA1F2]" />
            <h3 className="font-bold">Twitter/X Exposure</h3>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">{exposureIcons[result.exposureLevel]}</span>
            <span className={cn(
              "text-sm font-bold uppercase",
              result.exposureLevel === "critical" && "text-red-400",
              result.exposureLevel === "high" && "text-orange-400",
              result.exposureLevel === "medium" && "text-yellow-400",
              result.exposureLevel === "none" && "text-green-400"
            )}>
              {result.count} {result.count === 1 ? "mention" : "mentions"}
            </span>
          </div>
        </div>

        {/* Message */}
        <div className={cn(
          "p-3 rounded-lg mb-4",
          result.exposureLevel === "critical" && "bg-red-500/20",
          result.exposureLevel === "high" && "bg-orange-500/20",
          result.exposureLevel === "medium" && "bg-yellow-500/20",
          result.exposureLevel === "none" && "bg-green-500/20"
        )}>
          <p className="text-sm font-medium">{result.message}</p>
        </div>

        {/* Tweets */}
        {result.tweets.length > 0 && (
          <div className="space-y-3">
            <p className="text-xs text-white/40 uppercase tracking-wide">Found Tweets</p>
            {result.tweets.map((tweet) => (
              <motion.a
                key={tweet.id}
                href={tweet.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="block p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#1DA1F2]/20 flex items-center justify-center flex-shrink-0">
                    <Twitter className="w-5 h-5 text-[#1DA1F2]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-sm">{tweet.author.name}</span>
                      <span className="text-white/40 text-xs">@{tweet.author.username}</span>
                    </div>
                    <p className="text-sm text-white/80 line-clamp-2">{tweet.text}</p>
                    {tweet.metrics && (
                      <div className="flex items-center gap-4 mt-2 text-xs text-white/40">
                        <span>❤️ {tweet.metrics.likes}</span>
                        <span>🔁 {tweet.metrics.retweets}</span>
                        <span>💬 {tweet.metrics.replies}</span>
                      </div>
                    )}
                  </div>
                  <ExternalLink className="w-4 h-4 text-white/40 flex-shrink-0" />
                </div>
              </motion.a>
            ))}
          </div>
        )}

        {/* Fix it CTA */}
        {result.exposureLevel !== "none" && (
          <div className="mt-4 p-3 bg-[#b026ff]/20 rounded-lg border border-[#b026ff]/30">
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-[#00fff9] flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-[#00fff9]">Fix this with encrypt.trade</p>
                <p className="text-xs text-white/60 mt-1">
                  Even if your wallet is exposed, you can still trade privately. Wrap your tokens and break the surveillance chain.
                </p>
                <a
                  href="https://encrypt.trade"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 mt-2 text-xs font-semibold text-[#00fff9] hover:underline"
                >
                  Start trading privately <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
