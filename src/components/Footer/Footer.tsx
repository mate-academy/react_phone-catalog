import React, { useContext } from 'react';
import styles from './Footer.module.scss';
import { ThemeContext } from '../../utils/themeContext';
import { Theme } from '../../../public/api/types/theme';

export const Footer = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <footer
      className={[
        styles.footer,
        theme === Theme.LIGHT ? styles['footer--light'] : '',
      ].join(' ')}
    >
      <div className={styles.footer__inner}>
        <a href="#" className={styles.footer__logo}>
          {theme === Theme.DARK ? (
            <img
              src="img/logo.svg"
              alt="Nice & Gadgets"
              className={styles.footer__logoImg}
            />
          ) : (
            <img
              src="img/LogoLig.svg"
              alt="Nice & Gadgets"
              className={styles.footer__logoImg}
            />
          )}
        </a>

        <nav className={styles.footer__links}>
          <a
            href="#"
            className={styles.footer__link}
            target="_blank"
            rel="noopener noreferrer"
          >
            Github
          </a>
          <a href="#" className={styles.footer__link}>
            Contacts
          </a>
          <a href="#" className={styles.footer__link}>
            Rights
          </a>
        </nav>

        <div className={styles.footer__button}>
          <label htmlFor="button_back" className={styles.footer__buttonLabel}>
            Back to top
          </label>
          <button
            id="button_back"
            className={styles.footer__up}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            {theme === Theme.DARK ? (
              <img
                src="img/icons/arrowUp.svg"
                alt="Nice & Gadgets"
                className={styles.footer__butImg}
              />
            ) : (
              <img
                src="img/icons/arrowUpLig.svg"
                alt="Nice & Gadgets"
                className={styles.footer__butImg}
              />
            )}
          </button>
        </div>
      </div>
    </footer>
  );
};
