import React, { useState, useEffect } from 'react';

const Hero = () => {
    const [subtitle, setSubtitle] = useState('');
    const roles = ["Cyber Security Enthusiast", "Full-Stack Developer", "UI/UX Designer"];

    useEffect(() => {
        let roleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let timer;

        const type = () => {
            const currentRole = roles[roleIndex];
            let typeSpeed = 150;

            if (isDeleting) {
                setSubtitle(currentRole.substring(0, charIndex - 1));
                charIndex--;
                typeSpeed = 75;
            } else {
                setSubtitle(currentRole.substring(0, charIndex + 1));
                charIndex++;
            }

            if (!isDeleting && charIndex === currentRole.length) {
                isDeleting = true;
                typeSpeed = 2000;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
            }
            
            timer = setTimeout(type, typeSpeed);
        };
        
        timer = setTimeout(type, 1000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <section id="hero" className="relative text-center min-h-screen flex flex-col justify-center items-center p-6">
            <div className="container mx-auto">
                <h1 className="text-4xl md:text-6xl font-extrabold tracking-widest text-green-400 mb-4 font-mono">WELCOME TO MY PORTFOLIO</h1>
                <p className="text-lg md:text-xl text-sky-400 max-w-3xl mx-auto font-mono h-8">
                    <span>{subtitle}</span>
                    <span id="subtitle-cursor"></span>
                </p>
            </div>
        </section>
    );
};

export default Hero;
