
import React, { useState, useEffect } from 'react';
import { LogoMark } from '../constants';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 px-6 md:px-12 ${isScrolled ? 'py-4 bg-black/20 backdrop-blur-lg border-b border-white/5' : 'py-8 bg-transparent'}`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2 cursor-pointer group">
          <LogoMark />
          <span className="font-light tracking-[0.2em] text-sm opacity-90">FUTURAHOME</span>
        </div>

        {/* Menu Links (Desktop) */}
        <div className="hidden md:flex items-center gap-10">
          {['Services', 'Our houses', 'Cases'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase().replace(' ', '-')}`} 
              className="text-xs uppercase tracking-widest text-white/70 hover:text-white transition-colors"
            >
              {item}
            </a>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="flex items-center gap-4">
          <button className="hidden sm:block px-6 py-2.5 rounded-full border border-white/20 text-xs uppercase tracking-widest hover:bg-white/10 transition-all backdrop-blur-sm">
            Let's talk
          </button>
          <button className="px-6 py-2.5 rounded-full bg-white text-black text-xs uppercase font-bold tracking-widest hover:bg-white/90 transition-all shadow-lg">
            Let's talk
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
