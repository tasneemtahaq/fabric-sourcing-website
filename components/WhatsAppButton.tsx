
"use client";

import { useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";

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
      href: "https://wa.me/923349006403",
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

      {/* EXPANDED MENU */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{
              opacity: 0,
              y: shouldReduceMotion ? 0 : 14,
              scale: shouldReduceMotion ? 1 : 0.96,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: shouldReduceMotion ? 0 : 10,
              scale: shouldReduceMotion ? 1 : 0.97,
            }}
            transition={{
              duration: 0.22,
              ease: "easeOut",
            }}
            className="mb-4 flex origin-bottom-right flex-col gap-3"
          >

            {menuItems.map((item, index) => {
              const Icon = item.icon;

              const content = (
                <>
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-cyan-400/20 bg-gradient-to-br from-cyan-400/15 to-purple-500/15 text-cyan-400 transition-all duration-300 group-hover:border-cyan-400/50 group-hover:from-cyan-400/25 group-hover:to-purple-500/25 group-hover:text-white">
                    <Icon size={17} />
                  </span>

                  <span>{item.label}</span>
                </>
              );

              const className =
                "group flex items-center gap-3 rounded-2xl border border-white/10 bg-[#080f23]/95 px-4 py-3 text-sm font-semibold text-white shadow-[0_10px_35px_rgba(0,0,0,0.4)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/40 hover:bg-[#101b35] hover:shadow-[0_14px_35px_rgba(56,189,248,0.15)]";

              return (
                <motion.div
                  key={item.label}
                  initial={{
                    opacity: 0,
                    x: shouldReduceMotion ? 0 : 12,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                  }}
                  exit={{
                    opacity: 0,
                    x: 8,
                  }}
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
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className={className}
                    >
                      {content}
                    </Link>
                  )}

                </motion.div>
              );
            })}

          </motion.div>
        )}
      </AnimatePresence>

      {/* MAIN FLOATING BUTTON */}
      <motion.button
        type="button"
        onClick={() => setOpen((previous) => !previous)}
        whileHover={
          shouldReduceMotion ? {} : { scale: 1.06 }
        }
        whileTap={
          shouldReduceMotion ? {} : { scale: 0.94 }
        }
        aria-label={
          open ? "Close contact menu" : "Open contact menu"
        }
        aria-expanded={open}
        aria-haspopup="true"
        className="relative flex h-14 w-14 items-center justify-center rounded-full border border-cyan-300/40 bg-gradient-to-br from-cyan-400 via-sky-500 to-purple-500 text-white shadow-[0_8px_30px_rgba(56,189,248,0.3)] transition-all duration-300 hover:shadow-[0_8px_35px_rgba(168,85,247,0.4)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-cyan-400/30 sm:h-16 sm:w-16"
      >

        {/* SOFT HALO */}
        {!shouldReduceMotion && (
          <span className="pointer-events-none absolute inset-0 -z-10 animate-ping rounded-full bg-cyan-400/20 [animation-duration:3s]" />
        )}

        {/* ICON ANIMATION */}
        <motion.span
          key={open ? "close" : "whatsapp"}
          initial={{
            opacity: 0,
            rotate: shouldReduceMotion ? 0 : -35,
          }}
          animate={{
            opacity: 1,
            rotate: 0,
          }}
          transition={{
            duration: 0.2,
          }}
          className="flex items-center justify-center"
        >
          {open ? (
            <FaTimes size={21} />
          ) : (
            <FaWhatsapp size={25} />
          )}
        </motion.span>

      </motion.button>

    </div>
  );
}
