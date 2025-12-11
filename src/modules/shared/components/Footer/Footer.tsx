import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.scss';

export const Footer: React.FC = () => {
  return (
    <div className={styles.footer}>
      <Link
        to="/"
        className={styles.footer__logo}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <img src="img/logo-footer.svg" alt="Footer logo" />
      </Link>
      <div className={styles.footer__links}>
        <a
          className={styles.footer__link}
          href="https://github.com/adonch/react_phone-catalog/tree/develop"
          target="_blank"
          rel="noopener noreferrer"
        >
          GITHUB
        </a>
        <Link className={styles.footer__link} to="/">
          CONTACTS
        </Link>
        <Link className={styles.footer__link} to="/">
          RIGHTS
        </Link>
      </div>
      <div className={styles.footer__backtoTop}>
        <span className={styles.footer__backtoTopText}>Back to top</span>
        <button
          className={styles.footer__backtoTopIcon}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <img src="img/up-icon.svg" alt="Back to top" />
        </button>
      </div>
    </div>
  );
};

export default Footer;
