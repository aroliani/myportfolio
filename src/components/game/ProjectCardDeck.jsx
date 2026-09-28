import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ChevronLeft, 
  ChevronRight, 
  ExternalLink, 
  Github, 
  Palette, 
  Eye, 
  LayoutGrid, 
  Layers 
} from 'lucide-react';

const ProjectCardDeck = ({ projects, onSelectProject }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [viewMode, setViewMode] = useState('grid'); // Default to clean professional grid, or 3D deck
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const nextCard = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  };

  const prevCard = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 12;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -12;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  return (
    <div className="w-full max-w-5xl mx-auto py-6">
      
      {/* Top Deck Bar & View Mode Toggle */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-teal-deep px-3 py-1 rounded-full bg-teal-light border border-teal-deep/10 font-medium">
            Project {currentIndex + 1} of {projects.length}
          </span>
          <span className="text-xs text-charcoal-muted hidden sm:inline">
            Explore curated software engineering &amp; cybersecurity implementations
          </span>
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center p-1 rounded-xl bg-ivory-dark border border-teal-deep/10">
          <button
            onClick={() => setViewMode('grid')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
              viewMode === 'grid'
                ? 'bg-teal-deep text-ivory shadow-sm'
                : 'text-charcoal-soft hover:text-teal-deep'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>Grid View</span>
          </button>
          <button
            onClick={() => setViewMode('deck')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
              viewMode === 'deck'
                ? 'bg-teal-deep text-ivory shadow-sm'
                : 'text-charcoal-soft hover:text-teal-deep'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>3D Deck</span>
          </button>
        </div>
      </div>

      {viewMode === 'deck' ? (
        /* 3D CARD DECK VIEW */
        <div className="relative min-h-[460px] flex items-center justify-center overflow-hidden py-4">
          <button
            onClick={prevCard}
            aria-label="Previous Project"
            className="absolute left-2 sm:left-4 z-30 p-2.5 rounded-2xl bg-white hover:bg-teal-deep hover:text-ivory text-teal-deep border border-teal-deep/15 shadow-md transition-all"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="relative w-full max-w-md h-[430px] flex items-center justify-center">
            {projects.map((project, idx) => {
              const diff = (idx - currentIndex + projects.length) % projects.length;
              const isCenter = diff === 0;
              const isPrev = diff === projects.length - 1;
              const isNext = diff === 1;

              if (!isCenter && !isPrev && !isNext) return null;

              let translateX = 0;
              let scale = 1;
              let rotateZ = 0;
              let zIndex = 20;
              let opacity = 1;

              if (isPrev) {
                translateX = -75;
                scale = 0.9;
                rotateZ = -4;
                zIndex = 10;
                opacity = 0.6;
              } else if (isNext) {
                translateX = 75;
                scale = 0.9;
                rotateZ = 4;
                zIndex = 10;
                opacity = 0.6;
              }

              return (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{
                    x: translateX,
                    scale: scale,
                    rotateZ: rotateZ,
                    zIndex: zIndex,
                    opacity: opacity,
                    rotateY: isCenter ? mousePos.x : 0,
                    rotateX: isCenter ? mousePos.y : 0,
                  }}
                  transition={{ type: 'spring', stiffness: 280, damping: 26 }}
                  onMouseMove={isCenter ? handleMouseMove : undefined}
                  onMouseLeave={handleMouseLeave}
                  onClick={() => {
                    if (!isCenter) {
                      if (isNext) nextCard();
                      if (isPrev) prevCard();
                    }
                  }}
                  style={{ transformStyle: 'preserve-3d' }}
                  className="absolute w-full rounded-3xl p-6 bg-white border border-teal-deep/15 shadow-xl flex flex-col justify-between select-none cursor-pointer"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium bg-teal-light text-teal-deep border border-teal-deep/10">
                        {project.categoryLabel}
                      </span>
                      <span className="text-[11px] font-mono text-charcoal-muted">
                        Case #{project.id}
                      </span>
                    </div>

                    <div className="relative h-44 rounded-2xl overflow-hidden border border-teal-deep/10 mb-4">
                      <img
                        src={project.imageUrl}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <h3 className="text-base font-bold text-teal-deep font-mono mb-2 line-clamp-1">
                      {project.title}
                    </h3>
                    <p className="text-xs text-charcoal-soft line-clamp-2 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-teal-deep/5 flex items-center justify-between gap-2 mt-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectProject(project);
                      }}
                      className="flex-1 py-2 px-3 rounded-xl bg-teal-deep hover:bg-teal-muted text-ivory font-mono text-xs font-medium flex items-center justify-center gap-1.5 transition-all"
                    >
                      <Eye className="w-3.5 h-3.5 text-champagne" />
                      <span>Inspect Details</span>
                    </button>
                    <a
                      href={project.linkUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="p-2 rounded-xl bg-ivory hover:bg-ivory-dark text-teal-deep border border-teal-deep/15 transition-all"
                      title={project.isDesign ? 'Figma Prototype' : 'GitHub Repository'}
                    >
                      {project.isDesign ? <Palette className="w-4 h-4 text-wood" /> : <Github className="w-4 h-4 text-teal-deep" />}
                    </a>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <button
            onClick={nextCard}
            aria-label="Next Project"
            className="absolute right-2 sm:right-4 z-30 p-2.5 rounded-2xl bg-white hover:bg-teal-deep hover:text-ivory text-teal-deep border border-teal-deep/15 shadow-md transition-all"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      ) : (
        /* PROFESSIONAL GRID CATALOG VIEW */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              onClick={() => onSelectProject(project)}
              className="editorial-card p-5 rounded-3xl bg-white border border-teal-deep/10 hover:border-wood/40 transition-all duration-300 cursor-pointer flex flex-col justify-between group shadow-sm"
            >
              <div>
                <div className="relative h-44 rounded-2xl overflow-hidden mb-4 border border-teal-deep/10">
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-medium bg-white/95 text-teal-deep shadow-sm">
                    {project.categoryLabel}
                  </span>
                </div>

                <h4 className="text-base font-bold text-teal-deep font-mono mb-2 group-hover:text-wood-dark transition-colors line-clamp-1">
                  {project.title}
                </h4>
                
                <p className="text-xs text-charcoal-muted line-clamp-2 leading-relaxed mb-4">
                  {project.description}
                </p>

                {/* Tech Pills */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.tools.slice(0, 3).map((tool) => (
                    <span key={tool} className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-ivory text-charcoal-soft border border-teal-deep/5">
                      {tool}
                    </span>
                  ))}
                  {project.tools.length > 3 && (
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-md bg-ivory text-charcoal-muted">
                      +{project.tools.length - 3}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-teal-deep/5 text-xs font-mono text-teal-muted group-hover:text-wood-dark">
                <span>View Project Case &rarr;</span>
                <span className="text-charcoal-muted">#{project.id}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectCardDeck;
