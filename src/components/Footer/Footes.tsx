import React from 'react';
import { Icon } from '../Icon';
import styles from './Footer.module.scss';
import { Link } from 'react-router-dom';

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.footer__container}>
        <div className={styles.footer__logo}>
          <Link to="/">
            <Icon name="logo" className={styles.logo} />
          </Link>
        </div>
        <nav className={styles.footer_nav}>
          <ul className={styles.footer__list}>
            <li className={styles.footer__item}>
              <a
                href="https://github.com/NemH"
                target="_blank"
                rel="noreferrer"
                className={styles.footer__link}
              >
                GitHub
              </a>
            </li>
            <li className={styles.footer__item}>
              <a
                href="mailto:maksnemch2004@gmail.com"
                target="_blank"
                rel="noreferrer"
                className={styles.footer__link}
              >
                Contacts
              </a>
            </li>
            <li className={styles.footer__item}>
              <a
                href=""
                target="_blank"
                rel="noreferrer"
                className={styles.footer__link}
              >
                Rights
              </a>
            </li>
          </ul>
        </nav>
        <div className={styles.footer__totop}>
          <div className={styles.text}>Back to top</div>
          <button className={styles.icon} onClick={scrollToTop}>
            <Icon name="arrowup" />
          </button>
        </div>
      </div>
    </footer>
  );
};
