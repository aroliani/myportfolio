import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Code, Sparkles, GraduationCap } from 'lucide-react';

const HorizontalStoryTrack = ({ progress }) => {
  // If progress is very low, show subtle hint
  const clamped = Math.max(0, Math.min(1, progress));

  return (
    <div className="w-full max-w-2xl mx-auto overflow-hidden mt-4">
      {/* Progress Line */}
      <div className="w-full h-1 bg-teal-deep/5 rounded-full overflow-hidden mb-4">
        <motion.div
          className="h-full bg-gradient-to-r from-teal-deep via-wood to-champagne"
          style={{ width: `${clamped * 100}%` }}
        />
      </div>

      {/* Story Stage Cards (Horizontal Slider driven by arrow pull) */}
      <div className="relative h-28 sm:h-24">
        {/* Stage 0: Initial Hint */}
        <div 
          className={`absolute inset-0 transition-opacity duration-300 flex items-center justify-center text-center ${
            clamped < 0.15 ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
        >
          <p className="text-xs text-charcoal-muted font-mono">
            Aiming High in Cybersecurity · Coding Sharp in Full-Stack · Crafting Delight in UI/UX
          </p>
        </div>

        {/* Stage 1: Core Focus (progress 0.15 to 0.5) */}
        <div 
          className={`absolute inset-0 transition-opacity duration-300 flex items-center justify-center ${
            clamped >= 0.15 && clamped < 0.55 ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
        >
          <div className="p-3.5 rounded-2xl bg-white border border-teal-deep/10 shadow-sm flex items-center gap-3 w-full">
            <div className="w-9 h-9 rounded-xl bg-teal-light flex items-center justify-center text-teal-deep shrink-0">
              <Shield className="w-4 h-4" />
            </div>
            <div className="text-left">
              <h4 className="text-xs font-mono font-bold text-teal-deep uppercase tracking-wider">
                01. Technical Mission
              </h4>
              <p className="text-xs text-charcoal-soft line-clamp-2">
                Designing secure, functional, and user-centric systems bridging ethical hacking with modern full-stack web applications.
              </p>
            </div>
          </div>
        </div>

        {/* Stage 2: Education & KADA Fellowship (progress 0.55 to 0.85) */}
        <div 
          className={`absolute inset-0 transition-opacity duration-300 flex items-center justify-center ${
            clamped >= 0.55 && clamped < 0.85 ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
        >
          <div className="p-3.5 rounded-2xl bg-white border border-wood/20 shadow-sm flex items-center gap-3 w-full">
            <div className="w-9 h-9 rounded-xl bg-champagne-light flex items-center justify-center text-wood-dark shrink-0">
              <GraduationCap className="w-4 h-4" />
            </div>
            <div className="text-left">
              <h4 className="text-xs font-mono font-bold text-wood-dark uppercase tracking-wider">
                02. Academic &amp; Fellowship
              </h4>
              <p className="text-xs text-charcoal-soft line-clamp-2">
                Sixth-Semester Informatics @ President University &amp; Scholar at Korea-ASEAN Digital Academy (KADA).
              </p>
            </div>
          </div>
        </div>

        {/* Stage 3: Project & Ready to Advance (progress >= 0.85) */}
        <div 
          className={`absolute inset-0 transition-opacity duration-300 flex items-center justify-center ${
            clamped >= 0.85 ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
        >
          <div className="p-3.5 rounded-2xl bg-teal-deep text-white border border-champagne shadow-md flex items-center gap-3 w-full">
            <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-champagne shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div className="text-left flex-1">
              <h4 className="text-xs font-mono font-bold text-champagne uppercase tracking-wider">
                03. Target Locked!
              </h4>
              <p className="text-xs text-ivory-muted line-clamp-2">
                Lepaskan panah dengan cepat untuk langsung meluncur ke profil &amp; rincian portofolio lengkap.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HorizontalStoryTrack;
