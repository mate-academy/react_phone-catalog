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
      <div className="container">
        <div className={styles.content}>
          <Link to="/" className={styles.logo}>
            <img
              src={`${import.meta.env.BASE_URL}img/logo.svg`}
              alt="Nice Gadgets logo"
            />
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
            <a href="mailto:contact@nicegadgets.com" className={styles.navLink}>
              Contacts
            </a>
            <a
              href="https://nicegadgets.com/rights"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.navLink}
            >
              Rights
            </a>
          </div>

          <div className={styles.backToTop} onClick={handleScrollToTop}>
            <span className={styles.backText}>Back to top</span>
            <button className={styles.backBtn} aria-label="Scroll to top">
              <img
                src={`${import.meta.env.BASE_URL}img/icons/arrow-right.svg`}
                alt="Up"
              />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
