import React from 'react';
import { Link } from 'react-router-dom';

import { scrollToTop } from '../../../utils/scrollToTop';
import { useTheme } from '../../../hooks/useTheme';
import { ArrowUpIcon } from '../../../components/Icons/ArrowUpIcon';

import logoLight from '../../../assets/icons/logo/LogoLight.svg';
import logoDark from '../../../assets/icons/logo/LogoDark.svg';

import styles from './Footer.module.scss';

export const Footer = () => {
  const { theme } = useTheme();

  const LOGO = theme === 'light' ? logoLight : logoDark;

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <Link to="/" className={styles.logo} onClick={scrollToTop}>
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
              <Link
                to="/contacts"
                className={styles.navLink}
                onClick={scrollToTop}
              >
                Contacts
              </Link>
            </li>

            <li className={styles.navItem}>
              <Link
                to="/rights"
                className={styles.navLink}
                onClick={scrollToTop}
              >
                Rights
              </Link>
            </li>
          </ul>
        </nav>

        <div className={styles.backToTop} onClick={scrollToTop}>
          <span className={styles.backToTopText}>Back to top</span>

          <button className={styles.backToTopButton}>
            <ArrowUpIcon />
          </button>
        </div>
      </div>
    </footer>
  );
};
