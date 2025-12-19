import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.scss';

// Import images to ensure bundler (Vite/Webpack) finds them correctly
// Adjust path based on your folder structure
import logoFooter from '/img/Logo1.svg';
import iconUp from '../../../../../public/img/up-icon.svg';

export const Footer: React.FC = () => {
  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={styles.footer}>
      <Link to="/" className={styles.footer__logo} onClick={handleScrollTop}>
        <img src={logoFooter} alt="Logo" />
      </Link>

      <div className={styles.footer__links}>
        <a
          className={styles.footer__link}
          href="https://github.com/adonch/react_phone-catalog/tree/develop"
          target="_blank"
          rel="noopener noreferrer"
        >
          GITHUB
        </a>
        <Link className={styles.footer__link} to="/">
          CONTACTS
        </Link>
        <Link className={styles.footer__link} to="/">
          RIGHTS
        </Link>
      </div>

      <button
        className={styles.footer__backtoTopButton}
        onClick={handleScrollTop}
        aria-label="Scroll back to top" // Good for accessibility
      >
        <span className={styles.footer__backtoTopText}>Back to top</span>
        <div className={styles.footer__backtoTopIcon}>
          <img src={iconUp} alt="" />
        </div>
        {/* Empty alt because button has aria-label */}
      </button>
    </footer>
  );
};

export default Footer;
