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
      <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-8 lg:gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-6 md:space-y-7"
        >
          <div className="inline-flex items-center gap-2.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.12)] backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
            </span>
            {currentLang === 'en' ? 'Available for IT Infrastructure Roles' : 'Terbuka untuk Peran Infrastruktur IT'}
          </div>

          <div className="space-y-4">
            <p className="font-mono text-xs md:text-sm font-bold uppercase tracking-[0.24em] text-emerald-400/90 flex items-center gap-2">
              <span className="h-1 w-5 bg-emerald-400 rounded-full inline-block" />
              {translations.heroSubtitle}
            </p>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[0.95]">
              {PERSONAL_INFO.name}
            </h1>
            <p className="max-w-3xl text-base md:text-lg leading-7 md:leading-8 text-slate-300">
              {summary[currentLang]}
            </p>
            <p className="max-w-3xl text-xs md:text-sm leading-6 md:leading-7 text-slate-400">
              {PERSONAL_INFO.aboutMe[currentLang]}
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-3">
            {highlights[currentLang].map((item, idx) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 + idx * 0.08 }}
                whileHover={{ y: -3, scale: 1.01 }}
                className="rounded-2xl border border-slate-800 bg-[#0A0A0A] p-4 transition-all duration-300 hover:border-emerald-500/40 hover:shadow-[0_0_20px_rgba(16,185,129,0.08)] cursor-default"
              >
                <p className="text-sm font-black text-white">{item.label}</p>
                <p className="mt-1 text-xs leading-5 text-slate-400">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-1">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onScrollToContact}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-400 px-5 py-3 text-sm font-black uppercase tracking-wider text-slate-950 transition hover:bg-emerald-300 cursor-pointer shadow-lg shadow-emerald-500/20"
            >
              <Mail className="h-4 w-4" />
              {translations.navContact}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onDownloadPdf}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-800 bg-[#0A0A0A] px-5 py-3 text-sm font-black uppercase tracking-wider text-slate-200 transition hover:border-slate-600 hover:text-white cursor-pointer shadow-md"
            >
              <Download className="h-4 w-4" />
              {translations.downloadButton}
            </motion.button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-4"
        >
          <div className="rounded-[2rem] border border-slate-800 bg-[#0A0A0A] p-4 sm:p-5 shadow-2xl transition-all duration-500 hover:border-emerald-500/40 hover:shadow-[0_0_35px_rgba(16,185,129,0.12)]">
            <button
              onClick={() => setIsAvatarModalOpen(true)}
              className="group relative block w-full overflow-hidden rounded-2xl sm:rounded-3xl border border-slate-800/80 bg-slate-900 text-left cursor-pointer"
            >
              <img
                src={PERSONAL_INFO.profileImage}
                alt={PERSONAL_INFO.name}
                className="h-72 sm:h-80 md:h-[22rem] w-full object-cover object-center transition duration-500 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/80 to-transparent p-5 sm:p-6">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-emerald-400">{PERSONAL_INFO.title}</p>
                <p className="mt-1.5 text-2xl font-black text-white">{PERSONAL_INFO.name}</p>
                <p className="mt-1.5 flex items-center gap-2 text-xs sm:text-sm text-slate-300"><MapPin className="h-4 w-4 text-emerald-400" /> Tangerang, Indonesia</p>
              </div>
            </button>
          </div>

          <div className="grid sm:grid-cols-2 gap-3.5">
            <div className="rounded-2xl sm:rounded-3xl border border-slate-800 bg-[#0A0A0A] p-4 sm:p-5 hover:border-slate-700 transition-colors">
              <div className="flex items-center gap-2 text-sm font-black text-white">
                <Server className="h-4 w-4 text-emerald-400" />
                {currentLang === 'en' ? 'Daily Focus' : 'Fokus Harian'}
              </div>
              <ul className="mt-3.5 space-y-2.5 text-xs sm:text-sm text-slate-300">
                <li className="flex gap-2"><CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" /> Server, email, backup, & uptime</li>
                <li className="flex gap-2"><CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" /> Helpdesk, SOP, & user support</li>
                <li className="flex gap-2"><CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" /> Practical automation scripts</li>
              </ul>
            </div>

            <div className="rounded-2xl sm:rounded-3xl border border-slate-800 bg-[#0A0A0A] p-4 sm:p-5 hover:border-slate-700 transition-colors">
              <div className="flex items-center gap-2 text-sm font-black text-white">
                <Database className="h-4 w-4 text-emerald-400" />
                {translations.langTitle}
              </div>
              <div className="mt-3.5 space-y-2.5">
                {LANGUAGES[currentLang].map((lang) => (
                  <div key={lang.name}>
                    <div className="flex justify-between gap-3 text-xs font-bold text-slate-200">
                      <span>{lang.name}</span>
                      <span className="text-slate-400 text-[11px]">{lang.level}</span>
                    </div>
                    <div className="mt-1.5 h-1.5 rounded-full bg-slate-900 border border-slate-800">
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
        <div className="rounded-2xl sm:rounded-3xl border border-slate-800 bg-[#0A0A0A] p-4 sm:p-5">
          <div className="flex items-center gap-2 text-sm font-black text-white mb-3.5">
            <Wrench className="h-4 w-4 text-emerald-400" />
            {currentLang === 'en' ? 'Contact & Professional Links' : 'Kontak & Profil Profesional'}
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
            {contactItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target={item.href.startsWith('http') ? '_blank' : undefined}
                rel="noreferrer"
                className="flex items-center gap-2.5 rounded-xl border border-slate-800/80 bg-black/60 px-3.5 py-2.5 text-xs text-slate-300 transition-all duration-200 hover:border-emerald-500/50 hover:text-white hover:bg-emerald-950/10"
              >
                <span className="text-emerald-400">{item.icon}</span>
                <span className="truncate font-medium">{item.label}</span>
              </a>
            ))}
          </div>
        </div>

        <div className="rounded-2xl sm:rounded-3xl border border-slate-800 bg-[#0A0A0A] p-4 sm:p-5">
          <div className="flex items-center gap-2 text-sm font-black text-white mb-3.5">
            <Heart className="h-4 w-4 text-emerald-400" />
            {translations.personalityTitle}
          </div>
          <div className="flex flex-wrap gap-2">
            {PERSONALITY[currentLang].map((trait) => (
              <span key={trait} className="rounded-full border border-slate-800 bg-black/60 px-3 py-1 text-xs font-bold text-slate-300">
                {trait}
              </span>
            ))}
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {HOBBIES[currentLang].map((hobby) => (
              <span key={hobby.name} className="inline-flex items-center gap-1.5 rounded-full bg-black/60 border border-slate-800 px-3 py-1 text-xs font-bold text-slate-300">
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


