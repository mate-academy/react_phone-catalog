import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.scss';

export const Footer = () => {
  return (
    <footer className={`${styles.footer} ${styles}`}>
      <Link className={styles.footerLogo} to="/">
        <img src="/img/icons/Logo.svg" alt="Logo" />
      </Link>
      <div className={styles.links}>
        <a
          className={styles.link}
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
        <a
          className={styles.link}
          href="/contacts"
          target="_blank"
          rel="noopener noreferrer"
        >
          Contacts
        </a>
        <a
          className={styles.link}
          href="/rights"
          target="_blank"
          rel="noopener noreferrer"
        >
          Rights
        </a>
      </div>
      <button
        className={styles.button}
        onClick={() => window.scrollTo({ top: 0 })}
      >
        Back to top
        <div className={styles.icon}>
          <img src="/img/icons/Chevron_(Arrow_Up).svg" alt="go to top" />
        </div>
      </button>
    </footer>
  );
};
