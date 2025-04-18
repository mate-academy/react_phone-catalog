import React from 'react';
import styles from './Footer.module.scss';

import Logo from 'assets/icons/Logo.svg?react';
import ArrowRight from 'assets/icons/ArrowRight.svg?react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className={styles.footerContainer}>
      <div className={styles.footer}>
        <Link to="/">
          <Logo className={styles.footerLogo} />
        </Link>
        <div className={styles.footerLinks}>
          <a
            href="https://github.com/nineuito"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.footerLink}
          >
            Github
          </a>
          <a
            href="https://t.me/mos9uito"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.footerLink}
          >
            Contacts
          </a>
          <a
            href="https://github.com/nineuito"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.footerLink}
          >
            rights
          </a>
        </div>
        <div className={styles.backToTop} onClick={scrollToTop}>
          <p className={styles.textBackToTop}>Back to top</p>

          <button className={styles.btnBackToTop}>
            <ArrowRight className={styles.btnBackToTopIcon} />
          </button>
        </div>
      </div>
    </div>
  );
};
