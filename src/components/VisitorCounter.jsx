import { useState, useEffect } from 'react';
import './VisitorCounter.css';

/**
 * VisitorCounter — A retro-style odometer that tracks local visit count.
 * Honestly labeled as browser-local since there's no backend.
 */
export default function VisitorCounter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    try {
      const stored = parseInt(localStorage.getItem('pip-visits') || '1', 10);
      setCount(stored);
    } catch {
      setCount(1);
    }
  }, []);

  // Format count as zero-padded string for the odometer display
  const digits = String(count).padStart(6, '0').split('');

  return (
    <div className="visitor-counter" aria-label={`Visitor count: ${count} (local demo)`}>
      <span className="counter-label">Local Visits</span>
      <div className="counter-display">
        {digits.map((digit, i) => (
          <span key={i} className="counter-digit">
            {digit}
          </span>
        ))}
      </div>
      <span className="counter-note">Demo counter — browser-local only</span>
    </div>
  );
}
