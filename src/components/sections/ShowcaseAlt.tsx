"use client";
import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    title: "Source with Purpose",
    copy:
      "We partner with shade‑grown, single‑origin farms that prioritise biodiversity and fair livelihoods.",
    src: "/images/showcase-2.svg",
  },
  {
    title: "Roast for Flavour",
    copy:
      "Small‑batch profiles developed to highlight sweetness, clarity and distinctive terroir.",
    src: "/images/showcase-4.svg",
  },
  {
    title: "Brew Beautifully",
    copy:
      "Dialled‑in water, ratios and methods that bring every note to the cup.",
    src: "/images/showcase-6.svg",
  },
];

export default function ShowcaseAlt() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const imagesRef = useRef<HTMLDivElement | null>(null);
  const textsRef = useRef<HTMLDivElement | null>(null);
  const dotsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const images = imagesRef.current;
    const texts = textsRef.current;
    if (!section || !images || !texts) return;

    const imageEls = gsap.utils.toArray<HTMLElement>("[data-step-image]");
    const textEls = gsap.utils.toArray<HTMLElement>("[data-step-text]");
    const dots = gsap.utils.toArray<HTMLElement>("[data-dot]");

    // initial states
    gsap.set(imageEls, { opacity: 0, scale: 1.02 });
    gsap.set(textEls, { opacity: 0, y: 20 });
    if (imageEls[0]) gsap.set(imageEls[0], { opacity: 1, scale: 1 });
    if (textEls[0]) gsap.set(textEls[0], { opacity: 1, y: 0 });
    if (dots[0]) dots[0].classList.add("bg-primary");

    const tl = gsap.timeline({
      defaults: { ease: "power3.out", duration: 0.8 },
      scrollTrigger: {
        trigger: section,
        pin: true,
        scrub: 1,
        end: `+=${steps.length * 120}%`,
        onUpdate(self) {
          const i = Math.round(self.progress * (steps.length - 1));
          dots.forEach((d, idx) => d.classList.toggle("bg-primary", idx <= i));
        },
      },
    });

    steps.forEach((_, i) => {
      if (i === 0) return;
      tl.to(imageEls[i], { opacity: 1, scale: 1 }, ">-=0.1")
        .to(imageEls[i - 1], { opacity: 0, scale: 1.02 }, "<")
        .fromTo(textEls[i], { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, "<")
        .to(textEls[i - 1], { opacity: 0, y: -10, duration: 0.4 }, "<+0.2");
    });

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <section
      id="process"
      ref={sectionRef}
      className="relative overflow-hidden bg-[#0f1a14] border-t border-[#223126]"
    >
      {/* Decorative military‑green ambience */}
      <div
        className="absolute inset-0 pointer-events-none opacity-80"
        style={{
          background:
            "radial-gradient(800px circle at 15% 20%, rgba(255,255,255,0.06), transparent 60%), radial-gradient(600px circle at 85% 80%, rgba(255,255,255,0.04), transparent 60%)",
        }}
        aria-hidden
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.08) 1px, transparent 1px)",
          backgroundSize: "3px 3px",
          opacity: 0.04,
        }}
        aria-hidden
      />
      <div className="container grid lg:grid-cols-2 gap-8 items-center py-16 md:py-24">
        {/* Text column */}
        <div className="relative min-h-[50vh]" ref={textsRef}>
          {steps.map((s, i) => (
            <div key={i} data-step-text className="absolute inset-0 flex flex-col justify-center">
              <div className="heading-display text-4xl md:text-6xl">{s.title}</div>
              <p className="mt-4 text-white/80 md:text-lg max-w-md">{s.copy}</p>
            </div>
          ))}

          {/* progress dots */}
          <div ref={dotsRef} className="absolute left-0 bottom-0 flex gap-2 mt-6">
            {steps.map((_, i) => (
              <span key={i} data-dot className="h-1.5 w-8 rounded bg-white/20" />
            ))}
          </div>
        </div>

        {/* Image column */}
        <div className="relative h-[60vh] md:h-[70vh] rounded-xl overflow-hidden border border-white/15 shadow-[0_0_0_1px_rgba(255,255,255,0.04)_inset]" ref={imagesRef}>
          {steps.map((s, i) => (
            <div key={i} data-step-image className="absolute inset-0">
              <Image src={s.src} alt={s.title} fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f1a14]/70 via-transparent to-transparent" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
