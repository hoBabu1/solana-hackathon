"use client";

import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  variant?: "default" | "cyan" | "purple" | "danger";
  hover?: boolean;
}

export function Card({ children, className, variant = "default", hover = false }: CardProps) {
  const variants = {
    default: "",
    cyan: "border-[#00fff9]/30 hover:border-[#00fff9]/50",
    purple: "border-[#b026ff]/30 hover:border-[#b026ff]/50",
    danger: "border-[#ff0844]/30 hover:border-[#ff0844]/50",
  };

  return (
    <div
      className={cn(
        "glass-card p-6",
        variants[variant],
        hover && "hover:scale-[1.02] transition-transform duration-300 cursor-pointer",
        className
      )}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("mb-4", className)}>
      {children}
    </div>
  );
}

export function CardTitle({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <h3 className={cn("text-xl font-bold", className)}>
      {children}
    </h3>
  );
}

export function CardDescription({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn("text-white/60 text-sm mt-1", className)}>
      {children}
    </p>
  );
}

export function CardContent({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("", className)}>
      {children}
    </div>
  );
}
