import React, { useEffect, useId, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { MessageCircle, Send, Sparkles, Trash2, X } from 'lucide-react';

const STORAGE_KEY = 'arooliani-ai-chat-history-v1';
const LANGUAGE_STORAGE_KEY = 'arooliani-ai-language-v1';
const interfaceText = {
  en: {
    title: "Aroo's AI Assistant",
    status: 'Here to help',
    language: 'Language',
    clearHistory: 'Clear chat history',
    closeChat: 'Close chat',
    greeting: 'Hi there!',
    introduction: 'I’m Aroo’s portfolio assistant. Ask me about her background, IT support experience, skills, or projects.',
    suggestionsLabel: 'Try asking',
    quickQuestions: [
      'What does Aroo do at Ciputra Life?',
      'What tools are used for SAKURA DMS?',
      'Tell me about the BOOSH project.',
      'What is Aroo’s educational background?',
    ],
    placeholder: 'Ask about experience or projects…',
    inputLabel: 'Ask the AI assistant',
    send: 'Send question',
    you: 'You',
    thinking: 'Thinking…',
    requestError: 'I could not reach the AI service. Please try again later or email me directly at arolianimunte07@gmail.com.',
    confirmTitle: 'Clear chat history?',
    confirmDescription: 'This removes the saved conversation from this browser.',
    cancel: 'Cancel',
    clear: 'Clear history',
  },
  id: {
    title: 'Asisten AI Aroo',
    status: 'Siap membantu',
    language: 'Bahasa',
    clearHistory: 'Hapus riwayat chat',
    closeChat: 'Tutup chat',
    greeting: 'Halo!',
    introduction: 'Aku asisten portfolio Aroo. Tanyakan tentang latar belakang, pengalaman IT support, keahlian, atau proyeknya.',
    suggestionsLabel: 'Coba tanyakan',
    quickQuestions: [
      'Apa tugas Aroo di Ciputra Life?',
      'Tools apa yang digunakan untuk SAKURA DMS?',
      'Ceritakan tentang proyek BOOSH.',
      'Apa latar belakang pendidikan Aroo?',
    ],
    placeholder: 'Tanyakan tentang pengalaman atau proyek…',
    inputLabel: 'Tanya asisten AI',
    send: 'Kirim pertanyaan',
    you: 'Kamu',
    thinking: 'Sedang berpikir…',
    requestError: 'Aku belum bisa terhubung ke layanan AI. Coba lagi nanti atau hubungi langsung melalui email arolianimunte07@gmail.com.',
    confirmTitle: 'Hapus riwayat chat?',
    confirmDescription: 'Percakapan tersimpan di browser ini akan dihapus.',
    cancel: 'Batal',
    clear: 'Hapus riwayat',
  },
};

const createMessage = (role, text) => ({
  id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
  role,
  text,
});

const loadSavedMessages = () => {
  try {
    const savedMessages = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '[]');
    if (!Array.isArray(savedMessages)) return [];
    return savedMessages
      .filter((message) => message && ['user', 'assistant'].includes(message.role) && typeof message.text === 'string')
      .slice(-100);
  } catch {
    return [];
  }
};

const loadSavedLanguage = () => {
  try {
    return window.localStorage.getItem(LANGUAGE_STORAGE_KEY) === 'id' ? 'id' : 'en';
  } catch {
    return 'en';
  }
};

const HudIcon = ({ isLoading, size = 40 }) => {
  const id = useId();
  const glowId = `${id}-glow`;
  const coreId = `${id}-core`;

  return (
    <svg viewBox="0 0 120 120" width={size} height={size} aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id={glowId}>
          <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
          <feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <radialGradient id={coreId} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
          <stop offset="40%" stopColor="#c4b5fd" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.3" />
        </radialGradient>
      </defs>
      <motion.circle cx="60" cy="60" r="50" fill="none" stroke="#7c3aed" strokeWidth="1" opacity="0.25" animate={{ r: [48, 52, 48] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }} filter={`url(#${glowId})`} />
      <motion.circle cx="60" cy="60" r="36" fill="none" stroke="#8b5cf6" strokeWidth="1.5" strokeDasharray="8 4" opacity="0.4" animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: 'linear' }} style={{ transformOrigin: '60px 60px' }} />
      <motion.ellipse cx="60" cy="60" rx="42" ry="15" fill="none" stroke="#7c3aed" strokeWidth="1.5" opacity="0.7" animate={{ rotate: 360 }} transition={{ duration: 6, repeat: Infinity, ease: 'linear' }} style={{ transformOrigin: '60px 60px' }} filter={`url(#${glowId})`} />
      <motion.circle cx="60" cy="60" r="28" fill="none" stroke="#a78bfa" strokeWidth="2" strokeDasharray={isLoading ? '18 5' : '14 8'} opacity="0.6" animate={{ rotate: isLoading ? 360 : -360 }} transition={{ duration: isLoading ? 1.5 : 4, repeat: Infinity, ease: 'linear' }} style={{ transformOrigin: '60px 60px' }} />
      <motion.g opacity="0.5" animate={{ rotate: [0, 5, 0] }} transition={{ duration: 5, repeat: Infinity }} style={{ transformOrigin: '60px 60px' }}>
        <line x1="60" y1="22" x2="60" y2="38" stroke="#c4b5fd" strokeWidth="1" />
        <line x1="60" y1="82" x2="60" y2="98" stroke="#c4b5fd" strokeWidth="1" />
        <line x1="22" y1="60" x2="38" y2="60" stroke="#c4b5fd" strokeWidth="1" />
        <line x1="82" y1="60" x2="98" y2="60" stroke="#c4b5fd" strokeWidth="1" />
      </motion.g>
      <motion.circle cx="60" cy="60" r="10" fill={`url(#${coreId})`} filter={`url(#${glowId})`} animate={{ r: isLoading ? [8, 13, 10, 12, 10] : [9, 11, 9] }} transition={{ duration: isLoading ? 1 : 2.5, repeat: Infinity, ease: 'easeInOut' }} />
      <motion.path d="M60 50 L62 58 L70 60 L62 62 L60 70 L58 62 L50 60 L58 58 Z" fill="white" animate={{ opacity: [0, 0.9, 0] }} transition={{ duration: 2.5, repeat: Infinity }} style={{ transformOrigin: '60px 60px' }} />
    </svg>
  );
};

const AiAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isClearConfirmOpen, setIsClearConfirmOpen] = useState(false);
  const [input, setInput] = useState('');
  const [language, setLanguage] = useState(loadSavedLanguage);
  const [messages, setMessages] = useState(loadSavedMessages);
  const messagesEndRef = useRef(null);
  const labels = interfaceText[language];

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(messages.slice(-100)));
    } catch {
      // Keep the chat usable when browser storage is unavailable.
    }
  }, [messages]);

  useEffect(() => {
    try {
      window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
    } catch {
      // Keep the chat usable when browser storage is unavailable.
    }
  }, [language]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [messages, isLoading, isOpen]);

  const handleClearChat = () => {
    setMessages([]);
    setInput('');
    setIsClearConfirmOpen(false);
  };

  const sendQuestion = async (question) => {
    if (!question || isLoading) return;

    const nextMessages = [...messages, createMessage('user', question)].slice(-100);
    setMessages(nextMessages);
    setInput('');
    setIsLoading(true);
    try {
      const response = await fetch('/.netlify/functions/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          language,
          messages: nextMessages.slice(-20).map(({ role, text }) => ({ role, text })),
        }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'The AI service is unavailable.');
      setMessages((currentMessages) => [...currentMessages, createMessage('assistant', result.reply || 'I could not find an answer to that question.')].slice(-100));
    } catch {
      setMessages((currentMessages) => [...currentMessages, createMessage('assistant', labels.requestError)].slice(-100));
    } finally {
      setIsLoading(false);
    }
  };

  const handleAskAi = (event) => {
    event.preventDefault();
    sendQuestion(input.trim());
  };

  return (
    <div className="fixed bottom-5 right-5 z-[60] md:bottom-7 md:right-7">
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0, y: 16, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 16, scale: 0.96 }} className="relative mb-4 flex h-[min(31rem,calc(100vh-7rem))] w-[min(23rem,calc(100vw-2.5rem))] flex-col overflow-hidden rounded-xl border border-violet-400/30 bg-[#0d1117] shadow-2xl shadow-violet-950/30">
            <div className="border-b border-violet-400/20 bg-[#161b22] px-4 py-3">
              <div className="flex items-center justify-between">
                <div className="flex min-w-0 items-center gap-3"><HudIcon isLoading={isLoading} size={42}/><div className="min-w-0"><h2 className="font-mono text-sm font-semibold text-violet-300">{labels.title}</h2><p className="flex items-center gap-1.5 font-mono text-xs text-gray-400"><span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />{labels.status}</p></div></div>
              <div className="flex shrink-0 items-center">
                  <button type="button" onClick={() => setIsClearConfirmOpen(true)} disabled={isLoading || messages.length === 0} aria-label={labels.clearHistory} title={labels.clearHistory} className="rounded-lg p-2 text-gray-300 hover:bg-white/10 disabled:opacity-40"><Trash2 size={16}/></button>
                  <button type="button" onClick={() => setIsOpen(false)} aria-label={labels.closeChat} title={labels.closeChat} className="rounded-lg p-2 text-gray-300 hover:bg-white/10"><X size={18}/></button>
                </div>
              </div>
              <div className="mt-3 flex items-center justify-between">
                <span className="font-mono text-xs text-gray-400">{labels.language}</span>
                <div className="inline-flex rounded-md border border-white/10 bg-[#0d1117] p-0.5" role="group" aria-label={labels.language}>
                  {['en', 'id'].map((option) => (
                    <button key={option} type="button" onClick={() => setLanguage(option)} aria-pressed={language === option} className={`rounded px-2.5 py-1 font-mono text-xs transition ${language === option ? 'bg-violet-600 text-white' : 'text-gray-400 hover:text-gray-100'}`}>
                      {option === 'en' ? 'English' : 'Indonesia'}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              {messages.length === 0 ? (
                <div className="flex h-full flex-col justify-center py-2">
                  <div className="mb-5">
                    <div className="mb-3 grid h-10 w-10 place-items-center rounded-lg border border-violet-400/20 bg-violet-500/10 text-violet-300"><Sparkles size={19}/></div>
                    <h3 className="font-mono text-xl font-semibold text-gray-100">{labels.greeting}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-gray-400">{labels.introduction}</p>
                  </div>
                  <div className="mb-2 flex items-center gap-2 font-mono text-xs uppercase text-violet-300"><MessageCircle size={14}/>{labels.suggestionsLabel}</div>
                  <div className="grid gap-2">
                    {labels.quickQuestions.map((question) => (
                      <button key={question} type="button" onClick={() => sendQuestion(question)} disabled={isLoading} className="flex items-center justify-between gap-3 rounded-lg border border-white/10 bg-[#161b22] px-3 py-2.5 text-left text-sm text-gray-200 transition hover:border-violet-400/40 hover:bg-violet-500/10 disabled:opacity-50">
                        <span>{question}</span><Send size={14} className="shrink-0 text-violet-300"/>
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div aria-live="polite">
                  {messages.map((message) => (
                    <div key={message.id} className={`mt-4 flex flex-col ${message.role === 'user' ? 'items-end' : 'items-start'}`}>
                      <span className="mb-1 px-1 font-mono text-[10px] uppercase text-gray-500">{message.role === 'user' ? labels.you : 'Aroo'}</span>
                      <p className={`max-w-[92%] whitespace-pre-wrap rounded-xl p-3 font-mono text-sm leading-relaxed ${message.role === 'user' ? 'rounded-tr-sm bg-violet-600 text-white' : 'rounded-tl-sm border border-violet-400/20 bg-violet-500/10 text-gray-100'}`}>
                        {message.text}
                      </p>
                    </div>
                  ))}
                </div>
              )}
              {isLoading && <p className="mt-3 font-mono text-sm text-violet-300">{labels.thinking}</p>}
              <div ref={messagesEndRef} />
            </div>
            <form onSubmit={handleAskAi} className="flex gap-2 border-t border-violet-400/20 bg-[#161b22]/70 p-3">
              <input value={input} onChange={(event) => setInput(event.target.value)} placeholder={labels.placeholder} aria-label={labels.inputLabel} className="min-w-0 flex-1 rounded-lg border border-white/10 bg-[#0d1117] px-3 py-2.5 font-mono text-sm text-white outline-none placeholder:text-gray-500 focus:border-violet-400"/>
              <button type="submit" disabled={isLoading || !input.trim()} aria-label={labels.send} className="rounded-lg bg-violet-600 px-3 text-white transition hover:bg-violet-500 disabled:opacity-50"><Send size={18}/></button>
            </form>
            <AnimatePresence>
              {isClearConfirmOpen && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 z-20 grid place-items-center bg-black/70 p-5 backdrop-blur-sm">
                  <motion.div role="dialog" aria-modal="true" aria-labelledby="clear-chat-title" initial={{ opacity: 0, y: 8, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 8, scale: 0.98 }} className="w-full max-w-xs rounded-xl border border-violet-400/30 bg-[#161b22] p-5 shadow-2xl shadow-black/40">
                    <h3 id="clear-chat-title" className="font-mono text-base font-semibold text-gray-100">{labels.confirmTitle}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-gray-400">{labels.confirmDescription}</p>
                    <div className="mt-5 flex justify-end gap-2">
                      <button type="button" onClick={() => setIsClearConfirmOpen(false)} className="rounded-lg border border-white/10 px-3 py-2 font-mono text-xs text-gray-300 transition hover:bg-white/5">{labels.cancel}</button>
                      <button type="button" onClick={handleClearChat} className="rounded-lg bg-violet-600 px-3 py-2 font-mono text-xs text-white transition hover:bg-violet-500">{labels.clear}</button>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
      <button type="button" onClick={() => setIsOpen((open) => !open)} aria-label={isOpen ? 'Close AI assistant' : 'Open AI assistant'} title="Ask Aroo's AI" className="ml-auto grid h-14 w-14 place-items-center rounded-full border-2 border-violet-400/70 bg-[#0d1117] shadow-xl shadow-violet-950/40 ring-4 ring-white/10 transition hover:scale-105 hover:border-violet-300 md:h-16 md:w-16">
        <HudIcon isLoading={isLoading} size={48}/>
      </button>
    </div>
  );
};

export default AiAssistant;

