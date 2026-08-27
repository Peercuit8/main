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
    <footer className="border-t border-emerald-950/10 dark:border-emerald-500/[0.12] bg-black/[0.015] dark:bg-black/25 pt-12 sm:pt-16 pb-10 sm:pb-12 text-slate-600 dark:text-slate-400 text-sm transition-colors backdrop-blur-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-8">
        <div className="flex flex-col md:flex-row gap-10 md:gap-12 pb-12 border-b border-emerald-950/10 dark:border-emerald-500/[0.08]">
          {/* Brand Col with Actual Logo */}
          <div className="flex-1 space-y-4">
            <Link href="/" className="inline-block group">
              <PeercuitLogo size="md" />
            </Link>
            <p className="text-slate-600 dark:text-slate-400 max-w-sm leading-relaxed text-xs sm:text-sm">
              The community for high school and college students to find like-minded peers, receive real feedback on their work, discover opportunities, and build things together.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300 pt-2">
              <Mail className="w-4 h-4 text-[#0d623d] dark:text-emerald-400 shrink-0" />
              <span>Questions or partnerships? </span>
              <a
                href="mailto:peercuit8@gmail.com"
                className="text-[#0d623d] dark:text-emerald-400 hover:underline font-semibold"
              >
                peercuit8@gmail.com
              </a>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-10 md:gap-16">
            {/* Quick Links */}
            <div className="space-y-4 min-w-[140px]">
              <h4 className="text-xs uppercase tracking-wider font-bold text-slate-900 dark:text-emerald-400">
                Community
              </h4>
              <ul className="space-y-3 text-xs sm:text-sm">
                <li>
                  <Link
                    href="/#benefits"
                    onClick={(e) => handleNavClick(e, "benefits")}
                    className="hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors cursor-pointer"
                  >
                    What We Do
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
                    Community Rituals
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
            <div className="space-y-4 min-w-[140px]">
              <h4 className="text-xs uppercase tracking-wider font-bold text-slate-900 dark:text-emerald-400">
                Connect With Us
              </h4>
              <ul className="space-y-3 text-xs sm:text-sm">
                <li>
                  <a
                    href="https://www.linkedin.com/company/peercuit/"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors flex items-center gap-2"
                  >
                    <span>LinkedIn</span>
                  </a>
                </li>
                <li>
                  <Link
                    href="/apply"
                    className="hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors flex items-center gap-2 font-semibold text-[#0d623d] dark:text-emerald-400"
                  >
                    <span>Join WhatsApp Circle</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400 text-center sm:text-left">
          <p>© {new Date().getFullYear()} Peercuit Community. All rights reserved.</p>
          <div className="flex items-center gap-1.5">
            <span>Built with passion by and for student builders</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
