export default function Footer() {
  return (
    <footer className="bg-[#0B0F19] text-white border-t border-white/10 mt-20">

      <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-4 gap-10">

        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold tracking-widest">
            MBN SOURCING
          </h2>

          <p className="text-slate-400 mt-4 leading-relaxed">
            Your trusted fabric sourcing partner from Pakistan,
            connecting global buyers with verified textile mills.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>

          <ul className="space-y-3 text-slate-400">
            <li className="hover:text-cyan-400 transition">Home</li>
            <li className="hover:text-cyan-400 transition">Catalog</li>
            <li className="hover:text-cyan-400 transition">About</li>
            <li className="hover:text-cyan-400 transition">Contact</li>
            <li className="hover:text-cyan-400 transition">Request Quote</li>
          </ul>
        </div>

        {/* Fabric Types */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Fabric Types</h3>

          <ul className="space-y-3 text-slate-400">
            <li>Uniform Fabrics</li>
            <li>Sportswear Fabrics</li>
            <li>Workwear Fabrics</li>
            <li>Sublimation Fabrics</li>
            <li>Poly Cotton Blends</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Contact</h3>

          <p className="text-slate-400">
            Karachi, Pakistan
          </p>

          <p className="text-slate-400 mt-2">
            WhatsApp: +92 300 1234567
          </p>

          <p className="text-slate-400 mt-2">
            Email: info@mbnsourcing.com
          </p>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 py-6 text-center text-slate-500 text-sm">
        © {new Date().getFullYear()} MBN Sourcing. All rights reserved.
      </div>

    </footer>
  );
}