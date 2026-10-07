import React from 'react';

interface StoryProgressProps {
  currentStep: number;
  totalSteps: number;
  onNext?: () => void;
  onPrev?: () => void;
  showNavPills?: boolean;
}

export const StoryProgress: React.FC<StoryProgressProps> = ({
  currentStep,
  totalSteps,
  onNext,
  onPrev,
  showNavPills = true
}) => {
  // Only show progress after the lock screen (step > 0) and not on final secret screen
  if (currentStep === 0) return null;

  const percentage = Math.min(100, Math.max(0, ((currentStep) / (totalSteps - 1)) * 100));

  return (
    <div className="absolute bottom-safe left-0 right-0 z-40 px-6 py-2 flex flex-col items-center gap-2 pointer-events-none">
      {/* Discreet next/prev helpers for smooth navigation */}
      {showNavPills && (
        <div className="flex items-center justify-between w-full pointer-events-auto">
          {currentStep > 0 ? (
            <button
              onClick={onPrev}
              className="text-[11px] font-sans text-zinc-500 hover:text-zinc-300 py-1 px-2.5 rounded-full bg-zinc-900/40 backdrop-blur-sm border border-white/5 active:scale-95 transition-all"
            >
              ← back
            </button>
          ) : <div />}

          {currentStep < totalSteps - 1 && (
            <button
              onClick={onNext}
              className="text-[11px] font-sans text-rose-300/80 hover:text-rose-200 py-1 px-3 rounded-full bg-rose-950/40 backdrop-blur-sm border border-rose-500/20 active:scale-95 transition-all flex items-center gap-1 shadow-sm"
            >
              <span>next</span>
              <span className="text-xs">→</span>
            </button>
          )}
        </div>
      )}

      {/* Subtle indicator: ✦ ━━━━━ ○ */}
      <div className="flex items-center gap-2 text-zinc-600 text-xs tracking-wider opacity-60">
        <span className="text-[10px] text-rose-400/80">✦</span>
        <div className="w-24 h-[1.5px] bg-zinc-800 rounded-full overflow-hidden relative">
          <div
            className="h-full bg-gradient-to-r from-rose-500/60 to-amber-400/80 transition-all duration-500 ease-out"
            style={{ width: `${percentage}%` }}
          />
        </div>
        <span className="text-[9px] text-zinc-500">○</span>
      </div>
    </div>
  );
};
