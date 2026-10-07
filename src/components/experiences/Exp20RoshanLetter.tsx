import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { loveStory } from '../../data/loveStory';
import { sound } from '../../utils/sound';

interface Exp20RoshanLetterProps {
  onComplete: () => void;
}

export const Exp20RoshanLetter: React.FC<Exp20RoshanLetterProps> = ({ onComplete }) => {
  const [visibleCount, setVisibleCount] = useState<number>(2);

  const paragraphs = loveStory.loveLetter;
  const isFinished = visibleCount >= paragraphs.length;

  const handleRevealNext = () => {
    sound.playTouch();
    sound.triggerHaptic(20);
    setVisibleCount(prev => Math.min(paragraphs.length, prev + 1));

    if (visibleCount + 1 >= paragraphs.length) {
      sound.playChime();
    }
  };

  return (
    <div className="relative w-full h-full bg-[#09090b] flex flex-col justify-between p-6 select-none overflow-hidden font-serif">
      <div className="absolute inset-0 bg-[radial-gradient(#18181b_1px,transparent_1px)] [background-size:16px_16px] opacity-40 pointer-events-none" />

      {/* Header */}
      <div className="pt-safe text-center z-10 border-b border-zinc-900 pb-3">
        <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-mono">
          From Roshan
        </span>
        <h3 className="text-xl text-zinc-200 font-light mt-0.5">
          Roshan's Letter To Mathi
        </h3>
      </div>

      {/* Scrollable Letter Body */}
      <div className="flex-1 overflow-y-auto no-scrollbar py-6 px-2 flex flex-col gap-4 z-10 text-left">
        {paragraphs.slice(0, visibleCount).map((para, idx) => (
          <motion.p
            key={idx}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className={`leading-relaxed text-zinc-200 font-light ${
              idx === 0
                ? 'text-2xl text-rose-300 font-normal italic'
                : idx === paragraphs.length - 2
                ? 'text-lg text-rose-400 font-medium'
                : idx === paragraphs.length - 1
                ? 'text-base text-amber-200 font-mono font-medium text-right pt-2'
                : 'text-sm text-zinc-300/90'
            }`}
          >
            {para}
          </motion.p>
        ))}

        {!isFinished && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center gap-2 py-4"
          >
            <button
              onClick={handleRevealNext}
              className="py-2.5 px-5 rounded-full bg-zinc-900 border border-zinc-800 text-xs text-rose-300 hover:text-white flex items-center gap-1.5 active:scale-95 transition-all shadow-md font-sans"
            >
              <span>Innum padi</span>
              <ChevronDown className="w-3.5 h-3.5 animate-bounce" />
            </button>
          </motion.div>
        )}
      </div>

      {/* Bottom Action */}
      <div className="pb-safe pt-2 z-10">
        {isFinished ? (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={() => {
              sound.playTouch();
              onComplete();
            }}
            className="w-full py-3.5 rounded-2xl bg-zinc-900 border border-zinc-700/80 text-zinc-100 text-xs tracking-wider uppercase font-sans flex items-center justify-center gap-2 active:scale-98 transition-all shadow-md"
          >
            <span>Turn the page</span>
            <ArrowRight className="w-4 h-4 text-rose-400" />
          </motion.button>
        ) : (
          <div className="text-center text-[10px] font-mono text-zinc-600">
            {visibleCount} of {paragraphs.length} paragraphs read
          </div>
        )}
      </div>
    </div>
  );
};
