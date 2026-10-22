import React from 'react';
import { Sparkles } from 'lucide-react';

const TICKER_ITEMS = [
  'LINUX SERVER OPS',
  'DOCKER CONTAINERIZATION',
  'ERPNEXT & FRAPPE DEPLOY',
  'ZIMBRA MAIL SERVER',
  'GLPI HELPDESK & ASSETS',
  'N8N WORKFLOW AUTOMATION',
  'BASH SCRIPTING & CRON',
  'PROXMOX & HOMELAB',
  'NETWORK & DNS ARCHITECTURE',
  '99.9% UPTIME RELIABILITY',
];

export default function TechTicker() {
  return (
    <div className="w-full overflow-hidden border-y-2 border-[#232533] bg-[#0c0d12] py-4 my-2 relative select-none">
      {/* Edge shadow fades */}
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#0b0c10] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#0b0c10] to-transparent z-10 pointer-events-none" />

      <div className="animate-marquee items-center gap-8">
        {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, idx) => (
          <div key={idx} className="flex items-center gap-4 shrink-0">
            <span className="font-mono text-xs font-black uppercase tracking-[0.2em] text-slate-200 hover:text-[#ccff00] transition-colors duration-200">
              {item}
            </span>
            <span className="text-[#ccff00] text-xs font-marker">✦</span>
          </div>
        ))}
      </div>
    </div>
  );
}
