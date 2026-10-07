import React from 'react';

interface MobileFrameProps {
  children: React.ReactNode;
}

export const MobileFrame: React.FC<MobileFrameProps> = ({ children }) => {
  return (
    <div className="relative w-full h-full flex items-center justify-center bg-black overflow-hidden font-sans">
      {/* Background ambient gradient for desktop display */}
      <div className="absolute inset-0 hidden md:block bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-900 via-black to-zinc-950 pointer-events-none" />

      {/* Desktop subtle background prompt */}
      <div className="hidden lg:flex fixed top-6 left-8 items-center gap-2 text-xs text-zinc-500 font-mono tracking-wider opacity-70">
        <span className="inline-block w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
        OPTIMIZED FOR VERTICAL MOBILE SCREEN (390×844)
      </div>

      {/* Phone container: fills screen on mobile; elegant phone frame on desktop */}
      <div className="relative w-full h-[100dvh] md:h-[844px] md:max-w-[393px] md:rounded-[52px] md:border-[10px] md:border-zinc-800/80 md:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),0_0_80px_rgba(244,63,94,0.12)] bg-zinc-950 overflow-hidden flex flex-col justify-between">
        {/* Phone Speaker & Dynamic Island Mockup (desktop only) */}
        <div className="hidden md:flex absolute top-3 left-1/2 -translate-x-1/2 z-50 w-28 h-6 bg-black rounded-full items-center justify-center border border-zinc-900/60 shadow-inner">
          <div className="w-2.5 h-2.5 rounded-full bg-zinc-900 mr-2 border border-zinc-800" />
          <div className="w-1.5 h-1.5 rounded-full bg-zinc-950" />
        </div>

        {/* Content Viewport */}
        <div className="relative w-full h-full flex flex-col overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  );
};
