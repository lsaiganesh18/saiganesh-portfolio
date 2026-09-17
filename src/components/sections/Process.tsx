import { useEffect, useRef, useState } from 'react';
import { useReveal } from '@/lib/hooks';

const stages = [
  { num: '01', title: 'UNDERSTAND', desc: 'Listen, learn and define the core problem space.' },
  { num: '02', title: 'RESEARCH', desc: 'Gather insights, study users and analyze competitors.' },
  { num: '03', title: 'DEFINE', desc: 'Synthesize findings into clear goals and scope.' },
  { num: '04', title: 'DESIGN', desc: 'Craft layouts, flows and visual systems.' },
  { num: '05', title: 'PROTOTYPE', desc: 'Build interactive, testable experiences.' },
  { num: '06', title: 'REFINE', desc: 'Iterate on feedback and polish every detail.' },
];

const stageColors = ['#7c3aed', '#2563eb', '#06b6d4', '#d946ef', '#ec4899', '#f97316'];

export function Process() {
  const { ref, visible } = useReveal<HTMLDivElement>(0.1);
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStage, setActiveStage] = useState(-1);
  const [lineProgress, setLineProgress] = useState(0);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = containerRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight;
        const progress = Math.max(0, Math.min(1, (vh * 0.7 - rect.top) / rect.height));
        setLineProgress(progress);
        const stageWidth = 1 / stages.length;
        const active = Math.min(stages.length - 1, Math.floor(progress / stageWidth));
        setActiveStage(progress > 0 && progress < 1 ? active : -1);
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
    <section ref={ref} id="process" className="relative py-32 overflow-hidden">
      {/* gradient backdrop */}
      <div
        className="absolute top-0 right-1/4 w-[500px] h-[500px] rounded-full opacity-10 animate-drift-cyan pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.3), transparent 70%)', filter: 'blur(40px)' }}
      />

      <div className="max-w-[1400px] mx-auto w-full px-6 sm:px-12 md:px-20">
        <div className={`reveal-blur ${visible ? 'is-visible' : ''} mb-20`}>
          <div className="font-mono text-xs tracking-[0.3em] text-[var(--text-dim)] mb-6">04 — PROCESS</div>
          <h2 className="font-display text-white" style={{ fontSize: 'clamp(3rem, 10vw, 9rem)', lineHeight: 0.9 }}>
            HOW I DESIGN
          </h2>
        </div>
      </div>

      {/* horizontal timeline */}
      <div ref={containerRef} className="relative overflow-x-auto pb-8" style={{ scrollbarWidth: 'thin' }}>
        <div className="flex gap-0 min-w-max px-6 sm:px-12 md:px-20 relative">
          {/* base line */}
          <div className="absolute top-[60px] left-0 right-0 h-px bg-white/10" />
          {/* gradient progress line */}
          <div
            className="absolute top-[60px] left-0 h-px"
            style={{
              width: `${lineProgress * 100}%`,
              background: 'linear-gradient(90deg, #7c3aed, #2563eb, #06b6d4, #d946ef, #ec4899, #f97316)',
              boxShadow: '0 0 15px rgba(124,58,237,0.4)',
              transition: 'width 0.1s linear',
            }}
          />
          {/* travelling light dot */}
          {lineProgress > 0 && lineProgress < 1 && (
            <div
              className="absolute top-[60px] w-3 h-3 rounded-full -translate-y-1/2 -translate-x-1/2"
              style={{
                left: `${lineProgress * 100}%`,
                background: '#fff',
                boxShadow: '0 0 20px rgba(255,255,255,0.6), 0 0 40px rgba(124,58,237,0.4)',
                transition: 'left 0.1s linear',
              }}
            />
          )}

          {stages.map((s, i) => (
            <div
              key={s.num}
              className="relative w-[260px] sm:w-[320px] flex-shrink-0 pr-8"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(40px)',
                transition: `opacity 0.8s ease ${i * 0.12}s, transform 0.8s cubic-bezier(0.22,1,0.36,1) ${i * 0.12}s`,
              }}
            >
              {/* node with glow */}
              <div className="relative flex items-center mb-8" style={{ height: '40px' }}>
                <div
                  className="w-3 h-3 rounded-full relative z-10 transition-all duration-500"
                  style={{
                    background: stageColors[i],
                    boxShadow: activeStage >= i ? `0 0 25px ${stageColors[i]}, 0 0 50px ${stageColors[i]}60` : `0 0 10px ${stageColors[i]}40`,
                    transform: activeStage === i ? 'scale(1.4)' : 'scale(1)',
                  }}
                />
              </div>
              <div
                className="font-mono text-xs mb-2 transition-colors duration-500"
                style={{ color: activeStage >= i ? stageColors[i] : `${stageColors[i]}80` }}
              >
                {s.num}
              </div>
              <h3
                className="font-display text-2xl sm:text-3xl mb-3 transition-all duration-500"
                style={{ color: activeStage >= i ? '#fff' : 'rgba(255,255,255,0.4)' }}
              >
                {s.title}
              </h3>
              <p
                className="text-sm leading-relaxed transition-colors duration-500"
                style={{ color: activeStage >= i ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.3)' }}
              >
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
