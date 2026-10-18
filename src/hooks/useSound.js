import { useState, useCallback, useRef, useEffect } from 'react';

/**
 * useSound — Comprehensive Web Audio API synthesizer for Pip's Dream OS.
 * Features:
 * - Master gain node routing with volume control (0.0 to 1.0)
 * - Immediate stopAllSound() capability
 * - Melodies, individual notes, UI clicks, chimes, giggles, star-catches
 * - Strictly respects isMuted state
 */
export function useSound() {
  const [isMuted, setIsMuted] = useState(() => {
    try {
      return localStorage.getItem('pip-sound-muted') === 'true';
    } catch {
      return true; // Default to muted for friendly UX
    }
  });

  const [volume, setVolumeState] = useState(() => {
    try {
      const v = localStorage.getItem('pip-sound-volume');
      return v !== null ? parseFloat(v) : 0.7;
    } catch {
      return 0.7;
    }
  });

  const audioCtxRef = useRef(null);
  const masterGainRef = useRef(null);
  const activeNodesRef = useRef([]);
  const melodyTimersRef = useRef([]);

  const getContext = useCallback(() => {
    if (!audioCtxRef.current) {
      try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (!AudioCtx) return null;
        audioCtxRef.current = new AudioCtx();
        const masterGain = audioCtxRef.current.createGain();
        masterGain.gain.setValueAtTime(isMuted ? 0 : volume, audioCtxRef.current.currentTime);
        masterGain.connect(audioCtxRef.current.destination);
        masterGainRef.current = masterGain;
      } catch {
        return null;
      }
    }
    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  }, [isMuted, volume]);

  // Sync master gain when volume or mute state changes
  useEffect(() => {
    try {
      localStorage.setItem('pip-sound-muted', String(isMuted));
      localStorage.setItem('pip-sound-volume', String(volume));
    } catch { /* storage unavailable */ }

    if (masterGainRef.current && audioCtxRef.current) {
      const now = audioCtxRef.current.currentTime;
      masterGainRef.current.gain.cancelScheduledValues(now);
      masterGainRef.current.gain.setValueAtTime(isMuted ? 0 : volume, now);
    }
  }, [isMuted, volume]);

  const setVolume = useCallback((val) => {
    const clamped = Math.max(0, Math.min(1, val));
    setVolumeState(clamped);
  }, []);

  const toggleMute = useCallback(() => {
    setIsMuted(prev => !prev);
  }, []);

  const stopAllSound = useCallback(() => {
    // Clear scheduled melody timers
    melodyTimersRef.current.forEach(clearTimeout);
    melodyTimersRef.current = [];

    // Stop and disconnect all active oscillators
    const now = audioCtxRef.current ? audioCtxRef.current.currentTime : 0;
    activeNodesRef.current.forEach(({ osc, gain }) => {
      try {
        if (gain && audioCtxRef.current) {
          gain.gain.setValueAtTime(0, now);
        }
        if (osc) {
          osc.stop(now);
          osc.disconnect();
        }
      } catch {
        // Node may have already completed
      }
    });
    activeNodesRef.current = [];
  }, []);

  const playTone = useCallback((frequency = 440, duration = 0.3, type = 'sine', noteVolume = 0.15) => {
    if (isMuted) return;
    const ctx = getContext();
    if (!ctx || !masterGainRef.current) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(frequency, ctx.currentTime);

      gain.gain.setValueAtTime(noteVolume, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(masterGainRef.current);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + duration);

      const nodeRecord = { osc, gain };
      activeNodesRef.current.push(nodeRecord);

      setTimeout(() => {
        activeNodesRef.current = activeNodesRef.current.filter(n => n !== nodeRecord);
      }, duration * 1000 + 50);
    } catch {
      // Audio node error gracefully ignored
    }
  }, [isMuted, getContext]);

  const playClick = useCallback(() => {
    playTone(880, 0.06, 'sine', 0.08);
  }, [playTone]);

  const playChime = useCallback(() => {
    playTone(523.25, 0.4, 'sine', 0.12); // C5
    setTimeout(() => playTone(659.25, 0.4, 'sine', 0.1), 100); // E5
    setTimeout(() => playTone(783.99, 0.5, 'sine', 0.09), 200); // G5
  }, [playTone]);

  // Cute giggle chime when interacting with Pip
  const playGiggle = useCallback(() => {
    if (isMuted) return;
    const notes = [587.33, 659.25, 783.99, 987.77]; // D5, E5, G5, B5
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        playTone(freq, 0.18, 'triangle', 0.12);
      }, idx * 75);
    });
  }, [isMuted, playTone]);

  // Catching a star in Star Catcher mini-game
  const playCatch = useCallback(() => {
    playTone(783.99, 0.15, 'sine', 0.14);
    setTimeout(() => playTone(1046.50, 0.25, 'sine', 0.12), 60);
  }, [playTone]);

  const playLullaby = useCallback((mood = 'gentle', onComplete) => {
    if (isMuted) return;
    stopAllSound(); // Clear any existing melody first

    const ctx = getContext();
    if (!ctx) return;

    const melodies = {
      gentle: [
        { freq: 523.25, time: 0, dur: 0.5 },
        { freq: 587.33, time: 0.5, dur: 0.5 },
        { freq: 523.25, time: 1.0, dur: 0.5 },
        { freq: 493.88, time: 1.5, dur: 0.5 },
        { freq: 440.00, time: 2.0, dur: 0.8 },
        { freq: 392.00, time: 2.8, dur: 0.5 },
        { freq: 440.00, time: 3.3, dur: 0.5 },
        { freq: 523.25, time: 3.8, dur: 1.2 },
      ],
      dreamy: [
        { freq: 392.00, time: 0, dur: 0.6 },
        { freq: 440.00, time: 0.6, dur: 0.6 },
        { freq: 523.25, time: 1.2, dur: 0.6 },
        { freq: 587.33, time: 1.8, dur: 0.8 },
        { freq: 523.25, time: 2.6, dur: 0.6 },
        { freq: 493.88, time: 3.2, dur: 0.6 },
        { freq: 440.00, time: 3.8, dur: 1.2 },
      ],
      starlight: [
        { freq: 659.25, time: 0, dur: 0.4 },
        { freq: 783.99, time: 0.4, dur: 0.4 },
        { freq: 659.25, time: 0.8, dur: 0.4 },
        { freq: 587.33, time: 1.2, dur: 0.6 },
        { freq: 523.25, time: 1.8, dur: 0.4 },
        { freq: 587.33, time: 2.2, dur: 0.4 },
        { freq: 659.25, time: 2.6, dur: 0.6 },
        { freq: 783.99, time: 3.2, dur: 1.2 },
      ]
    };

    const notes = melodies[mood] || melodies.gentle;
    const totalDuration = notes[notes.length - 1].time + notes[notes.length - 1].dur;

    notes.forEach(({ freq, time, dur }) => {
      const timer = setTimeout(() => {
        playTone(freq, dur, 'sine', 0.12);
      }, time * 1000);
      melodyTimersRef.current.push(timer);
    });

    if (onComplete) {
      const endTimer = setTimeout(onComplete, totalDuration * 1000);
      melodyTimersRef.current.push(endTimer);
    }
  }, [isMuted, getContext, stopAllSound, playTone]);

  // Clean shutdown on unmount
  useEffect(() => {
    return () => {
      stopAllSound();
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, [stopAllSound]);

  return {
    isMuted,
    toggleMute,
    volume,
    setVolume,
    playTone,
    playClick,
    playChime,
    playGiggle,
    playCatch,
    playLullaby,
    stopAllSound
  };
}
