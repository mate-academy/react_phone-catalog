import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import styles from './Footer.module.scss';
import LogoIcon from '../../img/icons/LogoIcon.svg';
import ChevronIcon from '../../img/icons/ChevronIcon.svg';
import LogoIconDT from '../../img/icons/LogoIcon--DarkTheme.svg';
import ChevronIconDT from '../../img/icons/ChevronIcon--DarkTheme.svg';
import { useAppContext } from '../../context/AppContext';

export const Footer: React.FC = () => {
  const { theme } = useAppContext();

  return (<footer className={styles.wrapper}>
    <Link to="/" className={styles.logoLink}>
      <img src={`${theme === 'dark' ? LogoIconDT : LogoIcon}`} alt="Logo" />
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
        <img src={`${theme === 'dark' ? ChevronIconDT : ChevronIcon}`} className={styles.backToTopIcon }/>
      </div>
    </div>
  </footer>
)};
