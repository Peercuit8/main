import React from "react";
import Link from "next/link";
import { CheckCircle2, AlertTriangle, ArrowRight, MessageSquare, ShieldCheck } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { supabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata = {
  title: "Join Peercuit WhatsApp Community",
  description: "One-time invite gateway for verified Peercuit members.",
};

const WHATSAPP_COMMUNITY_URL = "https://chat.whatsapp.com/BqrtVE7X4Hv5g0yiKWEAVh";

export default async function JoinPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;

  let state: "valid" | "already_used" | "invalid" = "invalid";
  let applicantName = "";

  if (token && supabase) {
    try {
      const { data, error } = await supabase
        .from("applications")
        .select("id, full_name, email, invite_token_used")
        .eq("invite_token", token)
        .single();

      if (!error && data) {
        applicantName = data.full_name;
        if (data.invite_token_used) {
          state = "already_used";
        } else {
          // Atomically mark token as used
          await supabase
            .from("applications")
            .update({
              invite_token_used: true,
              invite_token_used_at: new Date().toISOString(),
            })
            .eq("id", data.id);

          state = "valid";
        }
      }
    } catch (err) {
      console.error("[Join Gateway] Error verifying invite token:", err);
      state = "invalid";
    }
  } else if (!token) {
    state = "invalid";
  }

  return (
    <div className="min-h-screen bg-transparent text-slate-900 dark:text-slate-100 flex flex-col selection:bg-[#0d623d] selection:text-white dark:selection:bg-emerald-500 transition-colors duration-200">
      <Navbar />

      {/* Auto-redirect meta tag if link is valid */}
      {state === "valid" && (
        <meta httpEquiv="refresh" content={`2;url=${WHATSAPP_COMMUNITY_URL}`} />
      )}

      <main className="flex-grow pt-32 pb-20 flex items-center justify-center relative">
        {/* Background glow */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[450px] pointer-events-none radial-glow-emerald opacity-60 -z-10" />

        <div className="max-w-md w-full mx-auto px-4">
          <div className="glass-card p-8 sm:p-10 rounded-2xl border border-emerald-300/70 dark:border-emerald-500/20 shadow-2xl text-center">
            {state === "valid" ? (
              <>
                <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-500/20 text-[#0d623d] dark:text-emerald-400 mx-auto flex items-center justify-center mb-6 ring-8 ring-emerald-50 dark:ring-emerald-950/40">
                  <CheckCircle2 className="w-8 h-8 animate-bounce" />
                </div>

                <span className="text-[11px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 px-3 py-1 rounded-full">
                  Invite Verified
                </span>

                <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white mt-4 mb-2">
                  Welcome, {applicantName ? applicantName.split(" ")[0] : "Builder"}! ??
                </h1>
                <p className="text-sm text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
                  Your one-time invite has been verified. Redirecting you to the private Peercuit WhatsApp group...
                </p>

                <a
                  href={WHATSAPP_COMMUNITY_URL}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 text-base font-bold text-white bg-[#25D366] hover:bg-[#1EBE5D] rounded-xl shadow-lg shadow-emerald-900/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <MessageSquare className="w-5 h-5 fill-current" />
                  Open WhatsApp Group
                  <ArrowRight className="w-4 h-4" />
                </a>

                <p className="text-xs text-slate-400 dark:text-slate-500 mt-4">
                  If WhatsApp doesn't open automatically, click the button above.
                </p>
              </>
            ) : state === "already_used" ? (
              <>
                <div className="w-16 h-16 rounded-full bg-amber-100 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 mx-auto flex items-center justify-center mb-6 ring-8 ring-amber-50 dark:ring-amber-950/40">
                  <AlertTriangle className="w-8 h-8" />
                </div>

                <span className="text-[11px] font-bold uppercase tracking-wider bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 px-3 py-1 rounded-full">
                  Link Expired
                </span>

                <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white mt-4 mb-2">
                  Invite Already Claimed
                </h1>
                <p className="text-sm text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
                  This single-use invite link has already been used to join the community.
                </p>

                <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#07120a] border border-slate-200 dark:border-emerald-500/20 text-xs text-slate-500 dark:text-slate-400 mb-6">
                  Need help or accidentally left the group? Email us at{" "}
                  <a href="mailto:peercuit8@gmail.com" className="text-[#0d623d] dark:text-emerald-400 font-semibold underline">
                    peercuit8@gmail.com
                  </a>
                </div>

                <Link
                  href="/"
                  className="inline-flex items-center justify-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-[#0d623d] dark:hover:text-emerald-400"
                >
                  Return to Home
                </Link>
              </>
            ) : (
              <>
                <div className="w-16 h-16 rounded-full bg-rose-100 dark:bg-rose-500/20 text-rose-600 dark:text-rose-400 mx-auto flex items-center justify-center mb-6 ring-8 ring-rose-50 dark:ring-rose-950/40">
                  <ShieldCheck className="w-8 h-8" />
                </div>

                <span className="text-[11px] font-bold uppercase tracking-wider bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 px-3 py-1 rounded-full">
                  Invalid Link
                </span>

                <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white mt-4 mb-2">
                  Invalid Invite Token
                </h1>
                <p className="text-sm text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
                  We couldn't verify this invite link. Please make sure you clicked the exact link sent to your email.
                </p>

                <Link
                  href="/"
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-[#0d623d] hover:bg-[#094d2f] dark:bg-emerald-600 rounded-xl"
                >
                  Return to Home
                </Link>
              </>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
