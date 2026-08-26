"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  MessageSquareCode,
  Users2,
  Compass,
  CalendarCheck,
  Check,
  Zap,
  Sparkles,
  ArrowRight,
  Terminal,
  Share2,
  Gift,
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
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll through the 350vh pinned track
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Calculate active card index (0 to 3) based on scroll progress
  const activeIndex = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75, 1], [0, 1, 2, 3, 3]);

  return (
    <section ref={containerRef} id="benefits" className="relative h-[360vh] -mt-10">
      {/* Sticky viewport that locks on screen while user scrolls through the 360vh container */}
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden py-12">
        {/* Subtle Ambient Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] radial-glow-emerald opacity-60 pointer-events-none -z-10" />

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
              <span>Scroll down to explore benefits</span>
            </div>
          </div>

          {/* Interactive Pinned Card Display */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Left Nav Column: 4 Steps with scroll progress bars */}
            <div className="lg:col-span-4 space-y-3">
              {BENEFITS.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <StepNavButton
                    key={idx}
                    index={idx}
                    item={item}
                    progress={scrollYProgress}
                  />
                );
              })}
            </div>

            {/* Right Card Showcase: Dynamically updates based on scroll */}
            <div className="lg:col-span-8">
              <div className="glass-card rounded-3xl p-6 sm:p-9 border border-emerald-300/80 dark:border-emerald-500/30 shadow-2xl relative overflow-hidden min-h-[420px] flex flex-col justify-between">
                <CardContent progress={scrollYProgress} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StepNavButton({
  index,
  item,
  progress,
}: {
  index: number;
  item: (typeof BENEFITS)[0];
  progress: any;
}) {
  const Icon = item.icon;

  // Thresholds for 4 items: [0, 0.25], [0.25, 0.5], [0.5, 0.75], [0.75, 1]
  const start = index * 0.25;
  const end = (index + 1) * 0.25;

  const opacity = useTransform(progress, [start - 0.05, start, end - 0.05, end], [0.45, 1, 1, 0.45]);
  const scale = useTransform(progress, [start - 0.05, start, end - 0.05, end], [0.97, 1.02, 1.02, 0.97]);
  const barWidth = useTransform(progress, [start, end], ["0%", "100%"]);

  return (
    <motion.div
      style={{ opacity, scale }}
      className="p-3.5 sm:p-4 rounded-2xl glass-card border border-slate-200 dark:border-emerald-500/20 relative overflow-hidden transition-colors"
    >
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 text-[#0d623d] dark:text-emerald-400 flex items-center justify-center shrink-0 font-bold text-xs">
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

      {/* Progress fill line */}
      <motion.div
        style={{ width: barWidth }}
        className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-[#0d623d] to-[#16a34a] dark:from-emerald-500 dark:to-teal-400"
      />
    </motion.div>
  );
}

function CardContent({ progress }: { progress: any }) {
  // Render content based on scroll thresholds
  // Card 0: 0.0 - 0.25
  // Card 1: 0.25 - 0.50
  // Card 2: 0.50 - 0.75
  // Card 3: 0.75 - 1.00

  return (
    <div className="relative w-full h-full">
      {BENEFITS.map((item, idx) => {
        const start = idx * 0.25;
        const end = (idx + 1) * 0.25;
        const Icon = item.icon;

        return (
          <CardSlide
            key={idx}
            item={item}
            index={idx}
            progress={progress}
            start={start}
            end={end}
          />
        );
      })}
    </div>
  );
}

function CardSlide({
  item,
  index,
  progress,
  start,
  end,
}: {
  item: (typeof BENEFITS)[0];
  index: number;
  progress: any;
  start: number;
  end: number;
}) {
  const Icon = item.icon;

  // Active opacity and translateY based on scroll progress window
  const isFirst = index === 0;
  const isLast = index === BENEFITS.length - 1;

  const inStart = isFirst ? -0.1 : start - 0.05;
  const inEnd = start;
  const outStart = end - 0.05;
  const outEnd = isLast ? 1.1 : end;

  const opacity = useTransform(progress, [inStart, inEnd, outStart, outEnd], [0, 1, 1, 0]);
  const y = useTransform(progress, [inStart, inEnd, outStart, outEnd], [20, 0, 0, -20]);
  const display = useTransform(progress, (val: number) => {
    if (isFirst && val < start) return "block";
    if (val >= inStart && val <= outEnd) return "block";
    return "none";
  });

  return (
    <motion.div
      style={{ opacity, y, display }}
      className="w-full"
    >
      <div className="flex items-center justify-between gap-3 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-500/30 flex items-center justify-center text-[#0d623d] dark:text-emerald-400 shadow-md">
            <Icon className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold text-[#0d623d] dark:text-emerald-400 uppercase tracking-wider">
              {item.badge}
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
              {item.title}
            </h3>
          </div>
        </div>

        <span className="text-3xl font-black text-slate-300 dark:text-emerald-900/60 font-mono">
          {item.step}
        </span>
      </div>

      <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
        {item.description}
      </p>

      {/* Highlights List */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
        {item.highlights.map((h, i) => (
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

      {/* Interactive Mockup Component */}
      <div className="p-4 rounded-2xl bg-white dark:bg-[#07100b] border border-slate-200 dark:border-emerald-500/20 shadow-inner">
        {item.preview.type === "code" && (
          <div>
            <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 dark:text-slate-400 pb-2 mb-2 border-b border-slate-100 dark:border-emerald-500/10">
              <span className="text-emerald-700 dark:text-emerald-400 font-bold">{item.preview.title}</span>
              <span>{item.preview.badge}</span>
            </div>
            <pre className="text-xs font-mono text-slate-800 dark:text-emerald-300 bg-slate-50 dark:bg-[#040805] p-3 rounded-xl overflow-x-auto leading-relaxed border border-slate-200/60 dark:border-emerald-500/10">
              {item.preview.snippet}
            </pre>
          </div>
        )}

        {item.preview.type === "network" && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 dark:text-slate-400 pb-1">
              <span className="text-emerald-700 dark:text-emerald-400 font-bold">{item.preview.title}</span>
              <span>{item.preview.status}</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {item.preview.peers?.map((peer, pIdx) => (
                <div key={pIdx} className="p-2 rounded-xl bg-slate-50 dark:bg-[#0a150e] border border-slate-200 dark:border-emerald-500/10 text-xs">
                  <p className="font-bold text-slate-900 dark:text-white">{peer.name}</p>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400">{peer.school}</p>
                  <p className="text-[10px] font-semibold text-[#0d623d] dark:text-emerald-400 mt-1">{peer.role}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {item.preview.type === "bounty" && (
          <div className="flex items-center justify-between p-2">
            <div>
              <span className="text-xs font-bold text-slate-900 dark:text-white">{item.preview.event}</span>
              <p className="text-xs text-[#0d623d] dark:text-emerald-400 font-semibold">{item.preview.prize}</p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-emerald-100 dark:bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-500/20">
              {item.preview.status}
            </span>
          </div>
        )}

        {item.preview.type === "demo" && (
          <div className="flex items-center justify-between p-2">
            <div>
              <span className="text-xs font-bold text-slate-900 dark:text-white">{item.preview.title}</span>
              <p className="text-xs text-slate-500 dark:text-slate-400">{item.preview.time}</p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-emerald-100 dark:bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-500/20">
              {item.preview.demos}
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );
}
