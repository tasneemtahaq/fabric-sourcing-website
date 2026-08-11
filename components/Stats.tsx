export default function Stats() {
  return (
    <section className="bg-[#0B0F19] py-20">
      <div className="max-w-6xl mx-auto px-6">

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">

          <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-2xl
       transition-all duration-500 hover:-translate-y-3 hover:border-blue-700 hover:shadow-xl hover:shadow-cyan-500/20">
           
            <p className="text-white">B2B<br></br> Websites</p>
          </div>

          <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-2xl
       transition-all duration-500 hover:-translate-y-3 hover:border-blue-700 hover:shadow-xl hover:shadow-cyan-500/20">
            
            <p className="text-white">Ecommerce Stores</p>
          </div>

          <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-2xl
       transition-all duration-500 hover:-translate-y-3 hover:border-blue-700 hover:shadow-xl hover:shadow-cyan-500/20">
            
            <p className="text-white">Catalogue Websites</p>
          </div>

          <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-2xl
       transition-all duration-500 hover:-translate-y-3 hover:border-blue-700 hover:shadow-xl hover:shadow-cyan-500/20">
            
            <p className="text-white">Food Delivery Websites</p>
          </div>

        </div>

      </div>
    </section>
  );
}