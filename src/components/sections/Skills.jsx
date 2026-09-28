import React from 'react';
import { motion } from 'framer-motion';
import { 
  Code2, 
  Database, 
  ShieldCheck, 
  Palette, 
  Cpu,
  Sparkles 
} from 'lucide-react';

const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

const skillCategories = [
  {
    title: "Web & Mobile Development",
    icon: Code2,
    badgeColor: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20",
    skills: [
      { name: "HTML5", icon: "devicon-html5-plain colored" },
      { name: "CSS3", icon: "devicon-css3-plain colored" },
      { name: "JavaScript", icon: "devicon-javascript-plain colored" },
      { name: "React.js", icon: "devicon-react-original colored" },
      { name: "Node.js", icon: "devicon-nodejs-plain colored" },
      { name: "Express", icon: "devicon-express-original" },
      { name: "PHP", icon: "devicon-php-plain colored" },
      { name: "Java", icon: "devicon-java-plain colored" },
      { name: "Python", icon: "devicon-python-plain colored" },
      { name: "Android Studio", icon: "devicon-androidstudio-plain colored" },
    ]
  },
  {
    title: "Cyber Security & Tools",
    icon: ShieldCheck,
    badgeColor: "text-violet-400 bg-violet-500/10 border-violet-500/20",
    skills: [
      { name: "OSINT", icon: "devicon-devicon-plain" },
      { name: "Penetration Testing", icon: "devicon-devicon-plain" },
      { name: "Linux CLI", icon: "devicon-linux-plain" },
      { name: "Burp Suite", icon: "devicon-devicon-plain" },
      { name: "Wireshark", icon: "devicon-devicon-plain" },
      { name: "SEToolkit", icon: "devicon-devicon-plain" },
      { name: "GitHub", icon: "devicon-github-original" },
      { name: "AWS Cloud", icon: "devicon-amazonwebservices-original colored" },
    ]
  },
  {
    title: "Databases & Storage",
    icon: Database,
    badgeColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    skills: [
      { name: "MySQL / SQL", icon: "devicon-mysql-plain colored" },
      { name: "MongoDB", icon: "devicon-mongodb-plain colored" },
      { name: "Firebase", icon: "devicon-firebase-plain colored" },
    ]
  },
  {
    title: "UI/UX & Design Systems",
    icon: Palette,
    badgeColor: "text-fuchsia-400 bg-fuchsia-500/10 border-fuchsia-500/20",
    skills: [
      { name: "Figma", icon: "devicon-figma-plain colored" },
      { name: "Canva", icon: "devicon-canva-original colored" },
      { name: "Wireframing", icon: "devicon-devicon-plain" },
    ]
  }
];

const Skills = () => {
  return (
    <motion.section 
      id="skills" 
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
            <Cpu className="w-3.5 h-3.5" />
            <span>Technical Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Skills &amp; <span className="bg-gradient-to-r from-violet-400 via-fuchsia-300 to-indigo-300 bg-clip-text text-transparent">Tooling</span>
          </h2>
          <p className="mt-3 text-base text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Technologies, frameworks, security utilities, and design suites I actively leverage to engineer robust solutions.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="space-y-8">
          {skillCategories.map((category) => {
            const Icon = category.icon;
            return (
              <div 
                key={category.title}
                className="glass-card p-6 sm:p-8 rounded-3xl border border-white/10"
              >
                {/* Category Header */}
                <div className="flex items-center gap-3 mb-6">
                  <div className={`p-2.5 rounded-xl border ${category.badgeColor}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white font-mono">
                      {category.title}
                    </h3>
                    <p className="text-xs text-gray-400">
                      {category.skills.length} core competencies
                    </p>
                  </div>
                </div>

                {/* Skills Badges / Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5">
                  {category.skills.map((skill) => (
                    <div 
                      key={skill.name} 
                      className="group p-3.5 rounded-2xl bg-slate-900/40 border border-white/5 hover:border-violet-500/40 hover:bg-slate-800/60 transition-all duration-300 flex items-center gap-3 cursor-default hover:scale-[1.03]"
                    >
                      <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-violet-500/20 transition-colors">
                        <i className={`${skill.icon || 'devicon-devicon-plain'} text-xl text-gray-400 group-hover:text-violet-300 transition-colors`}></i>
                      </div>
                      <span className="text-xs font-mono text-gray-300 group-hover:text-white font-medium truncate">
                        {skill.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
};

export default Skills;