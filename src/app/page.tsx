import Header from "@/components/layout/Header";
import Hero from "@/components/sections/Hero";
import Ticker from "@/components/sections/Ticker";
import Oneness from "@/components/sections/Oneness";
import Values from "@/components/sections/Values";
import MarkShowcase from "@/components/sections/MarkShowcase";
import ShowcaseAlt from "@/components/sections/ShowcaseAlt";
import CTA from "@/components/sections/CTA";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <main>
        <Hero />
        <Ticker />
        <Oneness />
        <Values />
        <MarkShowcase />
        <ShowcaseAlt />
        <CTA />
      </main>
    </div>
  );
}
