import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Cpu, Database, Mail, LayoutDashboard, Network,
  ExternalLink, X, Settings, ArrowUpRight, CheckCircle2,
  Sparkles
} from 'lucide-react';
import { Language, Translation, Project } from '../types';
import { PROJECTS } from '../data';
import { DoodleSquiggle, DoodleStar, DoodleLightning } from './Doodles';

interface ProjectsGalleryProps {
  currentLang: Language;
  translations: Translation;
  searchQuery: string;
}

export default function ProjectsGallery({ currentLang, translations, searchQuery }: ProjectsGalleryProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const getProjectTheme = (iconName: string, id: string) => {
    switch (iconName) {
      case 'Cpu':
        return {
          bannerBg: 'from-fuchsia-600/30 to-purple-900/40',
          accentColor: 'text-[#ea4b71]',
          borderColor: 'group-hover:border-[#ea4b71]/50',
          badge: 'AUTOMATION & GLPI',
          badgeBg: 'bg-[#ea4b71]/20 text-[#ea4b71] border-[#ea4b71]/30',
        };
      case 'Database':
        return {
          bannerBg: 'from-blue-600/30 to-indigo-950/40',
          accentColor: 'text-[#38bdf8]',
          borderColor: 'group-hover:border-[#38bdf8]/50',
          badge: 'ERP & DOCKER',
          badgeBg: 'bg-[#38bdf8]/20 text-[#38bdf8] border-[#38bdf8]/30',
        };
      case 'Mail':
        return {
          bannerBg: 'from-rose-600/30 to-red-950/40',
          accentColor: 'text-[#f43f5e]',
          borderColor: 'group-hover:border-[#f43f5e]/50',
          badge: 'MAIL SERVER OPS',
          badgeBg: 'bg-[#f43f5e]/20 text-[#f43f5e] border-[#f43f5e]/30',
        };
      case 'LayoutDashboard':
        return {
          bannerBg: 'from-purple-600/30 to-violet-950/40',
          accentColor: 'text-[#8b5cf6]',
          borderColor: 'group-hover:border-[#8b5cf6]/50',
          badge: 'INFRA DASHBOARD',
          badgeBg: 'bg-[#8b5cf6]/20 text-[#8b5cf6] border-[#8b5cf6]/30',
        };
      case 'Network':
        return {
          bannerBg: 'from-lime-600/30 to-emerald-950/40',
          accentColor: 'text-[#ccff00]',
          borderColor: 'group-hover:border-[#ccff00]/50',
          badge: 'MONITORING SCRIPT',
          badgeBg: 'bg-[#ccff00]/20 text-[#ccff00] border-[#ccff00]/30',
        };
      default:
        return {
          bannerBg: 'from-emerald-600/30 to-teal-950/40',
          accentColor: 'text-emerald-400',
          borderColor: 'group-hover:border-emerald-400/50',
          badge: 'SYSTEMS',
          badgeBg: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
        };
    }
  };

  const filteredProjects = PROJECTS.filter((proj) => {
    const titleMatch = proj.title[currentLang].toLowerCase().includes(searchQuery.toLowerCase());
    const descMatch = proj.description[currentLang].toLowerCase().includes(searchQuery.toLowerCase());
    const tagsMatch = proj.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return titleMatch || descMatch || tagsMatch;
  });

  return (
    <section id="projects" className="py-8 md:py-12 px-4 max-w-7xl mx-auto scroll-mt-20 relative">
      
      {/* Header matching Dikshant "FEATURED PROJECTS" */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="font-marker text-3xl sm:text-4xl lg:text-5xl text-white tracking-wider uppercase">
              {translations.projectsTitle}
            </h2>
            <DoodleStar className="w-6 h-6 text-yellow-400 animate-spin" />
          </div>
          <div className="text-[#8b5cf6] -mt-1 mb-2">
            <DoodleSquiggle className="w-36 sm:w-44 h-6 text-[#8b5cf6]" />
          </div>
          <p className="text-slate-300 text-xs sm:text-sm max-w-2xl font-sans">
            {translations.projectsSubtitle}
          </p>
        </div>

        <a
          href="#live-sites"
          className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#ccff00] hover:underline uppercase tracking-wider"
        >
          <span>{currentLang === 'en' ? 'View Live Sites' : 'Lihat Web Aktif'}</span>
          <ArrowUpRight className="h-4 w-4" />
        </a>
      </div>

      {/* Projects Grid: Dikshant 4-Card / Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((proj, idx) => {
            const theme = getProjectTheme(proj.icon, proj.id);
            return (
              <motion.div
                layout
                key={proj.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                whileHover={{ y: -6 }}
                onClick={() => setSelectedProject(proj)}
                className={`group rounded-2xl bg-[#12131a] border-2 border-[#232533] ${theme.borderColor} shadow-xl p-4 sm:p-5 flex flex-col justify-between cursor-pointer transition-all duration-300 relative overflow-hidden`}
              >
                {/* Visual Banner Thumbnail inside Card */}
                <div className={`relative w-full h-32 rounded-xl bg-gradient-to-br ${theme.bannerBg} border border-white/10 p-3 flex flex-col justify-between mb-4 overflow-hidden`}>
                  <div className="flex items-center justify-between">
                    <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-black uppercase tracking-wider border ${theme.badgeBg}`}>
                      {theme.badge}
                    </span>
                    <span className="h-7 w-7 rounded-full bg-black/70 text-white flex items-center justify-center group-hover:bg-[#ccff00] group-hover:text-black transition-colors">
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </span>
                  </div>

                  {/* Icon illustration watermark */}
                  <div className="absolute right-2 -bottom-2 text-white/10 group-hover:text-white/20 group-hover:scale-110 transition-all duration-300 pointer-events-none">
                    <Cpu className="h-20 w-20" />
                  </div>

                  <span className="text-[10px] font-mono font-bold text-white/80 z-10">
                    #{proj.id.toUpperCase()}
                  </span>
                </div>

                {/* Card Title & Desc */}
                <div className="flex-1 flex flex-col">
                  <h3 className="font-display font-black text-base text-white group-hover:text-[#ccff00] transition-colors leading-snug mb-2 line-clamp-2">
                    {proj.title[currentLang]}
                  </h3>
                  <p className="text-xs text-slate-300 font-sans leading-relaxed line-clamp-3 mb-4">
                    {proj.description[currentLang]}
                  </p>
                </div>

                {/* Tag Pills */}
                <div className="pt-3 border-t border-white/10 mt-auto flex flex-wrap gap-1">
                  {proj.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded bg-black/60 border border-white/10 text-[9px] font-mono text-slate-300"
                    >
                      {tag}
                    </span>
                  ))}
                  {proj.tags.length > 3 && (
                    <span className="px-1.5 py-0.5 rounded bg-black/60 text-[9px] font-mono text-slate-500">
                      +{proj.tags.length - 3}
                    </span>
                  )}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl rounded-3xl bg-[#12131a] border-2 border-[#8b5cf6]/50 p-6 sm:p-8 shadow-2xl overflow-hidden"
            >
              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                className="absolute top-5 right-5 h-9 w-9 rounded-full bg-black/60 border border-white/20 text-slate-300 hover:text-white hover:border-[#ccff00] flex items-center justify-center cursor-pointer transition-colors"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="flex items-center gap-2 mb-3">
                <span className="px-2.5 py-1 rounded bg-[#ccff00] text-black text-[10px] font-mono font-black uppercase tracking-wider">
                  PROJECT SPECIFICATION
                </span>
              </div>

              <h3 className="font-marker text-2xl sm:text-3xl text-white mb-4 uppercase tracking-wide">
                {selectedProject.title[currentLang]}
              </h3>

              <p className="text-slate-200 text-sm sm:text-base leading-relaxed font-sans mb-6">
                {selectedProject.description[currentLang]}
              </p>

              <div className="space-y-4 pt-4 border-t border-white/10">
                <h4 className="text-xs font-mono font-bold text-[#ccff00] uppercase tracking-wider">
                  TECHNOLOGIES & TOOLS:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1.5 rounded-full bg-black border border-white/20 text-xs font-mono text-slate-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-white/10 flex justify-end">
                <button
                  type="button"
                  onClick={() => setSelectedProject(null)}
                  className="px-6 py-2.5 rounded-full bg-white hover:bg-[#ccff00] text-black font-marker text-xs uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Tutup
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
