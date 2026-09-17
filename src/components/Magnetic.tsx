import { useEffect, useRef, type ReactNode } from 'react';

interface MagneticProps {
  children: ReactNode;
  as?: 'a' | 'button' | 'div';
  href?: string;
  className?: string;
  strength?: number;
  onClick?: () => void;
}

export function Magnetic({ children, as = 'a', href, className = '', strength = 0.3, onClick }: MagneticProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    let tx = 0, ty = 0;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      tx = x * strength;
      ty = y * strength;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.transform = `translate(${tx}px, ${ty}px)`;
      });
    };
    const onLeave = () => {
      cancelAnimationFrame(raf);
      el.style.transform = 'translate(0, 0)';
      el.style.transition = 'transform 0.5s cubic-bezier(0.22,1,0.36,1)';
    };
    const onEnter = () => {
      el.style.transition = 'transform 0.1s linear';
    };

    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseenter', onEnter);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseenter', onEnter);
      el.removeEventListener('mouseleave', onLeave);
      cancelAnimationFrame(raf);
    };
  }, [strength]);

  const Tag = as as 'a';
  return (
    <Tag
      ref={ref as React.Ref<HTMLAnchorElement>}
      href={href}
      onClick={onClick}
      className={className}
      style={{ display: 'inline-flex', willChange: 'transform' }}
    >
      {children}
    </Tag>
  );
}
