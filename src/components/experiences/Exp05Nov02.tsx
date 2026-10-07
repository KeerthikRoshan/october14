import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Flame } from 'lucide-react';
import { sound } from '../../utils/sound';

interface Exp05Nov02Props {
  onComplete: () => void;
}

export const Exp05Nov02: React.FC<Exp05Nov02Props> = ({ onComplete }) => {
  const [step, setStep] = useState<number>(0);

  useEffect(() => {
    const t1 = setTimeout(() => setStep(1), 1000);
    const t2 = setTimeout(() => setStep(2), 2200);
    const t3 = setTimeout(() => {
      sound.playTouch();
      sound.triggerHaptic(15);
      setStep(3);
    }, 3600);
    const t4 = setTimeout(() => {
      sound.playChime();
      sound.triggerHaptic([30, 40]);
      setStep(4);
    }, 5000);
    const t5 = setTimeout(() => {
      sound.playTouch();
      setStep(5);
    }, 6800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
    };
  }, []);

  const handleFastForward = () => {
    if (step < 5) {
      sound.playChime();
      setStep(5);
    }
  };

  return (
    <div 
      onClick={handleFastForward}
      className="relative w-full h-full bg-zinc-950 flex flex-col justify-between p-6 select-none overflow-hidden text-center font-sans"
    >
      {/* Top Header */}
      <div className="pt-safe z-10 space-y-1">
        <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-500">
          A few weeks in…
        </span>
        <h3 className="font-mono text-xl text-amber-300 font-semibold tracking-wider">
          02.11.2025
        </h3>
      </div>

      {/* Main Narrative Flow */}
      <div className="flex-1 flex flex-col items-center justify-center my-2 max-w-sm mx-auto w-full gap-3 overflow-y-auto no-scrollbar">
        {step >= 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-0.5 text-zinc-300 font-serif text-base font-light"
          >
            <p>Konjam konjama pesunom…</p>
            <p className="text-zinc-500 text-sm">Pesite irundhom…</p>
          </motion.div>
        )}

        {step >= 1 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="py-0.5"
          >
            <span className="text-[11px] font-mono uppercase text-rose-400 tracking-wider">
              Apram… oru problem.
            </span>
          </motion.div>
        )}

        {step >= 2 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="px-4 py-2.5 rounded-2xl bg-zinc-900 border border-zinc-800 shadow-md w-full"
          >
            <h4 className="font-serif text-xl text-rose-300 font-normal">
              “Enakku unna pudichiduchu. 🙂”
            </h4>
          </motion.div>
        )}

        {step >= 3 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-1 pt-1"
          >
            <p className="text-[11px] text-zinc-400 font-mono">
              Seri… mind-la vechikalam nu irundhena?
            </p>
            <p className="font-serif text-lg text-zinc-100 font-medium">
              No chance 😂
            </p>
          </motion.div>
        )}

        {/* The Confession and Shock */}
        {step >= 4 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: 'spring', damping: 15 }}
            className="p-3.5 rounded-2xl bg-zinc-900/90 border border-zinc-800 text-center space-y-2 shadow-xl w-full"
          >
            <p className="font-serif text-base text-rose-300 font-light">
              “Crush irukku nu unkitaye solliten… 😌”
            </p>
            <div className="pt-2 border-t border-zinc-800/80 space-y-1">
              <p className="text-[11px] text-zinc-400 font-mono">
                Aana enakku biggest shock enna theriyuma?
              </p>
              <p className="font-serif text-sm text-amber-300 font-normal leading-snug">
                “Unakkum en mela crush irukku nu nee sonnadhu thaan. ❤️”
              </p>
            </div>
          </motion.div>
        )}

        {/* Risk Over Regret Conclusion */}
        {step >= 5 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="p-3 rounded-2xl bg-rose-950/30 border border-rose-500/40 text-center space-y-1.5 shadow-lg w-full"
          >
            <p className="text-xs text-zinc-300 font-serif italic">
              “Adhukkapram thaan konjam confidence vandhuchu…”
            </p>
            <div className="flex items-center justify-center gap-1.5 text-xs font-mono text-rose-300 font-semibold tracking-wide">
              <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400 shrink-0" />
              <span>“Risk over regret” nu mudivu panniyachu. 😂❤️</span>
            </div>
          </motion.div>
        )}
      </div>

      {/* Bottom Action */}
      <div className="pb-safe z-10">
        {step >= 5 && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              sound.playTouch();
              onComplete();
            }}
            className="w-full py-3.5 rounded-2xl bg-zinc-900 border border-zinc-700/80 text-zinc-100 text-xs tracking-wider uppercase font-sans flex items-center justify-center gap-2 active:scale-98 transition-all shadow-md"
          >
            <span>Enter the chaos era</span>
            <ArrowRight className="w-4 h-4 text-rose-400" />
          </button>
        )}
      </div>
    </div>
  );
};
