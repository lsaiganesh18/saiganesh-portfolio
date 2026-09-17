import { useEffect, useState } from 'react';

interface IntroLoaderProps {
  onComplete: () => void;
}

export function IntroLoader({ onComplete }: IntroLoaderProps) {
  const [phase, setPhase] = useState<'name' | 'role' | 'zoom' | 'done'>('name');

  useEffect(() => {
    const timers: number[] = [];
    timers.push(window.setTimeout(() => setPhase('role'), 1800));
    timers.push(window.setTimeout(() => setPhase('zoom'), 3400));
    timers.push(window.setTimeout(() => setPhase('done'), 4100));
    timers.push(window.setTimeout(() => onComplete(), 4600));
    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  if (phase === 'done') return null;

  const nameLetters = 'L SAI GANESH'.split('');
  const roleLetters = 'UI/UX & PRODUCT DESIGNER'.split('');

  return (
    <div
      className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-black overflow-hidden"
      style={{
        transition: 'transform 0.8s cubic-bezier(0.76,0,0.24,1), opacity 0.6s ease',
        transform: phase === 'zoom' ? 'scale(10)' : 'scale(1)',
        opacity: phase === 'zoom' ? 0 : 1,
      }}
    >
      {/* animated gradient light behind typography */}
      <div
        className="absolute w-[700px] h-[700px] rounded-full opacity-30 animate-orb-morph"
        style={{
          background: 'radial-gradient(circle, rgba(124,58,237,0.25), rgba(6,182,212,0.12) 40%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />
      <div
        className="absolute w-[400px] h-[400px] rounded-full opacity-20 animate-drift-violet"
        style={{
          background: 'radial-gradient(circle, rgba(217,70,239,0.2), transparent 70%)',
          filter: 'blur(30px)',
        }}
      />

      <div className="relative z-10 flex flex-col items-center">
        <h1 className="font-display text-5xl sm:text-7xl md:text-8xl text-center text-white flex overflow-hidden">
          {nameLetters.map((ch, i) => (
            <span
              key={i}
              className="inline-block"
              style={{
                animation: `letterIn 0.9s cubic-bezier(0.22,1,0.36,1) both`,
                animationDelay: `${i * 0.07}s`,
                transformOrigin: 'bottom',
              }}
            >
              {ch === ' ' ? '\u00A0' : ch}
            </span>
          ))}
        </h1>

        <div
          className="mt-6 overflow-hidden"
          style={{
            opacity: phase === 'name' ? 0 : 1,
            transform: phase === 'name' ? 'translateY(20px)' : 'translateY(0)',
            transition: 'opacity 0.8s ease, transform 0.8s ease',
          }}
        >
          <p className="font-mono text-xs sm:text-sm md:text-base tracking-[0.3em] text-[var(--text-dim)] flex">
            {roleLetters.map((ch, i) => (
              <span
                key={i}
                className="inline-block"
                style={{
                  animation: `letterIn 0.7s ease both`,
                  animationDelay: `${0.4 + i * 0.03}s`,
                }}
              >
                {ch === ' ' ? '\u00A0' : ch}
              </span>
            ))}
          </p>
        </div>
      </div>
    </div>
  );
}
