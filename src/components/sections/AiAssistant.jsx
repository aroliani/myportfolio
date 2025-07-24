import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../../supabaseClient'; 

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const profileData = "(Aroliani is a sixth-semester Informatics student at President University with an interest in cybersecurity, web development, and mobile applications. Aroliani enjoys learning how systems work and exploring ways to enhance their security and functionality. Through various projects, Aroliani has developed hands-on experience in both design and programming. Aroliani is eager to continue honing her skills and taking on new challenges). (Aroliani currently advancing her software development expertise as a participant in the prestigious Korea-ASEAN Digital Academy. This initiative is managed by Elice and supported by a consortium of partners, including the ASEAN-Korea Cooperation Fund (AKCF), Korea's Ministry of Science and ICT (MSICT) and National IT Industry Promotion Agency (NIPA), and Indonesia's Ministry of Communication and Digital Affair (MCDA). In KADA training program, they focuses on a comprehensive, hands-on curriculum covering; AI Ethics & Information Security, Full-Stack Development (Web & Backend), Cloud Service Deployment, Data Analysis Fundamentals, DevOps and CI/CD Automation, UI/UX Design Principles, Collaborative Capstone Project). (Aroliani's internship experience was in President University at DPMI division since January 2024 until April 2024. Aroliani organized and prepared over 50 accreditation documents for internal assessments under the Divisi Pengembangan & Manajemen Industri (DPMI) at President University. Aroliani also primarily supported internal audit processes to ensure alignment with institutional and national quality standards). (In Cybersecurity, Aroliani has a keen interest in OSINT, penetration testing using Linux and Wireshark, and cybersecurity tools. Aroliani has developed skills in using various cybersecurity tools and techniques to identify vulnerabilities and enhance system security. Aroliani is also familiar with Burp Suite, which is a powerful tool for web application security testing to identify and exploit vulnerabilities in web applications. Aroliani is also familiar with the OWASP Top Ten vulnerabilities and how to mitigate them. Aroliani is familiar and developing in using GitHub for version control and collaboration on software development projects. Aroliani has experience in using GitHub to manage code repositories, track changes, and collaborate with other developers on projects).";

const skillsData = {
  "Web & Programming": ["HTML", "CSS", "React JS", "Javascript", "Java", "SQL", "Firebase", "MongoDB", "PHP"],
  "Cyber Security & Tools": ["OSINT", "Penetration Testing", "CLI", "Burp Suite", "Wireshark", "Github"],
  "Design": ["Canva", "Figma"]
};

const projectData = [
  {
    title: 'MedEase Health Service App',
    description: `MedEase is a mobile health application designed to provide seamless access to health services. Built using Android Studio with Java and XML, it integrates Firebase for authentication and real-time database storage. Features include:
    - User registration and secure login using Firebase Auth
    - Profile management including uploading a profile picture
    - Booking system for lab tests and doctor appointments
    - Health education section with embedded articles and YouTube videos
    - Shake sensor that redirects users to recommended video when triggered
    The app prioritizes user-friendly UI and reliable backend integration, especially useful for people seeking fast, trusted digital health access.`
  },
  {
    title: 'HealthCare Diagnosis App',
    description: `This web application is a rule-based healthcare tool that provides preliminary disease diagnosis and health recommendations. Key features:
    - Built with vanilla JavaScript (no framework) for interactivity and logic
    - Dynamically responds to user input about symptoms
    - Recommends possible diagnoses and tips for further actions
    - No backend – pure frontend application demonstrating decision-tree logic
    This project showcases how simple algorithms and clean UI can be used for useful health guidance tools.`
  },
  {
    title: 'Wumpus World AI Game',
    description: `A classic logic-based game built with HTML, CSS, and JavaScript. The player navigates a grid (cave) where hidden dangers like pits and a Wumpus lurk. Features include:
    - Decision-making AI using Alpha-Beta Pruning
    - Arrow shooting and treasure detection mechanics
    - Grid-based movement simulation with event handling
    - Intuitive interface for gameplay and rules explanation
    This project demonstrates understanding of basic AI techniques in game development scenarios.`
  },
  {
    title: 'Music Discovery Platform',
    description: `A full-stack web platform for discovering and sharing music posts, developed using MERN Stack (MongoDB, Express, React, Node.js). Features:
    - User registration and login with Passport.js (Local, JWT, and Google OAuth strategies)
    - Post creation with song info, images, and audio links (YouTube/SoundCloud embeds)
    - Comment section with real-time updates using MongoDB
    - Pagination and search functionality in PostList using query strings
    - Responsive design and protected routes with redirect logic
    - Deployed on AWS EC2 using GitHub Actions CI/CD
    It serves as a Spotify-lite alternative for sharing curated music tastes and discovering others’.`
  },
  {
    title: 'Security Risk Management Dashboard Website',
    description: `A Security Risk Management (SRM) Dashboard built with Python. This web application helps organizations assess and track cybersecurity risk levels in real time.
    Features include:
    - Visualizes security assessment data from MongoDB using dynamic risk matrices
    - Upload and parse structured JSON reports representing company assets, threats, and vulnerabilities
    - Displays interactive bar charts, risk tables, and dashboards using custom HTML templates with Flask routes
    - Implements user authentication and access control with secure session handling
    - Generates downloadable risk reports to support compliance and internal audits
    This project simplifies cybersecurity monitoring through clear, actionable data visualization. It is suitable for academic research, company internal use, and professional demonstrations.`
  },
  {
    title: 'Security Risk Management Dashboard UI/UX',
    description: `A UI/UX design project using Figma to create a security dashboard interface for enterprise environments. Key elements:
    - Sidebar navigation, header stats, and threat matrix layout
    - Use of cards and data visualization components (bar/pie chart mockups)
    - Color-coded risk severity scale for fast decision-making
    - Design language adheres to accessibility standards and modern dashboard trends
    Serves as a design prototype before full implementation using Flask or React.`
  },
  {
    title: 'BOOSH - Bus Schedule UI/UX',
    description: `BOOSH is a bus scheduling system designed for boarding house (kos) students at university. This project focused on UI/UX design using Canva and later prototyped in Figma. Features include:
    - Daily, weekly, and monthly bus schedule views
    - Real-time map mockups with live bus indicators
    - Ticket booking simulation with calendar UI
    - User roles: Guest (not logged in) and Registered (with login)
    It addresses student mobility issues and simulates smart transport solutions for campus use.`
  },
  {
    title: 'Capture The Flag (CTF) Participation',
    description: `Participated in cybersecurity competitions involving:
    - Web exploitation: bypassing login pages, analyzing HTTP requests, finding hidden flags
    - Cryptography: decrypting ciphers (Caesar, Vigenère, XOR) using tools like CyberChef
    - Tools used: Burp Suite, Wireshark, Nmap, John the Ripper, base64 decoders
    - Solved time-limited challenges with team collaboration
    This experience improved skills in ethical hacking, vulnerability analysis, and real-time problem-solving under pressure.`
  },
  {
    title: 'Hacker Profiling & OSINT Investigation',
    description: `Led an Open Source Intelligence (OSINT) investigation in collaboration with Indonesia’s Ministry of Defence (Kemenhan) under a university research program. Key activities:
    - Profiling black-hat hackers and suspicious online activity
    - Simulated ethical phishing attacks to demonstrate risks
    - Tools: Seeker (for location tracking), Ngrok (expose localhost), Google Dorks, TheHarvester
    - Linux CLI tools for ip information gathering and reporting
    - Produced confidential report outlining key risks and recommendations
    A high-impact project that applied real-world cybersecurity principles in a controlled, ethical manner.`
  }
];

const getVisitorId = () => { let visitorId = sessionStorage.getItem('visitorId'); if (!visitorId) { visitorId = `visitor-${crypto.randomUUID()}`; sessionStorage.setItem('visitorId', visitorId); } return visitorId; };

const AiAssistant = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [output, setOutput] = useState('');
  const [input, setInput] = useState('');

  const handleAskAi = async () => {
    if (!input) { setOutput(`<div class="gemini-output text-amber-400">COMMAND REJECTED: Please enter a query.</div>`); return; }
    const visitorId = getVisitorId();
    try { const { error } = await supabase.from('questions').insert([{ question_text: input, user_agent: navigator.userAgent, visitor_id: visitorId }]); if (error) throw error; } catch (error) { console.error('Error logging question to Supabase:', error.message); }
    setIsLoading(true); setOutput('');
    const portfolioContext = `You are an AI assistant for Aroliani Munte, a cyber security enthusiast and developer. Answer the user's question ONLY based on the information provided below. Do not make up information. PROFILE: ${profileData}. SKILLS: ${JSON.stringify(skillsData, null, 2)}. PROJECTS: ${projectData.map(p => `- ${p.title}: ${p.description}`).join('\n')}`;
    const prompt = `${portfolioContext}\n\nUser's Question: "${input}"\n\nYour Answer:`;
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
    const payload = { contents: [{ role: "user", parts: [{ text: prompt }] }] };
    try {
      const response = await fetch(apiUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const result = await response.json();
      if (result.candidates && result.candidates.length > 0) { const text = result.candidates[0].content.parts[0].text; setOutput(`<div class="gemini-output">${text}</div>`); } 
      else { setOutput(`<div class="gemini-output text-red-500">Error: Invalid AI response.</div>`); }
    } catch (error) { console.error("Error calling Gemini API:", error); setOutput(`<div class="gemini-output text-red-500">Failed to connect to AI service. Please check your API Key.</div>`); } 
    finally { setIsLoading(false); }
  };

  return (
    <motion.section 
      id="ai-assistant" 
      className="py-20 md:py-24 bg-gray-900/50"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ amount: 0.2 }} 
    >
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-green-400 font-mono">Ask My AI Assistant</h2>
          <p className="mt-3 text-lg text-gray-400 max-w-2xl mx-auto">Have a question about my profile, skills, or projects? Let my AI assistant answer it for you.</p>
        </div>
        <div className="max-w-2xl mx-auto">
          <div className="flex flex-col sm:flex-row gap-2">
            <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="e.g., What database does Aroliani use in her web apps?" className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none text-gray-200 font-mono" />
            <button onClick={handleAskAi} disabled={isLoading} className="bg-green-600 text-white font-bold py-2 px-3 rounded-lg hover:bg-green-700 transition-colors w-full sm:w-auto font-mono disabled:bg-gray-500">
              {isLoading ? 'PROCESSING...' : 'ASK AI'}
            </button>
          </div>
          <div className="mt-6 text-center">
            {isLoading && <div className="loader mx-auto"></div>}
            <div dangerouslySetInnerHTML={{ __html: output }}></div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default AiAssistant;
