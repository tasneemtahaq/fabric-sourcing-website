
"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  FaWhatsapp,
  FaTimes,
  FaPaperPlane,
} from "react-icons/fa";
import Link from "next/link";

export default function WhatsAppButton() {
  const [open, setOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const menuItems = [
    {
      label: "Chat on WhatsApp",
      href: "https://wa.me/923312287497",
      external: true,
      icon: FaWhatsapp,
    },
    {
      label: "Request Quote",
      href: "/quote",
      external: false,
      icon: FaPaperPlane,
    },
  ];

  return (
    <div className="fixed bottom-5 right-5 z-[9999] sm:bottom-6 sm:right-6">
      {/* Expanded Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{
              opacity: 0,
              y: shouldReduceMotion ? 0 : 14,
              scale: shouldReduceMotion ? 1 : 0.96,
            }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{
              opacity: 0,
              y: shouldReduceMotion ? 0 : 10,
              scale: shouldReduceMotion ? 1 : 0.97,
            }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="mb-4 flex origin-bottom-right flex-col gap-3"
          >
            {menuItems.map((item, index) => {
              const Icon = item.icon;

              const content = (
                <>
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#E0F2E9] text-[#214539] transition-colors duration-300 group-hover:bg-[#CEB5A7]">
                    <Icon size={16} />
                  </span>

                  <span>{item.label}</span>
                </>
              );

              const className =
                "group flex items-center gap-3 rounded-2xl border border-[#214539]/10 bg-[#E0F2E9]/95 px-4 py-3 text-sm font-semibold text-[#214539] shadow-[0_10px_35px_rgba(33,69,57,0.12)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-[#5B7B7A]/40 hover:bg-white hover:shadow-[0_14px_35px_rgba(33,69,57,0.18)]";

              return (
                <motion.div
                  key={item.label}
                  initial={{
                    opacity: 0,
                    x: shouldReduceMotion ? 0 : 12,
                  }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 8 }}
                  transition={{
                    duration: 0.2,
                    delay: shouldReduceMotion ? 0 : index * 0.06,
                  }}
                >
                  {item.external ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={className}
                    >
                      {content}
                    </a>
                  ) : (
                    <Link href={item.href} className={className}>
                      {content}
                    </Link>
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Floating Button */}
      <motion.button
        type="button"
        onClick={() => setOpen((previous) => !previous)}
        whileHover={shouldReduceMotion ? {} : { scale: 1.06 }}
        whileTap={shouldReduceMotion ? {} : { scale: 0.94 }}
        aria-label={open ? "Close contact menu" : "Open contact menu"}
        aria-expanded={open}
        aria-haspopup="true"
        className="relative flex h-14 w-14 items-center justify-center rounded-full border border-white/40 bg-[#214539] text-[#E0F2E9] shadow-[0_8px_30px_rgba(33,69,57,0.25)] transition-colors duration-300 hover:bg-[#5B7B7A] hover:text-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#5B7B7A]/30 sm:h-16 sm:w-16"
      >
        {/* Soft halo */}
        {!shouldReduceMotion && (
          <span className="pointer-events-none absolute inset-0 -z-10 animate-ping rounded-full bg-[#5B7B7A]/20 [animation-duration:3s]" />
        )}

        <motion.span
          key={open ? "close" : "whatsapp"}
          initial={{ opacity: 0, rotate: shouldReduceMotion ? 0 : -35 }}
          animate={{ opacity: 1, rotate: 0 }}
          transition={{ duration: 0.2 }}
          className="flex items-center justify-center"
        >
          {open ? <FaTimes size={21} /> : <FaWhatsapp size={25} />}
        </motion.span>
      </motion.button>
    </div>
  );
}