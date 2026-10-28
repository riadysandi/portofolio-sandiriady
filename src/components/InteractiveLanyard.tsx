import React, { useState, useEffect } from 'react';
import Lanyard from './Lanyard';
import { getBadgeTextures, BadgeTextures } from './badgeTextures';
import { Sparkles, Move, RefreshCw } from 'lucide-react';
import { Language } from '../types';

interface InteractiveLanyardProps {
  currentLang?: Language;
  className?: string;
}

export default function InteractiveLanyard({
  currentLang = 'id',
  className = ''
}: InteractiveLanyardProps) {
  const [textures, setTextures] = useState<BadgeTextures | null>(null);
  const [isMobile, setIsMobile] = useState(() => {
    return typeof window !== 'undefined' ? window.innerWidth < 768 : false;
  });

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);

    getBadgeTextures().then((res) => {
      setTextures(res);
    });

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const hintText = currentLang === 'en'
    ? '👆 Drag to swing badge • Click to flip card'
    : '👆 Sentuh & tarik untuk mengayun • Klik untuk membalik kartu';

  return (
    <div className={`relative w-full h-[540px] sm:h-[600px] lg:h-[650px] flex flex-col items-center justify-center select-none ${className}`}>
      
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
            size={isMobile ? 0.65 : 0.72}
            anchor="center"
            strapLength={isMobile ? 0.42 : 0.48}
            strapWidth={0.65}
            metal="silver"
            gravity={0.9}
            damping={0.5}
            elasticity={0.45}
            breeze={0.3}
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

      {/* Floating Interactive Hint Tag */}
      <div className="absolute -bottom-2 sm:bottom-2 z-10 pointer-events-none">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#12131a]/90 backdrop-blur-md border border-white/10 shadow-[0_8px_20px_rgba(0,0,0,0.5)]">
          <Move className="w-3.5 h-3.5 text-[#ccff00] animate-pulse" />
          <span className="font-mono text-[11px] font-bold text-slate-300 tracking-wide">
            {hintText}
          </span>
          <RefreshCw className="w-3 h-3 text-[#8b5cf6]" />
        </div>
      </div>
    </div>
  );
}
