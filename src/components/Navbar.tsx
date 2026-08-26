"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Menu, X } from "lucide-react";
import { PeercuitLogo } from "./PeercuitLogo";
import { ThemeToggle } from "./ThemeToggle";
import { UserNav } from "./UserNav";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 dark:bg-[#050806]/90 backdrop-blur-md border-b border-slate-200 dark:border-emerald-500/[0.15] transition-colors duration-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo & Name in App Bar */}
        <Link href="/" className="flex items-center group">
          <PeercuitLogo size="sm" showWordmark={true} />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-7">
          <Link
            href="/#benefits"
            className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors"
          >
            What You Get
          </Link>
          <Link
            href="/#how-it-works"
            className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors"
          >
            How It Works
          </Link>
          <Link
            href="/#rituals"
            className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors"
          >
            Rituals
          </Link>
          <Link
            href="/#faq"
            className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors"
          >
            FAQ
          </Link>
        </nav>

        {/* Desktop CTA, Theme Toggle & User Auth */}
        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />
          <UserNav />
          <Link
            href="/apply"
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-[#0d623d] hover:bg-[#094d2f] dark:bg-emerald-600 dark:hover:bg-emerald-500 rounded-xl shadow-sm hover:shadow-md transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            Apply to Join
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Mobile Header Buttons */}
        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle />
          <UserNav />
          <Link
            href="/apply"
            className="px-3 py-1.5 text-xs font-semibold text-white bg-[#0d623d] dark:bg-emerald-600 rounded-lg"
          >
            Apply
          </Link>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-slate-700 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 focus:outline-none cursor-pointer"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-[#070e0a] border-b border-slate-200 dark:border-emerald-500/[0.15] px-4 py-6 space-y-4">
          <nav className="flex flex-col space-y-3">
            <Link
              href="/#benefits"
              onClick={() => setIsOpen(false)}
              className="text-base font-medium text-slate-700 dark:text-slate-200 hover:text-emerald-700 dark:hover:text-emerald-400 py-1"
            >
              What You Get
            </Link>
            <Link
              href="/#how-it-works"
              onClick={() => setIsOpen(false)}
              className="text-base font-medium text-slate-700 dark:text-slate-200 hover:text-emerald-700 dark:hover:text-emerald-400 py-1"
            >
              How It Works
            </Link>
            <Link
              href="/#rituals"
              onClick={() => setIsOpen(false)}
              className="text-base font-medium text-slate-700 dark:text-slate-200 hover:text-emerald-700 dark:hover:text-emerald-400 py-1"
            >
              Rituals
            </Link>
            <Link
              href="/#faq"
              onClick={() => setIsOpen(false)}
              className="text-base font-medium text-slate-700 dark:text-slate-200 hover:text-emerald-700 dark:hover:text-emerald-400 py-1"
            >
              FAQ
            </Link>
            <div className="pt-2">
              <Link
                href="/apply"
                onClick={() => setIsOpen(false)}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-[#0d623d] dark:bg-emerald-600 rounded-xl"
              >
                Apply to Join Peercuit
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
