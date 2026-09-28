import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import cvFile from '../../assets/Aroliani Munte-CV.pdf';

// 4 Architectural targets positioned across the distant range
const TARGETS = [
  {
    id: 'about',
    label: 'ABOUT',
    sublabel: 'Background & Bio',
    xPercent: 18,
    yPercent: 36,
    scale: 0.95,
    distanceLabel: '40m',
  },
  {
    id: 'projects',
    label: 'PROJECTS',
    sublabel: 'Curated Works',
    xPercent: 39,
    yPercent: 29,
    scale: 0.82,
    distanceLabel: '75m',
  },
  {
    id: 'skills',
    label: 'SKILLS',
    sublabel: 'Stack & Tooling',
    xPercent: 61,
    yPercent: 30,
    scale: 0.85,
    distanceLabel: '65m',
  },
  {
    id: 'contact',
    label: 'CONTACT',
    sublabel: 'Get In Touch',
    xPercent: 82,
    yPercent: 38,
    scale: 0.98,
    distanceLabel: '35m',
  },
];

const ArcheryRangeHero = () => {
  const containerRef = useRef(null);
  
  // Aiming angle in degrees (-28 to +28)
  const [aimAngle, setAimAngle] = useState(0);
  const [activeTarget, setActiveTarget] = useState(TARGETS[0]);
  
  // Pull state (0 to 1)
  const [pullProgress, setPullProgress] = useState(0);
  const [isPulling, setIsPulling] = useState(false);
  const pullStartY = useRef(0);
  
  // Flight state
  const [flyingArrow, setFlyingArrow] = useState(null);
  const [hitTargetId, setHitTargetId] = useState(null);

  // Calculate aim angle based on cursor position relative to bow origin
  const handleMouseMove = useCallback((e) => {
    if (!containerRef.current || flyingArrow) return;
    const rect = containerRef.current.getBoundingClientRect();
    const bowOriginX = rect.left + rect.width / 2;
    const bowOriginY = rect.bottom - 40;

    const deltaX = e.clientX - bowOriginX;
    const deltaY = bowOriginY - e.clientY;

    if (deltaY <= 0) return;

    // Angle in degrees from vertical (90 deg is straight up)
    const rad = Math.atan2(deltaX, deltaY);
    const deg = rad * (180 / Math.PI);
    const clampedDeg = Math.max(-28, Math.min(28, deg));
    setAimAngle(clampedDeg);

    // Find which target aligns best with this angle
    const mouseXPercent = ((e.clientX - rect.left) / rect.width) * 100;
    let closestTarget = TARGETS[0];
    let minDiff = 999;

    TARGETS.forEach((t) => {
      const diff = Math.abs(t.xPercent - mouseXPercent);
      if (diff < minDiff) {
        minDiff = diff;
        closestTarget = t;
      }
    });

    if (minDiff < 18) {
      setActiveTarget(closestTarget);
    }
  }, [flyingArrow]);

  // Pulling arrow with touch / mouse drag
  const handleStartPull = (clientY) => {
    if (flyingArrow) return;
    setIsPulling(true);
    pullStartY.current = clientY;
  };

  const handleMovePull = useCallback((clientY) => {
    if (!isPulling || flyingArrow) return;
    const deltaY = clientY - pullStartY.current;
    const progress = Math.max(0, Math.min(1, deltaY / 90));
    setPullProgress(progress);
  }, [isPulling, flyingArrow]);

  const executeShot = useCallback((target) => {
    const targetToHit = target || activeTarget;
    if (flyingArrow || !targetToHit) return;

    setFlyingArrow({
      targetId: targetToHit.id,
      targetX: targetToHit.xPercent,
      targetY: targetToHit.yPercent,
    });

    setIsPulling(false);
    setPullProgress(0);

    // Impact timing
    setTimeout(() => {
      setHitTargetId(targetToHit.id);
      
      // Smooth scroll to destination section
      setTimeout(() => {
        const elem = document.getElementById(targetToHit.id);
        if (elem) {
          elem.scrollIntoView({ behavior: 'smooth' });
        }
      }, 350);

      // Reset arrow after navigation
      setTimeout(() => {
        setFlyingArrow(null);
        setHitTargetId(null);
      }, 2200);
    }, 420);
  }, [activeTarget, flyingArrow]);

  const handleEndPull = useCallback(() => {
    if (!isPulling) return;
    setIsPulling(false);

    if (pullProgress > 0.38) {
      executeShot(activeTarget);
    } else {
      // Gentle spring return
      setPullProgress(0);
    }
  }, [isPulling, pullProgress, executeShot, activeTarget]);

  // Direct click on a distant target
  const handleTargetClick = (target) => {
    setActiveTarget(target);
    executeShot(target);
  };

  // Global mousemove and mouseup listeners when dragging
  useEffect(() => {
    const onMove = (e) => {
      handleMouseMove(e);
      if (isPulling) {
        handleMovePull(e.clientY);
      }
    };
    const onUp = () => {
      if (isPulling) {
        handleEndPull();
      }
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
  }, [isPulling, handleMouseMove, handleMovePull, handleEndPull]);

  return (
    <section 
      ref={containerRef}
      id="hero" 
      className="relative w-full h-screen min-h-[700px] max-h-[1050px] overflow-hidden select-none bg-gradient-to-b from-[#f4efe4] via-[#faf7f2] to-[#ede3d4] flex flex-col justify-between"
    >
      {/* ========================================================================= */}
      {/* 1. ATMOSPHERIC ARCHERY RANGE ENVIRONMENT (DISTANT PERSPECTIVE) */}
      {/* ========================================================================= */}
      
      {/* Subtle Distance Horizon Lines & Range Markers */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Soft atmospheric gradient bands */}
        <div className="absolute top-[28%] left-0 right-0 h-px bg-gradient-to-r from-transparent via-teal-deep/10 to-transparent" />
        <div className="absolute top-[34%] left-0 right-0 h-px bg-gradient-to-r from-transparent via-wood/15 to-transparent" />
        <div className="absolute top-[42%] left-0 right-0 h-px bg-gradient-to-r from-transparent via-teal-deep/8 to-transparent" />
        
        {/* Architectural distance elevation curves */}
        <svg 
          viewBox="0 0 1440 400" 
          className="absolute top-[18%] left-0 w-full h-[400px] opacity-[0.07] text-teal-deep fill-current"
          preserveAspectRatio="none"
        >
          <path d="M0,160 Q360,120 720,150 T1440,130 L1440,400 L0,400 Z" />
          <path d="M0,220 Q480,180 960,210 T1440,190 L1440,400 L0,400 Z" opacity="0.5" />
        </svg>

        {/* Minimal distance markers */}
        <div className="absolute top-[24%] left-8 text-[10px] font-mono text-charcoal-muted/60 tracking-widest uppercase">
          Range Target Field · 100m
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. TOP EDITORIAL BRANDING & DIRECT RECRUITER ACTIONS */}
      {/* ========================================================================= */}
      <div className="relative z-30 pt-28 px-6 sm:px-12 max-w-7xl mx-auto w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pointer-events-none">
        
        {/* Brand & Professional Statement */}
        <div className="pointer-events-auto max-w-lg">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-light text-teal-deep border border-teal-deep/10 text-xs font-mono mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-wood animate-ping" />
            <span>Interactive Archery Range Portfolio</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold text-teal-deep tracking-tight">
            Aroo<span className="text-wood">.</span>
          </h1>

          <p className="mt-2 text-xs sm:text-sm text-charcoal-soft font-medium leading-relaxed">
            Aiming High in Cybersecurity · Coding Sharp in Full-Stack · Crafting Delight in UI/UX.
          </p>
        </div>

        {/* Interaction Hint & Resume Link */}
        <div className="pointer-events-auto flex flex-col sm:items-end gap-2.5">
          <div className="px-4 py-2 rounded-2xl bg-white/80 backdrop-blur-md border border-teal-deep/10 shadow-sm text-xs font-mono text-teal-deep flex items-center gap-2">
            <span className="text-wood text-sm">🏹</span>
            <span>Arahkan &amp; tarik panah ke target sasaran</span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="#about"
              className="text-xs font-mono text-charcoal-muted hover:text-teal-deep transition-colors flex items-center gap-1"
            >
              <span>Scroll langsung</span>
              <ArrowDown className="w-3 h-3" />
            </a>
            <span className="text-charcoal-muted/30">|</span>
            <a
              href={cvFile}
              download="Aroliani_Munte_CV.pdf"
              className="text-xs font-mono text-wood-dark hover:underline font-medium"
            >
              Download Resume
            </a>
          </div>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* 3. DISTANT ARCHERY TARGETS DISTRIBUTED ACROSS THE RANGE */}
      {/* ========================================================================= */}
      <div className="absolute inset-0 pointer-events-auto z-20">
        {TARGETS.map((target) => {
          const isTargeted = activeTarget?.id === target.id;
          const isHit = hitTargetId === target.id;

          return (
            <div
              key={target.id}
              onClick={() => handleTargetClick(target)}
              style={{
                left: `${target.xPercent}%`,
                top: `${target.yPercent}%`,
                transform: `translate(-50%, -50%) scale(${target.scale})`,
              }}
              className="absolute flex flex-col items-center cursor-pointer group"
            >
              {/* Distance Tag & Label */}
              <motion.div 
                animate={{ 
                  y: isTargeted ? -4 : 0,
                  scale: isTargeted ? 1.08 : 1,
                }}
                className={`mb-2 px-3 py-1 rounded-xl transition-all duration-200 text-center ${
                  isTargeted 
                    ? 'bg-teal-deep text-ivory shadow-md ring-2 ring-champagne' 
                    : 'bg-white/90 text-charcoal-soft border border-teal-deep/10 shadow-sm group-hover:bg-teal-light'
                }`}
              >
                <span className="text-xs font-mono font-bold tracking-wider block">
                  {target.label}
                </span>
                <span className="text-[9px] font-mono opacity-70 block">
                  {target.distanceLabel} · {target.sublabel}
                </span>
              </motion.div>

              {/* The Archery Target Stand & Boss (Concentric Rings) */}
              <motion.div
                animate={{
                  scale: isHit ? [1, 1.25, 0.95, 1.05, 1] : isTargeted ? 1.08 : 1,
                  rotate: isHit ? [0, -3, 3, -1, 0] : 0,
                }}
                transition={{ duration: 0.4 }}
                className="relative flex items-center justify-center drop-shadow-md"
              >
                {/* Wooden Tripod Stand Behind Target */}
                <div className="absolute -bottom-10 w-12 h-14 pointer-events-none flex justify-center">
                  <div className="w-1.5 h-12 bg-wood-dark transform -rotate-12 rounded-full" />
                  <div className="w-1.5 h-12 bg-wood rounded-full -mx-0.5" />
                  <div className="w-1.5 h-12 bg-wood-dark transform rotate-12 rounded-full" />
                </div>

                {/* Target Boss (Circles) */}
                <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 transition-all duration-300 flex items-center justify-center p-1 ${
                  isTargeted 
                    ? 'border-champagne bg-champagne-light/50 ring-4 ring-champagne/30' 
                    : 'border-white/80 bg-white/70 shadow'
                }`}>
                  {/* Outer White / Cream Ring */}
                  <div className="w-full h-full rounded-full border border-teal-deep/15 bg-ivory flex items-center justify-center p-1">
                    {/* Dusty Blue Ring */}
                    <div className="w-full h-full rounded-full border border-teal-deep/10 bg-dusty/25 flex items-center justify-center p-1">
                      {/* Deep Teal Ring */}
                      <div className="w-full h-full rounded-full border border-teal-deep/20 bg-teal-muted flex items-center justify-center p-1">
                        {/* Champagne Gold Bullseye Center */}
                        <div className="w-3.5 h-3.5 rounded-full bg-champagne border border-wood shadow-inner flex items-center justify-center">
                          <div className="w-1 h-1 rounded-full bg-teal-deep" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Arrow Sticking in Target on Hit */}
                {isHit && (
                  <motion.div
                    initial={{ scale: 0.3, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="absolute -top-3 -right-2 pointer-events-none"
                  >
                    <div className="w-8 h-1 bg-wood-dark transform rotate-45 rounded-full shadow" />
                    <span className="absolute -top-4 -right-1 text-[10px] font-mono font-bold text-teal-deep bg-champagne px-1.5 py-0.5 rounded shadow">
                      HIT!
                    </span>
                  </motion.div>
                )}
              </motion.div>
            </div>
          );
        })}
      </div>

      {/* ========================================================================= */}
      {/* 4. FLYING ARROW IN 3D PERSPECTIVE (TRAVELS INTO THE DISTANCE) */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {flyingArrow && (
          <motion.div
            initial={{
              left: '50%',
              top: '90%',
              scale: 1,
              opacity: 1,
              rotate: aimAngle,
            }}
            animate={{
              left: `${flyingArrow.targetX}%`,
              top: `${flyingArrow.targetY + 4}%`,
              scale: 0.16,
              opacity: [1, 1, 0.95],
              rotate: aimAngle * 0.7,
            }}
            transition={{
              duration: 0.42,
              ease: [0.12, 0.75, 0.35, 1],
            }}
            className="absolute z-40 pointer-events-none -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
          >
            {/* Arrowhead */}
            <div className="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[20px] border-b-champagne filter drop-shadow-[0_0_8px_rgba(216,185,124,0.9)]" />
            {/* Shaft */}
            <div className="w-1.5 h-36 bg-gradient-to-b from-wood via-wood-dark to-charcoal rounded-full shadow-lg" />
            {/* Motion Blur Trail */}
            <div className="w-1 h-44 bg-gradient-to-t from-transparent via-champagne/40 to-transparent blur-[1px] -mt-10" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* 5. VERY LARGE FOREGROUND BOW & NOCKED ARROW (FIRST-PERSON ARCHER VIEW) */}
      {/* ========================================================================= */}
      <div 
        className="relative z-30 w-full flex flex-col items-center justify-end pointer-events-none pb-0"
        style={{ height: '360px' }}
      >
        {/* Aim Indicator Badge Above Bow */}
        <div className="mb-2 pointer-events-auto">
          <span className="text-[11px] font-mono px-3 py-1 rounded-full bg-white/90 border border-teal-deep/15 text-teal-deep shadow-sm">
            Targeting: <strong className="text-wood-dark">{activeTarget?.label}</strong> ({activeTarget?.distanceLabel})
          </span>
        </div>

        {/* Foreground Bow Rig that pivots with mouse aim */}
        <div
          style={{
            transform: `rotate(${aimAngle}deg)`,
            transformOrigin: '50% 95%',
            transition: isPulling ? 'none' : 'transform 0.12s ease-out',
          }}
          className="relative w-[540px] sm:w-[740px] h-[280px] sm:h-[340px] flex items-center justify-center overflow-visible"
        >
          {/* SVG Bow Limbs & Dynamic String */}
          <svg 
            viewBox="0 0 740 340" 
            className="w-full h-full drop-shadow-[0_20px_35px_rgba(15,56,62,0.22)] overflow-visible pointer-events-none"
          >
            <defs>
              {/* Natural Layered Wood Gradient */}
              <linearGradient id="bowWoodGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#7a5232" />
                <stop offset="25%" stopColor="#c8996e" />
                <stop offset="50%" stopColor="#a87950" />
                <stop offset="75%" stopColor="#c8996e" />
                <stop offset="100%" stopColor="#7a5232" />
              </linearGradient>

              {/* Deep Teal Leather Wrap */}
              <linearGradient id="gripTealGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#1e4a4e" />
                <stop offset="50%" stopColor="#0f383e" />
                <stop offset="100%" stopColor="#0a262a" />
              </linearGradient>

              {/* Champagne Gold Accents */}
              <linearGradient id="goldTipGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f5ecd9" />
                <stop offset="50%" stopColor="#d8b97c" />
                <stop offset="100%" stopColor="#b39151" />
              </linearGradient>
            </defs>

            {/* Left Bow Limb (Reaching off bottom-left) */}
            <path
              d="M 370 210 C 260 210, 100 240, 20 310"
              fill="none"
              stroke="url(#bowWoodGrad)"
              strokeWidth="20"
              strokeLinecap="round"
            />
            {/* Left Gold Tip */}
            <path
              d="M 35 298 C 22 308, 12 318, 18 325"
              fill="none"
              stroke="url(#goldTipGrad)"
              strokeWidth="10"
              strokeLinecap="round"
            />

            {/* Right Bow Limb (Reaching off bottom-right) */}
            <path
              d="M 370 210 C 480 210, 640 240, 720 310"
              fill="none"
              stroke="url(#bowWoodGrad)"
              strokeWidth="20"
              strokeLinecap="round"
            />
            {/* Right Gold Tip */}
            <path
              d="M 705 298 C 718 308, 728 318, 722 325"
              fill="none"
              stroke="url(#goldTipGrad)"
              strokeWidth="10"
              strokeLinecap="round"
            />

            {/* Center Riser & Grip (Deep Teal Leather Wrap with Gold Stitching) */}
            <rect
              x="346"
              y="185"
              width="48"
              height="50"
              rx="12"
              fill="url(#gripTealGrad)"
              stroke="#d8b97c"
              strokeWidth="2"
            />
            <line x1="350" y1="198" x2="390" y2="198" stroke="#d8b97c" strokeWidth="1.5" strokeDasharray="3 3" />
            <line x1="350" y1="210" x2="390" y2="210" stroke="#d8b97c" strokeWidth="1.5" strokeDasharray="3 3" />
            <line x1="350" y1="222" x2="390" y2="222" stroke="#d8b97c" strokeWidth="1.5" strokeDasharray="3 3" />

            {/* Dynamic Bowstring connecting Left Tip to Nock to Right Tip */}
            {/* Left Half of Bowstring */}
            <line
              x1="22"
              y1="316"
              x2="370"
              y2={210 + pullProgress * 75}
              stroke="rgba(28,40,38,0.85)"
              strokeWidth="2.5"
            />
            {/* Right Half of Bowstring */}
            <line
              x1="718"
              y1="316"
              x2="370"
              y2={210 + pullProgress * 75}
              stroke="rgba(28,40,38,0.85)"
              strokeWidth="2.5"
            />
          </svg>

          {/* ========================================================================= */}
          {/* NOCKED ARROW (LARGE IN FOREGROUND, DRAGGABLE / INTERACTIVE) */}
          {/* ========================================================================= */}
          {!flyingArrow && (
            <div
              onMouseDown={(e) => handleStartPull(e.clientY)}
              onTouchStart={(e) => handleStartPull(e.touches[0].clientY)}
              style={{
                transform: `translateY(${pullProgress * 75}px)`,
                cursor: isPulling ? 'grabbing' : 'grab',
              }}
              className="absolute top-2 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-auto z-40 group"
            >
              {/* Precision Champagne Arrowhead Pointing into the Distance */}
              <div className="w-0 h-0 border-l-[11px] border-l-transparent border-r-[11px] border-r-transparent border-b-[28px] border-b-champagne filter drop-shadow-[0_2px_8px_rgba(216,185,124,0.6)]" />

              {/* Natural Wood / Carbon Arrow Shaft */}
              <div className="w-2.5 h-56 bg-gradient-to-b from-champagne via-wood to-charcoal rounded-full shadow-md" />

              {/* Dusty-Blue Fletching Feathers at the Nock */}
              <div className="relative -mt-2 flex items-center justify-center">
                <div className="w-7 h-8 bg-gradient-to-b from-dusty to-dusty-light clip-fletching rounded-sm shadow-md" />
              </div>

              {/* Subtle Pull Indicator Tooltip */}
              <div className="mt-2 px-3 py-1 rounded-full bg-white/95 border border-teal-deep/20 text-[10px] font-mono text-teal-deep font-bold shadow-md whitespace-nowrap">
                {isPulling ? (
                  <span>Tegangan: {Math.round(pullProgress * 100)}% (Lepas untuk Tembak)</span>
                ) : (
                  <span>↓ Tarik &amp; Lepaskan untuk Menembak</span>
                )}
              </div>
            </div>
          )}

        </div>
      </div>

    </section>
  );
};

export default ArcheryRangeHero;
