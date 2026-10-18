import { useState } from 'react';
import { Music, Play, Square, VolumeX, Sparkles } from 'lucide-react';
import './LullabyLab.css';

/**
 * LullabyLab — Project A: Pip's personal music laboratory.
 * Synthesizes gentle bedtime melodies using the Web Audio API without external audio files.
 */
export default function LullabyLab({ isMuted, playLullaby, playTone, playClick }) {
  const [selectedMood, setSelectedMood] = useState('gentle');
  const [isPlaying, setIsPlaying] = useState(false);
  const [playingTimer, setPlayingTimer] = useState(null);

  const moods = [
    { id: 'gentle', label: 'Gentle Hum', desc: 'Soft & warming lullaby', color: '#D4C4E8' },
    { id: 'dreamy', label: 'Dreamy Drift', desc: 'Floating slow melody', color: '#FDDCB5' },
    { id: 'starlight', label: 'Starlight Chime', desc: 'High twinkling notes', color: '#FFD97A' }
  ];

  const pianoKeys = [
    { note: 'C5', freq: 523, label: 'Do' },
    { note: 'D5', freq: 587, label: 'Re' },
    { note: 'E5', freq: 659, label: 'Mi' },
    { note: 'F5', freq: 698, label: 'Fa' },
    { note: 'G5', freq: 784, label: 'Sol' },
    { note: 'A5', freq: 880, label: 'La' },
    { note: 'B5', freq: 988, label: 'Ti' },
  ];

  const handlePlayToggle = () => {
    if (playClick) playClick();

    if (isPlaying) {
      if (playingTimer) clearTimeout(playingTimer);
      setIsPlaying(false);
    } else {
      if (playLullaby) {
        playLullaby(selectedMood);
      }
      setIsPlaying(true);
      const timer = setTimeout(() => {
        setIsPlaying(false);
      }, 4800);
      setPlayingTimer(timer);
    }
  };

  const handleKeyPlay = (freq) => {
    if (playTone) {
      playTone(freq, 0.45, 'sine', 0.15);
    }
  };

  return (
    <div id="lullaby-lab" className="lullaby-lab-card card" aria-label="The Lullaby Lab">
      <div className="lullaby-header">
        <div className="project-badge">
          <Music size={16} />
          <span>Project A // Lullaby_Lab.exe</span>
        </div>
        <h3>The Lullaby Lab</h3>
        <p className="project-tagline">
          Pip composes custom bedtime melodies using a magical, salvaged music box.
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
              <div className="music-waves" aria-hidden="true">
                <span className="wave wave-1" />
                <span className="wave wave-2" />
                <span className="wave wave-3" />
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
            {isMuted && (
              <p className="mute-warning">
                <VolumeX size={14} /> Global sound is muted. Click speaker icon in header to listen.
              </p>
            )}
          </div>
        </div>

        <div className="lullaby-controls-col">
          <div className="mood-selector">
            <span className="control-label">Select Lullaby Formula</span>
            <div className="mood-buttons">
              {moods.map((m) => (
                <button
                  key={m.id}
                  type="button"
                  className={`mood-btn ${selectedMood === m.id ? 'active' : ''}`}
                  onClick={() => {
                    if (playClick) playClick();
                    setSelectedMood(m.id);
                  }}
                  style={{ '--mood-accent': m.color }}
                >
                  <span className="mood-btn-label">{m.label}</span>
                  <span className="mood-btn-desc">{m.desc}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="play-action-area">
            <button
              type="button"
              className={`btn ${isPlaying ? 'btn-secondary' : 'btn-primary'} play-btn`}
              onClick={handlePlayToggle}
              aria-label={isPlaying ? 'Stop Lullaby' : `Play ${selectedMood} Lullaby`}
            >
              {isPlaying ? <Square size={18} /> : <Play size={18} />}
              <span>{isPlaying ? 'Halt Melody' : 'Wind Up & Play'}</span>
            </button>
          </div>

          <div className="mini-piano-section">
            <span className="control-label">Play Star Chimes (Interactive Synthesizer)</span>
            <div className="piano-keys-row" role="group" aria-label="Synthesizer Keyboard">
              {pianoKeys.map((k) => (
                <button
                  key={k.note}
                  type="button"
                  className="piano-key"
                  onClick={() => handleKeyPlay(k.freq)}
                  title={`${k.note} (${k.freq}Hz)`}
                  aria-label={`Play ${k.note}`}
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
