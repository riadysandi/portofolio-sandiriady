import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Send, Mail, Phone, Instagram, Twitter, MapPin,
  CheckCircle2, AlertCircle, Clock, Trash2, ArrowUpRight
} from 'lucide-react';
import { Language, Translation, ContactMessage } from '../types';
import { sendContactMessage } from '../lib/dataService';
import { PERSONAL_INFO } from '../data';
import { DoodleMascot, DoodleLightning, DoodleStar } from './Doodles';

interface ContactFormProps {
  currentLang: Language;
  translations: Translation;
}

export default function ContactForm({ currentLang, translations }: ContactFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  const [messages, setMessages] = useState<ContactMessage[]>([]);

  // Load message logs from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('sandi_cv_messages');
    if (saved) {
      try {
        setMessages(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name.trim() || !email.trim() || !message.trim()) {
      setError(currentLang === 'en' ? 'Please fill out all fields.' : 'Harap isi semua kolom pesan.');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError(currentLang === 'en' ? 'Please provide a valid email.' : 'Harap masukkan alamat email yang valid.');
      return;
    }

    setIsSending(true);

    try {
      // Send to Supabase database
      await sendContactMessage(name.trim(), email.trim(), message.trim());
    } catch (err) {
      console.warn('Could not sync message to Supabase:', err);
    }

    const newMessage: ContactMessage = {
      id: 'msg_' + Date.now(),
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
      timestamp: new Date().toLocaleString(currentLang === 'en' ? 'en-US' : 'id-ID', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    const updatedMessages = [newMessage, ...messages];
    setMessages(updatedMessages);
    localStorage.setItem('sandi_cv_messages', JSON.stringify(updatedMessages));

    setIsSending(false);
    setIsSuccess(true);
    setName('');
    setEmail('');
    setMessage('');

    setTimeout(() => {
      setIsSuccess(false);
    }, 6000);
  };

  const clearMessages = () => {
    setMessages([]);
    localStorage.removeItem('sandi_cv_messages');
  };

  return (
    <section id="contact" className="py-12 md:py-16 px-4 max-w-7xl mx-auto scroll-mt-20 relative">
      
      {/* ── Dikshant Style Footer Banner Headline ── */}
      <div className="mb-10 text-center sm:text-left">
        <h2 className="font-marker text-4xl sm:text-6xl md:text-7xl text-white uppercase tracking-wide leading-tight">
          LET'S MAKE SOMETHING{' '}
          <span className="relative inline-block text-[#ccff00]">
            <span className="relative z-10">ROBUST!</span>
            {/* Hand-drawn highlighter loop around ROBUST */}
            <svg
              viewBox="0 0 240 80"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute -inset-x-3 -inset-y-2 w-[115%] h-[120%] text-[#8b5cf6] pointer-events-none -z-0"
            >
              <ellipse
                cx="120"
                cy="40"
                rx="110"
                ry="32"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                transform="rotate(-2 120 40)"
              />
            </svg>
          </span>
        </h2>
        <p className="mt-4 text-slate-300 text-sm sm:text-base max-w-2xl font-sans">
          {translations.contactSubtitle}
        </p>
      </div>

      {/* ── Main Contact Container ── */}
      <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8 items-start relative">
        
        {/* Left: Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-3xl bg-[#12131a] border-2 border-[#232533] p-6 sm:p-8 lg:p-10 shadow-2xl relative"
        >
          <form onSubmit={handleSend} className="space-y-5">
            <div>
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-300 mb-2">
                {translations.formName}
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Alex Johnson"
                className="w-full px-4 py-3 rounded-2xl bg-black border border-white/15 text-white placeholder-slate-600 font-mono text-xs sm:text-sm focus:outline-none focus:border-[#ccff00] focus:ring-2 focus:ring-[#ccff00]/20 transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-300 mb-2">
                {translations.formEmail}
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="alex@company.com"
                className="w-full px-4 py-3 rounded-2xl bg-black border border-white/15 text-white placeholder-slate-600 font-mono text-xs sm:text-sm focus:outline-none focus:border-[#ccff00] focus:ring-2 focus:ring-[#ccff00]/20 transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-300 mb-2">
                {translations.formMsg}
              </label>
              <textarea
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={currentLang === 'en' ? 'Tell me about your server, deployment, or IT requirements...' : 'Ceritakan kebutuhan server, deployment, atau IT Anda...'}
                className="w-full px-4 py-3 rounded-2xl bg-black border border-white/15 text-white placeholder-slate-600 font-sans text-xs sm:text-sm focus:outline-none focus:border-[#ccff00] focus:ring-2 focus:ring-[#ccff00]/20 transition-all"
              />
            </div>

            {error && (
              <div className="flex items-center gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-mono">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {isSuccess && (
              <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-[#ccff00] text-xs font-mono font-bold">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-[#ccff00]" />
                <span>{translations.successMessage}</span>
              </div>
            )}

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isSending}
              className="w-full py-4 rounded-full bg-[#ccff00] hover:bg-[#d9ff33] text-black font-marker text-sm sm:text-base tracking-wider uppercase flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(204,255,0,0.35)] transition-all cursor-pointer"
            >
              <Send className="h-4 w-4" />
              <span>{isSending ? translations.sending : translations.sendButton}</span>
            </motion.button>
          </form>
        </motion.div>

        {/* Right: Direct Contact Pills & Mascot Doodle */}
        <div className="space-y-6">
          <div className="rounded-3xl bg-[#12131a] border-2 border-[#232533] p-6 sm:p-8 space-y-4 shadow-2xl">
            <h3 className="font-mono text-xs font-bold text-[#ccff00] uppercase tracking-wider">
              {currentLang === 'en' ? 'DIRECT CHANNELS' : 'KONTAK CEPAT'}
            </h3>

            {/* Email Pill */}
            <a
              href={`mailto:${PERSONAL_INFO.contacts.email}`}
              className="flex items-center gap-3 p-3.5 rounded-2xl bg-black border border-white/10 hover:border-[#ccff00] hover:text-[#ccff00] text-slate-200 transition-colors group"
            >
              <div className="h-10 w-10 rounded-xl bg-[#ccff00] text-black flex items-center justify-center shrink-0">
                <Mail className="h-5 w-5" />
              </div>
              <div className="truncate">
                <span className="text-[10px] font-mono text-slate-400 block uppercase">Email</span>
                <span className="font-mono text-xs sm:text-sm font-bold truncate block">{PERSONAL_INFO.contacts.email}</span>
              </div>
            </a>

            {/* WhatsApp Pill */}
            <a
              href={`https://wa.me/${PERSONAL_INFO.contacts.whatsapp.replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 p-3.5 rounded-2xl bg-black border border-white/10 hover:border-emerald-400 hover:text-emerald-400 text-slate-200 transition-colors group"
            >
              <div className="h-10 w-10 rounded-xl bg-emerald-400 text-black flex items-center justify-center shrink-0">
                <Phone className="h-5 w-5" />
              </div>
              <div className="truncate">
                <span className="text-[10px] font-mono text-slate-400 block uppercase">WhatsApp</span>
                <span className="font-mono text-xs sm:text-sm font-bold truncate block">{PERSONAL_INFO.contacts.whatsapp}</span>
              </div>
            </a>

            {/* Location Pill */}
            <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-black border border-white/10 text-slate-200">
              <div className="h-10 w-10 rounded-xl bg-[#8b5cf6] text-white flex items-center justify-center shrink-0">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono text-slate-400 block uppercase">Location</span>
                <span className="font-mono text-xs sm:text-sm font-bold block">Tangerang, Banten, Indonesia</span>
              </div>
            </div>

            {/* Social Pills Row */}
            <div className="pt-2 flex items-center gap-2">
              <a
                href={`https://instagram.com/${PERSONAL_INFO.contacts.instagram.replace('@', '')}`}
                target="_blank"
                rel="noreferrer"
                className="h-11 w-11 rounded-2xl bg-black border border-white/10 hover:border-[#f43f5e] hover:text-[#f43f5e] flex items-center justify-center text-slate-300 transition-colors"
                title="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href={`https://twitter.com/${PERSONAL_INFO.contacts.twitter.replace('@', '')}`}
                target="_blank"
                rel="noreferrer"
                className="h-11 w-11 rounded-2xl bg-black border border-white/10 hover:border-[#38bdf8] hover:text-[#38bdf8] flex items-center justify-center text-slate-300 transition-colors"
                title="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="h-11 w-11 rounded-2xl bg-black border border-white/10 hover:border-[#0089ff] hover:text-[#0089ff] flex items-center justify-center text-slate-300 transition-colors font-mono font-bold text-xs"
                title="LinkedIn"
              >
                in
              </a>
            </div>
          </div>

          {/* Dikshant Mascot Creature Doodle (Peace sign) */}
          <div className="flex items-center justify-end pr-6 -mt-2">
            <div className="relative animate-bounce">
              <DoodleMascot className="w-28 h-28 text-[#38bdf8]" />
              <span className="absolute -top-3 -right-2 font-hand text-xs text-[#ccff00] transform rotate-12">
                Peace out! ✌️
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
