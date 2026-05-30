// src/components/LanguageSwitcher/LanguageSwitcher.jsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './LanguageSwitcher.module.scss';
import classNames from 'classnames';

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const currentLang = i18n.language;

  const changeLanguage = lng => {
    i18n.changeLanguage(lng);
    localStorage.setItem('language', lng); // збереження обраної мови
  };

  return (
    <div className={styles.langSwitcher}>
      <button
        onClick={() => changeLanguage('en')}
        className={classNames(styles.langBtn, {
          [styles.active]: currentLang === 'en',
        })}
      >
        EN
      </button>
      <span>/</span>
      <button
        onClick={() => changeLanguage('ua')}
        className={classNames(styles.langBtn, {
          [styles.active]: currentLang === 'ua',
        })}
      >
        UA
      </button>
    </div>
  );
};
