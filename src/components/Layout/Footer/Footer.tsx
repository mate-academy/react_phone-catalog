import React from 'react';
import styles from './Footer.module.scss';

import Logo from 'assets/icons/Logo.svg?react';
import ArrowRight from 'assets/icons/ArrowRight.svg?react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export const Footer: React.FC = () => {
  const { t } = useTranslation();

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
            {t(`footer.github`)}
          </a>
          <a
            href="https://t.me/nineuito"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.footerLink}
          >
            {t(`footer.contacts`)}
          </a>
          <a
            href="https://github.com/nineuito"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.footerLink}
          >
            {t(`footer.rights`)}
          </a>
        </div>
        <div className={styles.backToTop} onClick={scrollToTop}>
          <p className={styles.textBackToTop}>{t(`footer.backToTop`)}</p>

          <button className={styles.btnBackToTop}>
            <ArrowRight className={styles.btnBackToTopIcon} />
          </button>
        </div>
      </div>
    </div>
  );
};
