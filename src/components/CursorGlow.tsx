import { useEffect, useRef } from 'react';

export function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    let gx = window.innerWidth / 2;
    let gy = window.innerHeight / 2;
    let rx = gx, ry = gy;
    let dx = gx, dy = gy;
    let tx = gx, ty = gy;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      dx = e.clientX;
      dy = e.clientY;
    };

    const onDown = () => {
      if (ringRef.current) {
        ringRef.current.style.width = '24px';
        ringRef.current.style.height = '24px';
      }
    };
    const onUp = () => {
      if (ringRef.current) {
        ringRef.current.style.width = '36px';
        ringRef.current.style.height = '36px';
      }
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!ringRef.current) return;
      if (target.closest('.magnetic, a[href], button')) {
        ringRef.current.classList.add('hovering');
        ringRef.current.classList.remove('hovering-project');
      } else if (target.closest('.tilt-wrap, [data-project]')) {
        ringRef.current.classList.add('hovering-project');
        ringRef.current.classList.remove('hovering');
      } else {
        ringRef.current.classList.remove('hovering', 'hovering-project');
      }
    };

    const loop = () => {
      gx += (tx - gx) * 0.06;
      gy += (ty - gy) * 0.06;
      rx += (tx - rx) * 0.12;
      ry += (ty - ry) * 0.12;
      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${gx}px, ${gy}px) translate(-50%, -50%)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
      }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${dx}px, ${dy}px) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseover', onOver);
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div ref={glowRef} className="cursor-glow" />
      <div ref={ringRef} className="cursor-ring" />
      <div ref={dotRef} className="cursor-dot" />
    </>
  );
}
