import { useState, useCallback, useEffect } from 'react';
import { useTheme } from './hooks/useTheme.js';
import { useSound } from './hooks/useSound.js';
import { useReducedMotion } from './hooks/useReducedMotion.js';

import BootScreen from './components/BootScreen.jsx';
import Navbar from './components/Navbar.jsx';
import PipHero from './components/PipHero.jsx';
import DreamDesktop from './components/DreamDesktop.jsx';
import CharacterProfile from './components/CharacterProfile.jsx';
import LullabyLab from './components/LullabyLab.jsx';
import NightlightGallery from './components/NightlightGallery.jsx';
import DreamMap from './components/DreamMap.jsx';
import Storybook from './components/Storybook.jsx';
import StarCatcher from './components/StarCatcher.jsx';
import StoryJourney from './components/StoryJourney.jsx';
import Guestbook from './components/Guestbook.jsx';
import EasterEgg from './components/EasterEgg.jsx';
import SettingsPanel from './components/SettingsPanel.jsx';
import SparkleTrail from './components/SparkleTrail.jsx';
import NightlightCursor from './components/NightlightCursor.jsx';
import Footer from './components/Footer.jsx';
import { Moon, Sun, Volume2, VolumeX, Flashlight, Settings, X, Sparkles } from 'lucide-react';

/**
 * App — Root orchestrator for Pip's Midnight Dream OS.
 * Features:
 * - Boot diagnostic sequence with skip
 * - Returning visitor recognition banner
 * - Global audio synchronization (mute, volume, synthesis)
 * - Nightlight flashlight cursor & sparkle trail
 * - 5 fully functioning showcase projects including Star Catcher mini-game
 * - Settings drawer & chaos mode
 */
export default function App() {
  const { theme, toggleTheme, isNight } = useTheme();
  const {
    isMuted,
    toggleMute,
    volume,
    setVolume,
    playTone,
    playClick,
    playChime,
    playGiggle,
    playCatch,
    playLullaby,
    stopAllSound
  } = useSound();
  const { reducedMotion, setReducedMotion } = useReducedMotion();

  const [booted, setBooted] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [sparklesEnabled, setSparklesEnabled] = useState(true);
  const [nightlightCursor, setNightlightCursor] = useState(false);
  const [chaosMode, setChaosMode] = useState(false);

  // Returning visitor recognition
  const [visitorInfo, setVisitorInfo] = useState({ count: 1, isReturning: false });
  const [showWelcomeBack, setShowWelcomeBack] = useState(false);

  useEffect(() => {
    try {
      const stored = parseInt(localStorage.getItem('pip-visits') || '0', 10);
      const nextCount = stored + 1;
      localStorage.setItem('pip-visits', String(nextCount));
      if (stored > 0) {
        setVisitorInfo({ count: nextCount, isReturning: true });
      }
    } catch {
      // Storage unavailable
    }
  }, []);

  const handleBoot = useCallback(() => {
    setBooted(true);
    playChime();
    if (visitorInfo.isReturning) {
      setShowWelcomeBack(true);
      setTimeout(() => setShowWelcomeBack(false), 7000);
    }
  }, [playChime, visitorInfo.isReturning]);

  const handleSettingsOpen = useCallback(() => {
    setSettingsOpen(true);
    playClick();
  }, [playClick]);

  if (!booted) {
    return <BootScreen onComplete={handleBoot} />;
  }

  return (
    <div className={`app ${chaosMode ? 'chaos-mode' : ''}`} data-theme={theme}>
      {/* Visual Cursor Enhancements */}
      {sparklesEnabled && !reducedMotion && <SparkleTrail />}
      <NightlightCursor enabled={nightlightCursor} isNight={isNight} />

      {/* Returning Visitor Welcome Banner */}
      {showWelcomeBack && (
        <div className="welcome-back-banner" role="status" aria-live="polite">
          <div className="welcome-banner-content">
            <Sparkles size={16} className="welcome-star" />
            <span>Welcome back to the nursery, Sleepy Dreamer! (Visit #{visitorInfo.count}) ✨</span>
            <button
              type="button"
              className="welcome-dismiss-btn"
              onClick={() => setShowWelcomeBack(false)}
              aria-label="Dismiss welcome banner"
            >
              <X size={14} />
            </button>
          </div>
        </div>
      )}

      {/* Main Navigation */}
      <Navbar
        theme={theme}
        toggleTheme={toggleTheme}
        isMuted={isMuted}
        toggleMute={toggleMute}
        onSettingsOpen={handleSettingsOpen}
      />

      <main>
        {/* Hero Section */}
        <PipHero
          isNight={isNight}
          playClick={playClick}
          playGiggle={playGiggle}
        />

        {/* Nostalgic Desktop */}
        <DreamDesktop playClick={playClick} />

        {/* Canon Character Profile */}
        <CharacterProfile />

        {/* The Dream Workshop: 5 Interactive Showcase Projects */}
        <section id="projects" className="section" aria-label="Pip's Dream Workshop">
          <div className="wrap">
            <div className="section-title">
              <h2>✨ The Dream Workshop</h2>
              <p>Step inside Pip's magical workspace. Each project is handcrafted with starlight and imagination.</p>
            </div>

            {/* Project A: Lullaby Lab */}
            <LullabyLab
              isMuted={isMuted}
              volume={volume}
              setVolume={setVolume}
              playLullaby={playLullaby}
              playTone={playTone}
              playClick={playClick}
              stopAllSound={stopAllSound}
              toggleMute={toggleMute}
            />

            {/* Project B: Nightlight Collection */}
            <NightlightGallery playClick={playClick} />

            {/* Project C: Dream Delivery Routes */}
            <DreamMap playClick={playClick} />

            {/* Project D: Bedtime Storybook */}
            <Storybook playClick={playClick} />

            {/* Project E: Star Catcher Mini Game */}
            <StarCatcher
              playCatch={playCatch}
              playClick={playClick}
              playChime={playChime}
            />
          </div>
        </section>

        {/* Scroll-Driven Origin Story */}
        <StoryJourney isNight={isNight} />

        {/* Persistent Dream Guestbook */}
        <Guestbook playClick={playClick} playChime={playChime} />

        {/* Hidden Easter Egg */}
        <EasterEgg playChime={playChime} />
      </main>

      {/* Handcrafted Early-Web Footer */}
      <Footer playClick={playClick} />

      {/* Global Quick Action Floating Dock */}
      <aside className="quick-dock" aria-label="Quick Access Controls">
        <button
          type="button"
          className={`dock-btn ${nightlightCursor ? 'dock-active' : ''}`}
          onClick={() => {
            playClick();
            setNightlightCursor(prev => !prev);
          }}
          title={nightlightCursor ? 'Turn off lantern flashlight' : 'Turn on lantern flashlight'}
          aria-label={nightlightCursor ? 'Disable flashlight cursor' : 'Enable flashlight cursor'}
        >
          <Flashlight size={16} />
        </button>
        <button
          type="button"
          className="dock-btn"
          onClick={handleSettingsOpen}
          title="Open Dream Settings"
          aria-label="Open settings panel"
        >
          <Settings size={16} />
        </button>
      </aside>

      {/* Full Settings & Accessibility Drawer */}
      <SettingsPanel
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        theme={theme}
        toggleTheme={toggleTheme}
        isMuted={isMuted}
        toggleMute={toggleMute}
        volume={volume}
        setVolume={setVolume}
        nightlightCursor={nightlightCursor}
        setNightlightCursor={setNightlightCursor}
        reducedMotion={reducedMotion}
        setReducedMotion={setReducedMotion}
        sparklesEnabled={sparklesEnabled}
        setSparklesEnabled={setSparklesEnabled}
        chaosMode={chaosMode}
        setChaosMode={setChaosMode}
        playClick={playClick}
      />
    </div>
  );
}
