"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

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
    <main className="max-w-7xl mx-auto p-10">
      <h1 className="text-4xl font-bold text-center mb-4">
        Fabric Catalog
      </h1>

      <p className="text-center text-gray-600 mb-8">
        Browse our polyester, sportswear, and uniform fabrics.
      </p>

      {/* Search Box */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search fabrics..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border rounded-lg p-3"
        />
      </div>

      {/* Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-3 mb-10">
        <button
          onClick={() => setCategory("all")}
          className="px-4 py-2 border rounded-lg hover:bg-slate-900 hover:text-white"
        >
          All Fabrics
        </button>

        <button
          onClick={() => setCategory("uniform")}
          className="px-4 py-2 border rounded-lg hover:bg-slate-900 hover:text-white"
        >
          Uniform Fabrics
        </button>

        <button
          onClick={() => setCategory("sportswear")}
          className="px-4 py-2 border rounded-lg hover:bg-slate-900 hover:text-white"
        >
          Sportswear
        </button>

        <button
          onClick={() => setCategory("workwear")}
          className="px-4 py-2 border rounded-lg hover:bg-slate-900 hover:text-white"
        >
          Workwear
        </button>
      </div>

      {/* Catalog Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {filteredFabrics.map((fabric) => (
          <Link
            key={fabric.slug}
            href={`/catalog/${fabric.slug}`}
            className="border rounded-xl overflow-hidden shadow hover:shadow-xl transition-all duration-300 block bg-white hover:-translate-y-1"
          >
            <div className="relative w-full h-56">
              <Image
                src={fabric.image}
                alt={fabric.name}
                fill
                className="object-cover"
              />
            </div>

            <div className="p-5">
              <h2 className="font-bold text-xl mb-2">
                {fabric.name}
              </h2>

              <p className="text-gray-600">
                GSM: {fabric.gsm}
              </p>

              <p className="text-sm text-gray-500 mt-1">
                {fabric.composition}
              </p>

              <button className="mt-4 w-full bg-slate-900 text-white py-2 rounded-lg">
                View Details
              </button>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}