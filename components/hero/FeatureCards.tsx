"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";
import { ArrowRight, Shield, Sparkles, Zap, type LucideIcon } from "lucide-react";

const cards = [
  { icon: Zap, title: "Boost Productivity", text: "Smart digital solutions", tint: "from-cyan-400/40 to-blue-500/10", ic: "text-cyan-200" },
  { icon: Sparkles, title: "Creative Freedom", text: "Ideas transformed into reality", tint: "from-violet-400/40 to-fuchsia-500/10", ic: "text-violet-200" },
  { icon: Shield, title: "Safe & Secure", text: "Built for your business", tint: "from-fuchsia-400/40 to-amber-400/10", ic: "text-pink-200" },
] as const;

interface CardProps {
  progress: MotionValue<number>;
  index: number;
  icon: LucideIcon;
  title: string;
  text: string;
  tint: string;
  ic: string;
}

/**
 * Opacity/position are animated on the card itself (not a parent) so its
 * backdrop blur keeps seeing the cube behind it while it fades.
 */
function Card({ progress, index: i, icon: Icon, title, text, tint, ic }: CardProps) {
  const opacity = useTransform(progress, [0.06 + i * 0.02, 0.24 + i * 0.02, 0.52, 0.64], [0, 1, 1, 0]);
  const y = useTransform(progress, [0.06 + i * 0.03, 0.3 + i * 0.03, 0.52, 0.64], [120, 0, 0, -60]);
  const pe = useTransform(opacity, (v) => (v > 0.45 ? "auto" : "none"));
  const center = i === 1;

  return (
    <motion.div
      style={{ opacity, y, pointerEvents: pe }}
      whileHover={{ scale: 1.03 }}
      className={`group flex cursor-default items-center gap-4 rounded-3xl border p-4 shadow-[0_20px_60px_rgba(5,5,30,0.5)] backdrop-saturate-150 transition-colors duration-300 hover:border-cyan-300/50 md:flex-col md:items-start md:gap-6 md:p-8 ${
        center
          ? "border-white/25 bg-white/[0.12] backdrop-blur-[44px] md:py-12"
          : "border-white/15 bg-white/[0.07] backdrop-blur-[28px]"
      }`}
    >
      <span
        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br ${tint} ${ic} ring-1 ring-white/20 md:h-14 md:w-14`}
      >
        <Icon size={24} />
      </span>
      <span className="min-w-0">
        <span className="block text-base font-semibold text-white md:text-xl">{title}</span>
        <span className="mt-1 block text-sm text-slate-300/80">{text}</span>
      </span>
      <ArrowRight
        size={18}
        className="ml-auto shrink-0 text-cyan-200/70 transition-transform duration-300 group-hover:translate-x-1 md:ml-0 md:mt-auto"
      />
    </motion.div>
  );
}

/** Frosted glass cards rise over the cube (which glides behind the middle one), then leave. */
export default function FeatureCards({ progress }: { progress: MotionValue<number> }) {
  return (
    <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center px-5 sm:px-8">
      <div className="grid w-full max-w-5xl gap-3 md:grid-cols-3 md:gap-5">
        {cards.map((c, i) => (
          <Card key={c.title} progress={progress} index={i} {...c} />
        ))}
      </div>
    </div>
  );
}