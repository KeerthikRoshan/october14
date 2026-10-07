import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, ArrowRight, Music } from 'lucide-react';
import { loveStory } from '../../data/loveStory';
import { sound } from '../../utils/sound';

interface Exp14OurSongProps {
  onComplete: () => void;
}

export const Exp14OurSong: React.FC<Exp14OurSongProps> = ({ onComplete }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(sound.getIsPlaying());

  const handlePlayToggle = () => {
    const nextState = sound.toggleSoundtrack(loveStory.audio.url);
    setIsPlaying(nextState);
  };

  return (
    <div className="relative w-full h-full bg-zinc-950 flex flex-col justify-between p-6 select-none overflow-hidden">
      {/* Background Glow */}
      <div className="absolute w-72 h-72 rounded-full bg-amber-500/5 blur-3xl pointer-events-none self-center" />

      {/* Header */}
      <div className="text-center pt-safe z-10 space-y-1">
        <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-500">
          Background Music
        </span>
        <h3 className="font-serif text-2xl text-zinc-100">
          Our Soundtrack
        </h3>
      </div>

      {/* Vinyl Record Player */}
      <div className="flex-1 flex flex-col items-center justify-center my-4 gap-6">
        {/* Spinning Vinyl Record Disc */}
        <div className="relative w-56 h-56 flex items-center justify-center">
          {/* Pulsing Aura when playing */}
          {isPlaying && (
            <div className="absolute inset-0 rounded-full bg-rose-500/15 blur-xl animate-pulse pointer-events-none" />
          )}

          <motion.div
            animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
            transition={isPlaying ? { repeat: Infinity, duration: 8, ease: 'linear' } : { duration: 0.5 }}
            className="w-full h-full rounded-full bg-zinc-900 border-[6px] border-zinc-800 shadow-[0_15px_35px_rgba(0,0,0,0.8)] flex items-center justify-center relative overflow-hidden"
          >
            <div className="absolute inset-4 rounded-full border border-zinc-800/60" />
            <div className="absolute inset-8 rounded-full border border-zinc-800/80" />
            <div className="absolute inset-12 rounded-full border border-zinc-800/60" />

            {/* Center Label */}
            <div className="relative w-22 h-22 rounded-full overflow-hidden border-2 border-rose-500/60 shadow-md bg-gradient-to-tr from-rose-950 via-zinc-900 to-zinc-950 flex flex-col items-center justify-center p-2 text-center select-none">
              <span className="text-[9px] font-mono text-rose-300 font-bold uppercase tracking-wider">14.06.2026</span>
              <span className="text-[7.5px] font-mono text-zinc-300 uppercase tracking-tight mt-0.5 font-semibold">MATHI × ROSHAN</span>
              <div className="w-2.5 h-2.5 rounded-full bg-zinc-950 border border-zinc-700 mt-1" />
            </div>
          </motion.div>
        </div>

        {/* Info & Tanglish Quote */}
        <div className="text-center space-y-2 max-w-xs px-4">
          <div className="space-y-1">
            <div className="flex items-center justify-center gap-2 text-rose-400 text-sm font-mono font-medium">
              <Music className="w-4 h-4" />
              <span>{loveStory.audio.title}</span>
            </div>
            {loveStory.audio.artist && (
              <p className="text-[11px] text-zinc-400 font-sans tracking-wide">
                {loveStory.audio.artist}
              </p>
            )}

            {/* Live Equalizer Animation */}
            {isPlaying && (
              <div className="flex items-center justify-center gap-1 pt-1 h-5">
                <span className="w-1 h-3 bg-rose-400 rounded-full animate-bounce [animation-delay:-0.4s]" />
                <span className="w-1 h-5 bg-rose-400 rounded-full animate-bounce [animation-delay:-0.2s]" />
                <span className="w-1 h-2 bg-rose-400 rounded-full animate-bounce [animation-delay:-0.5s]" />
                <span className="w-1 h-4 bg-rose-400 rounded-full animate-bounce [animation-delay:-0.1s]" />
                <span className="w-1 h-3 bg-rose-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
              </div>
            )}
          </div>
          <p className="font-serif text-sm text-zinc-300 italic pt-1 leading-snug">
            “Namma story-ku background music irundha… probably idhu thaan. ❤️”
          </p>
        </div>

        {/* Play / Pause Button */}
        <button
          onClick={handlePlayToggle}
          className={`flex items-center gap-2.5 px-6 py-3 rounded-full border text-xs font-sans text-zinc-100 shadow-xl active:scale-95 transition-all ${
            isPlaying 
              ? 'bg-rose-950/40 border-rose-500/50 shadow-rose-950/40' 
              : 'bg-zinc-900 hover:bg-zinc-800 border-zinc-700/80'
          }`}
        >
          {isPlaying ? (
            <>
              <Pause className="w-4 h-4 text-rose-400 fill-rose-400" />
              <span>Pause our song</span>
            </>
          ) : (
            <>
              <Play className="w-4 h-4 text-rose-400 fill-rose-400" />
              <span>Play our song</span>
            </>
          )}
        </button>
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
          <span>Small Game</span>
          <ArrowRight className="w-4 h-4 text-rose-400" />
        </button>
      </div>
    </div>
  );
};
