import { Link } from 'react-router-dom';
import styles from './Footer.module.scss';
export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <footer className={styles.footer}>
      <Link to="/" className={styles.footer__logo} onClick={scrollToTop}>
        <img
          src={'../../../public/img/logo/Logo.svg'}
          alt="Logo"
          className={styles.footer__logo}
        />
      </Link>
      <ul className={styles.footer__list}>
        <li className={styles.footer__item}>
          <Link
            to="https://github.com/myuriy81"
            target="_blank"
            className={styles.footer__item__link}
          >
            GITHUB
          </Link>
        </li>
        <li className={styles.footer__item}>
          <Link
            to="https://github.com/myuriy81"
            target="_blank"
            className={styles.footer__item__link}
          >
            CONTACTS
          </Link>
        </li>
        <li className={styles.footer__item}>
          <Link
            to="https://github.com/myuriy81"
            target="_blank"
            className={styles.footer__item__link}
          >
            RIGHTS
          </Link>
        </li>
      </ul>

      <div className={styles.footer__back}>
        <div className={styles.footer__button__text} onClick={scrollToTop}>
          Back to top
        </div>
        <button className={styles.footer__button} onClick={scrollToTop}>
          <img
            src="../../../public/img/icons/back.svg"
            alt="To top"
            className={styles.footer__button__icon}
          />
        </button>
      </div>
    </footer>
  );
};
