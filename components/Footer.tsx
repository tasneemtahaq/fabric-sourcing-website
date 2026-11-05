
import Link from "next/link";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Packages", href: "/packages" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Request Quote", href: "/quote" },
];

const services = [
  "B2B Websites",
  "Ecommerce Stores",
  "Catalogue Websites",
  "Food Delivery Platforms",
];

export default function Footer() {
  return (
    <footer className="relative mt-0 overflow-hidden border-t border-white/10 bg-[#050a1c] text-white">

      {/* Decorative Background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">

        {/* Cyan Glow */}
        <div className="absolute -bottom-40 left-[10%] h-80 w-80 animate-[footerFloat_10s_ease-in-out_infinite] rounded-full bg-cyan-400/10 blur-[120px]" />

        {/* Purple Glow */}
        <div className="absolute -right-20 top-0 h-72 w-72 animate-[footerFloat_12s_ease-in-out_infinite] rounded-full bg-purple-500/10 blur-[120px]" />

        {/* Sky Blue Glow */}
        <div className="absolute left-[45%] top-20 h-64 w-64 rounded-full bg-sky-500/5 blur-[120px]" />

        {/* Decorative Circle */}
        <div className="absolute right-[35%] top-16 h-24 w-24 rounded-full border border-cyan-400/10" />

        {/* Floating Dot */}
        <div className="absolute bottom-24 right-[15%] h-3 w-3 animate-pulse rounded-full bg-purple-400/60 shadow-[0_0_15px_rgba(168,85,247,0.7)]" />

      </div>

      {/* Main Footer */}
      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 py-16 sm:px-8 md:grid-cols-2 lg:grid-cols-4 lg:px-12">

        {/* Brand */}
        <div>

          <Link href="/" className="group inline-flex items-center gap-3">

          

            <span className="text-lg font-bold tracking-tight text-white">
              Rubiks{" "}
              <span className="bg-gradient-to-r from-cyan-300 to-purple-400 bg-clip-text text-transparent">
                Solutions
              </span>
            </span>

          </Link>

          <p className="mt-5 max-w-sm text-sm leading-7 text-white/60">
            Your trusted digital partner for B2B websites, ecommerce
            stores, catalogue websites, and food delivery platforms.
            We help businesses grow globally with our expertise.
          </p>

          {/* Animated Underline */}
          <div className="mt-6 h-1 w-14 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 transition-all duration-500 hover:w-24" />

        </div>

        {/* Quick Links */}
        <div>

          <h3 className="mb-6 text-xs font-bold uppercase tracking-[0.2em] text-cyan-300">
            Quick Links
          </h3>

          <ul className="space-y-4">

            {quickLinks.map((link) => (
              <li key={link.href}>

                <Link
                  href={link.href}
                  className="group inline-flex items-center gap-3 text-sm text-white/60 transition-all duration-300 hover:translate-x-1 hover:text-cyan-300"
                >

                  <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 transition-all duration-300 group-hover:scale-150 group-hover:shadow-[0_0_10px_rgba(56,189,248,0.8)]" />

                  {link.label}

                </Link>

              </li>
            ))}

          </ul>

        </div>

        {/* Services */}
        <div>

          <h3 className="mb-6 text-xs font-bold uppercase tracking-[0.2em] text-sky-300">
            Our Services
          </h3>

          <ul className="space-y-4">

            {services.map((service) => (
              <li
                key={service}
                className="group flex items-center gap-3 text-sm text-white/60 transition-all duration-300 hover:translate-x-1 hover:text-sky-300"
              >

                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400/50 transition-all duration-300 group-hover:scale-150 group-hover:bg-purple-400 group-hover:shadow-[0_0_10px_rgba(168,85,247,0.8)]" />

                {service}

              </li>
            ))}

          </ul>

        </div>

        {/* Contact */}
        <div>

          <h3 className="mb-6 text-xs font-bold uppercase tracking-[0.2em] text-purple-300">
            Get In Touch
          </h3>

          <div className="space-y-5 text-sm text-white/65">

            {/* Location */}
            <div className="group flex items-start gap-3">

              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-cyan-300 transition-all duration-300 group-hover:border-cyan-400/30 group-hover:bg-cyan-400/10">

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
                  <circle cx="12" cy="10" r="2.5" />
                </svg>

              </span>

              <div>

                <span className="mb-1 block text-[10px] font-semibold uppercase tracking-widest text-cyan-300/70">
                  Location
                </span>

                Karachi, Pakistan

              </div>

            </div>

            {/* Email */}
            <div className="group flex items-start gap-3">

              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-sky-300 transition-all duration-300 group-hover:border-sky-400/30 group-hover:bg-sky-400/10">

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="m3 7 9 6 9-6" />
                </svg>

              </span>

              <div>

                <span className="mb-1 block text-[10px] font-semibold uppercase tracking-widest text-sky-300/70">
                  Email
                </span>

                <a
                  href="mailto:info@gmail.com"
                  className="transition-colors duration-300 hover:text-cyan-300"
                >
                  rubiksolutions@gmail.com
                </a>

              </div>

            </div>

            {/* CTA Button */}
            <Link
              href="/quote"
              className="group mt-2 inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-cyan-400 via-sky-500 to-purple-500 bg-[length:200%_100%] bg-left px-5 py-3 text-xs font-semibold text-white shadow-[0_0_20px_rgba(56,189,248,0.25)] transition-all duration-500 hover:-translate-y-1 hover:bg-right hover:shadow-[0_0_30px_rgba(168,85,247,0.4)]"
            >

              Start a Project

              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>

            </Link>

          </div>

        </div>

      </div>

      {/* Bottom Bar */}
      <div className="relative z-10 border-t border-white/10 bg-white/[0.02]">

        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-6 text-center sm:px-8 md:flex-row md:px-12 md:text-left">

          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} Rubiks Solutions.
            All rights reserved.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-5 text-xs text-white/40">

            <Link
              href="/privacy"
              className="transition-colors hover:text-cyan-300"
            >
              Privacy Policy
            </Link>

            <Link
              href="/terms"
              className="transition-colors hover:text-sky-300"
            >
              Terms & Conditions
            </Link>

            <span className="flex items-center gap-2 font-medium text-cyan-300/70">

              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 shadow-[0_0_8px_rgba(56,189,248,0.8)]" />

              Built with care

            </span>

          </div>

        </div>

      </div>

      {/* Animation Keyframes */}
      <style>{`
        @keyframes footerFloat {
          0%, 100% {
            transform: translate3d(0, 0, 0);
          }

          50% {
            transform: translate3d(0, -20px, 0);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>

    </footer>
  );
}