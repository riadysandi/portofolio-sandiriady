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
    <section id="experience" className="py-8 md:py-12 px-4 max-w-7xl mx-auto scroll-mt-20">
      <div className="max-w-3xl mb-8">
        <div className="flex items-center gap-2">
          <h2 className="font-marker text-3xl sm:text-4xl lg:text-5xl text-white tracking-wider uppercase">
            {translations.experienceTitle}
          </h2>
          <span className="text-[#ccff00] text-xl font-marker animate-pulse">⚡</span>
        </div>
        <div className="text-[#8b5cf6] -mt-1 mb-2">
          <svg viewBox="0 0 160 30" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-36 sm:w-44 h-6 text-[#8b5cf6]">
            <path d="M5 15 Q 25 2, 45 15 T 85 15 T 125 15 T 155 15" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
          </svg>
        </div>
        <p className="text-slate-300 text-xs sm:text-sm max-w-2xl font-sans">
          {translations.experienceSubtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-start">
        {/* Left Side: Work Experience Timeline */}
        <div className="space-y-4 md:space-y-5">
          <div className="pb-2 border-b border-white/10 mb-4 flex items-center gap-2">
            <Briefcase className="h-4 w-4 text-[#ccff00]" />
            <h3 className="font-mono text-xs font-bold text-white uppercase tracking-[0.2em]">
              {translations.experienceTitle}
            </h3>
          </div>

          <div className="relative border-l-2 border-white/15 ml-3.5 pl-5 md:pl-6 space-y-4">
            {filteredExperiences.map((exp, expIdx) => (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: expIdx * 0.1, ease: [0.3, 0, 0.1, 1] }}
                key={exp.id}
                className="relative group"
              >
                {/* Timeline Dot */}
                <span className="absolute -left-[28px] md:-left-[32px] top-3 h-3 w-3 rounded-full bg-black border-2 border-slate-500 group-hover:border-[#ccff00] group-hover:bg-[#ccff00] transition-all duration-300" />

                <motion.div
                  whileHover={{ x: 4 }}
                  transition={{ ease: [0.3, 0, 0.1, 1], duration: 0.2 }}
                  className="bg-[#12131a] border-2 border-[#232533] hover:border-[#ccff00]/50 p-5 md:p-6 rounded-2xl shadow-xl transition-all duration-300 cursor-default relative"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2.5 mb-2.5">
                    <span className="font-mono text-[9px] text-black font-black bg-[#ccff00] px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                      {exp.period}
                    </span>
                    <span className="font-mono text-[9px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                      <Building2 className="h-3 w-3 text-[#38bdf8]" />
                      {exp.company}
                    </span>
                  </div>

                  <h4 className="font-display font-black text-base text-white uppercase tracking-wide mb-3 group-hover:text-[#ccff00] transition-colors">
                    {highlightText(exp.title[currentLang], searchQuery)}
                  </h4>

                  <ul className="space-y-2">
                    {exp.points[currentLang].map((pt, index) => (
                      <li key={index} className="flex items-start gap-2 text-xs text-slate-300 leading-relaxed font-sans">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#ccff00] shrink-0 mt-1.5" />
                        <span>{highlightText(pt, searchQuery)}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </motion.div>
            ))}

            {filteredExperiences.length === 0 && (
              <p className="text-slate-500 text-xs uppercase font-mono tracking-wider italic">No matching experiences.</p>
            )}
          </div>
        </div>

        {/* Right Side: Education & Organization TIMELINE */}
        <div className="space-y-6">
          {/* Education */}
          <div>
            <div className="pb-2 border-b border-white/10 mb-4 flex items-center gap-2">
              <GraduationCap className="h-4 w-4 text-[#38bdf8]" />
              <h3 className="font-mono text-xs font-bold text-white uppercase tracking-[0.2em]">
                {translations.educationTitle}
              </h3>
            </div>

            <div className="relative border-l-2 border-white/15 ml-3.5 pl-5 md:pl-6 space-y-4">
              {filteredEducation.map((edu, eduIdx) => (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: eduIdx * 0.1, ease: [0.3, 0, 0.1, 1] }}
                  key={edu.id}
                  className="relative group"
                >
                  <span className="absolute -left-[28px] md:-left-[32px] top-3 h-3 w-3 rounded-full bg-black border-2 border-slate-500 group-hover:border-[#38bdf8] group-hover:bg-[#38bdf8] transition-all duration-300" />

                  <motion.div
                    whileHover={{ x: 4 }}
                    transition={{ ease: [0.3, 0, 0.1, 1], duration: 0.2 }}
                    className="bg-[#12131a] border-2 border-[#232533] hover:border-[#38bdf8]/50 p-4 sm:p-5 rounded-2xl shadow-xl transition-all duration-300 cursor-default relative"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-[9px] text-black font-black bg-[#38bdf8] px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                        {edu.period}
                      </span>
                    </div>

                    <h4 className="font-display font-black text-base text-white uppercase tracking-wide group-hover:text-[#38bdf8] transition-colors">
                      {highlightText(edu.field[currentLang], searchQuery)}
                    </h4>
                    <p className="font-mono text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">
                      {highlightText(edu.institution, searchQuery)}
                    </p>
                  </motion.div>
                </motion.div>
              ))}

              {filteredEducation.length === 0 && (
                <p className="text-slate-500 text-xs uppercase font-mono tracking-wider italic">No matching education.</p>
              )}
            </div>
          </div>

          {/* Organizations */}
          <div>
            <div className="pb-2 border-b border-white/10 mb-4 flex items-center gap-2">
              <Network className="h-4 w-4 text-[#8b5cf6]" />
              <h3 className="font-mono text-xs font-bold text-white uppercase tracking-[0.2em]">
                {translations.orgTitle}
              </h3>
            </div>

            <div className="relative border-l-2 border-white/15 ml-3.5 pl-5 md:pl-6 space-y-4">
              {filteredOrganizations.map((org, orgIdx) => (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: orgIdx * 0.1, ease: [0.3, 0, 0.1, 1] }}
                  key={org.id}
                  className="relative group"
                >
                  <span className="absolute -left-[28px] md:-left-[32px] top-3 h-3 w-3 rounded-full bg-black border-2 border-slate-500 group-hover:border-[#8b5cf6] group-hover:bg-[#8b5cf6] transition-all duration-300" />

                  <motion.div
                    whileHover={{ x: 4 }}
                    transition={{ ease: [0.3, 0, 0.1, 1], duration: 0.2 }}
                    className="bg-[#12131a] border-2 border-[#232533] hover:border-[#8b5cf6]/50 p-4 sm:p-5 rounded-2xl shadow-xl transition-all duration-300 cursor-default relative"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-[9px] text-white font-black bg-[#8b5cf6] px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                        {org.period}
                      </span>
                    </div>

                    <h4 className="font-display font-black text-base text-white uppercase tracking-wide group-hover:text-[#8b5cf6] transition-colors">
                      {highlightText(org.role[currentLang], searchQuery)}
                    </h4>
                    <p className="font-mono text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">
                      {highlightText(org.organization, searchQuery)}
                    </p>
                  </motion.div>
                </motion.div>
              ))}

              {filteredOrganizations.length === 0 && (
                <p className="text-slate-500 text-xs uppercase font-mono tracking-wider italic">No matching organization activity.</p>
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

