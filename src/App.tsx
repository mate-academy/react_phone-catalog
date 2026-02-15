import React, { useState, useEffect } from 'react';
import { AppRoutes } from './router/routes';
import './i18n';
import { ThemeSwitcher } from './components/ThemeSwitcher/ThemeSwitcher';
import { LanguageSwitcher } from './components/LanguageSwitcher/LanguageSwitcher';
import { useTranslation } from 'react-i18next';
import './index.scss';

export const App: React.FC = () => {
  const { i18n } = useTranslation();

  const [theme, setTheme] = useState<'light' | 'dark'>(
    localStorage.getItem('theme') === 'light' ? 'light' : 'dark',
  );

  const toggleTheme = () => {
    setTheme(prev => {
      const newTheme = prev === 'light' ? 'dark' : 'light';

      localStorage.setItem('theme', newTheme);

      return newTheme;
    });
  };

  useEffect(() => {
    const savedLang = localStorage.getItem('lang');

    if (savedLang) {
      i18n.changeLanguage(savedLang);
    }
  }, [i18n]);

  useEffect(() => {
    document.body.classList.remove('light-theme', 'dark-theme');
    document.body.classList.add(
      theme === 'dark' ? 'dark-theme' : 'light-theme',
    );
  }, [theme]);

  return (
    <div>
      <ThemeSwitcher theme={theme} toggleTheme={toggleTheme} />
      <LanguageSwitcher />
      <AppRoutes theme={theme} toggleTheme={toggleTheme} />
    </div>
  );
};
