"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  UserCheck,
  MessageCircle,
  ArrowRight,
  Cpu,
  CheckCircle2,
  Sparkles,
  Zap,
  ShieldCheck,
  Clock,
  Send,
  Users,
  Check,
} from "lucide-react";

const STEPS = [
  {
    step: "01",
    title: "Quick 2-Minute Application",
    tagline: "No CVs, no formal essays.",
    badge: "2 mins to complete",
    description:
      "Tell us what you're working on, learning, or obsessing over right now. Whether you're building an AI tool, writing essays, designing apps, or prepping for your first hackathon — we want to hear about it.",
    icon: FileText,
    highlights: ["Takes under 2 minutes", "Zero GPA or resume filters", "Tell us what excites you"],
    screen: {
      type: "form",
      title: "Student Builder Application",
      subtitle: "Simple, honest, no corporate fluff",
      fields: [
        { label: "What are you curious about or building?", value: "Building a collaborative study agent & learning Next.js" },
        { label: "School / College & Year", value: "Stanford University • Sophomore" },
        { label: "What do you want from peers?", value: "Honest UX feedback & hackathon teammates" },
      ],
    },
  },
  {
    step: "02",
    title: "Curated Vibe & Curiosity Check",
    tagline: "Reviewed by fellow student builders within 24-48h.",
    badge: "24-48 hours turnaround",
    description:
      "We don't filter by GPA or fancy credentials. We curate for curiosity, willingness to give feedback, and eagerness to build. We keep the group high-signal so everyone benefits.",
    icon: UserCheck,
    highlights: ["Curated by student peers", "Zero spam or self-promo noise", "High signal-to-noise ratio"],
    screen: {
      type: "review",
      title: "Peer Curation Review",
      subtitle: "Checking for active builder mindset & curiosity",
      checklist: [
        { title: "Active Builder Mindset", desc: "Building, designing, or actively learning", status: "Verified" },
        { title: "Curiosity & Authenticity", desc: "Genuine interest in learning with peers", status: "Verified" },
        { title: "Constructive Feedback Culture", desc: "Willing to test & critique peer work", status: "Verified" },
      ],
    },
  },
  {
    step: "03",
    title: "Join the WhatsApp Community",
    tagline: "Get your invite and introduce yourself.",
    badge: "Instant access upon approval",
    description:
      "Once approved, you'll receive a private WhatsApp Community invite. Jump into the intro group, showcase what you're building, and immediately connect with peers in your region and interest area.",
    icon: MessageCircle,
    highlights: ["Private WhatsApp Circles", "Direct teammate search", "Weekly Saturday debates"],
    screen: {
      type: "unlock",
      title: "WhatsApp Community Circles",
      subtitle: "Your private access is active",
      circles: [
        { name: "# Introductions", count: "All Cohorts", desc: "Share your stack & current project" },
        { name: "# Feedback & Critique", count: "Daily", desc: "Honest peer review on your WIP" },
        { name: "# Teammate Search", count: "Active", desc: "Find co-builders & hackathon partners" },
        { name: "# Project Graveyard", count: "Mistake Vault", desc: "Post-mortems & lessons learned" },
        { name: "# Coffee Chats", count: "Every 3-4 days", desc: "1-on-1 matched chats" },
      ],
    },
  },
];

function StepScreenCard({ stepItem }: { stepItem: typeof STEPS[0] }) {
  const Icon = stepItem.icon;
  const screen = stepItem.screen;

  return (
    <div className="glass-card rounded-2xl sm:rounded-3xl p-5 sm:p-8 border-2 border-emerald-300/80 dark:border-emerald-500/35 shadow-2xl relative overflow-hidden flex flex-col justify-between h-full">
      {/* Background circuit grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />

      <div className="relative z-10 w-full">
        {/* Top Header */}
        <div className="flex items-start sm:items-center justify-between gap-3 mb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-gradient-to-br from-emerald-100 to-emerald-200 dark:from-emerald-950 dark:to-[#094d2f] border border-emerald-300/80 dark:border-emerald-400/30 flex items-center justify-center text-[#0d623d] dark:text-emerald-400 shadow-md shrink-0">
              <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <span className="text-[11px] sm:text-xs font-bold text-[#0d623d] dark:text-emerald-400 uppercase tracking-wider">
                Stage {stepItem.step} • {stepItem.badge}
              </span>
              <h3 className="text-lg sm:text-2xl font-black text-slate-900 dark:text-white leading-tight">
                {stepItem.title}
              </h3>
            </div>
          </div>
          <span className="text-2xl sm:text-4xl font-black text-slate-300 dark:text-emerald-900/60 font-mono select-none shrink-0">
            {stepItem.step}
          </span>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-5">
          {stepItem.description}
        </p>

        {/* Highlights Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-2.5 mb-5">
          {stepItem.highlights.map((h, i) => (
            <div
              key={i}
              className="p-2 sm:p-2.5 rounded-xl bg-white/80 dark:bg-[#07140c]/90 border border-emerald-200/80 dark:border-emerald-500/20 text-xs font-medium text-slate-700 dark:text-slate-200 flex items-start gap-2 shadow-xs"
            >
              <div className="w-4 h-4 rounded-full bg-emerald-100 dark:bg-emerald-500/20 text-[#0d623d] dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                <Check className="w-3 h-3" />
              </div>
              <span className="text-[11px] sm:text-xs leading-snug">{h}</span>
            </div>
          ))}
        </div>

        {/* Dynamic Interactive Stage Mockup */}
        <div className="p-3.5 sm:p-5 rounded-xl sm:rounded-2xl bg-white/90 dark:bg-[#050e08] border border-emerald-300/70 dark:border-emerald-500/25 shadow-inner">
          {/* Step 1: Form Simulation */}
          {screen.type === "form" && (
            <div className="space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-emerald-200/60 dark:border-emerald-500/15">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-bold text-slate-900 dark:text-white">{screen.title}</span>
                </div>
                <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-500/15 text-emerald-800 dark:text-emerald-300">
                  Step 1 of 3
                </span>
              </div>
              <div className="space-y-2.5">
                {screen.fields?.map((field, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1, duration: 0.3 }}
                    className="p-2.5 rounded-xl bg-slate-50 dark:bg-[#08160d] border border-emerald-300/40 dark:border-emerald-500/15"
                  >
                    <p className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      {field.label}
                    </p>
                    <p className="text-xs font-bold text-slate-900 dark:text-slate-100 mt-0.5">
                      {field.value}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Peer Curation Verification */}
          {screen.type === "review" && (
            <div className="space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-emerald-200/60 dark:border-emerald-500/15">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#0d623d] dark:text-emerald-400" />
                  <span className="text-xs font-bold text-slate-900 dark:text-white">{screen.title}</span>
                </div>
                <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-500/15 text-emerald-800 dark:text-emerald-300">
                  24-48h Check
                </span>
              </div>
              <div className="space-y-2">
                {screen.checklist?.map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.12, duration: 0.3 }}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-[#08160d] border border-emerald-300/40 dark:border-emerald-500/15"
                  >
                    <div>
                      <p className="text-xs font-bold text-slate-900 dark:text-white">{item.title}</p>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">{item.desc}</p>
                    </div>
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-500/20 text-[#0d623d] dark:text-emerald-300 shrink-0">
                      <CheckCircle2 className="w-3 h-3" />
                      {item.status}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Unlocked WhatsApp Community Circles */}
          {screen.type === "unlock" && (
            <div className="space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-emerald-200/60 dark:border-emerald-500/15">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-500" />
                  <span className="text-xs font-bold text-slate-900 dark:text-white">{screen.title}</span>
                </div>
                <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-emerald-500 text-white shadow-xs">
                  Access Granted
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {screen.circles?.map((circle, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.1, duration: 0.3 }}
                    className="p-2.5 rounded-xl bg-slate-50 dark:bg-[#08160d] border border-emerald-300/40 dark:border-emerald-500/15"
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-bold text-slate-900 dark:text-white font-mono">{circle.name}</p>
                      <span className="text-[9px] text-emerald-700 dark:text-emerald-400 font-semibold">{circle.count}</span>
                    </div>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 leading-snug">{circle.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Pinned scroll spy calculation on desktop viewports
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      if (window.innerWidth < 1024) return; // Only enable scroll spy on desktop

      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const stickyTop = 80; // Top offset below fixed navbar
      const totalScrollable = rect.height - windowHeight;
      if (totalScrollable <= 0) return;

      const currentScroll = stickyTop - rect.top;
      const progress = Math.max(0, Math.min(1, currentScroll / totalScrollable));

      const index = Math.min(STEPS.length - 1, Math.floor(progress * STEPS.length));
      setActiveStep(index);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleStepClick = (idx: number) => {
    setActiveStep(idx);
    if (containerRef.current && window.innerWidth >= 1024) {
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const totalScrollable = rect.height - windowHeight;
      if (totalScrollable > 0) {
        const targetScroll = window.scrollY + rect.top - 80 + (idx / STEPS.length) * totalScrollable + 10;
        window.scrollTo({ top: targetScroll, behavior: "smooth" });
      }
    }
  };

  return (
    <section ref={containerRef} id="how-it-works" className="relative py-12 lg:py-16 lg:min-h-[260vh]">
      {/* Sticky viewport on desktop / standard fluid on mobile */}
      <div className="lg:sticky lg:top-20 lg:min-h-[85vh] flex flex-col justify-center overflow-hidden py-2 sm:py-4">
        {/* Ambient Neon Lighting */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] radial-glow-emerald opacity-50 pointer-events-none -z-10" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          {/* Header */}
          <div className="mb-8 lg:mb-10 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-300/80 dark:border-emerald-500/30 text-emerald-800 dark:text-emerald-300 text-xs font-semibold uppercase tracking-wider mb-2.5 shadow-xs">
              <Cpu className="w-3.5 h-3.5 text-[#0d623d] dark:text-emerald-400 animate-pulse" />
              Simple 3-Step Process
            </div>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
              <div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
                  How to join <span className="gradient-text-primary">Peercuit</span>
                </h2>
                <p className="text-xs sm:text-base text-slate-600 dark:text-slate-300 mt-1.5">
                  From application to your first community demo in 3 straightforward steps.
                </p>
              </div>

              {/* Progress Indicator Bar */}
              <div className="hidden lg:flex items-center gap-2 bg-white/70 dark:bg-[#07130c]/70 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-emerald-300/60 dark:border-emerald-500/20">
                <span className="text-xs font-mono font-bold text-slate-600 dark:text-slate-300">
                  Step {activeStep + 1} of {STEPS.length}
                </span>
                <div className="w-24 h-2 bg-slate-200 dark:bg-emerald-950 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-[#0d623d] to-emerald-400"
                    animate={{ width: `${((activeStep + 1) / STEPS.length) * 100}%` }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Desktop HUD */}
          <div className="hidden lg:grid grid-cols-12 gap-8 items-center">
            {/* Left Column: Interactive Step Selector */}
            <div className="col-span-5 space-y-3.5">
              {STEPS.map((item, idx) => {
                const isActive = activeStep === idx;
                const Icon = item.icon;

                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleStepClick(idx)}
                    className={`w-full text-left p-4 rounded-2xl transition-all duration-300 cursor-pointer relative overflow-hidden group ${
                      isActive
                        ? "glass-card border-2 border-emerald-500 shadow-xl shadow-emerald-950/15 scale-[1.02]"
                        : "glass-card border border-emerald-900/10 dark:border-emerald-500/15 opacity-65 hover:opacity-100 hover:border-emerald-400/50"
                    }`}
                  >
                    <div className="flex items-start gap-3.5">
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 font-bold text-xs transition-colors duration-300 shadow-xs mt-0.5 ${
                          isActive
                            ? "bg-[#0d623d] text-white dark:bg-emerald-500 shadow-emerald-500/30"
                            : "bg-emerald-100 dark:bg-emerald-950/80 text-[#0d623d] dark:text-emerald-400"
                        }`}
                      >
                        {item.step}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-2 mb-0.5">
                          <p className="text-sm font-bold text-slate-900 dark:text-white truncate">
                            {item.title}
                          </p>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100/80 dark:bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 shrink-0">
                            {item.badge}
                          </span>
                        </div>
                        <p className="text-xs text-[#0d623d] dark:text-emerald-400 font-semibold mb-1 truncate">
                          {item.tagline}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>

                    {/* Active Accent Indicator */}
                    {isActive && (
                      <motion.div
                        layoutId="active-step-indicator"
                        className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#0d623d] via-emerald-400 to-[#16a34a]"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                  </button>
                );
              })}

              <div className="pt-2">
                <Link
                  href="/apply"
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-bold text-white bg-[#0d623d] hover:bg-[#094d2f] dark:bg-emerald-600 dark:hover:bg-emerald-500 rounded-xl shadow-lg shadow-emerald-900/15 dark:shadow-emerald-600/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  Ready to join? Apply in 2 mins
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Right Column: Dynamic Stage Morphing Preview */}
            <div className="col-span-7 min-h-[460px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, y: 15, scale: 0.99 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -15, scale: 0.99 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="h-full"
                >
                  <StepScreenCard stepItem={STEPS[activeStep]} />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Mobile Stack */}
          <div className="flex flex-col gap-6 lg:hidden">
            {STEPS.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <StepScreenCard stepItem={item} />
              </motion.div>
            ))}

            <div className="mt-4 text-center">
              <Link
                href="/apply"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-bold text-white bg-[#0d623d] hover:bg-[#094d2f] dark:bg-emerald-600 dark:hover:bg-emerald-500 rounded-xl shadow-xl transition-all"
              >
                Ready to find your circle? Apply in 2 mins
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

