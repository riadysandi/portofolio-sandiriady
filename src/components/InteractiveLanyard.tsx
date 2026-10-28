import React, { useState, useEffect } from 'react';
import Lanyard from './Lanyard';
import { getBadgeTextures, BadgeTextures } from './badgeTextures';
import { Language } from '../types';
import LanyardErrorBoundary from './LanyardErrorBoundary';
import heroFigure from '../assets/hero-figure.png';

interface InteractiveLanyardProps {
  currentLang?: Language;
  className?: string;
  anchor?: 'left' | 'center' | 'right';
}

export default function InteractiveLanyard({
  currentLang = 'id',
  className = '',
  anchor: customAnchor
}: InteractiveLanyardProps) {
  const [textures, setTextures] = useState<BadgeTextures | null>(null);
  const [hasFailed, setHasFailed] = useState(false);
  const [isMobile, setIsMobile] = useState(() => {
    return typeof window !== 'undefined' ? window.innerWidth < 768 : false;
  });

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);

    getBadgeTextures()
      .then((res) => {
        setTextures(res);
      })
      .catch((err) => {
        console.warn('Failed to load canvas textures:', err);
        setHasFailed(true);
      });

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const activeAnchor = customAnchor || (isMobile ? 'center' : 'right');

  if (hasFailed) {
    return (
      <div className={`relative flex items-center justify-center p-4 ${className}`}>
        <div className="relative w-64 sm:w-72 rounded-2xl bg-[#0f1118] border border-white/10 p-5 shadow-2xl flex flex-col items-center text-center">
          <div className="w-12 h-3 bg-zinc-700 rounded-full mb-3 -mt-2 border border-zinc-500 shadow-inner" />
          <div className="w-32 h-32 rounded-xl overflow-hidden border-2 border-[#ccff00]/40 shadow-lg mb-4 bg-black/40">
            <img src={heroFigure} alt="Sandi Riady" className="w-full h-full object-cover object-top" />
          </div>
          <h3 className="font-marker text-xl text-white tracking-wide">SANDI RIADY</h3>
          <span className="font-mono text-[11px] text-[#ccff00] font-bold tracking-wider uppercase mt-1">
            IT Infrastructure Support
          </span>
        </div>
      </div>
    );
  }

  return (
    <LanyardErrorBoundary fallbackClassName={className}>
      <div className={`relative w-full h-full flex items-center justify-center select-none ${className}`}>
        {/* 3D Lanyard Canvas Container */}
        <div className="relative w-full h-full">
          {textures ? (
            <Lanyard
              frontImage={textures.front}
              backImage={textures.back}
              strapImage={textures.strap}
              cardColor="#07080d"
              imageFit="contain"
              orientation="portrait"
              finish="glossy"
              cornerRadius={0.25}
              size={isMobile ? 0.62 : 0.65}
              anchor={activeAnchor}
              strapLength={isMobile ? 0.52 : 0.58}
              strapWidth={0.62}
              metal="silver"
              gravity={1.2}
              damping={0.32}
              elasticity={0.75}
              breeze={0.2}
              interactive={true}
              intro={true}
              className="w-full h-full"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center gap-3">
              <div className="w-10 h-10 rounded-full border-2 border-[#ccff00] border-t-transparent animate-spin" />
              <span className="font-mono text-xs text-slate-400">Loading 3D Lanyard...</span>
            </div>
          )}
        </div>
      </div>
    </LanyardErrorBoundary>
  );
}
