import React from 'react';
import styles from './Footer.module.scss';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

export const Footer = () => {
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>
          <img
            src="./icons/logoLightTheme.svg"
            alt="Phone Catalog logo"
            className={classNames(styles.logoImg, styles.lightLogo)}
          />
          <img
            src="./icons/logoDarkTheme.svg"
            alt="Phone Catalog logo"
            className={classNames(styles.logoImg, styles.darkLogo)}
          />
        </Link>

        <nav className={styles.nav}>
          <ul className={styles.navList}>
            <li>
              <a
                href="https://github.com/Kit3AWP/react_phone-catalog"
                target="_blank"
                rel="noreferrer noopener"
                className={styles.navLink}
              >
                Github
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/maksym-holia/"
                target="_blank"
                rel="noreferrer noopener"
                className={styles.navLink}
              >
                Contacts
              </a>
            </li>
            <li>
              <Link to="/rights" className={styles.navLink}>
                Rights
              </Link>
            </li>
          </ul>
        </nav>

        <button
          type="button"
          onClick={handleScrollToTop}
          className={styles.backToTopBtn}
        >
          <span className={styles.backToTopText}>Back to top</span>
          <span className={styles.iconSquare}>
            <span className={styles.upArrowIcon} aria-label="Back to top" />
          </span>
        </button>
      </div>
    </footer>
  );
};
