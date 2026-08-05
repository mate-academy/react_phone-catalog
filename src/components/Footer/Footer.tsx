import { Link } from 'react-router-dom';

import logo from '../../assets/icons/Logo.svg';

import styles from './Footer.module.scss';

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <Link to="/" className={styles.logoLink} aria-label="Nice Gadgets home">
          <img src={logo} alt="Nice Gadgets" className={styles.logo} />
        </Link>

        <nav className={styles.nav} aria-label="Footer navigation">
          <a
            href="https://github.com/aamaltseva-sqwosh/react_phone-catalog"
            target="_blank"
            rel="noreferrer"
            className={styles.navLink}
          >
            Github
          </a>

          <a href="mailto:hello@nicegadgets.com" className={styles.navLink}>
            Contacts
          </a>

          <span className={styles.navLink}>Rights</span>
        </nav>

        <div className={styles.backToTop}>
          <span className={styles.backToTopText}>Back to top</span>

          <button
            type="button"
            className={styles.backToTopButton}
            onClick={scrollToTop}
            aria-label="Back to top"
          >
            <svg viewBox="0 0 16 16" aria-hidden="true" className={styles.icon}>
              <path
                d="m4 10 4-4 4 4"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </footer>
  );
};
