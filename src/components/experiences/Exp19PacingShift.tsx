import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { sound } from '../../utils/sound';

interface Exp19PacingShiftProps {
  onComplete: () => void;
}

export const Exp19PacingShift: React.FC<Exp19PacingShiftProps> = ({ onComplete }) => {
  const [step, setStep] = useState<number>(0);

  useEffect(() => {
    const t1 = setTimeout(() => setStep(1), 1000);
    const t2 = setTimeout(() => setStep(2), 2600);
    const t3 = setTimeout(() => setStep(3), 4600);
    const t4 = setTimeout(() => {
      onComplete();
    }, 7200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [onComplete]);

  return (
    <div
      onClick={() => {
        sound.playTouch();
        onComplete();
      }}
      className="relative w-full h-full bg-black flex flex-col items-center justify-center p-8 text-center select-none cursor-pointer"
    >
      <div className="flex flex-col items-center gap-6 max-w-xs">
        {step >= 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ duration: 0.8 }}
            className="text-zinc-500 font-serif text-lg tracking-wide"
          >
            Seri…
          </motion.p>
        )}

        {step >= 1 && (
          <motion.p
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 0.8, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-zinc-400 font-serif text-xl tracking-wide font-light"
          >
            Comedy podhum.
          </motion.p>
        )}

        {step >= 2 && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="pt-4 space-y-2"
          >
            <p className="text-zinc-300 font-serif text-xl font-light">
              Ippo… konjam serious-ah.
            </p>
            <p className="text-rose-200 font-serif text-2xl font-normal leading-snug pt-1">
              Mathi… Idha mattum full-ah padi.
            </p>
          </motion.div>
        )}

        {step >= 3 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            className="text-[10px] text-zinc-600 font-mono tracking-widest uppercase mt-6"
          >
            (tap anywhere to begin reading)
          </motion.p>
        )}
      </div>
    </div>
  );
};
