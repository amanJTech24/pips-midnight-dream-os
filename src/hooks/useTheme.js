import { useState, useEffect, useCallback } from 'react';

/**
 * useTheme — Manages day/night theme with localStorage persistence.
 */
export function useTheme() {
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem('pip-theme') || 'day';
    } catch {
      return 'day';
    }
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem('pip-theme', theme);
    } catch { /* localStorage unavailable */ }
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme(prev => prev === 'day' ? 'night' : 'day');
  }, []);

  const isNight = theme === 'night';

  return { theme, toggleTheme, isNight };
}
