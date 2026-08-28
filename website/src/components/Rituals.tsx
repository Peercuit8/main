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
  Skull,
} from "lucide-react";

const RITUALS = [
  {
    step: "01",
    day: "Always On",
    time: "Community Onboarding",
    title: "Introductions Group",
    description:
      "New members drop in, share who they are, what they're building or learning, and what they're curious about. Breaks the ice before they jump into the rest of the community.",
    tag: "Icebreaker",
    icon: Users2,
  },
  {
    step: "02",
    day: "Daily",
    time: "Actionable Critique",
    title: "Feedback Group",
    description:
      "Members post their work-in-progress — code, design, writing, side projects — and get honest, actionable critique from peers. No empty praise, just real notes that make the work better.",
    tag: "Peer Review",
    icon: MessageSquare,
  },
  {
    step: "03",
    day: "Always On",
    time: "Find Your People",
    title: "Teammate Search",
    description:
      "A dedicated space to find people to build with — whether it's a hackathon partner, a co-founder for a side project, or someone to split a workload with. Post what you're building and what kind of person you need.",
    tag: "Networking",
    icon: BrainCircuit,
  },
  {
    step: "04",
    day: "Every Saturday",
    time: "Live Call & Demos",
    title: "Saturday Live Debate Call",
    description:
      "A weekly live call combining open debate on a chosen topic with a demo slot, where one member shows off what they've built that week. Mixes discussion with accountability.",
    tag: "Live Event",
    icon: Flame,
  },
  {
    step: "05",
    day: "Every 3-4 Days",
    time: "1-on-1 Matching",
    title: "Random Coffee Chats",
    description:
      "Members get randomly grouped for a casual chat — no agenda, just a chance to meet people outside their usual circle and make genuine connections.",
    tag: "Connections",
    icon: Coffee,
  },
  {
    step: "06",
    day: "Monthly",
    time: "Standout Recognition",
    title: "Candidate of the Month",
    description:
      "Once a month, one standout member is recognized with a certificate — based on activity, quality of feedback given, or work shipped.",
    tag: "Awards",
    icon: Award,
  },
  {
    step: "07",
    day: "Bi-monthly",
    time: "Hackathons & Sprints",
    title: "Bi-monthly Competitions",
    description:
      "Randomly announced competitions with a set deadline, culminating in a certificate for winners/top performers. Keeps the community shipping with a bit of friendly pressure.",
    tag: "Competitions",
    icon: Trophy,
  },
  {
    step: "08",
    day: "Always On",
    time: "Post-Mortems & Pivots",
    title: "Project Graveyard",
    description:
      "A transparent archive where members dissect failed projects, bad technical bets, and mistakes — so everyone learns what not to do without repeating the same errors.",
    tag: "Mistake Vault",
    icon: Skull,
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
                transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="rounded-3xl p-6 sm:p-7 bg-white/40 dark:bg-[#07130c]/40 backdrop-blur-md border border-emerald-900/5 dark:border-emerald-500/10 shadow-none hover:shadow-[0_8px_30px_rgba(13,98,61,0.08)] dark:hover:shadow-[0_8px_30px_rgba(16,185,129,0.08)] hover:-translate-y-0.5 hover:border-emerald-900/10 dark:hover:border-emerald-500/20 transition-all duration-300 flex flex-col justify-between"
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
