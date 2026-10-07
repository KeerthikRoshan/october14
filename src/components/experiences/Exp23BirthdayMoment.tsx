import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { sound } from '../../utils/sound';

interface Exp23BirthdayMomentProps {
  onComplete: () => void;
}

export const Exp23BirthdayMoment: React.FC<Exp23BirthdayMomentProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState<'intro' | 'hold-wish' | 'ready-to-blow' | 'blackout'>('intro');
  const [wishProgress, setWishProgress] = useState<number>(0);
  const [isHolding, setIsHolding] = useState<boolean>(false);
  const holdIntervalRef = useRef<number | null>(null);

  useEffect(() => {
    const t = setTimeout(() => {
      setPhase('hold-wish');
    }, 2800);

    return () => {
      clearTimeout(t);
      if (holdIntervalRef.current) clearInterval(holdIntervalRef.current);
    };
  }, []);

  const startHoldWish = () => {
    if (phase !== 'hold-wish') return;
    setIsHolding(true);
    sound.triggerHaptic(20);

    const startTime = Date.now();
    const duration = 2500; // 2.5 seconds hold for wish

    if (holdIntervalRef.current) clearInterval(holdIntervalRef.current);

    holdIntervalRef.current = window.setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(100, (elapsed / duration) * 100);
      setWishProgress(progress);

      if (progress > 30 && progress % 20 < 5) {
        sound.triggerHaptic(15);
      }

      if (progress >= 100) {
        if (holdIntervalRef.current) clearInterval(holdIntervalRef.current);
        setIsHolding(false);
        sound.playChime();
        sound.triggerHaptic([40, 50]);
        setPhase('ready-to-blow');
      }
    }, 25);
  };

  const endHoldWish = () => {
    if (phase !== 'hold-wish') return;
    setIsHolding(false);
    if (wishProgress < 100) {
      if (holdIntervalRef.current) clearInterval(holdIntervalRef.current);
      setWishProgress(0);
    }
  };

  const blowOutCandle = () => {
    sound.playCandleBlow();
    setPhase('blackout');

    setTimeout(() => {
      onComplete();
    }, 1400);
  };

  return (
    <div className="relative w-full h-full bg-black flex flex-col justify-between p-6 select-none overflow-hidden text-center">
      {/* Blackout overlay */}
      <AnimatePresence>
        {phase === 'blackout' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black z-50 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 1.5, opacity: 1 }}
              animate={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="w-12 h-12 rounded-full bg-amber-400 blur-md"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dynamic Starlight */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-1000"
        style={{ opacity: isHolding ? wishProgress / 100 : 0.1 }}
      >
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-amber-200 animate-pulse"
            style={{
              width: `${(i % 3) + 1.5}px`,
              height: `${(i % 3) + 1.5}px`,
              top: `${(i * 31) % 90}%`,
              left: `${(i * 47) % 90}%`,
              animationDelay: `${i * 0.15}s`
            }}
          />
        ))}
      </div>

      {/* Header Messages */}
      <div className="pt-safe z-10 flex flex-col items-center">
        {phase === 'intro' ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-1"
          >
            <p className="font-serif text-lg text-zinc-400">Wait…</p>
            <p className="font-serif text-2xl text-zinc-100 font-light">
              Main matter-a marandhutom.
            </p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-1"
          >
            <span className="text-[10px] uppercase font-mono tracking-widest text-amber-400">
              Birthday Moment
            </span>
            <h3 className="font-serif text-3xl text-zinc-100 font-light">
              Birthday ponnu… wish panniko. ❤️
            </h3>
          </motion.div>
        )}
      </div>

      {/* Candle Graphic */}
      <div className="relative flex-1 flex flex-col items-center justify-center my-4">
        <div className="relative flex flex-col items-center">
          <motion.div
            animate={{
              scale: isHolding ? [1.2, 1.5, 1.2] : [1, 1.15, 1],
              opacity: isHolding ? [0.6, 0.9, 0.6] : [0.4, 0.6, 0.4]
            }}
            transition={{ repeat: Infinity, duration: 1.2 }}
            className="absolute -top-10 w-24 h-24 rounded-full bg-amber-500/25 blur-xl pointer-events-none"
          />

          <motion.div
            animate={{
              scaleY: [1, 1.12, 0.95, 1.05, 1],
              scaleX: [1, 0.96, 1.05, 0.98, 1],
            }}
            transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
            className="w-5 h-8 rounded-full bg-gradient-to-t from-amber-600 via-amber-400 to-amber-100 drop-shadow-[0_0_15px_rgba(251,191,36,0.9)] relative"
          >
            <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-blue-500/80" />
          </motion.div>

          <div className="w-0.5 h-2.5 bg-zinc-700" />

          <div className="w-8 h-28 rounded-t-sm bg-gradient-to-b from-rose-100 to-rose-200 border border-white/20 shadow-lg relative">
            <div className="absolute top-2 left-1 right-1 h-1 bg-white/40 rounded-full" />
          </div>
        </div>
      </div>

      {/* Bottom Area */}
      <div className="pb-safe z-10 flex flex-col items-center gap-3">
        {phase === 'hold-wish' && (
          <div
            onPointerDown={startHoldWish}
            onPointerUp={endHoldWish}
            onPointerLeave={endHoldWish}
            onPointerCancel={endHoldWish}
            className="w-full flex flex-col items-center gap-3 cursor-pointer select-none touch-none"
          >
            <div className="relative flex items-center justify-center">
              <svg className="w-20 h-20 -rotate-90">
                <circle
                  cx="40"
                  cy="40"
                  r="34"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  className="text-zinc-900"
                  fill="transparent"
                />
                <circle
                  cx="40"
                  cy="40"
                  r="34"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeDasharray={2 * Math.PI * 34}
                  strokeDashoffset={2 * Math.PI * 34 * (1 - wishProgress / 100)}
                  strokeLinecap="round"
                  className="text-amber-400 transition-all duration-75"
                  fill="transparent"
                />
              </svg>
              <span className="absolute text-[10px] font-mono text-zinc-300">
                {isHolding ? `${Math.round(wishProgress)}%` : "HOLD"}
              </span>
            </div>

            <p className="font-mono text-xs text-amber-300 uppercase tracking-wider">
              HOLD PANNI WISH PANNIKO
            </p>
          </div>
        )}

        {phase === 'ready-to-blow' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full flex flex-col items-center gap-2"
          >
            <p className="font-serif text-sm text-zinc-300">Wish pannitiya?</p>
            <p className="text-xs text-zinc-500 font-mono">Enna wish nu solla koodathu 👀</p>
            <button
              onClick={blowOutCandle}
              className="w-full mt-2 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 text-zinc-950 font-semibold text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-xl shadow-amber-950/40 active:scale-95 transition-all font-sans"
            >
              <Sparkles className="w-4 h-4" />
              <span>Candle off pannu 🕯️</span>
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};
