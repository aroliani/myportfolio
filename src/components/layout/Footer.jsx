import React from 'react';
import { Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="relative border-t border-loch-300/10 py-10">
      <div className="container mx-auto px-6">
        <div className="rune-divider mb-8" />
        <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
          <p className="font-mono text-xs text-mist/55">
            &copy; {currentYear} Aroliani Munte. All rights reserved.
          </p>
          <p className="flex items-center gap-2 font-mono text-xs text-mist/55">
            Crafted with <Heart size={13} className="text-ember-500" /> and a well-aimed arrow.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
