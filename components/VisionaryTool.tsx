
import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";

const VisionaryTool: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState('');

  const generateVision = async () => {
    if (!prompt) return;
    
    setIsLoading(true);
    setStatus('Initializing AI Architect...');
    
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [
            { text: `A high-end, ultra-modern architectural concept of a ${prompt}. Cinematic lighting, 8k resolution, minimalist design, futuristic materials.` }
          ]
        },
        config: {
          imageConfig: { aspectRatio: "16:9" }
        }
      });

      const part = response.candidates?.[0]?.content?.parts.find(p => p.inlineData);
      if (part?.inlineData) {
        setGeneratedImage(`data:image/png;base64,${part.inlineData.data}`);
        setStatus('Vision materialized.');
      }
    } catch (error) {
      console.error(error);
      setStatus('Architecture error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-32 px-6 md:px-12 bg-[#050505] relative overflow-hidden">
      {/* Decorative Background Element */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-10">
            <div className="space-y-4">
              <span className="text-[10px] uppercase tracking-[0.4em] text-white/30 font-bold">AI Architectural Concept</span>
              <h2 className="text-5xl md:text-6xl font-light leading-tight">Visualize Your <br/><span className="italic font-serif opacity-60">Future Sanctuary</span></h2>
              <p className="text-white/50 text-lg font-light leading-relaxed max-w-md">
                Describe your dream environment. Our AI-driven design engine will materialize a conceptual vision of your future home in seconds.
              </p>
            </div>

            <div className="relative group">
              <input 
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="e.g., A glass villa overlooking a neon-lit Tokyo skyline"
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-6 px-8 text-white placeholder:text-white/20 focus:outline-none focus:border-white/30 transition-all backdrop-blur-xl"
              />
              <button 
                onClick={generateVision}
                disabled={isLoading}
                className="absolute right-3 top-3 bottom-3 px-8 bg-white text-black rounded-xl text-[10px] uppercase font-black tracking-widest hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
              >
                {isLoading ? 'Processing...' : 'Generate Vision'}
              </button>
            </div>
            
            {status && <p className="text-[9px] uppercase tracking-widest text-white/20 animate-pulse">{status}</p>}
          </div>

          <div className="relative aspect-video rounded-[2rem] overflow-hidden border border-white/5 bg-white/[0.02] group shadow-2xl">
            {generatedImage ? (
              <img 
                src={generatedImage} 
                alt="Generated Architectural Concept" 
                className="w-full h-full object-cover animate-fade-in"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-center p-12 space-y-4 opacity-30 group-hover:opacity-50 transition-opacity">
                <div className="w-12 h-12 border border-white/20 rounded-full flex items-center justify-center">
                   <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                     <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                     <circle cx="8.5" cy="8.5" r="1.5"/>
                     <polyline points="21 15 16 10 5 21"/>
                   </svg>
                </div>
                <p className="text-xs uppercase tracking-[0.3em]">Concept preview will appear here</p>
              </div>
            )}
            
            {isLoading && (
              <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center">
                 <div className="flex flex-col items-center gap-6">
                    <div className="w-12 h-12 border-2 border-white/10 border-t-white rounded-full animate-spin" />
                    <span className="text-[10px] uppercase tracking-[0.5em] animate-pulse">Computing Architecture</span>
                 </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; filter: blur(20px) scale(1.05); }
          to { opacity: 1; filter: blur(0) scale(1); }
        }
      `}</style>
    </section>
  );
};

export default VisionaryTool;
