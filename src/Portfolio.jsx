import React from 'react';
import Header from './components/layout/Header.jsx';
import Hero from './components/layout/Hero.jsx';
import Profile from './components/sections/Profile.jsx';
import Projects from './components/sections/Projects.jsx';
import Skills from './components/sections/Skills.jsx';
import Experience from './components/sections/Experience.jsx';
import Contact from './components/sections/Contact.jsx';
import Footer from './components/layout/Footer.jsx';
import AiChatbotBubble from './components/ai/AiChatbotBubble.jsx';

function Portfolio() {
  return (
    <div className="relative min-h-screen bg-ivory text-charcoal font-sans selection:bg-teal-deep selection:text-champagne-soft">
      <Header />
      <main>
        <Hero />
        <Profile />
        <Projects />
        <Skills />
        <Experience />
        <Contact />
      </main>
      <Footer />
      <AiChatbotBubble />
    </div>
  );
}

export default Portfolio;