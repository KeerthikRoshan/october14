import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Heart } from 'lucide-react';
import { loveStory } from '../../data/loveStory';
import { sound } from '../../utils/sound';

interface Exp03Oct14Props {
  onComplete: () => void;
}

export const Exp03Oct14: React.FC<Exp03Oct14Props> = ({ onComplete }) => {
  // Stage 0: Motif "14", Stage 1: "OCTOBER 2025", Stage 2: "14.10.2025", Stage 3: IG Story Frame, Stage 4: Realization text
  const [stage, setStage] = useState<number>(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStage(1), 1400),
      setTimeout(() => setStage(2), 3000),
      setTimeout(() => {
        sound.playChime();
        setStage(3);
      }, 5200),
      setTimeout(() => setStage(4), 8500),
    ];

    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="relative w-full h-full bg-black flex flex-col justify-between p-6 select-none overflow-hidden text-center">
      {/* Background starlight */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-rose-950/20 via-black to-black pointer-events-none" />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col items-center justify-center my-auto z-10 w-full max-w-xs mx-auto">
        <AnimatePresence mode="wait">
          {stage < 3 ? (
            <motion.div
              key="motif-reveal"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex flex-col items-center gap-3"
            >
              {/* RECURRING MOTIF: 14 */}
              <motion.h1
                animate={{ scale: [1, 1.08, 1], textShadow: ["0 0 10px rgba(244,63,94,0.3)", "0 0 30px rgba(244,63,94,0.8)", "0 0 10px rgba(244,63,94,0.3)"] }}
                transition={{ duration: 2.5, repeat: Infinity }}
                className="font-serif text-7xl font-bold text-rose-300 tracking-tighter"
              >
                14
              </motion.h1>

              {stage >= 1 && (
                <motion.p
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-xs uppercase tracking-widest text-zinc-400 font-mono"
                >
                  OCTOBER 2025
                </motion.p>
              )}

              {stage >= 2 && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-2 pt-2"
                >
                  <p className="font-mono text-amber-300 text-sm tracking-widest font-semibold">
                    14.10.2025
                  </p>
                  <p className="font-serif text-lg text-zinc-200">
                    Un birthday.
                  </p>
                  <p className="text-xs text-zinc-500 font-sans">
                    Unakku naan yaarune theriyathu. Enakkum unna theriyathu.
                  </p>
                </motion.div>
              )}
            </motion.div>
          ) : (
            /* Instagram Story Inspired Card */
            <motion.div
              key="story-frame"
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="w-full flex flex-col items-center gap-3"
            >
              <div className="w-full aspect-[9/16] max-w-[280px] rounded-3xl bg-zinc-900 border border-zinc-800 p-2.5 relative shadow-2xl flex flex-col justify-between overflow-hidden">
                {/* Simulated story top bar */}
                <div className="flex items-center gap-1.5 w-full pt-1 px-1 z-20">
                  <div className="h-0.5 flex-1 bg-white/80 rounded-full" />
                </div>
                <div className="flex items-center gap-2 px-1 pt-1 z-20">
                  <div className="w-6 h-6 rounded-full bg-rose-500/30 border border-rose-400/50 flex items-center justify-center">
                    <Heart className="w-3 h-3 text-rose-400" />
                  </div>
                  <span className="text-[10px] font-sans font-medium text-white/90">
                    friend's birthday story
                  </span>
                  <span className="text-[9px] text-white/50 font-mono ml-auto">14 Oct 2025</span>
                </div>

                {/* Photo frame */}
                <div className="absolute inset-0 bg-black">
                  <img
                    src={loveStory.photos.firstStoryPhoto}
                    alt="First time I saw you"
                    className="w-full h-full object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20 pointer-events-none" />
                </div>

                {/* Caption on story */}
                <div className="z-20 p-2 text-left">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-amber-300">
                    The first time I saw you
                  </span>
                  <p className="font-serif text-sm text-zinc-100 font-light mt-0.5">
                    “And there you were.”
                  </p>
                </div>
              </div>

              {/* Realization text */}
              {stage >= 4 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7 }}
                  className="space-y-1 pt-2 max-w-xs"
                >
                  <p className="font-serif text-xs text-zinc-400 italic">
                    “Appo enakku theriyathu…”
                  </p>
                  <p className="font-serif text-sm text-rose-300 font-light leading-snug">
                    “indha ponnu… konja naal la… en life-la ivlo important aaga pora nu. 😂❤️”
                  </p>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Action */}
      <div className="pb-safe z-10">
        {stage >= 4 && (
          <button
            onClick={() => {
              sound.playTouch();
              onComplete();
            }}
            className="w-full py-3.5 rounded-2xl bg-zinc-900 border border-zinc-700/80 text-zinc-100 text-xs tracking-wider uppercase font-sans flex items-center justify-center gap-2 active:scale-98 transition-all shadow-md"
          >
            <span>3 days later…</span>
            <ArrowRight className="w-4 h-4 text-rose-400" />
          </button>
        )}
      </div>
    </div>
  );
};
