
"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  ShieldCheck,
  BadgeDollarSign,
  Lightbulb,
  Layers3,
} from "lucide-react";

export default function TrustSection() {
  const shouldReduceMotion = useReducedMotion();

  const reasons = [
    {
      title: "Quality Assurance",
      description:
        "Thoughtful development and careful testing help deliver reliable digital experiences.",
      icon: ShieldCheck,
      color: "text-cyan-300",
      glow: "bg-cyan-400/10",
    },
    {
      title: "Competitive Pricing",
      description:
        "Flexible solutions designed to provide value for businesses at every stage.",
      icon: BadgeDollarSign,
      color: "text-sky-300",
      glow: "bg-sky-400/10",
    },
    {
      title: "Your Ideas to Reality",
      description:
        "We transform your vision into engaging, functional, and memorable digital products.",
      icon: Lightbulb,
      color: "text-purple-300",
      glow: "bg-purple-400/10",
    },
    {
      title: "Flexible Packages",
      description:
        "Choose a solution that aligns with your goals, needs, and project scope.",
      icon: Layers3,
      color: "text-cyan-300",
      glow: "bg-cyan-400/10",
    },
  ];

  const fadeUp = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 28 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="relative isolate overflow-hidden bg-[#050a1c] py-20 text-white sm:py-24 lg:py-28">

      {/* Decorative Background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">

        {/* Cyan Floating Glow */}
        <motion.div
          animate={
            shouldReduceMotion
              ? {}
              : { x: [0, 25, 0], y: [0, -20, 0] }
          }
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -left-32 top-16 h-80 w-80 rounded-full bg-cyan-400/10 blur-[110px]"
        />

        {/* Purple Floating Glow */}
        <motion.div
          animate={
            shouldReduceMotion
              ? {}
              : { x: [0, -20, 0], y: [0, 25, 0] }
          }
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-purple-500/10 blur-[120px]"
        />

        {/* Sky Blue Glow */}
        <div className="absolute left-[45%] top-[30%] h-72 w-72 rounded-full bg-sky-500/5 blur-[120px]" />

        {/* Subtle Dot Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.07)_1px,transparent_1px)] [background-size:28px_28px]" />

      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">

        {/* Heading */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mx-auto mb-14 max-w-2xl text-center sm:mb-16"
        >

          {/* Label */}
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-white/[0.04] px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-cyan-300 backdrop-blur-xl">

            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)]" />

            Why Rubiks Solutions

          </span>

          {/* Title */}
          <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">

            Why Choose{" "}

            <span className="relative inline-block bg-gradient-to-r from-cyan-300 via-sky-400 to-purple-400 bg-clip-text text-transparent">

              Us

              <span className="absolute -bottom-2 left-0 h-1 w-full rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 shadow-[0_0_15px_rgba(56,189,248,0.5)]" />

            </span>

          </h2>

          {/* Description */}
          <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-white/60 sm:text-base">

            We combine creativity, technology, and business understanding to
            turn your ideas into powerful digital experiences.

          </p>

        </motion.div>

        {/* Trust Cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">

          {reasons.map((reason, index) => {
            const Icon = reason.icon;

            return (
              <motion.div
                key={reason.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.6,
                  delay: shouldReduceMotion ? 0 : index * 0.12,
                  ease: "easeOut",
                }}
                whileHover={
                  shouldReduceMotion
                    ? {}
                    : { y: -8, transition: { duration: 0.25 } }
                }
                className="group relative h-full"
              >

                {/* Card */}
                <div className="relative h-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035] p-7 shadow-[0_8px_30px_rgba(0,0,0,0.15)] backdrop-blur-xl transition-all duration-500 group-hover:border-cyan-400/30 group-hover:bg-white/[0.065] group-hover:shadow-[0_20px_55px_rgba(56,189,248,0.10)] sm:p-8">

                  {/* Hover Glow */}
                  <div
                    className={`pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full ${reason.glow} opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100`}
                  />

                  {/* Card Number */}
                  <span className="relative text-xs font-semibold tracking-[0.25em] text-white/35 transition-colors duration-300 group-hover:text-cyan-300">
                    0{index + 1}
                  </span>

                  {/* Icon */}
                  <div className={`relative mt-8 flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.05] ${reason.color} transition-all duration-500 group-hover:scale-110 group-hover:border-cyan-400/40 group-hover:bg-gradient-to-br group-hover:from-cyan-400/15 group-hover:to-purple-500/15 group-hover:shadow-[0_8px_28px_rgba(56,189,248,0.15)]`}>

                    <Icon size={22} strokeWidth={1.7} />

                  </div>

                  {/* Card Title */}
                  <h3 className="relative mt-6 text-lg font-semibold tracking-tight text-white transition-colors duration-300 group-hover:text-cyan-300">

                    {reason.title}

                  </h3>

                  {/* Card Description */}
                  <p className="relative mt-3 text-sm leading-6 text-white/55 transition-colors duration-300 group-hover:text-white/75">

                    {reason.description}

                  </p>

                  {/* Animated Bottom Line */}
                  <div className="relative mt-7 h-[2px] w-10 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 opacity-60 shadow-[0_0_10px_rgba(56,189,248,0.3)] transition-all duration-500 group-hover:w-full group-hover:opacity-100" />

                </div>

              </motion.div>
            );
          })}

        </div>

      </div>

    </section>
  );
}
