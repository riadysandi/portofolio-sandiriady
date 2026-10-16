import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Phone, Mail, Instagram, Twitter, Facebook, MapPin, CheckCircle, Languages, Heart, Music, Dumbbell, Compass, Server, Database, Wrench, Download } from 'lucide-react';
import { Language, Translation } from '../types';
import { PERSONAL_INFO, PERSONALITY, HOBBIES, LANGUAGES } from '../data';

interface HeroProps {
  currentLang: Language;
  translations: Translation;
  onScrollToContact: () => void;
  onDownloadPdf: () => void;
}

const highlights = {
  en: [
    { label: 'Linux, Docker, Zimbra', desc: 'Daily server and email operations' },
    { label: 'ERPNext / Frappe', desc: 'Self-hosted business application deployment' },
    { label: 'GLPI, n8n, Dashy', desc: 'Helpdesk, automation, and internal dashboards' },
  ],
  id: [
    { label: 'Linux, Docker, Zimbra', desc: 'Operasional server dan email harian' },
    { label: 'ERPNext / Frappe', desc: 'Implementasi aplikasi bisnis self-hosted' },
    { label: 'GLPI, n8n, Dashy', desc: 'Helpdesk, otomatisasi, dan dasbor internal' },
  ],
};

const summary = {
  en: 'I help teams keep IT operations reliable: servers, email, business apps, helpdesk workflows, documentation, and practical automation.',
  id: 'Saya membantu operasional IT kantor tetap rapi dan stabil: server, email, aplikasi bisnis, helpdesk, dokumentasi, dan otomatisasi praktis.',
};

export default function Hero({ currentLang, translations, onScrollToContact, onDownloadPdf }: HeroProps) {
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);

  const contactItems = [
    { icon: <Phone className="h-4 w-4" />, label: PERSONAL_INFO.contacts.whatsapp, href: `https://wa.me/${PERSONAL_INFO.contacts.whatsapp.replace(/[^0-9]/g, '')}` },
    { icon: <Mail className="h-4 w-4" />, label: PERSONAL_INFO.contacts.email, href: `mailto:${PERSONAL_INFO.contacts.email}` },
    { icon: <Instagram className="h-4 w-4" />, label: PERSONAL_INFO.contacts.instagram, href: `https://instagram.com/${PERSONAL_INFO.contacts.instagram.replace('@', '')}` },
    { icon: <Twitter className="h-4 w-4" />, label: PERSONAL_INFO.contacts.twitter, href: `https://twitter.com/${PERSONAL_INFO.contacts.twitter.replace('@', '')}` },
    { icon: <Facebook className="h-4 w-4" />, label: PERSONAL_INFO.contacts.facebook, href: 'https://facebook.com' },
  ];

  const getHobbyIcon = (iconName: string) => {
    switch (iconName) {
      case 'Music': return <Music className="h-4 w-4 text-emerald-400" />;
      case 'Dumbbell': return <Dumbbell className="h-4 w-4 text-emerald-400" />;
      case 'Compass': return <Compass className="h-4 w-4 text-emerald-400" />;
      default: return <Heart className="h-4 w-4 text-emerald-400" />;
    }
  };

  return (
    <section id="about" className="relative w-full max-w-7xl mx-auto px-4 pt-4 pb-4 md:pt-6 md:pb-6 scroll-mt-20">
      {/* Editorial Top Status Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b border-white/10 text-[10px] font-mono uppercase tracking-[0.2em] text-slate-400">
        <div className="flex items-center gap-3">
          <span className="text-emerald-400 font-bold">(00)</span>
          <span className="text-white font-bold">PORTFOLIO & SYSTEM SPEC</span>
          <span className="text-slate-600">/</span>
          <span className="text-slate-400 hidden sm:inline">TANGERANG, INDONESIA</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
          </span>
          <span className="text-emerald-400 font-bold tracking-wider">
            {currentLang === 'en' ? 'SYSTEMS ACTIVE • AVAILABLE FOR ROLES' : 'SISTEM AKTIF • TERBUKA UNTUK KERJA'}
          </span>
        </div>
      </div>

      <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-8 lg:gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.3, 0, 0.1, 1] }}
          className="space-y-6 md:space-y-7"
        >
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-[0.25em] text-emerald-400 uppercase">
              <span>[ 2026 ARCHIVE ]</span>
              <span className="text-slate-700">&bull;</span>
              <span>{translations.heroSubtitle}</span>
            </div>

            <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter text-white uppercase leading-[0.9] select-none">
              {PERSONAL_INFO.name}
            </h1>
            
            <p className="max-w-3xl text-base md:text-lg leading-7 md:leading-8 text-slate-200 font-sans font-medium pt-1">
              {summary[currentLang]}
            </p>
            <p className="max-w-3xl text-xs md:text-sm leading-6 md:leading-7 text-slate-400 font-sans">
              {PERSONAL_INFO.aboutMe[currentLang]}
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-3">
            {highlights[currentLang].map((item, idx) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 + idx * 0.08, ease: [0.3, 0, 0.1, 1] }}
                whileHover={{ y: -3 }}
                className="rounded-xl border border-white/10 bg-[#060606] p-4 transition-all duration-300 hover:border-emerald-400/50 hover:bg-white/[0.02] hover:shadow-[0_0_20px_rgba(16,185,129,0.1)] cursor-default group"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-mono text-[9px] text-emerald-400 font-bold">0{idx + 1}</span>
                  <span className="h-1 w-1 rounded-full bg-slate-700 group-hover:bg-emerald-400 transition-colors" />
                </div>
                <p className="text-sm font-black text-white group-hover:text-emerald-300 transition-colors">{item.label}</p>
                <p className="mt-1 text-xs leading-5 text-slate-400">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-1">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ ease: [0.3, 0, 0.1, 1], duration: 0.2 }}
              onClick={onScrollToContact}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-400 px-6 py-3.5 text-xs font-mono font-black uppercase tracking-[0.15em] text-slate-950 transition-all hover:bg-emerald-300 cursor-pointer shadow-lg shadow-emerald-500/20"
            >
              <Mail className="h-4 w-4" />
              <span>[ {translations.navContact} ]</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ ease: [0.3, 0, 0.1, 1], duration: 0.2 }}
              onClick={onDownloadPdf}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-black px-6 py-3.5 text-xs font-mono font-black uppercase tracking-[0.15em] text-slate-200 transition-all hover:border-white hover:text-white cursor-pointer shadow-md"
            >
              <Download className="h-4 w-4" />
              <span>[ {translations.downloadButton} ]</span>
            </motion.button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.3, 0, 0.1, 1] }}
          className="space-y-4"
        >
          {/* Editorial Frame with Corner Accents */}
          <div className="relative rounded-2xl sm:rounded-3xl border border-white/10 bg-[#050505] p-3 sm:p-4 shadow-2xl transition-all duration-500 hover:border-emerald-400/40 hover:shadow-[0_0_35px_rgba(16,185,129,0.12)] group">
            {/* Corner Crosshairs */}
            <span className="absolute -top-1.5 -left-1.5 text-xs font-mono text-emerald-400 font-bold select-none">+</span>
            <span className="absolute -top-1.5 -right-1.5 text-xs font-mono text-emerald-400 font-bold select-none">+</span>
            <span className="absolute -bottom-1.5 -left-1.5 text-xs font-mono text-emerald-400 font-bold select-none">+</span>
            <span className="absolute -bottom-1.5 -right-1.5 text-xs font-mono text-emerald-400 font-bold select-none">+</span>

            <button
              onClick={() => setIsAvatarModalOpen(true)}
              className="relative block w-full overflow-hidden rounded-xl sm:rounded-2xl border border-white/10 bg-black text-left cursor-pointer"
            >
              <img
                src={PERSONAL_INFO.profileImage}
                alt={PERSONAL_INFO.name}
                className="h-72 sm:h-80 md:h-[22rem] w-full object-cover object-center transition duration-700 ease-[cubic-bezier(0.3,0,0.1,1)] group-hover:scale-[1.04]"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/85 to-transparent p-5 sm:p-6">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <p className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-emerald-400">{PERSONAL_INFO.title}</p>
                  <span className="font-mono text-[9px] text-slate-500 font-bold uppercase">ID: SR-2026</span>
                </div>
                <p className="text-xl sm:text-2xl font-display font-black text-white uppercase tracking-tight">{PERSONAL_INFO.name}</p>
                <p className="mt-1 flex items-center gap-2 text-xs font-mono text-slate-400"><MapPin className="h-3.5 w-3.5 text-emerald-400" /> TANGERANG &bull; BANTEN [IDN]</p>
              </div>
            </button>
          </div>

          <div className="grid sm:grid-cols-2 gap-3">
            <div className="rounded-xl border border-white/10 bg-[#060606] p-4 hover:border-white/20 transition-all duration-300">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-white uppercase tracking-wider">
                  <Server className="h-3.5 w-3.5 text-emerald-400" />
                  <span>{currentLang === 'en' ? 'Daily Focus' : 'Fokus Harian'}</span>
                </div>
                <span className="font-mono text-[9px] text-slate-500 font-bold">CORE</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-300 font-sans">
                <li className="flex gap-2 items-start"><CheckCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-400" /> Server, email, backup & uptime</li>
                <li className="flex gap-2 items-start"><CheckCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-400" /> Helpdesk, SOP, & technical support</li>
                <li className="flex gap-2 items-start"><CheckCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-400" /> Workflow & Bash automations</li>
              </ul>
            </div>

            <div className="rounded-xl border border-white/10 bg-[#060606] p-4 hover:border-white/20 transition-all duration-300">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-white uppercase tracking-wider">
                  <Database className="h-3.5 w-3.5 text-emerald-400" />
                  <span>{translations.langTitle}</span>
                </div>
                <span className="font-mono text-[9px] text-slate-500 font-bold">LANG</span>
              </div>
              <div className="space-y-2.5">
                {LANGUAGES[currentLang].map((lang) => (
                  <div key={lang.name}>
                    <div className="flex justify-between gap-3 text-xs font-bold text-slate-200">
                      <span>{lang.name}</span>
                      <span className="text-slate-400 text-[10px] font-mono">{lang.level}</span>
                    </div>
                    <div className="mt-1.5 h-1 rounded-full bg-slate-900 border border-white/10">
                      <div className={`h-full rounded-full bg-emerald-400 ${lang.name.toLowerCase().includes('inggris') || lang.name.toLowerCase().includes('english') ? 'w-7/12' : 'w-full'}`} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="mt-4 md:mt-5 grid lg:grid-cols-[1.2fr_0.8fr] gap-4">
        <div className="rounded-xl border border-white/10 bg-[#060606] p-4 sm:p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-white uppercase tracking-wider">
              <Wrench className="h-3.5 w-3.5 text-emerald-400" />
              <span>{currentLang === 'en' ? 'Direct Comms & Network' : 'Jalur Kontak & Jejaring'}</span>
            </div>
            <span className="font-mono text-[9px] text-slate-500 font-bold">INDEX: 01</span>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {contactItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target={item.href.startsWith('http') ? '_blank' : undefined}
                rel="noreferrer"
                className="flex items-center gap-2.5 rounded-lg border border-white/10 bg-black/60 px-3 py-2 text-xs font-mono text-slate-300 transition-all duration-300 hover:border-emerald-400/50 hover:text-white hover:bg-emerald-950/20"
              >
                <span className="text-emerald-400 shrink-0">{item.icon}</span>
                <span className="truncate">{item.label}</span>
              </a>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-white/10 bg-[#060606] p-4 sm:p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-white uppercase tracking-wider">
              <Heart className="h-3.5 w-3.5 text-emerald-400" />
              <span>{translations.personalityTitle}</span>
            </div>
            <span className="font-mono text-[9px] text-slate-500 font-bold">INDEX: 02</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {PERSONALITY[currentLang].map((trait) => (
              <span key={trait} className="rounded-md border border-white/10 bg-black px-2.5 py-1 text-[11px] font-mono text-slate-300">
                {trait}
              </span>
            ))}
          </div>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {HOBBIES[currentLang].map((hobby) => (
              <span key={hobby.name} className="inline-flex items-center gap-1.5 rounded-md bg-black border border-white/10 px-2.5 py-1 text-[11px] font-mono text-slate-300">
                {getHobbyIcon(hobby.icon)} {hobby.name}
              </span>
            ))}
          </div>
        </div>
      </div>

      {isAvatarModalOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4 backdrop-blur-md"
          onClick={() => setIsAvatarModalOpen(false)}
        >
          <img
            src={PERSONAL_INFO.profileImage}
            alt={PERSONAL_INFO.name}
            className="max-h-[85vh] max-w-full rounded-3xl border border-slate-700 object-contain shadow-2xl"
          />
        </div>
      )}
    </section>
  );
}


