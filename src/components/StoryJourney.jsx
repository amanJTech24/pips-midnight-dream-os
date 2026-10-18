import { useEffect, useRef } from 'react';
import { BookOpen, Star, Sparkles, Moon } from 'lucide-react';
import { storyScenes } from '../data/story.js';
import './StoryJourney.css';

/**
 * StoryJourney — Pip's origin saga presented through an interactive scroll-triggered timeline.
 */
export default function StoryJourney({ isNight }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('scene-revealed');
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    const cards = containerRef.current?.querySelectorAll('.journey-card');
    cards?.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="story" className="story-journey section" ref={containerRef} aria-label="Pip's Origin Story">
      <div className="wrap">
        <div className="section-title">
          <h2>
            <BookOpen size={22} className="star" aria-hidden="true" /> Pip's Origin Story
          </h2>
          <p>How a tiny yawn inside a cotton-candy cloud became the Midnight Nursery's sweetest mission.</p>
        </div>

        <div className="journey-timeline">
          <div className="timeline-spine-track" aria-hidden="true" />

          {storyScenes.map((scene, idx) => (
            <div
              key={scene.id}
              className="journey-card"
              style={{
                '--scene-bg': isNight ? scene.nightBg : scene.bgColor,
              }}
            >
              <div className="journey-badge-node" aria-hidden="true">
                <span className="node-number">{scene.id}</span>
              </div>

              <div className="journey-content-card card">
                <div className="journey-card-header">
                  <span className="scene-phase-tag">SCENE 0{scene.id} // ORIGIN</span>
                  <span className="scene-emoji-icon" aria-hidden="true">{scene.emoji}</span>
                </div>

                <h3 className="scene-card-title">{scene.title}</h3>

                <p className="scene-narrative-prose">
                  {scene.content}
                </p>

                <div className="scene-card-footer" aria-hidden="true">
                  <Sparkles size={14} className="star" />
                  <span className="scene-footnote">Midnight Nursery Archives</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
