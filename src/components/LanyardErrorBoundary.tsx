import React, { Component, ErrorInfo, ReactNode } from 'react';
import heroFigure from '../assets/hero-figure.png';

interface Props {
  children: ReactNode;
  fallbackClassName?: string;
}

interface State {
  hasError: boolean;
}

export default class LanyardErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false
    };
  }

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.warn('Lanyard 3D Canvas error caught by boundary (falling back to 2D card):', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className={`relative flex items-center justify-center p-4 ${this.props.fallbackClassName || 'w-full h-full'}`}>
          {/* Fallback ID Card */}
          <div className="relative w-64 sm:w-72 rounded-2xl bg-[#0f1118] border border-white/10 p-5 shadow-2xl flex flex-col items-center text-center">
            {/* Lanyard Clip Top */}
            <div className="w-12 h-3 bg-zinc-700 rounded-full mb-3 -mt-2 border border-zinc-500 shadow-inner" />
            
            {/* Sandi Photo */}
            <div className="w-32 h-32 rounded-xl overflow-hidden border-2 border-[#ccff00]/40 shadow-lg mb-4 bg-black/40">
              <img
                src={heroFigure}
                alt="Sandi Riady"
                className="w-full h-full object-cover object-top"
              />
            </div>

            {/* Title & Tag */}
            <h3 className="font-marker text-xl text-white tracking-wide">SANDI RIADY</h3>
            <span className="font-mono text-[11px] text-[#ccff00] font-bold tracking-wider uppercase mt-1">
              IT Infrastructure Support
            </span>

            {/* Status Indicator */}
            <div className="flex items-center gap-2 mt-4 px-3 py-1 rounded-full bg-black/50 border border-white/5 font-mono text-[10px] text-slate-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>SYSTEMS ONLINE</span>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
