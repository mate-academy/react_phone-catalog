import React from 'react';
import styles from './Footer.module.scss';
import { NavLink } from 'react-router-dom';
import { Logo, ChevronIcon } from '../../helpers/icons';
import { scrollToTop } from '../../utils';

export const Footer = () => {
  return (
    <footer className={styles.container}>
      <div className={styles.inner}>
        <NavLink to="/" className={styles.logo}>
          <Logo />
        </NavLink>

        <section className={styles.links}>
          <a
            href="https://github.com/vladkorobka/react_phone-catalog"
            className={styles.github}
            target="_blank"
            rel="noreferrer"
          >
            Github
          </a>

          <a href="#/" className={styles.contacts}>
            Contacts
          </a>

          <a href="#/" className={styles.rights}>
            Rights
          </a>
        </section>

        <div className={styles.back}>
          <span className={styles.label}>Back to top</span>
          <button
            type="button"
            className={styles.back_link}
            onClick={scrollToTop}
          >
            <ChevronIcon />
          </button>
        </div>
      </div>
    </footer>
  );
};
