"use client";

import React, { useState, useEffect } from "react";
import {
  Send,
  Loader2,
  AlertCircle,
  Cpu,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import {
  ApplicationInput,
  GRADE_OPTIONS,
  REFERRAL_OPTIONS,
} from "@/lib/schema";
import { ConfirmationCard } from "./ConfirmationCard";
import { useAuth } from "./AuthProvider";

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

    try {
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
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
    <div className="glass-card rounded-2xl p-6 sm:p-10 border border-slate-200 dark:border-emerald-500/20 shadow-2xl relative transition-colors">
      {/* Form Header */}
      <div className="mb-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-500/10 border border-emerald-300/60 dark:border-emerald-500/25 text-emerald-800 dark:text-emerald-300 text-xs font-semibold uppercase tracking-wider mb-3">
          <Cpu className="w-3.5 h-3.5 text-[#0d623d] dark:text-emerald-400" />
          Join Peercuit Cohort 4
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Tell us about yourself
        </h2>
        <p className="text-slate-600 dark:text-slate-300 text-sm mt-2">
          Takes ~2 minutes. No resumes or formal cover letters required — just share what you&apos;re curious about.
        </p>
      </div>

      {/* Google Auth Autofill Banner */}
      {!user ? (
        <div className="mb-8 p-4 rounded-xl bg-slate-50 dark:bg-[#09120d] border border-slate-200 dark:border-emerald-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <p className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#0d623d] dark:text-emerald-400" />
              Save time with Google Sign-In
            </p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Autofill your name and email with one click.
            </p>
          </div>
          <button
            type="button"
            onClick={handleGoogleAutofill}
            className="inline-flex items-center justify-center gap-2 px-3.5 py-2 text-xs font-semibold text-slate-800 dark:text-white bg-white dark:bg-[#122218] border border-slate-300 dark:border-emerald-500/30 rounded-xl hover:bg-slate-100 dark:hover:bg-[#182c20] transition-colors shadow-xs cursor-pointer"
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
            <span>Autofill with Google</span>
          </button>
        </div>
      ) : (
        <div className="mb-8 p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-500/25 flex items-center justify-between text-xs text-emerald-900 dark:text-emerald-300">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#0d623d] dark:text-emerald-400 shrink-0" />
            <span>
              Connected as <strong>{user.displayName || user.email}</strong>
            </span>
          </div>
          <span className="text-[10px] uppercase font-bold text-emerald-800 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-300 dark:border-emerald-500/20">
            Google Verified
          </span>
        </div>
      )}

      {submitError && (
        <div className="mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-800 dark:text-rose-300 text-sm flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold">{submitError}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Section 1: Basic Info */}
        <div className="space-y-4">
          <div className="text-xs uppercase tracking-wider font-bold text-[#0d623d] dark:text-emerald-400/90 border-b border-slate-200 dark:border-emerald-500/[0.12] pb-2">
            1. The Basics
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Full Name */}
            <div>
              <label
                htmlFor="fullName"
                className="block text-xs font-semibold text-slate-700 dark:text-slate-200 mb-1.5"
              >
                Full Name <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="e.g. Alex Rivera"
                  className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#09120d]/90 border text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none transition-all ${
                    errors.fullName
                      ? "border-rose-500 focus:border-rose-500 ring-1 ring-rose-500"
                      : "border-slate-300 dark:border-emerald-500/20 focus:border-[#0d623d] dark:focus:border-emerald-400 focus:ring-1 focus:ring-[#0d623d] dark:focus:ring-emerald-400"
                  }`}
                  required
                />
              </div>
              {errors.fullName && (
                <p className="text-xs text-rose-500 mt-1">{errors.fullName}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-semibold text-slate-700 dark:text-slate-200 mb-1.5"
              >
                Email Address <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="alex@example.com (or school email)"
                  className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#09120d]/90 border text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none transition-all ${
                    errors.email
                      ? "border-rose-500 focus:border-rose-500 ring-1 ring-rose-500"
                      : "border-slate-300 dark:border-emerald-500/20 focus:border-[#0d623d] dark:focus:border-emerald-400 focus:ring-1 focus:ring-[#0d623d] dark:focus:ring-emerald-400"
                  }`}
                  required
                />
              </div>
              {errors.email && (
                <p className="text-xs text-rose-500 mt-1">{errors.email}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* School / College */}
            <div>
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
                value={formData.school}
                onChange={handleChange}
                placeholder="e.g. St. Jude High School / UC Berkeley"
                className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#09120d]/90 border text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none transition-all ${
                  errors.school
                    ? "border-rose-500 focus:border-rose-500 ring-1 ring-rose-500"
                    : "border-slate-300 dark:border-emerald-500/20 focus:border-[#0d623d] dark:focus:border-emerald-400 focus:ring-1 focus:ring-[#0d623d] dark:focus:ring-emerald-400"
                }`}
                required
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
                value={formData.grade}
                onChange={handleChange}
                className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#09120d]/90 border text-sm text-slate-900 dark:text-white focus:outline-none transition-all cursor-pointer ${
                  errors.grade
                    ? "border-rose-500 focus:border-rose-500 ring-1 ring-rose-500"
                    : "border-slate-300 dark:border-emerald-500/20 focus:border-[#0d623d] dark:focus:border-emerald-400 focus:ring-1 focus:ring-[#0d623d] dark:focus:ring-emerald-400"
                }`}
                required
              >
                <option value="" disabled className="bg-white dark:bg-[#09120d] text-slate-400">
                  Select your current status...
                </option>
                {GRADE_OPTIONS.map((g) => (
                  <option key={g} value={g} className="bg-white dark:bg-[#09120d] text-slate-900 dark:text-white">
                    {g}
                  </option>
                ))}
              </select>
              {errors.grade && (
                <p className="text-xs text-rose-500 mt-1">{errors.grade}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* City & Country */}
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
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g. Mumbai, India or Chicago, USA"
                className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#09120d]/90 border text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none transition-all ${
                  errors.location
                    ? "border-rose-500 focus:border-rose-500 ring-1 ring-rose-500"
                    : "border-slate-300 dark:border-emerald-500/20 focus:border-[#0d623d] dark:focus:border-emerald-400 focus:ring-1 focus:ring-[#0d623d] dark:focus:ring-emerald-400"
                }`}
                required
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
                placeholder="e.g. 17"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#09120d]/90 border border-slate-300 dark:border-emerald-500/20 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:border-[#0d623d] dark:focus:border-emerald-400 focus:outline-none transition-all"
              />
            </div>
          </div>
        </div>

        {/* Section 2: What you're building & why */}
        <div className="space-y-4 pt-4">
          <div className="text-xs uppercase tracking-wider font-bold text-[#0d623d] dark:text-emerald-400/90 border-b border-slate-200 dark:border-emerald-500/[0.12] pb-2">
            2. Your Projects & Interests
          </div>

          {/* Current Work */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label
                htmlFor="currentWork"
                className="block text-xs font-semibold text-slate-700 dark:text-slate-200"
              >
                What are you currently working on or interested in? <span className="text-rose-500">*</span>
              </label>
              <span className="text-[11px] text-slate-500">
                {formData.currentWork.length}/1000
              </span>
            </div>
            <textarea
              id="currentWork"
              name="currentWork"
              rows={3}
              value={formData.currentWork}
              onChange={handleChange}
              placeholder="e.g. Building a small Python automation script, designing a mobile finance UI in Figma, writing science blogs, or exploring React and Next.js..."
              className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#09120d]/90 border text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none transition-all leading-relaxed ${
                errors.currentWork
                  ? "border-rose-500 focus:border-rose-500 ring-1 ring-rose-500"
                  : "border-slate-300 dark:border-emerald-500/20 focus:border-[#0d623d] dark:focus:border-emerald-400 focus:ring-1 focus:ring-[#0d623d] dark:focus:ring-emerald-400"
              }`}
              required
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
              <span className="text-[11px] text-slate-500">
                {formData.whyJoin.length}/1000
              </span>
            </div>
            <textarea
              id="whyJoin"
              name="whyJoin"
              rows={3}
              value={formData.whyJoin}
              onChange={handleChange}
              placeholder="e.g. Want honest feedback on my side projects, looking for hackathon teammates, or want to hang out with other ambitious students..."
              className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#09120d]/90 border text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none transition-all leading-relaxed ${
                errors.whyJoin
                  ? "border-rose-500 focus:border-rose-500 ring-1 ring-rose-500"
                  : "border-slate-300 dark:border-emerald-500/20 focus:border-[#0d623d] dark:focus:border-emerald-400 focus:ring-1 focus:ring-[#0d623d] dark:focus:ring-emerald-400"
              }`}
              required
            />
            {errors.whyJoin && (
              <p className="text-xs text-rose-500 mt-1">{errors.whyJoin}</p>
            )}
          </div>
        </div>

        {/* Section 3: Links & Referral */}
        <div className="space-y-4 pt-4">
          <div className="text-xs uppercase tracking-wider font-bold text-[#0d623d] dark:text-emerald-400/90 border-b border-slate-200 dark:border-emerald-500/[0.12] pb-2">
            3. Final Details
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* How did you hear about us */}
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
                value={formData.referral}
                onChange={handleChange}
                className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#09120d]/90 border text-sm text-slate-900 dark:text-white focus:outline-none transition-all cursor-pointer ${
                  errors.referral
                    ? "border-rose-500 focus:border-rose-500 ring-1 ring-rose-500"
                    : "border-slate-300 dark:border-emerald-500/20 focus:border-[#0d623d] dark:focus:border-emerald-400 focus:ring-1 focus:ring-[#0d623d] dark:focus:ring-emerald-400"
                }`}
                required
              >
                <option value="" disabled className="bg-white dark:bg-[#09120d] text-slate-400">
                  Select an option...
                </option>
                {REFERRAL_OPTIONS.map((r) => (
                  <option key={r} value={r} className="bg-white dark:bg-[#09120d] text-slate-900 dark:text-white">
                    {r}
                  </option>
                ))}
              </select>
              {errors.referral && (
                <p className="text-xs text-rose-500 mt-1">{errors.referral}</p>
              )}
            </div>

            {/* Portfolio / Social Link */}
            <div>
              <label
                htmlFor="portfolioLink"
                className="block text-xs font-semibold text-slate-700 dark:text-slate-200 mb-1.5"
              >
                Portfolio / GitHub / X Link <span className="text-slate-500 font-normal">(Optional)</span>
              </label>
              <input
                type="text"
                id="portfolioLink"
                name="portfolioLink"
                value={formData.portfolioLink}
                onChange={handleChange}
                placeholder="https://github.com/username or your site"
                className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#09120d]/90 border text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none transition-all ${
                  errors.portfolioLink
                    ? "border-rose-500 focus:border-rose-500 ring-1 ring-rose-500"
                    : "border-slate-300 dark:border-emerald-500/20 focus:border-[#0d623d] dark:focus:border-emerald-400 focus:ring-1 focus:ring-[#0d623d] dark:focus:ring-emerald-400"
                }`}
              />
              {errors.portfolioLink && (
                <p className="text-xs text-rose-500 mt-1">{errors.portfolioLink}</p>
              )}
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-6">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base font-bold text-white bg-[#0d623d] hover:bg-[#094d2f] dark:bg-gradient-to-r dark:from-emerald-600 dark:via-emerald-500 dark:to-teal-600 dark:hover:from-emerald-500 dark:hover:to-teal-500 rounded-xl shadow-lg shadow-emerald-900/15 dark:shadow-emerald-600/25 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Submitting Application...
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                Submit Application
              </>
            )}
          </button>

          <p className="text-center text-xs text-slate-500 dark:text-slate-400 mt-3">
            🔒 Your email and details are never shared or sold. We review all applications within 24-48 hours.
          </p>
        </div>
      </form>
    </div>
  );
}
