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
    <section id="live-sites" className="py-8 md:py-12 px-4 max-w-7xl mx-auto scroll-mt-20 relative">
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

        {/* Live Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {liveProjects.map((site, index) => {
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
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.45, ease: [0.3, 0, 0.1, 1] }}
                whileHover={{ y: -6 }}
                className="group bg-[#12131a] border-2 border-[#232533] hover:border-[#ccff00]/60 rounded-3xl shadow-2xl transition-all duration-300 relative flex flex-col overflow-hidden h-full"
              >
                {/* ── Browser Window Header Mockup ── */}
                <div className="bg-[#0e0f17] px-4 py-3 border-b border-white/10 flex items-center justify-between gap-3 select-none">
                  <div className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-red-500/60 group-hover:bg-red-500 transition-colors" />
                    <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/60 group-hover:bg-yellow-500 transition-colors" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#ccff00]/60 group-hover:bg-[#ccff00] transition-colors" />
                  </div>

                  {/* Address pill */}
                  <div className="flex-1 max-w-[180px] sm:max-w-[210px] bg-black border border-white/10 px-2.5 py-1 rounded-full flex items-center gap-1.5 truncate">
                    <Lock className="h-2.5 w-2.5 text-[#ccff00] shrink-0" />
                    <span className="text-[10px] font-mono text-slate-400 truncate">{cleanDisplayUrl}</span>
                  </div>

                  {/* Status Indicator */}
                  <div>
                    {site.status === 'active' && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#ccff00]/15 border border-[#ccff00]/30 text-[#ccff00] text-[9px] font-mono font-black uppercase tracking-wider">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#ccff00] animate-pulse" /> LIVE
                      </span>
                    )}
                    {site.status === 'maintenance' && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-[9px] font-mono font-bold uppercase tracking-wider">
                        <Wrench className="h-2.5 w-2.5" /> MAINT
                      </span>
                    )}
                    {site.status === 'development' && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[9px] font-mono font-bold uppercase tracking-wider">
                        <Code2 className="h-2.5 w-2.5" /> DEV
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
                          initial={{ opacity: 0.3, scale: 1.02 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0.3 }}
                          transition={{ duration: 0.35, ease: 'easeOut' }}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        />
                      </AnimatePresence>

                      {/* Vignette / Overlay on hover */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-40 group-hover:opacity-75 transition-opacity duration-300" />

                      {/* Zoom / Fullscreen Gallery button on hover */}
                      <div className="absolute bottom-3 right-3 bg-black/90 hover:bg-emerald-400 hover:text-black border border-white/20 text-white px-2.5 py-1.5 rounded-lg opacity-0 group-hover/img:opacity-100 transition-all duration-200 shadow-xl flex items-center gap-1.5 text-[10px] font-mono font-bold backdrop-blur-sm">
                        <Maximize2 className="h-3 w-3 text-emerald-400 group-hover:text-black transition-colors" />
                        <span>Buka Galeri Foto ({screenshots.length})</span>
                      </div>

                      {/* Multiple Screenshots Indicator Badge */}
                      {screenshots.length > 1 && (
                        <div className="absolute top-3 left-3 bg-black/85 backdrop-blur-sm border border-white/15 text-slate-200 px-2.5 py-1 rounded-md text-[10px] font-mono font-bold flex items-center gap-1.5 shadow-lg">
                          <Layers className="h-3 w-3 text-emerald-400" />
                          <span>{currentSlide + 1} / {screenshots.length}</span>
                        </div>
                      )}
                    </div>
                  ) : (
                    /* Fallback Cybernetic Terminal Grid Preview */
                    <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-br from-[#080808] to-black border-b border-white/5 relative overflow-hidden">
                      <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:16px_16px] opacity-10" />
                      <div className="h-12 w-12 rounded-xl bg-black border border-white/10 flex items-center justify-center mb-3 group-hover:border-emerald-400/50 group-hover:scale-110 transition-all duration-300 relative z-10">
                        <Globe className="h-6 w-6 text-emerald-400 animate-pulse" />
                      </div>
                      <span className="text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-slate-400 relative z-10">
                        Live System Specification
                      </span>
                      <span className="text-[9px] font-mono text-slate-600 mt-1 relative z-10">
                        PORTAL ONLINE // ACTIVE ENDPOINT
                      </span>
                    </div>
                  )}

                  {/* Left / Right Carousel Controls for Multiple Screenshots */}
                  {screenshots.length > 1 && (
                    <>
                      <button
                        type="button"
                        onClick={(e) => handlePrevSlide(e, site.id, screenshots.length)}
                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-black text-white hover:text-emerald-400 border border-white/15 p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200 cursor-pointer shadow-xl z-20"
                        title="Foto Sebelumnya"
                      >
                        <ChevronLeft className="h-3.5 w-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={(e) => handleNextSlide(e, site.id, screenshots.length)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-black text-white hover:text-emerald-400 border border-white/15 p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200 cursor-pointer shadow-xl z-20"
                        title="Foto Selanjutnya"
                      >
                        <ChevronRight className="h-3.5 w-3.5" />
                      </button>
                    </>
                  )}
                </div>

                {/* ── Card Content ── */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-display font-black text-lg text-white group-hover:text-emerald-300 transition-colors uppercase tracking-wide mb-2 line-clamp-1">
                      {site.name}
                    </h3>
                    <p className="text-slate-300 text-xs leading-relaxed font-sans line-clamp-3 mb-4">
                      {site.description[currentLang]}
                    </p>
                  </div>

                  {/* Mini Screenshot Thumbnails Strip (if > 1) */}
                  {screenshots.length > 1 && (
                    <div className="mb-4 pt-3 border-t border-white/5">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                          <Layers className="h-3 w-3 text-emerald-400" />
                          <span>Screenshots ({screenshots.length})</span>
                        </span>
                        <button
                          type="button"
                          onClick={() => openLightbox(site.name, site.url, screenshots, currentSlide)}
                          className="text-[10px] font-mono font-bold text-emerald-400 hover:text-emerald-300 hover:underline flex items-center gap-1 cursor-pointer transition-colors"
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
                                ? 'border-emerald-400 ring-1 ring-emerald-400/50 scale-105'
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

                  {/* ── Action Footer ── */}
                  <div className="pt-3 border-t border-white/10 mt-auto">
                    {site.status === 'active' ? (
                      <a
                        href={site.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-full bg-[#1b1c28] border border-white/20 hover:border-[#ccff00] hover:text-[#ccff00] hover:bg-black text-white text-xs font-marker tracking-wider uppercase transition-all duration-300 group/btn shadow-md"
                      >
                        <span>LAUNCH PORTAL</span>
                        <ExternalLink className="h-3.5 w-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                      </a>
                    ) : (
                      <div className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-full bg-black/40 border border-white/5 text-slate-500 text-xs font-mono font-bold uppercase tracking-wider cursor-not-allowed">
                        <AlertTriangle className="h-3.5 w-3.5" />
                        <span>OFFLINE // IN MAINTENANCE</span>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
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
                <p className="text-[11px] font-mono text-emerald-400 truncate mt-0.5">
                  Foto {lightbox.currentIndex + 1} dari {lightbox.images.length}
                </p>
              </div>

              <div className="flex items-center gap-3">
                {lightbox.siteUrl && (
                  <a
                    href={lightbox.siteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white hover:bg-emerald-400 text-black text-xs font-mono font-bold uppercase transition-colors"
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
                  className="absolute left-2 md:left-6 bg-black/80 hover:bg-emerald-500 hover:text-black border border-white/20 text-white p-3 rounded-full transition-all cursor-pointer z-20 shadow-2xl"
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
                  className="absolute right-2 md:right-6 bg-black/80 hover:bg-emerald-500 hover:text-black border border-white/20 text-white p-3 rounded-full transition-all cursor-pointer z-20 shadow-2xl"
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
                        ? 'border-emerald-400 ring-2 ring-emerald-400/50 scale-105'
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
