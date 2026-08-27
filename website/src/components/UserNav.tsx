"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { LogOut } from "lucide-react";
import { useAuth } from "./AuthProvider";

export function UserNav() {
  const { user, loading, signInWithGoogle, signOutUser } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
      <div className="w-9 h-9 rounded-full bg-slate-200 dark:bg-emerald-950/60 animate-pulse" />
    );
  }

  // If not signed in: show ONLY the Google logo in a clean icon button
  if (!user) {
    return (
      <button
        onClick={handleSignIn}
        disabled={isSigningIn}
        aria-label="Sign in with Google"
        title="Sign in with Google"
        className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white dark:bg-[#0c1610] hover:bg-slate-100 dark:hover:bg-[#122218] border border-slate-200 dark:border-emerald-500/25 flex items-center justify-center shadow-xs hover:scale-105 active:scale-95 transition-all cursor-pointer disabled:opacity-50 shrink-0"
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24">
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
      </button>
    );
  }

  const initial = user.displayName?.charAt(0) || user.email?.charAt(0) || "U";

  // If signed in: show ONLY a circle and profile image of the Google account
  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="User menu"
        title={user.displayName || user.email || "Account"}
        className="w-8 h-8 sm:w-9 sm:h-9 rounded-full p-0.5 border-2 border-[#0d623d] dark:border-emerald-500/50 hover:border-emerald-400 dark:hover:border-emerald-400 transition-all shadow-xs hover:scale-105 active:scale-95 flex items-center justify-center overflow-hidden cursor-pointer shrink-0"
      >
        {user.photoURL ? (
          <Image
            src={user.photoURL}
            alt={user.displayName || "User profile"}
            width={36}
            height={36}
            className="w-full h-full rounded-full object-cover"
          />
        ) : (
          <div className="w-full h-full rounded-full bg-[#0d623d] dark:bg-emerald-600 text-white font-bold text-sm flex items-center justify-center">
            {initial}
          </div>
        )}
      </button>

      {/* Popover on click */}
      {menuOpen && (
        <div className="absolute right-0 mt-2 w-60 rounded-2xl bg-white dark:bg-[#0b140f] border border-slate-200 dark:border-emerald-500/25 shadow-2xl p-3.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="flex items-center gap-3 pb-3 mb-2.5 border-b border-slate-100 dark:border-emerald-500/15">
            {user.photoURL ? (
              <Image
                src={user.photoURL}
                alt={user.displayName || "User"}
                width={36}
                height={36}
                className="w-9 h-9 rounded-full object-cover border border-emerald-500/30"
              />
            ) : (
              <div className="w-9 h-9 rounded-full bg-[#0d623d] dark:bg-emerald-600 text-white font-bold text-sm flex items-center justify-center shrink-0">
                {initial}
              </div>
            )}
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold text-slate-900 dark:text-white truncate">
                {user.displayName || "Student"}
              </p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                {user.email}
              </p>
            </div>
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
