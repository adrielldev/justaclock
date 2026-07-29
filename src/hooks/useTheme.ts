import { useState, useEffect } from 'react';
import { Theme } from '../types';

const THEME_KEY = 'app-theme';

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem(THEME_KEY) as Theme;
    return saved || 'dark';
  });

  useEffect(() => {
    localStorage.setItem(THEME_KEY, theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return { theme, setTheme };
}