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
    <section id="skills" className="pt-4 pb-8 md:pt-6 md:pb-10 px-4 max-w-7xl mx-auto scroll-mt-16">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-5">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-emerald-500/10 rounded-full text-xs font-bold text-emerald-400 uppercase tracking-widest mb-2.5 border border-emerald-500/20">
          <Wrench className="h-3.5 w-3.5" />
          <span>{translations.navSkills}</span>
        </div>
        <h2 className="font-display font-black text-2xl md:text-4xl text-white tracking-tight uppercase mb-2">
          {translations.skillsTitle}
        </h2>
        <p className="text-slate-400 text-xs md:text-sm max-w-2xl mx-auto">
          {currentLang === 'en'
            ? 'Core systems, server environments, open-source platforms, and administrative tools used in my day-to-day workflow.'
            : 'Sistem utama, lingkungan server, platform open-source, dan perangkat operasional yang saya gunakan sehari-hari.'}
        </p>
      </div>

      {/* Category Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-2 mb-5">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id as any)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold tracking-wider uppercase transition-all cursor-pointer border ${
              activeCategory === cat.id
                ? 'bg-emerald-400 text-slate-950 border-emerald-400 font-extrabold shadow-md shadow-emerald-500/10'
                : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-white'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Skills Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5"
      >
        <AnimatePresence mode="popLayout">
          {filteredSkills.map((skill) => (
            <motion.div
              layout
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              key={skill.name}
              className="bg-slate-900/50 border border-slate-800 hover:border-emerald-500/40 rounded-xl p-4 shadow-sm relative overflow-hidden transition-all duration-300"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-center shrink-0">
                    {getCategoryIcon(skill.category)}
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-slate-100">
                      {highlightText(skill.name, searchQuery)}
                    </h3>
                    <span className="text-[11px] font-mono text-emerald-400/90 font-medium">
                      {getLevelLabel(skill.level)}
                    </span>
                  </div>
                </div>

                <CheckCircle className="h-4 w-4 text-emerald-400 shrink-0" />
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
          className="text-center py-8 bg-slate-900/40 border border-slate-800 rounded-2xl max-w-md mx-auto"
        >
          <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">{translations.noResults}</p>
        </motion.div>
      )}
    </section>
  );
}
