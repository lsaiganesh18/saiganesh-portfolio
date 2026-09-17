import { useEffect, useRef, useState } from 'react';
import { useReveal } from '@/lib/hooks';

export function CreativeInterlude() {
  const { ref, visible } = useReveal<HTMLDivElement>(0.2);
  const orbRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = orbRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight;
        const progress = Math.max(0, Math.min(1, (vh - rect.top) / (vh + rect.height)));
        setScrollProgress(progress);
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const line1Opacity = Math.min(1, scrollProgress * 3);
  const line2Opacity = Math.max(0, Math.min(1, (scrollProgress - 0.4) * 3));
  const line1Scale = 0.9 + line1Opacity * 0.1;
  const line2Scale = 0.7 + line2Opacity * 0.3;
  const orbScale = 0.8 + scrollProgress * 0.4;
  const orbRotate = scrollProgress * 180;

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden px-6">
      {/* abstract 3D gradient object */}
      <div ref={orbRef} className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <div
          className="w-[500px] h-[500px] sm:w-[700px] sm:h-[700px] animate-orb-morph opacity-30"
          style={{
            transform: `scale(${orbScale}) rotate(${orbRotate}deg)`,
            background: 'radial-gradient(circle at 30% 30%, rgba(124,58,237,0.3), rgba(37,99,235,0.2) 35%, rgba(6,182,212,0.15) 60%, transparent 80%)',
            filter: 'blur(30px)',
          }}
        />
        <div
          className="absolute w-[300px] h-[300px] animate-drift-cyan opacity-20"
          style={{ background: 'radial-gradient(circle, rgba(217,70,239,0.25), transparent 70%)', filter: 'blur(25px)' }}
        />
      </div>

      <div className="relative z-10 text-center max-w-5xl mx-auto">
        {/* first statement - enters slowly */}
        <div
          className="font-display text-white"
          style={{
            fontSize: 'clamp(2.5rem, 10vw, 9rem)',
            lineHeight: 0.9,
            opacity: visible ? line1Opacity : 0,
            transform: visible ? `translateY(${(1 - line1Opacity) * 30}px) scale(${line1Scale})` : 'translateY(30px) scale(0.9)',
            transition: 'opacity 0.8s ease, transform 0.8s ease',
          }}
        >
          DESIGN IS NOT<br />JUST HOW IT LOOKS.
        </div>

        {/* second statement - stronger scale animation */}
        <div
          className="font-display mt-8"
          style={{
            fontSize: 'clamp(2.5rem, 10vw, 9rem)',
            lineHeight: 0.9,
            opacity: visible ? line2Opacity : 0,
            transform: visible ? `translateY(${(1 - line2Opacity) * 40}px) scale(${line2Scale})` : 'translateY(40px) scale(0.7)',
            transition: 'opacity 0.8s ease, transform 1s cubic-bezier(0.22,1,0.36,1)',
          }}
        >
          <span className="gradient-text-cyan">IT'S HOW</span><br />
          <span className="gradient-text-warm">IT FEELS.</span>
        </div>
      </div>
    </section>
  );
}
