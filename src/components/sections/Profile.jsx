import React from 'react';
import { motion } from 'framer-motion';
import { 
  GraduationCap, 
  Award, 
  Briefcase, 
  Eye, 
  Download, 
  ShieldCheck, 
  Code, 
  Layers
} from 'lucide-react';
import profileImage from '../../assets/foto.jpg';
import cvFile from '../../assets/Aroliani Munte-CV.pdf';

const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } 
  },
};

const Profile = () => {
  return (
    <motion.section
      id="about"
      className="py-28 relative z-10 bg-gradient-to-b from-[#fdfbf7] via-[#f7f3eb] to-[#fdfbf7] border-t border-champagne/30"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
    >
      {/* Warm Ambient Radial Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-champagne/15 via-transparent to-transparent pointer-events-none" />

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        
        {/* Section Heading */}
        <div className="mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-deep text-champagne border border-champagne/40 text-xs font-mono font-bold tracking-wider shadow-sm mb-3">
            <span>01 / Background &amp; Profile</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-black text-teal-deep tracking-tight">
            About Me<span className="text-champagne font-sans">.</span>
          </h2>
          <p className="mt-2 text-sm text-charcoal-muted max-w-xl font-normal leading-relaxed">
            Informatics undergraduate aiming for precision, resilience, and user delight across Cybersecurity, Full-Stack, and UI/UX.
          </p>
        </div>

        {/* Clean Editorial Bento Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Portrait & Fast Profile Metadata (4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="p-7 rounded-3xl bg-white/95 backdrop-blur-md border border-[#e2d8c3] hover:border-champagne/70 shadow-[0_10px_30px_rgba(15,56,62,0.06)] hover:shadow-[0_20px_40px_rgba(15,56,62,0.12)] transition-all duration-300 flex flex-col items-center text-center">
              
              {/* Profile Photo with Golden Ring */}
              <div className="w-48 h-48 rounded-2xl overflow-hidden ring-4 ring-champagne/30 shadow-md mb-5 border-2 border-white">
                <img
                  src={profileImage}
                  alt="Aroliani Munte"
                  className="w-full h-full object-cover"
                />
              </div>

              <h3 className="text-2xl font-bold text-teal-deep font-mono tracking-tight">
                Aroliani Munte
              </h3>
              <p className="text-xs text-charcoal-muted font-mono mt-1 font-medium">
                Informatics Student @ President University
              </p>

              <div className="w-full border-t border-[#e2d8c3]/80 my-4" />

              {/* Status Pill with Pulsing Dot */}
              <div className="w-full py-2 px-3 rounded-xl bg-emerald-50/90 text-emerald-800 border border-emerald-500/30 text-xs font-mono text-center mb-5 flex items-center justify-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-semibold">Open to Internship Opportunities</span>
              </div>

              {/* CV Action Buttons */}
              <div className="w-full grid grid-cols-2 gap-2.5">
                <a
                  href={cvFile}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-3 rounded-xl bg-ivory hover:bg-white text-teal-deep border border-teal-deep/20 hover:border-champagne text-xs font-mono font-bold flex items-center justify-center gap-1.5 transition-all shadow-sm"
                >
                  <Eye className="w-3.5 h-3.5 text-wood" />
                  <span>View CV</span>
                </a>
                <a
                  href={cvFile}
                  download="Aroliani_Munte_CV.pdf"
                  className="py-2.5 px-3 rounded-xl bg-gradient-to-r from-teal-deep to-teal-muted hover:from-teal-muted hover:to-teal-deep text-champagne text-xs font-mono font-bold flex items-center justify-center gap-1.5 shadow-md transition-all border border-champagne/30"
                >
                  <Download className="w-3.5 h-3.5 text-champagne" />
                  <span>Download</span>
                </a>
              </div>

            </div>

            {/* Core Pillars */}
            <div className="p-6 rounded-3xl bg-white/95 backdrop-blur-md border border-[#e2d8c3] hover:border-champagne/70 shadow-[0_10px_30px_rgba(15,56,62,0.06)] transition-all space-y-3">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-teal-deep mb-2 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-champagne" />
                <span>Core Disciplines</span>
              </h4>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-teal-light/60 border border-teal-deep/10">
                <ShieldCheck className="w-4 h-4 text-teal-deep shrink-0" />
                <span className="text-xs text-charcoal font-semibold">Cybersecurity &amp; OSINT</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-champagne-light/50 border border-wood/15">
                <Code className="w-4 h-4 text-wood-dark shrink-0" />
                <span className="text-xs text-charcoal font-semibold">Full-Stack Web &amp; Mobile</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-dusty-soft/70 border border-dusty/15">
                <Layers className="w-4 h-4 text-dusty shrink-0" />
                <span className="text-xs text-charcoal font-semibold">UI/UX Interface Design</span>
              </div>
            </div>
          </div>

          {/* Right Column: Introduction Narrative & Credentials (8 cols) */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            
            {/* Main Narrative Card: Full Name Introduced Naturally */}
            <div className="p-7 sm:p-8 rounded-3xl bg-white/95 backdrop-blur-md border border-[#e2d8c3] hover:border-champagne/70 shadow-[0_10px_30px_rgba(15,56,62,0.06)] hover:shadow-[0_20px_40px_rgba(15,56,62,0.12)] transition-all">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2 h-2 rounded-full bg-champagne" />
                <span className="text-xs font-mono uppercase tracking-widest text-wood-dark font-bold">Introduction</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-teal-deep mb-4">
                Hi, I'm Aroliani Munte.
              </h3>
              
              <p className="text-charcoal-soft text-sm sm:text-base leading-relaxed text-justify">
                I am an Informatics student in my sixth semester at <strong className="text-teal-deep font-semibold">President University</strong> with a keen technical interest in <strong className="text-teal-deep font-semibold">Cybersecurity</strong>, <strong className="text-teal-deep font-semibold">Full-Stack Development</strong>, and <strong className="text-teal-deep font-semibold">UI/UX Design</strong>. My nickname, <em className="text-wood-dark font-semibold">Aroo</em>, inspires my approach to technology: aiming for accuracy, resilience, and impactful digital solutions.
              </p>
              
              <p className="text-charcoal-muted text-sm sm:text-base leading-relaxed mt-4 text-justify">
                Over the past three years, I have gained hands-on experience identifying and mitigating security vulnerabilities, deploying full-stack web applications with cloud integrations, and turning design prototypes in Figma into responsive, accessible interfaces.
              </p>
            </div>

            {/* Academic & Professional Highlights Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              {/* Highlight 1: KADA Fellowship */}
              <div className="p-6 rounded-3xl bg-white/95 backdrop-blur-md border border-[#e2d8c3] hover:border-champagne/70 shadow-[0_10px_30px_rgba(15,56,62,0.06)] hover:shadow-[0_18px_36px_rgba(15,56,62,0.10)] transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl bg-teal-deep text-champagne flex items-center justify-center shadow-sm">
                      <Award className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono px-3 py-1 rounded-full bg-teal-deep text-champagne font-bold border border-champagne/30 shadow-sm">
                      International Fellowship
                    </span>
                  </div>
                  <h4 className="text-base sm:text-lg font-bold text-teal-deep mb-2">
                    Korea-ASEAN Digital Academy (KADA)
                  </h4>
                  <p className="text-xs text-charcoal-muted leading-relaxed">
                    Selected participant in an international program supported by AKCF, Korea's MSIT, NIPA, and Indonesia's Komdigi. Curriculum covers AI ethics, full-stack cloud deployment, and DevOps automation.
                  </p>
                </div>
                <div className="mt-5 pt-3 border-t border-[#e2d8c3]/80 text-[11px] font-mono text-wood-dark font-semibold flex items-center justify-between">
                  <span>Advanced Software &amp; Cloud</span>
                  <span className="text-teal-deep">2024</span>
                </div>
              </div>

              {/* Highlight 2: DPMI President University */}
              <div className="p-6 rounded-3xl bg-white/95 backdrop-blur-md border border-[#e2d8c3] hover:border-champagne/70 shadow-[0_10px_30px_rgba(15,56,62,0.06)] hover:shadow-[0_18px_36px_rgba(15,56,62,0.10)] transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl bg-wood text-ivory flex items-center justify-center shadow-sm">
                      <Briefcase className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono px-3 py-1 rounded-full bg-champagne-light text-wood-dark font-bold border border-wood/25">
                      Jan – Apr 2024
                    </span>
                  </div>
                  <h4 className="text-base sm:text-lg font-bold text-teal-deep mb-2">
                    DPMI President University
                  </h4>
                  <p className="text-xs text-charcoal-muted leading-relaxed">
                    Completed internship at Divisi Pengembangan &amp; Manajemen Industri. Prepared over 50 accreditation files for internal quality assessments and supported national quality audit procedures.
                  </p>
                </div>
                <div className="mt-5 pt-3 border-t border-[#e2d8c3]/80 text-[11px] font-mono text-teal-deep font-semibold flex items-center justify-between">
                  <span>Quality Assurance &amp; Internal Audit</span>
                  <span className="text-wood">Internship</span>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </motion.section>
  );
};

export default Profile;