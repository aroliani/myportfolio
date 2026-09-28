import React, { useState } from 'react';
import { Shield, Code, Database, Palette, CheckCircle2 } from 'lucide-react';

const SKILL_CATEGORIES = [
  {
    id: 'cybersecurity',
    title: 'Cybersecurity & Security Forensics',
    icon: Shield,
    skills: [
      { name: 'OSINT Reconnaissance', type: 'Intelligence', desc: 'Open Source Intelligence research, online threat profiling & asset discovery' },
      { name: 'Penetration Testing', type: 'Offensive Security', desc: 'Vulnerability assessment, security scanning & ethical exploitation' },
      { name: 'Linux CLI', type: 'System Administration', desc: 'Unix shell command line, directory navigation, permissions & bash scripting' },
      { name: 'Burp Suite', type: 'Web Interceptor', desc: 'Web request interception, parameter tampering & OWASP vulnerability testing' },
      { name: 'Wireshark', type: 'Packet Inspection', desc: 'Network telemetry capture, protocol analysis & anomaly identification' },
      { name: 'OWASP Top 10 Mitigation', type: 'Hardening', desc: 'XSS, SQLi, CSRF, broken access control evaluation & remediation' },
      { name: 'GitHub & CI/CD', type: 'Version Control', desc: 'Collaborative version control, branch policies & automated deployments' },
      { name: 'AWS Cloud Basics', type: 'Cloud Infrastructure', desc: 'EC2 instance provisioning, security groups & cloud network rules' },
    ]
  },
  {
    id: 'engineering',
    title: 'Web & Mobile Engineering',
    icon: Code,
    skills: [
      { name: 'React.js', type: 'Frontend Framework', desc: 'Component lifecycle, hooks, state machines & responsive interactive SPAs' },
      { name: 'JavaScript (ES6+)', type: 'Language', desc: 'Modern async/await syntax, DOM manipulation & event-driven logic' },
      { name: 'Node.js & Express', type: 'Backend Runtime', desc: 'RESTful API architectures, middleware design & JWT authentication' },
      { name: 'Python', type: 'Language', desc: 'Backend Flask development, security scripting & data manipulation' },
      { name: 'Java & Android Studio', type: 'Mobile Engineering', desc: 'Native Android application development, XML UI & Firebase backend' },
      { name: 'PHP', type: 'Server-side', desc: 'Dynamic web scripting, database integration & legacy system maintenance' },
      { name: 'HTML5 & Modern CSS3', type: 'Markup & Styling', desc: 'Semantic layouts, Flexbox/Grid, Tailwind CSS & accessible markup' },
    ]
  },
  {
    id: 'database',
    title: 'Database & Cloud Storage',
    icon: Database,
    skills: [
      { name: 'MySQL / SQL', type: 'Relational Database', desc: 'Schema architecture, relational joins, indexing & query optimization' },
      { name: 'MongoDB', type: 'NoSQL Database', desc: 'Document data modeling, aggregation pipelines & MERN stack persistence' },
      { name: 'Firebase Database & Auth', type: 'BaaS Platform', desc: 'Realtime database synchronization, cloud storage & user authentication' },
    ]
  },
  {
    id: 'design',
    title: 'UI/UX & Design Systems',
    icon: Palette,
    skills: [
      { name: 'Figma', type: 'Interface Design', desc: 'High-fidelity wireframes, responsive autolayout, design tokens & prototypes' },
      { name: 'Canva', type: 'Visual Media', desc: 'Visual brand communication, asset presentation & infographic mockups' },
      { name: 'UI Architecture & Usability', type: 'Design System', desc: 'User flow mapping, contrast validation & human-centered design principles' },
    ]
  }
];

const SkillInventory = () => {
  const [activeCategory, setActiveCategory] = useState('cybersecurity');

  const currentCategory = SKILL_CATEGORIES.find((c) => c.id === activeCategory) || SKILL_CATEGORIES[0];

  return (
    <div className="w-full max-w-5xl mx-auto py-4">
      {/* Category Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
        {SKILL_CATEGORIES.map((cat) => {
          const Icon = cat.icon;
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-medium transition-all ${
                isActive
                  ? 'bg-teal-deep text-ivory shadow-sm'
                  : 'bg-white text-charcoal-muted hover:text-teal-deep border border-teal-deep/10'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{cat.title}</span>
            </button>
          );
        })}
      </div>

      {/* Grid of Refined Modular Slots */}
      <div className="editorial-card p-6 sm:p-8 rounded-3xl bg-white border border-teal-deep/10 shadow-sm">
        <div className="flex items-center justify-between mb-6 pb-3 border-b border-teal-deep/5">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-teal-deep" />
            <h3 className="text-sm font-mono font-bold text-teal-deep uppercase tracking-wider">
              {currentCategory.title}
            </h3>
          </div>
          <span className="text-xs font-mono text-charcoal-muted">
            {currentCategory.skills.length} Competencies
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {currentCategory.skills.map((skill) => (
            <div
              key={skill.name}
              className="p-4 rounded-2xl bg-ivory border border-teal-deep/10 hover:border-wood/40 transition-all flex flex-col justify-between group"
            >
              <div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white text-teal-muted border border-teal-deep/5 mb-2 inline-block">
                  {skill.type}
                </span>
                <h4 className="text-sm font-mono font-bold text-teal-deep mb-1 group-hover:text-wood-dark transition-colors">
                  {skill.name}
                </h4>
                <p className="text-xs text-charcoal-muted leading-relaxed line-clamp-3">
                  {skill.desc}
                </p>
              </div>

              <div className="mt-4 pt-2 border-t border-teal-deep/5 flex items-center justify-between text-[10px] font-mono text-charcoal-muted">
                <span>Production Tested</span>
                <span className="text-wood">●</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkillInventory;
