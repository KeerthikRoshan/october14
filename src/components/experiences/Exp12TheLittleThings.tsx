import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, Heart } from 'lucide-react';
import { loveStory, type LittleThing } from '../../data/loveStory';
import { sound } from '../../utils/sound';

interface Exp12TheLittleThingsProps {
  onComplete: () => void;
}

export const Exp12TheLittleThings: React.FC<Exp12TheLittleThingsProps> = ({ onComplete }) => {
  const [selectedThing, setSelectedThing] = useState<LittleThing | null>(null);
  const [openedIds, setOpenedIds] = useState<Set<string>>(new Set());

  const handleBubbleClick = (thing: LittleThing) => {
    sound.playPop();
    setSelectedThing(thing);
    setOpenedIds(prev => new Set([...prev, thing.id]));
  };

  const closeDialog = () => {
    sound.playTouch();
    setSelectedThing(null);
  };

  const hasExploredEnough = openedIds.size >= 3;

  return (
    <div className="relative w-full h-full bg-zinc-950 flex flex-col justify-between p-6 select-none overflow-hidden font-sans">
      {/* Header */}
      <div className="text-center pt-safe z-10">
        <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-500">
          Small Details
        </span>
        <h3 className="font-serif text-lg md:text-xl text-zinc-200 mt-1 leading-snug">
          Things you probably don't realize I notice…
        </h3>
        <p className="text-xs text-zinc-500 font-sans mt-0.5">
          Tap the bubbles to discover
        </p>
      </div>

      {/* Floating Bubbles Cloud */}
      <div className="flex-1 flex flex-wrap items-center justify-center content-center gap-3 my-3 px-2">
        {loveStory.littleThings.map((thing, index) => {
          const isOpened = openedIds.has(thing.id);

          return (
            <motion.button
              key={thing.id}
              onClick={() => handleBubbleClick(thing)}
              animate={{
                y: [0, (index % 2 === 0 ? -5 : 5), 0],
              }}
              transition={{
                duration: 3 + (index % 3),
                repeat: Infinity,
                ease: 'easeInOut',
                delay: index * 0.2
              }}
              whileTap={{ scale: 0.92 }}
              className={`px-4 py-2.5 rounded-full border text-xs flex items-center gap-2 backdrop-blur-md transition-all shadow-md ${
                isOpened
                  ? 'bg-rose-950/40 border-rose-500/40 text-rose-200'
                  : 'bg-zinc-900/80 border-zinc-800 text-zinc-300 hover:border-zinc-700'
              }`}
            >
              <span>{thing.emoji}</span>
              <span className="font-medium tracking-tight">{thing.title}</span>
              {isOpened && <Heart className="w-2.5 h-2.5 text-rose-400 fill-rose-500" />}
            </motion.button>
          );
        })}
      </div>

      {/* Expanded Modal */}
      <AnimatePresence>
        {selectedThing && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/75 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 15 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-sm max-h-[82vh] bg-zinc-900 border border-zinc-700/80 rounded-3xl p-6 shadow-2xl flex flex-col gap-3.5 text-left overflow-y-auto no-scrollbar"
            >
              <button
                onClick={closeDialog}
                className="absolute top-4 right-4 p-1.5 rounded-full bg-zinc-800 text-zinc-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-2">
                <span className="text-2xl">{selectedThing.emoji}</span>
                <h4 className="font-serif text-lg text-rose-300 font-medium">
                  {selectedThing.title}
                </h4>
              </div>

              <p className="text-sm text-zinc-200 font-sans leading-relaxed whitespace-pre-line">
                {selectedThing.message}
              </p>

              <button
                onClick={closeDialog}
                className="w-full mt-2 py-2.5 rounded-xl bg-zinc-800 text-xs font-medium text-zinc-200 hover:text-white transition-colors"
              >
                Awww okay 😂
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Bottom Action */}
      <div className="pb-safe flex flex-col items-center gap-2">
        {hasExploredEnough ? (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={() => {
              sound.playTouch();
              onComplete();
            }}
            className="w-full py-3.5 rounded-2xl bg-zinc-900 border border-zinc-700/80 text-zinc-100 text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-lg active:scale-98 transition-all font-sans"
          >
            <span>Our Universe</span>
            <ArrowRight className="w-4 h-4 text-rose-400" />
          </motion.button>
        ) : (
          <p className="text-[11px] font-mono text-zinc-500">
            Tap a few more bubbles ({openedIds.size}/3)
          </p>
        )}
      </div>
    </div>
  );
};
