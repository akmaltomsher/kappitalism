"use client";
import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const items = [
  { src: "/images/showcase-1.svg", title: "Forest Roast" },
  { src: "/images/showcase-2.svg", title: "Estate Blend" },
  { src: "/images/showcase-3.svg", title: "Morning Light" },
  { src: "/images/showcase-4.svg", title: "Velvet Dark" },
  { src: "/images/showcase-5.svg", title: "Cascara Notes" },
  { src: "/images/showcase-6.svg", title: "Cocoa Finish" },
];

export default function Showcase() {
  const gridRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray("[data-card]");
      gsap.from(cards, {
        scrollTrigger: { trigger: gridRef.current, start: "top 85%" },
        y: 40,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.08,
      });

      cards.forEach((c: any) => {
        const img = c.querySelector("img");
        if (!img) return;
        const tl = gsap.timeline({ paused: true });
        tl.to(img, { scale: 1.06, duration: 0.4, ease: "power2.out" });
        c.addEventListener("mouseenter", () => tl.play());
        c.addEventListener("mouseleave", () => tl.reverse());
      });
    }, gridRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="showcase" className="bg-black py-20 md:py-28">
      <div className="container">
        <h2 className="heading-display text-4xl md:text-6xl mb-8">Showcase</h2>
        <p className="text-white/70 max-w-2xl mb-10">A taste of our craft. Subtle reveals on scroll and gentle zoom on hover, powered by GSAP.</p>
        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((it, i) => (
            <div key={i} data-card className="group relative overflow-hidden rounded-lg border border-white/10 bg-white/5">
              <div className="aspect-[4/3] relative">
                <Image src={it.src} alt={it.title} fill className="object-cover will-change-transform" />
              </div>
              <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
                <div className="flex items-center justify-between">
                  <span className="heading-display text-xl">{it.title}</span>
                  <span className="text-primary text-sm uppercase">Explore</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

