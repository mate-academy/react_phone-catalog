import React from 'react';
import cn from 'classnames';
import styles from './Footer.module.scss';
import { scrollToTop } from '../../utils/scrollToTop';
import { Link } from 'react-router-dom';

import logo from '../../assets/icons/logo.png';
import logoLight from '../../assets/icons/logo-light.png';
import { useTheme } from '../../context/ThemeContext';
import { ChevronIcon } from '../iconsSVG';

export const Footer: React.FC = () => {
  const { theme } = useTheme();

  return (
    <footer className={styles.footer}>
      <div className={styles.footer__container}>
        <div className={styles.footer__content}>
          <Link to="/" className={styles.footer__logo} aria-label="Home">
            <img src={theme === 'light' ? logoLight : logo} alt="Logo" />
          </Link>

          <nav className={styles.footer__nav} aria-label="Footer navigation">
            <a
              className={styles.footer__link}
              href="https://github.com/GTXtab/react_phone-catalog"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>

            <a
              className={cn(styles.footer__link, styles['footer__link--disabled'])}
              href="https://github.com/GTXtab"
            >
              Contacts
            </a>

            <a
              className={cn(styles.footer__link, styles['footer__link--disabled'])}
              href="https://github.com/GTXtab"
            >
              Rights
            </a>
          </nav>

          <div className={styles.footer__top}>
            <span className={styles['footer__top-text']}>Back to top</span>

            <button
              type="button"
              className={styles['footer__top-btn']}
              onClick={scrollToTop}
              aria-label="Back to top"
            >
              <ChevronIcon direction="up" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
