import { useState, useCallback } from 'react';
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
import StoryJourney from './components/StoryJourney.jsx';
import Guestbook from './components/Guestbook.jsx';
import EasterEgg from './components/EasterEgg.jsx';
import SettingsPanel from './components/SettingsPanel.jsx';
import VisitorCounter from './components/VisitorCounter.jsx';
import SparkleTrail from './components/SparkleTrail.jsx';
import Footer from './components/Footer.jsx';

/**
 * App — Root component for Pip's Midnight Dream OS.
 * Manages global state: theme, sound, boot screen, settings, sparkles, chaos mode.
 */
export default function App() {
  const { theme, toggleTheme, isNight } = useTheme();
  const { isMuted, toggleMute, playClick, playChime, playLullaby, playTone } = useSound();
  const { reducedMotion, setReducedMotion } = useReducedMotion();

  const [booted, setBooted] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [sparklesEnabled, setSparklesEnabled] = useState(true);
  const [chaosMode, setChaosMode] = useState(false);

  const handleBoot = useCallback(() => {
    setBooted(true);
    playChime();
  }, [playChime]);

  const handleSettingsOpen = useCallback(() => {
    setSettingsOpen(true);
    playClick();
  }, [playClick]);

  // Increment visitor counter on first boot
  useState(() => {
    try {
      const count = parseInt(localStorage.getItem('pip-visits') || '0', 10);
      localStorage.setItem('pip-visits', String(count + 1));
    } catch { /* localStorage unavailable */ }
  });

  if (!booted) {
    return <BootScreen onComplete={handleBoot} />;
  }

  return (
    <div className={`app ${chaosMode ? 'chaos-mode' : ''}`} data-theme={theme}>
      {sparklesEnabled && !reducedMotion && <SparkleTrail />}

      <Navbar
        theme={theme}
        toggleTheme={toggleTheme}
        isMuted={isMuted}
        toggleMute={toggleMute}
        onSettingsOpen={handleSettingsOpen}
      />

      <main>
        <PipHero isNight={isNight} />

        <DreamDesktop playClick={playClick} />

        <CharacterProfile />

        <section id="projects" className="section" aria-label="Pip's Dream Workshop">
          <div className="wrap">
            <div className="section-title">
              <h2>✨ The Dream Workshop</h2>
              <p>Step inside Pip's magical workspace. Each project is handcrafted with moonlight and imagination.</p>
            </div>

            <LullabyLab
              isMuted={isMuted}
              playLullaby={playLullaby}
              playTone={playTone}
              playClick={playClick}
            />

            <NightlightGallery playClick={playClick} />

            <DreamMap playClick={playClick} />

            <Storybook playClick={playClick} />
          </div>
        </section>

        <StoryJourney isNight={isNight} />

        <Guestbook playClick={playClick} playChime={playChime} />

        <EasterEgg playChime={playChime} />
      </main>

      <Footer playClick={playClick} />

      <SettingsPanel
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        theme={theme}
        toggleTheme={toggleTheme}
        isMuted={isMuted}
        toggleMute={toggleMute}
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
