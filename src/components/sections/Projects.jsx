import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { 
  Github, 
  ExternalLink, 
  X, 
  Maximize2, 
  Palette,
  Layers
} from 'lucide-react';
import ProjectCardDeck from '../game/ProjectCardDeck.jsx';

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
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

const projectData = [ 
  { 
    id: 1, 
    title: 'MedEase: Mobile Health Management', 
    category: 'web-mobile',
    categoryLabel: 'Mobile App',
    description: 'A mobile health service app providing lab/doctor appointment scheduling, user profiles, and educational health media.', 
    longDescription: 'MedEase is a mobile application engineered to streamline healthcare access. Key functionalities include user authentication, patient profile management with photo uploads, and booking systems for clinical tests. Integrates Firebase real-time database and Android Studio native Java architectures.',
    skills: ['Mobile App Development', 'Database Integration', 'UI/UX Implementation', 'User Authentication'],
    tools: ['Java', 'XML', 'Android Studio', 'Firebase'], 
    linkUrl: 'https://github.com/aroliani/MedEase_final', 
    imageUrl: projectImage1,
    isDesign: false
  },
  { 
    id: 2, 
    title: 'HealthCare Diagnosis Web Application', 
    category: 'web-mobile',
    categoryLabel: 'Web App',
    description: 'A rule-based diagnostic guidance application processing symptom criteria through decision-tree algorithms.', 
    longDescription: 'Created a responsive diagnostic tool for health advice. Implemented front-end user experience and logical processing to suggest preliminary diagnoses and next-step medical recommendations without external backend overhead.', 
    skills: ['JavaScript Logic', 'Algorithm Design', 'UI/UX Logic'], 
    tools: ['JavaScript', 'HTML5', 'CSS3'], 
    linkUrl: 'https://github.com/aroliani/healthcare-web.git', 
    imageUrl: projectImage2,
    isDesign: false
  }, 
  { 
    id: 3, 
    title: 'Wumpus World AI Game Engine', 
    category: 'web-mobile',
    categoryLabel: 'AI & Web',
    description: 'Autonomous grid navigation simulation powered by Alpha-Beta Pruning decision-making algorithms.', 
    longDescription: 'Engineered a grid exploration environment where an autonomous agent navigates hazard rooms, detects gold, shoots arrows, and calculates survival moves using Alpha-Beta Pruning game logic implemented with vanilla web technologies.', 
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
    description: 'Full-stack platform to share and discover music posts, featuring Passport.js auth and AWS EC2 deployment.', 
    longDescription: 'Full-stack application engineered with MongoDB, Express, React, and Node.js. Features user authentication (Local, JWT, Google OAuth), media embeds (YouTube/SoundCloud), real-time commenting, and automated CI/CD deployment to AWS EC2 via GitHub Actions.', 
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
    description: 'Real-time cybersecurity threat telemetry and risk monitoring dashboard built with Python Flask and MongoDB.', 
    longDescription: 'Engineered a web application assisting organizations with vulnerability tracking and risk quantification. Parses asset data into interactive dynamic risk matrices and generates downloadable compliance reports for security audits.', 
    skills: ['Risk Assessment', 'Vulnerability Tracking', 'Flask Web Engineering', 'Database Design'], 
    tools: ['Python', 'Flask', 'MongoDB', 'HTML5/CSS3', 'Chart.js'], 
    linkUrl: 'https://github.com/aroliani/srm-dashboard.git', 
    imageUrl: projectImage5,
    isDesign: false
  },
  { 
    id: 6, 
    title: 'Enterprise SRM Dashboard UI/UX Prototype', 
    category: 'uiux',
    categoryLabel: 'UI/UX Design',
    description: 'High-fidelity Figma prototype for security teams to monitor threats across enterprise infrastructure assets.', 
    longDescription: 'Designed a comprehensive enterprise dashboard system featuring threat matrix layouts, telemetry widgets, severity heatmaps, and accessible data visualization standards.', 
    skills: ['Enterprise UI/UX', 'Design Systems', 'Data Visualization Mockup', 'Interactive Prototyping'], 
    tools: ['Figma', 'Design Tokens', 'Prototyping'], 
    linkUrl: 'https://www.figma.com', 
    imageUrl: projectImage6,
    isDesign: true
  },
  { 
    id: 7, 
    title: 'BOOSH - Campus Transit Schedule UI/UX', 
    category: 'uiux',
    categoryLabel: 'UI/UX Design',
    description: 'Campus mobility mobile application design mock-up featuring live bus route maps and seat reservation.', 
    longDescription: 'Conducted student transit mobility research and created mobile UI flows for bus scheduling, boarding house stop routing, and simulated calendar ticket bookings.', 
    skills: ['User Research', 'Mobile UX Flow', 'Wireframing', 'Visual Prototyping'], 
    tools: ['Canva', 'Figma', 'UI Kit'], 
    linkUrl: 'https://www.figma.com', 
    imageUrl: projectImage7,
    isDesign: true
  },
  { 
    id: 8, 
    title: 'Capture The Flag (CTF) Cybersecurity Challenges', 
    category: 'cybersecurity',
    categoryLabel: 'Ethical Hacking',
    description: 'Hands-on competition problem solving in web exploitation, authentication bypass, and cryptographic decryption.', 
    longDescription: 'Competed in team cybersecurity CTF events solving challenges in SQL injection, authentication bypass, cipher decryption (Caesar, Vigenère, XOR via CyberChef), and HTTP request forensics with Burp Suite and Wireshark.', 
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
    description: 'Open Source Intelligence research project conducted in collaboration with Indonesia’s Ministry of Defence (Kemenhan).', 
    longDescription: 'Conducted an intelligence research project profiling cyber threats and digital footprints. Executed ethical reconnaissance workflows using Seeker, Ngrok, and Google Dorks, producing structured risk mitigation findings.', 
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
      initial={{ scale: 0.95, opacity: 0, y: 15 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{ scale: 0.95, opacity: 0, y: 15 }}
      className="bg-white border border-teal-deep/15 rounded-3xl w-full max-w-3xl max-h-[88vh] overflow-y-auto relative shadow-2xl p-1"
      onClick={(e) => e.stopPropagation()}
    >
      <button 
        onClick={onClose} 
        className="absolute top-4 right-4 p-2 rounded-full bg-white/90 text-charcoal hover:text-teal-deep hover:bg-ivory-dark transition-colors z-20 border border-teal-deep/10 shadow-sm"
      >
        <X className="w-5 h-5" />
      </button>

      <div className="relative group overflow-hidden cursor-pointer" onClick={() => onImageClick(project.imageUrl)}>
        <img 
          src={project.imageUrl} 
          alt={project.title} 
          className="w-full h-64 sm:h-80 object-cover rounded-t-3xl" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
        <div className="absolute bottom-4 left-6 flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-mono font-medium bg-white/95 text-teal-deep shadow">
            {project.categoryLabel}
          </span>
          <span className="p-1.5 rounded-full bg-black/60 text-white text-xs flex items-center gap-1 backdrop-blur-md">
            <Maximize2 className="w-3.5 h-3.5" />
            <span className="text-[10px]">Fullscreen</span>
          </span>
        </div>
      </div>

      <div className="p-6 sm:p-8">
        <h3 className="text-2xl font-bold text-teal-deep font-mono mb-3">
          {project.title}
        </h3>
        
        <p className="text-charcoal text-sm sm:text-base leading-relaxed mb-6 text-justify">
          {project.longDescription}
        </p>

        <div className="border-t border-teal-deep/10 pt-6 space-y-4">
          <div>
            <h4 className="text-xs font-mono font-bold text-teal-muted uppercase tracking-wider mb-2">
              Key Competencies
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.skills.map((skill) => (
                <span key={skill} className="px-3 py-1 rounded-xl text-xs font-mono bg-ivory text-teal-deep border border-teal-deep/10">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-mono font-bold text-wood-dark uppercase tracking-wider mb-2">
              Technologies &amp; Tools
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.tools.map((tool) => (
                <span key={tool} className="px-3 py-1 rounded-xl text-xs font-mono bg-champagne-light text-charcoal border border-champagne/40">
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
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-teal-deep hover:bg-teal-muted text-ivory font-mono text-xs font-medium transition-all shadow-sm"
            >
              {project.isDesign ? <Palette className="w-4 h-4 text-champagne" /> : <Github className="w-4 h-4 text-champagne" />}
              <span>{project.isDesign ? 'Open Figma Prototype' : 'Open GitHub Repository'}</span>
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
    className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4" 
    initial={{ opacity: 0 }} 
    animate={{ opacity: 1 }} 
    exit={{ opacity: 0 }} 
    onClick={onClose}
  >
    <button 
      onClick={onClose} 
      className="absolute top-6 right-6 p-2 rounded-full bg-white/20 hover:bg-white/30 text-white text-2xl z-20 transition-colors"
    >
      <X className="w-6 h-6" />
    </button>
    <motion.img 
      src={imageUrl} 
      alt="Project Preview Fullscreen" 
      className="max-w-[92vw] max-h-[88vh] object-contain rounded-2xl shadow-2xl" 
      initial={{ scale: 0.9 }} 
      animate={{ scale: 1 }} 
      exit={{ scale: 0.9 }} 
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
        className="py-24 relative z-10 bg-ivory"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }} 
      >
        <div className="container mx-auto px-6 max-w-6xl">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-light text-teal-deep border border-teal-deep/10 text-xs font-mono mb-3">
                <span>02 / Case Studies &amp; Implementations</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-teal-deep tracking-tight">
                Featured Projects<span className="text-wood">.</span>
              </h2>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap items-center gap-2">
              {FILTER_TABS.map((tab) => {
                const isActive = selectedFilter === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setSelectedFilter(tab.id)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-medium transition-all ${
                      isActive
                        ? 'bg-teal-deep text-ivory shadow-sm'
                        : 'bg-white text-charcoal-muted hover:text-teal-deep border border-teal-deep/10'
                    }`}
                  >
                    <span>{tab.label}</span>
                    <span className="ml-1.5 opacity-60">({tab.count})</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Project Card Deck / Grid View */}
          <ProjectCardDeck 
            projects={filteredProjects} 
            onSelectProject={(p) => setSelectedProject(p)} 
          />

        </div>
      </motion.section>

      {/* Modal View */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div 
            className="fixed inset-0 bg-charcoal/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" 
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