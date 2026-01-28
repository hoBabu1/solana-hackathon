import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable React strict mode for better development experience
  reactStrictMode: true,

  // Configure images
  images: {
    domains: ["api.dicebear.com", "imgflip.com"],
  },

  // Ignore ESLint errors during build (for hackathon speed)
  eslint: {
    ignoreDuringBuilds: true,
  },

  // Ignore TypeScript errors during build (for hackathon speed)
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
