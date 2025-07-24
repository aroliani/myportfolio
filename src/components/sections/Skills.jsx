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
        { name: "SEToolkit", icon: "devicon-devicon-plain" },
        { name: "Github", icon: "devicon-github-original" },
        { name: "AWS", icon: "devicon-amazonwebservices-original colored" }
    ],
    "Design & Prototyping": [ 
        { name: "Figma", icon: "devicon-figma-plain colored" }, 
        { name: "Canva", icon: "devicon-canva-original colored" } 
    ]
};

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
    </div>
  </motion.section>
);

export default Skills;