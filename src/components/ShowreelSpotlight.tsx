import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Play, Sparkles, ExternalLink, Terminal, ShieldCheck,
  Activity, ChevronLeft, ChevronRight, Pause, Layers, Globe
} from 'lucide-react';
import { Language, Translation, LiveSite } from '../types';

interface ShowreelSpotlightProps {
  currentLang: Language;
  translations: Translation;
  sites?: LiveSite[];
  onOpenSite?: (site: LiveSite) => void;
}

export default function ShowreelSpotlight({
  currentLang,
  translations,
  sites = [],
  onOpenSite,
}: ShowreelSpotlightProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const totalSites = sites.length;
  const currentSite = sites[currentIndex] || sites[0];

  // Helper to get tailored tech tags for each project
  const getSiteTechTags = (site?: LiveSite) => {
    if (!site) return ['IT Infrastructure', 'Cloud Server', 'High Uptime'];
    const n = (site.name + ' ' + site.url).toLowerCase();
    if (n.includes('monasys') || n.includes('ticketing')) {
      return ['Laravel & Filament', 'Prometheus & Uptime', 'Internal Operations'];
    }
    if (n.includes('mafero')) {
      return ['Laravel & React Inertia', 'E-Commerce Engine', 'Multi-Store Inventory'];
    }
    if (n.includes('undangan')) {
      return ['Laravel 11 & Vue 3', 'Interactive Canvas Editor', 'Canvas Physics & QRIS'];
    }
    if (n.includes('pilkades') || n.includes('kampanye')) {
      return ['Next.js 14 App Router', 'Leaflet.js Geospatial', 'Volunteer & Aspirasi'];
    }
    if (n.includes('dinnda') || n.includes('ultah')) {
      return ['React 18 & Vite', 'Howler.js Audio Player', 'Confetti Physics'];
    }
    return ['React 19 & Tailwind v4', 'Supabase Cloud Backend', 'PDF Resume Generator'];
  };

  // Auto-rotation every 5 seconds (5000ms)
  useEffect(() => {
    if (totalSites <= 1 || isPaused) return;

    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalSites);
    }, 5000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [totalSites, isPaused, currentIndex]);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (totalSites <= 1) return;
    setCurrentIndex((prev) => (prev - 1 + totalSites) % totalSites);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (totalSites <= 1) return;
    setCurrentIndex((prev) => (prev + 1) % totalSites);
  };

  const handleExploreClick = () => {
    if (!currentSite) return;
    if (onOpenSite) {
      onOpenSite(currentSite);
    } else if (currentSite.url) {
      window.open(currentSite.url, '_blank', 'noopener,noreferrer');
    }
  };

  if (!currentSite) return null;

  const currentScreenshotCount = currentSite.screenshots?.length || (currentSite.image ? 1 : 0);
  const previewImage = currentSite.image || currentSite.screenshots?.[0] || 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80';
  const techTags = getSiteTechTags(currentSite);

  return (
    <section className="max-w-7xl mx-auto px-4 py-6 md:py-8">
      {/* ── Main Dikshant Style Showcase Card ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.3, 0, 0.1, 1] }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        className="relative rounded-3xl bg-[#12131a] border-2 border-[#232533] hover:border-[#8b5cf6]/60 transition-all duration-500 overflow-hidden shadow-2xl p-6 sm:p-8 lg:p-10"
      >
        {/* Animated Slide Progress Bar (5s Timer) */}
        {totalSites > 1 && !isPaused && (
          <motion.div
            key={`progress-${currentIndex}`}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 5, ease: 'linear' }}
            style={{ transformOrigin: 'left' }}
            className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#8b5cf6] via-[#38bdf8] to-[#ccff00] z-20 pointer-events-none"
          />
        )}

        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-8 items-center">
          
          {/* ── Left Column: Auto-Updating Title, Bio & Actions ── */}
          <div className="space-y-4 sm:space-y-6 flex flex-col justify-between">
            <div>
              {/* Section Tag & Counter */}
              <div className="flex items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-[#8b5cf6] font-marker text-lg sm:text-xl">☆</span>
                  <span className="font-marker text-xs sm:text-sm text-[#ccff00] tracking-wider uppercase">
                    {currentLang === 'en' ? 'FEATURED LIVE SYSTEM' : 'SOROTAN SISTEM AKTIF'}
                  </span>
                </div>
                {totalSites > 1 && (
                  <span className="font-mono text-xs font-bold text-slate-400 bg-black/60 border border-white/10 px-2.5 py-0.5 rounded-full">
                    <span className="text-[#ccff00] font-black">0{currentIndex + 1}</span> / 0{totalSites}
                  </span>
                )}
              </div>

              {/* Dynamic Project Name with Smooth Crossfade */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSite.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                >
                  <h2 className="font-marker text-2xl sm:text-3xl lg:text-4xl text-white tracking-wider uppercase leading-tight line-clamp-2">
                    {currentSite.name}
                  </h2>

                  <p className="mt-3 text-slate-300 text-xs sm:text-sm leading-relaxed font-sans line-clamp-3 max-w-lg">
                    {currentSite.description[currentLang]}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* CTAs & Screenshot Count Badge */}
            <div className="space-y-3 pt-1">
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={handleExploreClick}
                  className="group inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-[#ccff00] hover:bg-[#d9ff33] text-black font-marker text-xs sm:text-sm tracking-wide uppercase shadow-[0_0_20px_rgba(204,255,0,0.35)] transition-all cursor-pointer"
                >
                  <span>{currentLang === 'en' ? 'Explore Live Portal' : 'Jelajahi Portal'}</span>
                  <span className="h-5 w-5 rounded-full bg-black text-[#ccff00] flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Play className="h-2.5 w-2.5 fill-[#ccff00] ml-0.5" />
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    const el = document.getElementById('live-sites');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#1b1c28] hover:bg-white text-white hover:text-black border border-white/20 text-xs font-mono font-bold uppercase transition-all cursor-pointer"
                >
                  <Layers className="h-3.5 w-3.5 text-[#ccff00]" />
                  <span>{currentScreenshotCount} Foto Galeri</span>
                </button>
              </div>

              {/* Dynamic Tech Stack Badges */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSite.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-wrap gap-2 text-[10px] font-mono text-slate-400 pt-1"
                >
                  {techTags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2.5 py-1 rounded-lg bg-black/70 border border-white/10 flex items-center gap-1.5"
                    >
                      <Terminal className="h-3 w-3 text-[#38bdf8]" />
                      <span>{tag}</span>
                    </span>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Carousel Dot Selectors with Site Names on Hover */}
            {totalSites > 1 && (
              <div className="pt-2 flex items-center gap-2">
                {sites.map((site, sIdx) => {
                  const isActive = sIdx === currentIndex;
                  return (
                    <button
                      key={site.id}
                      type="button"
                      onClick={() => setCurrentIndex(sIdx)}
                      className={`h-2.5 rounded-full transition-all cursor-pointer ${
                        isActive
                          ? 'w-10 bg-[#ccff00] shadow-[0_0_10px_rgba(204,255,0,0.6)]'
                          : 'w-2.5 bg-white/20 hover:bg-white/50'
                      }`}
                      title={site.name}
                    />
                  );
                })}
              </div>
            )}
          </div>

          {/* ── Right Column: Dynamic Screen Mockup with Neon Glow & Auto Slide ── */}
          <div className="relative">
            <div
              onClick={handleExploreClick}
              className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden border-2 border-white/15 bg-black cursor-pointer group shadow-2xl"
            >
              {/* Animated Screenshot with Zoom / Fade */}
              <AnimatePresence mode="wait">
                <motion.img
                  key={previewImage}
                  src={previewImage}
                  alt={`${currentSite.name} Preview`}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  className="w-full h-full object-cover object-top filter brightness-90 group-hover:scale-105 group-hover:brightness-100 transition-all duration-700 ease-out"
                />
              </AnimatePresence>

              {/* Neon Cyber Dark Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent pointer-events-none" />

              {/* Center Play Button with Ping Pulse */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="relative flex items-center justify-center">
                  <span className="absolute h-16 w-16 sm:h-20 sm:w-20 rounded-full bg-[#ccff00] opacity-35 animate-ping" />
                  <div className="h-14 w-14 sm:h-18 sm:w-18 rounded-full bg-[#ccff00] text-black flex items-center justify-center shadow-[0_0_35px_rgba(204,255,0,0.7)] group-hover:scale-115 transition-transform duration-300">
                    <Play className="h-6 w-6 sm:h-8 sm:w-8 fill-black ml-1 text-black" />
                  </div>
                </div>
              </div>

              {/* Prev / Next Slide Arrows */}
              {totalSites > 1 && (
                <>
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="absolute left-2.5 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-black/80 hover:bg-[#ccff00] text-white hover:text-black border border-white/20 flex items-center justify-center transition-all cursor-pointer opacity-0 group-hover:opacity-100 z-20 shadow-xl"
                    title="Proyek Sebelumnya"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>

                  <button
                    type="button"
                    onClick={handleNext}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-black/80 hover:bg-[#ccff00] text-white hover:text-black border border-white/20 flex items-center justify-center transition-all cursor-pointer opacity-0 group-hover:opacity-100 z-20 shadow-xl"
                    title="Proyek Selanjutnya"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </>
              )}

              {/* Bottom Mockup Info Bar */}
              <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 flex items-center justify-between pointer-events-none z-10">
                <div className="max-w-[70%]">
                  <span className="text-[10px] font-mono font-bold text-[#ccff00] uppercase tracking-wider block">
                    ACTIVE LIVE SYSTEM
                  </span>
                  <span className="text-sm sm:text-base font-display font-black text-white uppercase tracking-tight truncate block">
                    {currentSite.name}
                  </span>
                </div>

                <div className="bg-black/85 backdrop-blur-sm border border-white/25 px-3 py-1.5 rounded-xl flex items-center gap-1.5 text-xs font-mono font-bold text-white group-hover:border-[#ccff00] group-hover:text-[#ccff00] transition-colors shadow-lg">
                  <span>Lihat Galeri</span>
                  <ExternalLink className="h-3 w-3" />
                </div>
              </div>
            </div>

            {/* Corner Sparks */}
            <span className="absolute -top-3 -right-3 text-[#ccff00] text-xl font-marker animate-pulse">✦</span>
            <span className="absolute -bottom-2 -left-2 text-[#8b5cf6] text-xl font-marker">✦</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
