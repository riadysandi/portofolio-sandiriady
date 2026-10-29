import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, CheckCircle2, Heart, Music, Dumbbell, Compass, Sparkles } from 'lucide-react';
import { Language, Translation } from '../types';
import { PERSONAL_INFO, PERSONALITY, HOBBIES, LANGUAGES } from '../data';
import { DoodleCrown, DoodleStar, DoodleSwirl } from './Doodles';

interface AboutBentoProps {
  currentLang: Language;
  translations: Translation;
  onScrollToContact: () => void;
}

export default function AboutBento({ currentLang, translations, onScrollToContact }: AboutBentoProps) {
  const getHobbyIcon = (iconName: string) => {
    switch (iconName) {
      case 'Music': return <Music className="h-3.5 w-3.5 text-[#8b5cf6]" />;
      case 'Dumbbell': return <Dumbbell className="h-3.5 w-3.5 text-[#ccff00]" />;
      case 'Compass': return <Compass className="h-3.5 w-3.5 text-[#38bdf8]" />;
      default: return <Heart className="h-3.5 w-3.5 text-[#f43f5e]" />;
    }
  };

  return (
    <section id="about" className="max-w-7xl mx-auto px-4 py-8 md:py-12 scroll-mt-24 relative">
      <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-6 items-stretch">
        
        {/* ── Left Sticker Card: Neon Lime "FOCUS • DISCIPLINE • CONSISTENCY" ── */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative rounded-3xl bg-[#ccff00] p-6 sm:p-8 flex flex-col justify-between overflow-hidden shadow-2xl border-4 border-black group"
        >
          {/* Decorative Crown Doodle in black/yellow */}
          <div className="absolute top-4 right-4 text-black animate-float">
            <DoodleCrown className="w-10 h-10 text-black" />
          </div>

          <div>
            <div className="inline-block px-3 py-1 rounded-full bg-black text-[#ccff00] text-[10px] font-mono font-black uppercase tracking-wider mb-4">
              CORE PHILOSOPHY
            </div>

            {/* Bold Handwritten Slogans */}
            <h3 className="font-marker text-3xl sm:text-4xl text-black leading-tight uppercase tracking-wide">
              FOCUS<br />
              DISCIPLINE<br />
              PROBLEM SOLVER
            </h3>
          </div>

          {/* Avatar Cutout / Badge at bottom */}
          <div className="mt-8 pt-6 border-t-2 border-black/20 flex items-center gap-4">
            <div className="relative h-16 w-16 rounded-2xl overflow-hidden border-2 border-black bg-black shrink-0 shadow-md">
              <img
                src={PERSONAL_INFO.profileImage}
                alt={PERSONAL_INFO.name}
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div>
              <span className="font-display font-black text-black text-base uppercase block leading-tight">
                Sandi Riady
              </span>
              <span className="font-mono text-xs text-black/80 font-bold block">
                Tangerang, Indonesia
              </span>
            </div>
          </div>
        </motion.div>

        {/* ── Right Card: Dark "ABOUT ME" with Bio & Tags ── */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative rounded-3xl bg-[#12131a] border-2 border-[#232533] p-6 sm:p-8 lg:p-10 flex flex-col justify-between shadow-2xl"
        >
          {/* Swirl Doodle in top-right */}
          <div className="absolute top-4 right-4 text-[#8b5cf6] pointer-events-none opacity-80">
            <DoodleSwirl className="w-16 h-16 text-[#8b5cf6]" />
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-[#ccff00] font-marker text-lg">☆</span>
              <h2 className="font-marker text-2xl sm:text-3xl lg:text-4xl text-white tracking-wider uppercase">
                {translations.aboutTitle}
              </h2>
            </div>

            <p className="text-slate-200 text-sm sm:text-base leading-relaxed font-sans">
              {currentLang === 'en'
                ? "I am Sandi Riady, an IT Infrastructure & Systems Administrator based in Tangerang, Indonesia. I thrive on architecting stable, containerized server ecosystems, automating tedious corporate workflows, and ensuring zero-downtime reliability for everyday business operations."
                : "Saya Sandi Riady, praktisi IT Infrastructure Support dan Administrator Server di Tangerang, Indonesia. Saya berfokus memastikan stabilitas server Linux, kontainerisasi Docker, otomatisasi tiket dan alur kerja kantor, serta memberikan dukungan teknis berorientasi solusi bagi pengguna."}
            </p>

            {/* Personality Strengths Pills */}
            <div className="pt-2">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 block mb-2">
                {translations.personalityTitle}
              </span>
              <div className="flex flex-wrap gap-2">
                {PERSONALITY[currentLang].map((trait) => (
                  <span
                    key={trait}
                    className="px-3 py-1.5 rounded-full bg-[#1b1c28] border border-white/10 text-xs font-mono font-bold text-slate-200 flex items-center gap-1.5 hover:border-[#ccff00] transition-colors"
                  >
                    <CheckCircle2 className="h-3 w-3 text-[#ccff00]" />
                    <span>{trait}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Languages and Hobbies */}
            <div className="pt-2 grid sm:grid-cols-2 gap-4">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 block mb-2">
                  {translations.langTitle}
                </span>
                <div className="flex flex-wrap gap-2">
                  {LANGUAGES[currentLang].map((l) => (
                    <span key={l.name} className="px-2.5 py-1 rounded-lg bg-black/60 border border-white/10 text-xs font-mono text-slate-300">
                      <strong className="text-white">{l.name}</strong> &bull; {l.level}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 block mb-2">
                  {translations.hobbiesTitle}
                </span>
                <div className="flex flex-wrap gap-2">
                  {HOBBIES[currentLang].map((h) => (
                    <span key={h.name} className="px-2.5 py-1 rounded-lg bg-black/60 border border-white/10 text-xs font-mono text-slate-300 flex items-center gap-1.5">
                      {getHobbyIcon(h.icon)} {h.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Action Link at Bottom */}
          <div className="pt-6 border-t border-white/10 mt-6 flex items-center justify-between">
            <button
              type="button"
              onClick={onScrollToContact}
              className="inline-flex items-center gap-2 text-[#ccff00] hover:text-[#d9ff33] font-marker text-sm tracking-wide uppercase transition-colors cursor-pointer group"
            >
              <span>{currentLang === 'en' ? 'Know More / Contact Me' : 'Hubungi Sandi Riady'}</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
