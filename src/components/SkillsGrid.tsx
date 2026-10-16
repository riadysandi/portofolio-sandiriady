import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Wrench, Terminal, Cpu, Network, CheckCircle } from 'lucide-react';
import { Language, Translation, Skill } from '../types';
import { SKILLS } from '../data';

interface SkillsGridProps {
  currentLang: Language;
  translations: Translation;
  searchQuery: string;
}

export default function SkillsGrid({ currentLang, translations, searchQuery }: SkillsGridProps) {
  const [activeCategory, setActiveCategory] = useState<'all' | 'core' | 'infra' | 'automation' | 'tools'>('all');

  const categories = [
    { id: 'all', label: currentLang === 'en' ? 'All Skills' : 'Semua Keahlian' },
    { id: 'core', label: currentLang === 'en' ? 'Linux & Containers' : 'Linux & Kontainer' },
    { id: 'infra', label: currentLang === 'en' ? 'Mail & Network' : 'Email & Jaringan' },
    { id: 'automation', label: currentLang === 'en' ? 'Automation & Scripting' : 'Otomatisasi & Skrip' },
    { id: 'tools', label: currentLang === 'en' ? 'Helpdesk & Tools' : 'Helpdesk & Tools' },
  ];

  const getLevelLabel = (level: number) => {
    if (level >= 5) return currentLang === 'en' ? 'Daily Operations' : 'Operasional Harian';
    if (level === 4) return currentLang === 'en' ? 'Proficient / Hands-on' : 'Terbiasa & Mahir';
    return currentLang === 'en' ? 'Working Knowledge' : 'Pengetahuan Kerja';
  };

  const filteredSkills = SKILLS.filter((skill) => {
    const matchesCategory = activeCategory === 'all' || skill.category === activeCategory;
    const matchesSearch = skill.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'core': return <Cpu className="h-4 w-4 text-emerald-400" />;
      case 'infra': return <Network className="h-4 w-4 text-emerald-400" />;
      case 'automation': return <Terminal className="h-4 w-4 text-emerald-400" />;
      case 'tools': return <Wrench className="h-4 w-4 text-emerald-400" />;
      default: return <Wrench className="h-4 w-4 text-slate-400" />;
    }
  };

  const highlightText = (text: string, search: string) => {
    if (!search) return <span>{text}</span>;
    const parts = text.split(new RegExp(`(${search})`, 'gi'));
    return (
      <span>
        {parts.map((part, index) =>
          part.toLowerCase() === search.toLowerCase() ? (
            <mark key={index} className="bg-emerald-500/20 text-emerald-400 font-bold rounded px-1 py-0.5">
              {part}
            </mark>
          ) : (
            part
          )
        )}
      </span>
    );
  };

  return (
    <section id="skills" className="py-6 md:py-8 px-4 max-w-7xl mx-auto scroll-mt-20">
      {/* Editorial Section Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 mb-6 border-b border-white/10 text-[10px] font-mono uppercase tracking-[0.2em] text-slate-400">
        <div className="flex items-center gap-3">
          <span className="text-emerald-400 font-bold">(01)</span>
          <span className="text-white font-bold">{translations.navSkills}</span>
          <span className="text-slate-600">/</span>
          <span className="text-slate-400">SYSTEM CAPABILITIES & TOOLS</span>
        </div>
        <div className="font-mono text-[9px] text-slate-500 font-bold uppercase tracking-wider">
          ARCHIVE // {filteredSkills.length} MODULES LOADED
        </div>
      </div>

      <div className="max-w-3xl mb-6">
        <h2 className="font-display font-black text-3xl md:text-5xl text-white tracking-tight uppercase mb-2">
          {translations.skillsTitle}
        </h2>
        <p className="text-slate-400 text-xs md:text-sm max-w-2xl font-sans">
          {currentLang === 'en'
            ? 'Core systems, server environments, open-source platforms, and administrative tools used in my day-to-day workflow.'
            : 'Sistem utama, lingkungan server, platform open-source, dan perangkat operasional yang saya gunakan sehari-hari.'}
        </p>
      </div>

      {/* Category Filter Buttons - Eraf Hairline Aesthetic */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((cat) => (
          <motion.button
            key={cat.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ ease: [0.3, 0, 0.1, 1], duration: 0.2 }}
            onClick={() => setActiveCategory(cat.id as any)}
            className={`px-3.5 py-1.5 rounded-lg text-[11px] font-mono uppercase tracking-wider transition-all cursor-pointer border ${
              activeCategory === cat.id
                ? 'bg-white text-black border-white font-bold shadow-[0_0_15px_rgba(255,255,255,0.15)]'
                : 'bg-[#060606] text-slate-400 border-white/10 hover:border-white/30 hover:text-white'
            }`}
          >
            {cat.label}
          </motion.button>
        ))}
      </div>

      {/* Skills Grid with Corner Crosshairs */}
      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5"
      >
        <AnimatePresence mode="popLayout">
          {filteredSkills.map((skill, idx) => (
            <motion.div
              layout
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.35, ease: [0.3, 0, 0.1, 1] }}
              whileHover={{ y: -3 }}
              key={skill.name}
              className="group bg-[#060606] border border-white/10 hover:border-emerald-400/50 hover:bg-white/[0.02] hover:shadow-[0_0_20px_rgba(16,185,129,0.08)] rounded-xl p-4 shadow-sm relative overflow-hidden transition-all duration-300"
            >
              {/* Corner crosshair markers */}
              <span className="absolute -top-1 -left-1 text-[10px] font-mono text-emerald-400/0 group-hover:text-emerald-400 font-bold select-none transition-colors duration-200">+</span>
              <span className="absolute -top-1 -right-1 text-[10px] font-mono text-emerald-400/0 group-hover:text-emerald-400 font-bold select-none transition-colors duration-200">+</span>
              <span className="absolute -bottom-1 -left-1 text-[10px] font-mono text-emerald-400/0 group-hover:text-emerald-400 font-bold select-none transition-colors duration-200">+</span>
              <span className="absolute -bottom-1 -right-1 text-[10px] font-mono text-emerald-400/0 group-hover:text-emerald-400 font-bold select-none transition-colors duration-200">+</span>

              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-black border border-white/10 flex items-center justify-center shrink-0 group-hover:border-emerald-400/40 group-hover:bg-emerald-950/20 transition-all duration-300">
                    {getCategoryIcon(skill.category)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[9px] text-slate-500 font-bold uppercase">
                        SK-{String(idx + 1).padStart(2, '0')}
                      </span>
                    </div>
                    <h3 className="font-bold text-sm text-slate-100 group-hover:text-emerald-300 transition-colors">
                      {highlightText(skill.name, searchQuery)}
                    </h3>
                    <span className="text-[10px] font-mono text-emerald-400 font-semibold uppercase tracking-wider block mt-0.5">
                      {getLevelLabel(skill.level)}
                    </span>
                  </div>
                </div>

                <CheckCircle className="h-3.5 w-3.5 text-emerald-400 shrink-0 group-hover:scale-110 transition-transform" />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Empty State */}
      {filteredSkills.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-8 bg-[#0A0A0A] border border-slate-800 rounded-2xl max-w-md mx-auto"
        >
          <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">{translations.noResults}</p>
        </motion.div>
      )}
    </section>
  );
}
