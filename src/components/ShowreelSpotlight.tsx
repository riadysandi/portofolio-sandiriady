import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Sparkles, ExternalLink, Terminal, ShieldCheck, Activity, X } from 'lucide-react';
import { Language, Translation, LiveSite } from '../types';

interface ShowreelSpotlightProps {
  currentLang: Language;
  translations: Translation;
  featuredSite?: LiveSite;
  onOpenLiveSiteGallery?: () => void;
}

export default function ShowreelSpotlight({
  currentLang,
  translations,
  featuredSite,
  onOpenLiveSiteGallery,
}: ShowreelSpotlightProps) {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  const titleText = currentLang === 'en' ? 'SYSTEM SHOWCASE' : 'SOROTAN SISTEM';
  const subtitleText = currentLang === 'en'
    ? 'A direct glimpse of production portals, internal IT automation workflows, and high-uptime server infrastructure.'
    : 'Cuplikan langsung platform sistem produksi, otomatisasi alur kerja internal, dan infrastruktur server berkinerja tinggi.';
  const ctaText = currentLang === 'en' ? 'Explore Live Portal' : 'Jelajahi Portal Aktif';

  const previewImage = featuredSite?.image || 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80';
  const targetUrl = featuredSite?.url || 'https://itpma-ticketing.pinusmerahabadi.co.id/';

  const handlePlayClick = () => {
    if (onOpenLiveSiteGallery) {
      onOpenLiveSiteGallery();
    } else {
      window.open(targetUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-6 md:py-8">
      {/* Dikshant Style Showcase Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.3, 0, 0.1, 1] }}
        className="relative rounded-3xl bg-[#12131a] border-2 border-[#232533] hover:border-[#8b5cf6]/50 transition-all duration-500 overflow-hidden shadow-2xl p-6 sm:p-8 lg:p-10"
      >
        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-8 items-center">
          {/* Left Column: Info & Action */}
          <div className="space-y-4 sm:space-y-6">
            <div className="flex items-center gap-2">
              <span className="text-[#8b5cf6] font-marker text-lg sm:text-xl">☆</span>
              <h2 className="font-marker text-2xl sm:text-3xl lg:text-4xl text-white tracking-wider uppercase">
                {titleText}
              </h2>
            </div>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-sans max-w-md">
              {subtitleText}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={handlePlayClick}
                className="group inline-flex items-center gap-2.5 text-[#ccff00] hover:text-[#d9ff33] font-marker text-sm sm:text-base tracking-wide uppercase transition-all cursor-pointer"
              >
                <span>{ctaText}</span>
                <span className="h-7 w-7 rounded-full bg-[#ccff00] text-black flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Play className="h-3.5 w-3.5 fill-black ml-0.5" />
                </span>
              </button>

              {featuredSite && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono font-bold">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  {featuredSite.name} // 25+ SCREENSHOTS
                </span>
              )}
            </div>

            {/* Micro Tech Tags */}
            <div className="pt-2 flex flex-wrap gap-2 text-[10px] font-mono text-slate-400">
              <span className="px-2.5 py-1 rounded-lg bg-black/60 border border-white/10 flex items-center gap-1">
                <Terminal className="h-3 w-3 text-[#38bdf8]" /> Laravel & Filament
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-black/60 border border-white/10 flex items-center gap-1">
                <ShieldCheck className="h-3 w-3 text-[#ccff00]" /> Prom & Uptime
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-black/60 border border-white/10 flex items-center gap-1">
                <Activity className="h-3 w-3 text-[#f43f5e]" /> 99.9% Availability
              </span>
            </div>
          </div>

          {/* Right Column: Neon Synthwave Mockup / Video Frame */}
          <div className="relative">
            <div
              onClick={handlePlayClick}
              className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden border-2 border-white/15 bg-black cursor-pointer group shadow-2xl"
            >
              {/* Preview Image with Cyber Gradient Overlay */}
              <img
                src={previewImage}
                alt="System Showcase Preview"
                className="w-full h-full object-cover object-top filter brightness-90 group-hover:scale-105 group-hover:brightness-100 transition-all duration-700 ease-out"
              />

              {/* Neon Cyber Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

              {/* Glowing Center Play Button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative flex items-center justify-center">
                  {/* Ping pulse circle */}
                  <span className="absolute h-16 w-16 sm:h-20 sm:w-20 rounded-full bg-[#ccff00] opacity-40 animate-ping" />
                  <div className="h-14 w-14 sm:h-18 sm:w-18 rounded-full bg-[#ccff00] text-black flex items-center justify-center shadow-[0_0_35px_rgba(204,255,0,0.7)] group-hover:scale-115 transition-transform duration-300">
                    <Play className="h-6 w-6 sm:h-8 sm:w-8 fill-black ml-1 text-black" />
                  </div>
                </div>
              </div>

              {/* Bottom Info Bar inside Mockup */}
              <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 flex items-center justify-between pointer-events-none">
                <div>
                  <span className="text-[10px] font-mono font-bold text-[#ccff00] uppercase tracking-wider block">
                    FEATURED LIVE SYSTEM
                  </span>
                  <span className="text-sm sm:text-base font-display font-black text-white uppercase tracking-tight">
                    {featuredSite ? featuredSite.name : 'MONASYS Portal Ops'}
                  </span>
                </div>

                <div className="bg-black/80 backdrop-blur-sm border border-white/20 px-3 py-1.5 rounded-lg flex items-center gap-1.5 text-xs font-mono font-bold text-white group-hover:border-[#ccff00] transition-colors">
                  <span>Lihat Galeri</span>
                  <ExternalLink className="h-3 w-3 text-[#ccff00]" />
                </div>
              </div>
            </div>

            {/* Decorative Corner Doodles */}
            <span className="absolute -top-3 -right-3 text-[#ccff00] text-xl font-marker animate-pulse">✦</span>
            <span className="absolute -bottom-2 -left-2 text-[#8b5cf6] text-xl font-marker">✦</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
