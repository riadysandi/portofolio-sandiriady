import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { getBadgeTextures } from './badgeTextures';
import heroFigure from '../assets/hero-figure.png';

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let isMounted = true;

    // Preload textures & hero figure in parallel
    const preloadPromise = Promise.all([
      getBadgeTextures().catch(e => console.warn('Texture preload warning:', e)),
      new Promise(resolve => {
        const img = new Image();
        img.onload = () => resolve(true);
        img.onerror = () => resolve(true);
        img.src = heroFigure;
      })
    ]);

    // Fast, smooth minimalist progress (approx 0.9s)
    const startTime = performance.now();
    const duration = 900;

    const timer = setInterval(() => {
      const elapsed = performance.now() - startTime;
      const pct = Math.min(100, Math.round((elapsed / duration) * 100));

      if (isMounted) {
        setProgress(pct);
      }

      if (pct >= 100) {
        clearInterval(timer);
        preloadPromise.then(() => {
          setTimeout(() => {
            if (isMounted) onComplete();
          }, 150);
        });
      }
    }, 20);

    return () => {
      isMounted = false;
      clearInterval(timer);
    };
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.45, ease: [0.25, 1, 0.5, 1] }}
      className="fixed inset-0 z-[9999] bg-[#0b0c10] flex flex-col items-center justify-center p-6 text-white select-none"
    >
      <div className="flex flex-col items-center space-y-4 max-w-xs w-full">
        {/* Minimal Signature Logo */}
        <div className="text-center">
          <span className="font-marker text-2xl sm:text-3xl text-white tracking-wider">
            SANDI<span className="text-[#ccff00]">.</span>
          </span>
        </div>

        {/* Ultra-Slim Minimal Progress Bar */}
        <div className="w-36 sm:w-44 h-[2px] bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-[#ccff00] rounded-full"
            style={{ width: `${progress}%` }}
            transition={{ ease: 'easeOut', duration: 0.1 }}
          />
        </div>

        {/* Subtle Minimal Counter */}
        <span className="font-mono text-[11px] text-slate-500 tracking-widest">
          {progress}%
        </span>
      </div>
    </motion.div>
  );
}
