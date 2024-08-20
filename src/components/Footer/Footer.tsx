import React from 'react';
import styles from './Footer.module.scss';

export const Footer: React.FC = () => {
  const handleScrollToTop = () => {
    window.scroll({ top: 0 });
  };

  return (
    <footer className={styles.footer}>
      <a href="#" className={styles.footer__logo}>
        <img
          src="./img/icons/Logo.png"
          alt="Nice Gadget Logo"
          className={styles.footer__img}
        />
      </a>
      <nav className={styles.footer__navigation}>
        <ul className={styles.footer__list}>
          <li className={styles.footer__item}>
            <a href="#" className={styles.footer__link}>
              Github
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
      <div className={styles.footer__button}>
        <a
          className={styles['footer__button-text']}
          onClick={handleScrollToTop}
        >
          Back to top
        </a>
        <a
          className={styles['footer__button-arrow']}
          onClick={handleScrollToTop}
        ></a>
      </div>
    </footer>
  );
};
