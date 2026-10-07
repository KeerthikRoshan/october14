import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, ArrowRight } from 'lucide-react';
import { loveStory } from '../../data/loveStory';
import { sound } from '../../utils/sound';

interface Exp21DontTapThisProps {
  onComplete: () => void;
}

export const Exp21DontTapThis: React.FC<Exp21DontTapThisProps> = ({ onComplete }) => {
  const [tapStage, setTapStage] = useState<number>(0);

  const handleTap = () => {
    sound.playTouch();
    sound.triggerHaptic(25);
    const nextStage = tapStage + 1;
    setTapStage(nextStage);

    if (nextStage >= 4) {
      sound.playPop();
    }
  };

  const getWarningText = () => {
    switch (tapStage) {
      case 1:
        return "Mathi. 😐";
      case 2:
        return "Sonnapuramum kekka maata la? 😭";
      case 3:
        return "Seri… Paaru.";
      default:
        return "";
    }
  };

  return (
    <div className="relative w-full h-full bg-zinc-950 flex flex-col justify-between p-6 select-none overflow-hidden font-sans">
      {/* Header */}
      <div className="text-center pt-safe z-10 space-y-1">
        <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-500">
          Strict Warning
        </span>
        <h3 className="font-serif text-xl text-zinc-200">
          Self-control check
        </h3>
      </div>

      {/* Button or Revealed Funny Photo */}
      <div className="flex-1 flex flex-col items-center justify-center my-4 max-w-xs mx-auto w-full">
        <AnimatePresence mode="wait">
          {tapStage < 4 ? (
            <motion.div
              key="button-zone"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex flex-col items-center gap-6"
            >
              <button
                onClick={handleTap}
                className="py-4 px-8 rounded-full bg-red-950/40 border-2 border-red-500/60 text-red-300 font-mono text-xs tracking-widest uppercase hover:bg-red-900/60 active:scale-90 transition-all shadow-[0_0_30px_rgba(239,68,68,0.25)] flex items-center gap-2"
              >
                <AlertCircle className="w-4 h-4 text-red-400 animate-pulse" />
                <span>IDHA TOUCH PANNATHA</span>
              </button>

              <div className="h-8 flex items-center justify-center text-center">
                {tapStage > 0 && (
                  <motion.p
                    key={tapStage}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-xs font-mono text-amber-400 font-medium"
                  >
                    {getWarningText()}
                  </motion.p>
                )}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="funny-reveal"
              initial={{ opacity: 0, scale: 0.85, rotate: -2 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.4 }}
              className="w-full bg-zinc-900 p-4 rounded-3xl border border-zinc-800 shadow-2xl flex flex-col gap-3 text-center"
            >
              <div className="w-full aspect-[3/4] rounded-2xl overflow-hidden bg-black">
                <img
                  src={loveStory.photos.funnyMathiPhoto}
                  alt="Funny Mathi memory"
                  className="w-full h-full object-cover object-center"
                />
              </div>

              <div className="space-y-1">
                <h4 className="font-serif text-lg text-rose-300 font-medium">
                  Idhukku thaan sonnen 😂
                </h4>
                <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                  Sonna kekkanum la? Ippo paru grinning like an idiot.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Action */}
      <div className="pb-safe">
        {tapStage >= 4 && (
          <button
            onClick={() => {
              sound.playTouch();
              onComplete();
            }}
            className="w-full py-3.5 rounded-2xl bg-zinc-900 border border-zinc-700/80 text-zinc-100 text-xs tracking-wider uppercase flex items-center justify-center gap-2 active:scale-98 transition-all shadow-md font-sans"
          >
            <span>Future camera roll</span>
            <ArrowRight className="w-4 h-4 text-rose-400" />
          </button>
        )}
      </div>
    </div>
  );
};
