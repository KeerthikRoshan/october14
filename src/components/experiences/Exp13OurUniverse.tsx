import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, X, Sparkles, ArrowRight } from 'lucide-react';
import { loveStory, type StarMemory } from '../../data/loveStory';
import { sound } from '../../utils/sound';

interface Exp13OurUniverseProps {
  onComplete: () => void;
}

export const Exp13OurUniverse: React.FC<Exp13OurUniverseProps> = ({ onComplete }) => {
  const [selectedStar, setSelectedStar] = useState<StarMemory | null>(null);
  const [exploredStarIds, setExploredStarIds] = useState<Set<string>>(new Set());

  // Fixed coordinates for clean constellation placement
  const starCoords = [
    { top: 22, left: 24 },
    { top: 20, left: 74 },
    { top: 40, left: 50 },
    { top: 58, left: 22 },
    { top: 62, left: 78 },
    { top: 78, left: 50 },
  ];

  const handleStarClick = (star: StarMemory) => {
    sound.playChime();
    setSelectedStar(star);
    setExploredStarIds(prev => new Set([...prev, star.id]));
  };

  const closeStarModal = () => {
    sound.playTouch();
    setSelectedStar(null);
  };

  return (
    <div className="relative w-full h-full bg-black flex flex-col justify-between p-6 select-none overflow-hidden">
      {/* Background Starlight & Cosmos */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-950/30 via-black to-black pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none opacity-40">
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: `${(i % 3) + 1}px`,
              height: `${(i % 3) + 1}px`,
              top: `${(i * 37) % 95}%`,
              left: `${(i * 53) % 95}%`,
              opacity: (i % 5) * 0.2 + 0.2,
            }}
          />
        ))}
      </div>

      {/* Header Narrative */}
      <div className="text-center pt-safe z-10 space-y-1">
        <span className="text-[10px] font-mono uppercase tracking-widest text-indigo-300">
          Our Private World
        </span>
        <h3 className="font-serif text-lg text-zinc-100 font-light">
          Namma innum meet kooda pannala…
        </h3>
        <p className="font-serif text-xs text-rose-300 italic">
          “Aana ivlo memories enga store panrathu? So namakku nu oru place.”
        </p>
      </div>

      {/* Constellation Area */}
      <div className="relative w-full flex-1 my-2">
        {loveStory.universeStars.map((star, idx) => {
          const coords = starCoords[idx % starCoords.length];
          const isExplored = exploredStarIds.has(star.id);

          return (
            <motion.div
              key={star.id}
              style={{ top: `${coords.top}%`, left: `${coords.left}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.8, 1, 0.8],
              }}
              transition={{
                duration: 2.2 + (idx % 3) * 0.5,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: idx * 0.3,
              }}
            >
              <button
                onClick={() => handleStarClick(star)}
                className="relative group p-2 flex flex-col items-center focus:outline-none"
              >
                <span className={`absolute inset-0 rounded-full blur-md transition-all ${
                  isExplored ? 'bg-rose-500/30' : 'bg-amber-400/40'
                }`} />

                <Star
                  className={`w-6 h-6 drop-shadow-[0_0_10px_rgba(251,191,36,0.9)] ${
                    isExplored
                      ? 'text-rose-400 fill-rose-500/80'
                      : 'text-amber-300 fill-amber-300'
                  }`}
                />

                <span className="text-[9px] font-mono font-medium text-zinc-300 tracking-tight mt-1 whitespace-nowrap bg-black/60 px-2 py-0.5 rounded-full border border-white/10 backdrop-blur-sm">
                  {star.title}
                </span>
              </button>
            </motion.div>
          );
        })}
      </div>

      {/* Star Zoom Modal */}
      <AnimatePresence>
        {selectedStar && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 20 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="relative w-full max-w-xs bg-zinc-900 border border-amber-500/30 rounded-3xl p-6 shadow-[0_0_50px_rgba(245,158,11,0.2)] flex flex-col gap-3.5 text-left"
            >
              <button
                onClick={closeStarModal}
                className="absolute top-4 right-4 p-1.5 rounded-full bg-zinc-800 text-zinc-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-2">
                <span className="text-xl">{selectedStar.icon}</span>
                <div>
                  <h4 className="font-serif text-lg text-amber-200 font-medium">
                    {selectedStar.title}
                  </h4>
                  <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">
                    {selectedStar.dateOrTag}
                  </span>
                </div>
              </div>

              <p className="font-serif text-sm text-zinc-100 italic leading-relaxed whitespace-pre-line">
                {selectedStar.content}
              </p>

              <button
                onClick={closeStarModal}
                className="w-full mt-2 py-2.5 rounded-xl bg-zinc-800 border border-zinc-700/80 text-xs font-medium text-amber-300 hover:bg-zinc-700 transition-colors flex items-center justify-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Close star</span>
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Bottom Action */}
      <div className="pb-safe flex flex-col items-center gap-2 z-10">
        <button
          onClick={() => {
            sound.playTouch();
            onComplete();
          }}
          className="w-full py-3.5 rounded-2xl bg-zinc-900 border border-zinc-700/80 text-zinc-100 text-xs tracking-wider uppercase flex items-center justify-center gap-2 active:scale-98 transition-all shadow-md font-sans"
        >
          <span>Our Soundtrack</span>
          <ArrowRight className="w-4 h-4 text-amber-400" />
        </button>
        <span className="text-[10px] text-zinc-500 font-mono">
          {exploredStarIds.size} of {loveStory.universeStars.length} stars explored
        </span>
      </div>
    </div>
  );
};
