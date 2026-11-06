"use client";

import { useSyncExternalStore } from "react";
import { motion, useTransform, type MotionValue } from "framer-motion";
import { ArrowRight, Bot, Box, Search, type LucideIcon } from "lucide-react";

const cards = [
  {
    icon: Bot,
    tag: "Automation",
    title: "AI Chatbot Integration",
    text: "Smart assistants that answer customers, capture leads and support your business 24/7.",
    tint: "from-cyan-400/40 to-blue-500/10",
    ic: "text-cyan-200",
  },
  {
    icon: Box,
    tag: "Experience",
    title: "3D Motion Landing Pages",
    text: "Immersive, scroll-driven websites that make your brand impossible to scroll past.",
    tint: "from-violet-400/40 to-fuchsia-500/10",
    ic: "text-violet-200",
  },
  {
    icon: Search,
    tag: "Visibility",
    title: "SEO, AEO & GEO Optimization",
    text: "Rank on Google, get featured by answer engines and show up in AI-powered search.",
    tint: "from-fuchsia-400/40 to-amber-400/10",
    ic: "text-pink-200",
  },
] as const;

/* ------------------------- scroll timeline -------------------------
 * 0.07 → 0.26  cards rise in, one after another
 * 0.26 → 0.60  cards HOLD still (reading time)
 * 0.60 → 0.65  cards tilt towards the centre in 3D
 * 0.63 → 0.71  cards fly into the cube, shrink, blur and glow away
 * 0.67 → 0.78  energy flash + ring, then the cube bursts apart
 * ------------------------------------------------------------------ */
const HOLD_END = 0.6;
const TILT_END = 0.65;
const MERGE_START = 0.63;
const MERGE_END = 0.71;

// md breakpoint: cards side-by-side (desktop/tablet) or stacked (phone)
const MD_QUERY = "(min-width: 768px)";
function subscribeMd(cb: () => void) {
  const mq = window.matchMedia(MD_QUERY);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}
const getMd = () => window.matchMedia(MD_QUERY).matches;

interface CardProps {
  progress: MotionValue<number>;
  index: number;
  wide: boolean;
  icon: LucideIcon;
  tag: string;
  title: string;
  text: string;
  tint: string;
  ic: string;
}

/**
 * Outer layer = 3D movement only (tilt, fly to centre, shrink).
 * Inner layer = the glass card: opacity, rise-in and blur live here, so its
 * backdrop blur keeps seeing the cube behind it.
 */
function Card({ progress, index: i, wide, icon: Icon, tag, title, text, tint, ic }: CardProps) {
  const center = i === 1;
  const side = i === 0 ? 1 : i === 2 ? -1 : 0; // which way to fly to reach the middle card
  const inA = 0.07 + i * 0.025;
  const inB = 0.24 + i * 0.025;

  /* entrance + exit, inner card */
  const opacity = useTransform(progress, [inA, inB - 0.04, MERGE_START + 0.03, MERGE_END], [0, 1, 1, 0]);
  const riseY = useTransform(progress, [inA, inB], [120, 0]);
  const filter = useTransform(progress, (v) => {
    if (v < 0.64) return "none";
    const k = Math.min((v - 0.64) / (MERGE_END - 0.64), 1);
    return `blur(${k * 12}px) brightness(${1 + k * 0.9})`;
  });
  const pe = useTransform(opacity, (v) => (v > 0.45 ? "auto" : "none"));

  /* 3D motion, outer wrapper */
  const rotateX = useTransform(
    progress,
    [inA, inB, HOLD_END, TILT_END],
    [32, 0, 0, wide ? (center ? -22 : 8) : side * -28],
  );
  const rotateY = useTransform(progress, [HOLD_END, TILT_END], [0, wide ? side * 30 : 0]);
  const toCentre = useTransform(progress, [MERGE_START, MERGE_END], ["0%", `${side * 108}%`]);
  const scale = useTransform(progress, [HOLD_END, 0.64, MERGE_END], [1, 1.04, 0.18]);

  /* light sweep across the glass: once after it lands, once just before it leaves */
  const shineX = useTransform(
    progress,
    [inB, inB + 0.1, inB + 0.1001, HOLD_END - 0.04, TILT_END],
    ["-140%", "240%", "-140%", "-140%", "240%"],
  );

  return (
    <motion.div
      style={{
        x: wide ? toCentre : 0,
        y: wide ? 0 : toCentre,
        rotateX,
        rotateY,
        scale,
        transformPerspective: 1100,
        pointerEvents: pe,
      }}
      className={`relative ${center ? "z-10" : "z-0"}`}
    >
      <motion.div
        style={{ opacity, y: riseY, filter }}
        whileHover={{ scale: 1.03 }}
        className={`group relative flex h-full cursor-default items-center gap-4 overflow-hidden rounded-3xl border p-4 shadow-[0_20px_60px_rgba(5,5,30,0.5)] backdrop-saturate-150 transition-colors duration-300 hover:border-cyan-300/50 md:flex-col md:items-start md:gap-5 md:p-7 ${
          center
            ? "border-white/25 bg-white/[0.12] backdrop-blur-[44px] md:py-10"
            : "border-white/15 bg-white/[0.07] backdrop-blur-[28px]"
        }`}
      >
        {/* light sweep */}
        <motion.span
          aria-hidden
          style={{ x: shineX }}
          className="pointer-events-none absolute inset-y-0 left-0 w-1/2 -skew-x-12 bg-linear-to-r from-transparent via-white/20 to-transparent"
        />

        <span
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br ${tint} ${ic} ring-1 ring-white/20 md:h-14 md:w-14`}
        >
          <Icon size={24} />
        </span>

        <span className="min-w-0">
          <span className="mb-1.5 hidden text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-200/80 md:block">
            {tag}
          </span>
          <span className="block text-[15px] font-semibold leading-snug text-white md:text-xl">{title}</span>
          <span className="mt-1 block text-[13px] leading-relaxed text-slate-300/85 md:mt-2 md:text-sm">
            {text}
          </span>
        </span>

        <ArrowRight
          size={18}
          className="ml-auto shrink-0 text-cyan-200/70 transition-transform duration-300 group-hover:translate-x-1 md:ml-0 md:mt-auto"
        />
      </motion.div>
    </motion.div>
  );
}

/** "Now Featuring" glass cards rise over the cube, hold, then get absorbed into it before it bursts. */
export default function FeatureCards({ progress }: { progress: MotionValue<number> }) {
  const wide = useSyncExternalStore(subscribeMd, getMd, () => true);

  /* "NOW FEATURING" label */
  const labelOpacity = useTransform(progress, [0.08, 0.18, HOLD_END, TILT_END], [0, 1, 1, 0]);
  const labelY = useTransform(progress, [0.08, 0.18], [30, 0]);
  const labelSpacing = useTransform(progress, [HOLD_END, TILT_END], ["0.3em", "0.8em"]);

  /* energy flash where the cards merge, right before the cube bursts */
  const flashOpacity = useTransform(progress, [0.665, 0.695, 0.78], [0, 0.9, 0]);
  const flashScale = useTransform(progress, [0.665, 0.78], [0.2, 2.4]);
  const ringOpacity = useTransform(progress, [0.68, 0.7, 0.8], [0, 1, 0]);
  const ringScale = useTransform(progress, [0.68, 0.8], [0.1, 3.2]);

  return (
    <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center px-5 sm:px-8">
      {/* flash + shockwave ring */}
      <motion.div
        aria-hidden
        style={{ opacity: flashOpacity, scale: flashScale }}
        className="absolute left-1/2 top-1/2 -ml-[20vmin] -mt-[20vmin] h-[40vmin] w-[40vmin] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.95),rgba(165,180,252,0.55)_30%,rgba(236,72,153,0.25)_55%,transparent_72%)] mix-blend-screen"
      />
      <motion.div
        aria-hidden
        style={{ opacity: ringOpacity, scale: ringScale }}
        className="absolute left-1/2 top-1/2 -ml-[15vmin] -mt-[15vmin] h-[30vmin] w-[30vmin] rounded-full border-2 border-cyan-200/70 shadow-[0_0_40px_rgba(34,229,208,0.6),inset_0_0_40px_rgba(236,72,153,0.5)]"
      />

      <div className="relative w-full max-w-5xl">
        {/* section label, sits above the cards so the cards stay centred on the cube */}
        <motion.div
          style={{ opacity: labelOpacity, y: labelY }}
          className="absolute inset-x-0 bottom-full mb-5 flex flex-col items-center gap-2 text-center md:mb-8"
        >
          <motion.span
            style={{ letterSpacing: labelSpacing }}
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase text-white backdrop-blur-xl"
          >
            <span className="h-2 w-2 animate-pulse rounded-full bg-cyan-300 shadow-[0_0_10px_#22e5d0]" />
            Now Featuring
          </motion.span>
          <span className="hidden text-sm text-indigo-100/70 sm:block">
            Our latest services, built for what&apos;s next.
          </span>
        </motion.div>

        <div className="grid w-full gap-3 md:grid-cols-3 md:gap-5">
          {cards.map((c, i) => (
            <Card key={c.title} progress={progress} index={i} wide={wide} {...c} />
          ))}
        </div>
      </div>
    </div>
  );
}
