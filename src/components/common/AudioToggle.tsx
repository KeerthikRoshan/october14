import React, { useState, useEffect } from 'react';
import { VolumeX } from 'lucide-react';
import { sound } from '../../utils/sound';
import { loveStory } from '../../data/loveStory';

export const AudioToggle: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  useEffect(() => {
    // Check initial state
    setIsPlaying(sound.getIsPlaying());
  }, []);

  const handleToggle = () => {
    const nextState = sound.toggleSoundtrack(loveStory.audio.url);
    setIsPlaying(nextState);
  };

  return (
    <button
      onClick={handleToggle}
      aria-label="Toggle Soundtrack"
      className="fixed top-safe right-4 z-50 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-900/70 backdrop-blur-md border border-white/10 text-xs text-zinc-300 hover:text-white transition-all active:scale-95 shadow-lg select-none"
    >
      {isPlaying ? (
        <>
          <div className="flex items-center gap-0.5 h-3">
            <span className="w-0.5 h-3 bg-rose-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
            <span className="w-0.5 h-2 bg-rose-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
            <span className="w-0.5 h-3.5 bg-rose-400 rounded-full animate-bounce" />
          </div>
          <span className="text-[11px] font-medium tracking-tight text-rose-300/90 font-serif">♪ soundtrack</span>
        </>
      ) : (
        <>
          <VolumeX className="w-3.5 h-3.5 text-zinc-400" />
          <span className="text-[11px] font-medium text-zinc-400">sound</span>
        </>
      )}
    </button>
  );
};
