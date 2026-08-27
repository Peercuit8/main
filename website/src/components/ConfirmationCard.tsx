"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import confetti from "canvas-confetti";
import { CheckCircle2, Clock, ArrowRight, RotateCcw, Share2 } from "lucide-react";
import { PeercuitLogo } from "./PeercuitLogo";

interface ConfirmationCardProps {
  fullName: string;
  email: string;
  applicationId?: string;
  onReset: () => void;
}

export function ConfirmationCard({
  fullName,
  email,
  applicationId,
  onReset,
}: ConfirmationCardProps) {
  useEffect(() => {
    // Trigger celebration confetti in brand colors
    try {
      const end = Date.now() + 1.2 * 1000;
      const colors = ["#0d623d", "#10b981", "#15803d", "#34d399", "#047857"];

      (function frame() {
        confetti({
          particleCount: 3,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: colors,
        });
        confetti({
          particleCount: 3,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: colors,
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      })();
    } catch (e) {
      console.warn("Confetti effect failed:", e);
    }
  }, []);

  const firstName = fullName.trim().split(" ")[0] || "there";

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "Peercuit — Student Builder Community",
        text: "Just applied to join Peercuit, a community for high school and college students who build things together!",
        url: window.location.origin,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.origin);
      alert("Peercuit link copied to clipboard! Share it with your friends.");
    }
  };

  return (
    <div className="glass-card rounded-2xl p-6 sm:p-10 border border-slate-200 dark:border-emerald-500/30 shadow-2xl relative overflow-hidden text-left transition-colors">
      <div className="absolute top-0 right-0 w-48 h-48 radial-glow-emerald opacity-50 pointer-events-none" />

      {/* Success Badge */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-500/20 border border-emerald-300 dark:border-emerald-500/30 flex items-center justify-center text-[#0d623d] dark:text-emerald-400">
          <CheckCircle2 className="w-7 h-7" />
        </div>
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-300 dark:border-emerald-500/30">
            Application Received
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
            You&apos;re on our radar, {firstName}! 🎉
          </h2>
        </div>
      </div>

      <p className="text-slate-700 dark:text-slate-200 text-sm sm:text-base leading-relaxed mb-4">
        Thanks for applying to <strong className="text-[#0d623d] dark:text-emerald-400 font-bold">Peercuit</strong>. We received your details and sent a confirmation receipt to <strong className="text-emerald-700 dark:text-emerald-300 underline">{email}</strong>.
      </p>

      {/* Spam Folder Alert Banner */}
      <div className="flex items-start gap-3 p-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-500/30 text-amber-900 dark:text-amber-200 text-xs sm:text-sm mb-6 shadow-xs">
        <span className="text-base leading-none mt-0.5">📬</span>
        <div>
          <span className="font-bold">Important Notice:</span> Please check your <strong>Spam / Junk folder</strong> and mark our emails as <em>&ldquo;Not Spam&rdquo;</em> so you don&apos;t miss your acceptance decision or community updates!
        </div>
      </div>

      {/* What to expect timeline */}
      <div className="bg-slate-50 dark:bg-[#08120c]/90 rounded-xl p-5 border border-slate-200 dark:border-emerald-500/[0.15] mb-8 space-y-4">
        <h4 className="text-xs uppercase tracking-wider font-bold text-slate-900 dark:text-emerald-300 flex items-center gap-2">
          <Clock className="w-4 h-4 text-[#0d623d] dark:text-emerald-400" />
          What happens next:
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-3 rounded-lg bg-white dark:bg-[#0d1c14] border border-slate-200 dark:border-emerald-500/20 shadow-xs">
            <div className="text-xs font-mono font-bold text-[#0d623d] dark:text-emerald-400 mb-1">
              Step 1 &bull; 24-48 Hours
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Our organizers review your submission for curiosity and motivation.
            </p>
          </div>

          <div className="p-3 rounded-lg bg-white dark:bg-[#0d1c14] border border-slate-200 dark:border-emerald-500/20 shadow-xs">
            <div className="text-xs font-mono font-bold text-[#0d623d] dark:text-emerald-300 mb-1">
              Step 2 &bull; WhatsApp Community
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              You&apos;ll get a private invite link directly to our WhatsApp community group.
            </p>
          </div>

          <div className="p-3 rounded-lg bg-white dark:bg-[#0d1c14] border border-slate-200 dark:border-emerald-500/20 shadow-xs">
            <div className="text-xs font-mono font-bold text-[#0d623d] dark:text-teal-300 mb-1">
              Step 3 &bull; Introduce & Build
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Share your projects, join the next Sunday Demo Night, and meet your circle.
            </p>
          </div>
        </div>
      </div>

      {applicationId && (
        <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400 mb-6">
          Application Reference: <span className="text-[#0d623d] dark:text-emerald-400 font-semibold">{applicationId}</span>
        </div>
      )}

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <Link
          href="/"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-[#0d623d] hover:bg-[#094d2f] dark:bg-emerald-600 dark:hover:bg-emerald-500 rounded-xl transition-all shadow-md"
        >
          Return to Home
          <ArrowRight className="w-4 h-4" />
        </Link>
        <button
          onClick={handleShare}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-medium text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white bg-slate-100 hover:bg-slate-200 dark:bg-emerald-950/40 dark:hover:bg-emerald-950/70 border border-slate-200 dark:border-emerald-500/25 rounded-xl transition-all cursor-pointer"
        >
          <Share2 className="w-4 h-4 text-[#0d623d] dark:text-emerald-400" />
          Share Peercuit with a Friend
        </button>
        <button
          onClick={onReset}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-3 text-xs text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Submit another application
        </button>
      </div>
    </div>
  );
}
