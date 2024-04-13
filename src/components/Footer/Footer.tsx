import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import styles from './Footer.module.scss';
import { useTheme } from '../../context/ThemeContext';
import { getChevronIconSrc, getLogoIconSrc } from '../../servises/iconSrc';

const Footer: React.FC = () => {
  const { theme } = useTheme();

  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      const contentHeight = document.documentElement.scrollHeight;
      const viewportHeight = window.innerHeight;

      setShowBackToTop(contentHeight > viewportHeight);
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      characterData: true,
    });

    return () => observer.disconnect();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const logoImgSrc = getLogoIconSrc(theme);
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
        {showBackToTop && (
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
        )}
      </div>
    </footer>
  );
};

export default Footer;
