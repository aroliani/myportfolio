import React, { useEffect, useRef } from 'react';

const characters = '0123456789ABCDEF<>/{}';
const fontSize = 16;
const columnWidth = 30;

const randomCharacter = () => characters[Math.floor(Math.random() * characters.length)];

const DigitalRain = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !context) return undefined;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let width = 0;
    let height = 0;
    let pixelRatio = 1;
    let drops = [];
    let animationFrame = 0;
    let previousTime = 0;

    const resize = () => {
      pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

      const columns = Math.ceil(width / columnWidth);
      drops = Array.from({ length: columns }, (_, index) => {
        const trailLength = 8 + Math.floor(Math.random() * 12);
        return {
          x: index * columnWidth + columnWidth / 2,
          y: Math.random() * (height + trailLength * fontSize),
          speed: 55 + Math.random() * 70,
          trailLength,
          symbols: Array.from({ length: trailLength }, randomCharacter),
        };
      });
      draw(0, true);
    };

    const draw = (time, staticFrame = false) => {
      const delta = previousTime ? Math.min((time - previousTime) / 1000, 0.05) : 0;
      previousTime = time;
      context.clearRect(0, 0, width, height);
      context.font = `${fontSize}px "Fira Code", monospace`;
      context.textAlign = 'center';
      context.textBaseline = 'middle';

      drops.forEach((drop) => {
        if (!staticFrame) drop.y += drop.speed * delta;
        if (drop.y - drop.trailLength * fontSize > height) {
          drop.y = -Math.random() * height * 0.5;
          drop.speed = 55 + Math.random() * 70;
          drop.trailLength = 8 + Math.floor(Math.random() * 12);
        }

        for (let index = 0; index < drop.trailLength; index += 1) {
          if (!staticFrame && Math.random() < 0.035) drop.symbols[index] = randomCharacter();
          const y = drop.y - index * fontSize;
          if (y < -fontSize || y > height + fontSize) continue;

          const fade = 1 - index / drop.trailLength;
          context.globalAlpha = (index === 0 ? 0.95 : fade * 0.65) * (index === 0 ? 1 : 0.72);
          context.fillStyle = index === 0 ? '#e9ddff' : '#a78bfa';
          context.fillText(drop.symbols[index], drop.x, y);
        }
      });

      context.globalAlpha = 1;
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

  return <canvas ref={canvasRef} aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 h-full w-full opacity-25" />;
};

export default DigitalRain;
