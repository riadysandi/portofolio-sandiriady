import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Globe, Menu, X, Download, Sparkles } from 'lucide-react';
import { Language, Translation } from '../types';
import { LiquidSplash } from './Doodles';

interface NavbarProps {
  currentLang: Language;
  onLangChange: (lang: Language) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  translations: Translation;
  onDownloadPdf: () => void;
  isDownloading: boolean;
}

export default function Navbar({
  currentLang,
  onLangChange,
  searchQuery,
  onSearchChange,
  translations,
  onDownloadPdf,
  isDownloading,
}: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'projects', label: translations.navProjects },
    { id: 'skills', label: translations.navSkills },
    { id: 'about', label: translations.navAbout },
    { id: 'live-sites', label: translations.navLiveSites },
    { id: 'experience', label: translations.navExperience },
    { id: 'contact', label: translations.navContact },
  ];

  // Dynamic Scroll Listener: Glassmorphism effect + Active section spy
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY;
      setIsScrolled(scrollPos > 15);

      if (scrollPos < 120) {
        setActiveSection('home');
        return;
      }

      const sections = ['contact', 'experience', 'live-sites', 'about', 'skills', 'projects', 'home'];
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 160 && rect.bottom >= 100) {
            setActiveSection(sectionId);
            return;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    setActiveSection(id);

    if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // Delay scroll slightly to allow mobile menu collapse animation to avoid layout jump
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        const offset = 80;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = Math.max(0, elementPosition - offset);
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
      }
    }, 60);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 text-slate-100 transition-all duration-300 select-none ${
        isScrolled
          ? 'bg-[#0b0c10]/75 backdrop-blur-xl border-b border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.6)]'
          : 'bg-[#0b0c10]/30 backdrop-blur-md border-b border-white/5 shadow-none'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo with Purple Liquid Splash */}
          <div
            className="flex-shrink-0 flex items-center cursor-pointer relative group select-none"
            onClick={() => scrollToSection('home')}
          >
            {/* Background Liquid Splash */}
            <div className="absolute -top-4 -left-6 w-24 h-24 text-[#8b5cf6] opacity-80 group-hover:opacity-100 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 pointer-events-none -z-10">
              <LiquidSplash className="w-full h-full text-[#8b5cf6]" />
            </div>

            <div className="relative pl-1">
              <span className="font-marker text-2xl sm:text-3xl text-white tracking-wide block drop-shadow-md">
                SANDI.
              </span>
              <span className="font-mono text-[9px] text-[#ccff00] font-bold tracking-[0.2em] uppercase block -mt-1">
                IT INFRASTRUCTURE
              </span>
            </div>
          </div>

          {/* Navigation Items - Desktop */}
          <div className="hidden lg:flex items-center gap-6 text-xs font-mono font-bold tracking-wider">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`relative py-1.5 px-1 transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'text-[#ccff00] font-black scale-105'
                      : 'text-slate-300 hover:text-white hover:scale-105'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && (
                    <motion.span
                      layoutId="navIndicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#ccff00] rounded-full shadow-[0_0_10px_#ccff00]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Action Tools & Menu */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Search Bar - Desktop */}
            <div className="hidden md:flex relative w-36 lg:w-44">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className={`h-3 w-3 ${isSearchFocused ? 'text-[#ccff00]' : 'text-slate-400'}`} />
              </div>
              <input
                type="text"
                placeholder={currentLang === 'en' ? 'Search...' : 'Cari...'}
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                className="w-full pl-8 pr-3 py-1.5 bg-black/40 backdrop-blur-md border border-white/15 rounded-full text-[10px] font-mono font-bold text-slate-100 placeholder-slate-400 focus:outline-none focus:border-[#ccff00] focus:ring-1 focus:ring-[#ccff00]/40 transition-all uppercase"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-slate-400 hover:text-white"
                >
                  <X className="h-3 w-3" />
                </button>
              )}
            </div>

            {/* Language Switch Pill */}
            <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-md border border-white/15 rounded-full px-2.5 py-1 text-[10px] uppercase font-mono font-bold">
              <span 
                className={`cursor-pointer transition-colors ${currentLang === 'en' ? 'text-[#ccff00] font-black' : 'text-slate-400 hover:text-white'}`}
                onClick={() => onLangChange('en')}
              >
                EN
              </span>
              <span className="text-slate-600">/</span>
              <span 
                className={`cursor-pointer transition-colors ${currentLang === 'id' ? 'text-[#ccff00] font-black' : 'text-slate-400 hover:text-white'}`}
                onClick={() => onLangChange('id')}
              >
                ID
              </span>
            </div>

            {/* Download CV Pill Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onDownloadPdf}
              disabled={isDownloading}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white text-white hover:text-black border border-white/20 text-xs font-mono font-bold uppercase tracking-wider backdrop-blur-md transition-all cursor-pointer shadow-md"
              title="Download CV (PDF)"
            >
              <Download className="h-3.5 w-3.5" />
              <span>{isDownloading ? translations.downloading : 'CV PDF'}</span>
            </motion.button>

            {/* Mobile Round Hamburger Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="h-10 w-10 rounded-full bg-[#8b5cf6]/90 backdrop-blur-md text-white flex items-center justify-center hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-lg shadow-[#8b5cf6]/30 lg:hidden border border-white/20"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation (Translucent Glassmorphism) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden bg-[#0b0c10]/90 backdrop-blur-2xl border-b border-white/15 px-4 pt-3 pb-6 space-y-2 shadow-2xl overflow-hidden"
          >
            {/* Mobile Search */}
            <div className="relative mb-3">
              <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
              <input
                type="text"
                placeholder={translations.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-black/60 border border-white/15 rounded-xl text-xs font-mono text-white placeholder-slate-400 focus:outline-none focus:border-[#ccff00]"
              />
            </div>

            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`w-full text-left py-2.5 px-3.5 rounded-xl text-sm font-mono font-bold transition-all flex items-center justify-between cursor-pointer ${
                    isActive
                      ? 'bg-[#ccff00]/15 text-[#ccff00] border border-[#ccff00]/30 font-black'
                      : 'text-slate-200 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && <span className="h-2 w-2 rounded-full bg-[#ccff00] animate-pulse" />}
                </button>
              );
            })}

            <div className="pt-3 border-t border-white/10 flex items-center justify-between">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onDownloadPdf();
                }}
                disabled={isDownloading}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#ccff00] text-black font-marker text-xs uppercase shadow-[0_0_15px_rgba(204,255,0,0.3)] cursor-pointer"
              >
                <Download className="h-4 w-4" />
                <span>{isDownloading ? translations.downloading : translations.downloadButton}</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
