"use client";
import React, { useState, useEffect } from 'react';

export function Countdown({ startDate, endDate }: { startDate?: string | null, endDate?: string | null }) {
  const [timeLeft, setTimeLeft] = useState<{ label: string, time: string } | null>(null);

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date().getTime();
      let targetTime = 0;
      let label = "";

      if (startDate && new Date(startDate).getTime() > now) {
        targetTime = new Date(startDate).getTime();
        label = "Opening in:";
      } else if (endDate && new Date(endDate).getTime() > now) {
        targetTime = new Date(endDate).getTime();
        label = "Closing in:";
      } else {
        setTimeLeft(null);
        return;
      }

      const distance = targetTime - now;
      if (distance <= 0) {
        setTimeLeft(null);
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      // Format time parts to always show 2 digits for hrs, mins, secs
      const dDisplay = days > 0 ? `${days}d ` : '';
      const hDisplay = `${hours.toString().padStart(2, '0')}h `;
      const mDisplay = `${minutes.toString().padStart(2, '0')}m `;
      const sDisplay = `${seconds.toString().padStart(2, '0')}s`;

      setTimeLeft({
        label,
        time: `${dDisplay}${hDisplay}${mDisplay}${sDisplay}`
      });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [startDate, endDate]);

  if (!timeLeft) return null;

  return (
    <div className="mt-4 mb-2 inline-flex items-center gap-3 px-4 py-2 bg-emerald-500/10 dark:bg-emerald-500/20 border border-emerald-500/20 rounded-xl backdrop-blur-md">
      <span className="text-sm font-semibold text-emerald-800 dark:text-emerald-300 uppercase tracking-wider">{timeLeft.label}</span>
      <span className="text-lg font-bold font-mono text-[#0d623d] dark:text-emerald-400 tabular-nums tracking-tight">{timeLeft.time}</span>
    </div>
  );
}
