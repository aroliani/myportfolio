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
    badgeColor: 'bg-teal-light text-teal-deep border-teal-deep/20',
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
    badgeColor: 'bg-champagne-light text-wood-dark border-wood/20',
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
    badgeColor: 'bg-ivory-dark text-charcoal border-charcoal/15',
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
      className="py-24 relative z-10 bg-ivory border-t border-teal-deep/5"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
    >
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Section Heading */}
        <div className="mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-light text-teal-deep border border-teal-deep/10 text-xs font-mono mb-3">
            <span>04 / Track Record &amp; Milestones</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-teal-deep tracking-tight">
            Experience<span className="text-wood">.</span>
          </h2>
          <p className="mt-3 text-sm text-charcoal-muted max-w-xl font-normal leading-relaxed">
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
                className="editorial-card p-6 sm:p-8 rounded-3xl bg-white border border-teal-deep/10 shadow-sm hover:shadow-md hover:border-teal-deep/20 transition-all"
              >
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                  {/* Left Info: Role & Org */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-teal-light text-teal-deep flex items-center justify-center shrink-0 border border-teal-deep/10 shadow-sm">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className={`text-[10px] font-mono font-semibold px-2.5 py-0.5 rounded-full border ${exp.badgeColor}`}>
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
                  <div className="flex sm:items-center gap-4 text-xs font-mono text-charcoal-muted shrink-0">
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-ivory border border-teal-deep/5">
                      <Calendar className="w-3.5 h-3.5 text-wood" />
                      <span>{exp.period}</span>
                    </div>
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-ivory border border-teal-deep/5">
                      <MapPin className="w-3.5 h-3.5 text-teal-deep" />
                      <span>{exp.location}</span>
                    </div>
                  </div>
                </div>

                <p className="mt-5 text-sm text-charcoal leading-relaxed text-justify">
                  {exp.description}
                </p>

                {/* Accomplishments */}
                <div className="mt-5 pt-5 border-t border-teal-deep/5 space-y-2.5">
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-teal-deep mb-3">
                    Key Contributions &amp; Outcomes:
                  </h4>
                  {exp.achievements.map((item, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs text-charcoal-muted leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-wood shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                {/* Tech & Competency Badges */}
                <div className="mt-6 pt-4 border-t border-teal-deep/5 flex flex-wrap gap-2">
                  {exp.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-lg bg-teal-light/50 text-teal-deep text-[11px] font-mono font-medium border border-teal-deep/5"
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
