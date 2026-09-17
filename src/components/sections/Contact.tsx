import { useEffect, useRef, useState } from 'react';
import { useReveal } from '@/lib/hooks';
import { Magnetic } from '@/components/Magnetic';

export function Contact() {
  const { ref, visible } = useReveal<HTMLDivElement>(0.1);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [headingScale, setHeadingScale] = useState(0.6);
  const particlesRef = useRef<HTMLDivElement>(null);

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
        // small -> huge -> slightly smaller
        const scale = 0.6 + Math.sin(progress * Math.PI) * 0.5;
        setHeadingScale(scale);
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  // particles
  useEffect(() => {
    const container = particlesRef.current;
    if (!container) return;
    const count = 35;
    const particles: HTMLDivElement[] = [];
    const colors = ['rgba(245,245,243,0.4)', 'rgba(124,58,237,0.3)', 'rgba(6,182,212,0.3)', 'rgba(217,70,239,0.2)'];
    for (let i = 0; i < count; i++) {
      const p = document.createElement('div');
      const size = 1 + Math.random() * 2;
      p.style.cssText = `position:absolute;width:${size}px;height:${size}px;border-radius:50%;background:${colors[i % colors.length]};left:${Math.random() * 100}%;bottom:-10px;animation:particleRise ${8 + Math.random() * 14}s linear infinite;animation-delay:${Math.random() * 10}s;`;
      container.appendChild(p);
      particles.push(p);
    }
    return () => particles.forEach((p) => p.remove());
  }, []);

  return (
    <section ref={ref} id="contact" className="relative min-h-screen flex flex-col items-center justify-center px-6 sm:px-12 overflow-hidden">
      {/* particles */}
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none z-0" />

      {/* ambient gradient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full pointer-events-none z-0 animate-pulse-glow"
        style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.08), rgba(6,182,212,0.05) 40%, transparent 70%)', filter: 'blur(40px)', opacity: visible ? 0.8 : 0, transition: 'opacity 2s ease' }}
      />

      <div className="relative z-10 text-center max-w-4xl mx-auto">
        <div className={`reveal-blur ${visible ? 'is-visible' : ''} mb-4`}>
          <div className="font-mono text-xs tracking-[0.3em] text-[var(--text-dim)]">06 — CONTACT</div>
        </div>

        <h2
          ref={headingRef}
          className="font-display text-white origin-center"
          style={{
            fontSize: 'clamp(2.8rem, 11vw, 10rem)',
            lineHeight: 0.9,
            transform: `scale(${headingScale})`,
            opacity: visible ? 1 : 0,
            transition: 'opacity 1.5s ease',
          }}
        >
          LET'S CREATE<br />
          <span className="gradient-text">SOMETHING GREAT.</span>
        </h2>

        <div
          className="mt-12 space-y-2"
          style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(30px)', transition: 'opacity 1s ease 0.5s, transform 1s ease 0.5s' }}
        >
          <p className="text-2xl sm:text-3xl text-white font-light">L Saiganesh</p>
          <p className="text-base sm:text-lg text-[var(--text-dim)]">UI/UX & Product Designer</p>
        </div>

        <div
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          style={{ opacity: visible ? 1 : 0, transition: 'opacity 1s ease 0.8s' }}
        >
          <Magnetic href="mailto:sail934630@gmail.com" className="magnetic">
            sail934630@gmail.com
          </Magnetic>
          <Magnetic href="tel:9346304140" className="magnetic">
            9346304140
          </Magnetic>
        </div>

        <div
          className="mt-16"
          style={{ opacity: visible ? 1 : 0, transition: 'opacity 1s ease 1.1s' }}
        >
          <Magnetic href="mailto:sail934630@gmail.com?subject=Project%20Inquiry" className="magnetic" strength={0.4}>
            START A PROJECT
            <span className="arrow">→</span>
          </Magnetic>
        </div>
      </div>

      {/* footer */}
      <footer
        className="absolute bottom-0 left-0 right-0 py-8 px-6 sm:px-12 flex flex-col sm:flex-row justify-between items-center gap-4 border-t border-white/5"
        style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(20px)', transition: 'opacity 1s ease 1.4s, transform 1s ease 1.4s' }}
      >
        <div className="text-center sm:text-left">
          <p className="font-display text-sm text-white tracking-tight">L SAI GANESH</p>
          <p className="font-mono text-[10px] text-[var(--text-dim)] tracking-widest mt-1">UI/UX & PRODUCT DESIGNER</p>
        </div>
        <p className="font-mono text-[10px] text-[var(--text-dim)] tracking-widest">
          © 2026 L SAI GANESH
        </p>
      </footer>
    </section>
  );
}
