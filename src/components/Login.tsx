import React, { useState, useEffect } from 'react';
import { Lock, Mail, ArrowLeft, LogIn, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { signIn, user, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (user && !loading) {
      window.location.hash = '#/admin';
    }
  }, [user, loading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    const { error: signInError } = await signIn(email, password);
    if (signInError) {
      setError(signInError);
    } else {
      window.location.hash = '#/admin';
    }
    setIsSubmitting(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-2 border-emerald-400 border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-slate-100 flex items-center justify-center px-4 relative overflow-hidden font-sans selection:bg-emerald-500 selection:text-black">
      <div className="w-full max-w-md relative z-10">
        {/* Back button */}
        <button
          onClick={() => { window.location.hash = ''; }}
          className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-8 group cursor-pointer font-mono text-xs uppercase tracking-wider font-bold"
        >
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform text-emerald-400" />
          <span>Kembali ke Portfolio</span>
        </button>

        {/* Login Card */}
        <div className="bg-[#060606] border border-white/10 rounded-2xl p-8 shadow-2xl relative">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="mx-auto h-12 w-12 rounded-xl bg-black border border-white/15 flex items-center justify-center mb-4">
              <Lock className="h-5 w-5 text-emerald-400" />
            </div>
            <h1 className="text-xl font-mono font-bold uppercase tracking-widest text-white">Admin Login</h1>
            <p className="text-slate-500 text-xs font-mono font-medium mt-1 uppercase tracking-wider">Sandi Riady Portfolio</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-rose-500/10 border border-rose-500/20 text-rose-400 px-4 py-3 rounded-lg text-xs font-mono font-bold mb-6 text-center uppercase tracking-wider">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest mb-1.5">Email</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-black border border-white/15 text-slate-100 rounded-lg pl-10 pr-4 py-2.5 text-xs font-mono focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400/20 transition-all placeholder:text-slate-600"
                  placeholder="admin@email.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest mb-1.5">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full bg-black border border-white/15 text-slate-100 rounded-lg pl-10 pr-12 py-2.5 text-xs font-mono focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400/20 transition-all placeholder:text-slate-600"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors cursor-pointer"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-white hover:bg-emerald-400 disabled:opacity-50 disabled:cursor-not-allowed text-black hover:text-slate-950 font-mono font-black text-xs uppercase tracking-widest py-3 rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md mt-6"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin h-3.5 w-3.5 border-2 border-black border-t-transparent rounded-full" />
                  <span>Memproses...</span>
                </>
              ) : (
                <>
                  <LogIn className="h-4 w-4" />
                  <span>Masuk</span>
                </>
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-slate-600 text-[10px] font-mono uppercase tracking-wider mt-6">
          &copy; 2026 Sandi Riady. Admin Portal.
        </p>
      </div>
    </div>
  );
}
