import React, { useState } from 'react';
import { Download, ArrowDown } from 'lucide-react';
import InteractiveBowArrow from '../hero/InteractiveBowArrow.jsx';
import HorizontalStoryTrack from '../hero/HorizontalStoryTrack.jsx';
import cvFile from '../../assets/Aroliani Munte-CV.pdf';

const Hero = () => {
  const [pullProgress, setPullProgress] = useState(0);
  const [isLaunched, setIsLaunched] = useState(false);

  const handleLaunch = () => {
    setIsLaunched(true);
    setTimeout(() => {
      setIsLaunched(false);
      setPullProgress(0);
    }, 2800);
  };

  return (
    <section 
      id="hero" 
      className="relative min-h-[90vh] flex flex-col justify-center px-6 pt-28 pb-16 overflow-hidden bg-ivory"
    >
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Brand, Professional Direction & Statement (6 cols) */}
          <div className="lg:col-span-6 flex flex-col justify-center text-left">
            
            {/* Minimalist Signature Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-light text-teal-deep border border-teal-deep/10 text-xs font-mono mb-6 w-fit">
              <span className="w-1.5 h-1.5 rounded-full bg-wood animate-pulse" />
              <span>Developer &amp; Security Portfolio</span>
            </div>

            {/* Brand Name Hierarchy: Aroo */}
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-teal-deep tracking-tight mb-4">
              Aroo<span className="text-wood">.</span>
            </h1>

            {/* Tagline */}
            <div className="border-l-2 border-wood/40 pl-4 mb-6">
              <p className="text-base sm:text-lg text-charcoal font-medium leading-relaxed">
                Aiming High in Cybersecurity,<br />
                Coding Sharp in Full-Stack,<br />
                Crafting Delight in UI/UX.
              </p>
            </div>

            {/* Short Professional Direction Statement */}
            <p className="text-sm sm:text-base text-charcoal-muted max-w-lg leading-relaxed mb-8">
              Undergraduate in Informatics at President University and fellow at Korea-ASEAN Digital Academy. Committed to building secure architectures, performant web applications, and intuitive user experiences.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="#about"
                className="px-5 py-2.5 rounded-xl bg-teal-deep hover:bg-teal-muted text-ivory text-xs sm:text-sm font-mono font-medium flex items-center gap-2 shadow-sm transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Read Introduction</span>
                <ArrowDown className="w-3.5 h-3.5 text-champagne" />
              </a>

              <a
                href={cvFile}
                download="Aroliani_Munte_CV.pdf"
                className="px-5 py-2.5 rounded-xl bg-white hover:bg-ivory-dark text-charcoal text-xs sm:text-sm font-mono font-medium flex items-center gap-2 border border-teal-deep/15 shadow-sm transition-all hover:scale-[1.02]"
              >
                <Download className="w-3.5 h-3.5 text-wood" />
                <span>Resume / CV</span>
              </a>
            </div>

          </div>

          {/* Right Column: 3D Architectural Bow & Arrow Interactive Controller (6 cols) */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center">
            
            {/* Bow & Arrow Controller */}
            <div className="w-full editorial-card p-6 sm:p-8 rounded-3xl bg-white/70 backdrop-blur-md border border-teal-deep/10 shadow-lg">
              
              <div className="flex items-center justify-between mb-2 pb-3 border-b border-teal-deep/5">
                <span className="text-[11px] font-mono text-teal-muted uppercase tracking-wider">
                  Interactive Signature Controller
                </span>
                <span className="text-[11px] font-mono text-charcoal-muted">
                  Aroo 🏹 Arrow
                </span>
              </div>

              <InteractiveBowArrow 
                onProgress={(p) => setPullProgress(p)}
                onLaunch={handleLaunch}
                isLaunched={isLaunched}
              />

              {/* Horizontal Story Progression Track reacting to slow pull */}
              <HorizontalStoryTrack progress={pullProgress} />

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;