
"use client";

import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Sora } from "next/font/google";
import { ArrowRight, Bot, Sparkles } from "lucide-react";

const display = Sora({ subsets: ["latin"], weight: ["500", "600", "700"] });

const gradientText =
  "bg-linear-to-r from-cyan-300 via-sky-400 to-purple-400 bg-clip-text text-transparent";

const avatars = [
  "from-cyan-400 to-sky-600",
  "from-purple-400 to-indigo-600",
  "from-amber-300 to-orange-500",
  "from-fuchsia-400 to-purple-600",
];

export default function HeroContent() {
  const reduce = useReducedMotion();

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.12 } },
  };

  const item: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 22 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="max-w-2xl"
    >
      <motion.div
        variants={item}
        className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-sky-100 shadow-[0_0_30px_rgba(56,189,248,0.15)] backdrop-blur-xl"
      >
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-300 opacity-70 motion-reduce:hidden" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-300" />
        </span>
        Next Generation Digital Solutions
      </motion.div>

      <motion.h1
        variants={item}
        className={`${display.className} mt-6 text-[2.5rem] font-bold leading-[1.06] tracking-tight sm:text-5xl lg:text-[3.6rem] xl:text-[4.25rem]`}
      >
        <span className="block">Smarter Digital</span>
        <span className={`block ${gradientText}`}>Experiences for</span>
        <span className="block">
          a <span className={gradientText}>Online Presence.</span>
        </span>
      </motion.h1>

      <motion.p
        variants={item}
        className="mt-6 max-w-xl text-base leading-relaxed text-slate-200/85 sm:text-lg"
      >
        We transform ambitious ideas into powerful digital experiences. Build
        your online presence, reach more customers, and take your business to
        the next level with Rubiks Solutions.
      </motion.p>

      {/* AI Chatbot Promotional Offer */}
      <motion.div
        variants={item}
        className="mt-7 relative overflow-hidden rounded-2xl border border-cyan-400/30 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 p-4 sm:p-5 backdrop-blur-xl shadow-[0_0_30px_rgba(56,189,248,0.12)]"
      >
        <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-cyan-400/10 blur-3xl" />

        <div className="relative flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-cyan-400/15 text-cyan-300 border border-cyan-300/20">
            <Bot size={27} />
          </div>

          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-base sm:text-lg font-bold text-white">
                AI Chatbot Integration
              </h3>

              <span className="inline-flex items-center gap-1 rounded-full bg-cyan-400/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-cyan-300">
                <Sparkles size={11} />
                Special Offer
              </span>
            </div>

            <p className="mt-1 text-sm text-slate-300">
              Make your website smarter with an AI-powered chatbot.
              Automate customer conversations and answer queries 24/7.
            </p>
          </div>

          <div className="sm:text-right shrink-0">
            <p className="text-xs text-slate-400">Starting from</p>
            <p className="text-2xl sm:text-3xl font-extrabold text-cyan-300">
              Rs. 15,000
            </p>
            <p className="text-[10px] text-slate-400">One-time starting price</p>
          </div>
        </div>
      </motion.div>

      {/* Buttons */}
      <motion.div variants={item} className="mt-8 flex flex-wrap gap-4">
        <Link
          href="/catalog"
          className="group inline-flex items-center gap-2 rounded-full bg-linear-to-r from-cyan-400 via-sky-500 to-purple-500 bg-[length:200%_100%] bg-left px-7 py-4 text-sm font-semibold text-white shadow-[0_0_32px_rgba(56,189,248,0.5)] transition-all duration-500 hover:-translate-y-0.5 hover:bg-right hover:shadow-[0_0_44px_rgba(168,85,247,0.65)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300"
        >
          Start Exploring
          <ArrowRight
            size={18}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </Link>

        <Link
          href="/services"
          className="inline-flex items-center rounded-full border border-white/25 bg-white/10 px-7 py-4 text-sm font-semibold text-white backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan-300/60 hover:bg-white/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300"
        >
          Explore Services
        </Link>
      </motion.div>

      {/* Trust Section */}
      <motion.div
        variants={item}
        className="mt-10 flex items-center gap-4"
      >
        <div className="flex -space-x-3" aria-hidden>
          {avatars.map((g, i) => (
            <span
              key={g}
              className={`flex h-11 w-11 items-center justify-center rounded-full border-2 border-[#0a1230] bg-linear-to-br ${g} text-xs font-bold text-white shadow-lg`}
            >
              {["T", "J", "A", "+"][i]}
            </span>
          ))}
        </div>

        <div>
          <p className="text-sm font-semibold text-white">
            Built for ambitious businesses
          </p>
          <p className="text-sm text-sky-200/70">
            Technology · Creativity · Growth
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
