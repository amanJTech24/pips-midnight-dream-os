import { useState, useEffect, useRef, useCallback } from 'react';
import { Sparkles, Play, RotateCcw, Trophy, ArrowLeft, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import './StarCatcher.css';

/**
 * StarCatcher — Project E: Pip's Cozy Star Catcher Mini-Game.
 * Features:
 * - Playable arcade loop with falling dream stars
 * - Keyboard (Arrow keys, A/D), mouse/touch drag, and on-screen touch arrows
 * - Score, high score in localStorage, timer, audio chime feedback
 * - Confetti victory celebration when collecting 10 stars
 */
export default function StarCatcher({ playCatch, playClick, playChime }) {
  const [gameState, setGameState] = useState('idle'); // 'idle' | 'playing' | 'won' | 'over'
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [highScore, setHighScore] = useState(() => {
    try {
      return parseInt(localStorage.getItem('pip-star-highscore') || '0', 10);
    } catch {
      return 0;
    }
  });

  const boardRef = useRef(null);
  const basketXRef = useRef(50); // percentage (0 to 100)
  const [basketDisplayX, setBasketDisplayX] = useState(50);
  const starsRef = useRef([]);
  const animFrameRef = useRef(null);
  const lastSpawnRef = useRef(0);
  const targetScore = 10;

  const startGame = () => {
    if (playClick) playClick();
    setScore(0);
    setTimeLeft(30);
    basketXRef.current = 50;
    setBasketDisplayX(50);
    starsRef.current = [];
    lastSpawnRef.current = Date.now();
    setGameState('playing');
  };

  // Keyboard controls
  useEffect(() => {
    if (gameState !== 'playing') return;

    const handleKeyDown = (e) => {
      const step = 8;
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        basketXRef.current = Math.max(8, basketXRef.current - step);
        setBasketDisplayX(basketXRef.current);
      } else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        basketXRef.current = Math.min(92, basketXRef.current + step);
        setBasketDisplayX(basketXRef.current);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState]);

  // Mouse / Touch pointer control on game board
  const handlePointerMove = (e) => {
    if (gameState !== 'playing' || !boardRef.current) return;
    const rect = boardRef.current.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const relX = ((clientX - rect.left) / rect.width) * 100;
    const clamped = Math.max(8, Math.min(92, relX));
    basketXRef.current = clamped;
    setBasketDisplayX(clamped);
  };

  // On-screen mobile button nudges
  const moveBasket = (direction) => {
    const step = 12;
    if (direction === 'left') {
      basketXRef.current = Math.max(8, basketXRef.current - step);
    } else {
      basketXRef.current = Math.min(92, basketXRef.current + step);
    }
    setBasketDisplayX(basketXRef.current);
  };

  // 1-second interval timer
  useEffect(() => {
    if (gameState !== 'playing') return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setGameState('over');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameState]);

  // Main game animation loop
  useEffect(() => {
    if (gameState !== 'playing') return;

    const updateGame = () => {
      const now = Date.now();

      // Spawn new falling star every 900ms
      if (now - lastSpawnRef.current > 850) {
        starsRef.current.push({
          id: Math.random(),
          x: Math.random() * 84 + 8, // percentage
          y: 0,
          speed: Math.random() * 0.45 + 0.55,
          emoji: Math.random() > 0.3 ? '⭐' : '✨'
        });
        lastSpawnRef.current = now;
      }

      // Move stars down & check collisions
      const basketX = basketXRef.current;
      const basketHitWidth = 14; // hit window in percent
      const caughtStars = [];

      starsRef.current = starsRef.current
        .map((star) => ({
          ...star,
          y: star.y + star.speed
        }))
        .filter((star) => {
          // Check collision near bottom (y between 78% and 88%)
          if (star.y >= 78 && star.y <= 88) {
            if (Math.abs(star.x - basketX) < basketHitWidth) {
              caughtStars.push(star);
              return false; // remove caught star
            }
          }
          // Remove if fallen below floor
          return star.y < 100;
        });

      if (caughtStars.length > 0) {
        if (playCatch) playCatch();
        setScore((prevScore) => {
          const newScore = prevScore + caughtStars.length;
          if (newScore >= targetScore) {
            setGameState('won');
            if (playChime) playChime();
            try {
              confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
            } catch { /* graceful fallback */ }
          }
          return newScore;
        });
      }

      animFrameRef.current = requestAnimationFrame(updateGame);
    };

    animFrameRef.current = requestAnimationFrame(updateGame);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [gameState, playCatch, playChime]);

  // High score tracking
  useEffect(() => {
    if (score > highScore) {
      setHighScore(score);
      try {
        localStorage.setItem('pip-star-highscore', String(score));
      } catch { /* storage blocked */ }
    }
  }, [score, highScore]);

  return (
    <div id="game" className="star-catcher-card card" aria-label="Star Catcher Mini Game">
      <div className="game-header">
        <div className="project-badge">
          <Sparkles size={16} />
          <span>Project E // Star_Catcher.game</span>
        </div>
        <h3>Pip's Star Catcher</h3>
        <p className="project-tagline">
          Catch 10 falling dream stars in Pip's fluffy cloud basket before bedtime arrives!
        </p>
      </div>

      <div className="game-stats-bar">
        <div className="stat-pill">
          <span className="stat-label">Stars:</span>
          <span className="stat-val">{score} / {targetScore}</span>
        </div>
        <div className="stat-pill">
          <span className="stat-label">Time:</span>
          <span className={`stat-val ${timeLeft <= 5 ? 'stat-urgent' : ''}`}>{timeLeft}s</span>
        </div>
        <div className="stat-pill">
          <Trophy size={14} className="star" />
          <span className="stat-label">Best:</span>
          <span className="stat-val">{highScore}</span>
        </div>
      </div>

      <div
        ref={boardRef}
        className="game-board"
        onMouseMove={handlePointerMove}
        onTouchMove={handlePointerMove}
        tabIndex={0}
        aria-label="Star Catcher Playfield. Use left/right arrow keys or drag mouse."
      >
        {gameState === 'idle' && (
          <div className="game-overlay">
            <span className="game-overlay-icon">⭐</span>
            <h4>Help Pip Gather Starlight!</h4>
            <p>Catch 10 stars with Pip's cloud basket to light up the neighborhood nightlights.</p>
            <button type="button" className="btn btn-primary" onClick={startGame}>
              <Play size={16} /> Start Game
            </button>
            <span className="game-control-tip">Controls: Arrow Keys, A/D, Mouse, or Screen Drag</span>
          </div>
        )}

        {gameState === 'won' && (
          <div className="game-overlay animate-fade-in">
            <span className="game-overlay-icon">🏆</span>
            <h4>Dream Bag Full!</h4>
            <p>Hooray! You gathered {score} stars in {30 - timeLeft}s. Tonight's lullabies will shine brightly!</p>
            <button type="button" className="btn btn-primary" onClick={startGame}>
              <RotateCcw size={16} /> Play Again
            </button>
          </div>
        )}

        {gameState === 'over' && (
          <div className="game-overlay animate-fade-in">
            <span className="game-overlay-icon">🌙</span>
            <h4>Bedtime Arrived!</h4>
            <p>You gathered {score} stars. Don't worry, Pip's nursery is always ready for another try!</p>
            <button type="button" className="btn btn-secondary" onClick={startGame}>
              <RotateCcw size={16} /> Try Again
            </button>
          </div>
        )}

        {/* Falling Stars */}
        {gameState === 'playing' &&
          starsRef.current.map((star) => (
            <div
              key={star.id}
              className="falling-star"
              style={{
                left: `${star.x}%`,
                top: `${star.y}%`,
              }}
              aria-hidden="true"
            >
              <span>{star.emoji}</span>
            </div>
          ))}

        {/* Pip's Cloud Basket */}
        <div
          className="cloud-basket"
          style={{
            left: `${basketDisplayX}%`,
          }}
          aria-hidden="true"
        >
          <span className="basket-pip">👶</span>
          <span className="basket-cloud">☁️</span>
        </div>
      </div>

      {/* Mobile-friendly on-screen steering arrows */}
      <div className="game-touch-controls" aria-label="Touch Navigation">
        <button
          type="button"
          className="btn btn-ghost touch-nudge-btn"
          onClick={() => moveBasket('left')}
          disabled={gameState !== 'playing'}
          aria-label="Move Pip Left"
        >
          <ArrowLeft size={16} /> Left
        </button>
        <span className="touch-hint">Tap arrows or drag on board</span>
        <button
          type="button"
          className="btn btn-ghost touch-nudge-btn"
          onClick={() => moveBasket('right')}
          disabled={gameState !== 'playing'}
          aria-label="Move Pip Right"
        >
          Right <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}
