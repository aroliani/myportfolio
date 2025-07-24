import React, { useState, useEffect } from 'react';

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

  const linkClasses = (href) => 
    `hover:text-violet-400 transition-colors ${activeSection === href.substring(1) ? 'nav-link-active' : ''}`;

  return (
    <header className="bg-black/50 backdrop-blur-sm sticky top-0 z-40 border-b border-gray-800">
      <div className="container mx-auto px-6">
        <nav className="flex justify-between items-center py-4">
          <a href="#hero" className="text-xl font-bold text-violet-400 font-mono transition-all hover:text-violet-300">AROLIANI MUNTE</a>
          <div className="hidden md:flex items-center space-x-8 font-mono text-gray-400">
            {navLinks.map(link => (
              <a key={link.href} href={link.href} className={linkClasses(link.href)}>{link.label}</a>
            ))}
          </div>
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-gray-300 text-2xl z-50">
            {isOpen ? '✕' : '☰'}
          </button>
        </nav>
        {isOpen && (
          <div className="md:hidden pb-4">
            {navLinks.map(link => (
              <a key={link.href} href={link.href} onClick={() => setIsOpen(false)} className={`block text-center py-3 font-mono text-gray-400 hover:bg-gray-800 rounded-md ${linkClasses(link.href)}`}>
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