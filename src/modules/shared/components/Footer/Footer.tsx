import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.scss';

export const Footer: React.FC = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.footer__logo}>
        <img src="img/logo-footer.svg" alt="Footer logo" />
      </div>
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
        <span>Back to top</span>
        <div className={styles.footer__backtoTopIcon}>
          <img src="img/up-icon.svg" alt="Back to top" />
        </div>
      </div>
    </div>
  );
};

export default Footer;
