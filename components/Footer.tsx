
import React from 'react';
import { LogoMark } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer className="py-12 px-6 border-t border-white/5 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex items-center gap-2 opacity-50">
          <LogoMark />
          <span className="font-light tracking-[0.2em] text-xs">FUTURAHOME</span>
        </div>
        
        <div className="flex gap-8 text-[10px] uppercase tracking-[0.2em] text-white/40">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Use</a>
          <a href="#" className="hover:text-white transition-colors">Instagram</a>
        </div>

        <div className="text-[10px] uppercase tracking-[0.1em] text-white/20">
          © 2024 FuturaHome Inc. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
