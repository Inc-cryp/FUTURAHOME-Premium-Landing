
import React from 'react';

const TechnicalGrid: React.FC = () => {
  const specs = [
    { title: 'Graphene Glass', desc: 'Self-tinting molecular layers that adapt to solar intensity in milliseconds.', icon: '01' },
    { title: 'Bio-Cement', desc: 'Living concrete that heals its own cracks and absorbs CO2 from the atmosphere.', icon: '02' },
    { title: 'Thermal Mesh', desc: 'Integrated titanium mesh providing zero-energy temperature regulation.', icon: '03' },
    { title: 'Neural Core', desc: 'Centralized AI managing energy distribution and security protocols.', icon: '04' }
  ];

  return (
    <section className="py-32 px-6 md:px-12 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-12">
          <div className="max-w-2xl">
            <span className="text-[10px] uppercase tracking-[0.4em] text-white/30 font-bold block mb-4">Technical Prowess</span>
            <h2 className="text-4xl md:text-5xl font-light leading-tight">The DNA of <span className="italic font-serif opacity-70">Sustainability</span></h2>
          </div>
          <p className="max-w-xs text-white/40 text-sm font-light leading-relaxed">
            Every material is selected for its longevity, performance, and minimal ecological footprint.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5 border border-white/5">
          {specs.map((spec, i) => (
            <div key={i} className="bg-[#0a0a0a] p-12 hover:bg-white/[0.02] transition-colors group">
              <span className="text-[4rem] font-black text-white/[0.03] block mb-8 group-hover:text-white/5 transition-colors leading-none">{spec.icon}</span>
              <h3 className="text-xl font-light mb-4 tracking-wide group-hover:translate-x-2 transition-transform">{spec.title}</h3>
              <p className="text-xs text-white/40 leading-relaxed font-light">{spec.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechnicalGrid;
