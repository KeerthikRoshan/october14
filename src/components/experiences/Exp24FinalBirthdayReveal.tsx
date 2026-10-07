import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { loveStory } from '../../data/loveStory';
import { sound } from '../../utils/sound';

interface Exp24FinalBirthdayRevealProps {
  onComplete: () => void;
}

export const Exp24FinalBirthdayReveal: React.FC<Exp24FinalBirthdayRevealProps> = ({ onComplete }) => {
  const [stage, setStage] = useState<number>(0);

  useEffect(() => {
    sound.playChime();
    const t1 = setTimeout(() => setStage(1), 1200);
    const t2 = setTimeout(() => setStage(2), 2600);
    const t3 = setTimeout(() => setStage(3), 4800);
    const t4 = setTimeout(() => setStage(4), 7000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, []);

  return (
    <div className="relative w-full h-full bg-zinc-950 flex flex-col justify-between p-6 select-none overflow-hidden text-center font-serif">
      <div className="absolute inset-0 bg-gradient-to-b from-rose-950/20 via-black to-zinc-950 pointer-events-none" />

      {/* Main Photo & Birthday Blessing */}
      <div className="flex-1 flex flex-col items-center justify-center my-4 z-10 gap-3">
        {/* Real Gomathi Photo emerges */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4 }}
          className="relative w-full max-w-[270px] aspect-[4/5] rounded-3xl overflow-hidden border-2 border-rose-500/30 shadow-[0_0_50px_rgba(244,63,94,0.3)] bg-black"
        >
          <img
            src={loveStory.photos.finalBirthdayPhoto}
            alt="Gomathi Birthday"
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
        </motion.div>

        {/* Text Sequence */}
        <div className="space-y-1 max-w-xs">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-xs font-mono uppercase tracking-widest text-zinc-400"
          >
            Happy Birthday…
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4 }}
            className="font-serif text-3xl md:text-4xl text-rose-300 font-light drop-shadow-md"
          >
            {loveStory.herName} ❤️
          </motion.h2>

          {stage >= 2 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="pt-2 text-xs text-zinc-300 font-sans leading-relaxed space-y-0.5"
            >
              <p>Happy-ah iru.</p>
              <p>Unakku pudichadha pannu.</p>
              <p>Neraya sirichite iru.</p>
              <p>Un dreams ellam achieve pannu.</p>
              <p>Ellame nalla nadakanum.</p>
            </motion.div>
          )}

          {stage >= 3 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="pt-1 text-xs text-zinc-400 font-mono"
            >
              <p>And… enkooda konjam kammiya sanda podu. 😭</p>
              <p className="text-zinc-500 pt-0.5">(Okay. Adhu nadakathu 😂)</p>
            </motion.div>
          )}

          {stage >= 4 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="pt-2 space-y-0.5"
            >
              <p className="text-xs text-zinc-400 font-sans">Love you…</p>
              <h3 className="font-serif text-2xl text-rose-300 font-medium">
                {loveStory.nickname} ❤️
              </h3>
              <p className="text-[11px] text-zinc-400 font-serif italic pt-0.5">
                “More than our sanda. More than I probably say.”
              </p>
            </motion.div>
          )}
        </div>
      </div>

      {/* Bottom Action */}
      <div className="pb-safe z-10">
        {stage >= 4 && (
          <button
            onClick={() => {
              sound.playTouch();
              onComplete();
            }}
            className="w-full py-3.5 rounded-2xl bg-zinc-900 border border-zinc-700/80 text-zinc-100 text-xs tracking-wider uppercase font-sans flex items-center justify-center gap-2 active:scale-98 transition-all shadow-md"
          >
            <span>Our ending</span>
            <ArrowRight className="w-4 h-4 text-rose-400" />
          </button>
        )}
      </div>
    </div>
  );
};
