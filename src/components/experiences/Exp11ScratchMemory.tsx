import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';
import { loveStory } from '../../data/loveStory';
import { sound } from '../../utils/sound';

interface Exp11ScratchMemoryProps {
  onComplete: () => void;
}

export const Exp11ScratchMemory: React.FC<Exp11ScratchMemoryProps> = ({ onComplete }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isRevealed, setIsRevealed] = useState<boolean>(false);
  const scratchAmount = useRef<number>(0);
  const isScratching = useRef<boolean>(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;
    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = '#18181b';
    ctx.fillRect(0, 0, width, height);

    ctx.font = '14px monospace';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.textAlign = 'center';
    ctx.fillText('scratch pannu 👀', width / 2, height / 2);
  }, []);

  const scratchAt = useCallback((x: number, y: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 36, 0, Math.PI * 2);
    ctx.fill();

    sound.triggerHaptic(12);

    scratchAmount.current += 1.2;
    if (scratchAmount.current >= 40 && !isRevealed) {
      handleFullReveal();
    }
  }, [isRevealed]);

  const handlePointerDown = (e: React.PointerEvent) => {
    isScratching.current = true;
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    scratchAt(e.clientX - rect.left, e.clientY - rect.top);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isScratching.current) return;
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    scratchAt(e.clientX - rect.left, e.clientY - rect.top);
  };

  const handlePointerUp = () => {
    isScratching.current = false;
  };

  const handleFullReveal = () => {
    if (isRevealed) return;
    setIsRevealed(true);
    sound.playChime();
  };

  return (
    <div className="relative w-full h-full bg-black flex flex-col justify-between select-none overflow-hidden">
      {/* Scratch Container */}
      <div
        ref={containerRef}
        className="relative w-full flex-1 overflow-hidden touch-none"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        <div className="absolute inset-0 flex items-center justify-center p-4 bg-zinc-950">
          <img
            src={loveStory.photos.scratchPhoto}
            alt="Memory to scratch"
            className="w-full max-h-[70%] object-contain rounded-2xl shadow-2xl transition-transform duration-700"
          />
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/50 pointer-events-none" />

        <canvas
          ref={canvasRef}
          className={`absolute inset-0 w-full h-full cursor-pointer transition-opacity duration-700 ${
            isRevealed ? 'opacity-0 pointer-events-none' : 'opacity-95'
          }`}
        />

        {/* Top Hint if not revealed */}
        {!isRevealed && (
          <div className="absolute top-12 left-0 right-0 flex flex-col items-center text-center px-6 pointer-events-none z-10">
            <span className="text-xs font-mono uppercase tracking-widest text-zinc-400">
              Hidden Memory
            </span>
            <p className="font-serif text-2xl text-zinc-100 mt-1">
              Idhu enna nu kandupidikiriya? 👀
            </p>
            <div className="mt-4 px-4 py-1.5 rounded-full bg-zinc-900/80 backdrop-blur-md border border-white/10 text-xs text-rose-300 flex items-center gap-1.5 shadow-lg">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Scratch pannu</span>
            </div>
          </div>
        )}

        {/* Revealed Drawer */}
        <AnimatePresence>
          {isRevealed && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="absolute bottom-6 left-6 right-6 p-5 rounded-3xl bg-zinc-950/90 backdrop-blur-md border border-white/10 shadow-2xl flex flex-col gap-2.5 text-left"
            >
              <span className="text-xs font-mono text-amber-300 tracking-wider">
                ● Special Memory
              </span>
              <p className="font-serif text-base text-zinc-100 italic leading-snug">
                “Unakku idhu just oru photo/screenshot-ah irukkalam…”
              </p>
              <p className="font-serif text-lg text-rose-300 font-light">
                “Enakku… konjam extra special.”
              </p>

              <button
                onClick={() => {
                  sound.playTouch();
                  onComplete();
                }}
                className="w-full mt-2 py-3 rounded-2xl bg-gradient-to-r from-rose-500 to-rose-600 text-white font-medium text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-lg shadow-rose-950/40 active:scale-98 transition-all font-sans"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {!isRevealed && (
        <div className="p-3 bg-zinc-950/90 border-t border-zinc-900 flex justify-center">
          <button
            onClick={handleFullReveal}
            className="text-xs text-zinc-500 hover:text-zinc-300 underline font-mono"
          >
            (tap to reveal memory completely)
          </button>
        </div>
      )}
    </div>
  );
};
