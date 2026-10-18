import { useState } from 'react';
import { Star, Heart, ArrowUp, Sparkles, Moon, ExternalLink } from 'lucide-react';
import VisitorCounter from './VisitorCounter.jsx';
import './Footer.css';

/**
 * Footer — Handcrafted early-web nursery footer featuring retro 88x31 badges,
 * midnight webring, visitor counter, and hackathon credits.
 */
export default function Footer({ playClick }) {
  const [webringIdx, setWebringIdx] = useState(1);
  const webringSites = [
    'Cloud Bakery (#01)',
    'Midnight Nursery HQ (#02)',
    'Star Station Relay (#03)',
    'Lullaby Lake Studio (#04)'
  ];

  const scrollToTop = () => {
    if (playClick) playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleWebringNav = (direction) => {
    if (playClick) playClick();
    if (direction === 'prev') {
      setWebringIdx((prev) => (prev === 0 ? webringSites.length - 1 : prev - 1));
    } else {
      setWebringIdx((prev) => (prev + 1) % webringSites.length);
    }
  };

  return (
    <footer className="footer" role="contentinfo">
      {/* Nostalgic Nursery Ticker */}
      <div className="nursery-news-ticker" aria-hidden="true">
        <div className="ticker-track">
          <span>✦ MIDNIGHT NURSERY WIRE: Cloud Bakery reports fresh lavender croissants ✦ Star Station sorting 1,400 lullaby envelopes ✦ Pip giggled at a sleepy moth ✦ Pillow fort construction approved ✦ No nightmares detected on Clover Lane ✦</span>
          <span>✦ MIDNIGHT NURSERY WIRE: Cloud Bakery reports fresh lavender croissants ✦ Star Station sorting 1,400 lullaby envelopes ✦ Pip giggled at a sleepy moth ✦ Pillow fort construction approved ✦ No nightmares detected on Clover Lane ✦</span>
        </div>
      </div>

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
              Made of moonlight, lullabies, and tiny ideas for the haX.baby hackathon.
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

        {/* Nostalgic Web Badges & Webring */}
        <div className="footer-early-web-row">
          <div className="retro-badges-group" aria-label="Retro Web Badges">
            <div className="retro-badge badge-dreaming">
              <span className="badge-top">BEST VIEWED</span>
              <span className="badge-bot">WHILE DREAMING</span>
            </div>
            <div className="retro-badge badge-netscape">
              <span className="badge-top">NETSCAPE 1.0</span>
              <span className="badge-bot">DREAMSCAPE</span>
            </div>
            <div className="retro-badge badge-starlight">
              <span className="badge-top">100% ORGANIC</span>
              <span className="badge-bot">STARLIGHT</span>
            </div>
            <div className="retro-badge badge-pip">
              <span className="badge-top">POWERED BY</span>
              <span className="badge-bot">PIP'S GIGGLES</span>
            </div>
          </div>

          {/* Midnight Webring */}
          <div className="webring-container" aria-label="Midnight Nursery Webring">
            <span className="webring-label">🧸 Midnight Webring</span>
            <div className="webring-controls">
              <button
                type="button"
                className="webring-btn"
                onClick={() => handleWebringNav('prev')}
                aria-label="Previous webring site"
              >
                ‹ Prev Cloud
              </button>
              <span className="webring-current">{webringSites[webringIdx]}</span>
              <button
                type="button"
                className="webring-btn"
                onClick={() => handleWebringNav('next')}
                aria-label="Next webring site"
              >
                Next Pillow ›
              </button>
            </div>
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
