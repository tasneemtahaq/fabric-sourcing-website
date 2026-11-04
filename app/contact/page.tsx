
"use client";

import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";

import {
  ArrowUpRight,
  Mail,
  MessageCircle,
  CheckCircle2,
  Send,
} from "lucide-react";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    requirements: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const inputClass =
    "w-full rounded-xl border border-white/10 bg-white/[0.05] px-4 py-4 text-sm text-white outline-none transition-all duration-300 placeholder:text-slate-500 focus:border-cyan-400 focus:bg-white/[0.08] focus:ring-2 focus:ring-cyan-400/10";

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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
      const response = await fetch("/api/contact", {
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

      setSuccess("Thank you! Your inquiry has been sent successfully.");

      setForm({
        name: "",
        email: "",
        requirements: "",
      });
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to send your inquiry. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050a1c] px-5 py-20 text-white sm:px-8 lg:py-28">

      {/* BACKGROUND GLOW */}
      <div className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-cyan-500/15 blur-[150px]" />

      <div className="pointer-events-none absolute -right-40 bottom-10 h-96 w-96 rounded-full bg-purple-500/15 blur-[150px]" />

      <div className="pointer-events-none absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-500/5 blur-[150px]" />

      <div className="relative z-10 mx-auto max-w-6xl">

        {/* HEADER */}
        <div className="mb-16 text-center">

          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-5 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-cyan-400">
            <span className="h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_10px_#22d3ee]" />
            Get In Touch
          </span>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Let&apos;s Start a{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-sky-400 to-purple-500 bg-clip-text text-transparent">
              Conversation
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-sm leading-8 text-slate-400 sm:text-base">
            Have a project in mind? Tell us about your ideas and requirements.
            Our team is ready to help bring your vision to life.
          </p>

        </div>

        {/* CONTACT LAYOUT */}
        <div className="grid items-start gap-10 lg:grid-cols-5">

          {/* LEFT INFORMATION */}
          <div className="space-y-6 lg:col-span-2">

            <div>
              <h2 className="text-2xl font-bold">
                Let&apos;s Talk About Your Project
              </h2>

              <p className="mt-3 text-sm leading-7 text-slate-400">
                Whether you need a business website, ecommerce store,
                catalogue website, or a custom web application, we&apos;re
                here to help.
              </p>
            </div>

            {/* EMAIL CARD */}
            <div className="group flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/40 hover:bg-cyan-400/[0.04]">

              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/10 text-cyan-400 transition-all duration-300 group-hover:bg-cyan-400/20">
                <Mail size={22} />
              </div>

              <div>
                <h3 className="font-semibold">Email Inquiry</h3>

                <p className="mt-1 text-sm leading-6 text-slate-400">
                  Send us your project details through the contact form.
                </p>
              </div>

            </div>

            {/* MESSAGE CARD */}
            <div className="group flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-sky-400/40 hover:bg-sky-400/[0.04]">

              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-sky-400/20 bg-sky-400/10 text-sky-400 transition-all duration-300 group-hover:bg-sky-400/20">
                <MessageCircle size={22} />
              </div>

              <div>
                <h3 className="font-semibold">Project Discussion</h3>

                <p className="mt-1 text-sm leading-6 text-slate-400">
                  Share your ideas, requirements, and goals with our team.
                </p>
              </div>

            </div>

            {/* DECORATIVE NOTE */}
            <div className="relative overflow-hidden rounded-2xl border border-cyan-400/20 bg-gradient-to-br from-cyan-500/10 via-sky-500/[0.06] to-purple-500/10 p-6">

              <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-purple-500/15 blur-3xl" />

              <div className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-cyan-500/15 blur-3xl" />

              <p className="relative text-lg font-semibold leading-8 text-white">
                Your Ideas.
                <br />
                Our Technology.
                <br />

                <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  Together, We Build.
                </span>
              </p>

            </div>

          </div>

          {/* CONTACT FORM */}
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-10 lg:col-span-3">

            {/* TOP GRADIENT LINE */}
            <div className="absolute left-0 top-0 h-[2px] w-full bg-gradient-to-r from-transparent via-cyan-400 to-purple-500" />

            {/* FORM HEADING */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold">
                Send Us an{" "}
                <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  Inquiry
                </span>
              </h2>

              <p className="mt-2 text-sm text-slate-400">
                Fill in the details below and we&apos;ll get back to you.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">

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

              {/* EMAIL */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Email Address *
                </label>

                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="example@email.com"
                  className={inputClass}
                  required
                />
              </div>

              {/* REQUIREMENTS */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Your Requirement *
                </label>

                <textarea
                  name="requirements"
                  value={form.requirements}
                  onChange={handleChange}
                  placeholder="Tell us about your project, required features, design preferences, and goals..."
                  className={`${inputClass} resize-none`}
                  rows={6}
                  required
                />
              </div>

              {/* SUCCESS */}
              {success && (
                <div
                  role="status"
                  className="flex gap-3 rounded-xl border border-cyan-400/20 bg-cyan-400/10 p-4 text-sm text-cyan-300"
                >
                  <CheckCircle2 size={20} className="shrink-0" />
                  {success}
                </div>
              )}

              {/* ERROR */}
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
                className="group flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-cyan-400 via-sky-500 to-purple-500 px-6 py-4 font-semibold text-white shadow-[0_0_25px_rgba(56,189,248,0.25)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_35px_rgba(168,85,247,0.35)] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? "Sending Inquiry..." : "Send Inquiry"}

                {!loading && (
                  <ArrowUpRight
                    size={19}
                    className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                  />
                )}

                {loading && (
                  <Send size={18} className="animate-pulse" />
                )}
              </button>

              <p className="text-center text-xs text-slate-500">
                Thank you for considering Rubiks Solutions.
              </p>

            </form>
          </div>

        </div>
      </div>
    </main>
  );
}
