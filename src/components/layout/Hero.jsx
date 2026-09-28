import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Download, Sparkles, Shield, Code, Palette } from 'lucide-react';
import cvFile from '../../assets/Aroliani Munte-CV.pdf';

const ROLES = [
  "Cyber Security Enthusiast", 
  "Full-Stack Developer", 
  "UI/UX Designer",
  "KADA Fellow Scholar"
];

const Hero = () => {
  const [subtitle, setSubtitle] = useState('');

  useEffect(() => {
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let timer;

    const type = () => {
      const currentRole = ROLES[roleIndex];
      let typeSpeed = 120;

      if (isDeleting) {
        setSubtitle(currentRole.substring(0, charIndex - 1));
        charIndex--;
        typeSpeed = 60;
      } else {
        setSubtitle(currentRole.substring(0, charIndex + 1));
        charIndex++;
      }

      if (!isDeleting && charIndex === currentRole.length) {
        isDeleting = true;
        typeSpeed = 2200;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % ROLES.length;
      }

      timer = setTimeout(type, typeSpeed);
    };

    timer = setTimeout(type, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleOpenAi = () => {
    window.dispatchEvent(new CustomEvent('open-ai-chat', {
      detail: { prompt: "Ceritakan ringkasan profil dan keahlian Aroliani Munte" }
    }));
  };

  return (
    <section 
      id="hero" 
      className="relative min-h-[92vh] flex flex-col justify-center items-center px-6 pt-28 pb-16 overflow-hidden"
    >
      <div className="container mx-auto max-w-4xl text-center relative z-10">
        {/* Top Floating Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill border border-violet-500/30 text-xs sm:text-sm font-mono text-violet-300 mb-6 shadow-lg shadow-violet-500/10"
        >
          <span className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
          <span>Informatics @ President University • KADA Scholar</span>
        </motion.div>

        {/* Main Name & Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white mb-4 leading-tight"
        >
          Hi, I'm{' '}
          <span className="bg-gradient-to-r from-violet-400 via-fuchsia-300 to-indigo-300 bg-clip-text text-transparent">
            Aroliani Munte
          </span>
        </motion.h1>

        {/* Dynamic Typewriter Role */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-lg sm:text-2xl md:text-3xl text-violet-300 font-mono font-medium h-10 mb-6 flex items-center justify-center gap-1"
        >
          <span className="text-gray-400">&gt; </span>
          <span>{subtitle}</span>
          <span id="subtitle-cursor"></span>
        </motion.div>

        {/* Brief Bio Intro */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-gray-300 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-10"
        >
          Passionate about building secure web architectures, ethical hacking (OSINT &amp; Pentesting), and crafting intuitive digital experiences with modern UI/UX design.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-14"
        >
          <a
            href="#projects"
            className="group px-6 py-3.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-medium text-sm flex items-center gap-2 shadow-xl shadow-violet-600/30 hover:shadow-violet-600/50 hover:scale-105 active:scale-95 transition-all"
          >
            <span>Explore Projects</span>
            <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
          </a>

          <a
            href={cvFile}
            download="Aroliani_Munte_CV.pdf"
            className="px-6 py-3.5 rounded-xl glass-card text-gray-200 hover:text-white font-medium text-sm flex items-center gap-2 border border-white/10 hover:border-violet-500/40 hover:scale-105 active:scale-95 transition-all"
          >
            <Download className="w-4 h-4 text-violet-400" />
            <span>Download CV</span>
          </a>

          <button
            onClick={handleOpenAi}
            className="px-5 py-3.5 rounded-xl glass-pill text-violet-300 hover:text-violet-100 font-medium text-sm flex items-center gap-2 border border-violet-500/30 hover:bg-violet-600/20 hover:scale-105 active:scale-95 transition-all"
          >
            <Sparkles className="w-4 h-4 text-violet-400" />
            <span>Ask AI Assistant</span>
          </button>
        </motion.div>

        {/* Quick Highlights / Stats Bento Pills */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto"
        >
          <div className="glass-card p-4 rounded-2xl flex items-center gap-3.5 text-left border border-white/[0.08]">
            <div className="w-10 h-10 rounded-xl bg-violet-500/15 border border-violet-500/30 flex items-center justify-center text-violet-400 shrink-0">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white font-mono">Cybersecurity</h4>
              <p className="text-xs text-gray-400">OSINT &amp; Pentesting</p>
            </div>
          </div>

          <div className="glass-card p-4 rounded-2xl flex items-center gap-3.5 text-left border border-white/[0.08]">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shrink-0">
              <Code className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white font-mono">Full-Stack</h4>
              <p className="text-xs text-gray-400">React, Node, Cloud</p>
            </div>
          </div>

          <div className="glass-card p-4 rounded-2xl flex items-center gap-3.5 text-left border border-white/[0.08]">
            <div className="w-10 h-10 rounded-xl bg-fuchsia-500/15 border border-fuchsia-500/30 flex items-center justify-center text-fuchsia-400 shrink-0">
              <Palette className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white font-mono">UI/UX Design</h4>
              <p className="text-xs text-gray-400">Figma &amp; Canva</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;