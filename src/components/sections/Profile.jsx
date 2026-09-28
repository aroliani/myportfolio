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
      className="py-24 relative z-10 bg-ivory-light border-t border-teal-deep/5"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
    >
      <div className="container mx-auto px-6 max-w-6xl">
        
        {/* Section Heading */}
        <div className="mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-light text-teal-deep border border-teal-deep/10 text-xs font-mono mb-3">
            <span>01 / Background &amp; Profile</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-teal-deep tracking-tight">
            About Me<span className="text-wood">.</span>
          </h2>
        </div>

        {/* Clean Editorial Bento Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Portrait & Fast Profile Metadata (4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="editorial-card p-6 rounded-3xl bg-white border border-teal-deep/10 shadow-sm flex flex-col items-center text-center">
              
              {/* Profile Photo */}
              <div className="w-48 h-48 rounded-2xl overflow-hidden border border-teal-deep/15 mb-4 shadow-sm">
                <img
                  src={profileImage}
                  alt="Aroliani Munte"
                  className="w-full h-full object-cover"
                />
              </div>

              <h3 className="text-xl font-bold text-teal-deep font-mono">
                Aroliani Munte
              </h3>
              <p className="text-xs text-charcoal-muted font-mono mt-1">
                Informatics Student @ President University
              </p>

              <div className="w-full border-t border-teal-deep/10 my-4" />

              {/* Status Pill */}
              <div className="w-full py-2 px-3 rounded-xl bg-teal-light text-teal-deep text-xs font-mono text-center mb-4">
                ● Open to Internship Opportunities
              </div>

              {/* CV Action Buttons */}
              <div className="w-full grid grid-cols-2 gap-2.5">
                <a
                  href={cvFile}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-3 rounded-xl bg-white hover:bg-ivory-dark text-teal-deep border border-teal-deep/20 text-xs font-mono font-medium flex items-center justify-center gap-1.5 transition-all shadow-sm"
                >
                  <Eye className="w-3.5 h-3.5 text-wood" />
                  <span>View CV</span>
                </a>
                <a
                  href={cvFile}
                  download="Aroliani_Munte_CV.pdf"
                  className="py-2.5 px-3 rounded-xl bg-teal-deep hover:bg-teal-muted text-ivory text-xs font-mono font-medium flex items-center justify-center gap-1.5 shadow-sm transition-all"
                >
                  <Download className="w-3.5 h-3.5 text-champagne" />
                  <span>Download</span>
                </a>
              </div>

            </div>

            {/* Core Pillars */}
            <div className="editorial-card p-6 rounded-3xl bg-white border border-teal-deep/10 shadow-sm space-y-3">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-teal-deep mb-2">
                Core Disciplines
              </h4>
              <div className="flex items-center gap-3 p-2.5 rounded-xl bg-ivory">
                <ShieldCheck className="w-4 h-4 text-teal-deep" />
                <span className="text-xs text-charcoal font-medium">Cybersecurity &amp; OSINT</span>
              </div>
              <div className="flex items-center gap-3 p-2.5 rounded-xl bg-ivory">
                <Code className="w-4 h-4 text-wood-dark" />
                <span className="text-xs text-charcoal font-medium">Full-Stack Web &amp; Mobile</span>
              </div>
              <div className="flex items-center gap-3 p-2.5 rounded-xl bg-ivory">
                <Layers className="w-4 h-4 text-dusty" />
                <span className="text-xs text-charcoal font-medium">UI/UX Interface Design</span>
              </div>
            </div>
          </div>

          {/* Right Column: Introduction Narrative & Credentials (8 cols) */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            
            {/* Main Narrative Card: Full Name Introduced Naturally */}
            <div className="editorial-card p-6 sm:p-8 rounded-3xl bg-white border border-teal-deep/10 shadow-sm">
              <h3 className="text-xl sm:text-2xl font-bold text-teal-deep mb-4">
                Hi, I'm Aroliani Munte.
              </h3>
              
              <p className="text-charcoal text-sm sm:text-base leading-relaxed text-justify">
                I am an Informatics student in my sixth semester at <strong>President University</strong> with a keen technical interest in <strong>Cybersecurity</strong>, <strong>Full-Stack Development</strong>, and <strong>UI/UX Design</strong>. My nickname, <em>Aroo</em>, inspires my approach to technology: aiming for accuracy, resilience, and impactful digital solutions.
              </p>
              
              <p className="text-charcoal-muted text-sm sm:text-base leading-relaxed mt-4 text-justify">
                Over the past three years, I have gained hands-on experience identifying and mitigating security vulnerabilities, deploying full-stack web applications with cloud integrations, and turning design prototypes in Figma into responsive, accessible interfaces.
              </p>
            </div>

            {/* Academic & Professional Highlights Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              {/* Highlight 1: KADA Fellowship */}
              <div className="editorial-card p-6 rounded-3xl bg-white border border-teal-deep/10 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-9 h-9 rounded-xl bg-teal-light flex items-center justify-center text-teal-deep">
                      <Award className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-teal-light text-teal-deep font-semibold">
                      Fellowship
                    </span>
                  </div>
                  <h4 className="text-sm sm:text-base font-bold text-teal-deep mb-1.5">
                    Korea-ASEAN Digital Academy (KADA)
                  </h4>
                  <p className="text-xs text-charcoal-muted leading-relaxed">
                    Selected participant in an international program supported by AKCF, Korea's MSICT, NIPA, and Indonesia's MCDA. Curriculum covers AI ethics, full-stack cloud deployment, and DevOps automation.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-teal-deep/5 text-[11px] font-mono text-wood-dark">
                  Advanced Software &amp; Cloud
                </div>
              </div>

              {/* Highlight 2: DPMI President University */}
              <div className="editorial-card p-6 rounded-3xl bg-white border border-teal-deep/10 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-9 h-9 rounded-xl bg-champagne-light flex items-center justify-center text-wood-dark">
                      <Briefcase className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-ivory-dark text-charcoal font-semibold">
                      Jan – Apr 2024
                    </span>
                  </div>
                  <h4 className="text-sm sm:text-base font-bold text-teal-deep mb-1.5">
                    DPMI President University
                  </h4>
                  <p className="text-xs text-charcoal-muted leading-relaxed">
                    Completed internship at Divisi Pengembangan &amp; Manajemen Industri. Prepared over 50 accreditation files for internal quality assessments and supported national quality audit procedures.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-teal-deep/5 text-[11px] font-mono text-teal-deep">
                  Quality Assurance &amp; Internal Audit
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