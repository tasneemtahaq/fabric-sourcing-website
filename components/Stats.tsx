
"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  Globe2,
  ShoppingBag,
  Layers3,
  Utensils,
  ArrowUpRight,
} from "lucide-react";

export default function Stats() {
  const reduceMotion = useReducedMotion();

  const services = [
    {
      title: "B2B Websites",
      description: "Professional platforms built to connect businesses.",
      icon: Globe2,
    },
    {
      title: "Ecommerce Stores",
      description: "Digital storefronts designed for online sales.",
      icon: ShoppingBag,
    },
    {
      title: "Catalogue Websites",
      description: "Showcase your products with clarity and style.",
      icon: Layers3,
    },
    {
      title: "Food Delivery Websites",
      description: "Make online ordering simple and convenient.",
      icon: Utensils,
    },
  ];

  return (
    <section className="relative isolate overflow-hidden bg-[#5d76cf] py-16 text-white sm:py-24">

      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          animate={reduceMotion ? undefined : { y: [0, -20, 0], x: [0, 10, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -left-24 top-0 h-72 w-72 rounded-full bg-cyan-400/10 blur-[110px]"
        />

        <motion.div
          animate={reduceMotion ? undefined : { y: [0, 18, 0], x: [0, -12, 0] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-purple-500/10 blur-[120px]"
        />

        <div className="absolute left-[15%] top-12 h-16 w-16 rounded-full border border-cyan-400/15" />
        <div className="absolute bottom-10 right-[20%] h-3 w-3 rounded-full bg-purple-400/50" />

        <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-500/[0.04] blur-[130px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">

        {/* Section heading */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7 }}
          className="mb-12 text-center"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-400">
            What We Create
          </span>

          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Digital Solutions{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-sky-400 to-purple-400 bg-clip-text text-transparent">
              That Deliver
            </span>
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-slate-300/75 sm:text-base">
            From your first online presence to a complete digital
            storefront, we help bring your business vision to life.
          </p>
        </motion.div>

        {/* Service cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <motion.div
                key={service.title}
                initial={reduceMotion ? false : { opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.6,
                  delay: reduceMotion ? 0 : index * 0.12,
                }}
                whileHover={
                  reduceMotion
                    ? undefined
                    : { y: -8, rotateX: 3, rotateY: -3 }
                }
                style={{ transformPerspective: 1000 }}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-7 shadow-[0_10px_35px_rgba(0,0,0,0.15)] backdrop-blur-xl transition-all duration-500 hover:border-cyan-400/30 hover:bg-white/[0.07] hover:shadow-[0_25px_50px_rgba(14,165,233,0.12)] sm:p-8"
              >
                {/* Decorative corner glow */}
                <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-purple-500/10 blur-2xl transition-all duration-700 group-hover:scale-150 group-hover:bg-cyan-400/15" />

                {/* Number */}
                <span className="absolute right-6 top-6 text-xs font-semibold tracking-[0.2em] text-cyan-400/60">
                  0{index + 1}
                </span>

                {/* Floating icon */}
                <motion.div
                  animate={reduceMotion ? undefined : { y: [0, -5, 0] }}
                  transition={{
                    duration: 3 + index * 0.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 0.2,
                  }}
                  className="relative mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 via-sky-500 to-purple-500 text-white shadow-lg shadow-sky-500/20 transition-all duration-500 group-hover:rotate-3 group-hover:shadow-purple-500/30"
                >
                  <Icon size={26} strokeWidth={1.7} />
                </motion.div>

                {/* Service content */}
                <h3 className="relative text-lg font-semibold leading-snug text-white transition-colors duration-300 group-hover:text-cyan-300">
                  {service.title}
                </h3>

                <p className="relative mt-3 text-sm leading-6 text-slate-300/65">
                  {service.description}
                </p>

                {/* Bottom indicator */}
                <div className="relative mt-6 flex items-center justify-between">
                  <div className="h-1 w-10 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 transition-all duration-500 group-hover:w-16" />

                  <ArrowUpRight
                    size={18}
                    className="text-cyan-400/60 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-purple-400"
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
