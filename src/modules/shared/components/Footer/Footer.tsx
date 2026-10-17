import { Link } from 'react-router-dom';

import styles from './Footer.module.scss';

export const Footer = () => {
  return (
    <footer className={`${styles.footer} container`}>
      <div className={styles.footer__logo}>
        <Link to="/">
          <img
            src="./img/logo.png"
            alt=""
            className={styles['footer__logo-img']}
          />
        </Link>
      </div>

      <div className={styles.footer__nav}>
        <ul className={styles['footer__nav-list']}>
          <li className={styles['footer__nav-item']}>
            <a
              href="https://github.com/Vadym-fe/react_phone-catalog"
              className={styles['footer__nav-link']}
              target="_blank"
              rel="noreferrer"
            >
              github
            </a>
          </li>
          <li className={styles['footer__nav-item']}>
            <a
              href="/mailto:vadimivanskij9@gmail.com"
              className={styles['footer__nav-link']}
            >
              contacts
            </a>
          </li>
          <li className={styles['footer__nav-item']}>
            <span className={styles['footer__nav-link']}>rights</span>
          </li>
        </ul>
      </div>

      <div className={styles['footer__back-to-top']}>
        <button
          type="button"
          className={styles['footer__back-to-top-button']}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <span className={styles['footer__back-to-top-text']}>
            Back to top
          </span>

          <span className={styles['footer__back-to-top-container']}>
            <img
              src="./img/arrTop.png"
              alt=""
              className={styles['footer__back-to-top-icon']}
            />
          </span>
        </button>
      </div>
    </footer>
  );
};
