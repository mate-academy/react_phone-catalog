import React from 'react';
import { Link } from 'react-router-dom';
import { normalizePath } from '../../api/products';
import styles from './Footer.module.scss';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.logoBlock}>
          <Link to="/" className={styles.logoLink}>
            <img
              src={normalizePath('/img/logo.svg')}
              alt="Nice Gadgets Logo"
              className={styles.logo}
            />
          </Link>
        </div>

        <div className={styles.navBlock}>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.navLink}
          >
            Github
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.navLink}
          >
            Contacts
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.navLink}
          >
            Rights
          </a>
        </div>

        <div className={styles.toTopBlock}>
          <span className={styles.toTopText}>Back to top</span>
          <button
            type="button"
            onClick={scrollToTop}
            className={styles.toTopButton}
            aria-label="Back to top"
          >
            <span className={styles.arrowIcon} />
          </button>
        </div>
      </div>
    </footer>
  );
};
