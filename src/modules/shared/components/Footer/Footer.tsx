import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.scss';
import logoSrc from '/img/Logo.svg';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className={styles.footer}>
      <Link to="/" className={styles.logo}>
        <img src={logoSrc} alt="Nice Gadgets" />
      </Link>

      <div className={styles.links}>
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
        >
          GitHub
        </a>
        <a href="#/contacts" className={styles.link}>
          Contacts
        </a>
        <a href="#/rights" className={styles.link}>
          Rights
        </a>
      </div>

      <div className={styles.backToTop}>
        <span className={styles.backText}>Back to top</span>
        <button
          type="button"
          onClick={scrollToTop}
          className={styles.scrollBtn}
          aria-label="Back to top"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d={
                'M7.52864 3.72393' +
                'C7.78899 3.46358 8.2111 3.46358 8.47145 3.72393' +
                'L13.1381 8.39059' +
                'C13.3985 8.65094 13.3985 9.07305 13.1381 9.3334' +
                'C12.8778 9.59375 12.4557 9.59375 12.1953 9.3334' +
                'L8.00005 5.13814' +
                'L3.80479 9.3334' +
                'C3.54444 9.59375 3.12233 9.59375 2.86198 9.3334' +
                'C2.60163 9.07305 2.60163 8.65094 2.86198 8.39059' +
                'L7.52864 3.72393Z'
              }
              fill="#0F0F11"
            />
          </svg>
        </button>
      </div>
    </footer>
  );
};
