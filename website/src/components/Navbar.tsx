"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Menu, X } from "lucide-react";
import { PeercuitLogo } from "./PeercuitLogo";
import { ThemeToggle } from "./ThemeToggle";
import { UserNav } from "./UserNav";

const NAV_ITEMS = [
  { id: "benefits", label: "What You Get", href: "/#benefits" },
  { id: "how-it-works", label: "How It Works", href: "/#how-it-works" },
  { id: "rituals", label: "Rituals", href: "/#rituals" },
  { id: "faq", label: "FAQ", href: "/#faq" },
  { id: "founders", label: "Founders", href: "/#founders" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const pathname = usePathname();

  // Scroll spy to detect active section in viewport when on home page
  useEffect(() => {
    if (pathname !== "/") {
      setActiveSection("");
      return;
    }

    const sectionIds = ["benefits", "how-it-works", "rituals", "faq", "founders"];
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 250;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i];
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(id);
            return;
          }
        }
      }
      setActiveSection("");
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    targetId: string
  ) => {
    if (pathname === "/") {
      e.preventDefault();
      const el = document.getElementById(targetId);
      if (el) {
        setActiveSection(targetId);
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        setIsOpen(false);
      }
    } else {
      setIsOpen(false);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 dark:bg-[#050806]/90 backdrop-blur-md border-b border-slate-200 dark:border-emerald-500/[0.15] transition-colors duration-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo & Name in App Bar */}
        <Link href="/" className="flex items-center group">
          <PeercuitLogo size="sm" showWordmark={true} hideWordmarkOnMobile={true} />
        </Link>

        {/* Desktop Nav with Animated Active Underline */}
        <nav className="hidden md:flex items-center gap-1 sm:gap-2">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === "/" && activeSection === item.id;
            return (
              <Link
                key={item.id}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.id)}
                className={`relative px-4 py-2 text-sm font-medium transition-colors cursor-pointer rounded-lg hover:bg-slate-50 dark:hover:bg-emerald-500/10 ${
                  isActive
                    ? "text-[#0d623d] dark:text-emerald-400 font-semibold"
                    : "text-slate-600 dark:text-slate-300 hover:text-[#0d623d] dark:hover:text-emerald-400"
                }`}
              >
                <span>{item.label}</span>

                {/* Animated active underline */}
                {isActive && (
                  <motion.div
                    layoutId="active-nav-underline"
                    className="absolute bottom-1 left-3 right-3 h-0.5 bg-[#0d623d] dark:bg-emerald-400 rounded-full shadow-xs"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Desktop CTA, Theme Toggle & User Auth */}
        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />
          <UserNav />
          <div className="relative">
            <Link
              href="/apply"
              className={`relative inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-xl transition-all ${
                pathname === "/apply"
                  ? "bg-[#0d623d] dark:bg-emerald-500 text-white shadow-md ring-2 ring-emerald-400/40"
                  : "text-white bg-[#0d623d] hover:bg-[#094d2f] dark:bg-emerald-600 dark:hover:bg-emerald-500 shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-[0.98]"
              }`}
            >
              Apply to Join
              <ArrowRight className="w-4 h-4" />
            </Link>
            {pathname === "/apply" && (
              <motion.div
                layoutId="active-nav-underline"
                className="absolute -bottom-2 left-2 right-2 h-0.5 bg-[#0d623d] dark:bg-emerald-400 rounded-full"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
          </div>
        </div>

        {/* Mobile Header Buttons */}
        <div className="flex md:hidden items-center gap-1 sm:gap-2">
          <ThemeToggle />
          <UserNav />
          <Link
            href="/apply"
            className="px-3 py-1.5 text-xs sm:text-sm font-semibold text-white bg-[#0d623d] dark:bg-emerald-600 rounded-lg min-h-[36px] sm:min-h-[44px] flex items-center justify-center ml-1"
          >
            Apply
          </Link>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-1.5 sm:p-2 min-h-[36px] min-w-[36px] sm:min-h-[44px] sm:min-w-[44px] flex items-center justify-center text-slate-700 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 focus:outline-none cursor-pointer"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="md:hidden overflow-hidden bg-white dark:bg-[#070e0a] border-b border-slate-200 dark:border-emerald-500/[0.15]"
          >
            <div className="px-4 py-6 space-y-4">
              <nav className="flex flex-col space-y-1">
                {NAV_ITEMS.map((item) => {
                  const isActive = pathname === "/" && activeSection === item.id;
                  return (
                    <Link
                      key={item.id}
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item.id)}
                      className={`text-base font-medium py-3 px-4 rounded-lg min-h-[44px] flex items-center justify-between transition-colors ${
                        isActive
                          ? "text-[#0d623d] dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-950/40"
                          : "text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-emerald-900/20 hover:text-[#0d623d] dark:hover:text-emerald-400"
                      }`}
                    >
                      <span>{item.label}</span>
                      {isActive && (
                        <span className="w-2 h-2 rounded-full bg-[#0d623d] dark:bg-emerald-400" />
                      )}
                    </Link>
                  );
                })}
                <div className="pt-4">
                  <Link
                    href="/apply"
                    onClick={() => setIsOpen(false)}
                    className={`w-full min-h-[44px] flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-white rounded-xl ${
                      pathname === "/apply"
                        ? "bg-[#094d2f] dark:bg-emerald-500 ring-2 ring-emerald-400/40"
                        : "bg-[#0d623d] dark:bg-emerald-600"
                    }`}
                  >
                    Apply to Join Peercuit
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
