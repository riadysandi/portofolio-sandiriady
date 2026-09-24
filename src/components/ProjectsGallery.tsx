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
    <section id="projects" className="py-12 md:py-20 px-4 max-w-7xl mx-auto scroll-mt-20">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-emerald-500/10 rounded-full text-xs font-bold text-emerald-400 uppercase tracking-widest mb-3 border border-emerald-500/20">
          <LayoutDashboard className="h-3.5 w-3.5" />
          <span>{translations.navProjects}</span>
        </div>
        <h2 className="font-display font-black text-3xl md:text-5xl text-white tracking-tight uppercase mb-3">
          {translations.projectsTitle}
        </h2>
        <p className="text-slate-400 text-sm md:text-base max-w-2xl mx-auto">
          {translations.projectsSubtitle}
        </p>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((proj) => (
            <motion.div
              layout
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              key={proj.id}
              onClick={() => setSelectedProject(proj)}
              className="group bg-slate-900/50 border border-slate-800 hover:border-emerald-500/40 p-6 rounded-2xl shadow-lg cursor-pointer flex flex-col justify-between transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="h-10 w-10 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center group-hover:border-emerald-500/40 group-hover:bg-emerald-950/20 transition-all">
                    {getProjectIcon(proj.icon)}
                  </div>
                  <span className="text-xs font-medium text-slate-400 group-hover:text-emerald-400 transition-colors flex items-center gap-1">
                    <span>{currentLang === 'en' ? 'View Details' : 'Lihat Detail'}</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>

                <h3 className="font-bold text-base text-white group-hover:text-emerald-400 transition-colors mb-2.5">
                  {highlightText(proj.title[currentLang], searchQuery)}
                </h3>

                <p className="text-xs md:text-sm text-slate-300 leading-relaxed mb-4">
                  {highlightText(proj.description[currentLang], searchQuery)}
                </p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-800/80">
                {proj.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] font-mono text-slate-300 bg-slate-950 border border-slate-800 px-2.5 py-1 rounded-md"
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
        <div className="text-center py-12 bg-slate-900/40 border border-slate-800 rounded-2xl max-w-md mx-auto">
          <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">{translations.noResults}</p>
        </div>
      )}

      {/* Structured Case Study Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col"
            >
              {/* Modal Header */}
              <div className="p-6 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center">
                    {getProjectIcon(selectedProject.icon)}
                  </div>
                  <div>
                    <span className="text-[11px] font-mono text-emerald-400 uppercase tracking-widest font-bold">
                      {currentLang === 'en' ? 'System Implementation' : 'Implementasi Sistem'}
                    </span>
                    <h3 className="text-lg font-bold text-white">
                      {selectedProject.title[currentLang]}
                    </h3>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="p-2 rounded-xl bg-slate-950 text-slate-400 hover:text-white border border-slate-800 hover:border-slate-700 cursor-pointer transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 space-y-6 text-slate-300 text-sm">
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                    {currentLang === 'en' ? 'Description & Operational Context' : 'Deskripsi & Konteks Operasional'}
                  </h4>
                  <p className="leading-relaxed bg-slate-950 border border-slate-800/80 rounded-2xl p-4">
                    {selectedProject.description[currentLang]}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                    {currentLang === 'en' ? 'Technologies & Tools Used' : 'Teknologi & Alat yang Digunakan'}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs font-mono font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-lg"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-slate-950 border border-slate-800/80 rounded-2xl p-4 space-y-2">
                  <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                    {currentLang === 'en' ? 'Key Deliverables & Value' : 'Hasil Utama & Nilai Manfaat'}
                  </h4>
                  <ul className="space-y-1.5 text-xs text-slate-400">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{currentLang === 'en' ? 'Containerized or standard Linux service setup with reproducible configuration.' : 'Konfigurasi layanan Linux standar atau berbasis container yang dapat direproduksi.'}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{currentLang === 'en' ? 'Automated scheduled tasks or webhooks to minimize manual intervention.' : 'Otomatisasi tugas terjadwal atau webhook untuk mengurangi intervensi manual.'}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{currentLang === 'en' ? 'Structured documentation and operating guidelines for support reliability.' : 'Dokumentasi terstruktur dan panduan pengoperasian untuk keandalan layanan.'}</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-4 border-t border-slate-800 bg-slate-950/50 flex justify-end">
                <button
                  onClick={() => setSelectedProject(null)}
                  className="px-5 py-2 bg-slate-800 hover:bg-slate-700 text-xs font-bold uppercase tracking-wider text-slate-200 rounded-xl cursor-pointer transition-colors"
                >
                  {currentLang === 'en' ? 'Close' : 'Tutup'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
