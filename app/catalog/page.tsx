"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const websites = [
  {
    name: "Ecommerce Website",
    category: "b2b",
    image: "/images/111.png",
    Url: "https://mohammadiartgallery.vercel.app/",
    slug: "b2b-website",
  
  },
  {
    name: "Ecommerce Website",
    category: "ecommerce",
    image: "/images/222.png",
    Url: "https://www.menodoradigitals.online/",
    slug: "ecommerce-website",
  },
  {
    name: "Food Delivery Website",
    category: "food delivery",
    image: "/images/333.png",
    Url: "www.mamasoups.net",
    slug: "food-delivery-website",
    
  },
];

export default function CatalogPage() {
  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");

  const filteredWebsites = websites.filter((website) => {
    const matchesCategory =
      category === "all" || website.category === category;

    const matchesSearch =
      website.name.toLowerCase().includes(search.toLowerCase());

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
          Website Catalog
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center text-slate-400 mt-5 text-lg"
        >
          Scalable Website to Grow your Online Business Presence. Explore our collection of websites designed to help you succeed online.
        </motion.p>

        {/* Search */}
        <div className="mt-10">
          <input
            type="text"
            placeholder="Search websites..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 outline-none focus:border-cyan-400"
          />
        </div>

       

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-8 mt-16">

          {filteredWebsites.map((website, index) => (
            <motion.div
              key={website.slug}
              initial={{ opacity: 0, y: 80 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15 }}
            >
              <Link
                href={`/catalog/${website.slug}`}
                className="group block rounded-3xl overflow-hidden bg-white/5 backdrop-blur-xl border border-white/10 hover:border-cyan-400 transition-all duration-500 hover:-translate-y-4 hover:shadow-2xl hover:shadow-cyan-500/20"
              >

                {/* Image */}
                <div className="relative h-72 overflow-hidden">
                  <Image
                    src={website.image}
                    alt={website.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent" />
                </div>

                {/* Content */}
                <div className="p-6">

                  <h2 className="text-2xl font-bold">
                    {website.name}
                  </h2>

                  <div className="mt-4 flex justify-between text-slate-300">
                    <span>Url: {website.Url}</span>
                    <span className="text-cyan-400">{website.category}</span>
                  </div>

                 

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