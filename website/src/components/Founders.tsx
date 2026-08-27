"use client";

import React from "react";
import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

const FOUNDERS = [
  {
    name: "Neil Surjiani",
    image: "/neil.png",
    linkedin: "https://www.linkedin.com/in/neil-surjiani/",
    tagline: "Student Builder & Co-Founder",
  },
  {
    name: "Haransh Kaur Bachher",
    image: "/haransh.jpeg",
    linkedin: "https://www.linkedin.com/in/haransh-kaur-bachher/",
    tagline: "Student Builder & Co-Founder",
  }
];

export function Founders() {
  return (
    <section id="founders" className="py-24 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/70 border border-emerald-300/60 dark:border-emerald-500/25 text-emerald-800 dark:text-emerald-300 text-xs font-semibold uppercase tracking-wider mb-3">
            Founders
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Built by <span className="gradient-text-primary">students</span>, for students.
          </h2>
          <p className="text-base text-slate-600 dark:text-slate-300 mt-3">
            Meet the team behind Peercuit.
          </p>
        </div>

        {/* Founders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {FOUNDERS.map((founder, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-3xl p-8 bg-white/40 dark:bg-[#07130c]/40 backdrop-blur-md border border-emerald-900/5 dark:border-emerald-500/10 shadow-none hover:shadow-[0_8px_30px_rgba(13,98,61,0.08)] dark:hover:shadow-[0_8px_30px_rgba(16,185,129,0.08)] hover:-translate-y-0.5 hover:border-emerald-900/10 dark:hover:border-emerald-500/20 transition-all duration-300 flex flex-col items-center text-center group"
            >
              <div className="relative w-40 h-40 mb-6 rounded-full overflow-hidden border-4 border-emerald-100 dark:border-emerald-900/50 shadow-xl group-hover:scale-105 transition-transform duration-500">
                <Image
                  src={founder.image}
                  alt={founder.name}
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                {founder.name}
              </h3>
              <p className="text-sm font-semibold text-[#0d623d] dark:text-emerald-400 mb-6">
                {founder.tagline}
              </p>
              
              <a
                href={founder.linkedin}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm font-bold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
              >
                <ExternalLink className="w-4 h-4" />
                Connect on LinkedIn
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
