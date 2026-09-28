import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../../supabaseClient';
import { 
  MessageSquare, 
  X, 
  Send, 
  Sparkles, 
  RotateCcw, 
  Bot, 
  User, 
  ShieldCheck, 
  CornerDownLeft 
} from 'lucide-react';

const profileData = `Aroliani is a sixth-semester Informatics student at President University with an interest in cybersecurity, web development, and mobile applications. Aroliani enjoys learning how systems work and exploring ways to enhance their security and functionality. Through various projects, Aroliani has developed hands-on experience in both design and programming. Aroliani is eager to continue honing her skills and taking on new challenges. Aroliani is currently advancing her software development expertise as a participant in the prestigious Korea-ASEAN Digital Academy (KADA). This initiative is managed by Elice and supported by a consortium of partners, including the ASEAN-Korea Cooperation Fund (AKCF), Korea's Ministry of Science and ICT (MSICT) and National IT Industry Promotion Agency (NIPA), and Indonesia's Ministry of Communication and Digital Affairs (MCDA). In KADA training program, they focus on a comprehensive, hands-on curriculum covering: AI Ethics & Information Security, Full-Stack Development (Web & Backend), Cloud Service Deployment, Data Analysis Fundamentals, DevOps and CI/CD Automation, UI/UX Design Principles, Collaborative Capstone Project. Aroliani's internship experience was in President University at DPMI division (January 2024 - April 2024). Aroliani organized and prepared over 50 accreditation documents for internal assessments under the Divisi Pengembangan & Manajemen Industri (DPMI) at President University, and supported internal audit processes. In Cybersecurity, Aroliani has a keen interest in OSINT, penetration testing using Linux and Wireshark, and tools like Burp Suite, Nmap, Seeker, TheHarvester, and OWASP Top Ten mitigation.`;

const skillsData = {
  "Web & Mobile Development": ["HTML", "CSS", "React JS", "JavaScript", "Node.js", "Express", "PHP", "Java", "Python", "Android Studio"],
  "Databases": ["SQL", "MongoDB", "Firebase"],
  "Cyber Security & Tools": ["OSINT", "Penetration Testing", "Linux CLI", "Burp Suite", "Wireshark", "SEToolkit", "GitHub", "AWS"],
  "Design & Prototyping": ["Figma", "Canva", "UI/UX Architecture"]
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
    title: 'BOOSH - Bus Schedule UI/UX',
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
  "Apa keahlian Aroliani di Cybersecurity?",
  "Ceritakan proyek MedEase App",
  "Apa saja teknologi yang dikuasai?",
  "Bagaimana pengalaman magang di DPMI?",
];

const getVisitorId = () => {
  let visitorId = sessionStorage.getItem('visitorId');
  if (!visitorId) {
    visitorId = `visitor-${crypto.randomUUID()}`;
    sessionStorage.setItem('visitorId', visitorId);
  }
  return visitorId;
};

// Formatter to render bold, bullet points, and code nicely
const formatMessageText = (text) => {
  return text.split('\n').map((line, index) => {
    // Check for bullets
    const isBullet = line.trim().startsWith('- ') || line.trim().startsWith('* ');
    const cleanedLine = isBullet ? line.trim().substring(2) : line;

    // Bold formatting **text**
    const parts = cleanedLine.split(/(\*\*.*?\*\*)/g);
    const formattedContent = parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} className="text-violet-300 font-semibold">{part.slice(2, -2)}</strong>;
      }
      return part;
    });

    if (isBullet) {
      return (
        <li key={index} className="ml-4 list-disc text-gray-200 my-0.5">
          {formattedContent}
        </li>
      );
    }

    if (line.trim() === '') {
      return <div key={index} className="h-2" />;
    }

    return (
      <p key={index} className="my-1 text-gray-200 leading-relaxed">
        {formattedContent}
      </p>
    );
  });
};

const AiChatbotBubble = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      sender: 'ai',
      text: "Halo! 👋 Aku AI Assistant Aroliani Munte. Tanyakan apa saja tentang profil, pengalaman Cybersecurity, Full-Stack, atau proyek-proyek Aroliani!",
      time: 'Baru saja'
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

    // 1. Log question to Supabase
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
      console.warn('Logging to Supabase skipped or failed:', err.message);
    }

    // 2. Call Gemini API
    const portfolioContext = `You are a polite, intelligent, and articulate portfolio AI assistant for Aroliani Munte.
Aroliani is an Informatics student at President University, specializing in Cybersecurity (OSINT, Penetration Testing, Web Security), Full-Stack Development, and UI/UX Design.
Always answer helpfully, enthusiastically, and professionally.
Respond in Indonesian if asked in Indonesian, or in English if asked in English.
Keep answers structured, concise, and easy to read.

PROFILE:
${profileData}

SKILLS:
${JSON.stringify(skillsData, null, 2)}

PROJECTS:
${projectData.map(p => `• [${p.category}] ${p.title}: ${p.description}`).join('\n')}
`;

    const prompt = `${portfolioContext}\n\nUser Question: "${textToSend}"\n\nAssistant Response:`;
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

      let reply = 'Maaf, saya tidak dapat memproses jawaban saat ini.';
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
          text: '⚠️ Maaf, terjadi kendala saat menghubungkan ke layanan AI. Pastikan VITE_GEMINI_API_KEY sudah terpasang dengan benar.',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };
  handleSendMessageRef.current = handleSendMessage;

  // Auto-scroll on new message
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isLoading]);

  // Listen to external triggers (e.g. from hero or navbar)
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
        text: "Halo! 👋 Chat telah di-reset. Ada hal lain yang ingin kamu tanyakan mengenai Aroliani?",
        time: 'Baru saja'
      }
    ]);
  };

  return (
    <>
      {/* Floating Chat Trigger Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="relative group p-4 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-2xl shadow-violet-500/40 hover:shadow-violet-500/60 focus:outline-none transition-all duration-300 flex items-center justify-center"
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Buka AI Chatbot"
        >
          {/* Subtle pulsating aurora aura */}
          <span className="absolute -inset-1 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 opacity-60 blur-md group-hover:opacity-100 transition duration-500 animate-pulse" />

          <div className="relative z-10 flex items-center justify-center">
            {isOpen ? (
              <X className="w-6 h-6 text-white transition-transform duration-300 rotate-90 group-hover:rotate-0" />
            ) : (
              <div className="flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-violet-200 animate-bounce" />
                <span className="hidden sm:inline-block font-mono text-sm font-semibold pr-1">
                  Ask AI
                </span>
              </div>
            )}
          </div>

          {/* Active online badge */}
          <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-emerald-400 border-2 border-slate-900 rounded-full" />
        </motion.button>
      </div>

      {/* Expandable Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.92 }}
            transition={{ type: 'spring', damping: 25, stiffness: 280 }}
            className="fixed bottom-24 right-4 sm:right-6 w-[calc(100vw-32px)] sm:w-[420px] max-h-[580px] h-[540px] z-50 rounded-2xl flex flex-col overflow-hidden glass-panel border border-violet-500/20 shadow-2xl shadow-black/80"
          >
            {/* Header */}
            <div className="p-4 bg-slate-900/80 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-xl bg-gradient-to-tr from-violet-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-violet-500/30">
                  <Bot className="w-6 h-6 text-white" />
                  <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 border-2 border-slate-900 rounded-full" />
                </div>
                <div>
                  <h3 className="font-mono text-sm font-bold text-white flex items-center gap-1.5">
                    Aroliani AI Assistant
                    <ShieldCheck className="w-4 h-4 text-violet-400" />
                  </h3>
                  <p className="text-xs text-gray-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-ping" />
                    Online • Gemini 2.0 Flash
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={resetChat}
                  title="Reset Percakapan"
                  className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  title="Tutup Chat"
                  className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Chat Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl p-3.5 text-sm ${
                      msg.sender === 'user'
                        ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-600/20 rounded-br-none'
                        : 'glass-card border border-white/10 text-gray-200 rounded-bl-none shadow-md'
                    }`}
                  >
                    {msg.sender === 'ai' ? (
                      <div className="text-xs sm:text-sm">{formatMessageText(msg.text)}</div>
                    ) : (
                      <p className="whitespace-pre-wrap">{msg.text}</p>
                    )}
                  </div>
                  <span className="text-[10px] text-gray-400 mt-1 px-1 font-mono">
                    {msg.time}
                  </span>
                </div>
              ))}

              {/* Typing indicator */}
              {isLoading && (
                <div className="flex items-center gap-2 text-violet-400 text-xs font-mono p-2">
                  <div className="w-8 h-8 rounded-lg bg-violet-600/20 border border-violet-500/30 flex items-center justify-center">
                    <Sparkles className="w-4 h-4 animate-spin text-violet-300" />
                  </div>
                  <div className="flex items-center gap-1.5 bg-slate-800/60 px-3 py-2 rounded-xl border border-white/5">
                    <span className="w-1.5 h-1.5 bg-violet-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-1.5 h-1.5 bg-violet-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-1.5 h-1.5 bg-violet-400 rounded-full animate-bounce" />
                    <span className="text-gray-400 ml-1">Mengetik...</span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Prompt Suggestions */}
            {messages.length <= 3 && !isLoading && (
              <div className="px-4 pb-2">
                <p className="text-[11px] font-mono text-gray-400 mb-1.5 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-violet-400" />
                  Pertanyaan Populer:
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {PRESET_QUESTIONS.map((q, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendMessage(q)}
                      className="text-[11px] px-2.5 py-1 rounded-full bg-violet-500/10 hover:bg-violet-500/20 text-violet-300 border border-violet-500/25 transition-all text-left truncate max-w-full"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Footer / Input Area */}
            <div className="p-3 bg-slate-900/90 border-t border-white/10">
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
                  placeholder="Tanyakan sesuatu tentang Aroliani..."
                  disabled={isLoading}
                  className="flex-1 py-2.5 px-3.5 text-xs sm:text-sm rounded-xl glass-input text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-violet-500 disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="p-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-md shadow-violet-600/30 flex items-center justify-center"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
              <div className="text-[10px] text-gray-400 text-center mt-2 flex items-center justify-center gap-1">
                <span>Tekan</span>
                <kbd className="px-1 py-0.5 text-[9px] bg-slate-800 border border-gray-700 rounded text-gray-400">Enter</kbd>
                <span>untuk mengirim</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AiChatbotBubble;
