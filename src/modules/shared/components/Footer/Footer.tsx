import React from 'react';
import { BackToTop } from '../BackToTop';
import styles from './Footer.module.scss';

export const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__container}>
        {/* Logo */}
        <div className={styles.footer__logo}>
          <img
            src="/img/logo.png"
            alt="Product Catalog Logo"
            className={styles.footer__logoImage}
          />
        </div>

        {/* Links */}
        <nav className={styles.footer__nav}>
          <a
            href="https://github.com/your-username/react_phone-catalog"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.footer__link}
          >
            GitHub
          </a>
          <a href="#contacts" className={styles.footer__link}>
            Contacts
          </a>
          <a href="#rights" className={styles.footer__link}>
            Rights
          </a>
        </nav>

        {/* Back to Top */}
        <div className={styles.footer__backToTop}>
          <BackToTop />
        </div>
      </div>
    </footer>
  );
};
