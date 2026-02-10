
import React from 'react';

const SecondarySection: React.FC = () => {
  const projects = [
    { id: '1', title: 'Mountain Sanctuary', location: 'Swiss Alps', img: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=800&q=80' },
    { id: '2', title: 'Oceanic Glass', location: 'California, USA', img: 'https://images.unsplash.com/photo-1449156001935-d2863fb72690?auto=format&fit=crop&w=800&q=80' },
    { id: '3', title: 'Desert Oasis', location: 'Dubai, UAE', img: 'https://images.unsplash.com/photo-1513584684374-8bdb74838a0f?auto=format&fit=crop&w=800&q=80' },
  ];

  return (
    <section id="our-houses" className="py-24 px-6 md:px-12 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-baseline mb-16 gap-4">
          <div>
            <span className="text-xs uppercase tracking-[0.3em] text-white/40 mb-2 block">Our Houses</span>
            <h2 className="text-4xl md:text-5xl font-light">Featured Properties</h2>
          </div>
          <button className="text-xs uppercase tracking-widest border-b border-white/20 pb-1 hover:border-white transition-all">View all cases</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div key={project.id} className="group cursor-pointer">
              <div className="aspect-[4/5] overflow-hidden rounded-2xl mb-6 relative">
                <img 
                  src={project.img} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="px-6 py-2 bg-white text-black text-xs font-bold rounded-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">Explore Detail</span>
                </div>
              </div>
              <h3 className="text-xl font-light mb-1">{project.title}</h3>
              <p className="text-xs uppercase tracking-widest text-white/40">{project.location}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SecondarySection;
