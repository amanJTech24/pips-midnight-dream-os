import { useState } from 'react';
import { Moon, Sun, Volume2, VolumeX, Settings, Sparkles, Star, Menu, X } from 'lucide-react';
import './Navbar.css';

/**
 * Navbar — Dream OS navigation bar with theme toggle, sound toggle, and section links.
 */
export default function Navbar({ theme, toggleTheme, isMuted, toggleMute, onSettingsOpen }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#projects' },
    { label: 'Game', href: '#game' },
    { label: 'Story', href: '#story' },
    { label: 'Map', href: '#dream-map' },
    { label: 'Guestbook', href: '#guestbook' },
  ];

  const scrollTo = (href) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="navbar" role="banner">
      <nav className="navbar-inner wrap" aria-label="Main navigation">
        <a href="#hero" className="navbar-brand" onClick={(e) => { e.preventDefault(); scrollTo('#hero'); }}>
          <Star size={18} className="navbar-star" aria-hidden="true" />
          <span className="navbar-title">Pip's Dream OS</span>
          <span className="navbar-version">v1.0</span>
        </a>

        <ul className={`navbar-links ${menuOpen ? 'navbar-links--open' : ''}`} role="list">
          {navItems.map(item => (
            <li key={item.href}>
              <a
                href={item.href}
                onClick={(e) => { e.preventDefault(); scrollTo(item.href); }}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="navbar-controls">
          <button
            className="navbar-icon-btn"
            onClick={toggleMute}
            aria-label={isMuted ? 'Unmute sounds' : 'Mute sounds'}
            title={isMuted ? 'Unmute sounds' : 'Mute sounds'}
          >
            {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </button>

          <button
            className="navbar-icon-btn"
            onClick={toggleTheme}
            aria-label={theme === 'night' ? 'Switch to day mode' : 'Switch to night mode'}
            title={theme === 'night' ? 'Switch to day mode' : 'Switch to night mode'}
          >
            {theme === 'night' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <button
            className="navbar-icon-btn"
            onClick={onSettingsOpen}
            aria-label="Open settings"
            title="Settings"
          >
            <Settings size={18} />
          </button>

          <button
            className="navbar-menu-btn"
            onClick={() => setMenuOpen(prev => !prev)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>
    </header>
  );
}
