import React, { useCallback, useEffect, useRef, useState } from 'react';
import { animate } from 'framer-motion';

/*
 * Original, self-contained vector bow + archer scene.
 * The arrow is nocked on the bowstring. Pull it back with the string and
 * release (or press Enter/Space) to loose it. Pointer + keyboard + touch.
 */

const NOCK_REST_X = 300;
const NOCK_REST_Y = 260;
const MAX_PULL = 150;
const FIRE_THRESHOLD = 40;

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

const BowArrow = ({ onShoot }) => {
  const [pull, setPull] = useState(0);
  const [flightX, setFlightX] = useState(0);
  const [isFiring, setIsFiring] = useState(false);
  const [recoil, setRecoil] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  const svgRef = useRef(null);
  const pullRef = useRef(0);
  const dragRef = useRef({ active: false, startX: 0, startPull: 0, scale: 1 });
  const animationsRef = useRef([]);
  const timersRef = useRef([]);

  const reducedMotion = useRef(
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );

  const stopAnimations = useCallback(() => {
    animationsRef.current.forEach((controls) => controls?.stop?.());
    animationsRef.current = [];
  }, []);

  useEffect(() => () => {
    stopAnimations();
    timersRef.current.forEach((id) => window.clearTimeout(id));
  }, [stopAnimations]);

  const setPullValue = useCallback((value) => {
    pullRef.current = value;
    setPull(value);
  }, []);

  const measureScale = useCallback(() => {
    const el = svgRef.current;
    if (!el) return 1;
    const rect = el.getBoundingClientRect();
    return rect.width > 0 ? 460 / rect.width : 1;
  }, []);

  const springBack = useCallback(() => {
    stopAnimations();
    if (reducedMotion.current) {
      setPullValue(0);
      return;
    }
    const controls = animate(pullRef.current, 0, {
      type: 'spring',
      stiffness: 340,
      damping: 22,
      onUpdate: setPullValue,
    });
    animationsRef.current.push(controls);
  }, [setPullValue, stopAnimations]);

  const fire = useCallback(() => {
    stopAnimations();
    setHasInteracted(true);
    setIsFiring(true);
    setRecoil(true);
    timersRef.current.push(window.setTimeout(() => setRecoil(false), 520));
    if (!reducedMotion.current) {
      timersRef.current.push(window.setTimeout(() => onShoot?.(), 90));
    }

    if (reducedMotion.current) {
      setPullValue(0);
      setFlightX(0);
      setIsFiring(false);
      return;
    }

    // String snaps forward
    const stringControls = animate(pullRef.current, 0, {
      duration: 0.14,
      ease: 'easeOut',
      onUpdate: setPullValue,
    });
    // Arrow flies down-range
    const arrowControls = animate(0, -1180, {
      duration: 0.55,
      ease: [0.2, 0.9, 0.3, 1],
      onUpdate: setFlightX,
      onComplete: () => {
        setFlightX(0);
        setIsFiring(false);
      },
    });
    animationsRef.current.push(stringControls, arrowControls);
  }, [onShoot, setPullValue, stopAnimations]);

  const autoShoot = useCallback(() => {
    if (isFiring) return;
    setHasInteracted(true);
    stopAnimations();
    if (reducedMotion.current) {
      setPullValue(MAX_PULL);
      fire();
      return;
    }
    const drawControls = animate(pullRef.current, MAX_PULL, {
      duration: 0.28,
      ease: 'easeOut',
      onUpdate: setPullValue,
      onComplete: () => fire(),
    });
    animationsRef.current.push(drawControls);
  }, [fire, isFiring, setPullValue, stopAnimations]);

  const handlePointerDown = (event) => {
    if (isFiring) return;
    event.preventDefault();
    event.currentTarget.setPointerCapture?.(event.pointerId);
    dragRef.current = {
      active: true,
      startX: event.clientX,
      startPull: pullRef.current,
      scale: measureScale(),
    };
    setHasInteracted(true);
  };

  const handlePointerMove = (event) => {
    if (!dragRef.current.active) return;
    const delta = (event.clientX - dragRef.current.startX) * dragRef.current.scale;
    setPullValue(clamp(dragRef.current.startPull + delta, 0, MAX_PULL));
  };

  const endPointerDrag = () => {
    if (!dragRef.current.active) return;
    dragRef.current.active = false;
    if (pullRef.current >= FIRE_THRESHOLD) fire();
    else springBack();
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      autoShoot();
    } else if (event.key === 'ArrowRight' || event.key === 'ArrowUp') {
      event.preventDefault();
      setHasInteracted(true);
      setPullValue(clamp(pullRef.current + 22, 0, MAX_PULL));
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowDown') {
      event.preventDefault();
      setPullValue(clamp(pullRef.current - 22, 0, MAX_PULL));
    } else if (event.key === 'Escape') {
      springBack();
    }
  };

  const nockX = NOCK_REST_X + pull;
  const tension = pull / MAX_PULL;
  const isDrawn = tension > 0.55;
  const arrowTranslateX = pull + flightX;
  const arrowOpacity = flightX < -320 ? 0 : 1;

  return (
    <div className="bow-stage relative mx-auto w-full max-w-[30rem] select-none">
      <svg
        ref={svgRef}
        viewBox="0 0 460 520"
        className="pointer-events-none h-auto w-full overflow-visible drop-shadow-[0_18px_40px_rgba(2,8,12,0.6)]"
        role="img"
        aria-label="An archer's bow with a nocked arrow. Drag the arrow back and release to shoot."
      >
        <defs>
          <radialGradient id="bow-aura" cx="62%" cy="34%" r="72%">
            <stop offset="0%" stopColor="#2bb894" stopOpacity="0.26" />
            <stop offset="55%" stopColor="#1c7f66" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#2bb894" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="bow-cloak" x1="0" y1="0" x2="0.25" y2="1">
            <stop offset="0%" stopColor="#1a4a56" />
            <stop offset="48%" stopColor="#0d2530" />
            <stop offset="100%" stopColor="#07161d" />
          </linearGradient>
          <linearGradient id="bow-wood" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#e0b074" />
            <stop offset="45%" stopColor="#9c6431" />
            <stop offset="100%" stopColor="#593a1c" />
          </linearGradient>
          <linearGradient id="bow-gold" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ffe9bd" />
            <stop offset="100%" stopColor="#eaa83a" />
          </linearGradient>
          <linearGradient id="bow-limb-glow" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#7ff0d4" stopOpacity="0.0" />
            <stop offset="50%" stopColor="#7ff0d4" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#7ff0d4" stopOpacity="0.0" />
          </linearGradient>
          <filter id="bow-soft" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="6" />
          </filter>
        </defs>

        {/* Ambient aura */}
        <ellipse cx="300" cy="256" rx="210" ry="230" fill="url(#bow-aura)" />

        {/* Celtic knot ring behind the archer */}
        <g opacity="0.35" fill="none" stroke="rgba(127,240,212,0.4)" strokeWidth="1">
          <circle cx="330" cy="250" r="150" strokeDasharray="2 9" />
          <circle cx="330" cy="250" r="176" strokeDasharray="1 14" opacity="0.6" />
        </g>

        {/* ── Archer silhouette ── */}
        <g>
          <path d="M356 178 C372 158 416 156 432 182 C450 214 454 302 447 396 C445 432 439 452 431 470 L355 470 C347 438 341 368 343 300 C345 240 350 200 356 178 Z" fill="url(#bow-cloak)" stroke="rgba(127,240,212,0.22)" strokeWidth="1.5" />
          <circle cx="392" cy="146" r="26" fill="url(#bow-cloak)" stroke="rgba(127,240,212,0.22)" strokeWidth="1.5" />
          {/* Drawn bow arm */}
          <path d="M362 210 C324 226 288 244 262 256" fill="none" stroke="url(#bow-cloak)" strokeWidth="27" strokeLinecap="round" />
          {/* Quiver */}
          <g transform="rotate(16 430 250)">
            <rect x="420" y="196" width="22" height="98" rx="9" fill="#102c35" stroke="rgba(234,168,58,0.4)" strokeWidth="1.5" />
            <path d="M425 200 L420 176 M431 200 L431 172 M437 200 L443 178" stroke="#eaa83a" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
            <path d="M420 176 l-3 -7 M431 172 l0 -8 M443 178 l3 -7" stroke="#2bb894" strokeWidth="2.5" strokeLinecap="round" />
          </g>
          {/* Drawing arm + hand move with the string */}
          <path d={`M414 214 C398 232 ${nockX + 46} 250 ${nockX} ${NOCK_REST_Y}`} fill="none" stroke="url(#bow-cloak)" strokeWidth="21" strokeLinecap="round" />
          <circle cx={nockX} cy={NOCK_REST_Y} r="13" fill="#123642" stroke="rgba(127,240,212,0.35)" strokeWidth="1.5" />
        </g>

        {/* ── Bow ── */}
        <g className={recoil ? 'bow-recoil' : undefined}>
          {/* limb glow */}
          <path d="M300 46 Q196 260 300 474" fill="none" stroke="url(#bow-limb-glow)" strokeWidth="20" strokeLinecap="round" opacity={0.35 + tension * 0.6} filter="url(#bow-soft)" />
          {/* limbs */}
          <path d="M300 46 Q196 260 300 474" fill="none" stroke="url(#bow-wood)" strokeWidth="12" strokeLinecap="round" />
          <path d="M300 46 Q196 260 300 474" fill="none" stroke="url(#bow-gold)" strokeWidth="2.4" strokeLinecap="round" opacity="0.75" />
          {/* decoration */}
          <path d="M292 74 Q262 136 270 196 M270 324 Q262 384 292 446" fill="none" stroke="rgba(127,240,212,0.45)" strokeWidth="1.6" strokeLinecap="round" />
          {/* grip */}
          <rect x="238" y="228" width="17" height="64" rx="7" fill="#40270f" stroke="rgba(255,233,189,0.5)" strokeWidth="1.4" transform="rotate(-4 246 260)" />
          {/* grip hand */}
          <circle cx="246" cy="260" r="15" fill="#123642" stroke="rgba(127,240,212,0.35)" strokeWidth="1.5" />

          {/* ── Bowstring ── */}
          <path
            d={`M300 46 L${nockX} ${NOCK_REST_Y} L300 474`}
            className="bow-string"
            fill="none"
            stroke="#d9fbf0"
            strokeWidth={1.7 + tension * 0.9}
            strokeLinecap="round"
            opacity={0.62 + tension * 0.35}
          />
          {/* serving / nock point */}
          <circle cx={nockX} cy={NOCK_REST_Y} r="3.4" fill="#ffe9bd" />
        </g>

        {/* ── Arrow (nocked, travels with the string) ── */}
        <g
          className={`bow-arrow ${isFiring ? 'arrow-firing' : ''}`}
          transform={`translate(${arrowTranslateX} 0)`}
          style={{ opacity: arrowOpacity, transition: 'opacity 160ms ease-out' }}
        >
          <line className="arrow-trail" x1={NOCK_REST_X} y1={NOCK_REST_Y} x2={NOCK_REST_X - 420} y2={NOCK_REST_Y} stroke="url(#bow-gold)" strokeWidth="3" strokeLinecap="round" />
          {/* shaft */}
          <line x1={NOCK_REST_X} y1={NOCK_REST_Y} x2={NOCK_REST_X - 240} y2={NOCK_REST_Y} stroke="#d8bd92" strokeWidth="4.2" strokeLinecap="round" />
          <line x1={NOCK_REST_X} y1={NOCK_REST_Y} x2={NOCK_REST_X - 240} y2={NOCK_REST_Y} stroke="#fff6df" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />
          {/* arrowhead */}
          <path d={`M${NOCK_REST_X - 240} ${NOCK_REST_Y} l26 -13 v26 z`} fill="url(#bow-gold)" stroke="#8a5a2b" strokeWidth="1" />
          {/* nock */}
          <path d={`M${NOCK_REST_X} ${NOCK_REST_Y} l10 -6 v12 z`} fill="#8a5a2b" />
          {/* fletching */}
          <path d={`M${NOCK_REST_X - 30} ${NOCK_REST_Y} l-22 -15 h22 z`} fill="#2bb894" />
          <path d={`M${NOCK_REST_X - 30} ${NOCK_REST_Y} l-22 15 h22 z`} fill="#1c7f66" />
          <path d={`M${NOCK_REST_X - 52} ${NOCK_REST_Y} l-16 -11 h16 z`} fill="#eaa83a" opacity="0.9" />
          <path d={`M${NOCK_REST_X - 52} ${NOCK_REST_Y} l-16 11 h16 z`} fill="#d18a22" opacity="0.9" />
        </g>

        {/* ── Interaction hit area ── */}
        <rect
          x="34"
          y="232"
          width="302"
          height="56"
          rx="18"
          fill="transparent"
          className="bow-grab pointer-events-auto"
          role="button"
          tabIndex={0}
          aria-label="Pull the arrow back and release to shoot. Use arrow keys to draw, Enter to loose."
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={endPointerDrag}
          onPointerCancel={endPointerDrag}
          onKeyDown={handleKeyDown}
          onDoubleClick={autoShoot}
        />
      </svg>

      {/* Draw-strength meter + hint */}
      <div className="pointer-events-none mt-1 flex flex-col items-center gap-2">
        <div className="h-1.5 w-40 overflow-hidden rounded-full border border-loch-300/20 bg-night-950/70">
          <div
            className="h-full rounded-full bg-gradient-to-r from-loch-400 via-ember-300 to-ember-500 transition-[width] duration-75"
            style={{ width: `${Math.round(tension * 100)}%` }}
          />
        </div>
        <p
          className={`font-mono text-[11px] tracking-widest text-mist/70 transition-opacity duration-500 ${
            hasInteracted ? 'opacity-0' : 'opacity-100'
          }`}
        >
          {isDrawn ? 'RELEASE TO SHOOT' : 'DRAG THE ARROW BACK'}
        </p>
      </div>
    </div>
  );
};

export default BowArrow;
