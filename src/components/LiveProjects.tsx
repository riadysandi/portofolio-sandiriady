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
    <section id="live-sites" className="py-12 md:py-20 px-4 max-w-7xl mx-auto scroll-mt-20">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500/10 rounded-lg text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-4 border border-emerald-500/20">
            <Globe className="h-3.5 w-3.5" />
            <span>{translations.navLiveSites}</span>
          </div>
          <h2 className="font-display font-black text-3xl md:text-5xl text-white tracking-tighter uppercase mb-3">
            {translations.liveSitesTitle}
          </h2>
          <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">
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
              className="group bg-[#0A0A0A] border-2 border-slate-800 hover:border-emerald-500/50 p-6 rounded-3xl shadow-xl transition-all duration-300 relative overflow-hidden flex flex-col justify-between h-full"
            >
              {/* Corner Accent */}
              <div className="absolute top-0 right-0 h-16 w-16 bg-gradient-to-bl from-emerald-500/5 to-transparent rounded-bl-3xl group-hover:from-emerald-500/15 transition-all" />

              <div className="flex justify-between items-start mb-6">
                <div className="h-10 w-10 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center group-hover:border-emerald-500/30 group-hover:bg-emerald-950/20 transition-all duration-300">
                  <Globe className="h-5 w-5 text-emerald-400" />
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

              <h3 className="font-display font-black text-base text-white group-hover:text-emerald-400 transition-colors uppercase tracking-wide mb-3">
                {site.name}
              </h3>
              
              <p className="text-slate-300 text-xs leading-relaxed font-sans line-clamp-3 mb-8 flex-grow">
                {site.description[currentLang]}
              </p>

              <div className="mt-auto">
                {site.status === 'active' ? (
                  <a
                    href={site.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-emerald-500/50 text-slate-300 hover:text-emerald-400 text-xs font-bold uppercase tracking-wider transition-all duration-300 group/btn"
                  >
                    <span>Visit Website</span>
                    <ExternalLink className="h-3 w-3 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                  </a>
                ) : (
                  <div className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-slate-950/50 border border-slate-800/50 text-slate-500 text-xs font-bold uppercase tracking-wider cursor-not-allowed">
                    <AlertTriangle className="h-3 w-3" />
                    <span>Unavailable</span>
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
