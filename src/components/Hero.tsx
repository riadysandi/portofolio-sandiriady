import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { Phone, Mail, Instagram, Twitter, Facebook, Sparkles, MapPin, CheckCircle, Languages, Heart, Music, Dumbbell, Compass, Terminal, Cpu, Network, ArrowDown, Activity } from 'lucide-react';
import { Language, Translation } from '../types';
import { PERSONAL_INFO, PERSONALITY, HOBBIES, LANGUAGES } from '../data';
import heroFigure from '../assets/hero-figure.png';

interface HeroProps {
  currentLang: Language;
  translations: Translation;
  onScrollToContact: () => void;
}

export default function Hero({ currentLang, translations, onScrollToContact }: HeroProps) {
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);

  // Mouse Move Parallax coordinates for the central portal
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring animations for ultra-smooth buttery parallax motion (matches the premium vibe)
  const springConfig = { damping: 30, stiffness: 150 };
  const portalX = useSpring(mouseX, springConfig);
  const portalY = useSpring(mouseY, springConfig);

  // Transform parallax coordinates to movement range
  const rotateX = useTransform(portalY, [-300, 300], [12, -12]);
  const rotateY = useTransform(portalX, [-300, 300], [-12, 12]);
  const imageShiftX = useTransform(portalX, [-300, 300], [-20, 20]);
  const imageShiftY = useTransform(portalY, [-300, 300], [-20, 20]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const getHobbyIcon = (iconName: string) => {
    switch (iconName) {
      case 'Music': return <Music className="h-4 w-4 text-emerald-400" />;
      case 'Dumbbell': return <Dumbbell className="h-4 w-4 text-rose-400" />;
      case 'Compass': return <Compass className="h-4 w-4 text-emerald-400" />;
      default: return <Heart className="h-4 w-4 text-emerald-400" />;
    }
  };

  return (
    <section id="about" className="relative w-full max-w-7xl mx-auto px-4 pt-4 pb-20 md:pb-28">
      
      {/* 
        ================================================================================
        [1] THE CINEMATIC INTRO PORTAL LANDING (DIRECTLY INSPIRED BY THE VIDEO)
        ================================================================================
      */}
      <div 
        className="relative w-full min-h-[85vh] lg:min-h-[90vh] flex flex-col justify-between items-center py-8 mb-16 overflow-hidden cursor-default"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Subtle background glow matrix */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.02)_0%,transparent_70%)] pointer-events-none" />

        {/* Minimalist Top Bar info (aesthetic design details) */}
        <div className="w-full flex justify-between items-center text-[10px] font-mono text-slate-500 font-bold uppercase tracking-[0.25em] z-10 px-2 md:px-6">
          <div className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>PORTFOLIO_NODE_ACTIVE</span>
          </div>
          <div>EST. 2026 / IDN</div>
        </div>

        {/* Centered Typography and circular interactive Portal */}
        <div className="relative w-full flex-grow flex flex-col items-center justify-center z-10 py-6">
          
          {/* Big luxury background text layer */}
          <div className="absolute select-none text-center pointer-events-none z-0">
            <div className="font-serif italic text-6xl md:text-[9.5rem] text-slate-900/10 font-light tracking-wide leading-none select-none uppercase">
              SANDI RIADY
            </div>
          </div>

          <div className="relative flex flex-col items-center justify-center w-full max-w-6xl">
            
            {/* "between" text overlay */}
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="absolute top-[-20px] md:top-[-45px] left-[5%] md:left-[15%] z-25 pointer-events-none"
            >
              <span className="font-serif italic text-2xl md:text-5xl text-slate-400 font-extralight tracking-widest lowercase">
                between
              </span>
            </motion.div>

            {/* "Reality" Left Heading */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, delay: 0.2, ease: 'easeOut' }}
              className="absolute left-[2%] md:left-[5%] lg:left-[8%] top-[30%] md:top-[35%] lg:top-[40%] z-25 pointer-events-none"
            >
              <h2 className="font-serif text-4xl md:text-[5.5rem] font-bold text-white tracking-tighter leading-none uppercase">
                SYSTEMS<span className="text-emerald-400 font-light italic">.</span>
              </h2>
            </motion.div>

            {/* The Floating Hero Figure */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: [0, -15, 0] }}
              transition={{ 
                opacity: { duration: 1.5, delay: 0.5 },
                y: { duration: 5, repeat: Infinity, ease: 'easeInOut' }
              }}
              className="relative z-40 pointer-events-none"
            >
              <img 
                src={heroFigure} 
                alt="Sandi Riady Figure" 
                className="h-[380px] md:h-[520px] object-contain drop-shadow-[0_20px_25px_rgba(16,185,129,0.25)]" 
              />
            </motion.div>

            {/* "& Dream" Right Heading */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, delay: 0.3, ease: 'easeOut' }}
              className="absolute -right-[3%] md:-right-[1%] lg:right-[0%] bottom-[25%] md:bottom-[28%] lg:bottom-[32%] z-25 pointer-events-none"
            >
              <h2 className="font-serif text-4xl md:text-[5.5rem] font-bold text-white tracking-tighter leading-none uppercase">
                &amp; <span className="font-light italic text-emerald-400 font-serif lowercase">auto</span>MATION
              </h2>
            </motion.div>
          </div>
        </div>

        {/* Minimalist Bottom Row: Scroll down and subtle details */}
        <div className="w-full flex justify-between items-center z-10 px-2 md:px-6">
          {/* Scroll Down Vertical Indicator */}
          <div className="flex justify-start">
            <button
              onClick={() => {
                const bentoSection = document.getElementById('bento-profile');
                bentoSection?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="flex items-center gap-3.5 group cursor-pointer"
            >
              <div className="h-9 w-9 rounded-full border border-slate-800 bg-slate-950/40 flex items-center justify-center group-hover:border-emerald-500/50 group-hover:bg-emerald-500/5 transition-all">
                <ArrowDown className="h-4 w-4 text-emerald-400 animate-bounce" />
              </div>
              <span className="font-mono text-[9px] font-bold text-slate-500 group-hover:text-emerald-400 transition-colors uppercase tracking-[0.25em] hidden md:inline">
                SCROLL_TO_DOSSIER
              </span>
            </button>
          </div>

          {/* Slogan */}
          <div className="text-right">
            <span className="font-mono text-[9px] font-bold text-slate-500 tracking-widest uppercase block mb-1">MIS &amp; IT OPERATIONAL ARCHITECT</span>
            <span className="font-serif italic text-xs text-emerald-400/80 tracking-wide font-light">"Automating chaos into structured harmony."</span>
          </div>
        </div>
      </div>

      {/* 
        ================================================================================
        [2] THE PROFILE DOSSIER & BENTO BOX GRID
        ================================================================================
      */}
      <div id="bento-profile" className="scroll-mt-24">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.1 }
            }
          }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
        >
          {/* Profile Card */}
          <motion.div
            variants={{
              hidden: { y: 30, opacity: 0 },
              visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 80 } }
            }}
            className="lg:col-span-4 bg-[#0A0A0A] border-2 border-slate-800 rounded-3xl p-6 shadow-2xl relative overflow-hidden group hover:border-emerald-500/30 transition-all duration-300"
          >
            {/* Interactive Border Top glow strip */}
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-500 opacity-60 group-hover:opacity-100 transition-opacity" />
            
            <div className="flex flex-col items-center text-center pt-2">
              {/* Profile Avatar with dynamic hover framing */}
              <div className="relative mb-6 cursor-pointer" onClick={() => setIsAvatarModalOpen(true)}>
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 blur-md opacity-25 group-hover:opacity-40 animate-pulse transition-opacity" />
                <div className="h-32 w-32 rounded-full border-4 border-slate-800 bg-slate-950 flex items-center justify-center overflow-hidden relative shadow-inner group-hover:border-emerald-500/40 transition-all duration-300">
                  {PERSONAL_INFO.profileImage ? (
                    <img 
                      src={PERSONAL_INFO.profileImage} 
                      alt={PERSONAL_INFO.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                  ) : (
                    <svg viewBox="0 0 100 100" className="w-full h-full text-slate-400 group-hover:scale-105 transition-transform duration-500">
                      <defs>
                        <linearGradient id="avatarGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#064e3b" />
                          <stop offset="100%" stopColor="#022c22" />
                        </linearGradient>
                      </defs>
                      <circle cx="50" cy="50" r="50" fill="url(#avatarGrad)" />
                      <path d="M50 30c8.28 0 15 6.72 15 15s-6.72 15-15 15-15-6.72-15-15 6.72-15 15-15z" fill="#94a3b8" />
                      <path d="M15 85c0-15 15-22 35-22s35 7 35 22H15z" fill="#64748b" />
                      <path d="M35 40c3-5 8-8 15-8s12 3 15 8c0 0-5-10-15-10s-15 10-15 10z" fill="#0f172a" />
                    </svg>
                  )}
                  {/* Glowing live indicator node */}
                  <span className="absolute bottom-1 right-2 h-3.5 w-3.5 rounded-full bg-emerald-400 border-2 border-slate-900 flex items-center justify-center animate-ping" />
                  <span className="absolute bottom-1 right-2 h-3.5 w-3.5 rounded-full bg-emerald-400 border-2 border-slate-900" />
                </div>
              </div>

              <h1 className="font-display font-black text-3xl text-white tracking-tighter uppercase leading-none mb-1 group-hover:text-emerald-400 transition-colors">
                {PERSONAL_INFO.name}
              </h1>
              <p className="font-mono text-[9px] font-bold text-emerald-400 tracking-widest uppercase mt-1.5 mb-4">
                {PERSONAL_INFO.title}
              </p>

              <div className="flex items-center gap-1.5 text-slate-400 text-[10px] font-black uppercase tracking-wider mb-6 bg-slate-950 px-3.5 py-1.5 rounded-lg border border-slate-850">
                <MapPin className="h-3.5 w-3.5 text-emerald-400" />
                <span>Tangerang, Indonesia</span>
              </div>

              {/* Contacts info panel */}
              <div className="w-full space-y-4 border-t-2 border-slate-800/80 pt-6 text-left">
                <a
                  href={`https://wa.me/${PERSONAL_INFO.contacts.whatsapp}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3.5 text-sm text-slate-300 hover:text-emerald-400 transition-colors group/link cursor-pointer"
                >
                  <div className="h-9 w-9 rounded-xl bg-slate-950 border border-slate-850 flex items-center justify-center group-hover/link:bg-emerald-500/10 group-hover/link:border-emerald-500/30 transition-colors">
                    <Phone className="h-4 w-4 text-emerald-400" />
                  </div>
                  <div className="truncate">
                    <span className="block text-[8px] text-slate-500 font-bold uppercase tracking-widest leading-none">WHATSAPP_SMS</span>
                    <span className="font-mono text-xs font-bold">{PERSONAL_INFO.contacts.whatsapp}</span>
                  </div>
                </a>

                <a
                  href={`mailto:${PERSONAL_INFO.contacts.email}`}
                  className="flex items-center gap-3.5 text-sm text-slate-300 hover:text-emerald-400 transition-colors group/link cursor-pointer"
                >
                  <div className="h-9 w-9 rounded-xl bg-slate-950 border border-slate-850 flex items-center justify-center group-hover/link:bg-emerald-500/10 group-hover/link:border-emerald-500/30 transition-colors">
                    <Mail className="h-4 w-4 text-emerald-400" />
                  </div>
                  <div className="truncate">
                    <span className="block text-[8px] text-slate-500 font-bold uppercase tracking-widest leading-none">EMAIL_ADDRESS</span>
                    <span className="font-mono text-xs font-bold">{PERSONAL_INFO.contacts.email}</span>
                  </div>
                </a>

                {/* Social media grid footer */}
                <div className="grid grid-cols-3 gap-2.5 pt-4 border-t border-slate-800/40">
                  <a
                    href={`https://instagram.com/${PERSONAL_INFO.contacts.instagram.replace('@', '')}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex flex-col items-center gap-1.5 py-2 px-1 rounded-xl bg-slate-950 border border-slate-850 hover:bg-slate-900 hover:border-slate-800 text-slate-400 hover:text-emerald-400 transition-all text-center cursor-pointer"
                  >
                    <Instagram className="h-4 w-4" />
                    <span className="text-[8px] font-bold uppercase tracking-wider truncate w-full">Instagram</span>
                  </a>

                  <a
                    href={`https://twitter.com/${PERSONAL_INFO.contacts.twitter.replace('@', '')}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex flex-col items-center gap-1.5 py-2 px-1 rounded-xl bg-slate-950 border border-slate-850 hover:bg-slate-900 hover:border-slate-800 text-slate-400 hover:text-emerald-400 transition-all text-center cursor-pointer"
                  >
                    <Twitter className="h-4 w-4" />
                    <span className="text-[8px] font-bold uppercase tracking-wider truncate w-full">Twitter</span>
                  </a>

                  <a
                    href={`https://facebook.com/search/top?q=${encodeURIComponent(PERSONAL_INFO.contacts.facebook)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex flex-col items-center gap-1.5 py-2 px-1 rounded-xl bg-slate-950 border border-slate-850 hover:bg-slate-900 hover:border-slate-800 text-slate-400 hover:text-emerald-400 transition-all text-center cursor-pointer"
                  >
                    <Facebook className="h-4 w-4" />
                    <span className="text-[8px] font-bold uppercase tracking-wider truncate w-full">Facebook</span>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Side Bio & Bento grids */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            {/* Bio Card with beautiful display serif headers */}
            <motion.div
              variants={{
                hidden: { y: 30, opacity: 0 },
                visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 80, delay: 0.1 } }
              }}
              className="bg-[#0A0A0A] border-2 border-slate-800 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden group hover:border-slate-750 transition-colors duration-300"
            >
              <div className="absolute -top-12 -right-12 opacity-[0.03] pointer-events-none group-hover:scale-105 group-hover:opacity-[0.06] transition-all duration-700">
                <Sparkles className="h-48 w-48 text-emerald-400" />
              </div>

              <div className="flex items-center gap-2 text-emerald-400 text-[10px] font-black uppercase tracking-[0.2em] mb-4">
                <Sparkles className="h-4 w-4 shrink-0" />
                <span>{translations.aboutTitle}</span>
              </div>

              <h2 className="font-serif text-3xl md:text-5xl font-black text-white tracking-tight leading-[0.95] mb-6 uppercase">
                {translations.heroSubtitle}
              </h2>

              <p className="text-slate-300 text-sm md:text-[15px] leading-relaxed font-sans mb-8">
                {PERSONAL_INFO.aboutMe[currentLang]}
              </p>

              <button
                onClick={onScrollToContact}
                className="px-6 py-3.5 rounded-xl bg-slate-900 border-2 border-slate-800 hover:border-emerald-500 hover:bg-slate-950 text-slate-200 hover:text-emerald-400 font-black text-[10px] tracking-widest uppercase transition-all duration-300 cursor-pointer active:scale-[0.98]"
              >
                {translations.navContact}
              </button>
            </motion.div>

            {/* Bento cards attributes */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              
              {/* Strengths personality card */}
              <motion.div
                variants={{
                  hidden: { y: 30, opacity: 0 },
                  visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 80, delay: 0.2 } }
                }}
                className="bg-[#0A0A0A] border-2 border-slate-800 hover:border-emerald-500/20 rounded-3xl p-5 shadow-xl transition-all duration-300"
              >
                <div className="flex items-center gap-2 text-emerald-400 text-[10px] font-black uppercase tracking-widest mb-4 border-b border-slate-800 pb-3">
                  <CheckCircle className="h-4 w-4 shrink-0" />
                  <span>{translations.personalityTitle}</span>
                </div>
                <ul className="space-y-3">
                  {PERSONALITY[currentLang].map((trait, index) => (
                    <li key={index} className="flex items-start gap-2.5 text-xs text-slate-300 font-sans font-medium">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shrink-0 mt-1.5" />
                      <span>{trait}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Language Card with animated bars */}
              <motion.div
                variants={{
                  hidden: { y: 30, opacity: 0 },
                  visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 80, delay: 0.3 } }
                }}
                className="bg-[#0A0A0A] border-2 border-slate-800 hover:border-emerald-500/20 rounded-3xl p-5 shadow-xl transition-all duration-300"
              >
                <div className="flex items-center gap-2 text-emerald-400 text-[10px] font-black uppercase tracking-widest mb-4 border-b border-slate-800 pb-3">
                  <Languages className="h-4 w-4 shrink-0" />
                  <span>{translations.langTitle}</span>
                </div>
                <div className="space-y-4">
                  {LANGUAGES[currentLang].map((lang, index) => (
                    <div key={index} className="space-y-1.5">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-bold text-slate-200 uppercase tracking-wide text-[11px]">{lang.name}</span>
                        <span className="font-mono text-[9px] font-black text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 px-1.5 py-0.5 rounded uppercase tracking-wider">
                          {lang.level}
                        </span>
                      </div>
                      <div className="h-1.5 bg-slate-950 rounded-full overflow-hidden border border-slate-900">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: index === 0 ? '100%' : '50%' }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
                          className="h-full bg-emerald-400"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Hobbies Card */}
              <motion.div
                variants={{
                  hidden: { y: 30, opacity: 0 },
                  visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 80, delay: 0.4 } }
                }}
                className="bg-[#0A0A0A] border-2 border-slate-800 hover:border-emerald-500/20 rounded-3xl p-5 shadow-xl transition-all duration-300"
              >
                <div className="flex items-center gap-2 text-emerald-400 text-[10px] font-black uppercase tracking-widest mb-4 border-b border-slate-800 pb-3">
                  <Heart className="h-4 w-4 shrink-0" />
                  <span>{translations.hobbiesTitle}</span>
                </div>
                <ul className="space-y-2.5">
                  {HOBBIES[currentLang].map((hobby, index) => (
                    <li key={index} className="flex items-center gap-3 text-xs text-slate-300 font-sans font-medium bg-slate-950 border border-slate-850 p-2 rounded-xl hover:border-slate-800 transition-colors">
                      <div className="h-7.5 w-7.5 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center shrink-0">
                        {getHobbyIcon(hobby.icon)}
                      </div>
                      <span className="text-[11px] font-bold tracking-wide uppercase">{hobby.name}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Profile Avatar Modal */}
      {isAvatarModalOpen && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-md p-4 cursor-zoom-out"
          onClick={() => setIsAvatarModalOpen(false)}
        >
          <div className="relative max-w-xl max-h-[85vh] overflow-hidden rounded-3xl border-2 border-slate-800 bg-slate-950 p-2 shadow-2xl animate-in fade-in zoom-in duration-300">
            {PERSONAL_INFO.profileImage && (
              <img 
                src={PERSONAL_INFO.profileImage} 
                alt={PERSONAL_INFO.name} 
                className="w-full h-auto max-h-[80vh] rounded-2xl object-contain"
              />
            )}
            {/* Close button */}
            <button 
              onClick={() => setIsAvatarModalOpen(false)}
              className="absolute top-4 right-4 h-9 w-9 rounded-full bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-white flex items-center justify-center cursor-pointer transition-colors"
            >
              ✕
            </button>
          </div>
        </div>
      )}

    </section>
  );
}
