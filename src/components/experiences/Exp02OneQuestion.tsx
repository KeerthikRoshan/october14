import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sound } from '../../utils/sound';

interface Exp02OneQuestionProps {
  onComplete: () => void;
}

export const Exp02OneQuestion: React.FC<Exp02OneQuestionProps> = ({ onComplete }) => {
  const [selectedChoice, setSelectedChoice] = useState<'theriyum' | 'theriyathu' | null>(null);

  const handleChoice = (choice: 'theriyum' | 'theriyathu') => {
    sound.playTouch();
    sound.triggerHaptic(25);
    setSelectedChoice(choice);

    setTimeout(() => {
      sound.playChime();
    }, 1500);

    setTimeout(() => {
      onComplete();
    }, 3800);
  };

  return (
    <div className="relative w-full h-full bg-zinc-950 flex flex-col items-center justify-center px-8 text-center select-none overflow-hidden">
      {/* Background ambient warmth */}
      <div className="absolute w-72 h-72 rounded-full bg-rose-500/5 blur-3xl pointer-events-none" />

      <AnimatePresence mode="wait">
        {selectedChoice === null ? (
          <motion.div
            key="question-prompt"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.7 }}
            className="flex flex-col items-center gap-6 max-w-sm"
          >
            <div className="space-y-1.5">
              <span className="text-xs uppercase tracking-widest text-zinc-500 font-mono">
                Start panrathuku munnadi…
              </span>
              <p className="text-sm text-zinc-400 font-light">
                oru question.
              </p>
            </div>

            <h2 className="font-serif text-2xl md:text-3xl text-zinc-100 font-normal leading-snug px-2">
              “Unakku en life-la nee evlo important nu theriyuma?”
            </h2>

            {/* Answer buttons */}
            <div className="flex flex-col w-full gap-3 mt-4">
              <button
                onClick={() => handleChoice('theriyum')}
                className="w-full py-3.5 px-6 rounded-2xl bg-zinc-900 border border-zinc-800 text-zinc-200 hover:text-white hover:border-rose-500/40 active:scale-[0.98] transition-all font-sans text-sm flex items-center justify-center gap-2 shadow-sm"
              >
                <span>Theriyum</span>
                <span className="text-base">😌</span>
              </button>

              <button
                onClick={() => handleChoice('theriyathu')}
                className="w-full py-3.5 px-6 rounded-2xl bg-zinc-900 border border-zinc-800 text-zinc-200 hover:text-white hover:border-amber-500/40 active:scale-[0.98] transition-all font-sans text-sm flex items-center justify-center gap-2 shadow-sm"
              >
                <span>Theriyathu</span>
                <span className="text-base">👀</span>
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="reply-prompt"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center gap-4 max-w-xs"
          >
            {selectedChoice === 'theriyum' ? (
              <>
                <p className="font-serif text-3xl text-rose-300 font-light italic">
                  Apdiya? 😂
                </p>
                <p className="text-base text-zinc-300 font-serif font-light">
                  Enakku ennavo full-ah theriyathu nu thonuthu…
                </p>
              </>
            ) : (
              <>
                <p className="font-serif text-3xl text-amber-300 font-light italic">
                  Good. 😌
                </p>
                <p className="text-sm text-zinc-300 font-sans">
                  Appo naan solren…
                </p>
              </>
            )}

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.7 }}
              className="mt-6 flex flex-col items-center gap-2"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-rose-400/80 animate-ping" />
              <p className="font-serif text-2xl text-zinc-100 font-light">
                Vaa… kaamikiren.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
