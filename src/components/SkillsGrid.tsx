import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal, Cpu, Network, Wrench, Shield, Database, GitBranch, Layers, Sparkles } from 'lucide-react';
import { Language, Translation, Skill } from '../types';
import { SKILLS } from '../data';
import { DoodleSquiggle, DoodleSwirl } from './Doodles';

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

  // Distinctive App Tile Badge Colorings (Dikshant App Tiles style)
  const getSkillTileStyle = (name: string) => {
    const n = name.toLowerCase();
    if (n.includes('linux')) return { bg: 'bg-[#e95420]/15', text: 'text-[#e95420]', border: 'border-[#e95420]/30', badge: 'Ub', icon: 'Linux' };
    if (n.includes('docker')) return { bg: 'bg-[#0db7ed]/15', text: 'text-[#0db7ed]', border: 'border-[#0db7ed]/30', badge: 'Dk', icon: 'Docker' };
    if (n.includes('erpnext') || n.includes('frappe')) return { bg: 'bg-[#0089ff]/15', text: 'text-[#0089ff]', border: 'border-[#0089ff]/30', badge: 'Er', icon: 'Frappe' };
    if (n.includes('zimbra')) return { bg: 'bg-[#ea3923]/15', text: 'text-[#ea3923]', border: 'border-[#ea3923]/30', badge: 'Zm', icon: 'Zimbra' };
    if (n.includes('glpi')) return { bg: 'bg-[#10b981]/15', text: 'text-[#10b981]', border: 'border-[#10b981]/30', badge: 'Gl', icon: 'GLPI' };
    if (n.includes('n8n') || n.includes('automation')) return { bg: 'bg-[#ea4b71]/15', text: 'text-[#ea4b71]', border: 'border-[#ea4b71]/30', badge: 'n8', icon: 'n8n' };
    if (n.includes('bash')) return { bg: 'bg-[#ccff00]/15', text: 'text-[#ccff00]', border: 'border-[#ccff00]/30', badge: 'Sh', icon: 'Bash' };
    if (n.includes('network') || n.includes('dns')) return { bg: 'bg-[#06b6d4]/15', text: 'text-[#06b6d4]', border: 'border-[#06b6d4]/30', badge: 'Net', icon: 'Network' };
    if (n.includes('mdm') || n.includes('dashy')) return { bg: 'bg-[#8b5cf6]/15', text: 'text-[#8b5cf6]', border: 'border-[#8b5cf6]/30', badge: 'Ds', icon: 'Dashy' };
    if (n.includes('git')) return { bg: 'bg-[#f05032]/15', text: 'text-[#f05032]', border: 'border-[#f05032]/30', badge: 'Git', icon: 'Git' };
    return { bg: 'bg-emerald-500/15', text: 'text-emerald-400', border: 'border-emerald-500/30', badge: 'IT', icon: 'IT' };
  };

  const filteredSkills = SKILLS.filter((skill) => {
    const matchesCategory = activeCategory === 'all' || skill.category === activeCategory;
    const matchesSearch = skill.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="skills" className="py-8 md:py-12 px-4 max-w-7xl mx-auto scroll-mt-20 relative">
      
      {/* Section Header with Dikshant Style Marker Title & Scribbles */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="font-marker text-3xl sm:text-4xl lg:text-5xl text-white tracking-wider uppercase">
              {translations.skillsTitle}
            </h2>
            <span className="text-[#ccff00] text-xl font-marker animate-pulse">⚡</span>
          </div>
          <div className="text-[#8b5cf6] -mt-1 mb-2">
            <DoodleSquiggle className="w-28 sm:w-36 h-5 text-[#8b5cf6]" />
          </div>
          <p className="text-slate-300 text-xs sm:text-sm max-w-2xl font-sans">
            {currentLang === 'en'
              ? 'Core systems, server environments, open-source platforms, and administrative tools used in my daily operations.'
              : 'Sistem server, lingkungan kontainer, platform open-source, dan alat bantu operasional yang saya gunakan sehari-hari.'}
          </p>
        </div>

        {/* Right Decorative Swirl Scribble */}
        <div className="hidden lg:block text-[#8b5cf6] pointer-events-none opacity-80">
          <DoodleSwirl className="w-16 h-16 text-[#8b5cf6]" />
        </div>
      </div>

      {/* Category Filter Buttons - Rounded Pills */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((cat) => (
          <motion.button
            key={cat.id}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setActiveCategory(cat.id as any)}
            className={`px-4 py-2 rounded-full text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer border-2 ${
              activeCategory === cat.id
                ? 'bg-[#ccff00] text-black border-[#ccff00] shadow-[0_0_20px_rgba(204,255,0,0.4)]'
                : 'bg-[#12131a] text-slate-300 border-[#242636] hover:border-white/40 hover:text-white'
            }`}
          >
            {cat.label}
          </motion.button>
        ))}
      </div>

      {/* Skills Tiles Grid - Dikshant Style App Tiles */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {filteredSkills.map((skill, index) => {
          const style = getSkillTileStyle(skill.name);
          return (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.35 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="group rounded-2xl bg-[#12131a] border-2 border-[#242636] hover:border-white/30 p-4 sm:p-5 flex flex-col items-center text-center justify-between shadow-xl transition-all duration-300 relative overflow-hidden"
            >
              {/* Distinctive App Tile Icon/Badge */}
              <div className={`h-14 w-14 sm:h-16 sm:w-16 rounded-2xl ${style.bg} border-2 ${style.border} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300 shadow-md`}>
                <span className={`font-marker text-xl sm:text-2xl font-black ${style.text}`}>
                  {style.badge}
                </span>
              </div>

              {/* Skill Name */}
              <h3 className="font-display font-black text-xs sm:text-sm text-white group-hover:text-[#ccff00] transition-colors leading-snug mb-2">
                {skill.name}
              </h3>

              {/* Proficiency Level Dots */}
              <div className="mt-auto pt-2 flex items-center justify-center gap-1.5 w-full">
                {[1, 2, 3, 4, 5].map((lvl) => (
                  <span
                    key={lvl}
                    className={`h-1.5 rounded-full transition-all ${
                      lvl <= skill.level
                        ? 'w-3.5 bg-[#ccff00]'
                        : 'w-1.5 bg-white/10'
                    }`}
                  />
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
