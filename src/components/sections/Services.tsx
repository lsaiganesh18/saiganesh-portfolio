import { useReveal } from '@/lib/hooks';

const services = [
  { name: 'UI/UX Design', color: 'rgba(124,58,237,0.12)' },
  { name: 'Mobile App Design', color: 'rgba(6,182,212,0.12)' },
  { name: 'Website Design', color: 'rgba(37,99,235,0.12)' },
  { name: 'Product Design', color: 'rgba(217,70,239,0.12)' },
  { name: 'Wireframing', color: 'rgba(236,72,153,0.12)' },
  { name: 'Prototyping', color: 'rgba(249,115,22,0.12)' },
  { name: 'Responsive Design', color: 'rgba(124,58,237,0.12)' },
  { name: 'Design Systems', color: 'rgba(6,182,212,0.12)' },
];

export function Services() {
  const { ref, visible } = useReveal<HTMLDivElement>(0.05);

  return (
    <section ref={ref} id="services" className="relative py-32 overflow-hidden">
      {/* gradient backdrop */}
      <div
        className="absolute bottom-0 left-1/4 w-[600px] h-[600px] rounded-full opacity-8 animate-drift-violet pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.25), transparent 70%)', filter: 'blur(50px)' }}
      />

      <div className="max-w-[1400px] mx-auto w-full px-6 sm:px-12 md:px-20">
        <div className={`reveal-blur ${visible ? 'is-visible' : ''} mb-16`}>
          <div className="font-mono text-xs tracking-[0.3em] text-[var(--text-dim)] mb-6">05 — SERVICES</div>
          <h2 className="font-display text-white" style={{ fontSize: 'clamp(3rem, 10vw, 9rem)', lineHeight: 0.9 }}>
            WHAT I DO
          </h2>
        </div>

        <div className="border-t border-white/10">
          {services.map((s, i) => (
            <div
              key={s.name}
              className="service-row group relative border-b border-white/10 overflow-hidden"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateX(0)' : 'translateX(-40px)',
                transition: `opacity 0.7s ease ${i * 0.08}s, transform 0.7s cubic-bezier(0.22,1,0.36,1) ${i * 0.08}s`,
              }}
            >
              <div className="service-glow" style={{ background: `linear-gradient(90deg, transparent, ${s.color}, transparent)` }} />
              <div className="relative flex items-center justify-between py-6 sm:py-8 cursor-default transition-all duration-500 group-hover:px-6">
                <div className="flex items-center gap-6">
                  <span className="font-mono text-xs text-white/30 group-hover:text-white/60 transition-colors duration-500">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span
                    className="font-display text-white/80 group-hover:text-white transition-all duration-500 group-hover:scale-105 origin-left"
                    style={{ fontSize: 'clamp(1.8rem, 5vw, 4rem)' }}
                  >
                    {s.name}
                  </span>
                </div>
                <span className="text-white/20 group-hover:text-white/60 group-hover:translate-x-3 transition-all duration-500 text-2xl">
                  →
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
