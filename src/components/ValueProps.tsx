"use client";

import React from "react";
import {
  MessageSquareCode,
  Users2,
  Compass,
  CalendarCheck,
  Check,
  Zap,
} from "lucide-react";

const BENEFITS = [
  {
    icon: MessageSquareCode,
    color: "from-emerald-700 to-teal-800 dark:from-emerald-600 dark:to-teal-700",
    badge: "Honest & Constructive",
    title: "Peer feedback on your work",
    description:
      "Tired of posting your side projects into the void or getting polite 'looks good' from family? Get granular, honest feedback from fellow student engineers, UI designers, and writers who actually know the craft.",
    highlights: [
      "Roast-my-project critique threads",
      "UI/UX and code architectural reviews",
      "Actionable fixes before you launch",
    ],
  },
  {
    icon: Users2,
    color: "from-teal-700 to-emerald-900 dark:from-teal-600 dark:to-emerald-800",
    badge: "Break the Campus Bubble",
    title: "Meet like-minded students",
    description:
      "Most schools have only 2-3 people who share your specific obsessions. Peercuit connects you with curious, self-starter peers across schools and universities worldwide who love building cool stuff.",
    highlights: [
      "Find hackathon & project co-builders",
      "High school & college level collaboration",
      "Zero networking cringe — just genuine friends",
    ],
  },
  {
    icon: Compass,
    color: "from-emerald-800 to-green-950 dark:from-emerald-700 dark:to-green-900",
    badge: "Curated Opportunities",
    title: "Discover hackathons, comps & collabs",
    description:
      "We scout the best student opportunities so you don't miss out. Discover high-impact hackathons, student grant funds, open-source bounties, and early internship opportunities before everyone else.",
    highlights: [
      "Curated student hackathon tracker",
      "Grants, fellowship & incubator alerts",
      "Collab board for cross-disciplinary builds",
    ],
  },
  {
    icon: CalendarCheck,
    color: "from-emerald-600 to-teal-800 dark:from-emerald-500 dark:to-teal-700",
    badge: "Weekly Momentum",
    title: "Weekly community rituals",
    description:
      "Building alone can be isolating. Our regular asynchronous and live rituals keep you shipping consistently, talking through bold ideas, and learning from other students' breakthroughs.",
    highlights: [
      "Sunday 15-min Demo Nights",
      "Spicy student tech & philosophy debates",
      "1-on-1 virtual peer coffee chats",
    ],
  },
];

export function ValueProps() {
  return (
    <section id="benefits" className="py-24 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/70 border border-emerald-300/60 dark:border-emerald-500/25 text-emerald-800 dark:text-emerald-300 text-xs font-semibold uppercase tracking-wider mb-4">
            <Zap className="w-3.5 h-3.5 text-[#0d623d] dark:text-emerald-400" />
            Why Students Join Peercuit
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-5">
            Everything you need to <span className="gradient-text-primary">level up together</span>.
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300">
            We built the environment we wished existed in high school and college — a place where students build real things, share honest thoughts, and help each other win.
          </p>
        </div>

        {/* 4 Value Prop Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {BENEFITS.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={index}
                className="glass-card glass-card-hover rounded-2xl p-7 sm:p-8 flex flex-col justify-between relative overflow-hidden border border-slate-200 dark:border-emerald-500/[0.12]"
              >
                <div>
                  {/* Top Icon + Badge */}
                  <div className="flex items-center justify-between mb-6">
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${benefit.color} border border-emerald-500/30 flex items-center justify-center shadow-md text-white`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-500/20">
                      {benefit.badge}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                    {benefit.description}
                  </p>
                </div>

                {/* Bullets */}
                <div className="space-y-2.5 pt-4 border-t border-slate-200 dark:border-emerald-500/[0.12]">
                  {benefit.highlights.map((item, hIdx) => (
                    <div key={hIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                      <div className="w-4 h-4 rounded-full bg-emerald-100 dark:bg-emerald-500/20 text-[#0d623d] dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3" />
                      </div>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
