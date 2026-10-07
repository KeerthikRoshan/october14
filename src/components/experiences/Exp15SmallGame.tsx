import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { sound } from '../../utils/sound';

interface Exp15SmallGameProps {
  onComplete: () => void;
}

export const Exp15SmallGame: React.FC<Exp15SmallGameProps> = ({ onComplete }) => {
  const [qIndex, setQIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState<boolean>(false);
  const [trickPhase, setTrickPhase] = useState<'normal' | 'disappearing' | 'revealed'>('normal');

  const quiz = [
    {
      question: "First message yaaru pannadhu?",
      options: ["Roshan", "Mathi"],
      correct: 0,
      note: "Obviously naan thaan 😂"
    },
    {
      question: "Namma first cute message enna?",
      options: ["Hi", "Happy Birthday", "Luna na enna?", "Hey"],
      correct: 2,
      note: "“Luna na enna? 😂” — Legendary opening."
    },
    {
      question: "Crush first yaaru sonna?",
      options: ["Roshan", "Mathi"],
      correct: 0,
      note: "Naan thaan 02.11.2025-la risk eduthen 😌"
    },
    {
      question: "Roshan-ku Mathi-kitta romba pudichadhu enna?",
      options: ["Smile", "Voice", "Character", "Eyes"],
      correct: 0,
      note: "",
      isTrick: true
    }
  ];

  const currentQ = quiz[qIndex];
  const isFinal = qIndex === quiz.length - 1;

  const handleSelect = (idx: number) => {
    if (showAnswer || trickPhase !== 'normal') return;

    sound.playTouch();
    sound.triggerHaptic(20);
    setSelectedOption(idx);

    if (currentQ.isTrick) {
      setTrickPhase('disappearing');

      setTimeout(() => {
        sound.playChime();
        sound.triggerHaptic([30, 40, 50]);
        setTrickPhase('revealed');
      }, 1400);
      return;
    }

    setShowAnswer(true);
    sound.playChime();
  };

  const handleNext = () => {
    sound.playTouch();
    if (qIndex < quiz.length - 1) {
      setQIndex(prev => prev + 1);
      setSelectedOption(null);
      setShowAnswer(false);
    } else {
      onComplete();
    }
  };

  return (
    <div className="relative w-full h-full bg-zinc-950 flex flex-col justify-between p-6 select-none overflow-hidden font-sans">
      {/* Header */}
      <div className="text-center pt-safe z-10 space-y-1">
        <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-500">
          Chinna Test ({qIndex + 1}/{quiz.length})
        </span>
        <h3 className="font-serif text-lg text-zinc-200">
          Unakku namma pathi evlo theriyum?
        </h3>
      </div>

      {/* Main Question Area */}
      <div className="flex-1 flex flex-col justify-center my-4 max-w-sm mx-auto w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={qIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex flex-col gap-4"
          >
            {/* Question Text */}
            <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 text-center">
              <h4 className="font-serif text-xl text-zinc-100 font-normal leading-snug">
                “{currentQ.question}”
              </h4>
            </div>

            {/* Options */}
            {trickPhase !== 'revealed' ? (
              <motion.div
                animate={trickPhase === 'disappearing' ? { opacity: 0, scale: 0.85, y: -20 } : { opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="flex flex-col gap-2.5"
              >
                {currentQ.options.map((opt, idx) => {
                  const isSelected = selectedOption === idx;
                  const isCorrect = idx === currentQ.correct;

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelect(idx)}
                      disabled={showAnswer}
                      className={`w-full p-3.5 rounded-2xl border text-xs text-left flex items-center justify-between active:scale-[0.98] transition-all ${
                        showAnswer && isCorrect
                          ? 'bg-emerald-950/40 border-emerald-500 text-emerald-200'
                          : showAnswer && isSelected
                          ? 'bg-rose-950/30 border-rose-500/50 text-rose-200'
                          : 'bg-zinc-900 border-zinc-800 text-zinc-200 hover:border-zinc-700'
                      }`}
                    >
                      <span className="font-medium">{opt}</span>
                      {showAnswer && isCorrect && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      )}
                    </button>
                  );
                })}
              </motion.div>
            ) : (
              /* Trick Reveal: "MATHI" */
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-8 flex flex-col items-center justify-center text-center gap-3"
              >
                <span className="text-zinc-500 text-xs font-mono line-through">
                  Smile / Voice / Character / Eyes
                </span>
                <p className="font-serif text-xl text-zinc-400 italic">
                  Wrong.
                </p>
                <p className="text-xs text-zinc-500 font-mono">
                  Actually… question-e wrong.
                </p>
                <p className="text-xs text-zinc-400 mt-2">
                  Enakku pudichadhu…
                </p>
                <h3 className="font-serif text-4xl text-rose-300 font-bold tracking-wider glow-text-rose">
                  MATHI. ❤️
                </h3>
              </motion.div>
            )}

            {/* Answer Explanation */}
            {showAnswer && !currentQ.isTrick && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-zinc-300 italic text-center font-serif"
              >
                {currentQ.note}
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Nav */}
      <div className="pb-safe">
        {(showAnswer || trickPhase === 'revealed') && (
          <button
            onClick={handleNext}
            className="w-full py-3.5 rounded-2xl bg-zinc-900 border border-zinc-700/80 text-zinc-100 text-xs tracking-wider uppercase flex items-center justify-center gap-2 active:scale-98 transition-all shadow-md font-sans"
          >
            <span>{isFinal ? "Next chapter" : "Next question"}</span>
            <ArrowRight className="w-4 h-4 text-rose-400" />
          </button>
        )}
      </div>
    </div>
  );
};
