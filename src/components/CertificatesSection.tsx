import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Award, FileText, ExternalLink, Download, Search, CheckCircle2,
  Calendar, Building2, Tag, X, ChevronLeft, ChevronRight, Eye,
  Sparkles, BookOpen, Mic, Database, ShieldCheck, Compass
} from 'lucide-react';
import { Language, Translation, Certificate } from '../types';
import { CERTIFICATES } from '../data';
import { DoodleSquiggle, DoodleStar, DoodleCurvedArrow } from './Doodles';

interface CertificatesSectionProps {
  currentLang: Language;
  translations: Translation;
  searchQuery: string;
}

type CategoryFilter = 'all' | 'publication' | 'speaker' | 'technical' | 'leadership' | 'seminar';

export default function CertificatesSection({
  currentLang,
  translations,
  searchQuery,
}: CertificatesSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('all');
  const [activeModalCert, setActiveModalCert] = useState<Certificate | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobile, setIsMobile] = useState(() => {
    return typeof window !== 'undefined' ? window.innerWidth < 640 : false;
  });

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Filter based on search query and category
  const filteredCerts = CERTIFICATES.filter((cert) => {
    const matchesCategory =
      selectedCategory === 'all' || cert.category === selectedCategory;

    const q = searchQuery.toLowerCase().trim();
    if (!q) return matchesCategory;

    const matchesSearch =
      cert.title[currentLang].toLowerCase().includes(q) ||
      cert.issuer.toLowerCase().includes(q) ||
      cert.role[currentLang].toLowerCase().includes(q) ||
      (cert.credentialId && cert.credentialId.toLowerCase().includes(q)) ||
      cert.skills.some((skill) => skill.toLowerCase().includes(q)) ||
      cert.description[currentLang].toLowerCase().includes(q);

    return matchesCategory && matchesSearch;
  });

  // Responsive Pagination: 4 items on mobile, 6 on desktop
  const itemsPerPage = isMobile ? 4 : 6;
  const totalPages = Math.ceil(filteredCerts.length / itemsPerPage) || 1;
  const safePage = Math.min(currentPage, totalPages);
  const startIndex = (safePage - 1) * itemsPerPage;
  const displayedCerts = filteredCerts.slice(startIndex, startIndex + itemsPerPage);

  const categories: { key: CategoryFilter; label: { en: string; id: string }; icon: React.ReactNode; count: number }[] = [
    {
      key: 'all',
      label: { en: 'All Credentials', id: 'Semua Sertifikat' },
      icon: <Award className="w-3.5 h-3.5" />,
      count: CERTIFICATES.length
    },
    {
      key: 'publication',
      label: { en: 'Paper Publication', id: 'Publikasi Ilmiah' },
      icon: <BookOpen className="w-3.5 h-3.5" />,
      count: CERTIFICATES.filter((c) => c.category === 'publication').length
    },
    {
      key: 'speaker',
      label: { en: 'Keynote Speaker', id: 'Pemateri / Trainer' },
      icon: <Mic className="w-3.5 h-3.5" />,
      count: CERTIFICATES.filter((c) => c.category === 'speaker').length
    },
    {
      key: 'technical',
      label: { en: 'Technical Workshops', id: 'Workshop Teknis' },
      icon: <Database className="w-3.5 h-3.5" />,
      count: CERTIFICATES.filter((c) => c.category === 'technical').length
    },
    {
      key: 'leadership',
      label: { en: 'Leadership', id: 'Kepemimpinan' },
      icon: <Compass className="w-3.5 h-3.5" />,
      count: CERTIFICATES.filter((c) => c.category === 'leadership').length
    },
    {
      key: 'seminar',
      label: { en: 'Seminars & Web', id: 'Seminar & Webinar' },
      icon: <FileText className="w-3.5 h-3.5" />,
      count: CERTIFICATES.filter((c) => c.category === 'seminar').length
    }
  ];

  const getCategoryTheme = (cat: Certificate['category']) => {
    switch (cat) {
      case 'publication':
        return {
          badge: currentLang === 'en' ? 'SCIENTIFIC PUBLICATION' : 'PUBLIKASI ILMIAH',
          color: 'text-[#ccff00] border-[#ccff00]/40 bg-[#ccff00]/10',
          dot: 'bg-[#ccff00]'
        };
      case 'speaker':
        return {
          badge: currentLang === 'en' ? 'KEYNOTE SPEAKER' : 'PEMATERI RESMI',
          color: 'text-[#ea4b71] border-[#ea4b71]/40 bg-[#ea4b71]/10',
          dot: 'bg-[#ea4b71]'
        };
      case 'technical':
        return {
          badge: currentLang === 'en' ? 'TECHNICAL WORKSHOP' : 'WORKSHOP TEKNIS',
          color: 'text-[#38bdf8] border-[#38bdf8]/40 bg-[#38bdf8]/10',
          dot: 'bg-[#38bdf8]'
        };
      case 'leadership':
        return {
          badge: currentLang === 'en' ? 'LEADERSHIP TRAINING' : 'PELATIHAN KEPEMIMPINAN',
          color: 'text-[#f59e0b] border-[#f59e0b]/40 bg-[#f59e0b]/10',
          dot: 'bg-[#f59e0b]'
        };
      default:
        return {
          badge: currentLang === 'en' ? 'NATIONAL / INT. SEMINAR' : 'SEMINAR & WEBINAR',
          color: 'text-[#8b5cf6] border-[#8b5cf6]/40 bg-[#8b5cf6]/10',
          dot: 'bg-[#8b5cf6]'
        };
    }
  };

  return (
    <section id="certificates" className="py-20 px-4 max-w-7xl mx-auto scroll-mt-24">
      {/* ── Section Header ── */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ccff00]/10 border border-[#ccff00]/30 text-[#ccff00] font-mono text-xs font-bold uppercase tracking-widest mb-3">
            <Award className="w-3.5 h-3.5" />
            <span>{translations.navCertificates}</span>
          </div>

          <div className="relative inline-block">
            <h2 className="font-marker text-3xl sm:text-4xl md:text-5xl text-white tracking-wide">
              {translations.certificatesTitle}
            </h2>
            <div className="absolute -bottom-2 left-0 right-0 h-1 bg-[#ccff00]/40 rounded-full" />
          </div>

          <p className="text-slate-400 text-sm sm:text-base mt-4 max-w-2xl font-sans leading-relaxed">
            {translations.certificatesSubtitle}
          </p>
        </div>

        {/* Action: Download Full Merged PDF */}
        <div className="flex-shrink-0">
          <a
            href="/certificates/all-certificates-sandi-riady.pdf"
            target="_blank"
            rel="noopener noreferrer"
            download="Sandi_Riady_Certificates_Bundle.pdf"
            className="inline-flex items-center gap-2.5 px-5 py-3 rounded-full bg-[#12131a] hover:bg-[#ccff00] text-slate-200 hover:text-black border border-white/20 hover:border-[#ccff00] font-mono text-xs font-bold tracking-wider uppercase transition-all duration-300 shadow-lg cursor-pointer group"
          >
            <Download className="w-4 h-4 text-[#ccff00] group-hover:text-black transition-colors" />
            <span>{currentLang === 'en' ? 'Download All (PDF Bundle)' : 'Unduh Semua (Bundle PDF)'}</span>
          </a>
        </div>
      </div>

      {/* ── Category Filter Pills ── */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none no-scrollbar">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat.key;
          return (
            <button
              key={cat.key}
              onClick={() => {
                setSelectedCategory(cat.key);
                setCurrentPage(1);
              }}
              className={`flex-shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono font-bold tracking-wider transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'bg-[#ccff00] text-black shadow-[0_0_20px_rgba(204,255,0,0.35)] scale-105'
                  : 'bg-[#12131a] text-slate-300 hover:text-white border border-[#242636] hover:border-slate-500'
              }`}
            >
              {cat.icon}
              <span>{cat.label[currentLang]}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  isActive ? 'bg-black text-[#ccff00]' : 'bg-white/10 text-slate-400'
                }`}
              >
                {cat.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* ── Certificate Cards Grid ── */}
      {displayedCerts.length === 0 ? (
        <div className="rounded-2xl bg-[#12131a] border border-[#242636] p-12 text-center">
          <FileText className="w-12 h-12 text-slate-500 mx-auto mb-3" />
          <h3 className="text-white font-marker text-lg mb-1">{translations.noResults}</h3>
          <p className="text-slate-400 text-xs font-mono">
            {currentLang === 'en' ? 'Try adjusting your search query or category filter.' : 'Coba ubah kata kunci pencarian atau kategori filter.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedCerts.map((cert) => {
            const theme = getCategoryTheme(cert.category);
            return (
              <motion.div
                key={cert.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="group relative rounded-2xl bg-[#12131a] border border-[#242636] hover:border-slate-500 overflow-hidden flex flex-col transition-all duration-300 hover:shadow-[0_12px_35px_rgba(0,0,0,0.6)]"
              >
                {/* Certificate Preview Image (Thumbnail) */}
                <div
                  onClick={() => setActiveModalCert(cert)}
                  className="relative aspect-[16/10] w-full bg-[#07080d] overflow-hidden cursor-pointer group/thumb border-b border-[#242636]"
                >
                  <img
                    src={cert.thumbnailUrl}
                    alt={cert.title[currentLang]}
                    loading="lazy"
                    className="w-full h-full object-cover object-center group-hover/thumb:scale-105 transition-transform duration-500"
                  />

                  {/* Dark Vignette / Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#12131a] via-transparent to-black/30 group-hover/thumb:opacity-40 transition-opacity" />

                  {/* Category Pill Tag */}
                  <div className="absolute top-3 left-3 z-10">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold tracking-wider border backdrop-blur-md ${theme.color}`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${theme.dot} animate-pulse`} />
                      {theme.badge}
                    </span>
                  </div>

                  {/* Hover Inspect Icon */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/thumb:opacity-100 transition-opacity duration-300 bg-black/50 backdrop-blur-[2px]">
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#ccff00] text-black font-marker text-xs tracking-wide shadow-xl">
                      <Eye className="w-4 h-4" />
                      <span>{currentLang === 'en' ? 'Inspect Document' : 'Lihat Sertifikat'}</span>
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 flex flex-col flex-grow">
                  {/* Role & Date Info */}
                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-2">
                    <span className="text-[#ccff00] font-bold uppercase truncate max-w-[65%]">
                      {cert.role[currentLang]}
                    </span>
                    <span className="flex items-center gap-1 flex-shrink-0">
                      <Calendar className="w-3 h-3 text-slate-500" />
                      {cert.date}
                    </span>
                  </div>

                  {/* Title */}
                  <h3
                    onClick={() => setActiveModalCert(cert)}
                    className="text-white font-display font-bold text-base sm:text-lg mb-2 line-clamp-2 hover:text-[#ccff00] transition-colors cursor-pointer"
                  >
                    {cert.title[currentLang]}
                  </h3>

                  {/* Issuer */}
                  <div className="flex items-start gap-1.5 text-xs text-slate-400 mb-3 font-sans">
                    <Building2 className="w-3.5 h-3.5 text-slate-500 flex-shrink-0 mt-0.5" />
                    <span className="line-clamp-1">{cert.issuer}</span>
                  </div>

                  {/* Credential ID / Registration No */}
                  {cert.credentialId && (
                    <div className="mb-3 px-2.5 py-1 rounded-md bg-[#0b0c10] border border-white/5 font-mono text-[10px] text-slate-400 flex items-center justify-between">
                      <span className="text-slate-500">CREDENTIAL ID:</span>
                      <span className="font-bold text-slate-300 font-mono tracking-wider truncate ml-2">
                        {cert.credentialId}
                      </span>
                    </div>
                  )}

                  {/* Skills Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4 mt-auto pt-2">
                    {cert.skills.slice(0, 3).map((skill, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-slate-300 border border-white/5"
                      >
                        {skill}
                      </span>
                    ))}
                    {cert.skills.length > 3 && (
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/5 text-slate-500">
                        +{cert.skills.length - 3}
                      </span>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-3 border-t border-[#242636] flex items-center justify-between gap-2">
                    <button
                      onClick={() => setActiveModalCert(cert)}
                      className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-slate-300 hover:text-[#ccff00] transition-colors cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>{currentLang === 'en' ? 'Quick View' : 'Preview'}</span>
                    </button>

                    <a
                      href={cert.documentUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/5 hover:bg-[#ccff00] text-slate-300 hover:text-black text-xs font-mono font-bold transition-all duration-200"
                    >
                      <span>{currentLang === 'en' ? 'Original' : 'Buka Asli'}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* ── Pagination Controls ── */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-3 mt-10 select-none">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={safePage === 1}
            className="h-9 w-9 rounded-full bg-[#12131a] border border-[#242636] text-slate-300 hover:text-white hover:border-[#ccff00] disabled:opacity-40 disabled:hover:border-[#242636] flex items-center justify-center transition-all cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-1.5 font-mono text-xs">
            {Array.from({ length: totalPages }).map((_, i) => {
              const pageNum = i + 1;
              const isActive = pageNum === safePage;
              return (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`h-9 min-w-[36px] px-2 rounded-full font-bold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#ccff00] text-black shadow-[0_0_15px_rgba(204,255,0,0.3)]'
                      : 'bg-[#12131a] border border-[#242636] text-slate-400 hover:text-white'
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
          </div>

          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={safePage === totalPages}
            className="h-9 w-9 rounded-full bg-[#12131a] border border-[#242636] text-slate-300 hover:text-white hover:border-[#ccff00] disabled:opacity-40 disabled:hover:border-[#242636] flex items-center justify-center transition-all cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* ── Full Document Modal Lightbox ── */}
      <AnimatePresence>
        {activeModalCert && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-4xl max-h-[90vh] bg-[#12131a] border border-[#242636] rounded-2xl shadow-2xl flex flex-col overflow-hidden"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-4 sm:p-5 border-b border-[#242636] bg-[#0b0c10]/60">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-xl bg-[#ccff00]/10 border border-[#ccff00]/30 flex items-center justify-center text-[#ccff00]">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-white font-marker text-base sm:text-lg leading-tight">
                      {activeModalCert.title[currentLang]}
                    </h3>
                    <p className="font-mono text-xs text-slate-400 mt-0.5">
                      {activeModalCert.issuer} • {activeModalCert.date}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setActiveModalCert(null)}
                  className="h-8 w-8 rounded-full bg-white/5 hover:bg-white/20 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Modal Image Display */}
              <div className="flex-grow overflow-y-auto p-4 sm:p-6 bg-[#07080d] flex items-center justify-center min-h-[300px]">
                <img
                  src={activeModalCert.thumbnailUrl}
                  alt={activeModalCert.title[currentLang]}
                  className="max-h-[55vh] w-auto object-contain rounded-lg border border-white/10 shadow-2xl"
                />
              </div>

              {/* Modal Metadata & Footer */}
              <div className="p-4 sm:p-5 border-t border-[#242636] bg-[#0b0c10] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <p className="text-xs text-slate-300 font-sans max-w-xl">
                    {activeModalCert.description[currentLang]}
                  </p>
                  {activeModalCert.credentialId && (
                    <div className="flex items-center gap-2 font-mono text-[11px] text-slate-400">
                      <span className="text-[#ccff00]">VERIFICATION ID:</span>
                      <span className="text-slate-200 font-bold">{activeModalCert.credentialId}</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-3 flex-shrink-0 w-full sm:w-auto">
                  <a
                    href={activeModalCert.documentUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#ccff00] hover:bg-[#d9ff33] text-black font-marker text-xs uppercase tracking-wider transition-colors shadow-lg"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>{currentLang === 'en' ? 'Open Full Document' : 'Buka Dokumen Asli'}</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
