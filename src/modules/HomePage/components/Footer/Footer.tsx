import React from 'react';
import styles from '../Footer/Footer.module.scss';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  const handleBackToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.footer__container}>
        <Link to="#logo" className={styles.footer__logo}>
          <img
            src="img/logo/logo.png"
            className={styles.footer__logo_img}
            alt="logo"
          />
        </Link>

        <div className={styles.footer__menu}>
          <Link
            className={styles.footer__menu__link}
            to="https://github.com/lkovbasiuk/react_phone-catalog"
            id="github"
          >
            Github
          </Link>

          <Link
            className={styles.footer__menu__link}
            to="#contacts"
            id="contacts"
          >
            Contacts
          </Link>

          <Link className={styles.footer__menu__link} to="#rights" id="rights">
            Rights
          </Link>
        </div>

        <div className={styles['footer__back-to-top']}>
          <h4 className={styles['footer__back-to-top__title']}>Back to top</h4>
          <button
            className={styles['footer__back-to-top__button']}
            onClick={handleBackToTop}
          ></button>
        </div>
      </div>
    </footer>
  );
};
