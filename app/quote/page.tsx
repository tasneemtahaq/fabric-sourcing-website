"use client";

import { useState } from "react";

type FormData = {
  name: string;
  company: string;
  country: string;
  email: string;
  whatsapp: string;
  fabric: string;
  gsm: string;
  quantity: string;
  message: string;
};

export default function QuotePage() {
  const [form, setForm] = useState<FormData>({
    name: "",
    company: "",
    country: "",
    email: "",
    whatsapp: "",
    fabric: "",
    gsm: "",
    quantity: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // basic validation
    if (!form.name || !form.whatsapp || !form.fabric) {
      alert("Please fill required fields: Name, WhatsApp, Fabric");
      return;
    }

    const message = `
🧵 NEW FABRIC INQUIRY

Name: ${form.name}
Company: ${form.company}
Country: ${form.country}
Email: ${form.email}
WhatsApp: ${form.whatsapp}

Fabric: ${form.fabric}
GSM: ${form.gsm}
Quantity: ${form.quantity}

Message:
${form.message}
    `;

    const phoneNumber = "923312287497"; // change to your WhatsApp number

    window.open(
      `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`,
      "_blank"
    );

    // clear form after submit
    setForm({
      name: "",
      company: "",
      country: "",
      email: "",
      whatsapp: "",
      fabric: "",
      gsm: "",
      quantity: "",
      message: "",
    });
  };

  return (
    <main className="max-w-3xl mx-auto p-8">

      <h1 className="text-4xl font-bold mb-6 text-center">
        Request Fabric Quote
      </h1>

      <p className="text-center text-gray-600 mb-8">
        Fill the form and get instant response on WhatsApp
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Name *"
          className="border p-3 w-full rounded"
        />

        <input
          name="company"
          value={form.company}
          onChange={handleChange}
          placeholder="Company Name"
          className="border p-3 w-full rounded"
        />

        <input
          name="country"
          value={form.country}
          onChange={handleChange}
          placeholder="Country"
          className="border p-3 w-full rounded"
        />

        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          className="border p-3 w-full rounded"
        />

        <input
          name="whatsapp"
          value={form.whatsapp}
          onChange={handleChange}
          placeholder="WhatsApp Number *"
          className="border p-3 w-full rounded"
        />

        <input
          name="fabric"
          value={form.fabric}
          onChange={handleChange}
          placeholder="Fabric Type (e.g. PV 80/20) *"
          className="border p-3 w-full rounded"
        />

        <input
          name="gsm"
          value={form.gsm}
          onChange={handleChange}
          placeholder="GSM Required"
          className="border p-3 w-full rounded"
        />

        <input
          name="quantity"
          value={form.quantity}
          onChange={handleChange}
          placeholder="Quantity (Meters)"
          className="border p-3 w-full rounded"
        />

        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder="Additional Requirements"
          className="border p-3 w-full rounded"
          rows={4}
        />

        <button
          type="submit"
          className="bg-slate-900 text-white px-6 py-3 rounded w-full hover:bg-slate-800 transition"
        >
          Send Inquiry via WhatsApp
        </button>

      </form>
    </main>
  );
}