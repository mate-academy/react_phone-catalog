import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.scss';
import { BackToTop } from '../BackToTop';

export const Footer: React.FC = () => {
  return (
    <footer className={`App__footer ${styles.footer}`}>
      <div className={styles.footer__container}>
        <div className={styles.footer__wrapper}>
          <Link to="/" className={styles.footer__logo}>
            <img src="./img/icons/Logo.svg" alt="Nice Gadgets" />
          </Link>
        </div>

        <div className={styles.footer__info}>
          <ul className={styles.footer__list}>
            <li className={styles.footer__item}>
              <a href="#github" className={styles.footer__link}>
                Github
              </a>
            </li>
            <li className={styles.footer__item}>
              <a href="#contacts" className={styles.footer__link}>
                Contacts
              </a>
            </li>
            <li className={styles.footer__item}>
              <a href="#rights" className={styles.footer__link}>
                Rights
              </a>
            </li>
          </ul>
        </div>

        <BackToTop />
      </div>
    </footer>
  );
};
