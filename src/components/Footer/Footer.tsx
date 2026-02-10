import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import styles from './Footer.module.scss';

export const Footer: React.FC = () => {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.footer__content}>
        <Link
          to="/"
          className={styles.footer__logo}
          onClick={handleScrollToTop}
        >
          <img src="./img/Logo.svg" alt="logo: Nice Gadgets" />
        </Link>
        <div className={styles.footer__links}>
          <a
            className={styles.footer__link}
            href="https://github.com/yahohulia"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          <NavLink className={styles.footer__link} to="/contacts">
            Contacts
          </NavLink>
          <NavLink className={styles.footer__link} to="/rights">
            Rights
          </NavLink>
        </div>
        <div className={styles.footer__toTop}>
          <h3
            className={styles.footer__toTop__text}
            onClick={handleScrollToTop}
          >
            Back to top
          </h3>
          <div
            className={styles.footer__toTop__button}
            onClick={handleScrollToTop}
          >
            <img
              src="./img/icons/chevron-arrow-up--white.svg"
              alt="Back to top icon"
            />
          </div>
        </div>
      </div>
    </footer>
  );
};
