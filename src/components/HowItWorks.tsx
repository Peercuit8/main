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
      channels: ["Project Feedback", "Find Teammates", "Sunday Demos", "Opportunities"],
    },
  },
];

export function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Smooth natural scroll spy
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      const totalScrollable = rect.height - windowHeight;
      if (totalScrollable <= 0) return;

      const currentScroll = -rect.top;
      const progress = Math.max(0, Math.min(1, currentScroll / totalScrollable));

      const index = Math.min(2, Math.floor(progress * 3));
      setActiveStep(index);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section ref={containerRef} id="how-it-works" className="py-24 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-300/80 dark:border-emerald-500/30 text-emerald-800 dark:text-emerald-300 text-xs font-semibold uppercase tracking-wider mb-3 shadow-xs">
            <Cpu className="w-3.5 h-3.5 text-[#0d623d] dark:text-emerald-400" />
            3-Step Process
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            How to join <span className="gradient-text-primary">Peercuit</span>
          </h2>
          <p className="text-base text-slate-600 dark:text-slate-300 mt-2">
            From application to your first community demo in 3 simple steps.
          </p>
        </div>

        {/* Connected Step Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {STEPS.map((item, idx) => {
            const isActive = activeStep === idx;
            const Icon = item.icon;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: idx * 0.12 }}
                onClick={() => setActiveStep(idx)}
                className={`glass-card rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 cursor-pointer relative overflow-hidden ${
                  isActive
                    ? "border-2 border-emerald-500 shadow-2xl shadow-emerald-950/20 scale-[1.02]"
                    : "border border-emerald-900/10 dark:border-emerald-500/15 opacity-80 hover:opacity-100 hover:border-emerald-400"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={`text-3xl font-black font-mono transition-colors ${
                        isActive
                          ? "text-[#0d623d] dark:text-emerald-400"
                          : "text-slate-300 dark:text-emerald-900/60"
                      }`}
                    >
                      {item.step}
                    </span>
                    <span
                      className={`text-[11px] font-bold px-2.5 py-1 rounded-full border transition-colors ${
                        isActive
                          ? "bg-[#0d623d] text-white border-[#0d623d] dark:bg-emerald-500 dark:border-emerald-400"
                          : "bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-500/20"
                      }`}
                    >
                      {item.badge}
                    </span>
                  </div>

                  <div
                    className={`w-12 h-12 rounded-2xl border flex items-center justify-center mb-4 transition-all ${
                      isActive
                        ? "bg-gradient-to-br from-[#0d623d] to-emerald-600 text-white shadow-lg shadow-emerald-600/30 border-emerald-400"
                        : "bg-emerald-100 dark:bg-emerald-950/80 border-emerald-300 dark:border-emerald-500/30 text-[#0d623d] dark:text-emerald-400"
                    }`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="text-xl font-black text-slate-900 dark:text-white mb-1">
                    {item.title}
                  </h3>
                  <p className="text-xs font-semibold text-[#0d623d] dark:text-emerald-400 mb-2">
                    {item.tagline}
                  </p>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                    {item.description}
                  </p>
                </div>

                {/* Micro Mockup */}
                <div className="p-3.5 rounded-xl bg-white/90 dark:bg-[#07130c]/90 border border-emerald-300/60 dark:border-emerald-500/15 text-xs text-slate-700 dark:text-slate-300 space-y-1.5 shadow-xs">
                  <p className="font-bold text-[11px] text-slate-900 dark:text-white pb-1 border-b border-emerald-500/10">
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
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#0d623d] dark:text-emerald-400" />
                      <span>{it}</span>
                    </div>
                  ))}
                  {item.mock.channels?.map((ch, i) => (
                    <span
                      key={i}
                      className="inline-block mr-1 text-[10px] bg-emerald-50 dark:bg-[#0c1a11] px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-500/20 font-mono text-emerald-800 dark:text-emerald-300 font-semibold"
                    >
                      {ch}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Action */}
        <div className="mt-14 text-center">
          <Link
            href="/apply"
            className="inline-flex items-center gap-2 px-8 py-4 text-base font-bold text-white bg-[#0d623d] hover:bg-[#094d2f] dark:bg-emerald-600 dark:hover:bg-emerald-500 rounded-xl shadow-xl shadow-emerald-900/15 dark:shadow-emerald-600/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            Ready to find your circle? Apply in 2 mins
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
