import React from 'react';
import { motion } from 'framer-motion';
import SkillInventory from '../game/SkillInventory.jsx';

const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

const Skills = () => {
  return (
    <motion.section 
      id="skills" 
      className="py-24 relative z-10 bg-gradient-to-b from-[#fdfbf7] via-[#f8f5ee] to-[#fdfbf7] border-t border-teal-deep/5"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }} 
    >
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Section Header */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-light text-teal-deep border border-teal-deep/10 text-xs font-mono mb-3">
            <span>03 / Technical Tooling &amp; Disciplines</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-teal-deep tracking-tight">
            Skills &amp; Tooling<span className="text-wood">.</span>
          </h2>
          <p className="mt-2 text-sm text-charcoal-muted max-w-xl leading-relaxed">
            Technologies, frameworks, security utilities, and design suites leveraged across production projects and academic research.
          </p>
        </div>

        {/* Skill Inventory Component */}
        <SkillInventory />

      </div>
    </motion.section>
  );
};

export default Skills;