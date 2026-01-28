"use client";

import { cn } from "@/lib/utils";
import { forwardRef, InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <div className="w-full">
        <input
          ref={ref}
          className={cn(
            "w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl",
            "text-white placeholder:text-white/40",
            "focus:outline-none focus:border-[#00fff9]/50 focus:ring-2 focus:ring-[#00fff9]/20",
            "transition-all duration-300",
            "min-h-[48px] text-base",
            error && "border-[#ff0844]/50 focus:border-[#ff0844]",
            className
          )}
          {...props}
        />
        {error && (
          <p className="mt-2 text-sm text-[#ff0844]">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
