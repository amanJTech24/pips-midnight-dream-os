import { Star, Heart, Music, Moon, Sparkles, Coffee } from 'lucide-react';
import './CharacterProfile.css';

/**
 * CharacterProfile — Pip's detailed character card.
 */
export default function CharacterProfile() {
  const traits = [
    { icon: <Star size={16} />, label: 'Name', value: 'Pip' },
    { icon: <Sparkles size={16} />, label: 'Species', value: 'A cute baby with a smooth, round skull face' },
    { icon: <Moon size={16} />, label: 'Profession', value: 'Junior Dream Engineer at the Midnight Nursery' },
    { icon: <Heart size={16} />, label: 'Personality', value: 'Curious, sleepy, a little clumsy, easily delighted' },
    { icon: <Music size={16} />, label: 'Tagline', value: '"I build the dreams you fall asleep inside."' },
  ];

  const funFacts = [
    { emoji: '🎵', label: 'Favorite sound', value: 'A music box playing at midnight' },
    { emoji: '🍪', label: 'Favorite snack', value: 'Moon-shaped cookies' },
    { emoji: '😰', label: 'Biggest fear', value: 'A completely silent nursery' },
    { emoji: '✨', label: 'Special talent', value: 'Turning worries into little adventures' },
    { emoji: '😄', label: 'Quirk', value: 'Giggles at absolutely everything' },
    { emoji: '🌙', label: 'Favorite time', value: 'Exactly midnight' },
  ];

  return (
    <section id="about" className="about section" aria-label="About Pip">
      <div className="wrap">
        <div className="section-title">
          <h2>
            <Star size={20} className="star" aria-hidden="true" /> About Pip
          </h2>
          <p>Everything you need to know about the Midnight Nursery's tiniest dream engineer.</p>
        </div>

        <div className="profile-layout">
          <div className="profile-card card">
            <div className="profile-image-wrap">
              <img
                src="/assets/pip_portrait.png"
                alt="Pip's portrait — a cute skull baby with glowing amber eyes, wearing a starry nightcap with a pink bow."
                className="profile-image"
                width="280"
                height="280"
                loading="lazy"
              />
            </div>

            <div className="profile-quote">
              <blockquote>
                "Every pillow holds a universe. I just help you find the door."
              </blockquote>
              <cite>— Pip, after delivering dream #347</cite>
            </div>
          </div>

          <div className="profile-details">
            <div className="profile-traits">
              {traits.map((trait) => (
                <div key={trait.label} className="trait-row">
                  <div className="trait-icon">{trait.icon}</div>
                  <div>
                    <span className="trait-label">{trait.label}</span>
                    <span className="trait-value">{trait.value}</span>
                  </div>
                </div>
              ))}
            </div>

            <h3 className="fun-facts-title">
              <Coffee size={16} /> Fun Facts
            </h3>
            <div className="fun-facts-grid">
              {funFacts.map((fact) => (
                <div key={fact.label} className="fun-fact-chip">
                  <span className="fun-fact-emoji">{fact.emoji}</span>
                  <div>
                    <span className="fun-fact-label">{fact.label}</span>
                    <span className="fun-fact-value">{fact.value}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
