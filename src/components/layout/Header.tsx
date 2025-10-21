"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Header() {
  const headerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;

    gsap.fromTo(
      el,
      { y: -30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" }
    );

    // Hide on fast scroll down, reveal on scroll up
    const st = ScrollTrigger.create({
      start: 0,
      onUpdate(self) {
        const hide = self.direction === 1 && self.scroll() > 120;
        gsap.to(el, { y: hide ? -80 : 0, duration: 0.25, ease: "power2.out" });
      },
    });
    return () => st.kill();
  }, []);

  return (
    <header ref={headerRef} className="fixed top-0 inset-x-0 z-50 bg-black/80 backdrop-blur supports-[backdrop-filter]:bg-black/60 border-b border-white/10">
      <div className="container h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/images/kaapilogo.png" alt="KAPPITALISM" width={258} height={58} />
          <span className="sr-only">Home</span>
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm tracking-wide uppercase text-white/80">
          <Link href="#oneness" className="hover:text-primary">Oneness Coffee</Link>
          <Link href="#coffees" className="hover:text-primary">Our Coffees</Link>
          <Link href="#values" className="hover:text-primary">Values</Link>
          <Link href="#process" className="hover:text-primary">Process</Link>
          <Link href="#academy" className="hover:text-primary">Coffee Academy</Link>
          <Link href="#csr" className="hover:text-primary">CSR</Link>
          <Link href="#journal" className="hover:text-primary">Journal</Link>
        </nav>
        <Link href="#request" className="hidden sm:inline-flex border border-primary text-primary hover:bg-primary/10 text-xs uppercase px-3 py-2 rounded">
          Request Coffee
        </Link>
      </div>
    </header>
  );
}
