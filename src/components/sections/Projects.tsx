import { useEffect, useRef, useState } from 'react';
import { useReveal } from '@/lib/hooks';
import { PhoneMockup } from '@/components/PhoneMockup';
import { DesktopMockup } from '@/components/DesktopMockup';

interface Project {
  num: string;
  title: string;
  category: string;
  description: string;
  mockup: 'phone-tripmate' | 'phone-crave' | 'desktop-sais';
  accent: string;
  glow1: string;
  glow2: string;
}

const projects: Project[] = [
  {
    num: '01',
    title: 'TRIPMATE',
    category: 'Travel Mobile App',
    description: 'A modern travel companion designed to help users discover destinations, plan trips, manage budgets and access useful travel information.',
    mockup: 'phone-tripmate',
    accent: '#7c3aed',
    glow1: 'rgba(124,58,237,0.18)',
    glow2: 'rgba(37,99,235,0.12)',
  },
  {
    num: '02',
    title: 'CRAVE GUN',
    category: 'Food Ordering Mobile App',
    description: 'A modern food ordering experience focused on simple navigation, attractive food discovery and a smooth ordering journey.',
    mockup: 'phone-crave',
    accent: '#f97316',
    glow1: 'rgba(249,115,22,0.18)',
    glow2: 'rgba(236,72,153,0.12)',
  },
  {
    num: '03',
    title: "SAI'S KITCHEN",
    category: 'Restaurant Website',
    description: "A modern restaurant website concept with food discovery, today's specials, ratings, reviews and detailed menu information.",
    mockup: 'desktop-sais',
    accent: '#06b6d4',
    glow1: 'rgba(6,182,212,0.15)',
    glow2: 'rgba(124,58,237,0.10)',
  },
];

export function Projects() {
  const { ref, visible } = useReveal<HTMLDivElement>(0.05);

  return (
    <section ref={ref} id="work" className="relative py-32 overflow-hidden">
      <div className="max-w-[1400px] mx-auto w-full px-6 sm:px-12 md:px-20">
        <div className={`reveal-blur ${visible ? 'is-visible' : ''} mb-24`}>
          <div className="font-mono text-xs tracking-[0.3em] text-[var(--text-dim)] mb-6">03 — SELECTED WORK</div>
          <h2 className="font-display text-white" style={{ fontSize: 'clamp(3rem, 10vw, 9rem)', lineHeight: 0.9 }}>
            SELECTED WORK
          </h2>
        </div>
      </div>

      <div className="space-y-0">
        {projects.map((p, i) => (
          <ProjectBlock key={p.num} project={p} index={i} />
        ))}
      </div>
    </section>
  );
}

function ProjectBlock({ project, index }: { project: Project; index: number }) {
  const { ref, visible } = useReveal<HTMLDivElement>(0.15);
  const numRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const sweepRef = useRef<HTMLDivElement>(null);
  const [numScale, setNumScale] = useState(1.4);
  const [numOpacity, setNumOpacity] = useState(0.06);
  const isDesktop = project.mockup === 'desktop-sais';
  const isReversed = index % 2 === 1;

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = numRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight;
        const center = rect.top + rect.height / 2;
        const dist = Math.abs(vh / 2 - center);
        const closeness = Math.max(0, 1 - dist / (vh * 0.6));
        setNumScale(1 + closeness * 0.3);
        setNumOpacity(0.05 + closeness * 0.08);
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
    const count = 12;
    const particles: HTMLDivElement[] = [];
    for (let i = 0; i < count; i++) {
      const p = document.createElement('div');
      const size = 1 + Math.random() * 2;
      p.style.cssText = `position:absolute;width:${size}px;height:${size}px;border-radius:50%;background:${project.accent};left:${Math.random() * 100}%;bottom:-10px;opacity:${0.2 + Math.random() * 0.3};animation:particleRise ${10 + Math.random() * 10}s linear infinite;animation-delay:${Math.random() * 8}s;`;
      container.appendChild(p);
      particles.push(p);
    }
    return () => particles.forEach((p) => p.remove());
  }, [project.accent]);

  // trigger light sweep when visible
  useEffect(() => {
    if (visible && sweepRef.current) {
      const timer = setTimeout(() => {
        if (sweepRef.current) sweepRef.current.classList.add('active');
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [visible]);

  return (
    <div ref={ref} className="relative min-h-screen flex items-center overflow-hidden border-t border-white/5" data-project={project.num}>
      {/* big number background */}
      <div
        ref={numRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-display text-white pointer-events-none select-none z-0"
        style={{
          fontSize: 'clamp(14rem, 40vw, 32rem)',
          opacity: numOpacity,
          transform: `translate(-50%, -50%) scale(${numScale})`,
          transition: 'opacity 0.3s ease, transform 0.3s ease',
        }}
      >
        {project.num}
      </div>

      {/* ambient project glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none z-0 animate-pulse-glow"
        style={{ background: `radial-gradient(circle, ${project.glow1}, transparent 65%)`, filter: 'blur(40px)', opacity: visible ? 0.6 : 0, transition: 'opacity 2s ease' }}
      />
      <div
        className="absolute top-1/3 right-0 w-[400px] h-[400px] rounded-full pointer-events-none z-0 animate-drift-cyan"
        style={{ background: `radial-gradient(circle, ${project.glow2}, transparent 70%)`, filter: 'blur(30px)' }}
      />

      {/* particles */}
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none z-0" />

      {/* light streak */}
      {visible && (
        <div
          className="light-streak"
          style={{ animation: `lightStreak 6s ease-in-out infinite ${index * 2}s`, background: `linear-gradient(90deg, transparent, ${project.glow1}, transparent)` }}
        />
      )}

      {/* project light sweep */}
      <div ref={sweepRef} className="project-sweep" />

      <div className="relative z-10 max-w-[1400px] mx-auto w-full px-6 sm:px-12 md:px-20 py-20">
        <div className={`flex flex-col ${isDesktop ? 'lg:flex-col' : 'lg:flex-row'} ${isReversed && !isDesktop ? 'lg:flex-row-reverse' : ''} items-center gap-12 lg:gap-20`}>
          {/* mockup */}
          <div
            className={`flex-shrink-0 ${visible ? 'opacity-100 translate-x-0 blur-fade is-visible' : 'opacity-0 ' + (isReversed ? '-translate-x-16' : 'translate-x-16')}`}
            style={{ transition: 'opacity 1.2s cubic-bezier(0.22,1,0.36,1), transform 1.2s cubic-bezier(0.22,1,0.36,1), filter 1s ease' }}
          >
            {project.mockup === 'phone-tripmate' && <PhoneMockup variant="tripmate" />}
            {project.mockup === 'phone-crave' && <PhoneMockup variant="crave" />}
            {project.mockup === 'desktop-sais' && <DesktopMockup variant="sais-kitchen" />}
          </div>

          {/* text */}
          <div className="flex-1">
            <div
              className="font-mono text-xs tracking-[0.3em] mb-4"
              style={{ color: project.accent, opacity: visible ? 1 : 0, transition: 'opacity 0.8s ease 0.3s' }}
            >
              {project.category}
            </div>
            <h3
              className="font-display text-white mb-6"
              style={{
                fontSize: 'clamp(2.5rem, 7vw, 6rem)',
                lineHeight: 0.9,
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(40px)',
                filter: visible ? 'blur(0)' : 'blur(10px)',
                transition: 'opacity 1s ease 0.4s, transform 1s cubic-bezier(0.22,1,0.36,1) 0.4s, filter 1s ease 0.4s',
              }}
            >
              {project.title}
            </h3>
            <p
              className="text-lg sm:text-xl text-white/60 leading-relaxed max-w-xl"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(30px)',
                transition: 'opacity 1s ease 0.6s, transform 1s ease 0.6s',
              }}
            >
              {project.description}
            </p>
            <div
              className="mt-8 flex items-center gap-3"
              style={{ opacity: visible ? 1 : 0, transition: 'opacity 1s ease 0.8s' }}
            >
              <div className="h-px w-12" style={{ background: project.accent }} />
              <span className="font-mono text-xs tracking-[0.2em] text-white/50">CASE STUDY</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
