
"use client";

import { useState } from "react";

type FormData = {
  name: string;
  company: string;
  country: string;
  email: string;
  whatsapp: string;
  websiteType: string;
  requirements: string;
};

export default function QuotePage() {
  const [form, setForm] = useState<FormData>({
    name: "",
    company: "",
    country: "",
    email: "",
    whatsapp: "",
    websiteType: "",
    requirements: "",
  });

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

    // Remove messages when user starts editing again
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

      // Success
      setSuccess(
        "Thank you! Your quote request has been received. We will get back to you soon."
      );

      // Clear form
      setForm({
        name: "",
        company: "",
        country: "",
        email: "",
        whatsapp: "",
        websiteType: "",
        requirements: "",
      });
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
    <main className="max-w-3xl mx-auto p-8">

      <h1 className="text-4xl font-bold mb-6 text-center">
        Request Website Quote
      </h1>

      <p className="text-center text-gray-600 mb-8">
        Tell us about your project and we&apos;ll get back to you with a custom
        quote.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Name */}
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Name *"
          className="border p-3 w-full rounded"
          required
        />

        {/* Company */}
        <input
          name="company"
          value={form.company}
          onChange={handleChange}
          placeholder="Company Name"
          className="border p-3 w-full rounded"
        />

        {/* Country */}
        <input
          name="country"
          value={form.country}
          onChange={handleChange}
          placeholder="Country"
          className="border p-3 w-full rounded"
        />

        {/* Email */}
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          className="border p-3 w-full rounded"
        />

        {/* WhatsApp */}
        <input
          name="whatsapp"
          type="tel"
          value={form.whatsapp}
          onChange={handleChange}
          placeholder="WhatsApp Number *"
          className="border p-3 w-full rounded"
          required
        />

        {/* Website Type */}
        <select
          name="websiteType"
          value={form.websiteType}
          onChange={handleChange}
          className="border p-3 w-full rounded bg-white"
          required
        >
          <option value="">Select Website Type *</option>

          <option value="B2B Website">
            B2B Website
          </option>

          <option value="Food Delivery Website">
            Food Delivery Website
          </option>

          <option value="Ecommerce Website">
            Ecommerce Website
          </option>

          <option value="Business Website">
            Business Website
          </option>

          <option value="Portfolio Website">
            Portfolio Website
          </option>

          <option value="Custom Web Application">
            Custom Web Application
          </option>

          <option value="Other">
            Other
          </option>
        </select>

        {/* Requirements */}
        <textarea
          name="requirements"
          value={form.requirements}
          onChange={handleChange}
          placeholder="Tell us about your requirements"
          className="border p-3 w-full rounded"
          rows={5}
        />

        {/* Success Message */}
        {success && (
          <div className="rounded-lg border border-green-200 bg-green-50 p-4 text-green-700">
            {success}
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
            {error}
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="bg-slate-900 text-white px-6 py-3 rounded w-full hover:bg-slate-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Sending Request..." : "Get a Custom Quote"}
        </button>

      </form>
    </main>
  );
}

