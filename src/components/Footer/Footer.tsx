import React from 'react';
import styles from './Footer.module.scss';

export const Footer: React.FC = () => {
  const handleBackToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <a href="/" className={styles.logo}>
          <img src="/img/Logo.svg" alt="Nice Gadgets" />
        </a>

        <nav className={styles.nav}>
          <a
            href="https://github.com/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            Github
          </a>
          <a href="#" className={styles.link}>
            Contacts
          </a>
          <a href="#" className={styles.link}>
            Rights
          </a>
        </nav>

        <div className={styles.backToTop} onClick={handleBackToTop}>
          <span>Back to top</span>
          <button type="button">
            <img src="/img/arrow_right.svg" alt="Back to top" />
          </button>
        </div>
      </div>
    </footer>
  );
};
