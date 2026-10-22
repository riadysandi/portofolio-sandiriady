import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Play, Download, ArrowUpRight, ChevronDown, Mail, Phone,
  Instagram, Twitter, MapPin, Server, Database, Terminal,
  CheckCircle2, Sparkles, Heart, Music, Dumbbell, Compass
} from 'lucide-react';
import { Language, Translation } from '../types';
import { PERSONAL_INFO, PERSONALITY, HOBBIES, LANGUAGES } from '../data';
import {
  DoodleCrown, DoodleCurvedArrow, DoodleLightning, DoodleStar,
  DoodleSmiley, DoodleTerminal, SpeechBubble, LiquidSplash
} from './Doodles';

interface HeroProps {
  currentLang: Language;
  translations: Translation;
  onScrollToContact: () => void;
  onDownloadPdf: () => void;
}

export default function Hero({
  currentLang,
  translations,
  onScrollToContact,
  onDownloadPdf,
}: HeroProps) {
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);

  const scrollToLiveSites = () => {
    const el = document.getElementById('live-sites');
    if (el) {
      const offset = 80;
      const pos = el.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top: pos, behavior: 'smooth' });
    }
  };

  const scrollToProjects = () => {
    const el = document.getElementById('projects');
    if (el) {
      const offset = 80;
      const pos = el.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top: pos, behavior: 'smooth' });
    }
  };

  const speechText = currentLang === 'en' ? "LET'S BUILD SOLID INFRA!" : "SIAP SOLUSIKAN SISTEM!";
  const roleTagline = currentLang === 'en'
    ? 'IT Infrastructure Support • Systems Administrator • DevOps Homelab'
    : 'Spesialis Infrastruktur IT • Administrator Server • DevOps & Otomasi';

  return (
    <section id="about" className="relative w-full max-w-7xl mx-auto px-4 pt-6 sm:pt-10 pb-8 sm:pb-12 scroll-mt-20 overflow-hidden">
      
      {/* ── Top Hero Row: Dikshant Layout ── */}
      <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8 lg:gap-12 items-center min-h-[580px]">
        
        {/* Left Column: Hand-drawn Typography & Actions */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: [0.3, 0, 0.1, 1] }}
          className="space-y-6 relative z-10"
        >
          {/* "Hey, I'm" with curved arrow pointing to Name */}
          <div className="relative inline-block">
            <span className="font-hand text-3xl sm:text-4xl text-white block transform -rotate-3 tracking-wide">
              Hey, I'm
            </span>
            <div className="absolute -bottom-6 left-10 text-white pointer-events-none">
              <DoodleCurvedArrow className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
            </div>
          </div>

          {/* Huge Signature Marker Name: SANDI RIADY */}
          <div className="pt-2">
            <h1 className="font-marker text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-white tracking-wider leading-[0.9] select-none uppercase drop-shadow-2xl">
              SANDI
            </h1>
            <h1 className="font-marker text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-[#ccff00] tracking-wider leading-[0.9] select-none uppercase drop-shadow-[0_0_25px_rgba(204,255,0,0.35)] -mt-1 sm:-mt-2">
              RIADY
            </h1>
          </div>

          {/* Tagline with Bullet Dots */}
          <p className="font-mono text-xs sm:text-sm text-slate-300 font-bold tracking-wide flex flex-wrap items-center gap-2">
            <span>IT Infrastructure Support</span>
            <span className="h-1.5 w-1.5 rounded-full bg-[#ccff00]" />
            <span>Systems Administrator</span>
            <span className="h-1.5 w-1.5 rounded-full bg-[#8b5cf6]" />
            <span>DevOps Homelab</span>
          </p>

          {/* Short Bio Blurb */}
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl font-sans">
            {PERSONAL_INFO.aboutMe[currentLang]}
          </p>

          {/* Action Buttons: Dikshant Pill Style */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            {/* Primary Button: Neon Lime Pill with Play Icon */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToLiveSites}
              className="inline-flex items-center gap-2.5 px-6 sm:px-7 py-3 rounded-full bg-[#ccff00] hover:bg-[#d9ff33] text-black font-marker text-sm sm:text-base tracking-wide uppercase shadow-[0_0_25px_rgba(204,255,0,0.4)] transition-all cursor-pointer"
            >
              <span className="h-5 w-5 rounded-full bg-black text-[#ccff00] flex items-center justify-center">
                <Play className="h-3 w-3 fill-[#ccff00] ml-0.5" />
              </span>
              <span>{currentLang === 'en' ? 'Explore Systems' : 'Lihat Sistem Aktif'}</span>
            </motion.button>

            {/* Secondary Button: Dark Outlined Pill with Arrow */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onDownloadPdf}
              className="inline-flex items-center gap-2 px-6 sm:px-7 py-3 rounded-full bg-[#12131a] hover:bg-white text-white hover:text-black border-2 border-white/20 text-xs sm:text-sm font-mono font-bold tracking-wider uppercase transition-all cursor-pointer shadow-lg"
            >
              <span>{translations.downloadButton}</span>
              <ArrowUpRight className="h-4 w-4" />
            </motion.button>
          </div>

          {/* Scroll Down Indicator */}
          <div className="pt-4 flex items-center gap-2 text-slate-400 select-none">
            <div className="h-6 w-4 rounded-full border-2 border-slate-500 flex items-start justify-center p-1">
              <span className="h-1 w-1 bg-[#ccff00] rounded-full animate-bounce" />
            </div>
            <span className="font-mono text-[10px] tracking-widest uppercase">Scroll Down</span>
          </div>
        </motion.div>

        {/* Right Column: Comic Avatar Composition with Doodles */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.3, 0, 0.1, 1] }}
          className="relative flex items-center justify-center pt-6 lg:pt-0"
        >
          {/* Huge Fluid Liquid Splash in Purple */}
          <div className="absolute w-[340px] h-[340px] sm:w-[440px] sm:h-[440px] text-[#8b5cf6] opacity-85 -z-10 animate-float-reverse pointer-events-none">
            <LiquidSplash className="w-full h-full text-[#8b5cf6]" />
          </div>

          {/* Crown Doodle on Head */}
          <div className="absolute -top-6 sm:-top-8 left-1/2 -translate-x-12 z-20 animate-float pointer-events-none">
            <DoodleCrown className="w-12 h-12 sm:w-16 sm:h-16 text-yellow-300" />
          </div>

          {/* Comic Speech Bubble */}
          <div className="absolute -top-4 sm:-top-6 right-2 sm:right-6 z-20 animate-bounce">
            <SpeechBubble text={speechText} />
          </div>

          {/* Floating Lightning Doodle */}
          <div className="absolute bottom-10 left-2 sm:left-4 z-20 animate-float pointer-events-none">
            <DoodleLightning className="w-10 h-10 sm:w-12 sm:h-12 text-[#ccff00]" />
          </div>

          {/* Floating Star Doodle */}
          <div className="absolute top-16 right-0 z-20 animate-float pointer-events-none">
            <DoodleStar className="w-8 h-8 text-yellow-400" />
          </div>

          {/* Floating Smiley Doodle */}
          <div className="absolute bottom-4 right-10 z-20 animate-float-reverse pointer-events-none">
            <DoodleSmiley className="w-10 h-10 sm:w-12 sm:h-12 text-[#ccff00]" />
          </div>

          {/* Floating Terminal Prompt Doodle `>_` */}
          <div className="absolute top-36 -left-4 z-20 animate-float pointer-events-none">
            <DoodleTerminal className="w-10 h-10 text-[#38bdf8]" />
          </div>

          {/* Sandi's Photo with White Sticker Cutout Frame */}
          <div
            onClick={() => setIsPhotoModalOpen(true)}
            className="relative cursor-pointer group"
          >
            {/* White Sticker Border Outline Effect */}
            <div className="relative rounded-3xl p-2 bg-white/95 shadow-[0_20px_50px_rgba(0,0,0,0.8)] transform -rotate-1 group-hover:rotate-0 transition-all duration-300">
              <div className="relative w-64 h-80 sm:w-80 sm:h-96 rounded-2xl overflow-hidden bg-black border-2 border-black">
                <img
                  src={PERSONAL_INFO.profileImage}
                  alt={PERSONAL_INFO.name}
                  className="w-full h-full object-cover object-center filter contrast-105 group-hover:scale-105 transition-transform duration-500 ease-out"
                />

                {/* Bottom Sticker Tag on Photo */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/80 to-transparent p-4 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-mono font-bold text-[#ccff00] uppercase tracking-wider block">
                      VERIFIED ENGINEER
                    </span>
                    <span className="text-sm font-display font-black text-white uppercase tracking-tight">
                      Sandi Riady
                    </span>
                  </div>
                  <span className="px-2 py-1 rounded bg-[#ccff00] text-black text-[9px] font-mono font-black uppercase tracking-wider">
                    ONLINE
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ── Quick Highlights Row (Servers, Automations, Languages) ── */}
      <div className="mt-10 grid sm:grid-cols-3 gap-4">
        <div className="rounded-2xl bg-[#12131a] border border-[#242636] p-4 sm:p-5 hover:border-[#8b5cf6] transition-colors">
          <div className="flex items-center gap-2 mb-2">
            <Server className="h-4 w-4 text-[#8b5cf6]" />
            <h3 className="font-mono text-xs font-bold text-white uppercase tracking-wider">
              {currentLang === 'en' ? 'Core Infrastructure' : 'Infrastruktur Utama'}
            </h3>
          </div>
          <p className="text-xs text-slate-300 font-sans leading-relaxed">
            Linux Ubuntu/Debian, Docker Containerization, Proxmox VE, Zimbra Mail Server, and ERPNext deployment.
          </p>
        </div>

        <div className="rounded-2xl bg-[#12131a] border border-[#242636] p-4 sm:p-5 hover:border-[#ccff00] transition-colors">
          <div className="flex items-center gap-2 mb-2">
            <Terminal className="h-4 w-4 text-[#ccff00]" />
            <h3 className="font-mono text-xs font-bold text-white uppercase tracking-wider">
              {currentLang === 'en' ? 'Workflow & Automations' : 'Otomasi & Alur Kerja'}
            </h3>
          </div>
          <p className="text-xs text-slate-300 font-sans leading-relaxed">
            GLPI Ticketing with n8n Webhooks, Bash cron backup scripts, and Dashy unified monitoring portals.
          </p>
        </div>

        <div className="rounded-2xl bg-[#12131a] border border-[#242636] p-4 sm:p-5 hover:border-[#38bdf8] transition-colors">
          <div className="flex items-center gap-2 mb-2">
            <Database className="h-4 w-4 text-[#38bdf8]" />
            <h3 className="font-mono text-xs font-bold text-white uppercase tracking-wider">
              {currentLang === 'en' ? 'Operational Support' : 'Dukungan Operasional'}
            </h3>
          </div>
          <p className="text-xs text-slate-300 font-sans leading-relaxed">
            Multi-branch user support, SOP documentation, asset tracking, and 99.9% uptime maintenance.
          </p>
        </div>
      </div>

      {/* Fullscreen Photo Modal */}
      {isPhotoModalOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-md"
          onClick={() => setIsPhotoModalOpen(false)}
        >
          <img
            src={PERSONAL_INFO.profileImage}
            alt={PERSONAL_INFO.name}
            className="max-h-[85vh] max-w-full rounded-3xl border-4 border-white object-contain shadow-2xl"
          />
        </div>
      )}
    </section>
  );
}
