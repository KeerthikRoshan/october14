import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Gift, ArrowRight } from 'lucide-react';
import { sound } from '../../utils/sound';

interface Exp17GiftBoxProps {
  onComplete: () => void;
}

export const Exp17GiftBox: React.FC<Exp17GiftBoxProps> = ({ onComplete }) => {
  const [tapCount, setTapCount] = useState<number>(0);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleBoxTap = () => {
    if (isOpen) return;

    sound.playTouch();
    sound.triggerHaptic(30);
    const nextCount = tapCount + 1;
    setTapCount(nextCount);

    if (nextCount >= 4) {
      setIsOpen(true);
      sound.playPop();
      sound.playChime();
      sound.triggerHaptic([50, 40, 100]);

      confetti({
        particleCount: 55,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#f43f5e', '#fb7185', '#fbbf24', '#fdfbf7']
      });
    }
  };

  const getShakeText = () => {
    switch (tapCount) {
      case 0:
        return "Tap pannu 👀";
      case 1:
        return "Konjam strong-ah 😂";
      case 2:
        return "Mathiiii 😭";
      case 3:
        return "Seri seri… last one.";
      default:
        return "";
    }
  };

  return (
    <div className="relative w-full h-full bg-zinc-950 flex flex-col justify-between p-6 select-none overflow-hidden font-sans">
      {/* Header */}
      <div className="text-center pt-safe z-10 space-y-1">
        <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-500">
          Birthday Surprise
        </span>
        <h3 className="font-serif text-2xl text-zinc-100">
          Birthday-ku gift illama epdi…
        </h3>
      </div>

      {/* Main Box or Bursted Memories */}
      <div className="relative flex-1 flex flex-col items-center justify-center my-2">
        <AnimatePresence>
          {!isOpen ? (
            <div className="flex flex-col items-center gap-6">
              <motion.button
                onClick={handleBoxTap}
                animate={tapCount > 0 ? {
                  x: [0, -8, 8, -6, 6, -3, 3, 0],
                  rotate: [0, -3, 3, -2, 2, 0],
                } : {}}
                transition={{ duration: 0.4 }}
                whileTap={{ scale: 0.94 }}
                className="relative p-8 rounded-3xl bg-zinc-900 border border-rose-500/30 shadow-[0_0_35px_rgba(244,63,94,0.25)] flex items-center justify-center focus:outline-none"
              >
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-rose-500/20 to-amber-500/10 pointer-events-none" />
                <Gift className="w-20 h-20 text-rose-400 drop-shadow-[0_0_15px_rgba(244,63,94,0.6)]" />

                <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-rose-600 text-white font-mono text-xs flex items-center justify-center shadow-md">
                  {tapCount}/4
                </span>
              </motion.button>

              <p className="text-xs font-mono text-zinc-300 tracking-wider">
                {getShakeText()}
              </p>
            </div>
          ) : (
            /* Burst fragments */
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center gap-4 text-center max-w-sm px-2 w-full"
            >
              {/* Floating snippets */}
              <div className="grid grid-cols-2 gap-2 w-full font-mono text-xs">
                <div className="p-3 bg-zinc-900 rounded-2xl border border-zinc-800 text-amber-300">
                  <span>14.10.2025</span>
                  <p className="text-[10px] text-zinc-500 mt-0.5">Story Day</p>
                </div>
                <div className="p-3 bg-zinc-900 rounded-2xl border border-zinc-800 text-rose-300">
                  <span>“Luna na enna?”</span>
                  <p className="text-[10px] text-zinc-500 mt-0.5">Oct 17</p>
                </div>
                <div className="p-3 bg-zinc-900 rounded-2xl border border-zinc-800 text-sky-300">
                  <span>10.06.2026</span>
                  <p className="text-[10px] text-zinc-500 mt-0.5">Confession</p>
                </div>
                <div className="p-3 bg-zinc-900 rounded-2xl border border-rose-500/40 text-rose-400 font-bold">
                  <span>14.06.2026 ❤️</span>
                  <p className="text-[10px] text-zinc-400 mt-0.5">En Mathi</p>
                </div>
              </div>

              {/* Reveal text */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="mt-2 space-y-1.5"
              >
                <p className="font-serif text-sm text-zinc-300 italic">
                  “Actual gift box-la… idhellam fit aagala.”
                </p>
                <p className="font-serif text-xl text-rose-300 font-light">
                  “So… website-la potuten. 😂❤️”
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Action */}
      <div className="pb-safe">
        {isOpen && (
          <button
            onClick={() => {
              sound.playTouch();
              onComplete();
            }}
            className="w-full py-3.5 rounded-2xl bg-zinc-900 border border-zinc-700/80 text-zinc-100 text-xs tracking-wider uppercase flex items-center justify-center gap-2 active:scale-98 transition-all shadow-md font-sans"
          >
            <span>Open when letters</span>
            <ArrowRight className="w-4 h-4 text-rose-400" />
          </button>
        )}
      </div>
    </div>
  );
};
