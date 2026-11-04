"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Shield, Sparkles, Zap } from "lucide-react";

const cards = [
  { icon: Zap, title: "Boost Productivity", text: "Smart digital solutions" },
  { icon: Sparkles, title: "Creative Freedom", text: "Ideas transformed into reality" },
  { icon: Shield, title: "Safe & Secure", text: "Built for your business" },
] as const;

export default function FeatureCards() {
  const reduce = useReducedMotion();

  return (
    <div className="relative z-10 mt-4 grid gap-3 sm:grid-cols-3 lg:absolute lg:right-0 lg:top-1/2 lg:mt-0 lg:w-64 lg:-translate-y-1/2 lg:grid-cols-1 lg:gap-4">
      {cards.map(({ icon: Icon, title, text }, i) => (
        <motion.div
          key={title}
          initial={{ opacity: 0, x: reduce ? 0 : 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.5 + i * 0.15, ease: "easeOut" }}
        >
          <motion.div
            animate={reduce ? undefined : { y: [0, -8, 0] }}
            transition={{
              duration: 5 + i * 0.8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.6,
            }}
            whileHover={{ scale: 1.03 }}
            className="group relative flex cursor-default flex-row items-center gap-3 rounded-2xl border border-white/15 bg-white/[0.07] p-4 shadow-[0_10px_40px_rgba(2,8,30,0.45)] backdrop-blur-xl transition-colors duration-300 hover:border-cyan-300/50 hover:bg-white/[0.12] sm:flex-col sm:items-start lg:flex-row lg:items-center"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-cyan-400/30 to-purple-500/30 text-cyan-200 ring-1 ring-white/20">
              <Icon size={20} />
            </span>
            <span className="min-w-0">
              <span className="block text-sm font-semibold text-white">{title}</span>
              <span className="block text-xs text-slate-300/80">{text}</span>
            </span>
            <ArrowRight
              size={16}
              className="ml-auto shrink-0 text-cyan-200/70 transition-transform duration-300 group-hover:translate-x-1 sm:hidden lg:block"
            />
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}
