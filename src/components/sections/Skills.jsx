import React from 'react';
import { motion } from 'framer-motion';

const skillGroups = [
  { title: 'Programming & Web Development', skills: ['HTML', 'CSS', 'Javascript', 'React JS', 'Node JS', 'Express JS'] },
  { title: 'Cybersecurity & Networking Tools', note: 'Basic level', skills: ['Kali Linux', 'Nmap', 'Burp Suite', 'Wireshark', 'Wazuh', 'CrowdStrike'] },
  { title: 'Database & Cloud', skills: ['MongoDB', 'MySQL', 'SQL', 'Cloud Computing (Firebase, Supabase)'] },
  { title: 'Software & Platforms', skills: ['VirtualBox', 'Docker', 'Git', 'Github', 'VS Code', 'Figma', 'Canva', 'OpenDMS', 'Microsoft Excel (Formulas, Data Processing, Financial Documentation)', 'Microsoft 365 (Word, PowerPoint, Teams)'] },
  { title: 'IT Administration, Documentation & Security Monitoring', skills: ['IT Documentation & Compliance', 'Document Management & Archiving', 'Basic Security Monitoring & Log Analysis'] },
  { title: 'Soft Skills', skills: ['Fast Learner', 'Organizational Skills', 'Analytical Thinking', 'Data Integrity', 'Adaptability'] },
];

const skillGridPositions = [
  'lg:col-start-1 lg:row-start-1',
  'lg:col-start-3 lg:row-start-1',
  'lg:col-start-1 lg:row-start-2',
  'lg:col-start-3 lg:row-start-2',
  'lg:col-start-1 lg:row-start-3',
  'lg:col-start-3 lg:row-start-3',
];

const experienceData = [
  {
    role: 'IT Admin Support Intern', organization: 'IT Infrastructure, Asuransi Ciputra Indonesia (Ciputra Life)', period: 'Oct 2025 – Oct 2026', type: 'Internship',
    description: 'Prepared and processed BPU documents in Excel, supported secure IT document archiving, assisted with a Cyber Threat Intelligence report using Wazuh and CrowdStrike, documented Operations–IT meetings, and coordinated contract approvals and records.',
    tags: ['IT Operations', 'Microsoft Excel', 'Document Management', 'Security Monitoring'],
  },
  {
    role: 'Korea–ASEAN Digital Academy (KADA) Bootcamp Participant', organization: 'Elice · Korea–ASEAN Digital Academy', period: 'Jun 2025 – Present', type: 'Bootcamp',
    description: 'Participating in comprehensive IT training covering web development, cloud, DevOps, UI/UX design, and data analysis.',
    tags: ['Web Development', 'Cloud', 'DevOps', 'UI/UX', 'Data Analysis'],
  },
  {
    role: 'Various Projects & Academic Work', organization: 'Selected academic and capstone projects', period: '2024 – 2025', type: 'Projects',
    description: 'Developed web, mobile, and data-driven applications, including the SAKURA document management system, healthcare applications, and a security risk analytics dashboard.',
    tags: ['Web & Mobile', 'SAKURA DMS', 'Cybersecurity', 'Analytics'],
  },
];

const SkillCore = () => (
  <div className="skill-core mx-auto flex aspect-square w-36 items-center justify-center sm:w-40 lg:col-start-2 lg:row-span-3 lg:row-start-1 lg:w-44" aria-hidden="true">
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
    <motion.section id="skills" className="relative isolate overflow-hidden bg-[#10151f]/42 py-20 text-gray-200 md:py-24" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.12 }} transition={{ duration: 0.6 }}>
      <div className="container relative z-10 mx-auto px-6">
        <motion.div className="mb-10" initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45 }}>
          <p className="mb-2 font-mono text-xs uppercase text-violet-300">Technical toolkit</p>
          <h2 className="font-mono text-3xl font-bold text-violet-100 md:text-4xl">Skills</h2>
          <p className="mt-3 max-w-xl text-base text-gray-300 md:text-lg">Tools and strengths I use to build, analyze, and solve problems.</p>
        </motion.div>

        <div className="relative grid gap-4 sm:grid-cols-2 lg:grid-cols-[minmax(0,1fr)_190px_minmax(0,1fr)] lg:gap-x-6 lg:gap-y-4">
          <svg aria-hidden="true" viewBox="0 0 900 600" preserveAspectRatio="none" className="skill-core__connections pointer-events-none absolute inset-0 hidden h-full w-full lg:block">
            <path d="M450 300 C350 260 300 115 190 100M450 300 C550 260 600 115 710 100M450 300 C350 300 300 280 190 300M450 300 C550 300 600 280 710 300M450 300 C350 345 300 485 190 500M450 300 C550 345 600 485 710 500" />
          </svg>
          <SkillCore />
          {skillGroups.map((group, index) => (
            <motion.article
              key={group.title}
              className={`skill-glass-panel relative z-10 rounded-xl p-5 sm:p-6 lg:min-h-40 ${skillGridPositions[index]}`}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.35, delay: (index % 2) * 0.08 }}
            >
              <div className="mb-4 flex items-start justify-between gap-3">
                <h3 className="font-mono text-base font-semibold leading-snug text-violet-100 sm:text-lg">{group.title}</h3>
                {group.note && <span className="shrink-0 rounded-full border border-violet-300/20 px-2 py-1 font-mono text-[10px] text-violet-200/80">{group.note}</span>}
              </div>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span key={skill} className="skill-badge max-w-full break-words rounded-md border border-white/10 bg-[#111722]/65 px-2.5 py-1.5 text-xs leading-relaxed text-gray-200 sm:text-sm">{skill}</span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
      <SectionFlow />
    </motion.section>

    <motion.section id="experience" className="relative isolate overflow-hidden border-t border-violet-300/10 bg-[#0d121c]/36 py-20 text-gray-200 md:py-24" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }} transition={{ duration: 0.6 }}>
      <div className="container relative z-10 mx-auto px-6">
        <motion.div className="mb-12" initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45 }}>
          <p className="mb-2 font-mono text-xs uppercase text-violet-300">Selected milestones</p>
          <h2 className="font-mono text-3xl font-bold text-violet-100 md:text-4xl">Experience</h2>
          <p className="mt-3 max-w-xl text-base text-gray-300 md:text-lg">Professional experience, training, and academic work.</p>
        </motion.div>

        <div className="experience-timeline relative">
          <span className="experience-timeline__pulse" aria-hidden="true" />
          <ol className="grid gap-5 md:grid-cols-3 md:gap-6">
            {experienceData.map((exp, index) => (
              <motion.li key={exp.role} className="experience-timeline__item relative" initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.4, delay: index * 0.12 }}>
                <motion.span className="experience-timeline__node" initial={{ scale: 0.75, opacity: 0.55 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.3, delay: 0.12 + index * 0.12 }} />
                <article className="experience-glass-card h-full rounded-xl p-5 transition-transform duration-300 hover:-translate-y-1 sm:p-6">
                  <p className="mb-2 font-mono text-xs text-violet-200/80">{exp.period}</p>
                  <h3 className="font-mono text-lg font-semibold leading-snug text-gray-100">{exp.role}</h3>
                  <p className="mt-1 text-sm text-violet-200/80">{exp.organization}</p>
                  <p className="mt-4 text-sm leading-relaxed text-gray-300">{exp.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {exp.tags.map((tag) => <span key={tag} className="rounded-md border border-violet-300/15 bg-violet-300/[0.04] px-2 py-1 font-mono text-[11px] text-gray-300">{tag}</span>)}
                  </div>
                </article>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
      <SectionFlow />
    </motion.section>
  </>
);

export default Skills;

