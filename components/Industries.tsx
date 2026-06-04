export default function Industries() {
  return (
    <section className="py-20">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12">
          Industries We Serve
        </h2>

        <div className="grid md:grid-cols-4 gap-6">
          <div className="border p-6 rounded-lg">School Uniforms</div>
          <div className="border p-6 rounded-lg">Corporate Wear</div>
          <div className="border p-6 rounded-lg">Sportswear</div>
          <div className="border p-6 rounded-lg">Workwear</div>
        </div>
      </div>
    </section>
  );
}