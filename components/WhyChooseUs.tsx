export default function WhyChooseUs() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center mb-12">
          Why Choose Us
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          <div className="bg-white p-6 rounded-xl shadow  transition-all duration-500
         hover:-translate-y-4 hover:scale-105 hover:shadow-2xl">
            <h3 className="font-bold text-xl mb-3">
              Reliable Suppliers
            </h3>
            <p>
              We work with trusted textile mills and manufacturers across Pakistan.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow  transition-all duration-500
         hover:-translate-y-4 hover:scale-105 hover:shadow-2xl">
            <h3 className="font-bold text-xl mb-3">
              Quality Inspection
            </h3>
            <p>
              Every order is checked before shipment to ensure quality standards.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow  transition-all duration-500
         hover:-translate-y-4 hover:scale-105 hover:shadow-2xl">
            <h3 className="font-bold text-xl mb-3">
              Global Export Support
            </h3>
            <p>
              Assistance with documentation, sampling, and international shipping.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}