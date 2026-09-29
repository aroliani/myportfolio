import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Award, GraduationCap, Calendar, MapPin, CheckCircle2 } from 'lucide-react';

const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } 
  },
};

const EXPERIENCES = [
  {
    role: 'Selected International Fellow',
    organization: 'Korea-ASEAN Digital Academy (KADA)',
    period: '2024',
    location: 'International / Hybrid',
    badge: 'International Fellowship',
    badgeColor: 'bg-teal-deep text-champagne border-champagne/40',
    icon: Award,
    description:
      'Competitively selected for the high-impact digital cooperation initiative backed by the ASEAN-Korea Cooperation Fund (AKCF), South Korea’s MSIT, NIPA, and Indonesia’s Komdigi.',
    achievements: [
      'Mastered advanced cloud architectures, container orchestration, and full-stack software deployment pipelines.',
      'Studied practical AI ethics frameworks and enterprise software scalability standards with international instructors.',
      'Collaborated on cross-border software engineering capstones with fellows across ASEAN member states.',
    ],
    tags: ['Full-Stack', 'Cloud Deployment', 'DevOps', 'AI Ethics', 'International Collaboration'],
  },
  {
    role: 'Quality Assurance & Internal Audit Intern',
    organization: 'DPMI President University',
    period: 'Jan 2024 – Apr 2024',
    location: 'Cikarang, Indonesia',
    badge: 'Institutional QA',
    badgeColor: 'bg-wood text-ivory border-wood/30',
    icon: Briefcase,
    description:
      'Served within the Divisi Pengembangan & Manajemen Industri (DPMI), supporting campus-wide institutional quality management and documentation for national accreditation audits.',
    achievements: [
      'Systematically compiled and validated 50+ critical accreditation files and institutional metrics for university evaluation.',
      'Assisted internal quality audits across academic departments to ensure compliance with national accreditation bodies.',
      'Streamlined data collection and audit preparation workflows, minimizing document discrepancies before submission.',
    ],
    tags: ['Quality Assurance', 'Internal Audit', 'Documentation', 'Process Compliance', 'Data Verification'],
  },
  {
    role: 'Informatics Student & Technical Contributor',
    organization: 'President University',
    period: '2022 – Present',
    location: 'Cikarang, Indonesia',
    badge: 'Academic Track',
    badgeColor: 'bg-teal-light text-teal-deep border-teal-deep/20',
    icon: GraduationCap,
    description:
      'Pursuing Bachelor of Science in Informatics with a continuous focus on Cybersecurity, Web Applications, and User-Centric Product Design.',
    achievements: [
      'Built and deployed end-to-end full-stack applications with React, Node.js, and relational database systems.',
      'Conducted vulnerability assessments and web security labs covering OWASP Top 10 mitigation strategies.',
      'Maintained consistent academic dedication while pursuing competitive fellowships and industry-relevant projects.',
    ],
    tags: ['Cybersecurity', 'Informatics', 'Full-Stack Engineering', 'System Architecture'],
  },
];

const Experience = () => {
  return (
    <motion.section
      id="experience"
      className="py-28 relative z-10 bg-gradient-to-b from-[#f7f3eb] via-[#faf7f2] to-[#f7f3eb] border-t border-champagne/30"
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
            <span>04 / Track Record &amp; Milestones</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-black text-teal-deep tracking-tight">
            Experience<span className="text-champagne font-sans">.</span>
          </h2>
          <p className="mt-2 text-sm text-charcoal-muted max-w-xl font-normal leading-relaxed">
            Real-world impact through international digital fellowships, institutional quality assurance audits, and university software engineering.
          </p>
        </div>

        {/* Timeline Bento Grid */}
        <div className="space-y-8">
          {EXPERIENCES.map((exp, index) => {
            const Icon = exp.icon;
            return (
              <motion.div
                key={exp.organization}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.12 }}
                className="p-6 sm:p-8 rounded-3xl bg-white/95 backdrop-blur-md border border-[#e2d8c3] hover:border-champagne/70 shadow-[0_10px_30px_rgba(15,56,62,0.06)] hover:shadow-[0_20px_40px_rgba(15,56,62,0.12)] transition-all duration-300"
              >
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                  {/* Left Info: Role & Org */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-teal-deep text-champagne flex items-center justify-center shrink-0 border border-champagne/30 shadow-md">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-1.5">
                        <span className={`text-[10px] font-mono font-bold px-3 py-0.5 rounded-full border shadow-sm ${exp.badgeColor}`}>
                          {exp.badge}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-teal-deep tracking-tight">
                        {exp.role}
                      </h3>
                      <div className="text-sm font-semibold text-wood-dark mt-0.5">
                        {exp.organization}
                      </div>
                    </div>
                  </div>

                  {/* Right Info: Period & Location */}
                  <div className="flex sm:items-center gap-3 text-xs font-mono text-charcoal-muted shrink-0">
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-ivory border border-[#e2d8c3]">
                      <Calendar className="w-3.5 h-3.5 text-wood" />
                      <span className="font-semibold text-charcoal">{exp.period}</span>
                    </div>
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-ivory border border-[#e2d8c3]">
                      <MapPin className="w-3.5 h-3.5 text-teal-deep" />
                      <span className="font-medium text-charcoal">{exp.location}</span>
                    </div>
                  </div>
                </div>

                <p className="mt-5 text-sm text-charcoal-soft leading-relaxed text-justify">
                  {exp.description}
                </p>

                {/* Accomplishments */}
                <div className="mt-5 pt-5 border-t border-[#e2d8c3]/80 space-y-2.5">
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-teal-deep mb-3 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-champagne" />
                    <span>Key Contributions &amp; Outcomes:</span>
                  </h4>
                  {exp.achievements.map((item, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs text-charcoal-soft leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-wood-dark shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                {/* Tech & Competency Badges */}
                <div className="mt-6 pt-4 border-t border-[#e2d8c3]/80 flex flex-wrap gap-2">
                  {exp.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-xl bg-ivory text-teal-deep text-[11px] font-mono font-semibold border border-[#e2d8c3] hover:border-champagne transition-colors"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
};

export default Experience;
