import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import styles from './Footer.module.scss';
import { useTheme } from '../../context/ThemeContext';
import { getChevronIconSrc, getLogoIconSrs } from '../../servises/iconSrc';

const Footer: React.FC = () => {
  const { theme } = useTheme();
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const logoImgSrc = getLogoIconSrs(theme);
  const backToTopImgSrc = getChevronIconSrc(theme);

  return (
    <footer className={styles.footer}>
      <div className={styles.wrapper}>
        <Link to="/" className={styles.logoLink}>
          <img src={logoImgSrc} alt="logo" className={styles.logo} />
        </Link>
        <nav className={styles.nav}>
          <NavLink
            to="https://github.com/OleksiiNesteruk"
            className={styles.item}
            target="_blank"
          >
            GitHub
          </NavLink>
          <NavLink
            to="https://github.com/OleksiiNesteruk"
            className={styles.item}
            target="_blank"
          >
            Contact
          </NavLink>
          <NavLink
            to="https://github.com/OleksiiNesteruk"
            className={styles.item}
            target="_blank"
          >
            Rights
          </NavLink>
        </nav>
        <div className={styles.backToTop}>
          <p className={styles.backToTopText}>Back to top</p>
          <button
            aria-label="Scroll to top"
            type="button"
            id="back-to-top"
            onClick={scrollToTop}
            className={styles.backToTopButton}
          >
            <img
              src={backToTopImgSrc}
              alt="back to top"
              className={styles.backToTopIcon}
            />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
