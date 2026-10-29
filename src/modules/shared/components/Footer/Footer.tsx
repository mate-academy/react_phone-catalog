import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.scss';

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.logo}>
        <Link to={'/'}>
          <img src="icons/logo.svg" alt="Logo" className={styles.logoImg} />
        </Link>
      </div>

      <nav className={styles.nav}>
        <a
          href="https://github.com/mariana-zh/react_phone-catalog"
          target="_blank"
          rel="noreferrer"
          className={styles.links}
        >
          Github
        </a>
        <a
          href="https://github.com/mariana-zh"
          target="_blank"
          rel="noreferrer"
          className={styles.links}
        >
          Contacts
        </a>
        <a
          href="https://github.com/mariana-zh/react_phone-catalog"
          target="_blank"
          rel="noreferrer"
          className={styles.links}
        >
          Rights
        </a>
      </nav>

      <button type="button" className={styles.backToTop} onClick={scrollToTop}>
        <span className={styles.backText}>Back to top</span>
        <span className={styles.backIcon}>
          <img src="icons/arrow-up.svg" alt="Arrow up" />
        </span>
      </button>
    </footer>
  );
};
