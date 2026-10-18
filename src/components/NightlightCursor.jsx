import { useEffect, useRef, useState } from 'react';
import './NightlightCursor.css';

/**
 * NightlightCursor — Genuine pointer-following flashlight / bedside lantern radial glow.
 * Features:
 * - Soft radial glow illuminating the dark around cursor / touch coordinates
 * - Touch dragging support
 * - Toggleable on/off via global state
 * - Reduced-motion graceful handling
 */
export default function NightlightCursor({ enabled, isNight }) {
  const [pos, setPos] = useState({ x: -500, y: -500 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!enabled) return;

    const handlePointerMove = (e) => {
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      setPos({ x: clientX, y: clientY });
      setVisible(true);
    };

    const handlePointerLeave = () => {
      setVisible(false);
    };

    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('touchmove', handlePointerMove);
    window.addEventListener('mouseleave', handlePointerLeave);

    return () => {
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('mouseleave', handlePointerLeave);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      className={`nightlight-flashlight-layer ${visible ? 'is-visible' : ''}`}
      style={{
        '--light-x': `${pos.x}px`,
        '--light-y': `${pos.y}px`,
        '--glow-tint': isNight ? 'rgba(255, 230, 160, 0.22)' : 'rgba(255, 215, 140, 0.15)',
      }}
      aria-hidden="true"
    >
      <div className="flashlight-radial-halo" />
    </div>
  );
}
