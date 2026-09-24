import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Phone, Mail, Instagram, Twitter, Facebook, MapPin, CheckCircle, Languages, Heart, Music, Dumbbell, Compass, Server, Database, Wrench, ArrowDown, Download } from 'lucide-react';
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
    <section id="about" className="relative w-full max-w-7xl mx-auto px-4 pt-4 pb-8 md:pt-6 md:pb-10">
      <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-14 items-center ">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="space-y-8"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-emerald-300">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            {currentLang === 'en' ? 'Available for IT Infrastructure Roles' : 'Terbuka untuk Peran Infrastruktur IT'}
          </div>

          <div className="space-y-5">
            <p className="font-mono text-sm font-bold uppercase tracking-[0.24em] text-slate-400">
              {translations.heroSubtitle}
            </p>
            <h1 className="font-display text-5xl md:text-7xl font-black tracking-tight text-white leading-[0.95]">
              {PERSONAL_INFO.name}
            </h1>
            <p className="max-w-3xl text-lg md:text-xl leading-8 text-slate-300">
              {summary[currentLang]}
            </p>
            <p className="max-w-3xl text-sm md:text-base leading-7 text-slate-400">
              {PERSONAL_INFO.aboutMe[currentLang]}
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-3">
            {highlights[currentLang].map((item) => (
              <div key={item.label} className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
                <p className="text-sm font-black text-white">{item.label}</p>
                <p className="mt-1 text-xs leading-5 text-slate-400">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={onScrollToContact}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-400 px-5 py-3 text-sm font-black uppercase tracking-wider text-slate-950 transition hover:bg-emerald-300 cursor-pointer"
            >
              <Mail className="h-4 w-4" />
              {translations.navContact}
            </button>
            <button
              onClick={onDownloadPdf}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-950/70 px-5 py-3 text-sm font-black uppercase tracking-wider text-slate-200 transition hover:border-slate-500 hover:text-white cursor-pointer"
            >
              <Download className="h-4 w-4" />
              {translations.downloadButton}
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
          className="space-y-5"
        >
          <div className="rounded-[2rem] border border-slate-800 bg-slate-950/80 p-5 shadow-2xl shadow-black/30">
            <button
              onClick={() => setIsAvatarModalOpen(true)}
              className="group relative block w-full overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 text-left cursor-pointer"
            >
              <img
                src={PERSONAL_INFO.profileImage}
                alt={PERSONAL_INFO.name}
                className="h-72 sm:h-80 md:h-[22rem] w-full object-cover object-center transition duration-500 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950 via-slate-950/75 to-transparent p-6">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-emerald-300">{PERSONAL_INFO.title}</p>
                <p className="mt-2 text-2xl font-black text-white">{PERSONAL_INFO.name}</p>
                <p className="mt-2 flex items-center gap-2 text-sm text-slate-300"><MapPin className="h-4 w-4" /> Tangerang, Indonesia</p>
              </div>
            </button>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="rounded-3xl border border-slate-800 bg-slate-950/80 p-5">
              <div className="flex items-center gap-2 text-sm font-black text-white">
                <Server className="h-4 w-4 text-emerald-400" />
                {currentLang === 'en' ? 'Daily Focus' : 'Fokus Harian'}
              </div>
              <ul className="mt-4 space-y-3 text-sm text-slate-300">
                <li className="flex gap-2"><CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" /> Server, email, backup, and uptime checks</li>
                <li className="flex gap-2"><CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" /> Helpdesk, SOP, and user support</li>
                <li className="flex gap-2"><CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" /> Simple automation for repetitive work</li>
              </ul>
            </div>

            <div className="rounded-3xl border border-slate-800 bg-slate-950/80 p-5">
              <div className="flex items-center gap-2 text-sm font-black text-white">
                <Database className="h-4 w-4 text-emerald-400" />
                {translations.langTitle}
              </div>
              <div className="mt-4 space-y-3">
                {LANGUAGES[currentLang].map((lang) => (
                  <div key={lang.name}>
                    <div className="flex justify-between gap-3 text-xs font-bold text-slate-200">
                      <span>{lang.name}</span>
                      <span className="text-slate-400">{lang.level}</span>
                    </div>
                    <div className="mt-2 h-1.5 rounded-full bg-slate-800">
                      <div className={`h-full rounded-full bg-emerald-400 ${lang.name.toLowerCase().includes('inggris') || lang.name.toLowerCase().includes('english') ? 'w-7/12' : 'w-full'}`} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="mt-6 grid lg:grid-cols-[1.2fr_0.8fr] gap-5">
        <div className="rounded-3xl border border-slate-800 bg-slate-950/70 p-5">
          <div className="flex items-center gap-2 text-sm font-black text-white mb-4">
            <Wrench className="h-4 w-4 text-emerald-400" />
            {currentLang === 'en' ? 'Contact & Professional Links' : 'Kontak & Profil Profesional'}
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {contactItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target={item.href.startsWith('http') ? '_blank' : undefined}
                rel="noreferrer"
                className="flex items-center gap-3 rounded-2xl border border-slate-800 bg-slate-900/60 px-4 py-3 text-sm text-slate-300 transition hover:border-emerald-400/40 hover:text-white"
              >
                <span className="text-emerald-400">{item.icon}</span>
                <span className="truncate">{item.label}</span>
              </a>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-950/70 p-5">
          <div className="flex items-center gap-2 text-sm font-black text-white mb-4">
            <Heart className="h-4 w-4 text-emerald-400" />
            {translations.personalityTitle}
          </div>
          <div className="flex flex-wrap gap-2">
            {PERSONALITY[currentLang].map((trait) => (
              <span key={trait} className="rounded-full border border-slate-800 bg-slate-900/80 px-3 py-1.5 text-xs font-bold text-slate-300">
                {trait}
              </span>
            ))}
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {HOBBIES[currentLang].map((hobby) => (
              <span key={hobby.name} className="inline-flex items-center gap-2 rounded-full bg-slate-900/70 px-3 py-1.5 text-xs font-bold text-slate-300">
                {getHobbyIcon(hobby.icon)} {hobby.name}
              </span>
            ))}
          </div>
        </div>
      </div>

      <button
        onClick={() => document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' })}
        className="mx-auto mt-6 flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-slate-500 transition hover:text-emerald-300 cursor-pointer"
      >
        {currentLang === 'en' ? 'See Technical Skills' : 'Lihat Keahlian Teknis'}
        <ArrowDown className="h-4 w-4" />
      </button>

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

