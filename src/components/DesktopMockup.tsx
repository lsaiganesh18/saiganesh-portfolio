import { useRef } from 'react';

interface DesktopMockupProps {
  variant: 'sais-kitchen';
  className?: string;
}

export function DesktopMockup({ className = '' }: DesktopMockupProps) {
  const tiltRef = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent) => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    const el = tiltRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(1200px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) scale(1.02)`;
  };
  const handleLeave = () => {
    const el = tiltRef.current;
    if (!el) return;
    el.style.transform = 'perspective(1200px) rotateY(0) rotateX(0) scale(1)';
  };

  return (
    <div
      ref={tiltRef}
      className={`tilt-wrap ${className}`}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      <div className="desktop-frame w-full max-w-[800px]">
        <div className="desktop-screen aspect-[16/10] w-full">
          <SaisKitchenScreen />
        </div>
      </div>
      <div className="desktop-stand" />
    </div>
  );
}

function SaisKitchenScreen() {
  return (
    <div className="w-full h-full flex flex-col" style={{ background: 'linear-gradient(180deg, #1a1612 0%, #0f0c0a 100%)' }}>
      {/* browser bar */}
      <div className="flex items-center gap-2 px-4 py-2 bg-white/5">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
          <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
          <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
        </div>
        <div className="flex-1 h-4 bg-white/5 rounded-full mx-4" />
      </div>
      {/* nav */}
      <div className="flex items-center justify-between px-8 py-3 border-b border-white/5">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-[#d4a04d]" />
          <span className="text-white text-xs font-bold tracking-wide">SAI'S KITCHEN</span>
        </div>
        <div className="flex gap-5 text-[10px] text-white/60">
          <span className="text-[#d4a04d]">Menu</span>
          <span>Specials</span>
          <span>Reviews</span>
          <span>About</span>
        </div>
        <div className="px-3 py-1 rounded-full bg-[#d4a04d] text-[10px] text-[#1a1612] font-semibold">Order Now</div>
      </div>
      {/* hero */}
      <div className="flex-1 flex items-center px-8 py-4 gap-4">
        <div className="flex-1">
          <p className="text-[#d4a04d] text-[10px] tracking-widest uppercase">Today's Specials</p>
          <h3 className="text-white text-2xl font-bold mt-1 leading-tight">Authentic<br />Flavors,<br />Crafted Daily</h3>
          <p className="text-white/50 text-[10px] mt-3 max-w-[180px]">Discover dishes made with fresh ingredients and traditional recipes.</p>
          <div className="flex gap-2 mt-4">
            <div className="px-3 py-1.5 rounded-full bg-[#d4a04d] text-[9px] text-[#1a1612] font-semibold">View Menu</div>
            <div className="px-3 py-1.5 rounded-full border border-white/20 text-[9px] text-white/70">Book Table</div>
          </div>
        </div>
        <div className="w-32 h-32 rounded-2xl flex-shrink-0" style={{ background: 'linear-gradient(135deg, #d4a04d, #b08030)' }}>
          <div className="w-full h-full rounded-2xl opacity-30" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 60 60\'%3E%3Ccircle cx=\'30\' cy=\'30\' r=\'20\' fill=\'%23000\'/%3E%3C/svg%3E")' }} />
        </div>
      </div>
      {/* dishes row */}
      <div className="px-8 pb-4 flex gap-3">
        {[
          { name: 'Butter Chicken', price: '$14', color: '#c75d3d' },
          { name: 'Paneer Tikka', price: '$11', color: '#d4a04d' },
          { name: 'Biryani', price: '$13', color: '#8a6b3d' },
        ].map((d) => (
          <div key={d.name} className="flex-1 bg-white/5 rounded-xl p-3">
            <div className="w-full h-10 rounded-lg mb-2" style={{ background: `linear-gradient(135deg, ${d.color}, ${d.color}88)` }} />
            <p className="text-white text-[10px] font-semibold">{d.name}</p>
            <div className="flex justify-between items-center mt-1">
              <p className="text-white/50 text-[9px]">4.8 ★</p>
              <p className="text-[#d4a04d] text-[10px] font-bold">{d.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
