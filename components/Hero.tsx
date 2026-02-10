
import React, { useState } from 'react';
import Hotspot from './Hotspot';
import DetailPreview from './DetailPreview';
import { HOTSPOTS, ArrowDown } from '../constants';
import { HotspotDetail } from '../types';

const Hero: React.FC = () => {
  const [activeDetail, setActiveDetail] = useState<HotspotDetail | null>(null);

  const handleScrollDown = () => {
    const nextSection = document.getElementById('our-houses');
    nextSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative h-screen w-full overflow-hidden flex flex-col justify-center items-center">
      
      {/* Background Image Layer - Static with Zoom Animation */}
      <div className="absolute inset-0 z-0">
        <div 
          className="w-full h-full bg-cover bg-center animate-[slow-zoom_30s_infinite_alternate]"
          style={{ 
            backgroundImage: 'url("https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80")',
          }}
        >
          {/* Overlay for Contrast and Depth */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80" />
        </div>
      </div>

      {/* Brand Title - Floating Front Layer */}
      <div className="relative z-10 select-none pointer-events-none">
        <h1 className="text-[12vw] lg:text-[10rem] font-extralight tracking-[0.25em] text-white/10 uppercase whitespace-nowrap animate-fade-in">
          FUTURAHOME
        </h1>
      </div>

      {/* Interactive Hotspots Layer */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        <div className="relative w-full h-full pointer-events-auto max-w-7xl mx-auto">
          {HOTSPOTS.map((hs, i) => (
            <Hotspot 
              key={i} 
              {...hs} 
              onDetailClick={() => hs.detail && setActiveDetail(hs.detail)}
            />
          ))}
        </div>
      </div>

      {/* Detail Preview Overlay */}
      <DetailPreview 
        detail={activeDetail} 
        onClose={() => setActiveDetail(null)} 
      />

      {/* UI Content Layer */}
      <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 z-30 pointer-events-none">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-end gap-12">
          
          <div className="max-w-md pointer-events-auto">
            <h2 className="text-3xl md:text-5xl font-light leading-tight tracking-wide mb-6">
              WE CREATE YOUR <br />
              <span className="italic font-serif opacity-80 text-white/90">COMFORT</span> AND <br />
              FUTURE LIFE
            </h2>
            <button className="flex items-center gap-4 text-[10px] uppercase tracking-[0.3em] text-white/50 hover:text-white transition-all group">
              <span className="w-8 h-[1px] bg-white/20 group-hover:w-12 transition-all" />
              Learn more
            </button>
          </div>

          <div className="hidden lg:flex flex-col items-center gap-4 pointer-events-auto">
            <button 
              onClick={handleScrollDown}
              className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/40 hover:bg-white/5 transition-all group backdrop-blur-sm"
            >
              <div className="animate-bounce">
                <ArrowDown />
              </div>
            </button>
            <span className="text-[9px] uppercase tracking-[0.3em] text-white/30">Explore houses</span>
          </div>

          <div className="max-w-xs text-right pointer-events-auto">
            <p className="text-sm font-light text-white/60 leading-relaxed mb-4">
              <span className="italic text-white/90">Create your house</span> the way you like it, and our caring designers will help you on this way.
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slow-zoom {
          from { transform: scale(1); }
          to { transform: scale(1.1); }
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
};

export default Hero;
