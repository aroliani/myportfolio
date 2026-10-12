import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Mail, ChevronDown } from 'lucide-react';
import BowArrow from './BowArrow.jsx';

const ROLES = [
  'Informatics Graduate',
  'IT Admin Support',
  'IT Operations Support',
  'IT Documentation & Records Management',
];

const Hero = () => {
  const [subtitle, setSubtitle] = useState('');
  const [shot, setShot] = useState(false);
  const shotTimer = useRef(null);

  useEffect(() => {
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let timer;

    const type = () => {
      const currentRole = ROLES[roleIndex];
      let typeSpeed = 150;

      if (isDeleting) {
        setSubtitle(currentRole.substring(0, charIndex - 1));
        charIndex -= 1;
        typeSpeed = 75;
      } else {
        setSubtitle(currentRole.substring(0, charIndex + 1));
        charIndex += 1;
      }

      if (!isDeleting && charIndex === currentRole.length) {
        isDeleting = true;
        typeSpeed = 2000;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % ROLES.length;
      }

      timer = setTimeout(type, typeSpeed);
    };

    timer = setTimeout(type, 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => () => window.clearTimeout(shotTimer.current), []);

  const handleShoot = () => {
    setShot(true);
    window.clearTimeout(shotTimer.current);
    shotTimer.current = window.setTimeout(() => setShot(false), 950);
  };

  return (
    <section id="hero" className="relative flex min-h-screen items-center overflow-hidden px-6 pb-16 pt-28 md:pt-32">
      <div className="container mx-auto">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
          {/* Copy */}
          <div className="text-center lg:text-left">
            <p className="section-eyebrow mb-4">Welcome to my portfolio</p>
            <h1 className={`display-heading text-4xl leading-tight sm:text-5xl lg:text-6xl ${shot ? 'text-glow' : ''} transition-[text-shadow] duration-500`}>
              <span className="ember-text">Aroliani Munte</span>
            </h1>
            <p className="mt-4 font-serif text-xl italic text-loch-200 sm:text-2xl">
              Aim true. Build bravely.
            </p>
            <p className="mt-5 flex min-h-[1.75rem] items-center justify-center font-mono text-base text-mist/90 sm:text-lg lg:justify-start">
              <span className="text-loch-300">&gt;&nbsp;</span>
              <span>{subtitle}</span>
              <span id="subtitle-cursor" aria-hidden="true" />
            </p>
            <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-mist/75 sm:text-base lg:mx-0">
              Informatics graduate awaiting graduation from President University, with hands-on experience in web
              development, database management, IT operations, documentation, and cybersecurity fundamentals.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
              <a href="#projects" className="btn-ember">
                Explore my work <ArrowRight size={16} />
              </a>
              <a href="#contact" className="btn-lochnet">
                <Mail size={16} /> Get in touch
              </a>
            </div>
          </div>

          {/* The archer */}
          <div>
            <BowArrow onShoot={handleShoot} />
          </div>
        </div>
      </div>

      <a
        href="#profile"
        aria-label="Scroll to About"
        className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1 font-mono text-[10px] uppercase tracking-[0.3em] text-mist/50 transition-colors hover:text-loch-300 md:flex"
      >
        Scroll
        <ChevronDown size={16} className="animate-bounce" />
      </a>
    </section>
  );
};

export default Hero;
