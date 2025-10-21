"use client";
import { useEffect } from "react";
import gsap from "gsap";

export default function Spotlight() {
  useEffect(() => {
    const r = document.documentElement;

    const setSize = () => {
      const base = typeof window !== "undefined" && window.innerWidth < 768 ? 200 : 280;
      r.style.setProperty("--spot-size", `${base}px`);
    };
    setSize();
    window.addEventListener("resize", setSize);

    const qx = gsap.quickTo(r, "--spot-x", { duration: 0.25, ease: "power2.out" });
    const qy = gsap.quickTo(r, "--spot-y", { duration: 0.25, ease: "power2.out" });

    const move = (e: PointerEvent | MouseEvent) => {
      const x = (e as PointerEvent).clientX ?? 0;
      const y = (e as PointerEvent).clientY ?? 0;
      qx(x);
      qy(y);
    };

    window.addEventListener("pointermove", move);

    // Start off-canvas until the first interaction
    r.style.setProperty("--spot-x", "-200px");
    r.style.setProperty("--spot-y", "-200px");

    return () => {
      window.removeEventListener("resize", setSize);
      window.removeEventListener("pointermove", move);
    };
  }, []);

  return <div className="spotlight-layer" aria-hidden />;
}

