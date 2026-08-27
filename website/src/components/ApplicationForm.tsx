"use client";

import React, { useState, useEffect } from "react";
import {
  Send,
  Loader2,
  AlertCircle,
  Cpu,
  CheckCircle2,
  Sparkles,
  Plus,
  Trash2,
  Link2,
} from "lucide-react";
import {
  ApplicationInput,
  GRADE_OPTIONS,
  REFERRAL_OPTIONS,
} from "@/lib/schema";
import { ConfirmationCard } from "./ConfirmationCard";
import { useAuth } from "./AuthProvider";

const LINK_PLACEHOLDERS = [
  "https://github.com/yourusername",
  "https://yourportfolio.com",
  "https://x.com/yourhandle",
  "https://linkedin.com/in/yourname",
  "https://behance.net/yourname",
  "https://read.cv/yourname",
];

export function ApplicationForm() {
  const { user, signInWithGoogle } = useAuth();

  const [formData, setFormData] = useState<ApplicationInput>({
    fullName: "",
    email: "",
    school: "",
    grade: "",
    age: "",
    location: "",
    currentWork: "",
    whyJoin: "",
    referral: "",
    portfolioLink: "",
  });

  const [links, setLinks] = useState<string[]>([""]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [applicationId, setApplicationId] = useState<string | undefined>();

  // Auto-fill from Google account when user logs in
  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        fullName: prev.fullName || user.displayName || "",
        email: prev.email || user.email || "",
      }));
    }
  }, [user]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear specific field error when user starts typing
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleLinkChange = (index: number, value: string) => {
    setLinks((prev) => {
      const updated = [...prev];
      updated[index] = value;
      return updated;
    });

    if (errors[`link_${index}`] || errors.portfolioLink) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[`link_${index}`];
        delete next.portfolioLink;
        return next;
      });
    }
  };

  const handleAddLink = () => {
    if (links.length < 6) {
      setLinks((prev) => [...prev, ""]);
    }
  };

  const handleRemoveLink = (index: number) => {
    if (links.length > 1) {
      setLinks((prev) => prev.filter((_, i) => i !== index));
    } else {
      setLinks([""]);
    }
  };

  const handleGoogleAutofill = async () => {
    const loggedUser = await signInWithGoogle();
    if (loggedUser) {
      setFormData((prev) => ({
        ...prev,
        fullName: loggedUser.displayName || prev.fullName,
        email: loggedUser.email || prev.email,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    setErrors({});
    setIsSubmitting(true);

    const validLinks = links.map((l) => l.trim()).filter((l) => l.length > 0);

    try {
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          links: validLinks,
          portfolioLink: validLinks[0] || "",
          userId: user?.uid || null,
        }),
      });

      const json = await res.json();

      if (!res.ok || !json.success) {
        if (json.errors) {
          const flatErrors: Record<string, string> = {};
          for (const [key, msgs] of Object.entries(json.errors)) {
            if (Array.isArray(msgs) && msgs.length > 0) {
              flatErrors[key] = msgs[0];
            }
          }
          setErrors(flatErrors);
          setSubmitError(json.message || "Please fix the errors below.");
        } else {
          setSubmitError(json.message || "Failed to submit application.");
        }
        setIsSubmitting(false);
        return;
      }

      // Success
      setApplicationId(json.applicationId);
      setIsSuccess(true);
    } catch (err: unknown) {
      console.error("Submission error:", err);
      setSubmitError(
        "Network error. Please check your internet connection and try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      fullName: user?.displayName || "",
      email: user?.email || "",
      school: "",
      grade: "",
      age: "",
      location: "",
      currentWork: "",
      whyJoin: "",
      referral: "",
      portfolioLink: "",
    });
    setLinks([""]);
    setErrors({});
    setSubmitError(null);
    setIsSuccess(false);
    setApplicationId(undefined);
  };

  if (isSuccess) {
    return (
      <ConfirmationCard
        fullName={formData.fullName}
        email={formData.email}
        applicationId={applicationId}
        onReset={handleReset}
      />
    );
  }

  return (
    <div className="glass-card rounded-2xl sm:rounded-3xl p-4 sm:p-8 lg:p-10 border border-slate-200 dark:border-emerald-500/[0.18] shadow-2xl relative">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 sm:pb-8 mb-6 sm:mb-8 border-b border-slate-200 dark:border-emerald-500/[0.12]">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-500/30 text-emerald-800 dark:text-emerald-300 text-xs font-semibold uppercase tracking-wider mb-2">
            <Cpu className="w-3.5 h-3.5 text-[#0d623d] dark:text-emerald-400" />
            2-Minute Application
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Apply to Join Peercuit
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1">
            No formal resumes required. Tell us about yourself and what you love building.
          </p>
        </div>

        {/* Google Quick Autofill Button */}
        {!user && (
          <button
            type="button"
            onClick={handleGoogleAutofill}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 sm:py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-[#0c1610] hover:bg-slate-200 dark:hover:bg-[#122218] border border-slate-300 dark:border-emerald-500/20 rounded-xl transition-all shadow-xs cursor-pointer"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            Auto-fill with Google
          </button>
        )}

        {user && (
          <div className="w-full sm:w-auto inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-500/30 text-xs text-emerald-800 dark:text-emerald-300 font-medium">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#0d623d] dark:text-emerald-400 shrink-0" />
            <span className="truncate">Connected as <strong>{user.displayName || user.email}</strong></span>
          </div>
        )}
      </div>

      {/* Global Form Error Message */}
      {submitError && (
        <div className="mb-6 p-3.5 sm:p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-800 dark:text-rose-300 text-sm flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold">{submitError}</p>
            <p className="text-xs text-rose-600 dark:text-rose-400 mt-0.5">
              Please check the red highlighted fields below and try submitting again.
            </p>
          </div>
        </div>
      )}

      {/* Application Form */}
      <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6" noValidate>
        {/* Section 1: Basic Info */}
        <div className="space-y-4">
          <h4 className="text-xs uppercase tracking-wider font-bold text-slate-700 dark:text-emerald-400/90 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#0d623d] dark:bg-emerald-400" />
            1. About You
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
            {/* Full Name */}
            <div>
              <label
                htmlFor="fullName"
                className="block text-xs font-semibold text-slate-700 dark:text-slate-200 mb-1.5"
              >
                Full Name <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                required
                value={formData.fullName}
                onChange={handleChange}
                placeholder="e.g. Alex Rivera"
                className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#09120d]/90 border text-base sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none transition-all ${
                  errors.fullName
                    ? "border-rose-500 focus:border-rose-500 ring-1 ring-rose-500"
                    : "border-slate-300 dark:border-emerald-500/20 focus:border-[#0d623d] dark:focus:border-emerald-400 focus:ring-1 focus:ring-[#0d623d] dark:focus:ring-emerald-400"
                }`}
              />
              {errors.fullName && (
                <p className="text-xs text-rose-500 mt-1">{errors.fullName}</p>
              )}
            </div>

            {/* Email Address */}
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-semibold text-slate-700 dark:text-slate-200 mb-1.5"
              >
                Email Address <span className="text-rose-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="alex@example.com (or school email)"
                className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#09120d]/90 border text-base sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none transition-all ${
                  errors.email
                    ? "border-rose-500 focus:border-rose-500 ring-1 ring-rose-500"
                    : "border-slate-300 dark:border-emerald-500/20 focus:border-[#0d623d] dark:focus:border-emerald-400 focus:ring-1 focus:ring-[#0d623d] dark:focus:ring-emerald-400"
                }`}
              />
              {errors.email && (
                <p className="text-xs text-rose-500 mt-1">{errors.email}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4">
            {/* School / College */}
            <div className="sm:col-span-2">
              <label
                htmlFor="school"
                className="block text-xs font-semibold text-slate-700 dark:text-slate-200 mb-1.5"
              >
                School / College / University <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                id="school"
                name="school"
                required
                value={formData.school}
                onChange={handleChange}
                placeholder="e.g. Stanford University or Lincoln High School"
                className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#09120d]/90 border text-base sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none transition-all ${
                  errors.school
                    ? "border-rose-500 focus:border-rose-500 ring-1 ring-rose-500"
                    : "border-slate-300 dark:border-emerald-500/20 focus:border-[#0d623d] dark:focus:border-emerald-400 focus:ring-1 focus:ring-[#0d623d] dark:focus:ring-emerald-400"
                }`}
              />
              {errors.school && (
                <p className="text-xs text-rose-500 mt-1">{errors.school}</p>
              )}
            </div>

            {/* Grade / Year */}
            <div>
              <label
                htmlFor="grade"
                className="block text-xs font-semibold text-slate-700 dark:text-slate-200 mb-1.5"
              >
                Grade / Year <span className="text-rose-500">*</span>
              </label>
              <select
                id="grade"
                name="grade"
                required
                value={formData.grade}
                onChange={handleChange}
                className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#09120d]/90 border text-base sm:text-sm text-slate-900 dark:text-white focus:outline-none transition-all cursor-pointer ${
                  errors.grade
                    ? "border-rose-500 focus:border-rose-500 ring-1 ring-rose-500"
                    : "border-slate-300 dark:border-emerald-500/20 focus:border-[#0d623d] dark:focus:border-emerald-400 focus:ring-1 focus:ring-[#0d623d] dark:focus:ring-emerald-400"
                }`}
              >
                <option value="" disabled>
                  Select grade / year...
                </option>
                {GRADE_OPTIONS.map((opt) => (
                  <option key={opt} value={opt} className="bg-white dark:bg-[#09120d]">
                    {opt}
                  </option>
                ))}
              </select>
              {errors.grade && (
                <p className="text-xs text-rose-500 mt-1">{errors.grade}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4">
            {/* Location (City & Country) */}
            <div className="sm:col-span-2">
              <label
                htmlFor="location"
                className="block text-xs font-semibold text-slate-700 dark:text-slate-200 mb-1.5"
              >
                City & Country <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                id="location"
                name="location"
                required
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g. Mumbai, India or Austin, USA"
                className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#09120d]/90 border text-base sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none transition-all ${
                  errors.location
                    ? "border-rose-500 focus:border-rose-500 ring-1 ring-rose-500"
                    : "border-slate-300 dark:border-emerald-500/20 focus:border-[#0d623d] dark:focus:border-emerald-400 focus:ring-1 focus:ring-[#0d623d] dark:focus:ring-emerald-400"
                }`}
              />
              {errors.location && (
                <p className="text-xs text-rose-500 mt-1">{errors.location}</p>
              )}
            </div>

            {/* Age (Optional) */}
            <div>
              <label
                htmlFor="age"
                className="block text-xs font-semibold text-slate-700 dark:text-slate-200 mb-1.5"
              >
                Age <span className="text-slate-500 font-normal">(Optional)</span>
              </label>
              <input
                type="text"
                id="age"
                name="age"
                value={formData.age}
                onChange={handleChange}
                placeholder="e.g. 18"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#09120d]/90 border border-slate-300 dark:border-emerald-500/20 text-base sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:border-[#0d623d] dark:focus:border-emerald-400 focus:ring-1 focus:ring-[#0d623d] dark:focus:ring-emerald-400 focus:outline-none transition-all"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Building & Ambition */}
        <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-emerald-500/[0.12]">
          <h4 className="text-xs uppercase tracking-wider font-bold text-slate-700 dark:text-emerald-400/90 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#0d623d] dark:bg-emerald-400" />
            2. Your Projects & Curiosity
          </h4>

          {/* Current Work */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label
                htmlFor="currentWork"
                className="block text-xs font-semibold text-slate-700 dark:text-slate-200"
              >
                What are you currently working on or interested in? <span className="text-rose-500">*</span>
              </label>
              <span className="text-[11px] text-slate-500 font-mono">
                {formData.currentWork.length}/1000
              </span>
            </div>
            <textarea
              id="currentWork"
              name="currentWork"
              required
              rows={3}
              value={formData.currentWork}
              onChange={handleChange}
              placeholder="e.g. Building an AI chrome extension for summarizing lecture slides, learning Rust, designing mobile apps in Figma, or prepping for our first hackathon..."
              className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#09120d]/90 border text-base sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none transition-all resize-y ${
                errors.currentWork
                  ? "border-rose-500 focus:border-rose-500 ring-1 ring-rose-500"
                  : "border-slate-300 dark:border-emerald-500/20 focus:border-[#0d623d] dark:focus:border-emerald-400 focus:ring-1 focus:ring-[#0d623d] dark:focus:ring-emerald-400"
              }`}
            />
            {errors.currentWork && (
              <p className="text-xs text-rose-500 mt-1">{errors.currentWork}</p>
            )}
          </div>

          {/* Why Join */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label
                htmlFor="whyJoin"
                className="block text-xs font-semibold text-slate-700 dark:text-slate-200"
              >
                Why do you want to join Peercuit? <span className="text-rose-500">*</span>
              </label>
              <span className="text-[11px] text-slate-500 font-mono">
                {formData.whyJoin.length}/1000
              </span>
            </div>
            <textarea
              id="whyJoin"
              name="whyJoin"
              required
              rows={3}
              value={formData.whyJoin}
              onChange={handleChange}
              placeholder="e.g. Want honest feedback on my code, looking for co-builders to enter hackathons with, or tired of building alone in my dorm..."
              className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#09120d]/90 border text-base sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none transition-all resize-y ${
                errors.whyJoin
                  ? "border-rose-500 focus:border-rose-500 ring-1 ring-rose-500"
                  : "border-slate-300 dark:border-emerald-500/20 focus:border-[#0d623d] dark:focus:border-emerald-400 focus:ring-1 focus:ring-[#0d623d] dark:focus:ring-emerald-400"
              }`}
            />
            {errors.whyJoin && (
              <p className="text-xs text-rose-500 mt-1">{errors.whyJoin}</p>
            )}
          </div>
        </div>

        {/* Section 3: Links & Referral */}
        <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-emerald-500/[0.12]">
          <h4 className="text-xs uppercase tracking-wider font-bold text-slate-700 dark:text-emerald-400/90 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#0d623d] dark:bg-emerald-400" />
            3. Links & Referral
          </h4>

          {/* Referral Source */}
          <div>
            <label
              htmlFor="referral"
              className="block text-xs font-semibold text-slate-700 dark:text-slate-200 mb-1.5"
            >
              How did you hear about us? <span className="text-rose-500">*</span>
            </label>
            <select
              id="referral"
              name="referral"
              required
              value={formData.referral}
              onChange={handleChange}
              className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#09120d]/90 border text-base sm:text-sm text-slate-900 dark:text-white focus:outline-none transition-all cursor-pointer ${
                errors.referral
                  ? "border-rose-500 focus:border-rose-500 ring-1 ring-rose-500"
                  : "border-slate-300 dark:border-emerald-500/20 focus:border-[#0d623d] dark:focus:border-emerald-400 focus:ring-1 focus:ring-[#0d623d] dark:focus:ring-emerald-400"
              }`}
            >
              <option value="" disabled>
                Select referral source...
              </option>
              {REFERRAL_OPTIONS.map((opt) => (
                <option key={opt} value={opt} className="bg-white dark:bg-[#09120d]">
                  {opt}
                </option>
              ))}
            </select>
            {errors.referral && (
              <p className="text-xs text-rose-500 mt-1">{errors.referral}</p>
            )}
          </div>

          {/* Multiple Portfolio / Social / Project Links */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-200">
                Your Links <span className="text-slate-500 font-normal">(GitHub, Portfolio, X, LinkedIn, Project URLs — Optional)</span>
              </label>
              <span className="text-[11px] text-slate-500 font-mono">
                {links.filter((l) => l.trim().length > 0).length} link{links.filter((l) => l.trim().length > 0).length === 1 ? "" : "s"} added
              </span>
            </div>

            <div className="space-y-2.5">
              {links.map((link, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 dark:text-slate-500">
                      <Link2 className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      value={link}
                      onChange={(e) => handleLinkChange(idx, e.target.value)}
                      placeholder={LINK_PLACEHOLDERS[idx % LINK_PLACEHOLDERS.length]}
                      className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#09120d]/90 border border-slate-300 dark:border-emerald-500/20 text-base sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:border-[#0d623d] dark:focus:border-emerald-400 focus:ring-1 focus:ring-[#0d623d] dark:focus:ring-emerald-400 focus:outline-none transition-all"
                    />
                  </div>

                  {/* Remove Link Button */}
                  {links.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveLink(idx)}
                      className="p-2.5 rounded-xl text-slate-400 hover:text-rose-500 bg-slate-100 dark:bg-[#0c1610] hover:bg-rose-50 dark:hover:bg-rose-950/30 border border-slate-200 dark:border-emerald-500/20 transition-colors cursor-pointer shrink-0"
                      title="Remove link"
                      aria-label="Remove link"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* Add Another Link Button */}
            {links.length < 6 && (
              <button
                type="button"
                onClick={handleAddLink}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0d623d] dark:text-emerald-400 hover:text-[#094d2f] dark:hover:text-emerald-300 pt-1 transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add another link</span>
              </button>
            )}

            {errors.portfolioLink && (
              <p className="text-xs text-rose-500 mt-1">{errors.portfolioLink}</p>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-4 sm:pt-6">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 sm:py-4 text-base font-bold text-white bg-[#0d623d] hover:bg-[#094d2f] dark:bg-gradient-to-r dark:from-emerald-600 dark:via-emerald-500 dark:to-teal-600 dark:hover:from-emerald-500 dark:hover:to-teal-500 rounded-xl shadow-lg shadow-emerald-900/15 dark:shadow-emerald-600/25 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Submitting Application...
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                Submit 2-Min Application
              </>
            )}
          </button>
          <p className="text-center text-xs text-slate-500 dark:text-slate-400 mt-3">
            Reviewed within 24-48 hours by student builders. No spam, ever.
          </p>
        </div>
      </form>
    </div>
  );
}
