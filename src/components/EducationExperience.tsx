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
    <section id="experience" className="py-6 md:py-8 px-4 max-w-7xl mx-auto scroll-mt-20">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-6 md:mb-8">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-emerald-500/10 rounded-full text-xs font-bold text-emerald-400 uppercase tracking-widest mb-2.5 border border-emerald-500/20 shadow-[0_0_12px_rgba(16,185,129,0.1)]">
          <Briefcase className="h-3.5 w-3.5" />
          <span>{translations.navExperience}</span>
        </div>
        <h2 className="font-display font-black text-2xl md:text-4xl text-white tracking-tight uppercase mb-2">
          {translations.experienceTitle}
        </h2>
        <p className="text-slate-400 text-xs md:text-sm max-w-2xl mx-auto">
          {translations.experienceSubtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-start">
        {/* Left Side: Work Experience Timeline */}
        <div className="space-y-4 md:space-y-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-8 w-8 rounded-xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
              <Briefcase className="h-4 w-4 text-emerald-400" />
            </div>
            <h3 className="font-display font-black text-base md:text-lg text-white uppercase tracking-wider">
              {translations.experienceTitle}
            </h3>
          </div>

          <div className="relative border-l-2 border-slate-800 ml-3.5 pl-5 md:pl-6 space-y-4">
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
                <span className="absolute -left-[29px] md:-left-[33px] top-2 h-3.5 w-3.5 rounded-full bg-black border-2 border-slate-700 group-hover:border-emerald-400 group-hover:bg-emerald-400 group-hover:shadow-[0_0_12px_rgba(16,185,129,0.8)] transition-all duration-300" />

                <motion.div
                  whileHover={{ x: 4 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                  className="bg-[#0A0A0A] border border-slate-800 hover:border-emerald-500/40 hover:shadow-[0_0_25px_rgba(16,185,129,0.1)] p-5 md:p-6 rounded-2xl md:rounded-3xl shadow-lg transition-all duration-300 cursor-pointer"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2.5 mb-2.5">
                    <span className="font-mono text-[9px] text-emerald-400 font-bold bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-400/25 uppercase tracking-wider">
                      {exp.period}
                    </span>
                    <span className="font-mono text-[9px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                      <Building2 className="h-3.5 w-3.5 text-emerald-400" />
                      {exp.company}
                    </span>
                  </div>

                  <h4 className="font-display font-black text-base text-white uppercase tracking-wide mb-3 group-hover:text-emerald-300 transition-colors">
                    {highlightText(exp.title[currentLang], searchQuery)}
                  </h4>

                  <ul className="space-y-2">
                    {exp.points[currentLang].map((pt, index) => (
                      <li key={index} className="flex items-start gap-2 text-xs text-slate-300 leading-relaxed font-sans">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shrink-0 mt-1.5" />
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
        <div className="space-y-5 md:space-y-6">
          {/* Education */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-8 w-8 rounded-xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                <GraduationCap className="h-4 w-4 text-emerald-400" />
              </div>
              <h3 className="font-display font-black text-base md:text-lg text-white uppercase tracking-wider">
                {translations.educationTitle}
              </h3>
            </div>

            <div className="relative border-l-2 border-slate-800 ml-3.5 pl-5 md:pl-6 space-y-4">
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
                  <span className="absolute -left-[29px] md:-left-[33px] top-2 h-3.5 w-3.5 rounded-full bg-black border-2 border-slate-700 group-hover:border-emerald-400 group-hover:bg-emerald-400 group-hover:shadow-[0_0_12px_rgba(16,185,129,0.8)] transition-all duration-300" />

                  <motion.div
                    whileHover={{ x: 4 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                    className="bg-[#0A0A0A] border border-slate-800 hover:border-emerald-500/40 hover:shadow-[0_0_25px_rgba(16,185,129,0.1)] p-4 sm:p-5 rounded-2xl md:rounded-3xl shadow-lg transition-all duration-300 cursor-pointer"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-[9px] text-emerald-400 font-bold bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-400/25 uppercase tracking-wider">
                        {edu.period}
                      </span>
                    </div>

                    <h4 className="font-display font-black text-base text-white uppercase tracking-wide group-hover:text-emerald-300 transition-colors">
                      {highlightText(edu.field[currentLang], searchQuery)}
                    </h4>
                    <p className="font-mono text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">
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
            <div className="flex items-center gap-3 mb-4">
              <div className="h-8 w-8 rounded-xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                <Network className="h-4 w-4 text-emerald-400" />
              </div>
              <h3 className="font-display font-black text-base md:text-lg text-white uppercase tracking-wider">
                {translations.orgTitle}
              </h3>
            </div>

            <div className="relative border-l-2 border-slate-800 ml-3.5 pl-5 md:pl-6 space-y-4">
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
                  <span className="absolute -left-[29px] md:-left-[33px] top-2 h-3.5 w-3.5 rounded-full bg-black border-2 border-slate-700 group-hover:border-emerald-400 group-hover:bg-emerald-400 group-hover:shadow-[0_0_12px_rgba(16,185,129,0.8)] transition-all duration-300" />

                  <motion.div
                    whileHover={{ x: 4 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                    className="bg-[#0A0A0A] border border-slate-800 hover:border-emerald-500/40 hover:shadow-[0_0_25px_rgba(16,185,129,0.1)] p-4 sm:p-5 rounded-2xl md:rounded-3xl shadow-lg transition-all duration-300 cursor-pointer"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-[9px] text-emerald-400 font-bold bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-400/25 uppercase tracking-wider">
                        {org.period}
                      </span>
                    </div>

                    <h4 className="font-display font-black text-sm text-white uppercase tracking-wide group-hover:text-emerald-300 transition-colors">
                      {highlightText(org.role[currentLang], searchQuery)}
                    </h4>
                    <p className="font-mono text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">
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

