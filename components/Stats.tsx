export default function Stats() {
  return (
    <section className="bg-slate-900 text-white py-16">
      <div className="max-w-6xl mx-auto px-6">

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">

          <div>
            <h2 className="text-4xl font-bold">100+</h2>
            <p>Suppliers</p>
          </div>

          <div>
            <h2 className="text-4xl font-bold">500+</h2>
            <p>Fabric Types</p>
          </div>

          <div>
            <h2 className="text-4xl font-bold">20+</h2>
            <p>Countries</p>
          </div>

          <div>
            <h2 className="text-4xl font-bold">10+</h2>
            <p>Years Experience</p>
          </div>

        </div>

      </div>
    </section>
  );
}