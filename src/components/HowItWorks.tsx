"use client";

import React from "react";
import Link from "next/link";
import { FileText, UserCheck, MessageCircle, ArrowRight, Clock, Cpu } from "lucide-react";

const STEPS = [
  {
    step: "01",
    title: "Quick 2-Minute Application",
    tagline: "No CVs, no formal essays.",
    description:
      "Tell us what you're working on, learning, or obsessing over right now. Whether you're building a Discord bot, writing essays, designing logos, or prepping for your first hackathon — we want to hear about it.",
    icon: FileText,
    badge: "2 mins to complete",
  },
  {
    step: "02",
    title: "Curated Vibe & Curiosity Check",
    tagline: "Reviewed by fellow student builders within 24-48h.",
    description:
      "We don't filter by GPA or fancy credentials. We curate for curiosity, willingness to give feedback, and eagerness to build. We keep the group high-signal so everyone benefits.",
    icon: UserCheck,
    badge: "24-48 hours turnaround",
  },
  {
    step: "03",
    title: "Join the WhatsApp & Discord Group",
    tagline: "Get your invite and introduce yourself.",
    description:
      "Once approved, you'll receive a private WhatsApp & Discord invite. Jump into the intro channel, showcase what you're building, and immediately connect with peers in your region and interest area.",
    icon: MessageCircle,
    badge: "Instant access upon invite",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 relative bg-slate-50 dark:bg-[#040705]/60 border-y border-slate-200 dark:border-emerald-500/[0.12] transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/70 border border-emerald-300/60 dark:border-emerald-500/25 text-emerald-800 dark:text-emerald-300 text-xs font-semibold uppercase tracking-wider mb-4">
            <Cpu className="w-3.5 h-3.5 text-[#0d623d] dark:text-emerald-400" />
            Simple 3-Step Process
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-5">
            How to join <span className="gradient-text-primary">Peercuit</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300">
            We keep the onboarding frictionless while protecting the quality and safety of the community.
          </p>
        </div>

        {/* 3 Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {STEPS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="glass-card rounded-2xl p-7 flex flex-col justify-between border border-slate-200 dark:border-emerald-500/[0.12] relative group hover:border-[#0d623d] dark:hover:border-emerald-400/40 transition-all"
              >
                <div>
                  {/* Step Header */}
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-3xl font-black text-slate-400 dark:text-emerald-900 group-hover:text-[#0d623d] dark:group-hover:text-emerald-500 transition-colors font-mono">
                      {item.step}
                    </span>
                    <span className="text-[11px] font-semibold text-emerald-800 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-200 dark:border-emerald-500/20">
                      {item.badge}
                    </span>
                  </div>

                  <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-300/60 dark:border-emerald-500/30 flex items-center justify-center text-[#0d623d] dark:text-emerald-400 mb-5 shadow-xs">
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1.5">
                    {item.title}
                  </h3>
                  <p className="text-xs font-semibold text-[#0d623d] dark:text-emerald-400 mb-3">
                    {item.tagline}
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-200 dark:border-emerald-500/[0.12] flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                  <Clock className="w-3.5 h-3.5 text-[#0d623d] dark:text-emerald-500" />
                  <span>Step {idx + 1} of 3</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA Banner */}
        <div className="mt-14 text-center">
          <Link
            href="/apply"
            className="inline-flex items-center gap-2 px-8 py-3.5 text-base font-semibold text-white bg-[#0d623d] hover:bg-[#094d2f] dark:bg-emerald-600 dark:hover:bg-emerald-500 rounded-xl shadow-lg shadow-emerald-900/15 dark:shadow-emerald-600/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            Ready to find your circle? Apply in 2 mins
            <ArrowRight className="w-4 h-4" />
          </Link>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-3">
            Free forever &bull; No credit card or spam &bull; Direct student review
          </p>
        </div>
      </div>
    </section>
  );
}
