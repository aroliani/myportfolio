import React from 'react';

const Footer = () => {
    const currentYear = new Date().getFullYear();
    return (
        <footer className="text-center py-8 border-t border-gray-800">
            <p className="text-gray-500 font-mono">&copy; {currentYear} Aroliani Munte. Copyright All Rights Reserved.</p>
        </footer>
    );
};

export default Footer;