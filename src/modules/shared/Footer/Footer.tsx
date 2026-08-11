import React from 'react';
import styles from './Footer.module.scss';
import iconLogo from '../../../../public/img/icons/icon-logo.png';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    if (window.location.hash) {
      // eslint-disable-next-line max-len
      history.replaceState(
        null,
        '',
        window.location.pathname + window.location.search,
      );
    }
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.footer__wrapper}>
        <div className={styles.footer__logo}>
          <Link to="/">
            <img
              src={iconLogo}
              className={styles.footer__logo__img}
              alt="logo"
            />
          </Link>
        </div>
        <div className={styles.footer__nav}>
          <a
            href="https://github.com/luchali/react_phone-catalog"
            className={styles.footer__nav__link}
            target="_blank"
            rel="noopener noreferrer"
          >
            GITHUB
          </a>
          <Link to="/contacts" className={styles.footer__nav__link}>
            CONTACTS
          </Link>
          <a
            href="https://github.com/luchali/react_phone-catalog"
            className={styles.footer__nav__link}
            target="_blank"
            rel="noopener noreferrer"
          >
            RIGHTS
          </a>
        </div>
        <div className={styles.footer__scroll_top}>
          <p className={styles.footer__scroll_top__p}>Back to top</p>
          <button
            onClick={scrollToTop}
            className={styles.footer__scroll_top__btn}
          >
            <img
              src="/react_phone-catalog/img/icons/icon-chevron-arrow-right.png"
              alt="image"
              className={styles.footer__scroll_top__btn_img}
            />
          </button>
        </div>
      </div>
    </footer>
  );
};
