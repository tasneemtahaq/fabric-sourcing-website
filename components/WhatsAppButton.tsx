"use client";

import { useState } from "react";
import { FaWhatsapp, FaTimes, FaPaperPlane } from "react-icons/fa";
import Link from "next/link";

export default function WhatsAppButton() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 `z-9999`">

      {/* Expanded Menu */}
      {open && (
        <div className="mb-4 flex flex-col gap-3">

          {/* Chat WhatsApp */}
          <a
            href="https://wa.me/923312287497"
            target="_blank"
            rel="noopener noreferrer"
            className="
              flex items-center gap-2
              bg-green-500 hover:bg-green-600
              text-white px-4 py-3 rounded-xl
              shadow-lg shadow-green-500/30
              transition-all duration-300
              hover:scale-105
            "
          >
            <FaWhatsapp />
            Chat on WhatsApp
          </a>

          {/* Request Quote */}
          <Link
            href="/quote"
            className="
              flex items-center gap-2
              bg-cyan-500 hover:bg-cyan-600
              text-white px-4 py-3 rounded-xl
              shadow-lg shadow-cyan-500/30
              transition-all duration-300
              hover:scale-105
            "
          >
            <FaPaperPlane />
            Request Quote
          </Link>

        </div>
      )}

      {/* Main Button */}
      <button
        onClick={() => setOpen(!open)}
        className="
          bg-[#0B0F19]
          border border-white/10
          text-white
          p-4 rounded-full
          shadow-xl
          hover:scale-110
          transition-all duration-300
          backdrop-blur-xl
        "
      >
        {open ? <FaTimes size={22} /> : <FaWhatsapp size={22} />}
      </button>

    </div>
  );
}