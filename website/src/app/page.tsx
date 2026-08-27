import React from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Cpu } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { ValueProps } from "@/components/ValueProps";
import { HowItWorks } from "@/components/HowItWorks";
import { Rituals } from "@/components/Rituals";
import { SocialProof } from "@/components/SocialProof";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";
import { Founders } from "@/components/Founders";
import { supabase } from "@/lib/supabase";

export default async function Home() {
  let applicationsOpen = true;

  if (supabase) {
    const { data } = await supabase.from('settings').select('value').eq('key', 'applications_open').single();
    if (data && data.value !== undefined) {
      applicationsOpen = data.value;
    }
  }
  return (
    <div className="min-h-screen bg-transparent text-slate-900 dark:text-slate-100 flex flex-col selection:bg-[#0d623d] selection:text-white dark:selection:bg-emerald-500 transition-colors duration-200">
      <Navbar />

      <main className="flex-grow">
        {/* 1. Hero Section */}
        <Hero applicationsOpen={applicationsOpen} />

        {/* 2. What You Get (Value Props) */}
        <ValueProps />

        {/* 3. How It Works (3 Steps) */}
        <HowItWorks />

        {/* 4. Weekly Rituals */}
        <Rituals />

        {/* 5. Honest Principles & Community Metrics */}
        <SocialProof />

        {/* 6. Founders */}
        <Founders />

        {/* 7. Mid-Page Big CTA Section */}
        <section className="py-20 relative overflow-hidden">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative rounded-3xl p-8 sm:p-12 md:p-16 glass-card border border-emerald-300/80 dark:border-emerald-500/30 shadow-2xl overflow-hidden text-center">
              <div className="absolute top-0 right-0 w-72 h-72 radial-glow-emerald opacity-50 pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-72 h-72 radial-glow-green opacity-40 pointer-events-none" />

              <div className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full ${applicationsOpen ? 'bg-emerald-100 dark:bg-emerald-500/15 text-emerald-900 dark:text-emerald-300 border-emerald-300 dark:border-emerald-500/30' : 'bg-red-100 dark:bg-red-500/15 text-red-900 dark:text-red-300 border-red-300 dark:border-red-500/30'} text-xs font-semibold uppercase tracking-wider mb-5 border`}>
                <Cpu className={`w-3.5 h-3.5 ${applicationsOpen ? 'text-[#0d623d] dark:text-emerald-400' : 'text-red-700 dark:text-red-400'}`} />
                {applicationsOpen ? 'Applications Open for Cohort 4' : 'Applications are Closed'}
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight max-w-2xl mx-auto mb-4">
                Don&apos;t build your next idea in isolation.
              </h2>

              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-xl mx-auto mb-8">
                Join a community of ambitious high school and college students who will test your projects, give honest critique, and team up with you.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                {applicationsOpen ? (
                  <Link
                    href="/apply"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 text-base font-bold text-white bg-[#0d623d] hover:bg-[#094d2f] dark:bg-gradient-to-r dark:from-emerald-600 dark:via-emerald-500 dark:to-teal-600 dark:hover:from-emerald-500 dark:hover:to-teal-500 rounded-xl shadow-xl shadow-emerald-900/15 dark:shadow-emerald-600/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
                  >
                    Apply to Join Peercuit
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                ) : (
                  <Link
                    href="/apply"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 text-base font-bold text-amber-900 bg-amber-100 dark:bg-amber-500/20 dark:text-amber-300 border border-amber-300 dark:border-amber-500/30 rounded-xl transition-all"
                  >
                    Applications open 1st week of month
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                )}
                <Link
                  href="#faq"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 text-base font-medium text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white glass-card border border-emerald-300/60 dark:border-emerald-500/25 rounded-xl transition-all shadow-xs"
                >
                  Read Student FAQs
                </Link>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-6 mt-8 text-xs text-slate-600 dark:text-slate-400 font-medium">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#0d623d] dark:text-emerald-400" />
                  100% Free Forever
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#0d623d] dark:text-emerald-400" />
                  2-Minute Application
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#0d623d] dark:text-emerald-400" />
                  Reviewed in 24-48 Hours
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* 7. FAQ */}
        <FAQ />
      </main>

      <Footer />
    </div>
  );
}
