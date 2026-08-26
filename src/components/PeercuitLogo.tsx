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
  useImage = false,
}: PeercuitLogoProps) {
  const sizeMap = {
    sm: { icon: 30, text: "text-xl", gap: "gap-2.5" },
    md: { icon: 38, text: "text-2xl", gap: "gap-3" },
    lg: { icon: 48, text: "text-3xl", gap: "gap-3.5" },
    xl: { icon: 64, text: "text-4xl", gap: "gap-4" },
  };

  const { icon: iconSize, text: textSize, gap } = sizeMap[size];

  return (
    <div className={`inline-flex items-center ${gap} ${className} select-none group`}>
      {useImage ? (
        <div
          className="relative rounded-xl overflow-hidden shadow-xs border border-emerald-500/20 bg-white flex items-center justify-center p-0.5 transition-transform duration-200 group-hover:scale-105"
          style={{ width: iconSize, height: iconSize }}
        >
          <Image
            src="/logo.png"
            alt="Peercuit Logo"
            width={iconSize * 2}
            height={iconSize * 2}
            className="object-contain w-full h-full"
            priority
          />
        </div>
      ) : (
        /* Crisp High-DPI Circuit P Icon matching the exact brand geometry */
        <div 
          className="relative flex items-center justify-center rounded-xl bg-gradient-to-br from-[#0d623d] via-[#094d2f] to-[#04331f] p-1.5 shadow-md shadow-emerald-950/20 transition-transform duration-200 group-hover:scale-105 border border-emerald-400/30"
          style={{ width: iconSize, height: iconSize }}
        >
          <svg
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
          >
            {/* The 'P' shape trace */}
            <path
              d="M 28 15 
                 H 66 
                 C 82 15, 90 25, 90 40 
                 C 90 55, 82 65, 66 65 
                 H 52 
                 V 88 
                 H 38 
                 V 65 
                 H 28 
                 Z"
              fill="#ffffff"
            />
            {/* Inner counter subtraction */}
            <path
              d="M 48 30 
                 H 62 
                 C 70 30, 74 34, 74 40 
                 C 74 46, 70 50, 62 50 
                 H 48 
                 Z"
              fill="#094d2f"
            />
            {/* Circuit Node dot bottom left */}
            <circle cx="28" cy="74" r="8" fill="#34d399" />
            {/* Diagonal PCB trace */}
            <path
              d="M 28 74 
                 V 48 
                 L 52 24"
              stroke="#34d399"
              strokeWidth="6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Top right PCB terminal node */}
            <circle cx="58" cy="40" r="8.5" fill="#34d399" />
            <circle cx="58" cy="40" r="4" fill="#ffffff" />
          </svg>
        </div>
      )}

      {showWordmark && (
        <span className={`font-black tracking-tight ${textSize} text-slate-900 dark:text-white flex items-center leading-none transition-colors`}>
          Peer<span className="text-[#0d623d] dark:text-emerald-400">cuit</span>
        </span>
      )}
    </div>
  );
}
