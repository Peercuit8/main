"use client";

import React from "react";
import { CheckCircle2, Zap, Shield, Code2, Users, Flame } from "lucide-react";

const COMMUNITY_PILLARS = [
  {
    icon: Code2,
    title: "Builders Over Talkers",
    description:
      "Whether it's your first Python script, a Figma design system, or a micro-SaaS — we value tangible shipping and genuine curiosity over credentials.",
  },
  {
    icon: Flame,
    title: "Honest, Constructive Feedback",
    description:
      "No empty corporate praise. We give real, respectful critiques on UI, architecture, and copy so everyone actually gets better.",
  },
  {
    icon: Shield,
    title: "100% Free & Curated",
    description:
      "Zero paywalls, courses, or hidden fees. We keep the WhatsApp & Discord groups curated to maintain high signal-to-noise ratio.",
  },
];

const STATS = [
  { label: "Community Access", value: "$0 Free" },
  { label: "Review Turnaround", value: "24-48h" },
  { label: "High School & College", value: "All Years" },
  { label: "Format", value: "WhatsApp & Discord" },
];

export function SocialProof() {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Transparent Community Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-16">
          {STATS.map((stat, idx) => (
            <div
              key={idx}
              className="glass-card rounded-2xl p-6 text-center border border-slate-200 dark:border-emerald-500/[0.15]"
            >
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-1 gradient-text-highlight">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Community Values & Manifesto */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/70 border border-emerald-300/60 dark:border-emerald-500/25 text-emerald-800 dark:text-emerald-300 text-xs font-semibold uppercase tracking-wider mb-4">
            <Zap className="w-3.5 h-3.5 text-[#0d623d] dark:text-emerald-400" />
            Our Community Principles
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
            What Peercuit is built on.
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg">
            A focused environment where high school and college students collaborate without noise, spam, or networking superficiality.
          </p>
        </div>

        {/* 3 Principles Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {COMMUNITY_PILLARS.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="glass-card glass-card-hover rounded-2xl p-7 flex flex-col justify-between border border-slate-200 dark:border-emerald-500/[0.15]"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-950/90 border border-emerald-300/60 dark:border-emerald-500/30 flex items-center justify-center text-[#0d623d] dark:text-emerald-400 mb-5 shadow-xs">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-2">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
