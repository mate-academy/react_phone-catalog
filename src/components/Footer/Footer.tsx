import React from 'react';
import { NavLink } from 'react-router-dom';
import { Logo } from '../Logo';
import { ArrowUpIcon } from '../ui/ArrowUpIcon';
import styles from './Footer.module.scss';
import {
  CONTACTS_ORIGIN_REPO,
  GIT_HUB_REPO,
  RIGHTS_PATH,
} from '../../constants';

export const Footer: React.FC = () => {
  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.footer__content}>
        <Logo className={styles.footer__logo} />

        <nav className={styles.footer__nav}>
          <ul className={styles.footer__list}>
            <li className={styles.footer__item}>
              <a
                href={GIT_HUB_REPO}
                className={styles.footer__link}
                target="_blank"
                rel="noopener noreferrer"
              >
                Github
              </a>
            </li>
            <li className={styles.footer__item}>
              <NavLink
                to={CONTACTS_ORIGIN_REPO}
                className={styles.footer__link}
              >
                Contacts
              </NavLink>
            </li>
            <li className={styles.footer__item}>
              <NavLink to={RIGHTS_PATH} className={styles.footer__link}>
                Rights
              </NavLink>
            </li>
          </ul>
        </nav>

        <button
          className={styles.footer__backButton}
          onClick={handleBackToTop}
          aria-label="Back to top"
        >
          <span className={styles.footer__backText}>Back to top</span>
          <div className={styles.footer__backIcon}>
            <ArrowUpIcon />
          </div>
        </button>
      </div>
    </footer>
  );
};
