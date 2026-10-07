import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ArrowRight, Camera } from 'lucide-react';
import { loveStory } from '../../data/loveStory';
import { sound } from '../../utils/sound';

interface Exp16AiPhotosProps {
  onComplete: () => void;
}

export const Exp16AiPhotos: React.FC<Exp16AiPhotosProps> = ({ onComplete }) => {
  // Step: 0 = Intro "Konjam cheating...", 1 = AI photo carousel, 2 = The Empty Polaroid
  const [step, setStep] = useState<number>(0);
  const [photoIndex, setPhotoIndex] = useState<number>(0);

  const aiPhotos = loveStory.aiCouplePhotos;

  const handleNextPhoto = () => {
    sound.playTouch();
    if (photoIndex < aiPhotos.length - 1) {
      setPhotoIndex(prev => prev + 1);
    } else {
      sound.playChime();
      setStep(2); // Move to the Empty Polaroid
    }
  };

  return (
    <div className="relative w-full h-full bg-zinc-950 flex flex-col justify-between p-6 select-none overflow-hidden font-sans">
      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div
            key="ai-intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex flex-col items-center justify-center text-center px-6 gap-5 my-auto"
          >
            <span className="text-xs font-mono uppercase tracking-widest text-zinc-500">
              Full Honesty
            </span>

            <div className="space-y-3">
              <h2 className="font-serif text-3xl text-zinc-100 font-light">
                “Konjam cheating panniruken 👀”
              </h2>
              <p className="text-xs text-zinc-400 font-sans">
                Indha photos… real illa. Idhuvum illa 😂
              </p>
              <p className="font-serif text-xl text-rose-300 font-light italic pt-2">
                “Aana idhula irukkura wish… 100% real.”
              </p>
            </div>

            <button
              onClick={() => {
                sound.playTouch();
                setStep(1);
              }}
              className="mt-6 py-3.5 px-8 rounded-full bg-zinc-900 border border-zinc-700/80 text-zinc-100 text-xs tracking-wider uppercase hover:border-rose-400 active:scale-95 transition-all shadow-lg"
            >
              Photos we haven't taken yet
            </button>
          </motion.div>
        )}

        {step === 1 && (
          <motion.div
            key="ai-gallery"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex flex-col justify-between py-2"
          >
            <div className="text-center pt-safe">
              <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">
                Concept ({photoIndex + 1}/{aiPhotos.length})
              </span>
              <h3 className="font-serif text-xl text-zinc-200 mt-0.5">
                Photos We Haven't Taken Yet
              </h3>
            </div>

            {/* AI Photo Card */}
            <div className="relative w-full flex-1 flex flex-col items-center justify-center my-3">
              <motion.div
                key={aiPhotos[photoIndex].id}
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="w-full max-w-[310px] bg-zinc-900 rounded-3xl p-3.5 border border-zinc-800 shadow-2xl flex flex-col gap-2.5"
              >
                <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden bg-black">
                  <img
                    src={aiPhotos[photoIndex].image}
                    alt={aiPhotos[photoIndex].futureCaption}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                </div>
                <div className="px-1 text-left space-y-1">
                  <h4 className="font-serif text-lg text-rose-200 font-medium leading-snug">
                    {aiPhotos[photoIndex].futureCaption}
                  </h4>
                  {aiPhotos[photoIndex].note && (
                    <p className="text-xs text-zinc-300 font-sans leading-relaxed whitespace-pre-line italic">
                      “{aiPhotos[photoIndex].note}”
                    </p>
                  )}
                </div>
              </motion.div>
            </div>

            <div className="pb-safe">
              <button
                onClick={handleNextPhoto}
                className="w-full py-3.5 rounded-2xl bg-zinc-900 border border-zinc-700/80 text-zinc-100 text-xs tracking-wider uppercase flex items-center justify-center gap-2 active:scale-98 transition-all shadow-md font-sans"
              >
                <span>{photoIndex === aiPhotos.length - 1 ? "The most important one" : "Next concept photo"}</span>
                <ChevronRight className="w-4 h-4 text-rose-400" />
              </button>
            </div>
          </motion.div>
        )}

        {/* The Empty Polaroid - Climax of this section */}
        {step === 2 && (
          <motion.div
            key="empty-polaroid"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex flex-col justify-between py-2"
          >
            <div className="text-center pt-safe">
              <span className="text-[10px] font-mono uppercase tracking-widest text-rose-400">
                Reserved Slot
              </span>
            </div>

            {/* Empty Polaroid Card */}
            <div className="flex flex-col items-center justify-center my-auto max-w-[290px] mx-auto w-full">
              <div className="w-full aspect-[4/5] rounded-3xl bg-zinc-900/60 border-2 border-dashed border-rose-500/50 p-6 flex flex-col items-center justify-center text-center gap-4 shadow-2xl">
                <div className="w-16 h-16 rounded-full bg-rose-950/40 border border-rose-500/30 flex items-center justify-center">
                  <Camera className="w-8 h-8 text-rose-400" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-serif text-xl font-bold text-zinc-100 tracking-wide">
                    OUR FIRST REAL PHOTO
                  </h3>
                  <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest block">
                    Coming soon…
                  </span>
                </div>
              </div>

              {/* Emotional declaration */}
              <div className="mt-5 space-y-1.5 text-center">
                <p className="font-serif text-sm text-zinc-400 italic">
                  “Idhu mattum… AI generate panna koodathu.”
                </p>
                <h4 className="font-serif text-2xl text-rose-300 font-normal drop-shadow-md">
                  “Namma serndhu edukanum. ❤️”
                </h4>
              </div>
            </div>

            <div className="pb-safe">
              <button
                onClick={() => {
                  sound.playTouch();
                  onComplete();
                }}
                className="w-full py-3.5 rounded-2xl bg-zinc-900 border border-zinc-700/80 text-zinc-100 text-xs tracking-wider uppercase flex items-center justify-center gap-2 active:scale-98 transition-all shadow-md font-sans"
              >
                <span>A birthday gift</span>
                <ArrowRight className="w-4 h-4 text-rose-400" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
