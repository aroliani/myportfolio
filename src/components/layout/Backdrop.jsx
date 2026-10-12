import React, { useEffect, useRef } from 'react';

/*
 * Ambient backdrop: highland silhouettes, drifting embers and cool wisps.
 * Replaces the previous "digital rain" effect with a Merida-inspired scene.
 */

const EMBER_COLORS = ['255,217,138', '234,168,58', '255,233,189'];
const WISP_COLORS = ['127,240,212', '79,220,192'];

const Backdrop = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !context) return undefined;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let width = 0;
    let height = 0;
    let pixelRatio = 1;
    let particles = [];
    let animationFrame = 0;
    let previousTime = 0;

    const makeParticle = (initial = false) => {
      const isWisp = Math.random() < 0.28;
      const palette = isWisp ? WISP_COLORS : EMBER_COLORS;
      return {
        x: Math.random() * width,
        y: initial ? Math.random() * height : height + Math.random() * 60,
        radius: isWisp ? 1.1 + Math.random() * 1.8 : 0.9 + Math.random() * 2.2,
        speedY: (isWisp ? 10 : 16) + Math.random() * 26,
        drift: (Math.random() - 0.5) * 14,
        sway: Math.random() * Math.PI * 2,
        swaySpeed: 0.4 + Math.random() * 0.8,
        color: palette[Math.floor(Math.random() * palette.length)],
        alpha: 0.25 + Math.random() * 0.45,
      };
    };

    const resize = () => {
      pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      context.globalCompositeOperation = 'lighter';
      const count = Math.min(56, Math.max(24, Math.round((width * height) / 42000)));
      particles = Array.from({ length: count }, () => makeParticle(true));
      draw(0, true);
    };

    const drawParticle = (particle) => {
      const gradient = context.createRadialGradient(particle.x, particle.y, 0, particle.x, particle.y, particle.radius * 5);
      gradient.addColorStop(0, `rgba(${particle.color},${particle.alpha})`);
      gradient.addColorStop(0.45, `rgba(${particle.color},${particle.alpha * 0.35})`);
      gradient.addColorStop(1, `rgba(${particle.color},0)`);
      context.fillStyle = gradient;
      context.beginPath();
      context.arc(particle.x, particle.y, particle.radius * 5, 0, Math.PI * 2);
      context.fill();
    };

    const draw = (time, staticFrame = false) => {
      const delta = previousTime ? Math.min((time - previousTime) / 1000, 0.05) : 0;
      previousTime = time;
      context.clearRect(0, 0, width, height);

      particles.forEach((particle) => {
        if (!staticFrame) {
          particle.y -= particle.speedY * delta;
          particle.sway += particle.swaySpeed * delta;
          particle.x += (particle.drift + Math.sin(particle.sway) * 8) * delta;
          if (particle.y < -20) {
            Object.assign(particle, makeParticle(false));
          }
        }
        drawParticle(particle);
      });

      if (!reducedMotion && !document.hidden) animationFrame = window.requestAnimationFrame(draw);
    };

    const handleVisibilityChange = () => {
      window.cancelAnimationFrame(animationFrame);
      previousTime = 0;
      if (document.hidden) return;
      if (reducedMotion) draw(0, true);
      else animationFrame = window.requestAnimationFrame(draw);
    };

    resize();
    if (!reducedMotion) animationFrame = window.requestAnimationFrame(draw);
    window.addEventListener('resize', resize);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Layered highland silhouettes */}
      <svg className="absolute bottom-0 left-0 h-[46vh] w-full" viewBox="0 0 1440 500" preserveAspectRatio="none">
        <defs>
          <linearGradient id="ridge-back" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(28,127,102,0.18)" />
            <stop offset="100%" stopColor="rgba(5,14,18,0.0)" />
          </linearGradient>
          <linearGradient id="ridge-mid" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(13,32,41,0.9)" />
            <stop offset="100%" stopColor="rgba(5,14,18,0.35)" />
          </linearGradient>
          <linearGradient id="ridge-front" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#040e12" />
            <stop offset="100%" stopColor="#020a0d" />
          </linearGradient>
        </defs>
        <path d="M0 340 L180 250 L340 320 L520 190 L700 300 L900 210 L1080 310 L1260 230 L1440 320 L1440 500 L0 500 Z" fill="url(#ridge-back)" />
        <path d="M0 400 L220 300 L400 380 L600 260 L820 380 L1040 290 L1240 380 L1440 300 L1440 500 L0 500 Z" fill="url(#ridge-mid)" />
        <path d="M0 460 L260 370 L480 450 L720 360 L960 450 L1200 380 L1440 450 L1440 500 L0 500 Z" fill="url(#ridge-front)" />
      </svg>

      {/* A soft moon/loch glow */}
      <div className="absolute -top-24 right-[8%] h-72 w-72 rounded-full bg-loch-400/10 blur-3xl" />
      <div className="absolute top-1/3 -left-16 h-64 w-64 rounded-full bg-ember-500/10 blur-3xl" />

      {/* Embers + wisps */}
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full opacity-70" />

      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_35%,transparent_40%,rgba(2,8,12,0.55)_100%)]" />
    </div>
  );
};

export default Backdrop;
