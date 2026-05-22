import React from 'react';
import styles from './footer.module.scss';
import { scrolToTop } from '../../../../utils/scroltotop/scrol';

export const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__rectangle}>
        <img
          className={styles['footer__image-logo']}
          src="/img/Logo.png"
          alt="logo nice gadgets"
        />
        <ul className={styles.footer__list}>
          <li className={styles.footer__item}>
            <a
              className={styles.footer__links}
              target="blank"
              href="https://elber-kevenny.github.io/react_phone-catalog/"
            >
              Github
            </a>
          </li>
          <li className={styles.footer__item}>
            <a className={styles.footer__links} href="">
              Contacts
            </a>
          </li>
          <li className={styles.footer__item}>
            <a className={styles.footer__links} href="">
              rights
            </a>
          </li>
        </ul>
        <div className={styles['footer__button-container']}>
          <p className={styles['footer__button-text']}>Back to top</p>
          <button
            onClick={() => scrolToTop()}
            className={styles.footer__button}
          >
            <img className={styles.footer__arrow} src="/img/arrow.png" alt="" />
          </button>
        </div>
      </div>
    </footer>
  );
};
