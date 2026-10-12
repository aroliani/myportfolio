import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock3, Copy, Github, Linkedin, Mail, MapPin, Send } from 'lucide-react';

const email = 'arolianimunte07@gmail.com';

const ContactHologram = () => (
  <div className="contact-hologram mx-auto h-36 w-44 shrink-0 sm:h-40 sm:w-48" aria-hidden="true">
    <svg viewBox="0 0 220 160" className="absolute inset-0 h-full w-full">
      <ellipse cx="110" cy="82" rx="94" ry="30" className="contact-hologram__orbit" />
      <ellipse cx="110" cy="82" rx="86" ry="25" transform="rotate(-27 110 82)" className="contact-hologram__orbit contact-hologram__orbit--tilt" />
      <path d="M21 122 C55 145 165 145 199 122" className="contact-hologram__trace" />
    </svg>
    <div className="contact-hologram__envelope"><Mail size={38} strokeWidth={1.4} /></div>
    <span className="contact-hologram__particle contact-hologram__particle--one" />
    <span className="contact-hologram__particle contact-hologram__particle--two" />
    <span className="contact-hologram__particle contact-hologram__particle--three" />
  </div>
);

const Contact = () => {
  const [status, setStatus] = useState('');
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus('Sending your message…');
    try {
      const response = await fetch('https://formspree.io/f/myzpwybb', {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });
      if (!response.ok) throw new Error('Message could not be sent');
      setStatus("Your message has been sent. I'll get back to you soon.");
      form.reset();
    } catch {
      setStatus('Something went wrong. Please email me directly.');
    }
  };

  return (
    <motion.section
      id="contact"
      className="relative isolate overflow-hidden border-t border-loch-300/10 py-20 text-mist md:py-24"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container relative z-10 mx-auto px-6">
        <motion.div className="mb-10 text-center" initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45 }}>
          <p className="section-eyebrow mb-3">Open channel</p>
          <h2 className="display-heading text-3xl md:text-4xl">Contact &amp; Connect</h2>
          <div className="rune-divider mx-auto mt-5 max-w-xs" />
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-mist/70 md:text-lg">
            Interested in collaboration, internship opportunities, or discussing technical projects? Reach out directly.
          </p>
        </motion.div>

        <div className="contact-glass-panel glass grid overflow-hidden rounded-2xl lg:grid-cols-[0.9fr_1.1fr]">
          <div className="p-6 sm:p-8 lg:p-10">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="mb-2 font-mono text-xs uppercase tracking-[0.2em] text-loch-300">Connection ready</p>
                <h3 className="font-display text-xl font-semibold text-mist sm:text-2xl">Let’s discuss opportunities.</h3>
                <p className="mt-3 max-w-md leading-relaxed text-mist/70">Open to IT opportunities across support, operations, web development, and security.</p>
              </div>
              <ContactHologram />
            </div>

            <div className="mt-5 rounded-xl border border-loch-300/15 bg-night-950/60 p-4 backdrop-blur-md sm:p-5">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-mist/55">Direct email</p>
              <div className="mt-3 flex items-center justify-between gap-3">
                <a className="inline-flex min-w-0 items-center gap-2 break-all text-sm text-mist transition-colors hover:text-loch-200 sm:text-base" href={`mailto:${email}`}>
                  <Mail size={18} className="shrink-0 text-ember-300" />
                  <span>{email}</span>
                </a>
                <button
                  type="button"
                  onClick={copyEmail}
                  aria-label="Copy email address"
                  className="shrink-0 rounded-lg border border-loch-300/20 bg-white/[0.04] p-3 text-mist/75 transition-colors hover:border-ember-300/60 hover:text-ember-300"
                >
                  <Copy size={18} />
                </button>
              </div>
              {copied && <p className="mt-2 font-mono text-xs text-loch-200">Email copied</p>}
            </div>

            <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3 text-sm text-mist/70">
              <p className="flex items-center gap-2"><MapPin size={16} className="text-ember-300" />Jakarta, Indonesia</p>
              <p className="flex items-center gap-2"><Clock3 size={16} className="text-ember-300" />Typical response: within 24 business hours</p>
            </div>
            <div className="mt-6 flex gap-3">
              <a href="https://github.com/aroliani" target="_blank" rel="noreferrer" aria-label="GitHub" className="grid h-10 w-10 place-items-center rounded-lg border border-loch-300/20 bg-white/[0.04] text-mist/75 transition-colors hover:border-ember-300/60 hover:text-ember-300">
                <Github size={18} />
              </a>
              <a href="https://www.linkedin.com/in/arolianimunte07" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="grid h-10 w-10 place-items-center rounded-lg border border-loch-300/20 bg-white/[0.04] text-mist/75 transition-colors hover:border-ember-300/60 hover:text-ember-300">
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="contact-form space-y-5 border-t border-loch-300/10 bg-night-950/45 p-6 backdrop-blur-lg sm:p-8 lg:border-l lg:border-t-0 lg:p-10">
            <div>
              <label htmlFor="contact-name" className="mb-2 block font-mono text-sm text-mist/75">Your Name</label>
              <input id="contact-name" name="name" required placeholder="e.g. John Doe" className="contact-input w-full rounded-lg border border-loch-300/15 bg-night-950/70 px-4 py-3 text-mist outline-none transition-all duration-200 placeholder:text-mist/35 focus:border-loch-300/60 focus:bg-night-900 focus:ring-2 focus:ring-loch-400/10" />
            </div>
            <div>
              <label htmlFor="contact-email" className="mb-2 block font-mono text-sm text-mist/75">Email Address</label>
              <input id="contact-email" type="email" name="email" required placeholder="john@company.com" className="contact-input w-full rounded-lg border border-loch-300/15 bg-night-950/70 px-4 py-3 text-mist outline-none transition-all duration-200 placeholder:text-mist/35 focus:border-loch-300/60 focus:bg-night-900 focus:ring-2 focus:ring-loch-400/10" />
            </div>
            <div>
              <label htmlFor="contact-message" className="mb-2 block font-mono text-sm text-mist/75">Message</label>
              <textarea id="contact-message" name="message" required rows={5} placeholder="Ask about an opportunity, project, or interview…" className="contact-input w-full resize-y rounded-lg border border-loch-300/15 bg-night-950/70 px-4 py-3 text-mist outline-none transition-all duration-200 placeholder:text-mist/35 focus:border-loch-300/60 focus:bg-night-900 focus:ring-2 focus:ring-loch-400/10" />
            </div>
            <button type="submit" className="btn-ember w-full !rounded-lg">
              <span>Send Message</span>
              <Send size={17} />
            </button>
            <p aria-live="polite" className="min-h-5 text-center text-sm text-mist/70">{status}</p>
          </form>
        </div>
      </div>
      <svg aria-hidden="true" viewBox="0 0 1200 54" preserveAspectRatio="none" className="section-flow pointer-events-none absolute bottom-0 left-0 h-12 w-full">
        <path d="M0 18 C260 18 360 44 600 28 S920 4 1200 30" className="section-flow__path" />
      </svg>
    </motion.section>
  );
};

export default Contact;
