import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, X, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { loveStory, type OpenWhenLetter } from '../../data/loveStory';
import { sound } from '../../utils/sound';

interface Exp18OpenWhenProps {
  onComplete: () => void;
}

export const Exp18OpenWhen: React.FC<Exp18OpenWhenProps> = ({ onComplete }) => {
  const [activeLetterIdx, setActiveLetterIdx] = useState<number>(0);
  const [openedLetter, setOpenedLetter] = useState<OpenWhenLetter | null>(null);

  const letters = loveStory.openWhenLetters;
  const currentLetter = letters[activeLetterIdx];

  const handleOpenEnvelope = (letter: OpenWhenLetter) => {
    sound.playEnvelope();
    sound.playChime();
    setOpenedLetter(letter);
  };

  const handleCloseEnvelope = () => {
    sound.playTouch();
    setOpenedLetter(null);
  };

  const handlePrevLetter = () => {
    sound.playTouch();
    setActiveLetterIdx(prev => (prev > 0 ? prev - 1 : letters.length - 1));
  };

  const handleNextLetter = () => {
    sound.playTouch();
    setActiveLetterIdx(prev => (prev < letters.length - 1 ? prev + 1 : 0));
  };

  const renderFormattedText = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={i} className="font-semibold text-rose-950 font-serif">
            {part.slice(2, -2)}
          </strong>
        );
      }
      return part;
    });
  };

  return (
    <div className="relative w-full h-full bg-zinc-950 flex flex-col justify-between p-6 select-none overflow-hidden font-sans">
      {/* Header */}
      <div className="text-center pt-safe z-10 space-y-1">
        <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-500">
          Envelopes
        </span>
        <h3 className="font-serif text-2xl text-zinc-100">
          “Open When…”
        </h3>
        <p className="text-xs text-zinc-400 font-sans">
          Swipe panni tap pannu Mathi
        </p>
      </div>

      {/* Envelope Carousel & Stack */}
      <div className="relative flex-1 flex flex-col items-center justify-center my-2">
        <div className="relative w-full max-w-[310px] flex items-center justify-center">
          <button
            onClick={handlePrevLetter}
            className="absolute -left-3 z-30 p-2 rounded-full bg-zinc-900/90 border border-zinc-800 text-zinc-400 hover:text-white"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Envelope Card */}
          <motion.div
            key={currentLetter.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            onClick={() => handleOpenEnvelope(currentLetter)}
            className="w-full aspect-[4/3] rounded-3xl bg-zinc-900 border-2 border-amber-900/40 p-6 flex flex-col justify-between shadow-2xl relative cursor-pointer active:scale-98 transition-transform"
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-rose-900/90 border-2 border-rose-600/70 shadow-lg flex items-center justify-center">
              <span className="text-lg">{currentLetter.stamp}</span>
            </div>

            <div className="flex justify-between items-center text-xs font-mono text-zinc-500">
              <span>LETTER #{activeLetterIdx + 1}</span>
              <Mail className="w-4 h-4 text-zinc-400" />
            </div>

            <div className="z-10 mt-auto text-left">
              <h4 className="font-serif text-lg text-zinc-100 font-medium">
                {currentLetter.title}
              </h4>
              <p className="text-xs text-zinc-400 font-sans mt-0.5 truncate">
                {currentLetter.preview}
              </p>
            </div>
          </motion.div>

          <button
            onClick={handleNextLetter}
            className="absolute -right-3 z-30 p-2 rounded-full bg-zinc-900/90 border border-zinc-800 text-zinc-400 hover:text-white"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Dots */}
        <div className="flex items-center gap-1.5 mt-4">
          {letters.map((_, i) => (
            <span
              key={i}
              className={`w-1.5 h-1.5 rounded-full transition-all ${
                i === activeLetterIdx ? 'w-4 bg-rose-500' : 'bg-zinc-800'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Opened Letter Slide-up Modal */}
      <AnimatePresence>
        {openedLetter && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-5 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.95 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="relative w-full max-w-sm max-h-[85vh] bg-[#fdfbf7] text-zinc-900 rounded-3xl p-6 shadow-2xl flex flex-col justify-between overflow-y-auto no-scrollbar border-4 border-amber-900/20"
            >
              <button
                onClick={handleCloseEnvelope}
                className="absolute top-4 right-4 p-1.5 rounded-full bg-zinc-200/80 text-zinc-600 hover:text-black"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="space-y-4 text-left">
                <div className="border-b border-zinc-200 pb-2">
                  <span className="text-[10px] uppercase font-mono tracking-wider text-rose-700">
                    {openedLetter.stamp} For Mathi Chellam
                  </span>
                  <h4 className="font-serif text-xl text-zinc-950 font-bold mt-0.5">
                    {openedLetter.title}
                  </h4>
                </div>

                <div className="font-serif text-sm leading-relaxed text-zinc-800 whitespace-pre-line">
                  {renderFormattedText(openedLetter.message)}
                </div>
              </div>

              <button
                onClick={handleCloseEnvelope}
                className="w-full mt-6 py-2.5 rounded-xl bg-zinc-900 text-white font-sans text-xs tracking-wide uppercase hover:bg-zinc-800 transition-colors"
              >
                Close letter
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Bottom Action */}
      <div className="pb-safe">
        <button
          onClick={() => {
            sound.playTouch();
            onComplete();
          }}
          className="w-full py-3.5 rounded-2xl bg-zinc-900 border border-zinc-700/80 text-zinc-100 text-xs tracking-wider uppercase flex items-center justify-center gap-2 active:scale-98 transition-all shadow-md font-sans"
        >
          <span>Something serious</span>
          <ArrowRight className="w-4 h-4 text-rose-400" />
        </button>
      </div>
    </div>
  );
};
