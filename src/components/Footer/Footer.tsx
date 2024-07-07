import React, { useEffect, useState } from 'react';
import styles from './Footer.module.scss';
import { Link, NavLink } from 'react-router-dom';
import { getArrowUpIcon, getLogoIcon } from '../../utils/getIcons';
import { useTheme } from '../../context/ThemeContext';

export const Footer: React.FC = () => {
  const { theme } = useTheme();

  const [showToTopButton, setShowToTopButton] = useState(false);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      const contentHeight = document.documentElement.scrollHeight;
      const viewportHeight = window.innerHeight;

      setShowToTopButton(contentHeight > viewportHeight);
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

  const logoIcon = getLogoIcon(theme);
  const arrowUpIcon = getArrowUpIcon(theme);

  return (
    <footer className={styles.footer}>
      <Link className={styles.footerLogoLink} to="/">
        <img src={logoIcon} alt="logo" />
      </Link>

      <nav className={styles.navContainer}>
        <NavLink
          className={styles.navItem}
          to="https://github.com/valost"
          target="_blank"
        >
          Github
        </NavLink>

        <NavLink
          className={styles.navItem}
          to="https://github.com/valost"
          target="_blank"
        >
          Contacts
        </NavLink>

        <NavLink
          className={styles.navItem}
          to="https://github.com/valost"
          target="_blank"
        >
          Rights
        </NavLink>
      </nav>

      <div className={styles.buttonWrapper}>
        {showToTopButton && (
          <>
            <p className={styles.buttonText}>Back to top</p>

            <button
              className={styles.toTopButton}
              onClick={scrollToTop}
              id="back-to-top"
              type="button"
            >
              <img src={arrowUpIcon} alt="arrowup" />
            </button>
          </>
        )}
      </div>
    </footer>
  );
};
