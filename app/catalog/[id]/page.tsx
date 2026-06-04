import Image from "next/image";
import Link from "next/link";

type Props = {
  params: {
    id: string;
  };
};

const fabrics = {
  "pv-80-20": {
    name: "PV 80/20 Uniform Fabric",
    image: "/fabrics/pv8020.jpg",
    gsm: 220,
    width: "58 inches",
    composition: "80% Polyester 20% Viscose",
    usage: "School & Corporate Uniforms",
  },

  interlock: {
    name: "Micro Interlock Fabric",
    image: "/fabrics/interlock.jpg",
    gsm: 160,
    width: "72 inches",
    composition: "100% Polyester",
    usage: "Sportswear & Sublimation",
  },

  denim: {
    name: "Polyester Denim Fabric",
    image: "/fabrics/denim.jpg",
    gsm: 320,
    width: "58 inches",
    composition: "Poly Cotton Blend",
    usage: "Fashion & Workwear",
  },
};

export default function FabricPage({ params }: Props) {
  const fabric = fabrics[params.id as keyof typeof fabrics];

  if (!fabric) {
    return (
      <div className="p-10">
        <h1 className="text-xl font-bold">Fabric not found</h1>
        <Link href="/catalog" className="text-blue-600">
          Go back to catalog
        </Link>
      </div>
    );
  }

  return (
    <main className="max-w-5xl mx-auto p-10">

      <div className="grid md:grid-cols-2 gap-10">

        <Image
          src={fabric.image}
          alt={fabric.name}
          width={600}
          height={400}
          className="rounded-lg"
        />

        <div>

          <h1 className="text-3xl font-bold">
            {fabric.name}
          </h1>

          <div className="mt-6 space-y-2 text-gray-700">

            <p><b>GSM:</b> {fabric.gsm}</p>
            <p><b>Width:</b> {fabric.width}</p>
            <p><b>Composition:</b> {fabric.composition}</p>
            <p><b>Usage:</b> {fabric.usage}</p>

          </div>

          <Link
            href="/quote"
            className="inline-block mt-8 bg-slate-900 text-white px-6 py-3 rounded-lg"
          >
            Request Quote
          </Link>

        </div>

      </div>

    </main>
  );
}