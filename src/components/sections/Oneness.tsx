"use client";
import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Oneness() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const heading1Ref = useRef<HTMLHeadingElement | null>(null);
  const heading2Ref = useRef<HTMLHeadingElement | null>(null);
  const pRef = useRef<HTMLParagraphElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const isDev = process.env.NODE_ENV === "development";

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (heading1Ref.current)
        gsap.from(heading1Ref.current, {
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
          y: 40,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        });
      if (heading2Ref.current)
        gsap.from(heading2Ref.current, {
          scrollTrigger: { trigger: heading2Ref.current, start: "top 85%" },
          y: 30,
          opacity: 0,
          duration: 0.75,
          ease: "power3.out",
          delay: 0.05,
        });
      if (pRef.current)
        gsap.from(pRef.current, {
          scrollTrigger: { trigger: pRef.current, start: "top 85%" },
          y: 20,
          opacity: 0,
          duration: 0.7,
          ease: "power2.out",
          delay: 0.1,
        });

      // Floating cherries
      gsap.to("[data-cherry]", {
        y: (i) => (i % 2 === 0 ? 8 : -8),
        rotate: (i) => (i % 2 === 0 ? 4 : -4),
        duration: 3,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        stagger: 0.4,
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // Try to auto-play when the section is in view; browsers may pause otherwise
  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            el.play().catch(() => {});
          } else {
            el.pause();
          }
        });
      },
      { threshold: 0.05 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="oneness" className="relative bg-black py-24 md:py-36 overflow-hidden">
      <video
        ref={videoRef}
        className="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover will-change-transform"
        style={{ transform: "translateZ(0)", filter: "contrast(1.15) saturate(1.12) brightness(1.04)" }}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden
        poster="/images/hero.svg"
        controls={isDev}
        onLoadedData={(e) => (e.currentTarget as HTMLVideoElement).play().catch(() => {})}
      >
        <source src="/video/particles-video.mov" />
      </video>
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background: [
            // warm coffee-brown tint across the frame
            "linear-gradient(to top, rgba(32,24,18,0.55) 0%, rgba(32,24,18,0.22) 35%, rgba(32,24,18,0.12) 55%, rgba(32,24,18,0.26) 100%)",
            // subtle radial coffee glow at center
            "radial-gradient(60% 60% at 50% 55%, rgba(139,94,52,0.20), rgba(139,94,52,0.00) 70%)",
          ].join(",")
        }}
        aria-hidden
      />
      <div className="relative z-20 container text-center">
        <div className="pointer-events-none select-none" aria-hidden>
          <Image data-cherry className="hidden md:block absolute left-8 -top-6 rotate-12 opacity-90" src="/images/cherry-1.svg" alt="" width={54} height={54} />
          <Image data-cherry className="hidden md:block absolute right-16 top-10 -rotate-12 opacity-90" src="/images/cherry-2.svg" alt="" width={64} height={64} />
          <Image data-cherry className="hidden md:block absolute left-1/3 top-20 opacity-80" src="/images/cherry-3.svg" alt="" width={36} height={36} />
        </div>

        <h2 ref={heading1Ref} className="heading-display text-[12vw] md:text-[110px] leading-none tracking-wide">
          ONENESS COFFEE
        </h2>
        <h3 ref={heading2Ref} className="heading-display text-[8vw] md:text-[72px] leading-none tracking-wide mt-2 text-white/90">
          BREWING A BETTER FUTURE
        </h3>

        <p ref={pRef} className="mt-8 max-w-4xl mx-auto text-white/80 md:text-lg">
          Most of humanity is in a deep slumber. People are ignorant of our negative impact on mother nature.
          We believe that awakening ourselves to the harmony in nature is the way to connect with the source of oneness embedded in and around us.
          We hope our coffee beans become instrumental in your journey to taste infinity.
        </p>

        <div className="mt-12">
          <a href="#oneness-coffee" className="inline-flex items-center gap-2 uppercase text-sm border border-primary text-primary hover:bg-primary/10 px-6 py-3 rounded">
            Explore Oneness Coffee →
          </a>
        </div>
      </div>
    </section>
  );
}
