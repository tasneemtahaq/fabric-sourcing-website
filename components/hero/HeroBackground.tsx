/** Deep navy night with the violet/pink floor glow from the reference cube. No image needed. */
export default function HeroBackground() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 bg-[#0a0b24]">
      <div className="absolute inset-0 bg-[radial-gradient(70%_60%_at_50%_42%,rgba(59,91,255,0.22),transparent_70%)]" />
      <div className="absolute inset-x-0 bottom-0 h-[60%] bg-[radial-gradient(65%_85%_at_50%_100%,rgba(236,72,153,0.30),rgba(124,58,237,0.20)_45%,transparent_75%)]" />
      <div className="absolute inset-0 bg-linear-to-b from-[#0a0b24] via-transparent to-[#0a0b24]/70" />
    </div>
  );
}
