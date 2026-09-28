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
  Clock 
} from 'lucide-react';

const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
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
      className="py-24 relative z-10 bg-ivory border-t border-teal-deep/5"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }} 
    >
      <div className="container mx-auto px-6 max-w-6xl">
        
        {/* Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-light text-teal-deep border border-teal-deep/10 text-xs font-mono mb-3">
            <span>04 / Get In Touch</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-teal-deep tracking-tight">
            Contact &amp; Connect<span className="text-wood">.</span>
          </h2>
          <p className="mt-2 text-sm text-charcoal-muted max-w-xl leading-relaxed">
            Interested in collaboration, internship opportunities, or discussing technical projects? Reach out directly.
          </p>
        </div>

        {/* Contact Split Container */}
        <div className="editorial-card p-6 sm:p-10 rounded-3xl bg-white border border-teal-deep/10 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Direct Info (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div>
              <h3 className="text-xl font-bold text-teal-deep font-mono mb-2">
                Let's discuss opportunities.
              </h3>
              <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed mb-6">
                Open to internships and technical roles in cybersecurity, full-stack engineering, or UI/UX architecture.
              </p>

              {/* Direct Email Box with Click to Copy */}
              <div className="p-4 rounded-2xl bg-ivory border border-teal-deep/10 space-y-2 mb-6">
                <span className="text-[10px] font-mono text-charcoal-muted uppercase tracking-wider block">
                  Direct Email
                </span>
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 text-xs sm:text-sm font-mono text-teal-deep truncate">
                    <Mail className="w-4 h-4 text-wood shrink-0" />
                    <span className="truncate">{emailAddress}</span>
                  </div>
                  <button
                    onClick={handleCopyEmail}
                    className="p-1.5 rounded-lg bg-white hover:bg-ivory-dark text-teal-deep border border-teal-deep/10 transition-colors shrink-0"
                    title="Copy Email"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
                {copied && (
                  <p className="text-[10px] text-emerald-600 font-mono">
                    ✓ Email copied to clipboard
                  </p>
                )}
              </div>

              {/* Location & Response */}
              <div className="space-y-2 text-xs font-mono text-charcoal-muted">
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-wood shrink-0" />
                  <span>Cikarang, Bekasi, Jawa Barat, Indonesia</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-teal-deep shrink-0" />
                  <span>Typical response: Within 24 business hours</span>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <span className="text-[10px] font-mono text-charcoal-muted uppercase tracking-wider block mb-2">
                External Profiles
              </span>
              <div className="flex items-center gap-2.5">
                <a
                  href="https://github.com/aroliani"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-ivory hover:bg-ivory-dark text-teal-deep border border-teal-deep/10 transition-all"
                  title="GitHub Profile"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a
                  href="https://linkedin.com/in/aroliani-munte"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-ivory hover:bg-ivory-dark text-teal-deep border border-teal-deep/10 transition-all"
                  title="LinkedIn Profile"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Form (7 cols) */}
          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="space-y-3.5">
              
              {formState.success && (
                <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-mono flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Thank you! Your message has been sent successfully.</span>
                </div>
              )}

              {formState.error && (
                <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-mono">
                  Failed to send message. Please reach out directly via email.
                </div>
              )}

              <div>
                <label htmlFor="name" className="block text-xs font-mono text-charcoal-soft mb-1.5">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  placeholder="e.g. John Doe"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-ivory border border-teal-deep/15 text-xs sm:text-sm text-charcoal focus:outline-none focus:border-teal-deep"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-xs font-mono text-charcoal-soft mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  placeholder="john@company.com"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-ivory border border-teal-deep/15 text-xs sm:text-sm text-charcoal focus:outline-none focus:border-teal-deep"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-xs font-mono text-charcoal-soft mb-1.5">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  placeholder="Inquire about an internship opportunity, project, or schedule an interview..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-ivory border border-teal-deep/15 text-xs sm:text-sm text-charcoal focus:outline-none focus:border-teal-deep resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={formState.loading}
                className="w-full py-3 px-6 rounded-xl bg-teal-deep hover:bg-teal-muted text-ivory font-mono text-xs font-medium flex items-center justify-center gap-2 shadow-sm transition-all disabled:opacity-50"
              >
                {formState.loading ? (
                  <div className="loader" />
                ) : (
                  <>
                    <span>Send Message</span>
                    <Send className="w-3.5 h-3.5 text-champagne" />
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