import React from 'react';
import { Mail, Phone, MapPin, Globe, Star } from 'lucide-react';
import { Language } from '../types';
import { PERSONAL_INFO, SKILLS, EXPERIENCES, EDUCATION, ORGANIZATIONS, PERSONALITY, HOBBIES, LANGUAGES } from '../data';

interface PrintableCVProps {
  currentLang: Language;
}

export default function PrintableCV({ currentLang }: PrintableCVProps) {
  return (
    <div
      id="printable-cv"
      style={{
        width: '800px',
        height: '1130px',
        padding: '32px',
        boxSizing: 'border-box',
        backgroundColor: '#ffffff',
        color: '#1e293b',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        fontFamily: 'system-ui, -apple-system, sans-serif'
      }}
    >
      {/* Upper Border/Accent Bar */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '8px', backgroundColor: '#1e293b' }} />

      {/* Main Content Area */}
      <div style={{ display: 'flex', width: '100%', height: '100%', gap: '28px' }}>
        
        {/* Left Side Column */}
        <div style={{ width: '32%', paddingRight: '16px', borderRight: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
          <div>
            {/* Header / Brand */}
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <div style={{ width: '90px', height: '90px', borderRadius: '50%', overflow: 'hidden', margin: '0 auto 12px auto', border: '2px solid #cbd5e1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {PERSONAL_INFO.profileImage ? (
                  <img 
                    src={PERSONAL_INFO.profileImage} 
                    alt={PERSONAL_INFO.name} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                ) : (
                  <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%' }}>
                    <circle cx="50" cy="50" r="50" fill="#f1f5f9" />
                    <path d="M50 30c8.28 0 15 6.72 15 15s-6.72 15-15 15-15-6.72-15-15 6.72-15 15-15z" fill="#94a3b8" />
                    <path d="M15 85c0-15 15-22 35-22s35 7 35 22H15z" fill="#64748b" />
                    <path d="M35 40c3-5 8-8 15-8s12 3 15 8c0 0-5-10-15-10s-15 10-15 10z" fill="#1e293b" />
                  </svg>
                )}
              </div>
              <h2 style={{ fontSize: '18px', fontWeight: '900', color: '#0f172a', textTransform: 'uppercase', letterSpacing: '-0.5px', margin: '0 0 4px 0', lineHeight: '1.2' }}>
                {PERSONAL_INFO.name}
              </h2>
              <p style={{ fontFamily: 'monospace', fontSize: '9px', fontWeight: '800', color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px', margin: '0' }}>
                {PERSONAL_INFO.title}
              </p>
            </div>

            {/* Contacts info */}
            <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '12px', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '11px', fontWeight: 'bold', color: '#1e293b', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>
                CONTACT
              </h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '9.5px', color: '#475569', marginBottom: '6px' }}>
                <Phone size={12} style={{ color: '#334155', flexShrink: 0 }} />
                <span style={{ fontFamily: 'monospace' }}>{PERSONAL_INFO.contacts.whatsapp}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '9.5px', color: '#475569', marginBottom: '6px' }}>
                <Mail size={12} style={{ color: '#334155', flexShrink: 0 }} />
                <span style={{ fontFamily: 'monospace', wordBreak: 'break-all' }}>{PERSONAL_INFO.contacts.email}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '9.5px', color: '#475569', marginBottom: '6px' }}>
                <MapPin size={12} style={{ color: '#334155', flexShrink: 0 }} />
                <span>Tangerang, Banten, ID</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '9.5px', color: '#475569' }}>
                <Globe size={12} style={{ color: '#334155', flexShrink: 0 }} />
                <span style={{ wordBreak: 'break-all' }}>github.com/riadysandi</span>
              </div>
            </div>

            {/* Skills */}
            <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '12px', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '11px', fontWeight: 'bold', color: '#1e293b', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>
                KEY SKILLS
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {SKILLS.map((skill) => (
                  <div key={skill.name}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '9px', marginBottom: '3px' }}>
                      <span style={{ fontWeight: 'bold', color: '#334155' }}>{skill.name}</span>
                      <span style={{ fontFamily: 'monospace', fontWeight: 'bold', color: '#94a3b8' }}>{skill.level}/5</span>
                    </div>
                    <div style={{ height: '5px', borderRadius: '3px', backgroundColor: '#f1f5f9', overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${skill.level * 20}%`, backgroundColor: '#1e293b' }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Languages */}
            <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '12px', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '11px', fontWeight: 'bold', color: '#1e293b', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>
                LANGUAGES
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {LANGUAGES[currentLang].map((lang) => (
                  <div key={lang.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '9.5px' }}>
                    <span style={{ fontWeight: 'bold', color: '#334155' }}>{lang.name}</span>
                    <span style={{ fontStyle: 'italic', fontSize: '8.5px', color: '#64748b' }}>{lang.level}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Personality attributes */}
            <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '12px', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '11px', fontWeight: 'bold', color: '#1e293b', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>
                STRENGTHS
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {PERSONALITY[currentLang].map((trait, i) => (
                  <div key={i} style={{ fontSize: '9.5px', display: 'flex', alignItems: 'center', gap: '6px', color: '#475569' }}>
                    <Star size={10} style={{ color: '#1e293b', fill: '#1e293b', flexShrink: 0 }} />
                    <span>{trait}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Hobbies / bottom left */}
          <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '12px' }}>
            <h3 style={{ fontSize: '11px', fontWeight: 'bold', color: '#1e293b', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>
              INTERESTS
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {HOBBIES[currentLang].map((hobby, i) => (
                <span key={i} style={{ fontSize: '8.5px', padding: '2px 6px', borderRadius: '4px', backgroundColor: '#f1f5f9', color: '#334155', border: '1px solid #e2e8f0', fontWeight: '500' }}>
                  {hobby.name}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* Right Side Column */}
        <div style={{ width: '68%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', paddingTop: '8px' }}>
          <div>
            {/* About me */}
            <div style={{ marginBottom: '20px' }}>
              <h3 style={{ fontSize: '12px', fontWeight: '800', color: '#0f172a', letterSpacing: '1px', borderBottom: '2px solid #1e293b', paddingBottom: '4px', marginBottom: '10px', textTransform: 'uppercase' }}>
                {currentLang === 'en' ? 'ABOUT ME' : 'TENTANG SAYA'}
              </h3>
              <p style={{ fontSize: '9.5px', lineHeight: '1.5', color: '#334155', textAlign: 'justify', margin: '0' }}>
                {PERSONAL_INFO.aboutMe[currentLang]}
              </p>
            </div>

            {/* Experience */}
            <div style={{ marginBottom: '20px' }}>
              <h3 style={{ fontSize: '12px', fontWeight: '800', color: '#0f172a', letterSpacing: '1px', borderBottom: '2px solid #1e293b', paddingBottom: '4px', marginBottom: '12px', textTransform: 'uppercase' }}>
                {currentLang === 'en' ? 'PROFESSIONAL EXPERIENCE' : 'PENGALAMAN PROFESIONAL'}
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {EXPERIENCES.map((exp) => (
                  <div key={exp.id} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div>
                        <h4 style={{ fontSize: '11px', fontWeight: 'bold', color: '#0f172a', margin: '0', textTransform: 'uppercase' }}>
                          {exp.title[currentLang]}
                        </h4>
                        <p style={{ fontSize: '9px', fontFamily: 'monospace', fontWeight: 'bold', color: '#64748b', margin: '2px 0 0 0', textTransform: 'uppercase' }}>
                          {exp.company}
                        </p>
                      </div>
                      <span style={{ fontSize: '9px', fontFamily: 'monospace', fontWeight: 'bold', padding: '2px 6px', borderRadius: '4px', color: '#475569', backgroundColor: '#f1f5f9', border: '1px solid #e2e8f0', whiteSpace: 'nowrap' }}>
                        {exp.period}
                      </span>
                    </div>
                    <ul style={{ margin: '0', paddingLeft: '12px', listStyleType: 'disc', color: '#334155' }}>
                      {exp.points[currentLang].map((point, i) => (
                        <li key={i} style={{ fontSize: '9.5px', lineHeight: '1.4', marginBottom: '4px' }}>
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div style={{ marginBottom: '20px' }}>
              <h3 style={{ fontSize: '12px', fontWeight: '800', color: '#0f172a', letterSpacing: '1px', borderBottom: '2px solid #1e293b', paddingBottom: '4px', marginBottom: '10px', textTransform: 'uppercase' }}>
                {currentLang === 'en' ? 'EDUCATION' : 'PENDIDIKAN'}
              </h3>
              {EDUCATION.map((edu) => (
                <div key={edu.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <h4 style={{ fontSize: '10px', fontWeight: 'bold', color: '#0f172a', margin: '0' }}>
                      {edu.field[currentLang]}
                    </h4>
                    <p style={{ fontSize: '9px', fontFamily: 'monospace', fontWeight: 'bold', color: '#64748b', margin: '2px 0 0 0', textTransform: 'uppercase' }}>
                      {edu.institution}
                    </p>
                  </div>
                  <span style={{ fontSize: '9px', fontFamily: 'monospace', fontWeight: 'bold', color: '#475569' }}>
                    {edu.period}
                  </span>
                </div>
              ))}
            </div>

            {/* Organizations */}
            <div>
              <h3 style={{ fontSize: '12px', fontWeight: '800', color: '#0f172a', letterSpacing: '1px', borderBottom: '2px solid #1e293b', paddingBottom: '4px', marginBottom: '10px', textTransform: 'uppercase' }}>
                {currentLang === 'en' ? 'ORGANIZATION & LEADERSHIP' : 'AKTIVITAS ORGANISASI'}
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {ORGANIZATIONS.map((org) => (
                  <div key={org.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <h4 style={{ fontSize: '10px', fontWeight: 'bold', color: '#0f172a', margin: '0' }}>
                        {org.role[currentLang]}
                      </h4>
                      <p style={{ fontSize: '9px', fontFamily: 'monospace', fontWeight: 'bold', color: '#64748b', margin: '2px 0 0 0', textTransform: 'uppercase' }}>
                        {org.organization}
                      </p>
                    </div>
                    <span style={{ fontSize: '9px', fontFamily: 'monospace', fontWeight: 'bold', color: '#475569' }}>
                      {org.period}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer watermark */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '8px', fontFamily: 'monospace', borderTop: '1px solid #f1f5f9', paddingTop: '8px', color: '#94a3b8' }}>
            <span>Sandi Riady &bull; Portfolio Export</span>
            <span>Generated Automatically</span>
          </div>
        </div>

      </div>
    </div>
  );
}
