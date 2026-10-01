import React from 'react';
import { motion } from 'framer-motion';

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const skillsData = {
    "Web & Mobile Development": [ 
        { name: "HTML", icon: "devicon-html5-plain colored" }, 
        { name: "CSS", icon: "devicon-css3-plain colored" }, 
        { name: "JavaScript", icon: "devicon-javascript-plain colored" }, 
        { name: "React JS", icon: "devicon-react-original colored" }, 
        { name: "Node.js", icon: "devicon-nodejs-plain colored" },
        { name: "Express", icon: "devicon-express-original" },
        { name: "PHP", icon: "devicon-php-plain colored" }, 
        { name: "Java", icon: "devicon-java-plain colored" },
        { name: "Python", icon: "devicon-python-plain colored" },
        { name: "Android Studio", icon: "devicon-androidstudio-plain colored" },
    ],
    "Databases": [
        { name: "SQL", icon: "devicon-mysql-plain colored" }, 
        { name: "MongoDB", icon: "devicon-mongodb-plain colored" }, 
        { name: "Firebase", icon: "devicon-firebase-plain colored" }
    ],
    "Cyber Security & Tools": [ 
        { name: "OSINT", icon: "devicon-devicon-plain" }, 
        { name: "Penetration Testing", icon: "devicon-devicon-plain" }, 
        { name: "Linux CLI", icon: "devicon-linux-plain" }, 
        { name: "Burp Suite", icon: "devicon-devicon-plain" },
        { name: "Wireshark", icon: "devicon-devicon-plain" },
        { name: "SETookit", icon: "devicon-devicon-plain" },
        { name: "Github", icon: "devicon-github-original" },
        { name: "AWS", icon: "devicon-amazonwebservices-original colored" }
    ],
    "Design & Prototyping": [ 
        { name: "Figma", icon: "devicon-figma-plain colored" }, 
        { name: "Canva", icon: "devicon-canva-original colored" } 
    ]
};

const experienceData = [
    {
        role: "Participant — Korea-ASEAN Digital Academy (KADA)",
        organization: "Elice · ASEAN-Korea Cooperation Fund",
        period: "2025 – Present",
        type: "Training Program",
        description: "Advancing software development expertise in the prestigious KADA program. Curriculum covers AI Ethics & Information Security, Full-Stack Development (Web & Backend), Cloud Service Deployment, Data Analysis Fundamentals, DevOps & CI/CD Automation, UI/UX Design Principles, and Collaborative Capstone Projects.",
        tags: ["Full-Stack Development", "Cloud Deployment", "DevOps", "AI Ethics", "CI/CD"]
    },
    {
        role: "Internship — DPMI Division",
        organization: "President University",
        period: "January 2024 – April 2024",
        type: "Internship",
        description: "Organized and prepared over 50 accreditation documents for internal assessments under the Divisi Pengembangan & Manajemen Industri (DPMI). Primarily supported internal audit processes to ensure alignment with institutional and national quality standards.",
        tags: ["Documentation", "Internal Audit", "Quality Standards", "Accreditation"]
    },
    {
        role: "OSINT Research Collaborator",
        organization: "Ministry of Defence of the Republic of Indonesia (Kemenhan)",
        period: "2024",
        type: "Research Project",
        description: "Led an OSINT investigation project profiling black-hat hackers targeting Indonesian digital infrastructure. Conducted simulated ethical phishing attacks, gathered threat intelligence, and produced confidential reports outlining key risks and strategic recommendations.",
        tags: ["OSINT", "Threat Intelligence", "Ethical Hacking", "Research"]
    }
];

const Skills = () => (
  <motion.section 
    id="skills" 
    className="py-20 md:py-24 bg-black/30"
    variants={sectionVariants}
    initial="hidden"
    whileInView="visible"
    viewport={{ amount: 0.2 }} 
  >
    <div className="container mx-auto px-6">
      {/* Skills Section */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-violet-400 font-mono">Skills & Tools</h2>
        <p className="mt-3 text-lg text-gray-400 max-w-2xl mx-auto">A comprehensive list of tools and technologies leveraged throughout projects</p>
      </div>
      <div className="max-w-5xl mx-auto space-y-10">
        {Object.entries(skillsData).map(([category, skills]) => (
          <div key={category}>
            <h3 className="text-xl font-semibold text-purple-400 font-mono mb-4 border-b-2 border-gray-700 pb-2">{category}</h3>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4">
              {skills.map(skill => (
                <div key={skill.name} className="group flex flex-col items-center justify-center text-center p-4 bg-gray-800/50 rounded-lg border border-gray-700 transition-all duration-300 hover:bg-gray-700/50 hover:-translate-y-1 hover:border-violet-500 cursor-pointer">
                  <i className={`${skill.icon || 'devicon-devicon-plain'} text-4xl text-gray-400 transition-colors duration-300 group-hover:text-violet-400`}></i>
                  <span className="mt-3 text-sm text-gray-400 font-mono transition-colors duration-300 group-hover:text-white">{skill.name}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Experience Section */}
      <div className="mt-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-violet-400 font-mono">Experience</h2>
          <p className="mt-3 text-lg text-gray-400 max-w-2xl mx-auto">My professional journey and key milestones</p>
        </div>

        {/* GPA Highlight */}
        <div className="max-w-5xl mx-auto mb-10">
          <div className="bg-gray-800/50 border border-violet-500/30 rounded-lg p-6 text-center">
            <p className="text-gray-400 font-mono text-sm uppercase tracking-widest mb-1">Current Academic Achievement</p>
            <p className="text-4xl font-bold text-violet-400 font-mono">GPA 3.80 <span className="text-gray-500 text-2xl">/ 4.00</span></p>
            <p className="text-gray-400 mt-1 font-mono text-sm">Informatics — President University</p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto space-y-6">
          {experienceData.map((exp, index) => (
            <motion.div 
              key={index}
              className="bg-gray-800/50 rounded-lg border border-gray-700 p-6 hover:border-violet-500/50 transition-all duration-300"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                <div>
                  <h3 className="text-lg font-bold text-white font-mono">{exp.role}</h3>
                  <p className="text-violet-400 font-mono text-sm">{exp.organization}</p>
                </div>
                <div className="flex flex-col items-start sm:items-end gap-1">
                  <span className="text-gray-400 font-mono text-sm whitespace-nowrap">{exp.period}</span>
                  <span className="bg-violet-900/50 text-violet-300 text-xs font-semibold px-2.5 py-0.5 rounded-full font-mono">{exp.type}</span>
                </div>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">{exp.description}</p>
              <div className="flex flex-wrap gap-2">
                {exp.tags.map(tag => (
                  <span key={tag} className="bg-gray-700/50 text-gray-300 text-xs px-2 py-0.5 rounded font-mono">{tag}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

    </div>
  </motion.section>
);

export default Skills;
