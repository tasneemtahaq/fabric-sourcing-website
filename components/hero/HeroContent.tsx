"use client";

import React from "react";
import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Sora } from "next/font/google";
import { ArrowRight } from "lucide-react";

const display = Sora({ subsets: ["latin"], weight: ["500", "600", "700"] });

const gradientText =
  "bg-linear-to-r from-cyan-300 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent";

const avatars = [
  "from-cyan-400 to-blue-600",
  "from-violet-400 to-indigo-600",
  "from-amber-300 to-orange-500",
  "from-fuchsia-400 to-pink-600",
];



export function HeroTitle() {
  const reduce = useReducedMotion();

  const lines = [
    { text: "Smarter Digital", gradient: false },
    { text: "Experiences for", gradient: true },
    { text: "a Brighter Future.", gradient: false },
  ];

  const [typed, setTyped] = React.useState<string[]>(["", "", ""]);
  const [finished, setFinished] = React.useState(false);

  React.useEffect(() => {
    if (reduce) return;

    let lineIndex = 0;
    let charIndex = 0;
    let timeout: ReturnType<typeof setTimeout>;

    const type = () => {
      if (lineIndex >= lines.length) {
        setFinished(true);
        return;
      }

      const currentLine = lines[lineIndex];

      if (charIndex < currentLine.text.length) {
        charIndex++;

        setTyped((previous) => {
          const next = [...previous];
          next[lineIndex] = currentLine.text.slice(0, charIndex);
          return next;
        });

        timeout = setTimeout(type, 65);
      } else {
        lineIndex++;
        charIndex = 0;
        timeout = setTimeout(type, 350);
      }
    };

    timeout = setTimeout(type, 500);

    return () => clearTimeout(timeout);
  }, [reduce]);

  return (
    <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-indigo-100 shadow-[0_0_30px_rgba(124,58,237,0.2)] backdrop-blur-xl"
      >
        <span className="h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_10px_#22e5d0]" />
        Next Generation Digital Solutions
      </motion.div>

      <h1
        className={`${display.className} mt-5 text-[clamp(1.7rem,7.4vw,2.4rem)] font-bold leading-[1.2] tracking-tight max-lg:drop-shadow-[0_2px_14px_rgba(10,11,36,0.95)] sm:text-5xl lg:text-5xl xl:text-[3.5rem]`}
      >
        {lines.map((line, index) => {
          const text = reduce ? line.text : typed[index];

          return (
            <span key={index} className="block min-h-[1.2em]">
              <span className={line.gradient ? gradientText : ""}>
                {text}
              </span>

              {!reduce &&
                !finished &&
                index === typed.findIndex(
                  (value, i) => value.length < lines[i].text.length
                ) && (
                  <span className="typing-cursor" aria-hidden="true" />
                )}

              {!reduce && finished && index === 2 && (
                <span className="typing-cursor" aria-hidden="true" />
              )}
            </span>
          );
        })}
      </h1>
    </div>
  );
}



/** Description, CTAs and trust indicator. */
export function HeroCopy() {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={{ opacity: 0, y: reduce ? 0 : 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay: 0.7, ease: "easeOut" }}
      className="flex flex-col gap-5 text-center lg:gap-6 lg:text-left"
    >
      <p className="mx-auto max-w-xl text-[15px] leading-relaxed text-slate-100 max-lg:rounded-2xl max-lg:border max-lg:border-white/10 max-lg:bg-[#0a0b24]/65 max-lg:p-4 max-lg:backdrop-blur-md sm:text-base lg:mx-0 lg:text-lg lg:text-slate-200/85">
        We transform ambitious ideas into powerful digital experiences. Build your online presence,
        reach more customers, and take your business to the next level with Rubiks Solutions.
      </p>

      <div className="flex flex-wrap justify-center gap-3 lg:justify-start lg:gap-4">
        <Link
          href="/catalog"
          className="group inline-flex items-center gap-2 rounded-full bg-linear-to-r from-cyan-400 via-violet-500 to-fuchsia-500 bg-[length:200%_100%] bg-left px-6 py-3.5 text-sm font-semibold text-white shadow-[0_0_32px_rgba(124,58,237,0.5)] transition-all duration-500 hover:-translate-y-0.5 hover:bg-right hover:shadow-[0_0_44px_rgba(236,72,153,0.6)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300"
        >
          Start Exploring
          <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
        <Link
          href="/services"
          className="inline-flex items-center rounded-full border border-white/25 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan-300/60 hover:bg-white/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300 max-lg:bg-[#0a0b24]/65"
        >
          Explore Services
        </Link>
      </div>

      <div className="hidden items-center gap-4 sm:flex lg:justify-start">
        <div className="flex -space-x-3" aria-hidden>
          {avatars.map((g, i) => (
            <span
              key={g}
              className={`flex h-11 w-11 items-center justify-center rounded-full border-2 border-[#0a0b24] bg-linear-to-br ${g} text-xs font-bold text-white shadow-lg`}
            >
              {["T", "J", "A", "+"][i]}
            </span>
          ))}
        </div>
        <div className="text-left">
          <p className="text-sm font-semibold text-white">Built for ambitious businesses</p>
          <p className="text-sm text-indigo-100/80 lg:text-indigo-200/70">
            Technology · Creativity · Growth
          </p>
        </div>
      </div>
    </motion.div>
  );
}