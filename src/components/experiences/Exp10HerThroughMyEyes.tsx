import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { loveStory } from '../../data/loveStory';
import { sound } from '../../utils/sound';

interface Exp10HerThroughMyEyesProps {
  onComplete: () => void;
}

export const Exp10HerThroughMyEyes: React.FC<Exp10HerThroughMyEyesProps> = ({ onComplete }) => {
  const [hasStarted, setHasStarted] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const photos = loveStory.candidMathiPhotos;
  const currentPhoto = photos[currentIndex];
  const isLast = currentIndex === photos.length - 1;

  const handleNext = () => {
    sound.playTouch();
    sound.triggerHaptic(20);

    if (currentIndex < photos.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      sound.playChime();
      onComplete();
    }
  };

  return (
    <div className="relative w-full h-full bg-zinc-950 flex flex-col justify-between p-6 select-none overflow-hidden">
      <AnimatePresence mode="wait">
        {!hasStarted ? (
          <motion.div
            key="intro-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1 flex flex-col items-center justify-center text-center px-6 gap-5 my-auto"
          >
            <span className="text-xs font-mono uppercase tracking-widest text-zinc-500">
              Through Roshan's Eyes
            </span>

            <div className="space-y-2">
              <h2 className="font-serif text-2xl text-zinc-200 font-light leading-snug">
                “Nee unna epdi paakura nu enakku theriyathu…”
              </h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.8 }}
                className="font-serif text-xl text-rose-300 font-light italic"
              >
                “but… naan unna epdi paakuren nu konjam kaamikiren.”
              </motion.p>
            </div>

            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.2 }}
              onClick={() => {
                sound.playTouch();
                setHasStarted(true);
              }}
              className="mt-6 py-3.5 px-8 rounded-full bg-zinc-900 border border-zinc-700/80 text-zinc-100 text-xs tracking-wider uppercase font-sans hover:border-rose-400 active:scale-95 transition-all shadow-lg"
            >
              Paaru 👀
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            key="photo-stack"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex flex-col justify-between py-2"
          >
            {/* Top Indicator */}
            <div className="flex items-center justify-between text-zinc-500 text-xs font-mono pt-safe">
              <span>{currentIndex + 1} of {photos.length}</span>
              <span className="text-rose-400">swipe or tap next</span>
            </div>

            {/* Polaroid / Photo Card */}
            <div className="relative w-full flex-1 flex flex-col items-center justify-center my-3">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentPhoto.id}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  onDragEnd={(_e, info) => {
                    if (info.offset.x < -60) {
                      handleNext();
                    }
                  }}
                  initial={{ opacity: 0, scale: 0.92, rotate: -2 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.92, x: -100 }}
                  transition={{ duration: 0.4 }}
                  className="w-full max-w-[310px] bg-zinc-900/90 rounded-3xl p-3.5 border border-zinc-800 shadow-2xl flex flex-col gap-3"
                >
                  {/* Photo frame */}
                  <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden bg-black">
                    <img
                      src={currentPhoto.image}
                      alt={currentPhoto.caption}
                      className="w-full h-full object-cover object-top"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                  </div>

                  {/* Caption & observation */}
                  <div className="px-2 py-1 flex flex-col gap-1 text-left">
                    <h4 className="font-serif text-lg text-zinc-100 font-medium">
                      {currentPhoto.caption}
                    </h4>
                    {currentPhoto.subtext && (
                      <p className="text-xs text-zinc-400 font-sans leading-relaxed whitespace-pre-line">
                        {currentPhoto.subtext}
                      </p>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Next Button */}
            <div className="pb-safe">
              <button
                onClick={handleNext}
                className="w-full py-3.5 rounded-2xl bg-zinc-900 border border-zinc-700/80 text-zinc-100 text-xs tracking-wider uppercase flex items-center justify-center gap-2 active:scale-98 transition-all shadow-md font-sans"
              >
                <span>{isLast ? "Next memory" : "Next photo"}</span>
                <ChevronRight className="w-4 h-4 text-rose-400" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
