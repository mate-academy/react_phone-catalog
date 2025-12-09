import React from 'react';
import styles from './Footer.module.scss';
import { NavLink } from 'react-router-dom';

import NiceGadgetsLogo from '../../../assets/logo/img.png';
import arrowIcon from '../../../assets/icons/SliderButtonDefaultRight.svg';

export const Footer: React.FC = () => {
  const scrollToTop = (): void => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.documentElement.scrollTo({ top: 0, behavior: 'smooth' });
    document.body.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.logo}>
        <NavLink to="/">
          <img
            className={styles.logo_img}
            src={NiceGadgetsLogo}
            alt="Nice Gadgets logo"
          />
        </NavLink>
      </div>

      <nav className={styles.nav}>
        <ul className={styles.navList}>
          <li>
            <a
              href="https://github.com/PavloSich/react_phone-catalog"
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
        <span
          className={styles.text}
          onClick={scrollToTop}
          onKeyDown={e => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              scrollToTop();
            }
          }}
          tabIndex={0}
          role="button"
          aria-label="Back to top"
        >
          Back to top
        </span>
        <button
          onClick={scrollToTop}
          className={styles.iconBox}
          aria-label="Back to top"
        >
          <img
            className={styles.icon}
            src={arrowIcon}
            alt="Back to top arrow"
          />
        </button>
      </div>
    </footer>
  );
};
