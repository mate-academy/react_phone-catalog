import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.scss';
import { ArrowUpIcon } from '../Icons';
import { scrollToTop } from '../../utils/scrollUtils';

export const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo} onClick={() => scrollToTop()}>
          <img
            src="img/logo.png"
            alt="Nice Gadgets"
            className={styles.logoImage}
          />
        </Link>

        <nav className={styles.nav}>
          <a
            href="https://github.com/1umamaster/react_phone-catalog"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.nav__link}
          >
            Github
          </a>
          <a
            href="https://github.com/1umamaster"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.nav__link}
          >
            Contacts
          </a>
          <a
            href="https://www.un.org/sites/un2.un.org/files/2021/03/udhr.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.nav__link}
          >
            Rights
          </a>
        </nav>

        <div className={styles.backToTopWrapper}>
          <button
            type="button"
            className={styles.backToTop}
            onClick={() => scrollToTop()}
          >
            <span className={styles.backToTop__text}>Back to top</span>
            <span className={styles.backToTop__icon}>
              <ArrowUpIcon />
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
};
