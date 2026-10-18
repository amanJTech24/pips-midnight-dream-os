import { useState, useEffect } from 'react';
import { BookOpen, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import './Storybook.css';

/**
 * Storybook — Project D: Interactive illustrated bedtime storybook.
 * Title: "The Little Star That Forgot How to Shine"
 */
export default function Storybook({ playClick }) {
  const [currentPage, setCurrentPage] = useState(0);

  const scenes = [
    {
      id: 1,
      title: 'The Dimming',
      sceneClass: 'scene-dimming',
      illustration: (
        <div className="illus-stars-constellation" aria-hidden="true">
          <span className="illus-dim-star animate-twinkle">🌟</span>
          <span className="illus-peer-star p1">✦</span>
          <span className="illus-peer-star p2">✦</span>
          <span className="illus-peer-star p3">✦</span>
        </div>
      ),
      content: `High above the Midnight Nursery, among a thousand twinkling companions, there lived a small star named Lumi. Lumi was the tiniest star in the sky but shone with a warm, buttery light that every creature below adored. One evening, Lumi noticed something troubling — its glow was fading. Not all at once, but slowly, like a candle burning low. "What's happening to me?" Lumi whispered. The bigger stars didn't notice. They were busy being brilliant.`
    },
    {
      id: 2,
      title: 'The Fall',
      sceneClass: 'scene-fall',
      illustration: (
        <div className="illus-meadow" aria-hidden="true">
          <div className="illus-shooting-trail" />
          <div className="illus-moonflowers">🌸 🌸 🌸</div>
          <span className="illus-pip-peek">👶</span>
        </div>
      ),
      content: `By the third night, Lumi could barely manage a flicker. With a gentle sigh, the little star slipped from the sky and tumbled softly into a meadow below, landing in a bed of moonflowers. A curious face peered down — round, skull-like, with glowing amber eyes and a starry nightcap. "Oh!" said Pip. "You're a star! But you look... tired." Lumi blinked weakly. "I forgot how to shine."`
    },
    {
      id: 3,
      title: 'The Remembering',
      sceneClass: 'scene-remembering',
      illustration: (
        <div className="illus-campfire-glow" aria-hidden="true">
          <div className="illus-warm-circle" />
          <span className="illus-pip-sitting">👶</span>
          <span className="illus-lumi-warm">⭐</span>
        </div>
      ),
      content: `Pip sat beside Lumi all night, telling silly stories, humming lullabies, and pointing out how the moonflowers glowed because they remembered being seeds. "You don't need to be the brightest," Pip said softly. "You just need to remember why you wanted to shine in the first place." Lumi thought about the little creatures who looked up each night, searching for one small, warm light. "For them," Lumi whispered. A faint glow returned.`
    },
    {
      id: 4,
      title: 'The Return',
      sceneClass: 'scene-return',
      illustration: (
        <div className="illus-sky-triumph" aria-hidden="true">
          <div className="illus-cloud-bank">☁️ ☁️ ☁️</div>
          <span className="illus-lumi-triumphant animate-glow">🌟</span>
          <span className="illus-sleeper">🛏️</span>
        </div>
      ),
      content: `Pip carefully carried Lumi back up through the clouds, past sleeping birds and drifting dream-bubbles. At the very top, Pip placed the little star gently back among its companions. Lumi began to glow — not the brightest, but the warmest. From below, a tiny creature looked up, found the small buttery light, smiled, and fell peacefully asleep. Pip watched from a cloud and giggled. "That's the one."`
    }
  ];

  const handleNext = () => {
    if (currentPage < scenes.length - 1) {
      if (playClick) playClick();
      setCurrentPage(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      if (playClick) playClick();
      setCurrentPage(prev => prev - 1);
    }
  };

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentPage]);

  const activeScene = scenes[currentPage];

  return (
    <div id="storybook" className="storybook-card card" aria-label="Bedtime Storybook">
      <div className="storybook-header">
        <div className="project-badge">
          <BookOpen size={16} />
          <span>Project D // Storybook.pdf</span>
        </div>
        <h3>Bedtime Storybook</h3>
        <p className="project-tagline">
          An illustrated bedtime tale written and bound by Pip for quiet nights.
        </p>
      </div>

      <div className="book-stage">
        <div className="book-spine-line" aria-hidden="true" />
        
        <div className="book-page">
          <div className={`scene-illustration-frame ${activeScene.sceneClass}`}>
            {activeScene.illustration}
            <span className="scene-watermark">Scene {activeScene.id} of {scenes.length}</span>
          </div>

          <div className="book-text-area">
            <h4 className="scene-headline">{activeScene.title}</h4>
            <p className="scene-body-text">{activeScene.content}</p>
          </div>

          <div className="book-controls">
            <button
              type="button"
              className="btn btn-ghost page-nav-btn"
              onClick={handlePrev}
              disabled={currentPage === 0}
              aria-label="Previous story page"
            >
              <ChevronLeft size={18} />
              <span>Previous</span>
            </button>

            <div className="page-dots" role="tablist" aria-label="Story pages">
              {scenes.map((s, idx) => (
                <button
                  key={s.id}
                  type="button"
                  className={`dot-indicator ${idx === currentPage ? 'active' : ''}`}
                  onClick={() => {
                    if (playClick) playClick();
                    setCurrentPage(idx);
                  }}
                  aria-label={`Jump to page ${idx + 1}`}
                />
              ))}
            </div>

            <button
              type="button"
              className="btn btn-secondary page-nav-btn"
              onClick={handleNext}
              disabled={currentPage === scenes.length - 1}
              aria-label="Next story page"
            >
              <span>{currentPage === scenes.length - 1 ? 'End' : 'Turn Page'}</span>
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
