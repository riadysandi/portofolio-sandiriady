import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { TRANSLATIONS, LIVE_SITES } from './data';
import { Language, LiveSite } from './types';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ShowreelSpotlight from './components/ShowreelSpotlight';
import TechTicker from './components/TechTicker';
import ProjectsGallery from './components/ProjectsGallery';
import SkillsGrid from './components/SkillsGrid';
import AboutBento from './components/AboutBento';
import LiveProjects from './components/LiveProjects';
import EducationExperience from './components/EducationExperience';
import ContactForm from './components/ContactForm';
import PrintableCV from './components/PrintableCV';
import Login from './components/Login';
import AdminDashboard from './components/AdminDashboard';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { trackPageView } from './lib/analytics';
import { fetchSiteData } from './lib/dataService';

export default function App() {
  const [currentLang, setCurrentLang] = useState<Language>('id');
  const [searchQuery, setSearchQuery] = useState('');
  const [isDownloading, setIsDownloading] = useState(false);
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
    
    trackPageView();
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  // Route to Login or Admin pages
  if (route === '#/login') return <Login />;
  if (route === '#/admin') return <AdminDashboard />;

  const translations = TRANSLATIONS[currentLang];

  const handleDownloadPdf = async () => {
    setIsDownloading(true);
    try {
      const element = document.getElementById('printable-cv');
      if (!element) {
        console.error('Printable CV container was not found in the DOM.');
        setIsDownloading(false);
        return;
      }

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

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
    <div className="min-h-screen bg-[#0b0c10] text-slate-100 flex flex-col font-sans overflow-x-hidden selection:bg-[#ccff00] selection:text-black relative">
      
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

      {/* Main Content Sections */}
      <main className="flex-grow">
        
        {/* 1. Hero with Dikshant Hand-Drawn Markers, Cutout Avatar & Doodles */}
        <Hero
          currentLang={currentLang}
          translations={translations}
          onScrollToContact={handleScrollToContact}
          onDownloadPdf={handleDownloadPdf}
        />

        {/* 2. Dikshant Style SHOWREEL / System Spotlight with Auto-Rotating Projects */}
        <ShowreelSpotlight
          currentLang={currentLang}
          translations={translations}
          sites={liveProjectsData}
          onOpenSite={(site) => {
            const el = document.getElementById('live-sites');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* 3. Tech Marquee Infinite Ticker */}
        <TechTicker />

        {/* 4. Featured Projects Gallery (Dikshant 4-card grid) */}
        <ProjectsGallery
          currentLang={currentLang}
          translations={translations}
          searchQuery={searchQuery}
        />

        {/* 5. Dikshant Distinctive App Tiles Skills Grid */}
        <SkillsGrid
          currentLang={currentLang}
          translations={translations}
          searchQuery={searchQuery}
        />

        {/* 6. Dikshant Split Bento Card: FOCUS DISCIPLINE PROBLEM SOLVER + About Me */}
        <AboutBento
          currentLang={currentLang}
          translations={translations}
          onScrollToContact={handleScrollToContact}
        />

        {/* 7. Live Web Projects Section (with all 6 sites, 86 screenshots & Lightbox) */}
        <LiveProjects
          currentLang={currentLang}
          translations={translations}
          liveProjects={liveProjectsData}
        />

        {/* 8. Career, Education & Organizations Timelines */}
        <EducationExperience
          currentLang={currentLang}
          translations={translations}
          searchQuery={searchQuery}
        />

        {/* 9. Contact Form & Footer Banner (LET'S MAKE SOMETHING ROBUST!) */}
        <ContactForm
          currentLang={currentLang}
          translations={translations}
        />

      </main>

      {/* Dikshant Aesthetic Minimal Footer */}
      <footer className="bg-[#0b0c10] border-t-2 border-[#232533] py-8 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-400">
          <div className="flex items-center gap-3">
            <span className="font-marker text-white text-base">SANDI.</span>
            <span>&copy; {new Date().getFullYear()} Sandi Riady. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-4 text-[11px] uppercase tracking-wider text-slate-500">
            <a href="#about" className="hover:text-[#ccff00] transition-colors">Back to Top ↑</a>
            <span>&bull;</span>
            <a href="#/admin" className="hover:text-white transition-colors">Admin Portal</a>
          </div>
        </div>
      </footer>

      {/* Hidden CV Render Container for High-Definition PDF Generation */}
      <div className="absolute top-[-9999px] left-[-9999px] overflow-hidden pointer-events-none">
        <PrintableCV currentLang={currentLang} />
      </div>

    </div>
  );
}
