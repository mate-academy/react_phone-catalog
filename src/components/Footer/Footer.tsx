import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { useTranslation } from 'react-i18next';
import { Navigation } from '../Navigation';
import styles from './Footer.module.scss';

// Import icons
import logo from './icons/logo.png';
import logoDark from './icons/logo-dark.png';
import goUp from './icons/go-up.png';
import goUpDark from './icons/go-up-dark.png';

export const Footer: React.FC = () => {
  const { theme } = useTheme();
  const { t } = useTranslation();

  // Get theme-based icons
  const logoIcon = theme === 'dark' ? logoDark : logo;
  const goUpIcon = theme === 'dark' ? goUpDark : goUp;

  // Scroll to top function
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Logo */}
        <Link to="/" className={styles.logo} aria-label="Go to home">
          <img src={logoIcon} alt="Nice Gadgets" className={styles.logoImageFooter} />
        </Link>

        {/* Navigation */}
        <div className={styles.navigation}>
          <Navigation variant="footer" />
        </div>

        {/* Back to Top Button */}
        <div className={styles.backToTop}>
          <span className={styles.backToTopText}>{t('footer.backToTop')}</span>
          <button className={styles.backToTopButton} onClick={handleScrollToTop} aria-label="Scroll to top">
            <img src={goUpIcon} alt="Back to top" className={styles.backToTopIcon} />
          </button>
        </div>
      </div>
    </footer>
  );
};
