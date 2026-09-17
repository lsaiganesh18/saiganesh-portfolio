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
      <div className="relative overflow-x-auto pb-8" style={{ scrollbarWidth: 'thin' }}>
        <div className="flex gap-0 min-w-max px-6 sm:px-12 md:px-20 relative">
          {/* connecting line with gradient */}
          <div className="absolute top-[60px] left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, rgba(124,58,237,0.3), rgba(37,99,235,0.3), rgba(6,182,212,0.3), rgba(217,70,239,0.3), rgba(236,72,153,0.3), rgba(249,115,22,0.3))' }} />

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
                  className="w-3 h-3 rounded-full relative z-10"
                  style={{ background: stageColors[i], boxShadow: `0 0 20px ${stageColors[i]}80` }}
                />
              </div>
              <div className="font-mono text-xs mb-2" style={{ color: stageColors[i] }}>{s.num}</div>
              <h3 className="font-display text-white text-2xl sm:text-3xl mb-3">{s.title}</h3>
              <p className="text-sm text-white/50 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
