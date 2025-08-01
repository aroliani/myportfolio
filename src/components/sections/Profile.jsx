import React from 'react';
import { motion } from 'framer-motion';
import { DownloadOutlined, EyeOutlined } from '@ant-design/icons';
import profileImage from '../../assets/foto.jpg';
import cvFile from '../../assets/Aroliani Munte-CV.pdf';

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const Profile = () => (
  <motion.section
    id="profile"
    className="py-20 md:py-24 bg-black/30"
    variants={sectionVariants}
    initial="hidden"
    whileInView="visible"
    viewport={{ amount: 0.3 }}
  >
    <div className="container mx-auto px-6">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-violet-400 font-mono">About Me</h2>
        <p className="mt-3 text-lg text-gray-400 max-w-2xl mx-auto">
          Get to know who I am and what drives my passion in tech.
        </p>
      </div>

      <div className="mx-auto flex flex-col md:flex-row items-center justify-center gap-10 md:gap-16">
        <div className="md:w-2/5 flex-shrink-0">
          <img
            src={profileImage}
            alt="Aroliani's Profile Photo"
            className="w-200 h-200 rounded-full object-cover shadow-2xl shadow-violet-500/10 mx-auto border-4 border-gray-800 transition-all duration-500 hover:border-violet-500 hover:scale-105"
          />
        </div>

        <div className="md:w-3/5 text-center md:text-left">
          <p className="text-lg text-gray-300 leading-relaxed md:text-justify">
            Hi, I’m <strong>Aroliani Munte</strong>, an Informatics student in my sixth semester at President University. My interests revolve around <span className="text-violet-400">Cybersecurity</span>, <span className="text-violet-400">UI/UX Design</span>, and <span className="text-violet-400">Full-Stack Web Development</span>.
            <br /><br />
            I love designing digital interfaces that are clean, simple, and user-friendly using tools like Figma and Canva. I usually turn those mockups into responsive web pages with HTML, CSS, JavaScript, and React.js.
            <br /><br />
            I'm also exploring security-focused topics, especially around Linux systems and network protection.
            <br /><br />
            I'm currently open to internship opportunities where I can grow, contribute, and apply what I’ve learned in real-world projects — particularly in areas related to cybersecurity or full-stack development.
          </p>

          <div className="mt-8 flex flex-wrap justify-center md:justify-start gap-4">
            <a
              href={cvFile}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-violet-500 text-violet-400 font-bold py-3 px-6 rounded-lg hover:bg-violet-500 hover:text-white transition-colors font-mono"
            >
              <EyeOutlined />
              View CV
            </a>
            <a
              href={cvFile}
              download="Aroliani Munte-CV.pdf"
              className="inline-flex items-center gap-2 bg-violet-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-violet-700 transition-colors font-mono"
            >
              <DownloadOutlined />
              Download CV
            </a>
          </div>

        </div>
      </div>
    </div>
  </motion.section>
);

export default Profile;