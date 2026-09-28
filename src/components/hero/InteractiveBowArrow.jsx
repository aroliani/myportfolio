import React, { useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

/**
 * InteractiveBowArrow
 * Premium 3D-styled architectural bow & arrow controller.
 * - Slow pull: horizontally reveals portfolio storytelling progression.
 * - Slow release: springs gently back to rest.
 * - Fast pull & release (velocity > threshold): triggers arrow launch towards target.
 */
const InteractiveBowArrow = ({ onProgress, onLaunch, isLaunched }) => {
  const [hitTarget, setHitTarget] = useState(false);
  const [pullRatio, setPullRatio] = useState(0);

  // Motion value for horizontal drag (pulling arrow leftwards)
  const dragX = useMotionValue(0);

  // Smooth springs for string and bow reaction
  const smoothX = useSpring(dragX, { stiffness: 350, damping: 28 });

  // Map drag distance (-160px to 0px) to bowstring bend and limb flex
  const stringNockX = useTransform(smoothX, [-160, 0], [45, 150]);

  // Handle Drag Move
  const handleDrag = (_, info) => {
    // Negative offset because pulling back to the left
    const pulledDistance = Math.max(0, -info.offset.x);
    const progress = Math.min(1, pulledDistance / 150);
    setPullRatio(progress);
    if (onProgress) {
      onProgress(progress);
    }
  };

  // Handle Drag End & Velocity Detection
  const handleDragEnd = (_, info) => {
    const velocity = Math.abs(info.velocity.x);
    const pulledDistance = Math.max(0, -info.offset.x);

    // Fast pull + release threshold: high release velocity and reasonable pull distance
    if (velocity > 380 && pulledDistance > 35) {
      triggerLaunch();
    } else {
      // Slow release: gently spring back to rest
      dragX.set(0);
      setPullRatio(0);
      if (onProgress) {
        onProgress(0);
      }
    }
  };

  const triggerLaunch = () => {
    if (isLaunched) return;
    if (onLaunch) onLaunch();

    // Trigger subtle target hit
    setTimeout(() => {
      setHitTarget(true);
      const targetSection = document.getElementById('about');
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 450);

    setTimeout(() => {
      setHitTarget(false);
      dragX.set(0);
      setPullRatio(0);
      if (onProgress) onProgress(0);
    }, 2500);
  };

  return (
    <div className="relative w-full max-w-xl mx-auto flex flex-col items-center select-none py-4">
      
      {/* 3D Bow & Arrow Stage */}
      <div className="relative w-[340px] sm:w-[460px] h-[220px] flex items-center justify-center">
        
        {/* SVG Bow Rig & String */}
        <svg 
          viewBox="0 0 380 200" 
          className="w-full h-full drop-shadow-[0_12px_24px_rgba(15,56,62,0.12)] overflow-visible"
        >
          <defs>
            {/* Natural Wood Gradient */}
            <linearGradient id="woodLimbGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#c8996e" />
              <stop offset="45%" stopColor="#a87950" />
              <stop offset="85%" stopColor="#7a5232" />
              <stop offset="100%" stopColor="#5c3d24" />
            </linearGradient>

            {/* Deep Teal Grip & Accents */}
            <linearGradient id="tealAccentGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#1e4a4e" />
              <stop offset="50%" stopColor="#0f383e" />
              <stop offset="100%" stopColor="#0a262a" />
            </linearGradient>

            {/* Subtle Champagne Gold Tips */}
            <linearGradient id="champagneGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f5ecd9" />
              <stop offset="50%" stopColor="#d8b97c" />
              <stop offset="100%" stopColor="#b39151" />
            </linearGradient>
          </defs>

          {/* Top Bow Limb */}
          <motion.path
            d="M 175 100 C 170 65, 145 25, 115 15"
            fill="none"
            stroke="url(#woodLimbGrad)"
            strokeWidth="9"
            strokeLinecap="round"
          />
          {/* Top Gold Tip */}
          <path
            d="M 115 15 C 110 12, 105 16, 108 22"
            fill="none"
            stroke="url(#champagneGrad)"
            strokeWidth="5"
            strokeLinecap="round"
          />

          {/* Bottom Bow Limb */}
          <motion.path
            d="M 175 100 C 170 135, 145 175, 115 185"
            fill="none"
            stroke="url(#woodLimbGrad)"
            strokeWidth="9"
            strokeLinecap="round"
          />
          {/* Bottom Gold Tip */}
          <path
            d="M 115 185 C 110 188, 105 184, 108 178"
            fill="none"
            stroke="url(#champagneGrad)"
            strokeWidth="5"
            strokeLinecap="round"
          />

          {/* Riser & Handle (Deep Teal & Wood Grip) */}
          <rect
            x="169"
            y="76"
            width="12"
            height="48"
            rx="6"
            fill="url(#tealAccentGrad)"
            stroke="rgba(216,185,124,0.4)"
            strokeWidth="1.5"
          />
          <line x1="172" y1="90" x2="178" y2="90" stroke="#d8b97c" strokeWidth="1" />
          <line x1="172" y1="100" x2="178" y2="100" stroke="#d8b97c" strokeWidth="1" />
          <line x1="172" y1="110" x2="178" y2="110" stroke="#d8b97c" strokeWidth="1" />

          {/* Dynamic Bowstring connected to limbs and arrow nock */}
          {/* Top Half of String */}
          <motion.line
            x1="110"
            y1="19"
            x2={stringNockX}
            y2="100"
            stroke="rgba(28,40,38,0.75)"
            strokeWidth="1.75"
          />
          {/* Bottom Half of String */}
          <motion.line
            x1="110"
            y1="181"
            x2={stringNockX}
            y2="100"
            stroke="rgba(28,40,38,0.75)"
            strokeWidth="1.75"
          />
        </svg>

        {/* Draggable Arrow (When Not Launched) */}
        {!isLaunched ? (
          <motion.div
            drag="x"
            dragConstraints={{ left: -160, right: 0 }}
            dragElastic={0.08}
            onDrag={handleDrag}
            onDragEnd={handleDragEnd}
            style={{ x: dragX }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ cursor: 'grabbing' }}
            className="absolute left-[35px] sm:left-[60px] top-[88px] flex items-center cursor-grab group z-20"
          >
            {/* Arrow Nock & Dusty-Blue Minimalist Fletchings */}
            <div className="flex flex-col justify-center -space-y-1">
              <div className="w-5 h-2 bg-dusty rounded-sm transform -skew-x-12 opacity-90 shadow-sm" />
              <div className="w-4 h-1.5 bg-champagne rounded-sm my-0.5" />
              <div className="w-5 h-2 bg-dusty rounded-sm transform skew-x-12 opacity-90 shadow-sm" />
            </div>

            {/* Warm Wood & Carbon Shaft */}
            <div className="w-44 sm:w-56 h-[4.5px] bg-gradient-to-r from-wood-dark via-wood to-champagne rounded-full shadow-[0_2px_4px_rgba(0,0,0,0.15)]" />

            {/* Precision Champagne-Gold Arrowhead */}
            <div className="relative -ml-1">
              <div className="w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[14px] border-l-champagne filter drop-shadow-[0_1px_3px_rgba(168,121,80,0.4)]" />
            </div>

            {/* Drag Handle Tooltip */}
            <div className="absolute -bottom-7 left-12 flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/90 border border-teal-deep/10 text-[10px] font-mono text-teal-muted shadow-sm whitespace-nowrap">
              <span>← Tarik (Pull)</span>
            </div>
          </motion.div>
        ) : (
          /* High-Speed Flight Animation on Fast Release */
          <motion.div
            initial={{ x: 60, opacity: 1 }}
            animate={{ x: 650, opacity: [1, 1, 0] }}
            transition={{ duration: 0.38, ease: [0.12, 0.8, 0.3, 1] }}
            className="absolute left-[80px] top-[97px] flex items-center z-30 pointer-events-none"
          >
            {/* Arrow with Motion Trail */}
            <div className="w-32 h-1 bg-gradient-to-l from-champagne via-wood/60 to-transparent blur-[0.5px]" />
            <div className="w-48 h-1.5 bg-gradient-to-r from-wood to-champagne rounded-full shadow-[0_0_10px_rgba(216,185,124,0.8)]" />
            <div className="w-0 h-0 border-t-[7px] border-t-transparent border-b-[7px] border-b-transparent border-l-[16px] border-l-champagne" />
          </motion.div>
        )}

        {/* Minimalist Champagne Gold & Teal Target on the Right */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center pl-2">
          <div className={`relative flex items-center justify-center transition-transform duration-300 ${hitTarget ? 'scale-125' : ''}`}>
            {/* Target Outer Ring */}
            <div className="w-12 h-12 rounded-full border-2 border-champagne/40 bg-white/80 flex items-center justify-center shadow-sm">
              {/* Middle Ring */}
              <div className="w-8 h-8 rounded-full border border-teal-muted/30 bg-teal-light/50 flex items-center justify-center">
                {/* Bullseye Center */}
                <div className="w-4 h-4 rounded-full bg-teal-deep border border-champagne" />
              </div>
            </div>

            {/* Impact feedback */}
            {hitTarget && (
              <motion.span
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1.2, opacity: 1 }}
                className="absolute -top-6 whitespace-nowrap text-[11px] font-mono font-bold text-teal-deep bg-champagne-light px-2 py-0.5 rounded-full border border-champagne shadow"
              >
                Target Acquired 🎯
              </motion.span>
            )}
          </div>
        </div>

      </div>

      {/* Subtle Interaction Guidance */}
      <div className="mt-2 text-center">
        <p className="text-xs text-charcoal-muted font-mono tracking-tight">
          {pullRatio > 0.1 ? (
            <span className="text-teal-muted font-medium">
              Eksplorasi cerita: {Math.round(pullRatio * 100)}% · Lepas cepat untuk lanjut
            </span>
          ) : (
            <span>
              Tarik panah pelan untuk melihat ringkasan · Tarik cepat untuk lanjut
            </span>
          )}
        </p>
      </div>

      {/* Fallback direct button for accessibility & mobile */}
      <div className="mt-4 sm:hidden">
        <button
          onClick={triggerLaunch}
          className="px-4 py-2 rounded-xl bg-teal-deep text-champagne-soft text-xs font-mono font-medium flex items-center gap-1.5 shadow-sm"
        >
          <span>Lanjut ke Profil</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

    </div>
  );
};

export default InteractiveBowArrow;
