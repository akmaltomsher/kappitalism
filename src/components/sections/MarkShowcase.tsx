"use client";
import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const panels = [
  { src: "/images/showcase-1.svg", title: "Forest Roast", copy: "Dark chocolate, cedar, molasses. Full‑bodied and lingering." },
  { src: "/images/showcase-2.svg", title: "Estate Blend", copy: "Hazelnut, brown sugar, red apple. Balanced and smooth." },
  { src: "/images/showcase-3.svg", title: "Morning Light", copy: "Honey, stone fruit, citrus zest. Bright and sweet." },
  { src: "/images/showcase-4.svg", title: "Velvet Dark", copy: "Cocoa nibs, tobacco, black cherry. Syrupy and bold." },
  { src: "/images/showcase-5.svg", title: "Cascara Notes", copy: "Dried berries, hibiscus, panela. Lively natural process." },
  { src: "/images/showcase-6.svg", title: "Cocoa Finish", copy: "Baker’s chocolate, roasted almond, caramel. Comfort cup." },
];

export default function MarkShowcase() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const panels = gsap.utils.toArray<HTMLElement>("[data-panel]");
    const total = panels.length;

    const tween = gsap.to(track, {
      xPercent: -100 * (total - 1),
      ease: "none",
      scrollTrigger: {
        trigger: section,
        pin: true,
        scrub: 1,
        end: () => `+=${section.offsetWidth * (total - 1)}`,
        snap: 1 / (total - 1),
        onUpdate: (self) => {
          if (progressRef.current) {
            progressRef.current.style.transform = `scaleX(${self.progress})`;
          }
        },
      },
    });

    // Masked image reveal on enter viewport
    panels.forEach((p) => {
      const img = p.querySelector("img");
      const title = p.querySelector("[data-title]");
      const copy = p.querySelector("[data-copy]");
      if (!img) return;
      gsap.set(img, { clipPath: "inset(0 0 100% 0)", scale: 1.02 });
      gsap.to(img, {
        clipPath: "inset(0 0 0% 0)",
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: p,
          containerAnimation: tween,
          start: "left center",
        },
      });
      gsap.from(title, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: p, containerAnimation: tween, start: "left 70%" },
      });
      gsap.from(copy, {
        y: 20,
        opacity: 0,
        duration: 0.7,
        ease: "power2.out",
        delay: 0.05,
        scrollTrigger: { trigger: p, containerAnimation: tween, start: "left 65%" },
      });
    });

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <section ref={sectionRef} id="coffees" className="relative bg-black">
      <div className="container py-10 md:py-12">
        <h2 className="heading-display text-4xl md:text-6xl">Our Coffees</h2>
      </div>

      <div ref={trackRef} className="flex will-change-transform">
        {panels.map((p, i) => (
          <div
            key={i}
            data-panel
            className="w-screen h-[80vh] md:h-[88vh] shrink-0 relative flex items-end"
          >
            <div className="absolute inset-0">
              <Image src={p.src} alt={p.title} fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
            </div>
            <div className="relative z-10 p-6 md:p-10 w-full">
              <div className="max-w-xl">
                <div data-title className="heading-display text-4xl md:text-6xl">{p.title}</div>
                <p data-copy className="mt-3 md:mt-4 text-white/80 md:text-lg">{p.copy}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* progress bar */}
      <div className="absolute left-0 right-0 bottom-4 md:bottom-8 flex justify-center">
        <div className="h-1 w-64 md:w-96 bg-white/10 overflow-hidden rounded">
          <div ref={progressRef} className="h-full bg-primary origin-left" style={{ transform: "scaleX(0)" }} />
        </div>
      </div>
    </section>
  );
}
