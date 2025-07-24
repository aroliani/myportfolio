import React from 'react';
import { motion } from 'framer-motion';
import profileImage from '../../assets/foto.jpg';

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
        <h2 className="text-3xl md:text-4xl font-bold text-green-400 font-mono">About Me</h2>
        <p className="mt-3 text-lg text-gray-400 max-w-2xl mx-auto">Profile summary and operational motivation.</p>
      </div>
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-10">
        <div className="md:w-1/3 flex-shrink-0">
          <img src={profileImage} alt="Aroliani's Profile Photo" className="w-52 h-52 rounded-full object-cover shadow-2xl shadow-green-500/10 mx-auto border-4 border-gray-800 transition-all duration-500 hover:border-green-500 hover:scale-105" />
        </div>
        <div className="md:w-2/2 text-center md:text-left">
          <p className="text-lg text-gray-300 leading-relaxed">
            I am a sixth-semester Informatics student at President University with a growing passion for Cybersecurity and a
            strong interest in UI/UX Design. 
            While I enjoy creating intuitive, user-centered digital experiences using tools like
            Figma and Canva, my main focus is understanding how to secure systems and protect data in the current digital
            environment. I have explored front-end development with HTML, CSS, JavaScript, and React JS to support my
            design work, but I am especially interested in topics like system vulnerabilities, security practices, and how Linuxbased environments are used in cybersecurity workflows. Curious and eager to learn, I am currently seeking an
            internship opportunity where I can further develop my skills, especially in the field of cybersecurity and contribute
            to meaningful, real-world projects.
          </p>
        </div>
      </div>
    </div>
  </motion.section>
);

export default Profile;
