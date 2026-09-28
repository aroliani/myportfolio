import React from 'react';
import AuroraBackground from './components/layout/AuroraBackground.jsx';
import Header from './components/layout/Header.jsx';
import Hero from './components/layout/Hero.jsx';
import Profile from './components/sections/Profile.jsx';
import Projects from './components/sections/Projects.jsx';
import Skills from './components/sections/Skills.jsx';
import Contact from './components/sections/Contact.jsx';
import Footer from './components/layout/Footer.jsx';
import AiChatbotBubble from './components/ai/AiChatbotBubble.jsx';

function Portfolio() {
  return (
    <div className="relative min-h-screen bg-[#07090e] text-[#cbd5e1] font-sans selection:bg-violet-600/30 selection:text-violet-200">
      {/* Dynamic Aurora Ambient Background */}
      <AuroraBackground />

      {/* Main Content Layout */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />
        <main className="flex-1">
          <Hero />
          <Profile />
          <Projects />
          <Skills />
          <Contact />
        </main>
        <Footer />
      </div>

      {/* Floating AI Chatbot Bubble (Bottom-Right) */}
      <AiChatbotBubble />
    </div>
  );
}

export default Portfolio;