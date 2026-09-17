import { useEffect, useRef, useState } from 'react';

const disciplines = ['UI/UX DESIGN', 'PRODUCT DESIGN', 'WEB DESIGN', 'MOBILE APP DESIGN'];
const statementLines = ['Designing digital experiences', 'that feel simple,', 'useful & memorable.'];

export function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setScrollY(window.scrollY));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    let raf = 0;
    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const x = (e.clientX / window.innerWidth - 0.5) * 2;
        const y = (e.clientY / window.innerHeight - 0.5) * 2;
        setMouseX(x);
        setMouseY(y);
      });
    };
    window.addEventListener('mousemove', onMove);
    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  const titleScale = Math.max(0.82, 1 - scrollY / 2400);
  const titleOpacity = Math.max(0, 1 - scrollY / 700);
  const titleBlur = Math.min(8, scrollY / 80);
  const bgOpacity = Math.max(0, 1 - scrollY / 900);
  const orbY = scrollY * 0.25;
  const orbRotate = scrollY * 0.05;
  const orbMouseX = mouseX * 30;
  const orbMouseY = mouseY * 30;

  return (
    <section ref={heroRef} className="relative min-h-screen flex flex-col justify-center overflow-hidden noise" id="hero">
      {/* animated 3D abstract background */}
      <div className="absolute inset-0 z-0" style={{ opacity: bgOpacity }}>
        {/* main morphing gradient orb with mouse parallax */}
        <div
          ref={orbRef}
          className="absolute top-1/2 left-1/2"
          style={{
            transform: `translate(calc(-50% + ${orbMouseX}px), calc(-50% + ${orbY + orbMouseY}px)) rotate(${orbRotate}deg)`,
            transition: 'transform 0.6s cubic-bezier(0.22,1,0.36,1)',
          }}
        >
          <div
            className="w-[600px] h-[600px] sm:w-[700px] sm:h-[700px] animate-orb-morph opacity-40"
            style={{
              background: 'radial-gradient(circle at 35% 35%, rgba(124,58,237,0.35), rgba(37,99,235,0.2) 40%, transparent 70%)',
              filter: 'blur(30px)',
            }}
          />
          <div
            className="absolute top-10 right-0 w-[400px] h-[400px] animate-drift-cyan opacity-30"
            style={{
              background: 'radial-gradient(circle, rgba(6,182,212,0.25), transparent 65%)',
              filter: 'blur(25px)',
            }}
          />
          <div
            className="absolute bottom-0 left-10 w-[350px] h-[350px] animate-drift-violet opacity-25"
            style={{
              background: 'radial-gradient(circle, rgba(217,70,239,0.2), transparent 65%)',
              filter: 'blur(20px)',
            }}
          />
        </div>

        {/* rotating rings */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-white/[0.03] animate-spin-slow" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full border border-white/[0.04] animate-spin-slow" style={{ animationDirection: 'reverse', animationDuration: '50s' }} />

        {/* grid lines */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        />
      </div>

      {/* content */}
      <div className="relative z-10 px-6 sm:px-12 md:px-20 max-w-[1400px] mx-auto w-full">
        <div
          className="font-mono text-xs tracking-[0.3em] text-[var(--text-dim)] mb-8"
          style={{ opacity: titleOpacity }}
        >
          PORTFOLIO — 2026
        </div>

        {/* masked text reveal */}
        <h1
          className="font-display text-[18vw] sm:text-[16vw] md:text-[13vw] leading-[0.85] text-white"
          style={{
            transform: `scale(${titleScale})`,
            transformOrigin: 'left center',
            opacity: titleOpacity,
            filter: `blur(${titleBlur}px)`,
            transition: 'filter 0.1s linear',
          }}
        >
          <span className="mask-reveal is-visible"><span style={{ transitionDelay: '0.2s' }}>L SAI</span></span>
          <br />
          <span className="mask-reveal is-visible"><span style={{ transitionDelay: '0.5s' }}>GANesh</span></span>
        </h1>

        {/* multi-line statement with individual reveal */}
        <div className="mt-10 max-w-2xl">
          {statementLines.map((line, i) => (
            <p
              key={i}
              className="text-lg sm:text-xl md:text-2xl text-[var(--text-dim)] leading-relaxed"
              style={{
                opacity: titleOpacity,
                transform: `translateY(${scrollY * -0.05 + (1 - titleOpacity) * 20}px)`,
                animation: `fadeUp 0.8s cubic-bezier(0.22,1,0.36,1) both`,
                animationDelay: `${1.5 + i * 0.15}s`,
              }}
            >
              {line}
            </p>
          ))}
        </div>

        {/* disciplines */}
        <div className="mt-16 flex flex-wrap gap-x-8 gap-y-3">
          {disciplines.map((d, i) => (
            <span
              key={d}
              className="font-mono text-xs sm:text-sm tracking-[0.2em] text-white/70 border-l border-white/20 pl-3"
              style={{
                animation: `fadeUp 0.8s cubic-bezier(0.22,1,0.36,1) both`,
                animationDelay: `${2 + i * 0.15}s`,
              }}
            >
              {d}
            </span>
          ))}
        </div>
      </div>

      {/* scroll indicator */}
      <div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        style={{ opacity: titleOpacity }}
      >
        <span className="font-mono text-[10px] tracking-[0.3em] text-[var(--text-dim)]">SCROLL</span>
        <div className="w-px h-12 bg-gradient-to-b from-white/40 to-transparent" />
      </div>
    </section>
  );
}
