import React from 'react';
import { Link } from 'react-router-dom';

import styles from './Footer.module.scss';

export const Footer: React.FC = () => {
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className={styles.footer} data-testid="footer">
      <div className={`container ${styles.inner}`}>
        <Link
          to="/"
          className={styles.logoLink}
          aria-label="Phone Catalog Home"
        >
          <i className="fa-solid fa-mobile-screen-button" />
          <span>GADGETS</span>
        </Link>

        <div className={styles.links}>
          <a
            href="https://github.com/xapg6acc"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            Github
          </a>
          <a
            href="https://www.linkedin.com/in/ivan-boiko-84a171112/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            Contacts
          </a>
          <a
            href="https://github.com/mate-academy/react_phone-catalog"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            Rights
          </a>
        </div>

        <button
          type="button"
          onClick={handleScrollToTop}
          className={styles.backToTop}
          aria-label="Scroll back to top"
        >
          <span>Back to top</span>
          <span className={styles.arrowBtn}>
            <i className="fa-solid fa-arrow-up" />
          </span>
        </button>
      </div>
    </footer>
  );
};
