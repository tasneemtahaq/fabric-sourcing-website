
"use client";

import { useState } from "react";
import { ArrowUpRight, CheckCircle2, Send } from "lucide-react";

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
  "w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3.5 text-sm text-white outline-none transition-all duration-300 placeholder:text-white/35 focus:border-[#86efac]/60 focus:bg-white/[0.06] focus:ring-2 focus:ring-[#86efac]/10";

export default function QuotePage() {
  const [form, setForm] = useState<FormData>(initialForm);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
    <main className="relative min-h-screen overflow-hidden bg-[#06140d] px-5 py-20 text-white sm:px-8 lg:py-28">

      {/* BACKGROUND GLOW */}
      <div className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-[#4ade80]/10 blur-[150px]" />
      <div className="pointer-events-none absolute -right-40 bottom-10 h-96 w-96 rounded-full bg-[#22c55e]/10 blur-[150px]" />

      <div className="relative mx-auto max-w-3xl">

        {/* HEADING */}
        <div className="mb-12 text-center">

          <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#86efac]/20 bg-[#86efac]/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-[#86efac]">
            <span className="h-2 w-2 rounded-full bg-[#4ade80] shadow-[0_0_10px_#4ade80]" />
            Let&apos;s Build Something
          </span>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Request a{" "}
            <span className="text-[#86efac]">Website Quote</span>
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-white/55 sm:text-base">
            Tell us about your project and your vision. Our team will help
            turn your ideas into a professional digital experience.
          </p>
        </div>

        {/* FORM CONTAINER */}
        <div className="relative overflow-hidden rounded-3xl border border-[#86efac]/15 bg-white/[0.035] p-6 shadow-[0_20px_80px_rgba(0,0,0,0.3)] backdrop-blur-xl sm:p-10">

          <div className="absolute left-0 top-0 h-[2px] w-full bg-gradient-to-r from-transparent via-[#4ade80] to-transparent opacity-70" />

          <form onSubmit={handleSubmit} className="space-y-6">

            <div className="grid gap-5 sm:grid-cols-2">

              {/* NAME */}
              <div>
                <label className="mb-2 block text-sm font-medium text-white/80">
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
                <label className="mb-2 block text-sm font-medium text-white/80">
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
                <label className="mb-2 block text-sm font-medium text-white/80">
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
                <label className="mb-2 block text-sm font-medium text-white/80">
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

            {/* WHATSAPP */}
            <div>
              <label className="mb-2 block text-sm font-medium text-white/80">
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
              <label className="mb-2 block text-sm font-medium text-white/80">
                Website Type *
              </label>

              <select
                name="websiteType"
                value={form.websiteType}
                onChange={handleChange}
                className={`${inputClass} appearance-none`}
                required
              >
                <option value="" className="bg-[#06140d]">
                  Select Website Type
                </option>

                <option value="B2B Website" className="bg-[#06140d]">
                  B2B Website
                </option>

                <option value="Food Delivery Website" className="bg-[#06140d]">
                  Food Delivery Website
                </option>

                <option value="Ecommerce Website" className="bg-[#06140d]">
                  Ecommerce Website
                </option>

                <option value="Business Website" className="bg-[#06140d]">
                  Business Website
                </option>

                <option value="Portfolio Website" className="bg-[#06140d]">
                  Portfolio Website
                </option>

                <option value="Custom Web Application" className="bg-[#06140d]">
                  Custom Web Application
                </option>

                <option value="Other" className="bg-[#06140d]">
                  Other
                </option>
              </select>
            </div>

            {/* REQUIREMENTS */}
            <div>
              <label className="mb-2 block text-sm font-medium text-white/80">
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
                className="flex gap-3 rounded-xl border border-green-400/20 bg-green-400/10 p-4 text-sm text-green-300"
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
              className="group flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-400 px-6 py-4 font-semibold text-[#06140d] shadow-[0_0_25px_rgba(34,197,94,0.2)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_35px_rgba(74,222,128,0.35)] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Sending Request..." : "Get a Custom Quote"}

              {!loading && (
                <ArrowUpRight
                  size={19}
                  className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              )}

              {loading && <Send size={18} className="animate-pulse" />}
            </button>

            <p className="text-center text-xs text-white/35">
              Your project information will only be used to respond to your inquiry.
            </p>

          </form>
        </div>
      </div>
    </main>
  );
}
