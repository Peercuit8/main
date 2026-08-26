"use client";

import React, { useState } from "react";
import Image from "next/image";
import { LogIn, LogOut, User, CheckCircle2, ChevronDown } from "lucide-react";
import { useAuth } from "./AuthProvider";

export function UserNav() {
  const { user, loading, signInWithGoogle, signOutUser } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isSigningIn, setIsSigningIn] = useState(false);

  const handleSignIn = async () => {
    setIsSigningIn(true);
    try {
      await signInWithGoogle();
    } finally {
      setIsSigningIn(false);
    }
  };

  if (loading) {
    return (
      <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-emerald-950/60 animate-pulse" />
    );
  }

  if (!user) {
    return (
      <button
        onClick={handleSignIn}
        disabled={isSigningIn}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 hover:bg-slate-200 dark:bg-[#0c1610] dark:hover:bg-[#122218] border border-slate-300 dark:border-emerald-500/20 rounded-xl transition-all cursor-pointer"
        title="Sign in with Google"
      >
        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
          <path
            fill="#4285F4"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="#34A853"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="#FBBC05"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
          />
          <path
            fill="#EA4335"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
          />
        </svg>
        <span>{isSigningIn ? "Signing in..." : "Google Sign In"}</span>
      </button>
    );
  }

  const initial = user.displayName?.charAt(0) || user.email?.charAt(0) || "U";

  return (
    <div className="relative">
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="flex items-center gap-2 p-1 pl-2 pr-2.5 rounded-full bg-emerald-50 dark:bg-[#0c1610] border border-emerald-300/60 dark:border-emerald-500/25 hover:border-[#0d623d] dark:hover:border-emerald-400 transition-all cursor-pointer"
      >
        {user.photoURL ? (
          <Image
            src={user.photoURL}
            alt={user.displayName || "User"}
            width={24}
            height={24}
            className="w-6 h-6 rounded-full object-cover"
          />
        ) : (
          <div className="w-6 h-6 rounded-full bg-[#0d623d] dark:bg-emerald-600 text-white font-bold text-xs flex items-center justify-center">
            {initial}
          </div>
        )}
        <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 max-w-[100px] truncate">
          {user.displayName ? user.displayName.split(" ")[0] : "Student"}
        </span>
        <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
      </button>

      {menuOpen && (
        <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-white dark:bg-[#0b140f] border border-slate-200 dark:border-emerald-500/25 shadow-xl p-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="pb-2.5 mb-2 border-b border-slate-100 dark:border-emerald-500/15">
            <p className="text-xs font-bold text-slate-900 dark:text-white truncate">
              {user.displayName || "Logged in Student"}
            </p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
              {user.email}
            </p>
          </div>

          <button
            onClick={() => {
              signOutUser();
              setMenuOpen(false);
            }}
            className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-xl transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      )}
    </div>
  );
}
