import React from 'react';
import { Link } from 'react-router-dom';
import { ICON_PATHS } from '../../shared/constants/IconPaths';

import styles from './Footer.module.scss';

export const Footer: React.FC = () => {
  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footer__logoContainer}>
          <Link to="/" className={styles.logo}>
            <img src={ICON_PATHS.logo} alt="Logo" onClick={handleBackToTop} />
          </Link>
        </div>

        <nav className={styles.footer__navList}>
          <a
            href="https://github.com/CNegruzzi"
            className={styles.navLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>

          <a
            href="mailto:assus.12345nagi@gmail.com"
            className={styles.navLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            Contacts
          </a>

          <span>©2025 Kyril Niehrutsa</span>
        </nav>

        <div className={styles.backToTop}>
          <button
            className={styles.backToTop__button}
            onClick={handleBackToTop}
          >
            <span className={styles.backToTop__link}>Back to top</span>

            <span className={styles.backToTop__iconWrapper}>
              <img
                src={ICON_PATHS.arrowUp}
                className={styles.backToTop__icon}
                alt=""
              />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
