import { useState } from 'react';
import { Star, Music, Lightbulb, Map, BookOpen, Trash2, Gamepad2, Sparkles } from 'lucide-react';
import './DreamDesktop.css';

/**
 * DreamDesktop — Retro desktop-styled navigation with interactive file icons and taskbar.
 */
export default function DreamDesktop({ playClick }) {
  const [showTrashTip, setShowTrashTip] = useState(false);

  const icons = [
    {
      id: 'profile',
      name: 'Pip_Profile.txt',
      target: '#about',
      icon: <Star size={26} className="desktop-icon-svg" />,
      tag: 'Bio'
    },
    {
      id: 'lullaby',
      name: 'Lullaby_Lab.exe',
      target: '#lullaby-lab',
      icon: <Music size={26} className="desktop-icon-svg" />,
      tag: 'App'
    },
    {
      id: 'nightlights',
      name: 'Nightlights.exe',
      target: '#nightlight-gallery',
      icon: <Lightbulb size={26} className="desktop-icon-svg" />,
      tag: 'App'
    },
    {
      id: 'routes',
      name: 'Dream_Routes.map',
      target: '#dream-map',
      icon: <Map size={26} className="desktop-icon-svg" />,
      tag: 'Map'
    },
    {
      id: 'storybook',
      name: 'Storybook.pdf',
      target: '#storybook',
      icon: <BookOpen size={26} className="desktop-icon-svg" />,
      tag: 'Book'
    },
    {
      id: 'game',
      name: 'Star_Catcher.game',
      target: '#game',
      icon: <Gamepad2 size={26} className="desktop-icon-svg" />,
      tag: 'Play'
    },
    {
      id: 'trash',
      name: 'Nursery_Trash.bin',
      action: 'trash',
      icon: <Trash2 size={26} className="desktop-icon-svg" />,
      tag: 'Bin'
    }
  ];

  const handleIconClick = (item) => {
    if (playClick) playClick();

    if (item.action === 'trash') {
      setShowTrashTip(prev => !prev);
      return;
    }

    if (item.target) {
      const el = document.querySelector(item.target);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section id="desktop" className="desktop-section section" aria-label="Dream OS Desktop">
      <div className="wrap">
        <div className="section-title">
          <h2>💻 Pip's Workstation Desktop</h2>
          <p>Click any nursery program to launch directly into Pip's dream-engineering workshop.</p>
        </div>

        <div className="desktop-frame card">
          <div className="desktop-window-header">
            <div className="window-dots" aria-hidden="true">
              <span className="dot dot-berry" />
              <span className="dot dot-peach" />
              <span className="dot dot-lavender" />
            </div>
            <span className="window-title">C:\NURSERY\DESKTOP // DREAM_OS_v1.0</span>
            <span className="window-badge">Status: Dreamy</span>
          </div>

          <div className="desktop-grid" role="list">
            {icons.map((item) => (
              <div key={item.id} className="desktop-icon-wrapper" role="listitem">
                <button
                  type="button"
                  className="desktop-icon-btn"
                  onClick={() => handleIconClick(item)}
                  aria-label={`Open ${item.name}`}
                >
                  <div className="icon-badge-box">
                    {item.icon}
                    <span className="icon-ext-tag">{item.tag}</span>
                  </div>
                  <span className="desktop-icon-label">{item.name}</span>
                </button>

                {item.id === 'trash' && showTrashTip && (
                  <div className="trash-tooltip" role="status">
                    <span>✨ Empty! Even Pip's discarded ideas turn into starlight.</span>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="desktop-taskbar" role="toolbar" aria-label="Desktop Taskbar">
            <div className="taskbar-left">
              <button
                type="button"
                className="taskbar-start-btn"
                onClick={() => {
                  if (playClick) playClick();
                  const hero = document.querySelector('#hero');
                  if (hero) hero.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <Star size={14} className="star" />
                <span>Start</span>
              </button>
              <span className="taskbar-status">All systems sleepy ✓ (CPU: 2% Moonlight)</span>
            </div>
            <div className="taskbar-right">
              <span className="taskbar-clock">12:00 AM — Midnight Dream Time</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
