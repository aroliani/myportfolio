import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { 
  Github, 
  ExternalLink, 
  Layers, 
  X, 
  Maximize2, 
  ShieldAlert, 
  Sparkles,
  Palette,
  Code2
} from 'lucide-react';

import projectImage1 from '../../assets/1welcoming.jpg'; 
import projectImage2 from '../../assets/healthcare.png';
import projectImage3 from '../../assets/wumpus.png';
import projectImage4 from '../../assets/music.png';
import projectImage5 from '../../assets/srmweb.png';
import projectImage6 from '../../assets/srmfig.png';
import projectImage7 from '../../assets/boosh.png';
import projectImage8 from '../../assets/ctf.jpg';
import projectImage9 from '../../assets/prof.png';

const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

const projectData = [ 
  { 
    id: 1, 
    title: 'MedEase: Mobile Health Management', 
    category: 'web-mobile',
    categoryLabel: 'Mobile App',
    description: 'A mobile health app connecting patients with booking services, profile management, and curated health media.', 
    longDescription: 'MedEase is a comprehensive mobile health application designed to simplify access to healthcare services. Key features include secure user registration and login, profile management with photo uploads, and functionalities for booking lab tests and doctor appointments. The application also provides access to health articles and videos, with all data managed through Firebase.',
    skills: ['Mobile App Development', 'Database Integration', 'UI/UX Implementation', 'User Authentication'],
    tools: ['Java', 'XML', 'Android Studio', 'Firebase'], 
    linkUrl: 'https://github.com/aroliani/MedEase_final', 
    imageUrl: projectImage1,
    isDesign: false
  },
  { 
    id: 2, 
    title: 'HealthCare Diagnosis Web App', 
    category: 'web-mobile',
    categoryLabel: 'Web App',
    description: 'Rule-based decision-tree healthcare tool that provides preliminary disease diagnosis and health advice.', 
    longDescription: 'This project focused on creating a smart tool for health and wellness. Responsible for designing and implementing the core disease diagnosis feature. This involved writing JavaScript logic for both the front-end user interface and decision tree processing to provide users with health recommendations without requiring a complex backend.', 
    skills: ['Full-Stack JavaScript', 'Algorithm Design', 'UI/UX Logic'], 
    tools: ['JavaScript', 'HTML5', 'CSS3'], 
    linkUrl: 'https://github.com/aroliani/healthcare-web.git', 
    imageUrl: projectImage2,
    isDesign: false
  }, 
  { 
    id: 3, 
    title: 'Wumpus World AI Game', 
    category: 'web-mobile',
    categoryLabel: 'AI & Web',
    description: 'Logic-based grid navigation game powered by Alpha-Beta Pruning decision-making artificial intelligence.', 
    longDescription: 'Developed a logic-based grid game where an agent navigates, avoids dangers, collects gold, and defeats enemies using Alpha-Beta Pruning and decision-making algorithms. Implemented using HTML, JavaScript, and CSS with a focus on autonomous movement and strategy optimization.', 
    skills: ['Artificial Intelligence', 'Game Logic', 'State Optimization', 'Algorithms'], 
    tools: ['JavaScript', 'HTML5', 'CSS3'], 
    linkUrl: 'https://github.com/aroliani/wumpus-world-ai.git', 
    imageUrl: projectImage3,
    isDesign: false
  },
  { 
    id: 4, 
    title: 'Music Discovery Platform', 
    category: 'web-mobile',
    categoryLabel: 'Full-Stack MERN',
    description: 'Full-stack platform to curate and share music tastes with Passport.js authentication and AWS EC2 deployment.', 
    longDescription: 'A full-stack web application designed for music enthusiasts to share and discover music posts. Features include user registration and login with Passport.js (Local, JWT, Google OAuth), post creation with rich embeds (YouTube/SoundCloud), real-time comments, pagination, and CI/CD deployment on AWS EC2 via GitHub Actions.', 
    skills: ['Full-Stack Engineering', 'API Integration', 'Cloud Deployment', 'CI/CD Pipeline'], 
    tools: ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'AWS EC2', 'Tailwind CSS'], 
    linkUrl: 'https://github.com/aroliani/music-discovery.git', 
    imageUrl: projectImage4,
    isDesign: false
  },
  { 
    id: 5, 
    title: 'Security Risk Management Dashboard Web', 
    category: 'cybersecurity',
    categoryLabel: 'Cybersecurity & Web',
    description: 'Real-time cybersecurity risk monitoring web application built with Python Flask and MongoDB.', 
    longDescription: 'A comprehensive web application that assists organizations in analyzing, prioritizing, and visualizing cybersecurity threats. Features dynamic risk matrices from MongoDB data, upload/parsing of structured vulnerability reports, interactive threat tables, and downloadable compliance risk reports.', 
    skills: ['Risk Assessment', 'Vulnerability Tracking', 'Flask Web Engineering', 'Database Design'], 
    tools: ['Python', 'Flask', 'MongoDB', 'HTML5/CSS3', 'Chart.js'], 
    linkUrl: 'https://github.com/aroliani/srm-dashboard.git', 
    imageUrl: projectImage5,
    isDesign: false
  },
  { 
    id: 6, 
    title: 'SRM Dashboard Enterprise UI/UX', 
    category: 'uiux',
    categoryLabel: 'UI/UX Design',
    description: 'Figma enterprise prototype for a modern Security Risk Management dashboard with threat matrices and telemetry cards.', 
    longDescription: 'Designed a high-fidelity enterprise UI/UX prototype for security teams to monitor threats across infrastructure assets. Features customizable dark-mode widgets, severity heatmaps, asset vulnerability rankings, and accessibility-compliant data tables.', 
    skills: ['Enterprise UI/UX', 'Design Systems', 'Data Visualization Mockup', 'Interactive Prototyping'], 
    tools: ['Figma', 'Design Tokens', 'Prototyping'], 
    linkUrl: 'https://www.figma.com', 
    imageUrl: projectImage6,
    isDesign: true
  },
  { 
    id: 7, 
    title: 'BOOSH - Campus Bus Schedule UI/UX', 
    category: 'uiux',
    categoryLabel: 'UI/UX Design',
    description: 'Smart campus transportation UI/UX design featuring real-time bus tracking and booking simulation.', 
    longDescription: 'Designed a student-centric mobile application mock-up for campus bus scheduling and route optimization. Includes live bus coordinate simulation, calendar ticket reservation, boarding house route stops, and dual guest/registered user flows.', 
    skills: ['User Research', 'Mobile UX Flow', 'Wireframing', 'Visual Prototyping'], 
    tools: ['Canva', 'Figma', 'UI Kit'], 
    linkUrl: 'https://www.figma.com', 
    imageUrl: projectImage7,
    isDesign: true
  },
  { 
    id: 8, 
    title: 'Capture The Flag (CTF) Competitions', 
    category: 'cybersecurity',
    categoryLabel: 'Ethical Hacking',
    description: 'Practical ethical hacking problem-solving in web exploitation, cryptography, and network packet analysis.', 
    longDescription: 'Participated in hands-on cybersecurity CTF challenges. Tackled complex scenarios in SQL injection, authentication bypass, cipher decryption (Caesar, Vigenère, XOR via CyberChef), and HTTP request forensics with Burp Suite and Wireshark under strict time constraints.', 
    skills: ['Web Exploitation', 'Cryptography', 'Packet Inspection', 'Vulnerability Hunting'], 
    tools: ['Burp Suite', 'Wireshark', 'Nmap', 'CyberChef', 'Linux CLI'], 
    linkUrl: 'https://github.com/aroliani', 
    imageUrl: projectImage8,
    isDesign: false
  },
  { 
    id: 9, 
    title: 'Hacker Profiling & OSINT Investigation', 
    category: 'cybersecurity',
    categoryLabel: 'OSINT & Intelligence',
    description: 'Open Source Intelligence research project in collaboration with the Indonesian Ministry of Defence (Kemenhan).', 
    longDescription: 'Led an intelligence gathering and threat profiling initiative for cyber reconnaissance. Leveraged OSINT methodologies to trace online footprints, performed simulated ethical credential attacks to evaluate threat vectors, and generated structured risk mitigation documentation for stakeholders.', 
    skills: ['Open Source Intelligence', 'Threat Modeling', 'Social Engineering Awareness', 'Technical Reporting'], 
    tools: ['Seeker', 'Ngrok', 'Google Dorks', 'TheHarvester', 'Linux'], 
    linkUrl: 'https://github.com/aroliani', 
    imageUrl: projectImage9,
    isDesign: false
  }
];

const FILTER_TABS = [
  { id: 'all', label: 'All Projects', count: 9 },
  { id: 'cybersecurity', label: 'Cybersecurity & OSINT', count: 3 },
  { id: 'web-mobile', label: 'Web & Mobile', count: 4 },
  { id: 'uiux', label: 'UI/UX Design', count: 2 },
];

const ProjectModal = ({ project, onClose, onImageClick }) => {
  if (!project) return null;

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0, y: 20 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{ scale: 0.9, opacity: 0, y: 20 }}
      className="glass-panel border border-white/15 rounded-3xl w-full max-w-3xl max-h-[88vh] overflow-y-auto relative shadow-2xl shadow-black/80"
      onClick={(e) => e.stopPropagation()}
    >
      <button 
        onClick={onClose} 
        className="absolute top-4 right-4 p-2 rounded-full bg-slate-900/80 text-gray-400 hover:text-white hover:bg-slate-800 transition-colors z-20 border border-white/10"
      >
        <X className="w-5 h-5" />
      </button>

      <div className="relative group overflow-hidden cursor-pointer" onClick={() => onImageClick(project.imageUrl)}>
        <img 
          src={project.imageUrl} 
          alt={project.title} 
          className="w-full h-64 sm:h-80 object-cover rounded-t-3xl transition-transform duration-500 group-hover:scale-105" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80" />
        <div className="absolute bottom-4 left-6 flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-violet-600/80 text-white backdrop-blur-md">
            {project.categoryLabel}
          </span>
          <span className="p-1.5 rounded-full bg-slate-900/70 text-gray-300 text-xs flex items-center gap-1 backdrop-blur-md">
            <Maximize2 className="w-3.5 h-3.5" />
            <span className="text-[10px]">Fullscreen</span>
          </span>
        </div>
      </div>

      <div className="p-6 sm:p-8">
        <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">
          {project.title}
        </h3>
        
        <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6 text-justify">
          {project.longDescription}
        </p>

        <div className="border-t border-white/10 pt-6 space-y-5">
          <div>
            <h4 className="text-xs font-mono font-bold text-violet-400 uppercase tracking-wider mb-2.5">
              Acquired Competencies
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.skills.map((skill) => (
                <span key={skill} className="px-3 py-1 rounded-xl text-xs font-mono bg-violet-500/15 text-violet-300 border border-violet-500/25">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-mono font-bold text-indigo-400 uppercase tracking-wider mb-2.5">
              Tools &amp; Technologies
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.tools.map((tool) => (
                <span key={tool} className="px-3 py-1 rounded-xl text-xs font-mono bg-indigo-500/15 text-indigo-300 border border-indigo-500/25">
                  {tool}
                </span>
              ))}
            </div>
          </div>

          <div className="pt-4 flex items-center justify-end gap-3">
            <a
              href={project.linkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-medium text-xs font-mono transition-all shadow-md shadow-violet-600/30"
            >
              {project.isDesign ? <Palette className="w-4 h-4" /> : <Github className="w-4 h-4" />}
              <span>{project.isDesign ? 'View Prototype' : 'View on GitHub'}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const FullscreenImageView = ({ imageUrl, onClose }) => (
  <motion.div 
    className="fixed inset-0 bg-black/90 backdrop-blur-xl flex items-center justify-center z-50 p-4" 
    initial={{ opacity: 0 }} 
    animate={{ opacity: 1 }} 
    exit={{ opacity: 0 }} 
    onClick={onClose}
  >
    <button 
      onClick={onClose} 
      className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-2xl z-20 transition-colors"
    >
      <X className="w-6 h-6" />
    </button>
    <motion.img 
      src={imageUrl} 
      alt="Project Preview Fullscreen" 
      className="max-w-[95vw] max-h-[90vh] object-contain rounded-xl shadow-2xl" 
      initial={{ scale: 0.85 }} 
      animate={{ scale: 1 }} 
      exit={{ scale: 0.85 }} 
    />
  </motion.div>
);

const Projects = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const [fullscreenImage, setFullscreenImage] = useState(null);

  const filteredProjects = selectedFilter === 'all'
    ? projectData
    : projectData.filter(p => p.category === selectedFilter);

  return (
    <>
      <motion.section 
        id="projects" 
        className="py-24 relative z-10"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }} 
      >
        <div className="container mx-auto px-6 max-w-6xl">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass-pill text-xs font-mono text-violet-300 mb-3 border border-violet-500/20">
              <Code2 className="w-3.5 h-3.5" />
              <span>Engineered Solutions</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
              Featured <span className="bg-gradient-to-r from-violet-400 via-fuchsia-300 to-indigo-300 bg-clip-text text-transparent">Projects</span>
            </h2>
            <p className="mt-3 text-base text-gray-400 max-w-2xl mx-auto leading-relaxed">
              A curated showcase of cybersecurity forensics, full-stack architectures, and intuitive user experiences.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
            {FILTER_TABS.map((tab) => {
              const isActive = selectedFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setSelectedFilter(tab.id)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-mono font-medium transition-all duration-200 flex items-center gap-2 ${
                    isActive
                      ? 'bg-violet-600 text-white shadow-lg shadow-violet-600/30 scale-105'
                      : 'glass-card text-gray-400 hover:text-white border border-white/5 hover:border-white/15'
                  }`}
                >
                  <span>{tab.label}</span>
                  <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                    isActive ? 'bg-white/20 text-white' : 'bg-slate-800 text-gray-400'
                  }`}>
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Projects Grid */}
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence>
              {filteredProjects.map((project) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  key={project.id}
                  onClick={() => setSelectedProject(project)}
                  className="glass-card rounded-3xl border border-white/10 overflow-hidden flex flex-col group cursor-pointer hover:border-violet-500/40 hover:-translate-y-1.5 transition-all duration-300"
                >
                  {/* Card Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={project.imageUrl} 
                      alt={project.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-70" />
                    
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[11px] font-mono font-medium bg-slate-900/80 backdrop-blur-md text-violet-300 border border-white/10">
                      {project.categoryLabel}
                    </span>
                  </div>

                  {/* Card Body */}
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-lg font-bold text-white group-hover:text-violet-300 transition-colors line-clamp-1 mb-2">
                      {project.title}
                    </h3>
                    
                    <p className="text-xs sm:text-sm text-gray-400 line-clamp-2 leading-relaxed mb-4 flex-1">
                      {project.description}
                    </p>

                    {/* Tools Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {project.tools.slice(0, 3).map((tool) => (
                        <span key={tool} className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white/5 text-gray-300 border border-white/5">
                          {tool}
                        </span>
                      ))}
                      {project.tools.length > 3 && (
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-md bg-white/5 text-gray-400">
                          +{project.tools.length - 3}
                        </span>
                      )}
                    </div>

                    {/* Card Footer */}
                    <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs text-violet-400 font-mono">
                      <span className="flex items-center gap-1 group-hover:underline">
                        Lihat Rincian &rarr;
                      </span>
                      <a
                        href={project.linkUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                        title={project.isDesign ? "Figma Prototype" : "GitHub Repo"}
                      >
                        {project.isDesign ? <Palette className="w-4 h-4" /> : <Github className="w-4 h-4" />}
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </motion.section>

      {/* Modal View */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div 
            className="fixed inset-0 bg-black/75 backdrop-blur-md flex items-center justify-center z-50 p-4" 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            onClick={() => setSelectedProject(null)}
          >
            <ProjectModal 
              project={selectedProject} 
              onClose={() => setSelectedProject(null)} 
              onImageClick={(img) => setFullscreenImage(img)} 
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fullscreen Image Preview */}
      <AnimatePresence>
        {fullscreenImage && (
          <FullscreenImageView 
            imageUrl={fullscreenImage} 
            onClose={() => setFullscreenImage(null)} 
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Projects;