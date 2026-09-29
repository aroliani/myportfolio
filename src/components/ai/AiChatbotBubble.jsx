import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../../supabaseClient';
import { 
  X, 
  Send, 
  RotateCcw, 
  Compass, 
  ArrowUpRight 
} from 'lucide-react';

const profileData = `Aroliani Munte (nickname: "Aroo") is a sixth-semester Informatics student at President University specializing in Cybersecurity (OSINT, Penetration Testing, Linux CLI, OWASP Top 10), Full-Stack Web & Mobile Development (React, Node.js, Python, Java, SQL, MongoDB, Firebase), and UI/UX Design (Figma, Canva). She is an active fellow in the Korea-ASEAN Digital Academy (KADA) supported by AKCF, Korean MSICT, NIPA, and Indonesia's MCDA. She completed an internship at President University's DPMI division focusing on internal quality audits and accreditation. Her nickname Aroo inspires her motto: Aiming High in Cybersecurity, Coding Sharp in Full-Stack, Crafting Delight in UI/UX.`;

const skillsData = {
  "Cybersecurity": ["OSINT", "Penetration Testing", "Linux CLI", "Burp Suite", "Wireshark", "OWASP Top Ten", "GitHub", "AWS"],
  "Web & Mobile": ["HTML5", "CSS3", "React.js", "JavaScript", "Node.js", "Express", "PHP", "Java", "Python", "Android Studio"],
  "Databases": ["MySQL / SQL", "MongoDB", "Firebase"],
  "UI/UX Design": ["Figma", "Canva", "UI/UX Architecture", "Prototyping"]
};

const projectData = [
  {
    title: 'MedEase Health Service App',
    category: 'Mobile & Firebase',
    description: 'A mobile health application built using Android Studio with Java and XML, integrated with Firebase for authentication, profile photo management, lab/doctor appointment bookings, and health education videos.'
  },
  {
    title: 'HealthCare Diagnosis App',
    category: 'Web Development',
    description: 'Rule-based decision tree health diagnosis tool created with vanilla JavaScript, providing real-time symptom analysis and health guidance without backend dependencies.'
  },
  {
    title: 'Wumpus World AI Game',
    category: 'AI & Game Logic',
    description: 'Autonomous logic game with Alpha-Beta Pruning decision-making AI, arrow shooting, and danger detection mechanics inside a dynamic grid cave.'
  },
  {
    title: 'Music Discovery Platform',
    category: 'Full-Stack MERN',
    description: 'Full-stack platform built with MongoDB, Express, React, and Node.js. Features Passport.js auth (Local, JWT, Google OAuth), YouTube/SoundCloud embeds, comment threads, and AWS EC2 deployment via GitHub Actions.'
  },
  {
    title: 'Security Risk Management Dashboard Website',
    category: 'Cybersecurity & Python',
    description: 'Real-time cybersecurity risk management dashboard using Python Flask and MongoDB. Analyzes asset vulnerabilities, generates dynamic risk matrices, and provides downloadable audit compliance reports.'
  },
  {
    title: 'Security Risk Management Dashboard UI/UX',
    category: 'UI/UX Design',
    description: 'Comprehensive Figma enterprise design prototype with threat matrix layouts, data visualization cards, and color-coded risk severity scales.'
  },
  {
    title: 'BOOSH - Campus Bus Schedule UI/UX',
    category: 'UI/UX Design',
    description: 'Campus mobility bus schedule application design with real-time map mockups, ticket reservation simulation, and student boarding house integration.'
  },
  {
    title: 'Capture The Flag (CTF) Participation',
    category: 'Cybersecurity & Ethical Hacking',
    description: 'Hands-on competition experience solving web exploitation challenges, cryptography (Caesar, Vigenère, XOR via CyberChef), and packet inspection with Burp Suite and Wireshark.'
  },
  {
    title: 'Hacker Profiling & OSINT Investigation',
    category: 'Cybersecurity & OSINT',
    description: 'OSINT research initiative in collaboration with Indonesia’s Ministry of Defence (Kemenhan), utilizing Seeker, Ngrok, Google Dorks, and TheHarvester for tracking and threat reporting.'
  }
];

const PRESET_QUESTIONS = [
  "Summarize Aroliani's technical background",
  "What are her cybersecurity and OSINT projects?",
  "Tell me about the MedEase mobile app",
  "What is the Korea-ASEAN Academy (KADA)?",
];

const getVisitorId = () => {
  let visitorId = sessionStorage.getItem('visitorId');
  if (!visitorId) {
    visitorId = `visitor-${crypto.randomUUID()}`;
    sessionStorage.setItem('visitorId', visitorId);
  }
  return visitorId;
};

// Formatter to render bold and bullet points nicely
const formatMessageText = (text) => {
  return text.split('\n').map((line, index) => {
    const isBullet = line.trim().startsWith('- ') || line.trim().startsWith('* ') || line.trim().startsWith('• ');
    const cleanedLine = isBullet ? line.trim().replace(/^[-*•]\s+/, '') : line;

    const parts = cleanedLine.split(/(\*\*.*?\*\*)/g);
    const formattedContent = parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} className="text-teal-deep font-semibold">{part.slice(2, -2)}</strong>;
      }
      return part;
    });

    if (isBullet) {
      return (
        <li key={index} className="ml-4 list-disc text-charcoal my-0.5">
          {formattedContent}
        </li>
      );
    }

    if (line.trim() === '') {
      return <div key={index} className="h-2" />;
    }

    return (
      <p key={index} className="my-1 text-charcoal leading-relaxed">
        {formattedContent}
      </p>
    );
  });
};

// Clean minimal Arrow Companion Icon
const ArrowIcon = ({ className = "w-5 h-5" }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <line x1="5" y1="19" x2="19" y2="5" />
    <polyline points="10 5 19 5 19 14" />
  </svg>
);

const AiChatbotBubble = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      sender: 'ai',
      text: "Hello! 👋 I am Aroo's Portfolio Guide. Feel free to ask about Aroliani's technical background, cybersecurity projects, or full-stack applications.",
      time: 'Just now'
    }
  ]);

  const messagesEndRef = useRef(null);
  const handleSendMessageRef = useRef(null);

  const handleSendMessage = async (queryText) => {
    const textToSend = queryText || input;
    if (!textToSend.trim() || isLoading) return;

    const userMessageId = `user-${Date.now()}`;
    const newMessages = [
      ...messages,
      {
        id: userMessageId,
        sender: 'user',
        text: textToSend,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ];

    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    const visitorId = getVisitorId();
    try {
      await supabase.from('questions').insert([
        {
          question_text: textToSend,
          user_agent: navigator.userAgent,
          visitor_id: visitorId
        }
      ]);
    } catch (err) {
      console.warn('Logging to Supabase skipped:', err.message);
    }

    const portfolioContext = `You are an intelligent, articulate, and professional portfolio assistant for Aroliani Munte (Aroo).
Aroliani is an Informatics undergraduate at President University, specializing in Cybersecurity (OSINT, Penetration Testing), Full-Stack Web Development, and UI/UX Design.
Answer clearly, concisely, and professionally. Respond in Indonesian if asked in Indonesian, or English if asked in English.

PROFILE:
${profileData}

SKILLS:
${JSON.stringify(skillsData, null, 2)}

PROJECTS:
${projectData.map(p => `• [${p.category}] ${p.title}: ${p.description}`).join('\n')}
`;

    const prompt = `${portfolioContext}\n\nVisitor Question: "${textToSend}"\n\nAssistant Response:`;
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ role: 'user', parts: [{ text: prompt }] }]
        })
      });

      if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
      const data = await response.json();

      let reply = 'I am unable to process a response at the moment. Please try again.';
      if (data?.candidates?.[0]?.content?.parts?.[0]?.text) {
        reply = data.candidates[0].content.parts[0].text;
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `ai-${Date.now()}`,
          sender: 'ai',
          text: reply,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } catch (error) {
      console.error('Error generating AI response:', error);
      setMessages((prev) => [
        ...prev,
        {
          id: `ai-err-${Date.now()}`,
          sender: 'ai',
          text: 'Unable to connect to the AI service. Please verify that VITE_GEMINI_API_KEY is configured in your .env file.',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };
  handleSendMessageRef.current = handleSendMessage;

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isLoading]);

  useEffect(() => {
    const handleOpenChat = (event) => {
      setIsOpen(true);
      if (event.detail?.prompt) {
        handleSendMessageRef.current?.(event.detail.prompt);
      }
    };
    window.addEventListener('open-ai-chat', handleOpenChat);
    return () => window.removeEventListener('open-ai-chat', handleOpenChat);
  }, []);

  const resetChat = () => {
    setMessages([
      {
        id: 'welcome',
        sender: 'ai',
        text: "Conversation reset. Feel free to ask any question about Aroliani's portfolio.",
        time: 'Just now'
      }
    ]);
  };

  return (
    <>
      {/* Floating Action Button at Bottom-Right: 3D-styled Upward Arrow */}
      <div className="fixed bottom-6 right-6 z-50">
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="relative group p-2.5 rounded-2xl bg-teal-deep/85 hover:bg-teal-deep text-champagne backdrop-blur-md shadow-xl hover:shadow-2xl focus:outline-none transition-all duration-200 flex items-center justify-center border border-champagne/50"
          whileHover={{ scale: 1.08, y: -2 }}
          whileTap={{ scale: 0.94 }}
          aria-label="Open AI Assistant"
        >
          <div className="flex items-center gap-2">
            {isOpen ? (
              <X className="w-5 h-5 text-ivory" />
            ) : (
              <>
                {/* 3D-styled upward arrow */}
                <div className="w-6 h-6 flex items-center justify-center drop-shadow-[0_2px_6px_rgba(216,185,124,0.6)]">
                  <ArrowIcon className="w-5 h-5 text-champagne drop-shadow" />
                </div>
                <span className="font-mono text-xs font-bold tracking-wide pr-1 text-ivory">
                  AI Assistant
                </span>
              </>
            )}
          </div>
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 border-2 border-teal-deep rounded-full animate-pulse" />
        </motion.button>
      </div>

      {/* Expandable Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-20 right-4 sm:right-6 w-[calc(100vw-32px)] sm:w-[400px] max-h-[560px] h-[520px] z-50 rounded-3xl flex flex-col overflow-hidden bg-white border border-teal-deep/15 shadow-2xl"
          >
            {/* Header */}
            <div className="p-4 bg-teal-deep text-ivory border-b border-teal-deep/10 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-teal-muted flex items-center justify-center text-champagne">
                  <ArrowIcon className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-mono text-xs font-bold tracking-wide text-ivory">
                    Aroo Portfolio Guide
                  </h3>
                  <p className="text-[10px] text-ivory-muted font-mono flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
                    Online • Gemini 2.0 Flash
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={resetChat}
                  title="Reset Conversation"
                  className="p-1.5 text-ivory-muted hover:text-ivory rounded-lg transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  title="Close Guide"
                  className="p-1.5 text-ivory-muted hover:text-ivory rounded-lg transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Chat Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-ivory-light">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl p-3 text-xs sm:text-sm ${
                      msg.sender === 'user'
                        ? 'bg-teal-deep text-ivory rounded-br-none shadow-sm'
                        : 'bg-white border border-teal-deep/10 text-charcoal rounded-bl-none shadow-sm'
                    }`}
                  >
                    {msg.sender === 'ai' ? (
                      <div>{formatMessageText(msg.text)}</div>
                    ) : (
                      <p className="whitespace-pre-wrap">{msg.text}</p>
                    )}
                  </div>
                  <span className="text-[9px] text-charcoal-muted mt-1 px-1 font-mono">
                    {msg.time}
                  </span>
                </div>
              ))}

              {/* Typing indicator */}
              {isLoading && (
                <div className="flex items-center gap-2 text-teal-deep text-xs font-mono p-2">
                  <div className="w-6 h-6 rounded-lg bg-teal-light flex items-center justify-center">
                    <ArrowIcon className="w-3.5 h-3.5 text-teal-deep animate-pulse" />
                  </div>
                  <div className="flex items-center gap-1 bg-white px-3 py-1.5 rounded-xl border border-teal-deep/10 shadow-sm">
                    <span className="w-1.5 h-1.5 bg-teal-deep rounded-full animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-1.5 h-1.5 bg-teal-deep rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-1.5 h-1.5 bg-teal-deep rounded-full animate-bounce" />
                    <span className="text-charcoal-muted text-[11px] ml-1">Thinking...</span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Prompt Suggestions */}
            {messages.length <= 3 && !isLoading && (
              <div className="px-4 py-2 bg-white border-t border-teal-deep/5">
                <p className="text-[10px] font-mono text-charcoal-muted mb-1.5">
                  Suggested topics:
                </p>
                <div className="flex flex-wrap gap-1">
                  {PRESET_QUESTIONS.map((q, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendMessage(q)}
                      className="text-[10px] px-2.5 py-1 rounded-full bg-ivory text-teal-deep border border-teal-deep/10 hover:bg-teal-light transition-all text-left truncate max-w-full font-mono"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Footer Input Area */}
            <div className="p-3 bg-white border-t border-teal-deep/10">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask a question about Aroliani..."
                  disabled={isLoading}
                  className="flex-1 py-2 px-3 text-xs rounded-xl bg-ivory border border-teal-deep/15 text-charcoal placeholder-charcoal-muted focus:outline-none focus:border-teal-deep"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="p-2 rounded-xl bg-teal-deep hover:bg-teal-muted text-ivory disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-sm"
                >
                  <Send className="w-3.5 h-3.5 text-champagne" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AiChatbotBubble;
