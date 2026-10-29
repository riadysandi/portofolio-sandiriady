import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { Language, Translation, Skill } from '../types';
import { SKILLS } from '../data';
import { DoodleSquiggle, DoodleSwirl } from './Doodles';

interface SkillsGridProps {
  currentLang: Language;
  translations: Translation;
  searchQuery: string;
}

// ── Authentic Vector Logos for Technologies ──
function SkillLogo({ name, className = 'w-10 h-10' }: { name: string; className?: string }) {
  const n = name.toLowerCase();

  // 1. Ubuntu / Linux
  if (n.includes('linux') || n.includes('ubuntu') || n.includes('debian')) {
    return (
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <circle cx="50" cy="50" r="48" fill="#E95420" />
        <circle cx="50" cy="50" r="28" stroke="white" strokeWidth="8" fill="none" />
        <circle cx="21" cy="50" r="7.5" fill="white" />
        <circle cx="64.5" cy="25" r="7.5" fill="white" />
        <circle cx="64.5" cy="75" r="7.5" fill="white" />
        <path d="M50 22 A28 28 0 0 1 78 50" stroke="#E95420" strokeWidth="6" />
        <path d="M78 50 A28 28 0 0 1 50 78" stroke="#E95420" strokeWidth="6" />
        <path d="M50 78 A28 28 0 0 1 22 50" stroke="#E95420" strokeWidth="6" />
      </svg>
    );
  }

  // 2. Docker
  if (n.includes('docker')) {
    return (
      <svg viewBox="0 0 24 24" fill="#0db7ed" xmlns="http://www.w3.org/2000/svg" className={className}>
        <path d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .102.082.186.185.186m-2.93 0h2.12a.186.186 0 00.184-.186V6.29a.185.185 0 00-.185-.185H8.1a.185.185 0 00-.185.185v1.887c0 .102.083.186.185.186m-2.964 0h2.119a.186.186 0 00.185-.186V6.29a.185.185 0 00-.185-.185H5.136a.186.186 0 00-.186.185v1.887c0 .102.084.186.186.186m5.893 2.714h2.12a.186.186 0 00.184-.185V9.006a.185.185 0 00-.185-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.083.185.185.185m-2.93 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.185-.186H5.136a.186.186 0 00-.186.185v1.888c0 .102.084.185.186.185m-2.928 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.185-.186H2.208a.186.186 0 00-.186.185v1.888c0 .102.084.185.186.185m21.758.337c-.368-.224-.875-.357-1.488-.357-.463 0-.918.069-1.353.205-.286-.968-.908-1.745-1.776-2.22-.162-.089-.333-.163-.51-.223-.11-.037-.225-.067-.34-.093l-.221-.044-.132.185c-.443.623-.746 1.343-.889 2.11h-.697V9.006a.186.186 0 00-.186-.186h-2.118a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185h.063c-.027.24-.04.484-.04.733 0 1.258.455 2.457 1.26 3.398-.246.61-.63 1.156-1.127 1.597-1.28 1.134-3.082 1.76-5.21 1.812-2.128-.052-3.93-.678-5.21-1.812-.497-.44-.881-.987-1.127-1.597.805-.941 1.26-2.14 1.26-3.398 0-.25-.013-.493-.04-.733H1.4c-.16 0-.309.083-.393.22-.083.136-.089.307-.015.449.882 1.687 2.378 2.997 4.256 3.731.393.153.805.277 1.229.37 1.547.34 3.23.473 4.966.473 1.737 0 3.42-.133 4.966-.473.424-.093.836-.217 1.229-.37 1.878-.734 3.374-2.044 4.256-3.731.074-.142.068-.313-.015-.449a.465.465 0 00-.393-.22z"/>
      </svg>
    );
  }

  // 3. Frappe / ERPNext
  if (n.includes('erpnext') || n.includes('frappe')) {
    return (
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <rect width="100" height="100" rx="22" fill="#0089FF" />
        <path d="M26 30H74V42H40V48H68V60H40V72H26V30Z" fill="white" />
        <circle cx="70" cy="68" r="6" fill="#CCFF00" />
      </svg>
    );
  }

  // 4. Zimbra
  if (n.includes('zimbra')) {
    return (
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <rect width="100" height="100" rx="22" fill="#EA3923" />
        <path d="M28 32H72L42 68H72V78H28L58 42H28V32Z" fill="white" />
        <circle cx="76" cy="26" r="5" fill="#FFC107" />
      </svg>
    );
  }

  // 5. GLPI Helpdesk
  if (n.includes('glpi')) {
    return (
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <rect width="100" height="100" rx="22" fill="#10B981" />
        <path d="M30 50C30 38.954 38.954 30 50 30C61.046 30 70 38.954 70 50C70 61.046 61.046 70 50 70H30V50Z" fill="white" />
        <circle cx="50" cy="50" r="10" fill="#10B981" />
        <rect x="52" y="44" width="22" height="12" rx="3" fill="#047857" />
      </svg>
    );
  }

  // 6. n8n Automation
  if (n.includes('n8n') || n.includes('automation')) {
    return (
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <rect width="100" height="100" rx="22" fill="#EA4B71" />
        <circle cx="32" cy="50" r="10" fill="white" />
        <circle cx="68" cy="36" r="10" fill="white" />
        <circle cx="68" cy="64" r="10" fill="white" />
        <line x1="32" y1="50" x2="68" y2="36" stroke="white" strokeWidth="6" strokeLinecap="round" />
        <line x1="32" y1="50" x2="68" y2="64" stroke="white" strokeWidth="6" strokeLinecap="round" />
      </svg>
    );
  }

  // 7. Bash Scripting
  if (n.includes('bash')) {
    return (
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <rect width="100" height="100" rx="22" fill="#1E202A" stroke="#4EAA25" strokeWidth="4" />
        <path d="M28 35L46 50L28 65" stroke="#4EAA25" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="52" y1="65" x2="72" y2="65" stroke="#CCFF00" strokeWidth="8" strokeLinecap="round" />
      </svg>
    );
  }

  // 8. Basic Network Ops
  if (n.includes('network') || n.includes('dns') || n.includes('lan')) {
    return (
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <rect width="100" height="100" rx="22" fill="#0891B2" />
        <circle cx="50" cy="30" r="10" fill="white" />
        <circle cx="30" cy="70" r="10" fill="white" />
        <circle cx="70" cy="70" r="10" fill="white" />
        <line x1="50" y1="30" x2="30" y2="70" stroke="white" strokeWidth="5" />
        <line x1="50" y1="30" x2="70" y2="70" stroke="white" strokeWidth="5" />
        <line x1="30" y1="70" x2="70" y2="70" stroke="#CCFF00" strokeWidth="5" />
      </svg>
    );
  }

  // 9. MDM / Dashy
  if (n.includes('mdm') || n.includes('dashy') || n.includes('policy')) {
    return (
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <rect width="100" height="100" rx="22" fill="#8B5CF6" />
        <rect x="28" y="26" width="44" height="48" rx="8" stroke="white" strokeWidth="6" />
        <circle cx="50" cy="62" r="3.5" fill="#CCFF00" />
        <path d="M40 38H60" stroke="white" strokeWidth="5" strokeLinecap="round" />
        <path d="M40 48H52" stroke="white" strokeWidth="5" strokeLinecap="round" />
      </svg>
    );
  }

  // 10. Git
  if (n.includes('git')) {
    return (
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <rect width="100" height="100" rx="22" fill="#F05032" />
        <path d="M68 44C68 40.7 65.3 38 62 38C59.5 38 57.3 39.5 56.4 41.7L46.3 31.6C46.5 31.1 46.6 30.6 46.6 30C46.6 26.7 43.9 24 40.6 24C37.3 24 34.6 26.7 34.6 30C34.6 30.6 34.7 31.1 34.9 31.6L24.8 41.7C22.6 40.8 20 42.1 19.1 44.3C18.2 46.5 19.5 49.1 21.7 50C22.2 50.2 22.8 50.3 23.4 50.3C25.9 50.3 28.1 48.8 29 46.6L39.1 56.7C38.9 57.2 38.8 57.7 38.8 58.3C38.8 61.6 41.5 64.3 44.8 64.3C48.1 64.3 50.8 61.6 50.8 58.3C50.8 57.7 50.7 57.2 50.5 56.7L60.6 46.6C62.8 47.5 65.4 46.2 66.3 44C67.4 44 68 44 68 44Z" fill="white" />
      </svg>
    );
  }

  // Default Cyber Chip
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect width="100" height="100" rx="22" fill="#10B981" />
      <rect x="30" y="30" width="40" height="40" rx="8" stroke="white" strokeWidth="6" />
      <circle cx="50" cy="50" r="8" fill="#CCFF00" />
    </svg>
  );
}

export default function SkillsGrid({ currentLang, translations, searchQuery }: SkillsGridProps) {
  const [activeCategory, setActiveCategory] = useState<'all' | 'core' | 'infra' | 'automation' | 'tools'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobile, setIsMobile] = useState(() => {
    return typeof window !== 'undefined' ? window.innerWidth < 640 : false;
  });

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const categories = [
    { id: 'all', label: currentLang === 'en' ? 'All Skills' : 'Semua Keahlian' },
    { id: 'core', label: currentLang === 'en' ? 'Linux & Containers' : 'Linux & Kontainer' },
    { id: 'infra', label: currentLang === 'en' ? 'Mail & Network' : 'Email & Jaringan' },
    { id: 'automation', label: currentLang === 'en' ? 'Automation & Scripting' : 'Otomatisasi & Skrip' },
    { id: 'tools', label: currentLang === 'en' ? 'Helpdesk & Tools' : 'Helpdesk & Tools' },
  ];

  const filteredSkills = SKILLS.filter((skill) => {
    const matchesCategory = activeCategory === 'all' || skill.category === activeCategory;
    const matchesSearch = skill.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Reset page when category or search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, searchQuery]);

  // Mobile: 6 skills per page (2 rows x 3 columns)
  // Desktop: 10 skills per page (2 rows x 5 columns)
  const itemsPerPage = isMobile ? 6 : 10;
  const totalPages = Math.ceil(filteredSkills.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedSkills = filteredSkills.slice(startIndex, startIndex + itemsPerPage);

  return (
    <section id="skills" className="py-8 md:py-12 px-4 max-w-7xl mx-auto scroll-mt-24 relative">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
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

        {/* Decorative Swirl Scribble */}
        <div className="hidden lg:block text-[#8b5cf6] pointer-events-none opacity-80">
          <DoodleSwirl className="w-16 h-16 text-[#8b5cf6]" />
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((cat) => (
          <motion.button
            key={cat.id}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setActiveCategory(cat.id as any)}
            className={`px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full text-[11px] sm:text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer border-2 ${
              activeCategory === cat.id
                ? 'bg-[#ccff00] text-black border-[#ccff00] shadow-[0_0_20px_rgba(204,255,0,0.4)]'
                : 'bg-[#12131a] text-slate-300 border-[#242636] hover:border-white/40 hover:text-white'
            }`}
          >
            {cat.label}
          </motion.button>
        ))}
      </div>

      {/* Skills Grid: 3 columns on mobile, 4 on tablet, 5 on desktop */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2.5 sm:gap-4">
        {paginatedSkills.map((skill, index) => {
          return (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.04, duration: 0.3 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="group rounded-2xl bg-[#12131a] border-2 border-[#242636] hover:border-[#ccff00]/60 p-3 sm:p-4 flex flex-col items-center text-center justify-between shadow-lg transition-all duration-300 relative overflow-hidden"
            >
              {/* Technology Logo */}
              <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-2xl bg-black/40 border border-white/10 flex items-center justify-center p-2 mb-2 group-hover:scale-110 transition-transform duration-300 shadow-md">
                <SkillLogo name={skill.name} className="w-full h-full object-contain" />
              </div>

              {/* Skill Name */}
              <h3 className="font-display font-bold text-[11px] sm:text-xs text-white group-hover:text-[#ccff00] transition-colors leading-tight line-clamp-2 min-h-[28px] sm:min-h-[32px] flex items-center justify-center">
                {skill.name}
              </h3>

              {/* Proficiency Level Dots */}
              <div className="mt-2 pt-1 flex items-center justify-center gap-1 w-full">
                {[1, 2, 3, 4, 5].map((lvl) => (
                  <span
                    key={lvl}
                    className={`h-1 sm:h-1.5 rounded-full transition-all ${
                      lvl <= skill.level
                        ? 'w-2.5 sm:w-3 bg-[#ccff00]'
                        : 'w-1 sm:w-1.5 bg-white/10'
                    }`}
                  />
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Pagination Controls (Especially helpful on Mobile for 3-col layout) */}
      {totalPages > 1 && (
        <div className="mt-6 flex items-center justify-center gap-3">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="p-2 rounded-xl bg-[#12131a] border border-[#242636] text-slate-300 hover:text-white hover:border-[#ccff00] disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer"
            aria-label="Previous Page"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          <div className="flex items-center gap-1.5">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`h-8 w-8 rounded-xl font-mono text-xs font-bold transition-all cursor-pointer ${
                  currentPage === page
                    ? 'bg-[#ccff00] text-black shadow-[0_0_15px_rgba(204,255,0,0.4)]'
                    : 'bg-[#12131a] text-slate-400 border border-[#242636] hover:text-white'
                }`}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="p-2 rounded-xl bg-[#12131a] border border-[#242636] text-slate-300 hover:text-white hover:border-[#ccff00] disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer"
            aria-label="Next Page"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      )}
    </section>
  );
}
