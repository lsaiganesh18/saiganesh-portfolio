import { useReveal } from '@/lib/hooks';

const skills = [
  'Figma', 'Wireframing', 'High-Fidelity Prototyping', 'User Flows',
  'Information Architecture', 'User Journey Mapping', 'Mobile-First Design',
  'Visual Hierarchy', 'Typography', 'Accessibility', 'Responsive Design',
  'Design Systems', 'Product Design', 'Web Design', 'Mobile App Design',
];

const marqueeRow1 = ['Figma', 'Wireframing', 'Prototyping', 'User Flows', 'Design Systems', 'Typography', 'Accessibility', 'Responsive Design'];
const marqueeRow2 = ['Product Design', 'Web Design', 'Mobile App Design', 'Information Architecture', 'User Journey Mapping', 'Visual Hierarchy', 'Mobile-First Design', 'High-Fidelity Prototyping'];

const directions = ['fadeInLeft', 'fadeInRight', 'fadeInScale', 'fadeUp', 'fadeInLeft', 'fadeInRight', 'fadeInScale', 'fadeUp', 'fadeInLeft', 'fadeInRight', 'fadeInScale', 'fadeUp', 'fadeInLeft', 'fadeInRight', 'fadeInScale'];

export function Skills() {
  const { ref, visible } = useReveal<HTMLDivElement>(0.1);

  return (
    <section ref={ref} className="relative py-32 overflow-hidden">
      {/* gradient backdrop */}
      <div
        className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full opacity-10 animate-drift pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.3), transparent 70%)', filter: 'blur(40px)' }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full opacity-8 animate-drift-cyan pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.25), transparent 70%)', filter: 'blur(35px)' }}
      />

      <div className="max-w-[1400px] mx-auto w-full px-6 sm:px-12 md:px-20">
        <div className={`reveal-blur ${visible ? 'is-visible' : ''} mb-16`}>
          <div className="font-mono text-xs tracking-[0.3em] text-[var(--text-dim)] mb-6">02 — TOOLKIT</div>
          <h2 className="font-display text-white" style={{ fontSize: 'clamp(3rem, 10vw, 9rem)', lineHeight: 0.9 }}>
            DESIGN TOOLKIT
          </h2>
        </div>
      </div>

      {/* horizontal marquee rows */}
      <div className="relative space-y-2 sm:space-y-4 py-8">
        <div className="marquee-track">
          {[...marqueeRow1, ...marqueeRow1].map((s, i) => (
            <span
              key={i}
              className="skill-line font-display text-white/80 hover:text-white text-5xl sm:text-7xl md:text-8xl px-8 whitespace-nowrap transition-all duration-500 hover:scale-105"
              style={{ transition: 'color 0.4s ease, transform 0.4s ease' }}
            >
              <span className="skill-glow" />
              <span className="skill-sweep" />
              <span className="skill-underline" />
              {s}
              <span className="text-[var(--violet)]/40 ml-8">/</span>
            </span>
          ))}
        </div>

        <div className="marquee-track reverse">
          {[...marqueeRow2, ...marqueeRow2].map((s, i) => (
            <span
              key={i}
              className="skill-line font-display text-white/60 hover:text-white text-5xl sm:text-7xl md:text-8xl px-8 whitespace-nowrap transition-all duration-500 hover:scale-105"
              style={{ transition: 'color 0.4s ease, transform 0.4s ease' }}
            >
              <span className="skill-glow" />
              <span className="skill-sweep" />
              <span className="skill-underline" />
              {s}
              <span className="text-[var(--cyan)]/40 ml-8">/</span>
            </span>
          ))}
        </div>
      </div>

      {/* full skill list with directional reveals */}
      <div className="max-w-[1400px] mx-auto w-full px-6 sm:px-12 md:px-20 mt-16">
        <div className="flex flex-wrap gap-x-6 gap-y-3 justify-center">
          {skills.map((skill, i) => (
            <span
              key={skill}
              className="font-mono text-sm text-white/40 hover:text-white transition-colors duration-300 cursor-default"
              style={{
                opacity: visible ? 1 : 0,
                animation: visible ? `${directions[i]} 0.7s cubic-bezier(0.22,1,0.36,1) both` : 'none',
                animationDelay: `${i * 0.06}s`,
              }}
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
