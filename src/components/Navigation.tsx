import { useEffect, useState } from 'react';

const navItems = [
  { label: 'WORK', target: 'work' },
  { label: 'ABOUT', target: 'about' },
  { label: 'PROCESS', target: 'process' },
  { label: 'SERVICES', target: 'services' },
  { label: 'CONTACT', target: 'contact' },
];

export function Navigation({ visible }: { visible: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-[9000] transition-all duration-700"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(-100%)',
        }}
      >
        <div
          className={`transition-all duration-500 ${scrolled ? 'glass' : ''}`}
          style={{ padding: scrolled ? '0.75rem 0' : '1.5rem 0' }}
        >
          <div className="max-w-[1400px] mx-auto px-6 sm:px-12 md:px-20 flex items-center justify-between">
            {/* logo */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="font-display text-xl text-white tracking-tight hover:text-[var(--cyan)] transition-colors duration-300"
              aria-label="Back to top"
            >
              LSG
            </button>

            {/* desktop nav */}
            <div className="hidden md:flex items-center gap-10">
              {navItems.map((item) => (
                <button
                  key={item.target}
                  onClick={() => scrollTo(item.target)}
                  className="font-mono text-xs tracking-[0.2em] text-white/60 hover:text-white transition-colors duration-300"
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* mobile menu button */}
            <button
              className="md:hidden flex flex-col gap-1.5 p-2"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
            >
              <div className="w-6 h-px bg-white" />
              <div className="w-6 h-px bg-white" />
            </button>
          </div>
        </div>
      </nav>

      {/* mobile overlay */}
      <div
        className="fixed inset-0 z-[9500] bg-black flex flex-col items-center justify-center gap-8 transition-all duration-500 md:hidden"
        style={{
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? 'auto' : 'none',
          transform: menuOpen ? 'scale(1)' : 'scale(1.1)',
        }}
      >
        {/* gradient backdrop */}
        <div
          className="absolute w-[500px] h-[500px] rounded-full opacity-20 animate-orb-morph"
          style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.3), transparent 70%)', filter: 'blur(40px)' }}
        />

        <button
          className="absolute top-8 right-8 text-white text-2xl"
          onClick={() => setMenuOpen(false)}
          aria-label="Close menu"
        >
          ✕
        </button>

        {navItems.map((item, i) => (
          <button
            key={item.target}
            onClick={() => scrollTo(item.target)}
            className="font-display text-4xl text-white/80 hover:text-white transition-colors duration-300 relative z-10"
            style={{
              opacity: menuOpen ? 1 : 0,
              transform: menuOpen ? 'translateY(0)' : 'translateY(20px)',
              transition: `opacity 0.5s ease ${i * 0.08}s, transform 0.5s ease ${i * 0.08}s, color 0.3s ease`,
            }}
          >
            {item.label}
          </button>
        ))}
      </div>
    </>
  );
}
