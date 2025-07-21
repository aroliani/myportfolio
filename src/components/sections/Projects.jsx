import React, { useState } from 'react';
import { GithubOutlined, FileSearchOutlined, CloseOutlined } from '@ant-design/icons';
import { AnimatePresence, motion } from 'framer-motion';

import projectImage1 from '../../assets/1welcoming.jpg'; 
import projectImage2 from '../../assets/foto.jpg';
import projectImage3 from '../../assets/foto.jpg';
import projectImage4 from '../../assets/foto.jpg';
import projectImage5 from '../../assets/foto.jpg';
import projectImage6 from '../../assets/foto.jpg';

// --- For the modal so when you click on the image it opens the modal --- //
const ProjectModal = ({ project, onClose, onImageClick }) => {
  if (!project) return null;

  const modalVariants = {
    hidden: { y: "-50px", opacity: 0 },
    visible: { y: "0", opacity: 1, transition: { type: "spring", stiffness: 120 } },
  };

  return (
    <motion.div
      className="bg-gray-800 border border-gray-700 rounded-lg shadow-2xl shadow-sky-500/10 w-full max-w-4xl max-h-[90vh] overflow-y-auto relative"
      variants={modalVariants}
      onClick={(e) => e.stopPropagation()}
    >
      <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl z-20">
        <CloseOutlined />
      </button>
      <img 
        src={project.imageUrl} 
        alt={`Pratinjau ${project.title}`} 
        className="w-full h-auto aspect-video object-cover rounded-t-lg cursor-pointer transition-transform hover:scale-105"
        onClick={() => onImageClick(project.imageUrl)}
      />
      <div className="p-8">
          <h2 className="text-3xl font-bold text-green-400 font-mono mb-2">{project.title}</h2>
          <p className="text-gray-400 leading-relaxed mb-6">{project.longDescription}</p>
          
          <div className="border-t border-gray-700 pt-6 space-y-4">
            <div>
              <h4 className="text-sm font-bold text-sky-400 font-mono uppercase tracking-wider mb-2">Skills yang Didapat</h4>
              <div className="flex flex-wrap gap-2">
                {project.skills.map(skill => (
                  <span key={skill} className="bg-sky-900/50 text-sky-300 text-xs font-semibold px-2.5 py-1 rounded-full font-mono">{skill}</span>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-sm font-bold text-green-400 font-mono uppercase tracking-wider mb-2">Tools yang Dipakai</h4>
              <div className="flex flex-wrap gap-2">
                {project.tools.map(tool => (
                  <span key={tool} className="bg-green-900/50 text-green-300 text-xs font-semibold px-2.5 py-1 rounded-full font-mono">{tool}</span>
                ))}
              </div>
            </div>
          </div>
      </div>
    </motion.div>
  );
};

// --- For view the details of the picture on fullscreen --- //
const FullscreenImageView = ({ imageUrl, onClose }) => {
    return (
        <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
        >
            <button onClick={onClose} className="absolute top-6 right-6 text-white text-3xl z-20">
              <CloseOutlined />
            </button>
            <motion.img 
                src={imageUrl} 
                alt="Pratinjau Gambar Fullscreen" 
                className="max-w-full max-h-full object-contain"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
            />
        </motion.div>
    )
}


// --- The projects --- //
const projectData = [ 
    { 
      id: 1, title: 'MedEase Health Service App', 
      description: 'Developed a full-stack health application with user profiling and medicine purchasing functionalities.', 
      longDescription: 'MedEase is a comprehensive healthcare service application. I developed key backend and frontend components using Flask and MongoDB, implementing functionalities like user profile management and a secure system for purchasing medicine.',
      skills: ['Full-Stack Development', 'Database Management', 'User Authentication'],
      tools: ['Flask', 'Python', 'MongoDB', 'JavaScript'], 
      githubUrl: 'https://github.com/aroliani/MedEase_final', imageUrl: projectImage3
    }, 
    { 
      id: 2, title: 'Simulasi Phishing Internal', 
      description: 'Merancang dan melaksanakan kampanye phishing untuk mengukur kesadaran keamanan.', 
      longDescription: 'Sebuah kampanye simulasi phishing dirancang untuk menguji kewaspadaan karyawan terhadap serangan rekayasa sosial. Skenario email dibuat semirip mungkin dengan email phishing asli. Hasilnya menunjukkan tingkat klik sebesar 30%, yang menjadi dasar untuk program pelatihan kesadaran keamanan yang lebih terfokus dan efektif.',
      skills: ['Social Engineering', 'Security Awareness', 'Campaign Management'],
      tools: ['Gophish', 'SMTP Servers'], 
      githubUrl: 'https://github.com/username/repo2', imageUrl: projectImage2
    }, 
    { 
      id: 3, title: 'Forensik Jaringan', 
      description: 'Menganalisis lalu lintas jaringan untuk menginvestigasi insiden pelanggaran data.', 
      longDescription: 'Setelah terdeteksi aktivitas mencurigakan di jaringan, dilakukan analisis mendalam terhadap tangkapan paket (PCAP). Dengan menggunakan Wireshark, berhasil diidentifikasi komunikasi ke server Command & Control (C2) yang tidak dikenal. Jejak digital ini membantu dalam memahami skala insiden dan mengisolasi sistem yang terinfeksi.',
      skills: ['Network Forensics', 'Packet Analysis', 'Incident Investigation'],
      tools: ['Wireshark', 'Volatility', 'SIEM'], 
      githubUrl: 'https://github.com/username/repo3', imageUrl: projectImage3
    },
    { 
      id: 4, title: 'Pengembangan Secure SDLC', 
      description: 'Mengintegrasikan tool SAST & DAST ke dalam pipeline CI/CD untuk otomatisasi keamanan.', 
      longDescription: 'Proyek ini berfokus pada pendekatan "Shift Left" dengan mengintegrasikan keamanan ke dalam siklus hidup pengembangan perangkat lunak. Alat Static Application Security Testing (SAST) seperti SonarQube dan Dynamic Application Security Testing (DAST) diintegrasikan ke dalam pipeline Jenkins, memungkinkan deteksi dini kerentanan sebelum aplikasi dirilis ke produksi.',
      skills: ['DevSecOps', 'CI/CD Security', 'Automation'],
      tools: ['Jenkins', 'SonarQube', 'GitLab CI'], 
      githubUrl: 'https://github.com/username/repo4', imageUrl: projectImage4
    },
    { 
      id: 5, title: 'Analisis Ancaman Insider', 
      description: 'Membangun dashboard UBA untuk mendeteksi anomali aktivitas pengguna internal.', 
      longDescription: 'Dengan memanfaatkan data log dari berbagai sumber, sebuah dasbor User Behavior Analytics (UBA) dibangun menggunakan ELK Stack. Dasbor ini mampu memvisualisasikan pola aktivitas normal pengguna dan memberikan peringatan jika terdeteksi adanya anomali, seperti akses file di luar jam kerja atau eskalasi hak istimewa yang tidak wajar.',
      skills: ['Data Analysis', 'Threat Hunting', 'UBA'],
      tools: ['SIEM', 'Python', 'ELK Stack'], 
      githubUrl: 'https://github.com/username/repo5', imageUrl: projectImage5
    },
    { 
      id: 6, title: 'Red Team Engagement', 
      description: 'Melakukan emulasi serangan tingkat lanjut berdasarkan framework MITRE ATT&CK.', 
      longDescription: 'Sebagai bagian dari tim merah, dilakukan simulasi serangan yang meniru taktik, teknik, dan prosedur (TTP) dari kelompok Advanced Persistent Threat (APT) tertentu. Engagement ini berhasil menguji ketahanan tim biru (tim pertahanan) dan mengidentifikasi celah dalam deteksi dan respons insiden, yang kemudian digunakan untuk memperkuat pertahanan.',
      skills: ['Adversary Emulation', 'MITRE ATT&CK', 'Penetration Testing'],
      tools: ['C2 Frameworks', 'AWS', 'Terraform'], 
      githubUrl: 'https://github.com/username/repo6', imageUrl: projectImage6
    }
];

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [fullscreenImage, setFullscreenImage] = useState(null);

  const handleCardClick = (project) => {
    setSelectedProject(project);
  };

  const handleImageClick = (e, imageUrl) => {
    e.stopPropagation();
    setFullscreenImage(imageUrl);
  };

  return (
    <>
      <section id="case-studies" className="py-20 md:py-24 bg-gray-900/50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-green-400 font-mono">Projects</h2>
            <p className="mt-3 text-lg text-gray-400 max-w-2xl mx-auto">Analisis singkat dari beberapa proyek dan simulasi keamanan yang pernah ditangani.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projectData.map((project) => (
              <div 
                key={project.id} 
                className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden flex flex-col transition-all duration-300 hover:shadow-2xl hover:shadow-sky-500/20 hover:-translate-y-2 cursor-pointer group"
                onClick={() => handleCardClick(project)}
              >
                <div className="overflow-hidden">
                    <img src={project.imageUrl} alt={`Pratinjau ${project.title}`} className="w-full h-40 object-cover transition-transform duration-500 group-hover:scale-110" />
                </div>
                <div className="p-6 flex flex-col flex-grow h-full">
                  <h3 className="text-xl font-bold text-green-400 mb-2 font-mono">{project.title}</h3>
                  <p className="text-gray-400 mb-4 flex-grow">{project.description}</p>
                  <div className="mt-auto pt-4 border-t border-gray-700/50 flex justify-end items-center gap-4">
                    <span className="text-gray-400 text-2xl" title="Lihat Detail">
                      <FileSearchOutlined />
                    </span>
                    <a 
                      href={project.githubUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      title="Lihat di GitHub" 
                      className="text-gray-400 hover:text-white transition-colors text-2xl z-10"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <GithubOutlined />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
          >
            <ProjectModal 
              project={selectedProject} 
              onClose={() => setSelectedProject(null)} 
              onImageClick={(imageUrl) => handleImageClick(event, imageUrl)}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {fullscreenImage && (
            <FullscreenImageView imageUrl={fullscreenImage} onClose={() => setFullscreenImage(null)} />
        )}
      </AnimatePresence>
    </>
  );
};

export default Projects;