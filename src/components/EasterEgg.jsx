import { useState } from 'react';
import { Moon, Sparkles, X, Heart, Star } from 'lucide-react';
import confetti from 'canvas-confetti';
import './EasterEgg.css';

/**
 * EasterEgg — A hidden secret nursery moon trigger.
 * When tapped 5 times, unlocks Pip's secret stash of favorite dream blueprints.
 */
export default function EasterEgg({ playChime }) {
  const [clickCount, setClickCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);

  const handleMoonClick = () => {
    const next = clickCount + 1;
    setClickCount(next);

    if (next >= 5) {
      setIsOpen(true);
      setIsUnlocked(true);
      setClickCount(0);
      if (playChime) playChime();

      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#FFD97A', '#A34063', '#D4C4E8', '#FDDCB5']
        });
      } catch {
        // Fallback gracefully
      }
    }
  };

  return (
    <>
      <div className="easter-egg-trigger-zone" title="Pip's quiet midnight corner">
        <button
          type="button"
          className={`secret-moon-btn ${isUnlocked ? 'secret-unlocked' : ''}`}
          onClick={handleMoonClick}
          aria-label="A tiny sleeping crescent moon"
        >
          <Moon size={18} className="moon-icon" />
          {clickCount > 0 && clickCount < 5 && (
            <span className="click-counter-bubble">{5 - clickCount}</span>
          )}
        </button>
      </div>

      {isOpen && (
        <div className="secret-modal-backdrop" role="dialog" aria-modal="true" aria-label="Pip's Secret Dream Vault">
          <div className="secret-modal card animate-fade-in">
            <button
              type="button"
              className="secret-modal-close"
              onClick={() => setIsOpen(false)}
              aria-label="Close secret dream vault"
            >
              <X size={20} />
            </button>

            <div className="secret-modal-header">
              <Sparkles size={28} className="secret-sparkle-icon" />
              <h3>✨ Pip's Secret Dream Vault ✨</h3>
              <p className="secret-tagline">
                You found the hidden nursery door! Here are Pip's classified dream blueprints.
              </p>
            </div>

            <div className="secret-treasures-list">
              <div className="treasure-item">
                <span className="treasure-emoji">🍪</span>
                <div>
                  <strong>The Giant Moon Cookie</strong>
                  <p>A dream where you take big crunchy bites out of the crescent moon, and it tastes like vanilla sugar.</p>
                </div>
              </div>

              <div className="treasure-item">
                <span className="treasure-emoji">🌧️</span>
                <div>
                  <strong>Cotton Cloud Rain</strong>
                  <p>A quiet rain that taps on the nursery window, but each raindrop is warm chamomile tea.</p>
                </div>
              </div>

              <div className="treasure-item">
                <span className="treasure-emoji">⭐</span>
                <div>
                  <strong>The Star That Winked Back</strong>
                  <p>A gentle memory from night #001: Pip's very first friend in the vast dark sky.</p>
                </div>
              </div>
            </div>

            <div className="secret-modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => setIsOpen(false)}
              >
                <Heart size={16} /> Return to Dream OS
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
