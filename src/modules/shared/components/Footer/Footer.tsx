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
          <span className={styles.logo__text}>Nice Gadgets</span>
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
          <Link to="/contacts" className={styles.nav__link}>
            Contacts
          </Link>
          <Link to="/rights" className={styles.nav__link}>
            Rights
          </Link>
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
