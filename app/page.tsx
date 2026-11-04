import Hero from "@/components/hero/Hero";
import Stats from "@/components/Stats";
import TrustSection from "@/components/TrustSection";
import ExportMarkets from "@/components/ExportMarkets";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Hero />

      <Stats />

      <TrustSection />

      <ExportMarkets />

      <Footer />
    </>
  );
}