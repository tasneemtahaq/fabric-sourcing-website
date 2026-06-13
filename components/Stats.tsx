export default function Stats() {
  return (
    <section className="bg-[#0B0F19] py-20">
      <div className="max-w-6xl mx-auto px-6">

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">

          <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-2xl
       transition-all duration-500 hover:-translate-y-3 hover:border-cyan-400 hover:shadow-xl hover:shadow-cyan-500/20">
            <h2 className="text-white text-4xl font-bold">100+</h2>
            <p className="text-white">Suppliers</p>
          </div>

          <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-2xl
       transition-all duration-500 hover:-translate-y-3 hover:border-cyan-400 hover:shadow-xl hover:shadow-cyan-500/20">
            <h2 className="text-white text-4xl font-bold">500+</h2>
            <p className="text-white">Fabric Types</p>
          </div>

          <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-2xl
       transition-all duration-500 hover:-translate-y-3 hover:border-cyan-400 hover:shadow-xl hover:shadow-cyan-500/20">
            <h2 className="text-white text-4xl font-bold">20+</h2>
            <p className="text-white">Countries</p>
          </div>

          <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-2xl
       transition-all duration-500 hover:-translate-y-3 hover:border-cyan-400 hover:shadow-xl hover:shadow-cyan-500/20">
            <h2 className="text-white text-4xl font-bold">10+</h2>
            <p className="text-white">Years Experience</p>
          </div>

        </div>

      </div>
    </section>
  );
}