"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  FileText,
  UserCheck,
  MessageCircle,
  ArrowRight,
  Clock,
  Cpu,
  CheckCircle2,
  Lock,
  Sparkles,
} from "lucide-react";

const STEPS = [
  {
    step: "01",
    title: "Quick 2-Minute Application",
    tagline: "No CVs, no formal essays.",
    description:
      "Tell us what you're working on, learning, or obsessing over right now. Whether you're building a Discord bot, writing essays, designing logos, or prepping for your first hackathon — we want to hear about it.",
    icon: FileText,
    badge: "2 mins to complete",
    mock: {
      type: "form",
      title: "Simple Student Onboarding",
      fields: ["Full Name & Email", "School / College & Grade", "What are you curious about?"],
    },
  },
  {
    step: "02",
    title: "Curated Vibe & Curiosity Check",
    tagline: "Reviewed by fellow student builders within 24-48h.",
    description:
      "We don't filter by GPA or fancy credentials. We curate for curiosity, willingness to give feedback, and eagerness to build. We keep the group high-signal so everyone benefits.",
    icon: UserCheck,
    badge: "24-48 hours turnaround",
    mock: {
      type: "review",
      title: "High-Signal Student Curation",
      status: "Review Criteria: Passion > Credentials",
      items: ["Genuine curiosity", "Active builder mindset", "Zero spam tolerance"],
    },
  },
  {
    step: "03",
    title: "Join the WhatsApp & Discord Group",
    tagline: "Get your invite and introduce yourself.",
    description:
      "Once approved, you'll receive a private WhatsApp & Discord invite. Jump into the intro channel, showcase what you're building, and immediately connect with peers in your region and interest area.",
    icon: MessageCircle,
    badge: "Instant access upon invite",
    mock: {
      type: "unlock",
      title: "Private Community Hub Unlocked",
      channels: ["#roast-my-ui", "#find-teammates", "#sunday-demos", "#opportunities"],
    },
  },
];

export function HowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll progress through the 300vh pinned container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section ref={containerRef} id="how-it-works" className="relative h-[320vh]">
      {/* Sticky viewport that locks scrolling in place */}
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/70 border border-emerald-300/60 dark:border-emerald-500/25 text-emerald-800 dark:text-emerald-300 text-xs font-semibold uppercase tracking-wider mb-2">
              <Cpu className="w-3.5 h-3.5 text-[#0d623d] dark:text-emerald-400" />
              Scroll-Driven Onboarding
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              How to join <span className="gradient-text-primary">Peercuit</span>
            </h2>
          </div>

          {/* 3 Interactive Connected Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            {STEPS.map((item, idx) => {
              const start = idx * 0.33;
              const end = (idx + 1) * 0.33;
              return (
                <StepCard
                  key={idx}
                  item={item}
                  index={idx}
                  progress={scrollYProgress}
                  start={start}
                  end={end}
                />
              );
            })}
          </div>

          {/* Bottom Action */}
          <div className="mt-10 text-center">
            <Link
              href="/apply"
              className="inline-flex items-center gap-2 px-8 py-3.5 text-base font-bold text-white bg-[#0d623d] hover:bg-[#094d2f] dark:bg-emerald-600 dark:hover:bg-emerald-500 rounded-xl shadow-lg shadow-emerald-900/15 dark:shadow-emerald-600/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              Ready to find your circle? Apply in 2 mins
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function StepCard({
  item,
  index,
  progress,
  start,
  end,
}: {
  item: (typeof STEPS)[0];
  index: number;
  progress: any;
  start: number;
  end: number;
}) {
  const Icon = item.icon;

  // Active state animation based on scroll window
  const scale = useTransform(progress, [start - 0.1, start, end], [0.95, 1.03, 1]);
  const opacity = useTransform(progress, [start - 0.1, start], [0.5, 1]);
  const borderColor = useTransform(
    progress,
    [start - 0.05, start, end],
    ["rgba(13, 98, 61, 0.12)", "rgba(16, 185, 129, 0.8)", "rgba(13, 98, 61, 0.25)"]
  );

  return (
    <motion.div
      style={{ scale, opacity, borderColor }}
      className="glass-card rounded-3xl p-6 sm:p-7 flex flex-col justify-between border shadow-xl relative transition-colors duration-200"
    >
      <div>
        {/* Step Top */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-2xl font-black text-slate-400 dark:text-emerald-800 font-mono">
            {item.step}
          </span>
          <span className="text-[11px] font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-200 dark:border-emerald-500/20">
            {item.badge}
          </span>
        </div>

        <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-500/30 flex items-center justify-center text-[#0d623d] dark:text-emerald-400 mb-4 shadow-xs">
          <Icon className="w-6 h-6" />
        </div>

        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
          {item.title}
        </h3>
        <p className="text-xs font-semibold text-[#0d623d] dark:text-emerald-400 mb-2">
          {item.tagline}
        </p>
        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
          {item.description}
        </p>
      </div>

      {/* Interactive Micro Mockup */}
      <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#07130c]/90 border border-slate-200 dark:border-emerald-500/15 text-xs text-slate-700 dark:text-slate-300 space-y-1.5">
        <p className="font-bold text-[11px] text-slate-900 dark:text-white pb-1 border-b border-slate-200 dark:border-emerald-500/10">
          {item.mock.title}
        </p>
        {item.mock.fields?.map((f, i) => (
          <div key={i} className="flex items-center gap-1.5 text-[11px]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0d623d] dark:bg-emerald-400" />
            <span>{f}</span>
          </div>
        ))}
        {item.mock.items?.map((it, i) => (
          <div key={i} className="flex items-center gap-1.5 text-[11px]">
            <CheckCircle2 className="w-3 h-3 text-[#0d623d] dark:text-emerald-400" />
            <span>{it}</span>
          </div>
        ))}
        {item.mock.channels?.map((ch, i) => (
          <span key={i} className="inline-block mr-1 text-[10px] bg-white dark:bg-[#0c1a11] px-1.5 py-0.5 rounded border border-slate-200 dark:border-emerald-500/20 font-mono text-emerald-800 dark:text-emerald-300">
            {ch}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
