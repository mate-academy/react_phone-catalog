import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.scss';

export const Footer: React.FC = () => {
  // для плавної прокрутки сторінки (Back to top)
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* лого у футері, як в хедері */}
        <Link to="/" className={styles.logoLink}>
          <img src="img/icons/Logo.svg" alt="Nice Gadgets logo" />
        </Link>

        {/* посилання та розділи */}
        <ul className={styles.navLinks}>
          <li>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              Github
            </a>
          </li>
          <li>
            <Link to="/contacts" className={styles.link}>
              Contacts
            </Link>
          </li>
          <li>
            <Link to="/rights" className={styles.link}>
              Rights
            </Link>
          </li>
        </ul>

        {/* вгору сторінки */}
        <div className={styles.toTopContainer}>
          <span className={styles.toTopText}>Back to top</span>
         <button
            type="button"
            className={styles.toTopButton}
            onClick={scrollToTop}
            aria-label="Back to top"
          >
            <img src="img/icons/Slider button - Default (right).svg" alt="Scroll to top" />
          </button>
        </div>
      </div>
    </footer>
  );
};
