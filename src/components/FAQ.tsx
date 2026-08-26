"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

const FAQS = [
  {
    q: "Is Peercuit really 100% free?",
    a: "Yes, completely free. There are zero membership fees, hidden subscriptions, or paid up-sells. Peercuit is built by students for students who want to support each other.",
  },
  {
    q: "What if I'm just getting started and don't have big projects yet?",
    a: "You're totally welcome! We don't judge you by how many GitHub stars or followers you have. What matters is your curiosity, eagerness to learn, and willingness to participate and help other students.",
  },
  {
    q: "Why do you have an application form instead of an open link?",
    a: "Open invite links get overrun by spammers, promo bots, and inactive lurkers. We run a 2-minute application to keep the vibe safe, welcoming, and focused on genuine student builders.",
  },
  {
    q: "Where does the community live?",
    a: "We have an active, curated WhatsApp Community with themed sub-groups for project feedback, teammate matching for hackathons, opportunity alerts, and weekly Sunday Demo Nights.",
  },
  {
    q: "How do the Campus Ambassador program & Builder Karma points work?",
    a: "Members earn Builder Karma (reputation points) for constructive peer reviews, shipping project demos, and helping peers. Campus Ambassadors represent Peercuit at their school or university, organize local build meetups, and receive leadership recognition.",
  },
  {
    q: "Can I write for the Quarterly Student Magazine?",
    a: "Yes! At the end of each quarter, any member can submit deep-dive technical articles, project post-mortems, design essays, or founder stories to be reviewed and published in our official digital magazine.",
  },
  {
    q: "I'm in high school — will I fit in with college students?",
    a: "Absolutely! Many of our most active and talented builders are in 9th-12th grade. We have mixed collaboration rooms for hackathons and dedicated sub-groups tailored for high school builders.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-24 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/70 border border-emerald-300/60 dark:border-emerald-500/25 text-emerald-800 dark:text-emerald-300 text-xs font-semibold uppercase tracking-wider mb-4">
            <HelpCircle className="w-3.5 h-3.5 text-[#0d623d] dark:text-emerald-400" />
            Got Questions?
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-base">
            Everything you need to know about joining, building, and publishing in Peercuit.
          </p>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="glass-card rounded-xl border border-slate-200 dark:border-emerald-500/[0.12] overflow-hidden transition-colors hover:border-[#0d623d] dark:hover:border-emerald-500/30"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 focus:outline-none cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="text-base sm:text-lg font-semibold text-slate-900 dark:text-white">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#0d623d] dark:text-emerald-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-emerald-600 dark:text-emerald-300" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-6 pb-5 pt-1 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-200 dark:border-emerald-500/[0.08]">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
