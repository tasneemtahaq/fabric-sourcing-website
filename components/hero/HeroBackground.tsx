import Image from "next/image";

/**
 * Photorealistic landscape (public/images/hero-bg.jpg) plus lighting overlays.
 * Server component: zero client JS.
 */
export default function HeroBackground() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
      <Image
        src="/images/hero-bg.jpg"
        alt=""
        fill
        priority
        quality={80}
        sizes="100vw"
        className="object-cover object-[62%_center]"
      />

      {/* readability for the left column, without darkening the whole scene */}
      <div className="absolute inset-0 bg-linear-to-r from-[#050a1c]/85 via-[#050a1c]/35 to-transparent lg:via-[#050a1c]/20" />
      {/* nav + bottom fade */}
      <div className="absolute inset-0 bg-linear-to-b from-[#050a1c]/70 via-transparent to-[#050a1c]" />
      {/* warm golden sun bloom */}
      <div className="absolute inset-0 bg-[radial-gradient(55%_45%_at_78%_28%,rgba(255,196,120,0.30),transparent_70%)] mix-blend-screen" />
      {/* cool cyan/purple atmosphere */}
      <div className="absolute inset-0 bg-[radial-gradient(45%_40%_at_15%_85%,rgba(99,102,241,0.25),transparent_70%)] mix-blend-screen" />
    </div>
  );
}
