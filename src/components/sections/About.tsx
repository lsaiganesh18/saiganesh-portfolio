import { useEffect, useRef, useState } from 'react';
import { useReveal } from '@/lib/hooks';

const keywords = [
  { text: 'USER EXPERIENCE', top: '8%', left: '5%', color: 'rgba(124,58,237,0.15)' },
  { text: 'PRODUCT THINKING', top: '22%', left: '55%', color: 'rgba(6,182,212,0.12)' },
  { text: 'VISUAL DESIGN', top: '55%', left: '12%', color: 'rgba(217,70,239,0.12)' },
  { text: 'PROBLEM SOLVING', top: '68%', left: '50%', color: 'rgba(249,115,22,0.10)' },
];

export function About() {
  const { ref, visible } = useReveal<HTMLDivElement>(0.2);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [headingScale, setHeadingScale] = useState(2.2);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = headingRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight;
        const progress = Math.max(0, Math.min(1, (vh - rect.top) / (vh + rect.height)));
        const scale = 2.2 - progress * 1.3;
        setHeadingScale(Math.max(1, scale));
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section ref={ref} id="about" className="relative min-h-screen flex flex-col justify-center px-6 sm:px-12 md:px-20 py-32 overflow-hidden">
      {/* gradient background lighting */}
      <div
        className="absolute top-1/4 left-0 w-[500px] h-[500px] rounded-full opacity-15 animate-drift-violet pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.3), transparent 70%)', filter: 'blur(40px)' }}
      />
      <div
        className="absolute bottom-1/4 right-0 w-[400px] h-[400px] rounded-full opacity-12 animate-drift-cyan pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.25), transparent 70%)', filter: 'blur(30px)' }}
      />

      {/* floating keywords */}
      {keywords.map((kw, i) => (
        <span
          key={kw.text}
          className="hidden lg:block absolute font-mono text-xs tracking-[0.2em] text-white/30 pointer-events-none select-none"
          style={{
            top: kw.top,
            left: kw.left,
            opacity: visible ? 0.5 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(30px)',
            transition: `opacity 1s ease ${0.8 + i * 0.2}s, transform 1s ease ${0.8 + i * 0.2}s`,
            animation: `float ${6 + i}s ease-in-out infinite`,
            animationDelay: `${i * 0.7}s`,
          }}
        >
          {kw.text}
        </span>
      ))}

      <div className="relative z-10 max-w-[1400px] mx-auto w-full">
        <div className={`reveal-blur ${visible ? 'is-visible' : ''}`}>
          <div className="font-mono text-xs tracking-[0.3em] text-[var(--text-dim)] mb-6">01 — ABOUT</div>
        </div>

        <h2
          ref={headingRef}
          className="font-display text-white origin-left"
          style={{
            fontSize: 'clamp(3rem, 12vw, 12rem)',
            transform: `scale(${headingScale})`,
            transformOrigin: 'left center',
            lineHeight: 0.9,
          }}
        >
          ABOUT ME
        </h2>

        <div className={`reveal ${visible ? 'is-visible' : ''} mt-12 max-w-3xl`}>
          <p className="text-xl sm:text-2xl md:text-3xl text-white/80 leading-relaxed text-balance">
            I'm L Saiganesh, a UI/UX and Product Designer with an engineering background.
            I enjoy turning complex problems into simple, intuitive and visually engaging digital experiences.
          </p>
        </div>

        {/* mobile keywords */}
        <div className={`stagger ${visible ? 'is-visible' : ''} mt-16 flex flex-wrap gap-4 lg:hidden`}>
          {keywords.map((kw) => (
            <div key={kw.text} className="px-5 py-3 border border-white/10 rounded-full glass">
              <span className="font-mono text-xs tracking-[0.15em] text-white/60">{kw.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
