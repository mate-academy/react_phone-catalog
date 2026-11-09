import { NavLink } from 'react-router-dom';

import styles from './Footer.module.scss';
import { useTheme } from '../../shared/context/ThemeContext';

export const Footer = () => {
  const handleBackToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const { theme } = useTheme();

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        {/* Logo */}
        <NavLink
          to="/"
          replace
          className={styles.logo}
          aria-label="Go to homepage"
        >
          <img
            src={
              theme === 'dark'
                ? './img/logo/Logo.svg'
                : './img/logo/LogoLight.svg'
            }
            alt="Logo"
            className={styles.logoImage}
          />
        </NavLink>

        {/* Navigation */}
        <nav className={styles.nav}>
          <a
            href="https://github.com/JenyBerezhna?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.github}
          >
            GITHUB
          </a>

          <NavLink to="/contacts" className={styles.contacts}>
            CONTACTS
          </NavLink>

          <NavLink to="/rights" className={styles.rights}>
            RIGHTS
          </NavLink>
        </nav>

        {/* Back to top */}
        <button
          type="button"
          onClick={handleBackToTop}
          className={styles.backToTop}
          aria-label="Back to top"
        >
          <span className={styles.backToTopText}>Back to top</span>

          <span className={styles.backToTopIcon}>
            <span className={styles.backToTopIconImage} aria-hidden="true" />
          </span>
        </button>
      </div>
    </footer>
  );
};
