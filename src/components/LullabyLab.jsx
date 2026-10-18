import { useState, useEffect } from 'react';
import { Music, Play, Square, VolumeX, Volume2, Sparkles, Sliders } from 'lucide-react';
import './LullabyLab.css';

/**
 * LullabyLab — Project A: Pip's personal Web Audio synthesizer laboratory.
 * Features:
 * - 3 procedural lullaby melodies with visual equalizer wave
 * - Volume slider and immediate stop capability
 * - Waveform timbre selector (Sine / Triangle)
 * - Interactive 7-note starlight chime keyboard
 * - Synchronized with global mute state
 */
export default function LullabyLab({ isMuted, volume = 0.7, setVolume, playLullaby, playTone, playClick, stopAllSound, toggleMute }) {
  const [selectedMood, setSelectedMood] = useState('gentle');
  const [waveform, setWaveform] = useState('sine');
  const [isPlaying, setIsPlaying] = useState(false);

  const moods = [
    { id: 'gentle', label: 'Gentle Hum', desc: 'Soft & warming bedtime lullaby', color: '#D4C4E8' },
    { id: 'dreamy', label: 'Dreamy Drift', desc: 'Floating slow cloud melody', color: '#FDDCB5' },
    { id: 'starlight', label: 'Starlight Chime', desc: 'High twinkling night chimes', color: '#FFD97A' }
  ];

  const pianoKeys = [
    { note: 'C5', freq: 523.25, label: 'Do' },
    { note: 'D5', freq: 587.33, label: 'Re' },
    { note: 'E5', freq: 659.25, label: 'Mi' },
    { note: 'F5', freq: 698.46, label: 'Fa' },
    { note: 'G5', freq: 783.99, label: 'Sol' },
    { note: 'A5', freq: 880.00, label: 'La' },
    { note: 'B5', freq: 987.77, label: 'Ti' },
  ];

  const handlePlayToggle = () => {
    if (playClick) playClick();

    if (isPlaying) {
      if (stopAllSound) stopAllSound();
      setIsPlaying(false);
    } else {
      if (playLullaby) {
        setIsPlaying(true);
        playLullaby(selectedMood, () => {
          setIsPlaying(false);
        });
      }
    }
  };

  const handleKeyPlay = (freq) => {
    if (playTone) {
      playTone(freq, 0.45, waveform, 0.16);
    }
  };

  // Stop playback if user mutes audio
  useEffect(() => {
    if (isMuted && isPlaying) {
      if (stopAllSound) stopAllSound();
      setIsPlaying(false);
    }
  }, [isMuted, isPlaying, stopAllSound]);

  return (
    <div id="lullaby-lab" className="lullaby-lab-card card" aria-label="The Lullaby Lab">
      <div className="lullaby-header">
        <div className="project-badge">
          <Music size={16} />
          <span>Project A // Lullaby_Lab.exe</span>
        </div>
        <h3>The Lullaby Lab</h3>
        <p className="project-tagline">
          Pip composes custom bedtime melodies using a magical salvaged music box powered by Web Audio.
        </p>
      </div>

      <div className="lullaby-body">
        <div className="lullaby-visual-col">
          <div className={`music-box-stage ${isPlaying ? 'stage-playing' : ''}`}>
            <img
              src="/assets/pip_lullaby_box.png"
              alt="Pip's magical bedtime music box with star engraving"
              className="music-box-img animate-float"
              width="240"
              height="240"
              loading="lazy"
            />
            {isPlaying && (
              <div className="equalizer-bars-row" aria-hidden="true">
                <span className="eq-bar bar-1" />
                <span className="eq-bar bar-2" />
                <span className="eq-bar bar-3" />
                <span className="eq-bar bar-4" />
                <span className="eq-bar bar-5" />
              </div>
            )}
          </div>

          <div className="status-indicator-box">
            {isPlaying ? (
              <span className="badge badge-active animate-glow">
                <Sparkles size={14} /> Now Playing: {selectedMood.toUpperCase()}
              </span>
            ) : (
              <span className="badge badge-idle">Ready to compose</span>
            )}

            {isMuted ? (
              <button
                type="button"
                className="mute-warning-btn"
                onClick={toggleMute}
                aria-label="Audio is muted. Click to unmute."
              >
                <VolumeX size={14} /> Sound is muted — click to unmute
              </button>
            ) : (
              <span className="sound-active-note">
                <Volume2 size={14} /> Synthesizer active ({Math.round(volume * 100)}% vol)
              </span>
            )}
          </div>
        </div>

        <div className="lullaby-controls-col">
          {/* Lullaby Mood Selection */}
          <div className="mood-selector">
            <span className="control-label">Select Lullaby Melody</span>
            <div className="mood-buttons">
              {moods.map((m) => (
                <button
                  key={m.id}
                  type="button"
                  className={`mood-btn ${selectedMood === m.id ? 'active' : ''}`}
                  onClick={() => {
                    if (playClick) playClick();
                    setSelectedMood(m.id);
                    if (isPlaying) {
                      if (stopAllSound) stopAllSound();
                      setIsPlaying(false);
                    }
                  }}
                  style={{ '--mood-accent': m.color }}
                  aria-pressed={selectedMood === m.id}
                >
                  <span className="mood-btn-label">{m.label}</span>
                  <span className="mood-btn-desc">{m.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Volume & Waveform Timbre Settings */}
          <div className="synth-settings-bar">
            <div className="volume-slider-group">
              <label htmlFor="synth-volume" className="control-label-sm">
                <Sliders size={13} /> Volume: {Math.round(volume * 100)}%
              </label>
              <input
                id="synth-volume"
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={volume}
                onChange={(e) => setVolume && setVolume(parseFloat(e.target.value))}
                className="styled-slider"
                aria-label="Synthesizer Master Volume"
              />
            </div>

            <div className="waveform-toggle-group">
              <span className="control-label-sm">Timbre</span>
              <div className="waveform-btns">
                <button
                  type="button"
                  className={`wave-btn ${waveform === 'sine' ? 'active' : ''}`}
                  onClick={() => { if (playClick) playClick(); setWaveform('sine'); }}
                >
                  Sine (Soft)
                </button>
                <button
                  type="button"
                  className={`wave-btn ${waveform === 'triangle' ? 'active' : ''}`}
                  onClick={() => { if (playClick) playClick(); setWaveform('triangle'); }}
                >
                  Flute (Bright)
                </button>
              </div>
            </div>
          </div>

          {/* Play/Stop Main Button */}
          <div className="play-action-area">
            <button
              type="button"
              className={`btn ${isPlaying ? 'btn-secondary' : 'btn-primary'} play-btn`}
              onClick={handlePlayToggle}
              aria-label={isPlaying ? 'Stop Lullaby' : `Play ${selectedMood} Lullaby`}
            >
              {isPlaying ? <Square size={18} /> : <Play size={18} />}
              <span>{isPlaying ? 'Halt Melody' : 'Wind Up & Play Lullaby'}</span>
            </button>
          </div>

          {/* Interactive Keyboard */}
          <div className="mini-piano-section">
            <span className="control-label">Play Star Chimes (Procedural Synthesizer)</span>
            <div className="piano-keys-row" role="group" aria-label="Synthesizer Keyboard">
              {pianoKeys.map((k) => (
                <button
                  key={k.note}
                  type="button"
                  className="piano-key"
                  onClick={() => handleKeyPlay(k.freq)}
                  title={`${k.note} (${k.freq.toFixed(1)} Hz)`}
                  aria-label={`Play note ${k.note}`}
                >
                  <span className="key-note">{k.note}</span>
                  <span className="key-solfege">{k.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
