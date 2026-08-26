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
      title: "Feedback on Auth Architecture",
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
      badge: "Cross-Campus",
      peers: [
        { name: "Maya Lin", school: "UC Berkeley", role: "Rust & Next.js" },
        { name: "Dev Patel", school: "Delhi Public School", role: "Figma & React" },
        { name: "Sarah Z.", school: "Univ. of Waterloo", role: "AI & PyTorch" },
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
      title: "Upcoming Hackathon Radar",
      badge: "Verified Comp",
      event: "HackMIT 2026",
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
      badge: "Live Audio",
      time: "8:00 PM EST / 5:30 AM IST",
      demos: "6 student lightning demos scheduled",
      status: "Screen-shares & honest Q&A",
    },
  },
];

export function ValueProps() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto scroll spy / scroll progress calculation
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate how far we've scrolled into the container
      const totalScrollable = rect.height - windowHeight;
      if (totalScrollable <= 0) return;

      const currentScroll = -rect.top;
      const progress = Math.max(0, Math.min(1, currentScroll / totalScrollable));

      // Map progress to active card (0, 1, 2, 3)
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
    <section ref={containerRef} id="benefits" className="relative min-h-[220vh] py-12">
      {/* Sticky viewport that stays in place while user scrolls through the 4 features */}
      <div className="sticky top-20 min-h-[85vh] flex flex-col justify-center overflow-hidden py-6">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/70 border border-emerald-300/60 dark:border-emerald-500/25 text-emerald-800 dark:text-emerald-300 text-xs font-semibold uppercase tracking-wider mb-2">
                <Zap className="w-3.5 h-3.5 text-[#0d623d] dark:text-emerald-400" />
                What You Get in Peercuit
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Everything you need to <span className="gradient-text-primary">level up together</span>.
              </h2>
            </div>

            {/* Scroll Indicator badge */}
            <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-emerald-400/80 bg-white/80 dark:bg-emerald-950/50 px-3 py-1.5 rounded-full border border-slate-200 dark:border-emerald-500/20 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#0d623d] dark:bg-emerald-400 animate-pulse" />
              <span>Scroll to navigate features ({activeIndex + 1}/4)</span>
            </div>
          </div>

          {/* Interactive Showcase Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Left Column: 4 Interactive Step Buttons */}
            <div className="lg:col-span-4 space-y-3">
              {BENEFITS.map((item, idx) => {
                const isActive = activeIndex === idx;
                const Icon = item.icon;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveIndex(idx)}
                    className={`w-full text-left p-3.5 sm:p-4 rounded-2xl border transition-all cursor-pointer relative overflow-hidden ${
                      isActive
                        ? "glass-card border-emerald-400 dark:border-emerald-500/60 shadow-lg scale-[1.02]"
                        : "glass-card border-slate-200 dark:border-emerald-500/15 opacity-60 hover:opacity-90"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 font-bold text-xs ${
                          isActive
                            ? "bg-[#0d623d] text-white dark:bg-emerald-500"
                            : "bg-emerald-100 dark:bg-emerald-950/80 text-[#0d623d] dark:text-emerald-400"
                        }`}
                      >
                        {item.step}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-bold text-slate-900 dark:text-white truncate">
                          {item.title}
                        </p>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                          {item.badge}
                        </p>
                      </div>
                    </div>

                    {isActive && (
                      <motion.div
                        layoutId="active-benefit-bar"
                        className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#0d623d] to-[#16a34a] dark:from-emerald-500 dark:to-teal-400"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Right Column: Animated Active Feature Card */}
            <div className="lg:col-span-8">
              <div className="glass-card rounded-3xl p-6 sm:p-9 border border-emerald-300/80 dark:border-emerald-500/30 shadow-2xl relative overflow-hidden min-h-[400px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="w-full"
                  >
                    <div className="flex items-center justify-between gap-3 mb-6">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-500/30 flex items-center justify-center text-[#0d623d] dark:text-emerald-400 shadow-md">
                          <ActiveIcon className="w-6 h-6" />
                        </div>
                        <div>
                          <span className="text-xs font-bold text-[#0d623d] dark:text-emerald-400 uppercase tracking-wider">
                            {activeItem.badge}
                          </span>
                          <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
                            {activeItem.title}
                          </h3>
                        </div>
                      </div>

                      <span className="text-3xl font-black text-slate-300 dark:text-emerald-900/60 font-mono">
                        {activeItem.step}
                      </span>
                    </div>

                    <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                      {activeItem.description}
                    </p>

                    {/* Highlights List */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                      {activeItem.highlights.map((h, i) => (
                        <div
                          key={i}
                          className="p-3 rounded-xl bg-slate-50 dark:bg-[#07130c]/80 border border-slate-200 dark:border-emerald-500/15 text-xs text-slate-700 dark:text-slate-300 flex items-start gap-2"
                        >
                          <div className="w-4 h-4 rounded-full bg-emerald-100 dark:bg-emerald-500/20 text-[#0d623d] dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                            <Check className="w-3 h-3" />
                          </div>
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>

                    {/* Interactive Preview Mockup */}
                    <div className="p-4 rounded-2xl bg-white dark:bg-[#07100b] border border-slate-200 dark:border-emerald-500/20 shadow-inner">
                      {activeItem.preview.type === "code" && (
                        <div>
                          <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 dark:text-slate-400 pb-2 mb-2 border-b border-slate-100 dark:border-emerald-500/10">
                            <span className="text-emerald-700 dark:text-emerald-400 font-bold">
                              {activeItem.preview.title}
                            </span>
                            <span>{activeItem.preview.badge}</span>
                          </div>
                          <pre className="text-xs font-mono text-slate-800 dark:text-emerald-300 bg-slate-50 dark:bg-[#040805] p-3 rounded-xl overflow-x-auto leading-relaxed border border-slate-200/60 dark:border-emerald-500/10">
                            {activeItem.preview.snippet}
                          </pre>
                        </div>
                      )}

                      {activeItem.preview.type === "network" && (
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 dark:text-slate-400 pb-1">
                            <span className="text-emerald-700 dark:text-emerald-400 font-bold">
                              {activeItem.preview.title}
                            </span>
                            <span>{activeItem.preview.status}</span>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                            {activeItem.preview.peers?.map((peer, pIdx) => (
                              <div
                                key={pIdx}
                                className="p-2 rounded-xl bg-slate-50 dark:bg-[#0a150e] border border-slate-200 dark:border-emerald-500/10 text-xs"
                              >
                                <p className="font-bold text-slate-900 dark:text-white">
                                  {peer.name}
                                </p>
                                <p className="text-[10px] text-slate-500 dark:text-slate-400">
                                  {peer.school}
                                </p>
                                <p className="text-[10px] font-semibold text-[#0d623d] dark:text-emerald-400 mt-1">
                                  {peer.role}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {activeItem.preview.type === "bounty" && (
                        <div className="flex items-center justify-between p-2">
                          <div>
                            <span className="text-xs font-bold text-slate-900 dark:text-white">
                              {activeItem.preview.event}
                            </span>
                            <p className="text-xs text-[#0d623d] dark:text-emerald-400 font-semibold">
                              {activeItem.preview.prize}
                            </p>
                          </div>
                          <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-emerald-100 dark:bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-500/20">
                            {activeItem.preview.status}
                          </span>
                        </div>
                      )}

                      {activeItem.preview.type === "demo" && (
                        <div className="flex items-center justify-between p-2">
                          <div>
                            <span className="text-xs font-bold text-slate-900 dark:text-white">
                              {activeItem.preview.title}
                            </span>
                            <p className="text-xs text-slate-500 dark:text-slate-400">
                              {activeItem.preview.time}
                            </p>
                          </div>
                          <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-emerald-100 dark:bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-500/20">
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
