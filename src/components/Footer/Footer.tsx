import React from 'react';

import styles from './Footer.module.scss';

export const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <a href="#" className={styles.footer__logo}>
        <img src="img/Logo.svg" alt="logo" className={styles.footer__image} />
      </a>
      <nav className={styles.footer__navigation}>
        <ul className={styles.footer__list}>
          <li className={styles.footer__item}>
            <a
              href="https://github.com/Opokhvalenko"
              className={styles.footer__link}
              target="_blank"
              rel="noreferrer"
            >
              Github
            </a>
          </li>
          <li className={styles.footer__item}>
            <a
              href="https://github.com/Opokhvalenko"
              className={styles.footer__link}
              target="_blank"
              rel="noreferrer"
            >
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
      <div className={styles.footer__button}>
        <a href="#" className={styles['footer__button-text']}>
          Back to top
        </a>
        <a href="#" className={styles['footer__button-arrow']}></a>
      </div>
    </footer>
  );
};
