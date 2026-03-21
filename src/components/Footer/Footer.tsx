import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.scss';
import LogoLight from '@/assets/logo/Logo.svg?react';
import LogoDark from '@/assets/logo/Logo-dark.svg?react';
import ArrowUp from '@/assets/icons/ArrowUp.svg?react';
import { useTheme } from '@/context/ThemeContext';
import { useTranslation } from 'react-i18next';

export const Footer: React.FC = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.footer__container}>
        <Link to="/" className={styles.footer__logo}>
          {isDark ? (
            <LogoDark className={styles.logo} />
          ) : (
            <LogoLight className={styles.logo} />
          )}
        </Link>
        <nav className={styles.nav}>
          <ul className={styles.nav__list}>
            <li className={styles.nav__item}>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className={styles.nav__link}
              >
                {t('footer.github')}
              </a>
            </li>
            <li className={styles.nav__item}>
              <a href="#contacts" className={styles.nav__link}>
                {t('footer.contacts')}
              </a>
            </li>
            <li className={styles.nav__item}>
              <a href="#rights" className={styles.nav__link}>
                {t('footer.rights')}
              </a>
            </li>
          </ul>
        </nav>
        <div className={styles.backToTop}>
          <span className={styles.backToTop__text}>
            {t('buttons.backToTop')}
          </span>
          <button
            type="button"
            className={styles.backToTop__button}
            onClick={scrollToTop}
          >
            <ArrowUp title="Go to top" className={styles.backToTop__icon} />
          </button>
        </div>
      </div>
    </footer>
  );
};
