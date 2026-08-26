"use client";

import React from "react";
import { Sparkles, Terminal, Flame, Coffee, Gift } from "lucide-react";

const RITUALS = [
  {
    day: "Every Sunday",
    time: "8:00 PM EST / 5:30 AM IST",
    title: "15-Min Demo Night",
    description:
      "Hop on voice chat to screen-share what you built this week. Whether it's 10 lines of code, a Figma mockup, or a deployed app — celebrate shipping with peers.",
    tag: "Live Audio & Screen Share",
    icon: Terminal,
    accent: "text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-500/20 bg-emerald-100 dark:bg-emerald-500/10",
  },
  {
    day: "Every Friday",
    time: "All Day Asynchronous",
    title: "#Roast-My-Project",
    description:
      "Drop your GitHub repo, landing page, pitch deck, or essay. Get thoughtful reviews detailing UX bugs, code refactors, and conversion tweaks.",
    tag: "Deep Feedback",
    icon: Flame,
    accent: "text-emerald-800 dark:text-emerald-400 border-emerald-300 dark:border-emerald-500/20 bg-emerald-100 dark:bg-emerald-500/10",
  },
  {
    day: "Bi-Weekly",
    time: "Flexible 1-on-1 Matching",
    title: "Peer Coffee Roulette",
    description:
      "Get automatically paired with a fellow student builder based on complementary interests (e.g. an AI engineer matched with a UI/UX designer).",
    tag: "Networking",
    icon: Coffee,
    accent: "text-teal-800 dark:text-teal-300 border-teal-300 dark:border-teal-500/20 bg-teal-100 dark:bg-teal-500/10",
  },
  {
    day: "Monthly",
    time: "Weekend Special",
    title: "Student Hackathons & Sprints",
    description:
      "Internal 48-hour sprint challenges and organized teams to solve real problems, build portfolio artifacts, and compete.",
    tag: "Sprints & Builds",
    icon: Gift,
    accent: "text-emerald-800 dark:text-mint border-emerald-300 dark:border-emerald-400/20 bg-emerald-100 dark:bg-emerald-500/10",
  },
];

export function Rituals() {
  return (
    <section id="rituals" className="py-24 relative bg-slate-50 dark:bg-[#040705]/60 border-y border-slate-200 dark:border-emerald-500/[0.12] transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/70 border border-emerald-300/60 dark:border-emerald-500/25 text-emerald-800 dark:text-emerald-300 text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#0d623d] dark:text-emerald-400" />
            Weekly Community Rhythm
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-5">
            Rituals that keep you <span className="gradient-text-primary">shipping</span>.
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300">
            No ghost towns or endless notification spam. We structure lightweight, high-energy rituals so you stay consistent and motivated.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {RITUALS.map((ritual, idx) => {
            const Icon = ritual.icon;
            return (
              <div
                key={idx}
                className="glass-card rounded-2xl p-6 sm:p-7 border border-slate-200 dark:border-emerald-500/[0.12] hover:border-[#0d623d] dark:hover:border-emerald-400/30 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-emerald-950/80 px-3 py-1 rounded-lg border border-slate-200 dark:border-emerald-500/20">
                      {ritual.day} &bull; <span className="text-[#0d623d] dark:text-emerald-400">{ritual.time}</span>
                    </span>
                    <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${ritual.accent}`}>
                      {ritual.tag}
                    </span>
                  </div>

                  <div className="flex items-start gap-4 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/90 border border-emerald-300/60 dark:border-emerald-500/25 flex items-center justify-center text-[#0d623d] dark:text-emerald-400 shrink-0 mt-1 shadow-xs">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                        {ritual.title}
                      </h3>
                      <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                        {ritual.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
