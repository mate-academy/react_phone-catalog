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
            src="/img/logo.svg"
            alt="Phone Catalog"
            className={styles.logo__img}
          />
        </Link>

        <nav className={styles.links}>
          <a
            href="https://github.com/ht1204/react_phone-catalog"
            className={styles.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            Github
          </a>
          <Link to="/" className={styles.link}>
            Contacts
          </Link>
          <Link to="/" className={styles.link}>
            Rights
          </Link>
        </nav>

        <button
          type="button"
          className={styles.backToTop}
          onClick={handleBackToTop}
        >
          Back to top
          <span className={styles.backToTopIcon}>
            <img src="/img/icons/arrow-up.svg" alt="" aria-hidden="true" />
          </span>
        </button>
      </div>
    </footer>
  );
};
