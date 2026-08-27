"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  MessageSquare,
  Flame,
  Sparkles,
  Zap,
  Activity,
  Code2,
  Users,
} from "lucide-react";

export function Hero({ applicationsOpen = true, launchName = 'Cohort 4' }: { applicationsOpen?: boolean, launchName?: string }) {
  return (
    <section className="relative pt-24 pb-14 sm:pt-32 sm:pb-20 md:pt-36 md:pb-24 overflow-hidden">
      {/* Background glowing ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] pointer-events-none radial-glow-emerald opacity-75 -z-10" />
      <div className="absolute top-40 right-10 w-96 h-96 pointer-events-none radial-glow-green opacity-40 -z-10" />
      <motion.div 
        animate={{ backgroundPosition: ["0px 0px", "36px 36px"] }}
        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
        className="absolute inset-0 bg-grid-pattern opacity-50 -z-10 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" 
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          {/* Top Pill / Live Signal Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className={`inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full ${applicationsOpen ? 'bg-white/90 dark:bg-emerald-950/80 border-emerald-300/80 dark:border-emerald-500/30' : 'bg-red-50 dark:bg-red-950/80 border-red-300 dark:border-red-500/30'} border text-xs sm:text-sm font-medium mb-5 sm:mb-6 shadow-md max-w-[95%] truncate`}
          >
            {applicationsOpen && (
              <span className="relative flex h-2 w-2 sm:h-2.5 sm:w-2.5 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75 duration-1000" />
                <span className="relative inline-flex rounded-full h-2 w-2 sm:h-2.5 sm:w-2.5 bg-[#0d623d] dark:bg-emerald-400" />
              </span>
            )}
            <span className={`font-bold ${applicationsOpen ? 'text-slate-900 dark:text-white' : 'text-red-900 dark:text-red-200'} truncate`}>Curated Student Network</span>
            <span className={applicationsOpen ? "text-emerald-600 dark:text-emerald-400/50" : "text-red-400"}>•</span>
            <span className={`font-semibold truncate ${applicationsOpen ? 'text-[#0d623d] dark:text-emerald-300' : 'text-red-700 dark:text-red-400'}`}>
              {applicationsOpen ? `Applications Open for ${launchName}` : 'Applications currently closed'}
            </span>
          </motion.div>

          {/* Singular Bold Headline */}
          <h1 className="text-center text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-slate-900 dark:text-white max-w-4xl mx-auto leading-[1.1] mb-5 sm:mb-6">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="inline-block"
            >
              Find your people.
            </motion.span>{" "}
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="gradient-text-primary block sm:inline-block mt-1 sm:mt-0"
            >
              Build together.
            </motion.span>
          </h1>

          {/* Sub-headline */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="text-center text-base sm:text-lg md:text-xl text-slate-700 dark:text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed mb-8 sm:mb-10 px-2"
          >
            A curated community for{" "}
            <span className="text-slate-900 dark:text-white font-semibold underline decoration-[#0d623d] dark:decoration-emerald-500 decoration-2 underline-offset-4">
              high school & college students
            </span>{" "}
            to get honest feedback on their work, find ambitious co-builders, discover opportunities, and ship projects that stand out.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center w-full mb-12 sm:mb-16 gap-3"
          >
            {applicationsOpen ? (
              <Link
                href="/apply"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 text-sm sm:text-base font-bold text-white bg-[#0d623d] hover:bg-[#094d2f] dark:bg-gradient-to-r dark:from-emerald-600 dark:via-emerald-500 dark:to-teal-600 dark:hover:from-emerald-500 dark:hover:to-teal-500 rounded-xl shadow-xl shadow-emerald-900/20 dark:shadow-emerald-600/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                Apply to Join Peercuit
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </Link>
            ) : (
              <Link
                href="/apply"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 text-sm sm:text-base font-bold text-amber-900 bg-amber-100 dark:bg-amber-500/20 dark:text-amber-300 border border-amber-300 dark:border-amber-500/30 rounded-xl transition-all"
              >
                Applications open 1st week of month
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </Link>
            )}
          </motion.div>


        </div>
      </div>
    </section>
  );
}
