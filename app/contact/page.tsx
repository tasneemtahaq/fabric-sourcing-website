export default function ContactPage() {
  return (
    <main className="max-w-xl mx-auto p-10">

      <h1 className="text-4xl font-bold mb-6">
        Contact Us
      </h1>

      <form className="space-y-4">

        <input
          className="border p-3 w-full"
          placeholder="Your Name"
        />

        <input
          className="border p-3 w-full"
          placeholder="Email"
        />

        <textarea
          className="border p-3 w-full"
          rows={5}
          placeholder="Your Fabric Requirement"
        />

        <button
          className="bg-slate-900 text-white px-6 py-3 rounded"
        >
          Send Inquiry
        </button>

      </form>

    </main>
  );
}