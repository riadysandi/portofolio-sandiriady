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
import InteractiveLanyard from './InteractiveLanyard';

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
    <section id="about" className="relative w-full max-w-7xl mx-auto px-4 pt-6 sm:pt-10 pb-8 sm:pb-12 scroll-mt-20 overflow-visible">
      
      {/* ── Top Hero Section: Full-Width 3D Lanyard Layer + Content Grid ── */}
      <div className="relative min-h-[580px] lg:min-h-[680px]">

        {/* 3D Interactive Lanyard Full-Bleed Canvas (z-20 in front of text, spans 100% width & height) */}
        <div className="absolute inset-0 z-20 pointer-events-none overflow-visible">
          <InteractiveLanyard currentLang={currentLang} className="w-full h-full" />
        </div>

        {/* ── Content Grid (Left: Typography & Buttons, Right: Doodles & Glow) ── */}
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8 lg:gap-12 items-center min-h-[580px] lg:min-h-[680px] relative z-10">
          
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

          {/* Right Column: Visual Glow & Floating Doodles */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.3, 0, 0.1, 1] }}
            className="relative flex items-center justify-center pt-2 lg:pt-0 w-full min-h-[540px] sm:min-h-[600px] lg:min-h-[680px] pointer-events-none"
          >
            {/* Subtle Ambient Liquid Glow behind Lanyard */}
            <div className="absolute w-[360px] h-[360px] sm:w-[460px] sm:h-[460px] text-[#8b5cf6] opacity-30 blur-3xl -z-10 pointer-events-none">
              <LiquidSplash className="w-full h-full text-[#8b5cf6]" />
            </div>

            {/* Comic Speech Bubble */}
            <div className="absolute -top-3 sm:-top-5 right-2 sm:right-6 z-10 animate-bounce pointer-events-none">
              <SpeechBubble text={speechText} />
            </div>

            {/* Floating Lightning Doodle */}
            <div className="absolute bottom-14 left-0 sm:left-4 z-10 animate-float pointer-events-none">
              <DoodleLightning className="w-10 h-10 sm:w-12 sm:h-12 text-[#ccff00]" />
            </div>

            {/* Floating Star Doodle */}
            <div className="absolute top-16 right-0 z-10 animate-float pointer-events-none">
              <DoodleStar className="w-8 h-8 text-yellow-400" />
            </div>

            {/* Floating Smiley Doodle */}
            <div className="absolute bottom-8 right-6 z-10 animate-float-reverse pointer-events-none">
              <DoodleSmiley className="w-10 h-10 sm:w-12 sm:h-12 text-[#ccff00]" />
            </div>

            {/* Floating Terminal Prompt Doodle `>_` */}
            <div className="absolute top-28 -left-3 sm:-left-5 z-10 animate-float pointer-events-none">
              <DoodleTerminal className="w-10 h-10 text-[#38bdf8]" />
            </div>
          </motion.div>
        </div>
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
