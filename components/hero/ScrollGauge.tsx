"use client";

import { useState } from "react";
import { useMotionValueEvent, type MotionValue } from "framer-motion";

/** Vertical scroll gauge on the left edge (as in the reference video). Desktop only. */
export default function ScrollGauge({ progress }: { progress: MotionValue<number> }) {
  const [n, setN] = useState(0);
  useMotionValueEvent(progress, "change", (v) => {
    const k = Math.round(v * 10);
    setN((prev) => (prev === k ? prev : k));
  });

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute left-4 top-1/2 z-20 hidden -translate-y-1/2 flex-col items-center gap-2 md:flex lg:left-8"
    >
      <div className="flex flex-col-reverse gap-1">
        {Array.from({ length: 10 }).map((_, i) => (
          <span
            key={i}
            className={`h-1 w-4 rounded-full transition-colors duration-300 ${
              i < n ? "bg-linear-to-r from-cyan-300 to-fuchsia-400" : "bg-white/15"
            }`}
          />
        ))}
      </div>
      <span className="text-xs tabular-nums text-indigo-100/60">{n * 10}%</span>
    </div>
  );
}
