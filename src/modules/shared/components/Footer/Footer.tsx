import React from 'react';
import { Link } from 'react-router-dom';
import { BackToTop } from '../BackToTop';
import styles from './Footer.module.scss';

export const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__container}>
        <Link to="/" className={styles.footer__logo}>
          <img
            src="img/logo.png"
            alt="Product Catalog Logo"
            className={styles.footer__logoImage}
          />
          <span className={styles.footer__logoText}></span>
        </Link>

        <nav className={styles.footer__nav}>
          <a
            href="#github"
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

        <div className={styles.footer__backToTopWrapper}>
          <span className={styles.footer__backToTopText}>Back to top</span>
          <BackToTop />
        </div>
      </div>
    </footer>
  );
};
