import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Send } from 'lucide-react';
import { loveStory } from '../../data/loveStory';
import { sound } from '../../utils/sound';

interface Exp04Oct17Props {
  onComplete: () => void;
}

export const Exp04Oct17: React.FC<Exp04Oct17Props> = ({ onComplete }) => {
  // Stage 0: 3 days later, Stage 1: 17.10.2025, Stage 2: Typing, Stage 3: "hi", Stage 4: "oru chinna doubt...", Stage 5: "luna na enna?", Stage 6: Reflection
  const [stage, setStage] = useState<number>(0);

  useEffect(() => {
    const t1 = setTimeout(() => setStage(1), 800);
    const t2 = setTimeout(() => setStage(2), 1600);
    const t3 = setTimeout(() => {
      sound.playTouch();
      sound.triggerHaptic(15);
      setStage(3);
    }, 2700);
    const t4 = setTimeout(() => {
      sound.playTouch();
      sound.triggerHaptic(20);
      setStage(4);
    }, 4100);
    const t5 = setTimeout(() => {
      sound.playTouch();
      sound.triggerHaptic(25);
      setStage(5);
    }, 5600);
    const t6 = setTimeout(() => {
      sound.playChime();
      setStage(6);
    }, 7000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
      clearTimeout(t6);
    };
  }, []);

  const handleFastForward = () => {
    if (stage < 6) {
      sound.playChime();
      setStage(6);
    }
  };

  return (
    <div 
      onClick={handleFastForward}
      className="relative w-full h-full bg-zinc-950 flex flex-col justify-between p-6 select-none overflow-hidden text-center font-sans"
    >
      {/* Top Header */}
      <div className="pt-safe z-10 space-y-1">
        <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-500">
          3 days later…
        </span>
        <h3 className="font-mono text-lg text-amber-300 font-semibold tracking-wider">
          17.10.2025
        </h3>
      </div>

      {/* Center Simulated Chat Box */}
      <div className="flex-1 flex flex-col items-center justify-center my-3 max-w-sm mx-auto w-full">
        {/* Simulated Chat Interface Container */}
        <div className="w-full bg-zinc-900/90 rounded-3xl border border-zinc-800 p-4 shadow-xl flex flex-col gap-3 text-left">
          {/* Chat Top bar */}
          <div className="flex items-center gap-2.5 pb-2 border-b border-zinc-800/80">
            <div className="w-8 h-8 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-xs font-mono text-rose-400 font-semibold">
              G
            </div>
            <div>
              <p className="text-xs font-medium text-zinc-100">{loveStory.herName}</p>
              <p className="text-[10px] text-zinc-500 font-mono">@gomzzz_14 • Direct Message</p>
            </div>
          </div>

          {/* Chat Messages Body */}
          <div className="min-h-[175px] flex flex-col justify-end gap-2 p-1">
            {stage >= 3 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.85, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ type: 'spring', damping: 15 }}
                className="self-end px-3.5 py-1.5 rounded-2xl rounded-br-sm bg-gradient-to-r from-rose-600 to-pink-600 text-white text-xs font-sans shadow-md"
              >
                <span>hi</span>
              </motion.div>
            )}

            {stage >= 4 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.85, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ type: 'spring', damping: 15 }}
                className="self-end max-w-[90%] px-3.5 py-2 rounded-2xl rounded-br-sm bg-gradient-to-r from-rose-600 to-pink-600 text-white text-xs font-sans leading-snug shadow-md text-right"
              >
                <span>oru chinna doubt atha maatum soldreengala.</span>
              </motion.div>
            )}

            {stage >= 5 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.85, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ type: 'spring', damping: 15 }}
                className="self-end max-w-[85%] px-4 py-2.5 rounded-2xl rounded-br-sm bg-gradient-to-r from-rose-600 to-pink-600 text-white text-xs font-medium shadow-md flex items-center gap-2"
              >
                <span>luna na enna? 👀</span>
                <Send className="w-3 h-3 opacity-80 shrink-0" />
              </motion.div>
            )}

            {stage === 2 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="self-end px-3 py-1.5 rounded-full bg-zinc-800 text-[10px] text-zinc-400 flex items-center gap-1.5"
              >
                <span>Roshan typing</span>
                <span className="flex gap-0.5">
                  <span className="w-1 h-1 bg-zinc-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                  <span className="w-1 h-1 bg-zinc-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                  <span className="w-1 h-1 bg-zinc-400 rounded-full animate-bounce" />
                </span>
              </motion.div>
            )}
          </div>
        </div>

        {/* Outside Chat Reflection */}
        {stage >= 6 && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mt-5 space-y-2 text-center px-2"
          >
            <p className="font-serif text-sm text-zinc-300 italic leading-relaxed">
              “enakum unakum theriyum ithu convo start panna thaan nu… 😂”
            </p>
            <p className="font-serif text-xs text-zinc-400 italic leading-relaxed">
              “enna opening ithu nu.. ippa yosicha enakae siripaa iruku.”
            </p>
            <p className="font-serif text-sm text-rose-300 font-light pt-0.5">
              “but ippa nenachalum nalla irukku ❤️”
            </p>
          </motion.div>
        )}
      </div>

      {/* Bottom Action */}
      <div className="pb-safe z-10">
        {stage >= 6 && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              sound.playTouch();
              onComplete();
            }}
            className="w-full py-3.5 rounded-2xl bg-zinc-900 border border-zinc-700/80 text-zinc-100 text-xs tracking-wider uppercase font-sans flex items-center justify-center gap-2 active:scale-98 transition-all shadow-md"
          >
            <span>What happened next</span>
            <ArrowRight className="w-4 h-4 text-rose-400" />
          </button>
        )}
      </div>
    </div>
  );
};
