import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const sections = document.querySelectorAll('main > section');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-40% 0px -40% 0px', threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => sections.forEach((section) => observer.unobserve(section));
  }, []);

  const navLinks = [
    { href: '#profile', label: 'About Me' },
    { href: '#projects', label: 'Projects' },
    { href: '#skills', label: 'Skills & Tools' },
    { href: '#ai-assistant', label: 'AI Assistant' }, 
    { href: '#contact', label: 'Contact Me' },
  ];

  const linkClasses = (href) => `rounded-lg border px-3 py-2 transition-colors ${activeSection === href.substring(1)
    ? 'border-violet-400/30 bg-violet-400/10 text-violet-300'
    : 'border-transparent text-gray-300 hover:border-gray-600 hover:bg-white/5 hover:text-white'}`;

  return (
    <header className="sticky top-0 z-40 border-b border-gray-700/70 bg-[#10141c]/95 py-3 backdrop-blur-xl">
      <div className="container mx-auto px-6">
        <nav className="flex items-center justify-between gap-4">
          <a href="#hero" className="shrink-0 border-r border-gray-700 pr-4 font-mono text-lg font-bold text-violet-300 transition-colors hover:text-white sm:pr-6">AROLIANI MUNTE</a>
          <div className="hidden items-center gap-1 rounded-xl border border-gray-700/80 bg-[#171d28] p-1.5 shadow-lg shadow-black/20 md:flex font-mono text-sm">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} aria-current={activeSection === link.href.substring(1) ? 'page' : undefined} className={linkClasses(link.href)}>{link.label}</a>
            ))}
          </div>
          <button type="button" onClick={() => setIsOpen(!isOpen)} aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={isOpen} className="z-50 rounded-lg border border-gray-700 bg-[#171d28] p-2 text-gray-200 transition hover:border-violet-400/50 hover:text-violet-300 md:hidden">
            {isOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </nav>
        {isOpen && (
          <div className="mt-3 grid gap-1 rounded-xl border border-gray-700 bg-[#171d28] p-2 font-mono text-sm md:hidden">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} onClick={() => setIsOpen(false)} className={linkClasses(link.href)}>
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