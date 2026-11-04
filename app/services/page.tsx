
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowUpRight,
  Check,
  ShoppingCart,
  Utensils,
  Building2,
} from "lucide-react";

const packages = [
  {
    category: "B2B Websites",
    icon: Building2,
    description:
      "Professional websites for manufacturers, suppliers and B2B businesses.",
    plans: [
      {
        name: "B2B Starter",
        price: "Rs. 20,000",
        popular: false,
        features: [
          "15-25 Pages",
          "Responsive Design",
          "Custom UI/UX",
          "Basic Product / Service Catalog",
          "Up to 5 Categories",
          "Contact / Inquiry Forms",
          "WhatsApp Integration",
          "Basic SEO",
          "Analytics",
          "Performance Optimization",
          "1 Month Maintenance",
        ],
      },
      {
        name: "B2B Business",
        price: "Rs. 40,000",
        popular: true,
        features: [
          "50 Pages",
          "Responsive Design",
          "Custom UI/UX",
          "Advanced Product / Service Catalog",
          "Up to 15 Categories",
          "Contact / Inquiry Forms",
          "WhatsApp Integration",
          "Google Maps",
          "Advanced SEO",
          "Quote Request System",
          "Analytics",
          "Performance Optimization",
          "3 Months Maintenance",
        ],
      },
      {
        name: "B2B Enterprise",
        price: "Rs. 200,000+",
        popular: false,
        features: [
          "100+ Pages",
          "Responsive Design",
          "Custom UI/UX",
          "Advanced Product / Service Catalog",
          "Unlimited Categories",
          "Contact / Inquiry Forms",
          "WhatsApp Integration",
          "Google Maps",
          "Advanced SEO",
          "CMS / Admin Panel",
          "Quote Request System",
          "Analytics",
          "Performance Optimization",
          "AI Chatbot Integration",
          "6 Months Maintenance",
        ],
      },
    ],
  },

  {
    category: "Food Delivery",
    icon: Utensils,
    description:
      "Complete online ordering solutions for restaurants and food businesses.",
    plans: [
      {
        name: "Food Starter",
        price: "Rs. 40,000",
        popular: false,
        features: [
          "Responsive Website",
          "Custom Homepage",
          "Digital Menu",
          "Up to 5 Food Categories",
          "Up to 50 Food Items",
          "Food / Product Pages",
          "Shopping Cart",
          "Checkout",
          "Online Ordering",
          "WhatsApp Orders",
          "Cash on Delivery",
          "Basic Inventory",
          "Basic Admin Panel",
          "Basic SEO",
          "Discord Notifications",
          "1 Month Maintenance",
        ],
      },
      {
        name: "Restaurant Pro",
        price: "Rs. 80,000",
        popular: true,
        features: [
          "Responsive Website",
          "Digital Menu",
          "Unlimited Categories",
          "Up to 200 Food Items",
          "Shopping Cart",
          "Checkout",
          "Online Ordering",
          "WhatsApp Orders",
          "Cash on Delivery",
          "Online Payment",
          "Customer Accounts",
          "Order Tracking",
          "Advanced Admin Dashboard",
          "Inventory Management",
          "Coupons & Discounts",
          "Delivery Zones",
          "Sales Analytics",
          "Advanced SEO",
          "Email and Discord Notifications",
          "3 Months Maintenance",
        ],
      },
      {
        name: "Food Delivery Platform",
        price: "Rs. 170,000+",
        popular: false,
        features: [
          "Unlimited Food Items",
          "Unlimited Categories",
          "Custom UI/UX",
          "Shopping Cart & Checkout",
          "Online Ordering",
          "WhatsApp Orders",
          "Cash on Delivery",
          "Online Payments",
          "Customer Accounts",
          "Order Tracking",
          "Advanced Admin Dashboard",
          "Advanced Inventory",
          "Coupons & Discounts",
          "Delivery Zones",
          "Advanced Delivery Management",
          "WhatsApp & Email Notifications",
          "Sales Analytics",
          "Advanced SEO",
          "AI Chatbot Integration",
          "6 Months Maintenance",
        ],
      },
    ],
  },

  {
    category: "E-Commerce",
    icon: ShoppingCart,
    description:
      "Scalable online stores designed to sell products and grow your business.",
    plans: [
      {
        name: "E-Commerce Starter",
        price: "Rs. 60,000",
        popular: false,
        features: [
          "Responsive E-Commerce Website",
          "Custom Homepage",
          "Up to 50 Products",
          "Up to 5 Categories",
          "Product Pages",
          "Shopping Cart",
          "Checkout",
          "Customer Accounts",
          "Cash on Delivery",
          "Basic Inventory",
          "Basic Admin Panel",
          "Basic SEO",
          "WhatsApp Integration",
          "1 Month Maintenance",
        ],
      },
      {
        name: "E-Commerce Business",
        price: "Rs. 100,000",
        popular: true,
        features: [
          "Everything in Starter",
          "Up to 200 Products",
          "Up to 15 Categories",
          "Product Search",
          "Advanced Product Filters",
          "Wishlist",
          "Online Payment",
          "Discount System",
          "Customer Management",
          "Advanced Inventory",
          "Order Management",
          "Order Status Management",
          "Product Reviews & Ratings",
          "Email Notifications",
          "WhatsApp Integration",
          "Advanced Admin Dashboard",
          "Sales Analytics",
          "Advanced SEO",
          "Performance Optimization",
          "2 Months Maintenance",
        ],
      },
      {
        name: "E-Commerce Advanced",
        price: "Rs. 150,000+",
        popular: false,
        features: [
          "Everything in Business",
          "Unlimited Products",
          "Unlimited Categories",
          "Advanced Search & Filters",
          "Advanced Wishlist",
          "Multiple Payment Options",
          "Advanced Coupon System",
          "Customer Management",
          "Advanced Inventory",
          "Advanced Order Management",
          "Product Reviews & Ratings",
          "Email & WhatsApp Notifications",
          "Advanced Admin Dashboard",
          "Sales Analytics",
          "Advanced SEO",
          "Performance Optimization",
          "Custom Integrations",
          "AI Chatbot Integration",
          "6 Months Maintenance",
        ],
      },
    ],
  },
];

export default function ServicesPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#050a1c] text-white">

      {/* HERO SECTION */}
      <section className="relative overflow-hidden px-6 pb-24 pt-28 lg:px-12 lg:pt-36">

        {/* BACKGROUND GLOW */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-[15%] top-[5%] h-[500px] w-[500px] rounded-full bg-cyan-400/10 blur-[160px]" />

          <div className="absolute -right-[10%] top-[20%] h-[500px] w-[500px] rounded-full bg-purple-500/10 blur-[170px]" />

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,#050a1c_85%)]" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-6 flex items-center gap-3"
          >
            <span className="h-px w-10 bg-cyan-400" />

            <span className="text-xs font-medium uppercase tracking-[0.28em] text-cyan-400">
              Rubiks Solutions
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            className="max-w-4xl text-[clamp(3rem,6vw,6rem)] font-medium leading-[0.95] tracking-[-0.05em]"
          >
            Digital Solutions
            <br />

            <span className="bg-gradient-to-r from-cyan-400 via-sky-400 to-purple-500 bg-clip-text text-transparent">
              Built to Grow.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mt-7 max-w-2xl text-base leading-7 text-white/60 sm:text-lg"
          >
            Choose a package that fits your business. From professional
            websites to complete e-commerce and food delivery platforms,
            we build digital experiences designed for growth.
          </motion.p>

        </div>
      </section>

      {/* PACKAGES SECTION */}
      <section className="relative px-6 pb-24 lg:px-12">

        <div className="mx-auto max-w-7xl">

          {packages.map((category, categoryIndex) => {
            const Icon = category.icon;

            return (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{
                  duration: 0.7,
                  delay: categoryIndex * 0.1,
                }}
                className="mb-28"
              >

                {/* CATEGORY HEADING */}
                <div className="mb-10 flex items-start gap-4">

                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/[0.07]">
                    <Icon
                      size={22}
                      className="text-cyan-400"
                    />
                  </div>

                  <div>
                    <h2 className="text-2xl font-medium sm:text-3xl">
                      {category.category}
                    </h2>

                    <p className="mt-2 max-w-xl text-sm leading-6 text-white/45">
                      {category.description}
                    </p>
                  </div>

                </div>

                {/* PRICING CARDS */}
                <div className="grid gap-6 lg:grid-cols-3">

                  {category.plans.map((plan, index) => (
                    <motion.div
                      key={plan.name}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.6,
                        delay: index * 0.1,
                      }}
                      className={`group relative flex flex-col overflow-hidden rounded-3xl border p-7 transition-all duration-500 hover:-translate-y-2 ${
                        plan.popular
                          ? "border-cyan-400/50 bg-gradient-to-b from-cyan-400/[0.10] via-sky-500/[0.04] to-[#050a1c] shadow-[0_0_60px_rgba(56,189,248,0.10)] hover:shadow-[0_0_60px_rgba(56,189,248,0.2)]"
                          : "border-white/10 bg-white/[0.035] hover:border-cyan-400/30 hover:bg-white/[0.055]"
                      }`}
                    >

                      {/* CARD GLOW */}
                      <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-cyan-400/[0.07] blur-[80px] transition-all duration-500 group-hover:bg-purple-500/[0.12]" />

                      {/* POPULAR BADGE */}
                      {plan.popular && (
                        <div className="absolute right-5 top-5 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-cyan-300">
                          Most Popular
                        </div>
                      )}

                      <div className="relative">

                        <p className="text-xs uppercase tracking-[0.2em] text-white/40">
                          Package
                        </p>

                        <h3 className="mt-3 text-2xl font-medium">
                          {plan.name}
                        </h3>

                        <div className="mt-5">
                          <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-3xl font-semibold tracking-tight text-transparent">
                            {plan.price}
                          </span>
                        </div>

                      </div>

                      {/* DIVIDER */}
                      <div className="my-7 h-px bg-gradient-to-r from-cyan-400/30 via-white/10 to-transparent" />

                      {/* FEATURES */}
                      <div className="relative flex-1 space-y-3">

                        {plan.features.map((feature) => (
                          <div
                            key={feature}
                            className="flex items-start gap-3"
                          >
                            <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-cyan-400/10">
                              <Check
                                size={12}
                                strokeWidth={2.5}
                                className="text-cyan-400"
                              />
                            </div>

                            <span className="text-sm leading-5 text-white/65 transition-colors duration-300 group-hover:text-white/90">
                              {feature}
                            </span>
                          </div>
                        ))}

                      </div>

                      {/* GET STARTED BUTTON */}
                      <Link
                        href="/contact"
                        className={`group/btn mt-8 flex items-center justify-center gap-2 rounded-full px-5 py-3.5 text-sm font-semibold transition-all duration-300 ${
                          plan.popular
                            ? "bg-gradient-to-r from-cyan-400 via-sky-500 to-purple-500 text-white shadow-[0_0_20px_rgba(56,189,248,0.25)] hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(168,85,247,0.4)]"
                            : "border border-cyan-400/25 bg-cyan-400/[0.05] text-cyan-300 hover:border-cyan-400/60 hover:bg-gradient-to-r hover:from-cyan-500 hover:to-purple-500 hover:text-white"
                        }`}
                      >
                        Get Started

                        <ArrowUpRight
                          size={16}
                          className="transition-transform duration-300 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1"
                        />
                      </Link>

                    </motion.div>
                  ))}

                </div>
              </motion.div>
            );
          })}

        </div>
      </section>

      {/* CUSTOM PROJECT CTA */}
      <section className="relative overflow-hidden border-t border-white/10 px-6 py-24 lg:px-12">

        {/* BACKGROUND GLOW */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/10 blur-[140px]" />

          <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-purple-500/10 blur-[130px]" />
        </div>

        <div className="relative z-10 mx-auto max-w-4xl text-center">

          <p className="text-xs uppercase tracking-[0.25em] text-cyan-400">
            Need Something Custom?
          </p>

          <h2 className="mt-5 text-4xl font-medium tracking-tight sm:text-5xl">
            Let&apos;s build something
            <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              {" "}unique.
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-6 text-white/50 sm:text-base">
            Have a specific requirement or a larger project?
            We can create a custom solution tailored to your business.
          </p>

          <Link
            href="/contact"
            className="group mx-auto mt-8 flex w-fit items-center gap-3 rounded-full bg-gradient-to-r from-cyan-400 via-sky-500 to-purple-500 px-7 py-4 text-sm font-semibold text-white shadow-[0_0_25px_rgba(56,189,248,0.25)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_35px_rgba(168,85,247,0.4)]"
          >
            Discuss Your Project

            <ArrowUpRight
              size={17}
              className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </Link>

        </div>
      </section>

    </main>
  );
}
