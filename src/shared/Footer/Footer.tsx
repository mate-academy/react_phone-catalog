import React from 'react';
import styles from './Footer.module.scss';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  const handleScrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footer__content}>
          <Link to="/">
            <img
              src="img/icons/logo.svg"
              alt="logo"
              className={styles.footer__logo}
            />
          </Link>

          <nav className={styles.footer__nav}>
            <ul className={styles.footer__list}>
              <li className={styles.footer__item}>
                <a
                  href="https://github.com/DmutroSheva"
                  className={styles.footer__link}
                >
                  GitHub
                </a>
              </li>
              <li className={styles.footer__item}>
                <a href="#" className={styles.footer__link}>
                  Contacts
                </a>
              </li>
              <li className={styles.footer__item}>
                <a href="#" className={styles.footer__link}>
                  Rights
                </a>
              </li>
            </ul>
          </nav>

          <div className={styles.footer__top}>
            <button
              type="button"
              className={styles.footer__topLink}
              onClick={handleScrollTop}
            >
              Back to top
              <span />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
