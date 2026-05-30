import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './LanguageSwitcher.module.scss';
import cn from 'classnames';

export const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: 'en' | 'ua') => {
    i18n.changeLanguage(lng);
  };

  const languages = [
    { code: 'en', name: 'EN' },
    { code: 'ua', name: 'UA' },
  ];

  return (
    <div className={styles.switcher}>
      {languages.map(lang => (
        <button
          key={lang.code}
          className={cn(styles.button, {
            [styles.active]: i18n.resolvedLanguage === lang.code,
          })}
          onClick={() => changeLanguage(lang.code as 'en' | 'ua')}
          type="button"
        >
          {lang.name}
        </button>
      ))}
    </div>
  );
};
