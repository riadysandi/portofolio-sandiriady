import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Mail, MessageSquare, ShieldCheck, CheckCircle2, User, Inbox, AlertCircle, Clock, Trash2, Check } from 'lucide-react';
import { Language, Translation, ContactMessage } from '../types';
import { sendContactMessage } from '../lib/dataService';

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
      setError(currentLang === 'en' ? 'Please fill out all fields.' : 'Harap isi semua bidang.');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError(currentLang === 'en' ? 'Please provide a valid email.' : 'Harap masukkan email yang valid.');
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

    // Fade out success message after 5 seconds
    setTimeout(() => {
      setIsSuccess(false);
    }, 5000);
  };

  const clearMessages = () => {
    setMessages([]);
    localStorage.removeItem('sandi_cv_messages');
  };

  return (
    <section id="contact" className="py-6 md:py-8 px-4 max-w-7xl mx-auto scroll-mt-20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 items-start">
        
        {/* Left Hand: Contact Form Card */}
        <div className="lg:col-span-5 bg-[#0A0A0A] border border-slate-800 rounded-2xl md:rounded-3xl p-5 sm:p-7 md:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-500 to-emerald-400" />

          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-emerald-500/10 rounded-full text-xs font-bold text-emerald-400 uppercase tracking-widest mb-3 border border-emerald-500/20 shadow-[0_0_12px_rgba(16,185,129,0.1)]">
            <Mail className="h-3.5 w-3.5" />
            <span>{translations.navContact}</span>
          </div>

          <h2 className="font-display font-black text-2xl md:text-3xl text-white tracking-tight uppercase mb-2">
            {translations.contactTitle}
          </h2>
          <p className="text-slate-400 text-xs md:text-sm font-sans mb-5 leading-relaxed">
            {translations.contactSubtitle}
          </p>

          <form onSubmit={handleSend} className="space-y-4">
            {/* Name Input */}
            <div className="space-y-1.5">
              <label className="block text-[10px] font-mono text-slate-400 uppercase tracking-widest font-bold">
                {translations.formName}
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <User className="h-4 w-4" />
                </span>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={currentLang === 'en' ? 'John Doe' : 'Budi Santoso'}
                  className="w-full pl-10 pr-4 py-2.5 bg-black border border-slate-800 rounded-xl text-xs text-slate-100 placeholder-slate-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 transition-all uppercase tracking-wider font-bold"
                />
              </div>
            </div>

            {/* Email Input */}
            <div className="space-y-1.5">
              <label className="block text-[10px] font-mono text-slate-400 uppercase tracking-widest font-bold">
                {translations.formEmail}
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <Mail className="h-4 w-4" />
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="johndoe@example.com"
                  className="w-full pl-10 pr-4 py-2.5 bg-black border border-slate-800 rounded-xl text-xs text-slate-100 placeholder-slate-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 transition-all uppercase tracking-wider font-bold"
                />
              </div>
            </div>

            {/* Message Input */}
            <div className="space-y-1.5">
              <label className="block text-[10px] font-mono text-slate-400 uppercase tracking-widest font-bold">
                {translations.formMsg}
              </label>
              <div className="relative">
                <span className="absolute top-3.5 left-3.5 pointer-events-none text-slate-500">
                  <MessageSquare className="h-4 w-4" />
                </span>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  placeholder={currentLang === 'en' ? 'Hi Sandi, let\'s collaborate!' : 'Halo Sandi, mari berkolaborasi!'}
                  className="w-full pl-10 pr-4 py-3 bg-black border border-slate-800 rounded-xl text-xs text-slate-100 placeholder-slate-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 transition-all resize-none uppercase tracking-wider font-bold"
                />
              </div>
            </div>

            {/* Error Message */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex items-center gap-2 text-[10px] uppercase tracking-wider font-bold text-rose-400 bg-rose-500/10 p-3 rounded-xl border border-rose-500/20"
                >
                  <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                  <span>{error}</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Success Message */}
            <AnimatePresence>
              {isSuccess && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex items-center gap-2 text-[10px] uppercase tracking-wider font-bold text-emerald-400 bg-emerald-500/10 p-3 rounded-xl border border-emerald-500/20"
                >
                  <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
                  <span>{translations.successMessage}</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isSending}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-400 hover:bg-emerald-300 disabled:bg-emerald-800/80 text-slate-950 font-black text-xs tracking-widest uppercase transition-all shadow-lg shadow-emerald-500/20 cursor-pointer"
            >
              <Send className="h-4 w-4" />
              <span>{isSending ? translations.sending : translations.sendButton}</span>
            </motion.button>
          </form>
        </div>

        {/* Right Hand: Simulated Inbox Hub */}
        <div className="lg:col-span-7 bg-[#0A0A0A] border border-slate-800 rounded-2xl md:rounded-3xl p-5 sm:p-7 md:p-8 shadow-2xl flex flex-col justify-between self-stretch">
          <div>
            <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                  <Inbox className="h-4 w-4 text-emerald-400" />
                </div>
                <h3 className="font-display font-black text-sm text-slate-200 uppercase tracking-wider">
                  {translations.messageHistory}
                </h3>
              </div>
              {messages.length > 0 && (
                <button
                  onClick={clearMessages}
                  className="flex items-center gap-1.5 py-1.5 px-3 rounded-lg bg-black hover:bg-rose-500/15 border border-slate-800 hover:border-rose-500/30 text-[9px] font-mono font-bold text-slate-400 hover:text-rose-400 transition-all cursor-pointer uppercase tracking-wider"
                >
                  <Trash2 className="h-3 w-3" />
                  <span>CLEAR INBOX</span>
                </button>
              )}
            </div>

            {/* Message Stack */}
            <div className="space-y-3.5 max-h-[350px] overflow-y-auto pr-1">
              <AnimatePresence initial={false}>
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="p-4 bg-black border border-slate-800/80 rounded-2xl space-y-2 hover:border-slate-700 transition-colors relative group"
                  >
                    <div className="flex justify-between items-start gap-2 flex-wrap">
                      <div className="space-y-0.5">
                        <span className="font-display font-black text-xs text-white block uppercase tracking-wide">
                          {msg.name}
                        </span>
                        <span className="font-mono text-[9px] text-slate-500 block">
                          {msg.email}
                        </span>
                      </div>
                      <span className="font-mono text-[9px] text-slate-500 flex items-center gap-1">
                        <Clock className="h-3 w-3 text-emerald-500/50" />
                        {msg.timestamp}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed font-sans bg-[#0A0A0A] p-3 rounded-xl border border-slate-800/60">
                      {msg.message}
                    </p>
                  </motion.div>
                ))}
              </AnimatePresence>

              {messages.length === 0 && (
                <div className="text-center py-16 text-slate-500 space-y-3">
                  <Inbox className="h-10 w-10 text-slate-800 mx-auto stroke-1" />
                  <p className="text-xs font-bold uppercase tracking-wider max-w-xs mx-auto">
                    {translations.noMessages}
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="mt-5 pt-3.5 border-t border-slate-800 flex items-center justify-between text-[9px] font-mono text-slate-500 font-bold uppercase tracking-wider">
            <span>[DB] PERSISTENCE: SUPABASE + LOCAL</span>
            <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              ONLINE_READY
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}

