import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, RotateCcw } from 'lucide-react';
import { sound } from '../../utils/sound';

interface ExpFinalScreenProps {
  onRestart: () => void;
}

export const ExpFinalScreen: React.FC<ExpFinalScreenProps> = ({ onRestart }) => {
  const [canClickInfinity, setCanClickInfinity] = useState<boolean>(false);
  const [isSecretDiscovered, setIsSecretDiscovered] = useState<boolean>(false);
  const [secretStage, setSecretStage] = useState<number>(0);

  useEffect(() => {
    // Secret infinity becomes tappable after 3 seconds
    const t = setTimeout(() => {
      setCanClickInfinity(true);
    }, 3000);

    return () => clearTimeout(t);
  }, []);

  const handleInfinityClick = () => {
    if (!canClickInfinity || isSecretDiscovered) return;

    sound.playSecretChime();
    setIsSecretDiscovered(true);

    setTimeout(() => setSecretStage(1), 1200);
    setTimeout(() => setSecretStage(2), 2600);
    setTimeout(() => setSecretStage(3), 4400);
    setTimeout(() => setSecretStage(4), 6200);
  };

  return (
    <div className="relative w-full h-full bg-black flex flex-col items-center justify-center p-8 text-center select-none overflow-hidden font-sans">
      <AnimatePresence mode="wait">
        {!isSecretDiscovered ? (
          /* Normal Minimal Final Screen */
          <motion.div
            key="final-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
            className="flex flex-col items-center gap-6 max-w-xs"
          >
            {/* Couple Title */}
            <div className="space-y-1">
              <h2 className="font-serif text-3xl text-zinc-100 font-light tracking-wide">
                MATHI <span className="text-rose-400 text-xl font-sans">×</span> ROSHAN
              </h2>
              <p className="text-xs font-mono uppercase tracking-widest text-amber-300 font-semibold">
                14.06.2026 — ∞
              </p>
            </div>

            {/* Glowing separator */}
            <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-rose-500/80 to-transparent shadow-[0_0_10px_rgba(244,63,94,0.8)]" />

            {/* October 14 to June 14 narrative */}
            <div className="space-y-1 font-serif text-sm text-zinc-300 italic">
              <p>“October 14-la… unna paathen.”</p>
              <p className="text-rose-300">“June 14-la… namma aachu.”</p>
            </div>

            {/* NEXT MEMORY: First Meet */}
            <div className="p-3.5 rounded-2xl bg-zinc-900/80 border border-rose-500/30 flex flex-col items-center gap-1 w-full shadow-lg">
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
                NEXT MEMORY
              </span>
              <p className="font-serif text-lg text-zinc-100 font-medium">
                First Meet — Loading… ❤️
              </p>
            </div>

            <p className="font-serif text-xs text-zinc-500 italic">
              to be continued…
            </p>

            {/* Secret Tappable Infinity Symbol */}
            <div className="pt-1">
              <button
                onClick={handleInfinityClick}
                className="text-4xl text-zinc-700 hover:text-zinc-500 focus:outline-none transition-colors active:scale-95"
                aria-label="Forever"
              >
                ∞
              </button>
            </div>

            {/* Subtle Replay */}
            <button
              onClick={onRestart}
              className="mt-6 flex items-center gap-1.5 text-[10px] font-mono text-zinc-700 hover:text-zinc-400 transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              <span>replay from start</span>
            </button>
          </motion.div>
        ) : (
          /* SECRET ENDING SCREEN */
          <motion.div
            key="secret-screen"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center gap-4 max-w-xs text-center"
          >
            <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400">
              Secret Discovered
            </span>

            <p className="font-serif text-2xl text-zinc-200">
              Mathiiii 😭
            </p>
            <p className="text-xs text-zinc-400 font-mono">
              Innum pogalaya?
            </p>

            {secretStage >= 1 && (
              <motion.p
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xs text-zinc-300 font-sans"
              >
                Seri… last-ah onnu:
              </motion.p>
            )}

            {secretStage >= 2 && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.2, 1] }}
                transition={{ duration: 0.6 }}
                className="my-2 py-3 px-6 rounded-3xl bg-rose-500/10 border border-rose-500/40 shadow-[0_0_40px_rgba(244,63,94,0.4)] flex items-center gap-2"
              >
                <Heart className="w-6 h-6 text-rose-500 fill-rose-500 animate-pulse" />
                <h1 className="font-serif text-3xl font-light text-rose-200 tracking-wider">
                  I LOVE YOU.
                </h1>
              </motion.div>
            )}

            {secretStage >= 3 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-1 text-xs text-zinc-300 font-serif leading-relaxed"
              >
                <p>Seekiram meet pannalam.</p>
                <p className="text-rose-300 font-medium">
                  Namma first… REAL photo… eduthukalam. ❤️
                </p>
              </motion.div>
            )}

            {secretStage >= 4 && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-3 p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-[11px] font-mono text-amber-300/90 text-center"
              >
                <p>P.S.</p>
                <p>3 kutty Mathi matter… marakkala 👀😂</p>
              </motion.div>
            )}

            <button
              onClick={onRestart}
              className="mt-6 py-2 px-5 rounded-full bg-zinc-900 border border-zinc-800 text-[10px] font-mono text-zinc-400 hover:text-white"
            >
              Replay from the beginning
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
