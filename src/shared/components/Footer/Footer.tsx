import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.scss';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <Link to="/" className={styles.logoLink}>
          <img src={`img/icons/Logo.svg`} alt="logo" className={styles.logo} />
        </Link>

        <nav className={styles.nav}>
          <a
            href="https://github.com/dianakomar/react_phone-catalog"
            target="_blank"
            rel="noreferrer"
            className={styles.link}
          >
            Github
          </a>
          <a
            href="https://github.com/dianakomar"
            target="_blank"
            rel="noreferrer"
            className={styles.link}
          >
            Contacts
          </a>
          <a
            // eslint-disable-next-line max-len
            href="https://github.com/dianakomar/react_phone-catalog/blob/develop/LICENSE"
            target="_blank"
            rel="noreferrer"
            className={styles.link}
          >
            Rights
          </a>
        </nav>

        <div className={styles.backToTop}>
          <span className={styles.backToTopText}>Back to top</span>
          <button
            type="button"
            className={styles.arrowButton}
            aria-label="Scroll to top"
            onClick={scrollToTop}
          >
            <img
              src={`img/icons/Chevron (Arrow Up).svg`}
              alt="Back to top"
              className={styles.arrowIcon}
            />
          </button>
        </div>
      </div>
    </footer>
  );
};
