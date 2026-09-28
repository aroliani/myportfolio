import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDown, ArrowRight, Crosshair, Sparkles } from 'lucide-react';
import heroBgImage from '../../assets/hero-archery-range.jpg';
import cvFile from '../../assets/Aroliani Munte-CV.pdf';
import { playDrawSound, playReleaseSound, playImpactSound } from '../../utils/archeryAudio';

// The 5 Targets from the reference design, precisely aligned to the background scene
const TARGETS = [
  {
    id: 'about',
    label: 'ABOUT',
    sublabel: 'Background & Bio',
    xPercent: 50.9,
    yPercent: 65.1,
    distanceLabel: '40m',
    description: 'Informatics @ President University · KADA Fellow',
  },
  {
    id: 'projects',
    label: 'PROJECTS',
    sublabel: 'Curated Works',
    xPercent: 61.8,
    yPercent: 63.8,
    distanceLabel: '75m',
    description: 'Full-Stack Apps · Security Labs · UI/UX Showcase',
  },
  {
    id: 'skills',
    label: 'SKILLS',
    sublabel: 'Tech Stack',
    xPercent: 73.4,
    yPercent: 66.4,
    distanceLabel: '65m',
    description: 'Cybersecurity · React · Node.js · PostgreSQL',
  },
  {
    id: 'experience',
    label: 'EXPERIENCE',
    sublabel: 'Track Record',
    xPercent: 83.9,
    yPercent: 67.7,
    distanceLabel: '50m',
    description: 'KADA Fellowship · DPMI QA & Internal Audit Intern',
  },
  {
    id: 'contact',
    label: 'CONTACT',
    sublabel: 'Get In Touch',
    xPercent: 94.1,
    yPercent: 68.4,
    distanceLabel: '35m',
    description: 'Open to Software Engineering & Security Roles',
  },
];

const ArcheryRangeHero = () => {
  const containerRef = useRef(null);

  // Active target being aimed at
  const [activeTarget, setActiveTarget] = useState(TARGETS[1]); // Default to PROJECTS
  const [aimAngle, setAimAngle] = useState(12);

  // Pull interaction state (0 to 1)
  const [pullProgress, setPullProgress] = useState(0);
  const [isPulling, setIsPulling] = useState(false);
  const pullStartPos = useRef({ x: 0, y: 0 });
  const lastSoundTime = useRef(0);

  // Flight & Impact state
  const [flyingArrow, setFlyingArrow] = useState(null);
  const [hitTargetId, setHitTargetId] = useState(null);
  const [impactPulse, setImpactPulse] = useState(null);

  // Calculate mouse aim across the target field
  const handleMouseMove = useCallback((e) => {
    if (!containerRef.current || flyingArrow || isPulling) return;
    const rect = containerRef.current.getBoundingClientRect();
    const mouseXPercent = ((e.clientX - rect.left) / rect.width) * 100;
    const mouseYPercent = ((e.clientY - rect.top) / rect.height) * 100;

    // Bow origin in the scene (left foreground where the arrow rests)
    const bowXPercent = 28;
    const bowYPercent = 64;

    // Calculate aiming angle
    const deltaX = mouseXPercent - bowXPercent;
    const deltaY = mouseYPercent - bowYPercent;
    const deg = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
    setAimAngle(deg);

    // Find the closest target to cursor X
    let closestTarget = TARGETS[0];
    let minDistance = 999;

    TARGETS.forEach((t) => {
      const dist = Math.hypot(t.xPercent - mouseXPercent, t.yPercent - mouseYPercent);
      if (dist < minDistance) {
        minDistance = dist;
        closestTarget = t;
      }
    });

    if (minDistance < 35) {
      setActiveTarget(closestTarget);
    }
  }, [flyingArrow, isPulling]);

  // Pull start handler (mouse or touch)
  const handleStartPull = (clientX, clientY) => {
    if (flyingArrow) return;
    setIsPulling(true);
    pullStartPos.current = { x: clientX, y: clientY };
    playDrawSound(0.2);
  };

  // Pull drag handler
  const handleMovePull = useCallback((clientX, clientY) => {
    if (!isPulling || flyingArrow) return;
    const deltaX = pullStartPos.current.x - clientX;
    const deltaY = clientY - pullStartPos.current.y;
    // Pull backwards (to the left and down) builds tension
    const totalPull = Math.max(0, deltaY * 0.7 + deltaX * 0.5);
    const progress = Math.max(0, Math.min(1, totalPull / 110));
    setPullProgress(progress);

    // Subtle audio tension tick
    const now = Date.now();
    if (now - lastSoundTime.current > 140) {
      playDrawSound(progress);
      lastSoundTime.current = now;
    }
  }, [isPulling, flyingArrow]);

  // Execute arrow shot towards targeted section
  const executeShot = useCallback((target) => {
    const targetToHit = target || activeTarget || TARGETS[1];
    if (flyingArrow || !targetToHit) return;

    // Trigger flight whoosh audio
    playReleaseSound();

    setFlyingArrow({
      targetId: targetToHit.id,
      targetX: targetToHit.xPercent,
      targetY: targetToHit.yPercent,
      startX: 28,
      startY: 64,
    });

    setIsPulling(false);
    setPullProgress(0);

    // Impact timing
    setTimeout(() => {
      // Play crisp impact thud
      playImpactSound();

      setHitTargetId(targetToHit.id);
      setImpactPulse({
        x: targetToHit.xPercent,
        y: targetToHit.yPercent,
      });

      // Smooth scroll to destination section after brief impact celebration
      setTimeout(() => {
        const elem = document.getElementById(targetToHit.id);
        if (elem) {
          elem.scrollIntoView({ behavior: 'smooth' });
        }
      }, 420);

      // Reset arrow and impact state
      setTimeout(() => {
        setFlyingArrow(null);
        setHitTargetId(null);
        setImpactPulse(null);
      }, 2400);
    }, 420);
  }, [activeTarget, flyingArrow]);

  // Pull end handler
  const handleEndPull = useCallback(() => {
    if (!isPulling) return;
    setIsPulling(false);

    if (pullProgress > 0.32) {
      executeShot(activeTarget);
    } else {
      // Release without enough power: snap back gently
      setPullProgress(0);
    }
  }, [isPulling, pullProgress, executeShot, activeTarget]);

  // Direct target click
  const handleTargetClick = (target) => {
    setActiveTarget(target);
    executeShot(target);
  };

  // Window listeners for smooth drag & drop
  useEffect(() => {
    const onMove = (e) => {
      handleMouseMove(e);
      if (isPulling) {
        handleMovePull(e.clientX, e.clientY);
      }
    };
    const onUp = () => {
      if (isPulling) {
        handleEndPull();
      }
    };
    const onTouchMove = (e) => {
      if (isPulling && e.touches.length > 0) {
        handleMovePull(e.touches[0].clientX, e.touches[0].clientY);
      }
    };
    const onTouchEnd = () => {
      if (isPulling) {
        handleEndPull();
      }
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, [isPulling, handleMouseMove, handleMovePull, handleEndPull]);

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative w-full h-screen min-h-[720px] max-h-[1100px] overflow-hidden select-none bg-[#0c1e22]"
    >
      {/* ========================================================================= */}
      {/* 1. CINEMATIC 3D BACKGROUND SCENE WITH DYNAMIC CAMERA ZOOM ON PULL */}
      {/* ========================================================================= */}
      <motion.div
        className="absolute inset-0 w-full h-full bg-cover bg-center pointer-events-none"
        style={{
          backgroundImage: `url(${heroBgImage})`,
          backgroundPosition: 'center 46%',
        }}
        animate={{
          // Camera zoom effect when pulling (Storyboard 02: "The target comes closer as you pull")
          scale: isPulling ? 1 + pullProgress * 0.42 : 1,
          transformOrigin: activeTarget
            ? `${activeTarget.xPercent}% ${activeTarget.yPercent}%`
            : '65% 65%',
        }}
        transition={{
          scale: { duration: isPulling ? 0.04 : 0.4, ease: 'easeOut' },
          transformOrigin: { duration: 0.35 },
        }}
      />

      {/* Atmospheric Vignette & Sunlight Overlay */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-black/60 via-black/20 to-black/25 mix-blend-multiply" />
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/50 via-transparent to-black/30" />

      {/* ========================================================================= */}
      {/* 2. TOP-LEFT EDITORIAL BRAND & VALUE PROPOSITION OVERLAY */}
      {/* ========================================================================= */}
      <div className="relative z-30 pt-24 sm:pt-28 md:pt-32 px-6 sm:px-12 max-w-7xl mx-auto w-full pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="pointer-events-auto max-w-lg"
        >
          {/* Brand Name */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-serif font-black text-ivory tracking-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.7)]">
            Aroo<span className="text-champagne">.</span>
          </h1>

          {/* Tagline */}
          <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg text-ivory/95 font-medium leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
            Aiming High in Cybersecurity,<br />
            Coding Sharp in Full-Stack,<br />
            Crafting Delight in UI/UX.
          </p>

          {/* Action Pill Button: Aim. Pull. Explore. */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              onClick={() => executeShot(activeTarget || TARGETS[1])}
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-teal-deep/85 hover:bg-teal-deep backdrop-blur-md border border-champagne/40 text-ivory text-xs font-mono shadow-lg transition-all group hover:scale-[1.03] active:scale-95"
            >
              <span className="w-4 h-4 rounded-full border border-champagne flex items-center justify-center">
                <span className="w-1.5 h-1.5 rounded-full bg-champagne group-hover:scale-125 transition-transform" />
              </span>
              <span>Aim. Pull. Explore.</span>
              <ArrowRight className="w-3.5 h-3.5 text-champagne group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Quick Resume Download for Technical Interviewers */}
            <a
              href={cvFile}
              download="Aroliani_Munte_CV.pdf"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white/15 hover:bg-white/25 backdrop-blur-md border border-white/20 text-ivory text-xs font-mono transition-all"
            >
              <span>Download CV</span>
            </a>
          </div>

          {/* Real-time Aim HUD readout */}
          <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/40 backdrop-blur-sm border border-champagne/20 text-[11px] font-mono text-champagne-soft">
            <Crosshair className="w-3 h-3 text-champagne animate-spin-slow" />
            <span>Target Locked: <strong className="text-ivory font-bold">{activeTarget?.label}</strong> ({activeTarget?.distanceLabel})</span>
          </div>
        </motion.div>
      </div>

      {/* ========================================================================= */}
      {/* 3. DYNAMIC AIMING SIGHT TRAJECTORY (CONNECTS ARROW TIP TO TARGET) */}
      {/* ========================================================================= */}
      {activeTarget && !flyingArrow && (
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-20">
          <line
            x1="28%"
            y1="64%"
            x2={`${activeTarget.xPercent}%`}
            y2={`${activeTarget.yPercent}%`}
            stroke="rgba(216,185,124,0.35)"
            strokeWidth={isPulling ? "2" : "1.2"}
            strokeDasharray="4 6"
            className="animate-pulse"
          />
        </svg>
      )}

      {/* ========================================================================= */}
      {/* 4. THE 5 INTERACTIVE TARGET HOTSPOTS ACROSS THE HIGHLAND MEADOW */}
      {/* ========================================================================= */}
      <div className="absolute inset-0 z-20 pointer-events-auto">
        {TARGETS.map((target) => {
          const isTargeted = activeTarget?.id === target.id;
          const isHit = hitTargetId === target.id;

          return (
            <div
              key={target.id}
              onClick={() => handleTargetClick(target)}
              onMouseEnter={() => !isPulling && setActiveTarget(target)}
              style={{
                left: `${target.xPercent}%`,
                top: `${target.yPercent}%`,
                transform: 'translate(-50%, -50%)',
              }}
              className="absolute flex flex-col items-center cursor-pointer group"
              title={`Tembak ke section ${target.label}`}
            >
              {/* Floating Target Badge & Distance */}
              <motion.div
                animate={{
                  y: isTargeted ? -8 : 0,
                  scale: isTargeted ? 1.08 : 0.95,
                  opacity: isTargeted ? 1 : 0.85,
                }}
                className={`mb-2 px-2.5 py-1 rounded-xl text-center transition-all duration-200 shadow-md ${
                  isTargeted
                    ? 'bg-teal-deep text-ivory border border-champagne ring-2 ring-champagne/40'
                    : 'bg-black/60 text-ivory/90 border border-white/20 backdrop-blur-sm group-hover:bg-teal-deep'
                }`}
              >
                <div className="text-[11px] font-mono font-bold tracking-wider leading-none">
                  {target.label}
                </div>
                <div className="text-[9px] font-mono text-champagne mt-0.5 leading-none">
                  {target.distanceLabel}
                </div>
              </motion.div>

              {/* Interactive Target Reticle / Bullseye Hotspot */}
              <motion.div
                animate={{
                  scale: isHit ? [1, 1.4, 0.9, 1.15, 1] : isTargeted ? 1.12 : 1,
                  rotate: isHit ? [0, -5, 5, -2, 0] : 0,
                }}
                transition={{ duration: 0.4 }}
                className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center"
              >
                {/* Glowing Reticle when targeted */}
                {isTargeted && (
                  <motion.div
                    initial={{ scale: 0.7, opacity: 0 }}
                    animate={{ scale: [1, 1.15, 1], opacity: [0.7, 1, 0.7] }}
                    transition={{ repeat: Infinity, duration: 1.6 }}
                    className="absolute inset-0 rounded-full border-2 border-champagne shadow-[0_0_15px_rgba(216,185,124,0.6)]"
                  />
                )}

                {/* Bullseye Crosshair Center */}
                <div className={`w-3.5 h-3.5 rounded-full border transition-all ${
                  isTargeted ? 'bg-champagne border-white shadow-lg' : 'bg-white/40 border-transparent'
                }`} />

                {/* Hit Badge on impact */}
                {isHit && (
                  <motion.div
                    initial={{ scale: 0.2, y: 10, opacity: 0 }}
                    animate={{ scale: 1, y: -20, opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute -top-3 px-2 py-0.5 rounded-full bg-champagne text-teal-deep font-mono text-[10px] font-extrabold shadow-lg flex items-center gap-1"
                  >
                    <Sparkles className="w-3 h-3" />
                    <span>HIT!</span>
                  </motion.div>
                )}
              </motion.div>
            </div>
          );
        })}
      </div>

      {/* Radial Impact Shockwave */}
      <AnimatePresence>
        {impactPulse && (
          <motion.div
            initial={{ scale: 0.2, opacity: 0.9 }}
            animate={{ scale: 3.2, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            style={{
              left: `${impactPulse.x}%`,
              top: `${impactPulse.y}%`,
              transform: 'translate(-50%, -50%)',
            }}
            className="absolute pointer-events-none z-30 w-24 h-24 rounded-full border-2 border-champagne bg-champagne/20 shadow-[0_0_25px_rgba(216,185,124,0.8)]"
          />
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* 5. 3D PROJECTILE ARROW FLIGHT TRAJECTORY (RELEASED STATE) */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {flyingArrow && (
          <motion.div
            initial={{
              left: `${flyingArrow.startX}%`,
              top: `${flyingArrow.startY}%`,
              scale: 1,
              opacity: 1,
              rotate: aimAngle,
            }}
            animate={{
              left: `${flyingArrow.targetX}%`,
              top: `${flyingArrow.targetY}%`,
              scale: 0.16,
              opacity: [1, 1, 0.9],
              rotate: aimAngle,
            }}
            transition={{
              duration: 0.42,
              ease: [0.15, 0.8, 0.35, 1],
            }}
            className="absolute z-40 pointer-events-none -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
            style={{ transformOrigin: 'center center' }}
          >
            {/* Arrowhead (Golden Bodkin Point) */}
            <div className="w-0 h-0 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-l-[22px] border-l-champagne filter drop-shadow-[0_0_10px_rgba(216,185,124,0.9)]" />
            {/* Wooden Shaft with Gold Banding */}
            <div className="h-1.5 w-40 bg-gradient-to-r from-champagne via-wood to-wood-dark rounded-full shadow-lg" />
            {/* Fletchings */}
            <div className="w-6 h-4 bg-teal-muted rounded-l-md -ml-2" />
            {/* Motion Blur Trail Streak */}
            <div className="absolute right-0 w-52 h-1 bg-gradient-to-r from-transparent via-champagne/60 to-transparent blur-[1px]" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* 6. INTERACTIVE FOREGROUND ARROW RIG & TENSION GAUGE */}
      {/* ========================================================================= */}
      <div className="absolute inset-0 pointer-events-none z-30 flex flex-col justify-end pb-8 sm:pb-12 px-6 sm:px-12">
        <div className="max-w-7xl mx-auto w-full flex flex-col sm:flex-row items-center sm:items-end justify-between gap-4">
          
          {/* Drag-to-Pull Arrow Anchor / Interaction Controller */}
          <div className="pointer-events-auto flex flex-col items-center">
            {!flyingArrow && (
              <div
                onMouseDown={(e) => handleStartPull(e.clientX, e.clientY)}
                onTouchStart={(e) => handleStartPull(e.touches[0].clientX, e.touches[0].clientY)}
                className="relative group cursor-grab active:cursor-grabbing p-4 flex flex-col items-center"
              >
                {/* Tension Progress Arc / Badge */}
                <motion.div
                  animate={{
                    scale: isPulling ? 1.05 : 1,
                  }}
                  className={`px-4 py-2 rounded-2xl backdrop-blur-md border shadow-xl flex items-center gap-2.5 transition-colors ${
                    isPulling
                      ? 'bg-teal-deep/95 border-champagne text-ivory ring-2 ring-champagne/40'
                      : 'bg-black/60 hover:bg-black/75 border-white/20 text-ivory'
                  }`}
                >
                  <span className="text-champagne font-mono font-bold text-sm">🏹</span>
                  <div className="text-left font-mono">
                    <div className="text-xs font-bold text-champagne-soft">
                      {isPulling
                        ? `Pull Tension: ${Math.round(pullProgress * 100)}%`
                        : 'Hold & Drag to Pull Bow'}
                    </div>
                    <div className="text-[10px] text-ivory/70">
                      {isPulling ? 'Release to shoot target' : `Aimed at: ${activeTarget?.label}`}
                    </div>
                  </div>
                </motion.div>

                {/* Visual String & Arrow Pull Displacement */}
                <motion.div
                  style={{
                    transform: `translateY(${pullProgress * 45}px) translateX(${-pullProgress * 30}px)`,
                  }}
                  className="mt-3 flex items-center gap-2 text-champagne text-xs font-mono font-bold group-hover:scale-105 transition-transform"
                >
                  <span className="animate-bounce">↓</span>
                  <span>Pull Back &amp; Loose</span>
                </motion.div>
              </div>
            )}
          </div>

          {/* Target Navigation Tabs for Quick Tap (Mobile & Recruiter Accessibility) */}
          <div className="pointer-events-auto flex items-center gap-2 overflow-x-auto max-w-full pb-2 sm:pb-0 scrollbar-none">
            {TARGETS.map((t) => (
              <button
                key={t.id}
                onClick={() => handleTargetClick(t)}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all whitespace-nowrap border ${
                  activeTarget?.id === t.id
                    ? 'bg-champagne text-teal-deep font-bold border-champagne shadow-md'
                    : 'bg-black/50 text-ivory/80 border-white/15 hover:bg-black/70 hover:text-ivory'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Quick Direct Scroll Down Link */}
          <div className="pointer-events-auto hidden md:flex items-center gap-2 text-xs font-mono text-ivory/70 hover:text-champagne transition-colors">
            <a href="#about" className="flex items-center gap-1.5">
              <span>Scroll directly</span>
              <ArrowDown className="w-3.5 h-3.5 text-champagne animate-bounce" />
            </a>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ArcheryRangeHero;
