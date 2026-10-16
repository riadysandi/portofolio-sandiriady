import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Cpu, Database, Mail, LayoutDashboard, Network, ExternalLink, X, Settings, CheckCircle2, ArrowRight } from 'lucide-react';
import { Language, Translation, Project } from '../types';
import { PROJECTS } from '../data';

interface ProjectsGalleryProps {
  currentLang: Language;
  translations: Translation;
  searchQuery: string;
}

export default function ProjectsGallery({ currentLang, translations, searchQuery }: ProjectsGalleryProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const getProjectIcon = (iconName: string, className: string = 'h-5 w-5 text-emerald-400') => {
    switch (iconName) {
      case 'Cpu': return <Cpu className={className} />;
      case 'Database': return <Database className={className} />;
      case 'Mail': return <Mail className={className} />;
      case 'LayoutDashboard': return <LayoutDashboard className={className} />;
      case 'Network': return <Network className={className} />;
      default: return <Settings className={className} />;
    }
  };

  // Filter projects by search query
  const filteredProjects = PROJECTS.filter((proj) => {
    const titleMatch = proj.title[currentLang].toLowerCase().includes(searchQuery.toLowerCase());
    const descMatch = proj.description[currentLang].toLowerCase().includes(searchQuery.toLowerCase());
    const tagsMatch = proj.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return titleMatch || descMatch || tagsMatch;
  });

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
    <section id="projects" className="py-6 md:py-8 px-4 max-w-7xl mx-auto scroll-mt-20">
      {/* Editorial Section Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 mb-6 border-b border-white/10 text-[10px] font-mono uppercase tracking-[0.2em] text-slate-400">
        <div className="flex items-center gap-3">
          <span className="text-emerald-400 font-bold">(03)</span>
          <span className="text-white font-bold">{translations.navProjects}</span>
          <span className="text-slate-600">/</span>
          <span className="text-slate-400">FEATURED IMPLEMENTATIONS & ARCHITECTURE</span>
        </div>
        <div className="font-mono text-[9px] text-slate-500 font-bold uppercase tracking-wider">
          INDEX // {filteredProjects.length} CASES
        </div>
      </div>

      <div className="max-w-3xl mb-6">
        <h2 className="font-display font-black text-3xl md:text-5xl text-white tracking-tight uppercase mb-2">
          {translations.projectsTitle}
        </h2>
        <p className="text-slate-400 text-xs md:text-sm max-w-2xl font-sans">
          {translations.projectsSubtitle}
        </p>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((proj, idx) => (
            <motion.div
              layout
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, ease: [0.3, 0, 0.1, 1] }}
              whileHover={{ y: -3 }}
              key={proj.id}
              onClick={() => setSelectedProject(proj)}
              className="group bg-[#060606] border border-white/10 hover:border-emerald-400/50 hover:bg-white/[0.02] p-5 md:p-6 rounded-xl shadow-lg cursor-pointer flex flex-col justify-between transition-all duration-300 relative"
            >
              {/* Corner crosshairs */}
              <span className="absolute -top-1 -left-1 text-[10px] font-mono text-emerald-400/0 group-hover:text-emerald-400 font-bold select-none transition-colors duration-200">+</span>
              <span className="absolute -top-1 -right-1 text-[10px] font-mono text-emerald-400/0 group-hover:text-emerald-400 font-bold select-none transition-colors duration-200">+</span>
              <span className="absolute -bottom-1 -left-1 text-[10px] font-mono text-emerald-400/0 group-hover:text-emerald-400 font-bold select-none transition-colors duration-200">+</span>
              <span className="absolute -bottom-1 -right-1 text-[10px] font-mono text-emerald-400/0 group-hover:text-emerald-400 font-bold select-none transition-colors duration-200">+</span>

              <div>
                <div className="flex items-center justify-between mb-3.5">
                  <div className="h-10 w-10 rounded-lg bg-black border border-white/10 flex items-center justify-center group-hover:border-emerald-400/40 group-hover:bg-emerald-950/20 transition-all duration-300">
                    {getProjectIcon(proj.icon)}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[9px] text-slate-500 font-bold uppercase">
                      PRJ-{String(idx + 1).padStart(2, '0')}
                    </span>
                    <span className="text-[11px] font-mono font-bold text-slate-400 group-hover:text-emerald-400 transition-colors flex items-center gap-1 uppercase tracking-wider">
                      <span>{currentLang === 'en' ? 'SPEC' : 'SPEC'}</span>
                      <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>

                <h3 className="font-bold text-base text-white group-hover:text-emerald-300 transition-colors mb-2">
                  {highlightText(proj.title[currentLang], searchQuery)}
                </h3>

                <p className="text-xs text-slate-300 leading-relaxed mb-4 font-sans">
                  {highlightText(proj.description[currentLang], searchQuery)}
                </p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/10">
                {proj.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-mono text-slate-300 bg-black border border-white/10 px-2 py-0.5 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Empty State */}
      {filteredProjects.length === 0 && (
        <div className="text-center py-8 bg-[#060606] border border-white/10 rounded-xl max-w-md mx-auto">
          <p className="text-slate-400 text-xs font-mono font-bold uppercase tracking-wider">{translations.noResults}</p>
        </div>
      )}

      {/* Structured Case Study Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ ease: [0.3, 0, 0.1, 1], duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#060606] border border-white/15 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col relative"
            >
              {/* Modal Header */}
              <div className="p-6 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-black border border-white/15 flex items-center justify-center">
                    {getProjectIcon(selectedProject.icon)}
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest font-bold">
                      {currentLang === 'en' ? '[SYSTEM SPEC // IMPLEMENTATION]' : '[SPESIFIKASI SISTEM // IMPLEMENTASI]'}
                    </span>
                    <h3 className="text-lg font-bold text-white uppercase tracking-tight">
                      {selectedProject.title[currentLang]}
                    </h3>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="p-2 rounded-lg bg-black text-slate-400 hover:text-white border border-white/10 hover:border-white/30 cursor-pointer transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 space-y-5 text-slate-300 text-sm">
                <div>
                  <h4 className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest mb-2">
                    {currentLang === 'en' ? '01 // DESCRIPTION & ARCHITECTURE' : '01 // DESKRIPSI & ARSITEKTUR'}
                  </h4>
                  <p className="leading-relaxed bg-black border border-white/10 rounded-xl p-4 font-sans text-xs text-slate-300">
                    {selectedProject.description[currentLang]}
                  </p>
                </div>

                <div>
                  <h4 className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest mb-2">
                    {currentLang === 'en' ? '02 // TECHNOLOGIES & STACK' : '02 // TEKNOLOGI & STACK'}
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedProject.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs font-mono font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-black border border-white/10 rounded-xl p-4 space-y-2">
                  <h4 className="text-[10px] font-mono font-bold text-slate-300 uppercase tracking-widest">
                    {currentLang === 'en' ? '03 // OPERATIONAL VALUE & DELIVERABLES' : '03 // NILAI OPERASIONAL & DELIVERABLE'}
                  </h4>
                  <ul className="space-y-1.5 text-xs text-slate-400">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{currentLang === 'en' ? 'Containerized or standard Linux service setup with reproducible configuration.' : 'Konfigurasi layanan Linux standar atau berbasis container yang dapat direproduksi.'}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{currentLang === 'en' ? 'Automated scheduled tasks or webhooks to minimize manual intervention.' : 'Otomatisasi tugas terjadwal atau webhook untuk mengurangi intervensi manual.'}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{currentLang === 'en' ? 'Structured documentation and operating guidelines for support reliability.' : 'Dokumentasi terstruktur dan panduan pengoperasian untuk keandalan layanan.'}</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-4 border-t border-white/10 bg-black flex justify-end">
                <button
                  onClick={() => setSelectedProject(null)}
                  className="px-5 py-2 bg-white hover:bg-emerald-400 text-[10px] font-mono font-bold uppercase tracking-wider text-black rounded-lg cursor-pointer transition-colors"
                >
                  {currentLang === 'en' ? '[ CLOSE ]' : '[ TUTUP ]'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

