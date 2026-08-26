"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageSquareCode,
  Users2,
  Compass,
  CalendarCheck,
  Check,
  Zap,
  Sparkles,
  Terminal,
  ArrowRight,
  Flame,
  Layers,
  Radio,
} from "lucide-react";

const BENEFITS = [
  {
    step: "01",
    icon: MessageSquareCode,
    badge: "Honest & Constructive",
    title: "Peer feedback on your work",
    tagline: "No polite sugarcoating. Real, actionable critiques.",
    description:
      "Tired of posting your side projects into the void or getting polite 'looks good' from friends? Get granular, honest feedback from fellow student engineers, UI designers, and writers who actually understand the craft.",
    highlights: [
      "Roast-my-project critique threads",
      "UI/UX and code architectural reviews",
      "Actionable fixes before you launch publicly",
    ],
    preview: {
      type: "code",
      title: "auth/session.ts — Code Review",
      badge: "#roast-my-code",
      snippet: "// Suggested refactor by Alex (Grade 12)\n- const token = localStorage.getItem('jwt');\n+ const { session } = await supabase.auth.getSession();\n// Fixes SSR hydration mismatch & token leak",
      author: "Alex R. (Grade 12)",
      status: "3 comments resolved",
    },
  },
  {
    step: "02",
    icon: Users2,
    badge: "Break the Campus Bubble",
    title: "Meet like-minded students",
    tagline: "Find peers who share your specific obsessions.",
    description:
      "Most schools have only 2 or 3 people who share your passion for shipping. Peercuit connects you with curious, self-starter peers across 40+ schools and colleges worldwide who love building cool stuff.",
    highlights: [
      "Find hackathon & project co-builders",
      "High school & college level collaboration",
      "Zero networking cringe — just genuine friends",
    ],
    preview: {
      type: "network",
      title: "Active Student Co-builders",
      badge: "Cross-Campus Network",
      peers: [
        { name: "Maya Lin", school: "UC Berkeley", role: "Rust & Next.js", status: "Looking for UI designer" },
        { name: "Dev Patel", school: "Delhi Public School", role: "Figma & React", status: "Building mobile app" },
        { name: "Sarah Z.", school: "Univ. of Waterloo", role: "AI & PyTorch", status: "Prepping for HackMIT" },
      ],
      status: "14 co-build projects formed this month",
    },
  },
  {
    step: "03",
    icon: Compass,
    badge: "Curated Opportunities",
    title: "Discover hackathons & collabs",
    tagline: "High-impact grants, bounties, and student comps.",
    description:
      "We scout the best student opportunities so you don't miss out. Discover high-impact hackathons, student grant funds, open-source bounties, and early internship opportunities before everyone else.",
    highlights: [
      "Curated student hackathon tracker",
      "Grants, fellowship & incubator alerts",
      "Collab board for cross-disciplinary builds",
    ],
    preview: {
      type: "bounty",
      title: "Student Bounty Radar",
      badge: "Verified Comp",
      event: "HackMIT 2026 & AI Track",
      prize: "$25,000 in student bounties",
      status: "4 Peercuit teams competing",
    },
  },
  {
    step: "04",
    icon: CalendarCheck,
    badge: "Weekly Momentum",
    title: "Weekly community rituals",
    tagline: "Lightweight, high-energy sessions that keep you shipping.",
    description:
      "Building alone can be isolating. Our regular asynchronous and live rituals keep you shipping consistently, talking through bold ideas, and learning from other students' breakthroughs.",
    highlights: [
      "Sunday 15-min Demo Nights",
      "Spicy student tech & philosophy debates",
      "1-on-1 virtual peer coffee chats",
    ],
    preview: {
      type: "demo",
      title: "Sunday Demo Night",
      badge: "Live Audio & Screen Share",
      time: "8:00 PM EST / 5:30 AM IST",
      demos: "6 student lightning demos scheduled",
      status: "Screen-shares & honest Q&A",
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

      const index = Math.min(3, Math.floor(progress * 4));
      setActiveIndex(index);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const activeItem = BENEFITS[activeIndex];
  const ActiveIcon = activeItem.icon;

  return (
    <section ref={containerRef} id="benefits" className="relative min-h-[300vh] py-16">
      {/* Sticky viewport */}
      <div className="sticky top-20 min-h-[85vh] flex flex-col justify-center overflow-hidden py-4">
        {/* Ambient Neon Lighting */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] radial-glow-emerald opacity-60 pointer-events-none -z-10" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-300/80 dark:border-emerald-500/30 text-emerald-800 dark:text-emerald-300 text-xs font-semibold uppercase tracking-wider mb-2.5 shadow-xs">
                <Zap className="w-3.5 h-3.5 text-[#0d623d] dark:text-emerald-400 animate-pulse" />
                Interactive Feature Deck
              </div>
              <h2 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
                Everything you need to <span className="gradient-text-primary">level up together</span>.
              </h2>
            </div>

            {/* Live Step Tracker Pill */}
            <div className="flex items-center gap-2 text-xs font-mono text-slate-700 dark:text-emerald-300 bg-white/90 dark:bg-[#07140c] px-4 py-2 rounded-full border border-emerald-300/80 dark:border-emerald-500/30 shadow-md">
              <span className="w-2.5 h-2.5 rounded-full bg-[#0d623d] dark:bg-emerald-400 animate-ping" />
              <span className="font-bold">Scroll through benefits</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-bold ml-1">
                [{activeIndex + 1} / {BENEFITS.length}]
              </span>
            </div>
          </div>

          {/* Interactive HUD Showcase Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Interactive Navigation Bars */}
            <div className="lg:col-span-4 space-y-3.5">
              {BENEFITS.map((item, idx) => {
                const isActive = activeIndex === idx;
                const Icon = item.icon;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveIndex(idx)}
                    className={`w-full text-left p-4 rounded-2xl transition-all duration-300 cursor-pointer relative overflow-hidden group ${
                      isActive
                        ? "glass-card border-2 border-emerald-500 shadow-xl shadow-emerald-950/15 scale-[1.02]"
                        : "glass-card border border-emerald-900/10 dark:border-emerald-500/15 opacity-60 hover:opacity-100 hover:border-emerald-400/50"
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 font-bold text-xs transition-colors duration-300 shadow-xs ${
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
                              <Terminal className="w-3.5 h-3.5" />
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

                      {activeItem.preview.type === "network" && (
                        <div className="space-y-2.5">
                          <div className="flex items-center justify-between text-xs font-mono text-slate-500 dark:text-slate-400 pb-1">
                            <span className="text-[#0d623d] dark:text-emerald-400 font-bold flex items-center gap-1.5">
                              <Users2 className="w-3.5 h-3.5" />
                              {activeItem.preview.title}
                            </span>
                            <span className="text-[11px] font-semibold text-emerald-800 dark:text-emerald-400">
                              {activeItem.preview.status}
                            </span>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                            {activeItem.preview.peers?.map((peer, pIdx) => (
                              <div
                                key={pIdx}
                                className="p-2.5 rounded-xl bg-slate-50 dark:bg-[#08160d] border border-emerald-300/60 dark:border-emerald-500/20 text-xs shadow-xs"
                              >
                                <p className="font-bold text-slate-900 dark:text-white">{peer.name}</p>
                                <p className="text-[11px] text-slate-500 dark:text-slate-400">{peer.school}</p>
                                <p className="text-[10px] font-bold text-[#0d623d] dark:text-emerald-400 mt-1">{peer.role}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {activeItem.preview.type === "bounty" && (
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-1.5">
                          <div>
                            <span className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                              <Flame className="w-4 h-4 text-amber-500" />
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

                      {activeItem.preview.type === "demo" && (
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-1.5">
                          <div>
                            <span className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                              <Radio className="w-4 h-4 text-[#0d623d] dark:text-emerald-400 animate-pulse" />
                              {activeItem.preview.title}
                            </span>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                              {activeItem.preview.time}
                            </p>
                          </div>
                          <span className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-emerald-100 dark:bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-500/25">
                            {activeItem.preview.demos}
                          </span>
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
