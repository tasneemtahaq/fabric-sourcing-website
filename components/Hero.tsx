
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import TwinJetScene from "./TwinJetScene";

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#090807] text-white">
      {/* Soft luxury background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-15%] top-[10%] h-125 w-125 rounded-full bg-[#B89B68]/8 blur-[160px]" />

        <div className="absolute right-[-10%] bottom-[5%] h-125 w-125 rounded-full bg-[#A97878]/6 blur-[170px]" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,#090807_85%)]" />
      </div>

      <div className="relative z-10 mx-auto grid min-h-screen max-w-375 items-center px-6 py-24 lg:grid-cols-[0.8fr_1.2fr] lg:px-12">

        {/* LEFT */}
        <div className="relative z-20 max-w-2xl">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-6 flex items-center gap-3"
          >
            <span className="h-px w-10 bg-[#4b73df]" />

            <span className="text-xs font-medium uppercase tracking-[0.28em] text-[#4b73df]">
              TwinJet Technologies
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-[clamp(2.8rem,5vw,5rem)] font-medium leading-[0.95] tracking-[-0.045em]"
          >
            Do You Want to Grow

            <br />

            <span className="text-[#4b73df]">
              Your Business ONLINE?
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.8 }}
            className="mt-6 max-w-lg text-sm leading-6 text-white sm:text-base"
          >
            We create powerful digital experiences that help ambitious
            businesses build their presence, reach customers and grow
            globally.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.8 }}
            className="mt-7 flex flex-wrap gap-3"
          >
            <Link
              href="/contact"
              className="group flex items-center gap-3 rounded-full bg-[#FFFFFF] px-6 py-3.5 text-sm font-semibold text-[#11100D] transition duration-300 hover:bg-[#1913c6]"
            >
              Start Your Journey

              <ArrowUpRight
                size={17}
                className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </Link>

            <Link
              href="/services"
              className="rounded-full border border-white px-6 py-3.5 text-sm font-medium text-white transition duration-300 hover:border-[#1913c6]/50 hover:text-[#1913c6]"
            >
              Explore Services
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="mt-10 flex items-center gap-6 text-[10px] uppercase tracking-[0.2em] text-white/35"
          >
            <span>Websites</span>
            <span>•</span>
            <span>E-Commerce</span>
            <span>•</span>
            <span>Growth</span>
          </motion.div>
        </div>

        {/* 3D SCENE */}
        <div className="relative h-150 w-full lg:h-190">
          <TwinJetScene />
        </div>
      </div>
    </section>
  );
}

