import React from 'react';
import { Mail, Phone, MapPin, Globe, Award, BookOpen, Briefcase, Star } from 'lucide-react';
import { Language } from '../types';
import { PERSONAL_INFO, SKILLS, EXPERIENCES, EDUCATION, ORGANIZATIONS, PERSONALITY, HOBBIES, LANGUAGES } from '../data';

interface PrintableCVProps {
  currentLang: Language;
}

export default function PrintableCV({ currentLang }: PrintableCVProps) {
  return (
    <div
      id="printable-cv"
      className="w-[800px] min-h-[1130px] p-8 font-sans relative flex flex-col justify-between"
      style={{ boxSizing: 'border-box', backgroundColor: '#ffffff', color: '#1e293b' }}
    >
      {/* Upper Border/Accent Bar */}
      <div className="absolute top-0 left-0 right-0 h-2" style={{ backgroundColor: '#1e293b' }} />

      {/* Main Content Area */}
      <div className="grid grid-cols-12 gap-8 h-full">
        
        {/* Left Side Column (Slate/Gray accent background feel, styled nicely) */}
        <div className="col-span-4 pr-6 flex flex-col justify-between h-full" style={{ borderRight: '1px solid #e2e8f0' }}>
          <div>
            {/* Header / Brand */}
            <div className="mb-6 text-center">
              <div className="h-20 w-20 rounded-full flex items-center justify-center overflow-hidden mx-auto mb-3" style={{ backgroundColor: '#f1f5f9', border: '2px solid #cbd5e1' }}>
                {PERSONAL_INFO.profileImage ? (
                  <img 
                    src={PERSONAL_INFO.profileImage} 
                    alt={PERSONAL_INFO.name} 
                    className="w-full h-full object-cover" 
                  />
                ) : (
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    <circle cx="50" cy="50" r="50" fill="#f1f5f9" />
                    <path d="M50 30c8.28 0 15 6.72 15 15s-6.72 15-15 15-15-6.72-15-15 6.72-15 15-15z" fill="#94a3b8" />
                    <path d="M15 85c0-15 15-22 35-22s35 7 35 22H15z" fill="#64748b" />
                    <path d="M35 40c3-5 8-8 15-8s12 3 15 8c0 0-5-10-15-10s-15 10-15 10z" fill="#1e293b" />
                  </svg>
                )}
              </div>
              <h2 className="font-sans font-black text-xl leading-tight uppercase tracking-tight" style={{ color: '#0f172a' }}>
                {PERSONAL_INFO.name}
              </h2>
              <p className="font-mono text-[9px] font-extrabold uppercase tracking-wider mt-1" style={{ color: '#64748b' }}>
                {PERSONAL_INFO.title}
              </p>
            </div>

            {/* Contacts info */}
            <div className="space-y-3 mb-6 pt-4" style={{ borderTop: '1px solid #e2e8f0' }}>
              <h3 className="font-sans font-bold text-xs uppercase tracking-wider mb-2" style={{ color: '#1e293b' }}>
                CONTACT
              </h3>
              <div className="flex items-center gap-2 text-[10px]" style={{ color: '#475569' }}>
                <Phone className="h-3.5 w-3.5 shrink-0" style={{ color: '#334155' }} />
                <span className="font-mono">{PERSONAL_INFO.contacts.whatsapp}</span>
              </div>
              <div className="flex items-center gap-2 text-[10px] truncate" style={{ color: '#475569' }}>
                <Mail className="h-3.5 w-3.5 shrink-0" style={{ color: '#334155' }} />
                <span className="font-mono truncate">{PERSONAL_INFO.contacts.email}</span>
              </div>
              <div className="flex items-center gap-2 text-[10px]" style={{ color: '#475569' }}>
                <MapPin className="h-3.5 w-3.5 shrink-0" style={{ color: '#334155' }} />
                <span>Tangerang, Banten, ID</span>
              </div>
              <div className="flex items-center gap-2 text-[10px]" style={{ color: '#475569' }}>
                <Globe className="h-3.5 w-3.5 shrink-0" style={{ color: '#334155' }} />
                <span>riady.me (Portfolio)</span>
              </div>
            </div>

            {/* Skills */}
            <div className="space-y-3 mb-6 pt-4" style={{ borderTop: '1px solid #e2e8f0' }}>
              <h3 className="font-sans font-bold text-xs uppercase tracking-wider mb-2" style={{ color: '#1e293b' }}>
                KEY SKILLS
              </h3>
              <div className="space-y-2">
                {SKILLS.map((skill) => (
                  <div key={skill.name} className="space-y-0.5">
                    <div className="flex justify-between items-center text-[9px]">
                      <span className="font-bold" style={{ color: '#334155' }}>{skill.name}</span>
                      <span className="font-mono font-bold" style={{ color: '#94a3b8' }}>{skill.level}/5</span>
                    </div>
                    <div className="h-1 rounded-full overflow-hidden" style={{ backgroundColor: '#f1f5f9' }}>
                      <div className="h-full" style={{ width: `${skill.level * 20}%`, backgroundColor: '#1e293b' }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Languages */}
            <div className="space-y-2 mb-6 pt-4" style={{ borderTop: '1px solid #e2e8f0' }}>
              <h3 className="font-sans font-bold text-xs uppercase tracking-wider mb-2" style={{ color: '#1e293b' }}>
                LANGUAGES
              </h3>
              {LANGUAGES[currentLang].map((lang) => (
                <div key={lang.name} className="flex justify-between items-center text-[10px]">
                  <span className="font-bold" style={{ color: '#334155' }}>{lang.name}</span>
                  <span className="italic text-[9px]" style={{ color: '#64748b' }}>{lang.level}</span>
                </div>
              ))}
            </div>

            {/* Personality attributes */}
            <div className="space-y-2 mb-6 pt-4" style={{ borderTop: '1px solid #e2e8f0' }}>
              <h3 className="font-sans font-bold text-xs uppercase tracking-wider mb-2" style={{ color: '#1e293b' }}>
                STRENGTHS
              </h3>
              <div className="grid grid-cols-1 gap-1">
                {PERSONALITY[currentLang].map((trait, i) => (
                  <span key={i} className="text-[10px] flex items-center gap-1.5" style={{ color: '#475569' }}>
                    <Star className="h-2.5 w-2.5 shrink-0" style={{ color: '#1e293b' }} fill="currentColor" />
                    <span>{trait}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Hobbies / bottom left */}
          <div className="pt-4" style={{ borderTop: '1px solid #e2e8f0' }}>
            <h3 className="font-sans font-bold text-xs uppercase tracking-wider mb-2" style={{ color: '#1e293b' }}>
              INTERESTS
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {HOBBIES[currentLang].map((hobby, i) => (
                <span key={i} className="text-[9px] px-2 py-0.5 rounded font-medium" style={{ backgroundColor: '#f1f5f9', color: '#334155', border: '1px solid #e2e8f0' }}>
                  {hobby.name}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* Right Side Column (Primary Content) */}
        <div className="col-span-8 pt-2 flex flex-col justify-between h-full">
          <div>
            {/* About me */}
            <div className="mb-6">
              <h3 className="font-sans font-extrabold text-sm uppercase tracking-wider pb-1 mb-2" style={{ color: '#0f172a', borderBottom: '2px solid #1e293b' }}>
                {currentLang === 'en' ? 'ABOUT ME' : 'TENTANG SAYA'}
              </h3>
              <p className="text-[10px] leading-relaxed font-sans text-justify" style={{ color: '#334155' }}>
                {PERSONAL_INFO.aboutMe[currentLang]}
              </p>
            </div>

            {/* Experience */}
            <div className="mb-6">
              <h3 className="font-sans font-extrabold text-sm uppercase tracking-wider pb-1 mb-3" style={{ color: '#0f172a', borderBottom: '2px solid #1e293b' }}>
                {currentLang === 'en' ? 'PROFESSIONAL EXPERIENCE' : 'PENGALAMAN PROFESIONAL'}
              </h3>
              <div className="space-y-4">
                {EXPERIENCES.map((exp) => (
                  <div key={exp.id} className="space-y-1.5">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-sans font-bold text-[11px] uppercase" style={{ color: '#0f172a' }}>
                          {exp.title[currentLang]}
                        </h4>
                        <p className="text-[9px] font-mono uppercase font-bold" style={{ color: '#64748b' }}>
                          {exp.company}
                        </p>
                      </div>
                      <span className="font-mono text-[9px] font-extrabold px-2 py-0.5 rounded" style={{ color: '#475569', backgroundColor: '#f1f5f9', border: '1px solid #e2e8f0' }}>
                        {exp.period}
                      </span>
                    </div>
                    <ul className="space-y-1">
                      {exp.points[currentLang].map((point, i) => (
                        <li key={i} className="text-[10px] leading-relaxed flex items-start gap-1.5 pl-1" style={{ color: '#334155' }}>
                          <span className="h-1.5 w-1.5 rounded-full shrink-0 mt-1" style={{ backgroundColor: '#475569' }} />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div className="mb-6">
              <h3 className="font-sans font-extrabold text-sm uppercase tracking-wider pb-1 mb-2.5" style={{ color: '#0f172a', borderBottom: '2px solid #1e293b' }}>
                {currentLang === 'en' ? 'EDUCATION' : 'PENDIDIKAN'}
              </h3>
              {EDUCATION.map((edu) => (
                <div key={edu.id} className="flex justify-between items-start">
                  <div>
                    <h4 className="font-sans font-bold text-[10px]" style={{ color: '#0f172a' }}>
                      {edu.field[currentLang]}
                    </h4>
                    <p className="text-[9px] font-mono uppercase font-bold" style={{ color: '#64748b' }}>
                      {edu.institution}
                    </p>
                  </div>
                  <span className="font-mono text-[9px] font-extrabold" style={{ color: '#475569' }}>
                    {edu.period}
                  </span>
                </div>
              ))}
            </div>

            {/* Organizations */}
            <div>
              <h3 className="font-sans font-extrabold text-sm uppercase tracking-wider pb-1 mb-2.5" style={{ color: '#0f172a', borderBottom: '2px solid #1e293b' }}>
                {currentLang === 'en' ? 'ORGANIZATION & LEADERSHIP' : 'AKTIVITAS ORGANISASI'}
              </h3>
              <div className="grid grid-cols-1 gap-2.5">
                {ORGANIZATIONS.map((org) => (
                  <div key={org.id} className="flex justify-between items-start">
                    <div>
                      <h4 className="font-sans font-bold text-[10px]" style={{ color: '#0f172a' }}>
                        {org.role[currentLang]}
                      </h4>
                      <p className="text-[9px] font-mono uppercase font-bold" style={{ color: '#64748b' }}>
                        {org.organization}
                      </p>
                    </div>
                    <span className="font-mono text-[9px] font-extrabold" style={{ color: '#475569' }}>
                      {org.period}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer watermark */}
          <div className="text-center pt-2 flex justify-between items-center text-[8px] font-mono" style={{ borderTop: '1px solid #f1f5f9', color: '#94a3b8' }}>
            <span>Sandi Riady &bull; Portfolio Export</span>
            <span>Generated Automatically</span>
          </div>

        </div>

      </div>
    </div>
  );
}
