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
            const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', { method: 'POST', body: data, headers: { 'Accept': 'application/json' } });
            if (response.ok) { setStatus(`<p class="text-green-400 font-mono">Message sent. Thank you.</p>`); form.reset(); } 
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
          viewport={{ amount: 0.2 }}
        >
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-green-400 font-mono">Contact Me</h2>
                    <p className="mt-3 text-lg text-gray-400 max-w-2xl mx-auto">Use the form below to send an encrypted message.</p>
                </div>
                <form onSubmit={handleSubmit} className="max-w-xl mx-auto">
                    <div className="mb-4 text-center" dangerouslySetInnerHTML={{ __html: status }}></div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block mb-2 font-mono text-gray-400">Your Email Address:</label>
                        <input type="email" id="email" name="email" required className="w-full p-3 bg-gray-800 border border-gray-600 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none" />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="message" className="block mb-2 font-mono text-gray-400">Message:</label>
                        <textarea id="message" name="message" rows="5" required className="w-full p-3 bg-gray-800 border border-gray-600 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"></textarea>
                    </div>
                    <div className="text-center">
                        <button type="submit" className="bg-sky-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-sky-700 transition-colors font-mono">SEND_MESSAGE</button>
                    </div>
                </form>
            </div>
        </motion.section>
    );
};

export default Contact;
