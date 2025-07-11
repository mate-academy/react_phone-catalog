import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styles from './Footer.module.scss';

export const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <div className={styles.logo}>
          <Link to="/">Ptone Catalog</Link>
        </div>
        <div className={styles.links}>
          <a href="#terms">Terms</a>
          <a href="#privacy">Privaci</a>
          <a href="#contact">Contact</a>
        </div>
        <button
          className={styles.backToTop}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          {t('backToTop')}
        </button>
      </div>
    </footer>
  );
};
