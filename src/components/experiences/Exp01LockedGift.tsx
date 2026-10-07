import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';
import { loveStory } from '../../data/loveStory';
import { sound } from '../../utils/sound';

interface Exp01LockedGiftProps {
  onComplete: () => void;
}

interface FloatingHeart {
  id: number;
  left: number;
  size: number;
  delay: number;
  duration: number;
  rotate: number;
  color: string;
}

export const Exp01LockedGift: React.FC<Exp01LockedGiftProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState<'initial-dot' | 'greeting' | 'holding-prompt' | 'checking' | 'confirmed' | 'enter'>('initial-dot');
  const [holdProgress, setHoldProgress] = useState<number>(0);
  const [isHolding, setIsHolding] = useState<boolean>(false);
  const [screenFlash, setScreenFlash] = useState<boolean>(false);
  const [hearts, setHearts] = useState<FloatingHeart[]>([]);
  const holdIntervalRef = useRef<number | null>(null);

  useEffect(() => {
    // Stage 1: Tiny glowing dot -> greeting
    const t1 = setTimeout(() => {
      setPhase('greeting');
    }, 1200);

    const t2 = setTimeout(() => {
      setPhase('holding-prompt');
    }, 4500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      if (holdIntervalRef.current) clearInterval(holdIntervalRef.current);
    };
  }, []);

  const startHold = () => {
    if (phase !== 'holding-prompt') return;
    setIsHolding(true);
    sound.triggerHaptic(20);

    const startTime = Date.now();
    const targetDuration = 2000; // 2 seconds

    if (holdIntervalRef.current) clearInterval(holdIntervalRef.current);

    holdIntervalRef.current = window.setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(100, (elapsed / targetDuration) * 100);
      setHoldProgress(progress);

      if (progress > 30 && progress % 20 < 5) {
        sound.triggerHaptic(15);
      }

      if (progress >= 100) {
        if (holdIntervalRef.current) clearInterval(holdIntervalRef.current);
        triggerUnlockSuccess();
      }
    }, 25);
  };

  const endHold = () => {
    if (phase !== 'holding-prompt') return;
    setIsHolding(false);
    if (holdProgress < 100) {
      if (holdIntervalRef.current) clearInterval(holdIntervalRef.current);
      setHoldProgress(0);
    }
  };

  const triggerUnlockSuccess = () => {
    setIsHolding(false);
    sound.playHeartbeat();
    setScreenFlash(true);

    // Heart shower from bottom to top
    const newHearts: FloatingHeart[] = Array.from({ length: 36 }, (_, i) => ({
      id: i,
      left: Math.random() * 88 + 6,
      size: Math.random() * 22 + 16,
      delay: Math.random() * 2.2,
      duration: Math.random() * 1.6 + 2.5,
      rotate: Math.random() * 60 - 30,
      color: ['#f43f5e', '#fb7185', '#fda4af', '#e11d48', '#ec4899', '#f43f5e'][i % 6],
    }));
    setHearts(newHearts);

    setTimeout(() => {
      setScreenFlash(false);
      setPhase('checking');
    }, 400);

    // Checking -> Confirmed -> Enter
    setTimeout(() => {
      sound.playChime();
      setPhase('confirmed');
    }, 2400);

    setTimeout(() => {
      setPhase('enter');
    }, 4600);

    setTimeout(() => {
      onComplete();
    }, 6600);
  };

  return (
    <div 
      onClick={() => {
        if (phase === 'confirmed' || phase === 'enter') {
          sound.playTouch();
          onComplete();
        }
      }}
      className="relative w-full h-full bg-black flex flex-col items-center justify-center p-6 text-center select-none overflow-hidden"
    >
      {/* Screen flash effect on unlock */}
      <AnimatePresence>
        {screenFlash && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.9 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="absolute inset-0 bg-rose-200 z-50 pointer-events-none"
          />
        )}
      </AnimatePresence>

      {/* Heart Shower from Bottom to Top */}
      {hearts.length > 0 && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-30">
          {hearts.map((h) => (
            <motion.div
              key={h.id}
              initial={{
                y: '105vh',
                x: `${h.left}vw`,
                opacity: 0,
                scale: 0.5,
                rotate: h.rotate,
              }}
              animate={{
                y: '-20vh',
                opacity: [0, 0.95, 0.95, 0],
                scale: [0.5, 1.15, 1],
                rotate: [h.rotate, h.rotate + (h.id % 2 === 0 ? 35 : -35)],
              }}
              transition={{
                duration: h.duration,
                delay: h.delay,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              className="absolute bottom-0 left-0"
            >
              <Heart
                style={{
                  width: `${h.size}px`,
                  height: `${h.size}px`,
                  color: h.color,
                  fill: h.color,
                  filter: 'drop-shadow(0 0 10px rgba(244,63,94,0.7))',
                }}
              />
            </motion.div>
          ))}
        </div>
      )}

      {/* PHASE: Initial Dot */}
      {phase === 'initial-dot' && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [1, 1.4, 1], opacity: [0.3, 1, 0.4] }}
          transition={{ repeat: Infinity, duration: 2.4 }}
          className="w-3 h-3 rounded-full bg-rose-400 glow-rose"
        />
      )}

      {/* PHASE: Greeting Sequence */}
      {phase === 'greeting' && (
        <motion.div
          key="greeting-text"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center gap-3 max-w-xs"
        >
          <div className="w-2 h-2 rounded-full bg-rose-400/80 mb-1 glow-rose animate-pulse" />
          <p className="font-serif text-2xl tracking-wide text-zinc-100 font-light">
            Heyy…
          </p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.7 }}
            className="text-rose-300 font-handwriting text-3xl font-semibold italic"
          >
            {loveStory.nickname} 👀
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8, duration: 0.7 }}
            className="text-zinc-300 text-sm tracking-wide font-sans font-light"
          >
            Unakkaga onnu vechiruken…
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.7, duration: 0.7 }}
            className="text-zinc-500 text-xs tracking-wider font-mono"
          >
            Aana summa apdiye kuduthura maaten 😌
          </motion.p>
        </motion.div>
      )}

      {/* PHASE: Holding to unlock */}
      {phase === 'holding-prompt' && (
        <motion.div
          key="holding-area"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center justify-center gap-6 w-full max-w-xs"
        >
          <div className="space-y-1">
            <p className="font-serif text-xl text-zinc-100">
              Identity verification
            </p>
            <p className="text-xs text-rose-400/90 tracking-wider font-mono uppercase">
              HOLD PANNU
            </p>
          </div>

          {/* Interactive Sensor */}
          <div
            className="relative flex items-center justify-center cursor-pointer select-none touch-none my-3"
            onPointerDown={startHold}
            onPointerUp={endHold}
            onPointerLeave={endHold}
            onPointerCancel={endHold}
          >
            {/* SVG Circular Progress Ring */}
            <svg className="w-32 h-32 -rotate-90">
              <circle
                cx="64"
                cy="64"
                r="56"
                stroke="currentColor"
                strokeWidth="2.5"
                className="text-zinc-900"
                fill="transparent"
              />
              <circle
                cx="64"
                cy="64"
                r="56"
                stroke="currentColor"
                strokeWidth="3.5"
                strokeDasharray={2 * Math.PI * 56}
                strokeDashoffset={2 * Math.PI * 56 * (1 - holdProgress / 100)}
                strokeLinecap="round"
                className="text-rose-500 transition-all duration-75 ease-linear drop-shadow-[0_0_12px_rgba(244,63,94,0.8)]"
                fill="transparent"
              />
            </svg>

            {/* Glowing Heart Core */}
            <motion.div
              animate={isHolding ? { scale: [1, 1.15, 1], transition: { repeat: Infinity, duration: 0.6 } } : { scale: 1 }}
              className={`absolute inset-4 rounded-full flex flex-col items-center justify-center transition-all duration-300 ${
                isHolding
                  ? 'bg-rose-500/20 shadow-[0_0_35px_rgba(244,63,94,0.5)] border border-rose-500/40'
                  : 'bg-zinc-900/80 border border-zinc-800 shadow-inner'
              }`}
            >
              <Heart
                className={`w-9 h-9 transition-colors duration-300 ${
                  isHolding ? 'text-rose-400 fill-rose-500/70' : 'text-zinc-400'
                }`}
              />
              <span className="text-[10px] mt-1 font-mono tracking-widest text-zinc-400">
                {isHolding ? `${Math.round(holdProgress)}%` : 'HOLD'}
              </span>
            </motion.div>
          </div>

          <p className="text-zinc-500 text-xs italic font-serif opacity-80">
            thumb vechu hold pannu
          </p>
        </motion.div>
      )}

      {/* PHASE: Checking */}
      {phase === 'checking' && (
        <motion.div
          key="checking-msg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center gap-3"
        >
          <span className="text-xs uppercase tracking-widest text-zinc-500 font-mono animate-pulse">
            Checking…
          </span>
          <p className="font-serif text-2xl text-zinc-200">
            {loveStory.herName} ah? 🤨
          </p>
          <span className="text-xs text-zinc-600 font-mono mt-2">
            Scanning biometric fingerprint…
          </span>
        </motion.div>
      )}

      {/* PHASE: Confirmed */}
      {phase === 'confirmed' && (
        <motion.div
          key="confirmed-msg"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs uppercase tracking-widest text-emerald-400 font-mono">
            Hmm… Confirmed.
          </span>
          <h2 className="font-serif text-3xl md:text-4xl text-rose-300 font-light mt-1 drop-shadow-md">
            En Mathi thaan. ❤️
          </h2>
        </motion.div>
      )}

      {/* PHASE: Enter */}
      {phase === 'enter' && (
        <motion.div
          key="enter-msg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center gap-2"
        >
          <p className="text-zinc-400 text-sm font-light">Seri vaa…</p>
          <p className="font-serif text-2xl text-zinc-100 tracking-wide font-light">
            Konjam pinnadi polam.
          </p>
        </motion.div>
      )}
    </div>
  );
};
