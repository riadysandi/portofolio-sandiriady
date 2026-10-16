import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { TRANSLATIONS, LIVE_SITES } from './data';
import { Language, LiveSite } from './types';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SkillsGrid from './components/SkillsGrid';
import EducationExperience from './components/EducationExperience';
import ProjectsGallery from './components/ProjectsGallery';
import LiveProjects from './components/LiveProjects';
import ContactForm from './components/ContactForm';
import TechTicker from './components/TechTicker';
import PrintableCV from './components/PrintableCV';
import Login from './components/Login';
import AdminDashboard from './components/AdminDashboard';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { Sparkles, Heart, Mail, ExternalLink, Copyright, Terminal } from 'lucide-react';
import { trackPageView } from './lib/analytics';
import { fetchSiteData } from './lib/dataService';

export default function App() {
  const [currentLang, setCurrentLang] = useState<Language>('id');
  const [searchQuery, setSearchQuery] = useState('');
  const [isDownloading, setIsDownloading] = useState(false);
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const [route, setRoute] = useState(window.location.hash);
  const [liveProjectsData, setLiveProjectsData] = useState<LiveSite[]>(LIVE_SITES);

  // Fetch dynamic live projects from Supabase
  useEffect(() => {
    fetchSiteData().then(data => {
      if (data && data.live_projects && data.live_projects.length > 0) {
        setLiveProjectsData(data.live_projects as LiveSite[]);
      }
    });
  }, []);

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
    <div className="min-h-screen bg-black text-slate-100 flex flex-col font-sans overflow-x-hidden selection:bg-emerald-500 selection:text-slate-950 relative">
      
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
          onDownloadPdf={handleDownloadPdf}
        />

        {/* Eraf Horizontal Infinite Marquee Ticker */}
        <TechTicker />

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

        {/* Live Web Projects Section */}
        <LiveProjects
          currentLang={currentLang}
          translations={translations}
          liveProjects={liveProjectsData}
        />

        {/* Contact Input Form & Live Inbox Database */}
        <ContactForm
          currentLang={currentLang}
          translations={translations}
        />

      </main>

      {/* Minimal Clean Footer */}
      <footer className="bg-black border-t border-white/10 py-6 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-center text-[11px] font-mono text-slate-500 font-bold uppercase tracking-wider">
          <span>&copy; 2026 SR. ALL RIGHTS RESERVED.</span>
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

