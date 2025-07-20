import type { FC } from 'react';

import logo from '/icons/nice_gadgets_logo.svg';
import logoLight from '/icons/nice_gadgets_logo_light.svg';
import arrowUpIcon from '/icons/arrow_up_active.svg';

import styles from './Footer.module.scss';
import { useThemeStore } from '../../../store/themeStore';
import { Link } from 'react-router-dom';

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

export const Footer: FC = () => {
  const { theme } = useThemeStore();

  const currentLogoPath = theme === 'dark' ? logo : logoLight;

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerLogo}>
          <a href="#">
            <img
              src={currentLogoPath}
              alt="NICE GADGETS LOGO"
              className={styles.logoImage}
            />
          </a>
        </div>

        <nav className={styles.footerNavigation}>
          <a
            href="https://github.com/fs-apr25-group1-js-ninjas/nice-gadgets-store"
            className={styles.navLink}
          >
            Github
          </a>
          <Link
            to="/contacts"
            className={styles.navLink}
          >
            Contacts
          </Link>
          <Link
            to="/rights"
            className={styles.navLink}
          >
            Rights
          </Link>
        </nav>

        <div
          className={styles.backToTopGroup}
          onClick={scrollToTop}
        >
          <span className={styles.backToTopText}>Back to top</span>
          <button
            className={styles.backToTopButton}
            aria-label="Back to top"
          >
            <img
              src={arrowUpIcon}
              alt="Up arrow"
              className={styles.arrowIcon}
            />
          </button>
        </div>
      </div>
    </footer>
  );
};
