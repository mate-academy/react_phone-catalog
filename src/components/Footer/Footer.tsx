/* eslint-disable max-len */
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.scss';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <div className={styles.footerLogo}>
          <Link to="/">
            <img
              src="/img/nice-gadgets-logo.png"
              alt="nice gadgets logo"
              className={styles.footerLogoImg}
            />
          </Link>
        </div>

        <nav className={styles.footerNav}>
          <ul className={styles.footerNavList}>
            <li className={styles.footerNavItem}>
              <a
                href="https://github.com/VitaliyHoroshko/react_phone-catalog"
                target="_blank"
                rel="noreferrer"
                className={styles.footerNavLink}
              >
                Github
              </a>
            </li>
            <li className={styles.footerNavItem}>
              <a
                href="https://github.com/VitaliyHoroshko"
                target="_blank"
                rel="noreferrer"
                className={styles.footerNavLink}
              >
                Contacts
              </a>
            </li>
            <li className={styles.footerNavItem}>
              <a
                href="https://github.com/VitaliyHoroshko/react_phone-catalog/blob/master/README.md"
                target="_blank"
                rel="noreferrer"
                className={styles.footerNavLink}
              >
                Rights
              </a>
            </li>
          </ul>
        </nav>

        <div
          className={styles.footerBackToTop}
          onClick={scrollToTop}
          role="button"
          tabIndex={0}
          onKeyDown={e => {
            if (e.key === 'Enter' || e.key === ' ') {
              scrollToTop();
            }
          }}
        >
          <span className={styles.footerBackToTopText}>Back to top</span>
          <button
            type="button"
            className={styles.footerBackToTopButton}
            tabIndex={-1}
          />
        </div>
      </div>
    </footer>
  );
};
