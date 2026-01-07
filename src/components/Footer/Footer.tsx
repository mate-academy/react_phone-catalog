import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.scss';

export const Footer = () => {
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // Płynne przewijanie
    });
  };

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.content}>
          {/* 1. Logo */}
          <Link to="/" className={styles.logo}>
            <img src="/img/logo.svg" alt="Nice Gadgets logo" />
          </Link>

          {/* 2. Linki zewnętrzne */}
          <div className={styles.links}>
            <a
              href="https://github.com/mate-academy"
              target="_blank"
              rel="noreferrer"
            >
              Github
            </a>
            <a href="#">Contacts</a>
            <a href="#">Rights</a>
          </div>

          {/* 3. Przycisk Back to Top */}
          <div className={styles.backToTop}>
            <span className={styles.backText}>Back to top</span>
            <button className={styles.backBtn} onClick={handleScrollToTop}>
              {/* Ikona strzałki w górę (możesz użyć SVG, tu prosty znak) */}^
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
