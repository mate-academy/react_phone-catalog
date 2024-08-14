import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import styles from './Footer.module.scss';
import LogoIcon from '../../img/icons/LogoIcon.svg';

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
  </footer>
);
