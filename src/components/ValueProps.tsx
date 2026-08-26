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
    icon: MessageSquareCode,
    badge: "Feedback & Roast Threads",
    title: "Showcase work for real peer feedback",
    tagline: "Granular UI, code, and copy reviews before public launch.",
    description:
      "Tired of posting side projects into the void? Get real, actionable critique from fellow student engineers, UI designers, and writers who understand the craft.",
    highlights: [
      "Roast-my-project critique threads",
      "UI/UX and architectural code reviews",
      "Actionable fixes before you launch publicly",
    ],
    preview: {
      type: "code",
      title: "auth/session.ts — Code Review Thread",
      badge: "Constructive Critique",
      snippet: "// Suggested architecture refactor\n- const token = localStorage.getItem('jwt');\n+ const { session } = await supabase.auth.getSession();\n// Resolves SSR hydration mismatch & secure token handling",
    },
  },
  {
    step: "02",
    icon: BrainCircuit,
    badge: "AI & Finance Playbooks",
    title: "Actionable AI tips & student finance",
    tagline: "Master modern AI builder workflows & personal money management.",
    description:
      "Cut through the hype with curated playbooks on using AI agents, LLMs, and automation in your projects, alongside student-first personal finance tips (budgeting, investing basics, and freelance pricing).",
    highlights: [
      "Modern AI agent & prompt engineering guides",
      "Student budgeting & first-dollar freelance guides",
      "Curated toolkits and API cost optimization",
    ],
    preview: {
      type: "playbook",
      title: "Builder Knowledge Vault",
      badge: "Curated Guides",
      items: [
        { label: "AI Workflows", desc: "Local LLMs, LangChain, & Cursor automation" },
        { label: "Personal Finance", desc: "Student budgeting, taxes, & side-income basics" },
        { label: "Tool Radar", desc: "Free tier student developer packs & API credits" },
      ],
    },
  },
  {
    step: "03",
    icon: Trophy,
    badge: "Competitions & Hackathons",
    title: "Meet teams & compete in Peercuit comps",
    tagline: "Find partners for external hackathons or win internal sprints.",
    description:
      "Never enter a competition alone. Find complementary teammates for major hackathons, or compete directly in internal Peercuit sprint challenges and prize bounties.",
    highlights: [
      "Find hackathon & comp co-builders",
      "Peercuit-hosted internal hackathons & sprints",
      "Curated external grants & bounty radar",
    ],
    preview: {
      type: "bounty",
      title: "Internal Comps & Hackathons",
      badge: "Peercuit Sprints",
      event: "48-Hour Peercuit Builder Sprint",
      prize: "Cash prizes, grants & verified showcase",
      status: "Teammate matching open",
    },
  },
  {
    step: "04",
    icon: BookOpen,
    badge: "Quarterly Publication",
    title: "Quarter-end student magazine",
    tagline: "Publish your essays, teardowns, and founder stories.",
    description:
      "At the end of every quarter, we publish the official Peercuit Student Magazine. Write deep-dive essays, technical project teardowns, and builder stories that get read across schools and universities.",
    highlights: [
      "Quarterly published digital magazine",
      "In-depth student project teardowns & essays",
      "Build your public writing & research portfolio",
    ],
    preview: {
      type: "magazine",
      title: "Peercuit Quarterly — Issue 01",
      badge: "Student Publication",
      articles: [
        { title: "Building Local AI Agents on a Student Budget", tag: "Engineering" },
        { title: "Design Systems That Actually Convert", tag: "UI/UX" },
        { title: "From School Hackathon to 1,000 Users", tag: "Case Study" },
      ],
    },
  },
  {
    step: "05",
    icon: Award,
    badge: "Ambassadors & Reputation",
    title: "Campus ambassadors & reputation points",
    tagline: "Earn Builder Karma and represent Peercuit at your campus.",
    description:
      "Lead Peercuit at your high school or college campus as an official Campus Ambassador. Earn reputation points (Builder Karma) for reviewing peers' work, shipping builds, and helping the community.",
    highlights: [
      "Campus Ambassador leadership opportunities",
      "Builder Karma & reputation points system",
      "Unlock perks, featured spotlights, and grant access",
    ],
    preview: {
      type: "karma",
      title: "Builder Karma & Reputation System",
      badge: "Merit-Based",
      metrics: [
        { label: "Constructive Review", points: "+25 Karma" },
        { label: "Shipped Project Demo", points: "+50 Karma" },
        { label: "Campus Ambassador", points: "Leader Badge" },
      ],
    },
  },
];

export function ValueProps() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Smooth scroll spy through the 300vh track
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      const totalScrollable = rect.height - windowHeight;
      if (totalScrollable <= 0) return;

      const currentScroll = -rect.top;
      const progress = Math.max(0, Math.min(1, currentScroll / totalScrollable));

      const index = Math.min(BENEFITS.length - 1, Math.floor(progress * BENEFITS.length));
      setActiveIndex(index);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const activeItem = BENEFITS[activeIndex];
  const ActiveIcon = activeItem.icon;

  return (
    <section ref={containerRef} id="benefits" className="relative min-h-[320vh] py-16">
      {/* Sticky viewport */}
      <div className="sticky top-20 min-h-[85vh] flex flex-col justify-center overflow-hidden py-4">
        {/* Ambient Neon Lighting */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] radial-glow-emerald opacity-60 pointer-events-none -z-10" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          {/* Header */}
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-300/80 dark:border-emerald-500/30 text-emerald-800 dark:text-emerald-300 text-xs font-semibold uppercase tracking-wider mb-2.5 shadow-xs">
              <Zap className="w-3.5 h-3.5 text-[#0d623d] dark:text-emerald-400 animate-pulse" />
              What We Do in Peercuit
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
              Everything you need to <span className="gradient-text-primary">level up together</span>.
            </h2>
          </div>

          {/* Interactive HUD Showcase Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Interactive Navigation Bars */}
            <div className="lg:col-span-4 space-y-3">
              {BENEFITS.map((item, idx) => {
                const isActive = activeIndex === idx;
                const Icon = item.icon;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveIndex(idx)}
                    className={`w-full text-left p-3.5 sm:p-4 rounded-2xl transition-all duration-300 cursor-pointer relative overflow-hidden group ${
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
            <div className="lg:col-span-8">
              <div className="glass-card rounded-3xl p-6 sm:p-9 border-2 border-emerald-300/80 dark:border-emerald-500/35 shadow-2xl relative overflow-hidden min-h-[440px] flex flex-col justify-between">
                {/* Background circuit grid */}
                <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />

                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, y: 20, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.98 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="relative z-10 w-full"
                  >
                    {/* Card Header */}
                    <div className="flex items-center justify-between gap-4 mb-6">
                      <div className="flex items-center gap-3.5">
                        <div className="w-13 h-13 rounded-2xl bg-gradient-to-br from-emerald-100 to-emerald-200 dark:from-emerald-950 dark:to-[#094d2f] border border-emerald-300/80 dark:border-emerald-400/30 flex items-center justify-center text-[#0d623d] dark:text-emerald-400 shadow-md">
                          <ActiveIcon className="w-6 h-6" />
                        </div>
                        <div>
                          <span className="text-xs font-bold text-[#0d623d] dark:text-emerald-400 uppercase tracking-wider">
                            {activeItem.badge}
                          </span>
                          <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                            {activeItem.title}
                          </h3>
                        </div>
                      </div>

                      <span className="text-4xl font-black text-slate-300 dark:text-emerald-900/60 font-mono select-none">
                        {activeItem.step}
                      </span>
                    </div>

                    <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                      {activeItem.description}
                    </p>

                    {/* Highlights Pills */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                      {activeItem.highlights.map((h, i) => (
                        <div
                          key={i}
                          className="p-3 rounded-xl bg-white/80 dark:bg-[#07140c]/90 border border-emerald-200/80 dark:border-emerald-500/20 text-xs font-medium text-slate-700 dark:text-slate-200 flex items-start gap-2 shadow-xs"
                        >
                          <div className="w-4 h-4 rounded-full bg-emerald-100 dark:bg-emerald-500/20 text-[#0d623d] dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                            <Check className="w-3 h-3" />
                          </div>
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>

                    {/* Rich Interactive Mockup Preview */}
                    <div className="p-4 rounded-2xl bg-white/90 dark:bg-[#050e08] border border-emerald-300/70 dark:border-emerald-500/25 shadow-inner">
                      {activeItem.preview.type === "code" && (
                        <div>
                          <div className="flex items-center justify-between text-xs font-mono text-slate-500 dark:text-slate-400 pb-2 mb-2 border-b border-emerald-500/15">
                            <span className="text-[#0d623d] dark:text-emerald-400 font-bold flex items-center gap-1.5">
                              <MessageSquareCode className="w-3.5 h-3.5" />
                              {activeItem.preview.title}
                            </span>
                            <span className="text-[11px] bg-emerald-100 dark:bg-emerald-500/15 text-[#0d623d] dark:text-emerald-300 px-2 py-0.5 rounded-md font-semibold">
                              {activeItem.preview.badge}
                            </span>
                          </div>
                          <pre className="text-xs font-mono text-slate-900 dark:text-emerald-300 bg-slate-50 dark:bg-[#040805] p-3.5 rounded-xl overflow-x-auto leading-relaxed border border-emerald-500/15">
                            {activeItem.preview.snippet}
                          </pre>
                        </div>
                      )}

                      {activeItem.preview.type === "playbook" && (
                        <div className="space-y-2.5">
                          <div className="flex items-center justify-between text-xs font-mono text-slate-500 dark:text-slate-400 pb-1">
                            <span className="text-[#0d623d] dark:text-emerald-400 font-bold flex items-center gap-1.5">
                              <BrainCircuit className="w-3.5 h-3.5" />
                              {activeItem.preview.title}
                            </span>
                            <span className="text-[11px] font-semibold text-emerald-800 dark:text-emerald-400">
                              {activeItem.preview.badge}
                            </span>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                            {activeItem.preview.items?.map((item, itIdx) => (
                              <div
                                key={itIdx}
                                className="p-2.5 rounded-xl bg-slate-50 dark:bg-[#08160d] border border-emerald-300/60 dark:border-emerald-500/20 text-xs shadow-xs"
                              >
                                <p className="font-bold text-slate-900 dark:text-white">{item.label}</p>
                                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">{item.desc}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {activeItem.preview.type === "bounty" && (
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-1.5">
                          <div>
                            <span className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                              <Trophy className="w-4 h-4 text-amber-500" />
                              {activeItem.preview.event}
                            </span>
                            <p className="text-xs text-[#0d623d] dark:text-emerald-400 font-bold mt-0.5">
                              {activeItem.preview.prize}
                            </p>
                          </div>
                          <span className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-emerald-100 dark:bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-500/25">
                            {activeItem.preview.status}
                          </span>
                        </div>
                      )}

                      {activeItem.preview.type === "magazine" && (
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-xs font-mono text-slate-500 dark:text-slate-400 pb-1">
                            <span className="text-[#0d623d] dark:text-emerald-400 font-bold flex items-center gap-1.5">
                              <BookOpen className="w-3.5 h-3.5" />
                              {activeItem.preview.title}
                            </span>
                            <span className="text-[11px] font-semibold text-emerald-800 dark:text-emerald-400">
                              {activeItem.preview.badge}
                            </span>
                          </div>
                          <div className="space-y-1.5">
                            {activeItem.preview.articles?.map((art, aIdx) => (
                              <div
                                key={aIdx}
                                className="flex items-center justify-between p-2 rounded-xl bg-slate-50 dark:bg-[#08160d] border border-emerald-300/40 dark:border-emerald-500/15 text-xs"
                              >
                                <span className="font-semibold text-slate-900 dark:text-slate-200 truncate pr-2">
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

                      {activeItem.preview.type === "karma" && (
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-xs font-mono text-slate-500 dark:text-slate-400 pb-1">
                            <span className="text-[#0d623d] dark:text-emerald-400 font-bold flex items-center gap-1.5">
                              <Award className="w-3.5 h-3.5 text-amber-500" />
                              {activeItem.preview.title}
                            </span>
                            <span className="text-[11px] font-semibold text-emerald-800 dark:text-emerald-400">
                              {activeItem.preview.badge}
                            </span>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                            {activeItem.preview.metrics?.map((m, mIdx) => (
                              <div
                                key={mIdx}
                                className="p-2.5 rounded-xl bg-slate-50 dark:bg-[#08160d] border border-emerald-300/60 dark:border-emerald-500/20 text-xs text-center shadow-xs"
                              >
                                <p className="font-bold text-slate-900 dark:text-white">{m.label}</p>
                                <p className="text-xs font-black text-[#0d623d] dark:text-emerald-400 mt-1">{m.points}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
