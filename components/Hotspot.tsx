
import React, { useState, useRef } from 'react';
import { HotspotProps } from '../types';

interface ExtendedHotspotProps extends HotspotProps {
  onDetailClick?: () => void;
}

const Hotspot: React.FC<ExtendedHotspotProps> = ({ x, y, label, detail, onDetailClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div 
      ref={containerRef}
      className="absolute z-30"
      style={{ left: `${x}%`, top: `${y}%` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={(e) => {
        e.stopPropagation();
        onDetailClick?.();
      }}
    >
      <div className="relative flex items-center justify-center cursor-pointer group">
        {/* Interaction Waves */}
        <div className="absolute inset-0 w-20 h-20 -translate-x-7 -translate-y-7 rounded-full border border-white/5 animate-ping opacity-10 pointer-events-none" />
        
        {/* Hover Media Preview Peek */}
        <div className={`absolute -top-64 -left-1/2 -translate-x-1/2 w-80 h-80 rounded-full overflow-hidden border-2 border-white/20 shadow-[0_40px_80px_rgba(0,0,0,0.9)] transition-all duration-700 pointer-events-none z-50 ${
          isHovered ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-90'
        }`}>
          {detail?.videoUrl ? (
            <video 
              src={detail.videoUrl}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover transition-transform duration-700"
              style={{ transform: isHovered ? 'scale(1.1)' : 'scale(1.2)' }}
            />
          ) : (
            detail?.image && (
              <div 
                className="w-full h-full bg-cover bg-center transition-transform duration-700"
                style={{ 
                  backgroundImage: `url(${detail.image})`,
                  transform: isHovered ? 'scale(1.1)' : 'scale(1.2)'
                }}
              />
            )
          )}
          
          {/* Badge Overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
             <div className="bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
                <span className="text-[10px] text-white font-black tracking-[0.2em]">
                  {detail?.videoUrl ? 'VIDEO PREVIEW' : 'SPACE PREVIEW'}
                </span>
             </div>
          </div>
        </div>
        
        {/* The Portal Trigger Dot */}
        <div className={`relative z-10 w-8 h-8 rounded-full bg-black/40 backdrop-blur-3xl border border-white/20 flex items-center justify-center transition-all duration-700 cubic-bezier(0.16, 1, 0.3, 1) ${
          isHovered ? 'scale-[1.8] border-white/40 bg-white/10' : 'scale-100'
        }`}>
          <div className={`w-2 h-2 rounded-full bg-white shadow-[0_0_20px_rgba(255,255,255,1)] transition-all duration-500 ${isHovered ? 'scale-0' : 'scale-100'}`} />
          
          <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="white">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>

        {/* Hover Text Label */}
        <div className={`absolute left-full ml-10 z-40 transition-all duration-700 pointer-events-none ${isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
          <div className="flex flex-col">
            <h4 className="text-xl font-extralight tracking-widest text-white uppercase whitespace-nowrap mb-1">
              {label}
            </h4>
            <div className="flex items-center gap-3">
              <div className="h-[1px] w-12 bg-white/40" />
              <span className="text-[8px] uppercase tracking-[0.5em] text-white/40">
                {detail?.videoUrl ? 'Watch Cinematic Tour' : 'View Space Details'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hotspot;
