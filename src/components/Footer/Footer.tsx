import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.scss';

const IconArrowUp = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path
      d="M8 13V3M3 8l5-5 5 5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const Footer: React.FC = () => {
  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <Link to="/" className={styles.logo}>
          <span className={styles.logoNice}>NICE</span>
          <span className={styles.logoDot}>▪</span>
          <span className={styles.logoGadgets}>GADGETS</span>
        </Link>

        <nav className={styles.nav}>
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className={styles.navLink}
          >
            Github
          </a>
          <Link to="/contacts" className={styles.navLink}>
            Contacts
          </Link>
          <Link to="/rights" className={styles.navLink}>
            Rights
          </Link>
        </nav>

        <button className={styles.backToTop} onClick={handleBackToTop}>
          <span className={styles.backToTopLabel}>Back to top</span>
          <span className={styles.backToTopIcon}>
            <IconArrowUp />
          </span>
        </button>
      </div>
    </footer>
  );
};
