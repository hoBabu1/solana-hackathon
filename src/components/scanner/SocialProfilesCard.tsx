"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { SocialProfile } from "@/types";
import {
  Globe,
  User,
  CheckCircle,
  XCircle,
  ExternalLink,
  AlertTriangle,
  Eye,
} from "lucide-react";

interface SocialProfilesCardProps {
  profiles: SocialProfile[];
  address: string;
}

const platformIcons: Record<string, React.ReactNode> = {
  sns: <Globe className="w-4 h-4" />,
  alldomains: <Globe className="w-4 h-4" />,
  backpack: <User className="w-4 h-4" />,
  twitter: <span className="text-sm">𝕏</span>,
  ens: <Globe className="w-4 h-4" />,
};

const platformLabels: Record<string, string> = {
  sns: "Solana Name Service (.sol)",
  alldomains: "AllDomains (.abc, .bonk, etc)",
  backpack: "Backpack Username",
  twitter: "Twitter/X",
  ens: "ENS Domain",
};

export function SocialProfilesCard({ profiles, address }: SocialProfilesCardProps) {
  const foundProfiles = profiles.filter(p => p.found);
  const isExposed = foundProfiles.length > 0;

  return (
    <Card className={isExposed ? "border-[#ff0844]/50 bg-[#ff0844]/5" : "border-[#00ff9f]/30"}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Eye className={`w-5 h-5 ${isExposed ? "text-[#ff0844]" : "text-[#00ff9f]"}`} />
            Social Profile Links
          </div>
          {isExposed ? (
            <span className="text-xs px-2 py-1 bg-[#ff0844]/20 text-[#ff0844] rounded-full font-bold">
              {foundProfiles.length} FOUND
            </span>
          ) : (
            <span className="text-xs px-2 py-1 bg-[#00ff9f]/20 text-[#00ff9f] rounded-full font-bold">
              NONE FOUND
            </span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Warning if exposed */}
        {isExposed && (
          <div className="mb-4 p-3 bg-[#ff0844]/10 border border-[#ff0844]/30 rounded-lg">
            <div className="flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-[#ff0844] flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-bold text-[#ff0844]">Your Wallet is Doxxed!</p>
                <p className="text-xs text-white/70 mt-1">
                  Your wallet is linked to identifiable names. Anyone can connect your on-chain activity to your identity.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Profile List */}
        <div className="space-y-3">
          {profiles.map((profile, i) => (
            <motion.div
              key={profile.platform}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`p-3 rounded-lg flex items-center justify-between ${
                profile.found
                  ? "bg-[#ff0844]/10 border border-[#ff0844]/30"
                  : "bg-white/5 border border-white/10"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  profile.found ? "bg-[#ff0844]/20" : "bg-white/10"
                }`}>
                  {platformIcons[profile.platform]}
                </div>
                <div>
                  <p className="text-sm font-medium">{platformLabels[profile.platform]}</p>
                  {profile.found && profile.identifier && (
                    <p className="text-xs text-[#ff0844] font-mono">{profile.identifier}</p>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                {profile.found ? (
                  <>
                    <CheckCircle className="w-4 h-4 text-[#ff0844]" />
                    {profile.url && (
                      <a
                        href={profile.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#00fff9] hover:text-white"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </>
                ) : (
                  <XCircle className="w-4 h-4 text-white/30" />
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Twitter Search Link */}
        <div className="mt-4 p-3 bg-white/5 rounded-lg">
          <p className="text-xs text-white/50 mb-2">Check if your wallet is posted on Twitter:</p>
          <a
            href={`https://twitter.com/search?q=${address}&f=live`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-[#00fff9] hover:text-white"
          >
            <span>Search Twitter for your wallet</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        {/* Meme */}
        <div className="mt-4 p-3 bg-gradient-to-r from-[#00fff9]/10 to-[#b026ff]/10 rounded-lg text-center">
          <p className="text-xs text-white/70 italic">
            {isExposed
              ? '"I\'m pseudonymous" - Someone with a .sol domain matching their Twitter handle'
              : '"At least one thing is going right" - You, probably'}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
