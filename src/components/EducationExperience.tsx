import React from 'react';
import { motion } from 'motion/react';
import { Briefcase, GraduationCap, Calendar, Network, Building2, BookOpen } from 'lucide-react';
import { Language, Translation } from '../types';
import { EXPERIENCES, EDUCATION, ORGANIZATIONS } from '../data';

interface EducationExperienceProps {
  currentLang: Language;
  translations: Translation;
  searchQuery: string;
}

export default function EducationExperience({
  currentLang,
  translations,
  searchQuery,
}: EducationExperienceProps) {
  
  // Highlight helper
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

  // Check if item matches search
  const matchesSearch = (text: string) => {
    return text.toLowerCase().includes(searchQuery.toLowerCase());
  };

  // Filter experiences
  const filteredExperiences = EXPERIENCES.filter((exp) => {
    const titleMatch = matchesSearch(exp.title[currentLang]);
    const companyMatch = matchesSearch(exp.company);
    const pointsMatch = exp.points[currentLang].some((pt) => matchesSearch(pt));
    const periodMatch = matchesSearch(exp.period);
    return titleMatch || companyMatch || pointsMatch || periodMatch;
  });

  // Filter education
  const filteredEducation = EDUCATION.filter((edu) => {
    const fieldMatch = matchesSearch(edu.field[currentLang]);
    const instMatch = matchesSearch(edu.institution);
    return fieldMatch || instMatch;
  });

  // Filter organizations
  const filteredOrganizations = ORGANIZATIONS.filter((org) => {
    const roleMatch = matchesSearch(org.role[currentLang]);
    const orgMatch = matchesSearch(org.organization);
    return roleMatch || orgMatch;
  });

  const hasContent = filteredExperiences.length > 0 || filteredEducation.length > 0 || filteredOrganizations.length > 0;

  return (
    <section id="experience" className="py-12 md:py-20 px-4 max-w-7xl mx-auto scroll-mt-20">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500/10 rounded-lg text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-4 border border-emerald-500/20">
          <Briefcase className="h-3.5 w-3.5" />
          <span>{translations.navExperience}</span>
        </div>
        <h2 className="font-display font-black text-3xl md:text-5xl text-white tracking-tighter uppercase mb-3">
          {translations.experienceTitle}
        </h2>
        <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">
          {translations.experienceSubtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Left Side: Work Experience Timeline */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-8 w-8 rounded-xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
              <Briefcase className="h-4.5 w-4.5 text-emerald-400" />
            </div>
            <h3 className="font-display font-black text-lg text-white uppercase tracking-wider">
              {translations.experienceTitle}
            </h3>
          </div>

          <div className="relative border-l-2 border-slate-800 ml-4 pl-6 space-y-8">
            {filteredExperiences.map((exp, expIdx) => (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: expIdx * 0.1 }}
                key={exp.id}
                className="relative group"
              >
                {/* Timeline Dot */}
                <span className="absolute -left-[32px] top-1.5 h-3.5 w-3.5 rounded-full bg-[#0A0A0A] border-2 border-emerald-400 group-hover:scale-125 transition-transform" />

                <motion.div
                  whileHover={{ x: 6, scale: 1.01 }}
                  transition={{ type: 'spring', stiffness: 240, damping: 20 }}
                  className="bg-[#0A0A0A] border-2 border-slate-800 hover:border-emerald-500/30 p-6 rounded-3xl shadow-xl transition-all duration-300 cursor-pointer"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                    <span className="font-mono text-[9px] text-emerald-400 font-bold bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-400/25 uppercase tracking-wider">
                      {exp.period}
                    </span>
                    <span className="font-mono text-[9px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1">
                      <Building2 className="h-3.5 w-3.5 text-emerald-400" />
                      {exp.company}
                    </span>
                  </div>

                  <h4 className="font-display font-black text-base text-white uppercase tracking-wide mb-4">
                    {highlightText(exp.title[currentLang], searchQuery)}
                  </h4>

                  <ul className="space-y-2.5">
                    {exp.points[currentLang].map((pt, index) => (
                      <li key={index} className="flex items-start gap-2.5 text-xs text-slate-355 leading-relaxed font-sans">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shrink-0 mt-2" />
                        <span>{highlightText(pt, searchQuery)}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </motion.div>
            ))}

            {filteredExperiences.length === 0 && (
              <p className="text-slate-500 text-xs uppercase font-bold tracking-wider italic">No matching experiences.</p>
            )}
          </div>
        </div>

        {/* Right Side: Education & Organization TIMELINE */}
        <div className="space-y-12">
          {/* Education */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-8 w-8 rounded-xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                <GraduationCap className="h-4.5 w-4.5 text-emerald-400" />
              </div>
              <h3 className="font-display font-black text-lg text-white uppercase tracking-wider">
                {translations.educationTitle}
              </h3>
            </div>

            <div className="relative border-l-2 border-slate-800 ml-4 pl-6 space-y-6">
              {filteredEducation.map((edu, eduIdx) => (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                  key={edu.id}
                  className="relative group"
                >
                  {/* Timeline Dot */}
                  <span className="absolute -left-[32px] top-1.5 h-3.5 w-3.5 rounded-full bg-[#0A0A0A] border-2 border-emerald-400 group-hover:scale-125 transition-transform" />

                  <motion.div
                    whileHover={{ x: 6, scale: 1.01 }}
                    transition={{ type: 'spring', stiffness: 240, damping: 20 }}
                    className="bg-[#0A0A0A] border-2 border-slate-800 hover:border-emerald-500/30 p-6 rounded-3xl shadow-xl transition-all duration-300 cursor-pointer"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-mono text-[9px] text-emerald-400 font-bold bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-400/25 uppercase tracking-wider">
                        {edu.period}
                      </span>
                    </div>

                    <h4 className="font-display font-black text-base text-white uppercase tracking-wide">
                      {highlightText(edu.field[currentLang], searchQuery)}
                    </h4>
                    <p className="font-mono text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1.5">
                      {highlightText(edu.institution, searchQuery)}
                    </p>
                  </motion.div>
                </motion.div>
              ))}

              {filteredEducation.length === 0 && (
                <p className="text-slate-500 text-xs uppercase font-bold tracking-wider italic">No matching education.</p>
              )}
            </div>
          </div>

          {/* Organizations */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-8 w-8 rounded-xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                <Network className="h-4.5 w-4.5 text-emerald-400" />
              </div>
              <h3 className="font-display font-black text-lg text-white uppercase tracking-wider">
                {translations.orgTitle}
              </h3>
            </div>

            <div className="relative border-l-2 border-slate-800 ml-4 pl-6 space-y-6">
              {filteredOrganizations.map((org, orgIdx) => (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: orgIdx * 0.1 }}
                  key={org.id}
                  className="relative group"
                >
                  {/* Timeline Dot */}
                  <span className="absolute -left-[32px] top-1.5 h-3.5 w-3.5 rounded-full bg-[#0A0A0A] border-2 border-emerald-400 group-hover:scale-125 transition-transform" />

                  <motion.div
                    whileHover={{ x: 6, scale: 1.01 }}
                    transition={{ type: 'spring', stiffness: 240, damping: 20 }}
                    className="bg-[#0A0A0A] border-2 border-slate-800 hover:border-emerald-500/30 p-5 rounded-3xl shadow-xl transition-all duration-300 cursor-pointer"
                  >
                    <div className="flex items-center justify-between mb-3.5">
                      <span className="font-mono text-[9px] text-emerald-400 font-bold bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-400/25 uppercase tracking-wider">
                        {org.period}
                      </span>
                    </div>

                    <h4 className="font-display font-black text-sm text-white uppercase tracking-wide">
                      {highlightText(org.role[currentLang], searchQuery)}
                    </h4>
                    <p className="font-mono text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1.5">
                      {highlightText(org.organization, searchQuery)}
                    </p>
                  </motion.div>
                </motion.div>
              ))}

              {filteredOrganizations.length === 0 && (
                <p className="text-slate-500 text-xs uppercase font-bold tracking-wider italic">No matching organization activity.</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {!hasContent && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-10 bg-[#0A0A0A] border-2 border-slate-800 rounded-3xl max-w-md mx-auto mt-10"
        >
          <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">{translations.noResults}</p>
        </motion.div>
      )}
    </section>
  );
}
