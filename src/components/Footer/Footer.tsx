export * from './Footer';

import { Link, NavLink } from 'react-router-dom';

import styles from './Footer.module.scss';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      {/* LOGO */}
      <div className={styles.footer__logo}>
        <Link to="/" className={styles['footer__logo-link']}>
          <img src="./logo/Logo.svg" alt="Phone catalog Logo" />
        </Link>
      </div>
      {/* LINKS */}
      <div className={styles.footer__links}>
        <a href="https://github.com/Igor-hrm" target="_blank" rel="noreferrer">
          github
        </a>
        <a
          href="https://www.linkedin.com/in/igor-rocha-/"
          target="_blank"
          rel="noreferrer"
        >
          Contacts
        </a>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? styles.active : '')}
        >
          Rights
        </NavLink>
      </div>
      {/* BACK TO TOP */}
      <div className={styles.footer__toTop}>
        <p>Back to top</p>
        <button
          onClick={() => {
            window.scrollTo({
              top: 0,
              behavior: 'smooth',
            });
          }}
        >
          <img src="./icons/ChevronArrowUp.svg" alt="Back to top" />
        </button>
      </div>
    </footer>
  );
};
