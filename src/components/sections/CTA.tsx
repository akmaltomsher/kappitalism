export default function CTA() {
  return (
    <section id="request" className="relative py-20 md:py-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary-800 via-primary-700 to-primary-800 opacity-60" />
      <div className="absolute inset-0 mix-blend-overlay opacity-20" style={{backgroundImage:"radial-gradient(white 1px, transparent 1px)", backgroundSize:"6px 6px"}} />
      <div className="container relative text-center">
        <h2 className="heading-display text-4xl md:text-6xl">Brew With KAPPITALISM</h2>
        <p className="mt-4 text-white/85 max-w-2xl mx-auto">From farm to cup, our coffees are curated for flavor and climate impact. Request samples or start a wholesale conversation.</p>
        <a href="#" className="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded border border-white/50 hover:bg-white/10 uppercase text-sm">Request Coffee</a>
      </div>
    </section>
  );
}

