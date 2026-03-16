import React from 'react';
import styles from './Footer.module.scss';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <Link to="/" className={styles.logo}>
          <img src="img/logo.svg" alt="Nice Gadgets" />
        </Link>

        <div className={styles.links}>
          <a
            href="https://github.com/serhiy23471/react_phone-catalog"
            target="_blank"
            rel="noreferrer"
            className={styles.link}
          >
            Github
          </a>
          <a
            href="https://github.com/serhiy23471"
            target="_blank"
            rel="noreferrer"
            className={styles.link}
          >
            Contacts
          </a>
          <Link
            to="/rights"
            // target="_blank"
            rel="noreferrer"
            className={styles.link}
          >
            Rights
          </Link>
        </div>

        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className={styles.button}
        >
          Back to top
          <img src="img/icons/arrow-up.svg" alt="Up" className={styles.arrow} />
        </button>
      </div>
    </footer>
  );
};
