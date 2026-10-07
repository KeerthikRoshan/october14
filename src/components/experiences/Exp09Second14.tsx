import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Heart } from 'lucide-react';
import { sound } from '../../utils/sound';

interface Exp09Second14Props {
  onComplete: () => void;
}

export const Exp09Second14: React.FC<Exp09Second14Props> = ({ onComplete }) => {
  const [stage, setStage] = useState<number>(0);

  useEffect(() => {
    const t1 = setTimeout(() => setStage(1), 1800);
    const t2 = setTimeout(() => {
      sound.playHeartbeat();
      setStage(2);
    }, 3800);
    const t3 = setTimeout(() => {
      sound.playChime();
      setStage(3);
    }, 6200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  return (
    <div className="relative w-full h-full bg-black flex flex-col justify-between p-6 select-none overflow-hidden text-center">
      {/* Background starlight */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-rose-950/30 via-black to-black pointer-events-none" />

      <div className="pt-safe" />

      {/* Main Emotional Narrative */}
      <div className="flex-1 flex flex-col items-center justify-center my-auto max-w-xs mx-auto w-full gap-5 z-10">
        {/* Glowing "14" */}
        <motion.h1
          animate={{
            scale: [1, 1.1, 1],
            textShadow: [
              "0 0 15px rgba(244,63,94,0.4)",
              "0 0 40px rgba(244,63,94,0.9)",
              "0 0 15px rgba(244,63,94,0.4)"
            ]
          }}
          transition={{ duration: 2.2, repeat: Infinity }}
          className="font-serif text-8xl font-bold text-rose-300 tracking-tighter"
        >
          14
        </motion.h1>

        {stage >= 1 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-1.5"
          >
            <p className="font-mono text-xl text-amber-300 font-semibold tracking-wider">
              14.06.2026
            </p>
            <p className="font-serif text-lg text-zinc-300 italic">
              “Indha 14… vera level special.”
            </p>
          </motion.div>
        )}

        {stage >= 2 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-2 text-zinc-300 font-serif text-sm font-light leading-relaxed pt-2"
          >
            <p className="text-zinc-400">
              October 14-la… oru ponna story-la paathen.
            </p>
            <p className="text-rose-200">
              June 14-la… adhe ponnu…
            </p>
            <h2 className="font-serif text-3xl text-rose-300 font-normal drop-shadow-[0_0_20px_rgba(244,63,94,0.6)] pt-1">
              “en Mathi aayita. ❤️”
            </h2>
          </motion.div>
        )}

        {/* Milestone Badge */}
        {stage >= 3 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-3 px-6 py-3.5 rounded-3xl bg-zinc-900/90 border border-rose-500/40 shadow-2xl flex flex-col items-center gap-1"
          >
            <div className="flex items-center gap-2">
              <span className="font-serif text-lg text-zinc-100 font-medium">MATHI</span>
              <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
              <span className="font-serif text-lg text-zinc-100 font-medium">ROSHAN</span>
            </div>
            <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">
              Official Date: 14.06.2026
            </span>
          </motion.div>
        )}
      </div>

      {/* Bottom Action */}
      <div className="pb-safe z-10">
        {stage >= 3 && (
          <button
            onClick={() => {
              sound.playTouch();
              onComplete();
            }}
            className="w-full py-3.5 rounded-2xl bg-zinc-900 border border-zinc-700/80 text-zinc-100 text-xs tracking-wider uppercase font-sans flex items-center justify-center gap-2 active:scale-98 transition-all shadow-md"
          >
            <span>See how I see you</span>
            <ArrowRight className="w-4 h-4 text-rose-400" />
          </button>
        )}
      </div>
    </div>
  );
};
