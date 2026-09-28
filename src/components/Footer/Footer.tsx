import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.scss';

export const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__content}>
        <Link to="/" className={styles.footer__logo}>
          <img src="./img/logo.svg" alt="Nice Gadgets Logo" />
        </Link>

        <div className={styles.footer__nav}>
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className={styles.footer__link}
          >
            GitHub
          </a>
          <a href="#/contacts" className={styles.footer__link}>
            Contacts
          </a>
          <a href="#/rights" className={styles.footer__link}>
            Rights
          </a>
        </div>

        <button
          type="button"
          className={styles.footer__backToTop}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          Back to top
        </button>
      </div>
    </footer>
  );
};
