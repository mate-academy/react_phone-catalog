import React from 'react';
import styles from './Footer.module.scss';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <img src="img/logo.svg" alt="Logo" className={styles.logo} />

        <nav className={styles.nav}>
          <a
            href="https://github.com/"
            className={styles.link}
            target="_blank"
            rel="noreferrer"
          >
            Github
          </a>
          <a href="#contacts" className={styles.link}>
            Contacts
          </a>
          <a href="#rights" className={styles.link}>
            Rights
          </a>
        </nav>

        <button className={styles.backToTop} onClick={scrollToTop}>
          Back to top
          <div className={styles.arrow}>
            <img src="img/icons/Chevron (Arrow Up).svg" alt="Up" />
          </div>
        </button>
      </div>
    </footer>
  );
};
