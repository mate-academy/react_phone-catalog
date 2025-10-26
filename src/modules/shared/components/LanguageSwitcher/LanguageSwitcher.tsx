import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './LanguageSwitcher.module.scss';

export const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('language', lng);
  };

  return (
    <div className={styles['language-switcher']}>
      <button
        className={`${styles['language-switcher__button']} ${i18n.language === 'en' ? styles['language-switcher__button--active'] : ''
          }`}
        onClick={() => changeLanguage('en')}
        aria-label="Switch to English"
      >
        EN
      </button>
      <button
        className={`${styles['language-switcher__button']} ${i18n.language === 'uk' ? styles['language-switcher__button--active'] : ''
          }`}
        onClick={() => changeLanguage('uk')}
        aria-label="Перемкнути на українську"
      >
        UA
      </button>
    </div>
  );
};
