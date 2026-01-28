"use client";

import { useEffect, useState } from "react";

const stats = [
  { label: "wallets exposed today", value: 127493 },
  { label: "in losses made public", value: 2300000, prefix: "$" },
  { label: "Your ex can see your memecoin gambles", value: null },
  { label: "companies tracking you", value: 50, suffix: "+" },
  { label: "of wallets are highly exposed", value: 73, suffix: "%" },
  { label: "transactions are permanent", value: 100, suffix: "%" },
];

export function StatsTicker() {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setOffset((prev) => prev + 1);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const formatValue = (stat: typeof stats[0]) => {
    if (stat.value === null) return "";
    const prefix = stat.prefix || "";
    const suffix = stat.suffix || "";
    const formatted = stat.value >= 1000000
      ? `${(stat.value / 1000000).toFixed(1)}M`
      : stat.value >= 1000
      ? `${(stat.value / 1000).toFixed(0)}K`
      : stat.value.toString();
    return `${prefix}${formatted}${suffix}`;
  };

  return (
    <div className="w-full overflow-hidden bg-[#0a0a0a] border-y border-white/10 py-3">
      <div
        className="flex whitespace-nowrap"
        style={{ transform: `translateX(-${offset % 2000}px)` }}
      >
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex items-center">
            {stats.map((stat, index) => (
              <div key={`${i}-${index}`} className="flex items-center mx-8">
                {stat.value !== null && (
                  <span className="text-[#00fff9] font-bold mr-2">
                    {formatValue(stat)}
                  </span>
                )}
                <span className="text-white/60">{stat.label}</span>
                <span className="mx-8 text-white/20">|</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
