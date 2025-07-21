import React from 'react';

const skillsData = {
    "Bahasa Pemrograman & Scripting": [ { name: "Python", icon: "devicon-python-plain colored" }, { name: "JavaScript", icon: "devicon-javascript-plain colored" }, { name: "Bash", icon: "devicon-bash-plain" }, { name: "PowerShell", icon: "devicon-powershell-plain" }, { name: "Go", icon: "devicon-go-original-wordmark colored" }, { name: "C++", icon: "devicon-cplusplus-plain colored" }, { name: "SQL", icon: "devicon-postgresql-plain colored" }, { name: "HTML5", icon: "devicon-html5-plain colored" }, { name: "CSS3", icon: "devicon-css3-plain colored" } ],
    "Tools Keamanan": [ { name: "Nmap", icon: "devicon-linux-plain" }, { name: "Wireshark", icon: "devicon-redhat-plain" }, { name: "Metasploit", icon: "devicon-debian-plain" }, { name: "Burp Suite", icon: "devicon-devicon-plain" }, { name: "OWASP ZAP", icon: "devicon-devicon-plain" }, { name: "Ghidra", icon: "devicon-devicon-plain" }, { name: "Volatility", icon: "devicon-devicon-plain" }, { name: "John the Ripper", icon: "devicon-devicon-plain" } ],
    "Framework & Teknologi": [ { name: "Docker", icon: "devicon-docker-plain colored" }, { name: "Kubernetes", icon: "devicon-kubernetes-plain colored" }, { name: "AWS", icon: "devicon-amazonwebservices-original colored" }, { name: "Azure", icon: "devicon-azure-plain colored" }, { name: "Linux", icon: "devicon-linux-plain" }, { name: "Windows", icon: "devicon-windows8-original" }, { name: "Splunk", icon: "devicon-devicon-plain" }, { name: "ELK Stack", icon: "devicon-elasticsearch-plain colored" } ]
};

const Skills = () => (
  <section id="skills" className="py-20 md:py-24 bg-black/30">
    <div className="container mx-auto px-6">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-green-400 font-mono">Skills & Tools</h2>
        <p className="mt-3 text-lg text-gray-400 max-w-2xl mx-auto">Inventaris visual dari bahasa pemrograman, tools, dan teknologi yang dikuasai.</p>
      </div>
      <div className="max-w-5xl mx-auto space-y-10">
        {Object.entries(skillsData).map(([category, skills]) => (
          <div key={category}>
            <h3 className="text-xl font-semibold text-sky-400 font-mono mb-4 border-b-2 border-gray-700 pb-2">{category}</h3>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4">
              {skills.map(skill => (
                <div key={skill.name} className="group flex flex-col items-center justify-center text-center p-4 bg-gray-800/50 rounded-lg border border-gray-700 transition-all duration-300 hover:bg-gray-700/50 hover:-translate-y-1 hover:border-sky-500 cursor-pointer">
                  <i className={`${skill.icon || 'devicon-devicon-plain'} text-4xl text-gray-400 transition-colors duration-300 group-hover:text-sky-400`}></i>
                  <span className="mt-3 text-sm text-gray-400 font-mono transition-colors duration-300 group-hover:text-white">{skill.name}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Skills;
