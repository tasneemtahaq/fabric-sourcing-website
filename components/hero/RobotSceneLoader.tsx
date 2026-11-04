"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useProgress } from "@react-three/drei";
import RobotErrorBoundary from "./RobotErrorBoundary";

// three.js + R3F are only downloaded client-side, in a separate chunk.
const RobotScene = dynamic(() => import("./RobotScene"), { ssr: false });

function LoaderRing({ percent }: { percent: number }) {
  const r = 44;
  const c = 2 * Math.PI * r;
  return (
    <div
      role="status"
      aria-label={`Loading 3D assistant ${Math.round(percent)}%`}
      className="absolute inset-0 flex flex-col items-center justify-center gap-4"
    >
      <div className="relative h-28 w-28">
        <div className="absolute inset-0 rounded-full bg-cyan-400/20 blur-2xl motion-safe:animate-pulse" />
        <svg viewBox="0 0 100 100" className="relative h-full w-full -rotate-90">
          <circle cx="50" cy="50" r={r} fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="3" />
          <circle
            cx="50" cy="50" r={r} fill="none" stroke="url(#lg)" strokeWidth="3" strokeLinecap="round"
            strokeDasharray={c} strokeDashoffset={c * (1 - percent / 100)}
            className="transition-[stroke-dashoffset] duration-300"
          />
          <defs>
            <linearGradient id="lg" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#22d3ee" />
              <stop offset="1" stopColor="#a855f7" />
            </linearGradient>
          </defs>
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-sm font-semibold text-white">
          {Math.round(percent)}%
        </span>
      </div>
      <p className="text-sm text-sky-100/70">Waking up your assistant…</p>
    </div>
  );
}

function LoadingOverlay() {
  const { progress } = useProgress();
  if (progress >= 100) return null;
  return <LoaderRing percent={progress} />;
}

function WebGLFallback() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="relative flex h-56 w-56 items-center justify-center rounded-full border border-white/15 bg-white/5 text-center text-sm text-sky-100/70 backdrop-blur-xl">
        <div className="absolute inset-0 rounded-full bg-linear-to-br from-cyan-400/20 to-purple-500/20 blur-2xl" />
        <span className="relative px-6">3D preview needs WebGL, which this browser has turned off.</span>
      </div>
    </div>
  );
}

export default function RobotSceneLoader() {
  const ref = useRef<HTMLDivElement>(null);
  const [webgl, setWebgl] = useState<boolean | null>(null);
  const [reduced, setReduced] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const c = document.createElement("canvas");
    setWebgl(Boolean(c.getContext("webgl2") || c.getContext("webgl")));

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", onChange);

    // Stop rendering while the hero is scrolled out of view.
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.05 });
    if (ref.current) io.observe(ref.current);

    return () => {
      mq.removeEventListener("change", onChange);
      io.disconnect();
    };
  }, []);

  const frameloop = !visible ? "never" : reduced ? "demand" : "always";

  return (
    <div ref={ref} className="absolute inset-0">
      {webgl === null && <LoaderRing percent={0} />}
      {webgl === false && <WebGLFallback />}
      {webgl && (
        <RobotErrorBoundary>
          <RobotScene frameloop={frameloop} reducedMotion={reduced} />
          <LoadingOverlay />
        </RobotErrorBoundary>
      )}
    </div>
  );
}
