import React from 'react';
import DigitalRain from './components/layout/DigitalRain.jsx';
import Footer from './components/layout/Footer.jsx';
import Header from './components/layout/Header.jsx';
import Hero from './components/layout/Hero.jsx';
import AiAssistant from './components/sections/AiAssistant.jsx';
import Projects from './components/sections/Projects.jsx';
import Contact from './components/sections/Contact.jsx';
import Profile from './components/sections/Profile.jsx';
import Skills from './components/sections/Skills.jsx';

function Portfolio() {
  return (
    <>
      <DigitalRain />
      <div className="relative z-10">
        <Header />
        <main>
          <Hero />
          <Profile />
          <Projects />
          <Skills />
          <AiAssistant />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}

export default Portfolio;