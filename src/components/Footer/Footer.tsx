import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.scss';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.footer__container}>
        <Link to="/" className={styles.footer__logo}>
          <img src="/icons/logo.svg" alt="NICE GADGETS logo" />
        </Link>

        <nav className={styles.footer__nav}>
          <ul className={styles.footer__list}>
            <li>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.footer__link}
              >
                GITHUB
              </a>
            </li>
            <li>
              <Link to="/contacts" className={styles.footer__link}>
                CONTACTS
              </Link>
            </li>
            <li>
              <Link to="/rights" className={styles.footer__link}>
                RIGHTS
              </Link>
            </li>
          </ul>
        </nav>

        <div className={styles.footer__back}>
          <span className={styles.footer__backText}>Back to top</span>
          <button
            className={styles.footer__backBtn}
            onClick={scrollToTop}
            aria-label="Повернутися нагору"
          >
            <img src="/icons/arrow-up.svg" alt="Arrow up" />
          </button>
        </div>
      </div>
    </footer>
  );
};
