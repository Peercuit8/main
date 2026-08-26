"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Terminal, Flame, Coffee, Gift } from "lucide-react";

const RITUALS = [
  {
    step: "01",
    day: "Every Sunday",
    time: "8:00 PM EST / 5:30 AM IST",
    title: "15-Min Demo Night",
    description:
      "Hop on voice chat to screen-share what you built this week. Whether it's 10 lines of code, a Figma mockup, or a deployed app — celebrate shipping with peers.",
    tag: "Live Audio & Screen Share",
    icon: Terminal,
  },
  {
    step: "02",
    day: "Every Friday",
    time: "All Day Asynchronous",
    title: "#Roast-My-Project",
    description:
      "Drop your GitHub repo, landing page, pitch deck, or essay. Get thoughtful reviews detailing UX bugs, code refactors, and conversion tweaks.",
    tag: "Deep Feedback",
    icon: Flame,
  },
  {
    step: "03",
    day: "Bi-Weekly",
    time: "Flexible 1-on-1 Matching",
    title: "Peer Coffee Roulette",
    description:
      "Get automatically paired with a fellow student builder based on complementary interests (e.g. an AI engineer matched with a UI/UX designer).",
    tag: "Networking",
    icon: Coffee,
  },
  {
    step: "04",
    day: "Monthly",
    time: "Weekend Special",
    title: "Student Hackathons & Sprints",
    description:
      "Internal 48-hour sprint challenges and organized teams to solve real problems, build portfolio artifacts, and compete.",
    tag: "Sprints & Builds",
    icon: Gift,
  },
];

export function Rituals() {
  return (
    <section id="rituals" className="py-24 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/70 border border-emerald-300/60 dark:border-emerald-500/25 text-emerald-800 dark:text-emerald-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#0d623d] dark:text-emerald-400" />
            Weekly Community Rhythm
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Rituals that keep you <span className="gradient-text-primary">shipping</span>.
          </h2>
          <p className="text-base text-slate-600 dark:text-slate-300 mt-3">
            Regular asynchronous and live rituals designed for busy students.
          </p>
        </div>

        {/* 4 Spotlight Ritual Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {RITUALS.map((ritual, idx) => {
            const Icon = ritual.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="glass-card rounded-3xl p-6 sm:p-8 border border-emerald-300/60 dark:border-emerald-500/25 shadow-xl flex flex-col justify-between hover:border-emerald-400 dark:hover:border-emerald-500/60 transition-all hover:scale-[1.01]"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300 bg-white/90 dark:bg-emerald-950/80 px-3 py-1 rounded-lg border border-slate-200 dark:border-emerald-500/20 shadow-xs">
                      {ritual.day} &bull;{" "}
                      <span className="text-[#0d623d] dark:text-emerald-400 font-semibold">
                        {ritual.time}
                      </span>
                    </span>
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-emerald-300 dark:border-emerald-500/20 bg-emerald-100 dark:bg-emerald-500/10 text-emerald-800 dark:text-emerald-300">
                      {ritual.tag}
                    </span>
                  </div>

                  <div className="flex items-start gap-4 mb-2">
                    <div className="w-11 h-11 rounded-2xl bg-emerald-100 dark:bg-emerald-950/90 border border-emerald-300/60 dark:border-emerald-500/25 flex items-center justify-center text-[#0d623d] dark:text-emerald-400 shrink-0 mt-1 shadow-xs">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1.5">
                        {ritual.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                        {ritual.description}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
