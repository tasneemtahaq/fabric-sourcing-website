
"use client";

import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import {
  ArrowUpRight,
  CheckCircle2,
  Send,
  Globe,
} from "lucide-react";

type FormData = {
  name: string;
  company: string;
  country: string;
  email: string;
  whatsapp: string;
  websiteType: string;
  requirements: string;
};

const initialForm: FormData = {
  name: "",
  company: "",
  country: "",
  email: "",
  whatsapp: "",
  websiteType: "",
  requirements: "",
};

const inputClass =
  "w-full rounded-xl border border-white/10 bg-white/[0.05] px-4 py-4 text-sm text-white outline-none transition-all duration-300 placeholder:text-slate-500 focus:border-cyan-400 focus:bg-white/[0.08] focus:ring-2 focus:ring-cyan-400/10";

export default function QuotePage() {
  const [form, setForm] = useState<FormData>(initialForm);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (
    e: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setSuccess("");
    setError("");
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    setSuccess("");
    setError("");

    try {
      const response = await fetch("/api/quote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong.");
      }

      setSuccess(
        "Thank you! Your quote request has been received. We will get back to you soon."
      );

      setForm(initialForm);
    } catch (err) {
      console.error("Quote submission error:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0B0F19] px-5 py-20 text-white sm:px-8 lg:py-28">

      {/* BACKGROUND GLOW */}
      <div className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-cyan-500/15 blur-[150px]" />

      <div className="pointer-events-none absolute -right-40 bottom-10 h-96 w-96 rounded-full bg-blue-500/15 blur-[150px]" />

      <div className="pointer-events-none absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/5 blur-[150px]" />

      <div className="relative z-10 mx-auto max-w-4xl">

        {/* HEADING */}
        <div className="mb-14 text-center">

          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-5 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-cyan-400">
            <Globe size={15} />
            Let&apos;s Work Together
          </span>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Request a{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Website Quote
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-sm leading-8 text-slate-400 sm:text-base">
            Tell us about your project and your vision. Our team
            will help turn your ideas into a professional digital
            experience.
          </p>

        </div>

        {/* FORM CONTAINER */}
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-10">

          {/* TOP GLOW LINE */}
          <div className="absolute left-0 top-0 h-[2px] w-full bg-gradient-to-r from-transparent via-cyan-400 to-blue-500" />

          <form onSubmit={handleSubmit} className="space-y-7">

            {/* PERSONAL INFORMATION */}
            <div>
              <h2 className="mb-6 text-xl font-semibold">
                Personal Information
              </h2>

              <div className="grid gap-5 sm:grid-cols-2">

                {/* NAME */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">
                    Your Name *
                  </label>

                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    className={inputClass}
                    required
                  />
                </div>

                {/* COMPANY */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">
                    Company Name
                  </label>

                  <input
                    name="company"
                    value={form.company}
                    onChange={handleChange}
                    placeholder="Your company"
                    className={inputClass}
                  />
                </div>

                {/* COUNTRY */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">
                    Country
                  </label>

                  <input
                    name="country"
                    value={form.country}
                    onChange={handleChange}
                    placeholder="Your country"
                    className={inputClass}
                  />
                </div>

                {/* EMAIL */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">
                    Email Address
                  </label>

                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="example@email.com"
                    className={inputClass}
                  />
                </div>

              </div>
            </div>

            {/* CONTACT INFORMATION */}
            <div>
              <h2 className="mb-6 text-xl font-semibold">
                Contact Information
              </h2>

              <label className="mb-2 block text-sm font-medium text-slate-300">
                WhatsApp Number *
              </label>

              <input
                name="whatsapp"
                type="tel"
                value={form.whatsapp}
                onChange={handleChange}
                placeholder="+92 300 1234567"
                className={inputClass}
                required
              />
            </div>

            {/* WEBSITE TYPE */}
            <div>
              <h2 className="mb-6 text-xl font-semibold">
                Project Details
              </h2>

              <label className="mb-2 block text-sm font-medium text-slate-300">
                Website Type *
              </label>

              <select
                name="websiteType"
                value={form.websiteType}
                onChange={handleChange}
                className={`${inputClass} appearance-none`}
                required
              >
                <option value="" className="bg-[#0B0F19]">
                  Select Website Type
                </option>

                <option value="B2B Website" className="bg-[#0B0F19]">
                  B2B Website
                </option>

                <option value="Food Delivery Website" className="bg-[#0B0F19]">
                  Food Delivery Website
                </option>

                <option value="Ecommerce Website" className="bg-[#0B0F19]">
                  Ecommerce Website
                </option>

                <option value="Business Website" className="bg-[#0B0F19]">
                  Business Website
                </option>

                <option value="Portfolio Website" className="bg-[#0B0F19]">
                  Portfolio Website
                </option>

                <option value="Custom Web Application" className="bg-[#0B0F19]">
                  Custom Web Application
                </option>

                <option value="Other" className="bg-[#0B0F19]">
                  Other
                </option>
              </select>
            </div>

            {/* REQUIREMENTS */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Project Requirements
              </label>

              <textarea
                name="requirements"
                value={form.requirements}
                onChange={handleChange}
                placeholder="Tell us about your project, required features, design preferences, and goals..."
                className={`${inputClass} resize-none`}
                rows={5}
              />
            </div>

            {/* SUCCESS MESSAGE */}
            {success && (
              <div
                role="status"
                className="flex gap-3 rounded-xl border border-cyan-400/20 bg-cyan-400/10 p-4 text-sm text-cyan-300"
              >
                <CheckCircle2 className="h-5 w-5 shrink-0" />
                {success}
              </div>
            )}

            {/* ERROR MESSAGE */}
            {error && (
              <div
                role="alert"
                className="rounded-xl border border-red-400/20 bg-red-400/10 p-4 text-sm text-red-300"
              >
                {error}
              </div>
            )}

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="group flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 px-6 py-4 font-semibold text-white shadow-lg shadow-cyan-500/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-500/30 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Sending Request..." : "Get a Custom Quote"}

              {!loading && (
                <ArrowUpRight
                  size={20}
                  className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              )}

              {loading && <Send size={18} className="animate-pulse" />}
            </button>

            <p className="text-center text-xs text-slate-500">
              Your project information will only be used to respond
              to your inquiry.
            </p>

          </form>
        </div>

        {/* BOTTOM TEXT */}
        <p className="mt-10 text-center text-sm text-slate-500">
          Have a project in mind? Let&apos;s bring your ideas to life.
        </p>

      </div>
    </main>
  );
}
