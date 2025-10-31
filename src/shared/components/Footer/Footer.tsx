import React from 'react';
import styles from './Footer.module.scss';
import { NavLink } from 'react-router-dom';

export const Footer: React.FC = () => {
  const scrollToTop = (): void => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.logo}>
        <NavLink to="/">
          <img
            className={styles.logo_img}
            src="/logo/img.png"
            alt="Nice Gadgets logo"
          />
        </NavLink>
      </div>

      <nav className={styles.nav}>
        <ul className={styles.navList}>
          <li>
            <a
              href="https://github.com/твій-репозиторій"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.navLink}
            >
              GitHub
            </a>
          </li>
          <li>
            <NavLink
              to="/contacts"
              className={({ isActive }) =>
                isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
              }
            >
              Contacts
            </NavLink>
          </li>
          <li>
            <span className={styles.navLink}>Rights</span>
          </li>
        </ul>
      </nav>

      <div className={styles.actions}>
        <span className={styles.text} tabIndex={0}>
          Back to top
        </span>
        <button
          onClick={scrollToTop}
          className={styles.iconBox}
          aria-label="Back to top"
        >
          <img
            className={styles.icon}
            src="/icons/SliderButtonDefault%20(right).svg"
            alt="Back to top arrow"
          />
        </button>
      </div>
    </footer>
  );
};
