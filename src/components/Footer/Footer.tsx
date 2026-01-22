import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.scss';

export const Footer = () => {
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <Link to="/" className={styles.logo}>
          <img src="/img/logo.svg" alt="Nice Gadgets logo" />
        </Link>

        <div className={styles.links}>
          <a
            href="https://github.com/mate-academy"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.navLink}
          >
            Github
          </a>
          <a href="#" className={styles.navLink}>
            Contacts
          </a>
          <a href="#" className={styles.navLink}>
            Rights
          </a>
        </div>

        <div className={styles.backToTop} onClick={handleScrollToTop}>
          <span className={styles.backText}>Back to top</span>
          <button className={styles.backBtn} aria-label="Scroll to top">
            <img src="/img/icons/arrow-top.svg" alt="Up" />
          </button>
        </div>
      </div>
    </footer>
  );
};
