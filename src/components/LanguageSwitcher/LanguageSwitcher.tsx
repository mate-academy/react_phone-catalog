import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './LanguageSwitcher.module.scss';

interface LanguageSwitcherProps {
  isBurgerOpen?: boolean;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  isBurgerOpen,
}) => {
  const { i18n } = useTranslation();
  const currentLang = i18n.language;

  if (isBurgerOpen) {
    return null;
  }

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('lang', lng);
  };

  return (
    <div className={styles.switcher}>
      {['en', 'uk', 'pl'].map(lng => (
        <button
          key={lng}
          onClick={() => changeLanguage(lng)}
          className={currentLang === lng ? styles.active : ''}
        >
          {lng.toUpperCase()}
        </button>
      ))}
    </div>
  );
};
