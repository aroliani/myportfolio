import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { href: '#profile', label: 'About Me' },
  { href: '#projects', label: 'Projects' },
  { href: '#skills', label: 'Skills & Tools' },
  { href: '#ai-assistant', label: 'AI Assistant' },
  { href: '#contact', label: 'Contact Me' },
];

const OPEN_ASSISTANT_EVENT = 'arooliani:open-assistant';

const BowMark = () => (
  <svg viewBox="0 0 64 64" className="h-7 w-7" aria-hidden="true">
    <path d="M44 6 Q18 32 44 58" fill="none" stroke="#4fdcc0" strokeWidth="5" strokeLinecap="round" />
    <path d="M44 6 L44 58" fill="none" stroke="#d6ece7" strokeWidth="2" opacity="0.8" />
    <path d="M8 32 H44" stroke="#eaa83a" strokeWidth="4" strokeLinecap="round" />
    <path d="M8 32 l9 -5 v10 z" fill="#eaa83a" />
    <path d="M38 27 l7 5 -7 5" fill="none" stroke="#eaa83a" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const sections = document.querySelectorAll('main > section');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: '-40% 0px -40% 0px', threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => sections.forEach((section) => observer.unobserve(section));
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (event, href) => {
    if (href === '#ai-assistant') {
      event.preventDefault();
      window.dispatchEvent(new Event(OPEN_ASSISTANT_EVENT));
      setActiveSection('ai-assistant');
    }
    setIsOpen(false);
  };

  return (
    <header className={`site-header sticky top-0 z-40 py-3 transition-shadow duration-300 ${scrolled ? 'shadow-lg shadow-black/40' : ''}`}>
      <div className="container mx-auto px-4 sm:px-6">
        <nav className="flex items-center justify-between gap-4">
          <a href="#hero" className="group flex shrink-0 items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-full border border-loch-300/30 bg-night-900/70 transition-colors group-hover:border-ember-300/60">
              <BowMark />
            </span>
            <span className="hidden flex-col leading-none sm:flex">
              <span className="font-display text-sm font-bold tracking-wider text-mist">AROLIANI MUNTE</span>
              <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-ember-300/80">Portfolio</span>
            </span>
          </a>

          <div className="hidden items-center gap-0.5 rounded-full border border-loch-300/15 bg-night-900/60 p-1 backdrop-blur md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(event) => handleNavClick(event, link.href)}
                aria-current={activeSection === link.href.substring(1) ? 'page' : undefined}
                className="nav-link"
              >
                {link.label}
              </a>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setIsOpen((open) => !open)}
            aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isOpen}
            className="z-50 rounded-full border border-loch-300/25 bg-night-900/70 p-2.5 text-mist transition hover:border-ember-300/60 hover:text-ember-300 md:hidden"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>

        {isOpen && (
          <div className="mobile-nav-panel mt-3 grid gap-1 rounded-2xl p-2 md:hidden">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(event) => handleNavClick(event, link.href)}
                aria-current={activeSection === link.href.substring(1) ? 'page' : undefined}
                className="nav-link text-center"
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
