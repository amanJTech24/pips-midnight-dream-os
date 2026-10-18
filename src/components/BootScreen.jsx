import { useState, useEffect } from 'react';
import { Monitor, Star, Moon } from 'lucide-react';
import './BootScreen.css';

/**
 * BootScreen — The "Dream OS" startup animation.
 * Skippable via button or Enter key.
 */
export default function BootScreen({ onComplete }) {
  const [bootLines, setBootLines] = useState([]);
  const [showEnter, setShowEnter] = useState(false);

  const lines = [
    { text: 'Midnight Nursery OS v1.0', delay: 300 },
    { text: 'Checking pillows... ✓', delay: 700 },
    { text: 'Polishing moonbeams... ✓', delay: 1100 },
    { text: 'Warming up music boxes... ✓', delay: 1500 },
    { text: 'Loading dream blueprints... ✓', delay: 1900 },
    { text: 'Dream workstation ready.', delay: 2400 },
  ];

  useEffect(() => {
    const timers = lines.map((line, i) =>
      setTimeout(() => {
        setBootLines(prev => [...prev, line.text]);
        if (i === lines.length - 1) {
          setTimeout(() => setShowEnter(true), 400);
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
          <Monitor size={20} />
          <span>dream_os.sys</span>
        </div>

        <div className="boot-stars" aria-hidden="true">
          {[...Array(12)].map((_, i) => (
            <Star
              key={i}
              size={Math.random() * 10 + 6}
              className="boot-star"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
              }}
            />
          ))}
        </div>

        <div className="boot-terminal">
          <div className="boot-moon" aria-hidden="true">
            <Moon size={40} />
          </div>

          {bootLines.map((line, i) => (
            <p key={i} className="boot-line" style={{ animationDelay: `${i * 0.1}s` }}>
              <span className="boot-prompt">&gt;</span> {line}
            </p>
          ))}

          {bootLines.length === 0 && (
            <p className="boot-line boot-blink">
              <span className="boot-prompt">&gt;</span> Initializing...
            </p>
          )}
        </div>

        <div className="boot-actions">
          {showEnter ? (
            <button className="btn btn-primary boot-enter" onClick={onComplete} autoFocus>
              <Star size={16} />
              Enter the Dream OS
            </button>
          ) : (
            <button className="boot-skip" onClick={onComplete}>
              Skip intro →
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
