import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './LanguageSwitcher.module.scss';

export const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLanguage = i18n.language === 'en' ? 'ua' : 'en';

    i18n.changeLanguage(newLanguage);
    localStorage.setItem('language', newLanguage); // Persist language choice
  };

  return (
    <button className={`${styles.languageSwitcher} ${i18n.language === 'ua' ? styles.ukrainian : styles.english}`} onClick={toggleLanguage} aria-label={`Switch to ${i18n.language === 'en' ? 'Ukrainian' : 'English'} language`} type="button">
      <span className={styles.track}>
        <span className={styles.label}>{i18n.language === 'en' ? 'УКР' : 'ENG'}</span>
        <span className={styles.thumb}></span>
      </span>
    </button>
  );
};
