"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Mail, Heart } from "lucide-react";
import { PeercuitLogo } from "./PeercuitLogo";

export function Footer() {
  const pathname = usePathname();

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    targetId: string
  ) => {
    if (pathname === "/") {
      e.preventDefault();
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  return (
    <footer className="border-t border-emerald-950/10 dark:border-emerald-500/[0.12] bg-black/[0.015] dark:bg-black/25 pt-16 pb-12 text-slate-600 dark:text-slate-400 text-sm transition-colors backdrop-blur-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-emerald-950/10 dark:border-emerald-500/[0.08]">
          {/* Brand Col with Actual Logo */}
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="inline-block group">
              <PeercuitLogo size="md" />
            </Link>
            <p className="text-slate-600 dark:text-slate-400 max-w-sm leading-relaxed text-sm">
              The community for high school and college students to find like-minded peers, receive real feedback on their work, discover opportunities, and build things together.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
              <Mail className="w-4 h-4 text-[#0d623d] dark:text-emerald-400" />
              <span>Questions or partnerships? </span>
              <a
                href="mailto:team@peercuit.com"
                className="text-[#0d623d] dark:text-emerald-400 hover:underline font-semibold"
              >
                team@peercuit.com
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-wider font-bold text-slate-900 dark:text-emerald-400">
              Community
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/#benefits"
                  onClick={(e) => handleNavClick(e, "benefits")}
                  className="hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors cursor-pointer"
                >
                  What You Get
                </Link>
              </li>
              <li>
                <Link
                  href="/#how-it-works"
                  onClick={(e) => handleNavClick(e, "how-it-works")}
                  className="hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors cursor-pointer"
                >
                  How It Works
                </Link>
              </li>
              <li>
                <Link
                  href="/#rituals"
                  onClick={(e) => handleNavClick(e, "rituals")}
                  className="hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors cursor-pointer"
                >
                  Weekly Rituals
                </Link>
              </li>
              <li>
                <Link
                  href="/#faq"
                  onClick={(e) => handleNavClick(e, "faq")}
                  className="hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors cursor-pointer"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/apply"
                  className="text-[#0d623d] dark:text-emerald-400 hover:underline font-semibold transition-colors"
                >
                  Apply to Join &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* Socials */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-wider font-bold text-slate-900 dark:text-emerald-400">
              Connect With Us
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors flex items-center gap-1.5"
                >
                  <span>Twitter / X</span>
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors flex items-center gap-1.5"
                >
                  <span>Instagram</span>
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors flex items-center gap-1.5"
                >
                  <span>LinkedIn</span>
                </a>
              </li>
              <li>
                <a
                  href="https://discord.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors flex items-center gap-1.5"
                >
                  <span>Discord Community</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <p>© {new Date().getFullYear()} Peercuit Community. All rights reserved.</p>
          <div className="flex items-center gap-1.5">
            <span>Built with passion by and for student builders</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
