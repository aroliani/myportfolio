import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient'; 

// For the ai assistant //
const profileData = "Dengan hasrat mendalam untuk memecahkan teka-teki digital yang kompleks, saya mendedikasikan karir saya untuk melindungi aset informasi di dunia maya. Saya percaya bahwa pertahanan siber yang proaktif adalah kunci untuk inovasi yang aman. Keahlian saya terletak pada identifikasi celah keamanan sebelum dieksploitasi, memberikan ketenangan pikiran bagi organisasi di era digital yang penuh tantangan.";
const skillsData = { "Bahasa Pemrograman & Scripting": ["Python", "JavaScript", "Bash", "PowerShell", "Go", "C++", "SQL", "HTML5", "CSS3"], "Tools Keamanan": ["Nmap", "Wireshark", "Metasploit", "Burp Suite", "OWASP ZAP", "Ghidra", "Volatility", "John the Ripper"], "Framework & Teknologi": ["Docker", "Kubernetes", "AWS", "Azure", "Linux", "Windows Server", "Splunk", "ELK Stack"] };
const projectData = [ { title: 'Analisis Kerentanan Web App', description: 'Mengidentifikasi kerentanan kritis seperti SQL Injection dan XSS.' }, { title: 'Simulasi Phishing Internal', description: 'Merancang kampanye phishing untuk mengukur kesadaran keamanan karyawan.' }, { title: 'Forensik Jaringan', description: 'Menganalisis lalu lintas jaringan untuk menginvestigasi insiden pelanggaran data.' }, { title: 'Pengembangan Secure SDLC', description: 'Mengintegrasikan tool SAST & DAST ke dalam pipeline CI/CD.' }, { title: 'Analisis Ancaman Insider', description: 'Membangun dashboard UBA untuk mendeteksi anomali aktivitas pengguna.' }, { title: 'Red Team Engagement', description: 'Melakukan emulasi serangan tingkat lanjut berdasarkan framework MITRE ATT&CK.' } ];

const getVisitorId = () => {
  let visitorId = sessionStorage.getItem('visitorId');
  if (!visitorId) {
    visitorId = `visitor-${crypto.randomUUID()}`;
    sessionStorage.setItem('visitorId', visitorId);
  }
  return visitorId;
};

const AiAssistant = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [output, setOutput] = useState('');
  const [input, setInput] = useState('');

  // --- Debugging: Check the API key when the component is first rendered --- //
  useEffect(() => {
    console.log("--- CHECKING THE API KEY FROM .env ---");
    console.log("VITE_GEMINI_API_KEY:", import.meta.env.VITE_GEMINI_API_KEY ? "YES" : "NO / EMPTY");
    console.log("VITE_SUPABASE_URL:", import.meta.env.VITE_SUPABASE_URL ? "YES" : "NO / EMPTY");
    console.log("VITE_SUPABASE_ANON_KEY:", import.meta.env.VITE_SUPABASE_ANON_KEY ? "YES" : "NO / EMPTY");
    console.log("------------------------------------");
    if (!import.meta.env.VITE_GEMINI_API_KEY || !import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
        setOutput(`<div class="gemini-output text-red-500">ERROR: API key not found. Make sure the .env file is correct and you have restarted the server.</div>`);
    }
  }, []);


  const handleAskAi = async () => {
    if (!input) {
      setOutput(`<div class="gemini-output text-amber-400">COMMAND REJECTED: Enter your question.</div>`);
      return;
    }

    const visitorId = getVisitorId();

    // --- Send questions & complete information to Supabase ---
    try {
      const { data, error } = await supabase
        .from('questions')
        .insert([
          { 
            question_text: input,
            user_agent: navigator.userAgent,
            visitor_id: visitorId
          },
        ])
        .select();

      if (error) {
        console.error('Error from Supabase:', error);
        throw error;
      }
      console.log('Data successfully recorded in Supabase:', data);
    } catch (error) {
      console.error('Total failure when trying to send to Supabase:', error.message);
    }
    // ------------------------------------

    setIsLoading(true);
    setOutput('');

    const portfolioContext = `
      Anda adalah asisten AI untuk [Nama Anda], seorang pakar keamanan siber. Jawab pertanyaan pengguna HANYA berdasarkan informasi yang diberikan di bawah ini. Jangan mengarang informasi.
      PROFILE: ${profileData}
      SKILLS: ${JSON.stringify(skillsData, null, 2)}
      PROJECTS SHE HAD WORKED ON: ${projectData.map(p => `- ${p.title}: ${p.description}`).join('\n')}
    `;
    const prompt = `${portfolioContext}\n\nUser Questions: "${input}"\n\nAnswer:`;
    
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
    const payload = { contents: [{ role: "user", parts: [{ text: prompt }] }] };

    try {
      const response = await fetch(apiUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const result = await response.json();
      if (result.candidates && result.candidates.length > 0) {
        const text = result.candidates[0].content.parts[0].text;
        setOutput(`<div class="gemini-output">${text}</div>`);
      } else {
        setOutput(`<div class="gemini-output text-red-500">Error: Respons AI tidak valid.</div>`);
      }
    } catch (error) {
      console.error("Error calling Gemini API:", error);
      setOutput(`<div class="gemini-output text-red-500">Failed to connect to AI service. Make sure your API Key is correct.</div>`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="ai-assistant" className="py-20 md:py-24 bg-gray-900/50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-green-400 font-mono">Interact with AI Assistant</h2>
          <p className="mt-3 text-lg text-gray-400 max-w-2xl mx-auto">Ask me anything about my profile, expertise, or projects.</p>
        </div>
        <div className="max-w-2xl mx-auto">
          <div className="flex flex-col sm:flex-row gap-2">
            <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Example: What are your front-end skills?" className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none text-gray-200 font-mono" />
            <button onClick={handleAskAi} disabled={isLoading} className="bg-green-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-green-700 transition-colors w-full sm:w-auto font-mono disabled:bg-gray-500">
              {isLoading ? 'LOADING...' : 'ASK ABOUT AROLIANI'}
            </button>
          </div>
          <div className="mt-6 text-center">
            {isLoading && <div className="loader mx-auto"></div>}
            <div dangerouslySetInnerHTML={{ __html: output }}></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AiAssistant;