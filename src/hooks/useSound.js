import { useState, useCallback, useRef, useEffect } from 'react';

/**
 * useSound — Manages Web Audio API for synthesized sounds.
 * All sounds respect the global mute state.
 */
export function useSound() {
  const [isMuted, setIsMuted] = useState(true); // muted by default
  const audioCtxRef = useRef(null);

  const getContext = useCallback(() => {
    if (!audioCtxRef.current) {
      try {
        audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
      } catch {
        return null;
      }
    }
    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  }, []);

  const playTone = useCallback((frequency = 440, duration = 0.3, type = 'sine', volume = 0.15) => {
    if (isMuted) return;
    const ctx = getContext();
    if (!ctx) return;

    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, ctx.currentTime);

    gainNode.gain.setValueAtTime(volume, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + duration);
  }, [isMuted, getContext]);

  const playClick = useCallback(() => {
    playTone(800, 0.08, 'sine', 0.08);
  }, [playTone]);

  const playChime = useCallback(() => {
    playTone(523, 0.4, 'sine', 0.12);
    setTimeout(() => playTone(659, 0.4, 'sine', 0.1), 100);
    setTimeout(() => playTone(784, 0.5, 'sine', 0.08), 200);
  }, [playTone]);

  const playLullaby = useCallback((mood = 'gentle') => {
    if (isMuted) return;
    const ctx = getContext();
    if (!ctx) return;

    const melodies = {
      gentle: [
        { freq: 523, time: 0, dur: 0.5 },
        { freq: 587, time: 0.5, dur: 0.5 },
        { freq: 523, time: 1.0, dur: 0.5 },
        { freq: 494, time: 1.5, dur: 0.5 },
        { freq: 440, time: 2.0, dur: 0.8 },
        { freq: 392, time: 2.8, dur: 0.5 },
        { freq: 440, time: 3.3, dur: 0.5 },
        { freq: 523, time: 3.8, dur: 1.0 },
      ],
      dreamy: [
        { freq: 392, time: 0, dur: 0.6 },
        { freq: 440, time: 0.6, dur: 0.6 },
        { freq: 523, time: 1.2, dur: 0.6 },
        { freq: 587, time: 1.8, dur: 0.8 },
        { freq: 523, time: 2.6, dur: 0.6 },
        { freq: 494, time: 3.2, dur: 0.6 },
        { freq: 440, time: 3.8, dur: 1.0 },
      ],
      starlight: [
        { freq: 659, time: 0, dur: 0.4 },
        { freq: 784, time: 0.4, dur: 0.4 },
        { freq: 659, time: 0.8, dur: 0.4 },
        { freq: 587, time: 1.2, dur: 0.6 },
        { freq: 523, time: 1.8, dur: 0.4 },
        { freq: 587, time: 2.2, dur: 0.4 },
        { freq: 659, time: 2.6, dur: 0.6 },
        { freq: 784, time: 3.2, dur: 1.0 },
      ]
    };

    const notes = melodies[mood] || melodies.gentle;

    notes.forEach(({ freq, time, dur }) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + time);
      gain.gain.setValueAtTime(0.1, ctx.currentTime + time);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + time + dur);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime + time);
      osc.stop(ctx.currentTime + time + dur);
    });
  }, [isMuted, getContext]);

  const toggleMute = useCallback(() => {
    setIsMuted(prev => !prev);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
      }
    };
  }, []);

  return { isMuted, toggleMute, playTone, playClick, playChime, playLullaby };
}
