import React from 'react';
import { motion } from 'framer-motion';
import { DownloadOutlined, EyeOutlined } from '@ant-design/icons';
import profileImage from '../../assets/foto.png';
import cvFile from '../../assets/Aroliani Munte-CV.pdf';

const Profile = () => (
  <motion.section id="profile" className="bg-[#151a24]/76 py-20 md:py-24" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.7 }}>
    <div className="container mx-auto px-6">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-violet-400 font-mono">About Me</h2>
        <p className="mt-3 text-lg text-gray-300 max-w-2xl mx-auto">Get to know who I am and what drives my passion in tech.</p>
      </div>
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-10 md:flex-row md:gap-12 lg:gap-16">
        <div className="w-full flex-shrink-0 md:w-[44%]">
          <img src={profileImage} alt="Aroliani Munte" className="mx-auto h-72 w-72 rounded-full border-4 border-gray-700 object-cover shadow-2xl shadow-violet-500/15 transition-all duration-500 hover:scale-[1.02] hover:border-violet-500 sm:h-80 sm:w-80 md:h-[min(38vw,31rem)] md:w-[min(38vw,31rem)]" />
        </div>
        <div className="w-full text-center md:w-[56%] md:text-left">
          <div className="mb-5">
            <p className="font-mono text-sm uppercase text-violet-300">A little about me</p>
            <h3 className="mt-2 text-2xl font-bold text-gray-100 sm:text-3xl">Hi, I’m Aroo, short for Aroliani.</h3>
          </div>
          <div className="space-y-5 text-base leading-relaxed text-gray-200 sm:text-lg">
            <p>I’m an Informatics graduate awaiting graduation from President University, with experience in web development, database management, IT operations, documentation, and cybersecurity fundamentals.</p>
            <p>I’ve worked on academic and capstone projects and supported IT operations and security monitoring during my internship.</p>
            <p>I’m interested in exploring diverse IT roles, and I’m always ready to learn and adapt to new technologies and working environments.</p>
          </div>
          <div className="mt-8 flex flex-wrap justify-center md:justify-start gap-4">
            <a href={cvFile} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 border border-violet-500 text-violet-400 font-bold py-3 px-6 rounded-lg hover:bg-violet-500 hover:text-white transition-colors font-mono"><EyeOutlined />View CV</a>
            <a href={cvFile} download="Aroliani Munte-CV.pdf" className="inline-flex items-center gap-2 bg-violet-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-violet-700 transition-colors font-mono"><DownloadOutlined />Download CV</a>
          </div>
        </div>
      </div>
    </div>
  </motion.section>
);

export default Profile;
