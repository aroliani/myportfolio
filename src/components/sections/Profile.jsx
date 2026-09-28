import React from 'react';
import { motion } from 'framer-motion';
import { 
  Eye, 
  Download, 
  GraduationCap, 
  Award, 
  Briefcase, 
  ShieldCheck, 
  Sparkles,
  ExternalLink
} from 'lucide-react';
import profileImage from '../../assets/foto.jpg';
import cvFile from '../../assets/Aroliani Munte-CV.pdf';

const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } 
  },
};

const Profile = () => {
  return (
    <motion.section
      id="profile"
      className="py-24 relative z-10"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
    >
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass-pill text-xs font-mono text-violet-300 mb-3 border border-violet-500/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Discover My Journey</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            About <span className="bg-gradient-to-r from-violet-400 via-fuchsia-300 to-indigo-300 bg-clip-text text-transparent">Me</span>
          </h2>
          <p className="mt-3 text-base text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Get to know my academic background, technical passion, and hands-on milestones across cybersecurity and web development.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Card 1: Avatar & Quick Info (4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="glass-card p-6 rounded-3xl border border-white/10 flex flex-col items-center text-center relative overflow-hidden group">
              {/* Subtle background glow */}
              <div className="absolute -top-16 -left-16 w-36 h-36 bg-violet-600/20 rounded-full blur-2xl group-hover:bg-violet-600/30 transition-all duration-500" />
              
              {/* Photo Frame */}
              <div className="relative mb-5">
                <div className="w-44 h-44 sm:w-52 sm:h-52 rounded-2xl overflow-hidden border-2 border-violet-500/30 p-1 bg-gradient-to-tr from-violet-600/30 to-indigo-500/30 shadow-xl shadow-violet-500/10 group-hover:border-violet-500/60 transition-all duration-500">
                  <img
                    src={profileImage}
                    alt="Aroliani Munte"
                    className="w-full h-full object-cover rounded-xl transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                {/* Active Status Badge */}
                <div className="absolute -bottom-2 right-4 px-3 py-1 rounded-full bg-slate-900/90 border border-emerald-500/40 text-[11px] font-mono text-emerald-300 flex items-center gap-1.5 shadow-lg">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Available for Hire
                </div>
              </div>

              <h3 className="text-xl font-bold text-white font-mono">Aroliani Munte</h3>
              <p className="text-xs text-violet-300 font-mono mt-1">Informatics Student @ President Univ</p>

              <div className="w-full border-t border-white/10 my-5" />

              {/* Action Buttons for CV */}
              <div className="w-full grid grid-cols-2 gap-3">
                <a
                  href={cvFile}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl glass-pill text-xs font-mono text-violet-300 hover:text-white hover:bg-violet-600/20 border border-violet-500/30 transition-all"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>View CV</span>
                </a>
                <a
                  href={cvFile}
                  download="Aroliani_Munte_CV.pdf"
                  className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-mono font-semibold shadow-md shadow-violet-600/25 transition-all"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Get PDF</span>
                </a>
              </div>
            </div>

            {/* Core Values / Focus Card */}
            <div className="glass-card p-6 rounded-3xl border border-white/10 flex flex-col justify-between">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-violet-400 mb-3 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4" />
                <span>Primary Pillars</span>
              </h4>
              <div className="space-y-2.5">
                <div className="p-2.5 rounded-xl bg-slate-900/50 border border-white/5 flex items-center justify-between">
                  <span className="text-xs text-gray-300">Cybersecurity &amp; OSINT</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-violet-900/40 text-violet-300">Security</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-900/50 border border-white/5 flex items-center justify-between">
                  <span className="text-xs text-gray-300">Full-Stack Development</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-900/40 text-indigo-300">Engineering</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-900/50 border border-white/5 flex items-center justify-between">
                  <span className="text-xs text-gray-300">UI/UX Architecture</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-fuchsia-900/40 text-fuchsia-300">Design</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Main Story & Milestones (8 cols) */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            {/* Story Card */}
            <div className="glass-card p-6 sm:p-8 rounded-3xl border border-white/10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-xl bg-violet-500/15 border border-violet-500/30 flex items-center justify-center text-violet-400">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-white">Academic &amp; Professional Profile</h3>
                  <p className="text-xs text-gray-400">Undergraduate at President University</p>
                </div>
              </div>
              
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed text-justify">
                I am a sixth-semester Informatics student at <strong className="text-white">President University</strong> with an avid dedication to <span className="text-violet-300 font-medium">Cybersecurity</span>, <span className="text-indigo-300 font-medium">Full-Stack Web Development</span>, and <span className="text-fuchsia-300 font-medium">UI/UX Design</span>.
              </p>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed mt-3 text-justify">
                I love dissecting how software architectures operate under the hood and strengthening their resilience against vulnerabilities. In parallel, I enjoy translating user-centric ideas into sleek Figma wireframes and bringing them to life with React, Node.js, and cloud ecosystems.
              </p>
            </div>

            {/* Milestones Grid (2 cols inside 8 cols) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* KADA Fellowship */}
              <div className="glass-card p-6 rounded-3xl border border-white/10 flex flex-col justify-between group hover:border-violet-500/30 transition-all">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-9 h-9 rounded-xl bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                      <Award className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                      Scholarship
                    </span>
                  </div>
                  <h4 className="text-sm sm:text-base font-bold text-white mb-1.5 group-hover:text-indigo-300 transition-colors">
                    Korea-ASEAN Digital Academy (KADA)
                  </h4>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    Selected for an intensive international program managed by Elice, supported by AKCF, Korean MSICT, NIPA, and Indonesia's MCDA. Covers AI Ethics, Full-Stack, Cloud Deployment, and DevOps.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-white/5 flex items-center gap-2 text-[11px] font-mono text-indigo-400">
                  <span>Advanced Software &amp; Cloud</span>
                </div>
              </div>

              {/* DPMI Internship */}
              <div className="glass-card p-6 rounded-3xl border border-white/10 flex flex-col justify-between group hover:border-violet-500/30 transition-all">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-9 h-9 rounded-xl bg-violet-500/15 border border-violet-500/30 flex items-center justify-center text-violet-400">
                      <Briefcase className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-violet-500/10 text-violet-300 border border-violet-500/20">
                      Jan - Apr 2024
                    </span>
                  </div>
                  <h4 className="text-sm sm:text-base font-bold text-white mb-1.5 group-hover:text-violet-300 transition-colors">
                    DPMI President University
                  </h4>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    Internship at Divisi Pengembangan &amp; Manajemen Industri. Prepared and organized 50+ institutional accreditation documents and supported internal audits according to national quality standards.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-white/5 flex items-center gap-2 text-[11px] font-mono text-violet-400">
                  <span>Quality Assurance &amp; Auditing</span>
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