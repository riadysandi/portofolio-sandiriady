import React from 'react';
import { motion } from 'motion/react';
import { Globe, ExternalLink, Activity, Wrench, Code2, AlertTriangle } from 'lucide-react';
import { Translation, Language, LiveSite } from '../types';

interface LiveProjectsProps {
  currentLang: Language;
  translations: Translation;
  liveProjects?: LiveSite[];
}

export default function LiveProjects({ currentLang, translations, liveProjects = [] }: LiveProjectsProps) {
  if (!liveProjects || liveProjects.length === 0) return null;

  return (
    <section id="live-sites" className="py-6 md:py-8 px-4 max-w-7xl mx-auto scroll-mt-20 relative">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Editorial Section Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 mb-6 border-b border-white/10 text-[10px] font-mono uppercase tracking-[0.2em] text-slate-400">
          <div className="flex items-center gap-3">
            <span className="text-emerald-400 font-bold">(04)</span>
            <span className="text-white font-bold">{translations.navLiveSites}</span>
            <span className="text-slate-600">/</span>
            <span className="text-slate-400">ACTIVE PRODUCTION SYSTEMS</span>
          </div>
          <div className="font-mono text-[9px] text-slate-500 font-bold uppercase tracking-wider">
            STATUS // {liveProjects.length} SITES MONITORED
          </div>
        </div>

        <div className="max-w-3xl mb-6">
          <h2 className="font-display font-black text-3xl md:text-5xl text-white tracking-tight uppercase mb-2">
            {translations.liveSitesTitle}
          </h2>
          <p className="text-slate-400 text-xs md:text-sm max-w-2xl font-sans">
            {translations.liveSitesSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {liveProjects.map((site, index) => (
            <motion.div
              key={site.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.4, ease: [0.3, 0, 0.1, 1] }}
              whileHover={{ y: -3 }}
              className="group bg-[#060606] border border-white/10 hover:border-emerald-400/50 hover:bg-white/[0.02] p-5 md:p-6 rounded-xl shadow-xl transition-all duration-300 relative flex flex-col justify-between h-full"
            >
              {/* Corner Crosshairs */}
              <span className="absolute -top-1 -left-1 text-[10px] font-mono text-emerald-400/0 group-hover:text-emerald-400 font-bold select-none transition-colors duration-200">+</span>
              <span className="absolute -top-1 -right-1 text-[10px] font-mono text-emerald-400/0 group-hover:text-emerald-400 font-bold select-none transition-colors duration-200">+</span>
              <span className="absolute -bottom-1 -left-1 text-[10px] font-mono text-emerald-400/0 group-hover:text-emerald-400 font-bold select-none transition-colors duration-200">+</span>
              <span className="absolute -bottom-1 -right-1 text-[10px] font-mono text-emerald-400/0 group-hover:text-emerald-400 font-bold select-none transition-colors duration-200">+</span>

              <div>
                <div className="flex justify-between items-start mb-4">
                  <div className="h-10 w-10 rounded-lg bg-black border border-white/10 flex items-center justify-center group-hover:border-emerald-400/40 group-hover:bg-emerald-950/20 transition-all duration-300">
                    <Globe className="h-4 w-4 text-emerald-400" />
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[9px] text-slate-500 font-bold uppercase">
                      SYS-{String(index + 1).padStart(2, '0')}
                    </span>
                    {site.status === 'active' && (
                      <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-mono font-bold uppercase tracking-wider">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" /> LIVE
                      </span>
                    )}
                    {site.status === 'maintenance' && (
                      <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-[10px] font-mono font-bold uppercase tracking-wider">
                        <Wrench className="h-3 w-3" /> MAINT
                      </span>
                    )}
                    {site.status === 'development' && (
                      <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-mono font-bold uppercase tracking-wider">
                        <Code2 className="h-3 w-3" /> DEV
                      </span>
                    )}
                  </div>
                </div>

                <h3 className="font-display font-black text-base text-white group-hover:text-emerald-300 transition-colors uppercase tracking-wide mb-2">
                  {site.name}
                </h3>
                
                <p className="text-slate-300 text-xs leading-relaxed font-sans line-clamp-3 mb-6">
                  {site.description[currentLang]}
                </p>
              </div>

              <div className="mt-auto pt-3 border-t border-white/10">
                {site.status === 'active' ? (
                  <a
                    href={site.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-lg bg-black border border-white/15 hover:border-emerald-400 hover:text-emerald-400 text-slate-300 text-[10px] font-mono font-bold uppercase tracking-[0.15em] transition-all duration-300 group/btn"
                  >
                    <span>LAUNCH PORTAL</span>
                    <ExternalLink className="h-3 w-3 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                  </a>
                ) : (
                  <div className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-lg bg-black/40 border border-white/5 text-slate-500 text-[10px] font-mono font-bold uppercase tracking-wider cursor-not-allowed">
                    <AlertTriangle className="h-3 w-3" />
                    <span>OFFLINE // IN MAINTENANCE</span>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

