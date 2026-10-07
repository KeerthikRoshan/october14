import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { sound } from '../../utils/sound';

interface Exp06ChaosEraProps {
  onComplete: () => void;
}

export const Exp06ChaosEra: React.FC<Exp06ChaosEraProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState<'words' | 'counters' | 'conclusion'>('words');
  const [loveValue, setLoveValue] = useState<string>("loading…");

  const wordSequence = [
    "Pechu.",
    "Pechu.",
    "Pechu.",
    "Sanda.",
    "Pechu.",
    "Sanda.",
    "Kovam.",
    "Thirumba pechu.",
    "Again sanda.",
    "Again pechu. 😂"
  ];

  const [visibleWords, setVisibleWords] = useState<string[]>([]);

  useEffect(() => {
    // Reveal words rapidly
    wordSequence.forEach((w, i) => {
      setTimeout(() => {
        sound.triggerHaptic(15);
        setVisibleWords(prev => [...prev, w]);
      }, (i + 1) * 320);
    });

    const tCounters = setTimeout(() => {
      sound.playChime();
      setPhase('counters');
    }, 4200);

    const tLove = setTimeout(() => {
      sound.playPop();
      setLoveValue("∞ × ∞");
    }, 6200);

    const tConclusion = setTimeout(() => {
      setPhase('conclusion');
    }, 7800);

    return () => {
      clearTimeout(tCounters);
      clearTimeout(tLove);
      clearTimeout(tConclusion);
    };
  }, []);

  return (
    <div className="relative w-full h-full bg-zinc-950 flex flex-col justify-between p-6 select-none overflow-hidden text-center font-sans">
      {/* Top Header */}
      <div className="pt-safe z-10 space-y-1">
        <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-500">
          Daily Routine
        </span>
        <h3 className="font-serif text-2xl text-zinc-100 font-light">
          The Chaos Era 😂
        </h3>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center my-2 max-w-xs mx-auto w-full">
        {phase === 'words' && (
          <div className="flex flex-wrap items-center justify-center gap-2 max-w-[260px]">
            {visibleWords.map((w, idx) => (
              <motion.span
                key={idx}
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`text-xs font-mono px-2.5 py-1 rounded-full border ${
                  w.includes("Sanda") || w.includes("Kovam")
                    ? "bg-red-950/40 border-red-500/40 text-red-300"
                    : "bg-zinc-900 border-zinc-800 text-zinc-300"
                }`}
              >
                {w}
              </motion.span>
            ))}
          </div>
        )}

        {(phase === 'counters' || phase === 'conclusion') && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full flex flex-col gap-3"
          >
            {/* Stat Counters Card */}
            <div className="bg-zinc-900/90 border border-zinc-800 rounded-3xl p-5 shadow-2xl flex flex-col gap-2.5 text-left font-mono">
              <div className="flex justify-between items-center text-xs pb-1 border-b border-zinc-800">
                <span className="text-zinc-400">PECHU</span>
                <span className="text-emerald-400 font-bold text-sm">∞</span>
              </div>
              <div className="flex justify-between items-center text-xs pb-1 border-b border-zinc-800">
                <span className="text-zinc-400">SANDA</span>
                <span className="text-rose-400 font-bold text-sm">∞</span>
              </div>
              <div className="flex justify-between items-center text-xs pb-1 border-b border-zinc-800">
                <span className="text-zinc-400">OVERTHINKING</span>
                <span className="text-amber-400 font-bold text-sm">∞</span>
              </div>
              <div className="flex justify-between items-center text-xs pb-1 border-b border-zinc-800">
                <span className="text-zinc-400">KOVAM</span>
                <span className="text-red-400 font-bold text-sm">∞</span>
              </div>
              <div className="flex justify-between items-center text-xs pt-1">
                <span className="text-rose-300 font-semibold">LOVE</span>
                <span className="text-rose-400 font-bold text-base glow-text-rose">{loveValue}</span>
              </div>
            </div>

            {/* Reflection text */}
            {phase === 'conclusion' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-1.5 pt-2 text-center"
              >
                <p className="text-xs text-zinc-400 font-sans">
                  “Basically… namma normal-ah irukoma nu therila 😂”
                </p>
                <p className="font-serif text-base text-zinc-100 italic pt-1">
                  “Aana… oru vishayam mattum true.”
                </p>
              </motion.div>
            )}
          </motion.div>
        )}
      </div>

      {/* Bottom Action */}
      <div className="pb-safe z-10">
        {phase === 'conclusion' && (
          <button
            onClick={() => {
              sound.playTouch();
              onComplete();
            }}
            className="w-full py-3.5 rounded-2xl bg-zinc-900 border border-zinc-700/80 text-zinc-100 text-xs tracking-wider uppercase font-sans flex items-center justify-center gap-2 active:scale-98 transition-all shadow-md"
          >
            <span>What was true</span>
            <ArrowRight className="w-4 h-4 text-rose-400" />
          </button>
        )}
      </div>
    </div>
  );
};
