import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.scss';
import LogoDark from '/img/LogoDark.svg';
import LogoLight from '/img/LogoLight.svg';
import { ArrowIcon } from '@/shared/ui/Icons/ArrowIcon';
import { useTheme } from '@/app/providers/ThemeContext';
import classNames from 'classnames';

export const Footer: React.FC = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const { theme } = useTheme();

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const checkScroll = () => {
      const isScrollable =
        document.documentElement.scrollHeight > window.innerHeight;

      setShowBackToTop(isScrollable);
    };

    checkScroll();
    const resizeObserver = new ResizeObserver(() => {
      checkScroll();
    });

    resizeObserver.observe(document.body);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <footer className={styles.footer}>
      <Link to="/" className={styles.footer__logo} onClick={handleScrollTop}>
        <img src={theme === 'dark' ? LogoDark : LogoLight} alt="MyShop Logo" />
      </Link>

      <div className={styles.footer__links}>
        <a
          className={styles.footer__link}
          href="https://github.com/adonch/react_phone-catalog/tree/develop"
          target="_blank"
          rel="noopener noreferrer"
        >
          GITHUB
        </a>
        <Link className={styles.footer__link} to="/">
          CONTACTS
        </Link>
        <Link className={styles.footer__link} to="/">
          RIGHTS
        </Link>
      </div>

      {showBackToTop && (
        <button
          className={styles.footer__backtoTopButton}
          onClick={handleScrollTop}
          aria-label="Scroll back to top"
        >
          <span className={styles.footer__backtoTopText}>Back to top</span>
          <div
            className={classNames(styles.footer__backtoTopIcon, {
              [styles['footer__backtoTopIcon--dark']]: theme === 'dark',
            })}
          >
            <ArrowIcon direction="up" />
          </div>
        </button>
      )}
    </footer>
  );
};

export default Footer;
