"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const fabrics = [
  {
    name: "PV 80/20 Uniform Fabric",
    gsm: 220,
    image: "/fabrics/pv8020.jpg",
    composition: "80% Polyester 20% Viscose",
    slug: "pv-80-20",
    category: "uniform",
  },
  {
    name: "Micro Interlock",
    gsm: 160,
    image: "/fabrics/interlock.jpg",
    composition: "100% Polyester",
    slug: "interlock",
    category: "sportswear",
  },
  {
    name: "Polyester Denim",
    gsm: 320,
    image: "/fabrics/denim.jpg",
    composition: "Poly Cotton Blend",
    slug: "denim",
    category: "workwear",
  },
];

export default function CatalogPage() {
  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");

  const filteredFabrics = fabrics.filter((fabric) => {
    const matchesCategory =
      category === "all" || fabric.category === category;

    const matchesSearch =
      fabric.name.toLowerCase().includes(search.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <main className="min-h-screen bg-[#0B0F19] text-white relative overflow-hidden">

      {/* Background Glow */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-cyan-500/20 blur-[140px] rounded-full" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/20 blur-[140px] rounded-full" />

      <div className="max-w-7xl mx-auto px-6 py-20 relative z-10">

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-6xl font-bold text-center"
        >
          Premium Fabric Catalog
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center text-slate-400 mt-5 text-lg"
        >
          Explore performance fabrics sourced directly from trusted mills.
        </motion.p>

        {/* Search */}
        <div className="mt-10">
          <input
            type="text"
            placeholder="Search fabrics..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 outline-none focus:border-cyan-400"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-4 mt-8">

          {["all", "uniform", "sportswear", "workwear"].map((item) => (
            <button
              key={item}
              onClick={() => setCategory(item)}
              className={`px-6 py-3 rounded-full transition-all duration-300 border border-white/10 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/30 ${
                category === item
                  ? "bg-cyan-500 text-white"
                  : "bg-white/5 backdrop-blur-xl"
              }`}
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </button>
          ))}
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-8 mt-16">

          {filteredFabrics.map((fabric, index) => (
            <motion.div
              key={fabric.slug}
              initial={{ opacity: 0, y: 80 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15 }}
            >
              <Link
                href={`/catalog/${fabric.slug}`}
                className="group block rounded-3xl overflow-hidden bg-white/5 backdrop-blur-xl border border-white/10 hover:border-cyan-400 transition-all duration-500 hover:-translate-y-4 hover:shadow-2xl hover:shadow-cyan-500/20"
              >

                {/* Image */}
                <div className="relative h-72 overflow-hidden">
                  <Image
                    src={fabric.image}
                    alt={fabric.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent" />
                </div>

                {/* Content */}
                <div className="p-6">

                  <h2 className="text-2xl font-bold">
                    {fabric.name}
                  </h2>

                  <div className="mt-4 flex justify-between text-slate-300">
                    <span>GSM: {fabric.gsm}</span>
                    <span className="text-cyan-400">{fabric.category}</span>
                  </div>

                  <p className="mt-3 text-slate-400">
                    {fabric.composition}
                  </p>

                  <button className="mt-6 w-full py-3 rounded-xl bg-cyan-500 hover:bg-cyan-600 transition-all duration-300 hover:scale-105">
                    View Details
                  </button>

                </div>

              </Link>
            </motion.div>
          ))}

        </div>

      </div>
    </main>
  );
}