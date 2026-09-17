import { useScrollProgress } from '@/lib/hooks';

export function ScrollProgress() {
  const progress = useScrollProgress();
  return (
    <div className="fixed top-0 left-0 right-0 h-[2px] z-[9997] pointer-events-none">
      <div
        className="h-full origin-left"
        style={{
          transform: `scaleX(${progress})`,
          background: 'linear-gradient(90deg, #d4b896, #f5f5f3)',
        }}
      />
    </div>
  );
}
