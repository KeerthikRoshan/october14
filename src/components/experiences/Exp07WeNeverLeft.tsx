import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { sound } from '../../utils/sound';

interface Exp07WeNeverLeftProps {
  onComplete: () => void;
}

export const Exp07WeNeverLeft: React.FC<Exp07WeNeverLeftProps> = ({ onComplete }) => {
  const [step, setStep] = useState<number>(0);

  useEffect(() => {
    const t1 = setTimeout(() => setStep(1), 1400);
    const t2 = setTimeout(() => setStep(2), 3200);
    const t3 = setTimeout(() => {
      sound.playHeartbeat();
      setStep(3);
    }, 4800);
    const t4 = setTimeout(() => {
      sound.playChime();
      setStep(4);
    }, 7000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, []);

  const handleFastForward = () => {
    if (step < 4) {
      sound.playChime();
      setStep(4);
    }
  };

  return (
    <div 
      onClick={handleFastForward}
      className="relative w-full h-full bg-black flex flex-col justify-between p-6 select-none overflow-hidden text-center font-serif"
    >
      <div className="pt-safe" />

      {/* Narrative Flow */}
      <div className="flex-1 flex flex-col items-center justify-center my-auto max-w-sm mx-auto gap-4">
        {step >= 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-1 text-zinc-400 text-sm font-light leading-relaxed"
          >
            <p>Evlo sanda vandhalum…</p>
            <p>evlo kovam vandhalum…</p>
            <p>evlo ‘po’ sonnalum…</p>
          </motion.div>
        )}

        {step >= 1 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="py-1 space-y-1"
          >
            <p className="text-zinc-300 text-base font-light">namma rendu perum…</p>
            <h3 className="font-serif text-2xl text-rose-300 font-normal">
              nijamavae vittutu pogala.
            </h3>
          </motion.div>
        )}

        {step >= 2 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="pt-1"
          >
            <p className="text-xs text-zinc-500 font-sans tracking-widest uppercase">
              appo thaan…
            </p>
          </motion.div>
        )}

        {step >= 3 && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: 'spring', damping: 15 }}
            className="p-4 rounded-3xl bg-zinc-900/90 border border-zinc-800 shadow-2xl space-y-2.5 w-full"
          >
            <p className="font-serif text-lg text-rose-200 font-light leading-relaxed">
              “enaku enna aanaalum seri vitradha… <br />
              <span className="text-amber-300 font-normal">iva thaan</span> nu irundhuchi.”
            </p>
            <p className="font-serif text-base text-zinc-200 font-light">
              “unakum apdi thaane? ❤️”
            </p>
            {step >= 4 && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="text-[11px] text-zinc-400 font-mono pt-1 border-t border-zinc-800/80"
              >
                (correct - ah guess pannena nu unaku thaan theriyum 😂)
              </motion.p>
            )}
          </motion.div>
        )}
      </div>

      {/* Bottom Action */}
      <div className="pb-safe z-10">
        {step >= 4 && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              sound.playTouch();
              onComplete();
            }}
            className="w-full py-3.5 rounded-2xl bg-zinc-900 border border-zinc-700/80 text-zinc-100 text-xs tracking-wider uppercase font-sans flex items-center justify-center gap-2 active:scale-98 transition-all shadow-md"
          >
            <span>Then came June</span>
            <ArrowRight className="w-4 h-4 text-rose-400" />
          </button>
        )}
      </div>
    </div>
  );
};
