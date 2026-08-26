"use client";

import React, { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "./ThemeProvider";

export function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className={`w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/20 ${className}`} />
    );
  }

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className={`relative p-2 rounded-lg transition-all duration-200 cursor-pointer border ${
        theme === "dark"
          ? "bg-[#0c1610] text-emerald-400 border-emerald-500/20 hover:border-emerald-500/40 hover:bg-[#112017]"
          : "bg-emerald-50 text-emerald-800 border-emerald-200 hover:border-emerald-300 hover:bg-emerald-100/80 shadow-xs"
      } ${className}`}
    >
      {theme === "dark" ? (
        <Sun className="w-4 h-4 text-amber-300 transition-transform rotate-0 hover:rotate-45 duration-300" />
      ) : (
        <Moon className="w-4 h-4 text-emerald-800 transition-transform -rotate-12 hover:rotate-0 duration-300" />
      )}
    </button>
  );
}
