import { useState, useEffect } from 'react';

/**
 * useReducedMotion — Detects prefers-reduced-motion and provides a toggle.
 */
export function useReducedMotion() {
  const [reducedMotion, setReducedMotion] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handler = (e) => setReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-reduced-motion', String(reducedMotion));
  }, [reducedMotion]);

  return { reducedMotion, setReducedMotion };
}
