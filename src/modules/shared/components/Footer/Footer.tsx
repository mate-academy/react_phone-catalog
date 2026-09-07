import React from 'react';
import styles from './Footer.module.scss';
import '@/styles/main.scss';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <a className={styles['footer__logo-link']} href="#">
        <img
          src="img/icons/Logo@2x.png"
          alt="Nice gadgets"
          className={styles.footer__logo}
        />
      </a>

      <nav className={styles.footer__nav}>
        <ul className={styles['footer__nav--list']}>
          <li>
            <Link
              to="https://github.com/dminikulin"
              className={classNames(
                styles['footer__nav--link'],
                'text__uppercase',
              )}
              target="_blank"
            >
              GitHub
            </Link>
          </li>
          <li>
            <Link
              to="https://www.linkedin.com/in/dmytro-nikulin-053658372"
              className={classNames(
                styles['footer__nav--link'],
                'text__uppercase',
              )}
              target="_blank"
            >
              Contacts
            </Link>
          </li>
          <li>
            <Link
              to="https://mate.academy/"
              className={classNames(
                styles['footer__nav--link'],
                'text__uppercase',
              )}
              target="_blank"
            >
              Rights
            </Link>
          </li>
        </ul>
      </nav>

      <div className={styles.footer__redirect}>
        <span className={styles['footer__redirect--text']}>Back to top</span>
        <button
          className="button__circle button__circle--arrow"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <i className="icon icon--up"></i>
        </button>
      </div>
    </footer>
  );
};
