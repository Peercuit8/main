"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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
    q: "Where does the community live?",
    a: "We have an active, curated WhatsApp Community broken into groups like Introductions, Feedback, Teammate Search, and Coffee Chats.",
  },
  {
    q: "What happens during the Saturday Live Debate Call?",
    a: "Every Saturday, we host a live call where candidates show a demo of stuff they have built and others give real, actionable feedback. We also debate interesting tech topics, blending discussion with accountability.",
  },
  {
    q: "How does the Best Candidate of the Month work?",
    a: "Once a month, we recognize one standout member based on their activity, the quality of feedback they've given to others, and the work they've shipped. Winners receive an official certificate.",
  },
  {
    q: "What is the Project Graveyard?",
    a: "The Graveyard is our transparent mistake and failure archive. When a member's project, hackathon sprint, or technical architecture hits a dead end, they break down what went wrong, why it failed, and the key lessons learned. We treat failure as high-signal learning data so you learn what NOT to do without paying the price yourself.",
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
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/70 border border-emerald-300/60 dark:border-emerald-500/25 text-emerald-800 dark:text-emerald-300 text-xs font-semibold uppercase tracking-wider mb-4 shadow-xs">
            <HelpCircle className="w-3.5 h-3.5 text-[#0d623d] dark:text-emerald-400" />
            Got Questions?
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-base">
            Everything you need to know about joining, building, and publishing in Peercuit.
          </p>
        </motion.div>

        <div className="space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: idx * 0.05, ease: [0.16, 1, 0.3, 1] }}
                className="rounded-xl border bg-white/40 dark:bg-[#07130c]/40 backdrop-blur-md border-emerald-900/5 dark:border-emerald-500/10 shadow-none hover:shadow-[0_8px_30px_rgba(13,98,61,0.06)] dark:hover:shadow-[0_8px_30px_rgba(16,185,129,0.06)] overflow-hidden transition-all duration-300 hover:border-emerald-900/15 dark:hover:border-emerald-500/30"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full px-6 py-5 min-h-[60px] text-left flex items-center justify-between gap-4 focus:outline-none cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="text-base sm:text-lg font-semibold text-slate-900 dark:text-white">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#0d623d] dark:text-emerald-400 shrink-0 transition-transform duration-300 ease-in-out ${
                      isOpen ? "rotate-180 text-emerald-600 dark:text-emerald-300" : ""
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-5 pt-1 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-200 dark:border-emerald-500/[0.08]">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
