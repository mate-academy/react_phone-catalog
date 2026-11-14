import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.scss';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.footer__container}>
        <Link to="/" className={styles.footer__logoLink}>
          <img
            src={`${import.meta.env.BASE_URL}img/Logo.svg`}
            alt="Nice Gadgets"
            className={styles.footer__logo}
          />
        </Link>

        <nav className={styles.footer__nav}>
          <a
            href="https://github.com/cinthyavsavsa"
            target="_blank"
            rel="noreferrer"
            className={styles.footer__link}
          >
            Github
          </a>
          <a
            href="https://github.com/cinthyavsavsa"
            target="_blank"
            rel="noreferrer"
            className={styles.footer__link}
          >
            Contacts
          </a>
          <a
            href="https://github.com/cinthyavsavsa"
            target="_blank"
            rel="noreferrer"
            className={styles.footer__link}
          >
            Rights
          </a>
        </nav>

        <div className={styles.footer__backToTop}>
          <span className={styles.footer__backText}>Back to top</span>
          <button
            type="button"
            onClick={scrollToTop}
            className={styles.footer__topButton}
            aria-label="Back to top"
          >
            ↑
          </button>
        </div>
      </div>
    </footer>
  );
};
