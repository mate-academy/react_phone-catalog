import React from 'react';
import styles from './Footer.module.scss';
import '@/styles/main.scss';
import classNames from 'classnames';

export const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <a className={styles['footer__logo-link']} href="#">
        <img
          src="/img/icons/Logo@2x.png"
          alt="Nice gadgets"
          className={styles.footer__logo}
        />
      </a>

      <nav className={styles.footer__nav}>
        <ul className={styles['footer__nav--list']}>
          <li>
            <a
              href="#"
              className={classNames(
                styles['footer__nav--link'],
                'text__uppercase',
              )}
            >
              GitHub
            </a>
          </li>
          <li>
            <a
              href="#"
              className={classNames(
                styles['footer__nav--link'],
                'text__uppercase',
              )}
            >
              Contacts
            </a>
          </li>
          <li>
            <a
              href="#"
              className={classNames(
                styles['footer__nav--link'],
                'text__uppercase',
              )}
            >
              Rights
            </a>
          </li>
        </ul>
      </nav>

      <div className={styles.footer__redirect}>
        <span className={styles['footer__redirect--text']}>Back to top</span>
        <button className="button__circle button__circle--arrow">
          <span className="icon icon--up"></span>
        </button>
      </div>
    </footer>
  );
};
