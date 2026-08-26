"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FileText,
  UserCheck,
  MessageCircle,
  ArrowRight,
  Cpu,
  CheckCircle2,
} from "lucide-react";

const STEPS = [
  {
    step: "01",
    title: "Quick 2-Minute Application",
    tagline: "No CVs, no formal essays.",
    description:
      "Tell us what you're working on, learning, or obsessing over right now. Whether you're building an AI tool, writing essays, designing apps, or prepping for your first hackathon — we want to hear about it.",
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
      items: ["Genuine curiosity", "Active builder mindset", "Zero spam tolerance"],
    },
  },
  {
    step: "03",
    title: "Join the WhatsApp Community",
    tagline: "Get your invite and introduce yourself.",
    description:
      "Once approved, you'll receive a private WhatsApp Community invite. Jump into the intro group, showcase what you're building, and immediately connect with peers in your region and interest area.",
    icon: MessageCircle,
    badge: "Instant access upon invite",
    mock: {
      type: "unlock",
      title: "WhatsApp Community Circles",
      channels: ["Introductions", "Feedback", "Teammate Search", "Coffee Chats"],
    },
  },
];

export function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll through the pinned container on desktop
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      if (window.innerWidth < 768) return; // Only lock scroll on tablet/desktop

      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      const totalScrollable = rect.height - windowHeight;
      if (totalScrollable <= 0) return;

      const currentScroll = -rect.top;
      const progress = Math.max(0, Math.min(1, currentScroll / totalScrollable));

      // Map progress to 3 steps (0, 1, 2)
      const index = Math.min(2, Math.floor(progress * 3));
      setActiveStep(index);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section ref={containerRef} id="how-it-works" className="relative py-12 md:py-16 md:min-h-[260vh]">
      {/* Sticky viewport on desktop / natural flow on mobile */}
      <div className="md:sticky md:top-20 md:min-h-[85vh] flex flex-col justify-center overflow-hidden py-2 sm:py-4">
        {/* Ambient Neon Lighting */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] radial-glow-emerald opacity-50 pointer-events-none -z-10" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-300/80 dark:border-emerald-500/30 text-emerald-800 dark:text-emerald-300 text-xs font-semibold uppercase tracking-wider mb-2.5 shadow-xs">
              <Cpu className="w-3.5 h-3.5 text-[#0d623d] dark:text-emerald-400 animate-pulse" />
              Simple 3-Step Process
            </div>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
              How to join <span className="gradient-text-primary">Peercuit</span>
            </h2>
            <p className="text-xs sm:text-base text-slate-600 dark:text-slate-300 mt-2">
              From application to your first community demo in 3 simple steps.
            </p>
          </div>

          {/* Connected Step Cards Grid */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 relative"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10%" }}
            variants={{
              visible: { transition: { staggerChildren: 0.2 } },
              hidden: {}
            }}
          >
            {/* Connecting line for desktop */}
            <div className="hidden md:block absolute top-[4rem] left-[10%] right-[10%] h-[2px] bg-emerald-200/50 dark:bg-emerald-500/10 z-0">
              <motion.div 
                className="h-full bg-emerald-500/50"
                initial={{ width: "0%" }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              />
            </div>

            {/* Connecting line for mobile */}
            <div className="md:hidden absolute left-8 top-10 bottom-10 w-[2px] bg-emerald-200/50 dark:bg-emerald-500/10 z-0">
              <motion.div 
                className="w-full bg-emerald-500/50"
                initial={{ height: "0%" }}
                whileInView={{ height: "100%" }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              />
            </div>

            {STEPS.map((item, idx) => {
              const isActive = activeStep === idx;
              const Icon = item.icon;

              return (
                <motion.div
                  key={idx}
                  variants={{
                    hidden: { opacity: 0, y: 30, scale: 0.95 },
                    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }
                  }}
                  className={`glass-card rounded-2xl sm:rounded-3xl p-5 sm:p-7 flex flex-col justify-between transition-all duration-300 relative overflow-hidden z-10 border border-emerald-900/10 dark:border-emerald-500/15 hover:border-emerald-400/50 group bg-white/80 dark:bg-[#07130c]/80`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3.5">
                      <span className="text-2xl sm:text-3xl font-black font-mono text-[#0d623d] dark:text-emerald-400/80">
                        {item.step}
                      </span>
                      <span className="text-[10px] sm:text-[11px] font-bold px-2.5 py-1 rounded-full border bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-500/20">
                        {item.badge}
                      </span>
                    </div>

                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl border flex items-center justify-center mb-3 sm:mb-4 shadow-xs bg-gradient-to-br from-[#0d623d] to-emerald-600 text-white shadow-lg shadow-emerald-600/30 border-emerald-400 group-hover:scale-105 transition-transform">
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>

                    <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white mb-1">
                      {item.title}
                    </h3>
                    <p className="text-xs font-semibold text-[#0d623d] dark:text-emerald-400 mb-2">
                      {item.tagline}
                    </p>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4 sm:mb-6">
                      {item.description}
                    </p>
                  </div>

                  {/* Micro Mockup */}
                  <div className="p-3 sm:p-3.5 rounded-xl bg-white/90 dark:bg-[#0a1810] border border-emerald-300/60 dark:border-emerald-500/15 text-xs text-slate-700 dark:text-slate-300 space-y-1.5 shadow-xs relative z-10">
                    <p className="font-bold text-[10px] sm:text-[11px] text-slate-900 dark:text-white pb-1 border-b border-emerald-500/10">
                      {item.mock.title}
                    </p>
                    {item.mock.fields?.map((f, i) => (
                      <div key={i} className="flex items-center gap-1.5 text-[10px] sm:text-[11px]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0d623d] dark:bg-emerald-400 shrink-0" />
                        <span className="truncate">{f}</span>
                      </div>
                    ))}
                    {item.mock.items?.map((it, i) => (
                      <div key={i} className="flex items-center gap-1.5 text-[10px] sm:text-[11px]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#0d623d] dark:text-emerald-400 shrink-0" />
                        <span>{it}</span>
                      </div>
                    ))}
                    {item.mock.channels && (
                      <div className="flex flex-wrap gap-1 pt-0.5">
                        {item.mock.channels.map((ch, i) => (
                          <span
                            key={i}
                            className="text-[9px] sm:text-[10px] bg-emerald-50 dark:bg-[#0c1a11] px-1.5 py-0.5 rounded border border-emerald-200 dark:border-emerald-500/20 font-mono text-emerald-800 dark:text-emerald-300 font-semibold"
                          >
                            {ch}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Bottom Action */}
          <div className="mt-8 sm:mt-10 text-center">
            <Link
              href="/apply"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 text-sm sm:text-base font-bold text-white bg-[#0d623d] hover:bg-[#094d2f] dark:bg-emerald-600 dark:hover:bg-emerald-500 rounded-xl shadow-xl shadow-emerald-900/15 dark:shadow-emerald-600/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
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
