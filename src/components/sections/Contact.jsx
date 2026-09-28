import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, 
  Send, 
  Copy, 
  Check, 
  MapPin, 
  Github, 
  Linkedin, 
  MessageSquare,
  Sparkles,
  Clock
} from 'lucide-react';

const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

const Contact = () => {
  const [copied, setCopied] = useState(false);
  const [formState, setFormState] = useState({ loading: false, success: false, error: false });
  const emailAddress = "arolianimunte@gmail.com";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);
    
    setFormState({ loading: true, success: false, error: false });

    try {
      const response = await fetch('https://formspree.io/f/myzpwybb', {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      });

      if (response.ok) {
        setFormState({ loading: false, success: true, error: false });
        form.reset();
      } else {
        throw new Error('Failed to send message.');
      }
    } catch (err) {
      console.error(err);
      setFormState({ loading: false, success: false, error: true });
    }
  };

  return (
    <motion.section 
      id="contact" 
      className="py-24 relative z-10"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }} 
    >
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass-pill text-xs font-mono text-violet-300 mb-3 border border-violet-500/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Get In Touch</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Let's <span className="bg-gradient-to-r from-violet-400 via-fuchsia-300 to-indigo-300 bg-clip-text text-transparent">Connect</span>
          </h2>
          <p className="mt-3 text-base text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Interested in collaboration, internship opportunities, or discussing cybersecurity and full-stack projects? Send me a message!
          </p>
        </div>

        {/* Contact Split Container */}
        <div className="glass-panel border border-white/10 rounded-3xl p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-10 shadow-2xl">
          
          {/* Left Info Column (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
                Have an exciting opportunity or question?
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed mb-6">
                Whether you need a dedicated cybersecurity intern, a responsive web developer, or an interface designer, my inbox is always open.
              </p>

              {/* Fast Direct Email Box with Click to Copy */}
              <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/5 space-y-2 mb-6">
                <span className="text-[11px] font-mono text-gray-400 uppercase tracking-wider block">
                  Direct Email
                </span>
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 text-sm font-mono text-violet-300 truncate">
                    <Mail className="w-4 h-4 text-violet-400 shrink-0" />
                    <span className="truncate">{emailAddress}</span>
                  </div>
                  <button
                    onClick={handleCopyEmail}
                    className="p-2 rounded-xl glass-pill hover:bg-violet-600/30 text-gray-300 hover:text-white transition-colors shrink-0"
                    title="Copy Email Address"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
                {copied && (
                  <p className="text-[10px] text-emerald-400 font-mono">
                    ✓ Email berhasil disalin ke clipboard!
                  </p>
                )}
              </div>

              {/* Location & Response Time */}
              <div className="space-y-3 text-xs font-mono text-gray-400">
                <div className="flex items-center gap-2.5">
                  <MapPin className="w-4 h-4 text-indigo-400 shrink-0" />
                  <span>Cikarang, Bekasi, Jawa Barat, Indonesia</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Respon rata-rata: Dalam 24 jam</span>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <span className="text-[11px] font-mono text-gray-400 uppercase tracking-wider block mb-3">
                Social Presence
              </span>
              <div className="flex items-center gap-3">
                <a
                  href="https://github.com/aroliani"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-2xl glass-card hover:bg-violet-600/20 text-gray-300 hover:text-white border border-white/10 hover:border-violet-500/40 transition-all hover:scale-105"
                  title="GitHub Profile"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href="https://linkedin.com/in/aroliani-munte"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-2xl glass-card hover:bg-indigo-600/20 text-gray-300 hover:text-white border border-white/10 hover:border-indigo-500/40 transition-all hover:scale-105"
                  title="LinkedIn Profile"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Form Column (7 cols) */}
          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Status Alert Banner */}
              {formState.success && (
                <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs sm:text-sm font-mono flex items-center gap-3">
                  <Check className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span>Terima kasih! Pesan Anda telah terkirim. Saya akan segera menghubungi kembali.</span>
                </div>
              )}

              {formState.error && (
                <div className="p-4 rounded-2xl bg-rose-950/60 border border-rose-500/40 text-rose-300 text-xs sm:text-sm font-mono">
                  Gagal mengirim pesan. Silakan coba kembali atau hubungi via email langsung.
                </div>
              )}

              <div>
                <label htmlFor="name" className="block text-xs font-mono text-gray-300 mb-2">
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  placeholder="Contoh: Alex Pratama"
                  className="w-full px-4 py-3 rounded-2xl glass-input text-sm text-white placeholder-gray-500 focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-xs font-mono text-gray-300 mb-2">
                  Alamat Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  placeholder="alex@perusahaan.com"
                  className="w-full px-4 py-3 rounded-2xl glass-input text-sm text-white placeholder-gray-500 focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-xs font-mono text-gray-300 mb-2">
                  Pesan Anda
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  placeholder="Ceritakan tentang proyek, tawaran magang, atau pertanyaan Anda..."
                  className="w-full px-4 py-3 rounded-2xl glass-input text-sm text-white placeholder-gray-500 focus:outline-none resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={formState.loading}
                className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-medium text-sm font-mono flex items-center justify-center gap-2 shadow-xl shadow-violet-600/30 hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {formState.loading ? (
                  <div className="loader" />
                ) : (
                  <>
                    <span>Kirim Pesan</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>

        </div>
      </div>
    </motion.section>
  );
};

export default Contact;