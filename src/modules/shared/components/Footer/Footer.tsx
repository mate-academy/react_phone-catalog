import React from 'react';
import { NavLink } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import styles from './Footer.module.scss';

export const Footer: React.FC = () => {
  const { t } = useLanguage();

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className={styles.footer} data-cy="appFooter">
      <div className={styles.container}>
        <NavLink to="/" className={styles.logo}>
          NICE<span>GADGETS</span>
        </NavLink>

        <div className={styles.links}>
          <a
            href="https://github.com/mate-academy"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            {t('githubRepo')}
          </a>
          <span className={styles.link}>Contacts</span>
          <span className={styles.link}>{t('rights')}</span>
        </div>

        <button
          type="button"
          onClick={handleScrollToTop}
          className={styles.backToTop}
        >
          <span>{t('backToTop')}</span>
          <span className={styles.iconButton}>
            <i className="fas fa-arrow-up" />
          </span>
        </button>
      </div>
    </footer>
  );
};
