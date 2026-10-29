import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal, Shield, Cpu, CheckCircle2, Sparkles } from 'lucide-react';
import { getBadgeTextures } from './badgeTextures';
import heroFigure from '../assets/hero-figure.png';

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    'INITIALIZING SYSTEM KERNEL & ENVIRONMENT...',
    'CONNECTING TO CLOUD INFRASTRUCTURE...',
    'GENERATING 3D ID BADGE & HARDWARE TEXTURES...',
    'OPTIMIZING RENDERING PIPELINE...',
    'SYSTEMS ONLINE // LAUNCHING INTERFACE...',
  ];

  useEffect(() => {
    let isMounted = true;

    // Trigger preloading in parallel
    const preloadPromise = Promise.all([
      // 1. Preload 3D Lanyard Canvas Textures
      getBadgeTextures().catch(e => console.warn('Texture preload warning:', e)),
      // 2. Preload Hero Figure Image
      new Promise(resolve => {
        const img = new Image();
        img.onload = () => resolve(true);
        img.onerror = () => resolve(true);
        img.src = heroFigure;
      })
    ]);

    // Animate progress smoothly from 0 to 100%
    const startTime = performance.now();
    const duration = 1600; // 1.6s smooth boot experience

    const timer = setInterval(() => {
      const elapsed = performance.now() - startTime;
      const pct = Math.min(100, Math.round((elapsed / duration) * 100));

      if (isMounted) {
        setProgress(pct);

        if (pct < 25) setCurrentStep(0);
        else if (pct < 50) setCurrentStep(1);
        else if (pct < 75) setCurrentStep(2);
        else if (pct < 95) setCurrentStep(3);
        else setCurrentStep(4);
      }

      if (pct >= 100) {
        clearInterval(timer);
        preloadPromise.then(() => {
          setTimeout(() => {
            if (isMounted) onComplete();
          }, 300);
        });
      }
    }, 25);

    return () => {
      isMounted = false;
      clearInterval(timer);
    };
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.02 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-[9999] bg-[#07080c] flex flex-col items-center justify-center p-6 text-white select-none overflow-hidden"
    >
      {/* Cybernetic Ambient Light Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[480px] bg-[#ccff00]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] h-[380px] bg-[#8b5cf6]/15 rounded-full blur-[100px] pointer-events-none" />

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      {/* Center Console Container */}
      <div className="relative z-10 max-w-md w-full flex flex-col items-center text-center space-y-6">
        
        {/* Animated Cyber Ring / Logo Emblem */}
        <div className="relative flex items-center justify-center">
          <div className="w-24 h-24 rounded-3xl border-2 border-[#ccff00]/40 bg-black/60 backdrop-blur-md flex items-center justify-center shadow-[0_0_35px_rgba(204,255,0,0.25)] relative overflow-hidden group">
            {/* Spinning decorative radar line */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 4, ease: 'linear' }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-[#ccff00]/15 to-transparent"
            />
            <Cpu className="h-10 w-10 text-[#ccff00] relative z-10 animate-pulse" />
          </div>

          {/* Orbiting Tech Dot */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 2.5, ease: 'linear' }}
            className="absolute w-32 h-32 rounded-full border border-dashed border-white/20 pointer-events-none"
          >
            <span className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#ccff00] shadow-[0_0_10px_#ccff00]" />
          </motion.div>
        </div>

        {/* Brand Name */}
        <div className="space-y-1">
          <h1 className="font-marker text-3xl sm:text-4xl text-white tracking-wider">
            SANDI RIADY
          </h1>
          <p className="font-mono text-xs text-[#ccff00] font-bold tracking-[0.25em] uppercase">
            IT INFRASTRUCTURE SYSTEM OS
          </p>
        </div>

        {/* Progress Bar & Percentage */}
        <div className="w-full space-y-2.5">
          <div className="flex items-center justify-between text-xs font-mono font-bold">
            <span className="text-slate-400 flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#ccff00] animate-ping" />
              BOOT SEQUENCE
            </span>
            <span className="text-[#ccff00] font-black tracking-wider text-sm">
              {progress}%
            </span>
          </div>

          {/* Progress Bar Track */}
          <div className="w-full h-2.5 bg-black/80 border border-white/15 rounded-full overflow-hidden p-0.5 shadow-inner">
            <motion.div
              className="h-full bg-gradient-to-r from-[#8b5cf6] via-[#ccff00] to-[#ccff00] rounded-full shadow-[0_0_15px_#ccff00]"
              style={{ width: `${progress}%` }}
              transition={{ ease: 'easeOut', duration: 0.1 }}
            />
          </div>
        </div>

        {/* Terminal Log Console */}
        <div className="w-full bg-black/70 border border-white/10 rounded-2xl p-3.5 flex items-center gap-2.5 text-left font-mono text-[11px] text-slate-300 shadow-xl min-h-[48px]">
          <Terminal className="h-4 w-4 text-[#ccff00] shrink-0" />
          <span className="truncate text-slate-200">
            {steps[currentStep]}
          </span>
        </div>

        {/* Status Pill */}
        <div className="flex items-center gap-2 text-[10px] font-mono text-slate-500 uppercase tracking-widest">
          <span>HOST: PRODUCTION</span>
          <span>&bull;</span>
          <span>LOCATION: ID/US</span>
          <span>&bull;</span>
          <span className="text-emerald-400">STATUS: STABLE</span>
        </div>

      </div>
    </motion.div>
  );
}
