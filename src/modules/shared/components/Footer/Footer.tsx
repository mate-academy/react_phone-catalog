import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.scss';
import LogoDark from '/img/LogoDark.svg';
import LogoLight from '/img/LogoLight.svg';
import { ArrowIcon } from '@/components/Icons/ArrowIcon';
import { useTheme } from '@/context/ThemeContext';
import classNames from 'classnames';

export const Footer: React.FC = () => {
  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const { theme } = useTheme();

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

      <button
        className={styles.footer__backtoTopButton}
        onClick={handleScrollTop}
        aria-label="Scroll back to top" // Good for accessibility
      >
        <span className={styles.footer__backtoTopText}>Back to top</span>
        <div
          className={classNames(styles.footer__backtoTopIcon, {
            [styles['footer__backtoTopIcon--dark']]: theme === 'dark',
          })}
        >
          <ArrowIcon direction="up" />
        </div>
        {/* Empty alt because button has aria-label */}
      </button>
    </footer>
  );
};

export default Footer;
