const portfolioInstructions = `You are Aroliani Munte's portfolio assistant. Answer in the same language as the user's latest question. Use only the facts below; do not infer or invent details. If the portfolio does not specify something, say so clearly.

PROFILE
Aroliani Munte (Aroo) is an Informatics graduate awaiting graduation from President University. Her experience and interests include web development, database management, IT operations, documentation, and cybersecurity fundamentals. She is open to learning and adapting across IT roles.

EXPERIENCE AND TRAINING
- IT Admin Support Intern, IT Infrastructure at Asuransi Ciputra Indonesia (Ciputra Life), Oct 2025-Oct 2026. Work includes preparing and processing BPU documents in Excel, secure IT document archiving, contributing to a Cyber Threat Intelligence report using Wazuh and CrowdStrike, documenting Operations-IT meetings, and coordinating contract approvals and records.
- Korea-ASEAN Digital Academy (KADA) Bootcamp Participant at Elice, Jun 2025-present. Training covers web development, cloud, DevOps, UI/UX design, and data analysis.
- Academic and capstone work includes web, mobile, and data-driven applications.

SKILLS
- Web: HTML, CSS, JavaScript, React, Node.js, Express.
- Cybersecurity and networking tools (basic level): Kali Linux, Nmap, Burp Suite, Wireshark, Wazuh, CrowdStrike.
- Database and cloud: MongoDB, MySQL, SQL, Firebase, Supabase.
- Software and platforms: VirtualBox, Docker, Git, GitHub, VS Code, Figma, Canva, OpenDMS, Microsoft Excel (formulas, data processing, financial documentation), and Microsoft 365 (Word, PowerPoint, Teams).
- IT administration: IT documentation and compliance, document management and archiving, basic security monitoring and log analysis.
- Strengths: fast learning, organization, analytical thinking, data integrity, and adaptability.

PROJECTS
- SAKURA DMS: final capstone presented in August 2026 at President University. A document management system for organizational workflows, with document upload and categorization, role-based access control, search and filtering, version history and audit trail, approval workflow, and digital signature integration. Technologies: React, Node.js, Express, TiDB Cloud for the metadata database, DBeaver for database monitoring and ERD review, and Tailwind CSS. Do not claim Firebase, OCR, or AI chatbot features.
- MedEase: Android health app built with Java, XML, and Firebase. Includes user authentication, profile management, lab-test and doctor-appointment booking, health content, and a shake-sensor feature.
- HealthCare Diagnosis App: a web app using vanilla JavaScript and decision-tree logic to provide health recommendations based on symptoms.
- Music Discovery Platform: MERN app with Passport authentication, music posts, comments, pagination, and search; deployed to AWS EC2 with GitHub Actions CI/CD.
- Security Risk Management Dashboard: Python/Flask and MongoDB dashboard for risk visualization, access control, and downloadable compliance reports.
- Other portfolio work includes a Wumpus World AI game, SRM dashboard UI/UX, BOOSH bus-schedule UI/UX designed with Canva only, CTF participation, and a hacker-profiling OSINT project.

CONTACT
Email: arolianimunte07@gmail.com.`;

const jsonResponse = (body, status) => new Response(JSON.stringify(body), {
  status,
  headers: {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-store',
  },
});

export default async (request) => {
  if (request.method !== 'POST') {
    return jsonResponse({ error: 'Method not allowed.' }, 405);
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return jsonResponse({ error: 'The AI service is not configured.' }, 503);
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return jsonResponse({ error: 'Invalid JSON request.' }, 400);
  }

  if (!Array.isArray(body.messages) || body.messages.length === 0) {
    return jsonResponse({ error: 'At least one chat message is required.' }, 400);
  }

  const responseLanguage = body.language === 'id' ? 'Indonesian' : 'English';
  const recentMessages = body.messages.slice(-20);
  const contents = [];
  for (const message of recentMessages) {
    if (!message || !['user', 'assistant'].includes(message.role) || typeof message.text !== 'string') {
      return jsonResponse({ error: 'Invalid chat message.' }, 400);
    }

    const text = message.text.trim();
    if (!text || text.length > 4000) {
      return jsonResponse({ error: 'Chat messages must contain 1 to 4000 characters.' }, 400);
    }

    contents.push({
      role: message.role === 'assistant' ? 'model' : 'user',
      parts: [{ text }],
    });
    }
  if (contents.at(-1)?.role !== 'user') {
    return jsonResponse({ error: 'The latest chat message must be from the user.' }, 400);
  }

  try {
    const geminiResponse = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': apiKey,
      },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: `${portfolioInstructions}\n\nRespond entirely in ${responseLanguage}, regardless of the language used in earlier messages.` }] },
        contents,
      }),
      signal: AbortSignal.timeout(25000),
    });

    if (!geminiResponse.ok) {
      return jsonResponse({ error: 'The AI service request failed.' }, 502);
    }

    const result = await geminiResponse.json();
    const reply = result.candidates?.[0]?.content?.parts?.map((part) => part.text || '').join('').trim();
    if (!reply) {
      return jsonResponse({ error: 'The AI service returned an empty response.' }, 502);
    }

    return jsonResponse({ reply }, 200);
  } catch (error) {
    const status = error.name === 'TimeoutError' ? 504 : 502;
    return jsonResponse({ error: status === 504 ? 'The AI service timed out.' : 'Could not reach the AI service.' }, status);
  }
};