import React from 'react';
import { Link } from 'react-router-dom';

import { ArrowUpIcon } from '../../../components/Icons/ArrowUpIcon';
import styles from './Footer.module.scss';
import LOGO from '../../../assets/icons/logo/Logo.svg';

export const Footer = () => {
  const backToTopHandler = () => {
    window.scroll({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <Link to="/" className={styles.logo}>
          <img src={LOGO} alt="Nice Gadjets logo" />
        </Link>

        <nav className={styles.nav}>
          <ul className={styles.navList}>
            <li className={styles.navItem}>
              <a
                href="https://github.com/n7lots"
                target="_blank"
                rel="noreferrer"
                className={styles.navLink}
              >
                Github
              </a>
            </li>

            <li className={styles.navItem}>
              <Link to="/contacts" className={styles.navLink}>
                Contacts
              </Link>
            </li>

            <li className={styles.navItem}>
              <Link to="/rights" className={styles.navLink}>
                Rights
              </Link>
            </li>
          </ul>
        </nav>

        <div className={styles.backToTop} onClick={backToTopHandler}>
          <span className={styles.backToTopText}>Back to top</span>

          <button className={styles.backToTopButton}>
            <ArrowUpIcon />
          </button>
        </div>
      </div>
    </footer>
  );
};
