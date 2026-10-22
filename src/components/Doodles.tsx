import React from 'react';
import { motion } from 'motion/react';

// Little Crown Doodle on top of avatar or titles
export function DoodleCrown({ className = 'w-10 h-10 text-yellow-300' }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path
        d="M10 70 L20 25 L45 50 L75 15 L85 70 Z"
        stroke="currentColor"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="20" cy="20" r="6" fill="currentColor" />
      <circle cx="45" cy="45" r="6" fill="currentColor" />
      <circle cx="75" cy="10" r="6" fill="currentColor" />
    </svg>
  );
}

// Curved Arrow pointing from "Hey, I'm" to Name
export function DoodleCurvedArrow({ className = 'w-12 h-12 text-white' }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path
        d="M20 15 C 25 55, 65 65, 80 45"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M68 40 L82 46 L78 60"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Lightning Bolt Doodle
export function DoodleLightning({ className = 'w-8 h-8 text-[#ccff00]' }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path
        d="M35 5 L10 52 L32 52 L22 95 L52 42 L32 42 Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// 5-Point Hand-Drawn Star Doodle
export function DoodleStar({ className = 'w-8 h-8 text-yellow-400' }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path
        d="M50 8 L62 38 L95 40 L69 62 L78 94 L50 76 L22 94 L31 62 L5 40 L38 38 Z"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}

// Smiley Face Doodle
export function DoodleSmiley({ className = 'w-10 h-10 text-[#ccff00]' }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <circle cx="50" cy="50" r="42" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeDasharray="3 2" />
      <circle cx="35" cy="40" r="5" fill="currentColor" />
      <circle cx="65" cy="40" r="5" fill="currentColor" />
      <path d="M30 65 Q 50 82 70 65" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
    </svg>
  );
}

// Squiggle Underline Doodle (used under "FEATURED PROJECTS", "SKILLS")
export function DoodleSquiggle({ className = 'w-32 h-6 text-[#8b5cf6]' }: { className?: string }) {
  return (
    <svg viewBox="0 0 160 30" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path
        d="M5 15 Q 25 2, 45 15 T 85 15 T 125 15 T 155 15"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
      />
    </svg>
  );
}

// Swirl / Scribble Doodle
export function DoodleSwirl({ className = 'w-16 h-16 text-[#8b5cf6]' }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path
        d="M20 70 C 10 30, 70 10, 80 50 C 90 90, 40 85, 45 55 C 50 25, 75 35, 70 60"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
}

// Sparkle Star (4-point sparkle)
export function DoodleSparkle({ className = 'w-6 h-6 text-yellow-300' }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 60" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M30 0 Q 30 30, 0 30 Q 30 30, 30 60 Q 30 30, 60 30 Q 30 30, 30 0 Z" />
    </svg>
  );
}

// Comic Speech Bubble
export function SpeechBubble({
  text = "LET'S BUILD SOLID INFRA!",
  className = ''
}: {
  text?: string;
  className?: string;
}) {
  return (
    <div className={`relative inline-block bg-[#38bdf8] text-black font-extrabold px-4 py-2.5 rounded-2xl shadow-xl transform -rotate-3 border-2 border-black ${className}`}>
      <span className="font-display tracking-wide text-xs sm:text-sm uppercase block font-black">
        {text}
      </span>
      {/* Speech bubble tail */}
      <div className="absolute -bottom-3 left-6 w-0 h-0 border-l-[8px] border-l-transparent border-t-[12px] border-t-[#38bdf8] border-r-[8px] border-r-transparent filter drop-shadow-[0_2px_0_black]" />
    </div>
  );
}

// Comic Mascot Creature (Cute blue doodle monster in footer)
export function DoodleMascot({ className = 'w-24 h-24 text-[#38bdf8]' }: { className?: string }) {
  return (
    <svg viewBox="0 0 140 140" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Hand making peace sign */}
      <path
        d="M100 35 L102 15 C102 10, 110 10, 110 15 L110 30 L115 15 C115 10, 123 10, 123 15 L123 40"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="currentColor"
      />
      {/* Body blob */}
      <path
        d="M30 110 C 20 80, 40 50, 70 50 C 100 50, 120 75, 120 110 C 120 135, 40 135, 30 110 Z"
        fill="currentColor"
        stroke="#0c0d12"
        strokeWidth="4"
      />
      {/* Big Eyes */}
      <ellipse cx="60" cy="80" rx="6" ry="8" fill="#0c0d12" />
      <circle cx="58" cy="78" r="2" fill="white" />
      <ellipse cx="85" cy="80" rx="6" ry="8" fill="#0c0d12" />
      <circle cx="83" cy="78" r="2" fill="white" />
      {/* Cute Open Mouth with Tongue */}
      <path
        d="M60 96 Q 72 110 85 96 Z"
        fill="#0c0d12"
      />
      <path
        d="M66 102 Q 72 108 78 102 Z"
        fill="#f43f5e"
      />
    </svg>
  );
}

// Terminal Prompt Doodle `>_`
export function DoodleTerminal({ className = 'w-10 h-10 text-[#ccff00]' }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 60" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M12 15 L32 30 L12 45" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="42" y1="45" x2="65" y2="45" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
    </svg>
  );
}

// Liquid Paint Splash (Used behind logo & avatar)
export function LiquidSplash({ className = 'text-[#8b5cf6]' }: { className?: string }) {
  return (
    <svg viewBox="0 0 300 300" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M220,60 C260,100 280,160 250,210 C220,260 150,280 90,250 C30,220 10,150 40,90 C70,30 180,20 220,60 Z" />
    </svg>
  );
}
