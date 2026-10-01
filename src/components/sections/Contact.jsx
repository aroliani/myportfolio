import React, { useState } from 'react';
import { motion } from 'framer-motion';

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const Contact = () => {
    const [status, setStatus] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const data = new FormData(form);
        setStatus('<div class="loader mx-auto"></div>');
        try {
            const response = await fetch('https://formspree.io/f/myzpwybb', { method: 'POST', body: data, headers: { 'Accept': 'application/json' } });
            if (response.ok) { setStatus(`<p class="text-violet-400 font-mono">Your message has been sent. I'll get back to you as soon as possible.</p>`); form.reset(); } 
            else { throw new Error('Failed to send message.'); }
        } catch (error) { setStatus(`<p class="text-red-500 font-mono">Error: Failed to send message. Please try again.</p>`); }
    };

    return (
        <motion.section 
          id="contact" 
          className="py-20 md:py-24 bg-black/30"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ amount: 0.3 }}
        >
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-violet-400 font-mono">Contact Me</h2>
                    <p className="mt-3 text-lg text-gray-400 max-w-2xl mx-auto">
                        Have a project in mind or just want to say hi? Drop me a message.
                    </p>
                </div>

                <div className="max-w-2xl mx-auto">
                    {/* Contact Info */}
                    <div className="mb-8 flex flex-col sm:flex-row gap-4 justify-center text-center">
                        <a 
                            href="mailto:arolianimunte07@gmail.com" 
                            className="inline-flex items-center justify-center gap-2 text-gray-400 hover:text-violet-400 transition-colors font-mono text-sm"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            arolianimunte07@gmail.com
                        </a>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-400 font-mono mb-1">Name</label>
                            <input 
                                type="text" 
                                id="name"
                                name="name" 
                                required 
                                placeholder="Your name"
                                className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-violet-500 focus:outline-none text-gray-200 font-mono" 
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-400 font-mono mb-1">Email</label>
                            <input 
                                type="email" 
                                id="email"
                                name="email" 
                                required 
                                placeholder="your@email.com"
                                className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-violet-500 focus:outline-none text-gray-200 font-mono" 
                            />
                        </div>
                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-gray-400 font-mono mb-1">Message</label>
                            <textarea 
                                id="message"
                                name="message" 
                                required 
                                rows={5}
                                placeholder="Your message..."
                                className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-violet-500 focus:outline-none text-gray-200 font-mono resize-none" 
                            />
                        </div>
                        <button 
                            type="submit" 
                            className="w-full bg-violet-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-violet-700 transition-colors font-mono"
                        >
                            Send Message
                        </button>
                    </form>
                    <div className="mt-6 text-center">
                        <div dangerouslySetInnerHTML={{ __html: status }}></div>
                    </div>
                </div>
            </div>
        </motion.section>
    );
};

export default Contact;
