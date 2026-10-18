import { useEffect, useRef, useState, useCallback } from 'react';
import { Star, ArrowDown, Sparkles, Heart, Smile, Sparkle, Coffee, Moon } from 'lucide-react';
import './PipHero.css';

/**
 * PipHero — The interactive character hero centerpiece.
 * Features:
 * - Subtle pointer eye/head tracking with touch fallback
 * - Clickable Pip with dynamic playful speech bubbles & cute giggles
 * - Contextual mood states (Sleepy, Giggly, Curious, Dreaming, Surprised)
 * - Live "Pip is currently..." early-web status marquee
 */
export default function PipHero({ isNight, playClick, playGiggle }) {
  const heroRef = useRef(null);
  const [eyeOffset, setEyeOffset] = useState({ x: 0, y: 0 });
  const [mood, setMood] = useState('Sleepy');
  const [speech, setSpeech] = useState("Hi! I'm Pip. Welcome to my Midnight Dream OS! 🌙");
  const [isBouncing, setIsBouncing] = useState(false);
  const isTouchDevice = useRef(false);

  const speechLines = [
    "Teehee! That tickles my nightcap! ✨",
    "Did you know moonbeams feel like warm silk? 🌙",
    "Hooray! What dream shall we construct tonight?",
    "Shh... if you listen closely, crickets sing in F-major! 🎶",
    "*Yaaawn*... I was just daydreaming about moon cookies! 🍪",
    "Every pillow holds a universe. Let's find your door! 💫",
    "I hate silence, but I love soft bedtime lullabies! 🎵",
    "Look at the stars above! Each one is a wrapped wish. ⭐"
  ];

  const moods = ['Sleepy', 'Giggly', 'Curious', 'Dreaming', 'Delighted'];

  useEffect(() => {
    isTouchDevice.current = 'ontouchstart' in window;
    if (isTouchDevice.current) return;

    const handleMouse = (e) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const maxOffset = 7;
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

  const handlePipClick = useCallback(() => {
    if (playGiggle) {
      playGiggle();
    } else if (playClick) {
      playClick();
    }

    setIsBouncing(true);
    setTimeout(() => setIsBouncing(false), 600);

    // Pick random speech line different from current
    const available = speechLines.filter(line => line !== speech);
    const nextLine = available[Math.floor(Math.random() * available.length)];
    setSpeech(nextLine);

    // Cycle mood
    const nextMood = moods[(moods.indexOf(mood) + 1) % moods.length];
    setMood(nextMood);
  }, [playGiggle, playClick, speech, mood]);

  const scrollTo = (id) => {
    if (playClick) playClick();
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="hero section" ref={heroRef} aria-label="Meet Pip">
      {/* Decorative floating night elements */}
      <div className="hero-decor" aria-hidden="true">
        {[...Array(9)].map((_, i) => (
          <Star
            key={i}
            size={Math.random() * 12 + 8}
            className="hero-star animate-twinkle"
            style={{
              left: `${8 + Math.random() * 84}%`,
              top: `${10 + Math.random() * 80}%`,
              animationDelay: `${(i * 0.4).toFixed(1)}s`,
              animationDuration: `${2.5 + (i % 3)}s`,
            }}
          />
        ))}
        <div className="hero-cloud hero-cloud-1 animate-cloud" />
        <div className="hero-cloud hero-cloud-2 animate-cloud" style={{ animationDelay: '-7s' }} />
      </div>

      <div className="hero-content wrap">
        <div className="hero-text">
          <div className="hero-system-status-pill">
            <span className="status-blip" aria-hidden="true" />
            <span className="status-text">Pip is currently: Fluffing cloud pillows at 12:00 AM ☁️</span>
          </div>

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
            A curious, sleepy, clumsy little soul with a round skull face, glowing amber eyes,
            and a starry nightcap. Pip composes lullabies, shapes bedtime nightlights, and
            delivers hand-wrapped dreams to neighborhood creatures. Pip giggles at everything and hates silence.
          </p>

          <div className="hero-mood-bar">
            <span className="mood-label">Current Mood:</span>
            <button
              type="button"
              className="mood-chip"
              onClick={handlePipClick}
              title="Click Pip to tickle his nightcap!"
              aria-label={`Pip's mood is ${mood}. Click to tickle Pip.`}
            >
              <Sparkles size={14} className="mood-icon star" />
              <span>{mood}</span>
              <span className="mood-tap-hint">(tap to tickle)</span>
            </button>
          </div>

          <div className="hero-buttons">
            <button className="btn btn-primary" onClick={() => scrollTo('#projects')}>
              <Sparkles size={16} />
              Explore Pip's Work
            </button>
            <button className="btn btn-secondary" onClick={() => scrollTo('#story')}>
              Read Pip's Story
              <ArrowDown size={16} />
            </button>
            <button className="btn btn-ghost" onClick={() => scrollTo('#game')}>
              ⭐ Play Star Catcher
            </button>
          </div>
        </div>

        <div className="hero-avatar-wrapper">
          {/* Animated Interactive Speech Bubble */}
          <div className="pip-speech-bubble" role="status" aria-live="polite">
            <p className="pip-speech-text">{speech}</p>
            <span className="bubble-tail" aria-hidden="true" />
          </div>

          <div className="hero-avatar-glow" aria-hidden="true" />
          
          <button
            type="button"
            className={`hero-avatar-btn ${isBouncing ? 'pip-giggle-bounce' : ''}`}
            onClick={handlePipClick}
            aria-label="Click Pip to tickle him and hear a cute giggle"
            title="Click Pip! (Teehee!)"
            style={{
              transform: `translate(${eyeOffset.x * 0.45}px, ${eyeOffset.y * 0.45}px)`,
            }}
          >
            <img
              src="/assets/pip_avatar_cloud.png"
              alt="Pip, a cute baby with a skull face sitting on a fluffy cloud, wearing a nightcap with a pink bow and warm amber glowing eyes."
              className="hero-avatar"
              width="400"
              height="400"
              loading="eager"
            />
            <span className="avatar-click-badge" aria-hidden="true">
              <Smile size={14} /> Click me!
            </span>
          </button>
        </div>
      </div>

      <div className="hero-scroll-hint" aria-hidden="true">
        <ArrowDown size={16} className="hero-scroll-arrow" />
        <span>Scroll to enter Pip's Midnight Workstation</span>
      </div>
    </section>
  );
}
