import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight, Compass } from 'lucide-react';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#about', label: 'About' },
    { href: '#projects', label: 'Projects' },
    { href: '#skills', label: 'Skills' },
    { href: '#contact', label: 'Contact' },
  ];

  const handleOpenAi = () => {
    window.dispatchEvent(new CustomEvent('open-ai-chat'));
    setIsOpen(false);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled 
          ? 'py-3.5 bg-ivory/90 backdrop-blur-lg border-b border-teal-deep/10 shadow-sm' 
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 max-w-6xl">
        <nav className="flex justify-between items-center">
          
          {/* Logo / Brand Name Hierarchy: Aroo */}
          <a 
            href="#hero" 
            className="group flex items-center gap-2 font-mono text-lg font-extrabold tracking-tight text-teal-deep"
          >
            <span className="w-7 h-7 rounded-lg bg-teal-deep text-champagne-soft flex items-center justify-center text-xs font-bold shadow-sm">
              A
            </span>
            <span className="tracking-wide">
              Aroo<span className="text-wood">.</span>
            </span>
          </a>

          {/* Desktop Nav Items */}
          <div className="hidden md:flex items-center gap-6 text-xs font-mono font-medium text-charcoal-soft">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="hover:text-teal-deep transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right Action: Recruiter Fast Badge & AI Guide Trigger */}
          <div className="hidden md:flex items-center gap-3">
            <span className="text-[11px] font-mono px-3 py-1 rounded-full bg-teal-light text-teal-deep border border-teal-deep/10">
              ● Available for Opportunities
            </span>

            <button
              onClick={handleOpenAi}
              className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium text-charcoal bg-white border border-teal-deep/15 hover:border-wood transition-all shadow-sm"
              title="Open AI Guide"
            >
              <Compass className="w-3.5 h-3.5 text-wood" />
              <span>AI Guide</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={handleOpenAi}
              className="p-2 rounded-xl text-teal-deep bg-white border border-teal-deep/15"
              aria-label="Tanya AI"
            >
              <Compass className="w-4 h-4 text-wood" />
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-charcoal hover:text-teal-deep bg-white border border-teal-deep/15 rounded-xl focus:outline-none"
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