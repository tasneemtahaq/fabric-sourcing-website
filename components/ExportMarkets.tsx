
"use client";

export default function ExportMarkets() {
  const markets = [
    { flag: "🇵🇰", name: "Pakistan" },
    { flag: "🇺🇸", name: "United States" },
    { flag: "🇦🇪", name: "UAE" },
    { flag: "🇸🇦", name: "Saudi Arabia" },
    { flag: "🇩🇪", name: "Africa" },
  ];

  return (
    <section className="relative isolate overflow-hidden bg-[#5d76cf] py-20 text-white sm:py-24">

      {/* Decorative Background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">

        {/* Cyan Glow */}
        <div className="absolute -left-24 top-10 h-72 w-72 animate-[float_8s_ease-in-out_infinite] rounded-full bg-cyan-400/10 blur-[110px]" />

        {/* Purple Glow */}
        <div className="absolute -right-20 bottom-0 h-80 w-80 animate-[float_10s_ease-in-out_infinite] rounded-full bg-purple-500/10 blur-[120px]" />

        {/* Sky Blue Glow */}
        <div className="absolute left-[40%] top-[30%] h-64 w-64 rounded-full bg-sky-500/5 blur-[110px]" />

        {/* Decorative Circle */}
        <div className="absolute right-[15%] top-12 h-24 w-24 rounded-full border border-cyan-400/10" />

        {/* Dot Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:28px_28px]" />

      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">

        {/* Section Heading */}
        <div className="mb-14 text-center">

          {/* Label */}
          <span className="mb-4 inline-block text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300">
            Global Reach
          </span>

          {/* Heading */}
          <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">

            Markets We{" "}

            <span className="bg-gradient-to-r from-cyan-300 via-sky-400 to-purple-400 bg-clip-text text-transparent">
              Serve
            </span>

          </h2>

          {/* Description */}
          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-white/60 sm:text-base">

            Connecting businesses across borders with reliable solutions
            and a growing international presence.

          </p>

          {/* Gradient Underline */}
          <div className="mx-auto mt-6 h-1 w-16 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 shadow-[0_0_15px_rgba(56,189,248,0.5)]" />

        </div>

        {/* Market Cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">

          {markets.map((market, index) => (

            <div
              key={market.name}
              style={{ animationDelay: `${index * 120}ms` }}
              className="group relative animate-[fadeUp_0.7s_ease-out_both] overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035] p-7 text-center shadow-[0_8px_30px_rgba(0,0,0,0.15)] backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-cyan-400/30 hover:bg-white/[0.07] hover:shadow-[0_20px_45px_rgba(56,189,248,0.12)]"
            >

              {/* Decorative Corner Glow */}
              <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gradient-to-br from-cyan-400/15 to-purple-500/15 opacity-60 blur-xl transition-all duration-700 group-hover:scale-150 group-hover:opacity-100" />

              {/* Flag Container */}
              <div className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] shadow-[0_0_20px_rgba(56,189,248,0.05)] transition-all duration-500 group-hover:rotate-3 group-hover:scale-110 group-hover:border-cyan-400/30 group-hover:bg-gradient-to-br group-hover:from-cyan-400/10 group-hover:to-purple-500/10 group-hover:shadow-[0_0_25px_rgba(56,189,248,0.15)]">

                <span className="text-3xl transition-transform duration-500 group-hover:scale-110">
                  {market.flag}
                </span>

              </div>

              {/* Market Name */}
              <h3 className="relative mt-5 text-sm font-semibold text-white/80 transition-colors duration-300 group-hover:text-cyan-300">
                {market.name}
              </h3>

              {/* Animated Bottom Line */}
              <div className="mx-auto mt-4 h-[2px] w-8 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 opacity-60 shadow-[0_0_10px_rgba(56,189,248,0.3)] transition-all duration-500 group-hover:w-14 group-hover:opacity-100" />

            </div>

          ))}

        </div>

      </div>

      {/* Animation Keyframes */}
      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }

          50% {
            transform: translateY(-18px);
          }
        }

        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(24px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            scroll-behavior: auto !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>

    </section>
  );
}