/**
 * Sound & Haptic Manager
 * Uses Web Audio API for zero-external-dependency romantic ambient piano music
 * and gentle procedural sound effects, plus navigator.vibrate for mobile haptics.
 */

class SoundManager {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private isMusicPlaying: boolean = false;
  private ambientTimer: number | null = null;
  private masterGain: GainNode | null = null;
  private customAudio: HTMLAudioElement | null = null;

  private initContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(0.4, this.ctx.currentTime);
        this.masterGain.connect(this.ctx.destination);
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  // --- Haptics ---
  public triggerHaptic(pattern: number | number[] = 25) {
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate(pattern);
      } catch {
        // Ignored on unsupported devices/browsers
      }
    }
  }

  // --- Sound Effects (Procedural Web Audio API) ---

  public playTouch() {
    if (this.isMuted) return;
    const ctx = this.initContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const now = ctx.currentTime;

    osc.type = 'sine';
    osc.frequency.setValueAtTime(420, now);
    osc.frequency.exponentialRampToValueAtTime(260, now + 0.05);

    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.06);
  }

  public playHeartbeat() {
    if (this.isMuted) return;
    const ctx = this.initContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    [0, 0.16].forEach((delay) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(80, now + delay);
      osc.frequency.exponentialRampToValueAtTime(45, now + delay + 0.12);

      gain.gain.setValueAtTime(0.25, now + delay);
      gain.gain.exponentialRampToValueAtTime(0.001, now + delay + 0.12);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + delay);
      osc.stop(now + delay + 0.13);
    });

    this.triggerHaptic([40, 60, 40]);
  }

  public playChime() {
    if (this.isMuted) return;
    const ctx = this.initContext();
    if (!ctx) return;

    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    const now = ctx.currentTime;

    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const t = now + idx * 0.08;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, t);

      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(0.15, t + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.9);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(t);
      osc.stop(t + 1.0);
    });

    this.triggerHaptic([30, 40, 50]);
  }

  public playEnvelope() {
    if (this.isMuted) return;
    const ctx = this.initContext();
    if (!ctx) return;

    // Soft paper whoosh using lowpass filtered white noise
    const bufferSize = ctx.sampleRate * 0.25;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(800, ctx.currentTime);
    filter.Q.setValueAtTime(1.5, ctx.currentTime);

    const gain = ctx.createGain();
    const now = ctx.currentTime;
    gain.gain.setValueAtTime(0.01, now);
    gain.gain.linearRampToValueAtTime(0.18, now + 0.06);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.24);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    noise.start(now);
    this.triggerHaptic(30);
  }

  public playPop() {
    if (this.isMuted) return;
    const ctx = this.initContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const now = ctx.currentTime;

    osc.type = 'sine';
    osc.frequency.setValueAtTime(180, now);
    osc.frequency.exponentialRampToValueAtTime(540, now + 0.08);

    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.11);
    this.triggerHaptic([40, 20, 80]);
  }

  public playCandleBlow() {
    if (this.isMuted) return;
    const ctx = this.initContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    // Whisper breath noise
    const bufferSize = ctx.sampleRate * 0.4;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.5;
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(600, now);
    filter.frequency.linearRampToValueAtTime(200, now + 0.38);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.1, now);
    gain.gain.linearRampToValueAtTime(0.2, now + 0.1);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.38);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    noise.start(now);
    this.triggerHaptic([30, 50, 80]);
  }

  public playSecretChime() {
    if (this.isMuted) return;
    const ctx = this.initContext();
    if (!ctx) return;

    const scale = [440, 493.88, 554.37, 659.25, 739.99, 880];
    const now = ctx.currentTime;

    scale.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const t = now + i * 0.07;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, t);

      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(0.14, t + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.8);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(t);
      osc.stop(t + 0.85);
    });

    this.triggerHaptic([40, 40, 80, 40]);
  }

  // --- Romantic Ambient Piano Synthesizer ---
  private pianoChords = [
    // F major 7
    [174.61, 261.63, 329.63, 392.00], // F3, C4, E4, G4
    // C major 9
    [130.81, 196.00, 246.94, 293.66], // C3, G3, B3, D4
    // A minor 7
    [110.00, 164.81, 220.00, 261.63], // A2, E3, A3, C4
    // G sus 4 / G
    [98.00, 146.83, 196.00, 246.94]   // G2, D3, G3, B3
  ];

  private currentChordIndex = 0;

  private playAmbientNote(freq: number, delay: number, duration: number = 3.2) {
    if (!this.ctx || !this.isMusicPlaying) return;

    const now = this.ctx.currentTime + delay;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);

    // Warm, gentle bell-piano envelope
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.07, now + 0.12);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc.connect(gain);
    if (this.masterGain) {
      gain.connect(this.masterGain);
    } else {
      gain.connect(this.ctx.destination);
    }

    osc.start(now);
    osc.stop(now + duration + 0.1);
  }

  private stepAmbientProgression = () => {
    if (!this.isMusicPlaying) return;
    const chord = this.pianoChords[this.currentChordIndex];
    this.currentChordIndex = (this.currentChordIndex + 1) % this.pianoChords.length;

    // Arpeggiate the gentle chord
    chord.forEach((freq, idx) => {
      this.playAmbientNote(freq, idx * 0.42, 3.8);
      // Delicate octave harmonic
      if (idx === 3) {
        this.playAmbientNote(freq * 1.5, idx * 0.42 + 0.25, 2.8);
      }
    });

    this.ambientTimer = window.setTimeout(this.stepAmbientProgression, 3600);
  };

  public startSoundtrack(customUrl?: string) {
    this.initContext();
    this.isMusicPlaying = true;
    this.isMuted = false;

    if (customUrl) {
      try {
        if (this.ambientTimer) {
          clearTimeout(this.ambientTimer);
          this.ambientTimer = null;
        }
        if (!this.customAudio) {
          this.customAudio = new Audio(customUrl);
          this.customAudio.loop = true;
          this.customAudio.volume = 0.6;
        } else {
          if (!this.customAudio.src.includes(customUrl)) {
            this.customAudio.src = customUrl;
          }
        }
        this.customAudio.play().catch(() => {
          // If custom URL fails or blocked, smoothly fallback to synthesizer
          this.stepAmbientProgression();
        });
        return;
      } catch {
        // Fallback
      }
    }

    // Use built-in procedural ambient piano
    if (this.ambientTimer) clearTimeout(this.ambientTimer);
    this.stepAmbientProgression();
  }

  public stopSoundtrack() {
    this.isMusicPlaying = false;
    if (this.ambientTimer) {
      clearTimeout(this.ambientTimer);
      this.ambientTimer = null;
    }
    if (this.customAudio) {
      this.customAudio.pause();
    }
  }

  public toggleSoundtrack(customUrl?: string): boolean {
    if (this.isMusicPlaying) {
      this.stopSoundtrack();
      this.isMuted = true;
      return false;
    } else {
      this.startSoundtrack(customUrl);
      return true;
    }
  }

  public getIsPlaying(): boolean {
    return this.isMusicPlaying;
  }
}

export const sound = new SoundManager();
