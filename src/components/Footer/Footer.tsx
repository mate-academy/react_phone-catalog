import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import styles from './Footer.module.scss';
import LogoIcon from '../../img/icons/LogoIcon.svg';
import ChevronIcon from '../../img/icons/ChevronIcon.svg';

export const Footer: React.FC = () => (
  <footer className={styles.wrapper}>
    <Link to="/" className={styles.logoLink}>
      <img src={LogoIcon} alt="Logo" />
    </Link>

    <nav className={styles.nav}>
      <NavLink
        to="https://github.com/meljaszuk"
        target="_blank"
        className={styles.item}
      >
        GitHub
      </NavLink>

      <NavLink
        to="https://github.com/meljaszuk"
        target="_blank"
        className={styles.item}
      >
        Contact
      </NavLink>

      <NavLink
        to="https://github.com/meljaszuk"
        target="_blank"
        className={styles.item}
      >
        Rights
      </NavLink>
    </nav>

    <div className={styles.backToTop}>
      <div className={styles.backToTopText}>
        Back to top
      </div>
      <div
        className={styles.backToTopButton}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <img src={ChevronIcon} className={styles.backToTopIcon }/>
      </div>
    </div>
  </footer>
);
