"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  Terminal,
  Flame,
  Coffee,
  Trophy,
  BookOpen,
  Users2,
  BrainCircuit,
  MessageSquare,
  Award,
} from "lucide-react";

const RITUALS = [
  {
    step: "01",
    day: "Every Sunday",
    time: "8:00 PM EST / 5:30 AM IST",
    title: "15-Min Demo Nights",
    description:
      "Hop on voice chat to screen-share what you built this week. Whether it's 10 lines of code, a Figma mockup, or a deployed app — showcase your work for real feedback.",
    tag: "Showcase & Feedback",
    icon: Terminal,
  },
  {
    step: "02",
    day: "Weekly & Bimonthly",
    time: "Live Audio & Text Stages",
    title: "Student Debates",
    description:
      "High-energy, structured student debates covering controversial tech trends, AI safety, open source, startup ideas, and philosophy.",
    tag: "Debates",
    icon: Flame,
  },
  {
    step: "03",
    day: "Bi-Weekly",
    time: "Flexible 1-on-1 Matching",
    title: "Peer Coffee Roulette",
    description:
      "Get randomly matched with another curious student builder for a casual 15-minute virtual coffee chat to exchange ideas and make genuine friends.",
    tag: "Random Coffee Chats",
    icon: Coffee,
  },
  {
    step: "04",
    day: "Monthly / Seasonal",
    time: "48-Hour Sprint Challenges",
    title: "Peercuit Internal Comps",
    description:
      "We host our own internal student hackathons, product design sprints, and prize bounties with community voting and grant awards.",
    tag: "Host Comps",
    icon: Trophy,
  },
  {
    step: "05",
    day: "End of Quarter",
    time: "Published Every 3 Months",
    title: "Quarterly Student Magazine",
    description:
      "Write deep-dive technical articles, project post-mortems, and founder stories published in our official end-of-quarter digital magazine.",
    tag: "Articles & Stories",
    icon: BookOpen,
  },
  {
    step: "06",
    day: "Ongoing",
    time: "High Schools & Colleges",
    title: "Campus Ambassadors & Karma Points",
    description:
      "Represent Peercuit at your school or university, organize local meetups, and earn Builder Karma points for reviewing peers and helping the community.",
    tag: "Ambassadors & Points",
    icon: Award,
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
            Community Rituals & Initiatives
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            How we <span className="gradient-text-primary">build and connect</span>.
          </h2>
          <p className="text-base text-slate-600 dark:text-slate-300 mt-3">
            From weekly feedback debates and demo nights to quarterly magazines and internal hackathons.
          </p>
        </div>

        {/* 6 Spotlight Ritual Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {RITUALS.map((ritual, idx) => {
            const Icon = ritual.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="glass-card rounded-3xl p-6 sm:p-7 border border-emerald-300/60 dark:border-emerald-500/25 shadow-xl flex flex-col justify-between hover:border-emerald-400 dark:hover:border-emerald-500/60 transition-all hover:scale-[1.01]"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300 bg-white/90 dark:bg-emerald-950/80 px-2.5 py-1 rounded-lg border border-slate-200 dark:border-emerald-500/20 shadow-xs truncate">
                      {ritual.day}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-300 dark:border-emerald-500/20 bg-emerald-100 dark:bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 shrink-0">
                      {ritual.tag}
                    </span>
                  </div>

                  <div className="flex items-start gap-3.5 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/90 border border-emerald-300/60 dark:border-emerald-500/25 flex items-center justify-center text-[#0d623d] dark:text-emerald-400 shrink-0 mt-0.5 shadow-xs">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
                        {ritual.title}
                      </h3>
                      <p className="text-xs text-[#0d623d] dark:text-emerald-400 font-semibold mb-2">
                        {ritual.time}
                      </p>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {ritual.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
