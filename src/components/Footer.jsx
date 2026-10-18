import { Star, Heart, ArrowUp, Sparkles, Moon } from 'lucide-react';
import VisitorCounter from './VisitorCounter.jsx';
import './Footer.css';

/**
 * Footer — Cozy nursery ending with visitor counter, credits, and back-to-top shortcut.
 */
export default function Footer({ playClick }) {
  const scrollToTop = () => {
    if (playClick) playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer" role="contentinfo">
      <div className="wrap">
        <div className="footer-content">
          <div className="footer-col-brand">
            <div className="footer-logo">
              <Star size={20} className="star animate-twinkle" />
              <span className="footer-title">Pip's Midnight Dream OS</span>
            </div>
            <p className="footer-quote">
              "I build the dreams you fall asleep inside."
            </p>
            <p className="footer-craft-tag">
              Made with moonlight, lullabies & tiny ideas.
            </p>
          </div>

          <div className="footer-col-counter">
            <VisitorCounter />
          </div>

          <div className="footer-col-actions">
            <button
              type="button"
              className="btn btn-ghost back-to-top-btn"
              onClick={scrollToTop}
              aria-label="Scroll back to top of dream workstation"
            >
              <ArrowUp size={16} />
              <span>Back to Top</span>
            </button>
            <span className="footer-version-tag">Midnight Nursery OS // Release v1.0.0</span>
          </div>
        </div>

        <div className="footer-bottom-bar">
          <p className="official-disclaimer">
            Official Character: <strong>Pip</strong> (Track 1 Skull Baby) for the <strong>haX.baby</strong> "Baby's First Website" Hackathon.
          </p>
          <div className="footer-sparkle-row" aria-hidden="true">
            <span>✨</span>
            <span>🌙</span>
            <span>🧸</span>
            <span>💤</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
