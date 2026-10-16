import React from 'react';
import { Terminal, Shield, Cpu, Network, Zap } from 'lucide-react';

const TICKER_ITEMS = [
  'LINUX SERVER OPS',
  'DOCKER CONTAINERIZATION',
  'ERPNEXT & FRAPPE',
  'ZIMBRA MAIL SERVER',
  'GLPI HELPDESK & ASSETS',
  'WORKFLOW AUTOMATION (N8N)',
  'BASH SCRIPTING',
  'NETWORK & DNS OPS',
  'FLYVE MDM POLICY',
  'SYSTEM UPTIME & BACKUP',
];

export default function TechTicker() {
  return (
    <div className="w-full overflow-hidden border-y border-white/10 bg-[#020202] py-3.5 my-3 relative select-none">
      {/* Edge shadow fades */}
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

      <div className="animate-marquee items-center gap-8">
        {/* Render twice for seamless infinite loop */}
        {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, idx) => (
          <div key={idx} className="flex items-center gap-4 shrink-0">
            <span className="font-mono text-[11px] md:text-xs font-bold uppercase tracking-[0.22em] text-slate-300 hover:text-emerald-400 transition-colors duration-200">
              {item}
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/60 shrink-0" />
          </div>
        ))}
      </div>
    </div>
  );
}
