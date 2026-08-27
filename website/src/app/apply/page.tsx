import React from "react";
import Link from "next/link";
import { ArrowLeft, ShieldCheck, Zap, Users } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ApplicationForm } from "@/components/ApplicationForm";

export const metadata = {
  title: "Apply to Join Peercuit | Student Builder Community",
  description:
    "Join a community of high school & college students building side projects, getting honest feedback, and finding co-builders.",
};

export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { supabase } from "@/lib/supabase";
import { isApplicationsOpen } from "@/lib/applications";

export default async function ApplyPage() {
  let applicationsOpen = true;

  if (supabase) {
    try {
      const { data, error } = await supabase.from('settings').select('value').eq('key', 'applications_open').single();
      if (!error && data && data.value !== undefined) {
        applicationsOpen = isApplicationsOpen(data.value);
      }
    } catch (e) {
      console.error("Error fetching applications_open setting:", e);
    }
  }
  return (
    <div className="min-h-screen bg-transparent text-slate-900 dark:text-slate-100 flex flex-col selection:bg-[#0d623d] selection:text-white dark:selection:bg-emerald-500 transition-colors duration-200">
      <Navbar />

      <main className="flex-grow pt-28 pb-20 relative">
        {/* Background glow */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[500px] pointer-events-none radial-glow-emerald opacity-60 -z-10" />
        <div className="absolute bottom-10 right-10 w-96 h-96 pointer-events-none radial-glow-green opacity-40 -z-10" />
        <div className="absolute inset-0 bg-grid-pattern opacity-40 -z-10" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back link */}
          <div className="mb-6">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-[#0d623d] dark:hover:text-emerald-400 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back to Home
            </Link>
          </div>

          {/* Form Container */}
          <ApplicationForm isOpen={applicationsOpen} />

          {/* Trust Highlights Below Form */}
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center sm:text-left">
            <div className="p-4 rounded-xl glass-card border border-emerald-300/80 dark:border-emerald-500/[0.15] flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-500/10 text-[#0d623d] dark:text-emerald-400 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">No Spam Guarantee</h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                  We will never sell or share your email. Only used for community updates.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl glass-card border border-emerald-300/80 dark:border-emerald-500/[0.15] flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-500/10 text-[#0d623d] dark:text-emerald-400 flex items-center justify-center shrink-0">
                <Zap className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">48h Review Turnaround</h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                  Applications are reviewed directly by student organizers.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl glass-card border border-emerald-300/80 dark:border-emerald-500/[0.15] flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-teal-100 dark:bg-teal-500/10 text-teal-700 dark:text-teal-400 flex items-center justify-center shrink-0">
                <Users className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">100% Free Forever</h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                  Zero fees, paywalls, or paid tiers. Built for students by students.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
