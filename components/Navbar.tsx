"use client";

import { useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight, Box } from "lucide-react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/catalog" },
  { label: "Contact", href: "/contact" },
];

const ctaClass =
  "group inline-flex items-center gap-2 rounded-full bg-linear-to-r from-cyan-400 via-violet-500 to-fuchsia-500 bg-[length:200%_100%] bg-left px-5 py-3 text-sm font-semibold text-white shadow-[0_0_24px_rgba(56,189,248,0.45)] transition-all duration-500 hover:-translate-y-0.5 hover:bg-right hover:shadow-[0_0_34px_rgba(168,85,247,0.6)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300";

const subscribeScroll = (cb: () => void) => {
  window.addEventListener("scroll", cb, { passive: true });
  return () => window.removeEventListener("scroll", cb);
};
const getScrolled = () => window.scrollY > 24;

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const scrolled = useSyncExternalStore(subscribeScroll, getScrolled, () => false);
  const pathname = usePathname();

  

  // Transparent only over the cinematic hero (home page, top of page).
  const solid = scrolled || open || pathname !== "/";

  return (
    <nav
      className={`sticky top-0 z-50 border-b text-white transition-all duration-500 ${
        solid
          ? "border-white/10 bg-[#0a0b24]/75 shadow-[0_8px_30px_rgba(2,6,23,0.35)] backdrop-blur-xl"
          : "border-transparent bg-transparent"
      }`}
    >
      {/* NAVBAR CONTENT (h-[72px] + 1px border = the 73px the hero pulls up by) */}
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-6 sm:px-8 lg:px-12">
        {/* LOGO */}
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className="group flex items-center gap-3"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-cyan-400 via-violet-500 to-fuchsia-500 text-white shadow-[0_0_20px_rgba(56,189,248,0.45)] transition-all duration-300 group-hover:-rotate-6 group-hover:scale-105">
            <Box size={22} strokeWidth={2} />
          </span>

          <span className="text-base font-bold tracking-tight sm:text-lg">
            Rubiks
            <span className="ml-1.5 font-medium text-sky-200/70">
              Solutions
            </span>
          </span>
        </Link>

        {/* DESKTOP NAVIGATION */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`group relative py-2 text-sm font-medium transition-colors duration-300 hover:text-cyan-300 ${
                  active ? "text-white" : "text-white/70"
                }`}
              >
                {link.label}
                <span
                  className={`absolute bottom-0 left-0 h-[2px] rounded-full bg-linear-to-r from-cyan-400 via-violet-500 to-fuchsia-500 transition-all duration-300 group-hover:w-full ${
                    active ? "w-full" : "w-0"
                  }`}
                />
              </Link>
            );
          })}

          <Link href="/contact" className={ctaClass}>
            Get Started
            <ArrowUpRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/20 bg-white/10 text-white backdrop-blur transition-all duration-300 hover:bg-white/20 md:hidden"
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={open}
          aria-controls="mobile-navigation"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      <div
        id="mobile-navigation"
        className={`overflow-hidden border-t border-white/10 bg-[#0a0b24]/95 backdrop-blur-xl transition-all duration-300 md:hidden ${
          open
            ? "max-h-[420px] opacity-100"
            : "pointer-events-none max-h-0 border-transparent opacity-0"
        }`}
        aria-hidden={!open}
        inert={!open}
      >
        <div className="mx-auto flex max-w-7xl flex-col gap-1 px-6 py-4 sm:px-8">
          {navLinks.map((link, index) => (
            <Link
              key={link.href}
              href={link.href}
              tabIndex={open ? 0 : -1}
              onClick={() => setOpen(false)}
              style={{ transitionDelay: open ? `${index * 50}ms` : "0ms" }}
              className={`rounded-xl px-4 py-3 text-sm font-medium text-white/80 transition-all duration-300 hover:bg-white/10 hover:text-cyan-300 ${
                open ? "translate-x-0 opacity-100" : "-translate-x-2 opacity-0"
              }`}
            >
              {link.label}
            </Link>
          ))}

          <Link
            href="/contact"
            tabIndex={open ? 0 : -1}
            onClick={() => setOpen(false)}
            className={`${ctaClass} mt-2 w-fit`}
          >
            Get Started
            <ArrowUpRight
              size={16}
              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        </div>
      </div>
    </nav>
  );
}
