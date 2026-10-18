import { useState, useEffect, useMemo } from 'react';
import { Monitor, Star, Moon, Sparkles } from 'lucide-react';
import './BootScreen.css';

/**
 * BootScreen — The "Dream OS" startup diagnostic sequence.
 * Skippable via button or Enter/Escape keys.
 */
export default function BootScreen({ onComplete }) {
  const [bootLines, setBootLines] = useState([]);
  const [showEnter, setShowEnter] = useState(false);

  const lines = [
    { text: 'Midnight Nursery OS v1.0.0', delay: 250 },
    { text: 'Checking pillows and cloud fluffiness... ✓', delay: 600 },
    { text: 'Calibrating starlight wavelengths... ✓', delay: 950 },
    { text: 'Winding up bedside music boxes... ✓', delay: 1300 },
    { text: 'Loading hand-wrapped dream blueprints... ✓', delay: 1650 },
    { text: 'Pip\'s Dream Workstation ready.', delay: 2000 },
  ];

  // Stable star positions
  const stars = useMemo(() => {
    return Array.from({ length: 14 }, (_, i) => ({
      id: i,
      size: (i % 3) * 3 + 8,
      left: `${(i * 19) % 94 + 3}%`,
      top: `${(i * 23) % 90 + 5}%`,
      delay: `${(i * 0.25).toFixed(1)}s`,
    }));
  }, []);

  useEffect(() => {
    const timers = lines.map((line, i) =>
      setTimeout(() => {
        setBootLines(prev => [...prev, line.text]);
        if (i === lines.length - 1) {
          setTimeout(() => setShowEnter(true), 350);
        }
      }, line.delay)
    );

    return () => timers.forEach(clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Enter' || e.key === 'Escape') {
        onComplete();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onComplete]);

  return (
    <div className="boot-screen" role="dialog" aria-label="Dream OS boot screen">
      <div className="boot-container">
        <div className="boot-header">
          <Monitor size={18} />
          <span>dream_os.sys // bootloader</span>
        </div>

        <div className="boot-stars" aria-hidden="true">
          {stars.map((s) => (
            <Star
              key={s.id}
              size={s.size}
              className="boot-star"
              style={{
                left: s.left,
                top: s.top,
                animationDelay: s.delay,
              }}
            />
          ))}
        </div>

        <div className="boot-terminal">
          <div className="boot-moon" aria-hidden="true">
            <Moon size={36} />
          </div>

          {bootLines.map((line, i) => (
            <p key={i} className="boot-line" style={{ animationDelay: `${i * 0.08}s` }}>
              <span className="boot-prompt">&gt;</span> {line}
            </p>
          ))}

          {bootLines.length === 0 && (
            <p className="boot-line boot-blink">
              <span className="boot-prompt">&gt;</span> Initializing dream engines...
            </p>
          )}
        </div>

        <div className="boot-actions">
          {showEnter ? (
            <button className="btn btn-primary boot-enter" onClick={onComplete} autoFocus>
              <Sparkles size={16} />
              Enter the Dream OS
            </button>
          ) : (
            <button className="boot-skip" onClick={onComplete}>
              Skip diagnostic intro →
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
