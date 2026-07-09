import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './LanguageSwitcher.module.scss';

const languages = ['en', 'ua', 'pl'];

export const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentLang = i18n.language || 'en';

  return (
    <div className={styles['lang-switcher']} ref={containerRef}>
      <button
        type="button"
        className={styles['lang-switcher__selected']}
        onClick={() => setIsOpen(!isOpen)}
      >
        {currentLang.toUpperCase()}
        <span
          className={`${styles['lang-switcher__arrow']} ${isOpen ? styles['lang-switcher__arrow--open'] : ''}`}
        />
      </button>

      {isOpen && (
        <ul className={styles['lang-switcher__list']}>
          {languages.map(lang => (
            <li key={lang}>
              <button
                type="button"
                className={`${styles['lang-switcher__option']} ${
                  currentLang === lang
                    ? styles['lang-switcher__option--active']
                    : ''
                }`}
                onClick={() => {
                  i18n.changeLanguage(lang);
                  setIsOpen(false);
                }}
              >
                {lang.toUpperCase()}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
