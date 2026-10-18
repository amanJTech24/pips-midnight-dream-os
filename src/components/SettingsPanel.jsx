import { useEffect } from 'react';
import { Settings, X, Moon, Sun, Volume2, VolumeX, Eye, Sparkles, Zap, Flashlight, Sliders } from 'lucide-react';
import './SettingsPanel.css';

/**
 * SettingsPanel — Slide-out drawer controlling audio, theme, volume,
 * nightlight flashlight, reduced motion, sparkles, and chaos mode.
 */
export default function SettingsPanel({
  isOpen,
  onClose,
  theme,
  toggleTheme,
  isMuted,
  toggleMute,
  volume = 0.7,
  setVolume,
  nightlightCursor,
  setNightlightCursor,
  reducedMotion,
  setReducedMotion,
  sparklesEnabled,
  setSparklesEnabled,
  chaosMode,
  setChaosMode,
  playClick
}) {
  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="settings-drawer-backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-label="Dream Settings">
      <div className="settings-drawer" onClick={(e) => e.stopPropagation()}>
        <div className="settings-drawer-header">
          <div className="drawer-title-row">
            <Settings size={20} className="star" />
            <h3>Dream Settings</h3>
          </div>
          <button
            type="button"
            className="drawer-close-btn"
            onClick={() => {
              if (playClick) playClick();
              onClose();
            }}
            aria-label="Close settings drawer"
          >
            <X size={20} />
          </button>
        </div>

        <p className="settings-desc">
          Customize your experience inside Pip's Midnight Dream workstation.
        </p>

        <div className="settings-list">
          {/* Theme Option */}
          <div className="setting-item">
            <div className="setting-label-col">
              <span className="setting-title">Dream Theme</span>
              <span className="setting-help">
                {theme === 'night' ? 'Nightfall deep purple' : 'Warm daytime ivory cream'}
              </span>
            </div>
            <button
              type="button"
              className="toggle-pill-btn"
              onClick={() => {
                if (playClick) playClick();
                toggleTheme();
              }}
              aria-label={`Toggle theme: currently ${theme}`}
            >
              {theme === 'night' ? <Moon size={16} /> : <Sun size={16} />}
              <span>{theme === 'night' ? 'Night Mode' : 'Day Mode'}</span>
            </button>
          </div>

          {/* Sound Mute Option */}
          <div className="setting-item">
            <div className="setting-label-col">
              <span className="setting-title">Nursery Audio</span>
              <span className="setting-help">Procedural chimes, lullabies & clicks</span>
            </div>
            <button
              type="button"
              className={`toggle-pill-btn ${!isMuted ? 'active-pill' : ''}`}
              onClick={() => {
                if (playClick) playClick();
                toggleMute();
              }}
              aria-label={`Toggle audio: currently ${isMuted ? 'Muted' : 'Unmuted'}`}
            >
              {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
              <span>{isMuted ? 'Muted' : 'Sound On'}</span>
            </button>
          </div>

          {/* Master Volume Slider */}
          {!isMuted && (
            <div className="setting-item-slider">
              <div className="slider-header-inline">
                <span className="setting-title-sm"><Sliders size={13} /> Master Volume</span>
                <span className="volume-val-txt">{Math.round(volume * 100)}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={volume}
                onChange={(e) => setVolume && setVolume(parseFloat(e.target.value))}
                className="styled-slider"
                aria-label="Master Volume Slider"
              />
            </div>
          )}

          {/* Nightlight Flashlight Cursor Option */}
          <div className="setting-item">
            <div className="setting-label-col">
              <span className="setting-title">Lantern Flashlight</span>
              <span className="setting-help">Soft glowing halo illuminates cursor</span>
            </div>
            <button
              type="button"
              className={`toggle-pill-btn ${nightlightCursor ? 'active-pill' : ''}`}
              onClick={() => {
                if (playClick) playClick();
                setNightlightCursor(prev => !prev);
              }}
              aria-label="Toggle flashlight cursor halo"
            >
              <Flashlight size={16} />
              <span>{nightlightCursor ? 'Lit' : 'Off'}</span>
            </button>
          </div>

          {/* Sparkles Option */}
          <div className="setting-item">
            <div className="setting-label-col">
              <span className="setting-title">Cursor Starlight</span>
              <span className="setting-help">Trailing star specks behind mouse</span>
            </div>
            <button
              type="button"
              className={`toggle-pill-btn ${sparklesEnabled ? 'active-pill' : ''}`}
              onClick={() => {
                if (playClick) playClick();
                setSparklesEnabled(prev => !prev);
              }}
              aria-label="Toggle cursor sparkles"
            >
              <Sparkles size={16} />
              <span>{sparklesEnabled ? 'Active' : 'Off'}</span>
            </button>
          </div>

          {/* Reduced Motion Option */}
          <div className="setting-item">
            <div className="setting-label-col">
              <span className="setting-title">Reduced Motion</span>
              <span className="setting-help">Disables bouncy animations</span>
            </div>
            <button
              type="button"
              className={`toggle-pill-btn ${reducedMotion ? 'active-pill' : ''}`}
              onClick={() => {
                if (playClick) playClick();
                setReducedMotion(prev => !prev);
              }}
              aria-label="Toggle reduced motion"
            >
              <Eye size={16} />
              <span>{reducedMotion ? 'Quiet' : 'Standard'}</span>
            </button>
          </div>

          {/* Chaos Mode Option */}
          <div className="setting-item">
            <div className="setting-label-col">
              <span className="setting-title">Chaos Mode 🌪️</span>
              <span className="setting-help">Playful retro tilts, CRT scanlines & party energy</span>
            </div>
            <button
              type="button"
              className={`toggle-pill-btn ${chaosMode ? 'chaos-pill' : ''}`}
              onClick={() => {
                if (playClick) playClick();
                setChaosMode(prev => !prev);
              }}
              aria-label="Toggle chaos mode"
            >
              <Zap size={16} />
              <span>{chaosMode ? 'CHAOS!' : 'Calm'}</span>
            </button>
          </div>
        </div>

        <div className="settings-footer">
          <span className="os-badge-chip">OS Build: 2026.10.18 // Midnight Nursery</span>
        </div>
      </div>
    </div>
  );
}
