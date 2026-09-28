import React from 'react';
import { ArrowUp, Github, Linkedin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative z-10 border-t border-teal-deep/10 bg-ivory-light py-10">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-6 border-b border-teal-deep/5">
          {/* Brand info */}
          <div className="flex items-center gap-2.5">
            <span className="w-7 h-7 rounded-lg bg-teal-deep text-champagne-soft flex items-center justify-center text-xs font-bold font-mono">
              A
            </span>
            <div>
              <p className="font-mono text-xs font-bold text-teal-deep">Aroo · Aroliani Munte</p>
              <p className="text-[10px] text-charcoal-muted">Cybersecurity · Full-Stack · UI/UX</p>
            </div>
          </div>

          {/* Quick Nav Links */}
          <div className="flex flex-wrap items-center gap-5 text-xs font-mono text-charcoal-muted">
            <a href="#hero" className="hover:text-teal-deep transition-colors">Home</a>
            <a href="#about" className="hover:text-teal-deep transition-colors">About</a>
            <a href="#projects" className="hover:text-teal-deep transition-colors">Projects</a>
            <a href="#skills" className="hover:text-teal-deep transition-colors">Skills</a>
            <a href="#contact" className="hover:text-teal-deep transition-colors">Contact</a>
          </div>

          {/* Back to top button */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white hover:bg-ivory-dark text-teal-deep border border-teal-deep/10 transition-all text-xs font-mono shadow-sm"
            aria-label="Back to Top"
          >
            <span>Top</span>
            <ArrowUp className="w-3.5 h-3.5 text-wood" />
          </button>
        </div>

        {/* Bottom copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-charcoal-muted">
          <p>
            &copy; {currentYear} Aroliani Munte. All rights reserved.
          </p>
          <p className="text-[11px] text-charcoal-muted">
            Crafted with React, Tailwind CSS &amp; Gemini API
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;