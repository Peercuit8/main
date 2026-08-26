"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  MessageSquare,
  Flame,
  Sparkles,
} from "lucide-react";

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-36 md:pb-24 overflow-hidden">
      {/* Background glowing gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] pointer-events-none radial-glow-emerald opacity-70 -z-10" />
      <div className="absolute top-40 right-10 w-96 h-96 pointer-events-none radial-glow-green opacity-40 -z-10" />
      <div className="absolute inset-0 bg-grid-pattern opacity-60 -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          {/* Top Pill / Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-950/70 border border-emerald-300/80 dark:border-emerald-500/30 text-emerald-800 dark:text-emerald-300 text-xs sm:text-sm font-medium mb-6 shadow-xs">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0d623d] dark:bg-emerald-500" />
            </span>
            <span className="font-semibold text-slate-900 dark:text-white">Curated Student Network</span>
            <span className="text-emerald-600 dark:text-emerald-400/50">•</span>
            <span className="text-emerald-800 dark:text-emerald-300">Cohort 4 Applications Open</span>
          </div>

          {/* Singular Bold Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white max-w-4xl leading-[1.1] mb-6">
            Find your people.{" "}
            <span className="gradient-text-primary block sm:inline">
              Build together.
            </span>
          </h1>

          {/* Sub-headline */}
          <p className="text-lg sm:text-xl text-slate-700 dark:text-slate-300 max-w-2xl font-normal leading-relaxed mb-10">
            A curated community for{" "}
            <span className="text-slate-900 dark:text-white font-semibold underline decoration-[#0d623d] dark:decoration-emerald-500 decoration-2 underline-offset-4">
              high school & college students
            </span>{" "}
            to get honest feedback on their work, find ambitious co-builders, discover opportunities, and ship projects that stand out.
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-16">
            <Link
              href="/apply"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 text-base font-bold text-white bg-[#0d623d] hover:bg-[#094d2f] dark:bg-gradient-to-r dark:from-emerald-600 dark:via-emerald-500 dark:to-teal-600 dark:hover:from-emerald-500 dark:hover:to-teal-500 rounded-xl shadow-lg shadow-emerald-900/15 dark:shadow-emerald-600/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              Apply to Join Peercuit
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="#how-it-works"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 text-base font-medium text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white bg-slate-100 hover:bg-slate-200 dark:bg-emerald-950/40 dark:hover:bg-emerald-950/70 border border-slate-200 dark:border-emerald-500/25 rounded-xl transition-all"
            >
              See How It Works
            </Link>
          </div>

          {/* Community Preview Card */}
          <div className="w-full max-w-4xl mx-auto rounded-2xl glass-card border border-slate-200 dark:border-emerald-500/20 p-4 sm:p-6 shadow-xl relative overflow-hidden text-left">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-emerald-500/[0.12] pb-3 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <span className="text-xs font-mono text-slate-600 dark:text-emerald-400/80 ml-2 font-medium">
                  #peercuit-channels &bull; community preview
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-[#0d623d] dark:text-emerald-400 font-mono font-medium">
                <span className="w-2 h-2 rounded-full bg-[#0d623d] dark:bg-emerald-400 animate-pulse" />
                <span>Active discussions</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {/* Card 1 */}
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#09120d]/80 border border-slate-200 dark:border-emerald-500/10 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900 dark:text-white">#roast-my-ui</span>
                  <span className="text-[10px] font-semibold text-emerald-800 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-300 dark:border-emerald-500/20">
                    Feedback
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-snug">
                  Share early wireframes, design systems, and web apps for actionable student design and code reviews.
                </p>
                <div className="text-[11px] text-[#0d623d] dark:text-emerald-400 flex items-center gap-1 font-medium">
                  <MessageSquare className="w-3 h-3" />
                  <span>Real constructive feedback</span>
                </div>
              </div>

              {/* Card 2 */}
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#09120d]/80 border border-slate-200 dark:border-emerald-500/10 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900 dark:text-white">#find-teammates</span>
                  <span className="text-[10px] font-semibold text-teal-800 dark:text-teal-400 bg-teal-100 dark:bg-teal-500/10 px-1.5 py-0.5 rounded border border-teal-300 dark:border-teal-500/20">
                    Hackathons
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-snug">
                  Partner with frontend devs, AI researchers, and designers for student hackathons and competitions.
                </p>
                <div className="text-[11px] text-teal-700 dark:text-emerald-400 flex items-center gap-1 font-medium">
                  <Flame className="w-3 h-3 text-amber-500" />
                  <span>Cross-campus teams</span>
                </div>
              </div>

              {/* Card 3 */}
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#09120d]/80 border border-slate-200 dark:border-emerald-500/10 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900 dark:text-white">#sunday-demos</span>
                  <span className="text-[10px] font-semibold text-emerald-800 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-300 dark:border-emerald-500/20">
                    Weekly Voice
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-snug">
                  15-minute weekly screenshares where students demo what they shipped and celebrate progress.
                </p>
                <div className="text-[11px] text-[#0d623d] dark:text-emerald-400 flex items-center gap-1 font-medium">
                  <Sparkles className="w-3 h-3" />
                  <span>Sunday 8 PM EST / 5:30 AM IST</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
