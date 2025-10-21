export default function Ticker() {
  const text = "KAPPITALISM COFFEE • CLIMATE COOLING • SINGLE‑ORIGIN • SHADE‑GROWN • ROASTED WITH CARE • ";
  return (
    <section aria-label="Coffee marquee" className="relative bg-black border-t border-b border-white/10 py-4 overflow-hidden">
      <div className="mask-fade pointer-events-none absolute inset-0" aria-hidden />
      <div className="marquee whitespace-nowrap will-change-transform">
        <span className="heading-display text-3xl sm:text-5xl md:text-6xl tracking-wider text-primary/90 mx-6">
          {text}
        </span>
        <span className="heading-display text-3xl sm:text-5xl md:text-6xl tracking-wider text-primary/90 mx-6">
          {text}
        </span>
        <span className="heading-display text-3xl sm:text-5xl md:text-6xl tracking-wider text-primary/90 mx-6">
          {text}
        </span>
      </div>
    </section>
  );
}

