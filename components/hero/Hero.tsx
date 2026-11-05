"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import HeroBackground from "./HeroBackground";
import { HeroTitle, HeroCopy } from "./HeroContent";
import FeatureCards from "./FeatureCards";
import BottomStrip from "./BottomStrip";
import ScrollGauge from "./ScrollGauge";
import CubeSceneLoader from "./CubeSceneLoader";

/**
 * Scroll-driven hero. Desktop: text left-middle, cube right-middle.
 * Scroll: text slides away, cube glides to the centre and shrinks behind the blurred cards →
 * cards leave and the cube scatters → it reassembles on the right and the text returns.
 * `-mt-[73px]` pulls it under the sticky navbar so the nav is transparent over it.
 */
export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const fade = useTransform(p, [0, 0.16, 0.9, 1], [1, 0, 0, 1]);
  const textX = useTransform(p, [0, 0.16, 0.9, 1], [0, -90, -90, 0]);
  const fadePE = useTransform(fade, (v) => (v > 0.5 ? "auto" : "none"));

  return (
    <section ref={ref} className="relative isolate -mt-[73px] h-[300svh] bg-[#0a0b24] text-white">
      <div className="sticky top-0 h-svh overflow-hidden">
        <HeroBackground />

        <div className="absolute inset-0">
          <CubeSceneLoader progress={p} />
        </div>

        {/* small screens: dark fades behind the text so it stays readable over the cube */}
        <motion.div
          aria-hidden
          style={{ opacity: fade }}
          className="pointer-events-none absolute inset-0 z-[5] lg:hidden"
        >
          <div className="absolute inset-x-0 top-0 h-[44%] bg-linear-to-b from-[#0a0b24] via-[#0a0b24]/75 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-[42%] bg-linear-to-t from-[#0a0b24] via-[#0a0b24]/75 to-transparent" />
        </motion.div>

        <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col px-6 pb-5 pt-24 sm:px-8 lg:px-12">
          {/* left-middle text column (on phones: title top, copy bottom, cube in between) */}
          <motion.div
            style={{ opacity: fade, x: textX, pointerEvents: fadePE }}
            className="flex flex-1 flex-col lg:max-w-[40rem] lg:justify-center lg:gap-7 xl:max-w-[42rem]"
          >
            <HeroTitle />
            <div className="flex-1 lg:hidden" />
            <HeroCopy />
          </motion.div>

          <motion.div style={{ opacity: fade }}>
            <BottomStrip />
          </motion.div>
        </div>

        <FeatureCards progress={p} />
        <ScrollGauge progress={p} />
      </div>
    </section>
  );
}