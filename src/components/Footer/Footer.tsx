import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.scss';

export const Footer: React.FC = () => {
  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <Link to="/" className={styles.logo}>
          <img
            src="img/logo.svg"
            alt="Phone Catalog"
            className={styles.logo__img}
          />
        </Link>

        <div className={styles.links}>
          <a
            href="https://github.com"
            className={styles.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            Github
          </a>
          <a href="#" className={styles.link}>
            Contacts
          </a>
          <a href="#" className={styles.link}>
            Rights
          </a>
        </div>

        <button
          type="button"
          className={styles.backToTop}
          onClick={handleBackToTop}
        >
          Back to top
          <span className={styles.backToTopIcon}>
            <img src="img/icons/arrow-up.svg" alt="Back to top" />
          </span>
        </button>
      </div>
    </footer>
  );
};
