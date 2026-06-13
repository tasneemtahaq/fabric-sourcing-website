import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-black/40 backdrop-blur-xl border-b border-white/10 text-white p-4">
      <div className="max-w-6xl mx-auto flex justify-between">
        <h1 className="font-bold text-2xl tracking-widest">MBN Sourcing</h1>

        <div className="space-x-6">
          <Link
  href="/"
  className="relative transition-all duration-300 hover:text-cyan-400 hover:-translate-y-1"
>
  Home
</Link>

<Link
  href="/about"
  className="relative transition-all duration-300 hover:text-cyan-400 hover:-translate-y-1"
>
  About
</Link>

<Link
  href="/catalog"
  className="relative transition-all duration-300 hover:text-cyan-400 hover:-translate-y-1"
>
  Catalog
</Link>

<Link
  href="/contact"
  className="relative transition-all duration-300 hover:text-cyan-400 hover:-translate-y-1"
>
  Contact
</Link>

<Link
  href="/quote"
  className="bg-cyan-500 px-4 py-2 rounded-lg transition-all duration-300 hover:bg-cyan-600 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/30"
>
  Request Quote
</Link>
        </div>
      </div>
    </nav>
  );
}