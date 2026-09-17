import { useRef } from 'react';

interface PhoneMockupProps {
  variant: 'tripmate' | 'crave';
  className?: string;
}

export function PhoneMockup({ variant, className = '' }: PhoneMockupProps) {
  const tiltRef = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent) => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    const el = tiltRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(1000px) rotateY(${x * 12}deg) rotateX(${-y * 12}deg) scale(1.03)`;
  };
  const handleLeave = () => {
    const el = tiltRef.current;
    if (!el) return;
    el.style.transform = 'perspective(1000px) rotateY(0) rotateX(0) scale(1)';
  };

  return (
    <div
      ref={tiltRef}
      className={`tilt-wrap ${className}`}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      <div className="phone-frame w-[280px] h-[580px] sm:w-[320px] sm:h-[660px]">
        <div className="phone-screen w-full h-full">
          {variant === 'tripmate' ? <TripMateScreen /> : <CraveGunScreen />}
        </div>
      </div>
    </div>
  );
}

function TripMateScreen() {
  return (
    <div className="w-full h-full flex flex-col" style={{ background: 'linear-gradient(180deg, #1a3a5c 0%, #0d1f33 100%)' }}>
      {/* status bar */}
      <div className="flex justify-between items-center px-6 pt-4 pb-2 text-white text-[10px] font-medium">
        <span>9:41</span>
        <div className="flex gap-1 items-center">
          <div className="w-3 h-2 rounded-sm bg-white/60" />
          <div className="w-3 h-2 rounded-sm bg-white/40" />
        </div>
      </div>
      {/* header */}
      <div className="px-6 pt-6">
        <p className="text-white/50 text-[10px] tracking-widest uppercase">Welcome back</p>
        <h3 className="text-white text-2xl font-bold mt-1">Explore</h3>
      </div>
      {/* search */}
      <div className="px-6 mt-4">
        <div className="bg-white/10 rounded-full px-4 py-2.5 flex items-center gap-2">
          <div className="w-3 h-3 rounded-full border border-white/40" />
          <div className="flex-1 h-2 bg-white/10 rounded-full" />
        </div>
      </div>
      {/* hero card */}
      <div className="mx-6 mt-5 rounded-2xl overflow-hidden relative h-32" style={{ background: 'linear-gradient(135deg, #e8956d, #c66f4f)' }}>
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 100 100\'%3E%3Cpath d=\'M0 50 Q25 30 50 50 T100 50 V100 H0 Z\' fill=\'%23000\'/%3E%3C/svg%3E")' }} />
        <div className="absolute bottom-3 left-4">
          <p className="text-white text-xs opacity-80">Featured</p>
          <p className="text-white text-lg font-bold">Santorini</p>
        </div>
      </div>
      {/* categories */}
      <div className="px-6 mt-5 flex gap-3 overflow-hidden">
        {['Beach', 'Mountain', 'City', 'Cultural'].map((c, i) => (
          <div key={c} className={`px-3 py-1.5 rounded-full text-[10px] font-medium whitespace-nowrap ${i === 0 ? 'bg-white text-[#1a3a5c]' : 'bg-white/10 text-white/70'}`}>
            {c}
          </div>
        ))}
      </div>
      {/* destination cards */}
      <div className="px-6 mt-4 space-y-3 flex-1">
        {[
          { name: 'Bali, Indonesia', price: '$890', color: '#5b9a6a' },
          { name: 'Kyoto, Japan', price: '$1,200', color: '#9a6b5b' },
        ].map((d) => (
          <div key={d.name} className="flex items-center gap-3 bg-white/5 rounded-xl p-2.5">
            <div className="w-12 h-12 rounded-lg flex-shrink-0" style={{ background: `linear-gradient(135deg, ${d.color}, ${d.color}99)` }} />
            <div className="flex-1">
              <p className="text-white text-xs font-semibold">{d.name}</p>
              <p className="text-white/50 text-[10px] mt-0.5">5 days · Flight included</p>
            </div>
            <p className="text-[#e8956d] text-xs font-bold">{d.price}</p>
          </div>
        ))}
      </div>
      {/* bottom nav */}
      <div className="flex justify-around items-center py-3 px-6 bg-white/5">
        {['home', 'search', 'saved', 'profile'].map((n, i) => (
          <div key={n} className={`w-5 h-5 rounded-lg ${i === 0 ? 'bg-[#e8956d]' : 'bg-white/20'}`} />
        ))}
      </div>
    </div>
  );
}

function CraveGunScreen() {
  return (
    <div className="w-full h-full flex flex-col" style={{ background: 'linear-gradient(180deg, #2a1a1a 0%, #1a0d0d 100%)' }}>
      {/* status bar */}
      <div className="flex justify-between items-center px-6 pt-4 pb-2 text-white text-[10px] font-medium">
        <span>9:41</span>
        <div className="flex gap-1 items-center">
          <div className="w-3 h-2 rounded-sm bg-white/60" />
          <div className="w-3 h-2 rounded-sm bg-white/40" />
        </div>
      </div>
      {/* header */}
      <div className="px-6 pt-4 flex items-center justify-between">
        <div>
          <p className="text-white/50 text-[10px]">Deliver to</p>
          <p className="text-white text-sm font-semibold">Home · 2.3km</p>
        </div>
        <div className="w-9 h-9 rounded-full bg-[#e85d3d] flex items-center justify-center">
          <div className="w-4 h-4 rounded-full bg-white/30" />
        </div>
      </div>
      {/* search */}
      <div className="px-6 mt-4">
        <div className="bg-white/10 rounded-full px-4 py-2.5 flex items-center gap-2">
          <div className="w-3 h-3 rounded-full border border-white/40" />
          <div className="flex-1 h-2 bg-white/10 rounded-full" />
        </div>
      </div>
      {/* promo banner */}
      <div className="mx-6 mt-4 rounded-2xl p-4 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #e85d3d, #c73d1d)' }}>
        <p className="text-white text-[10px] uppercase tracking-widest opacity-80">Special Offer</p>
        <p className="text-white text-lg font-bold mt-1">30% OFF</p>
        <p className="text-white/80 text-[10px] mt-1">On your first order</p>
        <div className="absolute right-3 bottom-3 w-12 h-12 rounded-full bg-white/15" />
      </div>
      {/* categories */}
      <div className="px-6 mt-4 flex gap-2 overflow-hidden">
        {['All', 'Burger', 'Pizza', 'Sushi', 'Salad'].map((c, i) => (
          <div key={c} className={`px-3 py-1.5 rounded-full text-[10px] font-medium whitespace-nowrap ${i === 0 ? 'bg-[#e85d3d] text-white' : 'bg-white/10 text-white/70'}`}>
            {c}
          </div>
        ))}
      </div>
      {/* food cards */}
      <div className="px-6 mt-4 space-y-3 flex-1">
        {[
          { name: 'Classic Cheeseburger', rest: 'Burger House', price: '$8.50', color: '#d4a04d' },
          { name: 'Margherita Pizza', rest: 'Italian Kitchen', price: '$12.00', color: '#c75d3d' },
        ].map((f) => (
          <div key={f.name} className="flex items-center gap-3 bg-white/5 rounded-xl p-2.5">
            <div className="w-12 h-12 rounded-lg flex-shrink-0" style={{ background: `linear-gradient(135deg, ${f.color}, ${f.color}88)` }} />
            <div className="flex-1">
              <p className="text-white text-xs font-semibold">{f.name}</p>
              <p className="text-white/50 text-[10px] mt-0.5">{f.rest} · 15 min</p>
            </div>
            <p className="text-[#e85d3d] text-xs font-bold">{f.price}</p>
          </div>
        ))}
      </div>
      {/* bottom nav */}
      <div className="flex justify-around items-center py-3 px-6 bg-white/5">
        {['home', 'search', 'cart', 'profile'].map((n, i) => (
          <div key={n} className={`w-5 h-5 rounded-lg ${i === 0 ? 'bg-[#e85d3d]' : 'bg-white/20'}`} />
        ))}
      </div>
    </div>
  );
}
