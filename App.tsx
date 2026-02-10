
import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SecondarySection from './components/SecondarySection';
import TechnicalGrid from './components/TechnicalGrid';
import VisionaryTool from './components/VisionaryTool';
import Footer from './components/Footer';

function App() {
  return (
    <div className="relative min-h-screen bg-[#0a0a0a]">
      <Navbar />
      <main>
        <Hero />
        <SecondarySection />
        <TechnicalGrid />
        <VisionaryTool />
      </main>
      <Footer />
    </div>
  );
}

export default App;
