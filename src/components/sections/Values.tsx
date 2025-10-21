"use client";
import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const items = [
  { icon: "/icons/leaf.svg", title: "Shade‑Grown", copy: "Cultivated beneath forest canopies that preserve biodiversity and soil health." },
  { icon: "/icons/bean.svg", title: "Single‑Origin", copy: "Transparent sourcing from farms we’ve known for years—traceable to the lot." },
  { icon: "/icons/water.svg", title: "Careful Processing", copy: "Washed and natural methods optimized for clarity, sweetness, and body." },
  { icon: "/icons/planet.svg", title: "Climate Positive", copy: "From planting to packaging—measured and offset, with projects that cool the planet." },
];

export default function Values() {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from("[data-value]", {
        scrollTrigger: { trigger: ref.current, start: "top 80%" },
        y: 30,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.12,
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} id="values" className="bg-black py-20 md:py-28 border-t border-white/10">
      <div className="container">
        <h2 className="heading-display text-4xl md:text-6xl mb-10">Our Values</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {items.map((it, i) => (
            <div key={i} data-value className="rounded-xl p-6 bg-white/[.04] border border-white/10">
              <div className="h-10 w-10 mb-4 relative">
                <Image src={it.icon} alt="" fill className="object-contain" />
              </div>
              <div className="heading-display text-xl mb-2">{it.title}</div>
              <p className="text-white/75 text-sm leading-relaxed">{it.copy}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

