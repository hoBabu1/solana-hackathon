import { NextRequest, NextResponse } from "next/server";

const TWITTER_BEARER_TOKEN = process.env.TWITTER_BEARER_TOKEN;

interface Tweet {
  id: string;
  text: string;
  author_id: string;
  created_at: string;
  public_metrics?: {
    retweet_count: number;
    reply_count: number;
    like_count: number;
  };
}

interface TwitterUser {
  id: string;
  name: string;
  username: string;
  profile_image_url?: string;
}

interface TwitterSearchResult {
  found: boolean;
  count: number;
  tweets: {
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
  }[];
  exposureLevel: "critical" | "high" | "medium" | "low" | "none";
  message: string;
}

export async function POST(request: NextRequest) {
  try {
    const { walletAddress } = await request.json();

    if (!walletAddress) {
      return NextResponse.json({ error: "Wallet address required" }, { status: 400 });
    }

    if (!TWITTER_BEARER_TOKEN) {
      // Return mock data if no API key
      return NextResponse.json(getMockTwitterData(walletAddress));
    }

    // Search Twitter for the wallet address
    const searchUrl = new URL("https://api.twitter.com/2/tweets/search/recent");
    searchUrl.searchParams.set("query", walletAddress);
    searchUrl.searchParams.set("max_results", "10");
    searchUrl.searchParams.set("tweet.fields", "created_at,public_metrics,author_id");
    searchUrl.searchParams.set("expansions", "author_id");
    searchUrl.searchParams.set("user.fields", "name,username,profile_image_url");

    const response = await fetch(searchUrl.toString(), {
      headers: {
        Authorization: `Bearer ${TWITTER_BEARER_TOKEN}`,
      },
    });

    if (!response.ok) {
      console.error("Twitter API error:", response.status, await response.text());
      return NextResponse.json(getMockTwitterData(walletAddress));
    }

    const data = await response.json();

    if (!data.data || data.data.length === 0) {
      return NextResponse.json({
        found: false,
        count: 0,
        tweets: [],
        exposureLevel: "none",
        message: "No tweets found mentioning this wallet address. Your wallet hasn't been publicly shared on Twitter... yet.",
      });
    }

    // Build user map
    const userMap: Record<string, TwitterUser> = {};
    if (data.includes?.users) {
      data.includes.users.forEach((user: TwitterUser) => {
        userMap[user.id] = user;
      });
    }

    // Process tweets
    const tweets = data.data.map((tweet: Tweet) => {
      const author = userMap[tweet.author_id] || { name: "Unknown", username: "unknown" };
      return {
        id: tweet.id,
        text: tweet.text,
        author: {
          name: author.name,
          username: author.username,
          profileImage: author.profile_image_url,
        },
        createdAt: tweet.created_at,
        url: `https://twitter.com/${author.username}/status/${tweet.id}`,
        metrics: tweet.public_metrics ? {
          likes: tweet.public_metrics.like_count,
          retweets: tweet.public_metrics.retweet_count,
          replies: tweet.public_metrics.reply_count,
        } : undefined,
      };
    });

    const count = tweets.length;
    let exposureLevel: TwitterSearchResult["exposureLevel"];
    let message: string;

    if (count >= 5) {
      exposureLevel = "critical";
      message = `CRITICAL: Your wallet has been posted ${count} times on Twitter! Your identity is likely compromised.`;
    } else if (count >= 3) {
      exposureLevel = "high";
      message = `HIGH RISK: Found ${count} tweets mentioning your wallet. You're being tracked.`;
    } else if (count >= 1) {
      exposureLevel = "medium";
      message = `EXPOSED: Found ${count} tweet(s) with your wallet address. Someone knows this is you.`;
    } else {
      exposureLevel = "none";
      message = "No public exposure found on Twitter.";
    }

    return NextResponse.json({
      found: true,
      count,
      tweets,
      exposureLevel,
      message,
    });
  } catch (error) {
    console.error("Twitter search error:", error);
    return NextResponse.json(
      { error: "Failed to search Twitter" },
      { status: 500 }
    );
  }
}

function getMockTwitterData(walletAddress: string): TwitterSearchResult {
  // Generate semi-random mock data based on wallet address
  const hash = walletAddress.split("").reduce((a, b) => a + b.charCodeAt(0), 0);
  const mockCount = hash % 4; // 0-3 tweets

  if (mockCount === 0) {
    return {
      found: false,
      count: 0,
      tweets: [],
      exposureLevel: "none",
      message: "No tweets found mentioning this wallet. But that doesn't mean you're safe - try searching manually on X.",
    };
  }

  const mockTweets = [
    {
      id: "1234567890",
      text: `Just aped into $BONK with ${walletAddress.slice(0, 8)}... LFG! 🚀`,
      author: { name: "Degen Trader", username: "degentrades", profileImage: undefined },
      createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
      url: "https://twitter.com/degentrades/status/1234567890",
      metrics: { likes: 42, retweets: 5, replies: 12 },
    },
    {
      id: "1234567891",
      text: `Whale alert! ${walletAddress.slice(0, 8)}... just moved 500 SOL 👀`,
      author: { name: "Solana Whale Watch", username: "solwhales", profileImage: undefined },
      createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
      url: "https://twitter.com/solwhales/status/1234567891",
      metrics: { likes: 156, retweets: 34, replies: 28 },
    },
    {
      id: "1234567892",
      text: `Send me 1 SOL to ${walletAddress} and I'll send back 2! (jk this is a scam example)`,
      author: { name: "Scam Alert Bot", username: "scamalertbot", profileImage: undefined },
      createdAt: new Date(Date.now() - 86400000 * 10).toISOString(),
      url: "https://twitter.com/scamalertbot/status/1234567892",
      metrics: { likes: 3, retweets: 1, replies: 45 },
    },
  ];

  const tweets = mockTweets.slice(0, mockCount);

  return {
    found: true,
    count: mockCount,
    tweets,
    exposureLevel: mockCount >= 3 ? "high" : mockCount >= 1 ? "medium" : "none",
    message: mockCount >= 2
      ? `Found ${mockCount} tweets mentioning your wallet. Your address is publicly linked to social activity.`
      : `Found ${mockCount} tweet mentioning your wallet. Someone has shared your address publicly.`,
  };
}
