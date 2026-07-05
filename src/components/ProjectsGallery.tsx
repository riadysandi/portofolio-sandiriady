import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Cpu, Database, Mail, LayoutDashboard, Network, ExternalLink, X, Settings, Terminal, Activity, CheckCircle, Server } from 'lucide-react';
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
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500/10 rounded-lg text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-4 border border-emerald-500/20">
          <LayoutDashboard className="h-3.5 w-3.5" />
          <span>{translations.navProjects}</span>
        </div>
        <h2 className="font-display font-black text-3xl md:text-5xl text-white tracking-tighter uppercase mb-3">
          {translations.projectsTitle}
        </h2>
        <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">
          {translations.projectsSubtitle}
        </p>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((proj, idx) => (
            <motion.div
              layout
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              whileHover={{ y: -8, scale: 1.015 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 220, damping: 18 }}
              key={proj.id}
              onClick={() => setSelectedProject(proj)}
              className="group bg-[#0A0A0A] border-2 border-slate-800 hover:border-emerald-500/50 p-6 rounded-3xl shadow-xl cursor-pointer relative overflow-hidden flex flex-col justify-between"
            >
              {/* Corner Accent */}
              <div className="absolute top-0 right-0 h-16 w-16 bg-gradient-to-bl from-emerald-500/5 to-transparent rounded-bl-3xl group-hover:from-emerald-500/15 transition-all" />

              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="h-10 w-10 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center group-hover:border-emerald-500/30 group-hover:bg-emerald-950/20 transition-all">
                    {getProjectIcon(proj.icon)}
                  </div>
                  <span className="text-[9px] font-mono text-slate-500 group-hover:text-emerald-400 transition-colors flex items-center gap-1 font-bold uppercase tracking-wider">
                    <span>VIEW SPECS</span>
                    <ExternalLink className="h-3 w-3" />
                  </span>
                </div>

                <h3 className="font-display font-black text-base text-white group-hover:text-emerald-400 transition-colors uppercase tracking-wide mb-3">
                  {highlightText(proj.title[currentLang], searchQuery)}
                </h3>

                <p className="text-slate-300 text-xs leading-relaxed font-sans line-clamp-3 mb-5">
                  {highlightText(proj.description[currentLang], searchQuery)}
                </p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 pt-4 border-t border-slate-800/80">
                {proj.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[9px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-slate-950 border border-slate-850 text-slate-400"
                  >
                    {highlightText(tag, searchQuery)}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filteredProjects.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-10 bg-[#0A0A0A] border-2 border-slate-800 rounded-3xl max-w-md mx-auto"
        >
          <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">{translations.noResults}</p>
        </motion.div>
      )}

      {/* Technical Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 15 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-2xl bg-[#0A0A0A] border-2 border-slate-800 rounded-3xl overflow-hidden shadow-2xl z-10"
            >
              {/* Header block */}
              <div className="p-6 bg-slate-950 border-b-2 border-slate-850 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                    {getProjectIcon(selectedProject.icon, 'h-5 w-5 text-emerald-400')}
                  </div>
                  <div>
                    <h3 className="font-display font-black text-sm text-white tracking-wide uppercase">
                      {selectedProject.title[currentLang]}
                    </h3>
                    <p className="font-mono text-[9px] text-emerald-400 font-bold uppercase tracking-widest">
                      IT Infrastructure Blueprint
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Technical Blueprint Panel */}
              <div className="p-6 space-y-6 max-h-[65vh] overflow-y-auto">
                {/* Description */}
                <div>
                  <h4 className="font-mono text-[9px] text-slate-500 uppercase tracking-widest font-black mb-1.5">
                    [01] Overview
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed font-sans">
                    {selectedProject.description[currentLang]}
                  </p>
                </div>

                {/* Tech Stack Tags */}
                <div>
                  <h4 className="font-mono text-[9px] text-slate-500 uppercase tracking-widest font-black mb-2.5">
                    [02] Technologies & Infrastructure Layers
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[9px] font-mono font-bold uppercase text-emerald-400 bg-emerald-500/5 border border-emerald-500/20 px-2.5 py-1 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Simulated Interactive Technical Flow diagram */}
                <div className="bg-slate-950 border-2 border-slate-850 rounded-2xl p-5 font-mono">
                  <div className="flex items-center justify-between border-b border-slate-850 pb-3 mb-4">
                    <span className="text-[9px] text-emerald-400 font-black flex items-center gap-1.5 uppercase tracking-widest">
                      <Terminal className="h-3.5 w-3.5 animate-pulse" />
                      SYSTEM_STATUS_ONLINE
                    </span>
                    <span className="text-[9px] text-slate-500 font-bold flex items-center gap-1.5 uppercase tracking-widest">
                      <Activity className="h-3.5 w-3.5" />
                      TELEMETRY_OK
                    </span>
                  </div>

                  <div className="space-y-3.5 text-[11px] text-slate-350">
                    <div className="flex items-center gap-2">
                      <span className="text-slate-600 font-bold">&gt;</span>
                      <span className="text-emerald-400 font-bold">docker-compose up -d --build</span>
                    </div>
                    <div className="text-[10px] text-slate-400 pl-4 space-y-1.5">
                      <div>[INFO] Initializing service container dependencies...</div>
                      <div className="flex items-center gap-1.5 text-emerald-500">
                        <CheckCircle className="h-3.5 w-3.5 shrink-0" /> Database container [Frappe-Postgres] listening on port 5432
                      </div>
                      <div className="flex items-center gap-1.5 text-emerald-500">
                        <CheckCircle className="h-3.5 w-3.5 shrink-0" /> Redis-cache instances configured & healthy
                      </div>
                      <div className="flex items-center gap-1.5 text-emerald-500">
                        <CheckCircle className="h-3.5 w-3.5 shrink-0" /> Web services and automation nodes synced successfully
                      </div>
                    </div>
                    
                    {/* Graphical flow */}
                    <div className="pt-3 border-t border-slate-850/60 flex flex-col items-center justify-center text-center text-[10px] text-slate-500">
                      <div className="px-3 py-1.5 bg-[#0A0A0A] border-2 border-slate-800 text-slate-300 rounded font-bold uppercase tracking-wider text-[9px]">
                        Incoming Support Request
                      </div>
                      <div className="h-3 w-0.5 bg-slate-800" />
                      <div className="px-3 py-1.5 bg-[#0A0A0A] border-2 border-slate-800 text-emerald-400 rounded font-bold uppercase tracking-wider text-[9px]">
                        n8n Parsing Pipeline
                      </div>
                      <div className="h-3 w-0.5 bg-slate-800" />
                      <div className="flex items-center gap-4">
                        <div className="px-3 py-1.5 bg-[#0A0A0A] border-2 border-slate-800 text-slate-350 rounded font-bold uppercase tracking-wider text-[9px]">
                          GLPI Asset Ticket Created
                        </div>
                        <div className="h-0.5 w-4 bg-slate-800" />
                        <div className="px-3 py-1.5 bg-[#0A0A0A] border-2 border-slate-800 text-slate-350 rounded font-bold uppercase tracking-wider text-[9px]">
                          Rocket.Chat Team Alert
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Close / Action bar */}
              <div className="p-4 bg-slate-950 border-t-2 border-slate-850 flex justify-end">
                <button
                  onClick={() => setSelectedProject(null)}
                  className="px-5 py-2.5 bg-slate-900 hover:bg-slate-850 border-2 border-slate-800 hover:border-emerald-500 text-[10px] font-black uppercase tracking-widest text-slate-300 hover:text-emerald-400 rounded-xl cursor-pointer transition-colors"
                >
                  Close Blueprint
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
