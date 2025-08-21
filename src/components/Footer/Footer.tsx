import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.scss';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={styles.footer}>
      <img
        className={styles.footer__logo}
        src="/img/logo-img.svg"
        alt="logo image"
      />

      <div className={styles.footer__container}>
        <nav className={styles.footer__nav}>
          <Link
            to="https://github.com/Sofiia13/react_phone-catalog"
            className={`${styles.footer__link} ${styles['footer__link--home']}`}
          >
            GITHUB
          </Link>
          <Link to="#" className={styles.footer__link}>
            CONTACTS
          </Link>
          <Link to="#" className={styles.footer__link}>
            RIGHTS
          </Link>
        </nav>
      </div>

      <div className={styles.footer__button}>
        <p className={styles['footer__button--text']}>Back to top</p>
        <button
          className={styles['footer__button--back-to-top']}
          onClick={scrollToTop}
        >
          <img
            src="/img/icons/arrow-up.svg"
            alt="arrow up"
            className={styles['footer__button--arrow-up']}
          />
        </button>
      </div>
    </footer>
  );
};
