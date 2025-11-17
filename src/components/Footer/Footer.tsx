import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styles from './Footer.module.scss';
import { useTheme } from '../../modules/shared/context/ThemeContext';

export const Footer: React.FC = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();

  const logoSrc = theme === 'dark' ? '/logo/logo.png' : '/logo/logo_dark.png';

  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <div className={styles.logo}>
          <Link to="/">
            <img src={logoSrc} alt="logo" />
          </Link>
        </div>
        <div className={styles.links}>
          <a href="#terms">Terms</a>
          <a href="#privacy">Privaci</a>
          <a href="https://github.com/romazh1988" target="black">
            Contact
          </a>
        </div>
        <button
          className={styles.backToTop}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <div>
            {t('backToTop')}
            <img src="img/icons/up-button.png" alt="Back to top" />
          </div>
        </button>
      </div>
    </footer>
  );
};
