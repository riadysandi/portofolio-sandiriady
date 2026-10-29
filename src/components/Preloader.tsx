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

    // Smooth name-fill progress (approx 1.1s total)
    const startTime = performance.now();
    const duration = 1050;

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
            if (isMounted) {
              onComplete();
              setTimeout(() => {
                window.dispatchEvent(new Event('resize'));
              }, 50);
            }
          }, 200);
        });
      }
    }, 16);

    return () => {
      isMounted = false;
      clearInterval(timer);
    };
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
      className="fixed inset-0 z-[9999] bg-[#0b0c10] flex flex-col items-center justify-center p-6 text-white select-none"
    >
      <div className="flex flex-col items-center justify-center max-w-lg w-full">
        {/* Name Progress Bar: The full name itself fills from 0% to 100% */}
        <div className="relative inline-block select-none py-2">
          {/* Base Unfilled Layer: Dark silhouette outline */}
          <div
            className="font-marker text-3xl sm:text-5xl md:text-6xl text-white/10 tracking-wider sm:tracking-widest uppercase select-none whitespace-nowrap"
            style={{
              WebkitTextStroke: '1px rgba(255, 255, 255, 0.18)',
            }}
          >
            SANDI RIADY
          </div>

          {/* Active Filling Layer: Neon-lime solid text clipped by progress */}
          <div
            className="absolute inset-0 font-marker text-3xl sm:text-5xl md:text-6xl text-[#ccff00] tracking-wider sm:tracking-widest uppercase select-none whitespace-nowrap overflow-hidden drop-shadow-[0_0_25px_rgba(204,255,0,0.55)]"
            style={{
              clipPath: `inset(0 ${100 - progress}% 0 0)`,
              WebkitClipPath: `inset(0 ${100 - progress}% 0 0)`,
              transition: 'clip-path 0.05s linear',
            }}
          >
            SANDI RIADY
          </div>
        </div>

        {/* Minimal Counter Below */}
        <div className="flex items-center gap-2 mt-4">
          <div className="w-1.5 h-1.5 rounded-full bg-[#ccff00] animate-pulse" />
          <span className="font-mono text-xs text-slate-400 tracking-widest">
            {progress}%
          </span>
        </div>
      </div>
    </motion.div>
  );
}
