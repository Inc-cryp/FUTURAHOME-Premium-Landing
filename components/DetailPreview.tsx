
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { HotspotDetail } from '../types';
import { CloseIcon } from '../constants';

// Fix: Declare model-viewer as a valid JSX element to resolve property doesn't exist on JSX.IntrinsicElements error
// Augmenting both JSX and React.JSX to ensure compatibility across different TypeScript/React configurations
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': any;
    }
  }
  namespace React {
    namespace JSX {
      interface IntrinsicElements {
        'model-viewer': any;
      }
    }
  }
}

interface DetailPreviewProps {
  detail: HotspotDetail | null;
  onClose: () => void;
}

type ViewMode = 'IMAGE' | 'VIDEO' | '360' | '3D';

const DetailPreview: React.FC<DetailPreviewProps> = ({ detail, onClose }) => {
  const [isRevealed, setIsRevealed] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>('IMAGE');
  
  // 360 Camera State
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(900);
  const [isDragging, setIsDragging] = useState(false);
  const [momentum, setMomentum] = useState({ x: 0.1, y: 0 });
  
  const lastMousePos = useRef({ x: 0, y: 0 });
  // Fix: Correctly type requestRef to allow null as an initial value
  const requestRef = useRef<number | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (detail) {
      setRotation({ x: 0, y: 0 });
      setZoom(900);
      setMomentum({ x: 0.08, y: 0 });
      
      // Prioritize video as requested
      if (detail.videoUrl) {
        setViewMode('VIDEO');
      } else {
        setViewMode('IMAGE');
      }

      const timer = setTimeout(() => setIsRevealed(true), 50);
      return () => clearTimeout(timer);
    } else {
      setIsRevealed(false);
    }
  }, [detail]);

  const animate = useCallback(() => {
    if (!isDragging && viewMode === '360') {
      setRotation(prev => ({
        x: (prev.x + momentum.x) % 360,
        y: prev.y + (momentum.y - prev.y * 0.05) * 0.1 
      }));
      setMomentum(prev => ({ x: prev.x * 0.98, y: prev.y * 0.98 }));
    }
    requestRef.current = requestAnimationFrame(animate);
  }, [isDragging, momentum, viewMode]);

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [animate]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (viewMode !== '360') return;
    setIsDragging(true);
    lastMousePos.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && viewMode === '360') {
      const deltaX = e.clientX - lastMousePos.current.x;
      const deltaY = e.clientY - lastMousePos.current.y;
      const sensitivity = 0.15;
      setRotation(prev => ({
        x: (prev.x - deltaX * sensitivity) % 360,
        y: Math.max(-45, Math.min(45, prev.y + deltaY * sensitivity))
      }));
      setMomentum({ x: -deltaX * 0.08, y: deltaY * 0.08 });
      lastMousePos.current = { x: e.clientX, y: e.clientY };
    }
  };

  const handleMouseUp = () => setIsDragging(false);
  const handleWheel = (e: React.WheelEvent) => {
    if (viewMode !== '360') return;
    setZoom(prev => Math.max(600, Math.min(1400, prev + e.deltaY * 0.5)));
  };

  if (!detail) return null;

  const azimuth = Math.floor(((rotation.x % 360) + 360) % 360);

  return (
    <div 
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-[#050505] select-none overflow-hidden transition-opacity duration-1000 ${isRevealed ? 'opacity-100' : 'opacity-0'}`}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onWheel={handleWheel}
    >
      {/* Background Image Layer */}
      <div 
        className={`absolute inset-0 transition-all duration-1000 ease-out ${viewMode === 'IMAGE' ? 'opacity-100 scale-100' : 'opacity-0 scale-110 pointer-events-none'}`}
      >
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${detail.image})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/60" />
        </div>
      </div>

      {/* Video Tour Layer */}
      <div 
        className={`absolute inset-0 transition-all duration-1000 ease-out ${viewMode === 'VIDEO' ? 'opacity-100 scale-100' : 'opacity-0 scale-110 pointer-events-none'}`}
      >
        {detail.videoUrl && (
          <video 
            ref={videoRef}
            src={detail.videoUrl}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/60" />
      </div>

      {/* 360 View Layer */}
      <div 
        className={`absolute inset-0 transition-opacity duration-1000 ${viewMode === '360' ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      >
        <div 
          className="relative w-full h-full overflow-hidden cursor-grab active:cursor-grabbing"
          onMouseDown={handleMouseDown}
          style={{ perspective: `${zoom}px` }}
        >
          <div 
            className="absolute inset-0 flex items-center justify-center transition-transform duration-100 ease-linear"
            style={{
              transform: `rotateX(${rotation.y}deg) rotateY(${rotation.x}deg)`,
              transformStyle: 'preserve-3d',
              willChange: 'transform'
            }}
          >
            <div 
              className="absolute inset-0 w-[1000vw] h-[150vh] bg-center bg-repeat-x"
              style={{ 
                backgroundImage: `url(${detail.panoramaUrl})`,
                backgroundSize: 'auto 100%',
                transform: 'translateZ(-800px) scale(2.5)',
                filter: `brightness(0.8) contrast(1.1)`,
              }}
            >
               <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/40" />
            </div>
          </div>
        </div>
      </div>

      {/* 3D Model Layer */}
      <div className={`absolute inset-0 transition-all duration-1000 ${viewMode === '3D' ? 'opacity-100 pointer-events-auto scale-100' : 'opacity-0 pointer-events-none scale-95'}`}>
        {detail.modelUrl && (
          <model-viewer
            src={detail.modelUrl}
            alt={`${detail.title} 3D Dollhouse`}
            auto-rotate
            camera-controls
            shadow-intensity="2"
            exposure="1.5"
            environment-image="neutral"
            interaction-prompt="none"
            ar
            ar-modes="webxr scene-viewer quick-look"
            camera-orbit="45deg 75deg 4m"
            field-of-view="30deg"
            style={{ width: '100%', height: '100%' }}
          >
             <div slot="ar-button" className="absolute bottom-10 left-1/2 -translate-x-1/2 px-10 py-4 bg-white text-black rounded-full text-[11px] uppercase font-black tracking-widest shadow-2xl hover:scale-105 transition-transform cursor-pointer">
                Place in your space (AR)
             </div>
          </model-viewer>
        )}
      </div>

      {/* UI Overlay */}
      <div className={`absolute inset-0 z-50 pointer-events-none transition-all duration-[1500ms] ${isRevealed ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
        
        {/* Top Header - Controls & Info */}
        <div className="absolute top-12 left-12 flex flex-col gap-10 pointer-events-auto">
          <div className="flex flex-col gap-2">
            <span className="text-[10px] uppercase tracking-[0.6em] text-white/40 font-bold">Residential Experience</span>
            <h3 className="text-5xl font-extralight tracking-widest text-white uppercase drop-shadow-2xl">{detail.title}</h3>
          </div>

          {/* Mode Switcher Buttons */}
          <div className="flex flex-col gap-3">
             {detail.videoUrl && (
                <button 
                  onClick={() => setViewMode('VIDEO')}
                  className={`px-8 py-4 rounded-full text-[10px] uppercase tracking-widest transition-all border flex items-center gap-4 ${viewMode === 'VIDEO' ? 'bg-white text-black border-white font-black' : 'bg-black/20 text-white/60 border-white/10 hover:border-white/40 backdrop-blur-md'}`}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                  Cinematic Tour
                </button>
             )}
             <button 
                onClick={() => setViewMode('IMAGE')}
                className={`px-8 py-4 rounded-full text-[10px] uppercase tracking-widest transition-all border ${viewMode === 'IMAGE' ? 'bg-white text-black border-white font-black' : 'bg-black/20 text-white/60 border-white/10 hover:border-white/40 backdrop-blur-md'}`}
              >
                Gallery Still
              </button>
              {detail.panoramaUrl && (
                <button 
                  onClick={() => setViewMode('360')}
                  className={`px-8 py-4 rounded-full text-[10px] uppercase tracking-widest transition-all border flex items-center gap-4 ${viewMode === '360' ? 'bg-white text-black border-white font-black' : 'bg-black/20 text-white/60 border-white/10 hover:border-white/40 backdrop-blur-md'}`}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                    <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0 8c-1.65 0-3-1.35-3-3s1.35-3 3-3 3 1.35 3 3-1.35 3-3 3z" />
                  </svg>
                  Immersive 360°
                </button>
              )}
              {detail.modelUrl && (
                <button 
                  onClick={() => setViewMode('3D')}
                  className={`px-8 py-4 rounded-full text-[10px] uppercase tracking-widest transition-all border flex items-center gap-4 ${viewMode === '3D' ? 'bg-white text-black border-white font-black' : 'bg-black/20 text-white/60 border-white/10 hover:border-white/40 backdrop-blur-md'}`}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M21 16.5c0 .38-.21.71-.53.88l-7.97 4.44c-.31.17-.66.17-.97 0l-7.97-4.44c-.31-.17-.53-.51-.53-.88v-9c0-.37.21-.71.53-.88l7.97-4.44c.31-.17.66-.17.97 0l7.97 4.44c.32.17.53.51.53.88v9z" />
                  </svg>
                  Interactive 3D
                </button>
              )}
          </div>
        </div>

        {/* Dynamic Navigation Guide (Only for 360) */}
        {viewMode === '360' && (
          <div className="absolute bottom-12 left-12 flex flex-col gap-6 font-mono pointer-events-auto">
            <div className="flex gap-10">
                <div className="flex flex-col gap-1">
                  <span className="text-[9px] text-white/30 uppercase tracking-widest">Azimuth</span>
                  <span className="text-2xl text-white font-light tabular-nums">{azimuth}°</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[9px] text-white/30 uppercase tracking-widest">Elevation</span>
                  <span className="text-2xl text-white font-light tabular-nums">{Math.floor(rotation.y)}°</span>
                </div>
            </div>
            <div className="h-[2px] w-48 bg-white/10 relative overflow-hidden">
                <div className="absolute top-0 h-full bg-white transition-all duration-100" style={{ left: `${(azimuth / 360) * 100}%`, width: '10%' }} />
            </div>
          </div>
        )}

        {/* Action Content Box */}
        <div className="absolute bottom-12 right-12 max-w-lg pointer-events-auto">
          <div className="bg-black/40 backdrop-blur-[60px] border border-white/10 p-12 rounded-[3rem] shadow-[0_50px_100px_rgba(0,0,0,0.8)] space-y-12">
            <div className="space-y-8">
              <p className="text-white/80 text-xl leading-relaxed font-light italic tracking-wide">
                "{detail.description}"
              </p>
              
              <div className="flex flex-wrap gap-3">
                {detail.specs.map((spec, i) => (
                  <span key={i} className="px-5 py-2 bg-white/5 rounded-full text-[9px] uppercase tracking-[0.2em] text-white/60 border border-white/5 backdrop-blur-sm">
                    {spec}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex gap-4">
              <button className="flex-1 px-10 py-6 rounded-full bg-white text-black text-[12px] uppercase font-black tracking-[0.25em] hover:scale-[1.02] active:scale-95 transition-all shadow-2xl">
                Reserve space
              </button>
              <button 
                onClick={onClose}
                className="px-10 py-6 rounded-full border border-white/20 bg-white/5 text-white text-[12px] uppercase tracking-[0.2em] hover:bg-white/10 transition-all backdrop-blur-md"
              >
                Back
              </button>
            </div>
          </div>
        </div>

        {/* Interactive Prompt */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-32">
           <span className="text-[10px] uppercase tracking-[1em] text-white/30 animate-pulse font-medium">
             {viewMode === '360' ? 'Explore Surroundings' : viewMode === '3D' ? 'Rotate Object' : viewMode === 'VIDEO' ? 'Watch Cinematic Tour' : 'Gallery Overview'}
           </span>
        </div>
      </div>

      {/* Close Button */}
      <button 
        onClick={onClose}
        className="absolute top-12 right-12 z-[110] p-6 rounded-full bg-white/5 hover:bg-white text-white hover:text-black transition-all duration-700 border border-white/10 backdrop-blur-3xl shadow-2xl group"
      >
        <div className="group-hover:rotate-90 transition-transform duration-500">
          <CloseIcon />
        </div>
      </button>
    </div>
  );
};

export default DetailPreview;
