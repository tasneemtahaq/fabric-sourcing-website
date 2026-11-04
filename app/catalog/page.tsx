
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const websites = [
  {
    name: "Ecommerce Platform",
    category: "B2B",
    image: "/images/111.png",
    url: "https://mohammadiartgallery.vercel.app/",
    slug: "b2b-website",
  },
  {
    name: "Ecommerce Website",
    category: "Ecommerce",
    image: "/images/222.png",
    url: "https://www.menodoradigitals.online/",
    slug: "ecommerce-website",
  },
  {
    name: "Food Delivery Website",
    category: "Food Delivery",
    image: "/images/333.png",
    url: "https://www.mamasoups.net/",
    slug: "food-delivery-website",
  },
];

export default function CatalogPage() {
  const [search, setSearch] = useState("");

  const filteredWebsites = websites.filter((website) => {
    return (
      website.name.toLowerCase().includes(search.toLowerCase()) ||
      website.category.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <main className="min-h-screen bg-[#0B0F19] text-white relative overflow-hidden">

      {/* Background Glow */}
      <div className="absolute top-20 left-0 w-64 sm:w-96 h-64 sm:h-96 bg-cyan-500/20 blur-[120px] rounded-full pointer-events-none" />

      <div className="absolute bottom-20 right-0 w-64 sm:w-96 h-64 sm:h-96 bg-blue-500/20 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 relative z-10">

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center"
        >
          Website Catalog
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center text-slate-400 mt-5 text-sm sm:text-base md:text-lg max-w-3xl mx-auto leading-relaxed"
        >
          Scalable websites to grow your online business presence.
          Explore our collection of websites designed to help you succeed online.
        </motion.p>

        {/* Search */}
        <div className="mt-8 sm:mt-10 max-w-2xl mx-auto">
          <input
            type="text"
            placeholder="Search websites..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl sm:rounded-2xl p-3 sm:p-4 text-sm sm:text-base outline-none focus:border-cyan-400 transition-colors"
          />
        </div>

        {/* Website Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-12 sm:mt-16">

          {filteredWebsites.map((website, index) => (
            <motion.div
              key={website.slug}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15 }}
              className="group rounded-2xl sm:rounded-3xl overflow-hidden bg-white/5 backdrop-blur-xl border border-white/10 hover:border-cyan-400/70 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-cyan-500/10 flex flex-col"
            >

              {/* Image */}
              <Link
                href={`/catalog/${website.slug}`}
                className="block"
              >
                <div className="relative h-56 sm:h-60 md:h-64 lg:h-72 overflow-hidden">

                  <Image
                    src={website.image}
                    alt={website.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                  <span className="absolute bottom-4 left-4 bg-cyan-500/90 text-white text-xs font-semibold px-3 py-1.5 rounded-full">
                    {website.category}
                  </span>

                </div>
              </Link>

              {/* Content */}
              <div className="p-4 sm:p-6 flex flex-col flex-1">

                <h2 className="text-xl sm:text-2xl font-bold">
                  {website.name}
                </h2>

                {/* Website URL */}
                <div className="mt-4 text-sm text-slate-400">
                  <p className="mb-1">Live Website:</p>

                  <a
                    href={website.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-400 hover:text-cyan-300 underline underline-offset-4 break-all transition-colors"
                  >
                    {website.url.replace("https://", "")}
                  </a>
                </div>

                {/* Buttons */}
                <div className="mt-auto pt-6 flex flex-col gap-3">

                  {/* Visit Live Website */}
                  <a
                    href={website.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 rounded-xl text-center font-semibold bg-cyan-500 hover:bg-cyan-600 text-white transition-all duration-300 hover:scale-[1.02]"
                  >
                    Visit Website ↗
                  </a>

                  {/* Internal Details Page */}
                  <Link
                    href={`/catalog/${website.slug}`}
                    className="w-full py-3 rounded-xl text-center font-semibold border border-white/15 hover:border-cyan-400 hover:bg-white/5 transition-all duration-300"
                  >
                    View Details
                  </Link>

                </div>

              </div>

            </motion.div>
          ))}

        </div>

        {/* No Results */}
        {filteredWebsites.length === 0 && (
          <div className="text-center py-16 text-slate-400">
            <p className="text-lg">No websites found.</p>
            <p className="text-sm mt-2">
              Try searching with a different keyword.
            </p>
          </div>
        )}

      </div>
    </main>
  );
}
