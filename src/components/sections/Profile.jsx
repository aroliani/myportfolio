import React from 'react';
import ProfileImage from '../../assets/foto.jpg';

const Profile = () => (
  <section id="profile" className="py-20 md:py-24 bg-black/30">
    <div className="container mx-auto px-6">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-green-400 font-mono">About Me</h2>
        <p className="mt-3 text-lg text-gray-400 max-w-2xl mx-auto">Summary of my profile and operational motivation.</p>
      </div>
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-10">
        <div className="md:w-1/2 flex-shrink-0">
          <img src={ProfileImage}
          alt="AM Photo Profile" 
          className="w-82 h-82 rounded-full object-cover shadow-2xl shadow-green-500/10 mx-auto border-4 border-gray-800 transition-all duration-500 hover:border-green-500 hover:scale-105" />
        </div>
        <div className="md:w-2/3 text-center md:text-left">
          <p className="text-lg text-gray-300 leading-relaxed">
            As a 6th-semester Informatics student at President University, I am currently building a strong foundation in my two primary areas of interest: UI/UX Design and Full-Stack Development.

            I have hands-on experience designing user interfaces with Figma and Canva, and then bringing those designs to life with a modern front-end stack (HTML, CSS, JavaScript, and React JS). On the back-end, I am familiar with PHP and databases such as MySQL and MongoDB. As part of my cybersecurity studies, I've also become comfortable working within the Linux environment. 

            I am eager to learn, ready to contribute, and actively seeking an internship opportunity where I can grow and develop my skills.
          </p>
        </div>
      </div>
    </div>
  </section>
);

export default Profile;