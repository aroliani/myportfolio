import React from 'react';
import { motion } from 'framer-motion';
import { BadgeCheck, Languages as LanguagesIcon } from 'lucide-react';

const skillGroups = [
  { title: 'Programming & Web Development', skills: ['HTML', 'CSS', 'Javascript', 'React JS', 'Node JS', 'Express JS'] },
  { title: 'Cybersecurity & Networking Tools', note: 'Basic level', skills: ['Kali Linux', 'Nmap', 'Burp Suite', 'Wireshark', 'Wazuh', 'CrowdStrike'] },
  { title: 'Database & Cloud', skills: ['MongoDB', 'MySQL', 'SQL', 'Cloud Computing (Firebase, Supabase)'] },
  { title: 'Software & Platforms', skills: ['VirtualBox', 'Docker', 'Git', 'Github', 'VS Code', 'Figma', 'Canva', 'OpenDMS'] },
  { title: 'IT Administration, Documentation & Security Monitoring', skills: ['IT Documentation & Compliance', 'Document Management & Archiving', 'Basic Security Monitoring & Log Analysis'] },
  { title: 'Productivity & Office Tools', skills: ['Microsoft Excel (Formulas, Data Processing, Financial Documentation)', 'Microsoft 365 (Word, PowerPoint, Teams)'] },
  { title: 'Soft Skills', skills: ['Fast Learner', 'Organizational Skills', 'Analytical Thinking', 'Data Integrity', 'Adaptability'] },
];

const experienceData = [
  {
    role: 'IT Admin Support Intern',
    organization: 'IT Infrastructure, Asuransi Ciputra Indonesia (Ciputra Life)',
    period: 'Oct 2025 – Oct 2026',
    type: 'Internship',
    description:
      'Prepared and processed BPU documents in Excel (invoice recording, withholding tax, multi-level approvals, and submission to Finance), supported secure IT document archiving (BAST, SPK, NDA, asset records, licenses, access forms), contributed to a Cyber Threat Intelligence report using Wazuh and CrowdStrike, documented Operations–IT meeting minutes, and coordinated contract approvals for PKS agreements.',
    tags: ['IT Operations', 'Microsoft Excel', 'Document Management', 'Security Monitoring'],
  },
  {
    role: 'Korea–ASEAN Digital Academy (KADA) Bootcamp Participant',
    organization: 'Elice · Korea–ASEAN Digital Academy',
    period: 'Jun 2025 – Present',
    type: 'Bootcamp',
    description: 'Participating in comprehensive IT training covering web development, cloud, DevOps, UI/UX design, and data analysis.',
    tags: ['Web Development', 'Cloud', 'DevOps', 'UI/UX', 'Data Analysis'],
  },
  {
    role: 'Documentation Assistant',
    organization: 'Divisi Pengembangan & Manajemen Industri (DPMI), President University',
    period: 'Jan 2024 – Apr 2024',
    type: 'Internship',
    description:
      'Organized, verified, and maintained accreditation documents in compliance with university and accreditation standards, conducted document review against evaluation forms and accreditation checklists, and ensured systematic filing so records stayed accessible and audit-ready.',
    tags: ['Documentation', 'Accreditation', 'Records Management', 'Google Workspace'],
  },
  {
    role: 'Various Projects & Academic Work',
    organization: 'Selected academic and capstone projects',
    period: '2024 – 2025',
    type: 'Projects',
    description: 'Developed web, mobile, and data-driven applications, including the SAKURA document management system, healthcare applications, and a security risk analytics dashboard.',
    tags: ['Web & Mobile', 'SAKURA DMS', 'Cybersecurity', 'Analytics'],
  },
];

const certifications = [
  'Fundamental Penetration Testing — Coding Studio',
  'Fundamental Cyber Security — Coding Studio',
  'Duolingo English Test (DET) — Duolingo',
  'Korea–ASEAN Digital Academy Bootcamp — Komdigi · NIPA Korea · Elice',
  'Cisco CCNA 200-301: The Complete Guide to Getting Certified — Packt',
  'Google Cybersecurity — Google',
];

const languages = ['Indonesian — Native', 'English — Intermediate'];

const SkillCore = () => (
  <div className="skill-core relative flex aspect-square w-36 items-center justify-center sm:w-40 lg:w-44" aria-hidden="true">
    <svg viewBox="0 0 220 220" className="absolute inset-0 h-full w-full overflow-visible">
      <circle cx="110" cy="110" r="91" className="skill-core__orbit skill-core__orbit--outer" />
      <ellipse cx="110" cy="110" rx="96" ry="35" transform="rotate(-28 110 110)" className="skill-core__orbit skill-core__orbit--tilt" />
      <ellipse cx="110" cy="110" rx="86" ry="28" transform="rotate(52 110 110)" className="skill-core__orbit skill-core__orbit--tilt-reverse" />
      <circle cx="110" cy="110" r="58" className="skill-core__orbit skill-core__orbit--inner" />
      <path d="M110 8v18M110 194v18M8 110h18M194 110h18M38 38l13 13M169 169l13 13M182 38l-13 13M51 169l-13 13" className="skill-core__ticks" />
    </svg>
    <span className="skill-core__glow" />
    <span className="skill-core__center"><span /></span>
  </div>
);

const SectionFlow = () => (
  <svg aria-hidden="true" viewBox="0 0 1200 54" preserveAspectRatio="none" className="section-flow pointer-events-none absolute bottom-0 left-0 h-12 w-full">
    <path d="M0 32 C260 32 250 10 480 20 S850 48 1200 18" className="section-flow__path" />
    <circle cx="720" cy="28" r="2.5" className="section-flow__dot" />
  </svg>
);

const Skills = () => (
  <>
    <motion.section
      id="skills"
      className="relative isolate overflow-hidden py-20 text-mist md:py-24"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container relative z-10 mx-auto px-6">
        <motion.div className="mb-10 text-center" initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45 }}>
          <p className="section-eyebrow mb-3">Technical toolkit</p>
          <h2 className="display-heading text-3xl md:text-4xl">Skills</h2>
          <div className="rune-divider mx-auto mt-5 max-w-xs" />
          <p className="mx-auto mt-5 max-w-xl text-base text-mist/70 md:text-lg">Tools and strengths I use to build, analyze, and solve problems.</p>
        </motion.div>

        <div className="mb-12 flex justify-center">
          <SkillCore />
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group, index) => (
            <motion.article
              key={group.title}
              className="skill-glass-panel ornate relative z-10 rounded-2xl p-5 sm:p-6"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.35, delay: (index % 3) * 0.06 }}
            >
              <div className="mb-4 flex items-start justify-between gap-3">
                <h3 className="font-display text-base font-semibold leading-snug text-mist sm:text-lg">{group.title}</h3>
                {group.note && <span className="chip chip-ember shrink-0">{group.note}</span>}
              </div>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span key={skill} className="skill-badge chip max-w-full break-words">{skill}</span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>

        {/* Certifications & languages */}
        <div className="mt-12 grid gap-5 lg:grid-cols-[1.6fr_1fr]">
          <motion.div className="glass ornate rounded-2xl p-6" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.4 }}>
            <div className="mb-4 flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-full border border-ember-300/30 bg-ember-500/10 text-ember-300"><BadgeCheck size={19} /></span>
              <div>
                <h3 className="font-display text-lg text-mist">Certificates & Training</h3>
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-mist/55">Selected programs</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {certifications.map((item) => <span key={item} className="chip">{item}</span>)}
            </div>
          </motion.div>

          <motion.div className="glass ornate rounded-2xl p-6" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.4, delay: 0.1 }}>
            <div className="mb-4 flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-full border border-loch-300/30 bg-loch-500/10 text-loch-300"><LanguagesIcon size={19} /></span>
              <div>
                <h3 className="font-display text-lg text-mist">Languages</h3>
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-mist/55">Communication</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {languages.map((item) => <span key={item} className="chip chip-ember">{item}</span>)}
            </div>
          </motion.div>
        </div>
      </div>
      <SectionFlow />
    </motion.section>

    <motion.section
      id="experience"
      className="relative isolate overflow-hidden border-t border-loch-300/10 py-20 text-mist md:py-24"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container relative z-10 mx-auto px-6">
        <motion.div className="mb-12 text-center" initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45 }}>
          <p className="section-eyebrow mb-3">Selected milestones</p>
          <h2 className="display-heading text-3xl md:text-4xl">Experience</h2>
          <div className="rune-divider mx-auto mt-5 max-w-xs" />
          <p className="mx-auto mt-5 max-w-xl text-base text-mist/70 md:text-lg">Professional experience, training, and academic work.</p>
        </motion.div>

        <div className="grid gap-5 md:grid-cols-2">
          {experienceData.map((exp, index) => (
            <motion.article
              key={exp.role}
              className="experience-glass-card glass ornate rounded-2xl p-6"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: (index % 2) * 0.1 }}
            >
              <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
                <span className="chip chip-ember">{exp.type}</span>
                <span className="font-mono text-xs text-loch-200/80">{exp.period}</span>
              </div>
              <h3 className="font-display text-lg font-semibold leading-snug text-mist">{exp.role}</h3>
              <p className="mt-1 text-sm text-ember-300/85">{exp.organization}</p>
              <p className="mt-4 text-sm leading-relaxed text-mist/70">{exp.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {exp.tags.map((tag) => <span key={tag} className="chip">{tag}</span>)}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
      <SectionFlow />
    </motion.section>
  </>
);

export default Skills;
