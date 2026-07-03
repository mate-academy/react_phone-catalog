import React from 'react';
import { Link } from 'react-router-dom';

import styles from './Footer.module.scss';
import { useLanguage, Language } from '../../context/LanguageContext';

export const Footer: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className={styles.footer} data-testid="footer">
      <div className={`container ${styles.inner}`}>
        <Link
          to="/"
          className={styles.logoLink}
          aria-label="Phone Catalog Home"
          unstable_viewTransition
        >
          <i className="fa-solid fa-mobile-screen-button" />
          <span>GADGETS</span>
        </Link>

        <div className={styles.links}>
          <a
            href="https://github.com/xapg6acc"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            {t('footer.github')}
          </a>
          <a
            href="https://www.linkedin.com/in/ivan-boiko-84a171112/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            {t('footer.contacts')}
          </a>
          <a
            href="https://github.com/mate-academy/react_phone-catalog"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            {t('footer.rights')}
          </a>
        </div>

        <div className={styles.selectContainer}>
          <div className={styles.selectWrapper}>
            <select
              value={language}
              onChange={e => setLanguage(e.target.value as Language)}
              className={styles.select}
              aria-label={t('footer.selectLanguage')}
            >
              <option value="en">English</option>
              <option value="uk">Українська</option>
              <option value="de">Deutsch</option>
              <option value="pl">Polski</option>
            </select>
            <i className={`fa-solid fa-chevron-down ${styles.selectArrow}`} />
          </div>
        </div>

        <button
          type="button"
          onClick={handleScrollToTop}
          className={styles.backToTop}
          aria-label={t('footer.backToTop')}
        >
          <span>{t('footer.backToTop')}</span>
          <span className={styles.arrowBtn}>
            <i className="fa-solid fa-arrow-up" />
          </span>
        </button>
      </div>
    </footer>
  );
};
