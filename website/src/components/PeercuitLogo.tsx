"use client";

import React from "react";
import Image from "next/image";

interface PeercuitLogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  showWordmark?: boolean;
  className?: string;
  useImage?: boolean;
}

export function PeercuitLogo({
  size = "md",
  showWordmark = true,
  className = "",
  useImage = true,
  hideWordmarkOnMobile = false,
}: PeercuitLogoProps & { hideWordmarkOnMobile?: boolean }) {
  const sizeMap = {
    sm: { icon: 34, text: "text-xl", gap: "gap-2.5" },
    md: { icon: 42, text: "text-2xl", gap: "gap-3" },
    lg: { icon: 52, text: "text-3xl", gap: "gap-3.5" },
    xl: { icon: 68, text: "text-4xl", gap: "gap-4" },
  };

  const { icon: iconSize, text: textSize, gap } = sizeMap[size];

  return (
    <div className={`inline-flex items-center ${gap} ${className} select-none group`}>
      {/* Actual uploaded logo image with rounded corners and crisp shadow */}
      <div
        className="relative rounded-xl overflow-hidden shadow-xs border border-emerald-500/20 bg-white flex items-center justify-center p-0.5 transition-transform duration-200 group-hover:scale-105 shrink-0"
        style={{ width: iconSize, height: iconSize }}
      >
        <Image
          src="/logo.png"
          alt="Peercuit Logo"
          width={iconSize * 2}
          height={iconSize * 2}
          className="object-contain w-full h-full rounded-lg"
          priority
        />
      </div>

      {showWordmark && (
        <span className={`font-black tracking-tight ${textSize} text-slate-900 dark:text-white ${hideWordmarkOnMobile ? 'hidden sm:flex' : 'flex'} items-center leading-none transition-colors`}>
          Peer<span className="text-[#0d623d] dark:text-emerald-400">cuit</span>
        </span>
      )}
    </div>
  );
}
