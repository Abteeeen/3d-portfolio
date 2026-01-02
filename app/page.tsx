'use client';

import Spline from '@splinetool/react-spline';
import { useRef, useState, useEffect } from 'react';

// --- PROJECT DATA (Edit your links here!) ---
const PROJECTS = [
  {
    id: 1,
    title: "n8n Blog Agent",
    shortDesc: "Automated AI writing agent using Notion & Google Grounding.",
    fullDesc: "An advanced automation workflow built in n8n that acts as an autonomous content writer. It monitors industry news using Google Grounding, drafts articles, and publishes them directly to a Notion database. It uses OpenAI GPT-4o for content generation and webhooks for real-time triggers.",
    tags: ['n8n', 'AI Agent', 'Notion', 'Webhooks'],
    image: "https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png",
    github: "https://github.com/Abteeeen", // Replace with specific repo link if you have one
    demo: "#",
  },
  {
    id: 2,
    title: "n8n Resume ATS",
    shortDesc: "Automated Resume parser and ATS scorer built with n8n workflows.",
    fullDesc: "A Hiring Automation tool that parses incoming resumes (PDFs) using OCR and AI. It scores candidates against job descriptions, extracts key skills, and auto-populates an HR database. Drastically reduces screening time for recruiters.",
    tags: ['n8n', 'HR Tech', 'Parsing', 'OpenAI'],
    image: "https://cdn-icons-png.flaticon.com/512/3135/3135679.png",
    github: "https://github.com/Abteeeen",
    demo: "#",
  },
  {
    id: 3,
    title: "Stock Prediction",
    shortDesc: "Hybrid LSTM & Random Forest model improving accuracy by 15%.",
    fullDesc: "A financial modeling project predicting stock market trends. Uses a hybrid approach combining LSTM (Long Short-Term Memory) neural networks for time-series data and Random Forest for feature classification. Achieved a 15% improvement in prediction accuracy over baseline models.",
    tags: ['Python', 'ML', 'LSTM', 'Pandas'],
    image: "https://cdn-icons-png.flaticon.com/512/3314/3314323.png",
    github: "https://github.com/Abteeeen",
    demo: "#",
  },
  {
    id: 4,
    title: "Medical Imaging",
    shortDesc: "Deep Learning (Swin Transformer) model with 92% accuracy.",
    fullDesc: "Computer Vision project for detecting anomalies in medical X-rays. Utilizes the Swin Transformer architecture to handle high-resolution image data efficiently. The model achieved 92% accuracy in identifying specific pathologies in the test dataset.",
    tags: ['Deep Learning', 'TensorFlow', 'Computer Vision'],
    image: "https://cdn-icons-png.flaticon.com/512/3004/3004458.png",
    github: "https://github.com/Abteeeen",
    demo: "#",
  },
  {
    id: 5,
    title: "Parkinson’s AI",
    shortDesc: "Django web app for early disease prediction using SVM.",
    fullDesc: "A web-based diagnostic support tool built with Django. It uses Support Vector Machines (SVM) to analyze voice recording features and predict the early onset of Parkinson's disease. Includes a user-friendly frontend for doctors to input patient data.",
    tags: ['Django', 'SVM', 'Health Tech', 'Scikit-learn'],
    image: "https://cdn-icons-png.flaticon.com/512/2083/2083213.png",
    github: "https://github.com/Abteeeen",
    demo: "#",
  },
  {
    id: 6,
    title: "Logistics Forecast",
    shortDesc: "Predictive delivery model for Symega using SAP data.",
    fullDesc: "Supply chain optimization project analyzing SAP ERP data. Built predictive models in Python to forecast delivery times and identify bottlenecks in the logistics network, leading to potential operational cost savings.",
    tags: ['SAP', 'Python', 'Analytics', 'Data Viz'],
    image: "https://cdn-icons-png.flaticon.com/512/411/411763.png",
    github: "https://github.com/Abteeeen",
    demo: "#",
  },
];


export default function Home() {
  const projectsRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // --- CHAT STATE ---
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user'|'ai', text: string}[]>([
    { role: 'ai', text: "Hi! I'm Abhiram's AI Agent. Ask me anything about his projects or skills." }
  ]);
  const [input, setInput] = useState('');
  const [isAiTyping, setIsAiTyping] = useState(false);

  // --- MODAL STATE ---
  const [selectedProject, setSelectedProject] = useState<typeof PROJECTS[0] | null>(null);

  // *** PASTE YOUR LOCAL API URL HERE ***
  const N8N_WEBHOOK_URL = '/api/chat'; 

  const scrollToProjects = () => projectsRef.current?.scrollIntoView({ behavior: 'smooth' });
  const scrollToContact = () => contactRef.current?.scrollIntoView({ behavior: 'smooth' });

  function onLoad(spline: any) {
    setTimeout(() => setIsLoading(false), 1500);
  }

  // Handle ESC key to close modal
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedProject(null);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  // --- HANDLE CHAT SUBMIT ---
  async function handleSend() {
    if (!input.trim()) return;
    const userMsg = input;
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');
    setIsAiTyping(true);

    try {
      const res = await fetch(N8N_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg })
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: 'ai', text: data.reply || "I'm having trouble connecting to Abhiram's brain right now." }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'ai', text: "Error: Could not reach the automation server." }]);
    }
    setIsAiTyping(false);
  }

  return (
    <div className={`bg-black min-h-screen text-white font-sans selection:bg-purple-500 selection:text-white overflow-x-hidden ${selectedProject ? 'overflow-y-hidden' : ''}`}>
      
      {/* LOADING SCREEN */}
      <div className={`fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center transition-opacity duration-1000 pointer-events-none ${isLoading ? 'opacity-100' : 'opacity-0'}`}>
        <div className="relative flex items-center justify-center">
          <div className="w-24 h-24 border-4 border-purple-900 rounded-full animate-ping absolute opacity-20"></div>
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
        <p className="text-purple-400 text-sm font-mono mt-4 animate-pulse tracking-widest">INITIALIZING AI AGENT...</p>
      </div>

      {/* HERO SECTION */}
      <main className="h-screen w-full relative flex flex-col md:flex-row overflow-hidden">
        <div className="w-full md:w-1/2 flex flex-col justify-center px-8 md:px-20 z-10 h-1/2 md:h-full pointer-events-none">
          <div className="pointer-events-auto">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tighter">
              ABHIRAM <span className="text-purple-500">ANIL</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-400 mb-8 max-w-md leading-relaxed">
              Data Scientist & Automation Engineer. 
              <br />
              Crafting intelligent workflows in a spatial dimension.
            </p>
            <div className="flex flex-wrap gap-6 items-center">
              <button onClick={scrollToProjects} className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-full font-medium transition-all hover:scale-105 shadow-lg shadow-purple-500/30">
                View Projects
              </button>
              <div className="relative group p-[2px] rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 bg-[length:200%_auto] hover:animate-shine shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 transition-all">
                <a href="/resume.pdf" download="Abhiram_Anil_Resume.pdf" className="flex items-center gap-2 bg-black text-gray-300 hover:text-white px-8 py-3 rounded-full font-medium transition-all relative z-10">
                  <span>Download CV</span>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 group-hover:translate-y-1 transition-transform text-purple-400"><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M12 12.75l-3.75-3.75M12 12.75l3.75-3.75M12 12.75V3" /></svg>
                </a>
                <div className="absolute inset-0 bg-purple-500 blur-md opacity-0 group-hover:opacity-30 rounded-full transition-opacity duration-500"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/2 h-1/2 md:h-full relative">
          <div className="w-full h-full pointer-events-none md:pointer-events-auto">
            <Spline className="w-full h-full" onLoad={onLoad} scene="https://prod.spline.design/qqfjUoZPYwP40QAX/scene.splinecode" />
          </div>
        </div>
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-black via-transparent to-transparent opacity-60" />
      </main>

      {/* TECH STACK MARQUEE */}
      <div className="w-full bg-zinc-900 border-y border-zinc-800 py-6 overflow-hidden relative z-20">
        <div className="flex animate-marquee gap-12 whitespace-nowrap min-w-full">
          <TechItem name="PYTHON" icon="🐍" /><TechItem name="TENSORFLOW" icon="🧠" /><TechItem name="n8n AUTOMATION" icon="⚡" /><TechItem name="SQL" icon="💾" /><TechItem name="REACT / NEXT.JS" icon="⚛️" /><TechItem name="DOCKER" icon="🐳" /><TechItem name="AWS" icon="☁️" /><TechItem name="HR ANALYTICS" icon="📊" />
          <TechItem name="PYTHON" icon="🐍" /><TechItem name="TENSORFLOW" icon="🧠" /><TechItem name="n8n AUTOMATION" icon="⚡" /><TechItem name="SQL" icon="💾" /><TechItem name="REACT / NEXT.JS" icon="⚛️" /><TechItem name="DOCKER" icon="🐳" /><TechItem name="AWS" icon="☁️" /><TechItem name="HR ANALYTICS" icon="📊" />
        </div>
      </div>

      {/* PROJECTS SECTION */}
      <section ref={projectsRef} className="w-full py-24 px-8 md:px-20 relative overflow-hidden min-h-screen">
        <div className="absolute inset-0 z-0"><Spline className="w-full h-full" scene="https://prod.spline.design/SBznDRFzUwtj15yo/scene.splinecode" /></div>
        <div className="absolute inset-0 bg-black/50 z-0 pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10">
          <h2 className="text-4xl font-bold mb-12 text-white border-l-4 border-purple-500 pl-4 drop-shadow-lg">Selected Works</h2>
          
          {/* PROJECT GRID - NOW USING MAPPED DATA */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PROJECTS.map((project) => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                onClick={() => setSelectedProject(project)} 
              />
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section ref={contactRef} className="w-full py-24 px-8 md:px-20 bg-black border-t border-zinc-800 z-10 relative">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6 text-white">Let's Build Something Intelligent</h2>
          <p className="text-xl text-gray-400 mb-10">I'm currently open to opportunities in Data Science and AI Automation.</p>
          <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
            <a href="mailto:abhiramaanil@gmail.com" className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-full text-lg font-bold transition-all hover:scale-105 shadow-lg shadow-purple-500/20">abhiramaanil@gmail.com</a>
            <div className="flex gap-4">
              <a href="https://www.linkedin.com/in/abhiram-anil-092946223/" target="_blank" className="p-4 bg-zinc-800 rounded-full hover:bg-white hover:text-black transition-all">LinkedIn</a>
              <a href="https://github.com/Abteeeen" target="_blank" className="p-4 bg-zinc-800 rounded-full hover:bg-white hover:text-black transition-all">GitHub</a>
            </div>
          </div>
        </div>
      </section>

      <footer className="w-full py-6 text-center text-gray-600 text-sm bg-black relative z-10"><p>© {new Date().getFullYear()} Abhiram Anil.</p></footer>

      {/* FLOATING CHAT BUTTON */}
      <button 
        onClick={() => setIsChatOpen(!isChatOpen)}
        className="fixed bottom-8 right-8 z-50 bg-purple-600 hover:bg-purple-500 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-all group"
      >
        {isChatOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
        ) : (
          <div className="relative">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" /></svg>
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse border border-black"></span>
          </div>
        )}
      </button>

      {/* CHAT WINDOW */}
      {isChatOpen && (
        <div className="fixed bottom-24 right-8 z-50 w-80 md:w-96 bg-zinc-900/90 backdrop-blur-xl border border-zinc-700 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-fade-in-up">
          <div className="bg-purple-900/50 p-4 border-b border-zinc-700 flex items-center gap-3">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <h3 className="font-bold text-white">Abhiram's AI Assistant</h3>
          </div>
          <div className="h-80 overflow-y-auto p-4 flex flex-col gap-3 scrollbar-thin scrollbar-thumb-zinc-700">
            {messages.map((msg, i) => (
              <div key={i} className={`max-w-[80%] p-3 rounded-xl text-sm ${msg.role === 'user' ? 'bg-purple-600 text-white self-end' : 'bg-zinc-800 text-gray-300 self-start'}`}>
                {msg.text}
              </div>
            ))}
            {isAiTyping && <div className="text-gray-500 text-xs italic ml-2">Thinking...</div>}
          </div>
          <div className="p-3 border-t border-zinc-700 bg-zinc-900/50">
            <div className="flex gap-2">
              <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSend()} placeholder="Ask about n8n or projects..." className="flex-grow bg-zinc-800 text-white text-sm rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 border border-zinc-700 placeholder-gray-500" />
              <button onClick={handleSend} className="bg-purple-600 hover:bg-purple-500 text-white p-2 rounded-full transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" /></svg>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* === PROJECT DETAIL MODAL (NEW!) === */}
      {selectedProject && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4" onClick={() => setSelectedProject(null)}>
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm"></div>
          
          {/* Modal Content */}
          <div 
            className="bg-zinc-900 border border-zinc-700 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl relative z-10 shadow-2xl animate-scale-up"
            onClick={(e) => e.stopPropagation()} // Prevent close when clicking inside
          >
            {/* Close Button */}
            <button 
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black rounded-full text-white transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>

            <div className="flex flex-col md:flex-row">
              {/* Left: Image */}
              <div className="w-full md:w-1/2 h-64 md:h-auto bg-zinc-800 p-8 flex items-center justify-center border-b md:border-b-0 md:border-r border-zinc-700">
                <img src={selectedProject.image} alt={selectedProject.title} className="max-w-[80%] max-h-[80%] object-contain drop-shadow-2xl" />
              </div>

              {/* Right: Details */}
              <div className="w-full md:w-1/2 p-8 flex flex-col">
                <h2 className="text-3xl font-bold text-white mb-2">{selectedProject.title}</h2>
                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedProject.tags.map(tag => (
                    <span key={tag} className="text-xs font-medium bg-purple-900/40 text-purple-200 px-3 py-1 rounded-full border border-purple-500/30">{tag}</span>
                  ))}
                </div>
                
                <p className="text-gray-300 text-lg leading-relaxed mb-8">
                  {selectedProject.fullDesc}
                </p>

                <div className="mt-auto flex gap-4">
                  {/* View Code Button */}
                  <a href={selectedProject.github} target="_blank" rel="noopener noreferrer" className="flex-1 bg-white text-black font-bold py-3 rounded-full hover:bg-gray-200 transition-all flex items-center justify-center gap-2">
                    <svg role="img" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
                    View Code
                  </a>
                  {/* Live Demo Button (Optional) */}
                  <a href={selectedProject.demo} className="flex-1 border border-zinc-600 hover:border-white text-white font-bold py-3 rounded-full hover:bg-white/10 transition-all flex items-center justify-center">
                    Live Demo
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Global Styles */}
      <style jsx global>{`
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .animate-marquee { animation: marquee 20s linear infinite; }
        @keyframes shine { to { background-position: 200% center; } }
        .animate-shine:hover { animation: shine 1.5s linear infinite; }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in-up { animation: fadeInUp 0.3s ease-out forwards; }
        @keyframes scaleUp { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
        .animate-scale-up { animation: scaleUp 0.2s ease-out forwards; }
      `}</style>
    </div>
  );
}

function TechItem({ name, icon }: { name: string, icon: string }) { return <div className="flex items-center gap-2 text-xl font-bold text-gray-400 hover:text-white transition-colors"><span className="text-2xl">{icon}</span><span>{name}</span></div>; }

// Updated Project Card to accept props and onClick
function ProjectCard({ project, onClick }: { project: any, onClick: () => void }) { 
  return (
    <div 
      onClick={onClick}
      className="bg-black/60 backdrop-blur-xl p-6 rounded-2xl hover:bg-black/80 transition-all border border-zinc-700 hover:border-purple-500 group flex flex-col h-full shadow-2xl cursor-pointer hover:scale-[1.02]"
    >
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 relative bg-zinc-800 rounded-lg p-2 border border-zinc-700">
           <img src={project.image} alt={project.title} className="w-full h-full object-contain" />
        </div>
        <h3 className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors">{project.title}</h3>
      </div>
      <p className="text-gray-300 mb-6 leading-relaxed flex-grow line-clamp-3">{project.shortDesc}</p>
      <div className="flex flex-wrap gap-2 mt-auto">
        {project.tags.map((tag: string) => <span key={tag} className="text-xs font-medium bg-purple-900/40 text-purple-200 px-3 py-1 rounded-full border border-purple-500/30">{tag}</span>)}
      </div>
    </div>
  ); 
}