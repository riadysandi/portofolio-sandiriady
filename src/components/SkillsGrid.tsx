import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Wrench, Terminal, Cpu, Monitor, Network, ShieldCheck } from 'lucide-react';
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
    { id: 'all', label: currentLang === 'en' ? 'All' : 'Semua' },
    { id: 'core', label: currentLang === 'en' ? 'Core Dev/Infra' : 'Inti Dev/Infra' },
    { id: 'infra', label: currentLang === 'en' ? 'Systems & Mail' : 'Sistem & Email' },
    { id: 'automation', label: currentLang === 'en' ? 'Automation' : 'Otomatisasi' },
    { id: 'tools', label: currentLang === 'en' ? 'Helpdesk & Tools' : 'Helpdesk & Alat' },
  ];

  // Filter skills based on both search query and category
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
            <mark key={index} className="bg-emerald-500/20 text-emerald-400 font-black rounded px-1 py-0.5">
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
    <section id="skills" className="py-12 md:py-20 px-4 max-w-7xl mx-auto scroll-mt-20">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500/10 rounded-lg text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-4 border border-emerald-500/20">
          <Wrench className="h-3.5 w-3.5" />
          <span>{translations.navSkills}</span>
        </div>
        <h2 className="font-display font-black text-3xl md:text-5xl text-white tracking-tighter uppercase mb-3">
          {translations.skillsTitle}
        </h2>
      </div>

      {/* Category Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id as any)}
            className={`px-4 py-2.5 rounded-xl text-[10px] font-black tracking-widest uppercase transition-all cursor-pointer border-2 ${
              activeCategory === cat.id
                ? 'bg-emerald-500 text-slate-950 border-emerald-500 font-black shadow-lg shadow-emerald-500/10'
                : 'bg-[#0A0A0A] text-slate-400 border-slate-800 hover:border-slate-700 hover:text-white'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Skills Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
      >
        <AnimatePresence mode="popLayout">
          {filteredSkills.map((skill) => (
            <motion.div
              layout
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              whileHover={{ y: -6, scale: 1.015 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
              key={skill.name}
              className="bg-[#0A0A0A] border-2 border-slate-800 hover:border-emerald-500/40 rounded-3xl p-6 shadow-xl relative overflow-hidden group cursor-pointer"
            >
              {/* Subtle hover background highlight gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none" />

              <div className="flex items-center justify-between mb-4 relative z-10">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-xl bg-slate-950 flex items-center justify-center border border-slate-800 group-hover:bg-emerald-950/20 group-hover:border-emerald-500/30 transition-colors">
                    {getCategoryIcon(skill.category)}
                  </div>
                  <h3 className="font-display font-black text-sm text-slate-200 uppercase tracking-wide group-hover:text-white transition-colors">
                    {highlightText(skill.name, searchQuery)}
                  </h3>
                </div>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={`h-1.5 w-1.5 rounded-full transition-colors duration-300 ${
                        i < skill.level ? 'bg-emerald-400 group-hover:bg-emerald-300' : 'bg-slate-800'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Progress meter */}
              <div className="space-y-1.5 relative z-10">
                <div className="flex justify-between items-center text-[9px] font-bold text-slate-500 uppercase tracking-widest">
                  <span>Proficiency</span>
                  <span className="text-emerald-400 font-bold group-hover:text-emerald-300">{skill.level * 20}%</span>
                </div>
                <div className="h-1.5 bg-slate-950 rounded-full overflow-hidden border border-slate-900">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level * 20}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    className="h-full bg-emerald-400 group-hover:bg-emerald-300 rounded-full"
                  />
                </div>
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
          className="text-center py-12 bg-[#0A0A0A] border-2 border-slate-800 rounded-3xl max-w-md mx-auto"
        >
          <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">{translations.noResults}</p>
        </motion.div>
      )}
    </section>
  );
}
