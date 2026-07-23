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
    <section id="live-sites" className="py-24 px-4 bg-slate-900/30 relative border-t border-slate-800/50">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center p-2 bg-emerald-500/10 rounded-2xl mb-4 border border-emerald-500/20">
            <Globe className="h-6 w-6 text-emerald-400" />
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-slate-100 mb-6 tracking-tight">
            {translations.liveSitesTitle}
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
            {translations.liveSitesSubtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {liveProjects.map((site, index) => (
            <motion.div
              key={site.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 md:p-8 hover:border-emerald-500/50 transition-all duration-300 relative overflow-hidden flex flex-col h-full"
            >
              {/* Hover glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/0 via-emerald-500/0 to-emerald-500/5 group-hover:to-emerald-500/10 transition-colors duration-500 pointer-events-none" />

              <div className="flex justify-between items-start mb-6">
                <div className="h-12 w-12 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center group-hover:scale-110 group-hover:bg-emerald-500/10 group-hover:border-emerald-500/30 transition-all duration-300">
                  <Globe className="h-6 w-6 text-slate-400 group-hover:text-emerald-400 transition-colors" />
                </div>
                
                {site.status === 'active' && (
                  <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                    <Activity className="h-3.5 w-3.5 animate-pulse" /> Live
                  </span>
                )}
                {site.status === 'maintenance' && (
                  <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-xs font-bold uppercase tracking-wider">
                    <Wrench className="h-3.5 w-3.5" /> Maintenance
                  </span>
                )}
                {site.status === 'development' && (
                  <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider">
                    <Code2 className="h-3.5 w-3.5" /> Dev
                  </span>
                )}
              </div>

              <h3 className="text-xl font-bold text-slate-100 mb-3 group-hover:text-emerald-400 transition-colors">
                {site.name}
              </h3>
              
              <p className="text-slate-400 text-sm leading-relaxed mb-8 flex-grow">
                {site.description[currentLang]}
              </p>

              <div className="mt-auto">
                {site.status === 'active' ? (
                  <a
                    href={site.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-slate-800 hover:bg-emerald-500 text-slate-300 hover:text-white text-sm font-bold transition-all duration-300 group/btn"
                  >
                    <span>Visit Website</span>
                    <ExternalLink className="h-4 w-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                  </a>
                ) : (
                  <div className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-slate-800/50 text-slate-500 text-sm font-bold border border-slate-700/50 cursor-not-allowed">
                    <AlertTriangle className="h-4 w-4" />
                    <span>Currently Unavailable</span>
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
