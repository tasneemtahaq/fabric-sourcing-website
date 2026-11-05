
"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, ExternalLink, Globe } from "lucide-react";

const websites = {
  "Ecommerce-Platform": {
    name: "Ecommerce Platform",
    category: "B2B Website",
    image: "/images/111.png",
    url: "https://mohammadiartgallery.vercel.app/",
    description:
      "A professional business website designed to showcase products, connect businesses, and create a strong online presence.",
    features: [
      "Professional Business Design",
      "Responsive Layout",
      "Product Showcase",
      "User-Friendly Navigation",
      "Modern UI/UX",
    ],
  },

  "ecommerce-website": {
    name: "Ecommerce Website",
    category: "Ecommerce",
    image: "/images/222.png",
    url: "https://www.menodoradigitals.online/",
    description:
      "A modern ecommerce platform designed to showcase products and provide customers with a smooth online shopping experience.",
    features: [
      "Product Display",
      "Modern Shopping Experience",
      "Responsive Design",
      "Easy Navigation",
      "Modern UI/UX",
    ],
  },

  "food-delivery-website": {
    name: "Food Delivery Website",
    category: "Food Delivery",
    image: "/images/333.png",
    url: "https://www.mamasoups.net",
    description:
      "A food delivery website designed to present menus, showcase food items, and make online ordering convenient for customers.",
    features: [
      "Food Menu Display",
      "Responsive Design",
      "Easy Navigation",
      "Online Ordering Experience",
      "Modern UI/UX",
    ],
  },
};

type Props = {
  params: Promise<{
    id: string;
  }>;
};

// eslint-disable-next-line @next/next/no-async-client-component
export default async function WebsiteDetailsPage({ params }: Props) {
  const { id } = await params;

  const website = websites[id as keyof typeof websites];

  if (!website) {
    return (
      <main className="min-h-screen bg-[#0B0F19] text-white flex items-center justify-center px-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">
            Website Not Found
          </h1>

          <p className="text-slate-400 mb-8">
            Sorry, this website does not exist in our catalog.
          </p>

          <Link
            href="/catalog"
            className="inline-flex items-center gap-2 bg-cyan-500 hover:bg-cyan-600 px-6 py-3 rounded-xl transition"
          >
            <ArrowLeft size={18} />
            Back to Catalog
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0B0F19] text-white relative overflow-hidden">

      {/* Background Glow */}
      <div className="absolute top-20 left-0 w-96 h-96 bg-cyan-500/15 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-20 right-0 w-96 h-96 bg-blue-500/15 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 py-16 relative z-10">

        {/* Back Button */}
        <Link
          href="/catalog"
          className="inline-flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition mb-12"
        >
          <ArrowLeft size={18} />
          Back to Catalog
        </Link>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-14 items-center">

          {/* Website Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="absolute -inset-3 bg-cyan-500/10 blur-2xl rounded-3xl" />

            <div className="relative rounded-3xl overflow-hidden border border-white/10">
              <Image
                src={website.image}
                alt={website.name}
                width={900}
                height={650}
                priority
                className="w-full h-auto object-cover"
              />
            </div>
          </motion.div>

          {/* Website Information */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-block px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-400/20 text-cyan-400 text-sm mb-6">
              {website.category}
            </span>

            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              {website.name}
            </h1>

            <p className="text-slate-400 text-lg leading-8 mt-6">
              {website.description}
            </p>

            {/* Features */}
            <div className="mt-10">
              <h2 className="text-xl font-semibold mb-5">
                Website Features
              </h2>

              <div className="space-y-4">
                {website.features.map((feature) => (
                  <div
                    key={feature}
                    className="flex items-center gap-3 text-slate-300"
                  >
                    <span className="w-2 h-2 rounded-full bg-cyan-400" />
                    {feature}
                  </div>
                ))}
              </div>
            </div>

            {/* Website URL */}
            <div className="mt-10 p-5 rounded-2xl bg-white/5 border border-white/10">
              <div className="flex items-center gap-2 text-slate-400 text-sm mb-2">
                <Globe size={16} />
                Website URL
              </div>

              <p className="text-cyan-400 break-all">
                {website.url}
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4 mt-8">

              <a
                href={website.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-cyan-500 hover:bg-cyan-600 px-7 py-4 rounded-xl font-semibold transition-all hover:scale-105"
              >
                Visit Website
                <ExternalLink size={18} />
              </a>

              <Link
                href="/quote"
                className="inline-flex items-center gap-2 border border-white/20 hover:border-cyan-400 px-7 py-4 rounded-xl transition-all"
              >
                Request a Quote
                <ArrowUpRight size={18} />
              </Link>

            </div>
          </motion.div>

        </div>
      </div>
    </main>
  );
}
