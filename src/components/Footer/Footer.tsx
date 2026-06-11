/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.scss';
import logo from '../../assets/img/nice-gadgets-logo.png';

export const Footer: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handleScrollAndResize = () => {
      const hasScrollableContent =
        document.documentElement.scrollHeight > window.innerHeight;
      const isScrolledDown = window.scrollY > 1;

      setIsVisible(hasScrollableContent && isScrolledDown);
    };

    handleScrollAndResize();

    window.addEventListener('scroll', handleScrollAndResize);
    window.addEventListener('resize', handleScrollAndResize);

    return () => {
      window.removeEventListener('scroll', handleScrollAndResize);
      window.removeEventListener('resize', handleScrollAndResize);
    };
  }, []);

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <div className={styles.footerLogo}>
          <Link to="/">
            <img
              src={logo}
              alt="nice gadgets logo"
              className={styles.footerLogoImg}
            />
          </Link>
        </div>

        <nav className={styles.footerNav}>
          <ul className={styles.footerNavList}>
            <li className={styles.footerNavItem}>
              <a
                href="https://github.com/VitaliyHoroshko/react_phone-catalog"
                target="_blank"
                rel="noreferrer"
                className={styles.footerNavLink}
              >
                Github
              </a>
            </li>
            <li className={styles.footerNavItem}>
              <a
                href="https://github.com/VitaliyHoroshko"
                target="_blank"
                rel="noreferrer"
                className={styles.footerNavLink}
              >
                Contacts
              </a>
            </li>
            <li className={styles.footerNavItem}>
              <a
                href="https://www.apple.com/legal/privacy/en-ww/"
                target="_blank"
                rel="noreferrer"
                className={styles.footerNavLink}
              >
                Rights
              </a>
            </li>
          </ul>
        </nav>

        {isVisible && (
          <div
            className={styles.footerBackToTop}
            onClick={scrollToTop}
            role="button"
            tabIndex={0}
            onKeyDown={e => {
              if (e.key === 'Enter' || e.key === ' ') {
                scrollToTop();
              }
            }}
          >
            <span className={styles.footerBackToTopText}>Back to top</span>
            <button
              type="button"
              className={styles.footerBackToTopButton}
              tabIndex={-1}
            />
          </div>
        )}
      </div>
    </footer>
  );
};
