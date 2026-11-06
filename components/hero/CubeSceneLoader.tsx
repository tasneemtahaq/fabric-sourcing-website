"use client";

import { useEffect, useRef, useState, useSyncExternalStore, type RefObject } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import type { MotionValue } from "framer-motion";
import CubeErrorBoundary from "./CubeErrorBoundary";

// three.js + R3F load client-side only, in their own chunk.
const CubeScene = dynamic(() => import("./CubeScene"), { ssr: false });

/**
 * true  = respect the visitor's OS "reduce motion" setting (accessible, recommended)
 * false = always play the full intro/spin/twist animation
 * If your computer has animations turned off, set this to false to see the full effect.
 */
const RESPECT_REDUCED_MOTION = true;

const REDUCED_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeReduced(cb: () => void) {
  const mq = window.matchMedia(REDUCED_QUERY);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}
const getReduced = () => window.matchMedia(REDUCED_QUERY).matches;

const noopSubscribe = () => () => {};
let webglCache: boolean | null = null;
function detectWebGL() {
  if (webglCache === null) {
    try {
      const c = document.createElement("canvas");
      webglCache = Boolean(c.getContext("webgl2") || c.getContext("webgl"));
    } catch {
      webglCache = false;
    }
  }
  return webglCache;
}

interface Props {
  progress: MotionValue<number>;
  /** phones: the empty space between title and copy that the cube fits into */
  slotRef?: RefObject<HTMLElement | null>;
}

export default function CubeSceneLoader({ progress, slotRef }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [visible, setVisible] = useState(true);

  // Browser values read through useSyncExternalStore (no setState inside an effect)
  const prefersReduced = useSyncExternalStore(subscribeReduced, getReduced, () => false);
  const webgl = useSyncExternalStore(noopSubscribe, detectWebGL, () => false);
  const reduced = RESPECT_REDUCED_MOTION && prefersReduced;

  // Stop rendering while the hero is scrolled out of view (setState only inside the callback)
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0 });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  const frameloop = !visible ? "never" : reduced ? "demand" : "always";

  return (
    <div ref={ref} className="pointer-events-none absolute inset-0">
      {/* Your cube image: shown while 3D loads, and as the permanent fallback without WebGL.
          Smaller on phones so it doesn't cover the heading. */}
      <div
        className={`absolute left-1/2 top-[52%] aspect-square h-[min(30svh,260px)] -translate-x-1/2 -translate-y-1/2 transition-opacity duration-700 [mask-image:radial-gradient(circle,black_50%,transparent_70%)] lg:top-[56%] lg:h-[min(58svh,520px)] ${
          ready ? "opacity-0" : "opacity-90"
        }`}
      >
        <Image src="/images/cube-poster.jpg" alt="" fill priority sizes="520px" className="object-cover" />
      </div>

      {webgl && (
        <CubeErrorBoundary>
          <div className={`absolute inset-0 transition-opacity duration-700 ${ready ? "opacity-100" : "opacity-0"}`}>
            <CubeScene
              progress={progress}
              frameloop={frameloop}
              reducedMotion={reduced}
              onReady={() => setReady(true)}
              slotRef={slotRef}
            />
          </div>
        </CubeErrorBoundary>
      )}
    </div>
  );
}
