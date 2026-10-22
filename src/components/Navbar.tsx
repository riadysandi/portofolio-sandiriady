import React, { useState } from 'react';
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

  const navItems = [
    { id: 'about', label: translations.navAbout },
    { id: 'projects', label: translations.navProjects },
    { id: 'live-sites', label: translations.navLiveSites },
    { id: 'skills', label: translations.navSkills },
    { id: 'experience', label: translations.navExperience },
    { id: 'contact', label: translations.navContact },
  ];

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-[#0b0c10]/95 backdrop-blur-md border-b border-white/10 text-slate-100 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo with Purple Liquid Splash like Dikshant */}
          <div
            className="flex-shrink-0 flex items-center cursor-pointer relative group select-none"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            {/* Background Liquid Splash */}
            <div className="absolute -top-4 -left-6 w-24 h-24 text-[#8b5cf6] opacity-90 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300 pointer-events-none -z-10">
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
          <div className="hidden lg:flex items-center gap-7 text-xs font-mono font-bold tracking-wider">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className={`relative py-1.5 transition-colors cursor-pointer ${
                activeSection === 'home' ? 'text-[#ccff00]' : 'text-slate-300 hover:text-white'
              }`}
            >
              <span>Home</span>
              {activeSection === 'home' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#ccff00] rounded-full" />
              )}
            </button>

            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`relative py-1.5 transition-colors cursor-pointer ${
                  activeSection === item.id ? 'text-[#ccff00]' : 'text-slate-300 hover:text-white'
                }`}
              >
                <span>{item.label}</span>
                {activeSection === item.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#ccff00] rounded-full" />
                )}
              </button>
            ))}
          </div>

          {/* Action Tools & Menu */}
          <div className="flex items-center gap-3">
            {/* Search Bar - Desktop */}
            <div className="hidden md:flex relative w-36 lg:w-48">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className={`h-3 w-3 ${isSearchFocused ? 'text-[#ccff00]' : 'text-slate-500'}`} />
              </div>
              <input
                type="text"
                placeholder={currentLang === 'en' ? 'Search...' : 'Cari...'}
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                className="w-full pl-8 pr-3 py-1.5 bg-[#14151f] border border-white/15 rounded-full text-[10px] font-mono font-bold text-slate-100 placeholder-slate-500 focus:outline-none focus:border-[#ccff00] focus:ring-1 focus:ring-[#ccff00]/30 transition-all uppercase"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-slate-500 hover:text-white"
                >
                  <X className="h-3 w-3" />
                </button>
              )}
            </div>

            {/* Language Switch Pill */}
            <div className="flex items-center gap-1.5 bg-[#14151f] border border-white/15 rounded-full px-2.5 py-1 text-[10px] uppercase font-mono font-bold">
              <span 
                className={`cursor-pointer transition-colors ${currentLang === 'en' ? 'text-[#ccff00] font-black' : 'text-slate-500 hover:text-white'}`}
                onClick={() => onLangChange('en')}
              >
                EN
              </span>
              <span className="text-slate-700">/</span>
              <span 
                className={`cursor-pointer transition-colors ${currentLang === 'id' ? 'text-[#ccff00] font-black' : 'text-slate-500 hover:text-white'}`}
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
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#1b1c28] hover:bg-white text-white hover:text-black border border-white/15 text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer shadow-md"
              title="Download CV (PDF)"
            >
              <Download className="h-3.5 w-3.5" />
              <span>{isDownloading ? translations.downloading : 'CV PDF'}</span>
            </motion.button>

            {/* Dikshant Style Purple Round Hamburger Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="h-10 w-10 rounded-full bg-[#8b5cf6] text-white flex items-center justify-center hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-lg shadow-[#8b5cf6]/30 lg:hidden"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#12131a] border-b border-white/10 px-4 pt-3 pb-6 space-y-3"
          >
            {/* Mobile Search */}
            <div className="relative mb-3">
              <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-500" />
              <input
                type="text"
                placeholder={translations.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-black border border-white/15 rounded-xl text-xs font-mono text-white placeholder-slate-500"
              />
            </div>

            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="w-full text-left py-2 px-3 rounded-lg text-sm font-mono font-bold text-slate-200 hover:bg-[#8b5cf6]/20 hover:text-[#ccff00] transition-colors"
              >
                {item.label}
              </button>
            ))}

            <div className="pt-2 border-t border-white/10 flex items-center justify-between">
              <button
                onClick={onDownloadPdf}
                disabled={isDownloading}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#ccff00] text-black font-marker text-xs uppercase"
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
