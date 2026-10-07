import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, ArrowRight } from 'lucide-react';
import { loveStory } from '../../data/loveStory';
import { sound } from '../../utils/sound';

interface Exp22FutureCameraRollProps {
  onComplete: () => void;
}

export const Exp22FutureCameraRoll: React.FC<Exp22FutureCameraRollProps> = ({ onComplete }) => {
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  const handleSlotClick = (title: string) => {
    sound.playTouch();
    sound.triggerHaptic(15);
    setSelectedSlot(title);
  };

  return (
    <div className="relative w-full h-full bg-zinc-950 flex flex-col justify-between p-6 select-none overflow-hidden font-sans">
      {/* Header */}
      <div className="text-center pt-safe z-10 space-y-0.5">
        <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-500">
          Future Album
        </span>
        <h3 className="font-serif text-2xl text-zinc-100">
          Our Future Camera Roll
        </h3>
        <p className="text-xs text-zinc-400 font-sans">
          Reserved slots waiting for us
        </p>
      </div>

      {/* Grid of Slots */}
      <div className="flex-1 overflow-y-auto no-scrollbar py-3 grid grid-cols-2 gap-2.5 content-start">
        {loveStory.futureFrames.map((slot, idx) => {
          const isSelected = selectedSlot === slot.title;

          return (
            <motion.div
              key={idx}
              whileTap={{ scale: 0.96 }}
              onClick={() => handleSlotClick(slot.title)}
              className={`aspect-square rounded-2xl border-2 border-dashed flex flex-col items-center justify-center p-3 text-center cursor-pointer transition-all ${
                isSelected
                  ? 'border-rose-500 bg-rose-950/40'
                  : slot.isKuttyMathi
                  ? 'border-amber-500/40 bg-amber-950/10 hover:border-amber-500'
                  : 'border-zinc-800 bg-zinc-900/40 hover:border-zinc-700'
              }`}
            >
              <span className="text-xl mb-1">{slot.isKuttyMathi ? "👶" : "📷"}</span>
              <h5 className="text-[11px] font-medium text-zinc-200 line-clamp-2">
                {slot.title}
              </h5>
              <span className="text-[9px] text-zinc-500 font-mono mt-0.5">
                {slot.sub}
              </span>
              <div className="mt-1 flex items-center gap-0.5 text-[9px] text-rose-400 font-mono">
                <Plus className="w-2.5 h-2.5" />
                <span>Reserved</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Playful Tanglish declaration about 3 kutty Mathi */}
      <div className="py-2 text-center space-y-1">
        <p className="font-mono text-xs text-amber-300">
          Okay okay… romba future-ku poitom 😂
        </p>
        <p className="font-serif text-sm text-rose-300 font-light italic">
          “but… Enakku 3 kutty Mathi venum… unnamariye. ❤️”
        </p>
        <p className="text-[10px] text-zinc-500 font-mono">
          Indha empty frames ellam oru naal real memories-ah fill pannanum.
        </p>
      </div>

      {/* Bottom Action */}
      <div className="pb-safe">
        <button
          onClick={() => {
            sound.playTouch();
            onComplete();
          }}
          className="w-full py-3.5 rounded-2xl bg-zinc-900 border border-zinc-700/80 text-zinc-100 text-xs tracking-wider uppercase flex items-center justify-center gap-2 active:scale-98 transition-all shadow-md font-sans"
        >
          <span>Main birthday moment</span>
          <ArrowRight className="w-4 h-4 text-rose-400" />
        </button>
      </div>
    </div>
  );
};
