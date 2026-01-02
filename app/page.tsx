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
    title: "Symega Delivery Prediction System",
    shortDesc: "Smart predictive model for delivery forecasting using production and logistics data at Symega Food Ingredients.",
    fullDesc: "Developed an advanced predictive analytics system for Symega Food Ingredients that analyzes production schedules, logistics data, and historical delivery patterns. Built using Python with XGBoost and time-series forecasting models (ARIMA, Prophet) to predict delivery times with 91% accuracy. Integrated with SAP ERP system for real-time data ingestion. The system reduced delivery delays by 28% and improved customer satisfaction scores. Features automated alerts for potential bottlenecks and dynamic route recommendations.",
    tags: ['SAP', 'Python', 'XGBoost', 'Time Series', 'Production Analytics'],
    image: "https://cdn-icons-png.flaticon.com/512/411/411763.png",
    github: "https://github.com/Abteeeen",
    demo: "#",
  },
  {
    id: 19,
    title: "Symega Production Optimization Dashboard",
    shortDesc: "Real-time production analytics and optimization platform reducing waste by 32% and improving efficiency.",
    fullDesc: "Built a comprehensive production intelligence platform for Symega Food Ingredients that monitors real-time production metrics, identifies inefficiencies, and provides actionable insights. The system uses machine learning to predict production bottlenecks, optimize batch scheduling, and reduce material waste. Features include automated anomaly detection, predictive maintenance alerts, and interactive dashboards for operations teams. Integrated with production systems and SAP for seamless data flow. Resulted in 32% reduction in production waste and 18% improvement in overall equipment effectiveness (OEE).",
    tags: ['Production Analytics', 'Real-time Monitoring', 'Predictive Maintenance', 'SAP Integration', 'Dashboard'],
    image: "https://cdn-icons-png.flaticon.com/512/411/411763.png",
    github: "https://github.com/Abteeeen",
    demo: "#",
  },
  // DATA SCIENCE PROJECTS
  {
    id: 7,
    title: "Customer Churn Prediction",
    shortDesc: "XGBoost ensemble model achieving 89% precision in identifying at-risk customers.",
    fullDesc: "Advanced customer analytics solution using XGBoost and feature engineering to predict customer churn. The model analyzes behavioral patterns, transaction history, and engagement metrics. Implemented SHAP values for explainability, helping business teams understand key churn drivers. Reduced customer retention costs by 23% through proactive intervention.",
    tags: ['Python', 'XGBoost', 'Feature Engineering', 'SHAP', 'Data Science'],
    image: "https://cdn-icons-png.flaticon.com/512/3135/3135679.png",
    github: "https://github.com/Abteeeen",
    demo: "#",
  },
  {
    id: 8,
    title: "NLP Sentiment Analysis Engine",
    shortDesc: "BERT-based transformer model for real-time social media sentiment tracking.",
    fullDesc: "Production-grade NLP system using BERT transformers to analyze sentiment across multiple social media platforms. Processes 10K+ tweets per minute with 94% accuracy. Includes topic modeling using LDA and real-time dashboard for brand monitoring. Deployed on AWS with auto-scaling capabilities.",
    tags: ['NLP', 'BERT', 'Transformers', 'AWS', 'Real-time Analytics'],
    image: "https://cdn-icons-png.flaticon.com/512/3135/3135679.png",
    github: "https://github.com/Abteeeen",
    demo: "#",
  },
  {
    id: 9,
    title: "Time Series Forecasting Dashboard",
    shortDesc: "ARIMA & Prophet models for multi-variate demand forecasting with 87% MAPE accuracy.",
    fullDesc: "Comprehensive forecasting solution combining statistical models (ARIMA, SARIMA) with machine learning (Prophet, LSTM) for demand prediction. Features automated model selection, hyperparameter tuning, and confidence intervals. Interactive dashboard built with Plotly Dash for business stakeholders to explore forecasts and adjust parameters.",
    tags: ['Time Series', 'ARIMA', 'Prophet', 'LSTM', 'Plotly Dash'],
    image: "https://cdn-icons-png.flaticon.com/512/3135/3135679.png",
    github: "https://github.com/Abteeeen",
    demo: "#",
  },
  {
    id: 10,
    title: "Anomaly Detection System",
    shortDesc: "Isolation Forest & Autoencoders for detecting fraud and system anomalies in real-time.",
    fullDesc: "Hybrid anomaly detection system combining unsupervised learning techniques (Isolation Forest, DBSCAN) with deep autoencoders. Processes streaming data from IoT sensors and financial transactions. Achieved 96% recall rate in fraud detection with <2% false positives. Integrated with alerting system for immediate action.",
    tags: ['Anomaly Detection', 'Autoencoders', 'Isolation Forest', 'Real-time', 'IoT'],
    image: "https://cdn-icons-png.flaticon.com/512/3135/3135679.png",
    github: "https://github.com/Abteeeen",
    demo: "#",
  },
  // LOGISTICS PROJECTS
  {
    id: 11,
    title: "Route Optimization Engine",
    shortDesc: "Genetic Algorithm-based TSP solver reducing delivery costs by 28%.",
    fullDesc: "Advanced route optimization system solving complex Vehicle Routing Problems (VRP) with time windows and capacity constraints. Uses genetic algorithms and simulated annealing to find near-optimal solutions. Integrates with GPS tracking and real-time traffic data. Reduced fuel costs by 28% and improved on-time delivery rate to 96%.",
    tags: ['Optimization', 'Genetic Algorithms', 'VRP', 'Logistics', 'Operations Research'],
    image: "https://cdn-icons-png.flaticon.com/512/411/411763.png",
    github: "https://github.com/Abteeeen",
    demo: "#",
  },
  {
    id: 12,
    title: "Warehouse Inventory Optimization",
    shortDesc: "ML-powered inventory management reducing stockouts by 35% and excess inventory by 22%.",
    fullDesc: "Intelligent inventory management system using reinforcement learning for dynamic reorder point optimization. Analyzes demand patterns, lead times, and supplier reliability. Features ABC/XYZ analysis and automated purchase order generation. Integrated with WMS and ERP systems for seamless operations.",
    tags: ['Inventory Management', 'Reinforcement Learning', 'Supply Chain', 'WMS', 'ERP'],
    image: "https://cdn-icons-png.flaticon.com/512/411/411763.png",
    github: "https://github.com/Abteeeen",
    demo: "#",
  },
  {
    id: 13,
    title: "Freight Cost Prediction",
    shortDesc: "Gradient Boosting model predicting shipping costs with 91% accuracy across 50+ routes.",
    fullDesc: "Machine learning model predicting freight costs based on distance, fuel prices, carrier rates, and seasonal factors. Trained on 2+ years of historical shipping data. Helps procurement teams negotiate better rates and budget accurately. Features explainable AI with feature importance visualization.",
    tags: ['Cost Prediction', 'Gradient Boosting', 'Logistics Analytics', 'Cost Optimization'],
    image: "https://cdn-icons-png.flaticon.com/512/411/411763.png",
    github: "https://github.com/Abteeeen",
    demo: "#",
  },
  {
    id: 14,
    title: "Supply Chain Risk Analytics",
    shortDesc: "Multi-factor risk scoring system identifying supply chain disruptions with 85% accuracy.",
    fullDesc: "Comprehensive risk analytics platform monitoring supplier health, geopolitical factors, weather patterns, and market volatility. Uses ensemble models to generate risk scores and early warning alerts. Dashboard provides real-time visibility into supply chain vulnerabilities and recommended mitigation strategies.",
    tags: ['Risk Analytics', 'Supply Chain', 'Ensemble Models', 'Risk Management'],
    image: "https://cdn-icons-png.flaticon.com/512/411/411763.png",
    github: "https://github.com/Abteeeen",
    demo: "#",
  },
  // HR PROJECTS
  {
    id: 15,
    title: "Employee Attrition Predictor",
    shortDesc: "Random Forest model predicting employee turnover with 88% accuracy, enabling proactive retention.",
    fullDesc: "HR analytics solution predicting employee attrition risk using machine learning. Analyzes engagement surveys, performance metrics, compensation data, and tenure patterns. Provides actionable insights for HR teams to intervene early. Includes retention recommendations and cost-benefit analysis of retention strategies.",
    tags: ['HR Analytics', 'Random Forest', 'Employee Retention', 'Predictive Analytics'],
    image: "https://cdn-icons-png.flaticon.com/512/3135/3135679.png",
    github: "https://github.com/Abteeeen",
    demo: "#",
  },
  {
    id: 16,
    title: "Skills Gap Analysis Platform",
    shortDesc: "NLP-powered system mapping employee skills to job requirements and identifying training needs.",
    fullDesc: "Intelligent skills matching platform using natural language processing to analyze job descriptions, resumes, and performance reviews. Identifies skill gaps at individual and organizational levels. Recommends personalized learning paths and training programs. Integrated with LMS for seamless skill development tracking.",
    tags: ['NLP', 'Skills Analysis', 'HR Tech', 'Learning & Development'],
    image: "https://cdn-icons-png.flaticon.com/512/3135/3135679.png",
    github: "https://github.com/Abteeeen",
    demo: "#",
  },
  {
    id: 17,
    title: "Performance Prediction Model",
    shortDesc: "ML model forecasting employee performance with 82% accuracy using historical data.",
    fullDesc: "Predictive analytics tool forecasting employee performance based on historical reviews, project outcomes, and behavioral data. Helps managers identify high-potential employees and those needing support. Features explainable AI showing key performance drivers. Used for succession planning and talent development.",
    tags: ['Performance Analytics', 'Machine Learning', 'Talent Management', 'HR Tech'],
    image: "https://cdn-icons-png.flaticon.com/512/3135/3135679.png",
    github: "https://github.com/Abteeeen",
    demo: "#",
  },
  {
    id: 18,
    title: "Recruitment Matching Algorithm",
    shortDesc: "Cosine similarity & ML-based candidate-job matching reducing time-to-hire by 40%.",
    fullDesc: "Intelligent recruitment platform using semantic similarity and machine learning to match candidates with job openings. Analyzes resumes, job descriptions, and candidate profiles. Ranks candidates by fit score and provides detailed match explanations. Integrated with ATS for streamlined hiring workflow.",
    tags: ['Recruitment', 'Matching Algorithm', 'NLP', 'ATS Integration', 'HR Tech'],
    image: "https://cdn-icons-png.flaticon.com/512/3135/3135679.png",
    github: "https://github.com/Abteeeen",
    demo: "#",
  },
];


export default function Home() {
  const projectsRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const experienceRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [typedText, setTypedText] = useState('');
  
  const roles = ['Data Scientist', 'ML Engineer', 'Automation Specialist', 'AI Consultant'];
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  
  // Typing animation effect
  useEffect(() => {
    let charIndex = 0;
    let isDeleting = false;
    let timeoutId: NodeJS.Timeout;
    
    const type = () => {
      const currentRole = roles[currentRoleIndex];
      
      if (isDeleting) {
        if (charIndex > 0) {
          setTypedText(currentRole.substring(0, charIndex - 1));
          charIndex--;
          timeoutId = setTimeout(type, 50);
        } else {
          isDeleting = false;
          setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
        }
      } else {
        if (charIndex < currentRole.length) {
          setTypedText(currentRole.substring(0, charIndex + 1));
          charIndex++;
          timeoutId = setTimeout(type, 100);
        } else {
          timeoutId = setTimeout(() => {
            isDeleting = true;
            type();
          }, 2000);
        }
      }
    };
    
    type();
    return () => clearTimeout(timeoutId);
  }, [currentRoleIndex]);
  
  // --- THEME STATE ---
  const [isDark, setIsDark] = useState(true);
  
  // --- PROJECT FILTER STATE ---
  const [selectedFilter, setSelectedFilter] = useState<string>('All');
  const allTags = ['All', ...Array.from(new Set(PROJECTS.flatMap(p => p.tags)))];
  const filteredProjects = selectedFilter === 'All' 
    ? PROJECTS 
    : PROJECTS.filter(p => p.tags.includes(selectedFilter));
  
  // --- CHAT STATE ---
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user'|'ai', text: string}[]>([
    { role: 'ai', text: "Hi! I'm Abhiram's AI Agent. Ask me anything about his projects or skills." }
  ]);
  const [input, setInput] = useState('');
  const [isAiTyping, setIsAiTyping] = useState(false);

  // --- MODAL STATE ---
  const [selectedProject, setSelectedProject] = useState<typeof PROJECTS[0] | null>(null);
  
  // --- CONTACT FORM STATE ---
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  
  // --- SCROLL ANIMATION STATE ---
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  
  // Skills data
  const skills = [
    { name: 'Python', level: 95, category: 'Programming' },
    { name: 'Machine Learning', level: 90, category: 'Data Science' },
    { name: 'TensorFlow/PyTorch', level: 88, category: 'Deep Learning' },
    { name: 'n8n Automation', level: 92, category: 'Automation' },
    { name: 'SQL', level: 90, category: 'Database' },
    { name: 'React/Next.js', level: 85, category: 'Frontend' },
    { name: 'AWS Cloud', level: 82, category: 'Cloud' },
    { name: 'Docker', level: 80, category: 'DevOps' },
  ];
  
  // Experience data
  const experiences = [
    {
      year: 'Sep 2025 - Present',
      title: 'HR Analyst',
      company: 'Current Role',
      description: 'Leveraging AI and machine learning technologies to transform HR operations and drive organizational growth. Building intelligent systems for talent acquisition, employee analytics, and workforce optimization.',
      achievements: [
        'Developed AI-powered recruitment matching algorithms reducing time-to-hire by 40%',
        'Built predictive models for employee attrition with 88% accuracy',
        'Created automated resume parsing and ATS scoring systems',
        'Implemented skills gap analysis platform using NLP for personalized learning paths'
      ]
    },
    {
      year: 'Mar 2025 - Sep 2025',
      title: 'Logistics Analyst',
      company: 'Symega Food Ingredients',
      description: 'Analyzed logistics and production data to optimize supply chain operations. Developed smart predictive models for delivery forecasting and inventory management, significantly improving operational efficiency.',
      achievements: [
        'Developed predictive delivery model using SAP data, reducing delivery delays by 28%',
        'Built intelligent inventory optimization system reducing stockouts by 35%',
        'Created real-time logistics dashboard for monitoring and decision-making',
        'Implemented route optimization algorithms saving 22% on transportation costs'
      ]
    },
    {
      year: '2023 - 2025',
      title: 'Post Graduate',
      company: 'MSc Data Science with Logistics and Supply Chain Management',
      description: 'Comprehensive graduate program focusing on advanced data science techniques, machine learning, and their applications in logistics and supply chain management. Gained expertise in predictive analytics, optimization algorithms, and AI-driven solutions.',
      achievements: [
        'Specialized in time-series forecasting and demand prediction models',
        'Developed expertise in supply chain optimization and logistics analytics',
        'Completed capstone projects on ML applications in logistics and HR tech',
        'Mastered Python, SQL, TensorFlow, and advanced statistical modeling'
      ]
    },
  ];
  
  // Certifications data
  const certifications = [
    { name: 'AWS Certified Machine Learning', issuer: 'Amazon Web Services', year: '2024' },
    { name: 'TensorFlow Developer Certificate', issuer: 'Google', year: '2023' },
    { name: 'Deep Learning Specialization', issuer: 'DeepLearning.AI', year: '2023' },
    { name: 'Data Science Professional', issuer: 'IBM', year: '2022' },
  ];
  
  // Statistics
  const stats = [
    { label: 'Projects Completed', value: '18+', icon: '🚀' },
    { label: 'ML Models Deployed', value: '25+', icon: '🤖' },
    { label: 'Automation Workflows', value: '50+', icon: '⚡' },
    { label: 'Years Experience', value: '1+', icon: '💼' },
  ];
  
  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set(prev).add(entry.target.id));
          }
        });
      },
      { threshold: 0.1 }
    );
    
    const sections = document.querySelectorAll('[data-scroll-section]');
    sections.forEach((section) => observer.observe(section));
    
    return () => observer.disconnect();
  }, []);

  // Show/hide scroll to top button
  useEffect(() => {
    const handleScroll = () => {
      const scrollButton = document.getElementById('scrollToTop');
      if (scrollButton) {
        if (window.scrollY > 300) {
          scrollButton.classList.remove('opacity-0', 'pointer-events-none');
          scrollButton.classList.add('opacity-100', 'pointer-events-auto');
        } else {
          scrollButton.classList.add('opacity-0', 'pointer-events-none');
          scrollButton.classList.remove('opacity-100', 'pointer-events-auto');
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // *** PASTE YOUR LOCAL API URL HERE ***
  const N8N_WEBHOOK_URL = '/api/chat'; 

  const scrollToProjects = () => {
    projectsRef.current?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };
  const scrollToContact = () => {
    contactRef.current?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };
  const scrollToSkills = () => {
    skillsRef.current?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };
  const scrollToStats = () => {
    statsRef.current?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };
  const scrollToExperience = () => {
    experienceRef.current?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  function onLoad(spline: any) {
    setTimeout(() => setIsLoading(false), 1500);
  }

  // Handle ESC key to close modal
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedProject(null);
        setIsChatOpen(false);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  // Apply theme to document
  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  // Handle contact form submission
  async function handleContactSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    
    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
      // You can integrate with a service like Formspree, EmailJS, or your own API
      console.log('Form submitted:', contactForm);
      setSubmitStatus('success');
      setContactForm({ name: '', email: '', message: '' });
      setIsSubmitting(false);
      
      // Reset status after 3 seconds
      setTimeout(() => setSubmitStatus('idle'), 3000);
    }, 1000);
  }

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
    <div className={`${isDark ? 'bg-black' : 'bg-gray-50'} min-h-screen ${isDark ? 'text-white' : 'text-gray-900'} font-sans selection:bg-purple-500 selection:text-white overflow-x-hidden transition-colors duration-300 ${selectedProject ? 'overflow-y-hidden' : ''}`}>
      
      {/* NAVIGATION MENU */}
      <nav className={`fixed top-0 left-0 right-0 z-40 ${isDark ? 'bg-black/80' : 'bg-white/80'} backdrop-blur-xl border-b ${isDark ? 'border-zinc-800' : 'border-gray-200'} transition-all`}>
        <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} hover:text-purple-500 transition-colors`}>
            AA
          </button>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex gap-6 items-center">
            <button onClick={scrollToStats} className={`${isDark ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'} transition-colors font-medium`}>Stats</button>
            <button onClick={scrollToSkills} className={`${isDark ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'} transition-colors font-medium`}>Skills</button>
            <button onClick={scrollToExperience} className={`${isDark ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'} transition-colors font-medium`}>Experience</button>
            <button onClick={scrollToProjects} className={`${isDark ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'} transition-colors font-medium`}>Projects</button>
            <button onClick={scrollToContact} className={`${isDark ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'} transition-colors font-medium`}>Contact</button>
            <button
              onClick={() => setIsDark(!isDark)}
              className="p-2 rounded-full bg-purple-600 hover:bg-purple-500 text-white transition-all"
              aria-label="Toggle theme"
            >
              {isDark ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
                </svg>
              )}
            </button>
          </div>
          
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-purple-600 text-white"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            )}
          </button>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className={`md:hidden ${isDark ? 'bg-zinc-900' : 'bg-white'} border-t ${isDark ? 'border-zinc-800' : 'border-gray-200'} p-4 space-y-2`}>
            <button onClick={scrollToStats} className={`block w-full text-left px-4 py-2 rounded-lg ${isDark ? 'text-gray-300 hover:bg-zinc-800' : 'text-gray-700 hover:bg-gray-100'} transition-colors`}>Stats</button>
            <button onClick={scrollToSkills} className={`block w-full text-left px-4 py-2 rounded-lg ${isDark ? 'text-gray-300 hover:bg-zinc-800' : 'text-gray-700 hover:bg-gray-100'} transition-colors`}>Skills</button>
            <button onClick={scrollToExperience} className={`block w-full text-left px-4 py-2 rounded-lg ${isDark ? 'text-gray-300 hover:bg-zinc-800' : 'text-gray-700 hover:bg-gray-100'} transition-colors`}>Experience</button>
            <button onClick={scrollToProjects} className={`block w-full text-left px-4 py-2 rounded-lg ${isDark ? 'text-gray-300 hover:bg-zinc-800' : 'text-gray-700 hover:bg-gray-100'} transition-colors`}>Projects</button>
            <button onClick={scrollToContact} className={`block w-full text-left px-4 py-2 rounded-lg ${isDark ? 'text-gray-300 hover:bg-zinc-800' : 'text-gray-700 hover:bg-gray-100'} transition-colors`}>Contact</button>
          </div>
        )}
      </nav>

      {/* LOADING SCREEN */}
      <div className={`fixed inset-0 z-[100] ${isDark ? 'bg-black' : 'bg-gray-50'} flex flex-col items-center justify-center transition-opacity duration-1000 pointer-events-none ${isLoading ? 'opacity-100' : 'opacity-0'}`}>
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
            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tighter animate-fade-in">
              ABHIRAM <span className="text-purple-500">ANIL</span>
            </h1>
            <p className={`text-lg md:text-xl ${isDark ? 'text-gray-400' : 'text-gray-600'} mb-4 max-w-md leading-relaxed animate-fade-in-delay`}>
              <span className="inline-block min-w-[300px]">
                <span className="text-purple-500 font-semibold">{typedText}</span>
                <span className="animate-pulse">|</span>
              </span>
              <br />
              <span className="mt-2 block">Crafting intelligent workflows in a spatial dimension.</span>
            </p>
            <div className="flex flex-wrap gap-6 items-center">
              <button onClick={scrollToProjects} className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-full font-medium transition-all hover:scale-105 shadow-lg shadow-purple-500/30">
                View Projects
              </button>
              <div className="relative group p-[2px] rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 bg-[length:200%_auto] hover:animate-shine shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 transition-all">
                <a href="/resume.pdf.pdf" download="Abhiram_Anil_Resume.pdf" className="flex items-center gap-2 bg-black text-gray-300 hover:text-white px-8 py-3 rounded-full font-medium transition-all relative z-10">
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
        <div className={`absolute inset-0 pointer-events-none bg-gradient-to-r ${isDark ? 'from-black' : 'from-gray-50'} via-transparent to-transparent opacity-60`} />
      </main>

      {/* TECH STACK MARQUEE */}
      <div className={`w-full ${isDark ? 'bg-zinc-900' : 'bg-gray-100'} border-y ${isDark ? 'border-zinc-800' : 'border-gray-300'} py-6 overflow-hidden relative z-20`}>
        <div className="flex animate-marquee gap-12 whitespace-nowrap min-w-full">
          <TechItem name="PYTHON" icon="🐍" isDark={isDark} /><TechItem name="TENSORFLOW" icon="🧠" isDark={isDark} /><TechItem name="n8n AUTOMATION" icon="⚡" isDark={isDark} /><TechItem name="SQL" icon="💾" isDark={isDark} /><TechItem name="REACT / NEXT.JS" icon="⚛️" isDark={isDark} /><TechItem name="DOCKER" icon="🐳" isDark={isDark} /><TechItem name="AWS" icon="☁️" isDark={isDark} /><TechItem name="HR ANALYTICS" icon="📊" isDark={isDark} />
          <TechItem name="PYTHON" icon="🐍" isDark={isDark} /><TechItem name="TENSORFLOW" icon="🧠" isDark={isDark} /><TechItem name="n8n AUTOMATION" icon="⚡" isDark={isDark} /><TechItem name="SQL" icon="💾" isDark={isDark} /><TechItem name="REACT / NEXT.JS" icon="⚛️" isDark={isDark} /><TechItem name="DOCKER" icon="🐳" isDark={isDark} /><TechItem name="AWS" icon="☁️" isDark={isDark} /><TechItem name="HR ANALYTICS" icon="📊" isDark={isDark} />
        </div>
      </div>

      {/* STATISTICS SECTION */}
      <section ref={statsRef} id="stats" data-scroll-section className={`w-full py-20 px-8 md:px-20 ${isDark ? 'bg-black' : 'bg-white'} relative overflow-hidden mt-20`}>
        <div className="max-w-7xl mx-auto">
          <h2 className={`text-4xl font-bold mb-12 text-center ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Impact by Numbers
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className={`text-center p-6 rounded-2xl ${isDark ? 'bg-zinc-900 border border-zinc-800' : 'bg-gray-50 border border-gray-200'} transition-all hover:scale-105 hover:shadow-lg ${visibleSections.has('stats') ? 'animate-fade-in-up' : 'opacity-0'}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-4xl mb-3">{stat.icon}</div>
                <div className={`text-4xl font-bold mb-2 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent`}>
                  {stat.value}
                </div>
                <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SKILLS SECTION */}
      <section ref={skillsRef} id="skills" data-scroll-section className={`w-full py-24 px-8 md:px-20 ${isDark ? 'bg-zinc-950' : 'bg-gray-100'} relative`}>
        <div className="max-w-7xl mx-auto">
          <h2 className={`text-4xl font-bold mb-12 text-center ${isDark ? 'text-white' : 'text-gray-900'} border-b-4 border-purple-500 pb-4 inline-block`}>
            Technical Expertise
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            {skills.map((skill, index) => (
              <div
                key={index}
                className={`p-6 rounded-xl ${isDark ? 'bg-zinc-900 border border-zinc-800' : 'bg-white border border-gray-200'} transition-all hover:shadow-xl ${visibleSections.has('skills') ? 'animate-fade-in-up' : 'opacity-0'}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex justify-between items-center mb-2">
                  <span className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>{skill.name}</span>
                  <span className={`text-sm ${isDark ? 'text-purple-400' : 'text-purple-600'} font-bold`}>{skill.level}%</span>
                </div>
                <div className={`h-3 rounded-full overflow-hidden ${isDark ? 'bg-zinc-800' : 'bg-gray-200'}`}>
                  <div
                    className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-1000 ease-out"
                    style={{
                      width: visibleSections.has('skills') ? `${skill.level}%` : '0%',
                      transitionDelay: `${index * 0.1}s`
                    }}
                  />
                </div>
                <div className={`text-xs mt-1 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>{skill.category}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EXPERIENCE/TIMELINE SECTION */}
      <section ref={experienceRef} id="experience" data-scroll-section className={`w-full py-24 px-8 md:px-20 ${isDark ? 'bg-black' : 'bg-white'} relative`}>
        <div className="max-w-5xl mx-auto">
          <h2 className={`text-4xl font-bold mb-12 text-center ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Professional Journey
          </h2>
          <div className="relative">
            {/* Timeline line */}
            <div className={`absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 ${isDark ? 'bg-purple-500/30' : 'bg-purple-300'}`} />
            
            {experiences.map((exp, index) => (
              <div
                key={index}
                className={`relative mb-12 ${index % 2 === 0 ? 'md:pr-[calc(50%+2rem)] md:pl-0 md:text-right' : 'md:pl-[calc(50%+2rem)] md:pr-0 md:text-left'} pl-16 md:pl-0 ${visibleSections.has('experience') ? 'animate-fade-in-up' : 'opacity-0'}`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                {/* Timeline dot */}
                <div className={`absolute left-6 md:left-1/2 w-4 h-4 rounded-full ${isDark ? 'bg-purple-500' : 'bg-purple-600'} border-4 ${isDark ? 'border-black' : 'border-white'} transform md:-translate-x-1/2 z-10`} />
                
                {/* Content card */}
                <div className={`p-6 rounded-xl ${isDark ? 'bg-zinc-900 border border-zinc-800' : 'bg-gray-50 border border-gray-200'} hover:shadow-xl transition-all`}>
                  <div className={`text-sm font-bold ${isDark ? 'text-purple-400' : 'text-purple-600'} mb-2`}>{exp.year}</div>
                  <h3 className={`text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>{exp.title}</h3>
                  <div className={`text-lg mb-3 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{exp.company}</div>
                  <p className={`mb-4 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{exp.description}</p>
                  <ul className="space-y-2">
                    {exp.achievements.map((achievement, i) => (
                      <li key={i} className={`flex items-start gap-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        <span className="text-purple-500 mt-1">▸</span>
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CERTIFICATIONS SECTION */}
      <section id="certifications" data-scroll-section className={`w-full py-24 px-8 md:px-20 ${isDark ? 'bg-zinc-950' : 'bg-gray-100'} relative`}>
        <div className="max-w-7xl mx-auto">
          <h2 className={`text-4xl font-bold mb-12 text-center ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Certifications & Credentials
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {certifications.map((cert, index) => (
              <div
                key={index}
                className={`p-6 rounded-xl ${isDark ? 'bg-zinc-900 border border-zinc-800' : 'bg-white border border-gray-200'} hover:shadow-xl transition-all hover:scale-105 ${visibleSections.has('certifications') ? 'animate-fade-in-up' : 'opacity-0'}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`text-3xl mb-3 ${isDark ? 'text-purple-400' : 'text-purple-600'}`}>🏆</div>
                <h3 className={`font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>{cert.name}</h3>
                <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} mb-1`}>{cert.issuer}</div>
                <div className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>{cert.year}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS SECTION */}
      <section ref={projectsRef} className="w-full py-24 px-8 md:px-20 relative overflow-hidden min-h-screen">
        <div className="absolute inset-0 z-0"><Spline className="w-full h-full" scene="https://prod.spline.design/SBznDRFzUwtj15yo/scene.splinecode" /></div>
        <div className={`absolute inset-0 ${isDark ? 'bg-black/50' : 'bg-gray-50/80'} z-0 pointer-events-none`} />
        <div className="max-w-7xl mx-auto relative z-10">
          <h2 className="text-4xl font-bold mb-6 text-white border-l-4 border-purple-500 pl-4 drop-shadow-lg">Selected Works</h2>
          
          {/* FILTER BUTTONS */}
          <div className="flex flex-wrap gap-3 mb-12">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedFilter(tag)}
                className={`px-6 py-2 rounded-full font-medium transition-all hover:scale-105 ${
                  selectedFilter === tag
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/30'
                    : isDark 
                      ? 'bg-zinc-800 text-gray-300 hover:bg-zinc-700' 
                      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                }`}
                aria-label={`Filter by ${tag}`}
              >
                {tag}
              </button>
            ))}
          </div>
          
          {/* PROJECT GRID - NOW USING FILTERED DATA */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project) => (
                <ProjectCard 
                  key={project.id} 
                  project={project} 
                  onClick={() => setSelectedProject(project)}
                  isDark={isDark}
                />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className={`text-xl ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>No projects found with this filter.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section ref={contactRef} className={`w-full py-24 px-8 md:px-20 ${isDark ? 'bg-black' : 'bg-gray-100'} border-t ${isDark ? 'border-zinc-800' : 'border-gray-300'} z-10 relative`}>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-6 text-center text-white">Let's Build Something Intelligent</h2>
          <p className={`text-xl ${isDark ? 'text-gray-400' : 'text-gray-600'} mb-10 text-center`}>I'm currently open to opportunities in Data Science and AI Automation.</p>
          
          {/* CONTACT FORM */}
          <form onSubmit={handleContactSubmit} className="max-w-2xl mx-auto mb-10">
            <div className="space-y-6">
              <div>
                <label htmlFor="name" className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={contactForm.name}
                  onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                  required
                  className={`w-full px-4 py-3 rounded-lg border ${
                    isDark 
                      ? 'bg-zinc-900 border-zinc-700 text-white placeholder-gray-500 focus:border-purple-500' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-purple-500'
                  } focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all`}
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={contactForm.email}
                  onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                  required
                  className={`w-full px-4 py-3 rounded-lg border ${
                    isDark 
                      ? 'bg-zinc-900 border-zinc-700 text-white placeholder-gray-500 focus:border-purple-500' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-purple-500'
                  } focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all`}
                  placeholder="your.email@example.com"
                />
              </div>
              <div>
                <label htmlFor="message" className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Message
                </label>
                <textarea
                  id="message"
                  value={contactForm.message}
                  onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                  required
                  rows={5}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    isDark 
                      ? 'bg-zinc-900 border-zinc-700 text-white placeholder-gray-500 focus:border-purple-500' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-purple-500'
                  } focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all resize-none`}
                  placeholder="Tell me about your project or opportunity..."
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 text-white px-8 py-4 rounded-full text-lg font-bold transition-all hover:scale-105 shadow-lg shadow-purple-500/20 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
              {submitStatus === 'success' && (
                <div className="p-4 bg-green-500/20 border border-green-500 rounded-lg text-green-400 text-center animate-fade-in">
                  ✓ Message sent successfully! I'll get back to you soon.
                </div>
              )}
              {submitStatus === 'error' && (
                <div className="p-4 bg-red-500/20 border border-red-500 rounded-lg text-red-400 text-center animate-fade-in">
                  ✗ Something went wrong. Please try again or email directly.
                </div>
              )}
            </div>
          </form>
          
          {/* SOCIAL LINKS */}
          <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
            <a href="mailto:abhiramaanil@gmail.com" className={`${isDark ? 'bg-zinc-800' : 'bg-white border border-gray-300'} hover:bg-purple-600 hover:text-white ${isDark ? 'text-gray-300' : 'text-gray-700'} px-8 py-4 rounded-full text-lg font-bold transition-all hover:scale-105 shadow-lg`}>
              abhiramaanil@gmail.com
            </a>
            <div className="flex gap-4">
              <a href="https://www.linkedin.com/in/abhiram-anil-092946223/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className={`p-4 ${isDark ? 'bg-zinc-800' : 'bg-white border border-gray-300'} rounded-full hover:bg-white hover:text-black transition-all`}>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
              <a href="https://github.com/Abteeeen" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className={`p-4 ${isDark ? 'bg-zinc-800' : 'bg-white border border-gray-300'} rounded-full hover:bg-white hover:text-black transition-all`}>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className={`w-full py-6 text-center ${isDark ? 'text-gray-600' : 'text-gray-500'} text-sm ${isDark ? 'bg-black' : 'bg-gray-100'} relative z-10`}>
        <p>© {new Date().getFullYear()} Abhiram Anil. Built with Next.js & Spline.</p>
      </footer>

      {/* SCROLL TO TOP BUTTON */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-24 right-8 z-50 bg-zinc-800 hover:bg-purple-600 text-white p-3 rounded-full shadow-2xl hover:scale-110 transition-all opacity-0 pointer-events-none"
        id="scrollToTop"
        aria-label="Scroll to top"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18" />
        </svg>
      </button>

      {/* FLOATING CHAT BUTTON */}
      <button 
        onClick={() => setIsChatOpen(!isChatOpen)}
        className="fixed bottom-8 right-8 z-50 bg-purple-600 hover:bg-purple-500 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-all group"
        aria-label="Open chat"
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
        <div className={`fixed bottom-24 right-8 z-50 w-80 md:w-96 ${isDark ? 'bg-zinc-900/90' : 'bg-white/90'} backdrop-blur-xl border ${isDark ? 'border-zinc-700' : 'border-gray-300'} rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-fade-in-up`}>
          <div className="bg-purple-900/50 p-4 border-b border-zinc-700 flex items-center gap-3">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <h3 className="font-bold text-white">Abhiram's AI Assistant</h3>
          </div>
          <div className="h-80 overflow-y-auto p-4 flex flex-col gap-3 scrollbar-thin scrollbar-thumb-zinc-700">
            {messages.map((msg, i) => (
              <div key={i} className={`max-w-[80%] p-3 rounded-xl text-sm ${msg.role === 'user' ? 'bg-purple-600 text-white self-end' : isDark ? 'bg-zinc-800 text-gray-300 self-start' : 'bg-gray-200 text-gray-800 self-start'}`}>
                {msg.text}
              </div>
            ))}
            {isAiTyping && <div className={`text-xs italic ml-2 ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>Thinking...</div>}
          </div>
          <div className={`p-3 border-t ${isDark ? 'border-zinc-700 bg-zinc-900/50' : 'border-gray-300 bg-gray-50/50'}`}>
            <div className="flex gap-2">
              <input 
                type="text" 
                value={input} 
                onChange={(e) => setInput(e.target.value)} 
                onKeyDown={(e) => e.key === 'Enter' && handleSend()} 
                placeholder="Ask about n8n or projects..." 
                className={`flex-grow ${isDark ? 'bg-zinc-800 text-white border-zinc-700 placeholder-gray-500' : 'bg-white text-gray-900 border-gray-300 placeholder-gray-400'} text-sm rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 border`}
                aria-label="Chat input"
              />
              <button onClick={handleSend} className="bg-purple-600 hover:bg-purple-500 text-white p-2 rounded-full transition-colors" aria-label="Send message">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" /></svg>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* === PROJECT DETAIL MODAL (NEW!) === */}
      {selectedProject && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4" onClick={() => setSelectedProject(null)} role="dialog" aria-modal="true" aria-labelledby="project-modal-title">
          {/* Backdrop */}
          <div className={`absolute inset-0 ${isDark ? 'bg-black/80' : 'bg-gray-900/80'} backdrop-blur-sm`}></div>
          
          {/* Modal Content */}
          <div 
            className={`${isDark ? 'bg-zinc-900 border-zinc-700' : 'bg-white border-gray-300'} border w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl relative z-10 shadow-2xl animate-scale-up`}
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
                <h2 id="project-modal-title" className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-2`}>{selectedProject.title}</h2>
                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedProject.tags.map(tag => (
                    <span key={tag} className="text-xs font-medium bg-purple-900/40 text-purple-200 px-3 py-1 rounded-full border border-purple-500/30">{tag}</span>
                  ))}
                </div>
                
                <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'} text-lg leading-relaxed mb-8`}>
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
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .animate-fade-in { animation: fadeIn 0.5s ease-out forwards; }
        .animate-fade-in-delay { animation: fadeIn 0.8s ease-out forwards; }
        html { scroll-behavior: smooth; }
        @media (prefers-reduced-motion: reduce) {
          html { scroll-behavior: auto; }
          * { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; transition-duration: 0.01ms !important; }
        }
      `}</style>
    </div>
  );
}

function TechItem({ name, icon, isDark }: { name: string, icon: string, isDark: boolean }) { 
  return (
    <div className={`flex items-center gap-2 text-xl font-bold ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}>
      <span className="text-2xl">{icon}</span>
      <span>{name}</span>
    </div>
  ); 
}

// Updated Project Card to accept props and onClick
function ProjectCard({ project, onClick, isDark }: { project: any, onClick: () => void, isDark: boolean }) { 
  return (
    <div 
      onClick={onClick}
      className={`${isDark ? 'bg-black/60 hover:bg-black/80 border-zinc-700' : 'bg-white/80 hover:bg-white border-gray-300'} backdrop-blur-xl p-6 rounded-2xl transition-all border hover:border-purple-500 group flex flex-col h-full shadow-2xl cursor-pointer hover:scale-[1.02] animate-fade-in`}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
      aria-label={`View details for ${project.title}`}
    >
      <div className="flex items-center gap-4 mb-4">
        <div className={`w-12 h-12 relative ${isDark ? 'bg-zinc-800 border-zinc-700' : 'bg-gray-100 border-gray-300'} rounded-lg p-2 border`}>
           <img src={project.image} alt={project.title} className="w-full h-full object-contain" />
        </div>
        <h3 className={`text-xl font-bold ${isDark ? 'text-white group-hover:text-purple-400' : 'text-gray-900 group-hover:text-purple-600'} transition-colors`}>{project.title}</h3>
      </div>
      <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'} mb-6 leading-relaxed flex-grow line-clamp-3`}>{project.shortDesc}</p>
      <div className="flex flex-wrap gap-2 mt-auto">
        {project.tags.map((tag: string) => <span key={tag} className="text-xs font-medium bg-purple-900/40 text-purple-200 px-3 py-1 rounded-full border border-purple-500/30">{tag}</span>)}
      </div>
    </div>
  ); 
}