import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import heroBgImage from '../../assets/hero-archery-range.jpg';
import { playDrawSound, playReleaseSound, playImpactSound } from '../../utils/archeryAudio';

// The 5 Targets in 1376 x 768 coordinate space
const TARGETS = [
  {
    id: 'about',
    label: 'ABOUT',
    x: 700,
    y: 500,
    xPercent: 50.9,
    yPercent: 65.1,
  },
  {
    id: 'projects',
    label: 'PROJECTS',
    x: 850,
    y: 490,
    xPercent: 61.8,
    yPercent: 63.8,
  },
  {
    id: 'skills',
    label: 'SKILLS',
    x: 1010,
    y: 510,
    xPercent: 73.4,
    yPercent: 66.4,
  },
  {
    id: 'experience',
    label: 'EXPERIENCE',
    x: 1155,
    y: 520,
    xPercent: 83.9,
    yPercent: 67.7,
  },
  {
    id: 'contact',
    label: 'CONTACT',
    x: 1295,
    y: 525,
    xPercent: 94.1,
    yPercent: 68.4,
  },
];

// Coordinate geometry constants in 1376x768 SVG space
const BOW_SHELF = { x: 465, y: 460 };
const REST_TIP_TOP = { x: 420, y: 105 };
const REST_TIP_BOTTOM = { x: 440, y: 720 };
const ARROW_LENGTH = 340;
const NOCK_OFFSET = 205; // distance from shelf back to nock at rest
const MAX_PULL = 135; // maximum pixels of string draw

const ArcheryRangeHero = () => {
  const containerRef = useRef(null);

  // Active target selection
  const [activeTarget, setActiveTarget] = useState(TARGETS[1]); // Default to PROJECTS
  const [hasInteracted, setHasInteracted] = useState(false);

  // Pull interaction state
  const [pullDistance, setPullDistance] = useState(0);
  const [isPulling, setIsPulling] = useState(false);
  const dragStartRef = useRef({ x: 0, y: 0 });
  const lastMoveRef = useRef({ pull: 0, time: 0 });
  const releaseVelocityRef = useRef(0);
  const lastSoundTimeRef = useRef(0);
  const springAnimFrameRef = useRef(null);

  // Flight & Impact state
  const [isFlying, setIsFlying] = useState(false);
  const [flightProgress, setFlightProgress] = useState(0);
  const [hitTargetId, setHitTargetId] = useState(null);
  const flightAnimRef = useRef(null);
  const flightStateRef = useRef({ startX: 0, startY: 0, target: TARGETS[1] });

  // Calculate unit aim vector for current active target
  const targetDx = activeTarget.x - BOW_SHELF.x;
  const targetDy = activeTarget.y - BOW_SHELF.y;
  const targetDist = Math.hypot(targetDx, targetDy);
  const unitX = targetDx / targetDist;
  const unitY = targetDy / targetDist;
  const aimAngleDeg = Math.atan2(unitY, unitX) * (180 / Math.PI);

  // Calculated arrow coordinates
  const pullRatio = Math.min(1, pullDistance / MAX_PULL);

  // Arrow resting positions
  const restNockX = BOW_SHELF.x - unitX * NOCK_OFFSET;
  const restNockY = BOW_SHELF.y - unitY * NOCK_OFFSET;
  const restTipX = restNockX + unitX * ARROW_LENGTH;
  const restTipY = restNockY + unitY * ARROW_LENGTH;

  // Drawn arrow positions
  const currentNockX = restNockX - unitX * pullDistance;
  const currentNockY = restNockY - unitY * pullDistance;
  const currentTipX = restTipX - unitX * pullDistance;
  const currentTipY = restTipY - unitY * pullDistance;

  // Dynamic Bow Limbs deformation
  const tipTopFlexX = REST_TIP_TOP.x - unitX * (pullRatio * 18);
  const tipTopFlexY = REST_TIP_TOP.y - unitY * (pullRatio * 12);
  const tipBottomFlexX = REST_TIP_BOTTOM.x - unitX * (pullRatio * 18);
  const tipBottomFlexY = REST_TIP_BOTTOM.y - unitY * (pullRatio * 12);

  // Smooth Spring Back when released without enough power
  const springArrowBack = useCallback(() => {
    if (springAnimFrameRef.current) cancelAnimationFrame(springAnimFrameRef.current);
    const startPull = pullDistance;
    const startTime = performance.now();
    const duration = 240;

    const step = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);
      // Spring cubic ease out
      const ease = 1 - Math.pow(1 - progress, 3);
      const val = startPull * (1 - ease);
      setPullDistance(val);

      if (progress < 1) {
        springAnimFrameRef.current = requestAnimationFrame(step);
      } else {
        setPullDistance(0);
      }
    };
    springAnimFrameRef.current = requestAnimationFrame(step);
  }, [pullDistance]);

  // Execute actual Arrow Launch and Flight
  const launchArrow = useCallback((target, currentPullRatio, velocity) => {
    if (springAnimFrameRef.current) cancelAnimationFrame(springAnimFrameRef.current);
    if (flightAnimRef.current) cancelAnimationFrame(flightAnimRef.current);

    // Instantly snap string back to rest
    setPullDistance(0);

    // Calculate flight speed: higher velocity / pull = faster shot
    const baseDuration = 320;
    const speedBonus = Math.max(0, Math.min(100, velocity * 70));
    const flightDuration = Math.max(220, baseDuration - speedBonus);

    // Play release whoosh
    playReleaseSound();

    flightStateRef.current = {
      startX: currentTipX,
      startY: currentTipY,
      target: target,
    };

    setIsFlying(true);
    setFlightProgress(0);

    const startTime = performance.now();

    const flightStep = (now) => {
      const elapsed = now - startTime;
      const t = Math.min(1, elapsed / flightDuration);
      // Realistic acceleration curve
      const easedT = Math.pow(t, 1.25);
      setFlightProgress(easedT);

      if (t < 1) {
        flightAnimRef.current = requestAnimationFrame(flightStep);
      } else {
        // IMPACT!
        setIsFlying(false);
        setFlightProgress(1);
        playImpactSound();
        setHitTargetId(target.id);

        // Smooth transition to section after brief impact recoil
        setTimeout(() => {
          const elem = document.getElementById(target.id);
          if (elem) {
            elem.scrollIntoView({ behavior: 'smooth' });
          }
        }, 260);

        // Reset hit effect after 2.2s
        setTimeout(() => {
          setHitTargetId(null);
        }, 2200);
      }
    };

    flightAnimRef.current = requestAnimationFrame(flightStep);
  }, [currentTipX, currentTipY]);

  // Pointer Down on the Arrow (Actual Grab)
  const handleArrowPointerDown = (e) => {
    if (isFlying) return;
    e.preventDefault();
    e.stopPropagation();

    // Cancel any active spring back
    if (springAnimFrameRef.current) cancelAnimationFrame(springAnimFrameRef.current);

    setIsPulling(true);
    setHasInteracted(true);
    dragStartRef.current = { x: e.clientX, y: e.clientY };
    lastMoveRef.current = { pull: pullDistance, time: performance.now() };
    releaseVelocityRef.current = 0;
    playDrawSound(0.2);
  };

  // Direct click on target (for immediate recruiter access)
  const handleTargetClick = (target) => {
    if (isFlying || isPulling) return;
    setActiveTarget(target);
    launchArrow(target, 0.8, 1.2);
  };

  // Global Pointer Listeners for Physical Dragging & Aiming
  useEffect(() => {
    const onPointerMove = (e) => {
      if (isPulling) {
        // 1. Calculate physical pull distance
        const dx = e.clientX - dragStartRef.current.x;
        const dy = e.clientY - dragStartRef.current.y;

        // Project pointer displacement along the negative aim vector
        const pullAlongVector = dx * (-unitX) + dy * (-unitY);
        // Also natural backward drag (left/down)
        const naturalDrag = -dx * 0.75 + dy * 0.65;
        const effectivePull = Math.max(0, Math.max(pullAlongVector, naturalDrag));

        const clamped = Math.min(MAX_PULL, effectivePull);
        setPullDistance(clamped);

        // Track velocity
        const now = performance.now();
        const dt = now - lastMoveRef.current.time;
        if (dt > 12) {
          const v = (clamped - lastMoveRef.current.pull) / dt;
          releaseVelocityRef.current = v;
          lastMoveRef.current = { pull: clamped, time: now };
        }

        // Tactile sound tick
        if (now - lastSoundTimeRef.current > 140) {
          playDrawSound(clamped / MAX_PULL);
          lastSoundTimeRef.current = now;
        }
      } else if (!isFlying) {
        // 2. Aiming: hover across the target range to highlight closest target
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const mouseXPercent = ((e.clientX - rect.left) / rect.width) * 100;

        let closest = TARGETS[0];
        let minDiff = 999;
        TARGETS.forEach((t) => {
          const diff = Math.abs(t.xPercent - mouseXPercent);
          if (diff < minDiff) {
            minDiff = diff;
            closest = t;
          }
        });

        if (minDiff < 22) {
          setActiveTarget(closest);
        }
      }
    };

    const onPointerUp = () => {
      if (!isPulling) return;
      setIsPulling(false);

      const ratio = pullDistance / MAX_PULL;
      if (ratio >= 0.28) {
        // Threshold met: FIRE!
        launchArrow(activeTarget, ratio, releaseVelocityRef.current);
      } else {
        // Threshold not met: spring back gently
        springArrowBack();
      }
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerup', onPointerUp);
    window.addEventListener('pointercancel', onPointerUp);

    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('pointercancel', onPointerUp);
      if (springAnimFrameRef.current) cancelAnimationFrame(springAnimFrameRef.current);
      if (flightAnimRef.current) cancelAnimationFrame(flightAnimRef.current);
    };
  }, [isPulling, pullDistance, unitX, unitY, activeTarget, isFlying, launchArrow, springArrowBack]);

  // Flying Arrow Projectile Coordinates (during flight)
  const currentFlightTarget = flightStateRef.current.target || activeTarget;
  const flightStartX = flightStateRef.current.startX || restTipX;
  const flightStartY = flightStateRef.current.startY || restTipY;
  const flyingTipX = flightStartX + (currentFlightTarget.x - flightStartX) * flightProgress;
  const flyingTipY = flightStartY + (currentFlightTarget.y - flightStartY) * flightProgress;
  const flyingScale = Math.max(0.2, 1.0 - flightProgress * 0.78);
  const flyingNockX = flyingTipX - unitX * (ARROW_LENGTH * flyingScale);
  const flyingNockY = flyingTipY - unitY * (ARROW_LENGTH * flyingScale);

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative w-full h-screen min-h-[700px] max-h-[1100px] overflow-hidden select-none bg-[#091b1f]"
    >
      {/* ========================================================================= */}
      {/* 1. CINEMATIC BACKGROUND SCENE WITH SMOOTH CAMERA ZOOM PROPORTIONAL TO PULL */}
      {/* ========================================================================= */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center pointer-events-none origin-center"
        style={{
          backgroundImage: `url(${heroBgImage})`,
          backgroundPosition: 'center center',
          transformOrigin: `${activeTarget.xPercent}% ${activeTarget.yPercent}%`,
          transform: `scale(${1 + pullRatio * 0.42})`,
          transition: isPulling ? 'none' : 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      />

      {/* Natural Atmospheric Contrast Overlay (Ensures Left Text is Ultra Legible) */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-black/65 via-black/20 to-black/25 mix-blend-multiply" />
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/55 via-transparent to-black/35" />

      {/* ========================================================================= */}
      {/* 2. CONCISE BRAND TYPOGRAPHY (LEFT OVERLAY) */}
      {/* ========================================================================= */}
      <div className="relative z-20 pt-28 sm:pt-32 px-6 sm:px-12 max-w-7xl mx-auto w-full pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="pointer-events-auto max-w-lg"
        >
          {/* Brand */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-serif font-black text-ivory tracking-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.7)]">
            Aroo<span className="text-champagne">.</span>
          </h1>

          {/* Value Proposition */}
          <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg text-ivory/95 font-medium leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
            Aiming High in Cybersecurity,<br />
            Coding Sharp in Full-Stack,<br />
            Crafting Delight in UI/UX.
          </p>

          {/* Quick Direct Scroll Link for Technical Interviewers */}
          <div className="mt-6 flex items-center gap-4">
            <a
              href="#about"
              className="inline-flex items-center gap-1.5 text-xs font-mono text-ivory/70 hover:text-champagne transition-colors drop-shadow"
            >
              <span>Scroll directly</span>
              <ArrowDown className="w-3.5 h-3.5 text-champagne" />
            </a>
          </div>
        </motion.div>
      </div>

      {/* ========================================================================= */}
      {/* 3. INTERACTIVE 3D SVG LAYER: BOW, DRAGGABLE ARROW, STRING & TARGETS */}
      {/* ========================================================================= */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none z-20 overflow-visible"
        viewBox="0 0 1376 768"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* Wood Grain Gradient for Bow Limbs */}
          <linearGradient id="heroBowWood" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4a2c17" />
            <stop offset="25%" stopColor="#87532d" />
            <stop offset="50%" stopColor="#b37849" />
            <stop offset="75%" stopColor="#87532d" />
            <stop offset="100%" stopColor="#4a2c17" />
          </linearGradient>

          {/* Champagne Gold Accents */}
          <linearGradient id="heroChampagne" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#faecd2" />
            <stop offset="50%" stopColor="#d8b97c" />
            <stop offset="100%" stopColor="#a37e3d" />
          </linearGradient>

          {/* Arrow Shaft Cedar Wood Gradient */}
          <linearGradient id="arrowShaft" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#5a351a" />
            <stop offset="50%" stopColor="#ab7b51" />
            <stop offset="100%" stopColor="#5a351a" />
          </linearGradient>

          {/* Subtle Golden Glow Filter */}
          <filter id="goldGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* --------------------------------------------------------------------- */}
        {/* A. 5 TARGET HOTSPOTS & HIGHLIGHTS ACROSS THE FIELD */}
        {/* --------------------------------------------------------------------- */}
        {TARGETS.map((target) => {
          const isSelected = activeTarget.id === target.id;
          const isHit = hitTargetId === target.id;

          return (
            <g
              key={target.id}
              className="cursor-pointer pointer-events-auto"
              onClick={() => handleTargetClick(target)}
              onPointerEnter={() => !isPulling && !isFlying && setActiveTarget(target)}
            >
              {/* Target Banner Label (clean, visible, highlighted when aimed at) */}
              <g
                transform={`translate(${target.x}, ${target.y - 48})`}
                opacity={isSelected ? 1 : 0.75}
              >
                <rect
                  x="-46"
                  y="-14"
                  width="92"
                  height="22"
                  rx="6"
                  fill={isSelected ? 'rgba(15, 56, 62, 0.95)' : 'rgba(0, 0, 0, 0.55)'}
                  stroke={isSelected ? '#d8b97c' : 'rgba(255, 255, 255, 0.2)'}
                  strokeWidth={isSelected ? '1.5' : '1'}
                />
                <text
                  x="0"
                  y="2"
                  textAnchor="middle"
                  fill="#ffffff"
                  fontSize="10"
                  fontFamily="monospace"
                  fontWeight="bold"
                  letterSpacing="0.8px"
                >
                  {target.label}
                </text>
              </g>

              {/* Target Bullseye Highlight Ring */}
              <circle
                cx={target.x}
                cy={target.y}
                r={isSelected ? '24' : '18'}
                fill="transparent"
                stroke={isSelected ? '#d8b97c' : 'transparent'}
                strokeWidth={isSelected ? '2' : '1'}
                strokeDasharray={isSelected ? '4 3' : 'none'}
                opacity={isSelected ? 0.9 : 0}
              />

              {/* Impact Wobble Animation on Hit */}
              {isHit && (
                <circle
                  cx={target.x}
                  cy={target.y}
                  r="35"
                  fill="rgba(216, 185, 124, 0.25)"
                  stroke="#d8b97c"
                  strokeWidth="2"
                  className="animate-ping"
                />
              )}
            </g>
          );
        })}

        {/* --------------------------------------------------------------------- */}
        {/* B. BENT BOW LIMBS (DEFORMS DYNAMICALLY UNDER PULL TENSION) */}
        {/* --------------------------------------------------------------------- */}
        {/* Upper Limb */}
        <path
          d={`M 460 420 C 480 300, 485 180, ${tipTopFlexX} ${tipTopFlexY}`}
          fill="none"
          stroke="url(#heroBowWood)"
          strokeWidth="14"
          strokeLinecap="round"
        />
        {/* Upper Gold Tip */}
        <circle cx={tipTopFlexX} cy={tipTopFlexY} r="7" fill="url(#heroChampagne)" />

        {/* Lower Limb */}
        <path
          d={`M 465 500 C 485 580, 490 660, ${tipBottomFlexX} ${tipBottomFlexY}`}
          fill="none"
          stroke="url(#heroBowWood)"
          strokeWidth="14"
          strokeLinecap="round"
        />
        {/* Lower Gold Tip */}
        <circle cx={tipBottomFlexX} cy={tipBottomFlexY} r="7" fill="url(#heroChampagne)" />

        {/* --------------------------------------------------------------------- */}
        {/* C. VISIBLY STRETCHING BOWSTRING (ATTACHES TO TIPS & FOLLOWS NOCK) */}
        {/* --------------------------------------------------------------------- */}
        <polyline
          points={`${tipTopFlexX},${tipTopFlexY} ${isFlying ? restNockX : currentNockX},${isFlying ? restNockY : currentNockY} ${tipBottomFlexX},${tipBottomFlexY}`}
          fill="none"
          stroke="rgba(245, 240, 225, 0.95)"
          strokeWidth={isPulling ? "2" : "2.5"}
          strokeLinejoin="round"
        />

        {/* --------------------------------------------------------------------- */}
        {/* D. RESTING / DRAGGED ARROW (THE PHYSICAL DRAGGABLE OBJECT) */}
        {/* --------------------------------------------------------------------- */}
        {!isFlying && (
          <g
            className="cursor-grab active:cursor-grabbing pointer-events-auto select-none"
            onPointerDown={handleArrowPointerDown}
            style={{ touchAction: 'none' }}
          >
            {/* Generous Invisible Hit Area for Easy Touch & Mouse Grabbing */}
            <line
              x1={currentNockX}
              y1={currentNockY}
              x2={currentTipX}
              y2={currentTipY}
              stroke="transparent"
              strokeWidth="50"
              strokeLinecap="round"
            />

            {/* Arrow Shaft (Cedar Wood) */}
            <line
              x1={currentNockX}
              y1={currentNockY}
              x2={currentTipX}
              y2={currentTipY}
              stroke="url(#arrowShaft)"
              strokeWidth="5.5"
              strokeLinecap="round"
            />

            {/* Gold Thread Bandings along Shaft */}
            <line
              x1={currentTipX - unitX * 40}
              y1={currentTipY - unitY * 40}
              x2={currentTipX - unitX * 36}
              y2={currentTipY - unitY * 36}
              stroke="#d8b97c"
              strokeWidth="6"
            />
            <line
              x1={currentTipX - unitX * 70}
              y1={currentTipY - unitY * 70}
              x2={currentTipX - unitX * 66}
              y2={currentTipY - unitY * 66}
              stroke="#d8b97c"
              strokeWidth="6"
            />

            {/* Golden Bodkin Arrowhead Pointing toward Active Target */}
            <g transform={`translate(${currentTipX}, ${currentTipY}) rotate(${aimAngleDeg})`}>
              <polygon
                points="0,0 -24,-9 -20,0 -24,9"
                fill="url(#heroChampagne)"
                filter="url(#goldGlow)"
              />
            </g>

            {/* Arrow Fletching Feathers (Teal & Gold at Nock) */}
            <g transform={`translate(${currentNockX}, ${currentNockY}) rotate(${aimAngleDeg})`}>
              <polygon points="0,0 35,-9 48,-9 12,0" fill="#0f383e" />
              <polygon points="0,0 35,9 48,9 12,0" fill="#0f383e" />
              <line x1="0" y1="0" x2="48" y2="0" stroke="#d8b97c" strokeWidth="2.5" />
            </g>
          </g>
        )}

        {/* --------------------------------------------------------------------- */}
        {/* E. FLYING ARROW IN PERSPECTIVE FLIGHT TOWARD SELECTED TARGET */}
        {/* --------------------------------------------------------------------- */}
        {isFlying && (
          <g>
            {/* Motion Blur Trail */}
            <line
              x1={flyingNockX}
              y1={flyingNockY}
              x2={flyingNockX - unitX * (110 * flyingScale)}
              y2={flyingNockY - unitY * (110 * flyingScale)}
              stroke="rgba(216, 185, 124, 0.65)"
              strokeWidth={4 * flyingScale}
              strokeLinecap="round"
            />

            {/* Flying Arrow Shaft */}
            <line
              x1={flyingNockX}
              y1={flyingNockY}
              x2={flyingTipX}
              y2={flyingTipY}
              stroke="url(#arrowShaft)"
              strokeWidth={5.5 * flyingScale}
              strokeLinecap="round"
            />

            {/* Flying Arrowhead */}
            <g transform={`translate(${flyingTipX}, ${flyingTipY}) rotate(${aimAngleDeg}) scale(${flyingScale})`}>
              <polygon
                points="0,0 -24,-9 -20,0 -24,9"
                fill="url(#heroChampagne)"
                filter="url(#goldGlow)"
              />
            </g>
          </g>
        )}
      </svg>

      {/* ========================================================================= */}
      {/* 4. SUBTLE INTERACTION HINT NEAR ARROW (FADES OUT AFTER FIRST TOUCH) */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {!hasInteracted && !isPulling && !isFlying && (
          <motion.div
            initial={{ opacity: 0, x: 0 }}
            animate={{ opacity: [0.5, 0.95, 0.5], x: [0, -6, 0] }}
            exit={{ opacity: 0 }}
            transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
            style={{
              position: 'absolute',
              left: `${(restNockX / 1376) * 100}%`,
              top: `${(restNockY / 768) * 100 + 4}%`,
              transform: 'translate(-50%, 0)',
            }}
            className="pointer-events-none z-30 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-sm border border-champagne/30 text-champagne text-[11px] font-mono shadow-md"
          >
            <span className="text-xs">←</span>
            <span>Hold &amp; drag the arrow</span>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ArcheryRangeHero;
