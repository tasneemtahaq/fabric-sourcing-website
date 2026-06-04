import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-slate-900 text-white p-4">
      <div className="max-w-6xl mx-auto flex justify-between">
        <h1 className="font-bold text-xl">MBN Sourcing</h1>

        <div className="space-x-6">
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/catalog">Catalog</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/quote">Request Quote</Link>
        </div>
      </div>
    </nav>
  );
}