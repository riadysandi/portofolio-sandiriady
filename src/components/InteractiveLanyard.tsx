import React, { useState, useEffect } from 'react';
import Lanyard from './Lanyard';
import { getBadgeTextures, BadgeTextures } from './badgeTextures';
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

  return (
    <div className={`relative w-full h-[620px] sm:h-[700px] lg:h-[780px] flex items-center justify-center select-none ${className}`}>
      {/* 3D Lanyard Canvas Container - Full Height & Width for Wide Drag Freedom */}
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
            anchor="center"
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
  );
}
