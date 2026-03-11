import React from 'react';
import styles from './Footer.module.scss';
import { Link } from 'react-router-dom';
import { ArrowUpIcon } from '../Icons';
import { scrollToTop } from '../../utils/scrollUtils';

export const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>
          <span className={styles.logo__text}>Nice Gadgets</span>
        </Link>

        <nav className={styles.nav}>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.nav__link}
          >
            Github
          </a>
          <a href="#/contacts" className={styles.nav__link}>
            Contacts
          </a>
          <a href="#/rights" className={styles.nav__link}>
            Rights
          </a>
        </nav>

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
    </footer>
  );
};
