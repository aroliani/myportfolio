import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight, Compass } from 'lucide-react';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 25);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#about', label: 'About' },
    { href: '#projects', label: 'Projects' },
    { href: '#skills', label: 'Skills' },
    { href: '#experience', label: 'Experience' },
    { href: '#contact', label: 'Contact' },
  ];

  const handleOpenAi = () => {
    window.dispatchEvent(new CustomEvent('open-ai-chat'));
    setIsOpen(false);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'py-3 bg-ivory/95 backdrop-blur-md border-b border-teal-deep/10 shadow-sm' 
          : 'py-4.5 bg-gradient-to-b from-black/60 via-black/25 to-transparent'
      }`}
    >
      <div className="container mx-auto px-6 max-w-7xl">
        <nav className="flex justify-between items-center">
          
          {/* Logo / Brand: Compass Arrow + Aroo. */}
          <a 
            href="#hero" 
            className={`group flex items-center gap-2.5 font-serif text-xl font-bold tracking-tight transition-colors ${
              scrolled ? 'text-teal-deep' : 'text-ivory drop-shadow-sm'
            }`}
          >
            <span className="w-8 h-8 rounded-full bg-teal-deep text-champagne flex items-center justify-center text-sm shadow-md border border-champagne/40 group-hover:scale-105 transition-transform">
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current stroke-2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" strokeOpacity="0.4" />
                <path d="M12 2 L14 10 L22 12 L14 14 L12 22 L10 14 L2 12 L10 10 Z" fill="currentColor" fillOpacity="0.25" />
                <path d="M7 17 L17 7 M17 7 H11 M17 7 V13" stroke="currentColor" />
              </svg>
            </span>
            <span className="tracking-wide">
              Aroo<span className="text-champagne">.</span>
            </span>
          </a>

          {/* Desktop Nav Items */}
          <div className="hidden md:flex items-center gap-7 text-xs font-mono font-medium">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`transition-colors ${
                  scrolled 
                    ? 'text-charcoal hover:text-teal-deep font-semibold' 
                    : 'text-ivory/90 hover:text-champagne drop-shadow'
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right Action: Let's Connect Button & AI Guide Trigger */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono font-medium text-ivory bg-teal-deep hover:bg-teal-muted border border-champagne/30 shadow-md transition-all group"
            >
              <span>Let's Connect</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-champagne group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>

            <button
              onClick={handleOpenAi}
              className={`px-3 py-1.5 rounded-full flex items-center gap-1.5 transition-all shadow-sm ${
                scrolled
                  ? 'bg-teal-deep text-champagne hover:bg-teal-muted border border-champagne/30'
                  : 'bg-black/40 hover:bg-black/60 backdrop-blur-md border border-champagne/40 text-champagne'
              }`}
              title="Open AI Assistant"
              aria-label="Open AI Assistant"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 text-champagne">
                <line x1="5" y1="19" x2="19" y2="5" />
                <polyline points="10 5 19 5 19 14" />
              </svg>
              <span className="text-xs font-mono font-medium text-ivory">AI Assistant</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={handleOpenAi}
              className={`p-2 rounded-xl border ${
                scrolled
                  ? 'text-teal-deep bg-white border-teal-deep/15'
                  : 'text-ivory bg-black/40 border-white/20'
              }`}
              aria-label="Tanya AI"
            >
              <Compass className="w-4 h-4 text-champagne" />
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 rounded-xl focus:outline-none border ${
                scrolled
                  ? 'text-charcoal hover:text-teal-deep bg-white border-teal-deep/15'
                  : 'text-ivory hover:text-champagne bg-black/40 border-white/20'
              }`}
              aria-label="Menu"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-ivory-light border-b border-teal-deep/10 shadow-lg overflow-hidden"
          >
            <div className="container mx-auto px-6 py-4 flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-mono font-medium text-charcoal hover:bg-teal-light transition-colors"
                >
                  <span>{link.label}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-charcoal-muted" />
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;