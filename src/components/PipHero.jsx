import { useEffect, useRef, useState } from 'react';
import { Star, ArrowDown, Sparkles } from 'lucide-react';
import './PipHero.css';

/**
 * PipHero — The main hero section introducing Pip.
 * Features subtle eye-tracking on desktop, floating stars, and clear CTAs.
 */
export default function PipHero({ isNight }) {
  const heroRef = useRef(null);
  const [eyeOffset, setEyeOffset] = useState({ x: 0, y: 0 });
  const isTouchDevice = useRef(false);

  useEffect(() => {
    isTouchDevice.current = 'ontouchstart' in window;
    if (isTouchDevice.current) return;

    const handleMouse = (e) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const maxOffset = 6;
      const x = ((e.clientX - centerX) / (rect.width / 2)) * maxOffset;
      const y = ((e.clientY - centerY) / (rect.height / 2)) * maxOffset;
      setEyeOffset({
        x: Math.max(-maxOffset, Math.min(maxOffset, x)),
        y: Math.max(-maxOffset, Math.min(maxOffset, y))
      });
    };

    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, []);

  const scrollTo = (id) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="hero section" ref={heroRef} aria-label="Meet Pip">
      {/* Decorative floating elements */}
      <div className="hero-decor" aria-hidden="true">
        {[...Array(8)].map((_, i) => (
          <Star
            key={i}
            size={Math.random() * 14 + 8}
            className="hero-star animate-twinkle"
            style={{
              left: `${10 + Math.random() * 80}%`,
              top: `${10 + Math.random() * 80}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
        <div className="hero-cloud hero-cloud-1 animate-cloud" />
        <div className="hero-cloud hero-cloud-2 animate-cloud" style={{ animationDelay: '-7s' }} />
      </div>

      <div className="hero-content wrap">
        <div className="hero-text">
          <p className="hero-system-tag">
            <Sparkles size={14} />
            Midnight Nursery OS v1.0
          </p>

          <h1 className="hero-name">
            Meet <span className="hero-name-accent">Pip</span>
          </h1>

          <p className="hero-profession">
            Junior Dream Engineer at the Midnight Nursery
          </p>

          <blockquote className="hero-tagline">
            "I build the dreams you fall asleep inside."
          </blockquote>

          <p className="hero-intro">
            A curious, sleepy, easily delighted little soul who designs dreams, 
            lullabies, nightlights, and bedtime stories for the neighborhood's 
            tiniest creatures. Pip giggles at everything and hates silence more 
            than anything in the world.
          </p>

          <div className="hero-buttons">
            <button className="btn btn-primary" onClick={() => scrollTo('#projects')}>
              <Sparkles size={16} />
              Explore Pip's Work
            </button>
            <button className="btn btn-secondary" onClick={() => scrollTo('#story')}>
              Read Pip's Story
              <ArrowDown size={16} />
            </button>
          </div>
        </div>

        <div className="hero-avatar-wrapper">
          <div className="hero-avatar-glow" aria-hidden="true" />
          <div
            className="hero-avatar-container"
            style={{
              transform: `translate(${eyeOffset.x * 0.5}px, ${eyeOffset.y * 0.5}px)`,
            }}
          >
            <img
              src="/assets/pip_avatar_cloud.png"
              alt="Pip, a cute baby with a skull face, sitting on a fluffy cloud, waving. Pip wears a starry nightcap with a pink bow and has warm glowing amber eyes."
              className="hero-avatar"
              width="400"
              height="400"
              loading="eager"
            />
          </div>
          {/* CSS eye-follow overlay for subtle tracking effect */}
          <div className="hero-eyes" aria-hidden="true"
            style={{
              transform: `translate(${eyeOffset.x}px, ${eyeOffset.y}px)`,
            }}
          />
        </div>
      </div>

      <div className="hero-scroll-hint" aria-hidden="true">
        <ArrowDown size={16} className="hero-scroll-arrow" />
        <span>Scroll to explore</span>
      </div>
    </section>
  );
}
