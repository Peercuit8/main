"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  MessageSquare,
  Flame,
  Sparkles,
  Zap,
  Activity,
  Code2,
  Users,
} from "lucide-react";

export function Hero() {
  return (
    <section className="relative pt-24 pb-14 sm:pt-32 sm:pb-20 md:pt-36 md:pb-24 overflow-hidden">
      {/* Background glowing ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] pointer-events-none radial-glow-emerald opacity-75 -z-10" />
      <div className="absolute top-40 right-10 w-96 h-96 pointer-events-none radial-glow-green opacity-40 -z-10" />
      <motion.div 
        animate={{ backgroundPosition: ["0px 0px", "36px 36px"] }}
        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
        className="absolute inset-0 bg-grid-pattern opacity-50 -z-10 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" 
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          {/* Top Pill / Live Signal Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-white/90 dark:bg-emerald-950/80 border border-emerald-300/80 dark:border-emerald-500/30 text-emerald-800 dark:text-emerald-300 text-xs sm:text-sm font-medium mb-5 sm:mb-6 shadow-md max-w-[95%] truncate"
          >
            <span className="relative flex h-2 w-2 sm:h-2.5 sm:w-2.5 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75 duration-1000" />
              <span className="relative inline-flex rounded-full h-2 w-2 sm:h-2.5 sm:w-2.5 bg-[#0d623d] dark:bg-emerald-400" />
            </span>
            <span className="font-bold text-slate-900 dark:text-white truncate">Curated Student Network</span>
            <span className="text-emerald-600 dark:text-emerald-400/50">•</span>
            <span className="text-[#0d623d] dark:text-emerald-300 font-semibold truncate">Applications Open</span>
          </motion.div>

          {/* Singular Bold Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-slate-900 dark:text-white max-w-4xl leading-[1.1] mb-5 sm:mb-6">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="inline-block"
            >
              Find your people.
            </motion.span>{" "}
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="gradient-text-primary block sm:inline-block mt-1 sm:mt-0"
            >
              Build together.
            </motion.span>
          </h1>

          {/* Sub-headline */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="text-base sm:text-lg md:text-xl text-slate-700 dark:text-slate-300 max-w-2xl font-normal leading-relaxed mb-8 sm:mb-10 px-2"
          >
            A curated community for{" "}
            <span className="text-slate-900 dark:text-white font-semibold underline decoration-[#0d623d] dark:decoration-emerald-500 decoration-2 underline-offset-4">
              high school & college students
            </span>{" "}
            to get honest feedback on their work, find ambitious co-builders, discover opportunities, and ship projects that stand out.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full sm:w-auto mb-12 sm:mb-16"
          >
            <Link
              href="/apply"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 text-sm sm:text-base font-bold text-white bg-[#0d623d] hover:bg-[#094d2f] dark:bg-gradient-to-r dark:from-emerald-600 dark:via-emerald-500 dark:to-teal-600 dark:hover:from-emerald-500 dark:hover:to-teal-500 rounded-xl shadow-xl shadow-emerald-900/20 dark:shadow-emerald-600/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              Apply to Join Peercuit
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </Link>
            <Link
              href="#benefits"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3.5 sm:py-4 text-sm sm:text-base font-medium text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white glass-card border border-emerald-300/60 dark:border-emerald-500/25 rounded-xl transition-all shadow-xs"
            >
              Explore Community Deck
            </Link>
          </motion.div>

          {/* 3 Core Highlight Cards */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="w-full max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4 text-left"
          >
            {/* Card 1 */}
            <div className="p-4 sm:p-5 rounded-2xl glass-card border border-emerald-300/60 dark:border-emerald-500/20 space-y-2 sm:space-y-2.5 shadow-sm hover:border-emerald-400 dark:hover:border-emerald-500/50 transition-all hover:scale-[1.01]">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <Code2 className="w-4 h-4 text-[#0d623d] dark:text-emerald-400" />
                  Project Critique
                </span>
                <span className="text-[10px] font-bold text-emerald-800 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-300 dark:border-emerald-500/20">
                  Feedback
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Share early wireframes, design systems, and web apps for actionable student design and code reviews.
              </p>
              <div className="text-xs text-[#0d623d] dark:text-emerald-400 flex items-center gap-1.5 font-semibold pt-1">
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Real constructive feedback</span>
              </div>
            </div>

            {/* Card 2 */}
            <div className="p-4 sm:p-5 rounded-2xl glass-card border border-emerald-300/60 dark:border-emerald-500/20 space-y-2 sm:space-y-2.5 shadow-sm hover:border-emerald-400 dark:hover:border-emerald-500/50 transition-all hover:scale-[1.01]">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                  Teammate Matching
                </span>
                <span className="text-[10px] font-bold text-teal-800 dark:text-teal-400 bg-teal-100 dark:bg-teal-500/10 px-2 py-0.5 rounded-full border border-teal-300 dark:border-teal-500/20">
                  Hackathons
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Partner with frontend devs, AI researchers, and designers for student hackathons and competitions.
              </p>
              <div className="text-xs text-teal-700 dark:text-emerald-400 flex items-center gap-1.5 font-semibold pt-1">
                <Flame className="w-3.5 h-3.5 text-amber-500" />
                <span>Cross-campus teams</span>
              </div>
            </div>

            {/* Card 3 */}
            <div className="p-4 sm:p-5 rounded-2xl glass-card border border-emerald-300/60 dark:border-emerald-500/20 space-y-2 sm:space-y-2.5 shadow-sm hover:border-emerald-400 dark:hover:border-emerald-500/50 transition-all hover:scale-[1.01]">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <Activity className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  Sunday Demos
                </span>
                <span className="text-[10px] font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-300 dark:border-emerald-500/20">
                  Weekly Live
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                15-minute weekly screenshares where students demo what they shipped and celebrate progress.
              </p>
              <div className="text-xs text-[#0d623d] dark:text-emerald-400 flex items-center gap-1.5 font-semibold pt-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Sunday 8 PM EST / 5:30 AM IST</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
