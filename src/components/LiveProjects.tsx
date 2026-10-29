import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Globe, ExternalLink, Wrench, Code2, AlertTriangle,
  Eye, ChevronLeft, ChevronRight, X, Maximize2, Layers, Lock
} from 'lucide-react';
import { Translation, Language, LiveSite } from '../types';

interface LiveProjectsProps {
  currentLang: Language;
  translations: Translation;
  liveProjects?: LiveSite[];
}

interface LightboxState {
  isOpen: boolean;
  siteName: string;
  siteUrl: string;
  images: string[];
  currentIndex: number;
}

export default function LiveProjects({ currentLang, translations, liveProjects = [] }: LiveProjectsProps) {
  // Active slide index for each site card
  const [activeSlides, setActiveSlides] = useState<Record<string, number>>({});
  
  // Fullscreen Lightbox Modal state
  const [lightbox, setLightbox] = useState<LightboxState | null>(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobile, setIsMobile] = useState(() => {
    return typeof window !== 'undefined' ? window.innerWidth < 768 : false;
  });

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Keyboard navigation for Lightbox (Esc, Left, Right)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightbox || !lightbox.isOpen) return;
      if (e.key === 'Escape') {
        setLightbox(null);
      } else if (e.key === 'ArrowLeft') {
        setLightbox(prev => prev ? {
          ...prev,
          currentIndex: (prev.currentIndex - 1 + prev.images.length) % prev.images.length
        } : null);
      } else if (e.key === 'ArrowRight') {
        setLightbox(prev => prev ? {
          ...prev,
          currentIndex: (prev.currentIndex + 1) % prev.images.length
        } : null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightbox]);

  if (!liveProjects || liveProjects.length === 0) return null;

  // Pagination calculation: 4 items per page on mobile (2 rows x 2 cols), 6 on desktop
  const itemsPerPage = isMobile ? 4 : 6;
  const totalPages = Math.ceil(liveProjects.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProjects = liveProjects.slice(startIndex, startIndex + itemsPerPage);

  const handlePrevSlide = (e: React.MouseEvent, siteId: string, total: number) => {
    e.stopPropagation();
    setActiveSlides(prev => ({
      ...prev,
      [siteId]: ((prev[siteId] || 0) - 1 + total) % total
    }));
  };

  const handleNextSlide = (e: React.MouseEvent, siteId: string, total: number) => {
    e.stopPropagation();
    setActiveSlides(prev => ({
      ...prev,
      [siteId]: ((prev[siteId] || 0) + 1) % total
    }));
  };

  const openLightbox = (siteName: string, siteUrl: string, images: string[], startIndex = 0) => {
    setLightbox({
      isOpen: true,
      siteName,
      siteUrl,
      images,
      currentIndex: startIndex
    });
  };

  return (
    <section id="live-sites" className="py-8 md:py-12 px-4 max-w-7xl mx-auto scroll-mt-24 relative">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-8">
          <div className="flex items-center gap-2">
            <h2 className="font-marker text-3xl sm:text-4xl lg:text-5xl text-white tracking-wider uppercase">
              {translations.liveSitesTitle}
            </h2>
            <span className="text-[#ccff00] text-xl font-marker animate-pulse">⚡</span>
          </div>
          <div className="text-[#8b5cf6] -mt-1 mb-2">
            <svg viewBox="0 0 160 30" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-36 sm:w-44 h-6 text-[#8b5cf6]">
              <path d="M5 15 Q 25 2, 45 15 T 85 15 T 125 15 T 155 15" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
            </svg>
          </div>
          <p className="text-slate-300 text-xs sm:text-sm max-w-2xl font-sans">
            {translations.liveSitesSubtitle}
          </p>
        </div>

        {/* Live Projects Grid: 2 columns on Mobile, 2 on MD, 3 on LG */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
          {paginatedProjects.map((site, index) => {
            const screenshots = site.screenshots && site.screenshots.length > 0
              ? site.screenshots
              : (site.image ? [site.image] : []);
            
            const currentSlide = (activeSlides[site.id] || 0) % (screenshots.length || 1);
            const activeImage = screenshots[currentSlide] || null;

            // Format URL for browser address mockup
            const cleanDisplayUrl = site.url.replace(/^https?:\/\//, '').replace(/\/$/, '');

            return (
              <motion.div
                key={site.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08, duration: 0.35, ease: [0.3, 0, 0.1, 1] }}
                whileHover={{ y: -5 }}
                className="group bg-[#12131a] border-2 border-[#232533] hover:border-[#ccff00]/60 rounded-2xl sm:rounded-3xl shadow-xl transition-all duration-300 relative flex flex-col overflow-hidden h-full"
              >
                {/* ── Browser Window Header Mockup ── */}
                <div className="bg-[#0e0f17] px-2.5 sm:px-4 py-2 sm:py-3 border-b border-white/10 flex items-center justify-between gap-1.5 sm:gap-3 select-none">
                  <div className="flex items-center gap-1 sm:gap-1.5">
                    <span className="h-1.5 w-1.5 sm:h-2.5 sm:w-2.5 rounded-full bg-red-500/70" />
                    <span className="h-1.5 w-1.5 sm:h-2.5 sm:w-2.5 rounded-full bg-yellow-500/70" />
                    <span className="h-1.5 w-1.5 sm:h-2.5 sm:w-2.5 rounded-full bg-[#ccff00]/70" />
                  </div>

                  {/* Address pill - Hidden on mobile for space */}
                  <div className="hidden sm:flex flex-1 max-w-[210px] bg-black border border-white/10 px-2.5 py-1 rounded-full items-center gap-1.5 truncate">
                    <Lock className="h-2.5 w-2.5 text-[#ccff00] shrink-0" />
                    <span className="text-[10px] font-mono text-slate-400 truncate">{cleanDisplayUrl}</span>
                  </div>

                  {/* Status Indicator */}
                  <div>
                    {site.status === 'active' && (
                      <span className="inline-flex items-center gap-1 sm:gap-1.5 px-1.5 sm:px-2.5 py-0.5 rounded-full bg-[#ccff00]/15 border border-[#ccff00]/30 text-[#ccff00] text-[8px] sm:text-[9px] font-mono font-black uppercase tracking-wider">
                        <span className="h-1 w-1 sm:h-1.5 sm:w-1.5 rounded-full bg-[#ccff00] animate-pulse" /> LIVE
                      </span>
                    )}
                    {site.status === 'maintenance' && (
                      <span className="inline-flex items-center gap-1 px-1.5 sm:px-2 py-0.5 rounded bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-[8px] sm:text-[9px] font-mono font-bold uppercase tracking-wider">
                        <Wrench className="h-2 w-2 sm:h-2.5 sm:w-2.5" /> MAINT
                      </span>
                    )}
                    {site.status === 'development' && (
                      <span className="inline-flex items-center gap-1 px-1.5 sm:px-2 py-0.5 rounded bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[8px] sm:text-[9px] font-mono font-bold uppercase tracking-wider">
                        <Code2 className="h-2 w-2 sm:h-2.5 sm:w-2.5" /> DEV
                      </span>
                    )}
                  </div>
                </div>

                {/* ── Visual Screenshot / Photo Viewport ── */}
                <div className="relative aspect-[16/10] overflow-hidden bg-black select-none">
                  {activeImage ? (
                    <div
                      onClick={() => openLightbox(site.name, site.url, screenshots, currentSlide)}
                      className="w-full h-full cursor-zoom-in relative overflow-hidden group/img"
                    >
                      {/* Active Screenshot */}
                      <AnimatePresence mode="wait">
                        <motion.img
                          key={activeImage}
                          src={activeImage}
                          alt={`${site.name} screenshot`}
                          initial={{ opacity: 0.3 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0.3 }}
                          transition={{ duration: 0.25 }}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </AnimatePresence>

                      {/* Vignette Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-30 group-hover:opacity-60 transition-opacity duration-300" />

                      {/* Desktop Zoom button on hover */}
                      <div className="hidden sm:flex absolute bottom-3 right-3 bg-black/90 hover:bg-[#ccff00] hover:text-black border border-white/20 text-white px-2 py-1 rounded-lg opacity-0 group-hover/img:opacity-100 transition-all duration-200 shadow-xl items-center gap-1.5 text-[9px] font-mono font-bold backdrop-blur-sm">
                        <Maximize2 className="h-2.5 w-2.5" />
                        <span>Galeri ({screenshots.length})</span>
                      </div>

                      {/* Multiple Screenshots Indicator Badge */}
                      {screenshots.length > 1 && (
                        <div className="absolute top-2 left-2 bg-black/85 backdrop-blur-sm border border-white/15 text-slate-200 px-1.5 sm:px-2 py-0.5 rounded text-[8px] sm:text-[10px] font-mono font-bold flex items-center gap-1 shadow-md">
                          <Layers className="h-2.5 w-2.5 text-[#ccff00]" />
                          <span>{currentSlide + 1}/{screenshots.length}</span>
                        </div>
                      )}
                    </div>
                  ) : (
                    /* Fallback Cybernetic Terminal Grid Preview */
                    <div className="w-full h-full flex flex-col items-center justify-center p-3 bg-gradient-to-br from-[#080808] to-black border-b border-white/5 relative overflow-hidden">
                      <div className="h-8 w-8 sm:h-12 sm:w-12 rounded-xl bg-black border border-white/10 flex items-center justify-center mb-1 group-hover:scale-110 transition-all duration-300">
                        <Globe className="h-4 w-4 sm:h-6 sm:w-6 text-[#ccff00]" />
                      </div>
                      <span className="text-[9px] font-mono font-bold uppercase text-slate-400">
                        Portal Online
                      </span>
                    </div>
                  )}

                  {/* Left / Right Carousel Controls for Multiple Screenshots */}
                  {screenshots.length > 1 && (
                    <>
                      <button
                        type="button"
                        onClick={(e) => handlePrevSlide(e, site.id, screenshots.length)}
                        className="absolute left-1.5 top-1/2 -translate-y-1/2 bg-black/80 hover:bg-black text-white hover:text-[#ccff00] border border-white/15 p-1 rounded-full opacity-70 sm:opacity-0 group-hover:opacity-100 transition-all cursor-pointer shadow-md z-20"
                        title="Foto Sebelumnya"
                      >
                        <ChevronLeft className="h-3 w-3" />
                      </button>
                      <button
                        type="button"
                        onClick={(e) => handleNextSlide(e, site.id, screenshots.length)}
                        className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-black/80 hover:bg-black text-white hover:text-[#ccff00] border border-white/15 p-1 rounded-full opacity-70 sm:opacity-0 group-hover:opacity-100 transition-all cursor-pointer shadow-md z-20"
                        title="Foto Selanjutnya"
                      >
                        <ChevronRight className="h-3 w-3" />
                      </button>
                    </>
                  )}
                </div>

                {/* ── Card Content ── */}
                <div className="p-2.5 sm:p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-display font-black text-xs sm:text-base text-white group-hover:text-[#ccff00] transition-colors uppercase tracking-wide mb-1 sm:mb-2 line-clamp-1">
                      {site.name}
                    </h3>
                    <p className="hidden sm:block text-slate-300 text-xs leading-relaxed font-sans line-clamp-2 mb-3">
                      {site.description[currentLang]}
                    </p>
                  </div>

                  {/* Mini Screenshot Thumbnails Strip (Desktop only to keep mobile ultra-neat) */}
                  {screenshots.length > 1 && (
                    <div className="hidden sm:block mb-4 pt-3 border-t border-white/5">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                          <Layers className="h-3 w-3 text-[#ccff00]" />
                          <span>Screenshots ({screenshots.length})</span>
                        </span>
                        <button
                          type="button"
                          onClick={() => openLightbox(site.name, site.url, screenshots, currentSlide)}
                          className="text-[10px] font-mono font-bold text-[#ccff00] hover:underline flex items-center gap-1 cursor-pointer transition-colors"
                        >
                          <span>Buka Galeri</span>
                          <Maximize2 className="h-2.5 w-2.5" />
                        </button>
                      </div>
                      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                        {screenshots.map((thumbUrl, tIdx) => (
                          <button
                            key={tIdx}
                            type="button"
                            onClick={() => setActiveSlides(prev => ({ ...prev, [site.id]: tIdx }))}
                            className={`relative h-10 w-16 rounded overflow-hidden border transition-all shrink-0 cursor-pointer ${
                              tIdx === currentSlide
                                ? 'border-[#ccff00] ring-1 ring-[#ccff00]/50 scale-105'
                                : 'border-white/10 opacity-50 hover:opacity-100'
                            }`}
                            title={`Lihat Foto ${tIdx + 1}`}
                          >
                            <img src={thumbUrl} alt="" className="w-full h-full object-cover" />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* ── Action Footer Button ── */}
                  <div className="pt-2 sm:pt-3 border-t border-white/10 mt-auto">
                    {site.status === 'active' ? (
                      <a
                        href={site.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-1.5 w-full py-2 sm:py-3 px-2 sm:px-4 rounded-full bg-[#1b1c28] border border-white/20 hover:border-[#ccff00] hover:text-black hover:bg-[#ccff00] text-white text-[10px] sm:text-xs font-marker tracking-wider uppercase transition-all duration-300 shadow-md group/btn"
                      >
                        <span>{isMobile ? 'BUKA WEB' : 'LAUNCH PORTAL'}</span>
                        <ExternalLink className="h-3 w-3 sm:h-3.5 sm:w-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                      </a>
                    ) : (
                      <div className="flex items-center justify-center gap-1 w-full py-2 sm:py-3 px-2 rounded-full bg-black/40 border border-white/5 text-slate-500 text-[9px] sm:text-xs font-mono font-bold uppercase tracking-wider cursor-not-allowed">
                        <AlertTriangle className="h-3 w-3" />
                        <span>MAINTENANCE</span>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Pagination Controls for Live Projects */}
        {totalPages > 1 && (
          <div className="mt-8 flex items-center justify-center gap-3">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-xl bg-[#12131a] border border-[#232533] text-slate-300 hover:text-white hover:border-[#ccff00] disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer"
              aria-label="Previous Page"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            <div className="flex items-center gap-1.5">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`h-8 w-8 rounded-xl font-mono text-xs font-bold transition-all cursor-pointer ${
                    currentPage === page
                      ? 'bg-[#ccff00] text-black shadow-[0_0_15px_rgba(204,255,0,0.4)]'
                      : 'bg-[#12131a] text-slate-400 border border-[#232533] hover:text-white'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>

            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-xl bg-[#12131a] border border-[#232533] text-slate-300 hover:text-white hover:border-[#ccff00] disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer"
              aria-label="Next Page"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>

      {/* ── Interactive High-Resolution Lightbox Modal ── */}
      <AnimatePresence>
        {lightbox && lightbox.isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col justify-between p-4 md:p-6"
            onClick={() => setLightbox(null)}
          >
            {/* Lightbox Header Bar */}
            <div
              className="flex items-center justify-between gap-4 pb-4 border-b border-white/10 max-w-7xl mx-auto w-full select-none"
              onClick={e => e.stopPropagation()}
            >
              <div>
                <h4 className="text-white font-mono font-bold text-sm uppercase tracking-wider">
                  {lightbox.siteName}
                </h4>
                <p className="text-[11px] font-mono text-[#ccff00] truncate mt-0.5">
                  Foto {lightbox.currentIndex + 1} dari {lightbox.images.length}
                </p>
              </div>

              <div className="flex items-center gap-3">
                {lightbox.siteUrl && (
                  <a
                    href={lightbox.siteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white hover:bg-[#ccff00] text-black text-xs font-mono font-bold uppercase transition-colors"
                  >
                    <span>Kunjungi Web</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                )}
                <button
                  type="button"
                  onClick={() => setLightbox(null)}
                  className="bg-black border border-white/20 hover:border-red-400 text-slate-300 hover:text-red-400 p-2 rounded-lg transition-colors cursor-pointer"
                  title="Tutup (Esc)"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Lightbox Main Image Viewport */}
            <div
              className="relative flex-1 flex items-center justify-center p-2 md:p-6 max-w-7xl mx-auto w-full overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              {/* Prev Button */}
              {lightbox.images.length > 1 && (
                <button
                  type="button"
                  onClick={() => setLightbox(prev => prev ? {
                    ...prev,
                    currentIndex: (prev.currentIndex - 1 + prev.images.length) % prev.images.length
                  } : null)}
                  className="absolute left-2 md:left-6 bg-black/80 hover:bg-[#ccff00] hover:text-black border border-white/20 text-white p-3 rounded-full transition-all cursor-pointer z-20 shadow-2xl"
                  title="Foto Sebelumnya (Panah Kiri)"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
              )}

              {/* Main Image with Scale Animation */}
              <AnimatePresence mode="wait">
                <motion.img
                  key={lightbox.images[lightbox.currentIndex]}
                  src={lightbox.images[lightbox.currentIndex]}
                  alt={`${lightbox.siteName} screenshot preview`}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className="max-h-[75vh] max-w-full object-contain rounded-xl border border-white/10 shadow-2xl"
                />
              </AnimatePresence>

              {/* Next Button */}
              {lightbox.images.length > 1 && (
                <button
                  type="button"
                  onClick={() => setLightbox(prev => prev ? {
                    ...prev,
                    currentIndex: (prev.currentIndex + 1) % prev.images.length
                  } : null)}
                  className="absolute right-2 md:right-6 bg-black/80 hover:bg-[#ccff00] hover:text-black border border-white/20 text-white p-3 rounded-full transition-all cursor-pointer z-20 shadow-2xl"
                  title="Foto Selanjutnya (Panah Kanan)"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              )}
            </div>

            {/* Lightbox Bottom Thumbnail Bar */}
            {lightbox.images.length > 1 && (
              <div
                className="pt-3 border-t border-white/10 max-w-5xl mx-auto w-full flex items-center justify-start sm:justify-center gap-2.5 overflow-x-auto px-4 pb-2"
                onClick={e => e.stopPropagation()}
              >
                {lightbox.images.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setLightbox(prev => prev ? { ...prev, currentIndex: idx } : null)}
                    className={`relative h-12 w-20 rounded-lg overflow-hidden border transition-all cursor-pointer shrink-0 ${
                      idx === lightbox.currentIndex
                        ? 'border-[#ccff00] ring-2 ring-[#ccff00]/50 scale-105'
                        : 'border-white/15 opacity-40 hover:opacity-100'
                    }`}
                    title={`Foto ${idx + 1}`}
                  >
                    <img src={imgUrl} alt="" className="w-full h-full object-cover" />
                    <span className="absolute bottom-0.5 right-1 text-[8px] font-mono bg-black/80 border border-white/10 px-1 rounded text-slate-300">
                      {idx + 1}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
