import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './Footer.module.scss';

export const Footer: React.FC = () => {
  const { t } = useTranslation();

  const handleBackToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <a href="/" className={styles.logo}>
          <img src="/img/Logo.svg" alt={t('header.logoAlt')} />
        </a>

        <nav className={styles.nav}>
          <a
            href="https://github.com/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            {t('footer.github')}
          </a>
          <a href="#" className={styles.link}>
            {t('footer.contacts')}
          </a>
          <a href="#" className={styles.link}>
            {t('footer.rights')}
          </a>
        </nav>

        <div className={styles.backToTop} onClick={handleBackToTop}>
          <span>{t('footer.backToTop')}</span>
          <button type="button">
            <img src="/img/arrow_right.svg" alt={t('footer.backToTop')} />
          </button>
        </div>
      </div>
    </footer>
  );
};
