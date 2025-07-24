import React, { useState } from 'react';
import { GithubOutlined, FileSearchOutlined, CloseOutlined, ExperimentOutlined } from '@ant-design/icons';
import { AnimatePresence, motion } from 'framer-motion';

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
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const ProjectModal = ({ project, onClose, onImageClick }) => {
  if (!project) return null;
  const modalVariants = { hidden: { y: "-50px", opacity: 0 }, visible: { y: "0", opacity: 1, transition: { type: "spring", stiffness: 120 } } };
  return (
    <motion.div className="bg-gray-800 border border-gray-700 rounded-lg shadow-2xl shadow-violet-500/10 w-full max-w-4xl max-h-[90vh] overflow-y-auto relative" variants={modalVariants} onClick={(e) => e.stopPropagation()}>
      <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl z-20"><CloseOutlined /></button>
      <img src={project.imageUrl} alt={`Preview of ${project.title}`} className="w-full h-auto aspect-video object-cover rounded-t-lg cursor-pointer transition-transform hover:scale-105" onClick={() => onImageClick(project.imageUrl)} />
      <div className="p-8">
          <h2 className="text-3xl font-bold text-violet-400 font-mono mb-2">{project.title}</h2>
          <p className="text-gray-400 leading-relaxed mb-6">{project.longDescription}</p>
          <div className="border-t border-gray-700 pt-6 space-y-4">
            <div>
              <h4 className="text-sm font-bold text-purple-400 font-mono uppercase tracking-wider mb-2">Acquired Skills</h4>
              <div className="flex flex-wrap gap-2">{project.skills.map(skill => (<span key={skill} className="bg-purple-900/50 text-purple-300 text-xs font-semibold px-2.5 py-1 rounded-full font-mono">{skill}</span>))}</div>
            </div>
            <div>
              <h4 className="text-sm font-bold text-violet-400 font-mono uppercase tracking-wider mb-2">Tools & Technologies</h4>
              <div className="flex flex-wrap gap-2">{project.tools.map(tool => (<span key={tool} className="bg-violet-900/50 text-violet-300 text-xs font-semibold px-2.5 py-1 rounded-full font-mono">{tool}</span>))}</div>
            </div>
          </div>
      </div>
    </motion.div>
  );
};

const FullscreenImageView = ({ imageUrl, onClose }) => (
    <motion.div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
        <button onClick={onClose} className="absolute top-6 right-6 text-white text-3xl z-20"><CloseOutlined /></button>
        <motion.img src={imageUrl} alt="Fullscreen Image Preview" className="max-w-full max-h-full object-contain" initial={{ scale: 0.8 }} animate={{ scale: 1 }} exit={{ scale: 0.8 }} />
    </motion.div>
);

const projectData = [ 
    { 
      id: 1, 
      title: 'MedEase: A Mobile Health Management Application', 
      description: 'Built a mobile health service app using Android Studio (Java & XML) and Firebase for a seamless user experience.', 
      longDescription: 'MedEase is a comprehensive mobile health application designed to simplify access to healthcare services. Key features I implemented include secure user registration and login, profile management with photo uploads, and functionalities for booking lab tests and doctor appointments. The application also provides access to health articles and videos, with all data managed through Firebase.',
      skills: ['Mobile App Development', 'Database Integration', 'UI/UX Implementation', 'User Authentication'],
      tools: ['Java', 'XML', 'Android Studio', 'Firebase'], 
      linkUrl: 'https://github.com/aroliani/MedEase_final', 
      imageUrl: projectImage1
    },
    { 
      id: 2, 
      title: 'HealthCare Diagnosis App', 
      description: 'Designed and implemented disease diagnosis features in a health application using JavaScript for front-end and back-end logic.', 
      longDescription: 'This project focused on creating a smart tool for health and wellness. I was responsible for designing and implementing the core disease diagnosis feature. This involved writing JavaScript logic for both the front-end user interface and the back-end processing to provide users with health recommendations.', 
      skills: ['Full-Stack JavaScript', 'Algorithm Design', 'UI/UX Logic'], tools: ['JavaScript', 'HTML', 'CSS'], 
      linkUrl: 'https://github.com/aroliani/healthcare-web.git', 
      imageUrl: projectImage2 
    }, 
    { id: 3, 
      title: 'Wumpus World AI Game', 
      description: 'Developed a web-based game incorporating artificial intelligence techniques.', 
      longDescription: 'Developed a logic-based grid game where an agent navigates, avoids dangers, collects gold, and defeats enemies using Alpha-Beta Pruning and decision-making algorithms. Implemented using HTML, JavaScript, and CSS with a focus on autonomous movement and strategy optimization.', 
      skills: ['Game Development', 'Artificial Intelligence', 'Project Management'], 
      tools: ['HTML', 'CSS', 'Javascript', 'AI Algorithms'], 
      linkUrl: 'https://github.com/aroliani/wumpus-game.git', 
      imageUrl: projectImage3
    },
    { 
      id: 5, title: 'Music Discovery Platform', 
      description: 'Engineered a full-stack web app for music discovery with a Node.js backend and React frontend.', 
      longDescription: 'A web application for discovering new music based on user preferences. Users can log in, search for the music posts, view recommendations, and create their own music post. The backend is built with Node.js and Express, using MongoDB for the database. The frontend is a responsive single-page application built with React.',
      skills: ['Full-Stack Development', 'API Integration', 'User Authentication', 'Frontend Development'],
      tools: ['Node.js', 'Express', 'MongoDB', 'React', 'AWS'], 
      linkUrl: 'https://github.com/aroliani/music-discovery-project', 
      imageUrl: projectImage4
    },
    { 
      id: 6, 
      title: 'Security Risk Management Dashboard Website', 
      description: 'Developed a dashboard to visualize security assessment data and track organizational risks using Python', 
      longDescription: 'A Security Risk Management (SRM) Dashboard built with Python. This application visualizes security assessment data from MongoDB, tracks risks, and helps generate reports. It is designed to assist security teams in monitoring and managing their organizational risk posture effectively.',
      skills: ['Backend Development', 'Data Visualization', 'Risk Management'],
      tools: ['Python', 'Flask', 'MongoDB'], 
      linkUrl: 'https://github.com/aroliani/srm-dashboard', 
      imageUrl: projectImage5
    }, 
    { 
      id: 7,
      title: 'Security Risk Management Dashboard UI/UX', 
      description: 'Designed a comprehensive and user-friendly dashboard for a Security Risk Management (SRM) system.', 
      longDescription: 'This project focused on the UI/UX design for a Security Risk Management (SRM) Dashboard. The primary goal was to create an intuitive, data-rich interface for security teams to characterize systems, identify threats, analyze risks, and track mitigation progress. The design, created in Figma, emphasizes clarity and ease of use, allowing users to quickly assess risk posture through various charts and summaries.',
      skills: ['UI/UX Design', 'Dashboard Design', 'Prototyping', 'User-Centered Design'],
      tools: ['Figma'], 
      linkUrl: 'https://www.figma.com/proto/vx7edWf7celmBjQjRSa6yA/srm---aroliani?node-id=0-1&t=l0fshorK0bMI9zZz-1', 
      imageUrl: projectImage6,
      isDesignLink: true 
    },
    { 
      id: 8, 
      title: 'BOOSH - Bus Schedule UI/UX', 
      description: 'Designed a user-friendly, web-based interface for a student dormitory bus scheduling system.', 
      longDescription: 'This project focused on the UI/UX design for a conceptual platform to manage student bus schedules. The primary goal was to create a highly user-friendly interface that emphasized real-time schedule tracking and simulated an online booking process, designed with Canva.', 
      skills: ['UI/UX Design', 'Prototyping', 'User-Centered Design'], 
      tools: ['Canva'], 
      linkUrl: 'https://www.canva.com/design/DAFzJBwEebE/CNyyTyLGzSL08b_p2XN7qA/edit?utm_content=DAFzJBwEebE&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton', 
      imageUrl: projectImage7,
      isDesignLink: true 
    },
    { 
      id: 9, 
      title: 'CTF Participant', 
      description: 'Solved CTF-style tasks involving Web Exploitation and Cryptography using various security tools.', 
      longDescription: 'Participated in a Capture The Flag competition, focusing on web exploitation and cryptography challenges. Gained practical experience in vulnerability analysis, encryption, and logical problem-solving using tools such as Burp Suite, CyberChef, and Wireshark.',
      skills: ['Web Exploitation', 'Cryptography', 'Vulnerability Analysis', 'Problem Solving', 'Digital Forensics'],
      tools: ['Burp Suite', 'CyberChef', 'Wireshark', 'Python', 'Linux', 'StegSolve', 'CyberChef', 'Hashcat', 'Base64'], 
      linkUrl: '#', 
      imageUrl: projectImage8,
      isDesignLink: true 
    },
    { 
      id: 10, 
      title: 'Hacker Profiling (OSINT)', 
      description: 'Led a cybersecurity project using OSINT to profile hackers, in collaboration with the Ministry of Defence.', 
      longDescription: 'In a collaborative project with the Ministry of Defence of The Republic Of Indonesia, I led a team to conduct Open-Source Intelligence (OSINT) operations. We successfully profiled five hackers known for targeting Indonesian digital infrastructure, simulated ethical phishing attacks, and developed strategic threat intelligence reports based on our findings.',
      skills: ['OSINT', 'Threat Intelligence', 'Ethical Phishing', 'Team Leadership'],
      tools: ['Ngrok', 'Seeker', 'SEToolkit', 'WhatsMyName', 'VerifyMail', 'TheHarvester', 'Whois Lookup', 'Google Dorking', 'Linux CLI', 'DefacerID'], 
      linkUrl: '#', 
      imageUrl: projectImage9,
      isDesignLink: true 
    }, 
];

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [fullscreenImage, setFullscreenImage] = useState(null);
  const handleCardClick = (project) => { setSelectedProject(project); };
  const handleImageClick = (e, imageUrl) => { e.stopPropagation(); setFullscreenImage(imageUrl); };

  return (
    <>
      <motion.section 
        id="projects" 
        className="py-20 md:py-24 bg-gray-900/50"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ amount: 0.1 }} 
      >
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-violet-400 font-mono">Projects</h2>
            <p className="mt-3 text-lg text-gray-400 max-w-2xl mx-auto">Practical implementations of software engineering and cybersecurity problem-solving</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projectData.map((project) => (
              <div key={project.id} className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden flex flex-col transition-all duration-300 hover:shadow-2xl hover:shadow-violet-500/20 hover:-translate-y-2 cursor-pointer group" onClick={() => handleCardClick(project)}>
                <div className="overflow-hidden"><img src={project.imageUrl} alt={`Preview of ${project.title}`} className="w-full h-40 object-cover transition-transform duration-500 group-hover:scale-110" /></div>
                <div className="p-6 flex flex-col flex-grow h-full">
                  <h3 className="text-xl font-bold text-violet-400 mb-2 font-mono">{project.title}</h3>
                  <p className="text-gray-400 mb-4 flex-grow">{project.description}</p>
                  <div className="mt-auto pt-4 border-t border-gray-700/50 flex justify-end items-center gap-4">
                    <span className="text-gray-400 text-2xl" title="View Details"><FileSearchOutlined /></span>
                    <a 
                      href={project.linkUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      title={project.isDesignLink ? "View Design/Details" : "View on GitHub"}
                      className="text-gray-400 hover:text-white transition-colors text-2xl z-10"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {/* Logic to change the icons */}
                      {project.isDesignLink ? <ExperimentOutlined /> : <GithubOutlined />}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.section>
      <AnimatePresence>{selectedProject && (<motion.div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedProject(null)}><ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} onImageClick={(imageUrl) => handleImageClick(event, imageUrl)} /></motion.div>)}</AnimatePresence>
      <AnimatePresence>{fullscreenImage && (<FullscreenImageView imageUrl={fullscreenImage} onClose={() => setFullscreenImage(null)} />)}</AnimatePresence>
    </>
  );
};

export default Projects;