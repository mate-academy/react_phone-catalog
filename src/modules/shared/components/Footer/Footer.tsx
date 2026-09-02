import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.scss';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>
          <img
            src={`${import.meta.env.BASE_URL}img/icons/logo.svg`}
            alt="Nice Gadgets Logo"
          />
        </Link>

        <nav className={styles.nav}>
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className={styles.link}
          >
            Github
          </a>
          <a
            href="https://mate.academy"
            target="_blank"
            rel="noreferrer"
            className={styles.link}
          >
            Contacts
          </a>
          <a
            href="https://mate.academy"
            target="_blank"
            rel="noreferrer"
            className={styles.link}
          >
            Rights
          </a>
        </nav>

        <div className={styles.backToTop}>
          <span className={styles.backText}>Back to top</span>
          <button
            type="button"
            onClick={scrollToTop}
            className={styles.backButton}
            aria-label="Back to top"
          >
            <img
              src={`${import.meta.env.BASE_URL}img/icons/arrow.svg`}
              alt="Arrow up"
              className={styles.icon}
            />
          </button>
        </div>
      </div>
    </footer>
  );
};
