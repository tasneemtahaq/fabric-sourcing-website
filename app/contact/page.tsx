
"use client";

import { useState } from "react";
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
    "w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3.5 text-sm text-white outline-none transition-all duration-300 placeholder:text-white/35 focus:border-[#86efac]/60 focus:bg-white/[0.06] focus:ring-2 focus:ring-[#86efac]/10";

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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
    <main className="relative min-h-screen overflow-hidden bg-[#06140d] px-5 py-20 text-white sm:px-8 lg:py-28">

      {/* BACKGROUND GLOW */}
      <div className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-[#4ade80]/10 blur-[150px]" />

      <div className="pointer-events-none absolute -right-40 bottom-10 h-96 w-96 rounded-full bg-[#22c55e]/10 blur-[150px]" />

      <div className="relative mx-auto max-w-6xl">

        {/* HEADER */}
        <div className="mb-16 text-center">

          <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#86efac]/20 bg-[#86efac]/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-[#86efac]">
            <span className="h-2 w-2 rounded-full bg-[#4ade80] shadow-[0_0_10px_#4ade80]" />
            Get In Touch
          </span>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Let&apos;s Start a{" "}
            <span className="text-[#86efac]">Conversation</span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-white/55 sm:text-base">
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

              <p className="mt-3 text-sm leading-7 text-white/50">
                Whether you need a business website, ecommerce store,
                catalogue website, or a custom web application, we&apos;re
                here to help.
              </p>
            </div>

            {/* EMAIL CARD */}
            <div className="group flex items-start gap-4 rounded-2xl border border-[#86efac]/10 bg-white/[0.035] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#86efac]/30 hover:bg-[#86efac]/[0.04]">

              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#86efac]/10 text-[#86efac] transition-colors group-hover:bg-[#86efac]/20">
                <Mail size={22} />
              </div>

              <div>
                <h3 className="font-semibold">Email Inquiry</h3>
                <p className="mt-1 text-sm text-white/45">
                  Send us your project details through the contact form.
                </p>
              </div>

            </div>

            {/* MESSAGE CARD */}
            <div className="group flex items-start gap-4 rounded-2xl border border-[#86efac]/10 bg-white/[0.035] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#86efac]/30 hover:bg-[#86efac]/[0.04]">

              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#86efac]/10 text-[#86efac] transition-colors group-hover:bg-[#86efac]/20">
                <MessageCircle size={22} />
              </div>

              <div>
                <h3 className="font-semibold">Project Discussion</h3>
                <p className="mt-1 text-sm text-white/45">
                  Share your ideas, requirements, and goals with our team.
                </p>
              </div>

            </div>

            {/* DECORATIVE NOTE */}
            <div className="relative overflow-hidden rounded-2xl border border-[#86efac]/15 bg-gradient-to-br from-[#0b3d25]/50 to-[#06140d] p-6">

              <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[#4ade80]/10 blur-3xl" />

              <p className="relative text-lg font-semibold leading-8 text-white">
                Your Ideas.
                <br />
                Our Technology.
                <br />
                <span className="text-[#86efac]">
                  Together, We Build.
                </span>
              </p>

            </div>

          </div>

          {/* CONTACT FORM */}
          <div className="relative overflow-hidden rounded-3xl border border-[#86efac]/15 bg-white/[0.035] p-6 shadow-[0_20px_80px_rgba(0,0,0,0.3)] backdrop-blur-xl sm:p-10 lg:col-span-3">

            <div className="absolute left-0 top-0 h-[2px] w-full bg-gradient-to-r from-transparent via-[#4ade80] to-transparent opacity-70" />

            <div className="mb-8">
              <h2 className="text-2xl font-bold">
                Send Us an <span className="text-[#86efac]">Inquiry</span>
              </h2>

              <p className="mt-2 text-sm text-white/45">
                Fill in the details below and we&apos;ll get back to you.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">

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

              {/* EMAIL */}
              <div>
                <label className="mb-2 block text-sm font-medium text-white/80">
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
                <label className="mb-2 block text-sm font-medium text-white/80">
                  Your Requirement *
                </label>

                <textarea
                  name="requirements"
                  value={form.requirements}
                  onChange={handleChange}
                  placeholder="Tell us about the fabric, design, quantity, or project you have in mind..."
                  className={`${inputClass} resize-none`}
                  rows={6}
                  required
                />
              </div>

              {/* SUCCESS */}
              {success && (
                <div
                  role="status"
                  className="flex gap-3 rounded-xl border border-green-400/20 bg-green-400/10 p-4 text-sm text-green-300"
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

              {/* SUBMIT */}
              <button
                type="submit"
                disabled={loading}
                className="group flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-400 px-6 py-4 font-semibold text-[#06140d] shadow-[0_0_25px_rgba(34,197,94,0.2)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_35px_rgba(74,222,128,0.35)] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? "Sending Inquiry..." : "Send Inquiry"}

                {!loading && (
                  <ArrowUpRight
                    size={19}
                    className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                  />
                )}

                {loading && <Send size={18} className="animate-pulse" />}
              </button>

              <p className="text-center text-xs text-white/35">
                Thank you for considering Rubiks Solution.
              </p>

            </form>
          </div>

        </div>
      </div>
    </main>
  );
}
