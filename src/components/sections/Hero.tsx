"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const pRef = useRef<HTMLParagraphElement | null>(null);

  useEffect(() => {
    if (headingRef.current) {
      gsap.fromTo(
        headingRef.current,
        { y: 40, opacity: 0, scale: 0.98 },
        { y: 0, opacity: 1, scale: 1, duration: 0.9, ease: "power3.out" }
      );

      // Subtle parallax on scroll
      gsap.to(headingRef.current, {
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 70%",
          end: "bottom top",
          scrub: true,
        },
        yPercent: -8,
      });
    }
    if (pRef.current) {
      gsap.fromTo(
        pRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power2.out", delay: 0.15 }
      );
    }
  }, []);

  return (
    <section
      aria-label="Hero"
      className="relative min-h-[92vh] w-full flex items-center justify-center overflow-hidden"
    >
      <div
        className="absolute inset-0 bg-center bg-cover"
        style={{ backgroundImage: "url(/images/hero.svg)" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black" />

      <div className="relative container text-center pt-24 pb-16">
        <h1 ref={headingRef} className="heading-display texture relative text-[14vw] leading-none md:text-[150px] font-normal tracking-wide text-white">
          CLIMATE
          <br />
          COOLING
          <br />
          COFFEE
        </h1>
        <p ref={pRef} className="mt-8 max-w-3xl mx-auto text-white/80 text-sm md:text-base tracking-wide uppercase">
          Every cup of our coffee is a delight for the senses, a celebration of quality, and a force for good.
        </p>
      </div>
    </section>
  );
}
