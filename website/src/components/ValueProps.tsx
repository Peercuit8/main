"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageSquareCode,
  Users2,
  Compass,
  Trophy,
  BookOpen,
  DollarSign,
  Award,
  Sparkles,
  Flame,
  Radio,
  Check,
  Zap,
  TrendingUp,
  BrainCircuit,
  Globe2,
  Coffee,
} from "lucide-react";

const BENEFITS = [
  {
    step: "01",
    icon: Users2,
    badge: "Icebreaker",
    title: "Introductions Group",
    tagline: "Break the ice and share what you're building.",
    description:
      "New members drop in, share who they are, what they're building or learning, and what they're curious about. Breaks the ice before they jump into the rest of the community.",
    highlights: ["Welcome new members", "Share your current stack", "Find mutual interests"],
    preview: {
      type: "playbook",
      title: "Welcome to Peercuit",
      badge: "Onboarding",
      items: [
        { label: "Who you are", desc: "Brief intro & background" },
        { label: "What you're building", desc: "Current projects & learning" },
        { label: "Curiosities", desc: "What you want to explore next" },
      ],
    },
  },
  {
    step: "02",
    icon: MessageSquareCode,
    badge: "Critique",
    title: "Feedback Group",
    tagline: "Honest, actionable critique from peers.",
    description:
      "Members post their work-in-progress — code, design, writing, side projects — and get honest, actionable critique from peers. No empty praise, just real notes that make the work better.",
    highlights: ["Code & design reviews", "No empty praise", "Actionable improvements"],
    preview: {
      type: "code",
      title: "feedback/review.tsx",
      badge: "Peer Review",
      lines: [
        { type: "comment", text: "// Peer review on your PR" },
        { type: "deleted", text: "- <Button color='gray'>Submit</Button>" },
        { type: "added", text: "+ <Button color='emerald' isLoading={pending}>Submit</Button>" },
        { type: "empty", text: "" },
        { type: "comment", text: "// Great start, but let's add loading states for better UX." },
      ],
    },
  },
  {
    step: "03",
    icon: BrainCircuit,
    badge: "Networking",
    title: "Co-founder & Teammate Search",
    tagline: "Find the right people to build with.",
    description:
      "A dedicated space to find people to build with — whether it's a hackathon partner, a co-founder for a side project, or someone to split a workload with. Post what you're building and what kind of person you need.",
    highlights: ["Hackathon team matching", "Side-project co-founders", "Skill-based search"],
    preview: {
      type: "bounty",
      title: "Looking for Frontend Dev",
      badge: "Teammate Search",
      event: "AI Study Tool Side Project",
      prize: "Looking for React/Tailwind skills",
      status: "Actively Recruiting",
    },
  },
  {
    step: "04",
    icon: Flame,
    badge: "Live Event",
    title: "Saturday Live Debate Call",
    tagline: "Weekly live calls with open debates and demos.",
    description:
      "A weekly live call combining open debate on a chosen topic with a demo slot, where one member shows off what they've built that week. Mixes discussion with accountability.",
    highlights: ["Open tech debates", "Weekly project demos", "High-energy discussions"],
    preview: {
      type: "magazine",
      title: "Saturday Live Sessions",
      badge: "Weekly Call",
      articles: [
        { title: "Debate: Open Source vs. Closed AI", tag: "Debate" },
        { title: "Demo: Alex's new budgeting app", tag: "Demo Slot" },
        { title: "Q&A and open floor", tag: "Community" },
      ],
    },
  },
  {
    step: "05",
    icon: Coffee,
    badge: "Connections",
    title: "Random Coffee Chats",
    tagline: "Casual 1-on-1s to make genuine connections.",
    description:
      "Every 3–4 days, members get randomly grouped for a casual chat — no agenda, just a chance to meet people outside their usual circle and make genuine connections.",
    highlights: ["Randomized matching", "No set agenda", "Expand your circle"],
    preview: {
      type: "playbook",
      title: "Coffee Chat Matches",
      badge: "Every 3-4 Days",
      items: [
        { label: "Match 1", desc: "You & Sarah (Design)" },
        { label: "Match 2", desc: "You & David (Backend)" },
        { label: "Match 3", desc: "You & Elena (Product)" },
      ],
    },
  },
  {
    step: "06",
    icon: Award,
    badge: "Recognition",
    title: "Best Candidate of the Month",
    tagline: "Monthly recognition for standout members.",
    description:
      "Once a month, one standout member is recognized with a certificate — based on activity, quality of feedback given, or work shipped.",
    highlights: ["Monthly standout recognition", "Based on community impact", "Official certificate award"],
    preview: {
      type: "karma",
      title: "Member of the Month",
      badge: "Recognition",
      metrics: [
        { label: "Quality Feedback", points: "Top 1%" },
        { label: "Projects Shipped", points: "3 Demos" },
        { label: "Community Impact", points: "High" },
      ],
    },
  },
  {
    step: "07",
    icon: Trophy,
    badge: "Events",
    title: "Bi-monthly Competitions",
    tagline: "Keep shipping with friendly pressure.",
    description:
      "Randomly announced competitions with a set deadline, culminating in a certificate for winners/top performers. Keeps the community shipping with a bit of friendly pressure.",
    highlights: ["Randomly announced themes", "Set shipping deadlines", "Winner certificates"],
    preview: {
      type: "bounty",
      title: "Next Competition Drop",
      badge: "Bi-monthly",
      event: "Build a Productivity Tool",
      prize: "Winner Certificate & Shoutout",
      status: "Deadline in 48h",
    },
  },
];

function PreviewCard({ item }: { item: any }) {
  const Icon = item.icon;
  return (
    <div className="glass-card rounded-2xl sm:rounded-3xl p-4 sm:p-7 lg:p-9 border-2 border-emerald-300/80 dark:border-emerald-500/35 shadow-2xl relative overflow-hidden flex flex-col justify-between h-full">
      {/* Background circuit grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />
      
      <div className="relative z-10 w-full">
        {/* Card Header */}
        <div className="flex items-start sm:items-center justify-between gap-3 mb-4 sm:mb-6">
          <div className="flex items-start sm:items-center gap-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-gradient-to-br from-emerald-100 to-emerald-200 dark:from-emerald-950 dark:to-[#094d2f] border border-emerald-300/80 dark:border-emerald-400/30 flex items-center justify-center text-[#0d623d] dark:text-emerald-400 shadow-md shrink-0">
              <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <span className="text-[11px] sm:text-xs font-bold text-[#0d623d] dark:text-emerald-400 uppercase tracking-wider">
                {item.badge}
              </span>
              <h3 className="text-lg sm:text-2xl lg:text-3xl font-black text-slate-900 dark:text-white leading-tight">
                {item.title}
              </h3>
            </div>
          </div>
          <span className="text-2xl sm:text-4xl font-black text-slate-300 dark:text-emerald-900/60 font-mono select-none shrink-0">
            {item.step}
          </span>
        </div>

        <p className="text-xs sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed mb-4 sm:mb-6">
          {item.description}
        </p>

        {/* Highlights Pills */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 mb-4 sm:mb-6">
          {item.highlights.map((h: string, i: number) => (
            <div
              key={i}
              className="p-2.5 sm:p-3 rounded-xl bg-white/80 dark:bg-[#07140c]/90 border border-emerald-200/80 dark:border-emerald-500/20 text-xs font-medium text-slate-700 dark:text-slate-200 flex items-start gap-2 shadow-xs"
            >
              <div className="w-4 h-4 rounded-full bg-emerald-100 dark:bg-emerald-500/20 text-[#0d623d] dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                <Check className="w-3 h-3" />
              </div>
              <span className="text-[11px] sm:text-xs leading-snug">{h}</span>
            </div>
          ))}
        </div>

        {/* Rich Interactive Mockup Preview */}
        <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-white/90 dark:bg-[#050e08] border border-emerald-300/70 dark:border-emerald-500/25 shadow-inner">
          {item.preview.type === "code" && (
            <div className="rounded-xl overflow-hidden border border-slate-700/50 bg-[#0d1117] shadow-xl">
              <div className="flex items-center px-4 py-2.5 bg-[#161b22] border-b border-slate-700/50">
                <div className="flex space-x-1.5 mr-4">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></div>
                </div>
                <span className="text-xs font-mono text-slate-400 font-medium">
                  {item.preview.title}
                </span>
              </div>
              <div className="p-4 overflow-x-auto text-xs font-mono leading-relaxed relative">
                {/* Fade edges for horizontal scroll */}
                <div className="absolute top-0 right-0 bottom-0 w-8 bg-gradient-to-l from-[#0d1117] to-transparent pointer-events-none md:hidden"></div>
                <div className="min-w-max">
                  {item.preview.lines?.map((line: any, idx: number) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1, duration: 0.3 }}
                      className={`flex ${line.type === "added" ? "bg-emerald-500/10 -mx-4 px-4 border-l-2 border-emerald-500" : line.type === "deleted" ? "bg-rose-500/10 -mx-4 px-4 border-l-2 border-rose-500" : "px-0 border-l-2 border-transparent"}`}
                    >
                      <span className="text-slate-600 w-6 shrink-0 select-none text-right pr-3">{idx + 1}</span>
                      <span className={`${line.type === "comment" ? "text-slate-500 italic" : line.type === "added" ? "text-emerald-400" : line.type === "deleted" ? "text-rose-400" : "text-slate-300"}`}>
                        {line.text}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {item.preview.type === "playbook" && (
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-xs font-mono text-slate-500 dark:text-slate-400 pb-1">
                <span className="text-[#0d623d] dark:text-emerald-400 font-bold flex items-center gap-1.5">
                  <BrainCircuit className="w-3.5 h-3.5 shrink-0" />
                  <span>{item.preview.title}</span>
                </span>
                <span className="text-[11px] font-semibold text-emerald-800 dark:text-emerald-400">
                  {item.preview.badge}
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-2.5">
                {item.preview.items?.map((it: any, itIdx: number) => (
                  <div
                    key={itIdx}
                    className="p-2 sm:p-2.5 rounded-xl bg-slate-50 dark:bg-[#08160d] border border-emerald-300/60 dark:border-emerald-500/20 text-xs shadow-xs"
                  >
                    <p className="font-bold text-slate-900 dark:text-white text-xs">{it.label}</p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-snug">{it.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {item.preview.type === "bounty" && (
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3 p-1">
              <div>
                <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <Trophy className="w-4 h-4 text-amber-500 shrink-0" />
                  <span>{item.preview.event}</span>
                </span>
                <p className="text-xs text-[#0d623d] dark:text-emerald-400 font-bold mt-0.5">
                  {item.preview.prize}
                </p>
              </div>
              <span className="text-[11px] sm:text-xs font-semibold px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl bg-emerald-100 dark:bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-500/25 self-start sm:self-auto">
                {item.preview.status}
              </span>
            </div>
          )}

          {item.preview.type === "magazine" && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-mono text-slate-500 dark:text-slate-400 pb-1">
                <span className="text-[#0d623d] dark:text-emerald-400 font-bold flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 shrink-0" />
                  <span>{item.preview.title}</span>
                </span>
                <span className="text-[11px] font-semibold text-emerald-800 dark:text-emerald-400">
                  {item.preview.badge}
                </span>
              </div>
              <div className="space-y-1.5">
                {item.preview.articles?.map((art: any, aIdx: number) => (
                  <div
                    key={aIdx}
                    className="flex items-center justify-between p-2 rounded-xl bg-slate-50 dark:bg-[#08160d] border border-emerald-300/40 dark:border-emerald-500/15 text-xs"
                  >
                    <span className="font-semibold text-slate-900 dark:text-slate-200 truncate pr-2 text-[11px] sm:text-xs">
                      {art.title}
                    </span>
                    <span className="text-[10px] bg-emerald-100 dark:bg-emerald-500/20 text-[#0d623d] dark:text-emerald-300 px-2 py-0.5 rounded font-bold shrink-0">
                      {art.tag}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {item.preview.type === "karma" && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-mono text-slate-500 dark:text-slate-400 pb-1">
                <span className="text-[#0d623d] dark:text-emerald-400 font-bold flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  <span>{item.preview.title}</span>
                </span>
                <span className="text-[11px] font-semibold text-emerald-800 dark:text-emerald-400">
                  {item.preview.badge}
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {item.preview.metrics?.map((m: any, mIdx: number) => (
                  <div
                    key={mIdx}
                    className="p-2 sm:p-2.5 rounded-xl bg-slate-50 dark:bg-[#08160d] border border-emerald-300/60 dark:border-emerald-500/20 text-xs text-center shadow-xs"
                  >
                    <p className="font-bold text-slate-900 dark:text-white text-xs">{m.label}</p>
                    <p className="text-xs font-black text-[#0d623d] dark:text-emerald-400 mt-0.5">{m.points}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function ValueProps() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Smooth scroll spy on desktop viewports
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      if (window.innerWidth < 1024) return; // Only enable scroll spy on desktop

      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      const stickyTop = 80; // corresponds to top-20 (5rem = 80px)
      const totalScrollable = rect.height - windowHeight;
      if (totalScrollable <= 0) return;

      const currentScroll = stickyTop - rect.top;
      const progress = Math.max(0, Math.min(1, currentScroll / totalScrollable));

      const index = Math.min(BENEFITS.length - 1, Math.floor(progress * BENEFITS.length));
      setActiveIndex(index);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleTabClick = (idx: number) => {
    setActiveIndex(idx);
    if (containerRef.current && window.innerWidth >= 1024) {
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const totalScrollable = rect.height - windowHeight;
      if (totalScrollable > 0) {
        const targetScroll = window.scrollY + rect.top - 80 + (idx / BENEFITS.length) * totalScrollable + 10;
        window.scrollTo({ top: targetScroll, behavior: "smooth" });
      }
    }
  };

  return (
    <section ref={containerRef} id="benefits" className="relative py-12 lg:py-16 lg:min-h-[320vh]">
      {/* Sticky viewport on desktop / standard fluid on mobile */}
      <div className="lg:sticky lg:top-20 lg:min-h-[85vh] flex flex-col justify-center overflow-hidden py-2 sm:py-4">
        {/* Ambient Neon Lighting */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] radial-glow-emerald opacity-60 pointer-events-none -z-10" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          {/* Header */}
          <div className="mb-8 lg:mb-12 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-300/80 dark:border-emerald-500/30 text-emerald-800 dark:text-emerald-300 text-xs font-semibold uppercase tracking-wider mb-2.5 shadow-xs">
              <Zap className="w-3.5 h-3.5 text-[#0d623d] dark:text-emerald-400 animate-pulse" />
              What We Do in Peercuit
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
              Everything you need to <span className="gradient-text-primary">level up together</span>.
            </h2>
          </div>

          {/* Desktop HUD */}
          <div className="hidden lg:grid grid-cols-12 gap-8 items-center">
            {/* Left Column: Interactive Navigation Bars */}
            <div className="col-span-4 space-y-3">
              {BENEFITS.map((item, idx) => {
                const isActive = activeIndex === idx;
                const Icon = item.icon;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleTabClick(idx)}
                    className={`w-full text-left p-4 rounded-2xl transition-all duration-300 cursor-pointer relative overflow-hidden group ${
                      isActive
                        ? "glass-card border-2 border-emerald-500 shadow-xl shadow-emerald-950/15 scale-[1.02]"
                        : "glass-card border border-emerald-900/10 dark:border-emerald-500/15 opacity-60 hover:opacity-100 hover:border-emerald-400/50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 font-bold text-xs transition-colors duration-300 shadow-xs ${
                          isActive
                            ? "bg-[#0d623d] text-white dark:bg-emerald-500 shadow-emerald-500/30"
                            : "bg-emerald-100 dark:bg-emerald-950/80 text-[#0d623d] dark:text-emerald-400"
                        }`}
                      >
                        {item.step}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-bold text-slate-900 dark:text-white truncate">
                          {item.title}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                          {item.badge}
                        </p>
                      </div>
                      <Icon className={`w-4 h-4 transition-colors ${isActive ? "text-[#0d623d] dark:text-emerald-400" : "text-slate-400"}`} />
                    </div>

                    {/* Glowing bottom line for active card */}
                    {isActive && (
                      <motion.div
                        layoutId="active-benefit-indicator"
                        className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#0d623d] via-emerald-400 to-[#16a34a]"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Right Column: 3D Holographic Card Display */}
            <div className="col-span-8 min-h-[440px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: 15, scale: 0.99 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -15, scale: 0.99 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="h-full"
                >
                  <PreviewCard item={BENEFITS[activeIndex]} />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Mobile Stack */}
          <div className="flex flex-col gap-6 lg:hidden">
            {BENEFITS.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <PreviewCard item={item} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
