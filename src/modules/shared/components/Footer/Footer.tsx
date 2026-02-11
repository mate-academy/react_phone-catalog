import React from 'react';
import styles from './Footer.module.scss';

export const Footer: React.FC = () => (
  <footer className={styles.footer}>
    <div className={styles.footer__container}>
      <div className={styles.footer__logo}>
        <img src="./icons/Logo.png" alt="Nice Gadgets Logo" height={28} />
      </div>
      <nav className={styles.footer__nav}>
        <a
          href="https://github.com/RomanHasiuk"
          className={styles.footer__link}
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
        <a href="#" className={styles.footer__link}>
          Contacts
        </a>
        <a href="#" className={styles.footer__link}>
          Rights
        </a>
      </nav>
      <div className={styles.footer__toTopWrap}>
        <span className={styles.footer__toTopText}>Back to top</span>
        <button
          className={styles.footer__button}
          aria-label="Back to top"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <img src="./icons/Chevron (Arrow Up).svg" alt="Up" />
        </button>
      </div>
    </div>
  </footer>
);
