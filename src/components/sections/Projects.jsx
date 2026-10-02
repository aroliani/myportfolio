import React, { useState } from 'react';
import { GithubOutlined, FileSearchOutlined, CloseOutlined, ExperimentOutlined } from '@ant-design/icons';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Grid2X2, Layers3 } from 'lucide-react';

import projectImage1 from '../../assets/1welcoming.jpg'; 
import projectImage2 from '../../assets/healthcare.png';
import projectImage3 from '../../assets/wumpus.png';
import projectImage4 from '../../assets/music.png';
import projectImage5 from '../../assets/srmweb.png';
import projectImage6 from '../../assets/srmfig.png';
import projectImage7 from '../../assets/boosh.png';
import projectImage8 from '../../assets/ctf.jpg';
import projectImage9 from '../../assets/prof.png';
import projectImage10 from '../../assets/sakuradms.gif'; 

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const CATEGORIES = ['All', 'Defense on August 2026', 'Web', 'Mobile', 'Cyber', 'UI/UX', 'AI/Game'];

const projectData = [ 
    { 
      id: 1, 
      category: 'Defense on August 2026',
      title: 'SAKURA DMS — Document Management System', 
      description: 'Final capstone project (August 2026). A full-featured Document Management System built to digitalize and streamline document workflows for organizations.', 
      longDescription: 'SAKURA DMS (Document Management System) is my final capstone project presented in August 2026 at President University. This system is designed to digitalize organizational document workflows, providing a centralized platform for document storage, retrieval, versioning, and access control. Key features include document upload & categorization, role-based access control (RBAC), document search & filter, version history & audit trail, approval workflow, and digital signature integration. The system was built with a focus on security, scalability, and usability for enterprise environments.',
      skills: ['System Analysis & Design', 'Full-Stack Development', 'Database Design', 'Security & Access Control', 'UI/UX Implementation'],
      tools: ['React.js', 'Node.js', 'Express', 'TiDB Cloud (metadata database)', 'DBeaver (database monitoring and ERD)', 'Tailwind CSS'], 
      linkUrl: 'https://github.com/SAKURA-DMS', 
      imageUrl: projectImage10,
      isFeatured: true,
    },
    { 
      id: 2, 
      category: 'Mobile',
      title: 'MedEase: A Mobile Health Management Application', 
      description: 'Built a comprehensive mobile health service app using Android Studio (Java & XML) and Firebase, featuring appointment booking, health articles, and shake-sensor integration.', 
      longDescription: 'MedEase is a comprehensive mobile health application designed to simplify access to healthcare services. Key features I implemented include secure user registration and login via Firebase Auth, profile management with photo uploads, and functionalities for booking lab tests and doctor appointments. The application also provides access to health articles and YouTube videos, with a shake sensor feature that redirects users to recommended health videos. All data is managed through Firebase Realtime Database.',
      skills: ['Mobile App Development', 'Database Integration', 'UI/UX Implementation', 'User Authentication'],
      tools: ['Java', 'XML', 'Android Studio', 'Firebase'], 
      linkUrl: 'https://github.com/aroliani/MedEase_final', 
      imageUrl: projectImage1
    },
    { 
      id: 3, 
      category: 'Web',
      title: 'HealthCare Diagnosis App', 
      description: 'Designed and implemented a rule-based disease diagnosis web application using vanilla JavaScript with decision-tree logic for health recommendations.', 
      longDescription: 'This project focused on creating a smart tool for health and wellness using pure vanilla JavaScript with no framework. I was responsible for designing and implementing the core disease diagnosis feature using decision-tree algorithms for both the front-end UI and processing logic to provide health recommendations based on user symptoms.',
      skills: ['Full-Stack JavaScript', 'Algorithm Design', 'UI/UX Logic'],
      tools: ['JavaScript', 'HTML', 'CSS'], 
      linkUrl: 'https://github.com/aroliani/healthcare-web.git', 
      imageUrl: projectImage2 
    }, 
    { 
      id: 4,
      category: 'AI/Game',
      title: 'Wumpus World AI Game', 
      description: 'Developed a web-based logic game incorporating Alpha-Beta Pruning AI for autonomous decision-making and strategy optimization.', 
      longDescription: 'Developed a logic-based grid game where an agent navigates, avoids dangers, collects gold, and defeats enemies using Alpha-Beta Pruning and decision-making algorithms. Implemented using HTML, JavaScript, and CSS with a focus on autonomous movement and strategy optimization.',
      skills: ['Game Development', 'Artificial Intelligence', 'Project Management'], 
      tools: ['HTML', 'CSS', 'Javascript', 'AI Algorithms'], 
      linkUrl: 'https://github.com/aroliani/wumpus-game.git', 
      imageUrl: projectImage3
    },
    { 
      id: 5,
      category: 'Web',
      title: 'Music Discovery Platform', 
      description: 'Engineered a full-stack MERN web app for music discovery with OAuth authentication, AWS EC2 deployment, and GitHub Actions CI/CD pipeline.', 
      longDescription: 'A full-stack web application for discovering and sharing music posts, developed using MERN Stack. Features include user registration and login with Passport.js (Local, JWT, Google OAuth), post creation with song info & audio embeds, real-time comment section, pagination and search, deployed on AWS EC2 using GitHub Actions CI/CD.',
      skills: ['Full-Stack Development', 'API Integration', 'User Authentication', 'DevOps'],
      tools: ['Node.js', 'Express', 'MongoDB', 'React', 'AWS EC2', 'GitHub Actions'], 
      linkUrl: 'https://github.com/aroliani/music-discovery-project', 
      imageUrl: projectImage4
    },
    { 
      id: 6, 
      category: 'Cyber',
      title: 'Security Risk Management Dashboard Website', 
      description: 'Developed a Python/Flask dashboard to visualize cybersecurity risk data, generate downloadable reports, and track organizational threats using MongoDB.',
      longDescription: 'A Security Risk Management (SRM) Dashboard built with Python and Flask. Visualizes security assessment data from MongoDB through dynamic risk matrices, implements user authentication and access control with secure session handling, and generates downloadable compliance reports.',
      skills: ['Backend Development', 'Data Visualization', 'Risk Management', 'Security Analysis'],
      tools: ['Python', 'Flask', 'MongoDB'], 
      linkUrl: 'https://github.com/aroliani/srm-dashboard', 
      imageUrl: projectImage5
    }, 
    { 
      id: 7,
      category: 'UI/UX',
      title: 'Security Risk Management Dashboard UI/UX', 
      description: 'Designed a comprehensive Figma prototype for an SRM system with color-coded risk severity scales and accessibility standards.', 
      longDescription: 'UI/UX design for a Security Risk Management Dashboard in Figma. Features sidebar navigation, header stats, threat matrix layout, color-coded risk severity scale, and accessible design language adhering to modern dashboard standards.',
      skills: ['UI/UX Design', 'Dashboard Design', 'Prototyping', 'User-Centered Design'],
      tools: ['Figma'], 
      linkUrl: 'https://www.figma.com/proto/vx7edWf7celmBjQjRSa6yA/srm---aroliani?node-id=0-1&t=l0fshorK0bMI9zYz-1', 
      imageUrl: projectImage6,
      isDesignLink: true 
    },
    { 
      id: 8, 
      category: 'UI/UX',
      title: 'BOOSH - Bus Schedule UI/UX', 
      description: 'Designed a user-friendly interface for a student dormitory bus scheduling system with real-time map mockups and booking simulation.', 
      longDescription: 'UI/UX design for a conceptual bus scheduling platform for students. Features daily/weekly/monthly schedule views, real-time map mockups, ticket booking simulation with calendar UI, and user roles (Guest and Registered). Designed with Canva.',
      skills: ['UI/UX Design', 'Prototyping', 'User-Centered Design'], 
      tools: ['Canva'], 
      linkUrl: 'https://www.canva.com/design/DAFzJBwEebE/CNyyTyLGzSL08b_p2XN7qA/edit', 
      imageUrl: projectImage7,
      isDesignLink: true 
    },
    { 
      id: 9, 
      category: 'Cyber',
      title: 'CTF Participant', 
      description: 'Solved CTF-style tasks involving Web Exploitation and Cryptography using Burp Suite, CyberChef, Wireshark, and Hashcat.', 
      longDescription: 'Participated in Capture The Flag competitions, focusing on web exploitation and cryptography challenges. Activities included bypassing login pages, analyzing HTTP requests, finding hidden flags, and decrypting ciphers (Caesar, Vigenère, XOR). Used tools such as Burp Suite, CyberChef, Wireshark, and Hashcat.',
      skills: ['Web Exploitation', 'Cryptography', 'Vulnerability Analysis', 'Problem Solving', 'Digital Forensics'],
      tools: ['Burp Suite', 'CyberChef', 'Wireshark', 'Python', 'Linux', 'StegSolve', 'Hashcat', 'Base64'], 
      linkUrl: '#', 
      imageUrl: projectImage8,
      isDesignLink: true 
    },
    { 
      id: 10, 
      category: 'Cyber',
      title: 'Hacker Profiling (OSINT)', 
      description: 'Led a cybersecurity OSINT project profiling hackers targeting Indonesian infrastructure, in collaboration with the Ministry of Defence.', 
      longDescription: 'In collaboration with the Ministry of Defence of The Republic of Indonesia, I led a team in Open-Source Intelligence (OSINT) operations. We profiled five hackers targeting Indonesian digital infrastructure, simulated ethical phishing attacks, and produced strategic threat intelligence reports.',
      skills: ['OSINT', 'Threat Intelligence', 'Ethical Phishing', 'Team Leadership'],
      tools: ['Ngrok', 'Seeker', 'SETookit', 'WhatsMyName', 'TheHarvester', 'Google Dorking', 'Linux CLI'], 
      linkUrl: '#', 
      imageUrl: projectImage9,
      isDesignLink: true 
    }, 
];

/* ── Modal ── */
const ProjectModal = ({ project, onClose, onImageClick }) => {
  if (!project) return null;
  const modalVariants = {
    hidden: { y: "-50px", opacity: 0 },
    visible: { y: "0", opacity: 1, transition: { type: "spring", stiffness: 120 } }
  };
  return (
    <motion.div
      className="bg-gray-800 border border-gray-700 rounded-lg shadow-2xl shadow-violet-500/10 w-full max-w-4xl max-h-[90vh] overflow-y-auto relative"
      variants={modalVariants}
      onClick={(e) => e.stopPropagation()}
    >
      <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl z-20"><CloseOutlined /></button>
      {project.isFeatured && (
        <div className="absolute top-4 left-4 z-20 bg-violet-600 text-white text-xs font-bold px-3 py-1 rounded-full font-mono">
          ★ Defense on August 2026
        </div>
      )}
      <img
        src={project.imageUrl}
        alt={`Preview of ${project.title}`}
        className="w-full h-auto aspect-video object-cover rounded-t-lg cursor-pointer transition-transform hover:scale-105"
        onClick={() => onImageClick(project.imageUrl)}
      />
      <div className="p-8">
        <div className="flex items-start gap-3 mb-2 flex-wrap">
          <h2 className="text-3xl font-bold text-violet-400 font-mono">{project.title}</h2>
          <span className="bg-purple-900/50 text-purple-300 text-xs font-semibold px-2.5 py-1 rounded-full font-mono self-center">{project.category}</span>
        </div>
        <p className="text-gray-400 leading-relaxed mb-6">{project.longDescription}</p>
        <div className="border-t border-gray-700 pt-6 space-y-4">
          <div>
            <h4 className="text-sm font-bold text-purple-400 font-mono uppercase tracking-wider mb-2">Acquired Skills</h4>
            <div className="flex flex-wrap gap-2">
              {project.skills.map(skill => (
                <span key={skill} className="bg-purple-900/50 text-purple-300 text-xs font-semibold px-2.5 py-1 rounded-full font-mono">{skill}</span>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-sm font-bold text-violet-400 font-mono uppercase tracking-wider mb-2">Tools & Technologies</h4>
            <div className="flex flex-wrap gap-2">
              {project.tools.map(tool => (
                <span key={tool} className="bg-violet-900/50 text-violet-300 text-xs font-semibold px-2.5 py-1 rounded-full font-mono">{tool}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

/* ── Fullscreen Image ── */
const FullscreenImageView = ({ imageUrl, onClose }) => (
  <motion.div
    className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4"
    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
    onClick={onClose}
  >
    <button onClick={onClose} className="absolute top-6 right-6 text-white text-3xl z-20"><CloseOutlined /></button>
    <motion.img src={imageUrl} alt="Fullscreen" className="max-w-full max-h-full object-contain" initial={{ scale: 0.8 }} animate={{ scale: 1 }} exit={{ scale: 0.8 }} />
  </motion.div>
);

/* ── Card (Grid view) ── */
const ProjectCard = ({ project, onClick }) => (
  <motion.div
    layout
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.9 }}
    transition={{ duration: 0.3 }}
      className={`group flex flex-col overflow-hidden rounded-xl border bg-[#1b2230] transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-violet-500/15 ${project.isFeatured ? 'border-violet-500/50' : 'border-gray-700'}`}
  >
    {project.isFeatured && (
      <div className="bg-violet-600 text-white text-xs font-bold px-3 py-1 font-mono text-center">
        ★ DEFENSE ON AUGUST 2026
      </div>
    )}
    <div className="overflow-hidden">
      <img
        src={project.imageUrl}
        alt={`Preview of ${project.title}`}
        className="w-full h-40 object-cover transition-transform duration-500 group-hover:scale-110"
      />
    </div>
    <div className="p-5 flex flex-col flex-grow">
      <div className="flex items-center gap-2 mb-2">
        <span className="bg-violet-900/50 text-violet-300 text-xs font-semibold px-2 py-0.5 rounded-full font-mono">{project.category}</span>
      </div>
      <h3 className="text-base font-bold text-violet-400 mb-2 font-mono leading-tight">{project.title}</h3>
      <p className="text-gray-400 text-sm mb-4 flex-grow">{project.description}</p>
      <div className="mt-auto pt-4 border-t border-gray-700/50 flex justify-end items-center gap-4">
        <button type="button" onClick={() => onClick(project)} className="inline-flex items-center gap-2 rounded-md px-2 py-1 font-mono text-xs text-gray-300 transition-colors hover:bg-violet-500/10 hover:text-violet-300" title="Inspect project details"><FileSearchOutlined /> Inspect details</button>
        <a
          href={project.linkUrl}
          target="_blank"
          rel="noopener noreferrer"
          title={project.isDesignLink ? "View Design" : "View on GitHub"}
          className="text-gray-500 hover:text-white transition-colors text-xl z-10"
          onClick={(e) => e.stopPropagation()}
        >
          {project.isDesignLink ? <ExperimentOutlined /> : <GithubOutlined />}
        </a>
      </div>
    </div>
  </motion.div>
);

/* ── Card (3D deck view) ── */
const ProjectDeckCard = ({ project, onInspect }) => (
  <article className={`h-full overflow-hidden rounded-2xl border bg-[#1b2230] shadow-2xl shadow-black/40 ${project.isFeatured ? 'border-violet-400/70' : 'border-gray-600'}`}>
    <div className="grid h-full grid-rows-[13rem_minmax(0,1fr)] sm:grid-rows-[16rem_minmax(0,1fr)]">
      <div className="relative overflow-hidden bg-[#111722]">
        <img src={project.imageUrl} alt={`Preview of ${project.title}`} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1b2230] via-transparent to-black/10" />
        <span className="absolute left-5 top-5 rounded-md border border-violet-300/30 bg-[#111722]/90 px-3 py-1.5 font-mono text-xs text-violet-200">{project.category}</span>
        <span className="absolute right-5 top-5 font-mono text-xs text-white/80">CASE #{String(project.id).padStart(2, '0')}</span>
      </div>
      <div className="flex min-h-0 flex-col px-5 pb-5 pt-1 sm:px-8 sm:pb-7">
        <h3 className="font-mono text-xl font-bold leading-snug text-gray-100 sm:text-2xl">{project.title}</h3>
        <p className="mt-3 overflow-hidden text-sm leading-relaxed text-gray-300 sm:text-base">{project.description}</p>
        <div className="mt-auto flex flex-wrap items-end justify-between gap-4 border-t border-gray-700/80 pt-4">
          <div className="flex max-w-[65%] flex-wrap gap-2">
            {project.tools.slice(0, 4).map((tool) => <span key={tool} className="rounded-md border border-gray-600 bg-[#252e3d] px-2 py-1 font-mono text-[11px] text-gray-300">{tool}</span>)}
            {project.tools.length > 4 && <span className="px-1 py-1 font-mono text-[11px] text-gray-400">+{project.tools.length - 4}</span>}
          </div>
          <div className="flex items-center gap-2">
            <button type="button" onClick={() => onInspect(project)} className="inline-flex items-center gap-2 rounded-lg bg-violet-600 px-3 py-2 font-mono text-xs font-semibold text-white transition hover:bg-violet-500 sm:px-4 sm:text-sm"><FileSearchOutlined /> Inspect details</button>
            <a href={project.linkUrl} target="_blank" rel="noopener noreferrer" aria-label={project.isDesignLink ? 'View design' : 'View on GitHub'} title={project.isDesignLink ? 'View design' : 'View on GitHub'} onClick={(event) => event.stopPropagation()} className="grid h-10 w-10 place-items-center rounded-lg border border-gray-600 text-gray-200 transition hover:border-violet-400 hover:text-violet-300">{project.isDesignLink ? <ExperimentOutlined /> : <GithubOutlined />}</a>
          </div>
        </div>
      </div>
    </div>
  </article>
);

/* ── Main Component ── */
const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [fullscreenImage, setFullscreenImage] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [viewMode, setViewMode] = useState('deck');
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);

  const filtered = activeCategory === 'All'
    ? projectData
    : projectData.filter(p => p.category === activeCategory);

  const handleCardClick = (project) => setSelectedProject(project);
  const handleImageClick = (imageUrl) => setFullscreenImage(imageUrl);

  return (
    <>
      <motion.section
        id="projects"
        className="bg-[#171d28]/76 py-20 md:py-24"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ amount: 0.05 }}
      >
        <div className="container mx-auto px-6">
          {/* Header */}
          <div className="mb-10 text-center">
            <p className="mb-2 font-mono text-xs uppercase text-violet-300">Portfolio / Selected work</p>
            <h2 className="font-mono text-3xl font-bold text-gray-100 md:text-4xl">
              Featured <span className="text-violet-300">Projects</span>
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm text-gray-300 sm:text-base">
              A selection of my work across software development, cybersecurity, and design.
            </p>
          </div>

          <div className="mb-8 flex flex-col items-center justify-between gap-5 lg:flex-row">
            {/* Category Filters */}
            <div className="flex flex-wrap justify-center gap-2 lg:justify-start">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => { setActiveCategory(cat); setActiveProjectIndex(0); }}
                  className={`px-3 py-1.5 rounded-full text-xs font-mono font-semibold border transition-all duration-200 ${
                    activeCategory === cat
                      ? 'bg-violet-600 border-violet-600 text-white'
                      : 'border-gray-600 text-gray-400 hover:border-violet-500 hover:text-violet-400'
                  }`}
                >
                  {cat}
                  {cat !== 'All' && (
                    <span className="ml-1 text-gray-500">
                      ({projectData.filter(p => p.category === cat).length})
                    </span>
                  )}
                </button>
              ))}
            </div>

            <div aria-label="Project view" className="flex shrink-0 items-center gap-1 rounded-xl border border-gray-600 bg-[#202837] p-1">
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                aria-pressed={viewMode === 'grid'}
                className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 font-mono text-xs font-semibold transition-colors sm:text-sm ${viewMode === 'grid' ? 'bg-violet-600 text-white' : 'text-gray-300 hover:bg-white/5 hover:text-white'}`}
              >
                <Grid2X2 size={16} /> Grid View
              </button>
              <button
                type="button"
                onClick={() => setViewMode('deck')}
                aria-pressed={viewMode === 'deck'}
                className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 font-mono text-xs font-semibold transition-colors sm:text-sm ${viewMode === 'deck' ? 'bg-violet-600 text-white' : 'text-gray-300 hover:bg-white/5 hover:text-white'}`}
              >
                <Layers3 size={16} /> 3D Deck
              </button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {viewMode === 'grid' ? (
              <motion.div
                key="grid"
                className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <AnimatePresence>
                  {filtered.map((project) => (
                    <ProjectCard key={project.id} project={project} onClick={handleCardClick} />
                  ))}
                </AnimatePresence>
              </motion.div>
            ) : (
              <motion.div
                key="deck"
                className="relative mx-auto h-[36rem] max-w-5xl overflow-hidden [perspective:1400px] sm:h-[39rem]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {filtered.map((project, index) => {
                  const position = filtered.length ? (index - activeProjectIndex + filtered.length) % filtered.length : 0;
                  const offset = position === 0 ? 0 : position === 1 ? 1 : position === filtered.length - 1 ? -1 : position < filtered.length / 2 ? 2 : -2;
                  const isVisible = Math.abs(offset) <= 1;
                  return (
                    <motion.div
                      key={project.id}
                      className="absolute top-0 h-[34rem] sm:h-[37rem]"
                      style={{ left: '50%', width: 'min(90%, 42rem)', marginLeft: 'max(-45%, -21rem)', transformStyle: 'preserve-3d', zIndex: offset === 0 ? 20 : 10, pointerEvents: offset === 0 ? 'auto' : 'none' }}
                      initial={false}
                      animate={{ x: `${offset * 58}%`, scale: offset === 0 ? 1 : 0.84, rotateY: offset * -13, opacity: isVisible ? (offset === 0 ? 1 : 0.48) : 0 }}
                      transition={{ type: 'spring', stiffness: 150, damping: 24 }}
                      aria-hidden={offset !== 0}
                    >
                      <ProjectDeckCard project={project} onInspect={handleCardClick} />
                    </motion.div>
                  );
                })}
                <button type="button" onClick={() => setActiveProjectIndex((index) => (index - 1 + filtered.length) % filtered.length)} disabled={filtered.length < 2} aria-label="Previous project" className="absolute left-1 top-1/2 z-30 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-xl border border-gray-300 bg-white text-[#25352f] shadow-lg transition hover:bg-violet-100 disabled:opacity-40 sm:left-3 sm:h-12 sm:w-12"><ChevronLeft size={24} /></button>
                <button type="button" onClick={() => setActiveProjectIndex((index) => (index + 1) % filtered.length)} disabled={filtered.length < 2} aria-label="Next project" className="absolute right-1 top-1/2 z-30 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-xl border border-gray-300 bg-white text-[#25352f] shadow-lg transition hover:bg-violet-100 disabled:opacity-40 sm:right-3 sm:h-12 sm:w-12"><ChevronRight size={24} /></button>
              </motion.div>
            )}
          </AnimatePresence>

          {filtered.length > 0 && (
            <p className="mt-4 text-center font-mono text-xs uppercase text-gray-300 sm:text-sm">
              Project <span className="text-violet-300">{viewMode === 'deck' ? activeProjectIndex + 1 : filtered.length}</span> of {filtered.length}
            </p>
          )}
          {filtered.length === 0 && (
            <div className="text-center py-20 text-gray-500 font-mono">No projects found in this category.</div>
          )}
        </div>
      </motion.section>

      {/* Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
          >
            <ProjectModal
              project={selectedProject}
              onClose={() => setSelectedProject(null)}
              onImageClick={handleImageClick}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fullscreen image */}
      <AnimatePresence>
        {fullscreenImage && (
          <FullscreenImageView imageUrl={fullscreenImage} onClose={() => setFullscreenImage(null)} />
        )}
      </AnimatePresence>
    </>
  );
};

export default Projects;

