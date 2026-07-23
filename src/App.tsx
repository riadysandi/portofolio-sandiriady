import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { TRANSLATIONS } from './data';
import { Language } from './types';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SkillsGrid from './components/SkillsGrid';
import EducationExperience from './components/EducationExperience';
import ProjectsGallery from './components/ProjectsGallery';
import ContactForm from './components/ContactForm';
import PrintableCV from './components/PrintableCV';
import Login from './components/Login';
import AdminDashboard from './components/AdminDashboard';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { Sparkles, Heart, Mail, ExternalLink, Copyright, Terminal } from 'lucide-react';
import { trackPageView } from './lib/analytics';

export default function App() {
  const [currentLang, setCurrentLang] = useState<Language>('id');
  const [searchQuery, setSearchQuery] = useState('');
  const [isDownloading, setIsDownloading] = useState(false);
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const [route, setRoute] = useState(window.location.hash);

  // Hash-based routing & tracking
  useEffect(() => {
    const onHashChange = () => {
      setRoute(window.location.hash);
      trackPageView();
    };
    
    // Track initial load
    trackPageView();
    
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Route to Login or Admin pages
  if (route === '#/login') return <Login />;
  if (route === '#/admin') return <AdminDashboard />;

  const translations = TRANSLATIONS[currentLang];

  const handleDownloadPdf = async () => {
    setIsDownloading(true);
    try {
      // Find the target printable resume container
      const element = document.getElementById('printable-cv');
      if (!element) {
        console.error('Printable CV container was not found in the DOM.');
        setIsDownloading(false);
        return;
      }

      // Render image with html2canvas (using scale=2 for super high definition print quality)
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
      });

      const imgData = canvas.toDataURL('image/png');

      // Initialize a standard Portrait A4 Document
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      // A4 is 210mm wide x 297mm tall. Add image fitting completely in A4 bounds
      pdf.addImage(imgData, 'PNG', 0, 0, 210, 297);
      pdf.save(`Sandi_Riady_CV_${currentLang.toUpperCase()}.pdf`);
    } catch (err) {
      console.error('Failed to export PDF resume:', err);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleScrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = contactSection.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-slate-100 flex flex-col font-sans overflow-x-hidden selection:bg-emerald-500 selection:text-slate-950 relative">
      
      {/* Dynamic Cursor Light Source (Interactive Hover Glow Background) */}
      <div 
        className="pointer-events-none fixed inset-0 z-0 opacity-40 transition-opacity duration-300 hidden md:block"
        style={{
          background: `radial-gradient(750px at ${mousePos.x}px ${mousePos.y}px, rgba(16, 185, 129, 0.05), transparent 80%)`
        }}
      />

      {/* Sticky Navigation Hub */}
      <Navbar
        currentLang={currentLang}
        onLangChange={setCurrentLang}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        translations={translations}
        onDownloadPdf={handleDownloadPdf}
        isDownloading={isDownloading}
      />

      {/* Main Sections */}
      <main className="flex-grow">
        
        {/* Hero & About Me Header */}
        <Hero
          currentLang={currentLang}
          translations={translations}
          onScrollToContact={handleScrollToContact}
        />

        {/* Skills Board with Instant Search */}
        <SkillsGrid
          currentLang={currentLang}
          translations={translations}
          searchQuery={searchQuery}
        />

        {/* Career, Education & Organizations Timelines */}
        <EducationExperience
          currentLang={currentLang}
          translations={translations}
          searchQuery={searchQuery}
        />

        {/* Project Card Gallery */}
        <ProjectsGallery
          currentLang={currentLang}
          translations={translations}
          searchQuery={searchQuery}
        />

        {/* Contact Input Form & Live Inbox Database */}
        <ContactForm
          currentLang={currentLang}
          translations={translations}
        />

      </main>

      {/* Modern, Architectural Footer */}
      <footer className="bg-[#050505] border-t-2 border-slate-900 py-16 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-slate-900 border-2 border-slate-800 flex items-center justify-center">
              <Terminal className="h-4 w-4 text-emerald-400" />
            </div>
            <div className="text-left">
              <span className="font-display font-black text-slate-200 block text-sm uppercase tracking-wide">Sandi Riady Portfolio</span>
              <span className="font-mono text-[9px] text-slate-500 block font-bold uppercase tracking-widest mt-0.5">IT INFRASTRUCTURE &bull; MIS SPECIALIST</span>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-8 text-[11px] uppercase tracking-widest font-bold text-slate-400">
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-emerald-400 transition-colors cursor-pointer font-display py-1.5 leading-relaxed">
              {translations.navAbout}
            </button>
            <button onClick={() => document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-emerald-400 transition-colors cursor-pointer font-display py-1.5 leading-relaxed">
              {translations.navSkills}
            </button>
            <button onClick={() => document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-emerald-400 transition-colors cursor-pointer font-display py-1.5 leading-relaxed">
              {translations.navExperience}
            </button>
            <button onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-emerald-400 transition-colors cursor-pointer font-display py-1.5 leading-relaxed">
              {translations.navProjects}
            </button>
          </div>

          <div className="flex items-center gap-2 text-[10px] font-mono text-slate-500 font-bold uppercase tracking-wider">
            <Copyright className="h-3.5 w-3.5 text-emerald-500" />
            <span>2026 Sandi Riady. Built with React & Tailwind.</span>
          </div>
        </div>
      </footer>

      {/* 
        ================================================================================
        HIDDEN CV RENDER CONTAINER FOR AUTOMATED PDF GENERATION
        Pristine black & white A4 resume layout, fully compiled in the DOM 
        positioned out-of-bounds so it does not interfere with the active user interface.
        ================================================================================
      */}
      <div className="absolute top-[-9999px] left-[-9999px] overflow-hidden pointer-events-none">
        <PrintableCV currentLang={currentLang} />
      </div>

    </div>
  );
}
