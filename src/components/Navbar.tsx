import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Globe, Menu, X, Download, FileText } from 'lucide-react';
import { Language, Translation } from '../types';

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

  const navItems = [
    { id: 'about', label: translations.navAbout },
    { id: 'skills', label: translations.navSkills },
    { id: 'experience', label: translations.navExperience },
    { id: 'projects', label: translations.navProjects },
    { id: 'live-sites', label: translations.navLiveSites },
    { id: 'contact', label: translations.navContact },
  ];

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of sticky navbar
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-[#0A0A0A]/95 backdrop-blur-md border-b border-slate-800 text-slate-100 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center gap-2.5 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="h-10 w-10 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center shadow-md">
              <span className="font-display text-lg font-black tracking-tighter text-emerald-400">SR<span className="text-white">.</span></span>
            </div>
            <div>
              <span className="font-display font-black tracking-tighter text-base text-white block uppercase leading-snug">Sandi Riady</span>
              <span className="font-mono text-[9px] text-emerald-400 font-bold tracking-widest uppercase block mt-1 leading-normal">MIS & IT INFRA</span>
            </div>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-xs lg:max-w-sm mx-6">
            <div className={`relative w-full transition-all duration-300 ${isSearchFocused ? 'scale-105' : ''}`}>
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <Search className={`h-3.5 w-3.5 ${isSearchFocused ? 'text-emerald-400' : 'text-slate-500'}`} />
              </div>
              <input
                type="text"
                placeholder={translations.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-lg text-[11px] font-bold tracking-wider text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-0 transition-all uppercase leading-relaxed"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-500 hover:text-white"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Navigation Items - Desktop */}
          <div className="hidden lg:flex items-center gap-8 text-[11px] uppercase tracking-[0.2em] font-bold">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="hover:text-emerald-400 text-slate-300 cursor-pointer transition-colors font-display py-2 leading-relaxed"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Action Tools */}
          <div className="hidden md:flex items-center gap-4 ml-4">
            {/* Language Switch */}
            <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-full px-3 py-2 text-[10px] uppercase tracking-[0.1em] font-bold leading-relaxed">
              <span 
                className={`cursor-pointer transition-colors ${currentLang === 'en' ? 'text-emerald-400 font-extrabold' : 'text-slate-500 hover:text-white'}`}
                onClick={() => onLangChange('en')}
              >
                EN
              </span>
              <span className="text-slate-700">|</span>
              <span 
                className={`cursor-pointer transition-colors ${currentLang === 'id' ? 'text-emerald-400 font-extrabold' : 'text-slate-500 hover:text-white'}`}
                onClick={() => onLangChange('id')}
              >
                ID
              </span>
            </div>

            {/* Download PDF */}
            <button
              onClick={onDownloadPdf}
              disabled={isDownloading}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:bg-emerald-800/80 text-slate-950 font-black text-[11px] uppercase tracking-wider hover:shadow-lg hover:shadow-emerald-500/15 active:scale-[0.98] transition-all cursor-pointer"
            >
              <Download className={`h-3.5 w-3.5 ${isDownloading ? 'animate-bounce' : ''}`} />
              <span>{isDownloading ? translations.downloading : translations.downloadButton}</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-3">
            {/* Language Switch Mobile Quick */}
            <button
              onClick={() => onLangChange(currentLang === 'en' ? 'id' : 'en')}
              className="flex items-center justify-center h-8 px-2.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 text-[10px] font-black tracking-widest cursor-pointer"
            >
              {currentLang === 'en' ? 'EN' : 'ID'}
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white cursor-pointer"
            >
              {isMobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Search & Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-slate-800 bg-[#0A0A0A]"
          >
            <div className="px-4 py-5 space-y-4">
              {/* Mobile Search Input */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-slate-500" />
                </div>
                <input
                  type="text"
                  placeholder={translations.searchPlaceholder}
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-slate-950 border border-slate-850 rounded-lg text-xs text-slate-100 placeholder-slate-600 focus:outline-none uppercase font-bold tracking-widest"
                />
              </div>

              {/* Navigation Links */}
              <div className="grid grid-cols-2 gap-2">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="flex justify-center items-center py-2.5 px-4 rounded-xl bg-slate-900 border border-slate-800 text-xs font-bold uppercase tracking-widest text-slate-300 hover:bg-slate-850 hover:text-emerald-400 cursor-pointer text-center"
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              {/* Action Buttons Mobile */}
              <div className="pt-2">
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onDownloadPdf();
                  }}
                  disabled={isDownloading}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:bg-emerald-800 text-slate-950 font-black text-xs uppercase tracking-widest"
                >
                  <Download className={`h-3.5 w-3.5 ${isDownloading ? 'animate-bounce' : ''}`} />
                  <span>{isDownloading ? translations.downloading : translations.downloadButton}</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
