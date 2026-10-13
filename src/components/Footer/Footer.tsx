import { Link } from 'react-router-dom';
import styles from './Footer.module.scss';
import React from 'react';

export const Footer = () => {
  // Функция для плавного скролла наверх
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <Link to="/" className={styles.logo}>
          {/* Сюда тоже подтянется логотип из папки public/img */}
          <img src="/img/logo.svg" alt="Nice Gadgets Logo" />
        </Link>

        <nav className={styles.nav}>
          <a
            href="https://github.com/Dpdpodudu"
            target="_blank"
            rel="noreferrer"
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

        <button className={styles.backToTop} onClick={scrollToTop}>
          <span className={styles.backToTopText}>Back to top</span>
          <div className={styles.iconContainer}>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.6667 10L8 7.33333L5.33333 10"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </button>
      </div>
    </footer>
  );
};
