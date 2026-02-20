import React from 'react';
import styles from './Footer.module.scss';

const base = import.meta.env.BASE_URL ?? '/';

const resolveUrl = (path: string) => {
  if (path.startsWith('http')) {
    return path;
  }

  const cleanPath = path.startsWith('/') ? path.slice(1) : path;

  return `${base.endsWith('/') ? base : `${base}/`}${cleanPath}`;
};

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.footer__inner}>
        {/* Logo */}
        <div className={styles.footer__logo}>
          <img src="icons/Logo.svg" alt="Gadget Catalog" />
        </div>

        {/* Links */}
        <div className={styles.footer__links}>
          <a
            href="https://github.com/Vladokvl"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.footer__link}
          >
            GITHUB
          </a>
          <a
            href="#"
            onClick={e => {
              e.preventDefault();
              scrollToTop();
            }}
            className={styles.footer__link}
          >
            CONTACTS
          </a>
          <a
            href="#"
            onClick={e => {
              e.preventDefault();
              scrollToTop();
            }}
            className={styles.footer__link}
          >
            RIGHTS
          </a>
        </div>

        {/* Back to Top */}
        <div className={styles.footer__backToTop}>
          <span className={styles.footer__backToTop__title}>Back to top</span>
          <button
            type="button"
            className={styles.footer__backButton}
            onClick={scrollToTop}
            aria-label="Back to top"
          >
            <img
              src={resolveUrl('icons/left.svg')}
              alt=""
              className={styles.footer__backIcon}
            />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
