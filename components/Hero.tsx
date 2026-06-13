"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-screen bg-[#0B0F19] overflow-hidden flex items-center">

      {/* Background Glow 1 */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/20 blur-[120px] rounded-full" />

      {/* Background Glow 2 */}
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-blue-500/20 blur-[120px] rounded-full" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        <motion.h1
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl md:text-7xl font-bold text-white leading-tight"
        >
          Connecting Global Buyers
          <br />
          With Pakistan&apos;s Leading
          <br />
          Fabric Manufacturers
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 text-slate-300 text-xl max-w-2xl"
        >
          Polyester • Uniform • Sportswear • Workwear Fabrics
        </motion.p>

        <div className="mt-10 flex flex-wrap gap-4">

          <Link
            href="/quote"
            className="bg-cyan-500 hover:bg-cyan-600 px-8 py-4 rounded-xl text-white font-semibold transition-all
       duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/40">
            Request Quote
          </Link>

          <Link
            href="/catalog"
           className="border border-white/20 px-8 py-4 rounded-xl
        text-white transition-all duration-300 hover:bg-white/10 hover:scale-105">
            View Catalog
          </Link>

        </div>

      </div>

    </section>
  );
}