import React from 'react';
import { ArrowUp, Github, Linkedin, Heart, Sparkles } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative z-10 border-t border-white/10 bg-slate-950/60 backdrop-blur-xl py-12">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-white/5">
          {/* Brand info */}
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-gradient-to-tr from-violet-600 to-indigo-500 flex items-center justify-center text-white text-xs font-black">
              AM
            </span>
            <div>
              <p className="font-mono text-sm font-bold text-white">AROLIANI MUNTE</p>
              <p className="text-xs text-gray-400">Cybersecurity • Full-Stack • UI/UX</p>
            </div>
          </div>

          {/* Quick Nav Links */}
          <div className="flex flex-wrap items-center gap-6 text-xs font-mono text-gray-400">
            <a href="#hero" className="hover:text-violet-300 transition-colors">Home</a>
            <a href="#profile" className="hover:text-violet-300 transition-colors">About</a>
            <a href="#projects" className="hover:text-violet-300 transition-colors">Projects</a>
            <a href="#skills" className="hover:text-violet-300 transition-colors">Skills</a>
            <a href="#contact" className="hover:text-violet-300 transition-colors">Contact</a>
          </div>

          {/* Back to top button */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 p-2.5 rounded-xl glass-card hover:bg-violet-600/20 text-gray-300 hover:text-white border border-white/10 transition-all text-xs font-mono"
            aria-label="Kembali ke atas"
          >
            <span>Top</span>
            <ArrowUp className="w-4 h-4 text-violet-400" />
          </button>
        </div>

        {/* Bottom copyright & badges */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-gray-400">
          <p>
            &copy; {currentYear} Aroliani Munte. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-[11px] text-gray-400">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
            <span>using React, Tailwind CSS &amp; Gemini AI</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;