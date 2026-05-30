import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.scss';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <Link to="/" className={styles.logo}>
          <span className={styles.logoText}>
            {'NICE🔥'}
            <br />
            {'GADGETS'}
          </span>
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
          <a href="mailto:contact@nicegadgets.com" className={styles.link}>
            Contacts
          </a>
          <Link to="/" className={styles.link}>
            Rights
          </Link>
        </nav>

        <button className={styles.backToTop} onClick={scrollToTop}>
          <span>Back to top</span>
          <div className={styles.topBtn}>
            <i className="fa-solid fa-chevron-up" />
          </div>
        </button>
      </div>
    </footer>
  );
};
