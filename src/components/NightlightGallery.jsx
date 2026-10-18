import { useState } from 'react';
import { Lightbulb, Sun, Moon } from 'lucide-react';
import './NightlightGallery.css';

/**
 * NightlightGallery — Project B: Pip's magical bedside lanterns.
 * Features selectable custom ambient tints, brightness sliders, and dim preview room.
 */
export default function NightlightGallery({ playClick }) {
  const [selectedId, setSelectedId] = useState('moonbeam');
  const [brightness, setBrightness] = useState(85);
  const [roomDarkened, setRoomDarkened] = useState(false);

  const nightlights = [
    {
      id: 'moonbeam',
      name: 'Moonbeam Glow',
      desc: 'Soft lavender mist for calming racey bedtime thoughts.',
      color: '#D4C4E8',
      glowRgba: '212, 196, 232',
    },
    {
      id: 'starlight',
      name: 'Starlight Ember',
      desc: 'Warm golden sparkle inspired by falling shooting stars.',
      color: '#FFD97A',
      glowRgba: '255, 217, 122',
    },
    {
      id: 'aurora',
      name: 'Aurora Whisper',
      desc: 'Gentle mint green soothing anxious dreamers into sleep.',
      color: '#C4E8D4',
      glowRgba: '196, 232, 212',
    },
    {
      id: 'sunset',
      name: 'Sunset Blush',
      desc: 'Cozy dusky rose resembling a sleepy twilight sky.',
      color: '#F4D4D4',
      glowRgba: '244, 212, 212',
    },
    {
      id: 'ocean',
      name: 'Deep Ocean Cloud',
      desc: 'Dreamy aquatic blue for deep uninterrupted sleep.',
      color: '#C4D4E8',
      glowRgba: '196, 212, 232',
    },
    {
      id: 'firefly',
      name: 'Peach Firefly',
      desc: 'Warm comforting peach light to ward away night terrors.',
      color: '#FDDCB5',
      glowRgba: '253, 220, 181',
    },
  ];

  const currentLight = nightlights.find(l => l.id === selectedId) || nightlights[0];

  const handleSelect = (id) => {
    if (playClick) playClick();
    setSelectedId(id);
  };

  return (
    <div id="nightlight-gallery" className="nightlight-card card" aria-label="Nightlight Collection">
      <div className="nightlight-header">
        <div className="project-badge">
          <Lightbulb size={16} />
          <span>Project B // Nightlights.exe</span>
        </div>
        <h3>The Nightlight Collection</h3>
        <p className="project-tagline">
          Handcrafted bedside lanterns that illuminate nursery rooms with calming dream aura.
        </p>
      </div>

      <div className="nightlight-stage-grid">
        <div
          className={`lantern-preview-chamber ${roomDarkened ? 'chamber-dark' : ''}`}
          style={{
            '--glow-color': `rgba(${currentLight.glowRgba}, ${brightness / 100})`,
            '--ambient-bg': `rgba(${currentLight.glowRgba}, ${0.15 * (brightness / 100)})`,
          }}
        >
          <div className="chamber-glow-field" aria-hidden="true" />
          
          <div className="lantern-mount">
            <img
              src="/assets/pip_dream_lantern.png"
              alt="Pip's glowing dream lantern"
              className="lantern-img animate-float"
              width="240"
              height="240"
              loading="lazy"
            />
          </div>

          <div className="chamber-controls-overlay">
            <button
              type="button"
              className="chamber-dim-toggle"
              onClick={() => {
                if (playClick) playClick();
                setRoomDarkened(prev => !prev);
              }}
              aria-label={roomDarkened ? 'Brighten room preview' : 'Dim room preview'}
            >
              {roomDarkened ? <Sun size={15} /> : <Moon size={15} />}
              <span>{roomDarkened ? 'Lights On' : 'Simulate Dark Room'}</span>
            </button>
          </div>

          <div className="active-lamp-banner">
            <span className="lamp-banner-name">{currentLight.name}</span>
            <span className="lamp-banner-desc">{currentLight.desc}</span>
          </div>
        </div>

        <div className="nightlight-picker-col">
          <div className="slider-group">
            <div className="slider-header">
              <label htmlFor="lantern-brightness" className="control-label">Glow Intensity</label>
              <span className="brightness-value">{brightness}%</span>
            </div>
            <input
              id="lantern-brightness"
              type="range"
              min="20"
              max="100"
              value={brightness}
              onChange={(e) => setBrightness(Number(e.target.value))}
              className="styled-slider"
            />
          </div>

          <div className="swatches-grid" role="radiogroup" aria-label="Choose Nightlight Color">
            {nightlights.map((lamp) => {
              const isSelected = lamp.id === selectedId;
              return (
                <button
                  key={lamp.id}
                  type="button"
                  role="radio"
                  aria-checked={isSelected}
                  className={`swatch-card ${isSelected ? 'selected' : ''}`}
                  onClick={() => handleSelect(lamp.id)}
                >
                  <span
                    className="swatch-circle"
                    style={{
                      backgroundColor: lamp.color,
                      boxShadow: isSelected ? `0 0 12px ${lamp.color}` : 'none',
                    }}
                  />
                  <div className="swatch-info">
                    <span className="swatch-name">{lamp.name}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
