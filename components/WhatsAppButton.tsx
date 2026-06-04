"use client";

import { FaWhatsapp } from "react-icons/fa";

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/923001234567"
      target="_blank"
      className="fixed bottom-5 right-5 bg-green-500 text-white p-4 rounded-full shadow-lg"
    >
      <FaWhatsapp size={30} />
    </a>
  );
}