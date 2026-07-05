import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Mail, MessageSquare, ShieldCheck, CheckCircle2, User, Inbox, AlertCircle, Clock, Trash2 } from 'lucide-react';
import { Language, Translation, ContactMessage } from '../types';

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

  const handleSend = (e: React.FormEvent) => {
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

    // Simulate network delay
    setTimeout(() => {
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
    }, 1200);
  };

  const clearMessages = () => {
    setMessages([]);
    localStorage.removeItem('sandi_cv_messages');
  };

  return (
    <section id="contact" className="py-12 md:py-20 px-4 max-w-7xl mx-auto scroll-mt-20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Hand: Contact Form Card */}
        <div className="lg:col-span-5 bg-[#0A0A0A] border-2 border-slate-800 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-500 to-emerald-400" />

          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500/10 rounded-lg text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-4 border border-emerald-500/20">
            <Mail className="h-3.5 w-3.5" />
            <span>{translations.navContact}</span>
          </div>

          <h2 className="font-display font-black text-2xl md:text-3xl text-white tracking-tighter uppercase mb-2">
            {translations.contactTitle}
          </h2>
          <p className="text-slate-400 text-xs md:text-sm font-sans mb-6">
            {translations.contactSubtitle}
          </p>

          <form onSubmit={handleSend} className="space-y-5">
            {/* Name Input */}
            <div className="space-y-1.5">
              <label className="block text-[9px] font-mono text-slate-500 uppercase tracking-widest font-black">
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
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 placeholder-slate-600 focus:outline-none focus:border-emerald-500 focus:ring-0 transition-colors uppercase tracking-wider font-bold"
                />
              </div>
            </div>

            {/* Email Input */}
            <div className="space-y-1.5">
              <label className="block text-[9px] font-mono text-slate-500 uppercase tracking-widest font-black">
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
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 placeholder-slate-600 focus:outline-none focus:border-emerald-500 focus:ring-0 transition-colors uppercase tracking-wider font-bold"
                />
              </div>
            </div>

            {/* Message Input */}
            <div className="space-y-1.5">
              <label className="block text-[9px] font-mono text-slate-500 uppercase tracking-widest font-black">
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
                  className="w-full pl-10 pr-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 placeholder-slate-600 focus:outline-none focus:border-emerald-500 focus:ring-0 transition-colors resize-none uppercase tracking-wider font-bold"
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
            <button
              type="submit"
              disabled={isSending}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:bg-emerald-800/80 text-slate-950 font-black text-xs tracking-widest uppercase transition-all shadow-lg active:scale-[0.98] cursor-pointer"
            >
              <Send className="h-4 w-4" />
              <span>{isSending ? translations.sending : translations.sendButton}</span>
            </button>
          </form>
        </div>

        {/* Right Hand: Simulated Inbox Hub */}
        <div className="lg:col-span-7 bg-[#0A0A0A] border-2 border-slate-800 rounded-3xl p-6 md:p-8 shadow-2xl flex flex-col justify-between self-stretch">
          <div>
            <div className="flex items-center justify-between border-b-2 border-slate-850 pb-4 mb-4">
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
                  className="flex items-center gap-1.5 py-1.5 px-3 rounded-lg bg-slate-950 hover:bg-rose-500/15 border border-slate-800 hover:border-rose-500/30 text-[9px] font-mono font-bold text-slate-400 hover:text-rose-400 transition-all cursor-pointer uppercase tracking-wider"
                >
                  <Trash2 className="h-3 w-3" />
                  <span>CLEAR INBOX</span>
                </button>
              )}
            </div>

            {/* Message Stack */}
            <div className="space-y-4 max-h-[350px] overflow-y-auto pr-1">
              <AnimatePresence initial={false}>
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="p-4 bg-slate-950 border border-slate-850 rounded-2xl space-y-2 hover:border-slate-800 transition-colors relative group"
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
                    <p className="text-xs text-slate-300 leading-relaxed font-sans bg-[#0A0A0A] p-3 rounded-xl border border-slate-850">
                      {msg.message}
                    </p>
                  </motion.div>
                ))}
              </AnimatePresence>

              {messages.length === 0 && (
                <div className="text-center py-20 text-slate-500 space-y-3">
                  <Inbox className="h-10 w-10 text-slate-800 mx-auto stroke-1" />
                  <p className="text-xs font-bold uppercase tracking-wider max-w-xs mx-auto">
                    {translations.noMessages}
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t-2 border-slate-850 flex items-center justify-between text-[9px] font-mono text-slate-500 font-bold uppercase tracking-wider">
            <span>[DB] PERSISTENCE: LOCAL_STORAGE</span>
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
