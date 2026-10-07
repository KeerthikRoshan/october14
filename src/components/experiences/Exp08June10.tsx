import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Heart } from 'lucide-react';
import { sound } from '../../utils/sound';

interface Exp08June10Props {
  onComplete: () => void;
}

export const Exp08June10: React.FC<Exp08June10Props> = ({ onComplete }) => {
  const [stage, setStage] = useState<number>(0);

  useEffect(() => {
    const t1 = setTimeout(() => setStage(1), 1400);
    const t2 = setTimeout(() => {
      sound.playHeartbeat();
      setStage(2);
    }, 3200);
    const t3 = setTimeout(() => {
      sound.playChime();
      setStage(3);
    }, 5400);
    const t4 = setTimeout(() => setStage(4), 7800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, []);

  return (
    <div className="relative w-full h-full bg-zinc-950 flex flex-col justify-between p-6 select-none overflow-hidden text-center font-sans">
      {/* Header Date */}
      <div className="pt-safe z-10 space-y-1">
        <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-500">
          The Big Step
        </span>
        <h3 className="font-mono text-2xl text-amber-300 font-semibold tracking-wider">
          10.06.2026
        </h3>
      </div>

      {/* Main Narrative Area */}
      <div className="flex-1 flex flex-col items-center justify-center my-4 max-w-xs mx-auto w-full gap-5">
        {stage >= 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-1 text-zinc-400 font-serif text-sm font-light"
          >
            <p>Crush nu solli…</p>
            <p>romba naal escape aayachu.</p>
          </motion.div>
        )}

        {stage >= 1 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="py-1"
          >
            <p className="font-serif text-lg text-zinc-200">
              Finally…
            </p>
            <h4 className="font-serif text-2xl text-rose-300 font-medium">
              Love nu solliten.
            </h4>
          </motion.div>
        )}

        {/* Animate: ROSHAN -> MATHI ❤️ */}
        {stage >= 2 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="px-6 py-4 rounded-3xl bg-zinc-900 border border-rose-500/30 flex items-center justify-center gap-3 shadow-xl"
          >
            <span className="font-mono text-xs text-sky-400 font-semibold tracking-wider">ROSHAN</span>
            <span className="text-zinc-600 font-sans text-xs">→</span>
            <span className="font-mono text-xs text-rose-400 font-semibold tracking-wider">MATHI</span>
            <Heart className="w-4 h-4 text-rose-500 fill-rose-500 animate-pulse ml-1" />
          </motion.div>
        )}

        {/* Waiting screen comedy */}
        {stage >= 3 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-2 text-left w-full text-xs font-mono"
          >
            <p className="text-zinc-400 text-center">Response-ku wait panna Roshan:</p>
            <div className="flex justify-center gap-2 text-lg">
              <span>🙂</span>
              <span>🙂</span>
              <span>🙂</span>
            </div>

            {stage >= 4 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="pt-2 text-center border-t border-zinc-800"
              >
                <span className="text-zinc-500 text-[10px]">Inside:</span>
                <p className="text-2xl mt-0.5">💀</p>
              </motion.div>
            )}
          </motion.div>
        )}
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
            <span>And then… the 14</span>
            <ArrowRight className="w-4 h-4 text-rose-400" />
          </button>
        )}
      </div>
    </div>
  );
};
